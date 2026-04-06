---
title: How Plug-in Solar Works: The 120V Technical Guide
slug: how-plug-in-solar-works-us-120v
excerpt: How 120V systems actually work, why microinverters matter, circuit safety, and the physics that limits you to 1,200 watts.
date: 2026-04-06
category: Fundamentals
cluster: 1
priority: 6
wordcount: 1500
market: US
---

## The Basic Path: DC to AC to Your Home

Here's the journey electricity takes from a plug-in solar panel to powering your appliances.

A solar panel generates direct current (DC). Think of it as steady, one-directional flow. The panel sits in the sun, electrons flow out of the positive terminal, around your circuit, and back to the negative terminal. That's DC.

Your home's outlets deliver alternating current (AC). In the US, AC alternates at 60 times per second (60 hertz). The voltage oscillates between positive and negative 120 volts (or 240 volts, depending on the outlet). AC is what your refrigerator, TV, and lights expect.

The microinverter's job is to convert the DC from the panel into AC that matches your home's grid. It's inverting the current—hence the name.

Once the microinverter converts the power to 120V AC, it feeds it directly into your outlet. Your home's appliances use it just like they'd use power from the grid. If the appliances don't need all of it, the excess pushes back out into the grid, your meter runs backward (if net metering is available in your area), and you get a credit.

That's the whole loop.

## Why Microinverters Are the Key

Early grid-tied solar systems used a single large inverter mounted in the garage or basement, connected to many panels. If one panel got shaded, the whole system's output dropped because the panels are in series—they're chained together electrically.

Microinverters changed this. Each panel gets its own tiny inverter, mounted directly on or next to the panel. Now each panel operates independently. If one panel is shaded, only that panel's output drops. The others keep running at full capacity.

For plug-in solar, microinverters are essential. You need to convert DC to AC right at the panel so the power can travel through a standard cord to a standard outlet. A microinverter makes this simple.

Most plug-in systems use microinverters in the 300 to 800 watt range. The panel and microinverter are matched to each other—a 600-watt panel gets paired with a 600-watt microinverter.

## The Circuit Safety: 15A vs 20A

Here's where the math gets concrete and explains why 1,200 watts is the practical limit.

A standard US wall outlet is protected by a circuit breaker, usually rated for either 15 amps or 20 amps. The circuit breaker's job is to cut power if the current gets too high and could cause a fire.

Using Ohm's Law: Volts × Amps = Watts. In a 120V circuit:
- A 15-amp breaker can safely handle 1,800 watts (120V × 15A)
- A 20-amp breaker can safely handle 2,400 watts (120V × 20A)

But here's the catch. You can't use 100 percent of the circuit's capacity for your solar system alone. The circuit might also have other appliances on it. If you're plugging your microwave and your solar system into the same circuit, you need headroom.

The National Electrical Code recommends that no single device or circuit use more than 80 percent of a breaker's capacity for continuous loads (which solar is, since it runs for hours in daylight).

So practically:
- On a 15-amp circuit, 80 percent = 1,440 watts theoretical max
- On a 20-amp circuit, 80 percent = 1,920 watts theoretical max

But 1,200 watts is the sweet spot because:

1. It leaves a comfortable safety margin on a 20-amp circuit
2. It's below 1,440 watts, so it works fine on a 15-amp circuit
3. Most plug-in systems max out at 1,200 watts anyway for this reason

This is why US plug-in solar systems are capped at 1,200 watts. It's not an arbitrary limit—it's the practical safe maximum on a 120V household circuit.

## GFCI Protection: Why Your Bathroom Outlet Is Already Safe

You know those outlets in your kitchen and bathroom with a button that says "reset"? Those are GFCI (ground-fault circuit interrupter) outlets.

A ground fault is when electricity finds an unintended path to ground—usually through water or a person. GFCI outlets detect this happening in milliseconds and cut power, preventing electrocution.

Here's the good news: GFCI protection on plug-in solar is often already built into the outlet you're using. Many homes have GFCI protection on kitchen and bathroom circuits because those are wet areas.

UL 3700 requires that plug-in solar systems have their own ground-fault protection independent of the outlet's GFCI. But having GFCI at the outlet is still a crucial layer of safety.

