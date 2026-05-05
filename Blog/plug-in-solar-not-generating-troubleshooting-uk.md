---
title: "Why Is My Plug-in Solar Not Generating? Complete UK Troubleshooting Guide"
slug: plug-in-solar-not-generating-troubleshooting-uk
excerpt: "Zero watts on the app? Before you panic, work through this systematic checklist. Most issues have simple fixes."
date: "2026-04-11"
category: "Troubleshooting"
cluster: "Technical Guides"
priority: 1
wordcount: 1200
---

Your plug-in solar system shows zero generation. Or the monitoring is offline. Or output seems far below what you expected. Before assuming the worst, work through this troubleshooting guide — the majority of problems have straightforward fixes.

## Step 1: Confirm Whether It's a Monitoring Problem or a Generation Problem

This is the most important distinction. The monitoring system (app, DTU, cloud) and the power generation (panels, inverter, wiring) are completely independent. The panels can be generating perfectly while the app shows nothing.

**Quick test:** plug a [Tapo P110 smart plug](https://amzn.to/4m9Yh9U) between the inverter's AC output and the wall socket. If the P110 shows wattage (even a few watts), the system is generating and the problem is monitoring, not hardware.

If the P110 shows zero watts during daylight hours, the problem is with the generation side. Continue to Step 2.

If the P110 shows generation but the app doesn't, the problem is monitoring. See our [monitoring app troubleshooting guide](/blog/plug-in-solar-monitoring-app-not-working-uk) for solutions.

## Step 2: Check the Basics

These are embarrassingly obvious but account for a significant portion of reported "faults":

**Is the AC cable plugged in?** Check both ends — the wall socket and the inverter's AC output. Cables can work loose, especially if children, pets, or wind have been near the setup.

**Is the wall socket switched on?** UK sockets have switches. It takes one accidental bump to switch off.

**Is the MCB (circuit breaker) tripped?** Find the circuit your plug-in solar is connected to in your consumer unit. If the MCB is in the "off" position, something has tripped it. Reset it and monitor — if it trips again immediately, there's a fault. See our [RCD tripping guide](/blog/plug-in-solar-rcd-tripping-uk) if the RCD specifically is tripping.

**Is there actually sunlight hitting the panels?** This sounds absurd, but check. A panel that was unshaded when you installed it may now be shaded by a tree that's come into leaf, a neighbour's new construction, or even a temporary object (a parked van, delivery truck, temporary scaffolding). Even heavy overcast in winter can reduce a 400W panel to single-digit watts.

## Step 3: Check the DC Side (Panel to Inverter)

If the basics are fine and the P110 confirms zero output in decent sunlight, the issue is likely on the DC side — between the panels and the inverter.

**MC4 connectors** — these are the barrel-shaped connectors that join the panel cables to the inverter cables. They should click firmly together. Inspect each connection:
- Is it fully clicked? Pull gently — it should not come apart without pressing the release clips.
- Is there corrosion? White or green deposits around the join indicate moisture ingress.
- Is the rubber seal intact? Cracked seals let water in, which corrodes the metal contacts over time.

If a connector looks corroded or damaged, disconnect it (cover the panels with a blanket first — panels under sunlight produce voltage even when disconnected from the inverter), clean the contacts, and reconnect. If the connector is damaged, replace it with a new one — [MC4 extension cables](https://amzn.to/4mfWT5J) include fresh connectors.

**Cable damage** — inspect the full length of DC cabling from panel to inverter. Look for cuts, abrasion, or punctures. Cables running across walkways, under furniture, or near sharp edges can get damaged over time. Birds can also peck cables — a known issue with outdoor installations (see our [bird proofing guide](/blog/best-bird-proofing-kits-solar-uk)).

**Panel voltage check** — if you have a [Fluke 117 multimeter](https://amzn.to/4bSN4aq), you can measure the open-circuit voltage (Voc) at the panel's MC4 connectors. Disconnect the panels from the inverter first, then measure across the positive and negative MC4 connectors. A healthy 400W panel in decent sunlight should show 35-50V DC (check your specific panel's datasheet for the Voc rating). If you get zero or a very low reading, the panel or its junction box has a fault.

**Important safety note:** DC voltage from panels can be dangerous. Work with the panels covered or in low light. Do not touch bare MC4 contacts when panels are in sunlight.

## Step 4: Check the Inverter

If the DC side checks out (voltage present at panel output, connectors intact), the micro-inverter itself may have failed.

**Status LED** — most micro-inverters have a small LED indicator. Check the manual for your specific model, but generally:
- Green (steady or slow flash) = normal operation
- Red (steady) = fault detected
- No LED = no power reaching the inverter (check DC connections again)
- Rapid flashing = startup or communication mode

**Inverter temperature** — feel the inverter casing (carefully — it shouldn't be dangerously hot, but a working inverter is warm to the touch on a sunny day). If it's completely cold despite sunshine and good DC connections, it's likely not operating.

**Power cycle** — disconnect the AC output, wait 30 seconds, reconnect. Some inverter faults clear with a power cycle. If the inverter restarts (LED activity), monitor it. If it immediately faults again, the issue is persistent.

**Age check** — micro-inverters typically last 15-25 years, but failures at year 5-10 aren't uncommon, particularly with older or budget units. If your inverter is out of warranty and consistently failing, replacement may be the most cost-effective option. See our [system ageing guide](/blog/plug-in-solar-year-2-3-maintenance-uk) for what to expect.

## Step 5: Environmental Causes

If the system is operating but output is consistently low:

**Soiling** — a dirty panel can lose 10-20% output. Bird droppings are the worst offender — a single large dropping on a cell can reduce that cell's output to near-zero and affect the whole panel string. Clean with a [soft brush and water](https://amzn.to/4shZzkH). Never use abrasive cleaners or pressure washers.

**Partial shading** — even 10% shading on a panel can reduce output by 30-50%. The impact is disproportionate because of how solar cells are wired internally. If shading is intermittent (a chimney shadow that moves through the day), output will fluctuate significantly. Consider repositioning the panel or adjusting the angle with a [tilt mount](https://amzn.to/4maeAng).

**Seasonal expectations** — if you installed in April and you're now in November, your output will have dropped by 60-70%. This is normal. See our [monthly generation guide](/blog/how-much-power-solar-panel-generate-uk) for what to expect in each month.

## When to Call an Electrician

Call a professional if:
- Your RCD or MCB trips repeatedly when the solar system is connected
- You measure zero DC voltage from the panels in good sunlight
- The inverter shows persistent error codes after power cycling
- You suspect wiring damage inside the house (e.g., after building work)
- You smell burning or see scorch marks near any electrical connection

A qualified electrician with solar experience can diagnose most faults in an hour. Expect to pay £80-150 for a callout and basic diagnosis.

For the full picture on maintaining your system over time, see our [year 2-3-5 maintenance guide](/blog/plug-in-solar-year-2-3-maintenance-uk).
