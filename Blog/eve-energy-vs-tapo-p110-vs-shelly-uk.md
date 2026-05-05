---
title: "Eve Energy vs Tapo P110 vs Shelly: Best Solar Smart Plug UK"
slug: eve-energy-vs-tapo-p110-vs-shelly-uk
category: Comparisons
date: 2026-04-13
excerpt: "Definitive 3-way comparison of smart plugs for solar monitoring: price, ecosystem, accuracy, privacy. Which one is right for you?"
priority: 2
---

# Eve Energy vs Tapo P110 vs Shelly: Best Solar Smart Plug UK

Choosing a smart plug to monitor your plug-in solar system is harder than it should be. Three leading options—Eve Energy, TP-Link Tapo P110, and Shelly Plus Plug UK—each have different strengths. Here's a clear comparison to guide your decision.

## Quick Summary Table

| Factor | Eve Energy | Tapo P110 | Shelly Plus |
|--------|-----------|-----------|------------|
| **Price** | ~£35 | ~£15 | ~£20 |
| **Ecosystem** | Apple HomeKit (native) | TP-Link app (cloud) | Local WiFi (open) |
| **Cloud dependency** | Yes (required) | Yes (required) | No (optional) |
| **Accuracy** | ±2% | ±3–5% | ±2% |
| **App quality** | Premium, sleek | Polished, feature-rich | Functional, basic |
| **Privacy rating** | Standard (encrypted) | Basic (encrypted) | Excellent (local-only option) |
| **Home Assistant** | Via Matter | Community plugin | Native integration |
| **Setup time** | 10 mins (Apple only) | 5 mins | 15 mins |
| **Best for** | Apple users, HomeKit | TP-Link ecosystem, price | Privacy, automation |

## Price: The Tapo P110 Wins Decisively

At ~£15, the **Tapo P110** is the cheapest. Eve Energy (~£35) is 2.3× more expensive. Shelly Plus (~£20) sits in the middle.

If your budget is tight and you don't care about ecosystem lock-in, the Tapo P110 is unbeatable value. For most users, it's "good enough."

But price isn't the full story. Let's dig deeper.

## Ecosystem Lock-In: Apple, TP-Link, or Open?

### Eve Energy: Apple HomeKit Native