If you're plugging your system into a non-GFCI outlet (say, a living room outlet), you want to either use a GFCI-protected outlet or use an external GFCI adapter (a small device that plugs into the outlet and provides GFCI protection to anything plugged into it).

## Anti-Islanding: The Safety Mechanism That Protects Lineworkers

Here's a scenario that sounds obscure but is critical for safety.

It's 2 a.m. A lightning storm knocks out power in your neighborhood. Utility workers arrive at 3 a.m. to repair the downed line in front of your house. They're wearing rubber gloves and assume the line is dead because the utility's power is down.

But if your solar system is still feeding power into that line, it's not dead. A worker touching it could be electrocuted.

Anti-islanding prevents this. It's an automatic detection system in the microinverter that listens for the grid's voltage and frequency signal. When the grid is operating normally, the frequency is rock-solid at 60 hertz. When the grid goes down, that frequency vanishes.

The microinverter detects the loss of frequency and shuts down in milliseconds—before any utility worker is exposed to live current.

This is a mandatory safety feature under UL 3700. It's not new technology; grid-tied inverters have had anti-islanding for 20+ years. But it's crucial and non-negotiable.

## Net Metering: What Happens to Extra Power

When your plug-in system generates more power than you're using, that power flows back out into the grid. Your meter actually spins backward.

Whether you get paid for that power (or get a credit on your bill) depends on your state's net metering rules.

In most states with net metering, you get a one-to-one credit. If your system feeds 10 kWh back to the grid in a month, you get a $1.70 credit (at the average US rate of $0.17/kWh). This works great for offsets.

Some states (notably California with NEM 3.0) have changed the rules. You get less credit for power you push back to the grid than you pay for power you pull from the grid. This makes the financial case weaker in California, though it's still viable.

Check your state's net metering rules. This affects your payback timeline significantly.

## Monitoring and Performance

Most plug-in systems come with a monitoring app. You can check how much power your system is generating in real-time.

This is useful for a few reasons. First, it helps you understand how much solar actually works at your address. Second, if the system stops generating, you'll notice and can troubleshoot (maybe the outlet tripped, or the panel got covered).

Third, monitoring helps you optimize. If you notice your system generates the most between 10 a.m. and 2 p.m., you might shift high-draw appliances (laundry, dishwasher) to those hours.

## Why Higher Voltages Are Impractical (For Now)

You might wonder: why not use 240V? That's the standard for dryers and electric stoves in the US. You could put 2,400 watts on a 240V/20A circuit instead of 1,200W on a 120V/15A circuit.

The answer is complexity and safety. 240V circuits aren't everywhere in a home—they're typically only in kitchens, laundries, and garages. Adding a 240V outlet just for solar would require electrical work and permitting.

Additionally, 240V installation is more complicated and requires licensed electrician work in most jurisdictions. Plug-in solar's appeal is that it needs no electrician.

Eventually, 240V plug-in solar might become available. Some manufacturers are exploring it. But right now, 120V is simpler and more universally accessible.

## Practical Installation and Outlet Considerations

When you install your plug-in system, choose an outlet that:

1. **Gets good sunlight.** Ideally, south or southwest-facing, with minimal shade.
2. **Is convenient.** You want the cord to reach without excessive extension.
3. **Is on a circuit without heavy loads.** Don't plug your 1,200W system onto the same circuit as a microwave or toaster.
4. **Preferably has GFCI protection** (or is close to one so you can use an adapter).
5. **Is suitable for outdoor use if the cord will be outdoors.** Weatherproof outlets are ideal.

Most homes have plenty of outlets that work fine. The key is understanding the circuit capacity and being intentional about placement.

## The Bigger Picture

Understanding the 120V circuit limits, GFCI protection, and anti-islanding isn't just technical minutiae. These are the engineering constraints that define what plug-in solar can do in America.

The 1,200-watt limit isn't arbitrary—it's built into the electrical code and the physics of 120V circuits. The anti-islanding requirement isn't cautious over-engineering—it's a critical safety feature that protects lineworkers. GFCI isn't overkill—it's a proven technology that saves lives.

Plug-in solar works because it operates within these constraints and respects them. That's what makes it safe, practical, and increasingly legal.
