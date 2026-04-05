import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import T from "./tokens";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import QuizPage from "./pages/QuizPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [gridData, setGridData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    setTimeout(() => setMounted(true), 60);
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

  if (!mounted) return <div style={{ background: T.bg, minHeight: "100vh" }} />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ background: T.bg, color: T.ink, fontFamily: T.body, minHeight: "100vh" }}>
        <GlobalStyles />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage gridData={gridData} />} />
          <Route path="/calculator" element={<CalculatorPage gridData={gridData} />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
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
    `}</style>
  );
}
