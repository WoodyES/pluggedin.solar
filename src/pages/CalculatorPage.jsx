import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import GridDataContext from "../GridDataContext";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PLACEMENTS = [
  { id: "garden",        label: "Garden / roof",        angle: 35, aspect: 0,  icon: "🌿", desc: "Ground-level or roof-mounted panels at optimal tilt" },
  { id: "balcony_south", label: "South-facing balcony",  angle: 90, aspect: 0,  icon: "🏙️", desc: "Vertical panels on a south-facing balcony rail" },
  { id: "balcony_ew",    label: "East / West balcony",   angle: 90, aspect: 90, icon: "↔️", desc: "Vertical panels catching morning or afternoon sun" },
  { id: "flat_roof",     label: "Flat roof / ground",    angle: 20, aspect: 0,  icon: "🏠", desc: "Low-angle mount on a flat surface" },
];
const PANEL_SIZES = [
  { watts: 400, kWp: 0.4, label: "400W", cost: 450, panels: "1 panel", desc: "Good for small balconies or limited space" },
  { watts: 600, kWp: 0.6, label: "600W", cost: 600, panels: "2 panels", desc: "Mid-size — popular in Europe" },
  { watts: 800, kWp: 0.8, label: "800W", cost: 750, panels: "2 panels", max: true, desc: "UK maximum — best value per watt" },
];
const PRESENCE = [
  { id: "home",  label: "Mostly home", sc: 0.75, icon: "🏠", desc: "Working from home, retired, or home during daylight hours" },
  { id: "mixed", label: "In and out",  sc: 0.55, icon: "🔄", desc: "Some days home, some days out — typical for most households" },
  { id: "out",   label: "Mostly out",  sc: 0.35, icon: "💼", desc: "At work 9–5 — appliances run but you're not actively using power" },
];
const SUPPLIERS = [
  { id: "ofgem",  label: "Ofgem cap (default)", rate: 24.50 },
  { id: "oe",     label: "Octopus Flexible",    rate: 24.50 },
  { id: "agile",  label: "Octopus Agile ⚡",    rate: null },
  { id: "bg",     label: "British Gas",          rate: 24.50 },
  { id: "edf",    label: "EDF Energy",           rate: 24.50 },
  { id: "eon",    label: "E.ON Next",            rate: 24.50 },
  { id: "sp",     label: "ScottishPower",        rate: 24.50 },
  { id: "ovo",    label: "Ovo Energy",           rate: 24.50 },
  { id: "manual", label: "Enter manually",       rate: null },
];

