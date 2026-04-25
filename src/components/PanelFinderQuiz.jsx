import { useState } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import EmailCapture from "./EmailCapture";

// ─── QUIZ DATA ─────────────────────────────────────────────────────────────

const QUESTIONS = [
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
  {
    id: "budget",
    label: "What's your budget?",
    sub: "Prices are estimates for when compliant kits arrive (~July 2026).",
    options: [
      { id: "low",  icon: "💷", label: "Under £400",  desc: "Entry-level 400W panel-only kit" },
      { id: "mid",  icon: "💷", label: "£400–£700",  desc: "Mid-range 600–800W kit, best value per watt" },
      { id: "high", icon: "💷", label: "£700+",       desc: "Premium 800W kit with battery or smart features" },
    ],
  },
];

// ─── PLACEHOLDER PRODUCT CATALOGUE ─────────────────────────────────────────
const AWIN_BASE = "https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=";
const PRODUCTS = [
  { id: "ecoflow-800",        name: "EcoFlow PowerStream 800W",         brand: "EcoFlow", watts: 800, battery: true,  price: "~£799",   features: ["800W dual-panel kit", "600Wh plug-in battery", "App with live monitoring", "Balcony & garden mount"], best: ["garden", "flat_roof", "shed"], badge: "Best overall",    accent: T.solar, image: "/images/products/stream-hero.png",  link: AWIN_BASE + encodeURIComponent("https://www.ecoflow.com/uk/stream-balcony-solar-system") },
  { id: "anker-800",          name: "Anker SOLIX 800W Balcony Kit",     brand: "Anker",   watts: 800, battery: false, price: "~£599",   features: ["800W dual-panel", "Micro-inverter included", "Lightweight balcony brackets", "Wi-Fi monitoring"],     best: ["balcony"],                    badge: "Best for balconies", accent: T.sky, image: "/images/products/panel400-hero.jpg", link: null },
  { id: "ecoflow-600",        name: "EcoFlow PowerStream 600W",         brand: "EcoFlow", watts: 600, battery: true,  price: "~£649",   features: ["600W dual-panel kit", "600Wh battery option", "App monitoring", "Compact balcony mount"],             best: ["balcony"],                    badge: "Mid-range pick",    accent: T.solar, image: "/images/products/stream-balcony.jpg", link: AWIN_BASE + encodeURIComponent("https://www.ecoflow.com/uk/stream-balcony-solar-system") },
  { id: "generic-400",        name: "Plug-in Solar Starter 400W",       brand: "Various", watts: 400, battery: false, price: "~£349",   features: ["Single 400W panel", "Micro-inverter included", "Simple bracket mount", "No app required"],            best: ["balcony", "garden"],          badge: "Budget friendly",   accent: T.green, image: "/images/products/panel400-hero.jpg", link: null },
  { id: "premium-800-battery", name: "EcoFlow PowerStream 800W + Delta", brand: "EcoFlow", watts: 800, battery: true,  price: "~£1,099", features: ["800W dual-panel kit", "1kWh Delta battery", "Full home backup mode", "Smart scheduling"],             best: ["garden", "flat_roof", "shed"], badge: "Premium choice",    accent: T.solar, image: "/images/products/stream-ultra.png", link: AWIN_BASE + encodeURIComponent("https://www.ecoflow.com/uk/stream-balcony-solar-system") },
  { id: "anker-600",          name: "Anker SOLIX 600W Kit",             brand: "Anker",   watts: 600, battery: false, price: "~£449",   features: ["600W dual-panel", "Micro-inverter included", "Balcony & ground mount", "App monitoring"],             best: ["balcony", "garden"],          badge: "Great value",       accent: T.sky, image: "/images/products/panel400-lifestyle.jpg", link: null },
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
          <strong style={{ color: T.ink }}>Placeholder products.</strong> BSI-compliant plug-in solar kits are not yet available in the UK. These recommendations are based on expected specifications. We&rsquo;ll update with real, buyable products as soon as they launch (~July 2026).
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
            Calculate exact savings &rarr;
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
          View on EcoFlow &rarr;
        </a>
      )}

      {primary && (
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 10, background: T.surfaceAlt, border: `1px solid ${T.border}`, fontSize: "0.78rem", color: T.inkMid, textAlign: "center" }}>
          Available when BSI-compliant kits launch &middot; we&rsquo;ll notify you
        </div>
      )}
    </div>
  );
}
