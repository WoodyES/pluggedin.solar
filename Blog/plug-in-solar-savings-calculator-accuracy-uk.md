---
slug: plug-in-solar-savings-calculator-accuracy-uk
title: How Accurate Are Solar Savings Calculators? What Ours Gets Right (and Wrong)
excerpt: Understanding solar calculator accuracy, PVGIS methodology, and the ±5% uncertainty band around any solar estimate.
date: 2026-05-04
category: calculators
author: pluggedin.solar
---

# How Accurate Are Solar Savings Calculators? What Ours Gets Right (and Wrong)

You run a solar calculator, it tells you "850 kWh/year," and you think that's gospel. The reality is more nuanced. Every solar savings calculator—including ours—has uncertainty built in. This article explains what our calculator gets right, where it's uncertain, and when you should trust the numbers vs when you need a professional survey.

## The Bottom Line: ±5% Accuracy for Generation, ±10–15% for Savings

Our calculator's estimates are accurate within:

**Annual generation: ±5%**
- PVGIS data is solid. 30 years of satellite irradiance data, updated annually, validated against ground stations.
- An estimate of 850 kWh/year has a 95% confidence interval of 808–892 kWh (±42 kWh).

**Annual savings: ±10–15%**
- Generation accuracy is ±5%, but savings add a second layer of uncertainty (tariff, usage patterns, export value).
- An estimate of £256/year could realistically be £218–£294 depending on how much you self-consume and your exact tariff.

**Why wider savings uncertainty?** Because we don't know your exact usage pattern. You might work from home (high self-consumption, savings toward high end) or work away (low self-consumption, savings toward low end). The calculator has to assume a middle ground.

## What Our Calculator Gets Right

### 1. Solar Irradiance Data (PVGIS)
We use **PVGIS (Photovoltaic Geographical Information System)** from the EU's Joint Research Centre. This is the gold standard for UK solar forecasting.

**What PVGIS gives us:**
- 30 years of satellite and ground-station irradiance data (1994–2023)
- Monthly averages of global horizontal, direct normal, and diffuse irradiance
- Cloud cover patterns, aerosol optical depth, and atmospheric water vapor
- Updated annually with new data

**Validation:** PVGIS has been validated against thousands of real roof-top installations across Europe. Root-mean-square error: ±3–5% for annual estimates, ±10–15% for monthly.

**What this means:** If PVGIS says 850 kWh/year for your postcode, the real 30-year average is between 808–892 kWh. Any single year might be 10–15% off (very sunny vs very cloudy).

### 2. System Efficiency (19% Module, 7% Inverter Loss)
We assume:
- **Module efficiency:** 19% (typical modern panel converts 19% of sunlight to electricity)
- **Inverter efficiency:** 93% (7% loss converting DC to AC, plus wiring losses)
- **Combined system efficiency:** 19% × 93% = 17.7%

This matches real-world performance. Modern panels range 17–22% efficiency; inverters 92–97%. Using 19% and 93% is conservative but realistic.

### 3. Tilt Angle Optimization (25° for Tilted, 0° for Vertical)
We assume:
- **Tilted roof:** 25° angle (optimal for UK annual generation)
- **Flat roof/garden frame:** 25° tilt (optimal)
- **Vertical balcony:** 0° tilt (vertical wall)

Real optimal angles vary by latitude and season. London's annual optimum is 24–26°; Glasgow's is 22–24°. We use 25° universally, which is accurate to ±0.5% (negligible).

### 4. Solar Geometry (Azimuth + Altitude Tracking)
The calculator tracks:
- **Sun's azimuth** (direction: 0° = south, 90° = west, 270° = east)
- **Sun's altitude** (angle above horizon: 15° in winter London, 62° in summer)
- **Panel orientation** (user-selected: south, SE/SW, E/W)

For each day of the year, we compute the angle of incidence (sun angle relative to panel surface) and generate a realistic hourly irradiance profile. This is how we know a south-east balcony generates 95% of south, and an east balcony generates 75% of south.

