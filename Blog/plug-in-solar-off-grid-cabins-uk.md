---
title: "Plug-in Solar for Off-Grid Cabins and Outbuildings UK"
slug: plug-in-solar-off-grid-cabins-uk
category: Audience Guides
excerpt: "No grid connection means no micro-inverter needed. Direct DC charging to a battery is simpler, safer, and cheaper. Learn how to size a complete off-grid system for a cabin, lodge, or workshop."
date: 2026-04-14
---

Off-grid is different. Your cabin, lodge, or outbuilding isn't connected to the mains electricity grid. That means:

- No G98 notification required (you're not feeding power back to the grid, so Ofgem doesn't care).
- No micro-inverter needed (you're not converting DC to AC for the grid—your battery and loads are DC-native).
- Simpler, cheaper system architecture (panel → charge controller → battery → loads).
- Different sizing logic (you're powering specific appliances, not offsetting consumption).

This guide covers designing a complete off-grid solar system for a cabin, workshop, or holiday let.

## The Core System: Panel → Charge Controller → Battery → Loads

An on-grid system (what most UK properties use) sends generated power into mains electricity through a micro-inverter. Off-grid is simpler in concept, more complex in practice.

**On-grid:** Solar panel → Micro-inverter → Home circuits → Mains grid

**Off-grid:** Solar panel → Charge controller → Battery → DC loads (lights, phone chargers) or Inverter → AC loads (fridge, kettle)

The charge controller is the key component. It prevents the battery from overcharging in summer when the sun's high, and manages voltage and current flow. Good ones cost £100–300.

The battery is your energy store. Without it, you generate power only during daylight. A battery lets you use that power at night and on cloudy days.

## Sizing Your System: Real Numbers

Sizing an off-grid system requires you to understand your actual load—not assumptions.

**Step 1: Document what you want to power.**

Let's say you're powering a holiday cottage with:
- LED lights (5 bulbs at 10W each, used 6 hours daily) = 300Wh/day
- Phone and laptop charging (2 devices, 50Wh each, daily) = 100Wh/day
- Small fridge (100W, runs 4 hours daily) = 400Wh/day
- Water pump for a borehole (500W, runs 1 hour daily) = 500Wh/day
- **Total daily consumption: 1,300Wh (1.3 kWh/day)**

**Step 2: Account for season and weather.**

The UK's solar resource varies wildly by season and latitude. Winter in northern Scotland produces roughly 50% of summer's irradiance. A grey November day in Edinburgh generates maybe 60% of a sunny June day.

Design your system for the worst month (typically December in southern England, January–February in Scotland). If your system covers December, it'll cover everything else fine.

For the cottage above, assume December can only generate 2–3 kWh on a good day, and you'll have 3–4 grey days in a row.

**Step 3: Calculate battery capacity.**

If you consume 1.3 kWh/day and have 3 days of poor weather ahead, you need enough battery to cover 1.3 × 3 = 3.9 kWh. Add a 20% buffer (to protect battery longevity—you never fully deplete). That's roughly 5 kWh usable capacity.

Battery options:
- LiFePO4 (lithium iron phosphate): most modern, efficient, long lifespan. Example: [EcoFlow DELTA 2](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fdelta-2-portable-power-station) (1.3 kWh, ~£599) or [Jackery 1000 v2](https://amzn.to/4tmxjhG) (1 kWh, ~£499). You'd need 4–5 of these in series to hit 5 kWh.
- Lead-acid: cheaper upfront (£500–800 per kWh), heavier, shorter lifespan (5–7 years vs 10+ for lithium).

For a cottage, lithium is increasingly the norm. It's lighter, takes less space, lasts longer, and handles partial charging cycles better.

**Step 4: Calculate panel capacity.**

If you need 1.3 kWh/day and December sun produces 1 kWh per kW of panel (a conservative estimate for southern England), you need 1.3 kW of panels. That's three 400W panels or four 350W panels.

For northern Scotland, you'd need to add 30–50% more panel capacity due to lower winter irradiance.

**Step 5: Charge controller and inverter.**

- **Charge controller:** MPPT (maximum power point tracker) is better than PWM. For 1.2 kW panels and a 48V battery, a 60A MPPT costs £200–350. Examples: Victron, Epever, Outback brands.
- **Inverter:** If you want AC loads (fridge, kettle, microwave), add a 3–5 kVA inverter. These cost £400–1,500 depending on quality. A 3 kVA pure sine-wave inverter is robust.

Alternatively, if your cottage can run on DC or 12V appliances (LED lights, phone chargers, fridges designed for caravans), skip the inverter entirely. You save £500+.

## Real System: A Holiday Cottage Build-Out

**Load:** 1.3 kWh/day (lights, fridge, phones, pump)  
**Location:** Southern England (decent winter sun)  
**Budget:** £3,500–5,000

**Component list:**
- [EcoFlow 400W solar panel](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2F400w-solar-panel) (~£299) × 4 = £1,196
- Victron MPPT 150/60 charge controller (~£250)
- [EcoFlow DELTA 2](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fdelta-2-portable-power-station) (~£599) × 3 = £1,797
- Victron 3 kVA inverter (~£600)
- Wiring, breakers, monitoring (Cerbo GX): ~£400
- **Total: ~£4,243**

**Realistic annual generation:** 1.2 kW panels × 3.5 peak sun hours (UK winter average) × 365 days = 1,533 kWh/year. More than enough for the 1.3 kWh/day cottage.

**Winter comfort:** The 3.9 kWh battery covers 3 grey days. After that, you're low-battery and need to conserve. This is acceptable for a holiday let where guests rotate through weekly. For full-time off-grid living, you'd size larger (8–10 kWh battery, 2 kW panels).

## Installation and Safety

Off-grid systems are DC-centric and high-voltage. Mistakes can cause fires or electrocution. **Hire a qualified solar installer** for anything over 1 kW and battery banks over 5 kWh.

**Critical safety steps:**
- All DC wiring must be sized for the current (a 100A circuit needs 16mm² copper cable minimum).
- Breakers and fuses protect each circuit.
- Grounding (earthing) is essential—all metal frames and enclosures must be grounded.
- Battery enclosures should be ventilated to prevent hydrogen gas buildup (applies to lead-acid; lithium doesn't gas off).
- Fire extinguishers rated for electrical fires should be nearby.

BS 7671 Amendment 4 (April 2026) applies to off-grid systems too, though the rules are slightly different because you're not tied to the grid. An electrician with solar experience will know the requirements.

## Portable vs Permanent

**Portable off-grid:** Some users buy a [Jackery 1000 v2](https://amzn.to/4tmxjhG) (~£499) paired with a 100–200W portable solar panel (£300–500). Plug it in, use it for a weekend, unplug and take it home. Simple, minimal installation, flexible.

**Permanent off-grid:** A fixed installation (panels on the roof or on a ground mount, wiring in conduits, battery in an enclosure) is more efficient and reliable, but requires planning and professional setup.

Most off-grid cabins lean permanent. Holiday lets and workshops too. Portable systems suit weekend getaways or backup power.

## Maintenance and Monitoring

Off-grid systems are more maintenance-intensive than grid-connected ones.

**Monthly:**
- Check the charge controller display. Is the battery charging during daylight?
- Look for loose cables or corrosion on connectors.
- Verify the inverter is working (you should see AC voltage at your outlet).

**Quarterly:**
- Monitor battery state of charge. Lithium shouldn't drop below 20% or above 95% regularly.
- Check battery temperature (modern LiFePO4 batteries self-regulate, but extremes shorten lifespan).
- Inspect solar panels for dirt, debris, or animal damage.

**Annual:**
- Get an electrician to inspect and test the system (£150–250). They'll verify grounding, check wiring insulation, and confirm breaker functionality.

## No Grid Tie-In: Simplified Notification

Unlike grid-connected systems, off-grid installations don't need to notify Ofgem under G98. You're not feeding power back to the grid, so the grid operator doesn't care.

You do need to ensure:
- BS 7671 Amendment 4 compliance (electrical safety).
- Planning permission if the installation is visible from a public road (usually not required for behind-building installations, but worth checking with your local planning authority).
- Building control notification if you're significantly modifying a building (usually no—solar mounting is minor work).

For a cabin or outbuilding, you're largely in the clear. Notify your insurance company and you're done.

## Sizing for Different Use Cases

| Use case | Daily load | Battery | Panels | Inverter | Cost |
|----------|-----------|---------|--------|----------|------|
| Weekend cabin | 0.5 kWh | 2 kWh | 400W | 1 kVA | £1,800 |
| Holiday cottage | 1.3 kWh | 5 kWh | 1.2 kW | 3 kVA | £4,200 |
| Off-grid home | 5 kWh | 15 kWh | 4 kW | 5 kVA | £12,000+ |
| Workshop | 2 kWh | 4 kWh | 1 kW | 2 kVA | £3,200 |

## Getting Professional Help

For anything larger than a 200W panel and 1 kWh battery, hire an installer. Search for "off-grid solar installer UK" and your region. Costs are typically £100–150/hour labour plus materials.

Ask for:
- References from similar projects (cabins, holiday lets).
- A system design document showing all components and wiring diagrams.
- Evidence they understand BS 7671 Amendment 4.
- Warranty on workmanship (minimum 2 years).

## The Bottom Line

Off-grid solar is different from grid-connected. You're designing for your actual consumption, not offsetting grid electricity. Battery sizing and panel capacity are tied to seasonal variation, not a universal 400W rule.

The 800W UK regulatory cap applies to grid-connected systems only. Off-grid systems can be any size (a 5 kW cabin setup is fine if you need it).

Start with a clear understanding of your loads. Use a simple spreadsheet to estimate daily consumption in the worst month. Then over-size your panels by 30% and your battery by 20%. That formula ensures comfort without over-engineering.

For more on battery options and sizing calculations, see our [main calculator](/calculator). To explore combining solar with other renewable generation (wind, hydro), contact a specialist installer—they're beyond our scope here, but increasingly popular in rural Scotland and Wales.
