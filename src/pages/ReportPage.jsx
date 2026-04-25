import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SEO from "../components/SEO";
import SectionLabel from "../components/SectionLabel";

// ─── PROPERTY SOLAR REPORT ─────────────────────────────────────────────────
// Full MVP — postcode → pin → footprint → sun path → façade analysis.
// All free APIs: postcodes.io, OpenStreetMap (Overpass), SunCalc, Leaflet.

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkopkned";

// ─── GEOMETRY HELPERS ──────────────────────────────────────────────────────
const M_PER_DEG_LAT = 111320;
const metresPerDegLon = lat => 111320 * Math.cos((lat * Math.PI) / 180);

// Build a rectangle (4 corners) centred on (cLat, cLon), w metres east-west,
// h metres north-south, rotated clockwise from north by rotDeg.
function buildRectangle(cLat, cLon, wM, hM, rotDeg) {
  const halfW = wM / 2;
  const halfH = hM / 2;
  const rad = (rotDeg * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  const local = [
    [-halfW, -halfH], [halfW, -halfH], [halfW, halfH], [-halfW, halfH],
  ];
  const mLon = metresPerDegLon(cLat);
  return local.map(([x, y]) => {
    const xr = x * cos + y * sin;
    const yr = -x * sin + y * cos;
    return { lat: cLat + yr / M_PER_DEG_LAT, lon: cLon + xr / mLon };
  });
}

// Find longest edge of a polygon → use it to derive the two main façade bearings.
function findFaçades(polygon) {
  if (!polygon || polygon.length < 3) return { front: 180, back: 0 };
  let maxLen = 0, edgeBearing = 0;
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const dLat = b.lat - a.lat;
    const dLon = (b.lon - a.lon) * Math.cos((a.lat * Math.PI) / 180);
    const len = Math.sqrt(dLat * dLat + dLon * dLon) * M_PER_DEG_LAT;
    if (len > maxLen) {
      maxLen = len;
      edgeBearing = ((Math.atan2(dLon, dLat) * 180) / Math.PI + 360) % 360;
    }
  }
  // The two main façades are perpendicular to the longest edge
  const f1 = (edgeBearing + 90) % 360;
  const f2 = (edgeBearing + 270) % 360;
  // "Front" = the more south-facing of the two
  const dist = b => {
    const d = Math.abs(b - 180);
    return Math.min(d, 360 - d);
  };
  return dist(f1) <= dist(f2)
    ? { front: f1, back: f2 }
    : { front: f2, back: f1 };
}

// ─── REPORT TEXT HELPERS ───────────────────────────────────────────────────
const COMPASS_FULL = [
  "North", "North-Northeast", "Northeast", "East-Northeast",
  "East", "East-Southeast", "Southeast", "South-Southeast",
  "South", "South-Southwest", "Southwest", "West-Southwest",
  "West", "West-Northwest", "Northwest", "North-Northwest",
];
const compassName = deg => COMPASS_FULL[Math.round(deg / 22.5) % 16];

function exposureFromBearing(deg) {
  const distFromSouth = Math.min(Math.abs(deg - 180), 360 - Math.abs(deg - 180));
  if (distFromSouth <= 30) return {
    grade: "Excellent", pct: Math.round(96 - distFromSouth * 0.07), color: T.green,
    advice: "Excellent. A south-facing balcony or rear garden will work well. Maximise output with a 30–35° tilt.",
  };
  if (distFromSouth <= 60) return {
    grade: "Very good", pct: Math.round(94 - distFromSouth * 0.13), color: T.green,
    advice: "Very good. Small loss vs. due south. Consider dual panels if space allows, to balance morning and afternoon generation.",
  };
  if (distFromSouth <= 105) return {
    grade: "Good", pct: Math.round(90 - distFromSouth * 0.18), color: T.sky,
    advice: "Good for morning OR afternoon generation, not both. Think about when you’re home — east for morning runners, west for evening cooks.",
  };
  if (distFromSouth <= 150) return {
    grade: "Limited", pct: Math.round(78 - distFromSouth * 0.13), color: T.solar,
    advice: "Limited. Panels on this elevation will underperform. Consider a ground-mount in your garden facing south instead.",
  };
  return {
    grade: "Not ideal", pct: 60, color: T.red,
    advice: "Not ideal for plug-in solar on the façade. Strongly recommend a garden ground-mount, or consider full roof solar instead.",
  };
}

