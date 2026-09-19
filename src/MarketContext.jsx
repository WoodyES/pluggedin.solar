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
  // Synchronous initial pick order:
  //   1. localStorage user override (highest)
  //   2. pin-market cookie set by /api/geo on a previous visit (zero-flicker for repeats)
  //   3. UK default (for the very first visit — corrected by /api/geo below if wrong)
  const initialMarket = (() => {
    if (typeof window === "undefined") return DEFAULT_MARKET;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && MARKETS[stored]) return stored;
    } catch (_) {}
    const cookie = readCookieMarket();
    if (cookie && MARKETS[cookie]) return cookie;
    return DEFAULT_MARKET;
  })();

  const [market, setMarketState] = useState(initialMarket);
  const [detected, setDetected] = useState(null);
  const [userOverride, setUserOverride] = useState(() => {
    if (typeof window === "undefined") return false;
    try { return !!localStorage.getItem(STORAGE_KEY); } catch (_) { return false; }
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fetch /api/geo to (a) refresh detection, (b) set the pin-market cookie
    // for next visit, and (c) correct our optimistic default if it was wrong.
    fetch("/api/geo")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        setDetected(d);
        // Only overwrite if the user hasn't picked something manually already
        if (!userOverride && d.market && MARKETS[d.market] && d.market !== market) {
          setMarketState(d.market);
        }
      })
      .catch(() => { /* silent — stay on current choice */ })
      .finally(() => setReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
