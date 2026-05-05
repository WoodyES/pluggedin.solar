---
title: "Monitoring Plug-in Solar with Home Assistant in the UK"
slug: solar-panel-monitoring-home-assistant-uk
excerpt: "Turn your plug-in solar data into dashboards, automations, and smart home integrations using Home Assistant."
date: "2026-04-08"
category: "Monitoring"
cluster: "performance"
priority: 3
wordcount: 800
---

## Why Home Assistant?

If you're already running Home Assistant (or curious about it), plug-in solar monitoring is one of the most satisfying integrations you can set up. Instead of checking a manufacturer's app for generation data, you get real-time dashboards, historical charts, automations triggered by solar output, and the ability to combine solar data with everything else in your smart home.

Home Assistant is free, open-source software that runs on a Raspberry Pi, old laptop, or mini PC. It connects to thousands of smart home devices and gives you a single dashboard for everything — including your solar panels.

## The Smart Plug Approach

The simplest way to get solar data into Home Assistant is via a smart plug between your inverter and the wall socket. The plug measures real-time power output, and Home Assistant reads that data and logs it.

### Shelly Plus Plug UK (~£15)

The Shelly is the best option for Home Assistant users. It communicates locally over your network — no cloud required, no internet dependency, no manufacturer app that might shut down in five years.

Home Assistant discovers Shelly devices automatically. Once added, you get real-time watts, daily energy totals, and historical data. The integration is maintained by the core Home Assistant team, so it's stable and well-supported.

[Check the Shelly Plus Plug on Amazon](https://amzn.to/4sfA9nK)

**Setup:** Plug the Shelly in, connect it to Wi-Fi via the Shelly app, then let Home Assistant auto-discover it. Total setup time: about 5 minutes.

### TP-Link Tapo P110 (~£12)

The Tapo P110 also works with Home Assistant via the TP-Link Tapo integration. It's cheaper than the Shelly but relies on cloud polling rather than local communication, which means slightly delayed readings and dependency on TP-Link's servers.

[Check the TP-Link Tapo P110 on Amazon](https://amzn.to/4m9Yh9U)

For Home Assistant specifically, the Shelly is the better choice. For standalone use without Home Assistant, the Tapo's own app is more polished.

## Whole-Home Energy Monitoring

A smart plug tells you what your solar is generating, but it can't tell you what your house is consuming at the same time. For that, you need a whole-home [energy monitor](/blog/best-energy-monitor-plug-in-solar-uk).

### Emporia Vue 3 (~£130)

The Emporia Vue 3 uses CT clamps on your main supply cables to measure total home consumption. Combined with your solar smart plug data in Home Assistant, you can see exactly how much solar is offsetting grid use in real time.

[Check the Emporia Vue 3 on Amazon](https://amzn.to/4bUCQ9E)

The Emporia integrates with Home Assistant via the Emporia Vue integration. It provides per-second power readings and historical data. The combination of Emporia (total consumption) and Shelly (solar generation) gives you the complete energy picture.

## Building a Solar Dashboard

Once your devices are in Home Assistant, building a dashboard takes about 15 minutes. The key cards to include:

**Real-time gauges:** Current solar generation (watts) and current grid consumption (watts). Side by side, you can see at a glance whether solar is covering your demand.

**Daily energy bar chart:** Solar generated vs grid imported, day by day. This shows trends and helps you spot when panels need cleaning or when something's wrong.

**[Self-consumption](/blog/smart-meter-solar-self-consumption-uk) percentage:** A template sensor that calculates what proportion of your solar generation you're actually using versus exporting. Higher is better — it means you're using the free electricity rather than sending it to the grid at a fraction of the import price.

**Monthly savings tracker:** Multiply self-consumed solar by your grid tariff rate. Seeing a running total of money saved is motivating and helps justify the investment.

## Useful Automations

Home Assistant's automation engine lets you trigger actions based on solar output. Practical examples:

**Notification when generation exceeds demand.** "Your solar is producing more than you're using — good time to run the dishwasher." This nudges you to shift flexible loads into solar surplus periods.

**Smart plug scheduling.** Automatically turn on high-draw devices (immersion heater, tumble dryer via smart plug) when solar generation exceeds a threshold. This maximises self-consumption without manual effort.

**Battery charging control.** If you have a portable power station like the [EcoFlow](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system) [DELTA 2](/blog/ecoflow-delta-2-review-uk), a smart plug can start and stop its charging based on solar surplus. Only charge the battery when solar would otherwise be exported.

**Daily summary.** A notification at 9pm summarising the day's generation, consumption, self-consumption rate, and estimated savings.

## Getting Started

The minimum setup for solar monitoring in Home Assistant:

1. **Home Assistant** running on any supported hardware (Raspberry Pi 4, mini PC, old laptop)
2. **Shelly Plus Plug UK** on your inverter for generation data
3. **Emporia Vue 3** (optional) for whole-home consumption context
4. **15 minutes** to build your first dashboard

This combination gives you better solar monitoring than most professional rooftop installations provide — and it costs a fraction of the price.

For smart plug comparisons beyond Home Assistant, see our [monitoring guide](/blog/best-smart-plug-monitor-solar-uk). For the complete plug-in solar setup, check our [starter kit checklist](/blog/plug-in-solar-starter-kit-checklist-uk).