// ─── OVERPASS (OSM) BUILDING LOOKUP ────────────────────────────────────────
async function fetchOsmBuilding(lat, lon, radiusM = 30) {
  const q = `[out:json][timeout:15];(way["building"](around:${radiusM},${lat},${lon}););out geom;`;
  try {
    const r = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "data=" + encodeURIComponent(q),
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j.elements?.length) return null;
    let best = null, bestDist = Infinity;
    for (const el of j.elements) {
      if (!el.geometry?.length) continue;
      const cs = el.geometry.map(g => ({ lat: g.lat, lon: g.lon }));
      const cLat = cs.reduce((s, c) => s + c.lat, 0) / cs.length;
      const cLon = cs.reduce((s, c) => s + c.lon, 0) / cs.length;
      const dy = (cLat - lat) * M_PER_DEG_LAT;
      const dx = (cLon - lon) * metresPerDegLon(lat);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < bestDist) { bestDist = d; best = cs; }
    }
    return best;
  } catch (_) {
    return null;
  }
}

// ─── SUN PATH ARC POINTS ───────────────────────────────────────────────────
async function sunArcPoints(date, lat, lon, radiusM, SunCalc, samples = 50) {
  const times = SunCalc.getTimes(date, lat, lon);
  const start = times.sunrise?.getTime();
  const end = times.sunset?.getTime();
  if (!start || !end || end <= start) return [];
  const arc = [];
  const mLon = metresPerDegLon(lat);
  for (let i = 0; i <= samples; i++) {
    const t = new Date(start + ((end - start) * i) / samples);
    const pos = SunCalc.getPosition(t, lat, lon);
    if (pos.altitude < 0) continue;
    // SunCalc azimuth: 0 = south, +π/2 = west, -π/2 = east
    const bearing = (pos.azimuth * 180 / Math.PI + 180 + 360) % 360;
    const rad = (bearing * Math.PI) / 180;
    // Scale radius slightly by altitude so the high-summer arc reads taller
    const r = radiusM * (0.6 + Math.min(1, pos.altitude / (Math.PI / 2)) * 0.4);
    const dx = Math.sin(rad) * r;
    const dy = Math.cos(rad) * r;
    arc.push({ lat: lat + dy / M_PER_DEG_LAT, lon: lon + dx / mLon });
  }
  return arc;
}

// ─── URL STATE ─────────────────────────────────────────────────────────────
function decodeState() {
  if (typeof window === "undefined") return { postcode: "", lat: null, lon: null, rot: 0 };
  const p = new URLSearchParams(window.location.search);
  const lat = parseFloat(p.get("lat"));
  const lon = parseFloat(p.get("lon"));
  const rot = parseFloat(p.get("rot"));
  return {
    postcode: p.get("pc") || "",
    lat: Number.isFinite(lat) ? lat : null,
    lon: Number.isFinite(lon) ? lon : null,
    rot: Number.isFinite(rot) ? rot : 0,
  };
}

