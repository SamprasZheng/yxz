---
type: entity
tags: [conjunction, cdm, ssa, space-debris, commercial-ssa, mission-desk, firefly]
---

# LeoLabs

LeoLabs is a US commercial Space Situational Awareness (SSA) company that operates a global network of phased-array radar stations to provide high-precision tracking of LEO objects, including conjunction assessment and CDM delivery services to satellite operators. It is the best-documented commercial CDM alternative to Space-Track for the Firefly conjunction agent. By 2026 its revenue mix has shifted decisively toward **US-government contracts** (radar hardware + catalog licensing) — the Tier-1 ("know") illustration of the [[synthesis/commercial-space-traffic-management-six-region|government-anchored commercial STM market]] thesis (see the government-contracts section below).

## Business and Background

- Founded: ~2016 (spin-out from SRI International)
- Headquarters: Menlo Park, California
- Service focus: LEO commercial tracking (roughly 160–2,000 km altitude)
- Customers: commercial satellite operators, government agencies, insurers

## Radar Network (confirmed)

LeoLabs operates phased-array radars at multiple sites including New Zealand, Texas, Alaska, and Costa Rica. The network provides 24/7 coverage of LEO objects down to approximately 5–10 cm RCS (smaller than the 18 SDS/Space Fence threshold for many debris populations).

## CDM and Conjunction Services

Per the LeoLabs Conjunction Alerts product page (verified 2025):

- CDMs are **generated sequentially and delivered in less than 5 minutes** of event detection
- **On-demand ephemeris screening** returns CDMs in less than 30 seconds
- Provides "**up to 400% more frequent conjunction updates**" compared to baseline (18 SDS cadence of every 8 hours)
- CDMs include secondary object state vector and covariance for high-risk events
- Dashboard integrates **both LeoLabs and U.S. Government CDMs** in a single view
- Covariance realism assessments are performed by comparing propagated orbits against subsequent observations
- Coverage: ~25,000 tracked resident space objects in the Object Catalog (2026 figure; 22,000+ was the 2025 figure)

## US Government Contracts & the Tier-1 Government-Anchor (2025–26 fact-check)

The most important development on this page since it was written: LeoLabs' *growth* is now overwhelmingly US-government-driven, which pushes the [[synthesis/commercial-space-traffic-management-six-region|"government-anchored commercial STM"]] thesis one tier *down* — the anchor reaches even the Tier-1 "know / independent data" layer, not just the Tier-2 conjunction-SaaS layer.

- **First interagency catalog-license contract (awarded 2025-09-30):** the DoC **Office of Space Commerce (OSC)** + the USSF **Joint Commercial Operations (JCO)** cell jointly licensed LeoLabs' **Object Catalog** (~25,000 RSOs) to feed *both* the military **Unified Data Library (UDL)** and the civil **[[sources/tracss-oasis-announcement-2024|TraCSS]]** simultaneously — the first time multiple US agencies pooled a *commercial* catalog at scale (initial term through mid-March 2026, extendable). Validates the commercial sector as the "foundational data layer" for both the civil and military SSA missions. (LeoLabs press 2025-12; SpaceNews "LeoLabs lands interagency contract to feed TraCSS and track adversarial spacecraft.")
- **$20.68M USSF Scout-S mobile-radar contract (2026-08-27):** the US Space Force awarded LeoLabs a **transportable/expeditionary Scout-S** surveillance-radar variant for LEO+VLEO space-domain-awareness tracking — a *hardware* sale, not a data subscription. The mobile Scout radar participated in the **Valiant Shield** exercise (2026-06); the Scout line was seeded by a 2025 USSF **TACFI** award + private investment, and a further Scout variant is being optimized for **missile tracking** (2026). (SatNews / Payload / Via Satellite, 2026-08.)
- **Record 2025 book of business:** LeoLabs closed 2025 with **>$60M in total contract awards** and **186% YoY growth in US-government contracts**, entering 2026 with **11 operational radars across 7 sites**, a **NASA Space Act Agreement**, and the joint civil-military catalog license above. (PRNewswire 2025.)

