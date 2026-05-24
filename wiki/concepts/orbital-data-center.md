---
type: concept
tags: [leo, space, data-center, ai, edge-computing, energy, hybrid-cloud, defense]
---

# Orbital Data Center (ODC)

## Definition

An infrastructure model that deploys cloud computing, AI inference, or training compute to Low Earth Orbit (LEO) satellites. Core value proposition: compute nodes in orbit that are independent of ground infrastructure, leveraging free solar energy and radiative cooling outside Earth's atmosphere.

## Core Energy Advantages

| Advantage | Description |
|------|------|
| 24/7 solar power | No clouds, rain, or weather interference in orbit; solar power generation efficiency far exceeds ground installations |
| Radiative cooling | Dissipates heat directly to the cosmic microwave background; no traditional compressor-based cooling system required |
| Energy cost structure | Jeff Bezos's assessment: within decades, ODC construction costs will be lower than ground data centers |

Ground data center power consumption: 415 TWh in 2024, projected to exceed 650 TWh in 2026 → ODC provides a long-term alternative path.

## Three Core Elements

1. **Compute**: Commercial GPUs (e.g., NVIDIA H100) require radiation protection or space-hardened components; the tradeoff between commercial off-the-shelf (COTS) and space-hardened is the biggest engineering challenge. The primary radiation threat to COTS GPUs is [[concepts/see-single-event-effects]] (SEU flipping SRAM cache + SEL latchup burnout), requiring passage through the [[concepts/rha-radiation-hardening]] qualification process (RDM ≥ 1.5).
2. **Telecommunications**: Connects ground and other nodes via optical links (e.g., Kepler Communications optical relay network); ISL optical communications determines inter-node latency.
3. **Storage**: Low-latency on-orbit cache + bulk downlink to ground; hybrid space-ground DC architecture (see below) is the most commercially viable landing point.

## Key Milestones

| Date | Event |
|------|------|
| 2025-11 | [[entities/starcloud]] Starcloud-1 launched, carrying NVIDIA H100, first LLM training in space |
| 2026-01-11 | Axiom Space launches ODC Node 1 & 2, leveraging Kepler Communications optical relay network |
| 2026 GTC | Jensen Huang declares: "Space computing, the ultimate frontier, has arrived" |
| TBD | [[entities/google-suncatcher]]: Google plans to deploy TPUs to orbit, connected via optical communications |

## Application Scenarios

| Scenario | Description |
|------|------|
| Earth observation AI | Real-time on-orbit processing of satellite imagery (wildfire detection, agricultural monitoring, vessel identification), resolving the contradiction between large data volumes and bandwidth bottlenecks |
| LLM training | Executing large model training using cheap solar power compute |
| Edge cloud | Earth-independent backup cloud node |
| Defense / sovereign cloud | Geographically independent, difficult to destroy, global coverage; one of the earliest paying use cases |
| Hybrid space-ground DC | ODC performs inference/edge tasks + ground DC performs training/storage, integrated via high-speed downlink |

## Hybrid Space-Ground DC Architecture

The most realistic first commercial landing point for ODC. Model:
- **Space side**: ODC nodes perform inference, real-time edge computing, data preprocessing
- **Ground side**: Ground data centers perform training, storage-intensive tasks
- **Connection layer**: High-speed optical downlink + gateway stations

This architecture allows enterprises to incrementally adopt ODC without fully migrating from ground infrastructure, serving as the key bridging solution for commercial adoption.

## Major Players

| Player | Positioning |
|------|------|
| [[entities/starcloud]] | First mover in commercial GPU (H100) on-orbit validation |
| Axiom Space | ODC Node 1&2 (2026-01), Kepler optical relay |
| [[entities/ada-space]] | China's strategic scaling with 2800-satellite constellation |
| [[entities/google-suncatcher]] | Tech giant entry, TPU + optical communications |

## Supply Chain Position

See mid-stream Segment C in [[concepts/leo-value-chain]]. Taiwan is currently almost absent from this segment, representing a structural gap.

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
