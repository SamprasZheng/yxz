---
sidebar_position: 4
title: "3️⃣ Next-Gen Architecture — JAM"
---

# 3️⃣ Next-Gen Architecture — JAM

**→ Read the full post: [JAM — The Scalable Trustless Virtual Machine](/blog/JAMintro)**

## Key Takeaways

1. **JAM (Join-Accumulate Machine)** is Polkadot's next-generation Relay Chain design, replacing the current Relay Chain.
2. Combines Ethereum's smart-contract generality with Polkadot's **heterogeneous sharding** scalability.
3. Target throughput: **850 MB/s** (theoretical > 3.4 million TPS) — far exceeding Ethereum 2.0 (1.3 MB/s) and Sui/Aptos (100 MB/s).
4. **Async interaction model:** messages and tokens complete within the same 6-second execution epoch, but without an instant return path — a deliberate design trade-off for performance.

## Key Technical Points

- **Join and Accumulate execute on-chain**; **Collect and Refine complete off-chain** → reduces on-chain compute load
- Uses **Coretime** as a gas-like compute resource unit
- Plans **350 JAM cores** × 6-second execution per core × 5 MB input per core

## What to Read Next

Pull back for the integration view:

- [2026 Tech Roadmap](/blog/space-ai-rf-crypto-roadmap-2026) — Polkadot's position across AI × Space × RF × Crypto

Or revisit the governance philosophy:

- [Plurality × OpenGov](/blog/Plurality)
