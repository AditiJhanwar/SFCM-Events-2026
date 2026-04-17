import { useState } from "react";

const events = [

  { date: "Apr 16", day: "Thu", time: "4:00–7:00pm", name: "SFCW Kickoff with Mayor Daniel Lurie", location: "San Francisco", area: "SF", type: "Networking / Reception", paid: false, url: "https://business.sfchamber.com/events/details/2026-san-francisco-climate-week-kick-off-13229", host: "Yes SF, SF Chamber of Commerce", desc: "Official SF Climate Week kickoff reception with Mayor Daniel Lurie. Hosted by Yes SF and the SF Chamber of Commerce." },
  { date: "Apr 17", day: "Fri", time: "7:00am–4:00pm", name: "AI + Climate Master Class with Stanford", location: "Stanford University, Stanford CA", area: "South Bay", type: "Master Class", paid: false, url: "https://luma.com/eedn80x5?tk=libKLx", host: "Stanford Doerr School of Sustainability", desc: "Full-day intensive on AI applications for climate solutions and business resilience." },
  { date: "Apr 17", day: "Fri", time: "4:00–6:00pm", name: "Stanford Sustainability Leaders Circle: Fireside + Reception", location: "Stanford CA (after registration)", area: "South Bay", type: "Executive Reception", paid: false, url: "https://luma.com/wrsn1uyw?tk=XRDWhL", host: "Stanford Doerr School", desc: "Invite-only fireside for board directors and senior executives on sustainability leadership." },
  { date: "Apr 18", day: "Sat", time: "7:00am–6:00pm", name: "Accelerating the Transition Conference (Day 1 of 3)", location: "198 McAllister St, SF", area: "SF", type: "Conference", paid: true, url: "https://luma.com/1zi5m5sy", host: "ATT Conference", desc: "3-day conference across govt, finance, business, academia with 11 clean energy tracks." },
  { date: "Apr 18", day: "Sat", time: "11:00am–6:00pm", name: "Official SFCW Kick-Off at Blue & Yellow", location: "4009 Piedmont Ave, Oakland", area: "East Bay", type: "Community Festival", paid: false, url: "https://luma.com/el6do656", host: "Blue & Yellow Project, SF Climate Week", desc: "Official SFCW community kickoff + merch launch. Food, music, climate orgs." },
  { date: "Apr 18", day: "Sat", time: "12:00–3:00pm", name: "Green Business Expo & Yerba Buena Earth Day Festival", location: "Yerba Buena Gardens, SF", area: "SF", type: "Festival", paid: false, url: "https://luma.com/9d11aca8", host: "SF Green Business Program", desc: "Official SFCW Welcome Day: sustainable product expo, live music, tree planting." },
  { date: "Apr 18", day: "Sat", time: "4:30pm", name: "Climate Policy Jeopardy Mixer", location: "Manny's, 3092 16th St, SF", area: "SF", type: "Networking", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Climate policy game night and networking mixer." },
  { date: "Apr 19", day: "Sun", time: "8:00–10:00am", name: "Golden Gate Run for Clean Energy (5K)", location: "Crissy Field East Beach, SF", area: "SF", type: "Fitness / Networking", paid: false, url: "https://luma.com/any72u06", host: "Clean Energy Leadership Institute", desc: "5th annual 5K fundraiser supporting CELI fellowships. Post-race networking." },
  { date: "Apr 19", day: "Sun", time: "10:30am", name: "AI in the Wild: Environmental Decision-Making", location: "Salesforce Park, 425 Mission St, SF", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Panel on AI applications for environmental decisions in a changing world." },
  { date: "Apr 19", day: "Sun", time: "3:45–6:30pm", name: "Hiking to the Next Level: Climate Leadership Hike", location: "Legion of Honor, SF", area: "SF", type: "Networking / Outdoor", paid: false, url: "https://luma.com/jna2n1iw?tk=JTX67K", host: "Bobby Fishkin, SF Climate Week", desc: "Community hike for climate leaders, technologists, artists, and systems thinkers." },
  { date: "Apr 19", day: "Sun", time: "5:00–8:00pm", name: "Climatebase Community Happy Hour", location: "SF (register to see address)", area: "SF", type: "Happy Hour", paid: false, url: "https://luma.com/0qfdzrdx", host: "Climatebase, Evan Hynes", desc: "500+ attendees. Climatebase Fellows + founders + employers. Food + drinks on-site." },
  { date: "Apr 20", day: "Mon", time: "6:00–9:00am", name: "Surfers in Climate", location: "Pacifica State Beach", area: "South Bay", type: "Networking / Fitness", paid: false, url: "https://luma.com/yc15o8cl?tk=UwpF5R", host: "Mark Higgins, SF Climate Week", desc: "Morning surf meetup for climate founders, investors, nonprofit leaders. Post-surf coffee." },
  { date: "Apr 20", day: "Mon", time: "8:00am", name: "Rebalance CSO Exec Summit", location: "SF (TBA)", area: "SF", type: "Summit", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Meta, Atlassian, Mastercard, Salesforce, Workday, DocuSign", desc: "CSO executive summit with Chief Sustainability Officers from major tech companies." },
  { date: "Apr 20", day: "Mon", time: "8:30am", name: "Seed Founder & Investor Breakfast", location: "SF (TBA)", area: "SF", type: "Networking / Breakfast", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Seed-stage founder and investor breakfast during SFCW." },
  { date: "Apr 20", day: "Mon", time: "8:30am–5:00pm", name: "BERC Energy Summit: Welcome to the Electrocene (Day 1)", location: "Chou Hall, UC Berkeley", area: "East Bay", type: "Summit / Conference", paid: true, url: "https://luma.com/electrocene", host: "BERC", desc: "Day 1: PPAs, interconnection, project finance, data center deployment. Keynote: David Hochschild." },
  { date: "Apr 20", day: "Mon", time: "9:00am", name: "Climate on the Klamath", location: "Klamath Historic Ship, Pier 9, SF", area: "SF", type: "Conference / Networking", paid: false, url: "https://www.bayareacouncil.org/event/climate-on-the-klamath-2026/", host: "Bay Area Council", desc: "Full-day panels on energy, environmental law, coastal resilience, aviation. Reception 5pm." },
  { date: "Apr 20", day: "Mon", time: "9:30am", name: "Connecting Textiles to Climate", location: "SVB, 532 Market St, SF", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Ecomedes, Intrinsic Advanced Materials, 5 Gyres, CleanR", desc: "Panel on sustainable textiles and materials innovation." },
  { date: "Apr 20", day: "Mon", time: "1:00–5:00pm", name: "Corporate VC / Open Innovation in Decarbonization: Roundtable", location: "SF (TBA)", area: "SF", type: "Roundtable", paid: false, url: "https://luma.com/fjavqr7f?tk=dIiqR6", host: "Vectors Capital, A&O Shearman", desc: "Invite-only CVC peer roundtable on decarbonization investing, AI, policy shifts. Followed by public happy hour." },
  { date: "Apr 20", day: "Mon", time: "1:00–2:00pm", name: "Evolution of Sustainable Investing", location: "Koret Auditorium, SF Main Library", area: "SF", type: "Panel", paid: false, url: "https://luma.com/rc68igwj?tk=sowGuO", host: "CAPTRUST, Financial Women of SF", desc: "History, current state, and future of sustainable investing." },
  { date: "Apr 20", day: "Mon", time: "1:00pm", name: "Women in Climate Leadership: Chief x Aurora Collective", location: "Chief Clubhouse, 735 Montgomery St, SF", area: "SF", type: "Forum / Workshop", paid: true, url: "https://luma.com/hujulore?tk=HiRfN0", host: "Chief & Aurora Collective", desc: "Leadership forum for senior women across climate, policy, and tech. Panel + facilitated workshop." },
  { date: "Apr 20", day: "Mon", time: "2:00–6:00pm", name: "Regenerative Agriculture Investment Forum", location: "SF (TBA)", area: "SF", type: "Forum", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Investment discussions focused on regenerative agriculture." },
  { date: "Apr 20", day: "Mon", time: "2:00–6:00pm", name: "Earth Summit: Circularity Fair", location: "SF (register to see address)", area: "SF", type: "Expo / Summit", paid: false, url: "https://luma.com/zbb253zl", host: "Commons, ThredUp", desc: "Circular economy showcase with brands, demos, and climate discussions." },
  { date: "Apr 20", day: "Mon", time: "2:00pm", name: "Tailwinds to Headwinds: Climate Strategy in 2026", location: "SF (TBA)", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Strategic panel on shifting climate and clean energy market dynamics in 2026." },
  { date: "Apr 20", day: "Mon", time: "2:30pm", name: "How Early-Stage Deep Tech Startups Establish Strategic Partnerships", location: "SF (TBA)", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Gigascale Capital, Arbor Energy, Heron Power", desc: "Panel for deep tech founders on building strategic partnerships early." },
  { date: "Apr 20", day: "Mon", time: "4:00pm", name: "Autonomy in Flight: Happy Hour", location: "SF (TBA)", area: "SF", type: "Happy Hour", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Pyka, Joby, Reliable Robotics", desc: "Aviation + autonomy networking happy hour with climate tech founders." },
  { date: "Apr 20", day: "Mon", time: "4:00pm", name: "Building Energy Infrastructure for the AI Era", location: "SF (TBA)", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Drew Baglino (Heron Power), Mike Schroepfer (Gigascale)", desc: "AI-era energy infrastructure with leading founders and investors." },
  { date: "Apr 20", day: "Mon", time: "4:00pm", name: "Dive into DeepTech: Kickoff Happy Hour", location: "SF (TBA)", area: "SF", type: "Happy Hour", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Jon Creyts (RMI)", desc: "Deep tech climate kickoff happy hour." },
  { date: "Apr 20", day: "Mon", time: "4:30–6:30pm", name: "California Leads: Investment, Innovation & Clean Energy Economy", location: "9Zero, 350 California St, SF", area: "SF", type: "Panel / Networking", paid: false, url: "https://luma.com/vr9fbyxd?tk=yKbz9l", host: "Nancy Pfund (DBL Partners), Samantha Grassle (Elemental Impact), CELI", desc: "CA clean energy leadership + investment trends. Networking after." },
  { date: "Apr 20", day: "Mon", time: "4:30–6:30pm", name: "Crossing the Chasm in Climate Tech", location: "SF (TBA)", area: "SF", type: "Keynote / Networking", paid: false, url: "https://luma.com/k08b4zrr?tk=ycquzD", host: "Geoffrey Moore, Endgame Capital", desc: "Geoffrey Moore applies Crossing the Chasm to industrial climate innovation." },
  { date: "Apr 20", day: "Mon", time: "4:30–7:30pm", name: "Goldman Environmental Prize Ceremony & Reception", location: "SF (approval required)", area: "SF", type: "Awards / Networking", paid: false, url: "https://luma.com/nwpr1pxl?tk=HDyQ0Y", host: "Goldman Environmental Prize", desc: "Annual ceremony honoring grassroots environmental leaders. Reception follows." },
  { date: "Apr 20", day: "Mon", time: "5:00–7:00pm", name: "Electrification Without Upsizing: Climate Tech Showcase", location: "SF (TBA)", area: "SF", type: "Showcase", paid: false, url: "https://luma.com/ws8v2ow4", host: "Peninsula Clean Energy, Bay Area Air District", desc: "Expo of plug-and-play electrification tech avoiding costly service upgrades." },
  { date: "Apr 20", day: "Mon", time: "5:00–7:00pm", name: "Recharge with Tom Steyer", location: "SF (TBA)", area: "SF", type: "Networking / Reception", paid: false, url: "https://www.tomsteyer.com/recharge-sf-april-20", host: "Tom Steyer / Galvanize Climate Solutions", desc: "Evening gathering hosted by Tom Steyer for the climate community." },
  { date: "Apr 20", day: "Mon", time: "6:00–9:00pm", name: "Founders, Investors & LP Happy Hour (Vectors Capital)", location: "1000 Van Ness Ave, SF", area: "SF", type: "Happy Hour", paid: false, url: "https://luma.com/73nmv1rh?tk=QM2yOd", host: "Vectors Capital, A&O Shearman", desc: "Curated happy hour for climate founders, VCs, and LPs. Historic venue. Approval required." },
  { date: "Apr 20", day: "Mon", time: "6:00pm", name: "AI x Energy Infrastructure Happy Hour", location: "SF (TBA)", area: "SF", type: "Happy Hour", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Networking happy hour at the intersection of AI and energy infrastructure." },
  { date: "Apr 20", day: "Mon", time: "6:00–7:15pm", name: "The Nature of Connection: Community-Centered Climate Strategies", location: "110 The Embarcadero, SF", area: "SF", type: "Fireside Chat", paid: false, url: "https://luma.com/5sgqoup6", host: "Commonwealth Club, Trust for Public Land", desc: "Fireside on parks, community resilience, and climate strategy." },
  { date: "Apr 20", day: "Mon", time: "7:00pm", name: "Cocktails & Carbon Removal Happy Hour", location: "SF (TBA)", area: "SF", type: "Happy Hour", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "", desc: "Happy hour focused on carbon removal and enhanced rock weathering community." },
  { date: "Apr 21", day: "Tue", time: "6:30–9:30am", name: "Breakfast Ride with Union Peak VC, G2, Congruent Ventures", location: "SF (TBA)", area: "SF", type: "Networking / Fitness", paid: false, url: "https://luma.com/hx20c1jd?tk=rRU2FL", host: "Union Peak VC, G2 Venture Partners, Congruent Ventures", desc: "Group bike ride for climate/deep tech founders + investors. Breakfast burritos + networking after." },
  { date: "Apr 21", day: "Tue", time: "7:00–9:00am", name: "AI for Climate Breakfast: From Algorithms to Atoms", location: "SF (TBA)", area: "SF", type: "Roundtable / Breakfast", paid: false, url: "https://luma.com/x4mobhd1?tk=gQwMdN", host: "Theia Ventures, Cisco Foundation", desc: "Intimate breakfast for founders + investors on AI accelerating climate and industrial innovation." },
  { date: "Apr 21", day: "Tue", time: "8:00am", name: "Edge AI, Data Centers & Energy Transition", location: "101 Mission St, SF", area: "SF", type: "Panel", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Archetype AI, Tsavorite, Future Energy Ventures, Cathay Innovation", desc: "Rethinking where compute happens for energy efficiency." },
  { date: "Apr 21", day: "Tue", time: "8:00am", name: "Future of Climate Tech Breakfast with SVB", location: "SF (TBA)", area: "SF", type: "Breakfast / Networking", paid: false, url: "https://www.garysguide.com/lists/d84h5uc/SF-Climate-Week-2026", host: "Silicon Valley Bank", desc: "Climate tech trends breakfast with SVB." },
  { date: "Apr 21", day: "Tue", time: "9:00–10:00am", name: "Becoming a Climate Angel with E8", location: "Virtual (Zoom)", area: "Virtual", type: "Workshop", paid: false, url: "https://luma.com/hlzgtocg", host: "E8 Angels", desc: "How to become a climate angel investor. Cleantech trends, accreditation, angel groups." },
  { date: "Apr 21", day: "Tue", time: "9:00am–4:00pm", name: "Imagine Next: Silicon Valley's Global Climate Tech Capital Summit (Day 1)", location: "SF", area: "SF", type: "Summit", paid: false, url: "https://luma.com/m42d679x?tk=pGwD5K", host: "SICouncil Team", desc: "Multi-day summit positioning Silicon Valley as global climate investment hub." },
  { date: "Apr 21", day: "Tue", time: "11:30am–5:00pm", name: "AI for Nature Forum: Scaling Nature-Based Solutions", location: "Salesforce Tower, 415 Mission St, SF", area: "SF", type: "Forum", paid: false, url: "https://ai-for-nature.webflow.io", host: "Pachama, Salesforce, Tom Chi (One Ventures), Kate Brandt (Google)", desc: "Invite-only forum: AI + geospatial tools for nature-based climate solutions. Panels, demos, fireside." },
  { date: "Apr 21", day: "Tue", time: "1:00–5:00pm", name: "States Step In: Corporate Climate Reporting", location: "Crowe LLP, 575 Market St, SF", area: "SF", type: "Conference", paid: false, url: "https://luma.com/whj52b2v?tk=ZbASHe", host: "XBRL US, Crowe LLP", desc: "State-level climate disclosure rules: CA SB 253/261, federal shifts, EU. Networking reception." },
  { date: "Apr 21", day: "Tue", time: "2:00–3:30pm", name: "Clean Energy and the 2026 Elections", location: "550 California St, SF", area: "SF", type: "Panel", paid: false, url: "https://luma.com/3ui22vum?tk=vM5NRA", host: "Climate Cabinet", desc: "How 2026 midterms reshape clean energy investment, regulation, and climate tech markets." },
  { date: "Apr 21", day: "Tue", time: "2:00–7:00pm", name: "Earth Summit: Main Stage", location: "SF (register to see address)", area: "SF", type: "Summit", paid: false, url: "https://luma.com/ufxwba0y", host: "Commons, ThredUp", desc: "Main stage programming on circular economy, materials, and climate innovation." },
  { date: "Apr 21", day: "Tue", time: "2:30–3:30pm", name: "Fighting Fire with Data: Fireside Chat", location: "Virtual (Zoom)", area: "Virtual", type: "Fireside Chat", paid: false, url: "https://luma.com/gw0y39f0?tk=YL33Nq", host: "UC Berkeley researchers", desc: "AI for wildfire response. Demo of decision support dashboard. Gov, insurance, infrastructure." },
  { date: "Apr 21", day: "Tue", time: "4:00–6:00pm", name: "Women & Allies in Climate Happy Hour", location: "The Clubhouse, 150 Pacific Ave, SF", area: "SF", type: "Happy Hour", paid: false, url: "https://forms.office.com/pages/responsepage.aspx?id=wW2-eY7Xu0uyK9mUwKQXp2l5xdBNS71DvbzMrUU0ZllUNlVaV1FFWVI1VTNTWFcwT1A2RTY0VThCVS4u&route=shorturl", host: "Women & Allies in Climate", desc: "Drinks + appetizers for climate leaders and allies." },
  { date: "Apr 21", day: "Tue", time: "4:00–7:00pm", name: "Official SFCW Welcome Ceremony — Al Gore Keynote", location: "The Exploratorium, SF", area: "SF", type: "Keynote / Reception", paid: false, url: "https://luma.com/0qfdzrdx", host: "Climatebase", desc: "Official SFCW opening. Al Gore keynote. VIP welcome reception." },
  { date: "Apr 21", day: "Tue", time: "5:00–7:00pm", name: "Food 2050 Film Screening + Panel (UC Berkeley)", location: "Haas School of Business, Berkeley", area: "East Bay", type: "Film + Panel", paid: false, url: "https://futureoffood.org/events/sf-climate-week-2026/", host: "Food Tank, Rockefeller Foundation, Global Alliance", desc: "Screening + panel on food systems, equity, and local climate solutions. RSVP required." },
  { date: "Apr 22", day: "Wed", time: "8:00–11:00am", name: "E8 Off Script: Founder & Funder Stories", location: "SF (TBA)", area: "SF", type: "Forum", paid: false, url: "https://luma.com/er2mrtrk?tk=y9ruql", host: "E8 Angels", desc: "Candid conversations between cleantech founders and funders on lessons learned." },
  { date: "Apr 22", day: "Wed", time: "8:30am–5:00pm", name: "BERC Energy Summit: Electrocene Day 2", location: "Chou Hall, UC Berkeley", area: "East Bay", type: "Summit / Conference", paid: true, url: "https://luma.com/electrocene", host: "BERC, David Hochschild, Sarah Jewett (Fervo), Gerard Reid", desc: "Keynotes, panels, fireside chats on emerging energy tech." },
  { date: "Apr 22", day: "Wed", time: "9:00am", name: "Imagine Next: Climate Tech Capital Summit (Day 2)", location: "SF", area: "SF", type: "Summit", paid: false, url: "https://luma.com/m42d679x?tk=pGwD5K", host: "SICouncil Team", desc: "Day 2 of multi-day global climate investment summit." },
  { date: "Apr 22", day: "Wed", time: "9:15am–1:00pm", name: "Sustainable1 Climate Summit: Climate Risk + Research", location: "Terra Gallery, 511 Harrison St, SF", area: "SF", type: "Summit", paid: true, url: "https://events.spglobal.com/event/2b2f9fa9-f208-4cc0-895a-10f19e4c2d31/regProcessStep1", host: "S&P Global", desc: "Climate risk data → investment decisions. Physical hazards, climate finance, AI-driven intelligence." },
  { date: "Apr 22", day: "Wed", time: "10:00am–1:00pm", name: "Live From the Future: Deep Tech Investor Expo", location: "SF (after registration)", area: "SF", type: "Expo / Showcase", paid: false, url: "https://luma.com/2rrxqv4e?tk=MeGOne", host: "Activate Global, Breakthrough Energy, Bakar Labs", desc: "Live demos + prototypes from deep tech climate founders. Investors can explore and engage." },
  { date: "Apr 22", day: "Wed", time: "12:00–4:00pm", name: "Sustainable AI for Climate Tech Founders", location: "SF (TBA)", area: "SF", type: "Workshop", paid: false, url: "https://luma.com/b3pabmjq?tk=VDWYkT", host: "Green Software Foundation", desc: "AI systems with lower carbon intensity and energy efficiency. For founders and builders." },
  { date: "Apr 22", day: "Wed", time: "1:00–6:00pm", name: "Family Offices & Investors Summit — USS Hornet", location: "USS Hornet Museum, Alameda", area: "East Bay", type: "Summit", paid: true, url: "https://luma.com/gokqig1q", host: "Atlas Coalition", desc: "150-person curated summit: family offices, LPs, GPs, climate founders. $22B+ capital. KKR, Generation IM, SOSV, Breakthrough Energy." },
  { date: "Apr 22", day: "Wed", time: "2:00–5:00pm", name: "Battery Innovation Summit (Day 1)", location: "SF (two locations)", area: "SF", type: "Summit", paid: true, url: "https://luma.com/n4c3c66q", host: "The Battery Saloon, JPMorgan Chase", desc: "Startup pitches, investor panels. Investable Startups panel, keynote, reception." },
  { date: "Apr 22", day: "Wed", time: "2:00–6:00pm", name: "Regenerative Solutions to Plastic Pollution: Panel + Happy Hour", location: "CANOPY Jackson Square, 595 Pacific Ave, SF", area: "SF", type: "Panel / Happy Hour", paid: false, url: "https://luma.com/xgg14aei", host: "Plastic Pollution Coalition, Amalgamated Bank", desc: "Biomaterials expo, innovation panel, networking happy hour." },
  { date: "Apr 22", day: "Wed", time: "2:30–5:00pm", name: "Women on Wildfire: Safety, Reliability & Affordability", location: "SF (register to see address)", area: "SF", type: "Panel", paid: false, url: "https://luma.com/zmkjghz2", host: "Gridware", desc: "Balancing safety, reliability, and affordability for electric utilities." },
  { date: "Apr 22", day: "Wed", time: "3:00pm", name: "Force of Water Screening @ SAP Labs", location: "SAP Labs, 3410 Hillview Ave, Palo Alto", area: "South Bay", type: "Film + Discussion", paid: false, url: "https://luma.com/la3zen0e", host: "Green Empowerment, Women in Cleantech", desc: "Documentary on women-led water infrastructure. Q&A + networking." },
  { date: "Apr 22", day: "Wed", time: "4:30–6:30pm", name: "Carbon-Negative Networking", location: "ZOË Cocktail Bar, 579 Howard St, SF", area: "SF", type: "Networking", paid: false, url: "https://luma.com/9oarsszv?tk=LfXNal", host: "Asplund Earth Alliance", desc: "Networking for biochar, DAC, reforestation, renewable energy, and GHG reduction pros." },
  { date: "Apr 22", day: "Wed", time: "5:30–8:30pm", name: "GeoAI, Climate Risk, and Tacos", location: "SF (TBA)", area: "SF", type: "Salon / Networking", paid: false, url: "https://luma.com/kmhoki8u?tk=QdHHnG", host: "Tee Barr, SF Climate Week", desc: "Chatham House Rules salon: GeoAI + Earth observation for climate risk, insurance, finance." },
  { date: "Apr 22", day: "Wed", time: "6:30–8:30pm", name: "Consumers and the Future of Energy Affordability", location: "SF (TBA)", area: "SF", type: "Panel", paid: false, url: "https://luma.com/d472h2sn?tk=699mBQ", host: "Palmetto, Deploy Action", desc: "Rising energy costs, consumer impacts, policy shifts, and 2026 midterms." },
  { date: "Apr 22", day: "Wed", time: "TBA", name: "\"Inventing What Doesn't Exist Yet\" with Tara Lemmey", location: "BGA HQ, Berkeley", area: "East Bay", type: "Fireside Chat", paid: false, url: "https://luma.com/z0h0i6jm", host: "Berkeley Gateway Accelerator", desc: "Fireside chat + wine & cheese at BGA HQ. Tara designed intelligence-sharing infrastructure still running across the US government." },
  { date: "Apr 22", day: "Wed", time: "7:00pm", name: "Earth Day at the Coliseum: Oakland Roots SC", location: "Oakland Coliseum", area: "East Bay", type: "Social / Event", paid: true, url: "https://www.sfclimateweek.org", host: "Oakland Roots SC, SF Climate Week", desc: "Climate community night. 5–7pm pregame tailgate with climate org tabling. SFCW discounted tickets." },
  { date: "Apr 23", day: "Thu", time: "TBA", name: "Deep Tech at Dusk: Climate Week Happy Hour Mixer", location: "Berkeley", area: "East Bay", type: "Happy Hour", paid: false, url: "https://luma.com/qm8281ph", host: "Berkeley Gateway Accelerator", desc: "A relaxed mixer with the Berkeley crew. Climate, AI, and Biotech minds in one room. No agenda, just good people." },
  { date: "Apr 23", day: "Thu", time: "7:30–9:30am", name: "Year of the Woman Farmer: Climate-Smart Agriculture Panel", location: "McLaren Conference Center, 2130 Fulton St, SF", area: "SF", type: "Panel / Breakfast", paid: false, url: "https://luma.com/2e7ygd3j?tk=8kJHmB", host: "HARVEST California, USF", desc: "Women leaders in climate-smart agriculture, agrivoltaics, and equitable food systems." },
  { date: "Apr 23", day: "Thu", time: "9:00am", name: "Imagine Next: Climate Tech Capital Summit (Day 3)", location: "SF", area: "SF", type: "Summit", paid: false, url: "https://luma.com/m42d679x?tk=pGwD5K", host: "SICouncil Team", desc: "Final day of multi-day global climate investment summit." },
  { date: "Apr 23", day: "Thu", time: "11:00am–4:00pm", name: "Climate Solutions Summit", location: "The Melody of SF, 906 Broadway, SF", area: "SF", type: "Summit", paid: false, url: "https://luma.com/cqm0p2xd", host: "Project Drawdown", desc: "Full-day solutions summit: frameworks, implementation pathways, community discussion." },
  { date: "Apr 23", day: "Thu", time: "11:30am–6:30pm", name: "SF Climate Week Flagship Energy Summit", location: "SF (register to see address)", area: "SF", type: "Summit", paid: false, url: "https://luma.com/xpgurehs", host: "Serotonin Creative, SFCW", desc: "Flagship energy summit: speakers, panels, networking across the energy ecosystem." },
  { date: "Apr 23", day: "Thu", time: "1:00–4:30pm", name: "Battery Economy: California & Western States Strategy", location: "51 Vista Ln, Stanford CA", area: "South Bay", type: "Policy Forum", paid: false, url: "https://luma.com/ris0t8cm?tk=AfNTrN", host: "CA Forward, Carnegie CA, NEISC", desc: "Private convening on Western U.S. battery supply chain and industrial strategy." },
  { date: "Apr 23", day: "Thu", time: "1:00pm", name: "Transition-IQ Climate Investment Forum", location: "City Club of SF, 155 Sansome St", area: "SF", type: "Forum", paid: false, url: "https://web.cvent.com/event/058cc8a6-a7bc-4959-8b55-ce3adcc12742/summary", host: "CleantechIQ, Nordea Asset Management", desc: "Institutional asset allocators on energy transition: AI infra, carbon capture, critical minerals." },
  { date: "Apr 23", day: "Thu", time: "2:00–5:00pm", name: "Battery Innovation Summit (Day 2)", location: "9Zero, 350 California St, SF", area: "SF", type: "Summit", paid: true, url: "https://luma.com/n4c3c66q", host: "The Battery Saloon, JPMorgan Chase", desc: "Commercialization + scale challenges panel. Fireside chat with Jeff St. John. Happy Hour." },
  { date: "Apr 23", day: "Thu", time: "4:00–7:00pm", name: "Jewish Green Business Network SF Summit 2026", location: "Monument, 140 9th St, SF", area: "SF", type: "Summit / Networking", paid: false, url: "https://luma.com/ui23lp40?tk=wLGRsd", host: "Jewish Green Business Network", desc: "Climate founders, investors, corporate leaders. Mission-aligned business connections." },
  { date: "Apr 23", day: "Thu", time: "4:30–6:30pm", name: "Powering AI Responsibly: SaaS Sustainability Panel", location: "SF (TBA)", area: "SF", type: "Panel / Networking", paid: false, url: "https://luma.com/a5pxxhtz?tk=Hzx2s1", host: "Okta, DocuSign, Autodesk", desc: "How leading SaaS companies integrate AI while maintaining sustainability commitments." },
  { date: "Apr 23", day: "Thu", time: "6:00–7:30pm", name: "Grist Fireside: Turning the Tide — Stories of Climate Solutions", location: "Manny's, 3092 16th St, SF", area: "SF", type: "Fireside Chat", paid: false, url: "https://luma.com/kl8lsusb", host: "Grist, SF Climate Week", desc: "Storytelling fireside on climate solutions. Media + community gathering." },
  { date: "Apr 23", day: "Thu", time: "6:00–9:00pm", name: "Official Founder & Investor Happy Hour (SE Ventures + Climatebase)", location: "9Zero, 350 California St, SF", area: "SF", type: "Happy Hour", paid: false, url: "https://luma.com/SFCW25-Founder-Investor", host: "SE Ventures ($1B+ VC), Climatebase", desc: "Curated 350–400 founders + investors. Apply to join. SE Ventures is Sand Hill Road climate VC." },
  { date: "Apr 23", day: "Thu", time: "9:00pm–midnight", name: "Official SFCW Closing Party: Party After Dark", location: "CA Academy of Sciences, 55 Music Concourse Dr, SF", area: "SF", type: "Party", paid: true, url: "https://www.calacademy.org/support/big-bang-party-after-dark", host: "California Academy of Sciences", desc: "Official SFCW closing party. Use code 'SFCW26' for discount." },
  { date: "Apr 24", day: "Fri", time: "7:00am–12:00pm", name: "Climate Innovation Master Class with Stanford", location: "Stanford University, 450 Jane Stanford Way", area: "South Bay", type: "Master Class", paid: false, url: "https://luma.com/feqv69yf?tk=6LTFID", host: "Stanford Doerr School of Sustainability", desc: "Half-day on climate innovation, emerging tech, data tools, regulatory shifts, resilient growth." },
  { date: "Apr 24", day: "Fri", time: "9:00–11:00am", name: "Powerhouse Presents: Watt It Takes Live with Alex Honnold", location: "SF (after registration)", area: "SF", type: "Talk / Live Podcast", paid: false, url: "https://luma.com/6ll5hfxc", host: "Powerhouse, Emily Kirsch", desc: "Live podcast with Alex Honnold (Free Solo + Honnold Foundation) on clean energy access." },
  { date: "Apr 24", day: "Fri", time: "10:30am–4:00pm", name: "Global Climate Solutions Summit 2026", location: "Punch Line SF, 444 Battery St, SF", area: "SF", type: "Summit", paid: true, url: "https://luma.com/jvl9bxpe", host: "Congruent, Voyager, Climactic, Blue Bear Capital, Khosla Ventures", desc: "Flagship investor-founder summit: VC panels, founder demos, deal flow, keynotes, VIP reception." },
  { date: "Apr 24", day: "Fri", time: "4:30–6:30pm", name: "Decarbonizing CA's Energy Grid: Panel + Networking", location: "SF (after registration)", area: "SF", type: "Panel / Networking", paid: false, url: "https://luma.com/ykbns6on", host: "Net Impact, PG&E", desc: "Panel on decarbonizing CA energy. PG&E + EV, public policy, and energy sector leaders." },

];

const areas = ["All", "SF", "East Bay", "South Bay", "Virtual"];

const typeColors = {
  "Happy Hour": "#9B3A2A",
  "Networking": "#5C7A4A",
  "Fireside Chat": "#8B5E3C",
  "Summit": "#3D6B5C",
  "Panel": "#6B5B4E",
  "Breakfast": "#8A6B3A",
  "Keynote": "#7A3B1E",
  "Party": "#7A3B6B",
  "Workshop": "#3D6B3D",
  "Conference": "#3A5C6B",
  "Forum": "#6B4A2A",
  "Master Class": "#3A4A7A",
  "Roundtable": "#6B6B3A",
  "Talk": "#4A6B5C",
  "Festival": "#7A5C2A",
  "Expo": "#5C4A7A",
};

const getTypeColor = (type) => {
  for (const key of Object.keys(typeColors)) {
    if (type.includes(key)) return typeColors[key];
  }
  return "#5C7A4A";
};

const days = [...new Set(events.map(e => `${e.date} (${e.day})`))];

// Palette from Deep Tech 101 screenshot
const BG = "#F2EDE4";
const CARD = "#FDFAF5";
const BORDER = "#E5DDD0";
const TEXT = "#1C1A17";
const TEXT_MID = "#4A4540";
const TEXT_LIGHT = "#9A928A";
const ORANGE = "#C0622A";
const GREEN = "#4A7C59";

export default function App() {
  const [areaFilter, setAreaFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [paidFilter, setPaidFilter] = useState("All");

  const filtered = events.filter(e => {
    const areaOk = areaFilter === "All" || e.area === areaFilter;
    const searchOk = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.host.toLowerCase().includes(search.toLowerCase()) || e.desc.toLowerCase().includes(search.toLowerCase());
    const paidOk = paidFilter === "All" || (paidFilter === "Free" && !e.paid) || (paidFilter === "Paid" && e.paid);
    return areaOk && searchOk && paidOk;
  });

  const grouped = days.reduce((acc, d) => {
    const de = filtered.filter(e => `${e.date} (${e.day})` === d);
    if (de.length) acc[d] = de;
    return acc;
  }, {});

  const areaColor = (a) => ({
    "East Bay": "#3D5C8A", "South Bay": "#7A5C2A", "Virtual": "#6B3A8A"
  }[a] || GREEN);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: BG, minHeight: "100vh", color: TEXT }}>

      {/* ── HEADER ── */}
      <div style={{
        background: `linear-gradient(150deg, #C8DECA 0%, #D8EAD6 20%, #E6EFE2 45%, ${BG} 70%)`,
        padding: "32px 28px 26px",
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{
              fontSize: 10, fontFamily: "'Arial', sans-serif", letterSpacing: "0.18em",
              color: ORANGE, fontWeight: 700, marginBottom: 8, textTransform: "uppercase"
            }}>SF CLIMATE WEEK 2026</div>
            <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: "normal", lineHeight: 1.2, color: TEXT }}>
              🌿 What's happening during{" "}
              <em style={{ color: ORANGE, fontStyle: "italic" }}>Climate Week?</em>
            </h1>
            <p style={{ margin: 0, color: TEXT_MID, fontSize: 13, fontFamily: "sans-serif" }}>
              Apr 16–24 · Bay Area · 80+ events compiled
            </p>
          </div>


        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{
        background: CARD, borderBottom: `1px solid ${BORDER}`,
        padding: "13px 28px", position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search events or hosts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: BG, border: `1px solid ${BORDER}`, color: TEXT,
              borderRadius: 6, padding: "6px 11px", fontSize: 12, width: 185,
              outline: "none", fontFamily: "sans-serif"
            }}
          />
          {areas.map(a => (
            <button key={a} onClick={() => setAreaFilter(a)} style={{
              background: areaFilter === a ? GREEN : BG,
              color: areaFilter === a ? "#fff" : TEXT_MID,
              border: `1px solid ${areaFilter === a ? GREEN : BORDER}`,
              borderRadius: 20, padding: "4px 13px", fontSize: 12,
              cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.12s"
            }}>{a}</button>
          ))}
          {["All", "Free", "Paid"].map(p => (
            <button key={p} onClick={() => setPaidFilter(p)} style={{
              background: paidFilter === p ? ORANGE : BG,
              color: paidFilter === p ? "#fff" : TEXT_MID,
              border: `1px solid ${paidFilter === p ? ORANGE : BORDER}`,
              borderRadius: 20, padding: "4px 13px", fontSize: 12,
              cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.12s"
            }}>{p === "Paid" ? "$ Paid" : p}</button>
          ))}
          <span style={{ color: TEXT_LIGHT, fontSize: 11, fontFamily: "sans-serif", marginLeft: 2 }}>{filtered.length} events</span>
        </div>
      </div>

      {/* ── EVENT LIST ── */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "22px 28px 0" }}>
        {Object.entries(grouped).map(([day, dayEvents]) => (
          <div key={day} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: GREEN, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: "0.04em" }}>{day}</span>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <span style={{ color: TEXT_LIGHT, fontSize: 11, fontFamily: "sans-serif" }}>{dayEvents.length}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {dayEvents.map((e, i) => (
                <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: CARD, border: `1px solid ${BORDER}`,
                      borderRadius: 8, padding: "12px 15px",
                      display: "flex", gap: 13, alignItems: "flex-start",
                      transition: "box-shadow 0.12s, border-color 0.12s",
                    }}
                    onMouseEnter={ev => { ev.currentTarget.style.borderColor = GREEN; ev.currentTarget.style.boxShadow = "0 2px 10px rgba(74,124,89,0.1)"; }}
                    onMouseLeave={ev => { ev.currentTarget.style.borderColor = BORDER; ev.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ minWidth: 78, color: TEXT_LIGHT, fontSize: 11, paddingTop: 2, lineHeight: 1.5, fontFamily: "sans-serif", flexShrink: 0 }}>{e.time}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13.5, color: TEXT, fontWeight: "bold", lineHeight: 1.35 }}>{e.name}</span>
                        {e.paid && <span style={{ background: ORANGE, color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap", marginTop: 3, fontFamily: "sans-serif", fontWeight: 700 }}>$</span>}
                      </div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{
                          background: getTypeColor(e.type) + "15",
                          color: getTypeColor(e.type),
                          fontSize: 10, padding: "2px 7px", borderRadius: 4,
                          border: `1px solid ${getTypeColor(e.type)}30`,
                          fontFamily: "sans-serif", fontWeight: 600
                        }}>{e.type}</span>
                        <span style={{ color: TEXT_LIGHT, fontSize: 11, fontFamily: "sans-serif" }}>📍 {e.location}</span>
                        <span style={{ color: areaColor(e.area), fontSize: 11, fontFamily: "sans-serif", fontWeight: 600 }}>● {e.area}</span>
                      </div>
                      <p style={{ margin: 0, color: TEXT_MID, fontSize: 12, lineHeight: 1.55, fontFamily: "sans-serif" }}>{e.desc}</p>
                      {e.host && <p style={{ margin: "3px 0 0", color: TEXT_LIGHT, fontSize: 11, fontFamily: "sans-serif" }}>🎙 {e.host}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: TEXT_LIGHT, padding: "50px 0", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            <p>No events match your filters.</p>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 28px 32px" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 18, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <span style={{ color: ORANGE, fontSize: 9, marginTop: 4, flexShrink: 0 }}>●</span>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 13, fontFamily: "sans-serif", color: TEXT_MID }}>
                Bridging the{" "}
                <span style={{ color: ORANGE }}>Lab-to-Market Gap</span>
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 24 }}>
            <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: "0.14em", color: "#8A7F74", lineHeight: 1.05 }}>ADITI</div>
            <div style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900, fontSize: 10, letterSpacing: "0.14em", color: "#A89E93", lineHeight: 1.05 }}>JHANWAR</div>
          </div>
        </div>
      </div>

    </div>
  );
}
