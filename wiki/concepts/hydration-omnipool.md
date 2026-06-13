---
type: concept
tags: [polkadot, defi, amm, liquidity, hydration, hdx, stablecoin, money-market]
---

# Hydration Omnipool

Hydration's next-generation AMM (Automated Market Maker) on Polkadot, and the **single liquidity engine** beneath what has become Polkadot's largest DeFi protocol. The Omnipool merges **all** assets into one unified pool — higher capital efficiency than traditional pair-by-pair designs. As of 2026, the Omnipool is the *swap* layer of a three-part DeFi superapp: **Omnipool (swaps) + Aave-v3-style money market (lend/borrow) + HOLLAR (native over-collateralised stablecoin).**

## Layer up — why a single pool matters

Traditional AMMs (Uniswap-style) fragment liquidity across thousands of *pairs* (DOT/USDC, ETH/DOT, …); each pair is a shallow island, so large swaps suffer slippage and LPs must spread capital thin. The Omnipool's bet is that **one pool with one numéraire (its own hub asset, H2O/LRNA accounting) concentrates depth** so every asset is effectively paired with every other in a single hop. This is the DeFi analogue of the same "merge the islands into one machine" thesis that [[concepts/xcm]] expresses for messaging — and it is why Hydration, not a Uniswap fork, became the Polkadot-native venue. The strategic point: capital efficiency is the moat in a chain with *less total liquidity than Ethereum*, so a structurally more efficient AMM is how a smaller ecosystem competes on execution quality.

## Layer down — mechanism

- **Omnipool:** every listed asset trades against the pool's internal hub asset; any-to-any swap routes in one transaction. Reduces slippage (concentrated depth), lowers cost (Polkadot-native fees), and removes the routing complexity of multi-pool DEXs.
- **Money market (verified):** an **Aave-v3-powered** lend/borrow market sits on top — users supply/borrow assets including BTC/ETH/DOT; this is what turns Hydration from a DEX into a full DeFi stack.
- **HOLLAR stablecoin (verified, 2026):** Hydration's native **over-collateralised decentralised stablecoin**, backed by a basket of majors (DOT, ETH, BTC, …), minted against collateral at a **~5% annual borrow rate**, with an **initial supply cap of 2,000,000 HOLLAR**. HOLLAR is Polkadot DeFi's answer to MakerDAO's DAI — a CDP stablecoin native to the ecosystem rather than a bridged USDC/USDT dependency. ([Polkadot newsroom](https://polkadot.com/newsroom/press-releases/hydration-launches-hollar-decentralized-stablecoin-polkadot-defi/), [Blockworks](https://blockworks.co/news/hydration-decentralized-stablecoin))

## Scale (verified, dated)

