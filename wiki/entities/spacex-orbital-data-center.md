---
type: entity
tags: [leo, space, data-center, ai, us, starship, megaconstellation, xai, odc]
---

# SpaceX Orbital Data Center System

## Basic Information

The **"SpaceX Orbital Data Center System"** is an NGSO satellite system SpaceX proposed to the US **FCC on 2026-01-30**: a constellation of **up to one million satellites** carrying compute payloads in Low Earth Orbit, to be filled by Starship-class heavy lift. The FCC **Space Bureau accepted the application for filing on 2026-02-04 (DA-26-113)**. It is the single largest declared [[concepts/orbital-data-center]] program by satellite count — roughly an order of magnitude beyond [[entities/ada-space]]'s 2,800-satellite target and [[entities/starcloud]]'s ~88,000-satellite paper runway — and it reframes the **US** column of the six-region map ([[synthesis/orbital-data-center-six-region]]) from "capability per node" alone to *also* a hyperscale-scale bet.

## Filing Specifications (as reported)

| Item | Value |
|---|---|
| System name | SpaceX Orbital Data Center System (NGSO) |
| Max satellites | **up to 1,000,000** |
| Altitude | **500–2,000 km** |
| Inclinations | **30° and sun-synchronous** — chosen to maximise time in sunlight for solar power |
| Stated compute scaling | SpaceX estimate: launching **~1 million tonnes/yr** of satellites → **~100 GW/yr of AI compute capacity** added |
| FCC filed | **2026-01-30** |
| FCC accepted for filing | **2026-02-04** (Space Bureau, DA-26-113) |

