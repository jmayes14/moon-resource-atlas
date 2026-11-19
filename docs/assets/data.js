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

  // Metals and other raw materials
  lrocTi:       { title: "Ilmenite Seen with Ultraviolet Light (LROC titanium map)", pub: "Lunar Reconnaissance Orbiter Camera team, Arizona State University", url: "https://lroc.im-ldi.com/images/986", via: "Tavily" },
  earthskyTi:   { title: "Moon map reveals titanium treasure troves (NASA LRO release)", pub: "EarthSky", url: "https://earthsky.org/space/moon-map-reveals-titanium-treasure-troves", via: "Tavily" },
  wikiGeology:  { title: "Geology of the Moon (surface chemical composition table)", pub: "Wikipedia", url: "https://en.wikipedia.org/wiki/Geology_of_the_Moon", via: "Tavily" },
  esaOxygen:    { title: "Oxygen and metal from lunar regolith", pub: "European Space Agency, 2019", url: "https://www.esa.int/media/oxygen-and-metal-from-lunar-regolith", via: "Tavily" },
  spaWiki:      { title: "South Pole–Aitken basin", pub: "Wikipedia", url: "https://en.wikipedia.org/wiki/South_Pole%E2%80%93Aitken_basin", via: "Tavily" },
  spaNature:    { title: "Southward impact excavated magma ocean at the lunar South Pole–Aitken basin", pub: "Nature, 2025", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12507655", via: "Tavily" },
  blueAlchemist:{ title: "Blue Alchemist Hits Major Milestone Toward Permanent and Sustainable Lunar Infrastructure", pub: "Blue Origin (company's own claim)", url: "https://www.blueorigin.com/news/blue-alchemist-hits-major-milestone-toward-permanent-sustainable-lunar-infrastructure", via: "Tavily" },
  nasaISRU:     { title: "Lunar Surface Technology (oxygen-from-regolith projects)", pub: "NASA", url: "https://www.nasa.gov/lunar-surface-technology", via: "Tavily" },
  pgmNature:    { title: "Precious metal enrichment during impacts on the Moon", pub: "Communications Earth & Environment (Nature), 2025", url: "https://www.nature.com/articles/s43247-025-03046-x", via: "Tavily" },
  pgmCraters:   { title: "On ore-bearing asteroid remnants in lunar craters", pub: "Planetary and Space Science, 2025 (arXiv)", url: "https://arxiv.org/html/2508.03025v1", via: "Tavily" },

  // Primary sources for the resource fact sheet (checked in full with Tavily extract, 19 Nov 2026)
  nasaMiniSAR:  { title: "NASA Radar Finds Ice Deposits at Moon's North Pole", pub: "NASA Science (Mini-SAR on Chandrayaan-1), 2010", url: "https://science.nasa.gov/missions/mini-rf/nasa-radar-finds-ice-deposits-at-moons-north-pole", via: "Tavily" },
  aaasLCROSS:   { title: "LCROSS Impact Ejects Minerals and Frozen Water from Crater on the Moon", pub: "AAAS / Science, Oct 2010", url: "https://www.aaas.org/news/science-lcross-impact-ejects-minerals-and-frozen-water-crater-moon", via: "Tavily" },
  natLCROSS:    { title: "Exogenic origin for the volatiles sampled by the LCROSS impact", pub: "Nature Communications, 2022", url: "https://www.nature.com/articles/s41467-022-28289-6", via: "Tavily" },
  ntrsWater:    { title: "Robust Exploration and Commercial Missions to the Moon Using Lunar Polar Ice (NASA TM-2018-219937)", pub: "NASA Technical Reports Server, 2018", url: "https://ntrs.nasa.gov/api/citations/20180008495/downloads/20180008495.pdf", via: "Tavily" },
  wustlComp:    { title: "The chemical composition of lunar soil", pub: "Washington University in St. Louis (Randy Korotev)", url: "https://sites.wustl.edu/meteoritesite/items/the-chemical-composition-of-lunar-soil", via: "Tavily" },
  sourcebook:   { title: "Lunar Sourcebook: A User's Guide to the Moon, Chapter 6", pub: "Lunar and Planetary Institute", url: "https://www.lpi.usra.edu/publications/books/lunar_sourcebook/pdf/Chapter06.pdf", via: "Tavily" },
  ce5Soil:      { title: "Characteristics of the lunar samples returned by the Chang'E-5 mission", pub: "National Science Review, 2022", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8974359", via: "Tavily" },
  nasaShackleton:{ title: "Shackleton Crater's Illuminated Rim & Shadowed Interior", pub: "NASA Science", url: "https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior", via: "Tavily" },

  // Extraction methods (checked with Tavily extract, 19 Nov 2026)
  nasaWaterQA:  { title: "Is There Water on the Moon? We Asked a NASA Scientist", pub: "NASA", url: "https://www.nasa.gov/general/is-there-water-on-the-moon-we-asked-a-nasa-scientist-episode-27", via: "Tavily" },
  sofia:        { title: "NASA's SOFIA Discovers Water on Sunlit Surface of Moon", pub: "NASA, 2020", url: "https://www.nasa.gov/news-release/nasas-sofia-discovers-water-on-sunlit-surface-of-moon", via: "Tavily" },
  mitIce:       { title: "Here's how we could mine the moon for rocket fuel", pub: "MIT Technology Review, 2020", url: "https://www.technologyreview.com/2020/05/19/1001857/how-moon-lunar-mining-water-ice-rocket-fuel", via: "Tavily" },
  ntrsMicrowave:{ title: "Microwave Extraction of Water from Lunar Regolith Simulant", pub: "NASA Marshall Space Flight Center (NTRS), 2007", url: "https://ntrs.nasa.gov/api/citations/20070018802/downloads/20070018802.pdf", via: "Tavily" },
  nasaThermal:  { title: "Thermal Mining of Ices on Cold Solar System Bodies (NIAC study, Colorado School of Mines)", pub: "NASA", url: "https://www.nasa.gov/general/thermal-mining-of-ices-on-cold-solar-system-bodies", via: "Tavily" },
  ntrsPropellant:{ title: "Technology Assessment for Producing Propellant From Lunar Water", pub: "NASA Technical Reports Server, 2023", url: "https://ntrs.nasa.gov/citations/20230010039", via: "Tavily" },
  nasaPrime1:   { title: "NASA's Lunar Drill Technology Passes Tests on the Moon (PRIME-1)", pub: "NASA, 2025", url: "https://www.nasa.gov/missions/artemis/nasas-lunar-drill-technology-passes-tests-on-the-moon", via: "Tavily" },
  ntrsIlmenite: { title: "Energy study: lunar oxygen from hydrogen reduction of ilmenite", pub: "NASA Technical Reports Server, 1991", url: "https://ntrs.nasa.gov/api/citations/19910015902/downloads/19910015902.pdf", via: "Tavily" },
  spaceMaunaKea:{ title: "How NASA Hopes to Mine Water on the Moon", pub: "Space.com", url: "https://www.space.com/7350-nasa-hopes-water-moon.html", via: "Tavily" },
  aiaaMRE:      { title: "From moon dust to moon colonies (molten regolith electrolysis)", pub: "Aerospace America (AIAA)", url: "https://aerospaceamerica.aiaa.org/departments/from-moon-dust-to-moon-colonies", via: "Tavily" },
  magnaFAQ:     { title: "Magna Petra FAQ", pub: "Magna Petra (company's own claim)", url: "https://magnapetra.com/faq", via: "Tavily" },
  mdpiREE:      { title: "Sources of Extraterrestrial Rare Earth Elements: To the Moon and Beyond", pub: "Resources (MDPI), 2017", url: "https://www.mdpi.com/2079-9276/6/3/40", via: "Tavily" },

  // Why extract / benefits to Earth (checked with Tavily extract, 19 Nov 2026)
  aaasHe3:      { title: "AAAS Workshop Explores How to Meet Demand for Helium-3 in Medicine, Industry, and Security", pub: "AAAS", url: "https://www.aaas.org/news/aaas-workshop-explores-how-meet-demand-helium-3-medicine-industry-and-security", via: "Tavily" },
  uwFusion:     { title: "Fifty Years of Research in Helium-3 Fusion and Helium-3 Resources (UWFDM-935)", pub: "University of Wisconsin Fusion Technology Institute", url: "https://fti.neep.wisc.edu/fti.neep.wisc.edu/pdf/fdm935.pdf", via: "Tavily" },
  wikiAneutronic:{ title: "Aneutronic fusion", pub: "Wikipedia", url: "https://en.wikipedia.org/wiki/Aneutronic_fusion", via: "Tavily" },
  mitSteel:     { title: "Making steel with electricity (Boston Metal began with NASA lunar oxygen research)", pub: "MIT Department of Materials Science and Engineering", url: "https://dmse.mit.edu/news/making-steel-with-electricity", via: "Tavily" },
  ieaREE:       { title: "Rare Earth Elements: Executive summary", pub: "International Energy Agency", url: "https://www.iea.org/reports/rare-earth-elements/executive-summary", via: "Tavily" },
  crsREE:       { title: "Rare Earth Elements and U.S. Supply Chains (IF13171)", pub: "Congressional Research Service", url: "https://www.everycrsreport.com/reports/IF13171.html", via: "Tavily" },
  usgsPGE:      { title: "Platinum-group elements (Professional Paper 1802-N)", pub: "U.S. Geological Survey", url: "https://pubs.usgs.gov/publication/pp1802N", via: "Tavily" },
  doePGM:       { title: "Platinum Group Metal Catalysts: Supply Chain Deep Dive Assessment", pub: "U.S. Department of Energy", url: "https://www.energy.gov/sites/default/files/2024-12/PGM%2520catalyst%2520supply%2520chain%2520report%2520-%2520final%2520draft%25202.25.22%5B1%5D.pdf", via: "Tavily" },
  ulaProp:      { title: "Commercial Lunar Propellant Architecture (study led by industry, incl. United Launch Alliance)", pub: "ISRU Info, 2018", url: "https://isruinfo.com/public/docs/Commercial%20Lunar%20Propellant%20Architecture.pdf", via: "Tavily" },
  niaBreakeven: { title: "Cost Breakeven Analysis of Cis-lunar ISRU for Propellant", pub: "NASA-sponsored study (National Institute of Aerospace), 2019", url: "http://bigidea.nianet.org/wp-content/uploads/2019/10/Cost_Breakeven_Analysis_of_Cis-Lunar_ISRU-FINAL.pdf", via: "Tavily" },
  lmISRU:       { title: "A Water-Based Lunar Architecture", pub: "Lockheed Martin (company's own view)", url: "https://www.lockheedmartin.com/en-us/capabilities/space/human-space-exploration/water-based-lunar-architecture.html", via: "Tavily" },

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
    name: "Helium-3", color: "#ffcf5a", group: "Energy & life support", on: true, ramp: ["less", "more (est.)"],
    short: "Best guesses for the richest soil, based on a U.S. Geological Survey model.",
    long: "Helium-3 is spread thinly across the whole Moon. The U.S. Geological Survey model finds the most in dark lava plains rich in titanium on the near side, and in the lava plains on the far side, which get more solar wind.",
    src: ["usgsHe3Map", "natureHe3"],
    areas: [
      { name: "Sea of Tranquility (Mare Tranquillitatis)", label: "Helium-3 · richest", c: [31, 8.5, 11], note: "Apollo 11 soil from here averaged 11.8 parts per billion of helium-3." },
      { name: "Ocean of Storms, western part (Oceanus Procellarum)", label: "Helium-3", c: [-57, 15, 14], note: "Large, titanium-rich lava plains." },
      { name: "Sea of Moscow (Mare Moscoviense), far side", label: "Helium-3", c: [148, 27, 4.5], note: "Far-side lava plains get more solar wind." },
    ],
  },
  ice: {
    name: "Water ice", color: "#7fdcff", group: "Energy & life support", on: true, ramp: ["sunlit", "always dark, coldest"],
    short: "Craters at the poles where sunlight never reaches.",
    long: "Some craters near the poles never see sunlight. Cabeus crater's floor stays around 39–47 kelvin (about −230 °C). When NASA crashed LCROSS into it, about 5.6% of the soil it kicked up was water ice. Radar found more than 40 icy craters at the north pole alone, holding at least 600 million tonnes. Ice means drinking water, oxygen to breathe, and rocket fuel.",
    src: ["nasaWater", "aaasLCROSS", "nasaMiniSAR", "natLCROSS"],
    areas: [
      { name: "South pole cold traps", label: "Water ice", lp: [20, -83], c: [0, -90, 5.5], note: "Most of the ice is in craters here. Shackleton, Cabeus, Haworth, Shoemaker and Faustini are among them." },
      { name: "North pole cold traps", label: "Water ice", lp: [0, 83.5], c: [0, 90, 5], note: "Ice here is thinner and more spread out than at the south pole." },
    ],
    // Craters with permanently shadowed floors (approximate centers; d = diameter in km). The ice glow is drawn on these.
    spots: [
      { name: "Shackleton crater", ll: [129.8, -89.7], d: 21 },
      { name: "Cabeus crater (NASA LCROSS found ice here in 2009)", ll: [-42.1, -85.3], d: 98 },
      { name: "Haworth crater", ll: [-5, -87.4], d: 51 },
      { name: "Shoemaker crater", ll: [44.9, -88.1], d: 51 },
      { name: "Faustini crater", ll: [77, -87.3], d: 39 },
      { name: "de Gerlache crater", ll: [-87.1, -88.5], d: 32 },
      { name: "Sverdrup crater", ll: [-152, -88.3], d: 33 },
      { name: "Nobile crater", ll: [53.5, -85.2], d: 73 },
      { name: "Amundsen crater", ll: [85.6, -84.4], d: 103 },
      { name: "Hermite crater", ll: [-89.9, 86], d: 104 },
      { name: "Rozhdestvenskiy crater", ll: [-155.4, 85.2], d: 177 },
      { name: "Whipple crater", ll: [118, 89.1], d: 15 },
    ],
  },
  ree: {
    name: "Rare earths & thorium", color: "#e88cff", group: "Metals & minerals", on: true, ramp: ["less", "more thorium"],
    short: "Rock called KREEP, mostly in a ring around the Sea of Showers.",
    long: "Rare earth elements are needed for magnets, phones and wind turbines. China supplies most of the world's refined rare earths. On the Moon, a rock type called KREEP holds them. Orbiting satellites found it mostly in a ring around the Imbrium basin on the near side.",
    src: ["usgsREE"],
    areas: [
      { name: "Imbrium basin ring (Procellarum KREEP Terrane)", label: "Rare earths", lp: [-30, 30], c: [-22, 28, 26], note: "The full rare-earth region covers about 16% of the Moon, more than twice the size of Greenland." },
    ],
  },
  ti: {
    name: "Titanium", color: "#9aa8ff", group: "Metals & minerals", on: false, ramp: ["under 1.5%", "up to ~12% titanium oxide"],
    short: "Titanium-rich lava plains, found from the color of the surface.",
    long: "Titanium sits in the black mineral ilmenite, which makes lava plains look slightly bluer. NASA's Lunar Reconnaissance Orbiter camera used that to map it: from about 1% to a little over 10% in the lava plains, with the highest spots near 12% titanium oxide. That is much more than similar rocks on Earth. Ilmenite is also what holds helium-3 and can be split to make oxygen.",
    src: ["lrocTi", "earthskyTi"],
    areas: [
      { name: "Sea of Tranquility (Mare Tranquillitatis)", label: "Titanium · highest", c: [31, 8.5, 11], note: "Among the most titanium-rich plains on the Moon. Its blue tint against the Sea of Serenity next door shows the difference." },
      { name: "Ocean of Storms, western part (Oceanus Procellarum)", label: "Titanium", c: [-52, 10, 13], note: "Large titanium-rich lava plains on the western near side." },
    ],
  },
  fe: {
    name: "Iron", color: "#ff7a45", group: "Metals & minerals", on: false, ramp: ["2–6%", "up to ~22% iron oxide"],
    short: "Iron-rich lava plains, plus the floor of the giant South Pole–Aitken basin.",
    long: "Lava-plain basalt is rich in iron. Soil brought back by China's Chang'e-5 from the Ocean of Storms has 22.5% iron oxide, higher than most Apollo and Luna samples (below 22%). Some highland samples have only 2–6%. The floor of the South Pole–Aitken basin on the far side, the Moon's largest crater, is also richer in iron than the highlands around it. Iron could be used to build habitats and tools.",
    src: ["ce5Soil", "sourcebook", "spaNature"],
    areas: [
      { name: "Near-side lava plains (maria)", label: "Iron", lp: [-12, 22], c: [-15, 18, 38], note: "About 14% iron oxide, in the dark basalt that fills the near-side plains." },
      { name: "South Pole–Aitken basin floor (far side)", label: "Iron · South Pole–Aitken", lp: [-169, -50], c: [-169, -53, 30], note: "The Moon's biggest and oldest basin. Its floor has more iron, titanium and thorium than the surrounding highlands, possibly from deep crust or mantle rock." },
    ],
  },
  al: {
    name: "Aluminum", color: "#5ff0c4", group: "Metals & minerals", on: false, ramp: ["~11%", "24–30% alumina"],
    short: "The bright highlands, made of aluminum-rich rock called anorthosite.",
    long: "The bright highlands that cover most of the Moon are made of anorthosite, rich in aluminum: one set of Apollo highland samples holds 24–30% alumina. Lava-plain soil has much less; Chang'e-5 soil has 10.8%. Companies are testing machines that pull aluminum, iron, silicon and oxygen out of Moon soil to make wire, solar panels and air.",
    src: ["sourcebook", "ce5Soil", "blueAlchemist"],
    areas: [
      { name: "Southern near-side highlands", label: "Aluminum", lp: [5, -38], c: [5, -38, 25], note: "Bright, heavily cratered highlands rich in aluminum-bearing plagioclase." },
      { name: "Far-side highlands", label: "Aluminum", lp: [175, 25], c: [175, 25, 35], note: "The far side is mostly highlands, so most of it is aluminum-rich." },
    ],
  },
};

