import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import PanelFinderQuiz from "../components/PanelFinderQuiz";
import SEO from "../components/SEO";
import GridDataContext from "../GridDataContext";
import { useMarket } from "../MarketContext";

// ─── MARKET-SPECIFIC COPY ────────────────────────────────────────────────────
const MARKET_COPY = {
  uk: {
    heroH1a: "Plug-in solar is legal",
    heroH1b: "in the UK.",
    heroSub: "SI 2026 No. 848 came into force this morning, making plug-in solar legal in the UK. EcoFlow STREAM kits are on sale from today at B&Q, Currys, Amazon and Screwfix. No roof needed, no electrician, no landlord sign-off — just panels on your balcony or garden, plugged into a standard 13A socket.",
    heroCTA: "Read the gov.uk announcement →",
    heroCTAUrl: "https://www.gov.uk/government/news/government-to-make-plug-in-solar-available-within-months",
    bullets: ["Now legal in the UK", "EcoFlow STREAM kits on sale today", "PVGIS irradiance data", "Live UK grid stats"],
    showTimeline: true,
    calcSubtitle: "Real PVGIS irradiance for your exact postcode · Live UK grid data · Shareable results link — plug-in solar is legal in the UK, with EcoFlow STREAM kits stocked at B&Q, Currys, Amazon and Screwfix",
    calcHeading: "Calculate your savings — kits on sale from today",
    postcodeLabel: "Enter your postcode...",
    postcodePlaceholder: "e.g. BN1 1AA",
    tariffRate: 24.5,
    tariffLabel: "24.5p/kWh",
    currency: "£",
  },
  us: {
    heroH1a: "Plug-in solar in the US",
    heroH1b: "— quietly, already.",
    heroSub: "Small plug-in solar systems occupy a grey area of US electrical code. Article 705 (UL 1741 inverters, 120V branch circuits) doesn't neatly cover them, but thousands of homeowners run 200-800W kits with utility notification. Here's what's legal in your state, which kits ship UL-listed, and how much you'd save.",
    heroCTA: "See how US plug-in solar works →",
    heroCTAUrl: "/us/blog",
    bullets: ["UL-listed inverters", "State-by-state guidance", "NREL PVWatts data", "Real utility rates"],
    showTimeline: false,
    calcSubtitle: "Real NREL PVWatts irradiance for your ZIP · Utility-rate lookup · Shareable results — plug-in solar is a grey area in most US states but works with the right kit and utility notification",
    calcHeading: "Calculate your savings",
    postcodeLabel: "Enter your ZIP code...",
    postcodePlaceholder: "e.g. 94103",
    tariffRate: 16.5,
    tariffLabel: "16.5¢/kWh",
    currency: "$",
  },
  au: {
    heroH1a: "Plug-in solar in Australia",
    heroH1b: "— what actually ships.",
    heroSub: "Australia's AS/NZS 4777 rules require grid-connected inverters to be CEC-approved and installed by a licensed electrician. Plug-in systems technically fall outside that framework, but portable and off-grid setups are widely used. Here's what's compliant, what's tolerated, and what's genuinely off-grid.",
    heroCTA: "See how AU plug-in solar works →",
    heroCTAUrl: "/au/blog",
    bullets: ["CEC-approved options", "AS/NZS 4777 explained", "PVGIS irradiance", "Real AU tariffs"],
    showTimeline: false,
    calcSubtitle: "Real PVGIS irradiance for your postcode · CEC-approved kit shortlist · Shareable results — Australia's AS/NZS 4777 rules are stricter than the UK's, but portable and off-grid kits are widely used",
    calcHeading: "Calculate your savings",
    postcodeLabel: "Enter your postcode...",
    postcodePlaceholder: "e.g. 2000",
    tariffRate: 33.0,
    tariffLabel: "33c/kWh",
    currency: "A$",
  },
};

// ─── CALCULATOR DATA ────────────────────────────────────────────────────────
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

// Per-market calculator config: suppliers, tariff defaults, currency and geocoding.
// PVGIS covers UK, US and AU natively (ERA5 satellite dataset), so we keep it for all
// three markets. Only the geocoding layer, tariff labels and currency change.
const MARKET_CALC = {
  uk: {
    suppliers: SUPPLIERS,
    tariffDefault: 24.5, tariffMin: 10, tariffMax: 50,
    currency: "£", subUnit: "p", tariffNote: "Ofgem Q2 2026",
    postcodeLabel: "Your postcode", postcodePlaceholder: "e.g. BN1 1AA",
    postcodeVerifyLabel: "verify", postcodeVerifyUrl: "https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you",
    inputLabel: "Enter your postcode...",
  },
  us: {
    suppliers: [
      { id: "avg",  label: "US average",     rate: 16.5 },
      { id: "ca",   label: "California avg", rate: 27.0 },
      { id: "hi",   label: "Hawaii avg",     rate: 39.0 },
      { id: "ny",   label: "New York avg",   rate: 22.0 },
      { id: "ma",   label: "Massachusetts",  rate: 24.5 },
      { id: "tx",   label: "Texas avg",      rate: 14.5 },
      { id: "fl",   label: "Florida avg",    rate: 14.0 },
      { id: "manual", label: "Enter manually", rate: null },
    ],
    tariffDefault: 16.5, tariffMin: 8, tariffMax: 50,
    currency: "$", subUnit: "¢", tariffNote: "EIA 2026",
    postcodeLabel: "Your ZIP code", postcodePlaceholder: "e.g. 94103",
    postcodeVerifyLabel: "EIA rates", postcodeVerifyUrl: "https://www.eia.gov/electricity/state/",
    inputLabel: "Enter your ZIP code...",
  },
  au: {
    suppliers: [
      { id: "avg", label: "AU peak avg",     rate: 33.0 },
      { id: "nsw", label: "NSW average",     rate: 34.0 },
      { id: "vic", label: "Victoria avg",    rate: 31.0 },
      { id: "qld", label: "Queensland avg",  rate: 27.0 },
      { id: "sa",  label: "South Australia", rate: 41.0 },
      { id: "wa",  label: "WA average",      rate: 30.0 },
      { id: "tas", label: "Tasmania avg",    rate: 29.0 },
      { id: "manual", label: "Enter manually", rate: null },
    ],
    tariffDefault: 33.0, tariffMin: 15, tariffMax: 60,
    currency: "A$", subUnit: "c", tariffNote: "AER 2026",
    postcodeLabel: "Your postcode", postcodePlaceholder: "e.g. 2000",
    postcodeVerifyLabel: "AER prices", postcodeVerifyUrl: "https://www.aer.gov.au/consumers/energy-prices",
    inputLabel: "Enter your postcode...",
  },
};

