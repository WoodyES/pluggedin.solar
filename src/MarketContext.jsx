import { createContext, useContext, useEffect, useState, useCallback } from "react";

// UK is the default because the site's centre of gravity is the UK legalisation story.
// Detection: fetch /api/geo (Vercel edge). User override persists to localStorage.
const DEFAULT_MARKET = "uk";
const STORAGE_KEY = "pluggedin-market";

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
  const [market, setMarketState] = useState(DEFAULT_MARKET);
  const [detected, setDetected] = useState(null);
  const [userOverride, setUserOverride] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. If the user has already picked a market, honour that immediately.
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (stored && MARKETS[stored]) {
      setMarketState(stored);
      setUserOverride(true);
      setReady(true);
      // Still fetch geo in the background so we can flag "detected different from selected".
      fetch("/api/geo").then(r => r.json()).then(d => setDetected(d)).catch(() => {});
      return;
    }
    // 2. Otherwise, ask the edge for the detected country.
    fetch("/api/geo")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        setDetected(d);
        if (d.market && MARKETS[d.market]) setMarketState(d.market);
      })
      .catch(() => { /* silent — stay on default */ })
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
