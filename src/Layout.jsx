import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Head } from "vite-react-ssg";
import T from "./tokens";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import GridDataContext from "./GridDataContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    fetchGrid();
    const t = setInterval(fetchGrid, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  async function fetchGrid() {
    try {
      const r = await fetch("https://api.carbonintensity.org.uk/generation");
      const json = await r.json();
      const mix = json.data.generationmix;
      const get = f => mix.find(m => m.fuel === f)?.perc || 0;
      setGridData({
        solar: get("solar"),
        wind: get("wind") + get("wind_offshore") + get("wind_onshore"),
        nuclear: get("nuclear"),
        gas: get("gas"),
        biomass: get("biomass"),
        imports: get("imports"),
        at: new Date(),
      });
    } catch (_) {}
  }

  return (
    <GridDataContext.Provider value={gridData}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500;600&display=swap" />
      </Head>
      <ScrollToTop />
      <div style={{ background: T.bg, color: T.ink, fontFamily: T.body, minHeight: "100vh" }}>
        <GlobalStyles />
        <Nav />
        <Outlet />
        <Footer />
        <SpeedInsights />
        <Analytics />
      </div>
    </GridDataContext.Provider>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
      @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      .fu  { animation: fadeUp 0.45s ease forwards; }
      .fi  { animation: fadeIn 0.35s ease forwards; }
      .fu1 { animation: fadeUp 0.5s 0.05s ease both; }
      .fu2 { animation: fadeUp 0.5s 0.18s ease both; }
      .fu3 { animation: fadeUp 0.5s 0.32s ease both; }
      .fu4 { animation: fadeUp 0.5s 0.48s ease both; }
      input[type=range]{-webkit-appearance:none;appearance:none;cursor:pointer;width:100%;background:transparent}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${T.solar};border:2px solid ${T.surface};box-shadow:0 0 0 3px ${T.solarBorder};margin-top:-8px}
      input[type=range]::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:${T.border}}
      button,a{transition:all 0.15s ease;cursor:pointer}
      button:active{transform:scale(0.97)!important}
      ::selection{background:${T.solarLight};color:${T.solar}}
      ::-webkit-scrollbar{width:6px}
      ::-webkit-scrollbar-track{background:${T.bg}}
      ::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}

      /* Blog prose styling */
      .prose { color: ${T.ink}; font-size: 0.95rem; line-height: 1.85; }
      .prose h2 { font-family: ${T.display}; font-size: 1.4rem; font-weight: 700; margin: 40px 0 16px; letter-spacing: -0.01em; }
      .prose h3 { font-family: ${T.display}; font-size: 1.15rem; font-weight: 700; margin: 32px 0 12px; }
      .prose p { margin-bottom: 24px; }
      .prose ul, .prose ol { margin-bottom: 24px; padding-left: 24px; }
      .prose li { margin-bottom: 8px; line-height: 1.75; }
      .prose li::marker { color: ${T.solar}; }
      .prose strong { font-weight: 600; color: ${T.ink}; }
      .prose a { color: ${T.solar}; text-decoration: underline; text-underline-offset: 2px; }
      .prose a:hover { color: #c27f00; }
      .prose blockquote { border-left: 3px solid ${T.solar}; padding: 12px 20px; margin: 24px 0; background: ${T.solarLight}; border-radius: 0 8px 8px 0; }
      .prose blockquote p { margin-bottom: 0; }
      .prose hr { border: none; height: 1px; background: ${T.border}; margin: 40px 0; }
      .prose code { background: ${T.surfaceAlt}; padding: 2px 6px; border-radius: 4px; font-size: 0.88em; }
      .prose pre { background: ${T.surfaceAlt}; padding: 16px 20px; border-radius: 10px; overflow-x: auto; margin-bottom: 24px; }
      .prose pre code { background: none; padding: 0; }
      .prose img { max-width: 100%; border-radius: 10px; margin: 24px 0; }

      /* ─── RESPONSIVE ─────────────────────────────────── */
      @media (max-width: 768px) {
        .nav-links { display: none !important; }
        .nav-hamburger { display: flex !important; }
        .mobile-menu { display: flex !important; }
        .grid-2 { grid-template-columns: 1fr !important; }
        .grid-3 { grid-template-columns: 1fr !important; }
        .grid-2-calc { grid-template-columns: 1fr !important; }
        .hero-result { flex-direction: column !important; gap: 16px !important; }
        .hero-result > div:nth-child(2) { width: 100% !important; height: 1px !important; align-self: auto !important; }
        .hero-result a { margin-left: 0 !important; width: 100% !important; text-align: center !important; }
        .footer-top { flex-direction: column !important; }
        .footer-cols { flex-direction: column !important; gap: 28px !important; }
        .footer-bottom { flex-direction: column !important; text-align: center !important; }
        .footer-bottom > div:last-child { text-align: center !important; }
        .blog-grid { grid-template-columns: 1fr !important; }
        .faq-grid { grid-template-columns: 1fr !important; }
        .quiz-alts { grid-template-columns: 1fr !important; }
        .section-pad { padding-left: 16px !important; padding-right: 16px !important; }
        .rcards { grid-template-columns: 1fr 1fr !important; }
        .supplier-grid { grid-template-columns: 1fr !important; }
        .placement-grid { grid-template-columns: 1fr !important; }
        .data-sources { flex-direction: column !important; gap: 10px !important; }
        .hero-postcode { flex-direction: column !important; }
        .hero-postcode button { width: 100% !important; }
        .hero-postcode input { width: 100% !important; }
      }

      @media (max-width: 480px) {
        .rcards { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
