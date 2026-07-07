---
type: entity
tags: [msbai, sda, jepa, marl, defense-ai, orbitguard, sbir, startup, space-domain-awareness]
---

# MSBAI (Microsurgeonbot Inc.)

**Type:** Defense AI startup (small business contractor)
**Founded:** 2017
**Headquarters:** Los Angeles, CA
**CEO/Founder:** Allan Grosvenor
**Accelerator:** Air Force Techstars '20

MSBAI builds the GURU hybrid-intelligence platform for high-stakes engineering and operations in defense and industrial sectors. Its primary SDA product is [[entities/msbai#OrbitGuard|OrbitGuard]].

## OrbitGuard

OrbitGuard is a hybrid-intelligence copilot for space domain awareness that combines three AI paradigms:

1. **Symbolic rules** — deterministic constraint checks for guaranteed precision
2. **JEPA-based world models** — learned predictive models of orbital state evolution using Joint Embedding Predictive Architecture
3. **Multi-Agent Reinforcement Learning (MARL)** — adaptive threat assessment and planning agents

It ingests infrared, CelesTrak, and electro-optical data feeds. Integration with the DoD Unified Data Library (UDL) and compliance with NIST SP 800-53 for ATO support are built into the product roadmap.

Allan Grosvenor, in the September 2025 press release, described OrbitGuard as:

> "Not 'just generative AI.' It's a hybrid-intelligence copilot" combining "symbolic rules for guaranteed precision, JEPA-based world models for predictive understanding, and multi-agent reinforcement learning for adaptive planning."

## DoD contract (2025)

MSBAI received a $1.2 million Direct-to-Phase II SBIR award from the DoD CDAO (competitively selected by the Office of the Secretary of Defense; Air Force Digital Transformation Office executing). The 18-month contract targets scaling OrbitGuard to monitor 20,000+ resident space objects at ≤2-minute latency. It builds on a prior Space Force contract (**FA864923P1191**, AFRL/RVSX "DRAGON Army"). See [[sources/msbai-orbitguard-dod-contract-2025]] for full details.

**Live-demo milestone (verified 2026-07-07):** OrbitGuard demonstrated at the **SDA TAP Lab Apollo Project Demo Day** (Space Systems Command, Colorado Springs, **2025-08-13**), showing autonomous integration with **KeepTrack** for orbital tracking/analysis/visualization — the first public evidence of the JEPA+MARL stack running against a live tasking loop. The SDA TAP Lab pathway ties MSBAI into the government-anchored commercial market mapped in [[synthesis/commercial-space-traffic-management-six-region]].

## Relationship to Lockheed Martin

No public affiliation with Lockheed Martin or other defense primes has been confirmed. MSBAI is an independent small-business contractor. The owner's briefing linking MSBAI and Lockheed Martin as a single "consortium" is ⚠️ **Unconfirmed** — no press release, contract announcement, or trade publication has documented a joint Lockheed-MSBAI program.

## Performance claims

Lab-validated accuracy: 94–98% across ~15,000 on-orbit objects (self-reported, non-peer-reviewed). Training dataset: 800+ real labeled maneuver events from UDL + ~200,000 GMAT-simulated maneuvers. See [[sources/msbai-orbitguard-dod-contract-2025]] for the falsifiability notes on these numbers.

## AMOS 2025

MSBAI presented the poster "Hierarchical Neuro-Symbolic AI for Autonomous Spacecraft Maneuvering and Anomaly Detection" at the 2025 AMOS Technical Conference.

## Related pages

- [[sources/msbai-orbitguard-dod-contract-2025]] — primary source
- [[concepts/jepa-sda-multi-agent-rl]] — technical deep-dive on JEPA + MARL architecture
- [[entities/lockheed-martin-space]] — defense prime context; note: no confirmed partnership with MSBAI
- [[synthesis/techno-industrial-state-defense-tech-six-region]] — MSBAI as the SDA-vertical instance of the US "commercial public-private fusion" defense-tech model; [[entities/palantir]] MSS is the horizontal C2/intel layer above it
