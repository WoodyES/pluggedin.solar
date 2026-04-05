import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import posts from "../data/posts";

export default function BlogIndex() {
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <section style={{ padding: "100px 32px 80px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionLabel>Blog</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>News, guides &amp; analysis</h1>
        <p style={{ color: T.inkMid, fontSize: "0.95rem", marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
          Independent coverage of UK plug-in solar policy, product launches, and practical how-to guides. No affiliate bias &mdash; just useful information.
        </p>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
          {categories.map(cat => (
            <span key={cat} style={{
              padding: "6px 14px", borderRadius: 20,
              border: `1px solid ${T.border}`, background: T.surface,
              fontSize: "0.75rem", fontWeight: 600, color: T.inkMid,
              fontFamily: T.display, letterSpacing: "0.02em",
            }}>{cat}</span>
          ))}
        </div>

        {/* Post grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {posts.map((post, i) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
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
                </div>
                <h2 style={{ fontFamily: T.display, fontSize: "1.2rem", fontWeight: 700, color: T.ink, marginBottom: 12, letterSpacing: "-0.01em", lineHeight: 1.35 }}>{post.title}</h2>
                <p style={{ fontSize: "0.85rem", color: T.inkMid, lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
                <div style={{ marginTop: 20, fontSize: "0.82rem", color: T.solar, fontWeight: 600, fontFamily: T.display }}>Read &rarr;</div>
              </article>
            </Link>
          ))}

          {/* Placeholder card */}
          <div style={{
            padding: "32px", borderRadius: 16,
            border: `1.5px dashed ${T.border}`, background: T.surfaceAlt,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", gap: 12, minHeight: 200,
          }}>
            <div style={{ fontSize: "2rem" }}>\u270F\uFE0F</div>
            <div style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: T.inkMid }}>More posts coming soon</div>
            <div style={{ fontSize: "0.8rem", color: T.inkFaint, lineHeight: 1.6 }}>Product reviews, DNO notification guides, and kit comparison tables &mdash; as soon as compliant kits launch.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
