import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import PanelFinderQuiz from "../components/PanelFinderQuiz";

// ─── CALCULATOR DATA ────────────────────────────────────────────────────────
const PLACEMENTS = [
  { id: "garden",        label: "Garden / roof",        angle: 35, aspect: 0,  icon: "\uD83C\uDF3F" },
  { id: "balcony_south", label: "South balcony",        angle: 90, aspect: 0,  icon: "\uD83C\uDFD9\uFE0F" },
  { id: "balcony_ew",    label: "East / West balcony",  angle: 90, aspect: 90, icon: "\u2194\uFE0F" },
  { id: "flat_roof",     label: "Flat roof / ground",   angle: 20, aspect: 0,  icon: "\uD83C\uDFE0" },
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
  { id: "agile",  label: "Octopus Agile \u26A1",rate: null },
  { id: "bg",     label: "British Gas",         rate: 24.50 },
  { id: "edf",    label: "EDF Energy",          rate: 24.50 },
  { id: "eon",    label: "E.ON Next",           rate: 24.50 },
  { id: "sp",     label: "ScottishPower",       rate: 24.50 },
  { id: "ovo",    label: "Ovo Energy",          rate: 24.50 },
  { id: "manual", label: "Enter manually",      rate: null },
];
const FAQ_ITEMS = [
  { q: "Is plug-in solar legal in the UK?",
    a: "Not quite yet \u2014 but it will be very soon. The government confirmed on 15 March 2026 that it will legalise plug-in solar. The wiring regulations (BS 7671 Amendment 4) were updated on 15 April 2026 to enable the framework, but compliant products cannot legally be connected until the BSI publishes the product standard \u2014 expected around July 2026. Until then, connecting a kit to your ring main is technically non-compliant. The calculator gives you accurate savings projections so you\u2019re ready to buy the moment kits are available." },
  { q: "Do I need an electrician?",
    a: "No. Once compliant kits are on sale, you plug the inverter cable into a standard 13A socket. You do need to notify your Distribution Network Operator (DNO) within 28 days under G98 rules \u2014 but that\u2019s a simple online form, not a site visit." },
  { q: "Can I install this if I rent?",
    a: "Plug-in solar is specifically designed for renters and flat-dwellers who can\u2019t access their roof. The panels attach to a balcony rail or sit in a garden, and you take them when you move. Most standard ASTs don\u2019t prohibit temporary external fixtures." },
  { q: "What\u2019s the payback period?",
    a: "Typically 4\u20136 years for an 800W system in southern England at the Ofgem Q2 2026 cap (24.5p/kWh). The Carbon Brief analysis puts 15-year net savings at ~\u00A31,100 for a typical London household." },
  { q: "Can I get paid for electricity I export?",
    a: "Yes, but at much lower rates. The Smart Export Guarantee (SEG) pays ~3\u20136p per kWh exported, versus 24p+ to import. Maximise savings by using solar when it\u2019s generating \u2014 fridges, routers, and always-on devices are ideal." },
  { q: "What size system should I buy?",
    a: "800W is the UK regulatory cap and best value. Smaller 400W systems work if you have limited space. Use the calculator to compare payback periods for your postcode and placement." },
];

