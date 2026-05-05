---
title: "How Much Power Does a Solar Panel Generate in the UK? Month-by-Month Data"
slug: how-much-power-solar-panel-generate-uk
excerpt: "Real numbers using PVGIS data for UK locations, broken down by month. Because 'it depends' isn't a useful answer when you're trying to calculate payback."
date: "2026-04-11"
category: "Technical"
cluster: "Technical Guides"
priority: 1
wordcount: 1300
---

The single most important question for anyone considering plug-in solar is how much electricity they'll actually generate. Not the number on the box — the real, location-specific, month-by-month output that determines your savings and payback.

This guide uses data from PVGIS (the EU's Photovoltaic Geographical Information System), which models solar irradiance based on decades of satellite and ground-station measurements. These aren't estimates from manufacturers — they're the same dataset professional solar installers use.

## Annual Totals by Location

For a south-facing, 35° tilt, 800W plug-in solar system with no shading:

| Location | Annual output (kWh) | Equivalent daily average |
|----------|---------------------|--------------------------|
| London / SE England | 720–780 | 2.0–2.1 |
| Birmingham / Midlands | 680–730 | 1.9–2.0 |
| Manchester / NW England | 640–700 | 1.8–1.9 |
| Edinburgh / Central Scotland | 620–680 | 1.7–1.9 |
| Cardiff / South Wales | 700–750 | 1.9–2.1 |
| Belfast / N. Ireland | 610–670 | 1.7–1.8 |
| Plymouth / SW England | 740–800 | 2.0–2.2 |
| Newcastle / NE England | 640–700 | 1.8–1.9 |

South-west England gets the most sun. Scotland and Northern Ireland get the least. But the difference between the best and worst UK locations is only about 20% — not as dramatic as most people assume.

## Month-by-Month Output (London / SE England)

This is where the seasonal picture becomes clear. For an 800W system, south-facing at 35°:

| Month | Daily avg (kWh) | Monthly total (kWh) | % of annual |
|-------|-----------------|---------------------|-------------|
| January | 0.6 | 19 | 2.6% |
| February | 1.1 | 30 | 4.1% |
| March | 2.0 | 63 | 8.5% |
| April | 3.0 | 91 | 12.3% |
| May | 3.6 | 112 | 15.1% |
| June | 3.8 | 115 | 15.5% |
| July | 3.7 | 115 | 15.5% |
| August | 3.2 | 100 | 13.5% |
| September | 2.3 | 69 | 9.3% |
| October | 1.4 | 43 | 5.8% |
| November | 0.8 | 24 | 3.2% |
| December | 0.5 | 16 | 2.2% |
| **Full year** | **2.1** | **~740** | **100%** |

The pattern is stark: May, June, and July alone produce about 46% of annual generation. December and January combined produce under 5%. If you installed in November and you're disappointed, wait until April.

## How Orientation Affects Output

Not everyone has a south-facing position. PVGIS data shows the impact of orientation at 35° tilt:

| Orientation | Annual output vs south-facing |
|-------------|-------------------------------|
| South (180°) | 100% (baseline) |
| South-east (135°) | ~96% |
| South-west (225°) | ~96% |
| East (90°) | ~82% |
| West (270°) | ~82% |
| North-east (45°) | ~65% |
| North-west (315°) | ~65% |
| North (0°) | ~55% |

East and west-facing installations lose roughly 18% — significant but not disqualifying. For more on making east/west work, see our [east-west facing guide](/blog/east-west-facing-plug-in-solar-uk).

## How Tilt Angle Affects Output

The optimal tilt angle in the UK is roughly 35° from horizontal. But plug-in solar is rarely at optimal tilt — balcony railings are vertical (90°), ground mounts might be flat (0°), and wall brackets vary.

| Tilt angle | Annual output vs optimal 35° |
|------------|-------------------------------|
| 0° (flat) | ~88% |
| 15° | ~96% |
| 25° | ~99% |
| 35° (optimal) | 100% |
| 45° | ~99% |
| 60° | ~93% |
| 90° (vertical) | ~70% |

The key takeaway: anything between 15° and 60° is within a few percent of optimal. Vertical mounting (balcony railings, wall-flat) takes a 30% hit — a major reason balcony installations consistently underperform roof-mounted systems.

A [Renogy adjustable tilt mount](https://amzn.to/4maeAng) lets you set the angle precisely if you have a flat surface (ground, flat roof) to work with.

## How Shading Affects Output

Even partial shading has a disproportionate impact. A shadow covering 10% of a panel's surface can reduce output by 30-50%, depending on where the shadow falls relative to the bypass diode configuration.

Common UK shading sources: chimney stacks (the most common on terraced houses), mature trees, neighbouring buildings, and satellite dishes. The impact varies by time of year — a chimney shadow that doesn't reach the panels in July may cover them completely in December when the sun is low.

Before installing, observe your proposed panel location at different times of day across several weeks. If there's any shading, choose a different position or accept reduced output during those hours.

## Real-World vs Theoretical Output

All the numbers above assume:

- Clean panels (no dirt, bird droppings, moss)
- No cable losses (short cable runs, good connections)
- No inverter clipping (panels not significantly oversized for the inverter)
- No degradation (year 1 output)

In practice, real-world output is typically 5-15% below PVGIS theoretical figures. This comes from:

- Panel soiling: 2-5% loss in the UK (less than dusty climates)
- Cable losses: 1-3% depending on cable length and quality
- Inverter efficiency: 3-5% conversion loss (micro-inverters are typically 95-97% efficient)
- Panel mismatch: 1-2% if panels aren't perfectly matched

So if PVGIS says 740 kWh for your location, expect roughly 630-700 kWh in practice. This is still a good return — at 24p/kWh of self-consumed electricity, 650 kWh saves roughly £156 per year.

## Tracking Your Actual Output

The simplest way to track real generation is a [Tapo P110 smart plug](https://amzn.to/4m9Yh9U) between the micro-inverter's AC output and the wall socket. It logs cumulative kWh and shows real-time wattage. You can then compare against the PVGIS prediction for your location and month to see whether your system is performing as expected.

If actual output is consistently 20%+ below PVGIS predictions after accounting for orientation and tilt, something is likely wrong — shading, a connection issue, or an inverter fault. See our [troubleshooting guide](/blog/plug-in-solar-not-generating-troubleshooting-uk) for diagnostics.

For the whole-home picture — not just generation but also consumption and self-consumption ratio — an [Emporia Vue 3](https://amzn.to/4bUCQ9E) gives you the data to optimise your system and tariff together.

## Using Our Calculator

Our [savings calculator](/calculator) uses PVGIS data for your specific postcode and lets you adjust orientation, tilt, and system size. It's the fastest way to get a personalised estimate for your exact location.
