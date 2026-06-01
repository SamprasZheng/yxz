---
type: entity
tags: [protocol, blockchain, layer0, web3, polkadot, governance, interoperability, coretime, jam, tokenomics]
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
| [[concepts/jam]] **open testnet** | ✅ **January 2026** (~43 teams / 15 languages / 10 M DOT prize) |
| [[concepts/jam]] mainnet | 🔜 2026 target, via OpenGov referendum |
| [[concepts/dot-hard-cap]] (2.1 B), first issuance cut | 🔜 **2026-03-14** (Ref. 1710, "Wish for Change", 81%) |
| [[concepts/proof-of-personhood]] (Project Individuality) | 🔜 DIM1 from Q4 2025; Ref. 1783 $3 M funding |

## Key ecosystem projects

- **DeFi:** [[concepts/hydration-omnipool]]
- **Gaming:** [[entities/mythical-games]]
- **Coretime market:** [[concepts/regionx]]
- **DePIN:** peaq, covered in [[sources/polkasharks-ep5-peaq-depin]]
- **Japan Web3:** Astar

## Six-region adoption & regulatory map (2026 — 台美日韓中國歐洲)

Polkadot is a globally-distributed protocol; its development, capital, regulation, and community sit in different places. Snapshot as of mid-2026:

| Region | Role in the Polkadot stack | 2026 regulatory / market state | Lead nodes |
|---|---|---|---|
| **Europe** | **Core development & governance home.** Web3 Foundation (Zug, Switzerland); Parity Technologies (Berlin/London). JAM Gray Paper, runtime, and OpenGov tooling originate here. | Swiss FINMA token clarity; EU MiCA fully in force; eIDAS 2.0 EUDI wallets due Dec 2026 (relevant to [[concepts/proof-of-personhood]]) | Web3 Foundation, Parity, [[entities/gavin-wood]] |
| **US** | **Capital-markets gateway, regulatory-constrained.** No US-based core dev; main story is institutional access. | **DOT spot-ETF filings pending** — 21Shares (S-1, Jan 2026) + Grayscale via Nasdaq (19b-4); SEC decisions repeatedly extended through 2025–2026; Bloomberg analysts rate odds "pretty good." Net: access improving, dev presence thin. | 21Shares, Grayscale/Nasdaq |
| **Japan** | **Strongest Asian app-chain ecosystem.** [[entities/polkadot]] → **Astar Network** (Sota Watanabe / Startale Labs) is the enterprise/gaming gateway, dual-deployed Polkadot + Ethereum. | Sony Innovation Fund led **$13 M into Startale (Jan 2026)**; Astar fixed-supply 10 B ASTR from March 2026; FSA **"Digital Year-One"** crypto reform | Astar, Startale, Sony Soneium (adjacent) |
| **Korea** | **Retail-liquidity & exchange demand.** Strong retail trading; DOT listed on major won-pairs. | Bank-linked real-name exchange rules; tightening institutional framework 2025–2026 | Upbit/Bithumb listings |
| **China** | **Developer & education base under a trading ban.** Crypto trading banned (2021) but Mandarin dev/education community remains substantial. | Trading prohibited; mainland real-name-ID regime hostile to permissionless PoP; activity routes via HK | [[entities/polkaworld]] (co-hosted Gavin's China JAM tour, 874 attendees) |
| **Taiwan** | **Education & civic-tech affinity hub.** Owner's home base; dense ambassador/education layer; cultural fit with consent-based identity via [[concepts/plurality]]. | FSC VASP registration regime maturing 2025–2026; planned national eID | [[entities/polkasharks]], [[entities/sampras]], [[entities/audrey-tang]] |

**Pattern:** development and governance gravity in **Europe**; capital-access gravity in the **US** (ETF-led); the deepest *applied* ecosystem in **Japan** (Astar + Sony-adjacent); retail liquidity in **Korea**; a large but trading-banned dev/education base in **China**; and an education/civic-tech affinity layer in **Taiwan**. The 2026 tokenomics wave (DOT 2.1 B cap + Astar 10 B cap, same quarter — see [[concepts/dot-hard-cap]]) is explicitly an *institutional-readiness* move aimed at the US-ETF and Japan-FSA audiences.

## Information and education network

The wiki's Polkadot graph has three knowledge channels:

- **Chinese/Taiwanese education:** [[entities/polkasharks]], [[entities/polkaworld]], [[entities/insight-caijing]]
- **English ecosystem briefings:** [[entities/dotleap-gbaci]], [[entities/bill-laboon]]
- **Technical protocol education:** [[entities/shawn-tabrizi]], [[entities/gavin-wood]], [[entities/alice-und-bob]]

[[entities/ycc-duo-nine]] is retained as a weak-signal retail sentiment node rather than a deep ecosystem source.

## Source clusters

- Polkasharks series: [[sources/polkasharks-ep1-polkadot-intro]], [[sources/polkasharks-ep3-hydration]], [[sources/polkasharks-ep4-mythical-games]], [[sources/polkasharks-ep5-peaq-depin]], [[sources/polkasharks-ep6-agile-coretime]], [[sources/polkasharks-ep7-regionx]], [[sources/polkasharks-ep10-2024-annual]], [[sources/polkasharks-jam-article]], [[sources/polkasharks-longway-polkadot-2024]]
- Roadmap / governance sources: [[sources/gavin-wood-second-era-2025]], [[sources/polkadot-roundup-2025]], [[sources/plurality-audrey-tang-sampras-2025]]

## Related concepts

- [[concepts/jam]]
- [[concepts/agile-coretime]]
- [[concepts/xcm]]
- [[concepts/dot-hard-cap]]
- [[concepts/proof-of-personhood]]
