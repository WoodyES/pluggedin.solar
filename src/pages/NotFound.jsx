import { Link } from "react-router-dom";
import T from "../tokens";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <section className="section-pad" style={{ padding: "140px 20px 80px", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <SEO title="Page not found" path="/404" />
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>404</div>
      <h1 style={{ fontFamily: T.display, fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em" }}>Page not found</h1>
      <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 36, lineHeight: 1.6, maxWidth: 440 }}>
        The page you're looking for doesn't exist or has been moved.
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
    </section>
  );
}
