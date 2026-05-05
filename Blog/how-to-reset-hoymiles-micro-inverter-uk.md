---
title: "How to Reset a Hoymiles Micro-Inverter UK"
slug: how-to-reset-hoymiles-micro-inverter-uk
date: 2026-04-13
category: Troubleshooting
priority: 2
excerpt: "A complete step-by-step guide to resetting your Hoymiles HMS micro-inverter. When to reset, how to do it safely, and what to expect."
---

# How to Reset a Hoymiles Micro-Inverter UK

A reset is the first troubleshooting step for most micro-inverter issues. It clears temporary faults, clears error codes, and re-synchronises the inverter with the grid. In most cases, it takes five minutes and fixes the problem.

This guide covers **Hoymiles HMS series inverters** (HMS-350W, HMS-500W, HMS-600W) in the UK. The process is the same regardless of which model you have.

## When to Reset Your Hoymiles Inverter

Reset is the right move if you're seeing:
- Error codes (E001, E003, E025, etc.)
- No power export, despite sunny weather and panels generating
- After a firmware update on the DTU
- After a power cut or grid interruption
- After replacing the DTU (wireless module)
- After replacing or moving a panel
- System won't communicate with the DTU app

**Do not reset if:**
- Your system is actively feeding power to the grid (wait until it's dark or cloudy)
- You're in the middle of an electrician's visit (they may need to see real-time readings)

## What You'll Need

- AC isolator switch (usually in your home, near the inverter or on the fuse board)
- (Optional) Torch – for inspecting panel connectors if you need to access the DC side
- 5 minutes of time

**Safety note:** You won't touch any live wires in this process. The AC disconnect isolates your system from the grid, making it safe.

## Step-by-Step Reset Process

### Step 1: Turn Off the AC Isolator

Locate the **AC isolator switch**. This is typically:
- In a weatherproof box on the outside wall (most common for plug-in systems)
- Inside your home near the fuse board or next to the inverter
- Sometimes integrated into a UK-compliant kit as a toggle switch

Turn the isolator to **OFF**. You should hear a click (the relay breaking the connection).

**Verify:** Check the DTU app or the inverter's LED. The LED should turn orange or red (no longer exporting).

### Step 2: Wait 60 Seconds

This is crucial. Don't skip this step.

The inverter's capacitors need to fully discharge. Waiting 60 seconds ensures that any temporary power within the inverter is gone and any software state is cleared.

**Why this matters:** If you restart too quickly, the inverter may not fully reset. You'll see the same error or the DTU may not reconnect properly.

### Step 3: Turn the AC Isolator Back ON

Flip the isolator to **ON**. You may hear another click.

**Verify:** Within 10–15 seconds, the DTU LED should blink green (searching for the inverter). Within 30 seconds, you should see:
- A steady green LED on the DTU
- A green LED on the inverter (or the inverter will show a brief purple light as it boots)
- The DTU app will show the inverter as "online" and displaying live voltage/frequency readings

### Step 4: Monitor the App

Open the Hoymiles DTU app and check:
1. Is the inverter listed as "online"?
2. Are error codes cleared?
3. Is the inverter showing live readings (AC voltage, frequency, power)?

If it's sunny and panels are generating, you should see non-zero power within 2–3 minutes.

**If it doesn't reconnect:** Go to Step 5.

---

## If the Inverter Doesn't Reconnect to DTU

If the DTU still shows "offline" after 2 minutes, restart the DTU as well.

### Step 5: Restart the DTU

The DTU is usually a small white box plugged into a USB power supply in your home.

1. **Unplug the DTU** from its USB power supply
2. **Wait 10 seconds** (full power discharge)
3. **Plug it back in**
4. **Wait 20 seconds** for it to boot

The DTU should now search for the inverter. Once it finds it, both LEDs will go green.

**Verify in the app:** Refresh the app (pull down if on mobile) and check that the inverter is online.

---

## If Panels Aren't Generating After Reset

If the inverter is online but shows zero power output in sunny weather, the DC side may need attention.

### Step 6: Check the DC Connections (Optional)

**Turn off the AC isolator again.** Now it's safe to inspect the DC side.

1. **Inspect the panel connectors** – are the MC4 plugs firmly seated? Give each one a gentle tug. It should not move.
2. **Check for water or ice** – is there condensation on the connectors? Wipe them gently with a dry cloth.
3. **Check the panel surface** – is it clean? Bird droppings, moss, or heavy dust can reduce output. Clean gently with a soft cloth and water if needed.

Once you've checked everything, turn the AC isolator back on and wait 30 seconds for the inverter to come back online.

---

## If You've Replaced the DTU: Re-Pairing

If you've installed a new DTU (because the old one failed or you've upgraded), the inverter needs to re-pair with it. The reset above will start the pairing process automatically.

**How to know if pairing is happening:**
- The DTU LED blinks green (searching)
- The inverter LED cycles between orange and purple (waiting to pair)

**Pairing can take up to 5 minutes.** Don't restart anything—just wait.

Once both LEDs are steady green, pairing is complete.

**If pairing fails after 10 minutes:**
1. Unplug the DTU again
2. Use the Hoymiles app to "forget" the inverter
3. Plug the DTU back in
4. The app should prompt you to add a new device—scan the QR code on the inverter
5. Wait for pairing to complete (2–5 minutes)

---

## After a Firmware Update

If you've just updated the DTU firmware (via the Hoymiles app), a reset is standard procedure.

1. Complete the full reset (Steps 1–4 above)
2. The inverter will take slightly longer to boot (30–45 seconds)
3. It may show a brief error code while it applies the update—this is normal
4. After 2–3 minutes, the error clears and the system resumes normal operation

---

## Troubleshooting: It's Still Not Working

If after two full reset cycles the inverter still won't come online or shows persistent error codes, here's what to check:

**Connectivity:**
- Is your home's Wi-Fi working? (Check your phone)
- Is the DTU's Wi-Fi antenna loose or damaged?
- Has your Wi-Fi password changed? If yes, you'll need to re-add the device in the app

**Power:**
- Is the AC isolator actually in the ON position? (Some switches are hard to see in the dark)
- Do you have a working AC supply at that circuit? (Flip a nearby light switch to verify)
- Is the DC panel covered or is it very cloudy? The inverter needs sunlight to power up

**Hardware:**
- Is the panel itself generating? (Check with a multimeter—see [our guide on testing panels](/blog/how-to-test-solar-panel-output-multimeter-uk))
- Are all MC4 connectors hand-tight and not corroded?

**Still stuck?**
- Take a photo of the error code (if displaying)
- Note the DTU LED colour (red, orange, green, blinking?)
- Contact Hoymiles support with this information, or call your installer

---

## Prevention: When to Monitor for Issues

Keep an eye on your system:
- **Weekly:** Check the DTU app for any offline alerts. If the inverter goes offline during sunny hours, it's a sign of a communication issue
- **Monthly:** Open the app and verify the monthly output matches your expectations
- **After storms:** Check for any error codes triggered by power surges or grid disturbances

A reset is your first response to most issues. Most of the time, it solves the problem in five minutes. If it doesn't, you've narrowed down the problem and are ready to call a technician with more data.

---

**Related reading:** [Understand Hoymiles error codes](/blog/micro-inverter-error-codes-uk) to diagnose exactly what's wrong before you reset. And if you suspect a panel fault, [test your panel output with a multimeter](/blog/how-to-test-solar-panel-output-multimeter-uk) to rule out DC-side issues. Use a [Tapo P110 smart plug](/blog/how-to-test-solar-panel-output-multimeter-uk) to monitor your system's real-time output and spot problems early.
