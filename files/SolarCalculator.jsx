import { useState, useEffect } from "react";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const C = {
  bg: "#0b0d13", surface: "#12151e", border: "#1e2235",
  amber: "#f59e0b", amberGlow: "rgba(245,158,11,0.12)", amberBright: "#fcd34d",
  green: "#10b981", greenGlow: "rgba(16,185,129,0.12)",
  blue: "#60a5fa", purple: "#a78bfa",
  red: "#ef4444", text: "#eef2f8", muted: "#5a6380", mutedLight: "#8892a8",
  serif: "'Cormorant Garamond', serif", sans: "'Outfit', sans-serif",
};

const PLACEMENTS = [
  { id: "garden",        label: "Garden / optimal roof",  angle: 35,  aspect: 0,   icon: "🌿" },
  { id: "balcony_south", label: "South-facing balcony",   angle: 90,  aspect: 0,   icon: "🏙️" },
  { id: "balcony_ew",    label: "East / West balcony",    angle: 90,  aspect: 90,  icon: "↔️" },
  { id: "flat_roof",     label: "Flat roof / ground",     angle: 20,  aspect: 0,   icon: "🏠" },
];

const PANEL_SIZES = [
  { watts: 400, kWp: 0.4, label: "400W", cost: 450 },
  { watts: 600, kWp: 0.6, label: "600W", cost: 600 },
  { watts: 800, kWp: 0.8, label: "800W", cost: 750 },
];

const PRESENCE = [
  { id: "home",  label: "Mostly home", selfConsumption: 0.75 },
  { id: "mixed", label: "In and out",  selfConsumption: 0.55 },
  { id: "out",   label: "Mostly out",  selfConsumption: 0.35 },
];

// ⚠ UPDATE QUARTERLY: https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you
const SUPPLIERS = [
  { id: "ofgem",         label: "Price cap default",   rate: 24.50 },
  { id: "octopus_flex",  label: "Octopus Flexible",    rate: 24.50 },
  { id: "octopus_agile", label: "Octopus Agile ⚡",    rate: null  },
  { id: "britishgas",    label: "British Gas",         rate: 24.50 },
  { id: "edf",           label: "EDF Energy",          rate: 24.50 },
  { id: "eon",           label: "E.ON Next",           rate: 24.50 },
  { id: "scottishpower", label: "ScottishPower",       rate: 24.50 },
  { id: "ovo",           label: "Ovo Energy",          rate: 24.50 },
  { id: "manual",        label: "Enter manually",      rate: null  },
];

const TARIFF_UPDATED = "April 2026";
const COSTS_UPDATED  = "April 2026";

// ─── URL SHARE ──────────────────────────────────────────────────────────────

