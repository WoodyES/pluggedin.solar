---
title: "Smart Meter Export Register: Enable It"
slug: smart-meter-export-register-solar-uk
excerpt: "Your smart meter might have an export register that's switched off. Here's how to check, how to get it enabled, and why it matters for SEG payments."
date: "2026-05-04"
category: Use Cases
cluster: "smart-meters"
priority: 3
wordcount: 1500
author: "Pluggedin.solar"
---

## What the Export Register Does

Your [SMETS2](/blog/smets1-vs-smets2-solar-panels-uk) smart meter has two registers. The import register measures electricity you draw from the grid — that's what you pay for. The export register measures electricity flowing the other way — from your home to the grid. That's what you get paid for under the [Smart Export Guarantee](/blog/plug-in-solar-smart-meter-exports-uk).

The problem: many suppliers don't enable the export register by default. They assume you don't need it. If you've installed [plug-in solar panels](/blog/plug-in-solar-uk) and you're exporting surplus, that energy is going unrecorded.

## How to Check If Yours Is Active

**Method 1: Supplier app.** Log into your energy supplier's app and look for export data. If you see a separate export figure (even if it's tiny), the register is active. If there's no mention of export at all, it's probably off.

**Method 2: In-home display.** Some IHDs show export data on a separate screen — cycle through the display modes. If there's no export reading, either you're not exporting or the register is off.

**Method 3: Ask your supplier.** Call or live-chat and ask: "Is my smart meter's export register enabled?" This is the definitive check.

## How to Get It Enabled

Contact your electricity supplier and request they enable the export register. This is done remotely via the DCC network — no engineer visit needed, no cost to you. It typically takes 24–48 hours.

Script for the call:

> "I've installed plug-in solar panels and I'd like to apply for the Smart Export Guarantee. Could you please enable the export register on my SMETS2 meter? I'd also like to ensure half-hourly settlement is active."

Some suppliers will handle the SEG application at the same time. Others treat it as a separate process — ask to be sure.

## Which Suppliers Pay for Exports?

Under SEG, licensed suppliers with 150,000+ customers must offer an export tariff. Current rates vary:

- **Octopus Energy** — typically the most competitive; their Flux tariff pays variable rates tied to wholesale prices
- **EDF** — fixed SEG rate
- **British Gas** — fixed SEG rate
- **E.ON** — fixed SEG rate
- **OVO** — fixed SEG rate

You don't have to take your export tariff from your import supplier. You can be with British Gas for import and Octopus for export. Compare rates before committing. See our [supplier comparison for solar users](/blog/british-gas-vs-octopus-vs-eon-solar-uk).

For plug-in solar at 400–800W, export volumes are modest. A typical 800W system might export 300–500 kWh/year, which at current SEG rates (4–15p/kWh depending on tariff) works out to roughly £15–75/year. Not life-changing, but it's free money once the register is on.

## What If You Have a SMETS1 Meter?

SMETS1 meters generally cannot record export. If you have one, you need a [free upgrade to SMETS2](/blog/plug-in-solar-smart-meter-rollout-uk) before you can receive SEG payments. Request this from your supplier — expect a 2–4 week wait for installation.

## The Export Register and DNO Notification

When you [notify your DNO](/blog/g98-dno-notification-plug-in-solar) about your plug-in solar installation (required within 28 days under G98), the DNO doesn't automatically tell your supplier. These are separate processes:

1. DNO notification → tells the network operator you're generating
2. Export register activation → tells your meter to record exports
3. SEG application → gets you paid for exports

Do all three. They take about 10 minutes total.

## What SEG rates actually pay in 2026

Current fixed and variable SEG rates from the main UK suppliers, updated August 2026:

