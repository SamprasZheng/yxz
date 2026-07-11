---
type: concept
tags: [conjunction, cdm, ssa, space-debris, commercial-ssa, mission-desk, firefly, tracss, space-track, leolabs, slingshot, comspoc, privateer, kayhan, vyoma]
---

# Conjunction Screening Providers

Conjunction screening providers maintain catalogs of resident space objects (RSOs), propagate orbits forward, and generate [[concepts/cdm-conjunction-data-message|CDMs]] when two objects are predicted to pass within a defined [[concepts/screening-volume|screening volume]]. Operators receive CDMs from one or more providers and use them as the primary input for collision avoidance decisions.

## Provider Comparison Table

| Provider | Data Source | Update Cadence | Coverage | Latency (event → CDM) | Cost Model | API | Authoritative / Advisory |
|---|---|---|---|---|---|---|---|
| **18 SDS / Space-Track** | Ground radar (SSN), Space Fence | ~8 h batch | ~27,000 objects (LEO+GEO+HEO); ≥10 cm LEO debris | Up to 8 h | Free (registration) | REST (`space-track.org`); JSON/XML/KVN/CSV | **Authoritative** (US DoD) |
| **TraCSS (OSC/NOAA)** | Civil SSA sources + commercial data vendors | ~8 h (beta); target: continuous | Inherits 18 SDS catalog + commercial augmentation | Similar to Space-Track (shares interface in beta) | Free today (operator registration at TraCSS.gov); **user-fee model under study** | TraCSS.gov (expanded beta; direct registration live 2026); production date slipped (see below) | **Authoritative** (US DoC civil STM) *once complete* |
| **LeoLabs** | Phased-array radar network (6+ global sites: NZ, Texas, Alaska, Costa Rica, Azores) | Every 1–2 h for active events; on-demand < 30 s | 22,000+ objects; ≤10 cm RCS class | < 5 min from observation | Commercial subscription (pricing not public; contact sales) | REST (`api.leolabs.space`); JSON/XML | Advisory |
| **COMSPOC / SDA SDC** | Multi-source fusion (SDA member operator ephemerides + ground sensors); 500,000+ object catalog | Sub-hourly; orbit update within 5–10 min of data receipt | All orbital regimes; SDA member objects with operator-provided states | ~5–10 min per source refresh | SDA membership fee required; operators must share ephemeris data | Proprietary API + web portal (`comspoc.com`) | Advisory (member community) |
| **Slingshot Aerospace (Beacon)** | Optical sensor network (150+ sensors in SGSN) + ingests Space-Track CDMs | Depends on source; Beacon is primarily an aggregation/presentation layer | Augments government catalog; focuses on LEO | Inherits upstream latency; real-time alerting layer | Commercial (demo required; pricing not public) | Platform API (`beacon.slingshot.space`) | Advisory |
| **Privateer Space (Wayfinder)** | Open-source orbital data + NASA CARA integration + Orbital Insight (geospatial AI, acquired May 2024) | Not specified publicly | Not specified publicly | Not specified | Basic Crow's Nest tool: free; advanced/API: premium via AWS Marketplace | REST (API planned; premium tier) | Advisory |
| **Kayhan Space (Pathfinder)** | Multi-source catalog (government TLEs + commercial augmentation) | ≥ 3× per day; on-demand cadence higher available | Not specified publicly | Not specified | Commercial subscription; customers include Capella Space, Lynk Global, Globalstar | REST (`app.kayhan.io`); OAuth authentication | Advisory |
| **Vyoma (Flamingo constellation)** | Ground-based optical (6 cm class in clear conditions); space-based optical (Flamingo SSA satellite, launched ~late 2025) | Not specified | Primarily LEO ≥10 cm; European defense focus | Not specified | Commercial (European defense + operator customers) | Not publicly documented | Advisory |

## Authoritative vs. Advisory

**Authoritative**: A CDM from 18 SDS / Space-Track carries US government authority — it is the legal and operational basis for collision avoidance for US-licensed satellites. When a satellite operator with an FCC licence receives a high-Pc CDM from Space-Track, they have a regulatory obligation to assess and potentially manoeuvre. TraCSS CDMs will have equivalent authority for civil US operators once the DoC/DoD STM transition is complete.