- Omnipool launched **January 2023**; TVL grew from **$0 → ~$45M** (early case-study figure) and more recent reporting cites **TVL > $330M** with **160+ tradeable assets** — making Hydration **Polkadot's largest DeFi protocol**. (The $45M vs $330M gap is a *time* gap — early case study vs 2026 figure — not a contradiction; flagged here so a later reader doesn't mis-read it.) ([polkadot.com case study](https://polkadot.com/case-studies/hydration-liquidity-management-defi-efficiency/), [Coinspeaker](https://www.coinspeaker.com/polkadots-largest-defi-protocol-hydration-launches-decentralized-stablecoin/))

## Token

**HDX** — Hydration's native governance and liquidity-incentive token.

## Liquidity incentives

Per [[sources/polkasharks-ep3-hydration]]:
- LP APYs: 4% to 75%+ (denominated in vDOT and HDX)
- Polkadot ecosystem injected **1,000,000 DOT** as bootstrap liquidity
- Initial incentive LPs received 200%+ APY; second round ~1 year duration

## Competitive landscape

| Protocol | Design | Chain | Note |
|---|---|---|---|
| **Hydration Omnipool** | single unified pool + Aave-v3 money market + CDP stablecoin (HOLLAR) | Polkadot | full DeFi superapp; capital efficiency as the small-ecosystem edge |
| Uniswap v3/v4 | concentrated-liquidity pairs + hooks | Ethereum/L2s | deepest liquidity; pair-fragmented |
| Curve | stableswap pools | Ethereum/L2s | stable-asset specialist |
| Balancer | weighted multi-asset pools | Ethereum/L2s | closest "multi-asset pool" analogue to Omnipool |
| Aave | money market (no native AMM) | multi-chain | Hydration *licenses the Aave-v3 codebase* for its money market |
| MakerDAO/Sky (DAI/USDS) | CDP stablecoin | Ethereum | the model HOLLAR localises to Polkadot |

**Six-region read (largely N/A — DeFi is jurisdiction-agnostic by design, noted not forced):** an Omnipool is a smart-contract market with no nationality; the only genuine regional dimension is **fiat on-ramp + regulatory access**, where geography reappears — e.g. **Banxa** added Hydration to its **global** fiat on-ramp (2026), routing US/EU/APAC users in. Regulatory exposure tracks the six-region stablecoin map in [[synthesis/agentic-payments-six-region]] (MiCA in Europe, GENIUS Act in the US, FSA/FSC in Japan/Korea) — a decentralised CDP stablecoin like HOLLAR is precisely the thing those regimes are deciding how to treat. So the regional axis lives at the *access/regulatory* layer, not the protocol layer.

## Long-horizon (scenario, not fact)

- **Lineage:** AMMs went constant-product (Uniswap 2018) → concentrated liquidity (Uniswap v3 2021) → unified/omni pools (Balancer-weighted, then Hydration Omnipool 2023). The arc is monotonic toward **fewer, deeper, more capital-efficient pools**.
- **~2030s:** if Polkadot's blockspace thesis ([[concepts/agile-coretime]], [[concepts/jam]]) delivers cheap durable execution, a single-pool DEX + native CDP stablecoin is the canonical "money layer" a region of parachains settles against — HOLLAR's structural role is to keep that settlement *non-USD-bridge-dependent*.
- **~2100 structural view:** the durable scarce resource in DeFi is not the AMM (commoditised) but **trust in the stablecoin's collateral and the venue's solvency** — the same provenance/trust invariant as [[concepts/agentic-provenance]]. Over-collateralisation is a bet that *transparent on-chain collateral* beats *opaque off-chain reserves* over a century; the falsifier is a depeg/insolvency event (HOLLAR is new and unproven).

## Role in the ecosystem

- Primary DEX **and money market** for Polkadot-native assets; HOLLAR is its native stable settlement asset.
- Entry point for assets via [[concepts/xcm]] (cross-chain transfers) — the most common XCM destination.
- Used by [[entities/polkasharks]] as the recommended purchase venue for MYTH, HDX, and other Polkadot-ecosystem tokens.

## Sources

- [[sources/polkasharks-ep3-hydration]] — dedicated Hydration article (Omnipool + incentives)
- [[sources/polkasharks-ep1-polkadot-intro]] — mentioned in cross-chain demo
- [[sources/polkasharks-ep4-mythical-games]] — recommended MYTH purchase route
- [Polkadot newsroom — HOLLAR launch](https://polkadot.com/newsroom/press-releases/hydration-launches-hollar-decentralized-stablecoin-polkadot-defi/)
- [Blockworks — Hydration decentralized stablecoin](https://blockworks.co/news/hydration-decentralized-stablecoin)
- [polkadot.com — Hydration liquidity case study](https://polkadot.com/case-studies/hydration-liquidity-management-defi-efficiency/)

## Related

- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — canonical app-layer synthesis (Hydration as the DeFi pillar)
- [[concepts/xcm]] — used to move assets into Hydration
- [[concepts/dot-hard-cap]] — DOT (and vDOT) is core Omnipool collateral; monetary-policy linkage
- [[synthesis/agentic-payments-six-region]] — stablecoin/regulatory context for HOLLAR
- [[entities/polkadot]]
