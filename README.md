# Moon Resource Atlas

An interactive site about **critical minerals and strategic supply security on the Moon**: where helium-3, water ice and rare earths are, which countries plan to land there, and which companies could form the first Moon-mining supply chain.

**Live site:** https://jmayes14.github.io/moon-resource-atlas/

## Pages

| Page | What it shows |
|---|---|
| `index.html` (Explore) | NASA-style home page: Artemis II "Earthset" hero, key numbers, the interactive Moon map, a resource fact sheet with primary-source facts, upcoming missions, and the supply chain teaser. |
| `helium3.html` | Animated diagram of the solar wind putting helium-3 into Moon soil, a soil-grain close-up, Earth vs. Moon numbers, the digging math, uses and prices. |
| `extraction.html` | One tab per resource (water ice, helium-3, oxygen, iron, titanium, aluminum & silicon, rare earths, platinum-group metals, compare). Each tab: why extract it, how it could help Earth and humanity (labeled Today or Possible future), the catch, and the proposed extraction methods (labeled lab-tested, field-tested, company plan or idea). Water tab answers "is it ice or water?". |
| `countries.html` (Missions) | The two blocs (Artemis Accords vs. China-Russia ILRS), a 2026-2036 timeline of planned landings, and a card for each country. |
| `companies.html` | Front-runner companies and a four-step supply chain (Earth factories → landers → Moon miners → buyers), with company records from TradeVerifyd. |
| `sources.html` | Method, limits, and every source. |

## The Moon map

- `docs/assets/atlas.js` draws the Moon pixel by pixel on a canvas (orthographic projection), with d3 SVG markers and labels on top. Deep links: `?m=ce7`, `?view=south`.
- Surface: NASA LROC color map with terrain shading baked in from NASA LOLA elevation (`tools/bake_relief.py`), so the poles show real craters.
- Resource layers (one at a time, or "Key resources"): helium-3, water ice, rare earths & thorium, titanium, iron, aluminum. Each is built in the browser from published maps and shaped by the terrain; titanium follows the surface's blueness (checked: Tranquillitatis 0.97 vs Serenitatis 0.90). They show where a resource is most likely, not exact amounts.
- Missions: landed, crashed, planned (pulsing); the crowded south pole groups into one badge until you zoom in.
- Facts live only in `docs/assets/data.js` (SOURCES, COUNTRIES, RESOURCES, FACTS, MISSIONS, UNMAPPED, COMPANIES).
- Photos: NASA image library (Artemis II art002e021278 and art002e012228, Apollo 17 AS17-140-21497, LRO PIA13523), public domain.

## Research

Done on 19 November 2026.

- **Tavily** for all web facts, with key pages checked in full using Tavily extract.
- **TradeVerifyd** for company registrations, ownership links, trade relationships and sanctions/forced-labor flags.
- **Sayari** was planned but its connection had expired; adding it is a next step.

Notes are in `research/moon-resources-2026-11.json`.

## Writing style

Headings, big numbers and the menu use the Orbitron space-style font; body text uses Inter.


Plain language for a general reader. No "we," "our" or "us" in site text. Every fact links to a source. Future dates are labeled as targets.