// Geocoding: UK stays on postcodes.io (best accuracy). US + AU use zippopotam.us
// (free, no key, covers both). All return { lat, lon, area }.
async function geocodeUK(pc) {
  const clean = pc.replace(/\s/g, "").toUpperCase();
  if (clean.length < 4) throw new Error("too short");
  const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
  const j = await r.json();
  if (j.status !== 200) throw new Error("not found");
  return { lat: j.result.latitude, lon: j.result.longitude, area: j.result.admin_district || clean };
}
async function geocodeZip(pc, country) {
  const clean = pc.replace(/\s/g, "");
  const r = await fetch(`https://api.zippopotam.us/${country}/${clean}`);
  if (!r.ok) throw new Error("not found");
  const j = await r.json();
  const p = j.places?.[0];
  if (!p) throw new Error("not found");
  return {
    lat: parseFloat(p.latitude),
    lon: parseFloat(p.longitude),
    area: `${p["place name"] || clean}${p["state abbreviation"] ? ", " + p["state abbreviation"] : ""}`,
  };
}
const MARKET_FAQ = {
  uk: [
    { q: "Is plug-in solar legal in the UK?",
      a: "Yes — as of 27 August 2026, SI 2026 No. 848 permits 'plug-in microgenerators' in UK homes. Compliant kits must meet the DESNZ Interim Product Specification: max 800VA / 3.5A output, BS 1363 plug with 5A fuse, no battery in the plug circuit, and no extension leads. B&Q, Currys, Amazon and Screwfix stock UKCA-compliant kits." },
    { q: "Do I need an electrician?",
      a: "No. You plug the inverter cable into a standard 13A socket. You do need to notify your Distribution Network Operator (DNO) within 28 days under G98 rules — but that's a simple online form, not a site visit." },
    { q: "Can I install this if I rent?",
      a: "Plug-in solar is specifically designed for renters and flat-dwellers who can't access their roof. Panels attach to a balcony rail or sit in a garden, and you take the kit when you move. Most standard ASTs don't prohibit temporary external fixtures." },
    { q: "What's the payback period?",
      a: "Typically 4–6 years for an 800W system in southern England at the Ofgem cap (24.5p/kWh). Carbon Brief modelling puts 15-year net savings at ~£1,100 for a typical London household." },
    { q: "Can I get paid for electricity I export?",
      a: "Yes, but at much lower rates. The Smart Export Guarantee (SEG) pays ~4–15p per kWh exported, versus 24.5p to import. Maximise savings by using solar as it generates — fridges, routers, and always-on devices are ideal." },
    { q: "What size system should I buy?",
      a: "800W is the UK regulatory cap and best value. Smaller 400W systems work if you have limited space. Use the calculator to compare payback periods for your postcode and placement." },
  ],
  us: [
    { q: "Is plug-in solar legal in the US?",
      a: "It's a grey area. NEC Article 705 governs grid interconnection, and most utility interconnection agreements require UL 1741-listed inverters and an approved installer. Small plug-in systems (200–800W) using UL-listed inverters are widely used but may still require utility notification — check your specific utility's tariff and interconnection rules." },
    { q: "Do I need an electrician?",
      a: "For a UL 1741-listed plug-in inverter feeding a dedicated branch circuit, no. But many utilities require a licensed electrician to sign off on any grid-tied installation. Off-grid setups (charging a battery, not backfeeding the grid) avoid this entirely." },
    { q: "Can I install this if I rent?",
      a: "Portable and battery-based systems are ideal — panels sit on a balcony or in a window, feed a portable power station, and you take everything when you move. Grid-tied plug-in kits are trickier for renters; check with your landlord and utility first." },
    { q: "What's the payback period?",
      a: "Highly state-dependent. Payback runs from about 3 years (California, Hawaii, high-tariff states) to 8+ years (low-tariff states like Louisiana). Use the calculator to model your ZIP." },
    { q: "Can I get paid for electricity I export?",
      a: "Only under net metering or net billing arrangements, which vary by state and utility. Most plug-in setups do not qualify. Focus on self-consumption — running loads when the sun is up gives you the full retail-rate offset." },
    { q: "What size system should I buy?",
      a: "Match to your daytime base load. A 400W kit covers fridges, routers, and standby loads for most homes. 800W kits are worth it if you're home during the day or run a home office. Larger than 800W generally needs a full utility interconnection." },
  ],
  au: [
    { q: "Is plug-in solar legal in Australia?",
      a: "Grid-connected inverters in Australia must be CEC-approved under AS/NZS 4777, and installation requires a licensed electrician. Plug-and-play grid-tied systems technically fall outside this framework. Off-grid systems (portable batteries, camping/shed setups) are common and legal." },
    { q: "Do I need an electrician?",
      a: "For any grid-tied installation, yes — AS/NZS 4777 requires a licensed installer for connection to your home's wiring. For off-grid or portable battery setups that don't backfeed the grid, no." },
    { q: "Can I install this if I rent?",
      a: "Portable, battery-based setups are the easiest fit — a panel plus an EcoFlow or Anker power station gives you daytime capture without touching the property's wiring. Grid-tied plug-in isn't practical for renters under current AU rules." },
    { q: "What's the payback period?",
      a: "For a small portable/off-grid setup, payback depends on how much peak-time consumption you displace. At ~33c/kWh evening rates, an 800W setup with a battery can pay back in 3–5 years for a household with high peak evening use." },
    { q: "Can I get paid for electricity I export?",
      a: "Feed-in tariffs (FiTs) apply only to CEC-approved installations. Plug-in and off-grid setups don't qualify — the value is in self-consumption. Solar Sponge tariffs (cheap daytime rates) are worth combining with battery arbitrage." },
    { q: "What size system should I buy?",
      a: "For portable/off-grid, sizing depends on your target loads. 200–400W plus a 1kWh battery covers a fridge and lights overnight. 800W plus 2kWh handles a home-office and evening cooking. Use the calculator to model your postcode." },
  ],
};

