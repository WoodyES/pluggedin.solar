import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import registry from "../data/compliantDevices.json";

// Manufacturer-specific affiliate destination mapping.
// If a manufacturer isn't listed here, we fall back to an Amazon UK search
// URL constructed from the model name + our UK Amazon tag.
const AWIN_STREAM_KIT = "https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fuk.ecoflow.com%2Fproducts%2Fstream-garden-ground-kit";
const AWIN_STREAM_BALCONY = "https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fuk.ecoflow.com%2Fpages%2Fstream-balcony-solar-system";
const AMZ_TAG = "pluggedinsola-21";

function affiliateFor(device) {
  const manu = (device.manufacturer || "").toLowerCase();
  const model = (device.model || "");
  if (manu.includes("ecoflow")) {
    // EcoFlow has an Awin program — send to STREAM kit page (highest converter)
    const isBalcony = /balcony|facade|wall/i.test(model);
    return {
      network: "EcoFlow via Awin",
      cta: "Buy at EcoFlow UK",
      url: isBalcony ? AWIN_STREAM_BALCONY : AWIN_STREAM_KIT,
    };
  }
  // Fallback: Amazon UK search on manufacturer + first few words of model
  const searchTerms = encodeURIComponent(
    `${device.manufacturer} ${model.split(/\s+/).slice(0, 5).join(" ")}`.trim(),
  );
  return {
    network: "Amazon UK",
    cta: "Search on Amazon UK",
    url: `https://www.amazon.co.uk/s?k=${searchTerms}&tag=${AMZ_TAG}`,
  };
}

// Derive rough capacity band for filtering.
function capacityBand(kw) {
  if (kw <= 0.4) return "≤400W";
  if (kw <= 0.6) return "600W";
  return "800W";
}

// Mounting style detected from model name (best-effort, for filtering).
function mountingType(model = "") {
  const m = model.toLowerCase();
  if (/balcony|balcon|facade/i.test(m)) return "Balcony";
  if (/wall/i.test(m)) return "Wall";
  if (/roof|flat.?roof|pitched/i.test(m)) return "Roof";
  if (/ground|floor|ballast/i.test(m)) return "Ground";
  return "Other";
}

// Get unique sorted values for a field across all devices.
function uniqueSorted(items, key) {
  return [...new Set(items.map(key).filter(Boolean))].sort();
}

