---
title: "Plug-In Solar WiFi Issues: Troubleshooting Guide"
slug: plug-in-solar-wifi-connection-problems-uk
excerpt: "Microinverter not connecting to WiFi? Here's how to fix connection issues with EcoFlow, Hoymiles, and APsystems devices."
date: 2026-08-14
category: Troubleshooting
cluster: 
---

## Common WiFi Issues

Plug-in solar inverters connect to WiFi for monitoring and [app control](/blog/ecoflow-stream-app-setup-monitoring-uk). When the connection fails, you lose monitoring data (but solar generation continues).

## Issue 1: Inverter Too Far from Router

Microinverters are often located outdoors — potentially 10-20m from your WiFi router.

**Fix**: Use a WiFi range extender or mesh system. Place the extender near the inverter's location. For [Hoymiles](/blog/hoymiles-hms800-review-uk) systems with a DTU, the DTU must be within WiFi range.

## Issue 2: 5GHz vs 2.4GHz

Most microinverters only support **2.4GHz WiFi**. Many modern routers default to 5GHz.

**Fix**: Ensure your router broadcasts a separate 2.4GHz network, or set up a dedicated 2.4GHz SSID for your solar devices.

## Issue 3: Wrong WiFi Password

Special characters in WiFi passwords can cause connection failures in some inverter setup processes.

**Fix**: Try a simpler WiFi password temporarily during setup, then change it back once connected.

## Issue 4: Router Firewall Blocking

Some routers block outbound connections from unknown devices.

**Fix**: Check your router's connected devices list. If the inverter appears but can't reach the cloud, check firewall rules and ensure ports 80, 443, and 8883 (MQTT) are open.

## Issue 5: Internet Outage

Your solar system generates power regardless of WiFi. But the monitoring app won't update until the connection is restored.

**Fix**: No action needed for generation. Monitoring data is typically buffered and synced when WiFi returns.

## Device-Specific Tips

### [EcoFlow STREAM](/blog/ecoflow-stream-review-uk)
Uses Bluetooth for initial pairing, then WiFi for ongoing monitoring. If Bluetooth pairing fails, restart the app and ensure Bluetooth is enabled on your phone.

### [Hoymiles](/blog/hoymiles-hms800-review-uk)
Requires a DTU (Data Transfer Unit). If the DTU loses connection, [reset it](/blog/how-to-reset-hoymiles-micro-inverter-uk) by power-cycling.

### [APsystems EZ1-M](/blog/apsystems-ez1-m-review-uk)
Has built-in WiFi. If it loses connection, press the reset button on the inverter for 5 seconds.

---


<div class="product-card featured">
<div class="pc-accent"></div>
<div class="pc-badge">Editor's pick</div>
<div class="pc-name"><a href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system" target="_blank" rel="noopener noreferrer sponsored">EcoFlow STREAM 800W Kit</a></div>
<div class="pc-price">From ~£799</div>
<ul class="pc-features">
<li>800W dual-panel plug-in solar kit</li>
<li>600Wh battery with smart scheduling</li>
<li>App monitoring with real-time generation data</li>
<li>Balcony, garden &amp; flat-roof mounts available</li>
</ul>
<div class="pc-cta"><a href="https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system" target="_blank" rel="noopener noreferrer sponsored">View on EcoFlow UK &rarr;</a></div>
<div class="pc-disclaimer">Affiliate link — we may earn a commission at no extra cost to you.</div>
</div>


### Does WiFi affect solar generation?

No. Your panels and inverter generate electricity independently of WiFi. WiFi is only for monitoring and smart features.

### Can I use an ethernet connection instead?

Some DTUs (like Hoymiles) support ethernet. The [EcoFlow STREAM](/blog/ecoflow-stream-uk-launch-september-2026) and [APsystems EZ1-M](/blog/apsystems-ez1-m-review-uk) are WiFi only.