// ─── SHARE URL ──────────────────────────────────────────────────────────────
function encodeCalcState(s) {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams({ pc: s.postcode, w: s.watts, pl: s.placementId, pr: s.presenceId, t: s.tariff.toFixed(2), su: s.supplierId });
  return `${window.location.origin}${window.location.pathname}?${p}`;
}
function decodeCalcState() {
  if (typeof window === "undefined") return { postcode: "", watts: 800, placementId: "garden", presenceId: "mixed", tariff: 24.50, supplierId: "ofgem" };
  const p = new URLSearchParams(window.location.search);
  return { postcode: p.get("pc") || "", watts: parseInt(p.get("w")) || 800, placementId: p.get("pl") || "garden", presenceId: p.get("pr") || "mixed", tariff: parseFloat(p.get("t")) || 24.50, supplierId: p.get("su") || "ofgem" };
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pluggedin.solar",
  url: "https://pluggedin.solar",
  description: "UK plug-in solar comparison, savings calculator, and buying guides.",
};

// JSON-LD stays UK-canonical for SEO — UK is our primary indexed market.
// The rendered FAQ swaps client-side based on detected market.
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: MARKET_FAQ.uk.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  const gridData = useContext(GridDataContext);
  const { market } = useMarket();
  const copy = MARKET_COPY[market] || MARKET_COPY.uk;
  return (
    <>
      <SEO
        title="Pluggedin.solar — UK plug-in solar comparison & savings tools"
        description="Compare UK plug-in solar kits, calculate your savings with real PVGIS data, and find the right panel for your balcony, garden, or flat roof."
        path="/"
        noSuffix
        jsonLd={[ORG_LD, FAQ_LD]}
      />
      <Hero gridData={gridData} copy={copy} />
      <WhyNow />
      {copy.showTimeline && <Timeline />}
      <ForWho />
      <QuizSection />
      <CalculatorSection gridData={gridData} copy={copy} />
      <HowItWorks />
      <FAQSection />
    </>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero({ gridData, copy }) {
  const { market } = useMarket();
  const cfg = MARKET_CALC[market] || MARKET_CALC.uk;
  const [pc, setPC] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Reset the mini result when the user switches market
  useEffect(() => { setResult(null); setPC(""); setErr(null); }, [market]);

  async function quickCalc(postcode) {
    if (postcode.replace(/\s/g, "").length < 3) return;
    setLoading(true); setErr(null);
    const notFoundLabel = market === "us" ? "ZIP" : "postcode";
    try {
      let loc;
      try {
        if (market === "uk") loc = await geocodeUK(postcode);
        else if (market === "us") loc = await geocodeZip(postcode, "us");
        else if (market === "au") loc = await geocodeZip(postcode, "au");
        else loc = await geocodeUK(postcode);
      } catch (_) {
        setErr(`${notFoundLabel} not found — try the full calculator below`); setLoading(false); return;
      }
      try {
        const pr = await fetch(`https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${loc.lat}&lon=${loc.lon}&peakpower=0.8&loss=14&outputformat=json&mountingplace=free&angle=35&aspect=0`);
        const pj = await pr.json();
        const kwh = pj.outputs?.totals?.fixed?.E_y || (0.8 * (870 + Math.max(0, Math.min(1, (58 - Math.abs(loc.lat)) / 8)) * 180));
        setResult({ area: loc.area, saving: Math.round(kwh * 0.55 * cfg.tariffDefault / 100), kwh: Math.round(kwh) });
      } catch (_) {
        const kwh = 0.8 * (870 + Math.max(0, Math.min(1, (58 - Math.abs(loc.lat)) / 8)) * 180);
        setResult({ area: loc.area, saving: Math.round(kwh * 0.55 * cfg.tariffDefault / 100), kwh: Math.round(kwh) });
      }
    } catch (_) { setErr(`Could not look up ${notFoundLabel} — check your connection`); }
    setLoading(false);
  }

  return (
    <section className="section-pad" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "110px 20px 70px", position: "relative", overflow: "hidden", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ position: "absolute", top: "0%", right: "-5%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle,${T.solarLight} 0%,transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-12%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle,${T.skyLight} 0%,transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {gridData && (
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${T.border}`, background: T.surface, marginBottom: 32, fontSize: "0.78rem", color: T.inkMid, fontWeight: 500, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: gridData.static ? T.inkFaint : T.green, animation: gridData.static ? "none" : "pulse 2s infinite", flexShrink: 0 }} />
            Solar providing <span style={{ color: T.solar, fontWeight: 700, margin: "0 3px" }}>{gridData.solar.toFixed(1)}%</span> of {market === "uk" ? "UK" : market === "us" ? "US" : "AU"} electricity {gridData.static ? "(recent avg)" : "right now"}
          </div>
        )}

        <h1 className="fu1" style={{ fontFamily: T.display, fontSize: "clamp(2.8rem,6vw,4.6rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24, maxWidth: 800 }}>
          {copy.heroH1a}
          <br />
          {market === "uk" ? (
            <span style={{ color: T.solar, display: "inline-block", position: "relative" }}>
              {copy.heroH1b}
              <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 6, overflow: "visible" }} viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0,5 Q50,1 100,4 Q150,7 200,3" stroke={T.solarBright} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
              </svg>
            </span>
          ) : (
            <span>{copy.heroH1b}</span>
          )}
          <br />
          <span style={{ color: T.inkMid, fontWeight: 600 }}>How much will you save?</span>
        </h1>

        <p className="fu2" style={{ fontSize: "1.05rem", color: T.inkMid, lineHeight: 1.75, marginBottom: 44, maxWidth: 540, fontWeight: 300 }}>
          {copy.heroSub}
        </p>
        <a className="fu2" href={copy.heroCTAUrl} target={copy.heroCTAUrl.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: T.solar, fontWeight: 600, textDecoration: "none", marginBottom: 32 }}>
          {copy.heroCTA}
        </a>

        <div className="fu3" style={{ maxWidth: 500 }}>
          <div className="hero-postcode" style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <input type="text" placeholder={cfg.inputLabel} value={pc}
              onChange={e => setPC(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && quickCalc(pc)}
              style={{ flex: 1, padding: "15px 18px", borderRadius: 10, border: `1.5px solid ${result ? T.solarBorder : T.border}`, background: T.surface, color: T.ink, fontSize: "1rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            />
            <button onClick={() => quickCalc(pc)} disabled={loading}
              style={{ padding: "15px 26px", borderRadius: 10, border: "none", background: loading ? T.border : T.solar, color: loading ? T.inkFaint : "#fff", fontWeight: 700, fontSize: "0.9rem", fontFamily: T.display, whiteSpace: "nowrap", boxShadow: loading ? "none" : `0 2px 16px ${T.solarBorder}` }}>
              {loading ? "⟳" : "Show saving →"}
            </button>
          </div>

          {err && <div style={{ fontSize: "0.8rem", color: T.red, marginBottom: 12 }}>⚠ {err}</div>}

          {result && (
            <div className="fu hero-result" style={{ padding: "20px 24px", borderRadius: 12, border: `1.5px solid ${T.solarBorder}`, background: T.surface, display: "flex", gap: 24, alignItems: "center", boxShadow: `0 4px 24px ${T.solarGlow}` }}>
              <div>
                <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: T.solar, lineHeight: 1 }}>{cfg.currency}{result.saving}</div>
                <div style={{ fontSize: "0.75rem", color: T.inkFaint, marginTop: 4, fontWeight: 500 }}>estimated annual saving</div>
              </div>
              <div style={{ width: 1, background: T.border, alignSelf: "stretch" }} />
              <div>
                <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: T.ink, lineHeight: 1 }}>{result.kwh}</div>
                <div style={{ fontSize: "0.75rem", color: T.inkFaint, marginTop: 4, fontWeight: 500 }}>kWh/yr &middot; {result.area}</div>
              </div>
              <Link to={`/calculator?pc=${encodeURIComponent(pc.replace(/\s/g, "").toUpperCase())}`} style={{ marginLeft: "auto", padding: "10px 18px", borderRadius: 8, background: T.ink, color: "#fff", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", fontFamily: T.display }}>
                Full report &darr;
              </Link>
            </div>
          )}
        </div>

        <div className="fu4" style={{ display: "flex", gap: 24, marginTop: 48, alignItems: "center", flexWrap: "wrap" }}>
          {copy.bullets.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: T.inkFaint, fontWeight: 400 }}>
              <span style={{ color: T.green, fontSize: "0.85rem" }}>✓</span>{s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY NOW ────────────────────────────────────────────────────────────────
const MARKET_WHYNOW = {
  uk: {
    stats: [
      { num: "Live",     label: "Legal in the UK", sub: "SI 2026 No. 848 in force · plug-in solar legal in UK homes as of 27 August 2026" },
      { num: "800W",     label: "UK legal cap",    sub: "Max 800VA / 3.5A via a standard 13A socket · no electrician · no wiring" },
      { num: "£200+/yr", label: "Typical saving",  sub: "PVGIS-backed estimate · 800W system · Ofgem cap rate (24.5p/kWh)" },
    ],
    body: "Germany simplified its plug-in solar rules in 2024 — within 12 months, over 1.2 million households had a kit. The UK caught up on 27 August 2026 when SI 2026 No. 848 came into force. EcoFlow STREAM kits are stocked at B&Q, Currys, Amazon and Screwfix, with Wickes and Lidl following. The government’s £25m pilot to fund kits for low-income households opens this autumn.",
  },
  us: {
    stats: [
      { num: "50 states", label: "Different rules", sub: "Interconnection under NEC 705 is utility-specific · check your local co-op or IOU tariff before installing" },
      { num: "UL 1741",   label: "Inverter standard", sub: "Every legit grid-tied plug-in kit uses a UL-listed inverter · anti-islanding required for backfeed" },
      { num: "16.5¢/kWh", label: "US average tariff", sub: "EIA residential average · high-tariff states (CA, HI, MA) see 2-3× that and much faster payback" },
    ],
    body: "The US is a patchwork. NEC Article 705 governs any grid-connected microgeneration, and interconnection agreements vary utility by utility. Small plug-in kits (200-800W) with UL 1741-listed inverters are widely used, often without formal utility notification, but you should check your utility's specific tariff. Off-grid setups (portable battery, no backfeed) avoid the regulatory tangle entirely.",
  },
  au: {
    stats: [
      { num: "AS/NZS", label: "4777 standard", sub: "Grid-connected inverters must be CEC-approved · installation by a licensed electrician is mandatory" },
      { num: "CEC",    label: "Approved list", sub: "Clean Energy Council maintains the master list of approved inverters and installers" },
      { num: "33c/kWh", label: "Peak tariff", sub: "Typical evening rate across NEM regions · self-consumption savings scale from this" },
    ],
    body: "Australia's rules are stricter than the UK's. Anything grid-tied needs a CEC-approved inverter and a licensed installer under AS/NZS 4777. But portable and off-grid setups — panels feeding a power station, camping rigs, shed solar — are widely used and completely legal. The real value for AU households is combining these with time-of-use tariff arbitrage.",
  },
};

function WhyNow() {
  const { market } = useMarket();
  const copy = MARKET_WHYNOW[market] || MARKET_WHYNOW.uk;
  const accents = [T.green, T.solar, T.sky];
  return (
    <section className="section-pad" style={{ padding: "80px 20px", background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Why now</SectionLabel>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 40 }}>
          {copy.stats.map((s, i) => (
            <div key={i} style={{ padding: "36px 32px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bg, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${accents[i]},${accents[i]}00)`, borderRadius: "16px 16px 0 0" }} />
              <div style={{ fontFamily: T.display, fontSize: "2.6rem", fontWeight: 800, color: accents[i], lineHeight: 1, marginBottom: 12, letterSpacing: "-0.02em" }}>{s.num}</div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: T.ink, marginBottom: 8, fontFamily: T.display }}>{s.label}</div>
              <div style={{ fontSize: "0.82rem", color: T.inkMid, lineHeight: 1.55 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 36, fontSize: "0.9rem", color: T.inkMid, lineHeight: 1.8, maxWidth: 640 }}>{copy.body}</p>
      </div>
    </section>
  );
}

