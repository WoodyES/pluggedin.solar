---
title: "Smart Meter Not Showing Solar Generation? Here's Why and How to Fix It"
slug: smart-meter-not-showing-solar-generation-uk
excerpt: "Your smart meter won't show solar generation directly — that's by design. Here's what it actually measures, what to look for instead, and how to properly track your plug-in solar output."
date: "2026-05-04"
category: "Practical Guides"
cluster: "smart-meters"
priority: 2
wordcount: 1800
author: "Pluggedin.solar"
---

## The Fundamental Misunderstanding

This is the most common smart meter question we get, and the answer surprises people: your smart meter **does not and cannot** show solar generation. That's not a fault — it's how meters work.

A smart meter sits at the boundary between your home and the grid. It measures what crosses that boundary: electricity flowing in (import) and electricity flowing out (export). It has no idea what's happening inside your home, including how much your panels are generating.

Think of it like a water meter at the street. It measures what flows in from the mains. If you have a rainwater tank feeding some of your taps, the water meter doesn't know — it just sees less mains water being used.

## What Your Smart Meter Actually Shows with Solar

With plug-in solar panels running, your smart meter will show:

**Lower import** — during sunny hours, your panels offset some or all of your household demand. Instead of importing 500W from the grid, you might import only 100W. That's your saving.

**Export (maybe)** — if your panels generate more than you're consuming in that moment, the surplus flows to the grid. A [SMETS2](/blog/smets1-vs-smets2-solar-panels-uk) meter records this on the [export register](/blog/smart-meter-export-register-solar-uk). Some in-home displays show it as a negative number or a separate "export" figure. [Learn how to read yours](/blog/how-to-read-smart-meter-plug-in-solar-uk).

**No change at night** — once the sun sets, your import returns to normal. The smart meter can't tell you ever had solar.

## How to Actually Track Solar Generation

If you want to see what your panels are producing (which you should — it's useful for spotting faults and optimising), you need a separate device:

**The EcoFlow app** — if you're using an [EcoFlow STREAM system](/blog/ecoflow-stream-review-uk), the app shows real-time generation in watts, daily/monthly production in kWh, and [self-consumption](/blog/smart-meter-solar-self-consumption-uk) ratios. This is the easiest route for plug-in solar owners.

**A smart plug with energy monitoring** — devices like the Tapo P110 or [Shelly Plus Plug S](/blog/best-smart-plug-monitor-solar-uk) sit between your inverter's plug and the wall socket. They measure exactly what's flowing through. Cost: about £15.

**A dedicated energy monitor** — the [Emporia Vue 3 or similar whole-home monitors](/blog/best-whole-home-energy-monitors-uk) use CT clamps on your consumer unit to measure individual circuits, including the one your solar feeds into.

**Your inverter's built-in display** — many micro-inverters have a small LED or Wi-Fi interface that shows current output. Check your inverter manual.

## Why the In-Home Display Is Misleading

The in-home display (IHD) that came with your smart meter is designed for a simple use case: showing how much electricity you're using and what it's costing. It wasn't designed for solar.

Common IHD behaviours that confuse solar owners:

- Shows £0.00 cost during high generation (because net import is zero)
- Displays "0.0 kW" when you're actually exporting (it can't show negative import)
- Shows yesterday's total as much lower than usual but doesn't explain why
- Doesn't show export data at all on many models

The IHD is a blunt instrument. Use your supplier's app instead — Octopus, OVO, and E.ON all show half-hourly import and export data, which paints a much clearer picture.

## Calculating Self-Consumption from Smart Meter Data

Even though your smart meter doesn't show generation, you can **infer** how well your solar is performing by comparing:

- **Import on a sunny day** vs **import on a cloudy day** with similar household usage
- **Average daily import before solar** vs **average daily import after solar**
- **Export register readings** (if enabled) — this tells you how much surplus you're sending to the grid

If you know your panel rating (say 800W) and the hours of good sun, you can estimate generation. A south-facing 800W system in London generates roughly 2.5–3.5 kWh on a decent May day. If your import dropped by 2 kWh and you exported 0.5 kWh, that's about 2.5 kWh of generation — right in the expected range.

For precise tracking, the monitoring tools above are better. But smart meter data gives you a useful sanity check.

## When to Worry

**Import hasn't changed at all since installing solar** — check the panels are actually generating. Look at the inverter's indicator light. If it's off during the day, something's wrong — possibly a tripped RCD, a faulty inverter, or panels that aren't receiving sunlight.

**Export register shows nothing** — it might not be enabled. Contact your supplier and ask them to activate it. [More detail here](/blog/plug-in-solar-smart-meter-exports-uk).

**Readings look wildly wrong** — if your smart meter is SMETS1 and showing error codes or implausible readings, it may not handle reverse current flow properly. Request a [SMETS2 upgrade](/blog/plug-in-solar-smart-meter-rollout-uk).

## Related Reading

- [Smart meters and solar: complete guide](/blog/smart-meter-solar-panels-complete-guide-uk)
- [My smart meter seems wrong since installing solar](/blog/plug-in-solar-smart-meter-issues-uk)
- [Best energy monitors for plug-in solar](/blog/best-energy-monitor-plug-in-solar-uk)
