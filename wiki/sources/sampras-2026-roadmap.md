---
type: source
title: "2026 Tech Roadmap: AI in Space, Crypto Infrastructure, RF SATCOM, and Radiation Validation"
author: sampras
date: 2026-03-22
ingested: 2026-05-24
tags: [ai, space, rf, crypto, polkadot]
---

# Sampras — 2026 Engineering Roadmap

Personal blog post (2026-03-22) capturing the author's current cross-domain engineering thesis. The post does not introduce new external facts; instead it is a positioning statement that ties together five domains the author intends to track and ship work in throughout 2026.

## Author's framing

> "In 2026, AI deployment is moving from model demos to system-level execution. The next frontier is not only better models, but where compute runs, how data moves, and how hardware survives harsh environments."

The thesis is explicitly **systems-level integration**, not isolated chip or model metrics.

## Five tracked signals

### 1. Polkadot as scalable on-chain infrastructure

Author flags [[concepts/agile-coretime]] and elastic scaling as relevant to bursty production workloads. Implicit alignment with [[concepts/jam]] as the underlying execution layer (RISC-V, ~3.4M TPS target). Links to Polkadot Wiki "Elastic Scaling" and "Obtain Coretime" docs.

### 2. Space data center / orbital compute

Author treats off-Earth compute as a unified architecture problem (power + cooling + comms + fault tolerance), matching the framing in [[concepts/orbital-data-center]]. References ESA ASCEND ("Advanced Space Cloud for European Net zero emission and Data sovereignty") as a non-US signal that ODC has crossed into government-funded sovereignty territory — a data point complementary to the existing Starcloud / Axiom / [[entities/google-suncatcher]] / [[entities/ada-space]] coverage.

### 3. AI hardware scaling and system-level integration

NVIDIA Blackwell cited as evidence that "tightly integrated compute + networking + memory" is the dominant trend — not isolated chip benchmarks. Reinforces the rationale behind [[concepts/orbital-data-center]] needing space-grade integrated modules rather than just GPUs.

### 4. Crypto + satellite communications as resilient infrastructure

Author calls out the intersection of crypto settlement with non-terrestrial links, citing Blockstream Satellite. Connects to [[concepts/agentic-payments]] and [[concepts/x402-protocol]] — settlement layers that can run independent of any single ground jurisdiction become natural counterparts to ODC and LEO communications.

### 5. Radiation verification for commercial silicon

Author asserts COTS in space "will succeed only with rigorous validation, especially radiation-related risk control" — matching the existing thesis in [[concepts/rha-radiation-hardening]], [[concepts/cots-gpu-radiation-risk]], and [[concepts/taiwan-radiation-test-ecosystem]]. Cites NASA NTRS work on adaptive and phased array antennas, linking back to [[concepts/aesa]] and [[concepts/hybrid-phased-array]] as the RF foundation.

## Author's engineering hypothesis (verbatim points)

- AI will increasingly require distributed compute beyond terrestrial data centers.
- Space compute amplifies demand for secure coordination and settlement layers, where crypto-native primitives may become practical infrastructure.
- RF phased arrays are foundational, not optional, for reliable high-throughput links.
- Commercial silicon in space succeeds only with rigorous validation, particularly radiation risk control.

## What the author commits to publishing

- Weekly macro + crypto + US equities outlook
- Daily/continuous living trackers for AI, space, RF, Polkadot, and investing
- Implementation notes from validation engineering and automation workflows

## Why this post matters

The post itself does not add new external facts to the wiki — every claim it references is already covered in greater technical depth elsewhere. Its value is as a **positioning document**: it formalizes the cross-domain thesis (AI × Space × Crypto × RF × Radiation) that the rest of the author's ingested sources implicitly support. See [[synthesis/sampras-2026-engineering-thesis]] for the consolidated cross-domain reading.

## Related pages

- [[synthesis/sampras-2026-engineering-thesis]]
- [[synthesis/leo-taiwan-odc-gap]]
- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
- [[concepts/jam]]
- [[concepts/agile-coretime]]
- [[concepts/x402-protocol]]
- [[concepts/agentic-payments]]
- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[concepts/rha-radiation-hardening]]
- [[concepts/cots-gpu-radiation-risk]]
- [[concepts/taiwan-radiation-test-ecosystem]]
