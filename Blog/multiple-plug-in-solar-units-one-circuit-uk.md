---
title: "Can You Connect Multiple Plug-in Solar Units to One Circuit?"
slug: multiple-plug-in-solar-units-one-circuit-uk
excerpt: "One 800W kit is legal. But what happens if you plug in two or three? The safety case gets complicated fast."
date: "2026-04-11"
category: "Safety"
cluster: "Legal & Regulatory"
priority: 1
wordcount: 1000
---

The UK's plug-in solar regulations are built around a single system. One kit, one socket, up to 800W. But what if you've got a south-facing balcony and a west-facing wall? Or enough garden space for four panels? Can you just plug in a second unit?

Technically, you can. But the safety basis changes — and you need to understand why.

## What the Regulations Actually Say

[BS 7671](/blog/bs-7671-amendment-4-plain-english-guide) Amendment 4 — the wiring standard that made plug-in solar legal in April 2026 — addresses a single plug-in solar energy system (PSES) connected to a final circuit. The 800W cap, the [G98](/blog/g98-dno-notification-plug-in-solar) notification, the anti-islanding requirements — all assume one unit per circuit.

The regulations don't explicitly ban multiple units. But they don't address the cumulative effects either. As the Institution of Engineering and Technology (IET) guidance notes, the engineering basis for safety becomes less clear when a household installs two or three units on the same ring main.

This is the gap you need to understand before connecting a second system.

## The Ring Main Loading Problem

A typical UK ring main is protected by a 32A MCB (miniature circuit breaker) at your consumer unit. That's a maximum capacity of about 7,360W (32A × 230V). Under normal use, the ring main handles your kitchen appliances, living room devices, and anything else plugged into the sockets on that circuit.

A single 800W plug-in solar system feeds power back into this ring main. The wiring standard assumes this is safe because 800W is a small fraction of the circuit's capacity, and the design accounts for the extra current.

Now add a second 800W system on the same ring main. You've got 1,600W of potential generation feeding back into the circuit. Add a third and it's 2,400W. The cumulative backfeed starts to become significant — especially on a lightly loaded circuit where most of that power is flowing back towards the consumer unit rather than being consumed by appliances.

**The specific risk:** If generation exceeds consumption on the circuit, excess current flows back through the ring main wiring towards the MCB. The wiring and protection devices are designed for current flowing in one direction — from the consumer unit to the sockets. Reverse current at scale can cause heating in connections that weren't designed for it.

## Separate Circuits: The Safer Approach

If you want multiple plug-in solar units, the safest approach is to connect each one to a different final circuit. Most homes have several ring mains — typically one for downstairs sockets, one for upstairs, and sometimes a separate kitchen circuit.

Connecting one 800W unit to your downstairs ring main and another to your upstairs ring main keeps each circuit within the single-system safety basis that BS 7671 addresses. Each circuit has its own MCB, its own wiring run, and its own loading profile.

**How to identify your circuits:** Your consumer unit (fuse box) has labels or a schedule showing which MCB protects which circuit. If the labels are missing or illegible — common in older installations — a [multimeter like the Fluke 117](https://amzn.to/4bSN4aq) can help you trace circuits by testing which sockets lose power when you trip each MCB.

If you're unsure which sockets are on which circuit, get an electrician to map it. This costs £50-100 and takes less than an hour. It's worth doing regardless — knowing your circuit layout is useful for general electrical safety, not just solar.

## DNO Notification for Multiple Units

Each plug-in solar unit requires its own G98 notification to your Distribution Network Operator (DNO). The G98 form asks for the total generation capacity being connected. If you're installing two 800W units, you need to notify for 1,600W total.

Here's where it gets important: the G98 process for systems under 800W is a simple notification — you tell the DNO, they acknowledge, and you're done. For systems between 800W and 3.68kW, it's still a notification, but the DNO has the right to assess whether your local network can handle the additional generation. They rarely object, but they can request changes if the local transformer is already heavily loaded with solar.

Above 3.68kW total, you move from G98 to G99, which requires a formal application and potentially a network study. This is unlikely with plug-in solar — you'd need five 800W units — but it's worth knowing the thresholds.

## Monitoring Multiple Systems

If you're running more than one plug-in solar unit, monitoring becomes essential rather than optional. You need to know how much each system is generating, how much is being consumed locally, and how much (if any) is being exported.

An [energy monitor like the Emporia Vue 3](https://amzn.to/4bUCQ9E) clamps around the cables in your consumer unit and shows real-time generation and consumption per circuit. This gives you the data to verify that your circuits are handling the load safely and that you're actually using the electricity you generate.

For individual system monitoring, a [smart plug like the Tapo P110](https://amzn.to/4m9Yh9U) on each inverter output shows per-unit generation. Comparing the two tells you whether both systems are performing as expected or whether one has developed a fault.

## When to Get Professional Help

**If you want three or more units:** At 2,400W+ of total generation, you should get an electrician to assess your wiring. They'll check that your consumer unit, main fuse, and circuit wiring can handle the cumulative backfeed safely. This might cost £100-200 but gives you documented evidence that your installation is sound — valuable for insurance purposes too.

**If your home has old wiring:** Pre-1990 wiring with rewireable fuses rather than MCBs may not handle reverse current safely. See our [old wiring guide](/blog/plug-in-solar-old-wiring-uk) for the full picture.

**If you're on a shared supply:** Some flats and converted houses share an electricity supply or have a communal consumer unit. Multiple solar units on a shared supply creates complications that require professional assessment.

## What About Batteries?

Adding a battery to a multi-unit setup actually helps the circuit loading problem. A [battery like the EcoFlow DELTA 2](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fdelta-2-portable-power-station) absorbs excess generation rather than pushing it back into the ring main. If your two 800W units are generating 1,200W but your home is only consuming 400W, a battery captures the 800W surplus instead of forcing it through your wiring.

This doesn't eliminate the need to think about circuit loading, but it reduces the peak backfeed significantly — especially during the middle of the day when generation is highest and consumption is often lowest.

## The Bottom Line

One plug-in solar unit per circuit is the safe, regulation-backed approach. Two units on separate circuits is straightforward and safe. Two units on the same circuit is a grey area that probably works fine but isn't explicitly covered by the regulations. Three or more units on one circuit needs professional assessment.

If you're expanding beyond a single system, map your circuits first, connect to different ring mains where possible, monitor everything, and get an electrician involved once you're above 1,600W total. The cost of a professional check is small compared to the value of knowing your installation is safe.

For single-system setup guidance, see our [installation guide](/blog/how-to-install-plug-in-solar-uk). For circuit and wiring checks, see our [old wiring guide](/blog/plug-in-solar-old-wiring-uk).