**Advisory**: Commercial provider CDMs (LeoLabs, COMSPOC, Slingshot, Kayhan, etc.) have no regulatory standing, but are often more accurate due to higher update cadence, better covariance realism (phased-array radar vs. TLE propagation), and coverage of smaller objects. Commercial operators routinely supplement Space-Track CDMs with commercial data for operational decision-making.

## Data Source Deep Dive

### 18 SDS / Space-Track

The Space Surveillance Network (SSN) includes approximately 30 contributing sensors: ground-based radars (including the Space Fence at Kwajalein, the primary catalogue-maintenance radar since 2020; UHF/S-band surveillance radars globally), optical telescopes (GEODSS sites), and the Cobra Dane radar at Eareckson AS. The Space Fence can track objects as small as ~5 cm in LEO. The public TLE-based catalog covers ~27,000 objects as of 2024–2026. Special Perturbations (SP) vectors with better accuracy are available for operator-registered objects.

### LeoLabs

Six operational radar sites: New Zealand (EOS), Texas (MFS), Alaska (Poker Flat — partnership with SRI International), Costa Rica, Azores. Each site operates a phased-array radar capable of tracking dozens of objects simultaneously without mechanical slew delays. A seventh site in the Indo-Pacific is in development. New expeditionary (deployable) RANGER radar system was announced April 2025 targeting <10 cm debris. The network provides all-weather coverage. Precision: better than 10 m range, 10 cm/s radial velocity. LeoLabs was originally spun out from SRI International (~2016), headquartered in Menlo Park, California.

### COMSPOC / SDA Space Data Center

The Space Data Center (SDC) is operated by COMSPOC Corporation (originally built by AGI) on behalf of the Space Data Association (SDA) — a non-profit industry group of satellite operators primarily in GEO (telecommunications operators). The SDC has been operational since July 15, 2010. SDA members include major GEO operators (SES, Intelsat, Eutelsat, etc.). Membership requires: payment of a membership fee, and sharing of operator ephemerides (advanced manoeuvre information). COMSPOC's SSASuite catalog ingests and fuses data across all sensor types. In the 2024 TraCSS Consolidated Pathfinder, COMSPOC received new OSC orders for commercial SSA data alongside LeoLabs, Slingshot, Kayhan Space, and SpaceNav — total pathfinder budget: $15.5 million. In March 2026, the SDA selected GMV (Spanish/European astrodynamics firm) to build a next-generation space safety system for the SDC.

### Slingshot Aerospace (Beacon)

Slingshot's own sensor asset is its Global Sensor Network (SGSN) of 150+ optical telescopes for space domain awareness. However, **Beacon** — the CDM management product — primarily ingests Space-Track and other upstream CDMs and provides a fleet-level aggregation, alerting, and operator-coordination layer on top. Beacon generates CDMs against custom fleet ephemerides and supports secondary operator coordination (maneuver-sharing via structured messaging). Slingshot was awarded a $13.3 million NOAA contract in November 2024 to build the TraCSS.gov user interface (with COMSPOC and T&T Consulting). Slingshot acquired the Seradata satellite database (UK) but this is primarily for market intelligence, not conjunction screening.

### Privateer Space (Wayfinder / Crow's Nest)

Privateer was founded by Alex Fielding and Steve Wozniak (Apple co-founder) in 2021. Crow's Nest is a free, open collision risk assessment tool available on the Wayfinder visualisation platform. It integrates NASA CARA tools for Pc computation. In May 2024 Privateer raised $56.5 million Series A (led by Aero X Ventures, with Lux Capital, Winklevoss twins) and acquired Orbital Insight (geospatial AI; TerraScope analytics platform) to expand beyond SSA data into multi-domain intelligence. Advanced API features and premium tier access are available via Amazon AWS Marketplace. As of 2026, Privateer's CDM API capabilities and exact coverage are not fully publicly documented.

### Kayhan Space (Pathfinder)

Kayhan's Pathfinder platform provides conjunction assessment and autonomous collision avoidance as a SaaS subscription. Customers as of 2022 include Capella Space, Lynk Global, and Globalstar. Pathfinder supports routine screenings at ≥3×/day cadence with on-demand available. In 2024, Kayhan was included in the TraCSS Consolidated Pathfinder alongside LeoLabs, Slingshot, COMSPOC, and SpaceNav. Authentication is via OAuth tokens at `https://app.kayhan.io/api/`. The platform exposes Conjunction Assessment, Events and Mitigation Intent, CDMs, and Analytics endpoints.

