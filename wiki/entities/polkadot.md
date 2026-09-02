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
- **Decentralization (verified 2026-09-01):** **Nakamoto coefficient = 172** — #1 among major networks per [Chainspect](https://chainspect.app/dashboard/decentralization), far ahead of TON/Avalanche; the metric = the smallest number of independent validators that could collectively halt the chain, so a high value reflects Polkadot's ~500-validator NPoS validator spread. A durable, quantified "the security substrate is genuinely distributed" datapoint underneath the [[concepts/jam]]/[[concepts/dot-hard-cap]] long-horizon security bet ([PolkaWorld](https://twitter.com/polkaworld_org/status/1918271029123928181), CoinDesk corroboration)

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

## Technology roadmap (status verified 2026-09-02)

| Feature | Status |
|---|---|
| Async Backing | ✅ Shipped |
| Agile Coretime | ✅ Shipped |
| Elastic Scaling | ✅ Shipped |
| Polkadot Hub (Revive / PolkaVM) | ✅ Shipped 2025 |
| **Products Devnet** (the "Platform & Product" surface) | ✅ **Launched 2026-08-31** — a feeless developer sandbox for building & hosting decentralised apps as **static web Products**: build a static web app → give it a **`.dot` domain** → publish the bundle → call `@parity/product-sdk` for platform services; Products run in the Polkadot host across the **Asset Hub + People + Bulletin** chains. First dated, shipped instance of [[entities/gavin-wood|Gavin Wood]]'s tech→**Platform-and-Product** pivot, and the delivery rail for [[concepts/proof-of-personhood|PoP]]'s personhood-gated short `.dot` names |
| [[concepts/dot-hard-cap]] (2.1 B), first issuance cut | ✅ **LIVE** — runtime upgrade enacted 2026-03-12, mechanics from 2026-03-14 ("Pi Day"); issuance ~120 M → ~56.88 M DOT/yr, net inflation ~3.1%, circulating ~1.68 B (~80% of cap) — see [[concepts/dot-hard-cap]] for canonical numbers |
| [[concepts/jam]] **open testnet** | ✅ **January 2026** (~43 teams / 15 languages / 10 M DOT prize) |
| [[concepts/jam]] Gray Paper → v1.0 | ⚠️ **still slipped (re-verified 2026-09-02)** — reporting continues to describe JAM as "progressing toward v1.0" (through **v0.8.0**), not ratified (was "targeted before mid-2026"); v1.0 = the audit/mainnet gate *and* the JAM-prize payout gate (prizes paid no earlier than Fellowship ratification of v1.0). The **JAM Mainnet Proposal** stays framed **Q3–Q4 2026** (governance-window, not production date) |
| [[concepts/jam]] M1 (client conformance) | ✅ **first team through the full gate: JAMdotTech passed the Fellowship interview (early Aug 2026)**, beyond the ~15 teams that had merely lodged M1 PRs by Jan 2026 |
| [[concepts/jam]] mainnet | 🔜 **milestone-gated, not calendar-gated** — M1 (conformance) → M4 (full-speed + professional security audit) → OpenGov referendum; core devs estimate ~12–20 months from early 2026, i.e. realistically **late-2026 → 2027**, *not* a clean "2026 launch"; the v1.0 slip pushes this right |
| [[concepts/proof-of-personhood]] (Project Individuality) | 🔜 phased 2026 — DIM1 (unique-human) Q1, DIM2 (verified-individual) Q2, full deployment targeted Q3; **DIM1 (PoI/PoVI) still not shipped as of 2026-09-02 (slip persists)**, but its **funding cleared governance** — Ref. 1783 ($3.01 M → HOLLAR) entered confirmation at ~87.7% Aye / ≈160.88 M DOT; the personhood-gated **`.dot`-name product surface it unlocks is now testable in the Products Devnet** (2026-08-31, above), even though the mainnet personhood check itself has not launched |
| NOMT (~10× TPS boost) | 🔜 2026 |
| 500ms BASTI blocks | 🔜 2026 |
| CoreChain Phase 1 | 🔜 2026 |

## Key ecosystem projects

- **DeFi:** [[concepts/hydration-omnipool]]
- **Gaming:** [[entities/mythical-games]]
- **Coretime market:** [[concepts/regionx]]
- **DePIN:** peaq, covered in [[sources/polkasharks-ep5-peaq-depin]]
- **Japan Web3:** Astar

## Six-region adoption & regulatory map (2026 — 台美日韓中國歐洲)

> **Canonical synthesis:** for the full unifying frame, read [[synthesis/polkadot-2026-jam-tokenomics-six-region]] (scarce token + durable blockspace + verified-human demand, six-region adoption, 100-year fee-funded-security question) and its app-layer companion [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] (interop / DeFi / coretime-market pillars). The table below is the entity-level snapshot; the synthesis pages carry the comparative scorecards and falsifier tables.

Polkadot is a globally-distributed protocol; its development, capital, regulation, and community sit in different places. Snapshot verified 2026-07-13:

| Region | Role in the Polkadot stack | 2026 regulatory / market state | Lead nodes |
|---|---|---|---|
| **Europe** | **Core development & governance home.** Web3 Foundation (Zug, Switzerland); Parity Technologies (Berlin/London). JAM Gray Paper, runtime, and OpenGov tooling originate here. | Swiss FINMA token clarity; EU MiCA fully in force; eIDAS 2.0 EUDI wallets due Dec 2026 (relevant to [[concepts/proof-of-personhood]]) | Web3 Foundation, Parity, [[entities/gavin-wood]] |
| **US** | **Capital-markets gateway, now with a live spot vehicle.** No US-based core dev; the story is institutional access, which crossed a threshold in Q1 2026. | **First US spot DOT ETF is LIVE:** 21Shares **TDOT** listed on **Nasdaq 2026-03-06** (seeded ~$11 M, 0.30% fee, physically-backed under the '33 Act) — the first US spot Polkadot ETF; Grayscale's competing DOT ETF followed via Nasdaq 19b-4. **Aug-2026 update:** 21Shares **rebranded TDOT "Polkadot *Staking* ETF"** (part of a four-product wave with TETH/TSOL/TSUI), staking **40–95% of holdings** with **quarterly** yield pass-through. Objectivity flag (客觀): the staking add-on is not free lunch — one analysis found the fund **realised ≈$4.52 of NAV loss per $1 of staking reward** in its early window ([Protos](https://protos.com/polkadot-etf-realized-4-52-of-loss-per-1-in-staking-rewards/)), a caution that "staking ETF" ≠ costless yield. Net: access shipped and is now *staking-enabled*, but the early staking economics were poor; dev presence still thin. | 21Shares (TDOT/Nasdaq), Grayscale/Nasdaq |
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
- [[concepts/hydration-omnipool]] — largest DeFi protocol on Polkadot
- [[concepts/regionx]] — coretime secondary market

## Canonical synthesis

- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — the 2026 macro frame (tokenomics × JAM × PoP × six regions)
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — the app-layer companion (interop / DeFi / coretime market)
