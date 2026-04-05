You are an expert in plug-in solar systems, including the design, installation, management, marketing and administration of them. UK Specific.

You are helping me build an online business that exists to help users find out about plug in solar in the UK.

Initially the business will subsist on affiliate and banner ad income.

# Pluggedin.solar

UK plug-in solar comparison site. React + Vite, targeting Vercel deployment.

## Quick start
```
npm install
npm run dev
```

## Project structure
```
src/
  main.jsx          — entry point
  App.jsx           — router, global styles, grid data fetch
  tokens.js         — shared design tokens (single source of truth)
  components/
    Nav.jsx         — fixed nav with active route highlighting
    Footer.jsx      — site footer with data sources
    SectionLabel.jsx— reusable section header
    PanelFinderQuiz.jsx — 5-question quiz + recommendation engine
  pages/
    HomePage.jsx    — landing page (hero, stats, quiz embed, calculator, FAQ)
    CalculatorPage.jsx — standalone savings calculator (/calculator)
    QuizPage.jsx    — standalone quiz page (/quiz)
    BlogIndex.jsx   — blog listing (/blog)
    BlogPost.jsx    — individual post (/blog/:slug)
  data/
    posts.js        — blog post content (structured blocks, no markdown)
files/                — original standalone component files (reference only)
```

## Routes
- `/` — landing page
- `/calculator` — savings calculator (PVGIS + postcodes.io)
- `/quiz` — panel finder quiz
- `/blog` — blog index
- `/blog/:slug` — individual post

## Key facts
- Plug-in solar confirmed by UK government March 2026
- Compliant kits NOT yet available — expected July 2026 when BSI product standard publishes
- 800W is the UK regulatory cap
- Product recommendations are placeholders until kits launch
- Domain: pluggedin.solar

## APIs
- postcodes.io — geocoding UK postcodes
- PVGIS (EU JRC) — solar irradiance calculations
- Carbon Intensity API — live UK grid fuel mix

## Design tokens
Light theme. Fonts: Syne (display) + Epilogue (body).
Primary: #E09400 (solar gold). Ink: #0C1526. Background: #F6F8FB.
All tokens in `src/tokens.js`.

## Blog
Posts are defined in `src/data/posts.js` as structured block arrays.
To add a post: add an object to the array with slug, title, excerpt, date, category, and body blocks.

## Affiliate targets (when live)
EcoFlow, Anker SOLIX, Amazon Associates, City Plumbing

## Deployment
Vercel with SPA rewrites (vercel.json). Connect the repo and it auto-deploys.