### Vyoma

Vyoma (Munich, Germany; founded August 2020) provides SSA and conjunction assessment services primarily to European defense customers. The Flamingo constellation of SSA satellites uses optical sensors for space-based tracking of LEO debris. Ground-based sensors can track objects as small as 6 cm in clear atmospheric conditions. Vyoma's second SSA satellite was under contract with Aerospacelab as of June 2024 for launch from late 2025. Vyoma received two European Defence Fund (EDF) contracts for the EMISSARY project (European Space Command and Control SC2 centre scheduling). Service offerings: Conjunction Assessment Service + Orbit Determination Service with dedicated tracking campaigns to update CDMs. Target customers: European operators; national defense agencies. Vyoma is not a TraCSS Pathfinder contractor.

## Geographic Coverage Notes

18 SDS covers all orbital regimes globally but depends on its fixed network of ground sensors. LEO objects have coverage gaps between sensor passes. The Space Fence (mid-Pacific) provided significant improvement in LEO coverage post-2020.

Commercial providers with global radar networks (LeoLabs) achieve better LEO coverage density and more frequent observation opportunities per object. COMSPOC/SDA has historically focused on GEO due to its membership base. Slingshot's optical sensors have weather-dependent availability.

## National SSA Infrastructure by Region (六地域)

The provider table above is **commercial + US-government** centric — natural, because the [[entities/18-sds|18 SDS]] catalog is the only *legally authoritative* CDM source on Earth. But every spacefaring region now runs its own national SSA infrastructure, and the differences are governance-shaped, not just capability-shaped. Full treatment, dated facts, and the 100-year Kessler view: [[synthesis/space-situational-awareness-six-region]].

| Region | Lead org(s) | Flagship national sensors | Governance model |
|---|---|---|---|
| **US** | USSF 18/19 SDS; DoC OSC [[sources/tracss-oasis-announcement-2024]] | SSN ~30 sensors; Space Fence (2020, ~5 cm LEO); GEODSS | Authoritative, civilianizing |
| **Europe** | EU SST Partnership (15→19 members, Dec 2025) + ESA Space Safety | GESTRA (Germany, 2024-01, ≤3,000 km); GRAVES (France); TIRA (imaging) | Federated coordination |
| **China** | CNSA Space Debris Center (NAOC); APSCO/APOSOS; PLA-SSF | APOSOS 15 cm optical nodes + Beijing data center; large closed military network | Sovereign + multilateral, data-closed |
| **Japan** | JAXA + MoD | Kamisaibara radar (LEO) + Bisei optical (GEO); new Sanyo-Onoda radar (2025-03); SDA satellite FY2026 | Civil-military, fast build-out |
| **Korea** | KASI / NSSAO | OWL-Net 5-station optical network (2018); 2D radar in development | Astronomy-institute led, radar gap |
| **Taiwan** | TASA (civil); MND | PAVE PAWS (AN/FPS-115) missile-warning radar, incidental space tracking; no dedicated SSA radar | Consumer + compute niche |

**Long-horizon note:** the providers above all chase the same moving target. Per the ESA *Space Environment Report 2025*, even if all launches stopped today the orbital population would keep growing for **200+ years** (Kessler cascade), and the **1–10 cm "deadly-but-untrackable" gap** below the ~5–10 cm sensor floor is the permanent SSA frontier — see [[synthesis/space-situational-awareness-six-region]] §4.

## CDM Fusion: Using Multiple Providers

Sophisticated operators (large LEO constellations, GEO operators) subscribe to multiple providers and fuse their CDMs:

1. Use Space-Track CDMs as the authoritative baseline (regulatory required)
2. Augment with LeoLabs CDMs for better covariance and smaller debris coverage
3. Use Slingshot Beacon as the fleet-management dashboard to aggregate all CDM streams
4. Consult COMSPOC/SDA data for events involving GEO neighbours

The Spacesharks Mission Desk [[synthesis/cdm-pc-decisioning|CDM decisioning workflow]] starts at Tier 0 (Space-Track only, free), with LeoLabs as the defined Tier 1 upgrade and Slingshot Beacon as Tier 2.

## TraCSS: Converging the Ecosystem

The [[sources/tracss-oasis-announcement-2024|Traffic Coordination System for Space (TraCSS)]] represents the US government's attempt to consolidate the civil CDM ecosystem:

- OSC awarded Commercial Conjunction Assessment Screening Services (CASS) pilot contracts (announced 2026)
- TraCSS will aggregate commercial provider data and provide a single civil interface at TraCSS.gov
- The commercial providers above (LeoLabs, Slingshot, COMSPOC, Kayhan, SpaceNav) all receive OSC contracts to feed data into TraCSS

### The 2025–2026 budget near-death and rescue (fact-check, accessed 2026-07-11)

TraCSS is the clearest case in this cluster of a civil-STM layer that is **politically contingent, not guaranteed** — the prior wiki framing of a smooth "production 2026" understated the risk:

- **Proposed termination:** NOAA's **FY2026 budget proposal** (released ~June 2025) sought to gut the Office of Space Commerce and **end federal funding for TraCSS**, on the argument that the commercial sector should absorb space-traffic coordination ([SpaceNews](https://spacenews.com/commerce-department-budget-proposal-would-halt-work-on-tracss/), [Payload](https://payloadspace.com/noaa-proposes-terminating-tracss-program/), [The Conversation](https://theconversation.com/office-of-space-commerce-faces-an-uncertain-future-amid-budget-cuts-and-new-oversight-265710)). The Space Force publicly *opposed* the cut, having planned to hand civil STM off ([Air & Space Forces Mag](https://www.airandspaceforces.com/space-force-opposes-to-cutting-tracss-program-from-commerce-budget/)).
- **Congressional restoration:** House and Senate appropriators **restored the money**; the final FY2026 bill gave OSC **$52.5M**, keeping TraCSS alive ([Breaking Defense](https://breakingdefense.com/2025/07/appropriators-restore-funding-for-commerces-tracss-spacewatch-effort/), [SpacePolicyOnline](https://spacepolicyonline.com/news/senate-appropriators-retain-funding-for-noaas-tracss-space-traffic-system/)).
- **Schedule slipped:** the "fully operational by January 2026" target was pushed back; OSC now moves more deliberately and is studying a **user-fee / new financial structure** rather than a purely appropriated free service.
- **Current footprint (June 2026):** **52 pilot users + 2 National Government Accounts — the United Kingdom and Australia** — together ~**11,125 satellites** (up from 35 pilot users / 10,696 satellites in April 2026), now able to register directly through the TraCSS webpage. This is an expanded, *internationalising* beta — a real milestone (first foreign national accounts) but still short of the authoritative production replacement for [[entities/space-track-19sds|Space-Track]].

**Implication for provider selection:** treat Space-Track (18 SDS) as the durable authoritative baseline for the near term; TraCSS is additive and improving but should not be assumed to be the sole civil interface on any fixed date. The *commercial* providers in the table above are, if anything, strengthened by TraCSS's funding fragility — a user-fee civil service raises the relative attractiveness of a paid commercial subscription. Market-structure read: [[synthesis/commercial-space-traffic-management-six-region]].

## See Also

- [[concepts/cdm-conjunction-data-message]] — CDM format and field-level reference
- [[concepts/screening-volume]] — geometric filter used by all providers
- [[concepts/pc-probability-of-collision]] — the metric all providers compute
- [[entities/18-sds]] — authoritative CDM source (US DoD)
- [[entities/space-track-19sds]] — 18 SDS / 19 SDS operational structure
- [[entities/leolabs]] — commercial radar SSA provider
- [[entities/slingshot-aerospace]] — Beacon platform + TraCSS UI
- [[sources/ccsds-508-cdm-2013]] — CDM format standard all providers follow
- [[sources/tracss-oasis-announcement-2024]] — convergence framework for commercial providers
- [[sources/leolabs-conjunction-alerts-2025]] — LeoLabs service specifications
- [[synthesis/cdm-pc-decisioning]] — provider selection and upgrade path in Firefly workflow
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Phase 4 context
- [[concepts/swpc-space-weather-feeds]] — space weather data that must be fused with CDM
- [[concepts/notam-space-operations]] — operational context alongside CDMs
- [[synthesis/space-situational-awareness-six-region]] — six-region national SSA infrastructure + governance models + 100-year Kessler view
- [[synthesis/commercial-space-traffic-management-six-region]] — the same providers read as a six-region *commercial industry* (market models, funding, government-anchored demand, STM-commercialization 100-year question)
