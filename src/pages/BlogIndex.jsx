import { useState } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import allPosts from "../data/posts";

const MARKETS = [
  { id: "all", name: "All", flag: "\u{1F30D}" },
  { id: "uk", name: "UK", flag: "\u{1F1EC}\u{1F1E7}" },
  { id: "us", name: "US", flag: "\u{1F1FA}\u{1F1F8}" },
  { id: "au", name: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
];

const MARKET_META = {
  uk: { desc: "Independent coverage of UK plug-in solar policy, product launches, and practical how-to guides." },
  us: { desc: "Plug-in solar guides, product reviews, and policy updates for the United States." },
  au: { desc: "Plug-in solar guides, product reviews, and regulatory updates for Australia." },
};

function basePath(market) {
  return market === "uk" ? "/blog" : `/${market}/blog`;
}

function marketFlag(market) {
  return MARKETS.find(m => m.id === market)?.flag || "";
}

export default function BlogIndex({ market = "uk" }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const marketPosts = allPosts.filter(p => p.market === market);
  const categories = ["All", ...new Set(marketPosts.map(p => p.category))];
  const validCategory = categories.includes(activeCategory) ? activeCategory : "All";

  const filtered = marketPosts.filter(p => {
    if (validCategory !== "All" && p.category !== validCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  const readingTime = (wc) => wc > 0 ? `${Math.ceil(wc / 238)} min read` : null;
  const info = MARKET_META[market] || MARKET_META.uk;
  const seoPath = basePath(market);

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO title={`${MARKETS.find(m => m.id === market)?.name || "UK"} Plug-in Solar Blog`} description={info.desc} path={seoPath} />
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Blog</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>News, guides &amp; analysis</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 32, lineHeight: 1.6, maxWidth: 600 }}>
          {info.desc}
        </p>

        {/* Search + Category dropdown row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            style={{
              flex: "1 1 280px", maxWidth: 420, padding: "10px 16px", borderRadius: 10,
              border: `1px solid ${T.border}`, background: T.surface, color: T.ink,
              fontSize: "0.88rem", fontFamily: T.body, outline: "none",
              transition: "border-color 0.15s ease",
            }}
            onFocus={e => e.target.style.borderColor = T.solar}
            onBlur={e => e.target.style.borderColor = T.border}
          />
          <select
            value={validCategory}
            onChange={e => setActiveCategory(e.target.value)}
            style={{
              padding: "10px 14px", borderRadius: 10,
              border: `1px solid ${T.border}`, background: T.surface, color: T.ink,
              fontSize: "0.85rem", fontFamily: T.body, cursor: "pointer",
              outline: "none", appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
              paddingRight: 32, minWidth: 160,
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === "All" ? "All categories" : cat}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        {search.trim() && (
          <p style={{ fontSize: "0.82rem", color: T.inkFaint, marginBottom: 20 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Post grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {filtered.map(post => {
            const postPath = `${basePath(market)}/${post.slug}`;
            return (
              <Link key={post.slug} to={postPath} style={{ textDecoration: "none", color: "inherit" }}>
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
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
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
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: T.inkFaint }}>
            <p style={{ fontSize: "1rem", marginBottom: 8 }}>No articles found.</p>
            <p style={{ fontSize: "0.85rem" }}>Try a different search term or filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
