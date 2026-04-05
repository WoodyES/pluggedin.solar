import { useParams, Link, Navigate } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import posts from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const idx = posts.indexOf(post);
  const next = posts[idx + 1];
  const prev = posts[idx - 1];

  return (
    <section style={{ padding: "100px 32px 80px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Link to="/blog" style={{ fontSize: "0.8rem", color: T.inkFaint, textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}
          onMouseEnter={e => e.target.style.color = T.ink}
          onMouseLeave={e => e.target.style.color = T.inkFaint}
        >&larr; All posts</Link>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
          <span style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 20,
            background: `${T.solar}18`, color: T.solar, border: `1px solid ${T.solar}30`,
          }}>{post.category}</span>
          <span style={{ fontSize: "0.78rem", color: T.inkFaint }}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        <h1 style={{ fontFamily: T.display, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>{post.title}</h1>
        <p style={{ fontSize: "1.05rem", color: T.inkMid, lineHeight: 1.7, marginBottom: 48, fontWeight: 300 }}>{post.excerpt}</p>

        <div style={{ height: 1, background: T.border, marginBottom: 40 }} />

        {/* Rendered markdown */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        {/* CTA */}
        <div style={{ padding: "20px 24px", borderRadius: 12, border: `1.5px solid ${T.solarBorder}`, background: T.solarLight, margin: "40px 0 24px" }}>
          <p style={{ fontSize: "0.9rem", color: T.ink, lineHeight: 1.7, fontWeight: 500, marginBottom: 14 }}>See how much plug-in solar could save you — with real data for your postcode.</p>
          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/calculator" style={{ padding: "8px 16px", borderRadius: 8, background: T.solar, color: "#fff", fontSize: "0.8rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>Calculator</Link>
            <Link to="/quiz" style={{ padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.surface, color: T.ink, fontSize: "0.8rem", fontWeight: 600, fontFamily: T.display, textDecoration: "none" }}>Find your kit</Link>
          </div>
        </div>

        {/* Prev/Next */}
        <div style={{ height: 1, background: T.border, margin: "48px 0 32px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          {prev ? (
            <Link to={`/blog/${prev.slug}`} style={{ textDecoration: "none", flex: 1 }}>
              <div style={{ fontSize: "0.7rem", color: T.inkFaint, marginBottom: 6, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>&larr; Previous</div>
              <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, lineHeight: 1.35 }}>{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/blog/${next.slug}`} style={{ textDecoration: "none", flex: 1, textAlign: "right" }}>
              <div style={{ fontSize: "0.7rem", color: T.inkFaint, marginBottom: 6, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Next &rarr;</div>
              <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, lineHeight: 1.35 }}>{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </section>
  );
}
