---
type: entity
tags: [leo, space, data-center, ai, google, tpu, optical-comms]
---

# Google Suncatcher

## Basic Information

Google (Alphabet) **Project Suncatcher** — a research "moonshot" to scale machine-learning compute in space using fleets of solar-powered satellites carrying **TPUs** linked by **free-space optics**. Formally announced **2025-11-04** with a published system-design pre-print and a Google Research blog post; partner **Planet** will build and operate two prototype satellites for an **early-2027** launch.

> Status update (2026-06-03): the earlier "limited publicly disclosed detail" caveat is now superseded — Google has published a technical pre-print and confirmed a Planet-built prototype mission. SatNews (2026-01) additionally reports Google has begun addressing orbital-debris risk for the constellation.

## Core Characteristics

| Element | Description |
|------|------|
| Computing core | Google in-house **Trillium-generation TPU**; survived particle-accelerator radiation testing simulating LEO levels without damage |
| Architecture | Pre-print sketches an **81-satellite cluster** flying in formation within a **~1 km radius**, with free-space optical inter-satellite links |
| Orbit | **Sun-synchronous orbit ≈650 km** — chosen for near-constant solar exposure (Google estimates panels up to **~8× more productive** than on Earth) |
| Computing mode | Orbital ML compute scaled by formation flight + optical mesh, integrated with Google's ground infrastructure |
| Timeline | 2 prototype satellites via Planet, **launch early 2027**; cluster scale and final design explicitly flagged as subject to change |
| Strategic intent | Leverage cheap, abundant solar power to scale AI compute beyond terrestrial grid/cooling limits |

## Strategic Significance

Google Suncatcher is an important signal that major tech companies are entering the [[concepts/orbital-data-center]] market. Previously the ODC market was dominated by startups like Starcloud and Axiom; Google entering with proprietary TPUs indicates:

1. ODC computing hardware competition has moved beyond "NVIDIA H100 as the only option" toward diversification
2. Optical communications as a critical transmission layer for ODC has been validated by a major tech company
3. Potential for integration with Google Cloud ground services (air-ground hybrid cloud)

## Strategic Significance

Google Suncatcher is the clearest signal that **hyperscalers**, not just startups, are entering [[concepts/orbital-data-center]]. Where [[entities/starcloud]] proved a COTS NVIDIA H100 works in orbit, Suncatcher diversifies the compute layer onto **proprietary TPUs** and bets on **formation flight + free-space optics** rather than a single large platform — making optical ISL ([[concepts/leo-value-chain]] midstream A) the load-bearing technology. Its Trillium radiation-survival result is a data point alongside [[concepts/cots-gpu-radiation-risk]]. In the six-region map ([[synthesis/orbital-data-center-six-region]]) it is the US hyperscaler entry, contrasting with China's state-scaled [[entities/ada-space]] and Europe's study-stage ASCEND.

## Related Concepts

- [[concepts/orbital-data-center]] — Overall ODC framework
- [[concepts/leo-value-chain]] — Midstream C position
- [[concepts/cots-gpu-radiation-risk]] — TPU radiation survival context
- [[synthesis/orbital-data-center-six-region]] — six-region ODC map

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
