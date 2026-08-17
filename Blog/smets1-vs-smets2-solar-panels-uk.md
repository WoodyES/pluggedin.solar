---
title: "SMETS1 vs SMETS2: Which for Solar?"
slug: smets1-vs-smets2-solar-panels-uk
excerpt: "SMETS1 meters can't record export and often go dumb when you switch supplier. Here's the practical difference for solar owners and how to upgrade for free."
date: "2026-05-04"
category: Performance & Monitoring
cluster: "smart-meters"
priority: 3
wordcount: 1400
author: "Pluggedin.solar"
---

## The Two Generations

The UK's smart meter rollout happened in two phases, and the meters are fundamentally different. If you have solar panels — or you're about to install [plug-in solar](/blog/plug-in-solar-uk) — the distinction matters.

**SMETS1 (Smart Metering Equipment Technical Specifications 1)** — installed roughly 2013–2018. These meters communicate via the installing supplier's proprietary network. When you switch supplier, the new company often can't talk to your meter, and it "goes dumb" — reverting to a traditional meter that needs manual readings.

For solar owners, the critical limitation: most SMETS1 meters **have no export register**. They measure what you import from the grid, but they cannot measure what you send back. That means no [SEG payments](/blog/smart-meter-export-register-solar-uk), no export data in your supplier app, and no accurate picture of how your solar is performing.

**SMETS2 (Technical Specifications 2)** — the current standard. These connect via the DCC (Data Communications Company) national network, which means they work with any supplier. They have **both import and export registers**, and they support half-hourly data collection.

## How to Tell Which You Have

Check the meter label — it should say SMETS1 or SMETS2, or the manufacturer model number which you can look up. Alternatively:

- If your IHD stopped working after a supplier switch → likely SMETS1
- If you got your smart meter before 2019 → probably SMETS1
- If your supplier app shows half-hourly data → almost certainly SMETS2
- Ask your supplier — they'll confirm instantly

## Why SMETS2 Matters for Plug-in Solar

With an 800W plug-in solar system and a SMETS2 meter, you get:

**Export recording** — every unit you send to the grid is measured. This enables [SEG](/blog/plug-in-solar-smart-meter-exports-uk) payments and gives you data to optimise [self-consumption](/blog/smart-meter-solar-self-consumption-uk).

**Half-hourly data** — you can see exactly when you're importing and exporting. This is invaluable for deciding when to run the dishwasher, charge a [battery](/blog/battery-storage-vs-no-battery-plug-in-solar-uk), or shift loads to sunny hours.

**Tariff flexibility** — time-of-use tariffs like [Octopus Flux](/blog/octopus-flux-tariff-review-uk) require half-hourly settlement from a SMETS2 meter. These tariffs are designed for solar owners and can significantly improve your return.

**Supplier switching** — unlike SMETS1, a SMETS2 meter keeps working when you switch. You can shop around for the best import and export rates without losing meter functionality.

## The SMETS1 Migration Programme

Ofgem and the DCC have been migrating SMETS1 meters onto the DCC network, which gives them some SMETS2-like capabilities. However, this migration is patchy — some SMETS1 meters have been successfully enrolled, others haven't. Even when enrolled, export register capabilities vary by model.

Our recommendation: don't rely on a migrated SMETS1. Request a physical SMETS2 upgrade. It's free, it's guaranteed to work, and it future-proofs your setup.

## How to Upgrade for Free

1. Contact your electricity supplier
2. Request a SMETS2 meter installation
3. Mention you have (or are installing) solar — this helps them prioritise
4. Appointment usually booked within 2–4 weeks
5. Installation takes about 45 minutes
6. Ask the engineer to confirm export register is active

There is no cost. Suppliers are obligated under their licence conditions to offer smart meter installations.

## What About Three-Phase Supplies?

If your home has a three-phase electricity supply (uncommon for residential, more typical in older properties or those with high loads), smart meter availability has historically been limited. SMETS2 three-phase meters exist but are less widely deployed. Check with your supplier for availability.

