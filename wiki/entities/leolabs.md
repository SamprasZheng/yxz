---
type: entity
tags: [conjunction, cdm, ssa, space-debris, commercial-ssa, mission-desk, firefly]
---

# LeoLabs

LeoLabs is a US commercial Space Situational Awareness (SSA) company that operates a global network of phased-array radar stations to provide high-precision tracking of LEO objects, including conjunction assessment and CDM delivery services to satellite operators. It is the best-documented commercial CDM alternative to Space-Track for the Firefly conjunction agent.

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
- Coverage: 22,000+ satellites, rocket bodies, and hazardous debris fragments (2025 figure)

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
- [[synthesis/space-situational-awareness-six-region]] — LeoLabs among the six regional SSA systems (Vyoma is the European analog)
