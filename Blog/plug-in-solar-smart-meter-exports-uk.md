---
title: "Plug-in Solar and Your Smart Meter: Will It Record Exports?"
slug: plug-in-solar-smart-meter-exports-uk
category: Technical
date: 2026-04-13
excerpt: "Why export recording matters for plug-in solar: which meters capture it, how to check yours, and what it means for SEG payments and future tariffs."
---

# Plug-in Solar and Your Smart Meter: Will It Record Exports?

One of the first technical questions plug-in solar owners ask is: "Will my smart meter actually measure what I'm exporting to the grid?"

The answer is: **it depends on which smart meter you have.**

This matters because export data determines whether you're eligible for the Smart Export Guarantee (SEG), whether you can access premium tariffs like Octopus Flux, and—crucially—whether you have visibility into what your system is actually doing.

Let's break down which meters work, which don't, and what to do if yours won't record exports.

---

## The Three Types of Smart Meter in UK Homes

### SMETS2 Meters (2015–Present): The Gold Standard

**Can record exports?** Yes, reliably.

SMETS2 is the current UK standard. These meters have:
- A small LED display
- A button to cycle through screens
- Bidirectional communication (two-way data flow to the supplier)
- **Separate export and import registers**

All SMETS2 meters are capable of recording exports in half-hourly intervals. This is mandatory under the specification.

**If you have a SMETS2 meter, you're fine.** Exports will be recorded automatically.

**How to identify:** Look at your meter. If it has a button on the front and a small display screen showing numbers, it's almost certainly SMETS2 (assuming installed after ~2015).

### SMETS1 Meters (2010–2015): The Problem Child

**Can record exports?** Sometimes, but often not.

SMETS1 was the first-generation smart meter rollout. Many of these have:
- Limited communication (often one-way only)
- No built-in export register
- Basic displays or no display at all

**The problem:** When SMETS1 meters were installed, most homes didn't have solar. The spec didn't mandate export recording. Some SMETS1 meters can be retrofitted, but many cannot.

If you have a SMETS1 meter and you're installing solar, you might have zero visibility of what you're exporting. This is a genuine issue.

**How to identify:** Check your meter. If it's square, pre-2015, lacks a button, or shows only one digit at a time, it's likely SMETS1.

**What to do:** Contact your energy supplier or DNO and ask whether your SMETS1 meter records exports. Some can; most can't. If yours can't, request an upgrade to SMETS2 (free under Ofgem rules).

### Traditional Analog Meters (Pre-2010): No Recording

**Can record exports?** No, not at all.

Traditional mechanical meters only count electricity flowing in one direction (grid to home). They have no way to measure reverse flow (home to grid).

If you have an old dial meter and you're installing solar, **you have no way to verify exports.** This is increasingly rare (most homes have been upgraded), but worth checking.

**What to do:** Request a smart meter installation from your supplier. It's your right under Ofgem's smart meter rollout programme, and it's free.

---

## Why Export Recording Matters

### 1. Claiming the Smart Export Guarantee (SEG)

The SEG is a government-backed scheme. Energy suppliers pay you for surplus electricity you export to the grid.

**But here's the catch:** Most suppliers **require export data to pay you.** If your meter doesn't record exports, you can't prove how much you exported, so they won't pay.

**Exception:** Octopus Energy has an informal arrangement where they'll estimate your export (based on generation + consumption) even if your meter doesn't record it. But this is atypical.

**Bottom line:** Without export recording, you lose SEG income. This might be £30–100/year, depending on system size.

### 2. Accessing Premium Tariffs

Tariffs like Octopus Flux (which offers premium evening export rates of 20–24p/kWh) explicitly require export metering.

If your meter doesn't record exports, you can't use these tariffs effectively, even if the supplier would otherwise let you.

### 3. Monitoring Your System

Real visibility into your export is invaluable for:
- Confirming your solar is working
- Diagnosing faults (if export drops unexpectedly)
- Optimising battery charge/discharge
- Understanding your consumption patterns

Without export recording, you're flying blind.

### 4. Future-Proofing

As the grid decarbonises and distributed generation becomes central to UK energy policy, export metering will become even more important. Suppliers will increasingly tie incentives to actual measured exports, not estimates.

Having your meter set up now means you're not scrambling to upgrade later.

---

## How to Check If Your Meter Records Exports

### Method 1: Ask Your Supplier Directly

Call or email your energy supplier and say: "I have a smart meter and I'm installing solar. Can you confirm whether my meter records exports?"

They can tell you instantly.

### Method 2: Check Your Meter Display

Press the button on your meter and look for a screen showing "Export" or register number "002."

**Example SMETS2 screen:**
```
00 002 00123.456 kWh
```

If you see this (or something similar), your meter records exports.

**If all screens show only import data (register 001) or generic info, exports aren't recorded.**

### Method 3: Check Your Supplier's Website or App

Log in to your online account and look for:
- Export data section
- "Generation" or "export" metrics
- Half-hourly export breakdowns

If these exist, your meter records exports. If they don't, it probably doesn't.

### Method 4: Contact Your DNO

Your DNO (Distribution Network Operator—the company that maintains the wires in your area) has records of all meters in their network. They can tell you whether yours records exports.