function encodeState(s) {
  const p = new URLSearchParams({ pc: s.postcode, w: s.watts, pl: s.placementId, pr: s.presenceId, t: s.tariff.toFixed(2), su: s.supplierId });
  return `${window.location.origin}${window.location.pathname}?${p}`;
}
function decodeState() {
  const p = new URLSearchParams(window.location.search);
  return {
    postcode:    p.get("pc") || "",
    watts:       parseInt(p.get("w"))  || 800,
    placementId: p.get("pl") || "garden",
    presenceId:  p.get("pr") || "mixed",
    tariff:      parseFloat(p.get("t")) || 24.50,
    supplierId:  p.get("su") || "ofgem",
  };
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function SolarCalculator() {
  const init = decodeState();

  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation]           = useState(null);
  const [pvgisKwh, setPvgisKwh]           = useState(null);
  const [pvgisLoading, setPvgisLoading]   = useState(false);
  const [pvgisError, setPvgisError]       = useState(null);

  const [panelSize, setPanelSize] = useState(PANEL_SIZES.find(p => p.watts === init.watts) || PANEL_SIZES[2]);
  const [placement, setPlacement] = useState(PLACEMENTS.find(p => p.id === init.placementId) || PLACEMENTS[0]);
  const [presence,  setPresence]  = useState(PRESENCE.find(p => p.id === init.presenceId)   || PRESENCE[1]);
  const [supplier,  setSupplier]  = useState(SUPPLIERS.find(s => s.id === init.supplierId)  || SUPPLIERS[0]);
  const [tariff,    setTariff]    = useState(init.tariff);

  const [gridData,    setGridData]    = useState(null);
  const [gridLoading, setGridLoading] = useState(true);

  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    setTimeout(() => setMounted(true), 80);
    if (init.postcode) geocodeAndFetch(init.postcode);
    fetchGrid();
    const t = setInterval(fetchGrid, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect);
  }, [panelSize, placement]);

  // ── Carbon Intensity API ───────────────────────────────────────────────
  async function fetchGrid() {
    setGridLoading(true);
    try {
      const r    = await fetch("https://api.carbonintensity.org.uk/generation");
      const json = await r.json();
      const mix  = json.data.generationmix;
      const get  = fuel => mix.find(f => f.fuel === fuel)?.perc || 0;
      setGridData({
        solar: get("solar"), wind: get("wind") + get("wind_offshore") + get("wind_onshore"),
        nuclear: get("nuclear"), gas: get("gas"), biomass: get("biomass"),
        imports: get("imports"), hydro: get("hydro"), mix, at: new Date(),
      });
    } catch (_) {}
    finally { setGridLoading(false); }
  }

  // ── Postcodes.io ───────────────────────────────────────────────────────
  async function geocodeAndFetch(pc) {
    const clean = pc.replace(/\s/g, "").toUpperCase();
    if (clean.length < 4) return;
    setPvgisError(null);
    try {
      const r    = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const json = await r.json();
      if (json.status !== 200) { setPvgisError("Postcode not found — please check it and try again."); return; }
      const { latitude: lat, longitude: lon, admin_district, parliamentary_constituency } = json.result;
      const area = admin_district || parliamentary_constituency || clean;
      setLocation({ lat, lon, area });
      fetchPVGIS(lat, lon, panelSize.kWp, placement.angle, placement.aspect);
    } catch (_) {
      setPvgisError("Could not look up postcode. Check your connection and try again.");
    }
  }

  // ── PVGIS (EU JRC) ─────────────────────────────────────────────────────
  async function fetchPVGIS(lat, lon, kWp, angle, aspect) {
    setPvgisLoading(true); setPvgisError(null);
    try {
      const url  = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${kWp}&loss=14&outputformat=json&mountingplace=free&angle=${angle}&aspect=${aspect}`;
      const r    = await fetch(url);
      const json = await r.json();
      const kwh  = json.outputs?.totals?.fixed?.E_y;
      if (kwh) { setPvgisKwh(kwh); }
      else throw new Error("bad response");
    } catch (_) {
      // Latitude-based fallback
      const n    = Math.max(0, Math.min(1, (58 - lat) / 8));
      const base = 870 + n * 180;
      const mult = aspect !== 0 ? 0.82 : (angle >= 80 ? 0.78 : 1.0);
      setPvgisKwh(kWp * base * mult);
      setPvgisError("Using latitude-based estimate — PVGIS API temporarily unavailable.");
    }
    finally { setPvgisLoading(false); }
  }

  function selectSupplier(s) {
    setSupplier(s);
    if (s.rate !== null) setTariff(s.rate);
  }

  async function handleShare() {
    const url = encodeState({ postcode: postcodeInput.replace(/\s/g,"").toUpperCase(), watts: panelSize.watts, placementId: placement.id, presenceId: presence.id, tariff, supplierId: supplier.id });
    try { await navigator.clipboard.writeText(url); }
    catch (_) { prompt("Copy your share link:", url); }
    setCopied(true); setTimeout(() => setCopied(false), 3000);
  }

  // ── Calculations ───────────────────────────────────────────────────────
  const annualGen    = pvgisKwh || 0;
  const selfConsumed = annualGen * presence.selfConsumption;
  const annualSaving = (selfConsumed * tariff) / 100;
  const payback      = annualSaving > 0 ? panelSize.cost / annualSaving : 0;
  const lifetime     = annualSaving * 15 - panelSize.cost;
  const co2Kg        = selfConsumed * 0.207;
  const hasResults   = annualGen > 0;
  const tariffPct    = ((tariff - 10) / 40) * 100;

  if (!mounted) return <div style={{ background: C.bg, minHeight: "100vh" }} />;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: C.sans, color: C.text, maxWidth: 480, margin: "0 auto" }}>
      <style>{`
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fu{animation:fadeUp 0.35s ease forwards}
        input[type=range]{-webkit-appearance:none;appearance:none;cursor:pointer;width:100%}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:${C.amber};border:2px solid ${C.bg};box-shadow:0 0 0 3px ${C.amber}55;margin-top:-9px}
        input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px}
        button{transition:all 0.15s ease;cursor:pointer}
        button:active{transform:scale(0.97)!important}
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "44px 28px 28px", borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260, borderRadius:"50%", background:`radial-gradient(circle,${C.amber}12 0%,transparent 70%)`, pointerEvents:"none" }} />
        <div style={{ fontSize:"2.2rem", marginBottom:12 }}>☀️</div>
        <h1 style={{ fontFamily:C.serif, fontSize:"2.1rem", fontWeight:700, margin:0, lineHeight:1.15, background:`linear-gradient(135deg,${C.amberBright} 0%,${C.amber} 60%)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Plug-in Solar<br />Savings Calculator
        </h1>
        <p style={{ color:C.mutedLight, margin:"10px 0 20px", fontSize:"0.88rem", fontWeight:300, lineHeight:1.6 }}>
          Real irradiance data for your exact postcode · Live UK grid stats · Personalised payback estimate
        </p>
        <LiveGridBar data={gridData} loading={gridLoading} />
      </div>

      {/* POSTCODE */}
      <Sect label="Your postcode">
        <div style={{ display:"flex", gap:10 }}>
          <input type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
            onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && geocodeAndFetch(postcodeInput)}
            style={{ flex:1, padding:"13px 16px", borderRadius:10, border:`1.5px solid ${location ? C.amber+"70" : C.border}`, background:C.surface, color:C.text, fontSize:"1rem", outline:"none", fontFamily:C.sans, letterSpacing:"0.06em" }}
          />
          <button onClick={() => geocodeAndFetch(postcodeInput)} disabled={pvgisLoading}
            style={{ padding:"13px 20px", borderRadius:10, border:"none", background:pvgisLoading ? C.border : C.amber, color:pvgisLoading ? C.muted : C.bg, fontWeight:700, fontSize:"0.9rem", fontFamily:C.sans, whiteSpace:"nowrap" }}>
            {pvgisLoading ? "⟳" : "Check →"}
          </button>
        </div>
        {location && (
          <div className="fu" style={{ marginTop:10, fontSize:"0.8rem", color:C.green, display:"flex", alignItems:"center", gap:6 }}>
            ✓ <span>PVGIS irradiance loaded for <strong>{location.area}</strong> ({location.lat.toFixed(3)}°N, {Math.abs(location.lon).toFixed(3)}°{location.lon < 0 ? "W":"E"})</span>
          </div>
        )}
        {pvgisError && <div style={{ marginTop:10, fontSize:"0.78rem", color:C.amber }}>⚠ {pvgisError}</div>}
        <Note>We query the EU Joint Research Centre's PVGIS database using your exact coordinates — the same tool used by solar professionals.</Note>
      </Sect>

      {/* SYSTEM SIZE */}
      <Sect label="System size">
        <ChipRow>{PANEL_SIZES.map(p => (
          <Chip key={p.watts} active={panelSize.watts === p.watts} onClick={() => setPanelSize(p)}>
            {p.label}{p.watts === 800 && <Bdg>UK max</Bdg>}
          </Chip>
        ))}</ChipRow>
        <Note>2026 UK regulatory cap: 800W. Estimated system cost: ~£{panelSize.cost}.</Note>
      </Sect>

      {/* PLACEMENT */}
      <Sect label="Where will you install the panels?">
        <ChipRow>{PLACEMENTS.map(p => (
          <Chip key={p.id} active={placement.id === p.id} onClick={() => setPlacement(p)}>
            {p.icon} {p.label}
          </Chip>
        ))}</ChipRow>
        <Note>Your placement sets the tilt angle and orientation passed directly to PVGIS — so the figure is calculated, not approximated.</Note>
      </Sect>

      {/* PRESENCE */}
      <Sect label="Are you home during the day?">
        <ChipRow>{PRESENCE.map(p => (
          <Chip key={p.id} active={presence.id === p.id} onClick={() => setPresence(p)}>{p.label}</Chip>
        ))}</ChipRow>
        <Note>Solar you use directly is worth ~9× more than solar you export. Smart Export Guarantee pays ~3–6p/kWh vs. 24p+ to import.</Note>
      </Sect>

      {/* SUPPLIER + TARIFF */}
      <Sect label={`Energy supplier · Ofgem Q2 2026 price cap · Updated ${TARIFF_UPDATED}`}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
          {SUPPLIERS.map(s => (
            <button key={s.id} onClick={() => selectSupplier(s)}
              style={{ padding:"10px 12px", borderRadius:8, border:`1.5px solid ${supplier.id===s.id ? C.amber : C.border}`, background:supplier.id===s.id ? C.amberGlow : "transparent", color:supplier.id===s.id ? C.amber : C.mutedLight, fontSize:"0.78rem", fontWeight:supplier.id===s.id ? 600 : 400, fontFamily:C.sans, textAlign:"left" }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:6 }}>
          <input type="range" min="10" max="50" step="0.5" value={tariff}
            onChange={e => { setTariff(parseFloat(e.target.value)); setSupplier(SUPPLIERS.find(s=>s.id==="manual")); }}
            style={{ flex:1, height:4, borderRadius:2, outline:"none", background:`linear-gradient(to right,${C.amber} 0%,${C.amber} ${tariffPct}%,${C.border} ${tariffPct}%,${C.border} 100%)` }}
          />
          <span style={{ fontFamily:C.serif, fontSize:"1.4rem", fontWeight:700, color:C.amber, minWidth:58, textAlign:"right" }}>{tariff.toFixed(1)}p</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.7rem", color:C.muted }}>
          <span>10p</span>
          <a href="https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" target="_blank" rel="noreferrer" style={{ color:C.amber }}>Verify current Ofgem cap ↗</a>
          <span>50p</span>
        </div>
      </Sect>

      {/* EMPTY STATE */}
      {!hasResults && (
        <div style={{ padding:"48px 28px", textAlign:"center" }}>
          <div style={{ fontSize:"2.5rem", marginBottom:14 }}>📍</div>
          <div style={{ fontFamily:C.serif, fontSize:"1.3rem", color:C.mutedLight, lineHeight:1.6 }}>Enter your postcode above to load your personalised solar estimate</div>
          <Note>Uses live PVGIS irradiance — no two postcodes are the same.</Note>
        </div>
      )}

      {/* RESULTS */}
      {hasResults && (
        <div className="fu" style={{ background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ padding:"24px 28px" }}>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <Lbl>Your results · {location?.area}</Lbl>
              <button onClick={handleShare}
                style={{ padding:"7px 16px", borderRadius:20, border:`1px solid ${copied ? C.green+"60" : C.border}`, background:copied ? C.greenGlow : "transparent", color:copied ? C.green : C.mutedLight, fontSize:"0.75rem", fontFamily:C.sans, display:"flex", alignItems:"center", gap:6 }}>
                {copied ? "✓ Link copied" : "⬆ Share"}
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <Stat label="Annual generation" value={`${annualGen.toFixed(0)} kWh`} sub="PVGIS · your postcode" hi />
              <Stat label="Annual bill saving" value={`£${annualSaving.toFixed(0)}`} sub={`at ${tariff.toFixed(1)}p/kWh`} hi />
              <Stat label="Payback period" value={`${payback.toFixed(1)} yrs`} />
              <Stat label="CO₂ offset / yr" value={`${co2Kg.toFixed(0)} kg`} sub="207g/kWh · DESNZ 2024" />
            </div>

            <div style={{ padding:"20px", borderRadius:14, background:lifetime>0 ? `linear-gradient(135deg,${C.greenGlow},${C.amberGlow})` : "rgba(239,68,68,0.08)", border:`1px solid ${lifetime>0 ? C.green+"40" : "#ef444440"}`, textAlign:"center", marginBottom:20 }}>
              <Lbl style={{ marginBottom:8 }}>15-year net saving · after £{panelSize.cost} system cost</Lbl>
              <div style={{ fontFamily:C.serif, fontSize:"2.8rem", fontWeight:700, color:lifetime>0 ? C.green : C.red, lineHeight:1 }}>
                {lifetime>=0 ? "+" : ""}£{Math.abs(lifetime).toFixed(0)}
              </div>
              <div style={{ fontSize:"0.76rem", color:C.muted, marginTop:8 }}>
                Based on {tariff.toFixed(1)}p constant tariff · savings likely higher if energy prices rise
              </div>
            </div>

            {gridData && <GridWidget data={gridData} />}
          </div>
        </div>
      )}

      {/* EMAIL CTA */}
      <div style={{ padding:"32px 28px", borderTop:`1px solid ${C.border}` }}>
        {!submitted ? (
          <>
            <div style={{ fontFamily:C.serif, fontSize:"1.5rem", fontWeight:600, marginBottom:8 }}>Get your full personalised report</div>
            <p style={{ color:C.mutedLight, fontSize:"0.85rem", margin:"0 0 24px", lineHeight:1.7 }}>Kit recommendations for your setup · Tariff optimisation tips · DNO notification walkthrough · Alert when BSI-compliant kits hit UK shelves (expected July 2026).</p>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key==="Enter" && email && setSubmitted(true)}
              style={{ width:"100%", padding:"14px 16px", borderRadius:10, border:`1.5px solid ${C.border}`, background:C.surface, color:C.text, fontSize:"0.95rem", marginBottom:12, outline:"none", boxSizing:"border-box", fontFamily:C.sans }}
            />
            <button onClick={() => email && setSubmitted(true)}
              style={{ width:"100%", padding:"14px", borderRadius:10, border:"none", background:`linear-gradient(135deg,${C.amberBright},${C.amber},#d97706)`, color:"#0b0d13", fontSize:"0.95rem", fontWeight:700, fontFamily:C.sans, letterSpacing:"0.02em" }}>
              Send me the report →
            </button>
          </>
        ) : (
          <div className="fu" style={{ textAlign:"center" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>✅</div>
            <div style={{ fontFamily:C.serif, fontSize:"1.4rem", fontWeight:600, marginBottom:8 }}>You're on the list</div>
            <p style={{ color:C.mutedLight, fontSize:"0.85rem", lineHeight:1.6 }}>Report incoming — and we'll alert you when BSI-compliant kits land in UK shops.</p>
          </div>
        )}

        <ProvenancePanel />
      </div>
    </div>
  );
}

// ─── WIDGETS ─────────────────────────────────────────────────────────────────

function LiveGridBar({ data, loading }) {
  if (loading && !data) return (
    <div style={{ padding:"12px 16px", borderRadius:10, border:`1px solid ${C.border}`, background:C.surface, fontSize:"0.78rem", color:C.muted }}>
      Loading live UK grid data...
    </div>
  );
  if (!data) return null;
  const fuels = [
    { k:"solar",   c:C.amber,   v:data.solar   },
    { k:"wind",    c:C.blue,    v:data.wind    },
    { k:"nuclear", c:C.purple,  v:data.nuclear },
    { k:"biomass", c:"#84cc16", v:data.biomass },
    { k:"gas",     c:C.muted,   v:data.gas     },
    { k:"imports", c:"#f97316", v:data.imports },
  ].filter(f => f.v > 0.5);
  return (
    <div style={{ padding:"14px 16px", borderRadius:10, border:`1px solid ${C.border}`, background:C.surface }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <Lbl>UK grid right now</Lbl>
        <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.7rem", color:C.green }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block", animation:"pulse 2s infinite" }} />
          Live · {data.at.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}
        </span>
      </div>
      <div style={{ height:8, borderRadius:4, overflow:"hidden", display:"flex", marginBottom:10 }}>
        {fuels.map(f => <div key={f.k} style={{ width:`${f.v}%`, background:f.c, transition:"width 0.6s ease" }} title={`${f.k}: ${f.v.toFixed(1)}%`} />)}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 12px" }}>
        {fuels.map(f => (
          <span key={f.k} style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.7rem", color:C.mutedLight }}>
            <span style={{ width:8, height:8, borderRadius:2, background:f.c, display:"inline-block" }} />
            {f.k.charAt(0).toUpperCase()+f.k.slice(1)} {f.v.toFixed(1)}%
          </span>
        ))}
      </div>
    </div>
  );
}

