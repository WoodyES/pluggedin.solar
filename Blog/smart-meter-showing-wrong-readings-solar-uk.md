---
title: "Smart Meter Showing Wrong Readings After Installing Solar? Here's What's Happening"
slug: smart-meter-showing-wrong-readings-solar-uk
excerpt: "Erratic readings, spinning backwards, or costs that don't add up — why your smart meter behaves oddly with solar and when you actually need to worry."
date: "2026-05-04"
category: "Practical Guides"
cluster: "smart-meters"
priority: 3
wordcount: 1500
author: "Pluggedin.solar"
---

## Why Your Readings Look Strange

You've installed plug-in solar, your panels are generating, and now your smart meter is showing numbers that don't make sense. Before you panic, understand that most "wrong" readings are actually correct readings that just look unfamiliar.

Your meter used to show one thing: steadily increasing import. Now it's seeing a more complex pattern — lower imports during the day, possibly exports, and a daily rhythm it didn't have before. The meter is doing its job; your expectations just need updating.

## The Most Common "Problems"

### Import seems too high despite solar generating

Your plug-in solar might be producing 600W, but if your household is drawing 800W at that moment (oven, kettle, tumble dryer), you're still importing 200W from the grid. The meter shows net import, not gross import minus solar. This is correct.

Check by turning off high-draw appliances and watching the meter. If import drops to near zero on a sunny day with minimal loads, your system is working fine.

### IHD shows £0.00 cost during the day

This means your solar is covering all your household demand — you're importing nothing. The IHD shows cost of import only, so if import is zero, cost is zero. This is a good thing.

### IHD shows impossible numbers or error codes

Some SMETS1 meters and older IHDs can't handle reverse current flow (export). They may display:

- Error codes
- Maximum values (99999)
- Rapidly fluctuating readings
- Negative numbers they aren't designed to show

If you're seeing this, you likely have a SMETS1 meter that [needs upgrading to SMETS2](/blog/smets1-vs-smets2-solar-panels-uk). The meter itself may be recording correctly even if the display is confused, but an upgrade eliminates the issue.

### Daily usage totals seem too low

They probably are lower — that's the whole point of solar. Compare your average daily import before and after installation. A drop of 2–4 kWh on sunny days is typical for an 800W system. This is your saving.

### Supplier app shows different data to IHD

The supplier app uses data transmitted from the meter via the DCC network. The IHD receives data directly from the meter via a local radio link. They can briefly disagree due to transmission timing, but should converge within 30 minutes. If the discrepancy persists, the supplier app is more reliable.

## When the Readings Are Actually Wrong

Genuine meter errors with solar are rare, but they happen:

**Old analogue meter running backwards** — if you still have an old dial/rotating disc meter (not a smart meter at all), solar export can literally run it backwards, reducing your recorded import. This technically benefits you but isn't legal, and your supplier will eventually notice. Get a smart meter installed.

**SMETS1 meter crediting import as export** — some older meters misattribute reverse current. This makes your import readings inaccurately low and could flag as suspected meter tampering with your supplier. Upgrade to SMETS2.

**Meter in wrong mode** — rarely, a meter is configured in "credit" mode when it should be in "prepayment" or vice versa, which can produce confusing readings. Contact your supplier to verify.

## How to Verify Your Readings

Take manual readings over a week:

1. Record the import register at the same time each morning (before solar generation starts)
2. Compare to your supplier app's daily totals
3. Note the export register reading too (if active)

If the manual readings match the app, your meter is fine. The "wrong" readings are just the new normal with solar.

For real-time verification, a [smart plug with energy monitoring](/blog/best-smart-plug-monitor-solar-uk) on your solar circuit gives you an independent measurement to compare against.

## Related Reading

- [My smart meter seems wrong since installing solar](/blog/plug-in-solar-smart-meter-issues-uk)
- [How to read your smart meter with plug-in solar](/blog/how-to-read-smart-meter-plug-in-solar-uk)
- [Smart meter not showing solar generation?](/blog/smart-meter-not-showing-solar-generation-uk)
