import T from "../tokens";

export default function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.inkFaint, fontFamily: T.display }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}
