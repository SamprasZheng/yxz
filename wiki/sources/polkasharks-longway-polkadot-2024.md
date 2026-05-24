---
type: source
title: "Polkadot — The Next-Generation Blockchain (Long Way on Polkadot)"
author: "polkasharks"
date: "2024-04-07"
ingested: "2026-05-24"
tags: [polkadot, overview, jam, opengov, bridges, roadmap]
url: "https://samprasZheng.github.io/yxz/blog/lop"
---

# Polkadot — The Next-Generation Blockchain (Long Way on Polkadot)

**Author:** [[entities/polkasharks]] | **Date:** 2024-04-07 | **Standalone article** (a Polkadot 2.0 overview / on-ramp piece, distinct from the numbered "Polkadot Decoded" EP1–EP10 series)

## Summary

A wide-angle overview written by [[entities/polkasharks]] introducing Polkadot 2.0's overall thesis: a multi-chain Web3 future ("AWS of Web3") combining [[concepts/xcm]] interoperability, heterogeneous sharding, [[concepts/agile-coretime]], OpenGov, and the upcoming [[concepts/jam]] upgrade. Most concepts are already covered in depth by the EP-series sources — this page records only the **incremental specifics** this article contributes beyond that coverage.

## What's new vs. EP1–EP10

### Consensus mechanism details (BABE + GRANDPA)

This article spells out Polkadot's hybrid consensus in more detail than the EP series:

- **BABE (Blind Assignment for Blockchain Extension):** block-production layer. Validators use a VRF to determine slot eligibility.
- **GRANDPA:** finality gadget — separate from block production.
  - Fast finality: seconds under stable conditions
  - Fault-tolerant up to <1/3 byzantine stake (>2/3 honest stake required)
  - Batch finality: finalizes multiple blocks at once

### Next consensus upgrade: SASSAFRAS / SAFROLE

