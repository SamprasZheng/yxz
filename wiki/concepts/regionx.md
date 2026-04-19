---
type: concept
tags: [polkadot, coretime, marketplace, infrastructure]
---

# RegionX

The secondary market for Polkadot and Kusama coretime — a marketplace where teams can buy and sell unused computational block space ("regions").

## What is a region?

A "region" is a unit of purchased bulk coretime — a time slice of block-space on Polkadot's execution cores. Regions have a lifecycle (start → end) and depreciate in value as they're consumed.

## Primary market (context)

Before the secondary market, teams buy coretime through Polkadot's primary market:
1. **On-demand** — immediate, per-block
2. **Bulk** — 28-day advance purchase

RegionX handles what happens *after* bulk purchase.

## Secondary market mechanics

**Direct access:**
- Priced by region lifecycle
- Active regions: dynamic pricing reflecting time-value depreciation

**Orders (crowdloan-style):**
- Users contribute DOT (not staked — contributed)
- Parachains can offer incentive rewards for filling orders
- Similar to the old crowdloan model but for compute rather than slot leases

## Why it matters

- Allows sub-core purchases — a team can buy *part* of a core, dramatically lowering costs
- Creates a liquid market for compute
- Makes [[concepts/agile-coretime]] more efficient at scale

## Sources

- [[sources/polkasharks-ep7-regionx]] — dedicated article

## Related

- [[concepts/agile-coretime]]
- [[entities/polkadot]]
