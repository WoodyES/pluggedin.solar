import { useState } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import EmailCapture from "./EmailCapture";
import { useMarket } from "../MarketContext";

// ─── MARKET-SPECIFIC COPY ──────────────────────────────────────────────────
const MARKET_QUIZ = {
  uk: {
    currency: "£",
    budgetOptions: [
      { id: "low",  label: "Under £400", desc: "Entry-level 400W panel-only kit" },
      { id: "mid",  label: "£400–£700",  desc: "Mid-range 600–800W kit, best value per watt" },
      { id: "high", label: "£700+",      desc: "Premium 800W kit with battery or smart features" },
    ],
    budgetSub: "Prices are current UK estimates. Compliant kits on sale now via B&Q, Currys, Amazon and Screwfix.",
    disclaimer: "Plug-in solar became legal in the UK on 27 August 2026. Compliant kits from EcoFlow, Anker SOLIX, Bright Saver and Craftstrom are on sale now at B&Q, Currys, Amazon and Screwfix.",
    ctaLabel: "Calculate exact savings →",
  },
  us: {
    currency: "$",
    budgetOptions: [
      { id: "low",  label: "Under $500",  desc: "Entry-level 400W panel + basic inverter" },
      { id: "mid",  label: "$500–$900",   desc: "Mid-range 800W kit with UL-listed inverter" },
      { id: "high", label: "$900+",       desc: "Premium 800W kit with battery / whole-home integration" },
    ],
    budgetSub: "Prices are US-market estimates. Small plug-in kits (200–800W) with UL 1741-listed inverters are widely available on Amazon US.",
    disclaimer: "US plug-in solar sits in a grey area of NEC Article 705. Small kits (200–800W) with UL 1741-listed inverters are widely used; utility notification requirements vary by state and provider — check yours before install.",
    ctaLabel: "Calculate your savings →",
  },
  au: {
    currency: "A$",
    budgetOptions: [
      { id: "low",  label: "Under A$500",  desc: "Portable panel + camping-grade inverter" },
      { id: "mid",  label: "A$500–A$1000", desc: "Portable panel + LFP power station combo" },
      { id: "high", label: "A$1000+",      desc: "High-capacity portable + battery for evening use" },
    ],
    budgetSub: "Prices are AU-market estimates. Portable and off-grid kits from EcoFlow, Anker and Jackery are widely available on Amazon AU.",
    disclaimer: "Grid-tied plug-in solar in Australia requires CEC-approved inverters and a licensed installer under AS/NZS 4777. Portable and off-grid kits — panels feeding a power station — are widely used and legal without accreditation.",
    ctaLabel: "Calculate your savings →",
  },
};

// ─── QUIZ DATA ─────────────────────────────────────────────────────────────

const BASE_QUESTIONS = [
  {
    id: "location",
    label: "Where will you install?",
    sub: "This affects how much sunlight your panels will receive.",
    options: [
      { id: "balcony",   icon: "🏙️", label: "Balcony railing",    desc: "Clipped to a south, east or west-facing railing" },
      { id: "garden",    icon: "🌿", label: "Garden",              desc: "Ground-mounted or angled frame on lawn or patio" },
      { id: "flat_roof", icon: "🏠", label: "Flat roof / terrace", desc: "Low-angle mount on a flat surface with open sky" },
      { id: "shed",      icon: "🛖", label: "Shed or garage roof", desc: "Angled roof on an outbuilding, facing roughly south" },
    ],
  },
  {
    id: "orientation",
    label: "Which way does your space face?",
    sub: "South is ideal, but east/west still works well.",
    options: [
      { id: "south",      icon: "☀️", label: "South",          desc: "Gets direct sun most of the day — maximum output" },
      { id: "south_east", icon: "🌅", label: "South-east",     desc: "Strong morning sun, good overall production" },
      { id: "south_west", icon: "🌇", label: "South-west",     desc: "Strong afternoon sun, great for evening usage" },
      { id: "east_west",  icon: "↔️", label: "East or West",   desc: "About 80% of south-facing output — still worthwhile" },
    ],
  },
  {
    id: "space",
    label: "How much space do you have?",
    sub: "A standard panel is roughly 1.7m × 1m. More panels = more watts.",
    options: [
      { id: "small",  icon: "📐", label: "Compact",   desc: "Room for 1 panel — about 1.7m of railing or ground" },
      { id: "medium", icon: "📏", label: "Standard",  desc: "Room for 2 panels side by side — about 2–3m" },
      { id: "large",  icon: "📐", label: "Plenty",    desc: "3m+ of railing or open ground — go max 800W" },
    ],
  },
  {
    id: "battery",
    label: "Interested in a battery?",
    sub: "A battery stores daytime solar for use in the evening. Optional add-on.",
    options: [
      { id: "yes",   icon: "🔋", label: "Yes please",  desc: "I want to store surplus energy for evenings" },
      { id: "maybe", icon: "🤔", label: "Maybe later",  desc: "I'd consider adding one down the line" },
      { id: "no",    icon: "⚡",       label: "No thanks",    desc: "I'll use solar as it generates — keep it simple" },
    ],
  },
  // Budget question is spliced in at render time from MARKET_QUIZ (currency-specific)
];

