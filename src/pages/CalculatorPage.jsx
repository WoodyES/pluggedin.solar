import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import GridDataContext from "../GridDataContext";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PLACEMENTS = [
  { id: "garden",        label: "Garden / roof",        angle: 35, aspect: 0,  icon: "🌿" },
  { id: "balcony_south", label: "South balcony",        angle: 90, aspect: 0,  icon: "🏙️" },
  { id: "balcony_ew",    label: "East / West balcony",  angle: 90, aspect: 90, icon: "↔️" },
  { id: "flat_roof",     label: "Flat roof / ground",   angle: 20, aspect: 0,  icon: "🏠" },
];
const PANEL_SIZES = [
  { watts: 400, kWp: 0.4, label: "400W", cost: 450 },
  { watts: 600, kWp: 0.6, label: "600W", cost: 600 },
  { watts: 800, kWp: 0.8, label: "800W", cost: 750, max: true },
];
const PRESENCE = [
  { id: "home",  label: "Mostly home", sc: 0.75 },
  { id: "mixed", label: "In and out",  sc: 0.55 },
  { id: "out",   label: "Mostly out",  sc: 0.35 },
];
const SUPPLIERS = [
  { id: "ofgem",  label: "Ofgem cap (default)", rate: 24.50 },
  { id: "oe",     label: "Octopus Flexible",    rate: 24.50 },
  { id: "agile",  label: "Octopus Agile ⚡",rate: null },
  { id: "bg",     label: "British Gas",         rate: 24.50 },
  { id: "edf",    label: "EDF Energy",          rate: 24.50 },
  { id: "eon",    label: "E.ON Next",           rate: 24.50 },
  { id: "sp",     label: "ScottishPower",       rate: 24.50 },
  { id: "ovo",    label: "Ovo Energy",          rate: 24.50 },
  { id: "manual", label: "Enter manually",      rate: null },
];

