---
sidebar_position: 4
title: 3️⃣ Next-Generation Architecture — JAM
---

# 3️⃣ Next-Generation Architecture — JAM

**→ Read the main article: [JAM — A Scalable Trustless Virtual Machine](/blog/JAMintro)**

## Key Takeaways

1. **JAM (Join-Accumulate Machine)** is Polkadot's next-generation Relay Chain design, replacing the current Relay Chain.
2. It combines the smart contract generality of Ethereum with the **heterogeneous sharding** scalability of Polkadot.
3. Target throughput is **850 MB/s** (theoretical > 3.4 million TPS), far exceeding Ethereum 2.0 (1.3 MB/s) and Sui/Aptos (100 MB/s).
4. **Asynchronous interaction model**: messages and tokens complete send/receive within the same 6-second execution cycle, but there is no immediate return path — this is a deliberate design trade-off for performance.

## Key Technical Points

- **Join and Accumulate execute on-chain**; **Collect and Refine execute off-chain** → reduces on-chain computation load
- Uses **Coretime** as a compute resource metric analogous to Gas
- Plans for **350 JAM cores** × 6-second execution per core × 5 MB input per core

## What to Read Next

Zoom out to the integrative article:

- [2026 Tech Roadmap](/blog/space-ai-rf-crypto-roadmap-2026) — Polkadot's position across the AI × Space × RF fronts

Or revisit governance philosophy:

- [Plurality × OpenGov](/blog/Plurality)
