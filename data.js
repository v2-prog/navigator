/* AcerLab Navigator — educational content (Australia). Not advice. */
window.NAV_DATA = {
  yearLabel: "FY2025–26 figures used as illustrations only. Confirm current ATO / state settings.",
  concessionalCap: 30000,
  nonConcessionalCap: 120000,
  sgRate: 0.12,
  taxBrackets: [
    { upTo: 18200, rate: 0 },
    { upTo: 45000, rate: 0.16 },
    { upTo: 135000, rate: 0.30 },
    { upTo: 190000, rate: 0.37 },
    { upTo: Infinity, rate: 0.45 }
  ],
  medicare: 0.02,
  jurisdictions: [
    { id: "ACT", name: "ACT" },
    { id: "NSW", name: "New South Wales" },
    { id: "VIC", name: "Victoria" },
    { id: "QLD", name: "Queensland" },
    { id: "SA", name: "South Australia" },
    { id: "WA", name: "Western Australia" },
    { id: "TAS", name: "Tasmania" },
    { id: "NT", name: "Northern Territory" }
  ],
  modules: [
    { id: "budget", group: "finance", title: "Budget studio" },
    { id: "wages", group: "finance", title: "Wage & tax structure" },
    { id: "savings", group: "finance", title: "Savings & investing" },
    { id: "debt", group: "finance", title: "Debt literacy" },
    { id: "glossary", group: "finance", title: "Glossary" },
    { id: "structures", group: "village", title: "Legal structures" },
    { id: "zoning", group: "village", title: "Zoning pathway" },
    { id: "building", group: "village", title: "Building codes" },
    { id: "shared", group: "village", title: "Shared money" },
    { id: "resources", group: "village", title: "Resource directory" },
    { id: "templates", group: "village", title: "Checklists" }
  ],
  vehicles: [
    { id: "hisa", name: "High-interest savings", risk: "Very low", access: "Days", point: "Cash buffer and sinking-fund parking. Interest is taxable in the year earned. Rate can fall." },
    { id: "td", name: "Term deposit", risk: "Very low", access: "Locked for term", point: "Known rate if held to maturity. Early-break fees. Still taxable interest." },
    { id: "offset", name: "Offset account", risk: "Low (tied to loan)", access: "At call", point: "Dollar in offset reduces interest on a linked home loan. Often more efficient than a separate savings account while a loan exists. Not a return; it is interest not paid." },
    { id: "index", name: "Broad index fund / ETF", risk: "Medium–high", access: "Market days", point: "Owns a slice of many companies. Value moves daily. Useful for long horizons. CGT on sale; dividends may be franked. Not a savings account." },
    { id: "super", name: "Superannuation", risk: "Varies by option", access: "Preserved to condition of release", point: "Concessional contributions are taxed in the fund (generally 15% for most members). Strong compounding if left alone. Poor fit for money needed before preservation age. Caps and work-test / total-super-balance rules apply." }
  ],
  structures: [
    { id: "tic", name: "Tenants in common + deed", independence: "High if the deed is tight", exit: "Sell your share; co-owners often have first-refusal", decisions: "By deed — usually unanimous for land changes", liability: "Each person can be pursued for the whole of a joint loan", pros: ["Keeps individual title shares", "Familiar to banks and solicitors", "Deed can set levies, use and exit"], cons: ["Joint mortgage = joint and several risk", "A fight without a deed is expensive", "Not a governance vehicle for 8+ households"] },
    { id: "strata", name: "Strata / community title", independence: "High inside the lot; low on common property", exit: "Sell the lot on the open market", decisions: "Owners corporation / community association, by lot entitlement", liability: "Levy debt attaches to the lot; personal liability is more contained than a joint loan", pros: ["Clear lot vs common split", "Known to valuers and lenders", "Sinking fund is a recognised tool"], cons: ["Survey and registration cost", "Council / state approval pathway", "By-laws can feel rigid for an intentional community"] },
    { id: "company", name: "Company title", independence: "Depends on constitution and share class", exit: "Transfer shares — board or constitution may restrict buyers", decisions: "Board / members under Corporations Act", liability: "Company is the landowner; shareholders risk paid capital plus any guarantees", pros: ["One title, many dwellings historically", "Constitution can encode community rules"], cons: ["Harder finance than strata in many banks", "Share sale is not a simple house sale", "Director duties apply"] },
    { id: "coop", name: "Co-operative", independence: "Medium — member, not owner of a freehold lot", exit: "Share redemption / transfer under co-op rules; can be slow", decisions: "One-member-one-vote is common", liability: "Limited by shares unless members give guarantees", pros: ["Fits mutual / Quaker / community ethos", "State co-op law is designed for this", "Can hold land for members"], cons: ["Banks may treat it as non-standard", "Exit liquidity is the usual weak point", "Must stay inside co-op purpose"] },
    { id: "clt", name: "Community land trust / land-holding charity", independence: "High on the dwelling if a ground lease is used; land is locked", exit: "Sell or assign the improvement / lease — land stays in the trust", decisions: "Board of the trust or company; asset lock", liability: "Entity holds land; residents are lessees or licensees", pros: ["Land stays out of speculation", "Aligns with purpose / First Nations / DGR pathways", "Separates house finance from land"], cons: ["A locked charity is not a family investment vehicle", "Duty, CGT and planning need specialist advice", "Resale formula must be written on day one"] },
    { id: "inc", name: "Incorporated association / company limited by guarantee", independence: "Low as to land — the entity owns or leases", exit: "Membership cessation; no automatic land share", decisions: "Committee + constitution", liability: "Usually limited; officers still have duties", pros: ["Good shell for shared tools, events, a common house", "Cheap to start as an assoc. in most states"], cons: ["Do not use it as a hidden co-ownership of houses", "Winding up surplus often cannot go to members if charitable"] }
  ],
  glossary: [
    { t: "Concessional contribution", d: "A super contribution that is taxed in the fund (usually 15% for most members) and counts toward the concessional cap. Salary sacrifice and employer Super Guarantee sit here." },
    { t: "Non-concessional contribution", d: "An after-tax super contribution. Not taxed again on the way in (for most people under the cap). Counts toward the non-concessional cap. Bring-forward rules may apply." },
    { t: "Salary packaging / salary sacrifice", d: "Agreeing with an employer to redirect some gross pay into super or approved benefits before it hits your bank account. Changes taxable income. Employer and award rules decide what is possible." },
    { t: "Offset account", d: "A transaction account linked to a home loan. The balance is subtracted from the loan principal when interest is calculated. You still own the cash." },
    { t: "Sinking fund", d: "A shared reserve for irregular big costs — roofs, tracks, septic, solar inverters. Distinct from the day-to-day levy." },
    { t: "Levy", d: "Regular contribution to shared operating costs. In strata it is statutory; in a deed or co-op it is contractual." },
    { t: "Joint and several liability", d: "The lender can recover the whole debt from any one borrower. Common on joint mortgages. A deed between co-owners does not bind the bank." },
    { t: "Tenants in common", d: "Each person owns a defined share of the same title (50/50, 70/30, etc.). Contrast joint tenants, where survivorship applies." },
    { t: "Community title / strata", d: "A registered subdivision into lots plus common property, with an owners corporation or community association." },
    { t: "Company title", d: "A company owns the land; residents own shares that give a right to occupy a particular dwelling." },
    { t: "Community land trust (CLT)", d: "A purpose entity holds land under an asset lock. Residents typically hold a dwelling plus a ground lease. Land is not the family's investment chip." },
    { t: "Multiple occupancy / rural land sharing", d: "Planning concept (name varies by state) for several dwellings on one rural lot with shared infrastructure. Always check the current SEPP / code / scheme — names change." },
    { t: "Secondary dwelling", d: "A smaller dwelling on the same lot as a principal house (granny flat). Size, servicing and use limits are local." },
    { t: "NCC / BCA", d: "National Construction Code (formerly BCA). Sets minimum construction, fire, health and energy performance. How it applies depends on building classification (Class 1a vs 2, 3, etc.)." },
    { t: "Class 1 vs Class 2", d: "Plain version: a detached house is usually Class 1a. Stacked flats in one building are usually Class 2. Shared sites often trip into different fire-separation and access rules. Ask the certifier which class they will apply." },
    { t: "Preservation age", d: "The age from which super can generally be accessed, subject to a condition of release. Not the same as Age Pension age." },
    { t: "Good debt / bad debt", d: "Teaching shorthand only. Good usually means debt attached to an asset expected to grow or produce income, on terms you can service. Bad usually means high-rate consumer debt funding things that fall in value. Context always matters." },
    { t: "Compounding", d: "Earnings themselves start earning. Time and contribution consistency usually matter more than a heroic rate." },
    { t: "CGT", d: "Capital gains tax — generally on the profit when you dispose of an asset. Main-residence and small-business concessions exist. Shared-living structures change who is the taxpayer." },
    { t: "Duty / stamp duty", d: "State tax on certain dutiable transactions, often land transfers and some declarations of trust. Aggregation and related-party rules catch informal title-later deals." },
    { t: "DGR", d: "Deductible Gift Recipient — an ATO endorsement that lets donors claim a tax deduction for gifts. Not automatic for every charity." },
    { t: "Asset lock", d: "Constitutional rule that stops land or surplus being distributed to private members on winding up. Typical of charities and many CLTs." },
    { t: "Carry-forward concessional cap", d: "Unused concessional cap amounts may be used in later years if total super balance is under the ATO threshold. Confirm the current balance test." },
    { t: "Medicare levy", d: "A 2% levy on taxable income for most residents, with low-income reductions and a separate surcharge for some higher earners without private hospital cover." }
  ],
  buildingTopics: [
    { q: "Fire separation", a: "Ask: What building class are you applying, and where do fire-resisting walls, floors and egress become mandatory once we add a second (or fifth) dwelling or a common house? Single houses and multi-dwelling buildings are not treated the same." },
    { q: "Services", a: "Ask: Can we share one electrical point of attachment, one wastewater system, one driveway, or does each dwelling need independently metered and separately designed services? Rural septic and bushfire overlay answers differ from suburban ones." },
    { q: "Accessibility", a: "Ask: Does Livable Housing or Premises Standards access apply to the common house, paths, or any dwelling we will let or use for workers? Intentional communities that host the public can pick up extra duties." },
    { q: "Bushfire / flood / overlay", a: "Ask: Which overlays sit on the lot (BAL, flood, heritage, biodiversity) and do they change construction cost before we sketch a cluster?" },
    { q: "Change of use", a: "Ask: If we start with one house and add caravans, tiny houses on wheels, or a common kitchen, at what point does that become a change of use or an unlawful dwelling?" }
  ],
  sharedFinance: [
    { t: "Operating levy", d: "A monthly or quarterly amount for rates share, insurance, internet at the common house, track maintenance, bookkeeping. Keep it boring and itemised." },
    { t: "Sinking fund", d: "A second bucket for 5-15 year assets. Write the schedule (roof year 12, inverter year 10) so contributions have a reason." },
    { t: "Joint mortgage on one title", d: "Simple for the bank, dangerous for people. Everyone is usually jointly and severally liable. A co-ownership deed does not rewrite the loan contract." },
    { t: "Individual title + shared infrastructure", d: "Each household borrows against its own lot. A separate association or company owns the track, water, and common house and levies for them. Harder to set up; cleaner exit." },
    { t: "Ground lease on a CLT", d: "Household finances the dwelling only. Land stays in the purpose entity. Resale formula and lease fee need a lawyer who has done this in Australia, not a US template." },
    { t: "Keeping independence", d: "Separate everyday bank accounts. No informal use of one person's offset for the group. Written caps on guarantees. A rule that nobody signs a loan for someone else's dwelling." }
  ],
  caseStudies: [
    { t: "Two households, one rural lot (NSW-style sketch)", d: "They stay tenants in common 50/50 with a deed covering occupation zones, a sinking fund, first refusal, and what happens if one wants out. They ask council whether a second dwelling is a complying secondary dwelling, a dual occupancy, or needs a rural land-sharing pathway. They do not treat a handshake as an exit plan." },
    { t: "Six households, cluster and common house", d: "They compare community title against a co-op. Finance brokers warn that company title and co-op loans are non-standard. They budget survey, legal and holding costs as real line items, not hope." },
    { t: "Purpose land with an asset lock", d: "A charity or CLT holds the land. Households own or long-lease dwellings. This protects mission and is the wrong tool if the aim is to pass a tradeable land bank to children. Structure Lab AU studio exists for this fork." }
  ],
  checklist: [
    "Write the purpose in one paragraph: homes, investment, mission land, or a mix — mixes need two structures, not one muddy one.",
    "List who must be able to leave in 12 months, and who is comfortable locking land.",
    "Ask a solicitor which title and which document (deed, constitution, lease) will carry the rules.",
    "Ask council planning: current zone, overlays, lawful existing use, and the name of the approval pathway for extra dwellings.",
    "Ask a building certifier the likely NCC class and fire / access consequences before buying kits or tiny houses.",
    "Map money: individual loans vs joint loan vs entity loan; levy; sinking fund; who owns the common house.",
    "Ban informal cross-guarantees. If a guarantee is required, cap it in writing.",
    "Set a dispute path (mediation first) and a valuation method for exits.",
    "Check insurance: public liability on shared land, and whether tiny houses / moveable dwellings are actually covered.",
    "Take the notebook to a registered tax agent before any transfer, declaration of trust, or duty-triggering deal."
  ],
  defaultResources: [
    { region: "AU", name: "ATO — Super contributions", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/super-contributions", note: "Caps, concessional vs non-concessional." },
    { region: "AU", name: "ATO — Individual income tax rates", url: "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents", note: "Confirm the year you are modelling." },
    { region: "AU", name: "Moneysmart (ASIC)", url: "https://moneysmart.gov.au/", note: "Independent calculators and debt guidance." },
    { region: "AU", name: "NCC / ABCB", url: "https://www.abcb.gov.au/", note: "National Construction Code overview." },
    { region: "AU", name: "ACNC charity register", url: "https://www.acnc.gov.au/", note: "Charity status is not the same as DGR." },
    { region: "NSW", name: "NSW Planning Portal", url: "https://www.planningportal.nsw.gov.au/", note: "DA / CDC pathways." },
    { region: "NSW", name: "NSW legislation — planning", url: "https://legislation.nsw.gov.au/", note: "Search current housing and rural sharing instruments; names change." },
    { region: "ACT", name: "ACT Planning / Access Canberra", url: "https://www.planning.act.gov.au/", note: "Territory Plan, DA." },
    { region: "VIC", name: "VicPlan / planning.vic.gov.au", url: "https://www.planning.vic.gov.au/", note: "Zones and overlays." },
    { region: "QLD", name: "Queensland Planning", url: "https://planning.statedevelopment.qld.gov.au/", note: "Planning Act pathway." },
    { region: "SA", name: "PlanSA", url: "https://plan.sa.gov.au/", note: "Code and overlay maps." },
    { region: "WA", name: "WA Planning", url: "https://www.wa.gov.au/organisation/department-of-planning-lands-and-heritage", note: "Region and local schemes." },
    { region: "TAS", name: "Planning in Tasmania", url: "https://www.planning.tas.gov.au/", note: "TPS / local provisions." },
    { region: "NT", name: "NT Planning", url: "https://nt.gov.au/property/land-planning-and-development", note: "NT Planning Scheme." }
  ],
  zoningHints: {
    ACT: "ACT uses the Territory Plan, not NSW-style LEP/SEPP language. Ask Access Canberra / the planning authority: current zone, whether a second dwelling is dual occupancy, and whether a multi-dwelling or community title proposal needs a DA. Multiple occupancy is not an ACT term of art in the NSW sense.",
    NSW: "Ask the council planner: zone, minimum lot size, whether a secondary dwelling (complying development) is available, whether dual occupancy or multi-dwelling housing is permitted with consent, and whether any rural land-sharing / multiple occupancy clause or SEPP still applies to this lot. Also ask about bushfire and on-site sewer.",
    VIC: "Ask: zone and overlays (BMO, LSIO, heritage). Is a dependent person's unit, dual occupancy or group accommodation the right use term? Rural Conservation and Farming Zones treat extra dwellings very differently from Township Zone.",
    QLD: "Ask: planning scheme zone, whether a dual occupancy or multiple dwelling is accepted or assessable, and whether a rural lot can host a relative's dwelling or workers accommodation. Tiny houses on wheels may be treated as caravans or as dwellings — get the use definition in writing.",
    SA: "Ask PlanSA / council: Planning and Design Code zone and overlays, and whether ancillary accommodation or detached dwellings on one allotment are envisaged. Community title is a common South Australian tool — ask Lands Titles Office process separately from planning.",
    WA: "Ask: region scheme + local scheme zone, R-Code if urban, and whether a grouped dwelling or ancillary dwelling pathway exists. Rural lots often need a specific additional-dwelling clause.",
    TAS: "Ask: Tasmanian Planning Scheme zone and codes (bushfire, landslide, coastal). Visitor accommodation vs residential is a live distinction if you hope to host.",
    NT: "Ask: NT Planning Scheme zone, and whether multiple dwellings are discretionary in that zone. Servicing in remote lots dominates cost more than the label on the zone."
  }
};