// Build the final question list for a given market
function questionsForMarket(mCopy) {
  return [
    ...BASE_QUESTIONS,
    {
      id: "budget",
      label: "What's your budget?",
      sub: mCopy.budgetSub,
      options: mCopy.budgetOptions.map(o => ({ ...o, icon: "💷" })),
    },
  ];
}

// ─── PRODUCT CATALOGUE ────────────────────────────────────────────────────
const AWIN_BASE = "https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=";
const PRODUCTS = [
  { id: "ecoflow-800",        name: "EcoFlow STREAM 800W Garden Kit",      brand: "EcoFlow", watts: 800, battery: false, price: "~£599",   features: ["800W microinverter + 2 rigid solar panels", "True plug-and-play into 13A socket", "App monitoring with AI assistant", "Garden, balcony & flat-roof mounts"],          best: ["garden", "flat_roof", "shed"], badge: "Best overall",      accent: T.solar, image: "/images/products/stream-hero.png",       link: AWIN_BASE + encodeURIComponent("https://uk.ecoflow.com/products/stream-garden-ground-kit") },
  { id: "anker-solarbank2",   name: "Anker SOLIX Solarbank 2 E1600",      brand: "Anker",   watts: 800, battery: true,  price: "~£899",   features: ["800W with built-in 1.6kWh battery", "Microinverter & battery in one unit", "Clip-on balcony railing mount", "Wi-Fi & Bluetooth monitoring"],                      best: ["balcony"],                     badge: "Best for balconies", accent: T.sky,   image: "/images/products/panel400-hero.jpg",     link: null },
  { id: "ecoflow-balcony",    name: "EcoFlow STREAM Balcony Kit",          brand: "EcoFlow", watts: 800, battery: false, price: "~£499",   features: ["800W microinverter + balcony panels", "Compact clip-on railing mount", "App monitoring included", "No drilling required"],                                         best: ["balcony"],                     badge: "Mid-range pick",    accent: T.solar, image: "/images/products/stream-balcony.jpg",    link: AWIN_BASE + encodeURIComponent("https://uk.ecoflow.com/pages/stream-balcony-solar-system") },
  { id: "generic-400",        name: "Budget 400W Starter Kit",             brand: "Various", watts: 400, battery: false, price: "~£299",   features: ["Single 400W panel + microinverter", "Basic plug-and-play setup", "Suitable for small spaces", "No app — use a smart plug to monitor"],                             best: ["balcony", "garden"],           badge: "Budget friendly",   accent: T.green, image: "/images/products/panel400-hero.jpg",     link: null },
  { id: "ecoflow-ultra",      name: "EcoFlow STREAM Ultra",                brand: "EcoFlow", watts: 800, battery: true,  price: "~£899",   features: ["1.92kWh LFP battery + 800W solar", "AI-driven TOU energy management", "Expandable up to 11.52kWh", "Requires electrician installation"],                         best: ["garden", "flat_roof", "shed"], badge: "Premium choice",    accent: T.solar, image: "/images/products/stream-ultra.png",     link: AWIN_BASE + encodeURIComponent("https://uk.ecoflow.com/products/stream-ultra-pro") },
  { id: "anker-solarbank4",   name: "Anker SOLIX Solarbank 4 E5000 Pro",  brand: "Anker",   watts: 800, battery: true,  price: "~£1,299", features: ["5kWh LFP battery storage", "Up to 2,500W output via PluginPower 2.0", "4 MPPT channels for max solar capture", "Premium all-in-one system"],                      best: ["balcony", "garden"],           badge: "Premium battery",   accent: T.sky,   image: "/images/products/panel400-lifestyle.jpg", link: null },
];

