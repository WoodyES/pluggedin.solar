import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import T from "../tokens";
import SectionLabel from "../components/SectionLabel";
import SEO from "../components/SEO";
import registry from "../data/compliantDevices.json";
import kitPrices from "../data/kitPrices.json";

function priceFor(ref) {
  return (kitPrices.prices && kitPrices.prices[ref]) || null;
}

// Stable colour per manufacturer for the placeholder image tile.
// Uses a small palette from our design tokens so tiles look on-brand.
function tileColour(manufacturer) {
  const palette = ["#E09400", "#0EA5E9", "#10B981", "#8B5CF6", "#F59E0B", "#EC4899", "#14B8A6", "#6366F1"];
  let h = 0;
  for (const c of (manufacturer || "?")) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

function initials(manufacturer) {
  return (manufacturer || "?")
    .replace(/\bltd\b\.?|\binc\.?\b|\bco\.?\b|\blimited\b|\bgmbh\b|\btechnologies?\b/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() || "")
    .join("") || "K";
}

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

// Mounting style detected from model name/comments (best-effort, for filtering).
// Kits often list multiple mount options — we return every one that matches.
function mountingTypes(model = "", comments = "") {
  const text = `${model} ${comments}`.toLowerCase();
  const types = new Set();
  if (/balcony|balcon(?!y)|rail/.test(text)) types.add("Balcony");
  if (/\bwall\b|facade|façade/.test(text)) types.add("Wall");
  if (/roof|pitched|tile/.test(text)) types.add("Roof");
  if (/ground|floor|garden|ballast|mesh fence/.test(text)) types.add("Ground");
  if (types.size === 0) types.add("Other");
  return [...types];
}
// Back-compat single-value for tile labelling (returns first / most-specific match).
function primaryMount(model, comments) {
  const list = mountingTypes(model, comments);
  return list[0];
}

// Get unique sorted values for a field across all devices.
function uniqueSorted(items, key) {
  return [...new Set(items.map(key).filter(Boolean))].sort();
}

export default function ProductsPage() {
  const devices = registry.devices || [];

  // Read cached calculator context from localStorage — set by /calculator when
  // the user completes it. Lets us show personalised per-kit savings.
  const [calcCtx, setCalcCtx] = useState(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pin-calc-context");
      if (raw) setCalcCtx(JSON.parse(raw));
    } catch (_) {}
  }, []);

  const [manufacturer, setManufacturer] = useState("all");
  const [band, setBand] = useState("all");
  const [mount, setMount] = useState("all");
  const [priceMax, setPriceMax] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const manufacturers = useMemo(() => uniqueSorted(devices, d => d.manufacturer), [devices]);
  const bands = ["≤400W", "600W", "800W"];
  const mounts = ["Balcony", "Wall", "Roof", "Ground", "Other"];

  const filtered = useMemo(() => {
    let out = devices.slice();
    if (manufacturer !== "all") out = out.filter(d => d.manufacturer === manufacturer);
    if (band !== "all") out = out.filter(d => capacityBand(d.capacityKw) === band);
    if (mount !== "all") out = out.filter(d => mountingTypes(d.model, d.comments).includes(mount));
    if (priceMax !== "all") {
      const cap = parseInt(priceMax, 10);
      out = out.filter(d => {
        const p = priceFor(d.ref);
        return p && typeof p.gbp === "number" && p.gbp <= cap;
      });
    }
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
    if (sort === "price-asc") {
      out.sort((a, b) => {
        const pa = priceFor(a.ref)?.gbp ?? Number.MAX_SAFE_INTEGER;
        const pb = priceFor(b.ref)?.gbp ?? Number.MAX_SAFE_INTEGER;
        return pa - pb;
      });
    }
    if (sort === "price-desc") {
      out.sort((a, b) => {
        const pa = priceFor(a.ref)?.gbp ?? -1;
        const pb = priceFor(b.ref)?.gbp ?? -1;
        return pb - pa;
      });
    }
    return out;
  }, [devices, manufacturer, band, mount, priceMax, sort, search]);

  // JSON-LD ItemList for SEO — Google recognises this as a product directory
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "UK Compliant Plug-in Solar Kits",
    "description": `${devices.length} UK ENA-compliant plug-in solar kits, updated daily.`,
    "numberOfItems": devices.length,
    "itemListElement": devices.slice(0, 30).map((d, i) => {
      const p = priceFor(d.ref);
      const item = {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": `${d.manufacturer} — ${d.model.split("+")[0].trim().slice(0, 80)}`,
          "productID": d.ref,
          "brand": { "@type": "Brand", "name": d.manufacturer },
          "category": "Plug-in solar kit",
        },
      };
      if (p && p.gbp) {
        item.item.offers = {
          "@type": "Offer",
          "priceCurrency": "GBP",
          "price": p.gbp,
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": p.retailer || "Various" },
        };
      }
      return item;
    }),
  };

  const fetchedDate = (registry.fetchedAt || "").split("T")[0];

  return (
    <section className="section-pad" style={{ padding: "100px 20px 80px" }}>
      <SEO
        title="UK Plug-in Solar Kits Directory"
        description={`All ${devices.length} UK-compliant plug-in solar kits from the ENA Type Test Register, filterable by manufacturer, capacity, price and mounting style. Updated daily.`}
        path="/products"
        jsonLd={itemListLd}
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

        <div className="products-grid">
          {/* SIDEBAR FILTERS */}
          <aside className="products-sidebar" style={{
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

            <FilterGroup label="Max price (£)">
              <FilterChips value={priceMax} setValue={setPriceMax} options={["400", "600", "800", "1000"]} />
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
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="capacity-desc">Capacity: high to low</option>
                <option value="capacity-asc">Capacity: low to high</option>
                <option value="manufacturer">Manufacturer A–Z</option>
              </select>
            </FilterGroup>

            {(manufacturer !== "all" || band !== "all" || mount !== "all" || priceMax !== "all" || search) && (
              <button
                onClick={() => { setManufacturer("all"); setBand("all"); setMount("all"); setPriceMax("all"); setSearch(""); }}
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

            {calcCtx && (
              <div style={{
                padding: "10px 14px", borderRadius: 10, marginBottom: 16,
                border: `1px solid ${T.solarBorder}`, background: T.solarLight,
                fontSize: "0.82rem", color: T.ink, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
              }}>
                <span style={{ fontWeight: 700 }}>Personalised savings on:</span>
                <span>{calcCtx.area || "your location"}</span>
                <span style={{ color: T.inkFaint }}>·</span>
                <span>{calcCtx.tariff?.toFixed(1)}p/kWh</span>
                <span style={{ color: T.inkFaint }}>·</span>
                <span>{Math.round((calcCtx.selfConsumption || 0.55) * 100)}% self-consumption</span>
                <Link to="/calculator" style={{ marginLeft: "auto", fontSize: "0.75rem", color: T.solar, textDecoration: "underline" }}>Edit →</Link>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(d => <KitCard key={d.ref} d={d} calcCtx={calcCtx} />)}
            </div>

            {/* Related content interlinking */}
            <div style={{ marginTop: 48, padding: 24, borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface }}>
              <div style={{ fontFamily: T.display, fontSize: "1.1rem", fontWeight: 700, marginBottom: 12 }}>Related reading</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.9rem", lineHeight: 1.9 }}>
                <li><Link to="/blog/uk-compliant-plug-in-solar-devices-live" style={{ color: T.solar, textDecoration: "underline" }}>How the ENA compliance register works</Link> — full explainer of G98, DNO notification, and why the list matters</li>
                <li><Link to="/blog/g98-dno-notification-step-by-step" style={{ color: T.solar, textDecoration: "underline" }}>G98 DNO notification — step-by-step</Link> — the form you'll file after buying</li>
                <li><Link to="/blog/best-plug-in-solar-kit-uk" style={{ color: T.solar, textDecoration: "underline" }}>Best plug-in solar kits UK 2026</Link> — our editorial buyer's guide</li>
                <li><Link to="/blog/is-plug-in-solar-legal-uk" style={{ color: T.solar, textDecoration: "underline" }}>Is plug-in solar legal in the UK?</Link> — the SI 2026/848 story</li>
                <li><Link to="/calculator" style={{ color: T.solar, textDecoration: "underline" }}>Personalised savings calculator</Link> — PVGIS data for your postcode</li>
              </ul>
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

function KitCard({ d, calcCtx }) {
  const aff = affiliateFor(d);
  const price = priceFor(d.ref);
  const cap = typeof d.capacityKw === "number" ? `${(d.capacityKw * 1000).toFixed(0)}W` : "—";
  const pub = (d.published || "").split("T")[0];
  const allMounts = mountingTypes(d.model, d.comments);
  const mount = allMounts.join(", ");
  const enaLink = `https://connect-direct.energynetworks.org/device-databases/search-gen?device_type_id=14&compliance_status_id=Compliant`;

  // Personalised savings: if the user has run the calculator, compute per-kit
  // annual saving = capacityKw × annualKwhPerKw × selfConsumption × (tariff / 100).
  let personalisedSaving = null;
  let payback = null;
  if (calcCtx && calcCtx.annualKwhPerKw && d.capacityKw) {
    const kwh = d.capacityKw * calcCtx.annualKwhPerKw * (calcCtx.selfConsumption || 0.55);
    personalisedSaving = (kwh * (calcCtx.tariff || 24.5)) / 100;
    if (price && price.gbp && personalisedSaving > 0) {
      payback = price.gbp / personalisedSaving;
    }
  }

  const bg = tileColour(d.manufacturer);
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = price?.image && !imgFailed;

  return (
    <article className="kit-card" style={{
      borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface,
      gap: 0, overflow: "hidden",
    }}>
      {/* Image tile — real product image if available, manufacturer-coloured initials fallback */}
      <div className="kit-tile" style={{
        background: hasImage ? "#fff" : `linear-gradient(135deg, ${bg}, ${bg}dd)`,
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: T.display, fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.02em",
        minHeight: 140, position: "relative", padding: hasImage ? 10 : 0,
      }}>
        {hasImage ? (
          <img
            src={price.image}
            alt={`${d.manufacturer} ${d.model.split("+")[0].trim().slice(0, 60)}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            style={{ maxWidth: "100%", maxHeight: 120, objectFit: "contain" }}
          />
        ) : (
          <span>{initials(d.manufacturer)}</span>
        )}
        <span style={{
          position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center",
          fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
          opacity: hasImage ? 1 : 0.85, fontFamily: T.body,
          color: hasImage ? T.inkFaint : "#fff",
        }}>
          {cap}
        </span>
      </div>

      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ fontFamily: T.display, fontSize: "1rem", fontWeight: 700, color: T.ink, lineHeight: 1.35, marginBottom: 4 }}>
              {d.manufacturer} — {d.model.replace(/^[\s–—]+/, "").split("+")[0].trim().slice(0, 80)}{d.model.length > 80 ? "…" : ""}
            </div>
            <div style={{ fontSize: "0.72rem", color: T.inkFaint }}>
              ENA ref: <a href={enaLink} target="_blank" rel="noreferrer" style={{ color: T.solar, textDecoration: "underline" }}>{d.ref}</a>
              {" · "}Listed {pub}
            </div>
          </div>
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: 20,
            background: T.greenLight, color: T.green, border: `1px solid ${T.greenBorder}`,
            whiteSpace: "nowrap", flexShrink: 0,
          }}>✓ Compliant</span>
        </div>

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: "0.78rem", color: T.inkMid, alignItems: "center" }}>
          {price ? (
            <div>
              <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 2 }}>Price</div>
              <div style={{ fontFamily: T.display, fontWeight: 800, color: T.solar, fontSize: "1.1rem" }}>
                £{price.gbp}
                {price.was && <span style={{ fontSize: "0.75rem", color: T.inkFaint, marginLeft: 6, textDecoration: "line-through", fontWeight: 400 }}>£{price.was}</span>}
              </div>
              <div style={{ fontSize: "0.65rem", color: T.inkFaint, marginTop: 1 }}>via {price.retailer}{price.tradeOnly ? " · trade only" : ""}</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: T.inkFaint, marginBottom: 2 }}>Price</div>
              <div style={{ fontSize: "0.85rem", color: T.inkMid }}>On request</div>
            </div>
          )}
          <Spec label="Mounting" value={mount} />
          <Spec label="Phase" value={`${d.phase}φ`} />
          {d.g98GB && <Spec label="Grid code" value="G98 (GB)" />}
          {personalisedSaving !== null && (
            <div style={{ padding: "6px 12px", borderRadius: 8, background: T.solarLight, border: `1px solid ${T.solarBorder}` }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.solar, marginBottom: 2 }}>Your est. savings</div>
              <div style={{ fontFamily: T.display, fontWeight: 800, color: T.solar, fontSize: "1rem" }}>
                £{personalisedSaving.toFixed(0)}/yr
                {payback && <span style={{ fontSize: "0.7rem", fontWeight: 500, color: T.inkMid, marginLeft: 8 }}>· {payback.toFixed(1)}y payback</span>}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            to={`/calculator?w=${Math.round((d.capacityKw || 0.8) * 1000)}`}
            style={{
              flex: "1 1 180px", padding: "9px 14px", borderRadius: 8,
              border: `1px solid ${T.border}`, background: T.bg, color: T.ink,
              fontSize: "0.8rem", fontWeight: 600, fontFamily: T.display,
              textDecoration: "none", textAlign: "center",
            }}
          >
            {calcCtx ? "Refine savings →" : "Estimate savings →"}
          </Link>
          <a
            href={aff.url} target="_blank" rel="noopener noreferrer sponsored"
            style={{
              flex: "1 1 180px", padding: "9px 14px", borderRadius: 8,
              border: "none", background: T.solar, color: "#fff",
              fontSize: "0.8rem", fontWeight: 700, fontFamily: T.display,
              textDecoration: "none", textAlign: "center",
              boxShadow: `0 2px 10px ${T.solarBorder}`,
            }}
          >
            {aff.cta} →
          </a>
        </div>
        <div style={{ fontSize: "0.65rem", color: T.inkFaint, textAlign: "right", marginTop: -4 }}>
          (affiliate link)
        </div>
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
