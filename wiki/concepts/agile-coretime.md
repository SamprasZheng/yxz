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

**Coretime revenue → DOT sink (mechanism corrected 2026-09-23 — burn superseded by the DAP).** Coretime sales revenue is the structural *demand sink* that pairs with the [[concepts/dot-hard-cap]] supply ceiling: scarce supply only holds value if blockspace is genuinely consumed and its purchase removes DOT from free circulation. This is the economic hinge between the two pages — read them together. **How the sink works changed in 2026, and this page carried the stale version:**

> **Superseded:** [RFC-0010 "Burn Coretime Revenue"](https://polkadot-fellows.github.io/RFCs/approved/0010-burn-coretime-revenue.html) (Polkadot Fellowship, approved) originally codified coretime revenue as **burned** (destroyed, not routed to Treasury). That burn mechanism was **superseded by the Dynamic Allocation Pool (DAP)**, governance-signalled via **Referendum #1827 ("Wish for Change", Phase 1)** and enacted in the **same 2026-03-12→03-14 runtime upgrade as the [[concepts/dot-hard-cap|2.1 B hard cap]]**. Under the DAP, Polkadot **halts DOT burning system-wide**: transaction fees, coretime sales revenue, validator slashes, and previously-burned issuance are **no longer destroyed** but collected into the **DAP — a permanent, OpenGov-allocated on-chain account** (fees/coretime revenue originate on system chains — Asset Hub + the Coretime chain — and are **phased into the DAP main account over subsequent phases**, not all at once). Verified 2026-09-23 against [Parity — Refining Polkadot's Economic Architecture](https://www.parity.io/blog/refining-polkadots-economic-architecture-issuance-DOT-DAP-and-network-adjustments), [Figment — DAP](https://www.figment.io/insights/polkadots-dynamic-allocation-pool-dap-an-evolution-in-issuance-and-staking/) ("DAP replaces the existing treasury burn mechanism"), and [Ref #1827 — Subsquare](https://polkadot.subsquare.io/referenda/1827).

So Polkadot shifted **from a deflationary automatic burn to a governance-allocated issuance buffer**. Two consequences for the thesis:

- **The disinflation now comes entirely from the capped, decaying issuance**, not from a burn. As of **2026-03-14** the supply side is no longer hypothetical: the hard cap is *enacted and live* ([[concepts/dot-hard-cap]]) — the first cut took annual issuance ~120 M → ~56.9 M DOT (**≈−52.6%**), an effective net inflation of **~3.1%** on a downward path.
- **The falsifiable test moved one step out.** It is no longer "is coretime *burn* > issuance?" but **"does OpenGov allocate *out* of the DAP less than the DAP collects (coretime + fees + slashes) — while coretime demand grows?"** Net-deflation is now a *discretionary governance* outcome, not an automatic one — a softer, more human-dependent version of the same "usage-funds-security" question. **Verified 2026-09-23:** coretime demand still sits **well below** the level that would make DAP inflows rival the ~56.9 M DOT/yr issuance; DOT briefly tagged **$1.03 on a 2026-09-05 short squeeze** but did **not** hold $1 (~$0.85–0.96 mid-Sept, up off the **$0.7238 2026-08-18** low, still far under the **$54.87** prior-cycle ATH) — the market still pricing the demand gap. ([CryptoRank — DOT Sept-2026 short squeeze](https://cryptorank.io/news/feed/e4954-polkadot-price-prediction-september-2026-dot-extends-gains-after-a-short-squeeze))

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
| **Polkadot** | Coretime (a core for 28 days, splittable) | governed Leadin + demand-thermostat base price; renewals capped | bulk 28-day / on-demand spot / secondary | only model that pre-sells a *reservation*; revenue routed to the DAP governance buffer (was a burn until 2026-03) |
| **Ethereum** | Blob space (EIP-4844, since 2024) + calldata gas | EIP-1559 base-fee auction (per-block) | per-block | L2s buy DA per block; no reservation, fee burned |
| **Celestia** | Data-availability bytes | per-byte fee market | per-blob | DA-only; execution elsewhere |
| **Solana** | Compute units + (2025+) localized fee markets | per-tx priority fee | per-tx | no reservation; congestion = priority-fee spikes |

Polkadot's distinctive bet: turning blockspace into a **forward-purchasable, cloud-like reserved resource** (predictable monthly cost, like an EC2 reserved instance) instead of a volatile spot gas market. [[concepts/jam]] generalises this — coretime becomes the metering unit for *any* service, not just parachains.

## Status (per [[sources/polkasharks-ep10-2024-annual]])

Deployed in 2024. Rollup block time cut from 12s → 6s after deployment. Elastic Scaling (multiple cores per chain for burst demand) shipped subsequently (see [[entities/polkadot]] roadmap).

## Long-horizon view (scenario / projection)

If blockspace genuinely commoditises over the coming decades, the coretime market is a forward bet that **compute settles into a cloud-style reserved-vs-spot pricing structure** — and that whoever offers the most predictable, lowest-cost reserved blockspace wins developer mindshare the way AWS reserved instances won enterprise cloud. The 100-year tail question is shared with [[concepts/dot-hard-cap]]: once token-issuance subsidy decays toward its asymptotic tail (DOT reaches this *earlier* than Bitcoin's 2140), **coretime revenue must fund all protocol security** — but the DAP re-routing (above) means that funding now flows through a *discretionary OpenGov valve* rather than an automatic burn, so the long-run bet has two coupled unknowns: (1) is there durable, growing, paid demand for trustless blockspace, and (2) will future governance allocate the DAP's accumulated inflows toward security rather than spend them down? The first is a market question; the second is an institutional one the burn model never had to answer.

## Sources

- [[sources/polkasharks-ep5-peaq-depin]] -> DePIN/IoT workload context

- [[sources/polkasharks-ep6-agile-coretime]] — dedicated article
- [[sources/polkasharks-ep7-regionx]] — secondary market implementation
- [[sources/polkasharks-ep10-2024-annual]] — deployment confirmed

## Related concepts

- [[concepts/xcm]] -> message/asset layer used by parachain applications consuming coretime
- [[concepts/hydration-omnipool]] -> DeFi workload that depends on interoperable execution

- [[concepts/jam]] — JAM extends this model further (coretime as universal metering unit)
- [[concepts/polkavm]] — the RISC-V VM the purchased coretime actually executes
- [[concepts/regionx]] — secondary market
- [[concepts/dot-hard-cap]] — coretime revenue is the demand sink for the capped supply (routed to the DAP since 2026-03, formerly burned)
- [[concepts/regionx]] — the canonical page for the burn→DAP correction (corrected 2026-08-20); this page reconciled to it 2026-09-23
- [[entities/polkadot]]
