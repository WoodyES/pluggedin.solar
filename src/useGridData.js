import { useEffect, useState } from "react";

// Market-aware grid mix hook.
// - UK: Carbon Intensity API (public, no key, works today)
// - US: EIA API if VITE_EIA_KEY env var is present, else 2026 EIA annual mix as a static baseline
// - AU: OpenNEM API if VITE_OPENNEM_KEY env var is present, else recent AEMO NEM mix as a static baseline
// Static baselines let the widget show something meaningful before keys are wired in.

const STATIC_US = {
  solar: 8.5, wind: 12.0, nuclear: 18.5, gas: 41.0, biomass: 1.5, imports: 0,
  static: true, source: "EIA 2026 annual mix",
};
const STATIC_AU = {
  solar: 17.0, wind: 15.0, nuclear: 0, gas: 12.0, biomass: 0.5, imports: 0,
  static: true, source: "OpenNEM 2026 avg",
};

export default function useGridData(market) {
  const [gridData, setGridData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let intervalId = null;

    async function fetchForMarket() {
      if (market === "uk") {
        try {
          const r = await fetch("https://api.carbonintensity.org.uk/generation");
          const json = await r.json();
          const mix = json.data.generationmix;
          const get = f => mix.find(m => m.fuel === f)?.perc || 0;
          if (cancelled) return;
          setGridData({
            solar: get("solar"),
            wind: get("wind") + get("wind_offshore") + get("wind_onshore"),
            nuclear: get("nuclear"),
            gas: get("gas"),
            biomass: get("biomass"),
            imports: get("imports"),
            at: new Date(),
            source: "Carbon Intensity API",
          });
        } catch (_) { /* keep whatever we last had, or null */ }
      } else if (market === "us") {
        // EIA API v2 requires a free key at https://www.eia.gov/opendata/register.php
        // Endpoint: /v2/electricity/rto/fuel-type-data/data/?facets[respondent][]=US48&frequency=hourly
        const key = import.meta.env.VITE_EIA_KEY;
        if (!key) { if (!cancelled) setGridData(STATIC_US); return; }
        try {
          const url = `https://api.eia.gov/v2/electricity/rto/fuel-type-data/data/?frequency=hourly&data[0]=value&facets[respondent][]=US48&sort[0][column]=period&sort[0][direction]=desc&length=24&api_key=${key}`;
          const j = await (await fetch(url)).json();
          const rows = j?.response?.data || [];
          const totals = {};
          for (const r of rows) {
            const k = (r.fueltype || "").toLowerCase();
            totals[k] = (totals[k] || 0) + Number(r.value || 0);
          }
          const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
          if (cancelled) return;
          setGridData({
            solar: ((totals.sun || 0) / sum) * 100,
            wind: ((totals.wnd || 0) / sum) * 100,
            nuclear: ((totals.nuc || 0) / sum) * 100,
            gas: ((totals.ng || 0) / sum) * 100,
            biomass: (((totals.oth || 0) + (totals.bio || 0)) / sum) * 100,
            imports: 0,
            at: new Date(),
            source: "EIA Grid Monitor",
          });
        } catch (_) { if (!cancelled) setGridData(STATIC_US); }
      } else if (market === "au") {
        // OpenNEM V4 needs a free key from platform.openelectricity.org.au
        const key = import.meta.env.VITE_OPENNEM_KEY;
        if (!key) { if (!cancelled) setGridData(STATIC_AU); return; }
        try {
          // Endpoint format subject to change; using v4 network flows.
          const url = "https://api.openelectricity.org.au/v4/data/network/NEM?metrics=power&interval=5m&primary_grouping=network_region&secondary_grouping=fueltech_group";
          const j = await (await fetch(url, { headers: { Authorization: `Bearer ${key}` } })).json();
          const totals = {};
          const rows = j?.data || [];
          for (const row of rows) {
            const k = (row.fueltech_group || row.fueltech || "").toLowerCase();
            const v = Array.isArray(row.data) ? row.data[row.data.length - 1]?.[1] || 0 : 0;
            totals[k] = (totals[k] || 0) + Number(v || 0);
          }
          const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
          if (cancelled) return;
          setGridData({
            solar: (((totals.solar || 0) + (totals.solar_rooftop || 0)) / sum) * 100,
            wind: ((totals.wind || 0) / sum) * 100,
            nuclear: 0,
            gas: ((totals.gas || 0) / sum) * 100,
            biomass: ((totals.bioenergy || 0) / sum) * 100,
            imports: 0,
            at: new Date(),
            source: "OpenNEM",
          });
        } catch (_) { if (!cancelled) setGridData(STATIC_AU); }
      }
    }

    fetchForMarket();
    // Refresh every 5 min for live APIs; static defaults don't need refresh but the interval is harmless.
    intervalId = setInterval(fetchForMarket, 5 * 60 * 1000);
    return () => { cancelled = true; if (intervalId) clearInterval(intervalId); };
  }, [market]);

  return gridData;
}