export default function ProductsPage() {
  const devices = registry.devices || [];

  const [manufacturer, setManufacturer] = useState("all");
  const [band, setBand] = useState("all");
  const [mount, setMount] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const manufacturers = useMemo(() => uniqueSorted(devices, d => d.manufacturer), [devices]);
  const bands = ["≤400W", "600W", "800W"];
  const mounts = ["Balcony", "Wall", "Roof", "Ground", "Other"];

  const filtered = useMemo(() => {
    let out = devices.slice();
    if (manufacturer !== "all") out = out.filter(d => d.manufacturer === manufacturer);
    if (band !== "all") out = out.filter(d => capacityBand(d.capacityKw) === band);
    if (mount !== "all") out = out.filter(d => mountingType(d.model) === mount);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(d =>
        (d.manufacturer || "").toLowerCase().includes(q) ||
        (d.model || "").toLowerCase().includes(q) ||
        (d.ref || "").toLowerCase().includes(q)
      );
    }
    if (sort === "newest") out.sort((a, b) => (b.published || "").localeCompare(a.published || ""));
    if (sort === "capacity-desc") out.sort((a, b) => (b.capacityKw || 0) - (a.capacityKw || 0));
    if (sort === "capacity-asc") out.sort((a, b) => (a.capacityKw || 0) - (b.capacityKw || 0));
    if (sort === "manufacturer") out.sort((a, b) => (a.manufacturer || "").localeCompare(b.manufacturer || ""));
    return out;
  }, [devices, manufacturer, band, mount, sort, search]);

  const fetchedDate = (registry.fetchedAt || "").split("T")[0];

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="UK Plug-in Solar Kits Directory"
        description={`All ${devices.length} UK-compliant plug-in solar kits from the ENA Type Test Register, filterable by manufacturer, capacity and mounting style. Updated daily.`}
        path="/products"
      />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>UK product tracker</SectionLabel>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, marginTop: 12, marginBottom: 8, letterSpacing: "-0.02em" }}>
          All UK plug-in solar kits
        </h1>
        <p style={{ color: T.inkFaint, fontSize: "0.85rem", marginBottom: 20 }}>
          Last synced from the ENA Type Test Register: <strong>{fetchedDate}</strong> · {devices.length} devices tracked · Updated daily
        </p>

        <p style={{ color: T.inkMid, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24, maxWidth: 720 }}>
          We monitor the Plug-in Solar category on the official{" "}
          <a href="https://connect-direct.energynetworks.org/device-databases/search-gen?device_type_id=14&compliance_status_id=Compliant" target="_blank" rel="noreferrer" style={{ color: T.solar, textDecoration: "underline" }}>ENA Type Test Register</a>.
          Only kits listed there and marked as compliant qualify for lawful G98 notification under the UK plug-in solar route (SI 2026 No. 848). See our{" "}
          <Link to="/blog/uk-compliant-plug-in-solar-devices-live" style={{ color: T.solar, textDecoration: "underline" }}>full explainer</Link> or run your{" "}
          <Link to="/calculator" style={{ color: T.solar, textDecoration: "underline" }}>savings estimate</Link>.
        </p>

        <div className="grid-2-calc" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, alignItems: "start" }}>
          {/* SIDEBAR FILTERS */}
          <aside style={{
            padding: 20, borderRadius: 14, border: `1px solid ${T.border}`,
            background: T.surface, position: "sticky", top: 82,
          }}>
            <div style={{ fontFamily: T.display, fontSize: "0.95rem", fontWeight: 700, marginBottom: 14 }}>Filters</div>

            <FilterGroup label="Search">
              <input
                type="text" value={search} placeholder="Manufacturer or model"
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
                  fontSize: "0.85rem", fontFamily: T.body, outline: "none",
                }}
              />
            </FilterGroup>

            <FilterGroup label="Capacity">
              <FilterChips value={band} setValue={setBand} options={bands} />
            </FilterGroup>

            <FilterGroup label="Mounting">
              <FilterChips value={mount} setValue={setMount} options={mounts} />
            </FilterGroup>

            <FilterGroup label="Manufacturer">
              <select
                value={manufacturer} onChange={e => setManufacturer(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
                  fontSize: "0.85rem", fontFamily: T.body, cursor: "pointer",
                }}
              >
                <option value="all">All manufacturers</option>
                {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="Sort by">
              <select
                value={sort} onChange={e => setSort(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
                  fontSize: "0.85rem", fontFamily: T.body, cursor: "pointer",
                }}
              >
                <option value="newest">Newest first</option>
                <option value="capacity-desc">Capacity: high to low</option>
                <option value="capacity-asc">Capacity: low to high</option>
                <option value="manufacturer">Manufacturer A–Z</option>
              </select>
            </FilterGroup>

            {(manufacturer !== "all" || band !== "all" || mount !== "all" || search) && (
              <button
                onClick={() => { setManufacturer("all"); setBand("all"); setMount("all"); setSearch(""); }}
                style={{
                  marginTop: 8, width: "100%", padding: "9px 12px", borderRadius: 8,
                  border: `1px solid ${T.border}`, background: "transparent", color: T.inkMid,
                  fontSize: "0.8rem", fontFamily: T.body, cursor: "pointer",
                }}
              >
                Clear filters
              </button>
            )}
          </aside>

          {/* RESULTS */}
          <div>
            <div style={{ fontSize: "0.85rem", color: T.inkMid, marginBottom: 16 }}>
              Showing <strong style={{ color: T.ink }}>{filtered.length}</strong> of {devices.length} compliant kits
            </div>

            {filtered.length === 0 && (
              <div style={{ padding: "40px 20px", textAlign: "center", color: T.inkFaint, fontSize: "0.9rem" }}>
                No kits match those filters. Try widening the criteria.
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(d => <KitCard key={d.ref} d={d} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em",
        textTransform: "uppercase", color: T.inkFaint, marginBottom: 8, fontFamily: T.display,
      }}>{label}</div>
      {children}
    </div>
  );
}

