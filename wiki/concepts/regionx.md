---
type: concept
tags: [polkadot, coretime, marketplace, infrastructure, polkadot2, parachain, compute-market]
---

# RegionX

The secondary market and tooling layer for Polkadot and Kusama **coretime** — a marketplace where teams buy, split, sell, and manage units of computational block-space ("regions"). RegionX is the piece that turns [[concepts/agile-coretime]] from a *primary-sale mechanism* into a **liquid, tradeable compute market**.

## Layer up — why a coretime market matters

Polkadot 2.0's core thesis is "blockspace as a cloud commodity." A commodity needs a *market*, not just a primary auction — you cannot have a cloud without a spot/resale layer where unused capacity reprices and reallocates. RegionX is that layer. Without it, a team that over-buys bulk coretime is stuck (capital trapped); with it, regions trade like AWS Reserved-Instance resale or airline-seat secondary markets. This is the mechanism that makes the [[synthesis/polkadot-2026-jam-tokenomics-six-region|"abundant durable blockspace" pillar]] economically real rather than theoretical: a liquid resale market is what lets price discover demand, and coretime revenue is **burned**, tying the market back to [[concepts/dot-hard-cap|DOT scarcity]].

## What is a region?

A "region" is a unit of purchased bulk coretime — a time-slice of block-space on Polkadot's execution cores. Regions have a lifecycle (start → end) and **depreciate** as they are consumed. Regions are themselves transferable on-chain assets (NFT-like), which is what makes a secondary market possible.

## Primary market (context)

Before resale, teams obtain coretime through Polkadot's primary market:
1. **On-demand** — immediate, per-block (spot)
2. **Bulk** — 28-day advance purchase (reserved)

RegionX handles what happens *after* bulk purchase — the resale, splitting, and renewal-management layer.

## Secondary market mechanics

**Direct access:**
- Priced by region lifecycle; active regions carry dynamic pricing reflecting time-value depreciation.

**Orders (crowdloan-style):**
- Users contribute DOT (not staked — contributed); parachains can offer incentive rewards for filling orders. Similar to the old crowdloan model but for *compute* rather than slot leases.

## Status (verified, dated)

- **Agile Coretime, Asynchronous Backing, and Elastic Scaling are live on Polkadot mainnet** as of the **SDK 2509 release (October 2025)** — the slot-auction model is fully retired. Agile Coretime first went live on Kusama (2024) and reached Polkadot mainnet through 2024→2025. ([Polkadot dev docs — obtain coretime](https://docs.polkadot.com/parachains/launch-a-parachain/obtain-coretime/), [Polkadot Wiki — Agile Coretime](https://wiki.polkadot.com/learn/learn-agile-coretime/))
- **RegionX implemented a trustless secondary coretime marketplace, live on Kusama**, and **RegionX Hub** is the primary application for interacting with Agile Coretime (overview / deploy-new-project / manage-renewals dashboards). Funded via OpenGov (Referenda **#582**, **#2228**, final retroactive request **#1788**). ([RegionX-Labs GitHub](https://github.com/RegionX-Labs/RegionX), [Polkadot Wiki — coretime marketplaces](https://wiki.polkadot.com/learn/learn-guides-coretime-marketplaces/), [Ref #1788](https://polkadot.subsquare.io/referenda/1788))

## Comparative frame — blockspace markets across ecosystems

Coretime is one answer to "how do you price and allocate block-space?" The cross-ecosystem comparison is the meaningful horizontal axis here (a strict 台美日韓中國歐洲 split is **N/A** — these are protocol-design choices, not national markets; the *governance* gravity behind each is noted instead):

| Mechanism | Model | Resale market | Ecosystem (governance gravity) |
|---|---|---|---|
| **Polkadot coretime + RegionX** | reserved (bulk) + spot (on-demand) cores; **revenue burned** | **yes — RegionX secondary market** | Polkadot (**Europe** — Web3F/Parity) |
| Ethereum blobspace (EIP-4844) | per-block blob fee market (EIP-1559 style) | no persistent resale; per-block auction | Ethereum (US/global) |
| Celestia blobspace | pay-per-byte DA fee market | no | Celestia (US) |
| Solana | per-block priority fees + local fee markets | no | Solana (US) |
| AWS Reserved Instances | reserved + on-demand + **resale marketplace** | **yes** (the Web2 analogue RegionX consciously mirrors) | hyperscaler (US) |

**Read:** Polkadot is alone among major chains in offering a *persistent, transferable, resaleable* unit of block-space — closer to a cloud-capacity market than to a per-block gas auction. That is the differentiator RegionX exists to operationalise. As with [[concepts/xcm]], the standard-setting gravity is **Europe (Polkadot) vs US (everyone else)**, with Asia a consumer — the recurring *upstream-strong/midstream-absent* pattern of [[synthesis/leo-taiwan-odc-gap]].

## Long-horizon (scenario, not fact)

- **Lineage:** compute markets recapitulate the history of *other* commodity markets — physical spot → forward/reserved contracts → liquid secondary/derivatives. Cloud computing did this in Web2 (on-demand → reserved → RI marketplace → spot). RegionX is Polkadot doing the same for blockspace ~15 years later.
- **~2030s:** if [[concepts/jam]] delivers, coretime becomes the *native unit* of a multi-core "Polkadot cloud"; a mature RegionX-style market could support coretime *derivatives* (futures/options on future block-space) — the financialisation of compute.
- **~2100 structural view:** the durable question is whether *trustless, burned-revenue* blockspace markets out-compete *trusted hyperscaler* compute markets on the workloads that actually need decentralisation — the same "trust-minimised vs convenient" fork as [[concepts/xcm]] and [[synthesis/agentic-payments-six-region]]. If blockspace demand never thickens, the coretime burn stays below issuance and the [[synthesis/polkadot-2026-jam-tokenomics-six-region|fee-funded-security question]] bites — RegionX's liquidity is the early signal to watch.

## Sources

- [[sources/polkasharks-ep6-agile-coretime]] — primary-market context
- [[sources/polkasharks-ep7-regionx]] — dedicated article
- [[sources/polkasharks-ep10-2024-annual]] — deployment-era context
- [RegionX-Labs GitHub](https://github.com/RegionX-Labs/RegionX)
- [Polkadot Wiki — Coretime Marketplaces](https://wiki.polkadot.com/learn/learn-guides-coretime-marketplaces/)
- [OpenGov Ref #1788 — RegionX Hub final funding](https://polkadot.subsquare.io/referenda/1788)

## Related

- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — canonical app-layer synthesis (RegionX as the coretime-market pillar)
- [[concepts/agile-coretime]] — the primary-market layer RegionX makes liquid
- [[concepts/jam]] — the execution architecture coretime ultimately meters
- [[concepts/dot-hard-cap]] — coretime revenue is burned, linking the market to DOT scarcity
- [[concepts/xcm]] — coretime-funded parachains interoperate via XCM
- [[entities/polkadot]]