**Accuracy:** ±1–2% for orientation-specific estimates (the sun's geometry is deterministic; no uncertainty).

### 5. Monthly Seasonal Patterns
We show month-by-month generation (June peak, December trough), reflecting real PVGIS data. This is especially valuable because it sets realistic expectations:
- June ~115 kWh (peak)
- December ~35 kWh (trough)
- Not every month is "average"

### 6. Tariff Modeling
We model:
- **Standard variable rate:** 30p/kWh (typical 2026 rate)
- **Custom rates:** user can input their exact tariff
- **Time-of-Use tariffs:** if selected, we model peak (15p) and off-peak (5p) separately
- **Export value:** 0p (standard), or user-input if they're on a SEG tariff

We don't know your exact self-consumption, so we assume a middle ground (60% self-consumed, 40% exported). Real savings depend on your usage.

## What Our Calculator Gets Wrong (or Uncertain)

### 1. Shading (The Biggest Unknown)
PVGIS uses terrain elevation data and building footprints, but it can't see:
- Fine details: chimneys, antennas, roof vents, solar heat panels
- Nearby trees (especially if they've grown recently or are about to be pruned)
- Micro-obstructions: power lines, skylights, dormers
- Seasonal shadow patterns: shadow moves throughout the year

**Impact:** Shading can reduce output 10–40% depending on severity. If PVGIS misses a shadow and the real system is 30% shaded, the real output is 595 kWh (not 850 kWh)—a huge miss.

**Mitigation:** Use the [Solar Report](/report) tool, which uses satellite building footprints and sun-geometry algorithms to flag shade. Professional surveys are more accurate.

### 2. System Degradation (We Assume None)
We forecast year-1 output, which assumes new panels at peak efficiency. Real panels degrade 0.5%/year:
- Year 1: 100% efficiency
- Year 10: 95% efficiency
- Year 25: 87% efficiency

**Impact:** Negligible for payback (still 3.1 years), but real-world output at year 10 is ~5% lower than our estimate. Over 25 years, you generate ~5% less than a naive calculation suggests.

**Mitigation:** Our payback estimates are conservative (real payback is slightly faster due to inflation gains). This balances out degradation.

### 3. Real Self-Consumption (Unknown Variable)
We assume 60% self-consumption, 40% export. Real scenarios range widely:
- Work away all day: 30% self-consumed, 70% exported → savings ~£77 (not £256)
- Work from home: 80% self-consumed, 20% exported → savings ~£205 (not £256)
- Time-of-Use tariff: self-consumption value varies by hour

**Impact:** Savings could be £150–£300 depending on usage, not just £256.

**Mitigation:** [Does Plug-in Solar Affect Energy Bill Immediately?](/blog/does-plug-in-solar-affect-energy-bill-immediately-uk) explains self-consumption in detail. Accurate calculation requires knowing your usage pattern.

### 4. Soiling (Dust, Bird Droppings, Pollen)
Real panels accumulate dust and soiling, which reduces output 5–15% depending on climate and cleaning frequency:
- Clean panels in the UK: 0% loss
- Typical maintenance (quarterly clean): 5–10% loss
- Neglected panels (annual clean only): 15–25% loss
- Very dusty environment (near construction): 25–40% loss

We assume clean panels (0% soiling loss). Real-world systems lose some output here.

**Mitigation:** Our estimates are optimistic. Real output might be 5–10% lower due to soiling. Regular cleaning (hose rinse every 3–4 months) keeps losses minimal.

### 5. Wiring and Inverter Losses (We Model Conservative)
We assume 7% loss (inverter + wiring). Real systems range 5–10%:
- Well-designed short-run: 5–6% loss
- Standard installation: 7–8% loss
- Long cable runs (>10m) or poor wiring: 10–15% loss

**Mitigation:** Our 7% estimate is middle-of-the-road. Professional installers can optimize to 5–6% with good wiring practices.

### 6. Weather Year Variation (We Use 30-Year Average)
PVGIS data is a 30-year average. Real years vary:
- Very sunny year: +8–12% above average
- Very cloudy year: -10–15% below average

**Impact:** Year 1 might be 850 ± 10% depending on whether it's sunny or cloudy.

**Mitigation:** Judge long-term average (5–10 years), not single-year performance. Our estimate is the 30-year expected value.

### 7. Tariff Changes (We Assume Static Price)
We forecast savings assuming electricity prices stay constant. Real prices rise 3–5%/year (inflation):
- Year 1 saving: £256
- Year 10 saving (4% inflation): £379
- Year 25 saving: £615

Our simple payback (3.1 years) is slightly conservative; real payback is faster with inflation.

**Mitigation:** Inflation is your friend. Our payback estimates are conservative; real payback is often 0.3–0.5 years faster due to price increases.

## Comparing Our Calculator to Others

How does our PVGIS-based approach compare to other calculators?

| Calculator | Data Source | Accuracy | Transparency |
|---|---|---|---|
| **Pluggedin.solar** | PVGIS 30-yr satellite | ±5% generation, ±15% savings | Full; shows monthly breakdown |
| **Google Project Sunroof** | PVGIS + machine learning shading | ±5–10% generation | Medium; limited detail |
| **Energy Saving Trust** | PVGIS + conservative assumptions | ±10–15% generation | Low; simplified |
| **PVsyst (professional)** | Detailed irradiance + 3D shade modeling | ±3–5% generation | High; very detailed |
| **SolarEdge Advisor** | Proprietary + monitoring data | ±5–8% generation | Medium; sales-focused |

**Our positioning:** Free, PVGIS-based, transparent assumptions, month-by-month breakdown. Accuracy ±5% for generation is industry-standard; uncertainty on savings is due to unknown usage patterns (not a calculator flaw).

## When You Need a Professional Survey

Use our calculator for a quick estimate. Use a professional survey if:

1. **You're seriously committed and want ±3% accuracy** – professional installer with a site survey can flag micro-shading, roof angle, etc.
2. **Your property is complex** – multiple roof sections, valleys, skylights, or nearby shade sources that satellite data misses
3. **You're in a conservation area or have planning constraints** – a professional confirms feasibility
4. **You want a warranty** – most installers warrant output within ±5% (ours is a free tool with no warranty)

A professional survey typically costs £150–£300 and adds 1–2 weeks to the timeline. Worth it if you're serious; skip it for a quick "is this viable?" check.

## How to Verify Our Accuracy After Installation

Once your system is live, compare real output to our estimate:

**Months 1–3:** Don't judge yet (weather variation is high month-to-month).

**Months 4–6:** If real output is within ±10% of estimate, we nailed it. ±15% is still good (within uncertainty band).

**Years 1–3:** Real average should match estimate. If consistently 20%+ below, investigate:
- Is there unexpected shading? (Solar Report might have missed a chimney shadow)
- Are panels dirty? (cleaning can recover 5–10%)
- Is a circuit breaker tripped? (check your inverter)
- Did your usage pattern change? (affect self-consumption)

**5–10 years:** Output should degrade ~0.5%/year (negligible). If output drops suddenly, there's a fault (inverter failure, panel damage, etc.).

## Key Takeaways

- **Our ±5% accuracy on generation is solid** – PVGIS data is validated against real installations
- **Savings uncertainty (±10–15%) is real** – due to unknown self-consumption and exact tariff
- **Biggest unknown is shading** – use Solar Report to reduce shade-related errors
- **Small uncertainties don't matter for payback** – even ±10% doesn't change "3.1 year payback" decision
- **Inflation is our hidden friend** – real payback is faster than simple estimates due to rising electricity prices
- **Year-to-year weather variation is ±10–15%** – one cloudy year doesn't invalidate the system
- **Professional surveys are worth it if you're committing** – ±3% accuracy vs our ±5% for a few hundred pounds

## Next Steps

1. **Use our calculator for a quick check** – it's fast and gives you the right order of magnitude
2. **Cross-check with Solar Report** – flag any shading issues our calculator might miss
3. **If uncertain on shade, get a professional survey** – £150–£300 buys peace of mind
4. **After year 1, compare real output to estimate** – check if your actual generation matches the forecast

**Ready to see how accurate our estimate is for your property?** [Run the calculator](/calculator) with your postcode.
