---
title: "APsystems EZ1-M Review UK"
slug: apsystems-ez1-m-review-uk
category: Reviews
date: 2026-04-13
excerpt: "Deep review of the APsystems EZ1-M micro-inverter: built-in WiFi, dual-panel modes, and how it compares to Hoymiles HMS-800 in the UK market."
priority: 2
---

# APsystems EZ1-M Review UK

The APsystems EZ1-M micro-inverter has quietly become one of the most interesting devices in the UK plug-in solar space. Unlike the Hoymiles HMS-800 (which requires a separate Data Transfer Unit), the EZ1-M has WiFi built-in. For small systems, that's a game-changer. Here's our detailed assessment.

## What's a Micro-Inverter? Quick Primer

A micro-inverter sits on or near your panel, converts DC power to AC instantly, and sends it straight to a socket. No separate inverter box on the wall, no batteries required. Perfect for UK plug-in solar setups.

The EZ1-M can operate in two modes:
- **Single-panel mode**: One 350–450W panel (typically 350W nominal).
- **Dual-panel mode**: Two panels of the same wattage, combined output 700–900W (limited to 800W by UK regulation).

This flexibility is valuable. UK regulation caps grid-tied systems at 800W (confirmed March 2026). The EZ1-M can work standalone with a single panel or pair two panels to hit the 800W limit.

## Built-In WiFi: The Key Advantage

Hoymiles HMS-800 requires a DTU (Data Transfer Unit)—a separate ~£60–80 box that connects to your WiFi router and sends monitoring data to the cloud. More hardware, more complexity, more things to fail.

The EZ1-M has WiFi built into the inverter itself. Pair it with your router during setup, and you're done. Monitoring data goes directly to the EMA app (APsystems' cloud platform). Fewer points of failure, neater installation.

**WiFi range:** Typical home router coverage (10–30 metres, depending on walls and interference). If your panel is mounted far from the house, consider a WiFi extender.

## Single vs Dual-Panel Modes

**Single-panel mode (350W):**
- Setup: One 350W panel + EZ1-M + cable to a 13A socket.
- Output: 0.7–1.2 kWh per day in summer (UK average: 3–4 peak sun hours).
- Cost: Panel (~£150), EZ1-M (~£250), cabling (~£30). Total ~£430.
- Best for: Renters, temporary installs, small balconies.

**Dual-panel mode (700–800W):**
- Setup: Two 350–400W panels, one EZ1-M, combined via MC4 connectors to the inverter.
- Output: 1.4–2.4 kWh per day in summer.
- Cost: Two panels (~£300), EZ1-M (~£250), cabling (~£50). Total ~£600.
- Best for: Homeowners wanting maximum legal output, better ROI.

Importantly, dual-panel setups require *both panels to be of similar wattage* for optimal MPPT (Maximum Power Point Tracking). Mixing a 350W and 400W panel reduces efficiency.

## Monitoring: EMA App vs HMS App

**APsystems EMA app:**
- Real-time power output (watts).
- Daily, monthly, annual energy totals.
- Cloud-based (requires internet).
- Alerts for faults (inverter offline, low voltage, etc.).
- Simple, no fluff. Good for beginners.

**Hoymiles DTU + HMS app:**
- Similar features, but requires DTU setup.
- Slightly more detailed diagnostics (grid frequency, voltage phase).
- More professional, better for installers.

For most UK homeowners, the EMA app is adequate. You get real-time data and historical trends. If you want granular technical details, Hoymiles edges ahead—but you're paying for hardware and complexity.

## Head-to-Head: APsystems EZ1-M vs Hoymiles HMS-800

| Feature | EZ1-M | HMS-800 |
|---------|-------|---------|
| **WiFi** | Built-in | External DTU (~£60–80) |
| **Setup complexity** | Simple (2 steps) | Moderate (DTU pairing) |
| **Single-panel mode** | Yes (350W) | Yes (400W) |
| **Dual-panel mode** | Yes (up to 800W) | Yes (up to 800W) |
| **Efficiency** | 96.5% | 96.7% |
| **Warranty** | 12 years | 12 years |
| **Price (UK)** | ~£250 | ~£200 |
| **Monitoring app** | EMA (basic) | HMS (more detailed) |
| **Grid export metering** | Via plug-in monitor | Via plug-in monitor |

