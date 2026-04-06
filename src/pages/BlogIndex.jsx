import { useState } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import allPosts from "../data/posts";

const MARKET_LABELS = {
  uk: { name: "UK", desc: "Independent coverage of UK plug-in solar policy, product launches, and practical how-to guides." },
  us: { name: "US", desc: "Plug-in solar guides, product reviews, and policy updates for the United States." },
  au: { name: "Australia", desc: "Plug-in solar guides, product reviews, and regulatory updates for Australia." },
};

export default function BlogIndex({ market = "uk" }) {
  const posts = allPosts.filter(p => p.market === market);
  const categories = ["All", ...new Set(posts.map(p => p.category))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter(p => p.category === active);
  const info = MARKET_LABELS[market];
  const basePath = market === "uk" ? "/blog" : `/${market}/blog`;
  const readingTime = (wc) => wc > 0 ? `${Math.ceil(wc / 238)} min read` : null;

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title={`${info.name} Plug-in Solar Blog`}
        description={info.desc}
        path={basePath}
      />
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Blog{market !== "uk" ? ` — ${info.name}` : ""}</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>News, guides &amp; analysis</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
          {info.desc}
        </p>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "6px 14px", borderRadius: 20,
              border: `1px solid ${active === cat ? T.solar : T.border}`,
              background: active === cat ? T.solarLight : T.surface,
              fontSize: "0.75rem", fontWeight: 600,
              color: active === cat ? T.solar : T.inkMid,
              fontFamily: T.display, letterSpacing: "0.02em",
              cursor: "pointer",
            }}>{cat}</button>
          ))}
        </div>

        {/* Post grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {filtered.map(post => (
            <Link key={post.slug} to={`${basePath}/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{
                padding: "32px", borderRadius: 16,
                border: `1px solid ${T.border}`, background: T.surface,
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease",
                height: "100%", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.solarBorder; e.currentTarget.style.boxShadow = `0 4px 20px ${T.solarGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                  <span style={{
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: 20,
                    background: `${T.solar}18`, color: T.solar, border: `1px solid ${T.solar}30`,
                  }}>{post.category}</span>
                  <span style={{ fontSize: "0.75rem", color: T.inkFaint }}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  {readingTime(post.wordcount) && (
                    <span style={{ fontSize: "0.72rem", color: T.inkFaint }}>{readingTime(post.wordcount)}</span>
                  )}
                </div>
                <h2 style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 700, color: T.ink, marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.35 }}>{post.title}</h2>
                <p style={{ fontSize: "0.85rem", color: T.inkMid, lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
                <div style={{ marginTop: 20, fontSize: "0.82rem", color: T.solar, fontWeight: 600, fontFamily: T.display }}>Read &rarr;</div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
