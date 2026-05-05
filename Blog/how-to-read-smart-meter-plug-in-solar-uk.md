---
title: "How to Read Your Smart Meter with Plug-in Solar"
slug: how-to-read-smart-meter-plug-in-solar-uk
category: Practical Guides
date: 2026-04-13
excerpt: "Step-by-step guide to reading your smart meter with plug-in solar: what the import/export registers mean, how to calculate self-consumption, and why it matters."
---

# How to Read Your Smart Meter with Plug-in Solar

Your smart meter is more than a billing device—it's your window into what your plug-in solar system is actually doing. But the display can be confusing, especially when both import and export are happening. Here's how to decode it.

## What Type of Smart Meter Do You Have?

First, check if you have a [SMETS2](/blog/smets1-vs-smets2-solar-panels-uk) meter (most recent UK meters) or an older SMETS1. This matters because only SMETS2 meters are guaranteed to record exports.

**SMETS2 meters (2015–present):** All of them record both import and export.

**SMETS1 meters (2010–2015):** Many of them cannot record exports—they only count electricity flowing into your home. If you have an older meter and you're exporting solar, you won't have reliable export data.

**Traditional (pre-2010) meters:** These definitely don't record exports.

**To check:** Look at the meter itself. Modern smart meters have a small LED display at the top and a button below. Older meters may lack the button or have a traditional mechanical dial.

## The Smart Meter Display: Reading the Basics

Press the button on your smart meter. It will cycle through several screens. The key ones are:

### Screen 1: SMETS2 Device View
You'll see something like:
```
SMETS2
001
```

This is just a label. Keep pressing to get to the useful data.

### Screen 2: Import Meter Register (Consumption)
```
00 001 23456.789 kWh
```

This is your **import register**—the total electricity you've consumed from the grid since the meter was installed. The number only goes up.

The format breaks down as:
- First number (00) = meter type identifier
- Second number (001) = register number
- Large number (23456.789) = **total units imported (kWh)**

**What it means:** If this read 23,456.789 kWh a week ago and now reads 23,467.012 kWh, you've imported 10.223 kWh from the grid in seven days.

### Screen 3: Export Meter Register (Generation)
```
00 002 02345.123 kWh
```

This is your **[export register](/blog/smart-meter-export-register-solar-uk)** (SMETS2 only). The format is identical:
- Register number will be 002 (export, not import)
- Large number = **total units exported to the grid**

**What it means:** If this read 2,345.123 kWh a week ago and now reads 2,357.456 kWh, you've exported 12.333 kWh to the grid in seven days.

### Screen 4: Current Power
```
P+ 0003 kW
P- 0000 kW
```

This is the **real-time power flow**, updated every few seconds:
- **P+ (positive)** = power being imported from the grid (Watts; this example shows 3,000W or 3 kW)
- **P- (negative)** = power being exported to the grid (Watts; this example shows 0W)

**What it means in real time:**
- If P+ is high and P- is low, you're drawing from the grid
- If P+ is low and P- is high, you're exporting
- If both are low, your home consumption matches your generation (perfect balance)

---

## What If You Have SMETS1 or No Smart Meter?

**SMETS1:** You might have an export register (Screen 3), but it often doesn't work or isn't updated. Check if the number changes week to week. If it stays at zero, your meter isn't recording exports.

**No smart meter (older meter):** You have no way to verify exports. Your supplier can't see them either, which is why you might not be eligible for [SEG](/blog/plug-in-solar-smart-meter-exports-uk) payments.

**Solution:** Request a smart meter upgrade from your supplier (free, your right under Ofgem rules). Installation usually takes 1–2 weeks.

---

## How to Calculate Your Self-Consumption

**Self-consumption** is the most important metric for plug-in solar owners. It's the percentage of energy you generate that you use yourself (rather than exporting).

**Formula:**

```
Self-consumption (%) = Generated - Exported / Generated × 100
```

**Or more simply:**

```
Self-consumption (%) = (1 - Exported / Generated) × 100
```

### Example Calculation

**One week of data:**

| Metric | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday | **Total** |
|--------|--------|---------|-----------|----------|--------|----------|--------|-----------|
| Import increase (kWh) | 8 | 7 | 9 | 6 | 5 | 12 | 14 | **61 kWh** |
| Export increase (kWh) | 3 | 4 | 2 | 5 | 6 | 0.5 | 0.5 | **21 kWh** |

From this data:
- **Total imported:** 61 kWh
- **Total exported:** 21 kWh
- **Total generated:** Import + Export = 61 + 21 = 82 kWh
- **Self-consumption:** (1 - 21/82) × 100 = **74%**

This is excellent. A 74% self-consumption rate means you're using three-quarters of your generation directly, avoiding peak rates.

---

## Why Your IHD (In-Home Display) Looks Confusing

