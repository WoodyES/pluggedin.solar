// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
// Single source of truth for the light theme used across the site.
// Fonts: Syne (geometric display) + Epilogue (clean body)

const T = {
  // Backgrounds
  bg:          "#F6F8FB",
  surface:     "#FFFFFF",
  surfaceAlt:  "#EFF2F8",
  border:      "#DDE2EE",
  borderFaint: "#EAEDF5",

  // Text
  ink:         "#0C1526",
  inkMid:      "#4A5568",
  inkFaint:    "#8896AF",

  // Solar accent
  solar:       "#E09400",
  solarBright: "#F5B800",
  solarLight:  "#FFF7E0",
  solarBorder: "rgba(224,148,0,0.22)",
  solarGlow:   "rgba(224,148,0,0.09)",

  // Sky — secondary accent
  sky:         "#0284C7",
  skyBright:   "#38BDF8",
  skyLight:    "#EFF8FF",

  // Status
  green:       "#059669",
  greenLight:  "#ECFDF5",
  greenBorder: "rgba(5,150,105,0.20)",
  red:         "#DC2626",
  redLight:    "#FEF2F2",

  // Fuel chart colours
  fuelWind:    "#0EA5E9",
  fuelNuclear: "#8B5CF6",
  fuelBiomass: "#65A30D",
  fuelGas:     "#94A3B8",
  fuelImports: "#F97316",

  // Type
  display: "'Syne', sans-serif",
  body:    "'Epilogue', sans-serif",
};

export default T;
