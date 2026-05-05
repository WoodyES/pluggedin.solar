---
title: MPPT vs PWM Charge Controllers for Plug-in Solar UK
slug: mppt-vs-pwm-charge-controllers-solar-uk
category: Technical
date: 2026-04-14
excerpt: PWM wastes voltage. MPPT converts it to current and recovers 15–30% more energy. Here's which you actually need.
---

# MPPT vs PWM Charge Controllers for Plug-in Solar UK

If you're building an off-grid system — a shed, cabin, caravan, or battery-backed setup — you'll encounter charge controllers. They manage power from your solar panels into a battery.

Two types exist: PWM and MPPT. Most people should use MPPT, but PWM has its place.

For grid-tied plug-in solar (the main focus of pluggedin.solar), this doesn't apply — micro-inverters handle power conversion instead. But if you're thinking about batteries or off-grid scenarios, read on.

## PWM: Simple, Cheap, Wasteful

**PWM** stands for Pulse Width Modulation. It's the simpler, older approach.

Here's how it works:

Your 50V solar panel connects directly to a 48V battery bank. The PWM controller rapidly switches the connection on and off to prevent overcharging. When the battery is full, it switches off. When the battery drops below full, it switches back on.

**The problem**: Your 50V panel is trying to deliver power into a 48V battery. That 2V difference has to go somewhere — it's simply wasted as heat.

More broadly, PWM always operates the battery *voltage*, not the panel's optimal voltage. If the battery is 48V, the panel is forced to output at 48V even if its maximum power point is 50V or 55V. That mismatch wastes energy.

**Efficiency: 60–80%**, depending on the voltage mismatch.

## MPPT: Complex, Expensive, Efficient

**MPPT** stands for Maximum Power Point Tracking. It's the smarter, modern approach.

An MPPT controller uses a DC-to-DC converter to step the panel voltage up or down to whatever voltage the battery needs, while simultaneously optimizing the panel's operating voltage to extract maximum power.

**Example**:
- 50V panel at 8A (400W)
- 48V battery
- MPPT converts: 50V × 8A → 48V × 8.3A

The same power (400W) but at the battery's voltage. No wasted voltage.

More importantly, the MPPT tracks the panel's maximum power point continuously. If cloud cover changes the panel's optimal voltage from 50V to 48V, the MPPT adjusts to keep extracting maximum power.

**Efficiency: 90–98%**, with the overhead lost to converter components.

## The Efficiency Gain: 15–30% More Energy

In real-world conditions, MPPT systems recover **15–30% more energy** than PWM.

This depends on:
- How far the battery voltage is from the panel's optimal operating point
- Weather (clouds change optimal voltage constantly)
- System size

**Example**: A 400W off-grid solar system with PWM controller on a typical UK day:
- PWM effective output: ~300W average (25% loss to voltage mismatch + inefficiency)
- MPPT effective output: ~370W average (7% loss to converter)
- Difference: **70W, or 23% extra energy**

Over a year, that's hundreds of extra kWh going into your battery — powering hours of light, heating, or appliances.

## When PWM Actually Makes Sense

PWM is still worth considering if:

### 1. Small Systems Where Voltage Already Matches

If your panel voltage naturally matches your battery voltage, PWM's inefficiency disappears.

**Example**: A 12V caravan with 12V panels and a 12V battery. Panel voltage is already at the battery voltage. PWM wastes nothing.

But even here, clouds change the optimal voltage. MPPT still wins, and modern MPPT controllers for 12V systems cost only £30–50 more than PWM.

### 2. Educational or Experimental Projects

If you're learning about solar or building a temporary prototype, PWM's simplicity (one chip, few components) makes it easier to understand and troubleshoot.

Not a great reason to use it, but it exists.

### 3. Extreme Budget Constraints (Rare)

PWM controllers cost £20–50. MPPT costs £100–300 depending on voltage and current rating.

