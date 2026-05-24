---
type: source
title: "LeoLabs Conjunction Alerts — Commercial SSA CDM Service"
author: "LeoLabs, Inc."
date: "2025-01-01"
ingested: "2026-05-24"
tags: [conjunction, cdm, ssa, space-debris, commercial-ssa, mission-desk, firefly, leolabs]
---

# LeoLabs Conjunction Alerts — Product Documentation

Primary documentation source for LeoLabs's commercial conjunction assessment and CDM delivery service. Verified from the LeoLabs Conjunction Alerts product page (https://leolabs.space/conjunction-alerts/) and supporting documentation (LeoLabs Tracking and Monitoring white paper, 2021).

**Product page URL**: https://leolabs.space/conjunction-alerts/  
**Platform URL**: https://platform.leolabs.space/  
**API system metrics**: https://api.leolabs.space/system_metrics

## Confirmed Service Specifications (2025)

These values are directly quoted from the LeoLabs product page (verified via WebFetch 2026-05-24):

- CDMs **generated sequentially and delivered in less than 5 minutes**
- **On-demand ephemeris screening** returns CDMs in **less than 30 seconds**
- **Up to 400% more frequent conjunction updates** than baseline (18 SDS every ~8 h → LeoLabs effectively every 1–2 h for active events)
- Coverage: **22,000+ satellites, rocket bodies, and hazardous debris fragments** (as of 2025)
- Secondary object state vector and covariance information for **high-risk events**
- Dashboard integrates **both LeoLabs and U.S. Government CDMs** in a single view
- Conjunction Analysis Reports with interactive visualisations and astrodynamics expert guidance

## Radar Network

LeoLabs operates **phased-array radar stations** at multiple global sites including New Zealand, Texas, Alaska, and Costa Rica. The network provides 24/7 LEO coverage and tracks objects down to approximately 5–10 cm RCS — finer resolution than the traditional 18 SDS catalog for small debris.

## Covariance Quality Advantage

LeoLabs performs **covariance realism assessments** comparing propagated orbits against subsequent radar observations. This gives operators a quantitative metric for covariance confidence — a significant operational advantage over 18 SDS TLE-based covariances, which are known to be optimistic for many debris populations.

## API Access

LeoLabs provides a REST API (`api.leolabs.space`) supporting JSON and XML output. The API is documented for commercial subscribers. Pricing is not publicly listed; operators must contact LeoLabs for subscription terms.

## Product Name Clarification

⚠️ The task brief referred to "LeoTrack" and "Vertex" as LeoLabs product names. These names were **not confirmed** on the LeoLabs website or product documentation as of 2026-05-24. The confirmed product names are:
- **LeoLabs Platform** — data access and operator portal
- **Conjunction Alerts** — the CDM and collision avoidance service

The origin of "LeoTrack" / "Vertex" is unclear (possibly older internal product names or third-party attribution errors). Firefly agent documentation should use confirmed names only.

## Comparison with Space-Track (Summary)

| Dimension | LeoLabs | 18 SDS / Space-Track |
|---|---|---|
| CDM latency | < 5 min | ~8 h batch |
| Update cadence | Up to 400% more frequent | Every 8 h |
| Covariance source | Own phased-array radar | TLE propagation |
| Pricing | Paid subscription | Free |
| Debris coverage | ~5–10 cm class | ~10 cm (Space Fence) |
| Integration | Own API + government data | Space-Track REST API |

## Upgrade Path Relevance

LeoLabs represents the primary commercial upgrade for the Firefly conjunction agent once the MVP is validated on free Space-Track data. The most important improvements are:
1. Faster CDM delivery (actionable 6+ hours earlier for most events)
2. Better covariance realism (fewer false-positive maneuver recommendations)
3. Smaller debris coverage (catches threats missed by 18 SDS catalog)

## See Also

- [[entities/leolabs]] — LeoLabs entity profile
- [[entities/18-sds]] — the government alternative
- [[sources/space-track-cdm-api-2023]] — the free baseline LeoLabs supplements
- [[concepts/covariance-ellipsoid]] — why covariance quality matters
- [[synthesis/cdm-pc-decisioning]] — commercial upgrade path section