// Resource fact sheet: direct facts, each from a primary source checked with Tavily extract.
const FACTS = [
  { key: "ice", title: "Water ice", big: "600M t", bigNote: "of ice, at least, in 40+ craters at the north pole alone",
    facts: [
      { t: "NASA's LCROSS crashed into Cabeus crater in 2009. About 5.6% (±2.9%) of the soil it threw up was water ice, and about 155 kg of water was seen in the plume.", s: "aaasLCROSS" },
      { t: "The plume also held the first carbon-, nitrogen- and sulfur-bearing ices ever found in the shadowed craters, likely delivered by comets.", s: "natLCROSS" },
      { t: "Cabeus is one of the coldest places known: its floor stays between 38.7 and 46.7 kelvin (about −230 °C).", s: "natLCROSS" },
      { t: "Lunar Prospector's data suggested about 135–240 million tonnes of ice near the south pole and about 62 million near the north, and up to about 2 billion tonnes in all if every bit of hydrogen it saw were ice.", s: "ntrsWater" },
    ] },
  { key: "he3", title: "Helium-3", big: "<10 kg", bigNote: "all the helium-3 reserves on Earth (5 parts per trillion)",
    facts: [
      { t: "Careful estimates put helium-3 in Moon soil at 3.7 parts per billion in the highlands and 7.8 in the lava plains.", s: "natureHe3" },
      { t: "Neil Armstrong's Apollo 11 bulk soil sample averaged 11.8 ppb, ranging from 9.2 to 17.9 ppb.", s: "ntrsHe3" },
      { t: "Apollo soils ranged from 2.4 to 26 ppb. Getting 1 kg means processing 100,000 to 1 million tonnes of soil.", s: "spacenewsUsgs" },
      { t: "Uses today: cooling, neutron detection, medical imaging; in the future, possibly fusion power.", s: "natureHe3" },
    ] },
  { key: "ree", title: "Rare earths & thorium", big: "1,000×", bigNote: "the Solar System average: possible rare-earth level in a few deposits, similar to ores mined on Earth",
    facts: [
      { t: "Rare earths on the Moon are concentrated in rock called KREEP (potassium, rare earth elements, phosphorus).", s: "usgsREE" },
      { t: "Satellites track KREEP through thorium, which behaves like rare earths and gives off radiation that can be mapped from orbit.", s: "usgsREE" },
      { t: "The thorium-rich region rings the Imbrium basin and covers about 2 million square miles, 16% of the Moon, more than twice the size of Greenland.", s: "usgsREE" },
      { t: "Apollo samples suggest some spots hold twelve times the thorium seen from orbit.", s: "usgsREE" },
    ] },
  { key: "ti", title: "Titanium", big: "~12%", bigNote: "titanium oxide at the richest spots, from NASA's LRO camera",
    facts: [
      { t: "In the lava plains, titanium ranges from about 1% (similar to Earth) to a little more than 10%.", s: "earthskyTi" },
      { t: "The Moon has much more titanium than similar rocks on Earth, and scientists still don't fully know why.", s: "earthskyTi" },
      { t: "Lava-plain basalts are grouped by titanium: high (over 9% titanium oxide), low (1.5–9%) and very low (under 1.5%).", s: "sourcebook" },
      { t: "It sits in ilmenite (FeTiO₃), an iron-titanium mineral. Ilmenite reflects a little more ultraviolet light than other minerals, which is how NASA mapped it.", s: "lrocTi" },
    ] },
  { key: "fe", title: "Iron", big: "22.5%", bigNote: "iron oxide in lava-plain soil returned by China's Chang'e-5",
    facts: [
      { t: "Chang'e-5 soil is richer in iron than most Apollo and Luna lava-plain samples, which are below 22%.", s: "ce5Soil" },
      { t: "Lava-plain basalts have more iron and titanium than highland rocks.", s: "sourcebook" },
      { t: "The floor of the giant South Pole–Aitken basin on the far side is also rich in iron and thorium.", s: "spaNature" },
    ] },
  { key: "al", title: "Aluminum", big: "24–30%", bigNote: "alumina in a set of Apollo highland samples, from aluminum-rich plagioclase",
    facts: [
      { t: "One set of Apollo highland samples described in the Lunar Sourcebook holds 24–30% alumina and only 2–6% iron oxide.", s: "sourcebook" },
      { t: "Lava-plain soil has much less: Chang'e-5 soil has 10.8% alumina.", s: "ce5Soil" },
      { t: "Blue Origin's Blue Alchemist, a NASA-backed project, turns Moon-soil simulant into aluminum wire, silicon solar cells, iron and oxygen.", s: "nasaISRU" },
    ] },
  { key: "oxy", title: "Oxygen & silicon", big: "40–45%", bigNote: "of Moon soil by weight is oxygen, its most abundant element",
    facts: [
      { t: "Seven elements make up 98–99% of lunar rock and soil: oxygen, silicon, aluminum, calcium, iron, magnesium and titanium.", s: "wustlComp" },
      { t: "ESA pulled essentially all the oxygen out of simulated Moon soil at 950 °C, leaving metal alloys behind.", s: "esaOxygen" },
      { t: "NASA and partners are testing ways to pull oxygen out of Moon soil; in 2026 a solar-powered reactor test confirmed oxygen production from simulated soil.", s: "nasaISRU" },
    ] },
  { key: "sun", title: "Sunlight", big: ">90%", bigNote: "of the year, three points on Shackleton crater's rim are sunlit together",
    facts: [
      { t: "The Moon tilts only 1.5°, so at the south pole the Sun skims the horizon all year. Crater floors stay dark; high rims stay lit.", s: "nasaShackleton" },
      { t: "Steady sunlight next to dark, icy craters is why the south pole is the top choice for a base.", s: "nasaShackleton" },
    ] },
  { key: "pgm", title: "Platinum-group metals", big: "≤6,500", bigNote: "craters 1 km or wider that might hold platinum-rich asteroid remains (upper estimate)",
    facts: [
      { t: "The Moon's own rocks have platinum-group metals far too thin to ever mine.", s: "pgmNature" },
      { t: "The best chance is in old impact melt sheets, but no specific deposit has been found yet.", s: "pgmNature" },
      { t: "For craters 5 km or wider, the estimate drops to about 400.", s: "pgmCraters" },
    ] },
];

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