function encodeCalcState(s) {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams({ pc: s.postcode, w: s.watts, pl: s.placementId, pr: s.presenceId, t: s.tariff.toFixed(2), su: s.supplierId });
  return `${window.location.origin}/calculator?${p}`;
}
function decodeCalcState() {
  if (typeof window === "undefined") return { postcode: "", watts: 800, placementId: "garden", presenceId: "mixed", tariff: 24.50, supplierId: "ofgem" };
  const p = new URLSearchParams(window.location.search);
  return { postcode: p.get("pc") || "", watts: parseInt(p.get("w")) || 800, placementId: p.get("pl") || "garden", presenceId: p.get("pr") || "mixed", tariff: parseFloat(p.get("t")) || 24.50, supplierId: p.get("su") || "ofgem" };
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  const gridData = useContext(GridDataContext);
  const init = decodeCalcState();
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(null);
  const [pvgisKwh, setPvgisKwh] = useState(null);
  const [monthlyKwh, setMonthlyKwh] = useState(null); // array of 12
  const [pvgisLoading, setPvgisLoading] = useState(false);
  const [pvgisError, setPvgisError] = useState(null);
  const [panelSize, setPanelSize] = useState(PANEL_SIZES.find(p => p.watts === init.watts) || PANEL_SIZES[2]);
  const [placement, setPlacement] = useState(PLACEMENTS.find(p => p.id === init.placementId) || PLACEMENTS[0]);
  const [presence, setPresence] = useState(PRESENCE.find(p => p.id === init.presenceId) || PRESENCE[1]);
  const [supplier, setSupplier] = useState(SUPPLIERS.find(s => s.id === init.supplierId) || SUPPLIERS[0]);
  const [tariff, setTariff] = useState(init.tariff);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);
  const [showYearly, setShowYearly] = useState(true);

  useEffect(() => { if (init.postcode) geocodeAndFetch(init.postcode); }, []);
  useEffect(() => { if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect); }, [panelSize, placement]);

  async function geocodeAndFetch(pc) {
    const clean = pc.replace(/\s/g, "").toUpperCase();
    if (clean.length < 4) return;
    setPvgisError(null);
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const j = await r.json();
      if (j.status !== 200) { setPvgisError("Postcode not found — please check it."); return; }
      const { latitude: lat, longitude: lon, admin_district } = j.result;
      setLocation({ lat, lon, area: admin_district || clean });
      fetchPVGIS(lat, lon, panelSize.kWp, placement.angle, placement.aspect);
    } catch (_) { setPvgisError("Could not look up postcode. Check your connection."); }
  }

  async function fetchPVGIS(lat, lon, kWp, angle, aspect) {
    setPvgisLoading(true); setPvgisError(null);
    try {
      const url = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${kWp}&loss=14&outputformat=json&mountingplace=free&angle=${angle}&aspect=${aspect}`;
      const j = await (await fetch(url)).json();
      const kwh = j.outputs?.totals?.fixed?.E_y;
      const monthly = j.outputs?.monthly?.fixed;
      if (kwh) {
        setPvgisKwh(kwh);
        if (monthly && monthly.length === 12) {
          setMonthlyKwh(monthly.map(m => m.E_m));
        } else {
          setMonthlyKwh(null);
        }
      } else throw 0;
    } catch (_) {
      const n = Math.max(0, Math.min(1, (58 - lat) / 8));
      const annual = kWp * (870 + n * 180) * (aspect !== 0 ? 0.82 : (angle >= 80 ? 0.78 : 1.0));
      setPvgisKwh(annual);
      // Estimate monthly distribution (UK solar curve approximation)
      const dist = [0.04, 0.05, 0.08, 0.10, 0.12, 0.13, 0.13, 0.12, 0.09, 0.07, 0.04, 0.03];
      setMonthlyKwh(dist.map(d => annual * d));
      setPvgisError("Latitude estimate used — PVGIS temporarily unavailable.");
    } finally { setPvgisLoading(false); }
  }

  function pickSupplier(s) { setSupplier(s); if (s.rate) setTariff(s.rate); }

  async function share() {
    const url = encodeCalcState({ postcode: postcodeInput.replace(/\s/g, "").toUpperCase(), watts: panelSize.watts, placementId: placement.id, presenceId: presence.id, tariff, supplierId: supplier.id });
    try { await navigator.clipboard.writeText(url); } catch (_) { prompt("Copy link:", url); }
    setCopied(true); setTimeout(() => setCopied(false), 3000);
  }

  const annualGen = pvgisKwh || 0;
  const selfConsumed = annualGen * presence.sc;
  const annualSaving = (selfConsumed * tariff) / 100;
  const payback = annualSaving > 0 ? panelSize.cost / annualSaving : 0;
  const lifetime = annualSaving * 15 - panelSize.cost;
  const co2Kg = selfConsumed * 0.207;
  const hasResults = annualGen > 0;
  const tariffPct = ((tariff - 10) / 40) * 100;

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Plug-in Solar Savings Calculator"
        description="Calculate your plug-in solar savings with real PVGIS irradiance data for your UK postcode. Compare system sizes, placements, and energy tariffs."
        path="/calculator"
      />
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Calculator</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>Plug-in solar savings calculator</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
          Real PVGIS irradiance for your exact postcode &middot; Live UK grid data &middot; Shareable results link
        </p>

        <div className="grid-2-calc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          {/* LEFT — inputs */}
          <div style={{ padding: "24px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface }}>
            <CLabel>Your postcode</CLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
                onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && geocodeAndFetch(postcodeInput)}
                style={{ flex: 1, padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${location ? T.solarBorder : T.border}`, background: T.bg, color: T.ink, fontSize: "0.95rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              />
              <button onClick={() => geocodeAndFetch(postcodeInput)} disabled={pvgisLoading}
                style={{ padding: "12px 18px", borderRadius: 9, border: "none", background: pvgisLoading ? T.border : T.solar, color: pvgisLoading ? T.inkFaint : "#fff", fontWeight: 700, fontFamily: T.display, boxShadow: pvgisLoading ? "none" : `0 2px 10px ${T.solarBorder}` }}>
                {pvgisLoading ? "⟳" : "Go"}
              </button>
            </div>
            {location && <div style={{ fontSize: "0.75rem", color: T.green, marginBottom: 4, fontWeight: 500 }}>✓ PVGIS data loaded for {location.area}</div>}
            {pvgisError && <div style={{ fontSize: "0.75rem", color: T.solar, marginBottom: 4 }}>⚠ {pvgisError}</div>}
            <Divider />

            <CLabel>System size</CLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {PANEL_SIZES.map(p => (
                <CChip key={p.watts} active={panelSize.watts === p.watts} onClick={() => setPanelSize(p)}>
                  {p.label}{p.max && <CBadge>UK max</CBadge>}
                </CChip>
              ))}
            </div>

            <CLabel>Placement</CLabel>
            <div className="placement-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
              {PLACEMENTS.map(p => (
                <CChip key={p.id} active={placement.id === p.id} onClick={() => setPlacement(p)}>{p.icon} {p.label}</CChip>
              ))}
            </div>

            <CLabel>Home during the day?</CLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {PRESENCE.map(p => (
                <CChip key={p.id} active={presence.id === p.id} onClick={() => setPresence(p)}>{p.label}</CChip>
              ))}
            </div>

            <CLabel>Supplier &middot; Ofgem Q2 2026</CLabel>
            <div className="supplier-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
              {SUPPLIERS.map(s => (
                <button key={s.id} onClick={() => pickSupplier(s)}
                  style={{ padding: "9px 10px", borderRadius: 7, border: `1.5px solid ${supplier.id === s.id ? T.solar : T.border}`, background: supplier.id === s.id ? T.solarLight : T.surface, color: supplier.id === s.id ? T.solar : T.inkMid, fontSize: "0.75rem", fontWeight: supplier.id === s.id ? 600 : 400, fontFamily: T.body, textAlign: "left" }}>
                  {s.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
              <input type="range" min="10" max="50" step="0.5" value={tariff}
                onChange={e => { setTariff(parseFloat(e.target.value)); pickSupplier(SUPPLIERS.find(s => s.id === "manual")); }}
                style={{ flex: 1, background: `linear-gradient(to right,${T.solar} 0%,${T.solar} ${tariffPct}%,${T.border} ${tariffPct}%,${T.border} 100%)`, height: 4, borderRadius: 2, outline: "none" }}
              />
              <span style={{ fontFamily: T.display, fontSize: "1.3rem", fontWeight: 800, color: T.solar, minWidth: 54, textAlign: "right" }}>{tariff.toFixed(1)}p</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: T.inkFaint }}>
              <span>10p</span><span>50p/kWh</span>
            </div>
          </div>

          {/* RIGHT — results */}
          <div style={{ padding: "24px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
            {!hasResults ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "40px 20px" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: T.solarLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📍</div>
                <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, lineHeight: 1.5 }}>Enter your postcode to see your estimate</div>
                <div style={{ fontSize: "0.78rem", color: T.inkFaint, lineHeight: 1.6 }}>Real PVGIS irradiance &mdash; no two postcodes are identical</div>
              </div>
            ) : (
              <div className="fi">
                {/* Header + share */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: T.ink }}>{location?.area}</span>
                  <button onClick={share} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${copied ? T.green : T.border}`, background: copied ? T.greenLight : "transparent", color: copied ? T.green : T.inkFaint, fontSize: "0.72rem", fontFamily: T.body }}>
                    {copied ? "✓ Copied" : "⬆ Share"}
                  </button>
                </div>

                {/* Monthly / Yearly toggle */}
                <div style={{ display: "flex", background: T.bg, borderRadius: 8, padding: 3, marginBottom: 16, border: `1px solid ${T.border}` }}>
                  {[{ label: "Monthly", val: false }, { label: "Yearly", val: true }].map(t => (
                    <button key={t.label} onClick={() => setShowYearly(t.val)} style={{
                      flex: 1, padding: "7px 0", borderRadius: 6, border: "none",
                      background: showYearly === t.val ? T.surface : "transparent",
                      boxShadow: showYearly === t.val ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      color: showYearly === t.val ? T.ink : T.inkFaint,
                      fontSize: "0.78rem", fontWeight: 600, fontFamily: T.display, cursor: "pointer",
                    }}>{t.label}</button>
                  ))}
                </div>

                {/* Savings cards — kWh + cost */}
                {(() => {
                  const gen = showYearly ? annualGen : annualGen / 12;
                  const sav = showYearly ? annualSaving : annualSaving / 12;
                  const period = showYearly ? "year" : "month";
                  return (
                    <div className="rcards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                      <RCard label={`Generation / ${period}`} value={`${gen.toFixed(0)} kWh`} sub="PVGIS · your postcode" hi />
                      <RCard label={`Saving / ${period}`} value={`£${sav.toFixed(sav < 10 ? 2 : 0)}`} sub={`at ${tariff.toFixed(1)}p/kWh`} hi />
                      <RCard label="Payback period" value={`${payback.toFixed(1)} yrs`} />
                      <RCard label="CO₂ offset / yr" value={`${co2Kg.toFixed(0)} kg`} sub="207g/kWh · DESNZ" />
                    </div>
                  );
                })()}

                {/* Contextual explanations */}
                <ContextCards annualSaving={annualSaving} annualGen={annualGen} selfConsumed={selfConsumed} showYearly={showYearly} />

                {/* Seasonal savings graph */}
                {monthlyKwh && <SavingsGraph monthlyKwh={monthlyKwh} selfConsumption={presence.sc} tariff={tariff} />}

                {/* 15-year net saving */}
                <div style={{ padding: "20px", borderRadius: 12, background: lifetime > 0 ? T.greenLight : T.redLight, border: `1.5px solid ${lifetime > 0 ? T.greenBorder : "rgba(220,38,38,0.18)"}`, textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>15-year net saving after &pound;{panelSize.cost} system cost</div>
                  <div style={{ fontFamily: T.display, fontSize: "3rem", fontWeight: 800, color: lifetime > 0 ? T.green : T.red, lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {lifetime >= 0 ? "+" : ""}&pound;{Math.abs(lifetime).toFixed(0)}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: T.inkFaint, marginTop: 8 }}>Based on constant {tariff.toFixed(1)}p tariff</div>
                </div>

                {/* Live grid */}
                {gridData && (
                  <div style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg, marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint }}>UK grid right now</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.68rem", color: T.green, fontWeight: 500 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, display: "inline-block", animation: "pulse 2s infinite" }} /> Live
                      </span>
                    </div>
                    <div style={{ height: 7, borderRadius: 4, overflow: "hidden", display: "flex", marginBottom: 8, background: T.border }}>
                      {[{ k: "solar", c: T.solar, v: gridData.solar }, { k: "wind", c: T.fuelWind, v: gridData.wind }, { k: "nuclear", c: T.fuelNuclear, v: gridData.nuclear }, { k: "biomass", c: T.fuelBiomass, v: gridData.biomass }, { k: "gas", c: T.fuelGas, v: gridData.gas }]
                        .filter(f => f.v > 0.5).map(f => <div key={f.k} style={{ width: `${f.v}%`, background: f.c, transition: "width 0.6s" }} />)}
                    </div>
                    <div style={{ display: "flex", gap: "4px 14px", flexWrap: "wrap" }}>
                      {[{ l: "Solar", c: T.solar, v: gridData.solar }, { l: "Wind", c: T.fuelWind, v: gridData.wind }, { l: "Gas", c: T.fuelGas, v: gridData.gas }].map(f => (
                        <span key={f.l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.7rem", color: T.inkMid }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: f.c, display: "inline-block" }} />{f.l} {f.v.toFixed(1)}%
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email capture — Formspree */}
                {emailStatus !== "success" ? (
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!email || !email.includes("@")) return;
                    setEmailStatus("sending");
                    try {
                      const res = await fetch("https://formspree.io/f/xkopkned", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", Accept: "application/json" },
                        body: JSON.stringify({ email }),
                      });
                      setEmailStatus(res.ok ? "success" : "error");
                    } catch { setEmailStatus("error"); }
                  }} style={{ padding: "18px", borderRadius: 10, border: `1.5px solid ${T.solarBorder}`, background: T.solarLight }}>
                    <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, marginBottom: 6 }}>Get the full report</div>
                    <p style={{ fontSize: "0.75rem", color: T.inkMid, lineHeight: 1.6, marginBottom: 14 }}>Kit picks &middot; DNO walkthrough &middot; Alert when compliant kits land in UK shops.</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input type="email" name="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                        style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg, color: T.ink, fontSize: "0.85rem", outline: "none", fontFamily: T.body }}
                      />
                      <button type="submit" disabled={emailStatus === "sending"}
                        style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: emailStatus === "sending" ? T.border : T.solar, color: emailStatus === "sending" ? T.inkFaint : "#fff", fontWeight: 700, fontSize: "0.82rem", fontFamily: T.display, whiteSpace: "nowrap", boxShadow: emailStatus === "sending" ? "none" : `0 2px 8px ${T.solarBorder}`, cursor: emailStatus === "sending" ? "wait" : "pointer" }}>
                        {emailStatus === "sending" ? "⟳" : "Send →"}
                      </button>
                    </div>
                    {emailStatus === "error" && <div style={{ fontSize: "0.75rem", color: T.red, marginTop: 8 }}>Something went wrong — please try again.</div>}
                  </form>
                ) : (
                  <div className="fu" style={{ padding: "18px", borderRadius: 10, border: `1px solid ${T.greenBorder}`, background: T.greenLight, textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✅</div>
                    <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink }}>You&rsquo;re on the list</div>
                    <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 6 }}>We&rsquo;ll alert you when compliant kits hit UK shops.</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link to="/quiz" style={{ padding: "14px 28px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
            Not sure which kit? Take the quiz &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CONTEXT CARDS ─────────────────────────────────────────────────────────
const AVG_UK_BILL = 1568; // £/yr average UK electricity bill (Ofgem cap, 2-bed)
const APPLIANCES = [
  { name: "washing machine loads", kwh: 1.2 },
  { name: "laptop charges", kwh: 0.05 },
  { name: "EV miles", kwh: 0.3 },
  { name: "kettle boils", kwh: 0.1 },
];

function ContextCards({ annualSaving, annualGen, selfConsumed, showYearly }) {
  const billPct = ((annualSaving / AVG_UK_BILL) * 100).toFixed(0);
  const kwhUsed = showYearly ? selfConsumed : selfConsumed / 12;
  // Pick the most relatable appliance (aim for a value between 5 and 500)
  const best = APPLIANCES.map(a => ({ ...a, count: Math.round(kwhUsed / a.kwh) }))
    .find(a => a.count >= 5 && a.count <= 999) || { name: "kettle boils", count: Math.round(kwhUsed / 0.1) };
  const period = showYearly ? "year" : "month";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
      <div style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg }}>
        <div style={{ fontSize: "0.68rem", color: T.inkFaint, marginBottom: 4 }}>That's roughly</div>
        <div style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 800, color: T.ink }}>{billPct}%</div>
        <div style={{ fontSize: "0.68rem", color: T.inkMid }}>of the avg UK electricity bill</div>
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg }}>
        <div style={{ fontSize: "0.68rem", color: T.inkFaint, marginBottom: 4 }}>Equivalent to</div>
        <div style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 800, color: T.ink }}>{best.count.toLocaleString()}</div>
        <div style={{ fontSize: "0.68rem", color: T.inkMid }}>{best.name} / {period}</div>
      </div>
    </div>
  );
}

// ─── SAVINGS GRAPH ─────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function SavingsGraph({ monthlyKwh, selfConsumption, tariff }) {
  const monthlySavings = monthlyKwh.map(kwh => (kwh * selfConsumption * tariff) / 100);
  const maxSaving = Math.max(...monthlySavings);
  const W = 400, H = 180, PAD_L = 38, PAD_R = 10, PAD_T = 10, PAD_B = 28;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const barW = plotW / 12 - 4;

  // Y-axis ticks
  const niceMax = Math.ceil(maxSaving / 5) * 5 || 5;
  const ticks = [0, Math.round(niceMax / 2), niceMax];

  return (
    <div style={{ marginBottom: 16, padding: "16px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint }}>Monthly saving estimate</span>
        <span style={{ fontSize: "0.65rem", color: T.inkFaint }}>Based on PVGIS data</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {/* Y-axis labels + grid lines */}
        {ticks.map(t => {
          const y = PAD_T + plotH - (t / niceMax) * plotH;
          return (
            <g key={t}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke={T.border} strokeWidth="0.5" />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" fill={T.inkFaint} fontSize="8" fontFamily={T.body}>£{t}</text>
            </g>
          );
        })}
        {/* Bars */}
        {monthlySavings.map((s, i) => {
          const barH = maxSaving > 0 ? (s / niceMax) * plotH : 0;
          const x = PAD_L + (plotW / 12) * i + 2;
          const y = PAD_T + plotH - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx={3} fill={T.solar} opacity={0.85} />
              {/* Value label on tall bars */}
              {barH > 18 && (
                <text x={x + barW / 2} y={y + 12} textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="600" fontFamily={T.display}>
                  £{s.toFixed(0)}
                </text>
              )}
              {/* Month label */}
              <text x={x + barW / 2} y={H - 6} textAnchor="middle" fill={T.inkFaint} fontSize="7.5" fontFamily={T.body}>
                {MONTHS[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: "0.68rem", color: T.inkMid }}>
          Peak: <strong>£{Math.max(...monthlySavings).toFixed(2)}</strong>/mo ({MONTHS[monthlySavings.indexOf(Math.max(...monthlySavings))]})
        </span>
        <span style={{ fontSize: "0.68rem", color: T.inkMid }}>
          Low: <strong>£{Math.min(...monthlySavings).toFixed(2)}</strong>/mo ({MONTHS[monthlySavings.indexOf(Math.min(...monthlySavings))]})
        </span>
      </div>
    </div>
  );
}

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────
function CLabel({ children }) {
  return <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10, fontFamily: T.display }}>{children}</div>;
}
function Divider() {
  return <div style={{ height: 1, background: T.border, margin: "20px 0" }} />;
}
function CChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding: "9px 13px", borderRadius: 8, border: `1.5px solid ${active ? T.solar : T.border}`, background: active ? T.solarLight : T.surface, color: active ? T.solar : T.inkMid, fontSize: "0.8rem", fontWeight: active ? 600 : 400, fontFamily: T.body, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}
function CBadge({ children }) {
  return <span style={{ fontSize: "0.55rem", padding: "2px 5px", borderRadius: 3, background: `${T.solar}20`, color: T.solar, fontWeight: 700, marginLeft: 3 }}>{children}</span>;
}
function RCard({ label, value, sub, hi }) {
  return (
    <div style={{ padding: "16px", borderRadius: 10, border: `1.5px solid ${hi ? T.solarBorder : T.border}`, background: hi ? T.solarLight : T.bg, boxShadow: hi ? `0 2px 12px ${T.solarGlow}` : "none" }}>
      <div style={{ fontFamily: T.display, fontSize: "1.7rem", fontWeight: 800, color: hi ? T.solar : T.ink, lineHeight: 1, marginBottom: 5, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: "0.7rem", color: T.inkFaint, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: "0.62rem", color: T.inkFaint, marginTop: 3, opacity: 0.8 }}>{sub}</div>}
    </div>
  );
}
