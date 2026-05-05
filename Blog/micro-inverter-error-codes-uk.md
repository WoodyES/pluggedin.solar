---
title: "Micro-Inverter Error Codes Explained UK: Hoymiles and APsystems"
slug: micro-inverter-error-codes-uk
date: 2026-04-13
category: Troubleshooting
priority: 2
excerpt: "Hoymiles and APsystems micro-inverters show error codes when something goes wrong. Learn what each code means, how to fix it, and when to call a technician."
---

# Micro-Inverter Error Codes Explained UK: Hoymiles and APsystems

When your plug-in solar system throws an error code, it's easy to panic. Should you call an engineer? Will the system catch fire? Mostly: no. Error codes are just the inverter's way of saying something isn't quite right, and many are self-healing.

We'll cover the most common error codes for **Hoymiles** (HMS-350W, HMS-500W, HMS-600W) and **APsystems** (EZ1-M) micro-inverters, what causes them, and what you should do.

## Hoymiles Error Codes

Hoymiles inverters display error codes as "E" followed by a number (e.g., E001, E025). You'll see these in the Hoymiles DTU (Data Transfer Unit) app or on the inverter's LED.

### E001 – Hardware Fault / Internal Error

**What it means:** A hardware component inside the inverter has failed or is not communicating properly.

**How to fix it:**
1. Turn off the AC disconnect switch and wait 60 seconds
2. Turn it back on
3. If the code persists, turn off the DC panel for 30 seconds (by covering it or using the panel shutters)
4. If it still persists after 2–3 power cycles, contact Hoymiles support or your installer

**When to escalate:** If the code returns within an hour of reboot, the inverter may need replacement.

### E003 – Grid Frequency Error

**What it means:** The grid frequency is outside the normal range (typically 49.5–50.5 Hz in the UK). This usually happens during a power cut or during grid instability (rare).

**How to fix it:**
1. Check your home's power—is the lights on? Is the boiler running?
2. If the grid is up, wait 5 minutes. The grid will stabilise
3. The error should clear automatically once grid frequency returns to normal

**Prevention:** You can't prevent grid instability, but Hoymiles handles this gracefully. Your system will safely stop exporting and resume when the grid is stable.

### E007 – Over-Voltage (Output Side)

**What it means:** The AC voltage on your home's circuit is above 253 V. This can happen if your home is at the end of a long power line and solar generation is very high.

**How to fix it:**
1. Check what other loads are running. Turn off electric heating, pool pumps, or EV chargers if possible
2. The error is usually temporary—once grid voltage normalises, the inverter resumes
3. If it's persistent (happening every sunny afternoon), contact your DNO (Distribution Network Operator) to check your connection

**UK context:** Over-voltage errors are more common in rural areas with long distribution lines. Urban areas rarely see this.

### E011 – DC Component Error

**What it means:** The inverter has detected a DC offset in the AC output—essentially, the AC isn't purely alternating. This indicates a fault.

**How to fix it:**
1. Reboot: AC disconnect off, wait 60 seconds, on again
2. If the error persists, check the physical connections: are the MC4 connectors tight?
3. Is there any visible damage to the panel wiring?

**When to escalate:** If the code returns after a reboot, the inverter may have an internal relay failure. Contact your installer.

### E025 – Earth Fault Detected

**What it means:** The inverter's residual current device (RCD) has detected a leakage current to earth. This is a safety feature—there's an electrical path from the DC side to ground that shouldn't exist.

**How to fix it:**
1. Turn off the AC disconnect and wait 60 seconds
2. Check all panel connections and wiring for moisture, damage, or loose connectors
3. In UK weather (damp and rainy), a loose MC4 connector exposed to water can cause intermittent earth faults
4. Reseat all connectors and dry any visible moisture
5. Turn on again