function recommend(answers) {
  const { location, orientation, space, battery, budget } = answers;
  return PRODUCTS
    .map(p => {
      let score = 0;
      if (p.best.includes(location)) score += 3;
      if (space === "small" && p.watts <= 400) score += 3;
      if (space === "medium" && p.watts >= 600) score += 2;
      if (space === "large" && p.watts === 800) score += 3;
      if (battery === "yes" && p.battery) score += 3;
      if (battery === "no" && !p.battery) score += 2;
      if (battery === "maybe" && p.battery) score += 1;
      const priceNum = parseInt(p.price.replace(/[^0-9]/g, ""));
      if (budget === "low" && priceNum <= 400) score += 3;
      if (budget === "mid" && priceNum > 400 && priceNum <= 700) score += 3;
      if (budget === "high" && priceNum > 700) score += 3;
      if (budget === "low" && priceNum > 700) score -= 2;
      if (budget === "mid" && priceNum > 1000) score -= 1;
      if (["south", "south_east", "south_west"].includes(orientation) && p.watts === 800) score += 1;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function PanelFinderQuiz() {
  const { market } = useMarket();
  const mCopy = MARKET_QUIZ[market] || MARKET_QUIZ.uk;
  const QUESTIONS = questionsForMarket(mCopy);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = results ? 100 : Math.round((step / total) * 100);

  function select(optionId) {
    const next = { ...answers, [q.id]: optionId };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setResults(recommend(next));
    }
  }

  function goBack() { if (step > 0) setStep(step - 1); }

  function restart() { setStep(0); setAnswers({}); setResults(null); }

  if (results) {
    const [primary, ...alts] = results;
    return (
      <div style={{ fontFamily: T.body, color: T.ink }}>
        <ProgressBar progress={100} />
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkFaint, fontFamily: T.display, marginBottom: 12 }}>Your recommendation</div>
          <h2 style={{ fontFamily: T.display, fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            We think you&rsquo;ll love the
            <br /><span style={{ color: T.solar }}>{primary.name}</span>
          </h2>
        </div>

        <ProductCard product={primary} primary />

        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkFaint, fontFamily: T.display, marginBottom: 16 }}>Also consider</div>
          <div className="quiz-alts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {alts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        <div style={{ marginTop: 32, padding: "16px 20px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.surfaceAlt, fontSize: "0.78rem", color: T.inkMid, lineHeight: 1.7 }}>
          {mCopy.disclaimer}
        </div>

        {/* Email signup */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button onClick={restart} style={{ flex: 1, padding: "14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.inkMid, fontSize: "0.85rem", fontWeight: 600, fontFamily: T.display, cursor: "pointer" }}>
            Retake quiz
          </button>
          <Link to="/calculator" style={{ flex: 1, padding: "14px", borderRadius: 10, border: "none", background: T.solar, color: "#fff", fontSize: "0.85rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none", textAlign: "center", boxShadow: `0 2px 12px ${T.solarBorder}`, cursor: "pointer" }}>
            {mCopy.ctaLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: T.body, color: T.ink }}>
      <ProgressBar progress={progress} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkFaint, fontFamily: T.display }}>
          Step {step + 1} of {total}
        </div>
        {step > 0 && (
          <button onClick={goBack} style={{ background: "none", border: "none", color: T.inkFaint, fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", fontFamily: T.body, padding: "4px 8px" }}>
            &larr; Back
          </button>
        )}
      </div>

      <h3 style={{ fontFamily: T.display, fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.2 }}>
        {q.label}
      </h3>
      <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 28, lineHeight: 1.6 }}>{q.sub}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => {
          const selected = answers[q.id] === opt.id;
          return (
            <button key={opt.id} onClick={() => select(opt.id)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "18px 20px", borderRadius: 12,
                border: `1.5px solid ${selected ? T.solar : T.border}`,
                background: selected ? T.solarLight : T.surface,
                cursor: "pointer", textAlign: "left",
                boxShadow: selected ? `0 2px 12px ${T.solarGlow}` : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = T.solarBorder; e.currentTarget.style.boxShadow = `0 2px 8px ${T.solarGlow}`; } }}
              onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; } }}
            >
              <span style={{ fontSize: "1.5rem", flexShrink: 0, width: 40, textAlign: "center" }}>{opt.icon}</span>
              <div>
                <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: selected ? T.solar : T.ink, letterSpacing: "-0.01em", marginBottom: 2 }}>{opt.label}</div>
                <div style={{ fontSize: "0.78rem", color: T.inkMid, lineHeight: 1.5 }}>{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────

function ProgressBar({ progress }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: T.border, marginBottom: 28, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${T.solar},${T.solarBright})`, borderRadius: 2, transition: "width 0.35s ease" }} />
    </div>
  );
}

function ProductCard({ product: p, primary }) {
  const imgH = primary ? 180 : 120;
  const NameTag = p.link ? "a" : "div";
  const nameProps = p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer sponsored", style: { textDecoration: "none", color: T.ink } } : {};
  return (
    <div style={{
      padding: primary ? "28px" : "20px", borderRadius: 16,
      border: `1.5px solid ${primary ? T.solarBorder : T.border}`,
      background: primary ? T.surface : T.bg,
      boxShadow: primary ? `0 4px 24px ${T.solarGlow}` : "0 1px 6px rgba(0,0,0,0.04)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.accent},${p.accent}00)`, borderRadius: "16px 16px 0 0" }} />

      {/* Product image */}
      {p.image && (
        <div style={{ marginBottom: primary ? 18 : 12, borderRadius: 10, overflow: "hidden", background: T.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", height: imgH }}>
          <img src={p.image} alt={p.name} loading="lazy" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </div>
      )}

      <span style={{
        display: "inline-block", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
        padding: "4px 10px", borderRadius: 20, background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}30`,
        marginBottom: primary ? 16 : 12,
      }}>{p.badge}</span>
      <NameTag {...nameProps}>
        <div style={{ fontFamily: T.display, fontSize: primary ? "1.35rem" : "1rem", fontWeight: 800, color: T.ink, letterSpacing: "-0.02em", marginBottom: 4, lineHeight: 1.2 }}>{p.name}</div>
      </NameTag>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: primary ? 20 : 14 }}>
        <span style={{ fontFamily: T.display, fontSize: primary ? "1.5rem" : "1.1rem", fontWeight: 800, color: T.solar }}>{p.price}</span>
        <span style={{ fontSize: "0.72rem", color: T.inkFaint }}>estimated</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: primary ? 8 : 6 }}>
        {p.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: primary ? "0.84rem" : "0.78rem", color: T.inkMid }}>
            <span style={{ color: T.green, fontSize: "0.8rem", flexShrink: 0 }}>✓</span>{f}
          </div>
        ))}
      </div>

      {/* CTA button for products with affiliate links */}
      {p.link && (
        <a href={p.link} target="_blank" rel="noopener noreferrer sponsored" style={{
          display: "block", marginTop: primary ? 18 : 14, padding: primary ? "14px 20px" : "10px 16px",
          borderRadius: 10, background: p.accent, color: "#fff", textAlign: "center", textDecoration: "none",
          fontFamily: T.display, fontSize: primary ? "0.9rem" : "0.8rem", fontWeight: 700,
          boxShadow: `0 2px 12px ${p.accent}30`, transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          View on {p.brand} &rarr;
        </a>
      )}

      {/* Legal-status note removed here — the market-specific disclaimer at the
          bottom of the results panel already communicates this per market. */}
    </div>
  );
}
