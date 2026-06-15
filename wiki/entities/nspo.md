---
type: entity
tags: [taiwan, space, satellite, leo, public-sector, qualification, tasa, nspo, earth-observation]
---

# NSPO / Taiwan Space Agency (TASA)

**NSPO** (National Space Organization) is the legacy name of Taiwan's national civil space agency, **renamed the Taiwan Space Agency (TASA) on 1 January 2023**. It is the public-sector demand-and-integration node referenced in [[sources/hsieh-xband-leo-transmitter-2020]] as the LEO satellite application collaborator for the X-band transmitter / XT-144 context, and it is the institutional anchor of Taiwan's place in [[concepts/leo-value-chain]] and [[synthesis/leo-taiwan-odc-gap]].

> Naming note: many older wiki pages and sources cite "NSPO." The organization is the *same* body; only the English name and legal status changed in 2023. This page is canonical for both names.

## Why It Matters (System Layer)

TASA is the single largest *sovereign demand signal* in Taiwan's space build-out. Taiwan's structural pattern — world-class upstream component foundries ([[entities/win-semiconductors]], [[entities/ascend-tech]], [[entities/huatong-pcb]]) but an absent midstream-C system-integration / orbital-data-center layer ([[synthesis/leo-taiwan-odc-gap]]) — exists partly *because* TASA was, until the 2020s, a small earth-observation-focused agency rather than a constellation operator pulling domestic system integration into being. The 2022–2023 status upgrade plus the new Beyond-5G LEO-communications mandate is the policy lever intended to close that gap: it converts TASA from a satellite *buyer* into a constellation *operator* that can anchor a domestic RF / phased-array / radiation-qualified supply chain (the [[concepts/rha-radiation-hardening|RHA]] / [[concepts/taiwan-radiation-test-ecosystem|test-ecosystem]] threshold is the hidden gate).

## Historical Lineage

- **1991** — founded as the **National Space Program Office (NSPO)** under the National Science Council, to cultivate domestic space-research talent. *(Earlier wiki text dated this "31-year-old in 2023" → 1991-92 origin, consistent.)*
- **1999** — FORMOSAT-1 (ROCSAT-1) launched: Taiwan's first satellite.
- **2004 / 2006** — FORMOSAT-2 (high-res imaging) and FORMOSAT-3/COSMIC (GNSS radio-occultation, US-Taiwan) establish Taiwan's earth-observation + ionospheric-sensing niche.
- **2017** — FORMOSAT-5: first fully indigenous remote-sensing satellite.
- **2019** — FORMOSAT-7/COSMIC-2 (US-Taiwan GNSS-RO constellation) reaches orbit; the **3rd-phase "National Space Technology Long-Term Development Program" (2019–2028)** begins with **NT$25.1 billion / 10 years**.
- **April 2022** — Legislative Yuan passes the *Act for the Establishment of the Taiwan Space Agency*, upgrading NSPO to a directly-affiliated agency.
- **1 January 2023** — officially becomes **TASA**, an administrative corporation under the **National Science and Technology Council (NSTC)**; HQ remains in **Hsinchu**.
- **October 2023** — government announces an additional **~NT$40 billion** boost, much of it directed at **Beyond-5G (B5G) LEO communications satellites**.
- **2023** — **TRITON** (Wind-Hunter), Taiwan's first self-developed meteorological satellite, launched with a domestic **GNSS-R** ocean-surface-wind payload.
- **28 November 2025** — **FORMOSAT-8A** (first of an 8-satellite high-resolution optical EO constellation) plus three CubeSats launched on a SpaceX rideshare from Vandenberg SFB (slipped from Oct 2025 partly via the US federal-government shutdown).

## Current Program Portfolio (as of 2026-06)

| Program | Purpose | Status |
|---|---|---|
| **FORMOSAT-8** | 8-satellite high-resolution optical earth-observation constellation; ~1 launch/yr to 2028 | FORMOSAT-8A in orbit (Nov 2025); remainder phased to ~2031 |
| **TRITON** | GNSS-R ocean-wind meteorology | Operational since 2023 |
| **B5G LEO comms** | Sovereign LEO communications satellites (resilience vs subsea-cable cut) | In development; first flight targeted mid/late 2020s |
| **FORMOSAT-7 / COSMIC-2** | GNSS radio-occultation (US-Taiwan), feeds [[concepts/swpc-space-weather-feeds|space-weather]] + ionospheric models | Operational (cross-links [[synthesis/space-weather-forecasting-six-region]]) |

## Six-Region Context (where TASA sits)

