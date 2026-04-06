---
title: "Best Smart Plugs for Monitoring Solar Output in the UK"
slug: best-smart-plug-monitor-solar-uk
excerpt: "Track your solar generation in real time with a smart plug. Tapo, Shelly, or Eve—here's how to choose."
date: "2026-04-06"
category: "Monitoring"
cluster: "Tools & Monitoring"
priority: 1
wordcount: 1500
---

## Why Monitor Your Solar Output at All?

Here's the thing: you could just check your inverter's app every now and then and assume everything's fine. But what if your system has slowly degraded? What if panels are getting shaded by a new tree? What if something's broken and nobody noticed?

A smart plug sitting between your inverter and the wall socket measures power flowing in real time. It shows you exactly how many watts you're generating, when generation is highest, and whether your system is actually working as expected. Over weeks and months, it spots gradual degradation you'd otherwise miss.

More than that, it's just genuinely useful information. You start to understand *when* your system generates best. You learn how much generation you get on cloudy days. You can correlate real-world performance against weather forecasts. And if something goes wrong, you spot it immediately instead of discovering it when your bill comes in.

A good smart plug costs £12–30 and will probably tell you more about your system's performance than you ever guessed just by looking at it.

## Tapo P110: The Budget King (~£12)

The TP-Link Tapo P110 is basically the entry point to smart power monitoring. It costs around £12–15, which is genuinely cheap. Functionally, it measures power draw (or generation, depending on your setup), energy consumption, voltage, and current.

What you get: A simple app that shows current watts, daily/monthly energy totals, and historical graphs. You can set usage alerts ("tell me if consumption jumps above 500W") and track costs if you configure electricity rates.

The pros: incredibly cheap, reliable, straightforward app, works with Alexa and Google Home, tiny physical footprint.

The cons: no local data storage (everything goes to the cloud), cloud dependency means no data if internet is down, less detailed energy metrics, no Bluetooth or local network option.

For a first smart plug, the Tapo P110 is genuinely hard to beat. It does exactly what you need—tells you how much power your inverter is generating right now. Is it perfect? No. Is it £12? Yes.

**How it works for solar:** Plug the inverter power cable into the Tapo, plug the Tapo into the wall. The Tapo measures power flowing through. In the app, you see real-time generation. Set up daily/monthly tracking and you know exactly how much solar energy you're producing.

## Shelly Plug S: The Home Assistant Favourite (~£15)

The Shelly Plug S costs around £15–20 and is beloved by people who use Home Assistant (a local home automation system). It measures power draw/generation, energy consumption, and temperature. Absolutely no cloud dependency.

What you get: You can use the Shelly app (basic) or integrate it with Home Assistant (much more powerful). Everything runs locally on your network. You get real-time power measurement, historical data stored locally, and the ability to automate things based on generation (e.g., "turn on the water heater when solar generation is above 2000W").

The pros: local operation (no cloud), integrates deeply with Home Assistant, cheaper than Eve, open API for custom integrations, very reliable.

The cons: app is less polished than Tapo or Eve, requires more setup if you want the full experience, less beginner-friendly.

The Shelly Plug S is the choice for people who want data sovereignty and automation. If you're already running Home Assistant or thinking about it, this is the obvious pick.

**How it works for solar:** Same as Tapo—plug it in between inverter and wall socket. But instead of sending data to the cloud, everything lives on your home network. You can build automations like "if solar is generating above 3000W, switch on the immersion heater" without relying on cloud APIs.

## Eve Energy: The HomeKit Option (~£30)

The Eve Energy plug costs around £28–35 and is designed for people with Apple HomeKit. It measures power, energy, temperature, and integrates seamlessly with Apple's ecosystem.

What you get: A polished app, HomeKit integration, Matter protocol support (for compatibility with other brands), detailed energy graphs, and the ability to automate things through HomeKit (though HomeKit automation is less powerful than Home Assistant).

