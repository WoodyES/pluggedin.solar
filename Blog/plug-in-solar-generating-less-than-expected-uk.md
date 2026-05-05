---
title: "My Plug-in Solar Isn't Generating as Much as I Expected — Is Something Wrong?"
slug: plug-in-solar-generating-less-than-expected-uk
excerpt: "The single most common post-install question from German Balkonkraftwerk owners. Nine times out of ten, nothing is wrong. Here's what's actually happening."
date: "2026-04-11"
category: "Troubleshooting"
cluster: "Technical"
priority: 1
wordcount: 1200
---

You bought an 800W plug-in solar kit. You installed it. You checked the app. It's showing 180W. Is your system broken?

Almost certainly not. This is the most common question from new solar owners in Germany — where over a million Balkonkraftwerk systems have been running for years — and the answer is almost always the same: your system is working correctly, but the advertised wattage is not what you'll typically see on the app.

Understanding why takes five minutes and will save you a lot of worry.

## What "800W" Actually Means

The 800W figure on your kit refers to the **AC output limit of the micro-inverter** — the regulatory maximum, not the typical output. Your panels may be rated at 400W each, but the inverter caps AC output at 800W total.

More importantly, neither of those numbers tells you what you'll see on a typical UK day. Actual generation depends on:

- **Irradiance** — how much solar energy is hitting the panels right now
- **Panel angle and orientation** — south-facing at 35° is optimal; east-facing vertical on a balcony railing is not
- **Temperature** — panels are actually less efficient when hot, though this rarely matters in the UK
- **Shading** — even partial shading on one panel can significantly reduce total output
- **Time of year** — the UK's solar irradiance in December is roughly 10-15% of what it is in June

An 800W system on an optimally placed south-facing roof in June can approach its rated output at noon. The same system on a north-east-facing wall in February might peak at 60-80W on a clear day. Both are normal.

## The Placement Gap

German research, confirmed by UK real-world testing, consistently shows that balcony and wall-mounted systems generate 30-60% less than the same panels on an optimal roof-mount. This isn't a failing — it's physics.

If your system is:

**Vertically mounted on a south-facing wall** — expect roughly 60-70% of optimal output. Vertical panels intercept sunlight at a poor angle except around midday in summer.

**Vertically mounted on a balcony rail, east or west-facing** — expect 40-55% of optimal. East-facing gives you morning generation, west-facing gives you afternoon. Neither gives you a full day.

**Flat on a garden table or ground mount** — close to optimal if south-facing, but still affected by horizon shading and the UK's relatively low sun angle in winter.

**On a balcony with an overhang above** — this can severely restrict generation, especially in winter when the sun is low. Even a 30cm overhang can shade the top edge of a panel completely at certain times of year.

None of this means the system is broken. It means the placement is sub-optimal, which is true of the vast majority of plug-in solar installations in both Germany and the UK.

## Seasonal Expectations: Month by Month

This is where new UK owners are most often caught off guard. Solar generation in the UK is highly seasonal — more so than in Germany, which sits further south and has more clear winter days.

Rough monthly output for a well-placed 800W UK system (south-facing, 35° tilt):

| Month | Daily average (kWh) | Monthly total (kWh) |
|-------|----------------------|----------------------|
| January | 0.5–0.8 | 15–25 |
| February | 0.9–1.3 | 25–36 |
| March | 1.8–2.4 | 56–74 |
| April | 2.8–3.4 | 84–102 |
| May | 3.4–4.2 | 105–130 |
| June | 3.8–4.6 | 114–138 |
| July | 3.6–4.4 | 112–136 |
| August | 3.0–3.8 | 93–118 |
| September | 2.1–2.8 | 63–84 |
| October | 1.2–1.8 | 37–56 |
| November | 0.7–1.1 | 21–33 |
| December | 0.4–0.7 | 12–22 |

These are estimates for a south-facing, optimally tilted system. A sub-optimal placement (balcony, east-facing wall) would be roughly 40-60% of these figures.

If you installed in autumn or winter, you bought into the worst months. Your system is almost certainly operating normally — the sun simply isn't providing much to work with. Come March or April, you'll see a significant jump.

## The Self-Consumption Efficiency Issue

Even when panels generate at full rated power, you only benefit from electricity that's consumed in your home at the moment it's generated. If you're generating 800W and only consuming 200W (because it's 11am on a Sunday and everything is off), 600W is being exported to the grid — which you won't be paid for unless you have a Smart Export Guarantee tariff.

A [Tapo P110 smart plug](https://amzn.to/4m9Yh9U) on the inverter's AC output shows you real-time generation. An app like Home Assistant or the EcoFlow/Hoymiles dashboard shows cumulative daily output. But to understand how much of that generation you're actually capturing — and how much is being wasted as export — you need a home energy monitor.

The [Emporia Vue 3](https://amzn.to/4bUCQ9E) clamps onto your incoming supply cables and shows both generation and consumption in real time, giving you the full picture. Many German owners discovered, via monitoring, that 40-60% of their summer generation was being exported — prompting them to shift dishwasher cycles, washing machine loads, and EV charging to peak solar hours.

## When Something Might Actually Be Wrong

If your system has been running normally and output drops suddenly, or if it's consistently zero even on clear sunny days:

**Check the smart plug** — if the [Tapo P110](https://amzn.to/4m9Yh9U) on the inverter output shows zero watts even when the app is offline, the inverter isn't generating.

**Check the MCB** — find the circuit your solar is connected to in your consumer unit and verify the MCB hasn't tripped.

**Check for shading** — has a tree come into leaf? Has something been placed near the panels?

**Check MC4 connections** — the connectors between panels and inverter can work loose or corrode over time, especially in UK wet weather. Gently push each connector until it clicks.

**Check the inverter LED** — most micro-inverters have a status LED. Green or flashing green = normal operation. Red = fault. Consult the manual for your specific inverter's error codes.

For a full diagnostic walkthrough, see our [troubleshooting guide](/blog/plug-in-solar-not-generating-troubleshooting-uk).

## Setting Realistic Expectations

German owners who went into their purchases with realistic expectations — offsetting 15-25% of their annual electricity bill, not replacing it entirely — consistently report high satisfaction. Those who expected to generate the rated wattage consistently are the ones who feel let down.

For a 1-2 person household consuming around 2,000 kWh per year, a well-placed 800W system in a UK location with average irradiance should generate 550-700 kWh annually — covering roughly 25-35% of consumption. That's a genuine bill reduction. It's not energy independence.

Our [savings calculator](/calculator) uses your postcode and PVGIS irradiance data to give you a location-specific estimate. If your actual output is significantly below the calculator's prediction for your postcode over a full season, that's when it's worth investigating further.
