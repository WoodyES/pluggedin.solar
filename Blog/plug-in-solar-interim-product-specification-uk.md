---
slug: "plug-in-solar-interim-product-specification-uk"
title: "Interim Product Specification: What It Covers"
excerpt: "The UK's interim product specification for plug-in solar sets the rules for what can legally be sold. Every technical limit explained."
date: "2026-07-03"
category: "Regulations & Policy"
cluster: "government-updates"
priority: "medium"
---

When the UK government legalises plug-in solar, it will not be a free-for-all. Every product sold as a "plug-in microgenerator" will need to meet an interim product specification — a set of technical requirements that define exactly what these devices must and must not do.

The specification was published alongside the [DESNZ consultation](/blog/desnz-plug-in-solar-consultation-july-2026) on 16 June 2026. This article breaks down every requirement, explains the reasoning, and clarifies how the interim spec differs from the full BSI product standard.

## The Core Technical Limits

The interim product specification sets hard limits on several key parameters. Here they are, with context.

### Single Phase, Maximum 253V AC at 50Hz

Plug-in microgenerators must connect to a single-phase domestic supply only. The UK mains voltage is nominally 230V, with a permitted range of 216.2V to 253V. The 253V ceiling ensures the inverter can handle the upper end of that range without safety issues.

Three-phase systems are excluded. This keeps the specification focused on typical UK homes, the vast majority of which have single-phase supplies.

### Maximum 800VA Apparent Power

The total AC output must not exceed 800VA (volt-amperes). In practical terms, for a resistive load, this is equivalent to 800W. This aligns with the European standard and the limit already established in BS 7671 Amendment 4.

Why 800VA rather than watts? Apparent power (VA) accounts for the relationship between voltage and current regardless of power factor. It is the more conservative measure and the one that matters for electrical safety.

For context, 800W is enough to generate roughly 700-850 kWh per year in a typical UK location — enough to offset 20-30% of an average household's electricity consumption.

### Maximum 3.5A Current

The maximum current output is capped at 3.5A. At 230V, this gives a theoretical maximum of 805W, which aligns with the 800VA limit above.

The 3.5A limit is critical for plug safety. A standard BS 1363 plug is rated for 13A, so 3.5A provides a substantial safety margin. Combined with the required 5A fuse (see below), this creates multiple layers of overcurrent protection.

### Maximum 2000W DC PV Module Power

While the AC output is capped at 800VA, the DC input from the solar panels can be up to 2000W. This might seem contradictory, but it makes good engineering sense.

Solar panels rarely produce their rated output. A 400W panel might reach 400W for a few minutes on a perfect summer day, but typical output is 60-80% of rated capacity. Allowing higher DC input means:

- Panels produce closer to the 800W inverter cap for more hours of the day
- Morning and evening generation is improved
- Overcast-day performance is better

The inverter handles the conversion, capping AC output at 800W regardless of how much DC power the panels provide. Any excess is simply clipped.

### One Device per Household

The specification limits each household to one plug-in microgenerator. This means one system with a maximum of 800VA output, not multiple systems adding up to a higher total.

The reasoning is straightforward. The wiring in most UK homes is designed for a certain load. One 800W device feeding into a ring main is well within safe limits. Multiple devices on the same circuit or even different circuits in the same property could, in theory, create complications — particularly for DNO network management and G98 notification requirements.

This is likely to be revisited in future. Germany initially had similar limits but has since relaxed them. For now, one system per household is the rule.

### No Battery Storage

The interim specification explicitly excludes battery storage. A compliant plug-in microgenerator must feed generated electricity directly into the home circuit. It cannot store energy for later use.

This is one of the more controversial limits. Battery storage significantly increases the value of a plug-in solar system by allowing you to store daytime generation for evening use. Products like the EcoFlow STREAM Ultra include integrated battery storage and are already popular in Germany.

The government's reasoning is likely a combination of:

- **Simplicity**: batteries add complexity to safety testing and certification
- **Speed**: excluding batteries allows the specification to be simpler and faster to finalise
- **Future-proofing**: battery standards may be added in the full BSI specification

For buyers, this means the initial wave of legal plug-in solar kits will be generation-only. If you want battery storage, you will need to wait for the [BSI product standard](/blog/bsi-product-standard-plug-in-solar-july-2026) to address it, or have a battery system installed separately by a qualified electrician.

### BS 1363 Plug with 5A Fuse and Partially Insulated Pins

The plug must be a standard UK 13A plug (BS 1363) fitted with a 5A fuse instead of the usual 13A fuse. The pins must be partially insulated.

The 5A fuse provides overcurrent protection appropriate for the 3.5A maximum output. If anything goes wrong — a fault in the inverter, a wiring issue — the fuse blows before the current reaches dangerous levels.

