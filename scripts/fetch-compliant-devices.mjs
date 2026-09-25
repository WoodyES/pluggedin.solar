// Fetches the current UK ENA compliant plug-in solar device registry and
// regenerates two artefacts:
//   1. src/data/compliantDevices.json  — raw data snapshot
//   2. Blog/uk-compliant-plug-in-solar-devices-live.md — auto-updated table
//      inside the <!-- devices-auto-start --> / <!-- devices-auto-end --> block
//
// Runs safely idempotent — if the ENA list hasn't changed, the article diff
// is empty and the daily commit skips it. Intended to be run by the daily
// scheduled routine before its normal work.

import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_JSON = join(ROOT, "src", "data", "compliantDevices.json");
const OUT_ARTICLE = join(ROOT, "Blog", "uk-compliant-plug-in-solar-devices-live.md");

const API_BASE = "https://hybrid.connect-direct.energynetworks.org/lct/v1/ttr-search"
  + "?device_type_id=14&compliance_status_id=Compliant"
  + "&sort_by=PublishedDate&ascending=desc";
const PAGE_SIZE = 100; // server caps limit at 100

async function fetchPage(skip) {
  const url = `${API_BASE}&skip=${skip}&limit=${PAGE_SIZE}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`ENA API ${res.status} at skip=${skip}`);
  return res.json();
}

async function main() {
  console.log("Fetching ENA registry...");
  const first = await fetchPage(0);
  const total = first.total_results || 0;
  const devices = Array.isArray(first.data) ? [...first.data] : [];
  // Paginate if more than PAGE_SIZE
  for (let skip = PAGE_SIZE; skip < total; skip += PAGE_SIZE) {
    const p = await fetchPage(skip);
    if (Array.isArray(p.data)) devices.push(...p.data);
  }
  const payload = { total_results: total, data: devices };
  console.log(`Fetched ${devices.length} of ${total} compliant devices.`);

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    total: payload.total_results,
    devices: devices.map(d => ({
      ref: d.DeviceRef,
      published: d.PublishedDate,
      manufacturer: d.TTRManufacturer,
      model: d.ModelNo,
      capacityKw: d.RegisteredCapacity,
      phase: d.TTRDevicePhase,
      category: d.TTRDeviceCategory,
      g98GB: d.FTT_G98 === "Y",
      g99: d.FTT_G99A === "Y" || d.FTT_G99B === "Y" || d.FTT_G99C === "Y" || d.FTT_G99D === "Y",
      softwareVersion: d.SoftwareVersion,
      hardwareVersion: d.HardwareVersion,
      comments: (d.DeviceComments || "").trim(),
    })),
  };
  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(snapshot, null, 2), "utf-8");
  console.log(`Wrote ${OUT_JSON}`);

  // Build markdown table
  const escape = s => String(s || "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
  const rows = snapshot.devices.map(d => {
    const cap = typeof d.capacityKw === "number" ? `${d.capacityKw.toFixed(3)} kW` : "—";
    const pub = (d.published || "").split("T")[0];
    const g98 = d.g98GB ? "✓" : "";
    return `| \`${escape(d.ref)}\` | ${pub} | ${escape(d.manufacturer)} | ${escape(d.model)} | ${cap} | ${g98} |`;
  });

  const table = [
    "| System Ref | Published | Manufacturer | Model | Capacity | G98 |",
    "|---|---|---|---|---|---|",
    ...rows,
  ].join("\n");

  const generatedAt = new Date().toISOString().split("T")[0];
  const block = `<!-- devices-auto-start -->

**Last synced from the ENA Connect Direct registry: ${generatedAt}**
**Total compliant plug-in solar devices: ${snapshot.total}**

${table}

<!-- devices-auto-end -->`;

  // Splice block into the article between the markers
  const article = readFileSync(OUT_ARTICLE, "utf-8");
  const startMarker = "<!-- devices-auto-start -->";
  const endMarker = "<!-- devices-auto-end -->";
  const startIdx = article.indexOf(startMarker);
  const endIdx = article.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Article ${OUT_ARTICLE} is missing the auto-update markers.`);
  }
  const before = article.slice(0, startIdx);
  const after = article.slice(endIdx + endMarker.length);
  const updated = before + block + after;
  writeFileSync(OUT_ARTICLE, updated, "utf-8");
  console.log(`Updated ${OUT_ARTICLE} (${snapshot.devices.length} rows).`);
}

main().catch(err => {
  console.error("ENA fetch failed:", err.message);
  process.exit(1);
});