In the developing world or very remote locations, that price difference might be decisive. In the UK, the energy you recover with MPPT pays back the extra cost in 2–3 years.

## Grid-Tied Plug-in Solar: You Don't Need Either

Here's the key point: **If you're installing a grid-tied plug-in solar system, you have neither a PWM nor an MPPT charge controller.**

Your system has a **micro-inverter** instead.

The micro-inverter includes built-in power conditioning electronics that do the job of MPPT — they continuously track the panels' optimal operating point and convert DC to AC for the grid. It's MPPT on steroids, optimised specifically for the AC grid.

So if you're shopping for a standard plug-in solar kit, ignore PWM and MPPT entirely. Your micro-inverter handles it.

## Off-Grid Systems: Always Use MPPT

If you're building an off-grid solar system for a shed, cabin, caravan, or battery-backed home, **MPPT is mandatory**.

The energy recovery (15–30% more) is too valuable to ignore. Even at 2–3 years payback on the extra cost, you'll keep the system for 20–25 years. That's an extra £300–600 of energy generation paid for by the controller you buy in year one.

### Sizing an MPPT Controller

Choose based on:

1. **Panel voltage**: Your panels' open-circuit voltage (Voc) — usually 40–60V for most modern panels
2. **Panel current**: Your panels' maximum current (Isc) — usually 8–12A per panel
3. **Battery voltage**: 12V, 24V, or 48V bank

**Example**: Two 400W panels (50V, 8A each) connected in parallel (50V, 16A) charging a 48V battery.

You need an MPPT rated for:
- Input voltage: 50V (or higher, with headroom)
- Input current: 16A
- Output voltage: 48V
- Output power: 400W+ (ideally 500W+)

Popular UK options: Victron SmartSolar (£200–400 depending on rating), Epever (£100–250), AIMS Power (£150–350).

### Bonus: Monitoring

Many modern MPPT controllers (especially Victron) include remote monitoring via WiFi or Bluetooth. You can check:
- Panel voltage and current
- Battery charge state
- Daily energy harvested
- Efficiency

This data is invaluable for troubleshooting and understanding your system's performance.

## Do You Need a Multimeter?

Yes. Whether you buy PWM or MPPT, you'll want a [multimeter like the Fluke 117](https://amzn.to/4bSN4aq) (£199) to:

- Verify panel voltage under load
- Check battery voltage
- Test connections for continuity
- Troubleshoot faults

A multimeter pays for itself the first time you diagnose a loose connector or bad panel.

## Summary: PWM vs MPPT

| Factor | PWM | MPPT |
|--------|-----|------|
| **Efficiency** | 60–80% | 90–98% |
| **Cost** | £20–50 | £100–300 |
| **Annual energy gain vs PWM** | Baseline | +15–30% |
| **Payback on extra cost** | — | 2–3 years |
| **Reliability** | Good | Excellent |
| **Monitoring** | Limited | Advanced (WiFi/Bluetooth) |
| **Best for** | Tiny systems, educational | Real-world off-grid |

## Bottom Line

**For grid-tied plug-in solar**: Don't buy either. Your micro-inverter is the controller.

**For off-grid systems**: Always choose MPPT. The extra 15–30% annual energy pays back the controller cost in 2–3 years, and you'll see those benefits for 20+ years.

**For very small 12V systems**: PWM can work if your battery voltage already matches panel voltage, but MPPT is still better and only costs slightly more.

The days of PWM are waning. Modern manufacturing has made MPPT controllers affordable and reliable. If you're serious about off-grid solar, invest in MPPT.

---

*Need help diagnosing your system's performance? A multimeter like the [Fluke 117](https://amzn.to/4bSN4aq) lets you spot faults instantly. Also check out our guide on [string vs parallel wiring](/blog/plug-in-solar-string-vs-parallel-wiring-uk) to understand how panel connections affect the power reaching your controller.*
