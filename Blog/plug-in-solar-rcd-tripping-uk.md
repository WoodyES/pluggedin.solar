---
title: "My RCD Keeps Tripping Since I Installed Plug-in Solar — Here's Why"
slug: plug-in-solar-rcd-tripping-uk
excerpt: "Germany's million installs flagged this fast: certain RCDs don't play well with micro-inverters. Here's what type you need and how to fix it."
date: "2026-04-11"
category: "Troubleshooting"
cluster: "Technical"
priority: 1
wordcount: 1100
---

One of the most common complaints from German Balkonkraftwerk owners in the early days of their market — and one that's already showing up in UK electrician forums — is an RCD that starts tripping intermittently after a plug-in solar system is installed. Sometimes it trips on sunny mornings. Sometimes in rainy weather. Sometimes seemingly at random.

The good news: this is a well-understood problem with a clear fix. The bad news: it usually means your consumer unit has the wrong type of RCD for solar.

## Why Micro-Inverters Cause RCD Trips

Modern plug-in solar kits use **transformerless micro-inverters**. These are compact, efficient, and cheap — but they lack the galvanic isolation that older, transformer-based inverters provided. As a result, small amounts of DC leakage current can flow from the PV panels, through the inverter, and into your home's AC wiring.

This leakage is normal and within permitted limits. The problem is that some RCDs can't distinguish between the DC leakage from a solar inverter and the kind of leakage that indicates a genuine fault. They trip unnecessarily — a "nuisance trip" that cuts power without any actual danger.

## The RCD Type Problem

UK consumer units contain one of three types of RCD:

**Type AC** — the most common in installations before around 2015. These are designed to detect pure AC fault currents only. When they encounter DC leakage from a transformerless inverter, they can behave unpredictably — either tripping when they shouldn't, or (more dangerously) failing to trip when they should, because the DC component masks the fault.

**Type A** — detects both AC and pulsating DC fault currents. This is the minimum type required by [BS 7671](/blog/bs-7671-amendment-4-plain-english-guide) Amendment 4 for circuits connected to plug-in solar systems. Most consumer units installed after 2015 will have Type A RCDs.

**Type B** — detects AC, pulsating DC, and smooth DC fault currents. Required for some EV chargers and three-phase systems. Overkill for domestic plug-in solar, but not harmful.

If your consumer unit has a **Type AC RCD**, you have a problem. Solar inverters specifically require Type A protection as a minimum.

## The Rain Effect

Many users notice trips happening specifically in wet weather, even if there were no issues on sunny days. This is because moisture around outdoor cabling, panel frames, and connectors increases leakage current. A system that stays just under the trip threshold on a dry day can tip over it during rain. If this describes your experience, it's a strong indicator that your RCD type is marginal or that there's a minor weatherproofing issue worth investigating.

Check all outdoor connections for signs of water ingress — particularly the MC4 connectors between panels and inverter, and any cable entry points through walls or window frames. Wet connectors that aren't fully clicked together are a common culprit. See our [weatherproofing guide](/blog/plug-in-solar-weatherproofing-accessories-uk) for what to look for.

## Checking Your RCD Type

RCDs are labelled. Open your consumer unit cover and look at the RCDs — they'll typically be marked with the type symbol:

- A wavy line (~) indicates **Type AC**
- A wavy line plus a half-wave (∿) indicates **Type A**
- Additional markings indicate Type B or F

If you're not comfortable opening the consumer unit, a qualified electrician can confirm the type in minutes. It's also worth using a [multimeter like the Fluke 117](https://amzn.to/4bSN4aq) to check for leakage currents if you're experienced with electrical testing.

## What Germany Found at Scale

Germany's rollout of over a million Balkonkraftwerk systems by mid-2025 surfaced this issue at scale. Older German buildings often had the Schuko-socket-based installations tripping Type AC RCDs, particularly in apartment blocks with shared consumer units. The fix required in those cases was either upgrading the RCD or ensuring the solar inverter was connected to a circuit protected by a Type A device.

The UK is in a better position than Germany was in 2018-2020 because BS 7671 Amendment 4 has explicitly addressed RCD type requirements for plug-in solar from the start. But if your home was built or rewired before around 2015, you may well have a Type AC installation.

## Fixing the Problem

**Option 1: RCD upgrade** — The cleanest fix is replacing the Type AC RCD(s) in your consumer unit with Type A equivalents. This typically costs £80-150 in parts and labour. A qualified electrician can do this in an hour.

**Option 2: RCBO replacement** — Rather than replacing the main RCD, individual circuits can be protected by RCBOs (combined MCB + RCD) of Type A. This gives more granular protection and avoids a single trip cutting your whole downstairs ring main. Costs more in parts but is often the better long-term solution.

**Option 3: Check the inverter first** — Some micro-inverter brands have adjustable leakage current settings or firmware updates that reduce DC leakage. Check the manufacturer's app or support documentation before spending money on electrical work. The fix may be simpler than you think.

## When It's Not the RCD Type

If you have a confirmed Type A installation and trips are still happening, the issue is likely one of the following:

- **Undersized RCD sensitivity** — a 30mA Type A RCD combined with high solar leakage can still trip. Some installers recommend 100mA sensitivity for solar circuits specifically.
- **Inverter fault** — a failing inverter can produce abnormal leakage. If trips started suddenly after months of trouble-free operation, suspect the inverter.
- **Actual earth fault** — before assuming it's nuisance tripping, rule out a real fault. A cable damaged by UV, birds, or movement can create genuine leakage. Have it checked.

For more on testing your system's electrical performance, see our [troubleshooting guide](/blog/plug-in-solar-not-generating-troubleshooting-uk). If you're not sure whether your wiring is up to the job, our [old wiring guide](/blog/plug-in-solar-old-wiring-uk) explains what to look for.