For plug-in solar, this is rarely an issue — the 800W regulatory cap means you're well within single-phase capacity.

## Common SMETS1 meter models still in UK homes

If you want to identify your meter without calling your supplier, these are the SMETS1 models most commonly found in UK households, all of which lack a proper export register in their as-installed state:

- **Aclara SGM1416-B** (British Gas installs 2015–2018) — no export register, DCC migration inconsistent
- **Elster AS300P** (npower, EDF installs) — SMETS1, single-register import only
- **Landis+Gyr E470** (multiple suppliers) — SMETS1 but some units re-flashable to SMETS1.6 with export support
- **Secure Liberty 100 / 105** (SSE installs, older EDF) — went dumb for most switchers before DCC enrolment
- **Itron ACE9000** (Scottish Power) — SMETS1, no export

Common SMETS2 models (all support export and half-hourly natively):

- **Aclara SGM1416-B v2** (post-2019 revision)
- **Landis+Gyr E470 SMETS2** (physically similar to SMETS1 sibling — check firmware version on IHD)
- **Kaifa MA120** — widely deployed by Octopus and OVO
- **EDMI ES-10B** — common with British Gas and E.ON post-2020

If in doubt, the fastest path is a five-second question to your supplier's app chat: "Is my meter SMETS1 or SMETS2?"

## The switching trap most solar owners walk into

A specific pattern catches people out. You installed solar with your existing supplier, they enabled the export register on your (SMETS2) meter, everything worked. You switched supplier for a better import rate. The new supplier's system did not carry the export register configuration across, and your SEG payments silently stopped.

The fix is trivial once you know: after any supplier switch, log into the new supplier's app and check that half-hourly export data is populating within 7 days. If it is not, open a chat and ask them to "re-enable the export MPAN and confirm settlement is running". Most suppliers can flip a flag in seconds; a small minority need to send an engineer.

We cover the switching-day checklist in [switching energy supplier with plug-in solar](/blog/plug-in-solar-smart-meter-uk).

## What happens if you refuse a smart meter installation

You are not legally obliged to accept one. Suppliers must offer, not force. But if you refuse and you have solar:

- You cannot claim SEG payments. There is no legal route to be paid for exports without half-hourly measurement, and traditional meters cannot provide that.
- You cannot use any time-of-use tariff. Every TOU tariff (Octopus Agile, Flux, Cosy, EDF GoElectric) requires SMETS2 half-hourly settlement.
- Your bills stay flat-rate at whatever the supplier's variable rate is, currently at or near the [Ofgem cap of 24.5p/kWh](/blog/plug-in-solar-energy-price-cap-q4-2026-uk).

For a small plug-in solar system exporting 200–300 kWh/year, the SEG opportunity cost of refusing a smart meter is £10–£45/year plus the loss of load-shifting analytics — usually not enough to be worth fighting about, but worth knowing before you dig in.

## What SMETS3 will look like

There has been informal industry talk about SMETS3 targeting 2028–2030 with sub-second data resolution, native support for micro-generation registration, and better integration with EV chargers. Nothing is confirmed. For any decision you are making today, plan on SMETS2 as the standard for the next 5+ years — it does everything a plug-in solar household needs.

## Related Reading

- [Smart meters and solar panels: complete guide](/blog/smart-meter-solar-panels-complete-guide-uk)
- [How to enable your export register](/blog/smart-meter-export-register-solar-uk)
- [UK smart meter rollout and plug-in solar](/blog/plug-in-solar-smart-meter-rollout-uk)

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

- [Cheap vs Premium Solar Panels UK: Is It Worth Paying More?](/blog/cheap-vs-premium-solar-panels-uk)
- [String vs Parallel Wiring for Plug-in Solar](/blog/plug-in-solar-string-vs-parallel-wiring-uk)
- [MPPT vs PWM Charge Controllers for Plug-in Solar UK](/blog/mppt-vs-pwm-charge-controllers-solar-uk)
- [Economy 7, Smart Meters & Solar UK](/blog/smart-meter-solar-panels-economy-7-uk)

<!-- related-auto-end -->

