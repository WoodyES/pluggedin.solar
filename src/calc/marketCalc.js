// Shared market-aware calculator config: suppliers, tariff defaults, currency
// and geocoding. Imported by HomePage.jsx and CalculatorPage.jsx so both
// calculators stay in sync when we tune per-market defaults.

export const MARKET_CALC = {
  uk: {
    suppliers: [
      { id: "ofgem",  label: "Ofgem cap (default)", rate: 24.50 },
      { id: "oe",     label: "Octopus Flexible",    rate: 24.50 },
      { id: "agile",  label: "Octopus Agile ⚡",    rate: null },
      { id: "bg",     label: "British Gas",          rate: 24.50 },
      { id: "edf",    label: "EDF Energy",           rate: 24.50 },
      { id: "eon",    label: "E.ON Next",            rate: 24.50 },
      { id: "sp",     label: "ScottishPower",        rate: 24.50 },
      { id: "ovo",    label: "Ovo Energy",           rate: 24.50 },
      { id: "manual", label: "Enter manually",       rate: null },
    ],
    tariffDefault: 24.5, tariffMin: 10, tariffMax: 50,
    currency: "£", subUnit: "p", tariffNote: "Ofgem Q2 2026",
    postcodeLabel: "Your postcode", postcodePlaceholder: "e.g. BN1 1AA",
    postcodeVerifyLabel: "verify", postcodeVerifyUrl: "https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you",
    inputLabel: "Enter your postcode...",
    postcodeName: "postcode", // for error text
    stepIntroPostcode: "We use your postcode to get real solar irradiance data from the EU's PVGIS satellite system.",
    stepIntroSupplier: "Your tariff determines how much each kWh of solar saves you. All major suppliers are currently at the Ofgem cap.",
    stepIntroSize: "The UK regulatory cap is 800W. Bigger systems generate more but cost more upfront.",
    avgBill: 1568, avgBillLabel: "avg UK electricity bill",
  },
  us: {
    suppliers: [
      { id: "avg",  label: "US average",     rate: 16.5 },
      { id: "ca",   label: "California avg", rate: 27.0 },
      { id: "hi",   label: "Hawaii avg",     rate: 39.0 },
      { id: "ny",   label: "New York avg",   rate: 22.0 },
      { id: "ma",   label: "Massachusetts",  rate: 24.5 },
      { id: "tx",   label: "Texas avg",      rate: 14.5 },
      { id: "fl",   label: "Florida avg",    rate: 14.0 },
      { id: "manual", label: "Enter manually", rate: null },
    ],
    tariffDefault: 16.5, tariffMin: 8, tariffMax: 50,
    currency: "$", subUnit: "¢", tariffNote: "EIA 2026",
    postcodeLabel: "Your ZIP code", postcodePlaceholder: "e.g. 94103",
    postcodeVerifyLabel: "EIA rates", postcodeVerifyUrl: "https://www.eia.gov/electricity/state/",
    inputLabel: "Enter your ZIP code...",
    postcodeName: "ZIP code",
    stepIntroPostcode: "We use your ZIP to get real solar irradiance data via PVGIS satellite records (global ERA5 coverage).",
    stepIntroSupplier: "Your state's residential rate determines how much each kWh of solar saves. Pick the closest state average or enter yours manually.",
    stepIntroSize: "Small plug-in systems (200–800W) fit inside most utility notification thresholds. Above 800W generally needs a full interconnection.",
    avgBill: 1800, avgBillLabel: "avg US electricity bill",
  },
  au: {
    suppliers: [
      { id: "avg", label: "AU peak avg",     rate: 33.0 },
      { id: "nsw", label: "NSW average",     rate: 34.0 },
      { id: "vic", label: "Victoria avg",    rate: 31.0 },
      { id: "qld", label: "Queensland avg",  rate: 27.0 },
      { id: "sa",  label: "South Australia", rate: 41.0 },
      { id: "wa",  label: "WA average",      rate: 30.0 },
      { id: "tas", label: "Tasmania avg",    rate: 29.0 },
      { id: "manual", label: "Enter manually", rate: null },
    ],
    tariffDefault: 33.0, tariffMin: 15, tariffMax: 60,
    currency: "A$", subUnit: "c", tariffNote: "AER 2026",
    postcodeLabel: "Your postcode", postcodePlaceholder: "e.g. 2000",
    postcodeVerifyLabel: "AER prices", postcodeVerifyUrl: "https://www.aer.gov.au/consumers/energy-prices",
    inputLabel: "Enter your postcode...",
    postcodeName: "postcode",
    stepIntroPostcode: "We use your postcode to get real solar irradiance data via PVGIS (global satellite records — covers Australia natively).",
    stepIntroSupplier: "Australian retail electricity varies by state and time of day. Pick your state's peak average or enter your evening rate manually.",
    stepIntroSize: "For portable and off-grid setups, sizing scales with target loads. 400W covers fridges and lighting; 800W plus a battery handles evening use.",
    avgBill: 1900, avgBillLabel: "avg AU electricity bill",
  },
};

// Geocoding: UK stays on postcodes.io (best accuracy for UK postcodes).
// US and AU use zippopotam.us (free, no API key, covers both).
export async function geocodeUK(pc) {
  const clean = pc.replace(/\s/g, "").toUpperCase();
  if (clean.length < 4) throw new Error("too short");
  const r = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
  const j = await r.json();
  if (j.status !== 200) throw new Error("not found");
  return { lat: j.result.latitude, lon: j.result.longitude, area: j.result.admin_district || clean };
}

export async function geocodeZip(pc, country) {
  const clean = pc.replace(/\s/g, "");
  const r = await fetch(`https://api.zippopotam.us/${country}/${clean}`);
  if (!r.ok) throw new Error("not found");
  const j = await r.json();
  const p = j.places?.[0];
  if (!p) throw new Error("not found");
  return {
    lat: parseFloat(p.latitude),
    lon: parseFloat(p.longitude),
    area: `${p["place name"] || clean}${p["state abbreviation"] ? ", " + p["state abbreviation"] : ""}`,
  };
}

export async function geocodeForMarket(market, pc) {
  if (market === "uk") return geocodeUK(pc);
  if (market === "us") return geocodeZip(pc, "us");
  if (market === "au") return geocodeZip(pc, "au");
  return geocodeUK(pc);
}