// ─── FOR WHO ────────────────────────────────────────────────────────────────
const MARKET_FORWHO = {
  uk: [
    { icon: "🏢", title: "Renters",       body: "4.6 million privately rented households in England. Traditional solar needs a landlord, a roof, and £10,000+. Plug-in needs none of those. The Renters' Rights Act 2025 strengthens your position — and you take the kit when you move. Legal in the UK as of 27 August 2026." },
    { icon: "🏙️", title: "Flat-dwellers", body: "Clip panels to your balcony railings, plug into a standard 13A socket, start generating. No structural modifications, no planning permission. The DESNZ Interim Product Specification allows up to 800VA per household via a BS 1363 plug with a 5A fuse." },
    { icon: "🏡", title: "Homeowners",     body: "Garden, flat-roof extension, or south-facing wall — an 800W kit covers your base load (fridge, router, standby devices) and saves £200+ per year. EcoFlow STREAM kits are stocked at B&Q, Currys, Amazon and Screwfix." },
  ],
  us: [
    { icon: "🏢", title: "Renters",         body: "Portable, battery-based kits are ideal — panels on a balcony feed a power station, and everything comes with you when you move. No landlord sign-off, no changes to the property, no utility notification for pure off-grid setups." },
    { icon: "🏙️", title: "Apartment residents", body: "Balcony and window-mounted panels feeding a portable battery are the easiest fit. Grid-tied plug-in in an apartment gets tangled in HOA rules and utility interconnection — off-grid avoids all of it." },
    { icon: "🏡", title: "Homeowners",       body: "For grid-tied setups, check your utility's interconnection agreement and NEC 705 compliance. Off-grid battery-based setups need no permission at all. Both scale well from 200W hobby projects to 800W-plus purposeful builds." },
  ],
  au: [
    { icon: "🏢", title: "Renters",           body: "Portable panels and battery-based systems are the natural fit — no changes to the property, no strata approvals, no CEC installer needed. Take everything with you when you move." },
    { icon: "🏙️", title: "Apartment/unit residents", body: "Balcony setups feeding an EcoFlow or Anker power station give you daytime capture without touching the building's wiring. Grid-tied plug-in isn't practical under AS/NZS 4777 rules." },
    { icon: "🏡", title: "Homeowners",         body: "For a full rooftop install, use a CEC-accredited installer. For camping, shed, garage or workshop setups, plug-in and portable kits work brilliantly and don't need any accreditation. Combine with time-of-use tariff arbitrage for best results." },
  ],
};

