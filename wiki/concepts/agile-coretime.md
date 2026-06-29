---
type: concept
tags: [polkadot, infrastructure, coretime, polkadot2, parachain, compute-market, scalability, marketplace]
---

# Agile Coretime

Polkadot 2.0's replacement for the parachain slot auction model. Allows teams to purchase computational block space ("coretime") flexibly rather than competing in 2-year lease auctions.

## The problem it solves

Old model: teams competed in DOT-denominated auctions for 2-year parachain slots — expensive, long-term commitment, high barrier to entry.

Agile Coretime: buy exactly the compute you need, when you need it.

## Three modes

| Mode | Description | Best for |
|---|---|---|
| **On-demand** | Immediate per-block access | Testing, short-term, low-frequency |
| **Bulk** | 28-day advance purchase | Large, long-term projects |
| **Secondary market** | Buy/sell unused coretime | Cost optimization |

## Pricing mechanism (layer-down)

Bulk coretime is sold in fixed **sale periods** (28-day regions) by the on-chain **Broker** pallet. Price is not a free auction but a governed **Leadin → fixed-price** curve: each sale opens with a decaying lead-in multiplier over a base price, and the base price for the next period adjusts up or down based on how many cores sold versus an `ideal_cores_sold` target (a demand thermostat, not a slot auction). A holder can **renew** at a capped price increase to get long-term cost predictability — the feature that replaces the old 2-year lease guarantee. On-demand coretime is priced by a separate spot market that rises with instantaneous congestion.

**Coretime burn → DOT sink.** Revenue from coretime sales is (per current OpenGov configuration) substantially **burned**, making coretime the structural *demand sink* that pairs with the [[concepts/dot-hard-cap]] supply ceiling: scarce supply only holds value if blockspace is genuinely consumed and its purchase removes DOT from circulation. This is the economic hinge between the two pages — read them together. As of **2026-03-14** the supply side is no longer hypothetical: the hard cap is *enacted and live* ([[concepts/dot-hard-cap]]), so the open empirical question has narrowed to a single variable — **is coretime burn large and growing enough to approach, then exceed, the now-disinflating ~56.9 M DOT/yr issuance?** That crossover (burn > issuance → net-deflationary DOT) is the falsifiable test of the whole "scarce token + paid blockspace" thesis.

## Secondary market

Unused bulk coretime can be traded. [[concepts/regionx]] is the primary marketplace for this. Active regions use dynamic pricing reflecting time-value depreciation.

## Impact

- Dramatically lowers barrier for new developers and small projects
- Cost predictability: teams can budget compute like cloud infrastructure
- Faster deployment: no need to wait for auction cycles
- Elastic Scaling (next step beyond Agile Coretime) reduces congestion further

## Blockspace-market comparison (cross-ecosystem horizontal view)

Coretime is one of several 2023–2026 designs that reframe "blockspace" as a **traded commodity** rather than a per-transaction gas auction. How the major ecosystems sell blockspace:

| Ecosystem | Unit sold | Pricing model | Term | Note |
|---|---|---|---|---|
| **Polkadot** | Coretime (a core for 28 days, splittable) | governed Leadin + demand-thermostat base price; renewals capped | bulk 28-day / on-demand spot / secondary | only model that pre-sells a *reservation* + has a burn sink |
| **Ethereum** | Blob space (EIP-4844, since 2024) + calldata gas | EIP-1559 base-fee auction (per-block) | per-block | L2s buy DA per block; no reservation, fee burned |
| **Celestia** | Data-availability bytes | per-byte fee market | per-blob | DA-only; execution elsewhere |
| **Solana** | Compute units + (2025+) localized fee markets | per-tx priority fee | per-tx | no reservation; congestion = priority-fee spikes |

Polkadot's distinctive bet: turning blockspace into a **forward-purchasable, cloud-like reserved resource** (predictable monthly cost, like an EC2 reserved instance) instead of a volatile spot gas market. [[concepts/jam]] generalises this — coretime becomes the metering unit for *any* service, not just parachains.

## Status (per [[sources/polkasharks-ep10-2024-annual]])

Deployed in 2024. Rollup block time cut from 12s → 6s after deployment. Elastic Scaling (multiple cores per chain for burst demand) shipped subsequently (see [[entities/polkadot]] roadmap).

## Long-horizon view (scenario / projection)

If blockspace genuinely commoditises over the coming decades, the coretime market is a forward bet that **compute settles into a cloud-style reserved-vs-spot pricing structure** — and that whoever offers the most predictable, lowest-cost reserved blockspace wins developer mindshare the way AWS reserved instances won enterprise cloud. The 100-year tail question is shared with [[concepts/dot-hard-cap]]: once token-issuance subsidy is gone, **coretime revenue must fund all protocol security**, so the long-run viability of the whole Polkadot/JAM thesis reduces to "is there durable, growing, paid demand for trustless blockspace?"

## Sources

- [[sources/polkasharks-ep5-peaq-depin]] -> DePIN/IoT workload context

- [[sources/polkasharks-ep6-agile-coretime]] — dedicated article
- [[sources/polkasharks-ep7-regionx]] — secondary market implementation
- [[sources/polkasharks-ep10-2024-annual]] — deployment confirmed

## Related concepts

- [[concepts/xcm]] -> message/asset layer used by parachain applications consuming coretime
- [[concepts/hydration-omnipool]] -> DeFi workload that depends on interoperable execution

- [[concepts/jam]] — JAM extends this model further (coretime as universal metering unit)
- [[concepts/regionx]] — secondary market
- [[concepts/dot-hard-cap]] — coretime burn is the demand sink for the capped supply
- [[entities/polkadot]]
