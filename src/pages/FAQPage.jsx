import { useState } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";

const FAQ_ITEMS = [
  { q: "Is plug-in solar legal in the UK?",
    a: "Not quite yet — but it will be very soon. The government confirmed on 15 March 2026 that it will legalise plug-in solar. The wiring regulations (BS 7671 Amendment 4) were updated on 15 April 2026 to enable the framework, but compliant products cannot legally be connected until the BSI publishes the product standard — expected around July 2026." },
  { q: "Do I need an electrician?",
    a: "No. Once compliant kits are on sale, you plug the inverter cable into a standard 13A socket. You do need to notify your Distribution Network Operator (DNO) within 28 days under G98 rules — but that's a simple online form, not a site visit." },
  { q: "Can I install this if I rent?",
    a: "Plug-in solar is specifically designed for renters and flat-dwellers who can't access their roof. The panels attach to a balcony rail or sit in a garden, and you take them when you move. Most standard ASTs don't prohibit temporary external fixtures." },
  { q: "What's the payback period?",
    a: "Typically 4–6 years for an 800W system in southern England at the Ofgem Q2 2026 cap (24.5p/kWh). The Carbon Brief analysis puts 15-year net savings at ~£1,100 for a typical London household." },
  { q: "Can I get paid for electricity I export?",
    a: "Yes, but at much lower rates. The Smart Export Guarantee (SEG) pays ~3–6p per kWh exported, versus 24p+ to import. Maximise savings by using solar when it's generating — fridges, routers, and always-on devices are ideal." },
  { q: "What size system should I buy?",
    a: "800W is the UK regulatory cap and best value. Smaller 400W systems work if you have limited space. Use the calculator to compare payback periods for your postcode and placement." },
  { q: "What's the difference between plug-in and rooftop solar?",
    a: "Rooftop solar requires scaffolding, a qualified installer (MCS-certified), planning permission checks, and costs £5,000–£10,000+. Plug-in solar is a self-install kit under 800W that plugs into a standard socket — typically £400–£750, no scaffolding, no electrician. The trade-off is lower output (800W vs 3–4kW for rooftop), but for renters or those without roof access, plug-in solar is the only option." },
  { q: "Will plug-in solar damage my electrics?",
    a: "No. BSI-compliant kits will include an inverter with anti-islanding protection that automatically disconnects if the grid goes down. The 800W cap ensures the load stays well within what a 13A socket and ring main can handle safely." },
  { q: "Do I need to tell my energy supplier?",
    a: "You need to notify your DNO (Distribution Network Operator), not your supplier. This is a simple G98 online form. Your DNO is determined by your region — the calculator can help you identify yours. Notification must be submitted within 28 days of installation." },
  { q: "How much roof or balcony space do I need?",
    a: "A typical 400W panel is about 1.7m x 1.1m. An 800W system uses two panels, so roughly 3.4m of balcony rail or a 2m x 2m garden area. Most balcony kits mount vertically on the railing." },
  { q: "What happens on cloudy days?",
    a: "Solar panels still generate on cloudy days — typically 10–25% of their rated output. The UK's climate means you'll generate most in April–September. The calculator's seasonal graph shows exactly how output varies month by month for your postcode." },
  { q: "Can I use a battery with plug-in solar?",
    a: "Yes, portable power stations from brands like EcoFlow and Anker work with plug-in solar. They store excess daytime generation for evening use, increasing your self-consumption rate. However, batteries add £200–£800 to the cost, which extends payback. They make most sense if you're away during the day." },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(item => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="Frequently Asked Questions"
        description="Common questions about plug-in solar in the UK: legality, costs, installation, payback periods, and how it works."
        path="/faq"
        jsonLd={FAQ_LD}
      />
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <SectionLabel>FAQ</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>Frequently asked questions</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
          Everything you need to know about plug-in solar in the UK — legality, costs, installation, and savings.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{
              borderRadius: 12, border: `1px solid ${open === i ? T.solarBorder : T.border}`,
              background: open === i ? T.solarLight : T.surface,
              transition: "all 0.2s ease",
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", padding: "18px 20px", border: "none", background: "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  textAlign: "left", cursor: "pointer",
                }}
                aria-expanded={open === i}
              >
                <span style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ fontSize: "1.2rem", color: T.inkFaint, flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 18px", fontSize: "0.88rem", color: T.inkMid, lineHeight: 1.75 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "24px", borderRadius: 12, border: `1.5px solid ${T.solarBorder}`, background: T.solarLight, textAlign: "center" }}>
          <p style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: T.ink, marginBottom: 12 }}>Still have questions?</p>
          <p style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 20, lineHeight: 1.6 }}>Try the calculator for personalised savings, or browse our guides for in-depth answers.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/calculator" style={{ padding: "10px 20px", borderRadius: 8, background: T.solar, color: "#fff", fontSize: "0.85rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>Calculator</Link>
            <Link to="/blog" style={{ padding: "10px 20px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.85rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>Blog</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