If your smart meter came with an IHD (small wireless display), it might show cryptic data:

```
Consumption: 10.4 kWh
Export:      5.2 kWh
```

**Important:** The IHD shows "today's" data, but "today" might mean "since midnight" or "since last meter read" (varies by supplier). It's not real-time—it updates every 30 minutes to an hour.

**Also important:** Many IHDs don't show "generation." They show import and export, and you calculate generation yourself (Import + Export).

If your IHD shows confusing negative numbers or zero exports, that might be a display glitch. Always verify against the physical meter screen.

---

## Reading Your Meter Over Time: The Best Approach

To build a clear picture of your solar performance, take readings **at the same time each week** and log them:

| Date | Import (kWh) | Export (kWh) | Net (Import - Export) | Days | Generation Estimate |
|------|--------------|--------------|----------------------|------|---------------------|
| April 13 | 23,456 | 2,345 | 21,111 | - | - |
| April 20 | 23,472 | 2,378 | 21,094 | 7 | 16 + 33 = 49 kWh |
| April 27 | 23,488 | 2,415 | 21,073 | 7 | 16 + 37 = 53 kWh |

**How to fill this in:**

1. **Import change:** New reading minus old reading. This is the grid electricity you bought.
2. **Export change:** New reading minus old reading. This is energy you sent to the grid.
3. **Generation estimate:** Import change + Export change. (If you imported 16 kWh and exported 33 kWh, you generated 49 kWh total.)

After four weeks, you'll have solid data on:
- Weekly generation (useful for seasonal trends)
- Self-consumption rate (critical for tariff optimisation)
- Grid import (useful for comparing to bills)

---

## Common Meter Readings: Troubleshooting

### "My export register hasn't changed in weeks"

**Possible causes:**
1. Your meter is SMETS1 and doesn't record exports (most likely)
2. Your solar is broken or undersized
3. You're consuming all generation (possible but unlikely with 800W panels)
4. Your meter hasn't been read remotely (try asking supplier to take a manual read)

**Fix:** Request a SMETS2 upgrade, or ask your supplier to take a manual export reading.

### "My import register is going up faster than before solar was installed"

**This shouldn't happen.** If it is, either:
1. You're running more appliances (washing machine, dishwasher, heating)
2. Your meter is faulty
3. Your solar panel is unplugged or broken

**Check:** Does your real-time power screen (P+ / P-) show zero exports? If so, your panel isn't generating.

### "The numbers jump around wildly"

**This is normal.** Smart meters update in half-hourly intervals, and readings can be recorded slightly out of sync. Take readings at consistent times (e.g., 9 AM) to reduce noise.

### "My supplier's website shows different numbers than my physical meter"

**This is also normal.** Suppliers update their websites at different times (sometimes 24 hours delayed). The physical meter is always the ground truth.

---

## Using Meter Data to Choose a Tariff

Your self-consumption rate and generation profile help you pick the best tariff:

**High self-consumption (70%+)?**
- [Octopus Go](/blog/octopus-go-vs-intelligent-solar-uk) is fine (simple 4-hour off-peak window)
- You don't need Flux or advanced tariffs

**Lower self-consumption (40–50%)?**
- Consider Octopus Intelligent or Flux
- You're exporting a lot; premium export rates help

**Variable generation (sunny days vs. rainy)?**
- Look at tariffs with strong off-peak charging (Go, Intelligent Go, Flux)
- Battery ownership becomes more valuable

---

## Enhancing Your Meter Data with Monitoring Tools

Your smart meter gives you import/export data, but not granular breakdown. To see which appliances are drawing power, consider:

**[Tapo P110](https://amzn.to/4m9Yh9U) (~£15):** Plug-in smart meter for individual appliances. Useful for understanding what's consuming power (e.g., "my tumble dryer uses 3 kW").

**[Emporia Vue 3](https://amzn.to/4bUCQ9E) (~£90):** Whole-home monitor installed at your consumer unit. Shows real-time flows to the grid, consumption by circuit, and historical trends. This is the gold standard for solar owners and pairs beautifully with your smart meter data.

Both tools complement your smart meter readings and give you far deeper insights into your solar system's performance.

---

## Final Checklist

- [ ] Check if you have SMETS2 (will record exports)
- [ ] Take a baseline meter reading (import and export) before solar, if you haven't already
- [ ] Take consistent weekly readings at the same time
- [ ] Calculate self-consumption monthly
- [ ] Cross-reference your meter data with your supplier's website and bills
- [ ] Log data in a spreadsheet for long-term trend analysis

Your smart meter is telling you the story of your solar investment. Learn to read it, and you'll understand exactly how your system is performing.

Want more detail on your bill timing? See [Does Plug-in Solar Affect Your Energy Bill Immediately?](/blog/does-plug-in-solar-affect-energy-bill-immediately-uk)
