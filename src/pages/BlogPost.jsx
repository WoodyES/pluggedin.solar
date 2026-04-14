import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import EmailCapture from "../components/EmailCapture";
import SEO from "../components/SEO";
import allPosts from "../data/posts";

const MARKET_INFO = {
  uk: { flag: "\u{1F1EC}\u{1F1E7}", label: "This article is relevant for the UK market" },
  us: { flag: "\u{1F1FA}\u{1F1F8}", label: "This article is relevant for the US market" },
  au: { flag: "\u{1F1E6}\u{1F1FA}", label: "This article is relevant for the Australian market" },
};

export default function BlogPost({ market = "uk" }) {
  const { slug } = useParams();
  const marketPosts = allPosts.filter(p => p.market === market);
  const post = marketPosts.find(p => p.slug === slug);
  const basePath = market === "uk" ? "/blog" : `/${market}/blog`;
  const mi = MARKET_INFO[market];

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to={basePath} replace />;

  const idx = marketPosts.indexOf(post);
  const next = marketPosts[idx + 1];
  const prev = marketPosts[idx - 1];
  const readTime = post.wordcount > 0 ? `${Math.ceil(post.wordcount / 238)} min read` : null;
  const postUrl = `${basePath}/${post.slug}`;

  // Related articles: same category first, then same cluster, exclude current
  const related = marketPosts
    .filter(p => p.slug !== post.slug)
    .map(p => ({
      ...p,
      score: (p.category === post.category ? 2 : 0) + (p.cluster && p.cluster === post.cluster ? 3 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Build hreflang alternatives for multi-market posts
  const hreflangMap = { uk: "en-GB", us: "en-US", au: "en-AU" };
  const hreflang = Object.entries(hreflangMap)
    .filter(([m]) => {
      if (m === market) return true;
      return allPosts.some(p => p.market === m && p.slug === slug);
    })
    .map(([m, lang]) => ({
      lang,
      href: `https://pluggedin.solar${m === "uk" ? "" : `/${m}`}/blog/${slug}`,
    }));
  // Add x-default pointing to UK version
  if (hreflang.length > 1) {
    hreflang.push({ lang: "x-default", href: `https://pluggedin.solar/blog/${slug}` });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author || "Pluggedin.solar" },
    publisher: {
      "@type": "Organization",
      name: "Pluggedin.solar",
      url: "https://pluggedin.solar",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pluggedin.solar${postUrl}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pluggedin.solar/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: `https://pluggedin.solar${basePath}` },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://pluggedin.solar${postUrl}` },
    ],
  };

  return (
    <>
    <div className="reading-progress" style={{ width: `${progress}%` }} />
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={postUrl}
        type="article"
        jsonLd={[jsonLd, breadcrumbLd]}
        hreflang={hreflang}
      />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.78rem", color: T.inkFaint, marginBottom: 24, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Link to="/" style={{ color: T.inkFaint, textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link to={basePath} style={{ color: T.inkFaint, textDecoration: "none" }}>Blog</Link>
          <span>/</span>
          <span style={{ color: T.inkMid }}>{post.title}</span>
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
          <span style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 20,
            background: `${T.solar}18`, color: T.solar, border: `1px solid ${T.solar}30`,
          }}>{post.category}</span>
          <span style={{ fontSize: "0.78rem", color: T.inkFaint }}>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          {readTime && <span style={{ fontSize: "0.75rem", color: T.inkFaint }}>{readTime}</span>}
        </div>

        <h1 style={{ fontFamily: T.display, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>{post.title}</h1>
        <p style={{ fontSize: "1.05rem", color: T.inkMid, lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>{post.excerpt}</p>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, background: T.surfaceAlt, border: `1px solid ${T.border}`, marginBottom: 48 }}>
          <span style={{ fontSize: "1rem" }}>{mi.flag}</span>
          <span style={{ fontSize: "0.75rem", color: T.inkMid, fontWeight: 500 }}>{mi.label}</span>
        </div>

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

        {/* Email signup */}
        <div style={{ marginTop: 32 }}>
          <EmailCapture />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <>
            <div style={{ height: 1, background: T.border, margin: "48px 0 32px" }} />
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 16, fontFamily: T.display }}>You might also like</div>
            <div style={{ display: "grid", gap: 12 }}>
              {related.map(r => (
                <Link key={r.slug} to={`${basePath}/${r.slug}`} style={{ textDecoration: "none", display: "flex", gap: 16, padding: "16px", borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, alignItems: "flex-start", transition: "border-color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.solarBorder}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.solar }}>{r.category}</span>
                    <div style={{ fontFamily: T.display, fontSize: "0.9rem", fontWeight: 700, color: T.ink, lineHeight: 1.35, marginTop: 4 }}>{r.title}</div>
                    <div style={{ fontSize: "0.78rem", color: T.inkFaint, marginTop: 6, lineHeight: 1.5 }}>{r.excerpt.substring(0, 100)}...</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Prev/Next */}
        <div style={{ height: 1, background: T.border, margin: "48px 0 32px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          {prev ? (
            <Link to={`${basePath}/${prev.slug}`} style={{ textDecoration: "none", flex: 1 }}>
              <div style={{ fontSize: "0.7rem", color: T.inkFaint, marginBottom: 6, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>&larr; Previous</div>
              <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, lineHeight: 1.35 }}>{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`${basePath}/${next.slug}`} style={{ textDecoration: "none", flex: 1, textAlign: "right" }}>
              <div style={{ fontSize: "0.7rem", color: T.inkFaint, marginBottom: 6, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Next &rarr;</div>
              <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, color: T.ink, lineHeight: 1.35 }}>{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </section>
    </>
  );
}