// ─── SHARE URL ──────────────────────────────────────────────────────────────
function encodeCalcState(s) {
  const p = new URLSearchParams({ pc: s.postcode, w: s.watts, pl: s.placementId, pr: s.presenceId, t: s.tariff.toFixed(2), su: s.supplierId });
  return `${window.location.origin}${window.location.pathname}?${p}`;
}
function decodeCalcState() {
  const p = new URLSearchParams(window.location.search);
  return { postcode: p.get("pc") || "", watts: parseInt(p.get("w")) || 800, placementId: p.get("pl") || "garden", presenceId: p.get("pr") || "mixed", tariff: parseFloat(p.get("t")) || 24.50, supplierId: p.get("su") || "ofgem" };
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
export default function HomePage({ gridData }) {
  return (
    <>
      <Hero gridData={gridData} />
      <WhyNow />
      <ForWho />
      <QuizSection />
      <CalculatorSection gridData={gridData} />
      <HowItWorks />
      <FAQSection />
    </>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero({ gridData }) {
  const [pc, setPC] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function quickCalc(postcode) {
    if (postcode.replace(/\s/g, "").length < 4) return;
    setLoading(true); setErr(null);
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, "")}`);
      const json = await r.json();
      if (json.status !== 200) { setErr("Postcode not found \u2014 try the full calculator below"); setLoading(false); return; }
      const { latitude: lat, longitude: lon, admin_district } = json.result;
      try {
        const pr = await fetch(`https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=0.8&loss=14&outputformat=json&mountingplace=free&angle=35&aspect=0`);
        const pj = await pr.json();
        const kwh = pj.outputs?.totals?.fixed?.E_y || (0.8 * (870 + Math.max(0, Math.min(1, (58 - lat) / 8)) * 180));
        setResult({ area: admin_district || postcode.toUpperCase(), saving: Math.round(kwh * 0.55 * 24.50 / 100), kwh: Math.round(kwh) });
      } catch (_) {
        const kwh = 0.8 * (870 + Math.max(0, Math.min(1, (58 - lat) / 8)) * 180);
        setResult({ area: admin_district || postcode.toUpperCase(), saving: Math.round(kwh * 0.55 * 24.50 / 100), kwh: Math.round(kwh) });
      }
    } catch (_) { setErr("Could not look up postcode \u2014 check your connection"); }
    setLoading(false);
  }

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "110px 32px 70px", position: "relative", overflow: "hidden", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ position: "absolute", top: "0%", right: "-5%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle,${T.solarLight} 0%,transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-12%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle,${T.skyLight} 0%,transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {gridData && (
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: T.surface, marginBottom: 32, fontSize: "0.78rem", color: T.inkMid, fontWeight: 500, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, animation: "pulse 2s infinite", flexShrink: 0 }} />
            Solar providing <span style={{ color: T.solar, fontWeight: 700, margin: "0 3px" }}>{gridData.solar.toFixed(1)}%</span> of UK electricity right now
          </div>
        )}

        <h1 className="fu1" style={{ fontFamily: T.display, fontSize: "clamp(2.8rem,6vw,4.6rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24, maxWidth: 800 }}>
          Plug-in solar is coming
          <br />to the UK{" "}
          <span style={{ color: T.solar, display: "inline-block", position: "relative" }}>
            this summer.
            <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 6, overflow: "visible" }} viewBox="0 0 200 6" preserveAspectRatio="none">
              <path d="M0,5 Q50,1 100,4 Q150,7 200,3" stroke={T.solarBright} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
          </span>
          <br />
          <span style={{ color: T.inkMid, fontWeight: 600 }}>How much will you save?</span>
        </h1>

        <p className="fu2" style={{ fontSize: "1.05rem", color: T.inkMid, lineHeight: 1.75, marginBottom: 44, maxWidth: 540, fontWeight: 300 }}>
          The UK government confirmed it in March 2026. Compliant kits are expected in shops around July 2026. No roof needed, no electrician, no landlord sign-off &mdash; just panels on your balcony or garden, plugged into a standard socket.
        </p>

        <div className="fu3" style={{ maxWidth: 500 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <input type="text" placeholder="Enter your postcode\u2026" value={pc}
              onChange={e => setPC(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && quickCalc(pc)}
              style={{ flex: 1, padding: "15px 18px", borderRadius: 10, border: `1.5px solid ${result ? T.solarBorder : T.border}`, background: T.surface, color: T.ink, fontSize: "1rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            />
            <button onClick={() => quickCalc(pc)} disabled={loading}
              style={{ padding: "15px 26px", borderRadius: 10, border: "none", background: loading ? T.border : T.solar, color: loading ? T.inkFaint : "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, whiteSpace: "nowrap", boxShadow: loading ? "none" : `0 2px 16px ${T.solarBorder}` }}>
              {loading ? "\u27F3" : "Show saving \u2192"}
            </button>
          </div>

          {err && <div style={{ fontSize: "0.8rem", color: T.red, marginBottom: 12 }}>\u26A0 {err}</div>}

          {result && (
            <div className="fu" style={{ padding: "20px 24px", borderRadius: 12, border: `1.5px solid ${T.solarBorder}`, background: T.surface, display: "flex", gap: 24, alignItems: "center", boxShadow: `0 4px 24px ${T.solarGlow}` }}>
              <div>
                <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: T.solar, lineHeight: 1 }}>&pound;{result.saving}</div>
                <div style={{ fontSize: "0.75rem", color: T.inkFaint, marginTop: 4, fontWeight: 500 }}>estimated annual saving</div>
              </div>
              <div style={{ width: 1, background: T.border, alignSelf: "stretch" }} />
              <div>
                <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: T.ink, lineHeight: 1 }}>{result.kwh}</div>
                <div style={{ fontSize: "0.75rem", color: T.inkFaint, marginTop: 4, fontWeight: 500 }}>kWh/yr &middot; {result.area}</div>
              </div>
              <Link to="/calculator" style={{ marginLeft: "auto", padding: "10px 18px", borderRadius: 8, background: T.ink, color: "#fff", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", fontFamily: T.display }}>
                Full report &darr;
              </Link>
            </div>
          )}
        </div>

        <div className="fu4" style={{ display: "flex", gap: 24, marginTop: 48, alignItems: "center", flexWrap: "wrap" }}>
          {["Confirmed by government March 2026", "Kits expected July 2026", "PVGIS irradiance data", "Live UK grid stats"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: T.inkFaint, fontWeight: 400 }}>
              <span style={{ color: T.green, fontSize: "0.85rem" }}>\u2713</span>{s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY NOW ────────────────────────────────────────────────────────────────
function WhyNow() {
  const stats = [
    { num: "Mar 2026", label: "Confirmed",   sub: "Government announced the framework \u00B7 15 March 2026", accent: T.green },
    { num: "~\u00A3500",    label: "Typical cost", sub: "800W kit \u00B7 no installer \u00B7 no wiring required",       accent: T.solar },
    { num: "\u00A31,100",   label: "15-yr saving", sub: "Carbon Brief analysis \u00B7 typical London household",   accent: T.sky },
  ];
  return (
    <section style={{ padding: "80px 32px", background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Why now</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "36px 32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bg, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${s.accent},${s.accent}00)`, borderRadius: "16px 16px 0 0" }} />
              <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: s.accent, lineHeight: 1, marginBottom: 12, letterSpacing: "-0.02em" }}>{s.num}</div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: T.ink, marginBottom: 8, fontFamily: T.display }}>{s.label}</div>
              <div style={{ fontSize: "0.82rem", color: T.inkMid, lineHeight: 1.55 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 36, fontSize: "0.9rem", color: T.inkMid, lineHeight: 1.8, maxWidth: 640 }}>
          Germany simplified its plug-in solar rules in 2024. Within 12 months, over 1.2 million households had a kit. The UK announcement follows the same path &mdash; once the BSI publishes the product standard (expected July 2026), compliant kits will start appearing in Lidl, Sainsbury&rsquo;s, and Amazon. Use the calculator now to understand exactly what your saving will look like before you buy.
        </p>
      </div>
    </section>
  );
}

