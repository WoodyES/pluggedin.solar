import { useState, useEffect, useRef } from "react";
import T from "../tokens";
import SEO from "../components/SEO";
import SectionLabel from "../components/SectionLabel";

// ─── PROPERTY SOLAR REPORT ─────────────────────────────────────────────────
// MVP scaffold — Commit 1: postcode entry + Leaflet map centred on postcode.
// Future commits add: pin placement, building footprint, sun path overlay,
// façade analysis report, CTAs.

function decodeState() {
  if (typeof window === "undefined") return { postcode: "", lat: null, lon: null };
  const p = new URLSearchParams(window.location.search);
  const lat = parseFloat(p.get("lat"));
  const lon = parseFloat(p.get("lon"));
  return {
    postcode: p.get("pc") || "",
    lat: Number.isFinite(lat) ? lat : null,
    lon: Number.isFinite(lon) ? lon : null,
  };
}

export default function ReportPage() {
  const init = decodeState();
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(
    init.lat && init.lon ? { lat: init.lat, lon: init.lon, area: init.postcode } : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Geocode postcode → lat/lon via postcodes.io
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
      // Reflect in URL for share-ability
      const url = new URL(window.location.href);
      url.searchParams.set("pc", clean);
      url.searchParams.set("lat", latitude.toFixed(6));
      url.searchParams.set("lon", longitude.toFixed(6));
      window.history.replaceState({}, "", url);
    } catch (_) {
      setError("Could not look up postcode — check your connection.");
    }
    setLoading(false);
  }

  // Auto-geocode if URL has postcode but no lat/lon
  useEffect(() => {
    if (init.postcode && !init.lat && !init.lon) {
      geocode(init.postcode);
    }
  }, []);

  // Initialise / update Leaflet map when location changes (client-side only)
  useEffect(() => {
    if (!location || !mapRef.current) return;
    let cancelled = false;

    (async () => {
      // Dynamic imports keep this out of the SSR bundle
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled) return;

      // Fix default marker icon paths for Vite/SSG bundles
      if (!L.Icon.Default.prototype._iconUrlPatched) {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        L.Icon.Default.prototype._iconUrlPatched = true;
      }

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          rotate: false, // never rotate — keeps compass true
          zoomControl: true,
        }).setView([location.lat, location.lon], 18);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        markerRef.current = L.marker([location.lat, location.lon]).addTo(map);
        mapInstanceRef.current = map;
      } else {
        mapInstanceRef.current.setView([location.lat, location.lon], 18);
        if (markerRef.current) {
          markerRef.current.setLatLng([location.lat, location.lon]);
        } else {
          markerRef.current = L.marker([location.lat, location.lon]).addTo(
            mapInstanceRef.current
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Property Solar Report"
        description="See your property's orientation, sun path across the year, and the best place to put plug-in solar panels — based on your exact UK postcode."
        path="/report"
      />
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionLabel>Property Solar Report</SectionLabel>
        <h1
          style={{
            fontFamily: T.display,
            fontSize: "clamp(2rem,4vw,2.8rem)",
            fontWeight: 800,
            marginTop: 12,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          {location ? "Your property" : "Plan your plug-in solar"}
        </h1>
        <p
          style={{
            color: T.inkMid,
            fontSize: "0.95rem",
            marginBottom: 36,
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          {location
            ? `Map centred on ${location.area}. Drop a pin on your house in the next step.`
            : "See where the sun travels across your property throughout the year — and find the best spot for your panels before you buy."}
        </p>

        {/* ─── POSTCODE INPUT ─── */}
        <div
          style={{
            background: T.surface,
            border: `1.5px solid ${T.border}`,
            borderRadius: 14,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: T.inkFaint,
              marginBottom: 10,
            }}
          >
            Step 1 — Enter your postcode
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="e.g. BN1 1AA"
              value={postcodeInput}
              onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && geocode(postcodeInput)}
              style={{
                flex: 1,
                padding: "14px 16px",
                borderRadius: 10,
                border: `1.5px solid ${location ? T.solarBorder : T.border}`,
                background: T.bg,
                color: T.ink,
                fontSize: "1rem",
                outline: "none",
                fontFamily: T.body,
                letterSpacing: "0.05em",
              }}
            />
            <button
              onClick={() => geocode(postcodeInput)}
              disabled={loading}
              style={{
                padding: "14px 24px",
                borderRadius: 10,
                border: "none",
                background: loading ? T.border : T.solar,
                color: loading ? T.inkFaint : "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                fontFamily: T.display,
                cursor: loading ? "default" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "⟳" : "Load map →"}
            </button>
          </div>
          {error && (
            <div style={{ fontSize: "0.78rem", color: T.red, marginTop: 10 }}>
              ⚠ {error}
            </div>
          )}
          {location && (
            <div
              style={{
                fontSize: "0.78rem",
                color: T.green,
                marginTop: 10,
                fontWeight: 500,
              }}
            >
              ✓ Found: {location.area}
            </div>
          )}
        </div>

        {/* ─── MAP ─── */}
        {location ? (
          <div
            style={{
              background: T.surface,
              border: `1.5px solid ${T.border}`,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              ref={mapRef}
              style={{
                width: "100%",
                height: 520,
                background: T.surfaceAlt,
              }}
              aria-label="Map of your property"
            />
            <div
              style={{
                padding: "14px 18px",
                fontSize: "0.78rem",
                color: T.inkFaint,
                borderTop: `1px solid ${T.borderFaint}`,
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: T.inkMid }}>Coming next:</strong> drag a
              pin onto your house, confirm its orientation, and see the sun's
              path across your property throughout the year.
            </div>
          </div>
        ) : (
          <div
            style={{
              background: T.surfaceAlt,
              border: `1.5px dashed ${T.border}`,
              borderRadius: 14,
              padding: "60px 20px",
              textAlign: "center",
              color: T.inkFaint,
              fontSize: "0.9rem",
            }}
          >
            Enter a postcode above to load the map.
          </div>
        )}
      </div>
    </section>
  );
}