Partially insulated pins are already standard on quality UK plugs. The insulation covers the upper portion of the live and neutral pins, preventing accidental contact with live metal when the plug is partially inserted.

These are not exotic requirements. Any decent plug-in solar kit designed for the UK market will already meet them.

## What the Specification Does Not Cover

The interim specification is deliberately narrow. It covers the minimum safety requirements for legal sale. It does not cover:

- **Durability and weather resistance** — no IP rating requirements for outdoor use
- **Panel efficiency standards** — no minimum efficiency threshold
- **Inverter response times** — anti-islanding requirements are referenced but not detailed
- **Installation guidance** — beyond the basic "plug into a socket" instruction
- **Monitoring and data** — no requirement for app-based monitoring or energy reporting
- **Warranty or lifespan requirements** — no minimum warranty period

These gaps will be filled by the full BSI product standard. The interim specification is a safety floor, not a quality ceiling.

## How This Differs from the BSI Product Standard

The [BSI product standard](/blog/bsi-product-standard-plug-in-solar-july-2026) is a comprehensive British Standard being developed through the formal BSI process. It will be far more detailed than the interim specification, covering:

- Full type-testing and certification requirements
- Environmental protection standards (IP ratings for panels, inverters, and connectors)
- Electromagnetic compatibility (EMC) testing
- Detailed anti-islanding test procedures
- Manufacturing quality requirements
- Comprehensive labelling and documentation standards
- Potentially, battery storage requirements

The key difference is scope and rigour. The interim specification says "your product must not exceed these limits." The BSI standard will say "your product must pass these specific tests, meet these specific quality thresholds, and be manufactured to these specific standards."

Think of it as the difference between a driving test (minimum competence) and an advanced driving qualification (comprehensive assessment).

## What Manufacturers Need to Do

To sell a plug-in microgenerator in the UK once the PSSR amendment takes effect, manufacturers must:

1. **Ensure their product meets every parameter** in the interim specification — all the limits listed above
2. **Self-declare compliance** — initially, there is no third-party certification requirement (this will change with the BSI standard)
3. **Fit a BS 1363 plug** with a 5A fuse and partially insulated pins
4. **Provide clear user instructions** including safety information
5. **Apply appropriate markings** — UKCA marking requirements apply

Several manufacturers are already positioned to comply. [EcoFlow's STREAM kit](https://www.awin1.com/cread.php?awinmid=51797&awinaffid=2846734&ued=https%3A%2F%2Fwww.ecoflow.com%2Fuk%2Fstream-balcony-solar-system) was developed in partnership with the UK government and is expected to be among the first compliant products. Anker SOLIX and others are also preparing UK-specific versions.

## What Buyers Should Look For

When compliant kits reach the market, look for products that clearly state compliance with the interim product specification. Key things to check:

- **Output rating**: should state 800W / 800VA maximum
- **Plug type**: must be a proper UK 13A plug, not a continental Schuko with an adapter
- **Fuse**: must be a 5A fuse, not the standard 13A
- **Documentation**: should include clear installation instructions in English
- **One system limit**: be aware you are limited to one per household

If a product does not clearly state compliance, treat it with caution. The [plug-in solar buying checklist](/blog/plug-in-solar-buying-checklist-uk) covers what else to look for.

## The "No Battery" Question

The battery exclusion will frustrate many buyers, particularly those who are out during the day and would benefit most from storing solar energy for evening use. There are two ways to think about this.

**The pragmatic view:** A battery-free 800W system still saves £200-350 per year if you shift some daytime loads (washing machine, dishwasher, tumble dryer) to solar generation hours. Self-consumption rates of 50-70% are realistic with modest load-shifting. See our [savings guide](/blog/how-much-does-plug-in-solar-save-uk) for detailed calculations.

**The optimistic view:** The battery exclusion is almost certainly temporary. The full BSI standard is expected to include provisions for battery storage, and the government has signalled support for domestic batteries more broadly. Once the standard publishes, battery-integrated kits should follow.

In the meantime, nothing stops you from buying a separate battery system and having it installed by an electrician, independently of your plug-in solar setup.

## Timeline and Next Steps

The interim product specification takes effect alongside the PSSR amendment — they are a package. The expected timeline:

- **22 July 2026 (approx)**: Government response to the consultation
- **Late July/August 2026**: PSSR amendment laid, interim specification becomes active
- **Autumn 2026**: First compliant products on UK shelves
- **2027 onwards**: BSI product standard replaces or supplements the interim specification

For the latest on timing, see our [UK timeline guide](/blog/when-can-i-buy-plug-in-solar-uk-2026).

The interim product specification is not perfect. The battery exclusion and the one-device limit are both frustrating. But it is the fastest route to legal plug-in solar in the UK, and speed matters. Every month of delay is a month of sunshine that UK households cannot capture.