function FilterChips({ value, setValue, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      <Chip active={value === "all"} onClick={() => setValue("all")}>All</Chip>
      {options.map(o => <Chip key={o} active={value === o} onClick={() => setValue(o)}>{o}</Chip>)}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 11px", borderRadius: 16,
        border: `1px solid ${active ? T.solar : T.border}`,
        background: active ? T.solarLight : T.surface,
        color: active ? T.solar : T.inkMid,
        fontSize: "0.75rem", fontWeight: active ? 600 : 500,
        fontFamily: T.body, cursor: "pointer",
      }}
    >{children}</button>
  );
}

function KitCard({ d }) {
  const aff = affiliateFor(d);
  const cap = typeof d.capacityKw === "number" ? `${(d.capacityKw * 1000).toFixed(0)}W` : "—";
  const pub = (d.published || "").split("T")[0];
  const mount = mountingType(d.model);
  const enaLink = `https://connect-direct.energynetworks.org/device-databases/search-gen?device_type_id=14&compliance_status_id=Compliant`;

  return (
    <article style={{
      padding: 18, borderRadius: 14,
      border: `1px solid ${T.border}`, background: T.surface,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: T.ink, lineHeight: 1.35, marginBottom: 6 }}>
            {d.manufacturer} — {d.model.replace(/^[\s–—]+/, "").split("+")[0].trim().slice(0, 80)}{d.model.length > 80 ? "…" : ""}
          </div>
          <div style={{ fontSize: "0.75rem", color: T.inkFaint }}>
            ENA ref: <a href={enaLink} target="_blank" rel="noreferrer" style={{ color: T.solar, textDecoration: "underline" }}>{d.ref}</a>
            {" · "}Published {pub}
          </div>
        </div>
        <span style={{
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 20,
          background: T.greenLight, color: T.green, border: `1px solid ${T.greenBorder}`,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          ✓ Compliant
        </span>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: "0.8rem", color: T.inkMid }}>
        <Spec label="Capacity" value={cap} />
        <Spec label="Phase" value={`${d.phase}φ`} />
        <Spec label="Mounting" value={mount} />
        {d.g98GB && <Spec label="Grid code" value="G98 (GB)" />}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
        <Link
          to={`/calculator?w=${Math.round((d.capacityKw || 0.8) * 1000)}`}
          style={{
            flex: "1 1 180px", padding: "10px 14px", borderRadius: 8,
            border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
            fontSize: "0.82rem", fontWeight: 600, fontFamily: T.display,
            textDecoration: "none", textAlign: "center",
          }}
        >
          Estimate savings →
        </Link>
        <a
          href={aff.url} target="_blank" rel="noopener noreferrer sponsored"
          style={{
            flex: "1 1 180px", padding: "10px 14px", borderRadius: 8,
            border: "none", background: T.solar, color: "#fff",
            fontSize: "0.82rem", fontWeight: 700, fontFamily: T.display,
            textDecoration: "none", textAlign: "center",
            boxShadow: `0 2px 10px ${T.solarBorder}`,
          }}
        >
          {aff.cta} →
        </a>
      </div>
      <div style={{ fontSize: "0.68rem", color: T.inkFaint, textAlign: "right" }}>
        {aff.cta.includes("Amazon") || aff.cta.includes("EcoFlow") ? "(affiliate link)" : ""}
      </div>
    </article>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 600, color: T.ink }}>{value}</div>
    </div>
  );
}