TASA is the **Taiwan** civil-space node in the wiki's six-region maps. Its profile is *civil-agency-building, upstream-strong / midstream-absent*, the same archetype that recurs across domains:

- **Regulatory:** TASA is paired with the NCC (spectrum) under the *Space Development Act 2021* — see [[synthesis/space-regulatory-regimes-six-region]] (Taiwan = nascent, no sovereign launch).
- **ODC / compute:** Taiwan is upstream-strong / midstream-C-absent — see [[synthesis/orbital-data-center-six-region]] and [[synthesis/leo-taiwan-odc-gap]].
- **Radiation qualification:** Taiwan has TID + proton but no heavy-ion SEE — see [[synthesis/radiation-test-rad-hard-six-region]] and [[concepts/taiwan-radiation-test-ecosystem]] (NSPO×NTU Cancer Center cyclotron MoU).
- **RF front-end:** Taiwan is a component supplier; the *emerging* array-integrator counter-example is the private vendor [[entities/tron-future-tech]] — see [[synthesis/phased-array-rf-frontend-supply-chain]].

Relative to peers: TASA's budget and cadence (≈1 sat/yr) sit far below NASA/ESA/CNSA/JAXA and below Korea's KASA-era ambitions, but its **GNSS-RO / ionospheric-sensing** contribution (COSMIC-2) is genuinely world-class and internationally relied-upon.

## Forward Trajectory (scenario / projection, not fact)

- **2026–2028:** complete the 3rd-phase cadence; first B5G LEO comms satellites; the open question is whether TASA pulls domestic *system integration* (not just components) into being — i.e. whether [[entities/tron-future-tech]]-class vendors become primes.
- **2030s:** a 4th-phase program would decide if Taiwan attempts a sovereign LEO communications constellation (resilience driver: subsea-cable vulnerability) and whether it builds the missing radiation-qualification + ODC midstream.
- **~100-year horizon:** Taiwan's durable comparative advantage is semiconductor *upstream*; whether the public agency can convert that into sovereign *midstream* space capability is the structural fork [[synthesis/leo-taiwan-odc-gap]] frames. **Label:** structural projection, not a program forecast.

## Sources & Verification (accessed 2026-06-15)

- 2023 rename + status upgrade + 1991 founding + NSTC parent: [Focus Taiwan, "Taiwan's space agency rebrands as TASA" (2023-01-06)](https://focustaiwan.tw/sci-tech/202301060017); [Taipei Times, "Space agency renamed TASA" (2023-01-02)](https://www.taipeitimes.com/News/taiwan/archives/2023/01/02/2003791834); [Taiwan Space Agency — Wikipedia](https://en.wikipedia.org/wiki/Taiwan_Space_Agency)
- 3rd-phase program NT$25.1B / 2019–2028 + ~NT$40B 2023 boost for LEO comms: [Taipei Times, "Tsai announces NT$40bn boost for space program" (2023-10-31)](https://www.taipeitimes.com/News/front/archives/2023/10/31/2003808468); [Taiwan Insight, "Commencing Countdown" (2025-02-28)](https://taiwaninsight.org/2025/02/28/commencing-countdown-taiwans-journey-in-space-development/)
- FORMOSAT-8A launch 2025-11-28 Vandenberg via SpaceX + TRITON 2023: [Formosat-8 — Wikipedia](https://en.wikipedia.org/wiki/Formosat-8); [TASA FORMOSAT-8 mission page](https://www.tasa.org.tw/en-US/missions/detail/FORMOSAT-8)

## Related

- [[sources/hsieh-xband-leo-transmitter-2020]] — X-band LEO transmitter for which NSPO was the application collaborator
- [[sources/thesis-aesa-modules-zheng-2021]] — XT-144 / AESA system context
- [[entities/tron-future-tech]] — Taiwan private RF/AESA vendor; industry counterpart to public-sector TASA
- [[concepts/leo-value-chain]] — where TASA's demand sits in the LEO chain
- [[concepts/taiwan-radiation-test-ecosystem]] — NSPO×NTU cyclotron MoU; qualification gate
- [[concepts/rha-radiation-hardening]] — radiation hardening assurance
- [[concepts/aesa]] / [[concepts/hybrid-phased-array]] — RF apertures TASA missions consume
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan upstream-strong / midstream-absent thesis
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region RF front-end map
- [[synthesis/space-regulatory-regimes-six-region]] — Taiwan regulatory node (TASA + NCC)
- [[synthesis/orbital-data-center-six-region]] — Taiwan ODC position
</content>
</invoke>
