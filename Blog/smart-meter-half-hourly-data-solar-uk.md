---
title: "How to Use Half-Hourly Smart Meter Data to Optimise Your Solar Panels"
slug: smart-meter-half-hourly-data-solar-uk
excerpt: "Your SMETS2 meter records 48 data points per day. Here's how to read that data, spot patterns, and use it to squeeze more value from your plug-in solar system."
date: "2026-05-04"
category: "Monitoring"
cluster: "smart-meters"
priority: 4
wordcount: 1500
author: "Pluggedin.solar"
---

## What Half-Hourly Data Looks Like

Your SMETS2 smart meter records your electricity import (and export, if enabled) every 30 minutes — 48 readings per day. Most supplier apps display this as a bar chart. Here's how to interpret it with solar.

**A typical day without solar:** roughly flat bars through the morning (base load — fridge, router, standby), spikes at breakfast (kettle, toaster) and dinner (oven, hob), and a gradual increase through the evening (lighting, TV, heating).

**A typical sunny day with plug-in solar:** the same pattern, but with a visible valley between roughly 09:00 and 16:00 where your import drops significantly. On the best days, the midday bars may be zero or show export instead of import.

## Where to Find Your Data

**Octopus Energy:** excellent half-hourly data in the app, including separate import and export views. Also available via their API for tech-savvy users.

**OVO:** half-hourly data available in the app under "Usage."

**British Gas:** available but sometimes delayed by 24–48 hours.

**E.ON:** half-hourly data in the E.ON Next app.

**EDF:** available in the app, though the interface is less detailed than Octopus.

If your supplier's app doesn't show half-hourly data, try the **Loop** app (free, connects to your meter via DCC) or **Bright** app.

## Five Patterns to Look For

### 1. The Midday Valley

This is your solar at work. A deep valley (low or zero import) during 10:00–14:00 means good self-consumption. If the valley is shallow (import still high), your base load may be higher than your solar output, or shading is reducing generation. Compare against your [inverter app data](/blog/smart-meter-solar-panel-app-monitoring-uk) to check.

### 2. Export Spikes

If you see export bars during the middle of the day, you're generating more than you're using. This is fine — but each exported kWh is worth only 4–15p vs the 24p+ you save by using it. Consider [shifting loads to these hours](/blog/smart-meter-solar-self-consumption-uk).

### 3. The Evening Ramp

When import climbs steeply between 16:00 and 19:00, that's your household demand exceeding fading solar output. If you have a [battery](/blog/battery-storage-vs-no-battery-plug-in-solar-uk), this is when it should be discharging. On a [ToU tariff](/blog/smart-meter-time-of-use-tariffs-solar-uk), this is the expensive window.

### 4. Overnight Base Load

Check your 01:00–05:00 bars. This is your always-on load: fridge, freezer, router, standby devices. Typical UK households draw 200–400W overnight. If yours is significantly higher, look for devices left on unnecessarily. Reducing base load means your solar covers a higher proportion of daytime use.

### 5. Weekend vs Weekday

If you work from home or are retired, your weekday pattern likely shows better solar utilisation (you're there to use it). If you're out during the day Monday to Friday, your weekday self-consumption may be lower. This is where timers and a battery help most.

## Practical Optimisations Based on Data

**If you see consistent midday export:** set your dishwasher, washing machine, and tumble dryer to run between 11:00 and 14:00 using delay timers. Each shifted load converts export (low value) to self-consumption (high value).

**If your evening ramp is steep:** a battery is likely cost-effective. Your half-hourly data tells you exactly how many kWh you import between 16:00 and 22:00 — that's the maximum a battery could offset.

**If your overnight base load is high:** audit standby devices. A smart power strip that kills standby at bedtime can save 1–2 kWh/night. That's £90–180/year.

**If cloudy days show no difference to non-solar days:** your panels may have a shading issue during overcast conditions, or panel degradation. Check with a [generation monitor](/blog/best-energy-monitor-plug-in-solar-uk).

## Exporting Data for Deeper Analysis

For people who want to go further, some supplier APIs (notably Octopus) let you download half-hourly data as CSV. You can then:

- Chart it in a spreadsheet to see seasonal trends
- Calculate monthly self-consumption percentages
- Compare against [PVGIS expected yield data](/calculator) for your location
- Track panel degradation over years

This is optional — most people get enough insight from the app charts alone. But if you're the type who enjoys data, half-hourly readings are rich material.

## Related Reading

- [How to read your smart meter with solar](/blog/how-to-read-smart-meter-plug-in-solar-uk)
- [Using your smart meter to maximise self-consumption](/blog/smart-meter-solar-self-consumption-uk)
- [Best energy monitors for plug-in solar](/blog/best-energy-monitor-plug-in-solar-uk)
