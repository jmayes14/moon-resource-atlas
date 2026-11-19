# Moon Resource Atlas

An interactive site about **critical minerals and strategic supply security on the Moon**: where helium-3, water ice and rare earths are, which countries plan to land there, and which companies could form the first Moon-mining supply chain.

**Live site:** https://jmayes14.github.io/fusion-materials-map/ is the separate lithium project. This one is at https://jmayes14.github.io/moon-resource-atlas/

## Pages

| Page | What it shows |
|---|---|
| `index.html` (Atlas) | A draggable Moon globe with resource areas (helium-3, water ice, rare earths) and every past and planned landing, colored by country. Filters, a mission list, and `?m=` / `?view=` deep links. |
| `helium3.html` | Animated diagram of the solar wind putting helium-3 into Moon soil, a soil-grain close-up, Earth vs. Moon numbers, the digging math, uses and prices. |
| `countries.html` | The two blocs (Artemis Accords vs. China-Russia ILRS), a 2026-2036 timeline of planned landings, and a card for each country. |
| `companies.html` | Front-runner companies and a four-step supply chain (Earth factories → landers → Moon miners → buyers), with company records from TradeVerifyd. |
| `sources.html` | Method, limits, and every source. |

## How it is built

- Static site in `docs/`, served by GitHub Pages. No build step.
- `docs/assets/data.js` holds every fact (SOURCES, COUNTRIES, RESOURCES, MISSIONS, UNMAPPED, COMPANIES). Edit facts there only.
- `docs/assets/atlas.js` draws the Moon pixel by pixel on a canvas (orthographic projection) from NASA's LROC color map, with d3 SVG overlays on top.
- `docs/assets/solarwind.js` is the animated solar-wind diagram. It respects reduced-motion settings.
- Libraries: d3 7.8.5 from cdnjs. Font: Inter.
- Moon image: NASA Scientific Visualization Studio, CGI Moon Kit (`lroc_color_poles_4k`), public domain.

## Research

Done on 19 November 2026.

- **Tavily** for all web facts, with key pages checked in full using Tavily extract.
- **TradeVerifyd** for company registrations, ownership links, trade relationships and sanctions/forced-labor flags.
- **Sayari** was planned but its connection had expired; adding it is a next step.

Notes are in `research/moon-resources-2026-11.json`.

## Writing style

Plain language for a general reader. No "we," "our" or "us" in site text. Every fact links to a source. Future dates are labeled as targets.