**Find your DNO:**
- Enter your postcode at [energynetworks.org](https://energynetworks.org/) or ask your supplier

---

## What If Your Meter Doesn't Record Exports?

### Option 1: Request a SMETS2 Upgrade (Free)

Under Ofgem rules, you have the right to a free smart meter upgrade. Most suppliers will arrange this within 2–4 weeks.

**Process:**
1. Contact your supplier
2. Request a smart meter upgrade
3. Confirm you want export recording (mention you're installing solar)
4. Installer arranges a convenient time
5. Old meter is replaced; new meter is activated

**Cost:** Free. No hidden charges.

### Option 2: Install Independent Monitoring (Interim Solution)

While waiting for a meter upgrade, you can monitor exports with third-party equipment:

**[Emporia Vue 3](https://amzn.to/4bUCQ9E) (~£90):** Installed at your consumer unit, it measures real-time import and export flows. It won't help you claim SEG (suppliers won't accept this data), but it gives you visibility into what's happening.

**[Tapo P110](https://amzn.to/4m9Yh9U) (~£15):** Plug-in monitor for individual appliances. Useful for understanding consumption but doesn't measure whole-home export.

### Option 3: Accept Estimated Export Payments

If your supplier offers this (Octopus does), you can receive estimated SEG payments based on:
- Your generation (calculated from grid data)
- Your consumption (estimated from usage patterns)
- An assumed self-consumption ratio (typically 60–70%)

**Example:** If you generated 1,000 kWh and consumed 650 kWh, you exported 350 kWh.

This is less accurate than actual metering, but it's better than nothing.

---

## The Export Data Landscape: What's Recorded Where

If you have a SMETS2 meter recording exports, here's where that data lives:

| Data Location | Who Has It | Frequency | Accuracy |
|---------------|-----------|-----------|----------|
| **Your smart meter** | You (by reading it) | Half-hourly | 100% (ground truth) |
| **Supplier's backend system** | Your supplier | Half-hourly | 100% (same as meter) |
| **Supplier's app/website** | You (via login) | Half-hourly (sometimes delayed 24h) | 100% |
| **Your DNO** | DNO, Ofgem | Half-hourly (via aggregation) | 100% |
| **Third-party monitor (Vue 3, etc.)** | You | Real-time | 95–99% (measurement error) |

**The hierarchy:** Your physical meter is the ground truth. Everything else is a copy or estimate of that data.

---

## Half-Hourly vs. Quarterly Recording

**SMETS2 meters record export data at half-hourly intervals.** This means your smart meter captures 48 data points per day of export.

This is important because:
1. It's accurate (no averaging or estimation)
2. It allows suppliers to offer dynamic tariffs (which vary hourly or half-hourly)
3. It enables grid balancing services (where you're paid to export at specific times)

**Older systems (pre-smart meter):** Manual meter readings every three months. No visibility into when exports occurred.

**Quarterly data:** Even if your old meter is manually read, it only gives you one data point per three months—useless for detailed analysis.

---

## Export Recording and G98 Notification

Your G98 notification (filed with your DNO when your solar was installed) is independent of export recording.

**G98 = You have generation equipment connected**
**Export meter = You can measure what you're exporting**

Both are useful, but separate. You can have a G98 without export metering (but then you can't claim SEG). You can't have export metering without G98 (because you can't legally export without notifying the DNO).

---

## Common Questions

### "If my meter doesn't record exports, do I generate zero?"

No. You're still generating solar electricity. You're just not measuring how much you're exporting. It still benefits you (self-consumption), you just can't claim SEG payments.

### "Can I upgrade my SMETS1 meter myself?"

No. Meter upgrades must be done by your supplier's approved installer. But it's free and your legal right.

### "If I get a new meter, will I lose my old consumption history?"

No. Your old readings are transferred to the new meter's system. Your supplier can see your historical data even though the physical meter changed.

### "Does export metering affect my privacy?"

Half-hourly data is more granular than estimated bills. However, this data is:
- Protected under data protection regulations (GDPR)
- Used only by your supplier, your DNO, and Ofgem (for aggregation)
- Not sold to third parties
- Not used for marketing

Your privacy is protected. Transparency into your consumption actually helps you control costs better.

### "What if I want to install solar today but my meter doesn't record exports?"

You can still install solar and benefit from self-consumption (saving 24p/kWh on peak hours). You just won't be able to claim SEG payments until your meter is upgraded. Request the upgrade now; meanwhile, enjoy your solar savings.

---

## The Practical Takeaway

**Before you install plug-in solar:**

1. **Check your meter type** (SMETS2, SMETS1, or analog)
2. **Confirm export recording capability** with your supplier
3. **Request a SMETS2 upgrade if needed** (free, takes 2–4 weeks)
4. **Wait for the upgrade before installing solar** (optional but recommended)

**If you've already installed without export recording:**

1. **Request a meter upgrade immediately**
2. **Ask your supplier about estimated SEG payments** while you wait
3. **Install an independent monitor like [Emporia Vue 3](https://amzn.to/4bUCQ9E)** for visibility
4. **Once upgraded, you'll unlock premium tariffs and accurate export data**

**Export metering isn't essential for solar to save you money.** Self-consumption (using your own generation) works whether or not you measure it. But export metering unlocks premium tariffs, SEG payments, and—most importantly—visibility into what your system is actually doing.

It's worth getting right.

Want help understanding your meter readings in detail? See our guide to [reading your smart meter with plug-in solar](/blog/how-to-read-smart-meter-plug-in-solar-uk).