**Efficiency is near-identical.** Both are excellent choices.

**Key trade-off:** Pay £50 more upfront (EZ1-M) and avoid the DTU hardware headache, or save £50 (HMS-800) and accept extra complexity. For renters and DIY installers, the EZ1-M wins. For electricians and multi-unit builds, HMS-800 might be worth it.

## Physical Installation and Safety

Micro-inverters can be mounted:

1. **Behind the panel** (wall-mounted frame): Hides cables, cleaner look. Requires a small mounting bracket (~£20).
2. **On the panel itself** (clip-on): Heavier, more wind drag. Use on walls only, not sloped roofs.
3. **In a junction box** (wall-mounted above socket): Easy to service, requires additional conduit.

**Cabling:**
- Two 4mm² solar cables from panel to EZ1-M: ~£10–15.
- One AC cable from EZ1-M to socket: Standard UK 3-pin, 13A, ~£5.
- Use [UV Resistant Cable Ties](https://amzn.to/4bUB08B) to secure outdoor runs.
- Seal any roof penetrations with silicone; use [IP68 Cable Glands](https://amzn.to/4dB57TY) if running through walls.

**Testing:** Once installed, use a [Fluke 117 Multimeter](https://amzn.to/4bSN4aq) (~£199) to verify:
- DC voltage from panel to inverter (should be 250–500V depending on panel).
- AC voltage at the socket (should be 220–240V).
- Current draw (should match expected output).

These tests confirm safe operation before going live.

## Reliability and Longevity

Both EZ1-M and HMS-800 are solid devices. APsystems is a Chinese manufacturer (founded 2010), well-established in global markets. Failure rates are low (~0.5% per year). 12-year warranty covers defects.

In UK outdoor conditions, the main risk is **water ingress** (not uncommon in northern climates). The EZ1-M has IP67 rating (good but not perfect). Proper cable gland installation is critical.

## Output Monitoring Beyond WiFi

Real-time socket monitoring matters for grid export accountability. Most UK installers pair the EZ1-M with a [smart plug](/blog/best-smart-plug-monitor-solar-uk):

- [TP-Link Tapo P110](https://amzn.to/4m9Yh9U) (~£15): Cloud-based, affordable, good accuracy.
- [Shelly Plus Plug UK](https://amzn.to/4sfA9nK) (~£20): Local-only control, Home Assistant integration.
- [Eve Energy (Matter)](https://amzn.to/4sSyWns) (~£35): Apple HomeKit native, most accurate.

These plugs measure AC output independently, giving you data that doesn't rely on the inverter's internal monitoring. Useful for validating claims and troubleshooting.

## Verdict

The APsystems EZ1-M is the best micro-inverter choice for UK homeowners building a plug-in solar system without existing electrical infrastructure. Built-in WiFi eliminates the DTU hassle, and dual-panel capability lets you maximise the 800W legal limit.

Pair it with two quality 350–400W panels, a smart plug for monitoring, and you've got a system that:
- Generates 1.4–2.4 kWh daily (summer).
- Exports surplus to the grid automatically.
- Costs ~£800–1,000 all-in.
- Requires zero permissions from your DNO (distribution network operator) if under 800W single-phase.

**Best for:** Renters, DIY installers, small balconies, dual-panel setups.  
**Not ideal for:** Complex shading scenarios (micro-inverters can't optimise around shade on individual panels).  
**Price:** ~£250  
**Efficiency:** 96.5%  
**Warranty:** 12 years  

Install carefully, use proper safety gear, and you'll have a set-and-forget system that pays for itself in 4–6 years.

---

**See also:**  
[Eve Energy vs Tapo P110 vs Shelly: Best Solar Smart Plug UK](/blog/eve-energy-vs-tapo-p110-vs-shelly-uk)  
[Best Cable Management for Plug-in Solar UK 2026](/blog/best-cable-management-plug-in-solar-uk-2026)  
[TP-Link Tapo P110 Smart Plug Review](/blog/tapo-p110-solar-monitoring-review-uk) *(future article)*
