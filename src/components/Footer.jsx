import { Link } from "react-router-dom";
import T from "../tokens";

export default function Footer() {
  return (
    <footer style={{ padding: "56px 32px 40px", borderTop: `1px solid ${T.border}`, background: T.bg }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 36 }}>
          <div>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${T.solarBright},${T.solar})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", boxShadow: `0 2px 8px ${T.solarBorder}` }}>☀</div>
              <span style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>pluggedin<span style={{ color: T.solar }}>.solar</span></span>
            </Link>
            <p style={{ fontSize: "0.82rem", color: T.inkFaint, marginTop: 14, maxWidth: 280, lineHeight: 1.65 }}>
              Independent UK plug-in solar comparison, news, and savings tools by pluggedin.solar. Not affiliated with any manufacturer or energy supplier.
            </p>
          </div>
          <div style={{ display: "flex", gap: 56 }}>
            {[
              { heading: "Tools", links: [{ label: "Calculator", to: "/calculator" }, { label: "Find your kit", to: "/quiz" }] },
              { heading: "Learn", links: [{ label: "Blog", to: "/blog" }, { label: "FAQ", to: "/#faq" }] },
              { heading: "Compare", links: [{ label: "EcoFlow", to: "/blog" }, { label: "Anker SOLIX", to: "/blog" }, { label: "800W kits", to: "/blog" }] },
            ].map(col => (
              <div key={col.heading}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 16, fontFamily: T.display }}>{col.heading}</div>
                {col.links.map(l => (
                  <div key={l.label} style={{ marginBottom: 10 }}>
                    <Link to={l.to} style={{ fontSize: "0.84rem", color: T.inkMid, textDecoration: "none" }}
                      onMouseEnter={e => e.target.style.color = T.ink}
                      onMouseLeave={e => e.target.style.color = T.inkMid}>{l.label}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Data provenance */}
        <div style={{ padding: "20px 24px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, marginBottom: 28 }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 14, fontFamily: T.display }}>Data sources</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px" }}>
            {[
              { label: "PVGIS · EU JRC",       badge: "live",      bc: T.green,    href: "https://re.jrc.ec.europa.eu" },
              { label: "Carbon Intensity API",  badge: "live",      bc: T.green,    href: "https://carbonintensity.org.uk" },
              { label: "Ofgem tariffs",         badge: "Q2 2026",   bc: T.solar,    href: "https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you" },
              { label: "System costs",          badge: "Apr 2026",  bc: T.solar,    href: "https://www.ecoflow.com/uk" },
              { label: "CO₂ intensity factor", badge: "DESNZ 2024", bc: T.inkFaint, href: "https://www.gov.uk/government/collections/uk-energy-in-brief" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
                <span style={{ fontSize: "0.6rem", padding: "3px 8px", borderRadius: 20, background: `${s.bc}18`, color: s.bc, fontWeight: 600, whiteSpace: "nowrap", border: `1px solid ${s.bc}30` }}>
                  {s.badge === "live" ? "● live" : s.badge}
                </span>
                <span style={{ fontSize: "0.78rem", color: T.inkMid }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "0.78rem", color: T.inkFaint }}>&copy; 2026 pluggedin.solar &middot; Independent &middot; Ad-free</div>
          <div style={{ fontSize: "0.72rem", color: T.inkFaint, maxWidth: 460, lineHeight: 1.6, textAlign: "right" }}>
            Estimates are indicative. Actual savings depend on placement, shading, and tariff. Update tariffs quarterly &mdash; <a href="https://www.ofgem.gov.uk" target="_blank" rel="noreferrer" style={{ color: T.solar }}>Ofgem.gov.uk</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
