import { Link } from "react-router-dom";
import T from "../tokens";
import SEO from "../components/SEO";
import allPosts from "../data/posts";

const popular = allPosts
  .filter(p => p.market === "uk")
  .slice(0, 4);

export default function NotFound() {
  return (
    <section className="section-pad" style={{ padding: "140px 20px 80px", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SEO title="Page not found" path="/404" />
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Page not found</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 36, lineHeight: 1.6, maxWidth: 440, margin: "0 auto 36px" }}>
          The page you're looking for doesn't exist or has been moved. Try one of these instead:
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{ padding: "12px 24px", borderRadius: 10, background: T.solar, color: "#fff", fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none", boxShadow: `0 2px 12px ${T.solarBorder}` }}>
            Homepage
          </Link>
          <Link to="/blog" style={{ padding: "12px 24px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
            Blog
          </Link>
          <Link to="/calculator" style={{ padding: "12px 24px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.9rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>
            Calculator
          </Link>
        </div>
      </div>

      {/* Popular articles */}
      <div style={{ maxWidth: 600, width: "100%" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 16, fontFamily: T.display }}>Popular articles</div>
        <div style={{ display: "grid", gap: 10 }}>
          {popular.map(p => (
            <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "flex", gap: 16, padding: "14px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, alignItems: "center", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.solarBorder}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.solar }}>{p.category}</span>
                <div style={{ fontFamily: T.display, fontSize: "0.88rem", fontWeight: 700, color: T.ink, lineHeight: 1.35, marginTop: 3 }}>{p.title}</div>
              </div>
              <span style={{ fontSize: "0.75rem", color: T.inkFaint }}>&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