- The next major upgrade beyond BABE will adopt **SASSAFRAS / SAFROLE**, using **ring VRF** to guarantee **exactly one block producer per slot** (solving BABE's "multiple producers / no producer" slot anomalies).
- Framed as a prerequisite/component of the [[concepts/jam]] transition.

### Bridges (broader coverage than prior sources)

- **Snowbridge:** trustless Polkadot ↔ Ethereum bridge; uses the **BEEFY** protocol to relay Polkadot finality to Ethereum.
- **Hyperbridge:** described as "the world's first verifiable multi-chain bridge."
- **Polkadot–Kusama Bridge:** asset and message transfers between the two networks.

(None of these three bridges had a dedicated page in the wiki at ingest time — see *Follow-ups* below.)

### Polkadot 2.0 framed as three pillars

This article uses a "three pillars" framing distinct from the EP6 Agile-Coretime-only framing:

1. **[[concepts/agile-coretime]]** — no more 2-year DOT lockups; blockspace sold flexibly; **coretime revenue is burned**.
2. **Asynchronous Backing** — shipped (see [[entities/polkadot]] roadmap table).
3. **Elastic Scaling** — flexible/faster/scalable execution; lower dev barrier; community on-chain governance; "true decentralization."

### Economic model — explicit annual issuance

- **120 million DOT minted per year** (at time of writing, pre–[[concepts/dot-hard-cap]] referendum).
- Inflation tapering from **10% → 6% by 2030** (linear-ish decline schedule, pre-hard-cap).
- DOT used to pay for **Coretime** and to participate in OpenGov voting.

> Note: This 120M/yr and 10%→6% glide path predates the March 2026 hard-cap enactment ([[concepts/dot-hard-cap]]) and Berlin 2025 "Second Era" issuance redesign. Treat as 2024-era baseline.

### Technology stack inventory

Compact list of the developer stack — useful as an index for future entity/concept pages:

- **Substrate** — Rust framework for building blockchains
- **Polkadot SDK** — umbrella over Cumulus + Polkadot + Substrate repos
- **SCALE codec** — efficient (de)serialization format
- **Wasm** — runtime execution target (pre-PVM)
- **FRAME** — Substrate runtime development framework

### JAM — additional framing nuances

Mostly already in [[concepts/jam]], but this article adds two specific phrasings worth preserving:

- "JAM introduces a decentralized hybrid system providing smart contract functionality built around the **in-core / on-chain security and scalability duality**."
- "JAM is **inherently permissionless**, allowing anyone to deploy code as a service, pay for the resources that code consumes, and direct its execution by purchasing and allocating coretime."
- States "**First version expected in July 2025**" — superseded by later sources ([[sources/polkadot-roundup-2025]]: testnet Jan 2026, mainnet post-2026). Flagged for contradiction tracking.

> ⚠️ Date drift: "JAM first version July 2025" (this article, 2024-04) vs. JAM testnet January 2026 / mainnet post-2026 ([[sources/polkadot-roundup-2025]]). The 2025 schedule slipped — newer sources should be considered authoritative.

### OpenGov — "world's largest decentralized DAO"

- Framed as making Polkadot "the **world's largest decentralized DAO**."
- Any DOT holder can vote, create proposals, and participate in discussions.
- (No dedicated `concepts/opengov` page exists yet — see *Follow-ups*.)

### Ecosystem datapoints (2024-era)

- **FIFA × Mythical Games** mobile soccer game — expected summer 2025.
- **Pudgy Penguins × Mythical Games** AAA tower-defense strategy game — expected summer 2025.
- **DePIN scale:** **64+ DePIN projects**, **$400–500M** in cumulative fundraising on Polkadot (as of writing).
- **@AcademyPolkadot** launching **PBA-X** online course (Polkadot expert-led) — starting **January 2025**.
- **@OpenZeppelin** published a **Polkadot runtime template** — first major OZ tooling for the Polkadot stack.

### Polkadot 2.0 roadmap for 2025 (as projected in April 2024)

Compact projected roadmap from this article — useful as a 2024 baseline to compare against actual 2025/2026 delivery:

| Item | 2024 projection | Actual status (per later sources) |
|---|---|---|
| Smart contracts (dozens of languages) | "Coming soon" | ✅ Polkadot Hub / Revive shipped 2025 ([[sources/polkadot-roundup-2025]]) |
| PVM (Polkadot Virtual Machine) based on **RISC-V** | "Gradual migration" | ✅ PVM live on Hub |
| Unified address format | Planned | Partial — in progress |
| **XCM v5** | Planned 2025 | Tracked in [[concepts/xcm]] |
| Fast unstaking (28d → 2–4d avg) | Planned | Pending |
| **DOT as universal gas token** (DOT fees on rollups) | Planned | Pending |
| **500 ms block time** | Planned 2025 | 🔜 BASTI 2026 (per [[sources/polkadot-roundup-2025]]) |
| **12 cores per project** via Elastic Scaling | Planned 2025 | Elastic Scaling shipped |

## Cross-references

- Builds on: [[entities/polkadot]], [[concepts/xcm]], [[concepts/agile-coretime]], [[concepts/jam]]
- Companion / deeper dives: [[sources/polkasharks-ep1-polkadot-intro]], [[sources/polkasharks-ep6-agile-coretime]], [[sources/polkasharks-jam-article]], [[sources/polkasharks-ep10-2024-annual]]
- Updated/superseded by: [[sources/gavin-wood-second-era-2025]], [[sources/polkadot-roundup-2025]] (issuance, hard cap, JAM timeline)

## Follow-ups (concept pages not yet created)

The following are mentioned here for the first time in the wiki but do not yet have their own pages — candidates for future ingests:

- `concepts/snowbridge` (Polkadot ↔ Ethereum via BEEFY)
- `concepts/hyperbridge`
- `concepts/babe-grandpa` or split pages
- `concepts/sassafras-safrole` (ring-VRF block production)
- `concepts/opengov`
- `concepts/substrate`, `concepts/polkadot-sdk`, `concepts/scale-codec`, `concepts/frame`