function syncUrl(state) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (state.postcode != null) url.searchParams.set("pc", state.postcode);
  if (state.lat != null) url.searchParams.set("lat", state.lat.toFixed(6));
  if (state.lon != null) url.searchParams.set("lon", state.lon.toFixed(6));
  if (state.rot != null) url.searchParams.set("rot", String(Math.round(state.rot)));
  window.history.replaceState({}, "", url);
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────
export default function ReportPage() {
  const init = decodeState();

  // — flow —
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(
    init.lat && init.lon ? { lat: init.lat, lon: init.lon, area: init.postcode } : null
  );
  const [pinned, setPinned] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [footprint, setFootprint] = useState(null);   // [{lat, lon}, ...] (closed)
  const [footprintSource, setFootprintSource] = useState(null); // "osm" | "default"
  const [rotation, setRotation] = useState(init.rot || 0);
  const [showReport, setShowReport] = useState(false);
  const [loadingFootprint, setLoadingFootprint] = useState(false);

  // — postcode UI —
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // — email capture —
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | sent | error

  // — leaflet refs —
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const polygonRef = useRef(null);
  const sunArcsRef = useRef([]);
  const LRef = useRef(null);
  const SunCalcRef = useRef(null);

  // ─── PIN MOVEMENT ────────────────────────────────────────────────────────
  function updatePin(lat, lon) {
    setLocation(prev => (prev ? { ...prev, lat, lon } : { lat, lon, area: "" }));
    setPinned(true);
    setConfirmed(false);
    setFootprint(null);
    setFootprintSource(null);
    setShowReport(false);
    syncUrl({ lat, lon });
  }

  // ─── POSTCODE GEOCODING ─────────────────────────────────────────────────
  async function geocode(pc) {
    const clean = pc.replace(/[\s-]/g, "").toUpperCase();
    if (clean.length < 4) {
      setError("Postcode too short");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      if (!r.ok) {
        setError("Postcode not recognised — please check and try again.");
        setLoading(false);
        return;
      }
      const j = await r.json();
      const { latitude, longitude, admin_district } = j.result;
      setLocation({ lat: latitude, lon: longitude, area: admin_district || clean });
      setPinned(false);
      setConfirmed(false);
      setFootprint(null);
      setFootprintSource(null);
      setShowReport(false);
      syncUrl({ postcode: clean, lat: latitude, lon: longitude });
    } catch (_) {
      setError("Could not look up postcode — check your connection.");
    }
    setLoading(false);
  }

  // Auto-geocode on mount if URL has only postcode
  useEffect(() => {
    if (init.postcode && !init.lat && !init.lon) geocode(init.postcode);
  }, []);

  // ─── INIT MAP (once we have a location) ─────────────────────────────────
  useEffect(() => {
    if (!location || !mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = LRef.current || (await import("leaflet")).default;
      if (!LRef.current) {
        await import("leaflet/dist/leaflet.css");
        LRef.current = L;
        if (!L.Icon.Default.prototype._iconUrlPatched) {
          delete L.Icon.Default.prototype._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          });
          L.Icon.Default.prototype._iconUrlPatched = true;
        }
      }
      if (cancelled) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, { rotate: false, zoomControl: true })
          .setView([location.lat, location.lon], 18);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([location.lat, location.lon], { draggable: true }).addTo(map);
        marker.on("dragend", e => {
          const { lat, lng } = e.target.getLatLng();
          updatePin(lat, lng);
        });
        map.on("click", e => {
          marker.setLatLng(e.latlng);
          updatePin(e.latlng.lat, e.latlng.lng);
        });
        markerRef.current = marker;
        mapInstanceRef.current = map;
      } else if (!pinned) {
        mapInstanceRef.current.setView([location.lat, location.lon], 18);
        markerRef.current?.setLatLng([location.lat, location.lon]);
      }
    })();

    return () => { cancelled = true; };
  }, [location]);

  // ─── ON CONFIRM → FETCH OSM BUILDING (or fall back to default rect) ─────
  useEffect(() => {
    if (!confirmed || !location) return;
    let cancelled = false;
    setLoadingFootprint(true);
    (async () => {
      const osm = await fetchOsmBuilding(location.lat, location.lon, 30);
      if (cancelled) return;
      if (osm && osm.length >= 4) {
        setFootprint(osm);
        setFootprintSource("osm");
      } else {
        const rect = buildRectangle(location.lat, location.lon, 10, 6, rotation);
        setFootprint(rect);
        setFootprintSource("default");
      }
      setLoadingFootprint(false);
    })();
    return () => { cancelled = true; };
  }, [confirmed]);

  // ─── REBUILD DEFAULT RECT ON ROTATION CHANGE ────────────────────────────
  useEffect(() => {
    if (footprintSource !== "default" || !location) return;
    setFootprint(buildRectangle(location.lat, location.lon, 10, 6, rotation));
    syncUrl({ rot: rotation });
  }, [rotation]);

  // ─── DRAW FOOTPRINT POLYGON ON MAP ──────────────────────────────────────
  useEffect(() => {
    const L = LRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map) return;
    if (polygonRef.current) {
      polygonRef.current.remove();
      polygonRef.current = null;
    }
    if (footprint && footprint.length >= 3) {
      polygonRef.current = L.polygon(
        footprint.map(p => [p.lat, p.lon]),
        { color: T.solar, weight: 2.5, fillColor: T.solar, fillOpacity: 0.18 }
      ).addTo(map);
    }
  }, [footprint]);

  // ─── DRAW SUN PATH ARCS WHEN VIEWING REPORT ─────────────────────────────
  useEffect(() => {
    const L = LRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map || !location) return;

    // Clear any prior arcs
    sunArcsRef.current.forEach(a => a.remove());
    sunArcsRef.current = [];
    if (!showReport) return;

    let cancelled = false;
    (async () => {
      const SunCalc = SunCalcRef.current || (await import("suncalc")).default;
      SunCalcRef.current = SunCalc;
      if (cancelled) return;

      const year = new Date().getFullYear();
      const dates = [
        { date: new Date(year, 11, 21), color: "#7BA7D9", label: "Winter solstice", weight: 2 },     // pale sky
        { date: new Date(year, 2, 21),  color: T.solar,   label: "Equinox",         weight: 2.5 },
        { date: new Date(year, 5, 21),  color: T.solarBright, label: "Summer solstice", weight: 3 }, // bright gold
      ];
      const radiusM = 60;
      for (const d of dates) {
        const pts = await sunArcPoints(d.date, location.lat, location.lon, radiusM, SunCalc, 60);
        if (cancelled || pts.length < 2) continue;
        const arc = L.polyline(pts.map(p => [p.lat, p.lon]), {
          color: d.color, weight: d.weight, opacity: 0.85,
          className: "sun-arc",
        }).addTo(map);
        arc.bindTooltip(d.label, { permanent: false, direction: "top" });
        sunArcsRef.current.push(arc);
      }

      // Fit map to show the arcs comfortably
      const allPts = sunArcsRef.current.flatMap(a => a.getLatLngs());
      if (allPts.length) {
        const group = L.featureGroup([...sunArcsRef.current, markerRef.current].filter(Boolean));
        map.fitBounds(group.getBounds().pad(0.2), { animate: true });
      }
    })();

    return () => { cancelled = true; };
  }, [showReport, location]);

  // ─── CLEANUP ─────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      sunArcsRef.current.forEach(a => a.remove?.());
      sunArcsRef.current = [];
      if (polygonRef.current) { polygonRef.current.remove(); polygonRef.current = null; }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // ─── EMAIL SUBMIT ───────────────────────────────────────────────────────
  async function submitEmail(e) {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          source: "Property Solar Report",
          postcode: location?.area,
          frontBearing: facades?.front,
          exposure: exposure?.grade,
        }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch (_) {
      setEmailStatus("error");
    }
  }

  // ─── DERIVED REPORT VALUES ───────────────────────────────────────────────
  const facades = footprint ? findFaçades(footprint) : null;
  const exposure = facades ? exposureFromBearing(facades.front) : null;
  const placementPath = facades
    ? `/calculator?pc=${encodeURIComponent((location?.area || "").replace(/\s/g, "").toUpperCase()) || ""}&pl=${
        facades.front >= 150 && facades.front <= 210 ? "garden"
        : (facades.front >= 90 && facades.front <= 270) ? "balcony-s"
        : "roof-flat"
      }`
    : "/calculator";

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Property Solar Report"
        description="See your property's orientation, sun path across the year, and the best place to put plug-in solar panels — based on your exact UK postcode."
        path="/report"
      />
      <style>{`.sun-arc { filter: drop-shadow(0 0 4px rgba(224,148,0,0.35)); }`}</style>

      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionLabel>Property Solar Report</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>
          {showReport ? "Your solar report" : location ? "Your property" : "Plan your plug-in solar"}
        </h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 36, lineHeight: 1.6, maxWidth: 600 }}>
          {showReport
            ? `Based on your property's orientation in ${location?.area || "your area"}, here's how the sun moves across your home throughout the year.`
            : confirmed
              ? "Confirm your building footprint, then we'll generate your report."
              : location
                ? `Map centred on ${location.area}. Drag the pin onto your house — or tap the map to drop it there.`
                : "See where the sun travels across your property throughout the year — and find the best spot for your panels before you buy."}
        </p>

        {/* ─── STEP 1: POSTCODE ─── */}
        <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>
            Step 1 — Enter your postcode
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
              onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && geocode(postcodeInput)}
              style={{ flex: 1, padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${location ? T.solarBorder : T.border}`, background: T.bg, color: T.ink, fontSize: "1rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em" }}
            />
            <button onClick={() => geocode(postcodeInput)} disabled={loading}
              style={{ padding: "14px 24px", borderRadius: 10, border: "none", background: loading ? T.border : T.solar, color: loading ? T.inkFaint : "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, cursor: loading ? "default" : "pointer", whiteSpace: "nowrap" }}>
              {loading ? "⟳" : "Load map →"}
            </button>
          </div>
          {error && <div style={{ fontSize: "0.78rem", color: T.red, marginTop: 10 }}>⚠ {error}</div>}
          {location && <div style={{ fontSize: "0.78rem", color: T.green, marginTop: 10, fontWeight: 500 }}>✓ Found: {location.area}</div>}
        </div>

        {/* ─── MAP ─── */}
        {location ? (
          <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
            <div ref={mapRef} style={{ width: "100%", height: 520, background: T.surfaceAlt }} aria-label="Map of your property" />
            <div style={{ padding: "14px 18px", borderTop: `1px solid ${T.borderFaint}`, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ fontSize: "0.78rem", color: T.inkFaint, lineHeight: 1.5, flex: "1 1 220px", minWidth: 0 }}>
                {showReport
                  ? <><strong style={{ color: T.solar }}>☀ Sun arcs</strong> show the sun's path across your sky on the winter solstice, equinox, and summer solstice.</>
                  : confirmed
                    ? loadingFootprint
                      ? <>Looking up your building in OpenStreetMap…</>
                      : footprintSource === "osm"
                        ? <><strong style={{ color: T.green }}>✓ Building found.</strong> The orange outline is your house according to OpenStreetMap.</>
                        : <><strong style={{ color: T.solar }}>Step 3 —</strong> we've placed a default rectangle. Rotate it below to match your house.</>
                    : pinned
                      ? <><strong style={{ color: T.green }}>✓ Pin moved.</strong> Drag again to fine-tune, or confirm to continue.</>
                      : <><strong style={{ color: T.inkMid }}>Step 2 —</strong> drag the blue pin onto your house, or tap your house on the map.</>
                }
              </div>
              {!confirmed && (
                <button onClick={() => setConfirmed(true)} disabled={confirmed}
                  style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: T.solar, color: "#fff", fontWeight: 700, fontSize: "0.82rem", fontFamily: T.display, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Confirm location →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ background: T.surfaceAlt, border: `1.5px dashed ${T.border}`, borderRadius: 14, padding: "60px 20px", textAlign: "center", color: T.inkFaint, fontSize: "0.9rem", marginBottom: 20 }}>
            Enter a postcode above to load the map.
          </div>
        )}

        {/* ─── STEP 3: FOOTPRINT CONTROLS ─── */}
        {confirmed && footprint && !showReport && (
          <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>
              Step 3 — Confirm your building orientation
            </label>

            {footprintSource === "osm" ? (
              <p style={{ fontSize: "0.88rem", color: T.inkMid, marginBottom: 16, lineHeight: 1.6 }}>
                We found your building in OpenStreetMap and outlined it on the map. Looks right? Generate your report below.
              </p>
            ) : (
              <>
                <p style={{ fontSize: "0.88rem", color: T.inkMid, marginBottom: 16, lineHeight: 1.6 }}>
                  We couldn't auto-detect your building, so we've placed a default 10 m × 6 m rectangle. Use the slider to rotate it until the long edge lines up with your house.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                  <input
                    type="range" min="0" max="180" step="1" value={rotation}
                    onChange={e => setRotation(parseFloat(e.target.value))}
                    style={{ flex: 1, accentColor: T.solar, height: 4 }}
                  />
                  <span style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 800, color: T.solar, minWidth: 56, textAlign: "right" }}>
                    {Math.round(rotation)}°
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: T.inkFaint, marginBottom: 16 }}>
                  <span>0° (long edge runs north–south)</span>
                  <span>90°</span>
                  <span>180°</span>
                </div>
              </>
            )}

            <button onClick={() => setShowReport(true)}
              style={{ padding: "12px 22px", borderRadius: 10, border: "none", background: T.ink, color: "#fff", fontWeight: 700, fontSize: "0.88rem", fontFamily: T.display, cursor: "pointer", marginTop: 8 }}>
              View my report →
            </button>
          </div>
        )}

        {/* ─── REPORT CARD ─── */}
        {showReport && facades && exposure && (
          <>
            <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 8 }}>
                Your main façade faces
              </div>
              <div style={{ fontFamily: T.display, fontSize: "clamp(1.6rem,3.5vw,2.1rem)", fontWeight: 800, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 6 }}>
                {compassName(facades.front)} <span style={{ color: T.solar }}>· {Math.round(facades.front)}°</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: `${exposure.color}1a`, border: `1px solid ${exposure.color}40`, marginTop: 8, marginBottom: 18 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: exposure.color }} />
                <span style={{ fontFamily: T.display, fontSize: "0.82rem", fontWeight: 700, color: exposure.color }}>
                  ☀ Solar exposure: {exposure.grade}
                </span>
                <span style={{ fontSize: "0.78rem", color: T.inkMid }}>· ~{exposure.pct}% of optimal irradiance</span>
              </div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkFaint, marginTop: 8, marginBottom: 6 }}>
                Best placement
              </div>
              <p style={{ fontSize: "0.92rem", color: T.inkMid, lineHeight: 1.7, marginBottom: 20 }}>
                {exposure.advice}
              </p>

              {/* SUN HOURS BAR */}
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>
                Daylight across the year (UK average)
              </div>
              {[
                { season: "Summer", hours: 16, frac: 1 },
                { season: "Spring / Autumn", hours: 12, frac: 0.75 },
                { season: "Winter", hours: 8, frac: 0.5 },
              ].map(s => (
                <div key={s.season} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: T.inkMid, marginBottom: 4 }}>
                    <span>{s.season}</span><span>~{s.hours} hrs daylight</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.frac * 100}%`, background: `linear-gradient(90deg,${T.solar},${T.solarBright})` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: 14, padding: 20, marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to={placementPath} style={{ flex: "1 1 220px", padding: "14px 18px", borderRadius: 10, background: T.solar, color: "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, textAlign: "center", textDecoration: "none", whiteSpace: "nowrap" }}>
                Run the savings calculator →
              </Link>
              <Link to="/quiz" style={{ flex: "1 1 220px", padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, textAlign: "center", textDecoration: "none", whiteSpace: "nowrap" }}>
                Find your kit →
              </Link>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                style={{ flex: "1 1 220px", padding: "14px 18px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, cursor: "pointer", whiteSpace: "nowrap" }}>
                ↑ Share this report
              </button>
            </div>

            {/* EMAIL CAPTURE */}
            <div style={{ background: T.solarLight, border: `1.5px solid ${T.solarBorder}`, borderRadius: 14, padding: 20 }}>
              <div style={{ fontFamily: T.display, fontSize: "1.05rem", fontWeight: 800, color: T.ink, marginBottom: 6 }}>
                Get this report by email
              </div>
              <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 14, lineHeight: 1.5 }}>
                We'll email you a copy you can share with your landlord, builder, or installer — and let you know when BSI-compliant plug-in solar kits go on sale.
              </p>
              {emailStatus === "sent" ? (
                <div style={{ fontSize: "0.88rem", color: T.green, fontWeight: 600 }}>
                  ✓ On its way — check your inbox.
                </div>
              ) : (
                <form onSubmit={submitEmail} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    type="email" placeholder="your@email.com" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    style={{ flex: "1 1 220px", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.95rem", outline: "none", fontFamily: T.body }}
                  />
                  <button type="submit" disabled={emailStatus === "sending"}
                    style={{ padding: "12px 22px", borderRadius: 10, border: "none", background: emailStatus === "sending" ? T.border : T.solar, color: "#fff", fontWeight: 700, fontSize: "0.88rem", fontFamily: T.display, cursor: "pointer", whiteSpace: "nowrap" }}>
                    {emailStatus === "sending" ? "⟳" : "Email me →"}
                  </button>
                </form>
              )}
              {emailStatus === "error" && (
                <div style={{ fontSize: "0.78rem", color: T.red, marginTop: 8 }}>⚠ Couldn't send. Try again?</div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