The pros: beautiful app, HomeKit ecosystem, Matter support, reliable, local processing option (data doesn't have to go to cloud), works great if you're in the Apple ecosystem.

The cons: most expensive option, only useful if you have HomeKit, Matter support is relatively new so integration is still settling.

If you live in an Apple Home and own other HomeKit gear, Eve Energy integrates beautifully. You can see your solar generation alongside your home's energy use in one place.

**How it works for solar:** Plug it in between inverter and wall. Eve's app shows real-time watts and daily/monthly energy. If you're using HomeKit, you can set up scenes and automations (though for solar-specific stuff, Home Assistant is more powerful).

## The Case for Monitoring Both Directions

Here's a feature worth mentioning: bi-directional monitoring. Some smart plugs can measure power flowing in *or* out. This matters if your plug-in solar system has battery backup.

If you've got a battery (and some plug-in solar setups do), you want to see:
- Power flowing *out* from the inverter to the wall (generation you're using or exporting)
- Power flowing *in* to the inverter from the grid (when you're charging the battery or using grid power)

Most smart plugs can handle this automatically—they just show positive watts for one direction and negative for the other. But check the specs to be sure before buying.

## Setting Up Generation Tracking: Step by Step

Regardless of which plug you choose, the basic setup is the same.

**Step One: Position the Smart Plug**

Install the smart plug between your inverter's power cable and the wall socket. The plug needs to be powered on (so the inverter is on) for it to measure anything. It needs to be in a location with a decent WiFi signal (though all three plugs mentioned here have decent range).

**Step Two: Connect to WiFi**

Use the app to connect the plug to your home WiFi network. This usually takes 2–3 minutes. Follow the app's prompts. The plug will blink or show an indicator light while it's connecting.

**Step Three: Name It Something Useful**

Call it "Solar Inverter" or "Plug-in Solar" or something descriptive. Future-you will appreciate not having to guess which mystery plug is which.

**Step Four: Configure Alerts (Optional)**

Most apps let you set alerts. You might set up: "notify me if generation drops below 50W on a sunny day" (indicates a problem) or "notify me when generation goes above 2000W" (time to switch on loads). This catches problems early.

**Step Five: Set Up Historical Tracking**

Most smart plugs offer daily, weekly, and monthly energy tracking. Turn this on. Over time, you'll build up data showing your generation patterns across seasons.

## What You'll Actually Learn From the Data

Once you've got a smart plug monitoring for a few months, patterns emerge. Here's what you'll start to notice:

Your generation is highest at solar noon (usually around 1 PM in the UK), not sunrise. Afternoon cloudiness matters more than morning cloud because afternoon sun is stronger.

On overcast days, generation might be 10–20% of a clear day. On really bad days (heavy rain), you might barely see 50W. This isn't a fault; it's just how solar works in the UK.

Seasonal variation is dramatic. Summer generation on a clear day might be 4000W; winter on a clear day might be 800W. This is normal and expected.

Degradation becomes visible over a year or two. If your January generation is consistently 10% lower than last January on similar days, something's wrong (dirt, damage, or panel degradation).

Weather forecast correlation is useful. You can predict generation based on cloud cover and sun angle.

## Integration with Home Assistant (Optional)

If you're using Home Assistant (a local home automation system), all three of these plugs integrate via MQTT or native integrations. You can build automations like:

"If solar generation is above 3000W, turn on the immersion heater to charge the hot water tank."

"If generation drops below 100W, alert me to check for shade or obstruction."

"If it's about to rain, charge the battery from the grid."

These automations let you make your solar system work smarter. Home Assistant is free and runs on a Raspberry Pi, but it has a learning curve. Shelly plugs are the easiest integration, but Eve and Tapo work too.

## Matter Protocol: The Future

Matter is a new open standard for smart home devices. It's designed to work across ecosystems (Apple, Google, Amazon, all together). Eve Energy supports Matter. Shelly is adding Matter support gradually. Tapo hasn't committed yet.

For now, Matter support isn't essential. But if you're building a new smart home setup, Matter-compatible devices are worth considering because they'll be more flexible long-term.

## Which One Should You Actually Buy?

Here's the honest comparison:

**Buy the Tapo P110 if:** You want the cheapest option, you're not too fussy about app design, and you just want to see "here's how many watts right now".

**Buy the Shelly Plug S if:** You're running Home Assistant or planning to, or you want local data and automation without cloud dependency.

**Buy the Eve Energy if:** You're deep in the Apple HomeKit ecosystem and want a beautiful, polished experience.

None of them are bad choices. They all measure what you need to know. The difference is really about ecosystem, price, and how much tinkering you want to do.

## Real-World Example: What You'll See

Let's say you've just installed your first plug-in solar setup. You fit the smart plug and start monitoring. Here's what you might see:

On Day 1 (clear sunny day): generation peaks at around 3500W at 1 PM. Morning generation ramps up from 6 AM onwards, peaks around 1 PM, drops off by 5 PM. Daily total: 28 kWh.

On Day 2 (partly cloudy): generation is spiky (clouds drifting past), peaks at only 2000W, daily total 8 kWh.

On Day 3 (you clean the panels): generation on the same cloud cover is suddenly 15% higher. You now know cleaning works.

On Day 4 (a pigeon starts nesting under your panels): generation gradually decreases over the week before you realise why. You install bird-proofing and generation bounces back.

This is the value of monitoring. You see real-time cause and effect, and you spot problems that would otherwise be invisible.

## Long-Term Tracking

Keep the app data (or export it if you can). After a year, you'll have a baseline for each season. If next year's January generation is 20% lower on equivalent days, something's degraded and you need to investigate.

If you ever sell your house and leave the system, you'll have documented proof of historical performance. If you're thinking about upgrading panels, you've got real data on current performance to compare against.

## The Bottom Line

A smart plug is probably the single most useful monitoring tool you can fit to a plug-in solar system. At £12–30, it pays for itself in the first month by helping you understand your system and spot problems early.

For more monitoring options and integrations, check out our guides on [choosing an energy monitor](/blog/best-energy-monitor-plug-in-solar-uk) and [calculating your solar savings](/blog/plug-in-solar-savings-uk). And if you want to know what you can actually generate, we've got a real-world guide on [how much electricity does balcony solar actually produce](/blog/how-much-does-balcony-solar-actually-generate).
