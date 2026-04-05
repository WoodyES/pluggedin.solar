import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
// Light, modern, solar-trustworthy palette
// Fonts: Syne (geometric display) + Epilogue (clean body)
const T = {
  // Backgrounds
  bg:          "#F6F8FB",   // cool off-white — feels airy, clean
  surface:     "#FFFFFF",
  surfaceAlt:  "#EFF2F8",   // slightly deeper for alternating sections
  border:      "#DDE2EE",
  borderFaint: "#EAEDF5",

  // Text
  ink:         "#0C1526",   // deep navy-black — more trustworthy than pure black
  inkMid:      "#4A5568",   // secondary text
  inkFaint:    "#8896AF",   // labels, captions

  // Solar accent — premium warm gold, not warning-orange
  solar:       "#E09400",   // primary — rich, confident gold
  solarBright: "#F5B800",   // highlights
  solarLight:  "#FFF7E0",   // tinted bg
  solarBorder: "rgba(224,148,0,0.22)",
  solarGlow:   "rgba(224,148,0,0.09)",

  // Sky — secondary accent for trust/data elements
  sky:         "#0284C7",
  skyBright:   "#38BDF8",
  skyLight:    "#EFF8FF",

  // Status
  green:       "#059669",
  greenLight:  "#ECFDF5",
  greenBorder: "rgba(5,150,105,0.20)",
  red:         "#DC2626",
  redLight:    "#FEF2F2",

  // Fuel chart colours (work on light bg)
  fuelWind:    "#0EA5E9",
  fuelNuclear: "#8B5CF6",
  fuelBiomass: "#65A30D",
  fuelGas:     "#94A3B8",
  fuelImports: "#F97316",

  // Type
  display: "'Syne', sans-serif",    // geometric, modern, bold
  body:    "'Epilogue', sans-serif", // clean, legible, trustworthy
};

// ─── CALCULATOR DATA ────────────────────────────────────────────────────────
const PLACEMENTS = [
  { id:"garden",        label:"Garden / roof",        angle:35, aspect:0,  icon:"🌿" },
  { id:"balcony_south", label:"South balcony",        angle:90, aspect:0,  icon:"🏙️" },
  { id:"balcony_ew",    label:"East / West balcony",  angle:90, aspect:90, icon:"↔️" },
  { id:"flat_roof",     label:"Flat roof / ground",   angle:20, aspect:0,  icon:"🏠" },
];
const PANEL_SIZES = [
  { watts:400, kWp:0.4, label:"400W", cost:450 },
  { watts:600, kWp:0.6, label:"600W", cost:600 },
  { watts:800, kWp:0.8, label:"800W", cost:750, max:true },
];
const PRESENCE = [
  { id:"home",  label:"Mostly home", sc:0.75 },
  { id:"mixed", label:"In and out",  sc:0.55 },
  { id:"out",   label:"Mostly out",  sc:0.35 },
];
const SUPPLIERS = [
  { id:"ofgem",  label:"Ofgem cap (default)", rate:24.50 },
  { id:"oe",     label:"Octopus Flexible",    rate:24.50 },
  { id:"agile",  label:"Octopus Agile ⚡",    rate:null  },
  { id:"bg",     label:"British Gas",         rate:24.50 },
  { id:"edf",    label:"EDF Energy",          rate:24.50 },
  { id:"eon",    label:"E.ON Next",           rate:24.50 },
  { id:"sp",     label:"ScottishPower",       rate:24.50 },
  { id:"ovo",    label:"Ovo Energy",          rate:24.50 },
  { id:"manual", label:"Enter manually",      rate:null  },
];
const FAQ_ITEMS = [
  { q:"Is plug-in solar legal in the UK?",
    a:"Not quite yet — but it will be very soon. The government confirmed on 15 March 2026 that it will legalise plug-in solar. The wiring regulations (BS 7671 Amendment 4) were updated on 15 April 2026 to enable the framework, but compliant products cannot legally be connected until the BSI publishes the product standard — expected around July 2026. Until then, connecting a kit to your ring main is technically non-compliant. The calculator gives you accurate savings projections so you're ready to buy the moment kits are available." },
  { q:"Do I need an electrician?",
    a:"No. Once compliant kits are on sale, you plug the inverter cable into a standard 13A socket. You do need to notify your Distribution Network Operator (DNO) within 28 days under G98 rules — but that's a simple online form, not a site visit." },
  { q:"Can I install this if I rent?",
    a:"Plug-in solar is specifically designed for renters and flat-dwellers who can't access their roof. The panels attach to a balcony rail or sit in a garden, and you take them when you move. Most standard ASTs don't prohibit temporary external fixtures." },
  { q:"What's the payback period?",
    a:"Typically 4–6 years for an 800W system in southern England at the Ofgem Q2 2026 cap (24.5p/kWh). The Carbon Brief analysis puts 15-year net savings at ~£1,100 for a typical London household." },
  { q:"Can I get paid for electricity I export?",
    a:"Yes, but at much lower rates. The Smart Export Guarantee (SEG) pays ~3–6p per kWh exported, versus 24p+ to import. Maximise savings by using solar when it's generating — fridges, routers, and always-on devices are ideal." },
  { q:"What size system should I buy?",
    a:"800W is the UK regulatory cap and best value. Smaller 400W systems work if you have limited space. Use the calculator to compare payback periods for your postcode and placement." },
];

