---
title: "NEC Article 705: What Actually Applies to Plug-In Solar"
slug: "nec-article-705-plug-in-solar-us"
excerpt: "The National Electrical Code section that governs any grid-connected solar — and how small plug-in kits fit (or don't) inside it."
date: 2026-09-19
category: "Regulations & Policy"
cluster: us-regulatory
market: "US"
---

Every conversation about plug-in solar legality in the US eventually lands on **NEC Article 705** — the National Electrical Code section covering "Interconnected Electric Power Production Sources". Understanding what it actually says (and doesn't say) about small plug-in kits is the difference between a compliant install and a headache with your utility. This piece breaks it down without the jargon.

## What Article 705 covers

NEC 705 applies to any power source that operates in parallel with the utility grid — solar PV, wind, fuel cells, batteries, and yes, that 400W panel plugged into your garage outlet. The core requirements:

- **705.6 Equipment approval:** every interactive inverter must be listed (typically UL 1741) and installed per its listing.
- **705.10 Directory:** a permanent plaque at the service equipment showing all power sources on-site.
- **705.12 Load-side connections:** the "120% rule" limiting how much backfeed a busbar can accept without upgrading the panel.
- **705.13 Power control systems:** advanced systems that dynamically limit backfeed can bypass the 120% rule.
- **705.30 Disconnecting means:** a readily accessible disconnect for every source.

For a traditional rooftop installation, all of this triggers permits, inspection, and utility interconnection agreements. For a small plug-in kit feeding a receptacle, the situation is more nuanced.

## The plug-in solar wrinkle

Article 705 was written assuming interconnected sources would be permanently wired to the service panel through dedicated breakers. Plugging an inverter into a standard 15A or 20A receptacle isn't explicitly addressed — because the code writers didn't foresee it as a residential use case. Some AHJs (Authorities Having Jurisdiction) treat plug-in kits as covered by 705 anyway; others exempt anything under a certain wattage; others simply have no guidance and defer to the utility.

The practical reality:

- **Kits under 400W using UL 1741-listed microinverters** are widely used across the US, typically without permits or utility notification. Enforcement varies wildly.
- **Kits 400–800W** sit in a grey zone. Some utilities require notification; others explicitly allow small microgeneration under a de minimis threshold.
- **Anything above 800W** almost certainly triggers full interconnection requirements in most jurisdictions.

For clarity on the whole regulatory landscape, see the [complete US plug-in solar guide](/us/blog/is-plug-in-solar-legal-in-my-state).

## Utility notification: the practical step

Even where the code doesn't strictly require it, a courtesy call or web form to your utility avoids trouble. Most utilities have a simplified interconnection process for small microgeneration under 10kW — you fill out a one-page form, provide the inverter's UL 1741 listing number, and get a written OK within a few weeks. This puts you on solid ground if your meter reads oddly or you want to enroll in net metering later.

For a state-by-state view of what tariffs and interconnection rules look like, browse the [US blog index](/us/blog).

## The 120% rule in plain English

NEC 705.12(B)(3)(2) — the "120% rule" — limits how much combined breaker capacity you can add to a service panel busbar. Formula: **(main breaker rating) + (solar breaker rating) ≤ 120% of busbar rating**.

Example: a 200A busbar with a 200A main breaker allows up to a 40A solar backfeed breaker (200 + 40 = 240 = 120% × 200).

For a plug-in kit that never sees the service panel directly (it feeds a branch circuit that then feeds back through the panel indirectly), this rule technically doesn't apply. But if a utility inspector ever traces the circuit, they may still ask about it. Small kits (under ~10A backfeed) rarely trigger any concern.

<div class="product-card featured">
<div class="pc-accent"></div>
<div class="pc-badge">Amazon US pick</div>
<div class="pc-name"><a href="https://www.amazon.com/s?k=UL+1741+microinverter&tag=pluggedinsola-20" target="_blank" rel="noopener noreferrer sponsored">UL 1741-listed microinverters on Amazon US</a></div>
<div class="pc-price">From ~$180</div>
<ul class="pc-features">
<li>UL 1741 SA/SB compliant with anti-islanding — the certification NEC 705 requires</li>
<li>Compatible with 120V and 240V US residential wiring</li>
<li>Cloud monitoring via manufacturer app for utility-audit records</li>
</ul>
<div class="pc-cta"><a href="https://www.amazon.com/s?k=UL+1741+microinverter&tag=pluggedinsola-20" target="_blank" rel="noopener noreferrer sponsored">Browse on Amazon &rarr;</a></div>
<div class="pc-disclaimer">Affiliate link — we may earn a small commission at no cost to you.</div>
</div>

## What to avoid

- **Any inverter without a UL 1741 listing.** Even if the kit runs fine, you have no defence if a utility inspector shows up.
- **Chaining kits** through the same receptacle to exceed 800W.
- **Battery-in-plug-circuit setups** without a listed disconnect — NEC 706 (Energy Storage Systems) applies here in addition to 705.

## Bottom line

For most US homes, a 200–800W plug-in kit with a UL 1741-listed microinverter is defensible under current NEC interpretations. The safest path: use listed equipment, notify your utility even if not strictly required, keep the paperwork. See our [utility notification guide](/us/blog/is-plug-in-solar-legal-in-my-state) for the specific process.

### Do I need a permit for a plug-in solar kit under 800W?

Most jurisdictions do not require a building permit for a plug-in kit that doesn't modify the home's wiring. That said, utility notification is a good practice — most large utilities have a simplified interconnection form for micro-generation under 10kW that takes 10 minutes to submit.

### Is UL 1741 required for plug-in solar in the US?

Effectively yes. NEC 705.6 requires interactive inverters to be listed, and UL 1741 (with the SA or SB supplement for anti-islanding) is the industry standard. Any inverter without a UL 1741 listing is a non-starter for a compliant install.

### Can I skip notifying my utility?

You can, and thousands do — but you lose any recourse if the meter reads oddly, if you want to enroll in net metering later, or if a service call happens. The notification is free and takes 10 minutes; skipping it is a false economy.
