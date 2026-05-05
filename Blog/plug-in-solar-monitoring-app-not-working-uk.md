---
title: "My Plug-in Solar App Isn't Showing Data — How to Fix It (Hoymiles, APsystems, EcoFlow)"
slug: plug-in-solar-monitoring-app-not-working-uk
excerpt: "The second most common post-install complaint. Your panels are probably generating fine — here's why the app disagrees and how to get it back."
date: "2026-04-11"
category: "Troubleshooting"
cluster: "Technical"
priority: 1
wordcount: 1000
---

You've installed your plug-in solar kit, plugged everything in, and downloaded the app. For a day or two it worked beautifully — you could see the watts flowing in real time. Then one morning: nothing. The app shows the plant as offline. Zero generation. Panic.

Before you assume something has failed, know this: monitoring connectivity issues are by far the most common complaint from plug-in solar owners in Germany and the Netherlands. In the vast majority of cases, your panels are generating perfectly. The data just isn't getting to the app.

## How the Monitoring Chain Works

Most plug-in solar kits — including Hoymiles-based systems like the [EcoFlow STREAM](/blog/ecoflow-stream-review-uk), and standalone APsystems kits — use a three-step data chain:

**Panels → Micro-inverter** (converts DC to AC, generates performance data wirelessly)  
**Micro-inverter → DTU/Gateway** (a small box, sometimes built into the inverter, that collects wireless data from the inverter)  
**DTU → Cloud → App** (the DTU connects to your WiFi and uploads to the manufacturer's servers, where the app pulls it)

Any break in that chain produces the same result in the app: "plant offline." But the panels are almost certainly still generating electricity — the monitoring and the power generation are completely independent.

## The Most Common Culprits

**1. 2.4GHz vs 5GHz WiFi**

This is responsible for a large proportion of connectivity failures. The DTU (data transfer unit / gateway) only connects to 2.4GHz WiFi networks. If your router broadcasts a combined SSID — the same name for both 2.4GHz and 5GHz bands — the DTU may have connected to 5GHz during setup and then lost the signal when you walked away.

Fix: Log into your router settings and either separate the two bands into different network names, or temporarily disable 5GHz during the DTU setup process. Reconnect the DTU to the 2.4GHz network specifically.

**2. DTU firmware needs updating**

Hoymiles, APsystems, and EcoFlow all release firmware updates for their gateways. Outdated firmware is a known cause of DTU disconnecting from the cloud when inverters start generating in the morning — a frustratingly specific bug that affects older firmware versions. The fix is to update via the app (when the DTU is online) or by manually accessing the DTU's web interface via your local network.

**3. Cloud server issues**

Hoymiles's S-Miles Cloud and APsystems's EMA platform occasionally go down or experience regional outages. If your DTU is showing as connected on the local network but the app still shows offline, check the manufacturer's status page or social media for service disruptions. These usually resolve within a few hours.

**4. DTU placed too far from the inverter**

The DTU communicates with the micro-inverter over a wireless protocol (typically 2.4GHz or 900MHz depending on the brand). Thick walls, metal frames, and distance all reduce signal quality. If the DTU is inside the house and the inverter is on an exterior wall or balcony, there may be marginal signal — enough to work sometimes, but unreliable.

Fix: Move the DTU closer to the inverter, or if it's a Hoymiles system, try a DTU-Pro which has better range. Some users run a short Ethernet cable to position the DTU more strategically.

**5. The inverter itself has lost pairing**

This is less common but does happen after power cuts or firmware updates. The DTU loses the inverter ID and needs to be re-paired. The process varies by brand, but usually involves holding the button on the DTU for 10 seconds and allowing it to scan for inverters again. Check the manufacturer's setup guide for your specific model.

## Hoymiles-Specific Issues

The Hoymiles S-Miles system is used in EcoFlow STREAM kits and many standalone Hoymiles bundles. A known issue with early firmware: if the monitoring plant was created in the app before the DTU came fully online, the plant configuration doesn't sync correctly and data stops uploading. 

Fix: In the S-Miles Cloud app, go to your plant settings and trigger a manual "re-sync" or delete and recreate the plant. This sounds drastic but doesn't affect the actual generation — it only resets the data logging configuration.

If the DTU disconnects every time the inverter starts generating in the morning, this is almost certainly a firmware bug. Update to the latest version.

## APsystems-Specific Issues

APsystems EZ1-M owners frequently report the ECU (their equivalent of a DTU) going offline after router restarts or ISP changes. The ECU needs to be power-cycled and reconnected after any significant network change. If you've recently switched broadband provider or router, this is your first step.

## EcoFlow App (STREAM Kit)

The [EcoFlow STREAM kit](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system) uses EcoFlow's own app rather than Hoymiles's S-Miles directly, even though it uses a Hoymiles inverter. Connectivity issues here are usually resolved by logging out and back into the EcoFlow app, or by unlinking and re-linking the kit in app settings. EcoFlow's support response is generally faster than the inverter-brand apps.

## When It's Probably the Inverter

If you've ruled out connectivity issues and the [smart plug](/blog/best-smart-plug-monitor-solar-uk) on your inverter's AC output ([Tapo P110](https://amzn.to/4m9Yh9U) works well for this) confirms zero power output even on a sunny day, you may have a genuine inverter fault. Check for:

- Status LED on the inverter showing red or flashing in an unusual pattern
- Any error codes displayed in the app when you do get momentary connectivity
- A tripped MCB or RCD at your consumer unit

For detailed inverter fault-finding, see our [troubleshooting guide](/blog/plug-in-solar-not-generating-troubleshooting-uk) and our guide to [micro-inverter error codes](/blog/micro-inverter-error-codes-uk).

## The Practical Workaround

While you sort out the monitoring, plug a [smart energy monitor like the Tapo P110](https://amzn.to/4m9Yh9U) into the AC outlet between the inverter and the wall socket. It tracks power independently of the manufacturer's cloud system and gives you a local reading you can check any time. It also acts as a backup record if the cloud logging has a gap.