function ForWho() {
  const { market } = useMarket();
  const groups = MARKET_FORWHO[market] || MARKET_FORWHO.uk;
  return (
    <section className="section-pad" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Who is this for</SectionLabel>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 40 }}>
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
    <section id="quiz" className="section-pad" style={{ padding: "80px 20px", background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Find your kit</SectionLabel>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 40, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Not sure which kit is right for you?</h2>
            <p style={{ color: T.inkMid, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 24 }}>
              Answer 5 quick questions about your space, orientation, and budget. We&rsquo;ll recommend the best plug-in solar kit for your setup &mdash; with two alternatives to compare.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "📍", text: "Installation location" },
                { icon: "🧭", text: "Panel orientation" },
                { icon: "📏", text: "Available space" },
                { icon: "🔋", text: "Battery preference" },
                { icon: "💷", text: "Budget range" },
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
function CalculatorSection({ gridData, copy }) {
  const { market } = useMarket();
  return (
    <section id="calculator" className="section-pad" style={{ padding: "60px 20px 80px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Calculator</SectionLabel>
        <h2 style={{ fontFamily: T.display, fontSize: "2rem", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>{copy.calcHeading}</h2>
        <p style={{ color: T.inkMid, fontSize: "0.9rem", marginBottom: 40, lineHeight: 1.6 }}>{copy.calcSubtitle}</p>
        <Calculator gridData={gridData} market={market} />
      </div>
    </section>
  );
}

// ─── FULL CALCULATOR ────────────────────────────────────────────────────────
function Calculator({ gridData, market = "uk" }) {
  const cfg = MARKET_CALC[market] || MARKET_CALC.uk;
  const init = decodeCalcState();
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location, setLocation] = useState(null);
  const [pvgisKwh, setPvgisKwh] = useState(null);
  const [monthlyKwh, setMonthlyKwh] = useState(null);
  const [pvgisLoading, setPvgisLoading] = useState(false);
  const [pvgisError, setPvgisError] = useState(null);
  const [panelSize, setPanelSize] = useState(PANEL_SIZES.find(p => p.watts === init.watts) || PANEL_SIZES[2]);
  const [placement, setPlacement] = useState(PLACEMENTS.find(p => p.id === init.placementId) || PLACEMENTS[0]);
  const [presence, setPresence] = useState(PRESENCE.find(p => p.id === init.presenceId) || PRESENCE[1]);
  const [supplier, setSupplier] = useState(cfg.suppliers.find(s => s.id === init.supplierId) || cfg.suppliers[0]);
  const [tariff, setTariff] = useState(init.tariff || cfg.tariffDefault);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showYearly, setShowYearly] = useState(true);

  // When the market changes at runtime (user picks a different country in the switcher),
  // reset supplier + tariff to the new market's defaults and clear stale postcode results.
  useEffect(() => {
    setSupplier(cfg.suppliers[0]);
    setTariff(cfg.tariffDefault);
    setLocation(null);
    setPvgisKwh(null);
    setMonthlyKwh(null);
    setPostcodeInput("");
    setPvgisError(null);
  }, [market]);

  useEffect(() => { if (init.postcode) geocodeAndFetch(init.postcode); }, []);
  useEffect(() => { if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect); }, [panelSize, placement]);

  async function geocodeAndFetch(pc) {
    if (!pc || pc.replace(/\s/g, "").length < 3) return;
    setPvgisError(null);
    try {
      let loc;
      if (market === "uk") loc = await geocodeUK(pc);
      else if (market === "us") loc = await geocodeZip(pc, "us");
      else if (market === "au") loc = await geocodeZip(pc, "au");
      else loc = await geocodeUK(pc);
      setLocation(loc);
      fetchPVGIS(loc.lat, loc.lon, panelSize.kWp, placement.angle, placement.aspect);
    } catch (e) {
      setPvgisError(`${market === "us" ? "ZIP" : "Postcode"} not found — please check it.`);
    }
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

  const annualGen = pvgisKwh || 0;
  const selfConsumed = annualGen * presence.sc;
  const annualSaving = (selfConsumed * tariff) / 100;
  const payback = annualSaving > 0 ? panelSize.cost / annualSaving : 0;
  const lifetime = annualSaving * 15 - panelSize.cost;
  const co2Kg = selfConsumed * 0.207;
  const hasResults = annualGen > 0;
  const tariffPct = ((tariff - cfg.tariffMin) / (cfg.tariffMax - cfg.tariffMin)) * 100;

  return (
    <div className="grid-2-calc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      {/* LEFT — inputs */}
      <div style={{ padding: "24px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.bg }}>
        <CLabel>{cfg.postcodeLabel}</CLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input type="text" placeholder={cfg.postcodePlaceholder} value={postcodeInput}
            onChange={e => setPostcodeInput(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && geocodeAndFetch(postcodeInput)}
            style={{ flex: 1, padding: "12px 14px", borderRadius: 9, border: `1.5px solid ${location ? T.solarBorder : T.border}`, background: T.surface, color: T.ink, fontSize: "0.95rem", outline: "none", fontFamily: T.body, letterSpacing: "0.05em", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
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
              {p.label}{p.max && market === "uk" && <CBadge>UK max</CBadge>}
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

        <CLabel>Rate &middot; {cfg.tariffNote} &middot; <a href={cfg.postcodeVerifyUrl} target="_blank" rel="noreferrer" style={{ color: T.sky }}>{cfg.postcodeVerifyLabel} &nearr;</a></CLabel>
        <div className="supplier-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
          {cfg.suppliers.map(s => (
            <button key={s.id} onClick={() => pickSupplier(s)}
              style={{ padding: "9px 10px", borderRadius: 7, border: `1.5px solid ${supplier.id === s.id ? T.solar : T.border}`, background: supplier.id === s.id ? T.solarLight : T.surface, color: supplier.id === s.id ? T.solar : T.inkMid, fontSize: "0.75rem", fontWeight: supplier.id === s.id ? 600 : 400, fontFamily: T.body, textAlign: "left" }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
          <input type="range" min={cfg.tariffMin} max={cfg.tariffMax} step="0.5" value={tariff}
            onChange={e => { setTariff(parseFloat(e.target.value)); pickSupplier(cfg.suppliers.find(s => s.id === "manual")); }}
            style={{ flex: 1, background: `linear-gradient(to right,${T.solar} 0%,${T.solar} ${tariffPct}%,${T.border} ${tariffPct}%,${T.border} 100%)`, height: 4, borderRadius: 2, outline: "none" }}
          />
          <span style={{ fontFamily: T.display, fontSize: "1.3rem", fontWeight: 800, color: T.solar, minWidth: 54, textAlign: "right", letterSpacing: "-0.02em" }}>{tariff.toFixed(1)}{cfg.subUnit}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: T.inkFaint }}>
          <span>{cfg.tariffMin}{cfg.subUnit}</span><span>{cfg.tariffMax}{cfg.subUnit}/kWh</span>
        </div>
      </div>

      {/* RIGHT — results */}
      <div style={{ padding: "24px", borderRadius: 16, border: `1px solid ${T.border}`, background: T.surface, boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        {!hasResults ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "40px 20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: T.solarLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📍</div>
            <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, lineHeight: 1.5 }}>Enter your {market === "us" ? "ZIP code" : "postcode"} to see your estimate</div>
            <div style={{ fontSize: "0.78rem", color: T.inkFaint, lineHeight: 1.6 }}>Real PVGIS irradiance &mdash; no two {market === "us" ? "ZIP codes" : "postcodes"} are identical</div>
          </div>
        ) : (
          <div className="fi">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
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

            {(() => {
              const gen = showYearly ? annualGen : annualGen / 12;
              const sav = showYearly ? annualSaving : annualSaving / 12;
              const period = showYearly ? "year" : "month";
              return (
                <div className="rcards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <RCard label={`Generation / ${period}`} value={`${gen.toFixed(0)} kWh`} sub="PVGIS · your postcode" hi />
                  <RCard label={`Saving / ${period}`} value={`${cfg.currency}${sav.toFixed(sav < 10 ? 2 : 0)}`} sub={`at ${tariff.toFixed(1)}${cfg.subUnit}/kWh`} hi />
                  <RCard label="Payback period" value={`${payback.toFixed(1)} yrs`} />
                  <RCard label="CO₂ offset / yr" value={`${co2Kg.toFixed(0)} kg`} sub="207g/kWh · DESNZ" />
                </div>
              );
            })()}

            {/* Seasonal savings graph */}
            {monthlyKwh && <SavingsGraph monthlyKwh={monthlyKwh} selfConsumption={presence.sc} tariff={tariff} currency={cfg.currency} />}

            <div style={{ padding: "20px", borderRadius: 12, background: lifetime > 0 ? T.greenLight : T.redLight, border: `1.5px solid ${lifetime > 0 ? T.greenBorder : "rgba(220,38,38,0.18)"}`, textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 10 }}>15-year net saving after {cfg.currency}{panelSize.cost} system cost</div>
              <div style={{ fontFamily: T.display, fontSize: "3rem", fontWeight: 800, color: lifetime > 0 ? T.green : T.red, lineHeight: 1, letterSpacing: "-0.03em" }}>
                {lifetime >= 0 ? "+" : ""}{cfg.currency}{Math.abs(lifetime).toFixed(0)}
              </div>
              <div style={{ fontSize: "0.72rem", color: T.inkFaint, marginTop: 8 }}>Based on constant {tariff.toFixed(1)}{cfg.subUnit} tariff</div>
            </div>

            {gridData && (
              <div style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint }}>{market === "uk" ? "UK" : market === "us" ? "US" : "AU"} grid {gridData.static ? "(recent avg)" : "right now"}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.68rem", color: gridData.static ? T.inkFaint : T.green, fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: gridData.static ? T.inkFaint : T.green, display: "inline-block", animation: gridData.static ? "none" : "pulse 2s infinite" }} /> {gridData.static ? "Avg" : "Live"}
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
                <p style={{ fontSize: "0.75rem", color: T.inkMid, lineHeight: 1.6, marginBottom: 14 }}>Kit picks &middot; G98 DNO walkthrough &middot; Weekly updates as new UKCA-compliant kits reach UK shelves.</p>
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
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✅</div>
                <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink }}>You&rsquo;re on the list</div>
                <div style={{ fontSize: "0.75rem", color: T.inkMid, marginTop: 6 }}>We&rsquo;ll send you weekly updates as new UKCA-compliant kits arrive.</div>
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
    { n: "01", title: "Buy a compliant kit",         body: "Compliant kits are on sale from today at B&Q, Currys, Amazon and Screwfix. Expect to pay £600–£900 for an 800W system, with prices likely to fall through 2027 as more brands complete UKCA certification." },
    { n: "02", title: "Install it yourself",          body: "Mount on your balcony rail, flat roof, or garden. South-facing at ~35° is ideal, but east/west works well. No tools, no trades." },
    { n: "03", title: "Plug in and notify your DNO",  body: "Connect the cable to a standard 13A socket. Notify your Distribution Network Operator within 28 days via a simple online form — G98 rules." },
  ];
  return (
    <section id="how-it-works" className="section-pad" style={{ padding: "80px 20px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>How it works</SectionLabel>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, marginTop: 48 }}>
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
  const { market } = useMarket();
  const items = MARKET_FAQ[market] || MARKET_FAQ.uk;
  return (
    <section id="faq" className="section-pad" style={{ padding: "80px 20px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>FAQ</SectionLabel>
        <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: T.border, borderRadius: 16, overflow: "hidden", marginTop: 40 }}>
          {items.map((item, i) => (
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
// ─── SAVINGS GRAPH (homepage) ──────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function SavingsGraph({ monthlyKwh, selfConsumption, tariff, currency = "£" }) {
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
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" fill={T.inkFaint} fontSize="8" fontFamily={T.body}>{currency}{t}</text>
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
                  {currency}{s.toFixed(0)}
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
          Peak: <strong>{currency}{Math.max(...monthlySavings).toFixed(2)}</strong>/mo ({MONTHS[monthlySavings.indexOf(Math.max(...monthlySavings))]})
        </span>
        <span style={{ fontSize: "0.68rem", color: T.inkMid }}>
          Low: <strong>{currency}{Math.min(...monthlySavings).toFixed(2)}</strong>/mo ({MONTHS[monthlySavings.indexOf(Math.min(...monthlySavings))]})
        </span>
      </div>
    </div>
  );
}

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

// ─── TIMELINE ──────────────────────────────────────────────────────────────
const TIMELINE_STEPS = [
  { date: "Mar 2026", label: "Government confirms legalisation", detail: "DESNZ announces plug-in solar will be permitted under amended wiring regulations.", done: true },
  { date: "Apr 2026", label: "BS 7671 Amendment 4 published", detail: "IET updates the wiring regulations to enable plug-in solar connections up to 800W.", done: true },
  { date: "Jun 2026", label: "DESNZ consultation opens", detail: "Government publishes the proposed Interim Product Specification and PSSR amendment. Consultation closed 30 June.", done: true },
  { date: "16 Jul 2026", label: "Government responds — legislation made", detail: "DESNZ publishes Interim Product Specification v2 and makes SI 2026 No. 848, amending the Plugs and Sockets Regulations. The legal term is 'plug-in microgenerator'.", done: true },
  { date: "27 Aug 2026", label: "Plug-in solar became legal", detail: "SI 2026 No. 848 came into force. Compliant kits can now legally be plugged into a standard 13A socket. Specs: 800VA / 3.5A max, BS 1363 plug, 5A fuse, no battery in the plug circuit, no extension leads.", done: true },
  { date: "Today onwards", label: "Kits on sale in UK shops", detail: "EcoFlow STREAM, Anker SOLIX, Bright Saver and Craftstrom kits are stocked at B&Q, Currys, Amazon and Screwfix from today. Wickes and Lidl to follow in September. Typical street price £600–£900 for a complete 800W kit.", done: false, current: true },
  { date: "2027+", label: "Mass adoption", detail: "Prices fall as more brands complete UKCA certification. BSI expected to publish the full product standard, replacing the interim spec. £25m government pilot funds kits for low-income households.", done: false },
];

function Timeline() {
  return (
    <section className="section-pad" style={{ padding: "60px 20px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <SectionLabel>Timeline</SectionLabel>
        <h2 style={{ fontFamily: T.display, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>
          UK plug-in solar legal status
        </h2>
        <p style={{ color: T.inkMid, fontSize: "0.9rem", marginBottom: 40, lineHeight: 1.6 }}>
          Plug-in solar became legal in the UK today, 27 August 2026. Here&rsquo;s how we got here and what happens next.
        </p>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: T.border }} />

          {TIMELINE_STEPS.map((s, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < TIMELINE_STEPS.length - 1 ? 32 : 0 }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: -28, top: 3,
                width: 20, height: 20, borderRadius: "50%",
                background: s.done ? T.green : s.current ? T.solar : T.border,
                border: `3px solid ${T.bg}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: s.current ? `0 0 0 4px ${T.solarLight}` : "none",
              }}>
                {s.done && <span style={{ color: "#fff", fontSize: "0.6rem", fontWeight: 800 }}>✓</span>}
              </div>

              {/* Content */}
              <div style={{
                padding: "14px 18px", borderRadius: 10,
                border: `1.5px solid ${s.current ? T.solarBorder : T.border}`,
                background: s.current ? T.solarLight : T.surface,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: s.done ? T.green : s.current ? T.solar : T.inkFaint }}>{s.date}</span>
                  {s.current && <span style={{ fontSize: "0.55rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${T.solar}18`, color: T.solar, border: `1px solid ${T.solar}30` }}>WE ARE HERE</span>}
                  {s.done && <span style={{ fontSize: "0.55rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: `${T.green}18`, color: T.green, border: `1px solid ${T.green}30` }}>DONE</span>}
                </div>
                <div style={{ fontFamily: T.display, fontSize: "0.92rem", fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: T.inkMid, marginTop: 4, lineHeight: 1.55 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
