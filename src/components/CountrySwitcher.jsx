import { useState, useRef, useEffect } from "react";
import { useMarket, MARKETS } from "../MarketContext";
import T from "../tokens";

export default function CountrySwitcher({ compact = false }) {
  const { market, info, setMarket } = useMarket();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Change region — currently ${info.label}`}
        aria-expanded={open}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: compact ? "6px 10px" : "7px 12px",
          borderRadius: 8, border: `1px solid ${T.border}`,
          background: T.surface, color: T.inkMid,
          fontSize: "0.8rem", fontFamily: T.body, cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "1rem", lineHeight: 1 }}>{info.flag}</span>
        <span style={{ fontWeight: 600 }}>{market.toUpperCase()}</span>
        <span style={{ fontSize: "0.7rem", color: T.inkFaint, marginLeft: 2 }}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0,
            minWidth: 180, background: T.surface,
            border: `1px solid ${T.border}`, borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            padding: 6, zIndex: 200,
          }}
        >
          {Object.values(MARKETS).map(m => {
            const active = m.code === market;
            return (
              <button
                key={m.code}
                role="menuitem"
                onClick={() => { setMarket(m.code); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "10px 12px",
                  borderRadius: 7, border: "none",
                  background: active ? T.solarLight : "transparent",
                  color: active ? T.solar : T.ink,
                  fontSize: "0.85rem", fontFamily: T.body,
                  fontWeight: active ? 600 : 400,
                  textAlign: "left", cursor: "pointer",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = T.bg; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>{m.flag}</span>
                <span>{m.label}</span>
                {active && <span style={{ marginLeft: "auto", color: T.solar, fontSize: "0.75rem" }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
