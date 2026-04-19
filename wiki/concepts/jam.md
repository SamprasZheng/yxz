---
type: concept
tags: [polkadot, infrastructure, scalability, risc-v, upgrade]
---

# JAM (Join-Accumulate Machine)

Polkadot's proposed replacement for the current Relay Chain — a more modular, asynchronous, high-throughput execution environment. The name comes from its two on-chain operations: **Join** (collect work results) and **Accumulate** (integrate them into state).

## What it does

JAM replaces the Relay Chain with a generalized, permissionless computation layer. Rather than being parachain-specific, JAM can host any stateful service that needs trustless execution and ordering.

## Key technical specs

| Property | Value |
|---|---|
| Target throughput | 850 MB/s |
| Projected TPS | ~3.4 million |
| VM architecture | RISC-V (replaces WebAssembly) |
| Execution model | Asynchronous |
| Developer API | 3 functions: `Refine`, `Accumulate`, `onTransfer` |

- **Refine** and collection/aggregation run **off-chain**
- **Accumulate** (state changes) run **on-chain**
- This split dramatically reduces on-chain compute burden

## Economic model

Developers purchase "core time" in DOT to run services — analogous to gas fees but purchased in bulk or on demand via [[concepts/agile-coretime]].

## Developer impact

- Eliminates parachain slot auction competition
- Any team can deploy; only three entry functions required
- Combines Ethereum smart-contract expressiveness with Polkadot-scale throughput

## Status

- Gray paper published: Q2 2024
- Community approval: May 2024 (31M+ DOT in support)
- Development timeline: ~2 years to full deployment (mainnet target ~2026)

## Sources

- [[sources/polkasharks-jam-article]] — most detailed PolkaSharks coverage
- [[sources/polkasharks-ep1-polkadot-intro]] — first mention
- [[sources/polkasharks-ep10-2024-annual]] — deployment context

## Related concepts

- [[concepts/agile-coretime]] — resource purchasing model JAM builds on
- [[entities/polkadot]]
