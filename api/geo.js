// Vercel Edge Function — returns detected country from Vercel's geo headers.
// Runs at the edge (zero cold start, no external API call).
// Response is cached per-country for 1 hour.
export const config = { runtime: "edge" };

const SUPPORTED = new Set(["GB", "US", "AU"]);

function marketFromCountry(cc) {
  if (cc === "GB") return "uk";
  if (cc === "US") return "us";
  if (cc === "AU") return "au";
  return "uk"; // default fallback for unsupported countries
}

export default function handler(req) {
  // Vercel injects these headers on every request at the edge
  const country = req.headers.get("x-vercel-ip-country") || "GB";
  const region = req.headers.get("x-vercel-ip-country-region") || "";
  const city = req.headers.get("x-vercel-ip-city") || "";

  const market = marketFromCountry(country);

  return new Response(
    JSON.stringify({
      country,
      region,
      city: decodeURIComponent(city),
      market,
      supported: SUPPORTED.has(country),
    }),
    {
      headers: {
        "content-type": "application/json",
        // 1 hour cache per country (Vary on the geo header)
        "cache-control": "public, max-age=3600, s-maxage=3600",
        "vary": "x-vercel-ip-country",
        // Client-readable cookie so MarketProvider can pick the correct
        // market synchronously on repeat visits (no fetch round-trip flicker).
        "set-cookie": `pin-market=${market}; Path=/; Max-Age=2592000; SameSite=Lax`,
      },
    },
  );
}