**Read:** LeoLabs began as the archetypal *commercial-subscription* SSA data vendor, but its 2025–26 revenue inflection is a government one (a radar-hardware contract + a dual-agency catalog license + triple-digit gov-contract growth). This is the same "customer-of-last-resort is the state" pattern the synthesis records at Tier 2 (Slingshot/Kayhan on TraCSS) — now demonstrated at Tier 1, and it is exactly what makes the TraCSS budget fight ([[synthesis/space-situational-awareness-six-region]] §3.1) load-bearing for the *whole* commercial SSA market, not just the screening-SaaS layer.

## API and Platform Access

LeoLabs exposes a web-based REST API (`api.leolabs.space`) supporting JSON and XML. The platform web application provides interactive visualisation for operators. Specific pricing is not publicly disclosed — contact LeoLabs sales.

⚠️ Product names "LeoTrack" and "Vertex" were cited in the task brief but were not confirmed on the LeoLabs website as of the research date. The confirmed product names are **LeoLabs Platform** (data access) and **Conjunction Alerts** (the CDM service).

## Key Differentiators vs. Space-Track CDMs

| Dimension | LeoLabs | 18 SDS / Space-Track |
|---|---|---|
| Update cadence | Every 1–2 h (high-risk) | Every ~8 h |
| CDM delivery time | < 5 min | Batch push |
| Covariance source | Own phased-array observations | TLE-based propagation (often optimistic) |
| Coverage depth | ~5–10 cm class debris | ~10 cm (with Space Fence) |
| Pricing | Commercial subscription | Free (registration required) |
| Secondary object data | Full state + covariance for high-risk | Partial in `cdm_public`; full in `cdm` for registered operators |

## Six-Region Positioning

LeoLabs is the leading **US commercial** SSA radar network, but commercial/national SSA is a six-region landscape. Its rough European analog is **Vyoma** (Munich; optical + Flamingo space-based constellation, European-defense focus); China's equivalent capability sits inside the **state** CNSA/APSCO system rather than a private firm; Japan (JAXA), Korea (KASI OWL-Net), and Taiwan (consumer posture) round out the picture. LeoLabs' value proposition — higher cadence and better covariance realism than the government TLE-based catalog — is what *every* region's operators want and few national systems deliver. Full map + governance models + 100-year Kessler view: [[synthesis/space-situational-awareness-six-region]].

## Relevance to Firefly / NemoClaw Stack

LeoLabs is the recommended upgrade path once the Mission Desk validates its CDM pipeline on free Space-Track data. Higher cadence and better covariance quality would reduce false positives and enable earlier maneuver planning. The API is compatible with JSON-based CDM parsing used in the Firefly agent.

## See Also

- [[synthesis/cdm-pc-decisioning]] — MVP uses Space-Track; LeoLabs is the upgrade path
- [[entities/18-sds]] — the government alternative LeoLabs supplements
- [[entities/slingshot-aerospace]] — another commercial CDM provider
- [[concepts/covariance-ellipsoid]] — why LeoLabs covariance quality matters
- [[concepts/pc-probability-of-collision]] — higher-quality covariance → more reliable Pc
- [[synthesis/space-situational-awareness-six-region]] — LeoLabs among the six regional SSA systems (Vyoma is the European analog); §3.1 = the TraCSS budget fight that makes LeoLabs' gov-contract book load-bearing
- [[synthesis/commercial-space-traffic-management-six-region]] — the commercial-market map; LeoLabs is the Tier-1 "know" node whose 2025–26 growth demonstrates the government-anchor reaches all three tiers
- [[entities/kayhan-space]] · [[entities/slingshot-aerospace]] — Tier-2 "decide" vendors on the same TraCSS government-anchor
