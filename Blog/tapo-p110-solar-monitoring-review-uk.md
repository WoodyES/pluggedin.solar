---
title: "Tapo P110 for Solar Monitoring: UK Review"
slug: tapo-p110-solar-monitoring-review-uk
excerpt: "At £15, it's the cheapest and simplest way to track your plug-in solar output. Here's how to set it up and what you'll learn from it."
date: "2026-04-11"
category: "Reviews"
cluster: "Product Reviews"
priority: 1
wordcount: 950
---

The [TP-Link Tapo P110](https://amzn.to/4m9Yh9U) is a £15 [smart plug](/blog/best-smart-plug-monitor-solar-uk) with energy monitoring. It wasn't designed for solar — it was designed to track the power draw of appliances like kettles and washing machines. But it's become one of the most commonly used tools for monitoring plug-in solar output in the UK and Germany, and for good reason: it's cheap, reliable, and does 90% of what a dedicated solar monitor does.

## How It Works for Solar Monitoring

Your plug-in solar micro-inverter outputs AC electricity through a standard UK 13A plug. The Tapo P110 sits between the inverter's plug and your wall socket. It measures the power flowing through it in real time and logs the data to the Tapo app on your phone.

Setup takes five minutes: plug the P110 into the wall socket, plug the inverter into the P110, download the Tapo app, connect the P110 to your WiFi (2.4GHz only — see below), and it starts recording immediately.

## What You Can See

**Real-time wattage** — the app shows a live reading of current power output. On a sunny summer day, you'll see 300-800W depending on conditions. On an overcast winter morning, 20-80W. This is useful for understanding your system's behaviour and spotting problems.

**Daily generation (kWh)** — the P110 logs cumulative energy production throughout the day. This is the figure that matters for calculating savings: multiply by your tariff rate and you know what your panels saved you today.

**Monthly and historical totals** — the app stores historical data, letting you compare months and seasons. This is essential for understanding whether your system is performing as expected.

**On/off control** — though you'll rarely need it, the P110 can switch the outlet on and off remotely. Useful for debugging: if the inverter isn't responding, you can power-cycle it from the app without going outside.

## What You Can't See

The P110 only measures the inverter output — it doesn't know what happens to that electricity after it enters your ring main. It can't tell you how much you self-consumed versus how much you exported. It can't show you total household consumption.

For the full picture (import, export, [self-consumption](/blog/smart-meter-solar-self-consumption-uk) ratio), you need a whole-home [energy monitor](/blog/best-energy-monitor-plug-in-solar-uk) like the [Emporia Vue 3](https://amzn.to/4bUCQ9E). But for most plug-in solar owners, the P110's generation data is sufficient for the first year — you can calculate self-consumption roughly from your electricity bills.

## Setup Tips

**WiFi band** — the P110 connects to 2.4GHz WiFi only. If your router broadcasts a combined 2.4/5GHz network, the P110 usually connects fine, but if it doesn't, temporarily split your bands during setup. This is the most common setup frustration and the same issue that affects solar inverter DTUs (see our [monitoring app guide](/blog/plug-in-solar-monitoring-app-not-working-uk)).

**Plug orientation** — the P110 is relatively compact but still adds bulk to the socket connection. If you're using a socket behind furniture, check that the P110 + inverter plug combination physically fits. An extension lead can help if clearance is tight.

**Naming** — name the device "Solar" or "Inverter" in the Tapo app. This sounds trivial, but when you've got three Tapo plugs on the network, clear naming saves confusion later.

**Location** — the P110 should be indoors, on the interior socket, not exposed to weather. If your inverter plugs into an outdoor socket, the P110 goes between the indoor end of any extension and the wall socket, not outside.

## Accuracy

The P110 measures to within ±1% at normal loads — well within acceptable accuracy for solar monitoring. I've cross-checked it against Hoymiles monitoring data and the readings are consistently within 2-3% of each other, with the small difference likely explained by cable losses between inverter output and the P110 measurement point.

At very low loads (below 5W), accuracy drops. This means the P110 may show 0W during low-light conditions when the inverter is actually producing 2-3W. This is negligible over a full day but worth knowing if you're comparing data at dawn/dusk.

## Tapo P110 vs P115 vs Alternatives

**Tapo P115** — a newer, more compact version with slightly better WiFi performance. If available at a similar price, buy the P115. Otherwise, the P110 is fine.

**Shelly Plus Plug UK** — the [Shelly](https://amzn.to/4sfA9nK) is preferred by Home Assistant users because it integrates natively without cloud dependency. At ~£20, it's slightly more expensive but offers local control without relying on TP-Link's cloud servers. If you're building a smart home automation system, the Shelly is the better long-term choice. If you just want a standalone solar monitor, the Tapo is simpler.

**Eve Energy** — the [Eve Energy](https://amzn.to/4sSyWns) works via Matter/Thread protocol and integrates with Apple HomeKit. At ~£35, it's significantly more expensive for the same core function. Worth it only if you're deeply invested in the Apple ecosystem and want everything in one app.

## Why It's the First Thing to Buy

Before spending money on your solar kit, the P110 probably isn't relevant. But the moment your system is installed, it should be the first accessory purchase you make. Without monitoring, you have no idea whether your system is working correctly, how much you're generating, or whether your savings expectations are realistic.

At £15, it's the best [return on investment](/blog/is-plug-in-solar-good-investment-uk-2026) in the entire plug-in solar ecosystem. It pays for itself within the first month by giving you the data to verify your system is functioning — and if it isn't, you'll know immediately rather than waiting for a disappointing electricity bill three months later.

Buy the [Tapo P110 on Amazon](https://amzn.to/4m9Yh9U).

For the broader monitoring picture, see our [best energy monitors guide](/blog/best-whole-home-energy-monitors-uk) and our [Home Assistant integration guide](/blog/solar-panel-monitoring-home-assistant-uk).
