---
type: source
title: "JAM - 可擴展無需信任虛擬機"
author: "波卡鯊 Polkasharks"
date: "2025-02-24"
ingested: "2026-04-19"
tags: [polkadot, jam, risc-v, scalability, pvm]
url: "https://vocus.cc/article/67bb4ddafd8978000132b720"
---

# JAM - 可擴展無需信任虛擬機

**Author:** [[entities/polkasharks]] | **Date:** 2025-02-24

## Summary

Deep-dive into JAM (Join-Accumulate Machine), Polkadot's proposed relay chain replacement. Most technically detailed PolkaSharks article on JAM. Covers architecture, economic model, and developer impact.

## Key claims

- JAM replaces the current Relay Chain with a more modular, streamlined architecture
- Combines Ethereum smart contract capabilities with Polkadot scalability
- Developers pay for "core time" based on resource consumption (analogous to gas fees)
- Architecture is **asynchronous** (not synchronous) — key design departure
- Target throughput: **850 MB/s** via multi-core computing → potentially **3.4 million TPS**
- Transitions from WebAssembly to **RISC-V** processor architecture for improved computational efficiency
- "Join-Accumulate" mechanism: certain functions execute on-chain; collection and refinement run off-chain
- Agile Coretime model: flexible monthly bulk purchases + secondary market trading using DOT
- Development timeline: ~2 years from approval to full deployment
- Community approved in May 2024: 31M+ DOT in support
- Eliminates parachain slot auction competition
- Developer API simplified to 3 entry functions: `Refine`, `Accumulate`, `onTransfer`

## Cross-references

- Concept page: [[concepts/jam]]
- Economic model: [[concepts/agile-coretime]]
- Context: [[sources/polkasharks-ep1-polkadot-intro]] (first mention), [[sources/polkasharks-ep10-2024-annual]] (deployment timeline)