// ─── FOR WHO ────────────────────────────────────────────────────────────────
function ForWho() {
  const groups = [
    { icon: "\uD83C\uDFE2", title: "Renters",       body: "4.6 million privately rented households in England. Traditional solar requires a landlord, a roof, and \u00A310,000+. Plug-in needs none of those \u2014 and when kits arrive in shops, you can take yours with you when you move." },
    { icon: "\uD83C\uDFD9\uFE0F", title: "Flat-dwellers", body: "380,000+ homes in England have a balcony. The plan: clip panels to your railings, plug into a standard socket, start generating. No structural modifications, no planning permission, no landlord approval needed." },
    { icon: "\uD83C\uDFE1", title: "Homeowners too", body: "Already have roof solar? A balcony kit will cover your base load \u2014 fridge, router, standby devices \u2014 maximising the value of every watt you generate throughout the day." },
  ];
  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Who is this for</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 40 }}>
          {groups.map((g, i) => (
            <div key={i} style={{ padding: "32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 18 }}>{g.icon}</div>
              <div style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 700, color: T.ink, marginBottom: 12, letterSpacing: "-0.01em" }}>{g.title}</div>
              <div style={{ fontSize: "0.85rem", color: T.inkMid, lineHeight: 1.75 }}>{g.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── QUIZ SECTION (embedded) ────────────────────────────────────────────────
function QuizSection() {
  return (
    <section id="quiz" style={{ padding: "80px 32px", background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Find your kit</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Not sure which kit is right for you?</h2>
            <p style={{ color: T.inkMid, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 24 }}>
              Answer 5 quick questions about your space, orientation, and budget. We&rsquo;ll recommend the best plug-in solar kit for your setup &mdash; with two alternatives to compare.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "\uD83D\uDCCD", text: "Installation location" },
                { icon: "\uD83E\uDDED", text: "Panel orientation" },
                { icon: "\uD83D\uDCCF", text: "Available space" },
                { icon: "\uD83D\uDD0B", text: "Battery preference" },
                { icon: "\uD83D\uDCB7", text: "Budget range" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: T.inkMid }}>
                  <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                  {s.text}
                </div>
              ))}
            </div>
            <Link to="/quiz" style={{ display: "inline-block", marginTop: 28, padding: "12px 24px", borderRadius: 10, background: T.ink, color: "#fff", fontSize: "0.85rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
              Take the full quiz &rarr;
            </Link>
          </div>
          <div style={{ padding: "28px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bg }}>
            <PanelFinderQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR SECTION ─────────────────────────────────────────────────────
function CalculatorSection({ gridData }) {
  return (
    <section id="calculator" style={{ padding: "60px 32px 80px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Calculator</SectionLabel>
        <h2 style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>See what you&rsquo;ll save before kits go on sale</h2>
        <p style={{ color: T.inkMid, fontSize: "0.9rem", marginBottom: 40, lineHeight: 1.6 }}>Real PVGIS irradiance for your exact postcode &middot; Live UK grid data &middot; Shareable results link &mdash; so you&rsquo;re ready the moment compliant kits land in shops</p>
        <Calculator gridData={gridData} />
      </div>
    </section>
  );
}

// ─── FULL CALCULATOR ────────────────────────────────────────────────────────
function Calculator({ gridData }) {
  const init = decodeCalcState();
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(null);
  const [pvgisKwh, setPvgisKwh] = useState(null);
  const [pvgisLoading, setPvgisLoading] = useState(false);
  const [pvgisError, setPvgisError] = useState(null);
  const [panelSize, setPanelSize] = useState(PANEL_SIZES.find(p => p.watts === init.watts) || PANEL_SIZES[2]);
  const [placement, setPlacement] = useState(PLACEMENTS.find(p => p.id === init.placementId) || PLACEMENTS[0]);
  const [presence, setPresence] = useState(PRESENCE.find(p => p.id === init.presenceId) || PRESENCE[1]);
  const [supplier, setSupplier] = useState(SUPPLIERS.find(s => s.id === init.supplierId) || SUPPLIERS[0]);
  const [tariff, setTariff] = useState(init.tariff);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (init.postcode) geocodeAndFetch(init.postcode); }, []);
  useEffect(() => { if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect); }, [panelSize, placement]);

  async function geocodeAndFetch(pc) {
    const clean = pc.replace(/\s/g, "").toUpperCase();
    if (clean.length < 4) return;
    setPvgisError(null);
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const j = await r.json();
      if (j.status !== 200) { setPvgisError("Postcode not found \u2014 please check it."); return; }
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
      if (kwh) setPvgisKwh(kwh); else throw 0;
    } catch (_) {
      const n = Math.max(0, Math.min(1, (58 - lat) / 8));
      setPvgisKwh(kWp * (870 + n * 180) * (aspect !== 0 ? 0.82 : (angle >= 80 ? 0.78 : 1.0)));
      setPvgisError("Latitude estimate used \u2014 PVGIS temporarily unavailable.");
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
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      {/* LEFT \u2014 inputs */}
      <div style={{ padding: "32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bg }}>
        <CLabel>Your postcode</CLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
            onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && geocodeAndFetch(postcodeInput)}
            style={{ flex: 1, padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${location ? T.solarBorder : T.border}`, background: T.surface, color: T.ink, fontSize: "0.95rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          />
          <button onClick={() => geocodeAndFetch(postcodeInput)} disabled={pvgisLoading}
            style={{ padding: "12px 18px", borderRadius: 9, border: "none", background: pvgisLoading ? T.border : T.solar, color: pvgisLoading ? T.inkFaint : "#fff", fontWeight: 700, fontFamily: T.display, boxShadow: pvgisLoading ? "none" : `0 2px 10px ${T.solarBorder}` }}>
            {pvgisLoading ? "\u27F3" : "Go"}
          </button>
        </div>
        {location && <div style={{ fontSize: "0.75rem", color: T.green, marginBottom: 4, fontWeight: 500 }}>\u2713 PVGIS data loaded for {location.area}</div>}
        {pvgisError && <div style={{ fontSize: "0.75rem", color: T.solar, marginBottom: 4 }}>\u26A0 {pvgisError}</div>}

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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {PLACEMENTS.map(p => (
            <CChip key={p.id} active={placement.id === p.id} onClick={() => setPlacement(p)}>{p.icon} {p.label}</CChip>
          ))}
        </div>

        <CLabel>Home during the day?</CLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {PRESENCE.map(p => (
            <CChip key={p.id} active={presence.id === p.id} onClick={() => setPresence(p)}>{p.label}</CChip>
          ))}
        </div>

        <CLabel>Supplier &middot; Ofgem Q2 2026 &middot; <a href="https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" target="_blank" rel="noreferrer" style={{ color: T.sky }}>verify &nearr;</a></CLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
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
          <span style={{ fontFamily: T.display, fontSize: "1.3rem", fontWeight: 800, color: T.solar, minWidth: 54, textAlign: "right", letterSpacing: "-0.02em" }}>{tariff.toFixed(1)}p</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: T.inkFaint }}>
          <span>10p</span><span>50p/kWh</span>
        </div>
      </div>

      {/* RIGHT \u2014 results */}
      <div style={{ padding: "32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        {!hasResults ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "60px 20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: T.solarLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>\uD83D\uDCCD</div>
            <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, lineHeight: 1.5 }}>Enter your postcode to see your estimate</div>
            <div style={{ fontSize: "0.78rem", color: T.inkFaint, lineHeight: 1.6 }}>Real PVGIS irradiance &mdash; no two postcodes are identical</div>
          </div>
        ) : (
          <div className="fi">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: T.ink }}>{location?.area}</span>
              <button onClick={share} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${copied ? T.green : T.border}`, background: copied ? T.greenLight : "transparent", color: copied ? T.green : T.inkFaint, fontSize: "0.72rem", fontFamily: T.body }}>
                {copied ? "\u2713 Copied" : "\u2B06 Share"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <RCard label="Annual generation" value={`${annualGen.toFixed(0)} kWh`} sub="PVGIS \u00B7 your postcode" hi />
              <RCard label="Annual saving" value={`\u00A3${annualSaving.toFixed(0)}`} sub={`at ${tariff.toFixed(1)}p/kWh`} hi />
              <RCard label="Payback period" value={`${payback.toFixed(1)} yrs`} />
              <RCard label="CO\u2082 offset / yr" value={`${co2Kg.toFixed(0)} kg`} sub="207g/kWh \u00B7 DESNZ" />
            </div>

            <div style={{ padding: "20px", borderRadius: 12, background: lifetime > 0 ? T.greenLight : T.redLight, border: `1.5px solid ${lifetime > 0 ? T.greenBorder : "rgba(220,38,38,0.18)"}`, textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>15-year net saving after &pound;{panelSize.cost} system cost</div>
              <div style={{ fontFamily: T.display, fontSize: "3rem", fontWeight: 800, color: lifetime > 0 ? T.green : T.red, lineHeight: 1, letterSpacing: "-0.03em" }}>
                {lifetime >= 0 ? "+" : ""}&pound;{Math.abs(lifetime).toFixed(0)}
              </div>
              <div style={{ fontSize: "0.72rem", color: T.inkFaint, marginTop: 8 }}>Based on constant {tariff.toFixed(1)}p tariff</div>
            </div>

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

            {!submitted ? (
              <div style={{ padding: "18px", borderRadius: 10, border: `1.5px solid ${T.solarBorder}`, background: T.solarLight }}>
                <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, marginBottom: 6 }}>Get the full report</div>
                <p style={{ fontSize: "0.75rem", color: T.inkMid, lineHeight: 1.6, marginBottom: 14 }}>Kit picks &middot; DNO walkthrough &middot; Alert when compliant kits land in UK shops (July 2026).</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email && setSubmitted(true)}
                    style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.85rem", outline: "none", fontFamily: T.body }}
                  />
                  <button onClick={() => email && setSubmitted(true)}
                    style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: T.solar, color: "#fff", fontWeight: 700, fontSize: "0.82rem", fontFamily: T.display, whiteSpace: "nowrap", boxShadow: `0 2px 8px ${T.solarBorder}` }}>
                    Send &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="fu" style={{ padding: "18px", borderRadius: 10, border: `1px solid ${T.greenBorder}`, background: T.greenLight, textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>\u2705</div>
                <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink }}>You&rsquo;re on the list</div>
                <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 6 }}>We&rsquo;ll alert you when compliant kits hit UK shops.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HOW IT WORKS ───────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "01", title: "Buy a compliant kit",         body: "Once the BSI product standard is published (expected July 2026), compliant kits will be available from EcoFlow, Amazon, Lidl, and others. Expect to pay \u00A3500\u2013\u00A3750 for an 800W system." },
    { n: "02", title: "Install it yourself",          body: "Mount on your balcony rail, flat roof, or garden. South-facing at ~35\u00B0 is ideal, but east/west works well. No tools, no trades." },
    { n: "03", title: "Plug in and notify your DNO",  body: "Connect the cable to a standard 13A socket. Notify your Distribution Network Operator within 28 days via a simple online form \u2014 G98 rules." },
  ];
  return (
    <section id="how-it-works" style={{ padding: "80px 32px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>How it works</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, marginTop: 48 }}>
          {steps.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: T.display, fontSize: "3.5rem", fontWeight: 800, color: T.borderFaint, lineHeight: 1, marginBottom: 20, letterSpacing: "-0.03em" }}>{s.n}</div>
              <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, marginBottom: 12, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{s.title}</div>
              <div style={{ fontSize: "0.875rem", color: T.inkMid, lineHeight: 1.75 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "80px 32px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>FAQ</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, borderRadius: 16, overflow: "hidden", marginTop: 40 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ background: T.surface }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "22px 26px", background: "transparent", border: "none", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, fontFamily: T.body }}>
                <span style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: open === i ? T.solar : T.ink, lineHeight: 1.4, flex: 1, letterSpacing: "-0.01em" }}>{item.q}</span>
                <span style={{ color: open === i ? T.solar : T.inkFaint, fontSize: "1.3rem", lineHeight: 1, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s ease" }}>+</span>
              </button>
              {open === i && (
                <div className="fu" style={{ padding: "0 26px 22px", fontSize: "0.85rem", color: T.inkMid, lineHeight: 1.8 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHARED PRIMITIVES ──────────────────────────────────────────────────────
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