Sources (WebFetch proxy-blocked 403; corroborated across ≥2 independently-named outlets via search): [SpaceNews](https://spacenews.com/spacex-files-plans-for-million-satellite-orbital-data-center-constellation/), [FCC — SB Accepts SpaceX ODC Application](https://www.fcc.gov/document/sb-accepts-filing-spacexs-application-orbital-data-centers), [SatNews (2026-01-31)](https://satnews.com/2026/01/31/spacex-files-fcc-application-for-million-satellite-orbital-data-center/), [DCD](https://www.datacenterdynamics.com/en/news/spacex-files-for-million-satellite-orbital-ai-data-center-megaconstellation/) (accessed 2026-07-20).

## The AI1 satellite — the filing's hardware, and concrete radiator numbers

The million-satellite filing named no spacecraft; on **2026-06-09** Musk/SpaceX revealed the design of that spacecraft — the **AI1 Compute Satellite** — turning the paper constellation into a concrete engineering object and, usefully for this wiki, publishing the **first hyperscale-class heat-rejection numbers** any ODC entrant has disclosed. Reported specifications (treat as *revealed design*, not flown):

| Item | Value |
|---|---|
| Compute power | **~120 kW average / 150 kW peak** (SpaceX likens it to a rack of NVIDIA **GB300** GPUs) |
| Solar array | **~70 m tip-to-tip** wingspan; **~20 m** tall when deployed |
| Attitude | **"blade" posture edge-on to the Sun** — minimises absorbed flux, maximises radiator view to cold space |
| Heat rejection | **double-sided deployable liquid-cooling radiators, ~110 m² per satellite, ~1,400 W/m² cooling density** |
| Downlink | **laser inter-satellite links to the existing Starlink constellation** (no dedicated ground segment) |
| Orbit / first launch | sun-synchronous; **first AI1 satellites targeted 2027** |

Sources (WebFetch proxy-blocked; corroborated across ≥2 independently-named outlets via search): [Tom's Hardware](https://www.tomshardware.com/tech-industry/spacex-details-its-ai1-compute-satellite), [Quartz (2026-06-10)](https://qz.com/spacex-ai1-satellite-orbital-data-center-ipo-061026), [Light Reading](https://www.lightreading.com/data-centers/musk-magic-not-needed-for-spacex-s-orbital-ai-data-center-plan), [DCD](https://www.datacenterdynamics.com/en/news/spacex-ipo-musks-firm-set-to-launch-first-orbital-data-center-ai1-satellites-in-2027-will-put-compute-on-starlink-craft/) (accessed 2026-09-28).

**Why the radiator numbers matter (the σT⁴ thesis made numeric).** The whole six-region read turns on heat rejection, not power, being the binding constraint ([[concepts/orbital-data-center]], [[synthesis/orbital-data-center-six-region]]). AI1 is the first design to quantify it at scale: **~110 m² of deployable radiator to shed ~120 kW** implies rejecting roughly **~1.1 kW per m²** of *radiator* — right at the ~1,400 W/m² cooling-density claim — and the **~110 m² radiator vs the ~70 m array** confirms the cluster's prediction that at gigawatt-class scale **radiator structures rival or exceed the solar arrays**. The **blade-to-sun posture** and **liquid-loop-to-deployable-panel** architecture are the physical expression of "lead with radiator geometry, not FLOPS." A million such nodes at ~120 kW each is the arithmetic path to the filing's ~100 GW/yr claim — and the arithmetic that keeps σT⁴, not energy, the 100-year ceiling.

## The xAI / Anthropic Demand Arm

The compute-demand rationale is unusually concrete for an ODC filing. SpaceX **acquired xAI (Feb 2026)** in a deal reportedly valuing the combined entity at **~$1.25 trillion**, folding a frontier-model compute buyer into the launch provider. Reporting further indicates **Anthropic is paying ~$1.25 billion/month for access to xAI data-center compute** — i.e. a named, contracted demand signal for the compute SpaceX proposes to move to orbit. Treat the xAI-valuation and Anthropic-spend figures as **reported, not filing-confirmed** ([Via Satellite (2026-02-02)](https://www.satellitetoday.com/connectivity/2026/02/02/spacex-acquires-xai-to-pursue-orbital-data-center-constellation/)). This is the vertical-integration counter to the rest of the field: where [[entities/starcloud]] rents to AWS/Google Cloud/NVIDIA/Crusoe and [[entities/ada-space]] signed Tencent as an external customer, SpaceX would own launch **and** the model tenant.

## Why It Matters (six-region context)

Before this filing the US read was "capability per node, VC-funded" ([[entities/starcloud]] H100/Blackwell, [[entities/axiom-space]] relay nodes, [[entities/google-suncatcher]] TPU formation). SpaceX adds a **third US archetype — launch-integrated hyperscale scale**, the only bet whose satellite count rivals a Chinese state program. It sharpens the [[synthesis/orbital-data-center-six-region]] "two different leads" read: capability (US) vs deployed scale (China) is now contested *within* the US column, because SpaceX proposes scale that only a launch monopoly could physically loft. **2026-08 made that advantage concrete:** when [[entities/starcloud]] slipped Starcloud-2 to a 2027 rideshare and raised **$250M specifically to buy launch capacity** — Falcon 9 rideshare slots booked out past late 2028 — it revealed that launch cadence, not payload, is the binding near-term constraint on independent US ODC players. SpaceX is the one bet **insulated** from that wall because it *is* the launch provider its rivals queue behind (the "SpaceX paradox," [[synthesis/orbital-data-center-six-region]] cross-cutting read 4).

Two honest caveats keep the read evidence-led:

1. **A filing is not flown hardware.** As of mid-2026 SpaceX has **no compute node in orbit** under this system — the 1M-satellite number is an FCC *spectrum/orbital* filing (accepted for review, not granted), the paper-runway analogue of Starcloud's ~88k filing, not a deployed constellation. Contrast the US actors that already have GPUs computing in LEO ([[entities/starcloud]], [[entities/axiom-space]]).
2. **The binding constraint is unchanged.** 100 GW of orbital compute implies rejecting ~100 GW of waste heat off finite radiators as σT⁴ — the same ceiling that bounds every entry on [[concepts/orbital-data-center]]. A million-satellite filing does not repeal thermodynamics; it restates the [[synthesis/orbital-data-center-six-region]] heat-rejection question at the largest scale yet proposed.

## Related Concepts

- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
- [[concepts/cots-gpu-radiation-risk]]

## Related Entities

- [[entities/starcloud]], [[entities/axiom-space]], [[entities/google-suncatcher]], [[entities/ada-space]], [[entities/nvidia]]

## Related Synthesis

- [[synthesis/orbital-data-center-six-region]]
- [[synthesis/leo-taiwan-odc-gap]]

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
