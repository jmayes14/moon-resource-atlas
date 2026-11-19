// Shared data for the Moon Resource Atlas.
// Edit facts here only. Every fact points to a key in SOURCES.
// Research done 19 November 2026 with Tavily (web) and TradeVerifyd (company records).

const SOURCES = {
  // Helium-3 science
  ntrsHe3:      { title: "Lunar Helium-3: Mining Concepts, Extraction Research, and Opportunities", pub: "NASA Technical Reports Server (AIAA ASCEND 2021)", url: "https://ntrs.nasa.gov/api/citations/20210022801/downloads/AIAA%20ASCEND%202021%20Paper_211018.pdf", via: "Tavily" },
  natureHe3:    { title: "Helium reservoirs in iron nanoparticles on the lunar surface", pub: "Communications Earth & Environment (Nature), 2024", url: "https://www.nature.com/articles/s43247-024-01349-z", via: "Tavily" },
  usgsHe3Map:   { title: "Estimated solar wind-implanted helium-3 distribution on the Moon", pub: "U.S. Geological Survey", url: "https://www.usgs.gov/publications/estimated-solar-wind-implanted-helium-3-distribution-moon", via: "Tavily" },
  lpscReserves: { title: "The estimation of helium-3 probable reserves in lunar regolith", pub: "Lunar and Planetary Science Conference, 2007", url: "https://www.lpi.usra.edu/meetings/lpsc2007/pdf/2175.pdf", via: "Tavily" },
  spacenewsUsgs:{ title: "Interlune plans to gather scarce lunar Helium-3 for quantum computing on Earth", pub: "SpaceNews", url: "https://spacenews.com/interlune-plans-to-gather-scarce-lunar-helium-3-for-quantum-computing-on-earth", via: "Tavily" },
  nasaSolarWind:{ title: "Solar Wind on the Moon", pub: "NASA Science", url: "https://science.nasa.gov/moon/solar-wind", via: "Tavily" },
  svsMagnetotail:{ title: "The Moon Passes In and Out of Earth's Magnetosphere", pub: "NASA Scientific Visualization Studio, July 2026", url: "https://svs.gsfc.nasa.gov/5648", via: "Tavily" },
  cnsaHe3:      { title: "New mineral found by Chinese scientists (Chang'e-5 samples and helium-3)", pub: "China National Space Administration", url: "https://www.cnsa.gov.cn/english/n6465652/n6465653/c6840851/content.html", via: "Tavily" },

  // Water ice and rare earths
  nasaWater:    { title: "Moon Water and Ices", pub: "NASA Science", url: "https://science.nasa.gov/moon/moon-water-and-ices", via: "Tavily" },
  usgsREE:      { title: "Rare Earth Elements on the Moon (Fact Sheet 2025-3049)", pub: "U.S. Geological Survey", url: "https://pubs.usgs.gov/fs/2025/3049/fs20253049.pdf", via: "Tavily" },

  // Helium-3 market
  geekwireIL:   { title: "Interlune reveals partners and customers for lunar helium-3", pub: "GeekWire, May 2025", url: "https://www.geekwire.com/2025/interlune-moon-mining-vermeer-maybell-quantum-doe", via: "Tavily" },
  bluefors:     { title: "Bluefors Enters Deal to Secure Lunar Helium-3 Supply From Interlune", pub: "The Quantum Insider, Sept 2025", url: "https://thequantuminsider.com/2025/09/17/bluefors-enters-deal-to-secure-lunar-helium-3-supply-from-interlune", via: "Tavily" },
  cimBluefors:  { title: "Mining the moon's helium", pub: "CIM Magazine, Sept 2025", url: "https://magazine.cim.org/en/news/2025/mining-the-moon-s-helium-en", via: "Tavily" },
  interlunePlan:{ title: "Excavate, Sort, Extract, and Separate: Interlune Core Intellectual Property", pub: "Interlune (company's own claim)", url: "https://www.interlune.space/blog/excavate-sort-extract-and-separate-interlune-core-intellectual-property", via: "Tavily" },
  prospectMoon: { title: "NASA funds Interlune payload to test helium-3 extraction from lunar regolith in 2028", pub: "Space Daily", url: "https://spacedaily.com/sd-n-nasa-backs-interlunes-2028-bid-to-mine-helium-3-from-the-moon", via: "Tavily" },
  vermeer:      { title: "Partners plan to make machines for moon construction", pub: "Cosmic Log / GeekWire, July 2026", url: "https://cosmiclog.com/tag/interlune", via: "Tavily" },
  he3Rivals:    { title: "Lunar Helium-3 Mining 2026: Full Competitor Breakdown", pub: "Space Startup News (video)", url: "https://www.youtube.com/watch?v=-5-wqZP8kdI", via: "Tavily" },
  hackadayHe3:  { title: "New Artemis Plan Returns To Apollo Playbook", pub: "Hackaday, March 2026", url: "https://hackaday.com/2026/03/04/new-artemis-plan-returns-to-apollo-playbook", via: "Tavily" },
  blueOasis:    { title: "Blue Origin Plans A Pair Of Low-Flying Prospectors Around The Lunar South Pole", pub: "Universe Today, 2026", url: "https://www.universetoday.com/articles/blue-origin-plans-a-pair-of-low-flying-prospectors-around-the-lunar-south-pole", via: "Tavily" },
  crescentMoon: { title: "LSIC Fall Meeting program (Interlune Crescent Moon camera on FLIP rover)", pub: "Johns Hopkins APL Lunar Surface Innovation Consortium, Oct 2026", url: "https://lsic.jhuapl.edu/uploadedDocs/focus-files/3313-2026_LSIC_Fall_Digital_Program.pdf", via: "Tavily" },

  // United States
  nasaMoonBase: { title: "Moon Base: Frequently Asked Questions", pub: "NASA", url: "https://www.nasa.gov/moon-base-frequently-asked-questions", via: "Tavily" },
  spoArtemis:   { title: "NASA is Full Steam Ahead on Artemis III, IV and V", pub: "SpacePolicyOnline, Oct 2026", url: "https://spacepolicyonline.com/news/nasa-is-full-steam-ahead-on-artemis-iii-iv-and-v", via: "Tavily" },
  bbcArtemis:   { title: "What is Nasa's Artemis III mission? And what comes next?", pub: "BBC News, 2026", url: "https://www.bbc.com/news/articles/cr5j40ezgz4o", via: "Tavily" },
  griffin:      { title: "Delivering the Moon Base (Griffin-1 targets January 2027)", pub: "Voyager Technologies (company's own claim)", url: "https://voyagertechnologies.com/insights/delivering-the-moon-base", via: "Tavily" },
  griffinSite:  { title: "Last Lunar Lander Standing: Griffin-1 Completes Rigorous JPL Test Campaign", pub: "Tech Times, Oct 2026", url: "https://www.techtimes.com/articles/328962/20261013/last-lunar-lander-standing-griffin-1-completes-rigorous-jpl-test-campaign.htm", via: "Tavily" },
  clps2026:     { title: "NASA Moon Base 2026: Four Commercial Landers Clear Final Test Gates", pub: "Tech Times, Aug 2026", url: "https://www.techtimes.com/articles/323050/20260804/nasa-moon-base-2026-four-commercial-landers-clear-final-test-gates-simultaneously.htm", via: "Tavily" },
  ieeeMoonBase: { title: "How NASA's Three-Phase Plan Targets a Moon Base", pub: "IEEE Spectrum, 2026", url: "https://spectrum.ieee.org/nasa-moon-base-landings", via: "Tavily" },
  bg2:          { title: "Blue Ghost Mission 2: Launch Date and Status", pub: "SpaceNexus (citing NASA, Sept 2026)", url: "https://spacenexus.us/moon/missions/blue-ghost-2", via: "Tavily" },
  nssdcApollo:  { title: "Apollo Landing Site Coordinates", pub: "NASA Space Science Data Coordinated Archive", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html", via: "Tavily" },
  wikiObjects:  { title: "List of artificial objects on the Moon", pub: "Wikipedia", url: "https://en.wikipedia.org/wiki/List_of_artificial_objects_on_the_Moon", via: "Tavily" },

  // China and Russia
  ce7Delay:     { title: "Chang'e-7 launch will not proceed in planned window this year", pub: "SpacePolicyOnline, Aug 2026", url: "https://spacepolicyonline.com/events/launch-of-chinas-change-7-robotic-lunar-mission-window-opens-aug-24-2026", via: "Tavily" },
  ce7Site:      { title: "China Launches Chang'e-7 to Hunt Moon Water Ice", pub: "Technology Org, Aug 2026", url: "https://www.technology.org/2026/08/21/change-7-launch-moon-south-pole-water-ice", via: "Tavily" },
  sciamMoonBase:{ title: "How to build a moon base", pub: "Scientific American, 2026", url: "https://www.scientificamerican.com/article/how-to-build-a-moon-base", via: "Tavily" },
  ce8Change:    { title: "China alters Chang'e-8 lunar mission amid lunar program reorganization", pub: "SpaceNews", url: "https://www.linkedin.com/posts/spacenews_china-alters-change-8-lunar-south-pole-mission-activity-7503808262362972160-VwRL", via: "Tavily" },
  asiaTimes:    { title: "US-China space race shifts into a higher lunar gear", pub: "Asia Times, April 2026", url: "https://asiatimes.com/2026/04/us-china-space-race-shifts-into-a-higher-lunar-gear", via: "Tavily" },
  neiRussia:    { title: "Russia resets lunar programme", pub: "Nuclear Engineering International, 2026", url: "https://www.neimagazine.com/news/russia-resets-lunar-programme", via: "Tavily" },
  elpaisRussia: { title: "Russia drops out of the race to the Moon and postpones its next spacecraft to 2028", pub: "El País, April 2026", url: "https://english.elpais.com/science-tech/2026-04-09/russia-drops-out-of-the-race-to-the-moon-and-postpones-the-launch-of-its-next-spacecraft-to-2028.html", via: "Tavily" },

  // India, Korea
  hinduCh4:     { title: "ISRO identifies site for Chandrayaan-4 lander", pub: "The Hindu, Feb 2026", url: "https://www.thehindu.com/sci-tech/science/isro-identifies-site-for-chandrayaan-4-lander/article70611017.ece", via: "Tavily" },
  koreaHerald:  { title: "S. Korea eyes moon landing in 2030", pub: "The Korea Herald, 2026", url: "https://www.koreaherald.com/article/10710071", via: "Tavily" },
  skyIgnition:  { title: "NASA ramps up Moon missions, announces regular crewed visits and a permanent Moon base", pub: "BBC Sky at Night Magazine, March 2026", url: "https://www.skyatnightmagazine.com/news/nasa-ignition-moon-announcements-march-2026", via: "Tavily" },
  koreaSites:   { title: "Korean lunar navigation constellation (KASA candidate landing sites)", pub: "Scientific Reports (Nature), 2026", url: "https://www.nature.com/articles/s41598-026-60190-w", via: "Tavily" },

  // Rules and blocs
  accords78:    { title: "Vietnam and Uzbekistan join Artemis Accords", pub: "DiploFoundation, Oct 2026 (citing NASA)", url: "https://www.diplomacy.edu/updates/vietnam-uzbekistan-artemis-accords", via: "Tavily" },
  spoAccords:   { title: "Serbia, Mauritius Bring Artemis Accords to 70", pub: "SpacePolicyOnline, July 2026", url: "https://spacepolicyonline.com/news/serbia-mauritius-bring-artemis-accords-to-70", via: "Tavily" },
  britAccords:  { title: "Artemis Accords", pub: "Britannica", url: "https://www.britannica.com/topic/Artemis-Accords", via: "Tavily" },
  diaSpace:     { title: "Challenges to Security in Space 2026", pub: "U.S. Defense Intelligence Agency", url: "https://www.dia.mil/Portals/110/Images/News/Military_Powers_Publications/Challenges_Security_Space_2026.pdf", via: "Tavily" },

  // Images
  svsMoonKit:   { title: "CGI Moon Kit (LROC color map used for the globe)", pub: "NASA Scientific Visualization Studio", url: "https://svs.gsfc.nasa.gov/4720", via: "Tavily" },

  // TradeVerifyd company records (need a TradeVerifyd account to open)
  tvBlueOrigin: { title: "Blue Origin, LLC: 28 supplier links in trade records", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvIM:         { title: "Intuitive Machines, Inc.: 4 supplier links in trade records", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvFirefly:    { title: "Firefly Aerospace Inc.: 2 supplier links, linked companies", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvBluefors:   { title: "Bluefors Oy: 5 customer links, 1 supplier link", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvMaybell:    { title: "Maybell Quantum Industries, Inc.: 2 supplier links", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvInterlune:  { title: "Interlune Corporation: registered, no trade records yet", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvIspace:     { title: "ispace, inc.: 1 supplier link", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
  tvVermeer:    { title: "Vermeer Corporation: 48 supplier and 14 customer links", pub: "TradeVerifyd", url: "", via: "TradeVerifyd" },
};

// Who is going. Colors are used on every page.
const COUNTRIES = {
  us: { name: "United States", color: "#4ea1ff", bloc: "artemis" },
  cn: { name: "China",         color: "#ff4d5e", bloc: "ilrs" },
  in: { name: "India",         color: "#ff9a3c", bloc: "artemis" },
  jp: { name: "Japan",         color: "#f4f1ea", bloc: "artemis" },
  ru: { name: "Russia / USSR", color: "#a77bff", bloc: "ilrs" },
  kr: { name: "South Korea",   color: "#33d39a", bloc: "artemis" },
  ot: { name: "Other",         color: "#b9c2c9", bloc: "" },
};

// Resource areas on the Moon. Areas are drawn as circles: [lon, lat, radius in degrees].
// They are simplified outlines of published maps, not exact borders.
const RESOURCES = {
  he3: {
    name: "Helium-3", color: "#ffcf5a",
    short: "Best guesses for the richest soil, based on a U.S. Geological Survey model.",
    long: "Helium-3 is spread thinly across the whole Moon. The U.S. Geological Survey model finds the most in dark lava plains rich in titanium on the near side, and in the lava plains on the far side, which get more solar wind.",
    src: ["usgsHe3Map", "natureHe3"],
    areas: [
      { name: "Sea of Tranquility (Mare Tranquillitatis)", c: [31, 8.5, 11], note: "Apollo 11 soil from here averaged 11.8 parts per billion of helium-3." },
      { name: "Ocean of Storms, western part (Oceanus Procellarum)", c: [-57, 15, 14], note: "Large, titanium-rich lava plains." },
      { name: "Sea of Moscow (Mare Moscoviense), far side", c: [148, 27, 4.5], note: "Far-side lava plains get more solar wind." },
    ],
  },
  ice: {
    name: "Water ice", color: "#7fdcff",
    short: "Craters at the poles where sunlight never reaches.",
    long: "Some craters near the poles never see sunlight and stay colder than about -200 °C. Water ice has collected there. Ice means drinking water, oxygen to breathe, and rocket fuel. That is why almost every country is aiming for the south pole.",
    src: ["nasaWater"],
    areas: [
      { name: "South pole cold traps", c: [0, -90, 5.5], note: "Most of the ice is in craters here. Shackleton, Cabeus, Haworth, Shoemaker and Faustini are among them." },
      { name: "North pole cold traps", c: [0, 90, 5], note: "Ice here is thinner and more spread out than at the south pole." },
    ],
    spots: [
      { name: "Shackleton crater", ll: [129.8, -89.7] },
      { name: "Cabeus crater (NASA LCROSS found ice here in 2009)", ll: [-42.1, -85.3] },
      { name: "Haworth crater", ll: [-5, -87.4] },
      { name: "Shoemaker crater", ll: [44.9, -88.1] },
      { name: "Faustini crater", ll: [77, -87.3] },
    ],
  },
  ree: {
    name: "Rare earths", color: "#e88cff",
    short: "Rock called KREEP, mostly in a ring around the Sea of Showers.",
    long: "Rare earth elements are needed for magnets, phones and wind turbines. China supplies most of the world's refined rare earths. On the Moon, a rock type called KREEP holds them. Orbiting satellites found it mostly in a ring around the Imbrium basin on the near side.",
    src: ["usgsREE"],
    areas: [
      { name: "Imbrium basin ring (Procellarum KREEP Terrane)", c: [-22, 28, 26], note: "The full rare-earth region covers about 16% of the Moon, more than twice the size of Greenland." },
    ],
  },
};

// Missions. status: landed | crashed | planned. ll = [lon, lat]. approx = location is approximate.
// region = draw a dashed area instead of a dot (for plans with no exact site yet).
const MISSIONS = [
  // Past: United States
  { id: "a11", name: "Apollo 11", who: "us", year: 1969, status: "landed", ll: [23.47, 0.67], what: "First people on the Moon. Its soil samples were later found to contain helium-3.", src: ["nssdcApollo", "ntrsHe3"] },
  { id: "a12", name: "Apollo 12", who: "us", year: 1969, status: "landed", ll: [-23.42, -3.01], what: "Crewed landing in the Ocean of Storms.", src: ["nssdcApollo"] },
  { id: "a14", name: "Apollo 14", who: "us", year: 1971, status: "landed", ll: [-17.47, -3.65], what: "Crewed landing in the Fra Mauro highlands.", src: ["nssdcApollo"] },
  { id: "a15", name: "Apollo 15", who: "us", year: 1971, status: "landed", ll: [3.63, 26.13], what: "Crewed landing at Hadley Rille, with the first Moon car.", src: ["nssdcApollo"] },
  { id: "a16", name: "Apollo 16", who: "us", year: 1972, status: "landed", ll: [15.50, -8.97], what: "Crewed landing in the Descartes highlands.", src: ["nssdcApollo"] },
  { id: "a17", name: "Apollo 17", who: "us", year: 1972, status: "landed", ll: [30.77, 20.19], what: "Last crewed landing. Geologist Harrison Schmitt, now a cofounder of the helium-3 company Interlune, collected soil here.", src: ["nssdcApollo"] },
  { id: "im1", name: "IM-1 Odysseus (Intuitive Machines)", who: "us", year: 2024, status: "landed", approx: true, ll: [1.4, -80.1], what: "First U.S. landing since 1972. It tipped over on landing.", src: ["wikiObjects"] },
  { id: "bg1", name: "Blue Ghost 1 (Firefly)", who: "us", year: 2025, status: "landed", ll: [61.81, 18.56], what: "First fully successful private landing, in the Sea of Crises.", src: ["wikiObjects"] },
  { id: "im2", name: "IM-2 Athena (Intuitive Machines)", who: "us", year: 2025, status: "landed", ll: [29.20, -84.79], what: "Landed near Mons Mouton at the south pole but fell over.", src: ["wikiObjects"] },

  // Past: USSR / Russia
  { id: "l16", name: "Luna 16", who: "ru", year: 1970, status: "landed", ll: [56.3, -0.68], what: "First robot to bring Moon soil back to Earth.", src: ["wikiObjects"] },
  { id: "l25", name: "Luna 25", who: "ru", year: 2023, status: "crashed", ll: [61.36, -57.87], what: "Russia's first Moon mission in 47 years. It crashed on the way to the south pole.", src: ["wikiObjects", "diaSpace"] },

  // Past: China
  { id: "ce4", name: "Chang'e-4", who: "cn", year: 2019, status: "landed", ll: [177.59, -45.46], what: "First landing ever on the far side.", src: ["wikiObjects"] },
  { id: "ce5", name: "Chang'e-5", who: "cn", year: 2020, status: "landed", approx: true, ll: [-51.9, 43.1], what: "Brought back 1.7 kg of soil. Chinese scientists measured helium-3 in it.", src: ["cnsaHe3"] },
  { id: "ce6", name: "Chang'e-6", who: "cn", year: 2024, status: "landed", ll: [-153.99, -41.64], what: "First soil ever brought back from the far side.", src: ["wikiObjects"] },

  // Past: India, Japan, others
  { id: "ch3", name: "Chandrayaan-3", who: "in", year: 2023, status: "landed", ll: [32.32, -69.37], what: "First landing near the south pole, at 'Shiv Shakti point'.", src: ["wikiObjects"] },
  { id: "slim", name: "SLIM", who: "jp", year: 2024, status: "landed", ll: [25.25, -13.32], what: "Japan's first landing. A pinpoint-landing test.", src: ["wikiObjects"] },
  { id: "hk1", name: "Hakuto-R 1 (ispace)", who: "jp", year: 2023, status: "crashed", ll: [44.09, 47.58], what: "Private Japanese lander. It crashed, along with the UAE's Rashid rover.", src: ["wikiObjects"] },
  { id: "hk2", name: "Resilience (ispace)", who: "jp", year: 2025, status: "crashed", ll: [-4.59, 60.44], what: "Carried a small rover with a scoop to test collecting Moon soil. It crashed.", src: ["wikiObjects"] },
  { id: "ber", name: "Beresheet", who: "ot", year: 2019, status: "crashed", ll: [19.35, 32.60], what: "Israel's private lander. It crashed in the Sea of Serenity.", src: ["wikiObjects"] },

  // Planned: United States
  { id: "art4", name: "Artemis IV crewed landing", who: "us", year: 2028, status: "planned", region: [0, -87, 4], what: "NASA's next astronaut landing, near the south pole. Artemis III became a 2027 test flight in orbit around Earth.", src: ["spoArtemis", "bbcArtemis"] },
  { id: "base", name: "NASA Moon Base", who: "us", year: 2032, status: "planned", region: [0, -88, 6], what: "Phase 1 (to 2029): robot scouts. Phase 2 (2029-2032): power, communications and transport. Phase 3 (from 2032): homes for a lasting human presence near the south pole.", src: ["nasaMoonBase"] },
  { id: "gr1", name: "Griffin-1 (Voyager / Astrobotic)", who: "us", year: 2027, status: "planned", approx: true, ll: [45, -85.3], what: "Largest private lander yet, aiming for the Nobile crater area. Carries the FLIP rover with Interlune's helium-3 camera. Now targeting January 2027.", src: ["griffin", "griffinSite", "crescentMoon"] },
  { id: "im3", name: "IM-3 (Intuitive Machines)", who: "us", year: 2027, status: "planned", approx: true, ll: [-59, 7.5], what: "Will study the Reiner Gamma 'lunar swirl', a spot with its own small magnetic field.", src: ["clps2026"] },

  // Planned: China
  { id: "ce7", name: "Chang'e-7", who: "cn", year: 2027, status: "planned", ll: [123.4, -88.8], what: "Lander, rover and a hopping robot to search for ice near Shackleton crater. Delayed from August 2026 to 2027.", src: ["ce7Delay", "ce7Site"] },
  { id: "ce8", name: "Chang'e-8", who: "cn", year: 2029, status: "planned", approx: true, ll: [31, -84.6], what: "Tests making bricks and other things from Moon soil, on a plateau near Mons Mouton. Its date may move to 2030 or 2031.", src: ["sciamMoonBase", "ce8Change"] },
  { id: "ilrs", name: "International Lunar Research Station (China + Russia)", who: "cn", year: 2035, status: "planned", region: [120, -88, 5], what: "Basic base at the south pole by about 2035. Russia plans a nuclear power plant for it. China also plans to land astronauts before 2030 (site not chosen).", src: ["asiaTimes", "neiRussia"] },

  // Planned: India, Russia, Korea
  { id: "ch4", name: "Chandrayaan-4", who: "in", year: 2028, status: "planned", approx: true, ll: [31.5, -84.4], what: "India's first sample return. Site MM-4 near Mons Mouton was chosen for landing.", src: ["hinduCh4"] },
  { id: "l27a", name: "Luna-27A", who: "ru", year: 2029, status: "planned", region: [60, -86, 4], what: "Russian lander to the south pole. An orbiter (Luna-26) goes first in 2028 to scout sites.", src: ["neiRussia", "elpaisRussia"] },
  { id: "l27b", name: "Luna-27B", who: "ru", year: 2030, status: "planned", region: [0, 86, 4], what: "Russian lander to the north pole.", src: ["neiRussia"] },
  { id: "kr", name: "Korean lunar lander", who: "kr", year: 2032, status: "planned", approx: true, ll: [27.2, 45.1], what: "South Korea's first landing. Six candidate sites, including Lacus Mortis (shown), Endymion, Gärtner, Clavius, Pingré and Maginus.", src: ["koreaSites"] },
];

// Plans with no public landing site yet (listed, not mapped).
const UNMAPPED = [
  { name: "Blue Ghost Mission 2 (Firefly, with ESA and the UAE)", who: "us", year: 2027, what: "First U.S. landing on the far side. Exact site not public.", src: ["bg2"] },
  { name: "Interlune Prospect Moon", who: "us", year: 2028, what: "Tests helium-3 extraction near the equator. Site kept secret for competitive reasons.", src: ["prospectMoon", "spacenewsUsgs"] },
  { name: "Chinese crewed landing", who: "cn", year: 2030, what: "Two astronauts, three days on the surface. Likely a low-risk near-side site; not yet chosen.", src: ["sciamMoonBase", "asiaTimes"] },
  { name: "LUPEX / Chandrayaan-5 (India + Japan)", who: "in", year: 2028, what: "Joint water-ice rover mission to the south pole.", src: ["hinduCh4"] },
];

// Company front-runners for Moon mining and its supply chain.
const COMPANIES = [
  { name: "Interlune", country: "United States", role: "dig", stage: "Mining helium-3",
    what: "Plans to scoop and heat Moon soil to collect helium-3. Has signed buyers: Bluefors (up to 10,000 liters a year, 2028-2037), Maybell Quantum, and the U.S. Department of Energy (3 liters by April 2029).",
    next: "Crescent Moon camera on Griffin-1 (2027), Prospect Moon test (2028), pilot plant, then full harvesting in the early 2030s.",
    records: "Registered company, but no trade records yet. It has not shipped hardware.",
    src: ["geekwireIL", "bluefors", "interlunePlan", "prospectMoon", "tvInterlune"] },
  { name: "Magna Petra", country: "United States", role: "dig", stage: "Mining helium-3",
    what: "Plans a gentler method that collects only the loosely held helium-3 near the surface. Partnered with Japan's ispace.",
    next: "Demonstration missions on ispace landers (dates not confirmed).",
    records: "Registered company, no trade records yet.",
    src: ["he3Rivals", "hackadayHe3"] },
  { name: "Vermeer", country: "United States", role: "dig", stage: "Digging machines",
    what: "Iowa construction-equipment maker. Built a full-size Moon excavator prototype with Interlune that handles about 100 tonnes of soil an hour.",
    next: "Expanded partnership in 2026 to build site-preparation machines for a Moon base.",
    records: "48 supplier links and 14 customer links in trade records. Its supply chain is large and already global.",
    src: ["vermeer", "hackadayHe3", "tvVermeer"] },
  { name: "Blue Origin", country: "United States", role: "ship", stage: "Landers and prospecting",
    what: "Building the Blue Moon landers for NASA. Proposed Oasis-1, two small satellites that would map ice, metals and helium-3 near the south pole. Runs the 'Blue Alchemist' project to make materials from Moon soil.",
    next: "Blue Moon MK1 first flight slipped to 2027.",
    records: "28 supplier links, including aluminum tanks and parts from MT Aerospace (Germany), copper from KME (Germany), metal 3D printers from Nikon SLM Solutions, and machinery from Chinese firms Hangzhou Sheyin Technology and Nantong Reoo Technology.",
    src: ["blueOasis", "clps2026", "tvBlueOrigin"] },
  { name: "Intuitive Machines", country: "United States", role: "ship", stage: "Landers",
    what: "Has landed twice near the south pole (2024, 2025). Both landers tipped over.",
    next: "IM-3 to Reiner Gamma (2027).",
    records: "4 supplier links, all in India, including titanium and aluminum parts (Astratek Precision Manufacturer, Accura Global Tech) and electronics (Numato Systems).",
    src: ["wikiObjects", "clps2026", "tvIM"] },
  { name: "Firefly Aerospace", country: "United States", role: "ship", stage: "Landers",
    what: "Made the first fully successful private landing (2025).",
    next: "Blue Ghost Mission 2 to the far side (2027), carrying the UAE's Rashid 2 rover.",
    records: "2 supplier links, one with a Chinese firm (Ets Solutions China Ltd; goods not listed). Linked to companies including Firefly Aerospace Ukraine LLC and SciTec.",
    src: ["bg2", "tvFirefly"] },
  { name: "Voyager Technologies (Astrobotic)", country: "United States", role: "ship", stage: "Landers",
    what: "Owns Astrobotic. Its Griffin-1 lander will carry Interlune's helium-3 camera to the south pole.",
    next: "Griffin-1 launch targeted for January 2027.",
    records: "Astrobotic is registered; no supplier links found under its name.",
    src: ["griffin", "griffinSite"] },
  { name: "ispace", country: "Japan", role: "ship", stage: "Landers",
    what: "Two landing attempts (2023, 2025), both crashed. Partner of Magna Petra.",
    next: "Mission 3 around 2028.",
    records: "1 supplier link (electronics).",
    src: ["wikiObjects", "he3Rivals", "tvIspace"] },
  { name: "Bluefors", country: "Finland", role: "buy", stage: "Buyer",
    what: "World leader in ultra-cold refrigerators for quantum computers, which need helium-3. Agreed to buy up to 10,000 liters a year of Moon helium-3 from Interlune, a deal reported at over $300 million.",
    next: "Deliveries planned 2028-2037.",
    records: "Ships cooling-system parts to Indian research labs, including the Indian Institute of Science, IIT Bombay and the Tata Institute of Fundamental Research.",
    src: ["bluefors", "cimBluefors", "tvBluefors"] },
  { name: "Maybell Quantum", country: "United States", role: "buy", stage: "Buyer",
    what: "Makes quantum-computer refrigerators. Signed a multi-year helium-3 deal with Interlune.",
    next: "Deliveries depend on Interlune's schedule.",
    records: "2 supplier links, including Highlight Tech Corp (cooling equipment) and Guan Ming Singapore (machine parts).",
    src: ["geekwireIL", "tvMaybell"] },
  { name: "China's state space program (CASC / CNSA)", country: "China", role: "ship", stage: "State program",
    what: "China's government builds and flies its own landers. Chinese scientists have measured helium-3 in Chang'e-5 soil and say the Moon holds at least 1 million tonnes.",
    next: "Chang'e-7 (2027), Chang'e-8, crewed landing before 2030, ILRS base by 2035.",
    records: "State-owned; not traced in this research.",
    src: ["cnsaHe3", "asiaTimes"] },
];

// ----- helpers -----
function srcLink(key) {
  const s = SOURCES[key];
  if (!s) return "";
  const tag = `<span class="via via-${s.via.toLowerCase()}">via ${s.via}</span>`;
  return s.url
    ? `<a href="${s.url}" target="_blank" rel="noopener">${s.pub}</a> ${tag}`
    : `${s.pub}: ${s.title} ${tag}`;
}
function srcList(keys) { return keys.map(srcLink).join(" · "); }
