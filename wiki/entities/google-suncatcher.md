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
| Computing core | Google in-house **Trillium-generation TPU**; survived particle-accelerator radiation testing simulating LEO levels without damage to the logic |
| Architecture | Pre-print sketches an **81-satellite cluster** flying in formation within a **~1 km radius**, with free-space optical inter-satellite links |
| Orbit | **Sun-synchronous orbit ≈650 km** — chosen for near-constant solar exposure (Google estimates panels up to **~8× more productive** than on Earth) |
| Computing mode | Orbital ML compute scaled by formation flight + optical mesh, integrated with Google's ground infrastructure |
| Timeline | 2 prototype satellites via Planet, **launch early 2027**; cluster scale and final design explicitly flagged as subject to change |
| Strategic intent | Leverage cheap, abundant solar power to scale AI compute beyond terrestrial grid/cooling limits |

## Radiation Result — The Memory, Not the Logic, Is the Weak Point

The widely-quoted "Trillium TPU survived LEO-simulated radiation" headline has an important layer-down qualifier, now with **quantified beam figures** from Google's pre-print (verified 2026-07): the chips were exposed to a **67 MeV proton beam**, and Google reports **no TID-attributable hard failures up to the maximum tested 15 krad(Si) on a single chip** — so the TPU **logic** is "surprisingly radiation-hard." The catch is the memory: the **High-Bandwidth Memory (HBM) subsystem was the most TID-sensitive part**, showing first irregularities at only **~2 krad(Si)** — yet even that is **~3× the expected shielded 5-year mission dose of 750 rad(Si)**, a rate Google judged "**likely acceptable for inference**" (but, by implication, *not* obviously acceptable for long-duration training). Source: [Google Research, "Exploring a space-based, scalable AI infrastructure system design" (2025-11)](https://research.google/blog/exploring-a-space-based-scalable-ai-infrastructure-system-design/). This is the same failure mode the radiation cluster already flags — [[concepts/cots-gpu-radiation-risk]] notes that GPU/TPU ECC covers HBM but offers no TID protection. It reinforces the cluster's central caveat (carried on [[synthesis/orbital-data-center-six-region]]): an accelerator surviving an *accelerator beam test for hours* is not the same as a *memory stack surviving years* of cumulative dose, and it nudges Suncatcher toward an inference-tier role rather than orbital training.

## Strategic Significance

Google Suncatcher is the clearest signal that **hyperscalers**, not just startups, are entering [[concepts/orbital-data-center]]. Where [[entities/starcloud]] proved a COTS NVIDIA H100 works in orbit and [[entities/axiom-space]] proved the relay-networked edge node, Suncatcher diversifies the compute layer onto **proprietary TPUs** and bets on **formation flight + free-space optics** rather than a single large platform — making optical ISL ([[concepts/leo-value-chain]] midstream A) the load-bearing technology. The two Planet-built prototype satellites remain on track for an **early-2027** launch to test TPU performance and high-bandwidth ISL. In the six-region map ([[synthesis/orbital-data-center-six-region]]) it is the US hyperscaler entry, contrasting with China's state-scaled [[entities/ada-space]] and Europe's study-stage ASCEND.

## Related Concepts

- [[concepts/orbital-data-center]] — Overall ODC framework
- [[concepts/leo-value-chain]] — Midstream C position
- [[concepts/cots-gpu-radiation-risk]] — TPU/HBM radiation survival context
- [[concepts/see-single-event-effects]] — single-event side of the radiation gate

## Related Entities

- [[entities/starcloud]], [[entities/axiom-space]], [[entities/ada-space]], [[entities/nvidia]]

## Related Synthesis

- [[synthesis/orbital-data-center-six-region]] — six-region ODC map

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
