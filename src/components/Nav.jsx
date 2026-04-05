import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import T from "../tokens";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Calculator", to: "/calculator" },
    { label: "Find your kit", to: "/quiz" },
    { label: "Blog", to: "/blog" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 32px", height: 62,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? `${T.surface}f0` : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${T.solarBright},${T.solar})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", boxShadow: `0 2px 8px ${T.solarBorder}` }}>☀</div>
        <span style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>pluggedin<span style={{ color: T.solar }}>.solar</span></span>
      </Link>

      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {navLinks.map(({ label, to }) => (
          <Link key={to} to={to} style={{
            fontSize: "0.85rem",
            color: pathname === to ? T.solar : T.inkMid,
            fontWeight: pathname === to ? 600 : 500,
            textDecoration: "none",
          }}
            onMouseEnter={e => { if (pathname !== to) e.target.style.color = T.ink; }}
            onMouseLeave={e => { if (pathname !== to) e.target.style.color = T.inkMid; }}
          >{label}</Link>
        ))}
        <Link to="/calculator" style={{
          padding: "9px 22px", borderRadius: 8,
          background: T.solar, color: "#fff",
          fontSize: "0.84rem", fontWeight: 600,
          textDecoration: "none", letterSpacing: "0.01em",
          fontFamily: T.display,
          boxShadow: `0 2px 12px ${T.solarBorder}`,
        }}
          onMouseEnter={e => { e.target.style.background = "#c27f00"; e.target.style.boxShadow = `0 4px 20px ${T.solarBorder}`; }}
          onMouseLeave={e => { e.target.style.background = T.solar; e.target.style.boxShadow = `0 2px 12px ${T.solarBorder}`; }}
        >Calculate savings</Link>
      </div>
    </nav>
  );
}
