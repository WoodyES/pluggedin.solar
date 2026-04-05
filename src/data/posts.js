// ─── BLOG POSTS ─────────────────────────────────────────────────────────────
// Add new posts here. They'll appear on /blog and be accessible at /blog/:slug.
// Body uses a simple array of block objects for easy authoring without markdown deps.
//
// Block types:
//   { type: "p", text: "..." }              — paragraph
//   { type: "h2", text: "..." }             — subheading
//   { type: "ul", items: ["...", "..."] }   — bullet list
//   { type: "callout", text: "..." }        — highlighted box
//   { type: "source", label, href }         — linked source

const posts = [
  {
    slug: "uk-plug-in-solar-confirmed",
    title: "UK plug-in solar is confirmed \u2014 here\u2019s what we know",
    excerpt: "On 15 March 2026 the UK government confirmed it will legalise plug-in solar. We break down the timeline, the 800W cap, and what it means for renters and flat-dwellers.",
    date: "2026-03-16",
    category: "News",
    body: [
      { type: "p", text: "On 15 March 2026, the UK government confirmed that plug-in solar \u2014 small photovoltaic systems that connect directly to a standard 13A socket \u2014 will become legal in England, Wales, and Scotland. The announcement follows years of campaigning and the runaway success of similar schemes in Germany, Austria, and the Netherlands." },
      { type: "h2", text: "The timeline" },
      { type: "ul", items: [
        "15 March 2026 \u2014 Government confirms the policy.",
        "15 April 2026 \u2014 BS 7671 Amendment 4 (wiring regulations) updated to enable the framework.",
        "~July 2026 \u2014 BSI publishes the product standard. Compliant kits can legally go on sale.",
        "Late 2026 \u2014 First kits expected on high-street shelves (Lidl, Amazon, Screwfix).",
      ]},
      { type: "h2", text: "The 800W cap" },
      { type: "p", text: "The UK will cap plug-in systems at 800 watts \u2014 matching Germany\u2019s limit. That\u2019s typically two panels and a micro-inverter, enough to power your fridge, router, and standby appliances during daylight hours. Anything above 800W still requires a qualified electrician and MCS certification." },
      { type: "h2", text: "Who benefits?" },
      { type: "p", text: "The policy is explicitly designed for the 4.6 million private renters and hundreds of thousands of flat-dwellers who can\u2019t access a roof. Panels clip to a balcony railing or sit on a garden frame. No planning permission, no landlord sign-off, no electrician. You take them with you when you move." },
      { type: "callout", text: "Use our savings calculator to see exactly what an 800W system would save at your postcode \u2014 with real PVGIS irradiance data, not estimates." },
      { type: "source", label: "Gov.uk announcement", href: "https://www.gov.uk" },
    ],
  },
  {
    slug: "how-plug-in-solar-works",
    title: "How plug-in solar works: panels, inverter, socket",
    excerpt: "A simple explainer for anyone new to balcony solar. How the panels generate power, what the micro-inverter does, and why you can safely plug into a standard UK socket.",
    date: "2026-03-20",
    category: "Guides",
    body: [
      { type: "p", text: "Plug-in solar is refreshingly simple. A kit has three parts: one or two solar panels, a micro-inverter, and a cable with a standard UK plug. The panels generate DC electricity from sunlight. The micro-inverter converts it to AC at 230V \u2014 the same voltage your home uses. You plug the cable into a socket, and the power flows into your home\u2019s ring main." },
      { type: "h2", text: "What happens to the electricity?" },
      { type: "p", text: "Your home\u2019s appliances automatically use the solar power first. If you\u2019re generating 400W and your fridge, router, and TV are using 350W, only 50W is exported to the grid. Your meter sees reduced consumption \u2014 and your bill drops." },
      { type: "h2", text: "Is it safe?" },
      { type: "p", text: "Yes. The micro-inverter is the key safety component. It includes anti-islanding protection, which means it immediately shuts off if the grid goes down \u2014 protecting anyone working on the lines. The BSI product standard (expected July 2026) will set mandatory safety, EMC, and performance requirements for all kits sold in the UK." },
      { type: "h2", text: "Do I need to tell anyone?" },
      { type: "p", text: "You need to notify your Distribution Network Operator (DNO) within 28 days of connecting, under G98 rules. This is a simple online form \u2014 not a site visit or an approval process. Your DNO just needs to know that your address has a small generating installation." },
      { type: "callout", text: "Not sure which kit suits your space? Take our 30-second panel finder quiz to get a personalised recommendation." },
    ],
  },
  {
    slug: "germany-plug-in-solar-lessons",
    title: "What the UK can learn from Germany\u2019s balcony solar boom",
    excerpt: "Germany simplified its rules in 2024 and saw 1.2 million balcony solar installations within 12 months. Here\u2019s what drove adoption and what the UK should replicate.",
    date: "2026-04-01",
    category: "Analysis",
    body: [
      { type: "p", text: "In April 2024, Germany raised its plug-in solar limit from 600W to 800W and removed the requirement for a special energy socket (Wieland connector). The result was explosive: over 1.2 million Balkonkraftwerke were registered within 12 months, with installations running at more than 100,000 per month by late 2024." },
      { type: "h2", text: "What drove adoption?" },
      { type: "ul", items: [
        "Simplicity \u2014 no electrician, no permits, plug and play.",
        "Low cost \u2014 800W kits fell below \u20AC400 as competition increased.",
        "Visibility \u2014 balcony panels are visible, sparking conversations and social proof.",
        "Retail availability \u2014 Lidl, Aldi, and Amazon ran regular promotions.",
        "Rising energy costs \u2014 payback periods dropped below 3 years in sunny regions.",
      ]},
      { type: "h2", text: "Lessons for the UK" },
      { type: "p", text: "The UK\u2019s 800W cap matches Germany\u2019s. The critical success factor will be retail availability and price. If EcoFlow, Anker, and supermarket own-brands can hit the \u00A3500\u2013\u00A3600 price point for a compliant 800W kit, the UK could see similar adoption rates \u2014 particularly given higher electricity prices (24.5p/kWh vs Germany\u2019s ~34c/kWh)." },
      { type: "callout", text: "Calculate your expected savings with our postcode-level calculator \u2014 using the same PVGIS data that German installers rely on." },
      { type: "source", label: "Bundesnetzagentur Marktstammdatenregister", href: "https://www.marktstammdatenregister.de" },
    ],
  },
];

export default posts;
