---
title: "Smart Meters and Solar Panels: The Complete UK Guide for 2026"
slug: smart-meter-solar-panels-complete-guide-uk
excerpt: "Everything you need to know about how smart meters work with solar panels in the UK — from SMETS1 vs SMETS2 to export tracking, plug-in solar compatibility, and getting paid for what you generate."
date: "2026-05-04"
category: "Guide"
cluster: "smart-meters"
priority: 1
wordcount: 2200
author: "Pluggedin.solar"
---

## Why Smart Meters Matter for Solar Owners

If you're generating your own electricity — whether from a rooftop array or a [plug-in solar kit](/blog/plug-in-solar-uk) — your smart meter is the single most important piece of infrastructure in the chain. It's what determines whether your supplier knows you're exporting, whether you get paid for it, and whether your bills actually reflect what you're using.

Most guides on this topic were written for traditional rooftop solar. This one covers plug-in solar too, because the smart meter considerations are slightly different when you're feeding 400–800W through a standard socket.

## SMETS1 vs SMETS2: Which One Have You Got?

There are two generations of smart meter in the UK. The difference matters enormously for solar.

**SMETS1** meters were the early rollout (roughly 2013–2018). They communicate via the supplier's own network, which means they often "go dumb" if you switch supplier. More importantly for solar, many SMETS1 meters **cannot record export** — they only measure import. If you're generating solar and pushing surplus to the grid, a SMETS1 meter simply won't see it.

**SMETS2** meters use the national DCC (Data Communications Company) network. They work across all suppliers, and critically, they have **two registers**: one for import, one for export. This is what you need for solar.

To check which you have: look at the meter itself for a label, or log into your supplier's app. If your in-home display (IHD) stopped working after a supplier switch, you almost certainly have a SMETS1.

**What to do if you have a SMETS1:** Request an upgrade from your supplier. It's free — suppliers are obligated to offer SMETS2 replacements. Do this before installing plug-in solar, not after. The process typically takes 2–4 weeks.

## How Solar Generation Interacts with Your Smart Meter

When your plug-in solar panels are generating electricity, three things can happen:

1. **You use it directly** — the panel output feeds into your home circuit and offsets what you'd otherwise draw from the grid. Your smart meter sees reduced import.
2. **You export surplus** — if your panels generate more than you're currently consuming, the excess flows back through the meter to the grid. A SMETS2 meter records this on the export register.
3. **You store it** — if you have a [battery like the EcoFlow Delta 2](/blog/ecoflow-delta-2-review-uk), surplus energy charges the battery instead of exporting. Your meter sees neither import nor export for that energy.

For most plug-in solar owners, the primary benefit is reduced import — your meter simply ticks up more slowly during the day. The export element only becomes meaningful if you're generating significantly more than you're consuming, which at 400–800W is less common than with a full rooftop system.

## Do You Need a Smart Meter for Plug-in Solar?

Strictly speaking, no. You can run a plug-in solar kit without a smart meter. The panels generate, your home uses the power, and your old-style meter spins more slowly. You'll still save money.

But a smart meter gives you two advantages:

**Visibility** — you can see exactly how much your import has dropped, half-hour by half-hour. This lets you shift usage (run the dishwasher at midday) to [maximise self-consumption](/blog/how-to-read-smart-meter-plug-in-solar-uk).

**Export payments** — if you're on the [Smart Export Guarantee (SEG)](/blog/plug-in-solar-smart-meter-exports-uk), you need a SMETS2 meter to receive payments for exported electricity. Without one, you're giving surplus power away for free.

For a typical 800W plug-in system, self-consumption is high enough that SEG payments are small (perhaps £20–40/year). But the visibility benefit alone is worth the free upgrade.

## Smart Meter Settings to Check After Installing Solar

Once your plug-in solar is running, check these settings with your supplier:

**Export register enabled** — some suppliers don't activate the export register by default. Call and ask them to enable it. This takes no physical visit; it's a remote configuration change.

**Half-hourly settlement** — if your supplier offers this (Octopus, OVO, and others do), enable it. It means your bills reflect actual usage patterns rather than estimated profiles, which benefits solar owners who import less during the day.

**Time-of-use tariff compatibility** — if you're on a tariff like [Octopus Flux](/blog/octopus-flux-tariff-review-uk) or Octopus Go, your smart meter needs to be recording at half-hourly granularity. Check this is active.

## Smart Meter vs Energy Monitor: What's the Difference?

Your smart meter measures total household import and export. It's the billing meter. But it doesn't tell you what individual appliances are doing, and it doesn't show you real-time solar generation.

An [energy monitor](/blog/best-energy-monitor-plug-in-solar-uk) — like the Emporia Vue 3, a Shelly Plus Plug, or the EcoFlow app — fills that gap. It shows you real-time generation from your panels, individual circuit consumption, and helps you optimise when you run high-draw appliances.

The ideal setup is both: a SMETS2 smart meter for billing and export, plus an energy monitor for real-time optimisation. For EcoFlow STREAM owners, the EcoFlow app already provides real-time generation data, so you may only need the smart meter side.

<div class="product-card featured">
<div class="pc-accent"></div>
<div class="pc-img"><img src="/images/products/stream-hero.png" alt="EcoFlow STREAM 800W balcony solar kit" /></div>
<div class="pc-badge">Best overall</div>
<div class="pc-name"><a href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system" target="_blank" rel="noopener noreferrer sponsored">EcoFlow PowerStream 800W Kit</a></div>
<div class="pc-price">~£799 <small>estimated</small></div>
<ul class="pc-features">
<li>800W dual-panel balcony or garden kit</li>
<li>600Wh plug-in battery included</li>
<li>App with live monitoring &amp; smart scheduling</li>
<li>Balcony, garden &amp; flat-roof mount options</li>
</ul>
<a class="pc-cta" href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system" target="_blank" rel="noopener noreferrer sponsored">View on EcoFlow →</a>
<div class="pc-note">BSI-compliant kits expected from July 2026. Prices are estimates.</div>
</div>

## Common Smart Meter Problems with Solar

**"My smart meter shows I'm importing even when the sun's out"** — this is normal. Your panels might be generating 400W, but if your fridge, router, and standby loads total 500W, you're still importing 100W net. The meter measures the difference, not the solar output separately. See our [troubleshooting guide](/blog/plug-in-solar-smart-meter-issues-uk) for more.

**"My IHD shows negative numbers"** — this means you're exporting. Some IHDs display this clearly; others show it as zero or don't show export at all. The meter itself is still recording it — check your supplier app for accurate figures.

**"My supplier says I don't have export data"** — ask them to enable the export register. If they refuse or say your meter can't do it, request a SMETS2 upgrade. You're entitled to one.

## Next Steps

1. [Check whether your meter is SMETS1 or SMETS2](/blog/plug-in-solar-smart-meter-rollout-uk)
2. [Learn how to read your smart meter with solar](/blog/how-to-read-smart-meter-plug-in-solar-uk)
3. [Find the right plug-in solar kit for you](/quiz)
4. [Calculate your potential savings](/calculator)