**Prevention:** Use [waterproof connector covers](https://amzn.to/4mfWT5J) on MC4 extensions, and ensure all outdoor wiring is in conduit.

### E031 – DTU Communication Loss

**What it means:** The inverter can't reach the DTU (wireless module). The system will continue generating, but you won't see real-time data and the inverter won't export power (for safety).

**How to fix it:**
1. Check that the DTU is powered on (usually via USB, in your home)
2. Restart the DTU: unplug it, wait 10 seconds, plug it back in
3. Restart your Wi-Fi router
4. Once the DTU reconnects (green LED), the inverter will begin exporting again within 2–3 minutes

**Why it matters:** If DTU communication fails, your system generates but can't export to the grid—you're losing money. Fix this quickly.

---

## APsystems Error Codes

APsystems EZ1-M inverters display errors as "F" followed by a number (e.g., F01, F10). You'll see these on the ECU-C (Energy Communication Unit) app.

### F01 – AC Input Voltage Out of Range

**What it means:** Grid voltage is abnormally high or low (outside 207–253 V).

**How to fix it:**
1. Wait 5–10 minutes. This is usually temporary grid instability
2. The system will resume automatically once voltage normalises
3. If it's a frequent afternoon issue, ask your DNO to check your supply

### F04 – AC Frequency Error

**What it means:** Grid frequency is outside 49–51 Hz. Similar to Hoymiles' E003.

**How to fix it:**
1. Confirm the grid is up (lights, boiler, etc.)
2. Wait 10 minutes for the grid to stabilise
3. The system resumes automatically

### F05 – Inverter Over-Temperature

**What it means:** The inverter's heatsink has reached its thermal limit (usually 70°C+). This happens during very hot weather or if ventilation is blocked.

**How to fix it:**
1. Check that the inverter isn't in direct sunlight or mounted against a dark wall
2. Ensure there's air space around it (at least 15 cm on all sides)
3. If mounted on a south-facing wall, consider a shade cloth in summer
4. The inverter will throttle output (reduce power) until it cools down

**Prevention:** Mount inverters in shaded locations where possible. A garage, under eaves, or on a north-facing wall keeps them cooler.

### F10 – Earth Fault

**What it means:** Same as Hoymiles E025—residual current detected. There's an unwanted electrical path to ground.

**How to fix it:**
1. Check all DC wiring for damage or moisture
2. Inspect MC4 connectors and reseat them
3. If outdoors, ensure they're covered with waterproof caps
4. Reboot the ECU-C: unplug for 30 seconds, plug back in

### F15 – ECU Communication Loss

**What it means:** The inverter can't reach the ECU (wireless module). Your system generates but won't export.

**How to fix it:**
1. Restart the ECU-C (unplug, wait 10 seconds, reconnect)
2. Check your Wi-Fi signal strength at the inverter location
3. If Wi-Fi is weak, move the ECU-C router closer or use a Wi-Fi repeater
4. Once communication is restored, the inverter resumes exporting within 2 minutes

---

## Diagnosing Electrical Faults Yourself

If you see earth faults (E025, F10) or DC component errors (E011), you can diagnose further with a multimeter.

A [Fluke 117 digital multimeter](https://amzn.to/4bSN4aq) is ideal. Measure:
- **DC voltage at the panel output** – should be within 5–10 V of the panel's rated Voc (open-circuit voltage)
- **Resistance from the DC negative to ground** – should be infinite (no continuity). If it's low (<1 MΩ), there's an earth fault

Never test while the system is generating—turn off the AC disconnect first.

---

## When to Call a Technician

Reset the system and check connections if you see:
- E001, F04, F05, E003, E007 (likely temporary)
- E025, F10, E011 (check wiring and connectors first, then reset)

Call a certified installer if:
- Errors persist after two full power cycles (AC off 60 seconds, on again)
- You see E001, E011, or F10 repeatedly
- The system won't export power after DTU/ECU restart

---

## Prevention: Monitor Proactively

Many errors are temporary. But if you see the same code repeatedly, it's a sign of a systemic issue.

Log error codes in a spreadsheet and note the date, time, and weather. Share this with your installer or Hoymiles/APsystems support—patterns help diagnose the root cause faster.

Next time an error pops up, take a breath. Most are self-healing. But now you know what each code means and how to fix it.

---

**Related reading:** [How to reset a Hoymiles micro-inverter](/blog/how-to-reset-hoymiles-micro-inverter-uk) for a deeper step-by-step reset guide. And if you're troubleshooting panel output, [learn how to test with a multimeter](/blog/how-to-test-solar-panel-output-multimeter-uk).
