import { Link } from "react-router-dom";
import { useMarket, MARKETS } from "../MarketContext";
import allPosts from "../data/posts";
import T from "../tokens";

// Renders a one-line banner when the user's detected/selected market differs
// from the market of the content they're viewing. Called from BlogIndex and
// BlogPost. `subpath` is appended after the market segment — e.g. "/blog" or
// "/blog/my-slug". If a matching slug in the visitor's market exists we link
// there directly; otherwise we fall back to the visitor's blog index.
export default function MarketRerouteBanner({ pageMarket, subpath = "/blog" }) {
  const { market } = useMarket();
  if (!pageMarket || market === pageMarket) return null;
  const target = MARKETS[market];
  if (!target) return null;

  // If subpath is a specific post ("/blog/some-slug"), verify the visitor's
  // market has an equivalent post; fall back to their blog index if not.
  let resolvedSubpath = subpath;
  const slugMatch = subpath.match(/^\/blog\/(.+)$/);
  if (slugMatch) {
    const slug = slugMatch[1];
    const exists = allPosts.some(p => p.market === market && p.slug === slug);
    if (!exists) resolvedSubpath = "/blog";
  }
  const targetPath = market === "uk" ? resolvedSubpath : `/${market}${resolvedSubpath}`;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 16px", borderRadius: 10,
      border: `1px solid ${T.solarBorder}`, background: T.solarLight,
      marginBottom: 24, fontSize: "0.85rem", color: T.ink,
      flexWrap: "wrap",
    }}>
      <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>{target.flag}</span>
      <span style={{ flex: 1, minWidth: 200 }}>
        You&rsquo;re viewing the {pageMarket.toUpperCase()} blog. We have {target.label}-specific coverage too.
      </span>
      <Link to={targetPath} style={{
        padding: "6px 14px", borderRadius: 20,
        background: T.solar, color: "#fff",
        fontSize: "0.75rem", fontWeight: 700, fontFamily: T.display,
        textDecoration: "none", whiteSpace: "nowrap",
      }}>
        Visit {target.label} blog &rarr;
      </Link>
    </div>
  );
}
