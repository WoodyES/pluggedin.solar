---
title: Plug-in Solar String vs Parallel Wiring UK: What's the Difference?
slug: plug-in-solar-string-vs-parallel-wiring-uk
category: Technical
date: 2026-04-14
excerpt: String wiring and parallel wiring aren't the same. Here's which one your plug-in system uses and why it matters.
---

# Plug-in Solar String vs Parallel Wiring UK: What's the Difference?

If you're shopping for a plug-in solar system or planning an installation, you'll hear the terms "string wiring" and "parallel wiring" thrown around. They sound technical, but understanding the difference is important — it affects how your panels perform under shading and how much power you can safely extract.

Let's break it down.

## String Wiring: Voltage Adds Up, Current Stays Flat

In string wiring, panels are connected end-to-end in a series chain, like a string of lights.

**Each panel adds its voltage to the total voltage.** Current (amperage) stays the same through the whole string.

**Example**: Two 400W panels, each producing 50V and 8A.

- String voltage: 50V + 50V = **100V**
- String current: **8A** (same throughout)
- String power: 100V × 8A = 800W

This is called **series connection**.

## Parallel Wiring: Current Adds Up, Voltage Stays Flat

In parallel wiring, panels are connected side-by-side. Each panel connects independently to the same two terminals.

**Each panel adds its current to the total current.** Voltage stays the same across all panels.

**Same example**: Two 400W panels, each producing 50V and 8A.

- Parallel voltage: **50V** (same throughout)
- Parallel current: 8A + 8A = **16A**
- Parallel power: 50V × 16A = 800W

This is called **parallel connection**.

## How Plug-in Solar Systems Use This

Here's the key insight: **Most plug-in systems with 2 panels use neither pure string nor pure parallel.** They use a hybrid approach.

### Typical 2-Panel Plug-in System

Each panel connects to its own input on the micro-inverter.

- Panel 1 → MPPT Input A
- Panel 2 → MPPT Input B

Inside the inverter, each input is processed independently by its own Maximum Power Point Tracker (MPPT). Then the two power streams are combined and inverted to AC.

**From the inverter's perspective**, each panel is tracked separately — like they're in parallel in terms of independence. But electrically, they're just connected to different inputs. It's not textbook series or parallel; it's a **dual-input configuration**.

### What This Means for You

Because the inverter tracks each panel independently:

- If one panel is shaded, the other isn't "dragged down" by it
- Each panel operates at its optimal voltage
- You get close to full output even under uneven shading

This is actually *better* than simple series string (where one shaded panel would limit the whole string) and more practical than true parallel (which would require thicker cables to handle the higher current).

## When String Wiring Actually Matters

String wiring becomes relevant when you're building larger systems, particularly:

### Off-Grid Systems with Multiple Panels and a String Inverter

If you're building a cabin solar setup with 4–6 panels and a traditional string inverter (not a micro-inverter), you might wire them in strings:

- 2 strings of 3 panels each (series)
- Each string feeding a separate MPPT input on a charge controller

This reduces the cable thickness (lower current per string) and is the standard approach for off-grid setups.

### Larger Grid-Tied Systems Pre-April 2026

Before the UK's plug-in solar rules solidified, some installers used string inverters with multiple series strings. If you're planning a 3–4 kW system (well above the 800W plug-in cap), this becomes relevant.

But for plug-in solar? Your system is limited to 800W, and modern micro-inverters already handle the multi-panel tracking. You don't need to think about strings.

## Key Takeaway: Don't Confuse String with Series

Many people use "string" and "series" interchangeably — they're not quite the same:

- **Series**: Panels connected end-to-end, voltage adds up
- **String**: A *series chain of panels* feeding a single input
- **String inverter**: An inverter with one or more string inputs

For a plug-in system with a micro-inverter, you're using dual MPPT inputs, which bypasses the string concept entirely.

## Cable Sizing and Why Wiring Matters

The wiring approach *does* affect cable thickness, though:

**Series (higher voltage, lower current)**: Thinner cables are safe.

**Parallel (lower voltage, higher current)**: You need thicker cables to avoid voltage drop and heating.

If you're extending your cables — say, from roof to inverter — you might use a [6mm MC4 extension cable](https://amzn.to/4mfWT5J) rated for the current your panel produces.

Don't overthink this: buy cables rated for your system's maximum output current (usually 10–20A for plug-in systems), and you're safe.

## Troubleshooting: "One Panel Underperforms"

If you notice one panel producing less than the other:

- **In a true series string**, one shaded or faulty panel tanks the whole string's output
- **In a dual-input micro-inverter**, one underperforming panel only affects that input; the other keeps producing

If your system has one weak panel, check for:
- Shading (tree, vent stack, chimney)
- Dust or dirt buildup
- Loose connector
- Manufacturing defect (rare)

A multimeter like the [Fluke 117](https://amzn.to/4bSN4aq) can help diagnose voltage issues on each panel independently.

## Summary

| Wiring Type | Voltage | Current | Best For |
|---|---|---|---|
| **Series** | Adds up | Stays same | Off-grid, thin cables, large systems |
| **Parallel** | Stays same | Adds up | High current loads, short cable runs |
| **Dual MPPT (Plug-in)** | Independent | Independent | Modern micro-inverters, 2–3 panels |

For a standard UK plug-in solar system, you're almost certainly using dual MPPT, not traditional string or parallel. Your inverter handles the complexity. Just buy the right cable thickness, ensure panels are unshaded, and you're done.

---

*Need to pick the right cables? Check our guide on [IP68 cable glands for solar](/blog/ip68-cable-glands-solar-uk) — cable selection and protection go hand in hand.*
