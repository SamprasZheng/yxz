---
type: entity
tags: [protocol, blockchain, layer0, web3]
---

# Polkadot

Layer-0 blockchain protocol enabling interoperability between heterogeneous blockchains via a relay chain + parachain architecture. Native token: DOT.

## Key facts

- **Created by:** Gavin Wood (Ethereum co-founder, Yellow Paper author) — [[sources/polkasharks-ep1-polkadot-intro]]
- **Architecture:** Central relay chain provides shared security and consensus; parachains are independent blockchains optimized for specific use cases
- **Token:** DOT — used for governance, staking, and coretime purchase
- **Governance:** OpenGov — DOT holders initiate and vote on referenda directly on-chain
- **Interop protocol:** [[concepts/xcm]] (Cross-Consensus Messaging)

## 2024 milestones (per [[sources/polkasharks-ep10-2024-annual]])

- 500 active validators (highest decentralization milestone)
- 52.5%+ DOT staked (~$8B USD total)
- Inflation model changed: exponential → linear (8% year-one)
- 143,000+ TPS achieved in "Spammening" stress test
- [[concepts/agile-coretime]] deployed — replaces parachain slot auctions
- [[entities/mythical-games]] migrated from Ethereum to Polkadot
- 950+ governance referenda; treasury spending +3.2× vs. 2023
- Supply hard cap: 2.1 billion DOT (March 2026)

## 2025 milestones (per [[sources/polkadot-roundup-2025]])

- **Polkadot Hub migration**: 1.6B DOT across 1.53M accounts in ~8 hours → 100× lower fees, 2-second blocks
- **Elastic Scaling**: Parachains dynamically utilize more coretime for burst demand
- **P95 latency**: 28 ms; in-block confidence 99.8%
- **Multi-Chain Rally (early 2026)**: 100,000+ TPS without raising user fees
- **Second Era** announced (Berlin Web3 Summit, July 2025): [[concepts/dot-hard-cap]], [[concepts/proof-of-personhood]], pUSD stablecoin, validator reward halving

## Technology roadmap

| Feature | Status (updated 2026) |
|---|---|
| Async Backing | ✅ Shipped |
| Agile Coretime | ✅ Shipped |
| Elastic Scaling | ✅ Shipped |
| Polkadot Hub (Revive / PolkaVM) | ✅ Shipped 2025 |
| DOT Hard Cap (2.1B) | ✅ March 2026 |
| NOMT (~10× TPS boost) | 🔜 2026 |
| 500ms BASTI blocks | 🔜 2026 |
| CoreChain Phase 1 | 🔜 2026 |
| [[concepts/jam]] mainnet | 🔜 Post-2026 |

## Key ecosystem projects

- **DeFi:** [[concepts/hydration-omnipool]]
- **Gaming:** [[entities/mythical-games]]
- **Coretime market:** [[concepts/regionx]]
- **DePIN:** peaq
- **Japan Web3:** Astar

## Related concepts

- [[concepts/jam]]
- [[concepts/agile-coretime]]
- [[concepts/xcm]]