Eve Energy integrates natively with Apple HomeKit (Apple's home automation platform). If you own an iPhone, iPad, Apple Watch, or Mac, HomeKit is built-in.

**Advantages:**
- Zero setup hassle (scan HomeKit code, done).
- Native Siri voice control ("Hey Siri, is the solar monitor still running?").
- Automations work within the Apple ecosystem (e.g., turn on heating when solar output exceeds 300W).
- Matter support (future-proofing; Matter is a new open standard trying to replace proprietary ecosystems).

**Disadvantages:**
- Requires an Apple Home Hub (HomePod mini, Apple TV, or iPad) to control remotely. £89 for a HomePod mini.
- Android users can't use HomeKit at all.
- Premium price for this convenience.

**Verdict:** If you're deep in the Apple ecosystem, Eve Energy is worth the extra cost. If you don't own Apple products, skip it.

### Tapo P110: TP-Link Cloud Ecosystem

Tapo P110 uses the Kasa app (TP-Link's smart home platform). You create an account, pair the plug to your WiFi, and control it remotely via the cloud.

**Advantages:**
- Dirt-cheap.
- Works with any smartphone (iOS, Android).
- Cross-device integration (other TP-Link devices: bulbs, cameras, switches).
- Polished app with good feature set.

**Disadvantages:**
- Cloud-dependent (data goes to TP-Link servers).
- If internet drops, you lose remote monitoring.
- Privacy concern for some (cloud reliance).
- Limited open-standard support (no Matter in current v1).

**Verdict:** Best for budget-conscious buyers without strong privacy concerns. Works across both iOS and Android.

### Shelly Plus Plug UK: Local-First and Open

Shelly Plus Plug works *locally* on your home WiFi. No cloud required (though optional cloud integration exists for remote access).

**Advantages:**
- Best privacy (data stays local unless you enable cloud).
- Native Home Assistant integration (powerful open-source automation platform).
- Open API (developers can build custom integrations).
- Fallback: if internet drops, plug still works locally.

**Disadvantages:**
- Requires technical skill for full potential (Home Assistant setup takes 1–2 hours).
- Basic app (less polished than Tapo or Eve).
- No native voice assistant integration (Alexa or Siri).
- Slightly higher price than Tapo P110.

**Verdict:** Best for privacy-conscious users and Home Assistant enthusiasts. Overkill if you just want a simple "What's my solar output?" answer.

## Accuracy: Does It Matter?

| Plug | Accuracy | Notes |
|-----|----------|-------|
| Eve Energy | ±2% | Excellent, consistent. |
| Tapo P110 | ±3–5% | Acceptable, can vary by batch. |
| Shelly Plus | ±2% | Excellent, consistent. |

For a 400W micro-inverter:
- Eve Energy: 392–408W reading (actual: 400W).
- Tapo P110: 380–420W reading (actual: 400W).
- Shelly Plus: 392–408W reading (actual: 400W).

Over a full day, Tapo's variance can add up to 0.1–0.2 kWh error. Not huge, but if you're chasing precision (e.g., validating energy export for tax purposes), Eve or Shelly are better.

In reality, most users don't care about ±5% variance. As long as you see "Solar is generating ~400W" and "I exported ~1.2 kWh today," you're getting useful data.

## Real-World Recommendations by User Type

### User Type 1: Budget-First, No Strong Tech Opinions

**Choose: Tapo P110 (~£15)**

You want to know how much solar energy your system generates. Tapo P110 does this, costs less than lunch, and the app works. Done.

**Setup:** Download Kasa app, pair plug, view daily totals. 5 minutes.

**Limitation:** If internet drops, you can't check real-time data remotely. If you're frequently away from home and need 100% uptime, this is annoying.

### User Type 2: Apple-Centric Household

**Choose: Eve Energy (~£35)**

You have iPhones, an Apple Watch, a HomePod mini. HomeKit is your home automation hub. Eve Energy integrates seamlessly.

**Setup:** Scan HomeKit code, add to Home app. 10 minutes.

**Added value:** Control solar monitor via Siri. Automate based on solar generation (e.g., "When solar exceeds 300W, heat water"). Works offline if you have a Home Hub.

**Cost:** Total system cost = Eve Energy (£35) + HomePod mini (£89) = £124. More expensive but integrated.

### User Type 3: Privacy-First, Technical, Home Automation Enthusiast

**Choose: Shelly Plus Plug UK (~£20)**

You care about data independence. You might use Home Assistant or plan to eventually. You want local control and flexibility.

**Setup:** 
1. Pair Shelly to WiFi locally (via web interface).
2. (Optional) Add to Home Assistant for automations.
3. (Optional) Enable cloud backup if needed.

**Added value:** If internet fails, plug still works locally and logs data. Full API access for custom integrations. Home Assistant automations (e.g., "Turn on EV charger when solar export > 2 kW").

**Cost:** Shelly Plus (£20). Optional Home Assistant hardware (Raspberry Pi 4, ~£60). Total ~£80, but vastly more powerful than standalone solutions.

### User Type 4: Multi-Ecosystem Home (Android + Alexa + TP-Link)

**Choose: Tapo P110 (~£15)**

You're already using TP-Link Kasa (for smart lights, switches, cameras). Adding Tapo P110 integrates with your existing ecosystem.

**Setup:** Add to existing Kasa app. Instant cross-device automation.

**Added value:** Consistent UX across all your smart home devices. Alexa voice control via TP-Link Kasa skill.

## Installation and Safety: All Three Are Identical

Physically, all three plugs work the same way:

1. Plug into a wall socket near your solar inverter (or in a dedicated circuit for whole-home monitoring).
2. Plug inverter cable into the plug's socket.
3. Pair to WiFi and app.
4. Monitor power data in real time.

No electrical expertise required. Safest of all smart home devices (no rewiring, no high voltage).

## Common Questions

**Q: Can I use one of these as a legal export meter for Feed-in Tariff or Smart Export Guarantee?**

A: No. UK regulations require certified metering equipment (usually installed by your DNO). These smart plugs are for personal monitoring only. They can't be used for billing purposes.

**Q: What if the plug fails mid-measurement?**

A: All three have local data logging. Eve Energy and Shelly log data locally; Tapo logs to cloud. When the plug reconnects, historical data syncs. No data loss, just a gap in real-time display.

**Q: Do they work with different inverters?**

A: Yes. These plugs measure AC power. They work with any inverter (APsystems, Hoymiles, SMA, etc.) as long as the inverter outputs AC through a standard UK socket.

**Q: Can I measure multiple circuits simultaneously?**

A: You'd need multiple plugs (one per circuit). Common setup: Tapo P110 on solar outlet, [Emporia Vue 3](/blog/emporia-vue-3-review-uk) on main household consumption. Together, they give import/export/self-consumption data.

## Verdict

**Budget winner:** [Tapo P110](https://amzn.to/4m9Yh9U) (~£15). Best value, easy setup, good enough accuracy.

**Apple ecosystem:** [Eve Energy](https://amzn.to/4sSyWns) (~£35). Native HomeKit, Siri control, premium app.

**Privacy and automation:** [Shelly Plus Plug UK](https://amzn.to/4sfA9nK) (~£20). Local control, Home Assistant integration, best for tech-savvy users.

For most UK plug-in solar owners, start with a Tapo P110. If you find you need more (privacy, HomeKit, automations), upgrade. Don't over-engineer a simple monitoring task.

And pair any of these three with [Emporia Vue 3](/blog/emporia-vue-3-review-uk) (~£90) for whole-home consumption data. Together, they give you complete visibility into your solar system's value.

---

**See also:**  
[Emporia Vue 3 Review UK: Whole-Home Energy Monitoring](/blog/emporia-vue-3-review-uk)  
[Shelly Plus Plug UK Review: Best for Solar Monitoring?](/blog/shelly-plus-plug-uk-review)  
[APsystems EZ1-M Review UK](/blog/apsystems-ez1-m-review-uk)