| Supplier | Tariff | Rate (p/kWh) | Notes |
|---|---|---|---|
| Octopus Energy | Outgoing Fixed | 15p | Best fixed rate, must be Octopus import customer |
| Octopus Energy | Outgoing Agile | Variable (avg ~10p, peaks 25p+) | Tracks wholesale, best for load-shifters |
| Octopus Energy | Flux | Peak/off-peak | Only for solar + battery, see [Flux review](/blog/octopus-flux-tariff-review-uk) |
| EDF Energy | Export Variable Value | 5.6p | Any supplier customer |
| E.ON Next | Next Export | 5.5p | Any customer |
| British Gas | Export & Earn | 6.4p | Must be BG import customer |
| OVO | SEG | 4p | See [OVO review](/blog/ovo-energy-solar-tariff-review-uk) |
| Scottish Power | SmartGen | 12p | Must be SP import customer |

For a typical 800W plug-in solar setup exporting 250–400 kWh/year, the difference between the worst rate (OVO at 4p) and the best (Octopus Outgoing Fixed at 15p) is roughly £10–£45/year. Not enormous, but worth 15 minutes of comparison. See the full [supplier comparison for solar users](/blog/british-gas-vs-octopus-vs-eon-solar-uk).

## Troubleshooting: export register is on but nothing shows

Common causes when your export register is enabled but the app shows zero export:

1. **Data lag** — half-hourly export data usually appears 24–48 hours after generation. Give it a week before assuming something is broken.
2. **DNO notification pending** — some suppliers block SEG data display until they have record of your G98 submission. Chase the [DNO notification](/blog/g98-dno-notification-plug-in-solar) if you have not sent it.
3. **Meter needs a firmware push** — a small number of Landis+Gyr and Aclara units need a remote firmware refresh to activate the export register properly. Supplier can trigger this.
4. **You are not actually exporting** — an 800W kit with heavy midday self-consumption may genuinely export near-zero. Check your smart meter's export register reading directly (via the IHD or the meter itself) versus what the app shows.

## The billing gotcha nobody warns you about

When your export register goes live, some suppliers issue a corrective bill for the previous quarter that credits you for exports estimated from the day the register was enabled — but a small minority calculate the credit from the day you signed the SEG contract, missing the intervening period. If that happens to you, request a manual adjustment citing "SEG regulation D.3.2 — payment from register activation date". Most billing teams will honour it once challenged.

## Related Reading

- [Smart meters and solar panels: complete guide](/blog/smart-meter-solar-panels-complete-guide-uk)
- [Will your smart meter record exports?](/blog/plug-in-solar-smart-meter-exports-uk)
- [Best energy tariffs for plug-in solar](/blog/best-energy-tariff-plug-in-solar-uk-2026)

<div class="product-card featured">
<div class="pc-accent"></div>
<div class="pc-badge">Editor's pick</div>
<div class="pc-name"><a href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fuk.ecoflow.com%2Fproducts%2Fstream-ultra-pro" target="_blank" rel="noopener noreferrer sponsored">EcoFlow STREAM Ultra Pro</a></div>
<div class="pc-price">From ~£1,499</div>
<ul class="pc-features">
<li>Higher-capacity STREAM variant with expandable battery pairing</li>
<li>Suits tariff arbitrage and load-shifting use cases</li>
<li>App scheduling and export monitoring</li>
</ul>
<div class="pc-cta"><a href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fuk.ecoflow.com%2Fproducts%2Fstream-ultra-pro" target="_blank" rel="noopener noreferrer sponsored">View on EcoFlow UK &rarr;</a></div>
<div class="pc-disclaimer">Affiliate link — we may earn a commission at no extra cost to you.</div>
</div>

<!-- related-auto-start -->

## Related reading

- [Using Your Smart Meter to Maximise Solar Self-Consumption](/blog/smart-meter-solar-self-consumption-uk)
- [Smart Meter Wrong After Solar Install?](/blog/plug-in-solar-smart-meter-issues-uk)
- [How to Read Your Smart Meter with Plug-in Solar](/blog/how-to-read-smart-meter-plug-in-solar-uk)
- [Renters: Smart Meters & Solar Panels](/blog/smart-meter-solar-panels-renters-uk)

<!-- related-auto-end -->

