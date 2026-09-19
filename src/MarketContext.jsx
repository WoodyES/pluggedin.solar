import { createContext, useContext, useEffect, useState, useCallback } from "react";

// UK is the default because the site's centre of gravity is the UK legalisation story.
// Detection: fetch /api/geo (Vercel edge). User override persists to localStorage.
const DEFAULT_MARKET = "uk";
const STORAGE_KEY = "pluggedin-market";
const COOKIE_KEY = "pin-market";

// Synchronously read the geo-detection cookie set by /api/geo on the previous
// visit. Lets us render the right market on first paint for repeat visitors —
// no fetch, no flicker.
function readCookieMarket() {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]+)`));
    return match ? match[1] : null;
  } catch (_) { return null; }
}

export const MARKETS = {
  uk: { code: "uk", country: "GB", label: "United Kingdom", flag: "🇬🇧", currency: "£", currencyCode: "GBP" },
  us: { code: "us", country: "US", label: "United States", flag: "🇺🇸", currency: "$", currencyCode: "USD" },
  au: { code: "au", country: "AU", label: "Australia", flag: "🇦🇺", currency: "A$", currencyCode: "AUD" },
};

const MarketContext = createContext({
  market: DEFAULT_MARKET,
  info: MARKETS[DEFAULT_MARKET],
  detected: null,
  userOverride: false,
  setMarket: () => {},
  ready: false,
});

export function MarketProvider({ children }) {
  // IMPORTANT: initial state must match SSG output (which always renders UK).
  // Reading localStorage/cookies at first render breaks hydration and kills
  // event handlers site-wide. All detection happens post-mount below.
  const [market, setMarketState] = useState(DEFAULT_MARKET);
  const [detected, setDetected] = useState(null);
  const [userOverride, setUserOverride] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Post-hydration: pick market in priority order — user override > cookie > /api/geo.
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (stored && MARKETS[stored]) {
      setMarketState(stored);
      setUserOverride(true);
      setReady(true);
      // Background: refresh detection for the "your detected market differs" hint,
      // but never overwrite the user's explicit choice.
      fetch("/api/geo").then(r => r.json()).then(d => setDetected(d)).catch(() => {});
      return;
    }
    const cookie = readCookieMarket();
    if (cookie && MARKETS[cookie]) {
      setMarketState(cookie);
    }
    fetch("/api/geo")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        setDetected(d);
        if (d.market && MARKETS[d.market]) setMarketState(d.market);
      })
      .catch(() => { /* silent — stay on cookie or default */ })
      .finally(() => setReady(true));
  }, []);

  const setMarket = useCallback((next) => {
    if (!MARKETS[next]) return;
    setMarketState(next);
    setUserOverride(true);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  }, []);

  return (
    <MarketContext.Provider value={{ market, info: MARKETS[market], detected, userOverride, setMarket, ready }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() { return useContext(MarketContext); }

export default MarketContext;