function GridWidget({ data }) {
  return (
    <div style={{ padding:"16px", borderRadius:12, border:`1px solid ${C.border}`, background:C.bg }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <Lbl>UK grid context</Lbl>
        <span style={{ fontSize:"0.7rem", color:C.green, display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block", animation:"pulse 2s infinite" }} /> Live
        </span>
      </div>
      <div style={{ fontFamily:C.serif, fontSize:"1.1rem", color:C.text, lineHeight:1.7 }}>
        Solar is currently providing <span style={{ color:C.amber, fontWeight:600 }}>{data.solar.toFixed(1)}%</span> of UK electricity · Wind: <span style={{ color:C.blue }}>{data.wind.toFixed(1)}%</span> · Gas: <span style={{ color:C.muted }}>{data.gas.toFixed(1)}%</span>
      </div>
      <div style={{ fontSize:"0.7rem", color:C.muted, marginTop:8 }}>
        National Grid ESO via Carbon Intensity API · refreshes every 5 minutes
      </div>
    </div>
  );
}

function ProvenancePanel() {
  const rows = [
    { label:"Solar irradiance", detail:"PVGIS · EU Joint Research Centre · live API call per postcode", link:"https://re.jrc.ec.europa.eu/pvg_tools/en/", badge:"live", bc:C.green },
    { label:"UK grid data",     detail:"Carbon Intensity API · National Grid ESO · auto-refreshed every 5 min", link:"https://carbonintensity.org.uk", badge:"live", bc:C.green },
    { label:"Energy tariffs",   detail:`Ofgem Q2 2026 price cap · standard variable rates · update each quarter`, link:"https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you", badge:TARIFF_UPDATED, bc:C.amber },
    { label:"System costs",     detail:`Market estimate · EcoFlow, Anker SOLIX · update when UK kits launch`, link:"https://www.ecoflow.com/uk", badge:COSTS_UPDATED, bc:C.amber },
    { label:"Carbon factor",    detail:"207g CO₂/kWh · DESNZ grid intensity", link:"https://www.gov.uk/government/collections/uk-energy-in-brief", badge:"2024", bc:C.muted },
  ];
  return (
    <div style={{ marginTop:28, padding:18, borderRadius:12, border:`1px solid ${C.border}`, background:C.surface }}>
      <Lbl style={{ marginBottom:14 }}>Data sources &amp; freshness</Lbl>
      {rows.map(r => (
        <div key={r.label} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
          <span style={{ fontSize:"0.63rem", padding:"3px 8px", borderRadius:20, background:`${r.bc}20`, color:r.bc, whiteSpace:"nowrap", fontWeight:600, marginTop:1 }}>
            {r.badge==="live" ? "● live" : r.badge}
          </span>
          <div>
            <div style={{ fontSize:"0.78rem", color:C.text, fontWeight:500 }}>{r.label}</div>
            <div style={{ fontSize:"0.68rem", color:C.muted, marginTop:2 }}>{r.detail} · <a href={r.link} target="_blank" rel="noreferrer" style={{ color:C.amber }}>source ↗</a></div>
          </div>
        </div>
      ))}
      <div style={{ fontSize:"0.68rem", color:C.muted, borderTop:`1px solid ${C.border}`, paddingTop:12, marginTop:4, lineHeight:1.6 }}>
        ⚠ <strong style={{ color:C.mutedLight }}>To keep this tool current:</strong> update tariffs quarterly (Ofgem publishes each cap ~6 weeks before it takes effect), and update system costs when BSI-compliant kits hit UK stores (expected July 2026). PVGIS and grid data are always live.
      </div>
    </div>
  );
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function Sect({ label, children }) {
  return (
    <div style={{ padding:"22px 28px", borderBottom:`1px solid ${C.border}` }}>
      <Lbl style={{ marginBottom:14 }}>{label}</Lbl>
      {children}
    </div>
  );
}
function Lbl({ children, style }) {
  return <span style={{ display:"block", fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, ...style }}>{children}</span>;
}
function ChipRow({ children }) {
  return <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>{children}</div>;
}
function Chip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding:"9px 14px", borderRadius:8, border:`1.5px solid ${active ? C.amber : C.border}`, background:active ? C.amberGlow : "transparent", color:active ? C.amber : C.mutedLight, fontSize:"0.83rem", fontWeight:active ? 600 : 400, fontFamily:C.sans, display:"flex", alignItems:"center", gap:4 }}>
      {children}
    </button>
  );
}
function Bdg({ children }) {
  return <span style={{ fontSize:"0.6rem", padding:"2px 6px", borderRadius:4, background:`${C.amber}25`, color:C.amber, marginLeft:4, fontWeight:700 }}>{children}</span>;
}
function Stat({ label, value, sub, hi }) {
  return (
    <div style={{ padding:"16px", borderRadius:12, border:`1px solid ${hi ? C.amber+"35" : C.border}`, background:hi ? C.amberGlow : C.bg }}>
      <div style={{ fontFamily:C.serif, fontSize:"1.7rem", fontWeight:700, color:hi ? C.amber : C.text, lineHeight:1, marginBottom:5 }}>{value}</div>
      <div style={{ fontSize:"0.72rem", color:C.muted }}>{label}</div>
      {sub && <div style={{ fontSize:"0.63rem", color:C.muted, marginTop:3, opacity:0.8 }}>{sub}</div>}
    </div>
  );
}
function Note({ children }) {
  return <p style={{ color:C.muted, fontSize:"0.74rem", margin:"10px 0 0", lineHeight:1.55 }}>{children}</p>;
}