// ─── SHARE URL ──────────────────────────────────────────────────────────────
function encodeCalcState(s) {
  const p = new URLSearchParams({ pc:s.postcode, w:s.watts, pl:s.placementId, pr:s.presenceId, t:s.tariff.toFixed(2), su:s.supplierId });
  return `${window.location.origin}${window.location.pathname}?${p}`;
}
function decodeCalcState() {
  const p = new URLSearchParams(window.location.search);
  return { postcode:p.get("pc")||"", watts:parseInt(p.get("w"))||800, placementId:p.get("pl")||"garden", presenceId:p.get("pr")||"mixed", tariff:parseFloat(p.get("t"))||24.50, supplierId:p.get("su")||"ofgem" };
}

// ─── ROOT ───────────────────────────────────────────────────────────────────
export default function App() {
  const [gridData, setGridData] = useState(null);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    setTimeout(() => setMounted(true), 60);
    fetchGrid();
    const t = setInterval(fetchGrid, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  async function fetchGrid() {
    try {
      const r    = await fetch("https://api.carbonintensity.org.uk/generation");
      const json = await r.json();
      const mix  = json.data.generationmix;
      const get  = f => mix.find(m => m.fuel === f)?.perc || 0;
      setGridData({ solar:get("solar"), wind:get("wind")+get("wind_offshore")+get("wind_onshore"), nuclear:get("nuclear"), gas:get("gas"), biomass:get("biomass"), imports:get("imports"), at:new Date() });
    } catch(_) {}
  }

  if (!mounted) return <div style={{ background:T.bg, minHeight:"100vh" }} />;

  return (
    <div style={{ background:T.bg, color:T.ink, fontFamily:T.body, minHeight:"100vh" }}>
      <GlobalStyles />
      <Nav />
      <Hero gridData={gridData} />
      <WhyNow />
      <ForWho />
      <CalculatorSection gridData={gridData} />
      <HowItWorks />
      <FAQSection />
      <Footer />
    </div>
  );
}

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      .fu  { animation: fadeUp 0.45s ease forwards; }
      .fi  { animation: fadeIn 0.35s ease forwards; }
      .fu1 { animation: fadeUp 0.5s 0.05s ease both; }
      .fu2 { animation: fadeUp 0.5s 0.18s ease both; }
      .fu3 { animation: fadeUp 0.5s 0.32s ease both; }
      .fu4 { animation: fadeUp 0.5s 0.48s ease both; }
      input[type=range]{-webkit-appearance:none;appearance:none;cursor:pointer;width:100%;background:transparent}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${T.solar};border:2px solid ${T.surface};box-shadow:0 0 0 3px ${T.solarBorder};margin-top:-8px}
      input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:${T.border}}
      button,a{transition:all 0.15s ease;cursor:pointer}
      button:active{transform:scale(0.97)!important}
      ::selection{background:${T.solarLight};color:${T.solar}}
      ::-webkit-scrollbar{width:6px}
      ::-webkit-scrollbar-track{background:${T.bg}}
      ::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
    `}</style>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 32px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", background:scrolled ? `${T.surface}f0` : "transparent", backdropFilter:scrolled ? "blur(14px)" : "none", borderBottom:scrolled ? `1px solid ${T.border}` : "1px solid transparent", transition:"all 0.3s ease" }}>
      <Logo />
      <div style={{ display:"flex", gap:36, alignItems:"center" }}>
        {[["How it works","#how-it-works"],["Calculator","#calculator"],["FAQ","#faq"]].map(([l,h]) => (
          <a key={l} href={h} style={{ fontSize:"0.85rem", color:T.inkMid, fontWeight:500, textDecoration:"none" }}
            onMouseEnter={e=>e.target.style.color=T.ink} onMouseLeave={e=>e.target.style.color=T.inkMid}>{l}</a>
        ))}
        <a href="#calculator" style={{ padding:"9px 22px", borderRadius:8, background:T.solar, color:"#fff", fontSize:"0.84rem", fontWeight:600, textDecoration:"none", letterSpacing:"0.01em", fontFamily:T.display, boxShadow:`0 2px 12px ${T.solarBorder}` }}
          onMouseEnter={e=>{e.target.style.background="#c27f00";e.target.style.boxShadow=`0 4px 20px ${T.solarBorder}`}}
          onMouseLeave={e=>{e.target.style.background=T.solar;e.target.style.boxShadow=`0 2px 12px ${T.solarBorder}`}}>
          Calculate savings
        </a>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${T.solarBright},${T.solar})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", boxShadow:`0 2px 8px ${T.solarBorder}` }}>☀</div>
      <span style={{ fontFamily:T.display, fontSize:"1.1rem", fontWeight:700, color:T.ink, letterSpacing:"-0.02em" }}>plugin<span style={{ color:T.solar }}>.solar</span></span>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero({ gridData }) {
  const [pc,      setPC]      = useState("");
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState(null);

  async function quickCalc(postcode) {
    if (postcode.replace(/\s/g,"").length < 4) return;
    setLoading(true); setErr(null);
    try {
      const r    = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g,"")}`);
      const json = await r.json();
      if (json.status !== 200) { setErr("Postcode not found — try the full calculator below"); setLoading(false); return; }
      const { latitude:lat, longitude:lon, admin_district } = json.result;
      try {
        const pr  = await fetch(`https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=0.8&loss=14&outputformat=json&mountingplace=free&angle=35&aspect=0`);
        const pj  = await pr.json();
        const kwh = pj.outputs?.totals?.fixed?.E_y || (0.8*(870+Math.max(0,Math.min(1,(58-lat)/8))*180));
        setResult({ area:admin_district||postcode.toUpperCase(), saving:Math.round(kwh*0.55*24.50/100), kwh:Math.round(kwh) });
      } catch(_) {
        const kwh = 0.8*(870+Math.max(0,Math.min(1,(58-lat)/8))*180);
        setResult({ area:admin_district||postcode.toUpperCase(), saving:Math.round(kwh*0.55*24.50/100), kwh:Math.round(kwh) });
      }
    } catch(_) { setErr("Could not look up postcode — check your connection"); }
    setLoading(false);
  }

  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"110px 32px 70px", position:"relative", overflow:"hidden", maxWidth:960, margin:"0 auto" }}>

      {/* Subtle background orbs */}
      <div style={{ position:"absolute", top:"0%", right:"-5%", width:520, height:520, borderRadius:"50%", background:`radial-gradient(circle,${T.solarLight} 0%,transparent 65%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"5%", left:"-12%", width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${T.skyLight} 0%,transparent 65%)`, pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1 }}>
        {/* Live badge */}
        {gridData && (
          <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20, border:`1.5px solid ${T.border}`, background:T.surface, marginBottom:32, fontSize:"0.78rem", color:T.inkMid, fontWeight:500, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:T.green, animation:"pulse 2s infinite", flexShrink:0 }} />
            Solar providing <span style={{ color:T.solar, fontWeight:700, margin:"0 3px" }}>{gridData.solar.toFixed(1)}%</span> of UK electricity right now
          </div>
        )}

        {/* Headline */}
        <h1 className="fu1" style={{ fontFamily:T.display, fontSize:"clamp(2.8rem,6vw,4.6rem)", fontWeight:800, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:24, maxWidth:800 }}>
          Plug-in solar is coming
          <br />to the UK{" "}
          <span style={{ color:T.solar, display:"inline-block", position:"relative" }}>
            this summer.
            <svg style={{ position:"absolute", bottom:-6, left:0, width:"100%", height:6, overflow:"visible" }} viewBox="0 0 200 6" preserveAspectRatio="none">
              <path d="M0,5 Q50,1 100,4 Q150,7 200,3" stroke={T.solarBright} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
            </svg>
          </span>
          <br />
          <span style={{ color:T.inkMid, fontWeight:600 }}>How much will you save?</span>
        </h1>

        <p className="fu2" style={{ fontSize:"1.05rem", color:T.inkMid, lineHeight:1.75, marginBottom:44, maxWidth:540, fontWeight:300 }}>
          The UK government confirmed it in March 2026. Compliant kits are expected in shops around July 2026. No roof needed, no electrician, no landlord sign-off — just panels on your balcony or garden, plugged into a standard socket.
        </p>

        {/* Quick calc */}
        <div className="fu3" style={{ maxWidth:500 }}>
          <div style={{ display:"flex", gap:10, marginBottom:12 }}>
            <input type="text" placeholder="Enter your postcode…" value={pc}
              onChange={e=>setPC(e.target.value.toUpperCase())}
              onKeyDown={e=>e.key==="Enter"&&quickCalc(pc)}
              style={{ flex:1, padding:"15px 18px", borderRadius:10, border:`1.5px solid ${result?T.solarBorder:T.border}`, background:T.surface, color:T.ink, fontSize:"1rem", outline:"none", fontFamily:T.body, letterSpacing:"0.05em", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}
            />
            <button onClick={()=>quickCalc(pc)} disabled={loading}
              style={{ padding:"15px 26px", borderRadius:10, border:"none", background:loading?T.border:T.solar, color:loading?T.inkFaint:"#fff", fontWeight:700, fontSize:"0.9rem", fontFamily:T.display, whiteSpace:"nowrap", boxShadow:loading?"none":`0 2px 16px ${T.solarBorder}` }}>
              {loading ? "⟳" : "Show saving →"}
            </button>
          </div>

          {err && <div style={{ fontSize:"0.8rem", color:T.red, marginBottom:12 }}>⚠ {err}</div>}

          {result && (
            <div className="fu" style={{ padding:"20px 24px", borderRadius:12, border:`1.5px solid ${T.solarBorder}`, background:T.surface, display:"flex", gap:24, alignItems:"center", boxShadow:`0 4px 24px ${T.solarGlow}` }}>
              <div>
                <div style={{ fontFamily:T.display, fontSize:"2.6rem", fontWeight:800, color:T.solar, lineHeight:1 }}>£{result.saving}</div>
                <div style={{ fontSize:"0.75rem", color:T.inkFaint, marginTop:4, fontWeight:500 }}>estimated annual saving</div>
              </div>
              <div style={{ width:1, background:T.border, alignSelf:"stretch" }} />
              <div>
                <div style={{ fontFamily:T.display, fontSize:"2.6rem", fontWeight:800, color:T.ink, lineHeight:1 }}>{result.kwh}</div>
                <div style={{ fontSize:"0.75rem", color:T.inkFaint, marginTop:4, fontWeight:500 }}>kWh/yr · {result.area}</div>
              </div>
              <a href="#calculator" style={{ marginLeft:"auto", padding:"10px 18px", borderRadius:8, background:T.ink, color:"#fff", fontSize:"0.8rem", fontWeight:600, textDecoration:"none", whiteSpace:"nowrap", fontFamily:T.display }}>
                Full report ↓
              </a>
            </div>
          )}
        </div>

        {/* Trust signals */}
        <div className="fu4" style={{ display:"flex", gap:24, marginTop:48, alignItems:"center" }}>
          {["Confirmed by government March 2026","Kits expected July 2026","PVGIS irradiance data","Live UK grid stats"].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:"0.78rem", color:T.inkFaint, fontWeight:400 }}>
              <span style={{ color:T.green, fontSize:"0.85rem" }}>✓</span>{s}
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
    { num:"Mar 2026", label:"Confirmed",    sub:"Government announced the framework · 15 March 2026", accent:T.green  },
    { num:"~£500",    label:"Typical cost",  sub:"800W kit · no installer · no wiring required",       accent:T.solar  },
    { num:"£1,100",   label:"15-yr saving",  sub:"Carbon Brief analysis · typical London household",   accent:T.sky    },
  ];
  return (
    <section style={{ padding:"80px 32px", background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionLabel>Why now</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginTop:40 }}>
          {stats.map((s,i) => (
            <div key={i} style={{ padding:"36px 32px", borderRadius:16, border:`1px solid ${T.border}`, background:T.bg, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${s.accent},${s.accent}00)`, borderRadius:"16px 16px 0 0" }} />
              <div style={{ fontFamily:T.display, fontSize:"2.6rem", fontWeight:800, color:s.accent, lineHeight:1, marginBottom:12, letterSpacing:"-0.02em" }}>{s.num}</div>
              <div style={{ fontSize:"1rem", fontWeight:600, color:T.ink, marginBottom:8, fontFamily:T.display }}>{s.label}</div>
              <div style={{ fontSize:"0.82rem", color:T.inkMid, lineHeight:1.55 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop:36, fontSize:"0.9rem", color:T.inkMid, lineHeight:1.8, maxWidth:640 }}>
          Germany simplified its plug-in solar rules in 2024. Within 12 months, over 1.2 million households had a kit. The UK announcement follows the same path — once the BSI publishes the product standard (expected July 2026), compliant kits will start appearing in Lidl, Sainsbury's, and Amazon. Use the calculator now to understand exactly what your saving will look like before you buy.
        </p>
      </div>
    </section>
  );
}

// ─── FOR WHO ────────────────────────────────────────────────────────────────
function ForWho() {
  const groups = [
    { icon:"🏢", title:"Renters",        body:"4.6 million privately rented households in England. Traditional solar requires a landlord, a roof, and £10,000+. Plug-in needs none of those — and when kits arrive in shops, you can take yours with you when you move." },
    { icon:"🏙️", title:"Flat-dwellers",  body:"380,000+ homes in England have a balcony. The plan: clip panels to your railings, plug into a standard socket, start generating. No structural modifications, no planning permission, no landlord approval needed." },
    { icon:"🏡", title:"Homeowners too", body:"Already have roof solar? A balcony kit will cover your base load — fridge, router, standby devices — maximising the value of every watt you generate throughout the day." },
  ];
  return (
    <section style={{ padding:"80px 32px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionLabel>Who is this for</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
          {groups.map((g,i) => (
            <div key={i} style={{ padding:"32px", borderRadius:16, border:`1px solid ${T.border}`, background:T.surface, boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:"2rem", marginBottom:18 }}>{g.icon}</div>
              <div style={{ fontFamily:T.display, fontSize:"1.2rem", fontWeight:700, color:T.ink, marginBottom:12, letterSpacing:"-0.01em" }}>{g.title}</div>
              <div style={{ fontSize:"0.85rem", color:T.inkMid, lineHeight:1.75 }}>{g.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR SECTION ─────────────────────────────────────────────────────
function CalculatorSection({ gridData }) {
  return (
    <section id="calculator" style={{ padding:"60px 32px 80px", background:T.surface, borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionLabel>Calculator</SectionLabel>
        <h2 style={{ fontFamily:T.display, fontSize:"2rem", fontWeight:800, marginTop:12, marginBottom:8, letterSpacing:"-0.02em" }}>See what you'll save before kits go on sale</h2>
        <p style={{ color:T.inkMid, fontSize:"0.9rem", marginBottom:40, lineHeight:1.6 }}>Real PVGIS irradiance for your exact postcode · Live UK grid data · Shareable results link — so you're ready the moment compliant kits land in shops</p>
        <Calculator gridData={gridData} />
      </div>
    </section>
  );
}

// ─── FULL CALCULATOR ────────────────────────────────────────────────────────
function Calculator({ gridData }) {
  const init = decodeCalcState();
  const [postcodeInput, setPostcodeInput] = useState(init.postcode);
  const [location,      setLocation]      = useState(null);
  const [pvgisKwh,      setPvgisKwh]      = useState(null);
  const [pvgisLoading,  setPvgisLoading]  = useState(false);
  const [pvgisError,    setPvgisError]    = useState(null);
  const [panelSize,     setPanelSize]     = useState(PANEL_SIZES.find(p=>p.watts===init.watts)||PANEL_SIZES[2]);
  const [placement,     setPlacement]     = useState(PLACEMENTS.find(p=>p.id===init.placementId)||PLACEMENTS[0]);
  const [presence,      setPresence]      = useState(PRESENCE.find(p=>p.id===init.presenceId)||PRESENCE[1]);
  const [supplier,      setSupplier]      = useState(SUPPLIERS.find(s=>s.id===init.supplierId)||SUPPLIERS[0]);
  const [tariff,        setTariff]        = useState(init.tariff);
  const [email,         setEmail]         = useState("");
  const [submitted,     setSubmitted]     = useState(false);
  const [copied,        setCopied]        = useState(false);

  useEffect(() => { if (init.postcode) geocodeAndFetch(init.postcode); }, []);
  useEffect(() => { if (location) fetchPVGIS(location.lat, location.lon, panelSize.kWp, placement.angle, placement.aspect); }, [panelSize, placement]);

  async function geocodeAndFetch(pc) {
    const clean = pc.replace(/\s/g,"").toUpperCase();
    if (clean.length < 4) return;
    setPvgisError(null);
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const j = await r.json();
      if (j.status!==200) { setPvgisError("Postcode not found — please check it."); return; }
      const { latitude:lat, longitude:lon, admin_district } = j.result;
      setLocation({ lat, lon, area:admin_district||clean });
      fetchPVGIS(lat, lon, panelSize.kWp, placement.angle, placement.aspect);
    } catch(_) { setPvgisError("Could not look up postcode. Check your connection."); }
  }

  async function fetchPVGIS(lat, lon, kWp, angle, aspect) {
    setPvgisLoading(true); setPvgisError(null);
    try {
      const url = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${kWp}&loss=14&outputformat=json&mountingplace=free&angle=${angle}&aspect=${aspect}`;
      const j   = await (await fetch(url)).json();
      const kwh = j.outputs?.totals?.fixed?.E_y;
      if (kwh) setPvgisKwh(kwh); else throw 0;
    } catch(_) {
      const n=Math.max(0,Math.min(1,(58-lat)/8));
      setPvgisKwh(kWp*(870+n*180)*(aspect!==0?0.82:(angle>=80?0.78:1.0)));
      setPvgisError("Latitude estimate used — PVGIS temporarily unavailable.");
    } finally { setPvgisLoading(false); }
  }

  function pickSupplier(s) { setSupplier(s); if (s.rate) setTariff(s.rate); }

  async function share() {
    const url = encodeCalcState({ postcode:postcodeInput.replace(/\s/g,"").toUpperCase(), watts:panelSize.watts, placementId:placement.id, presenceId:presence.id, tariff, supplierId:supplier.id });
    try { await navigator.clipboard.writeText(url); } catch(_) { prompt("Copy link:", url); }
    setCopied(true); setTimeout(()=>setCopied(false), 3000);
  }

  const annualGen    = pvgisKwh||0;
  const selfConsumed = annualGen * presence.sc;
  const annualSaving = (selfConsumed * tariff) / 100;
  const payback      = annualSaving > 0 ? panelSize.cost / annualSaving : 0;
  const lifetime     = annualSaving * 15 - panelSize.cost;
  const co2Kg        = selfConsumed * 0.207;
  const hasResults   = annualGen > 0;
  const tariffPct    = ((tariff-10)/40)*100;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>

      {/* LEFT — inputs */}
      <div style={{ padding:"32px", borderRadius:16, border:`1px solid ${T.border}`, background:T.bg }}>

        <CLabel>Your postcode</CLabel>
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          <input type="text" placeholder="e.g. BN1 1AA" value={postcodeInput}
            onChange={e=>setPostcodeInput(e.target.value.toUpperCase())}
            onKeyDown={e=>e.key==="Enter"&&geocodeAndFetch(postcodeInput)}
            style={{ flex:1, padding:"12px 14px", borderRadius:9, border:`1.5px solid ${location?T.solarBorder:T.border}`, background:T.surface, color:T.ink, fontSize:"0.95rem", outline:"none", fontFamily:T.body, letterSpacing:"0.05em", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}
          />
          <button onClick={()=>geocodeAndFetch(postcodeInput)} disabled={pvgisLoading}
            style={{ padding:"12px 18px", borderRadius:9, border:"none", background:pvgisLoading?T.border:T.solar, color:pvgisLoading?T.inkFaint:"#fff", fontWeight:700, fontFamily:T.display, boxShadow:pvgisLoading?"none":`0 2px 10px ${T.solarBorder}` }}>
            {pvgisLoading?"⟳":"Go"}
          </button>
        </div>
        {location && <div style={{ fontSize:"0.75rem", color:T.green, marginBottom:4, fontWeight:500 }}>✓ PVGIS data loaded for {location.area}</div>}
        {pvgisError && <div style={{ fontSize:"0.75rem", color:T.solar, marginBottom:4 }}>⚠ {pvgisError}</div>}

        <Divider />

        <CLabel>System size</CLabel>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {PANEL_SIZES.map(p => (
            <CChip key={p.watts} active={panelSize.watts===p.watts} onClick={()=>setPanelSize(p)}>
              {p.label}{p.max&&<CBadge>UK max</CBadge>}
            </CChip>
          ))}
        </div>

        <CLabel>Placement</CLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
          {PLACEMENTS.map(p => (
            <CChip key={p.id} active={placement.id===p.id} onClick={()=>setPlacement(p)}>{p.icon} {p.label}</CChip>
          ))}
        </div>

        <CLabel>Home during the day?</CLabel>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {PRESENCE.map(p => (
            <CChip key={p.id} active={presence.id===p.id} onClick={()=>setPresence(p)}>{p.label}</CChip>
          ))}
        </div>

        <CLabel>Supplier · Ofgem Q2 2026 · <a href="https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" target="_blank" rel="noreferrer" style={{ color:T.sky }}>verify ↗</a></CLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:14 }}>
          {SUPPLIERS.map(s => (
            <button key={s.id} onClick={()=>pickSupplier(s)}
              style={{ padding:"9px 10px", borderRadius:7, border:`1.5px solid ${supplier.id===s.id?T.solar:T.border}`, background:supplier.id===s.id?T.solarLight:T.surface, color:supplier.id===s.id?T.solar:T.inkMid, fontSize:"0.75rem", fontWeight:supplier.id===s.id?600:400, fontFamily:T.body, textAlign:"left" }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:4 }}>
          <input type="range" min="10" max="50" step="0.5" value={tariff}
            onChange={e=>{setTariff(parseFloat(e.target.value));pickSupplier(SUPPLIERS.find(s=>s.id==="manual"));}}
            style={{ flex:1, background:`linear-gradient(to right,${T.solar} 0%,${T.solar} ${tariffPct}%,${T.border} ${tariffPct}%,${T.border} 100%)`, height:4, borderRadius:2, outline:"none" }}
          />
          <span style={{ fontFamily:T.display, fontSize:"1.3rem", fontWeight:800, color:T.solar, minWidth:54, textAlign:"right", letterSpacing:"-0.02em" }}>{tariff.toFixed(1)}p</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.68rem", color:T.inkFaint }}>
          <span>10p</span><span>50p/kWh</span>
        </div>
      </div>

      {/* RIGHT — results */}
      <div style={{ padding:"32px", borderRadius:16, border:`1px solid ${T.border}`, background:T.surface, boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
        {!hasResults ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", gap:16, padding:"60px 20px" }}>
            <div style={{ width:64, height:64, borderRadius:16, background:T.solarLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem" }}>📍</div>
            <div style={{ fontFamily:T.display, fontSize:"1.1rem", fontWeight:700, color:T.ink, lineHeight:1.5 }}>Enter your postcode to see your estimate</div>
            <div style={{ fontSize:"0.78rem", color:T.inkFaint, lineHeight:1.6 }}>Real PVGIS irradiance — no two postcodes are identical</div>
          </div>
        ) : (
          <div className="fi">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <span style={{ fontFamily:T.display, fontSize:"0.9rem", fontWeight:700, color:T.ink }}>{location?.area}</span>
              <button onClick={share} style={{ padding:"6px 14px", borderRadius:20, border:`1.5px solid ${copied?T.green:T.border}`, background:copied?T.greenLight:"transparent", color:copied?T.green:T.inkFaint, fontSize:"0.72rem", fontFamily:T.body }}>
                {copied?"✓ Copied":"⬆ Share"}
              </button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              <RCard label="Annual generation" value={`${annualGen.toFixed(0)} kWh`} sub="PVGIS · your postcode" hi />
              <RCard label="Annual saving"     value={`£${annualSaving.toFixed(0)}`}  sub={`at ${tariff.toFixed(1)}p/kWh`} hi />
              <RCard label="Payback period"    value={`${payback.toFixed(1)} yrs`} />
              <RCard label="CO₂ offset / yr"   value={`${co2Kg.toFixed(0)} kg`}    sub="207g/kWh · DESNZ" />
            </div>

            {/* Lifetime */}
            <div style={{ padding:"20px", borderRadius:12, background:lifetime>0?T.greenLight:T.redLight, border:`1.5px solid ${lifetime>0?T.greenBorder:"rgba(220,38,38,0.18)"}`, textAlign:"center", marginBottom:16 }}>
              <div style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:T.inkFaint, marginBottom:10 }}>15-year net saving after £{panelSize.cost} system cost</div>
              <div style={{ fontFamily:T.display, fontSize:"3rem", fontWeight:800, color:lifetime>0?T.green:T.red, lineHeight:1, letterSpacing:"-0.03em" }}>
                {lifetime>=0?"+":""}£{Math.abs(lifetime).toFixed(0)}
              </div>
              <div style={{ fontSize:"0.72rem", color:T.inkFaint, marginTop:8 }}>Based on constant {tariff.toFixed(1)}p tariff</div>
            </div>

            {/* Live grid */}
            {gridData && (
              <div style={{ padding:"14px 16px", borderRadius:10, border:`1px solid ${T.border}`, background:T.bg, marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:T.inkFaint }}>UK grid right now</span>
                  <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.68rem", color:T.green, fontWeight:500 }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:T.green, display:"inline-block", animation:"pulse 2s infinite" }} /> Live
                  </span>
                </div>
                <div style={{ height:7, borderRadius:4, overflow:"hidden", display:"flex", marginBottom:8, background:T.border }}>
                  {[{k:"solar",c:T.solar,v:gridData.solar},{k:"wind",c:T.fuelWind,v:gridData.wind},{k:"nuclear",c:T.fuelNuclear,v:gridData.nuclear},{k:"biomass",c:T.fuelBiomass,v:gridData.biomass},{k:"gas",c:T.fuelGas,v:gridData.gas}]
                    .filter(f=>f.v>0.5).map(f=><div key={f.k} style={{ width:`${f.v}%`, background:f.c, transition:"width 0.6s" }} />)}
                </div>
                <div style={{ display:"flex", gap:"4px 14px", flexWrap:"wrap" }}>
                  {[{l:"Solar",c:T.solar,v:gridData.solar},{l:"Wind",c:T.fuelWind,v:gridData.wind},{l:"Gas",c:T.fuelGas,v:gridData.gas}].map(f=>(
                    <span key={f.l} style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.7rem", color:T.inkMid }}>
                      <span style={{ width:8, height:8, borderRadius:2, background:f.c, display:"inline-block" }} />{f.l} {f.v.toFixed(1)}%
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Email */}
            {!submitted ? (
              <div style={{ padding:"18px", borderRadius:10, border:`1.5px solid ${T.solarBorder}`, background:T.solarLight }}>
                <div style={{ fontFamily:T.display, fontSize:"0.95rem", fontWeight:700, color:T.ink, marginBottom:6 }}>Get the full report</div>
                <p style={{ fontSize:"0.75rem", color:T.inkMid, lineHeight:1.6, marginBottom:14 }}>Kit picks · DNO walkthrough · Alert when compliant kits land in UK shops (July 2026).</p>
                <div style={{ display:"flex", gap:8 }}>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&email&&setSubmitted(true)}
                    style={{ flex:1, padding:"10px 12px", borderRadius:8, border:`1px solid ${T.border}`, background:T.surface, color:T.ink, fontSize:"0.85rem", outline:"none", fontFamily:T.body }}
                  />
                  <button onClick={()=>email&&setSubmitted(true)}
                    style={{ padding:"10px 16px", borderRadius:8, border:"none", background:T.solar, color:"#fff", fontWeight:700, fontSize:"0.82rem", fontFamily:T.display, whiteSpace:"nowrap", boxShadow:`0 2px 8px ${T.solarBorder}` }}>
                    Send →
                  </button>
                </div>
              </div>
            ) : (
              <div className="fu" style={{ padding:"18px", borderRadius:10, border:`1px solid ${T.greenBorder}`, background:T.greenLight, textAlign:"center" }}>
                <div style={{ fontSize:"1.5rem", marginBottom:8 }}>✅</div>
                <div style={{ fontFamily:T.display, fontSize:"0.95rem", fontWeight:700, color:T.ink }}>You're on the list</div>
                <div style={{ fontSize:"0.75rem", color:T.inkMid, marginTop:6 }}>We'll alert you when compliant kits hit UK shops.</div>
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
    { n:"01", title:"Buy a compliant kit",        body:"Once the BSI product standard is published (expected July 2026), compliant kits will be available from EcoFlow, Amazon, Lidl, and others. Expect to pay £500–£750 for an 800W system." },
    { n:"02", title:"Install it yourself",         body:"Mount on your balcony rail, flat roof, or garden. South-facing at ~35° is ideal, but east/west works well. No tools, no trades." },
    { n:"03", title:"Plug in and notify your DNO", body:"Connect the cable to a standard 13A socket. Notify your Distribution Network Operator within 28 days via a simple online form — G98 rules." },
  ];
  return (
    <section id="how-it-works" style={{ padding:"80px 32px", borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionLabel>How it works</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:40, marginTop:48 }}>
          {steps.map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily:T.display, fontSize:"3.5rem", fontWeight:800, color:T.borderFaint, lineHeight:1, marginBottom:20, letterSpacing:"-0.03em" }}>{s.n}</div>
              <div style={{ fontFamily:T.display, fontSize:"1.1rem", fontWeight:700, color:T.ink, marginBottom:12, lineHeight:1.3, letterSpacing:"-0.01em" }}>{s.title}</div>
              <div style={{ fontSize:"0.875rem", color:T.inkMid, lineHeight:1.75 }}>{s.body}</div>
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
    <section id="faq" style={{ padding:"80px 32px", background:T.surface, borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionLabel>FAQ</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:T.border, borderRadius:16, overflow:"hidden", marginTop:40 }}>
          {FAQ_ITEMS.map((item,i) => (
            <div key={i} style={{ background:T.surface }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"22px 26px", background:"transparent", border:"none", textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, fontFamily:T.body }}>
                <span style={{ fontFamily:T.display, fontSize:"0.9rem", fontWeight:700, color:open===i?T.solar:T.ink, lineHeight:1.4, flex:1, letterSpacing:"-0.01em" }}>{item.q}</span>
                <span style={{ color:open===i?T.solar:T.inkFaint, fontSize:"1.3rem", lineHeight:1, flexShrink:0, transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s ease" }}>+</span>
              </button>
              {open===i && (
                <div className="fu" style={{ padding:"0 26px 22px", fontSize:"0.85rem", color:T.inkMid, lineHeight:1.8 }}>
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

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding:"56px 32px 40px", borderTop:`1px solid ${T.border}`, background:T.bg }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:48, flexWrap:"wrap", gap:36 }}>
          <div>
            <Logo />
            <p style={{ fontSize:"0.82rem", color:T.inkFaint, marginTop:14, maxWidth:280, lineHeight:1.65 }}>
              Independent UK plug-in solar comparison, news, and savings tools. Not affiliated with any manufacturer or energy supplier.
            </p>
          </div>
          <div style={{ display:"flex", gap:56 }}>
            {[
              { heading:"Tools",   links:["Calculator","Savings guide"] },
              { heading:"Guides",  links:["Is it legal?","For renters","Best kits","Notify your DNO"] },
              { heading:"Compare", links:["EcoFlow","Anker SOLIX","800W kits","400W kits"] },
            ].map(col => (
              <div key={col.heading}>
                <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:T.inkFaint, marginBottom:16, fontFamily:T.display }}>{col.heading}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom:10 }}>
                    <a href="#" style={{ fontSize:"0.84rem", color:T.inkMid, textDecoration:"none" }}
                      onMouseEnter={e=>e.target.style.color=T.ink} onMouseLeave={e=>e.target.style.color=T.inkMid}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Data provenance */}
        <div style={{ padding:"20px 24px", borderRadius:12, border:`1px solid ${T.border}`, background:T.surface, marginBottom:28 }}>
          <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:T.inkFaint, marginBottom:14, fontFamily:T.display }}>Data sources</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 28px" }}>
            {[
              { label:"PVGIS · EU JRC",       badge:"live",      bc:T.green, href:"https://re.jrc.ec.europa.eu" },
              { label:"Carbon Intensity API",  badge:"live",      bc:T.green, href:"https://carbonintensity.org.uk" },
              { label:"Ofgem tariffs",         badge:"Q2 2026",   bc:T.solar, href:"https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" },
              { label:"System costs",          badge:"Apr 2026",  bc:T.solar, href:"https://www.ecoflow.com/uk" },
              { label:"CO₂ intensity factor",  badge:"DESNZ 2024",bc:T.inkFaint, href:"https://www.gov.uk/government/collections/uk-energy-in-brief" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:7, textDecoration:"none" }}>
                <span style={{ fontSize:"0.6rem", padding:"3px 8px", borderRadius:20, background:`${s.bc}18`, color:s.bc, fontWeight:600, whiteSpace:"nowrap", border:`1px solid ${s.bc}30` }}>
                  {s.badge==="live"?"● live":s.badge}
                </span>
                <span style={{ fontSize:"0.78rem", color:T.inkMid }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontSize:"0.78rem", color:T.inkFaint }}>© 2026 plugin.solar · Independent · Ad-free</div>
          <div style={{ fontSize:"0.72rem", color:T.inkFaint, maxWidth:460, lineHeight:1.6, textAlign:"right" }}>
            Estimates are indicative. Actual savings depend on placement, shading, and tariff. Update tariffs quarterly — <a href="https://www.ofgem.gov.uk" target="_blank" rel="noreferrer" style={{ color:T.solar }}>Ofgem.gov.uk</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SHARED PRIMITIVES ───────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:T.inkFaint, fontFamily:T.display }}>{children}</span>
      <div style={{ flex:1, height:1, background:T.border }} />
    </div>
  );
}
function CLabel({ children }) {
  return <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.inkFaint, marginBottom:10, fontFamily:T.display }}>{children}</div>;
}
function Divider() {
  return <div style={{ height:1, background:T.border, margin:"20px 0" }} />;
}
function CChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding:"9px 13px", borderRadius:8, border:`1.5px solid ${active?T.solar:T.border}`, background:active?T.solarLight:T.surface, color:active?T.solar:T.inkMid, fontSize:"0.8rem", fontWeight:active?600:400, fontFamily:T.body, display:"flex", alignItems:"center", gap:4, whiteSpace:"nowrap" }}>
      {children}
    </button>
  );
}
function CBadge({ children }) {
  return <span style={{ fontSize:"0.55rem", padding:"2px 5px", borderRadius:3, background:`${T.solar}20`, color:T.solar, fontWeight:700, marginLeft:3 }}>{children}</span>;
}
function RCard({ label, value, sub, hi }) {
  return (
    <div style={{ padding:"16px", borderRadius:10, border:`1.5px solid ${hi?T.solarBorder:T.border}`, background:hi?T.solarLight:T.bg, boxShadow:hi?`0 2px 12px ${T.solarGlow}`:"none" }}>
      <div style={{ fontFamily:T.display, fontSize:"1.7rem", fontWeight:800, color:hi?T.solar:T.ink, lineHeight:1, marginBottom:5, letterSpacing:"-0.02em" }}>{value}</div>
      <div style={{ fontSize:"0.7rem", color:T.inkFaint, fontWeight:500 }}>{label}</div>
      {sub && <div style={{ fontSize:"0.62rem", color:T.inkFaint, marginTop:3, opacity:0.8 }}>{sub}</div>}
    </div>
  );
}
