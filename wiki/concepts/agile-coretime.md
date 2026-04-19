---
type: concept
tags: [polkadot, infrastructure, coretime, polkadot2, parachain]
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

## Secondary market

Unused bulk coretime can be traded. [[concepts/regionx]] is the primary marketplace for this. Active regions use dynamic pricing reflecting time-value depreciation.

## Impact

- Dramatically lowers barrier for new developers and small projects
- Cost predictability: teams can budget compute like cloud infrastructure
- Faster deployment: no need to wait for auction cycles
- Elastic Scaling (next step beyond Agile Coretime) reduces congestion further

## Status (per [[sources/polkasharks-ep10-2024-annual]])

Deployed in 2024. Rollup block time cut from 12s → 6s after deployment.

## Sources

- [[sources/polkasharks-ep6-agile-coretime]] — dedicated article
- [[sources/polkasharks-ep7-regionx]] — secondary market implementation
- [[sources/polkasharks-ep10-2024-annual]] — deployment confirmed

## Related concepts

- [[concepts/jam]] — JAM extends this model further
- [[concepts/regionx]] — secondary market
- [[entities/polkadot]]