const TOTAL_STEPS = 5;

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

  // If URL has full state (postcode + other params), skip straight to results
  // If URL has only a postcode (from homepage mini-calc), skip to step 2
  const p = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const hasFullParams = init.postcode.length >= 4 && p.has("w");
  const hasPostcodeOnly = init.postcode.length >= 4 && !p.has("w");

  const [step, setStep] = useState(hasFullParams ? TOTAL_STEPS + 1 : hasPostcodeOnly ? 2 : 1);
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(null);
  const [pvgisKwh, setPvgisKwh] = useState(null);
  const [monthlyKwh, setMonthlyKwh] = useState(null);
  const [pvgisLoading, setPvgisLoading] = useState(false);
  const [pvgisError, setPvgisError] = useState(null);
  const [panelSize, setPanelSize] = useState(PANEL_SIZES.find(p => p.watts === init.watts) || PANEL_SIZES[2]);
  const [placement, setPlacement] = useState(PLACEMENTS.find(p => p.id === init.placementId) || PLACEMENTS[0]);
  const [presence, setPresence] = useState(PRESENCE.find(p => p.id === init.presenceId) || PRESENCE[1]);
  const [supplier, setSupplier] = useState(SUPPLIERS.find(s => s.id === init.supplierId) || SUPPLIERS[0]);
  const [tariff, setTariff] = useState(init.tariff);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [showYearly, setShowYearly] = useState(true);

  useEffect(() => { if (hasFullParams || hasPostcodeOnly) geocodeAndFetch(init.postcode); }, []);
  useEffect(() => {
    if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect);
  }, [panelSize, placement]);

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
        if (monthly && monthly.length === 12) setMonthlyKwh(monthly.map(m => m.E_m));
        else setMonthlyKwh(null);
      } else throw 0;
    } catch (_) {
      const n = Math.max(0, Math.min(1, (58 - lat) / 8));
      const annual = kWp * (870 + n * 180) * (aspect !== 0 ? 0.82 : (angle >= 80 ? 0.78 : 1.0));
      setPvgisKwh(annual);
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

  function goNext() {
    if (step === 1) {
      geocodeAndFetch(postcodeInput);
      setStep(2);
    } else if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Final step → show results
      if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect);
      setStep(TOTAL_STEPS + 1);
    }
  }

  const annualGen = pvgisKwh || 0;
  const selfConsumed = annualGen * presence.sc;
  const annualSaving = (selfConsumed * tariff) / 100;
  const payback = annualSaving > 0 ? panelSize.cost / annualSaving : 0;
  const lifetime = annualSaving * 15 - panelSize.cost;
  const co2Kg = selfConsumed * 0.207;
  const showResults = step > TOTAL_STEPS && annualGen > 0;
  const tariffPct = ((tariff - 10) / 40) * 100;

  // Can advance from current step?
  const canNext = step === 1 ? postcodeInput.replace(/\s/g, "").length >= 4
    : step <= TOTAL_STEPS;

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Plug-in Solar Savings Calculator"
        description="Calculate your plug-in solar savings with real PVGIS irradiance data for your UK postcode. Compare system sizes, placements, and energy tariffs."
        path="/calculator"
      />
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <SectionLabel>Calculator</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>
          {showResults ? "Your solar savings estimate" : "Plug-in solar savings calculator"}
        </h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 36, lineHeight: 1.6 }}>
          {showResults
            ? `Based on real PVGIS data for ${location?.area || "your postcode"}`
            : "Answer 5 quick questions to get a personalised savings estimate"}
        </p>

        {/* ─── PROGRESS BAR ─── */}
        {!showResults && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: T.inkFaint }}>Step {step} of {TOTAL_STEPS}</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(step / TOTAL_STEPS) * 100}%`, background: T.solar, borderRadius: 2, transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {/* ─── STEP 1: POSTCODE ─── */}
        {step === 1 && (
          <StepCard>
            <StepHeader num={1} title="Where are your panels going?" />
            <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>
              We use your postcode to get real solar irradiance data from the EU&rsquo;s PVGIS satellite system.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
                onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && canNext && goNext()}
                autoFocus
                style={{ flex: 1, padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${location ? T.solarBorder : T.border}`, background: T.bg, color: T.ink, fontSize: "1rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em" }}
              />
            </div>
            {pvgisError && <div style={{ fontSize: "0.75rem", color: T.solar, marginTop: 4 }}>⚠ {pvgisError}</div>}
            {location && <div style={{ fontSize: "0.75rem", color: T.green, marginTop: 4, fontWeight: 500 }}>✓ Found: {location.area}</div>}
          </StepCard>
        )}

        {/* ─── STEP 2: PLACEMENT ─── */}
        {step === 2 && (
          <StepCard>
            <StepHeader num={2} title="Where will you put the panels?" />
            <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>
              Panel angle and direction affect how much sunlight they capture.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {PLACEMENTS.map(p => (
                <OptionCard key={p.id} active={placement.id === p.id} onClick={() => setPlacement(p)}
                  icon={p.icon} label={p.label} desc={p.desc} />
              ))}
            </div>
          </StepCard>
        )}

        {/* ─── STEP 3: PRESENCE ─── */}
        {step === 3 && (
          <StepCard>
            <StepHeader num={3} title="Are you home during the day?" />
            <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>
              Solar panels generate during daylight. The more you use at home, the more you save.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {PRESENCE.map(p => (
                <OptionCard key={p.id} active={presence.id === p.id} onClick={() => setPresence(p)}
                  icon={p.icon} label={p.label} desc={p.desc} />
              ))}
            </div>
          </StepCard>
        )}

        {/* ─── STEP 4: SUPPLIER ─── */}
        {step === 4 && (
          <StepCard>
            <StepHeader num={4} title="Who is your energy supplier?" />
            <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>
              Your tariff determines how much each kWh of solar saves you. All major suppliers are currently at the Ofgem cap.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {SUPPLIERS.map(s => (
                <button key={s.id} onClick={() => pickSupplier(s)}
                  style={{
                    padding: "12px 14px", borderRadius: 10, textAlign: "left",
                    border: `1.5px solid ${supplier.id === s.id ? T.solar : T.border}`,
                    background: supplier.id === s.id ? T.solarLight : T.surface,
                    color: supplier.id === s.id ? T.solar : T.inkMid,
                    fontSize: "0.82rem", fontWeight: supplier.id === s.id ? 600 : 400, fontFamily: T.body,
                    cursor: "pointer",
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
            {supplier.id === "manual" && (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                  <input type="range" min="10" max="50" step="0.5" value={tariff}
                    onChange={e => setTariff(parseFloat(e.target.value))}
                    style={{ flex: 1, background: `linear-gradient(to right,${T.solar} 0%,${T.solar} ${tariffPct}%,${T.border} ${tariffPct}%,${T.border} 100%)`, height: 4, borderRadius: 2, outline: "none" }}
                  />
                  <span style={{ fontFamily: T.display, fontSize: "1.3rem", fontWeight: 800, color: T.solar, minWidth: 54, textAlign: "right" }}>{tariff.toFixed(1)}p</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: T.inkFaint }}>
                  <span>10p</span><span>50p/kWh</span>
                </div>
              </div>
            )}
          </StepCard>
        )}

        {/* ─── STEP 5: SYSTEM SIZE ─── */}
        {step === 5 && (
          <StepCard>
            <StepHeader num={5} title="What system size?" />
            <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>
              The UK regulatory cap is 800W. Bigger systems generate more but cost more upfront.
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {PANEL_SIZES.map(p => (
                <button key={p.watts} onClick={() => setPanelSize(p)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderRadius: 12, cursor: "pointer",
                    border: `1.5px solid ${panelSize.watts === p.watts ? T.solar : T.border}`,
                    background: panelSize.watts === p.watts ? T.solarLight : T.surface,
                    textAlign: "left",
                  }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: panelSize.watts === p.watts ? T.solar : T.bg,
                    color: panelSize.watts === p.watts ? "#fff" : T.inkMid,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: T.display, fontSize: "0.85rem", fontWeight: 800, flexShrink: 0,
                  }}>
                    {p.label}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: "0.95rem", color: panelSize.watts === p.watts ? T.solar : T.ink }}>{p.panels}</span>
                      {p.max && <span style={{ fontSize: "0.55rem", padding: "2px 6px", borderRadius: 3, background: `${T.solar}20`, color: T.solar, fontWeight: 700 }}>UK MAX</span>}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 2 }}>{p.desc}</div>
                    <div style={{ fontSize: "0.72rem", color: T.inkFaint, marginTop: 2 }}>~&pound;{p.cost} estimated kit cost</div>
                  </div>
                </button>
              ))}
            </div>
          </StepCard>
        )}

        {/* ─── NAVIGATION ─── */}
        {!showResults && (
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {step > 1 && (
              <button onClick={() => setStep(step - 1)}
                style={{ padding: "14px 24px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.inkMid, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, cursor: "pointer" }}>
                &larr; Back
              </button>
            )}
            <button onClick={goNext} disabled={!canNext || pvgisLoading}
              style={{
                flex: 1, padding: "14px 24px", borderRadius: 10, border: "none",
                background: canNext && !pvgisLoading ? T.solar : T.border,
                color: canNext && !pvgisLoading ? "#fff" : T.inkFaint,
                fontSize: "0.9rem", fontWeight: 700, fontFamily: T.display, cursor: canNext ? "pointer" : "default",
                boxShadow: canNext && !pvgisLoading ? `0 2px 12px ${T.solarBorder}` : "none",
              }}>
              {pvgisLoading ? "Loading solar data..." : step === TOTAL_STEPS ? "See my savings →" : "Next →"}
            </button>
          </div>
        )}

        {/* ─── RESULTS ─── */}
        {showResults && (
          <div>
            {/* Header + share + edit */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button onClick={() => setStep(1)}
                style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: "transparent", color: T.inkMid, fontSize: "0.72rem", fontFamily: T.body, cursor: "pointer" }}>
                ✎ Edit answers
              </button>
              <button onClick={share} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${copied ? T.green : T.border}`, background: copied ? T.greenLight : "transparent", color: copied ? T.green : T.inkFaint, fontSize: "0.72rem", fontFamily: T.body, cursor: "pointer" }}>
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

            {/* Savings cards */}
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

            {/* Context cards */}
            <ContextCards annualSaving={annualSaving} selfConsumed={selfConsumed} showYearly={showYearly} />

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

            {/* Email capture */}
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
              <div style={{ padding: "18px", borderRadius: 10, border: `1px solid ${T.greenBorder}`, background: T.greenLight, textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✅</div>
                <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink }}>You&rsquo;re on the list</div>
                <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 6 }}>We&rsquo;ll alert you when compliant kits hit UK shops.</div>
              </div>
            )}
          </div>
        )}

        {/* Loading overlay for step 1 → 2 transition */}
        {step > 1 && !showResults && pvgisLoading && (
          <div style={{ textAlign: "center", padding: "20px 0", fontSize: "0.8rem", color: T.inkMid }}>
            Loading solar data for {location?.area || "your area"}...
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link to="/quiz" style={{ padding: "14px 28px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
            Not sure which kit? Take the quiz &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── STEP COMPONENTS ──────────────────────────────────────────────────────
function StepCard({ children }) {
  return (
    <div style={{ padding: "28px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
      {children}
    </div>
  );
}

function StepHeader({ num, title }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontFamily: T.display, fontSize: "1.3rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
    </div>
  );
}

function OptionCard({ active, onClick, icon, label, desc }) {
  return (
    <button onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer",
        border: `1.5px solid ${active ? T.solar : T.border}`,
        background: active ? T.solarLight : T.surface,
        textAlign: "left", width: "100%",
      }}>
      <span style={{ fontSize: "1.5rem", flexShrink: 0, width: 40, textAlign: "center" }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.display, fontWeight: 700, fontSize: "0.9rem", color: active ? T.solar : T.ink }}>{label}</div>
        <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
      </div>
    </button>
  );
}

// ─── CONTEXT CARDS ─────────────────────────────────────────────────────────
const AVG_UK_BILL = 1568;
const APPLIANCES = [
  { name: "washing machine loads", kwh: 1.2 },
  { name: "laptop charges", kwh: 0.05 },
  { name: "EV miles", kwh: 0.3 },
  { name: "kettle boils", kwh: 0.1 },
];

function ContextCards({ annualSaving, selfConsumed, showYearly }) {
  const billPct = ((annualSaving / AVG_UK_BILL) * 100).toFixed(0);
  const kwhUsed = showYearly ? selfConsumed : selfConsumed / 12;
  const best = APPLIANCES.map(a => ({ ...a, count: Math.round(kwhUsed / a.kwh) }))
    .find(a => a.count >= 5 && a.count <= 999) || { name: "kettle boils", count: Math.round(kwhUsed / 0.1) };
  const period = showYearly ? "year" : "month";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
      <div style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg }}>
        <div style={{ fontSize: "0.68rem", color: T.inkFaint, marginBottom: 4 }}>That&rsquo;s roughly</div>
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
  const niceMax = Math.ceil(maxSaving / 5) * 5 || 5;
  const ticks = [0, Math.round(niceMax / 2), niceMax];

  return (
    <div style={{ marginBottom: 16, padding: "16px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint }}>Monthly saving estimate</span>
        <span style={{ fontSize: "0.65rem", color: T.inkFaint }}>Based on PVGIS data</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {ticks.map(t => {
          const y = PAD_T + plotH - (t / niceMax) * plotH;
          return (
            <g key={t}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke={T.border} strokeWidth="0.5" />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" fill={T.inkFaint} fontSize="8" fontFamily={T.body}>£{t}</text>
            </g>
          );
        })}
        {monthlySavings.map((s, i) => {
          const barH = maxSaving > 0 ? (s / niceMax) * plotH : 0;
          const x = PAD_L + (plotW / 12) * i + 2;
          const y = PAD_T + plotH - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx={3} fill={T.solar} opacity={0.85} />
              {barH > 18 && (
                <text x={x + barW / 2} y={y + 12} textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="600" fontFamily={T.display}>
                  £{s.toFixed(0)}
                </text>
              )}
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
function RCard({ label, value, sub, hi }) {
  return (
    <div style={{ padding: "16px", borderRadius: 10, border: `1.5px solid ${hi ? T.solarBorder : T.border}`, background: hi ? T.solarLight : T.bg, boxShadow: hi ? `0 2px 12px ${T.solarGlow}` : "none" }}>
      <div style={{ fontFamily: T.display, fontSize: "1.7rem", fontWeight: 800, color: hi ? T.solar : T.ink, lineHeight: 1, marginBottom: 5, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: "0.7rem", color: T.inkFaint, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: "0.62rem", color: T.inkFaint, marginTop: 3, opacity: 0.8 }}>{sub}</div>}
    </div>
  );
}
