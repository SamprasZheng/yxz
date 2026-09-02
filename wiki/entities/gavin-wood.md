---
type: entity
tags: [polkadot, person, founder, ethereum, jam, parity]
---

# Gavin Wood

Co-founder of Ethereum, sole author of the Ethereum Yellow Paper, and founder of Polkadot and Parity Technologies. Currently serves as Parity CEO (returned April 2025) and chief architect of Polkadot. X: [@gavofyork](https://x.com/gavofyork).

## Background

- Wrote the **Ethereum Yellow Paper** — the formal specification of EVM
- Left Ethereum in 2016 to found **Parity Technologies** and conceive Polkadot
- Authored the Polkadot whitepaper and later the **JAM Gray Paper** (April 2024)
- Returned as Parity CEO in April 2025 to lead the "Second Era" go-to-market phase
- Guest lecturer at the Polkadot Blockchain Academy

## Core worldview on Polkadot vs. Ethereum

From DL News interview (2025):
> *"The Ethereum protocol has essentially remained unchanged compared to the vision that Vitalik and I had back in 2014."*
> *"The biggest thing for Polkadot was that Ethereum, to some degree, had stalled. I wanted to build."*
> *"Layer 2s were never the dream… The dream was something that looks a bit like Polkadot."*

His position: Polkadot is the more faithful execution of Ethereum's original multi-chain interoperability vision.

## The "Second Era" (July 2025, Berlin Web3 Summit)

At the 2025 Berlin Web3 Summit, Wood unveiled a package of Polkadot-transforming proposals — see [[sources/gavin-wood-second-era-2025]]:

- **DOT hard cap** of 2.1 billion DOT — mandate via Referendum 1710 (81%), runtime enacted 2026-03-12, mechanics live 2026-03-14 ("Pi Day"); now confirmed LIVE (issuance ~120 M → ~56.88 M DOT/yr, net inflation ~3.1%) — [[concepts/dot-hard-cap]]
- **Proof of Personhood** replacing staking-based Sybil resistance — phased through 2026 (DIM1 unique-human Q1 → DIM2 verified-individual Q2 → full deployment Q3; DIM1 PoI/PoVI still unshipped as of Aug 2026), paired with the "fairest airdrop ever" framing and his **first personal treasury proposal, Ref. 1783** ($3.01 M → HOLLAR on the People Chain), which **entered confirmation at ~87.7% Aye / ≈160.88 M DOT** (Dec 2025) — the funding cleared even as the mechanism it funds slipped — [[concepts/proof-of-personhood]]
- **Validator reward cap** ($5,000/month, biennial halving) cutting security costs 80%
- **pUSD stablecoin** — DOT-collateralized, integrated with Treasury and OpenGov
- **Polkadot Hub** — native smart contracts via PolkaVM (Revive), enabling both EVM compatibility and native Polkadot performance

## JAM vision

Wood describes JAM as the successor to the Relay Chain — a "transactionless general-purpose supercomputer." Quote:
> *"After EVM, JAM will become the new industry consensus."*

JAM open testnet launched January 2026 (~43 implementer teams, 15 languages, 10 M DOT prize). The Gray Paper moved from v0.8 (late 2025) toward a near-final pre-audit v1.0 draft — but **v1.0 has slipped: as of Aug 2026 it is still "progressing toward v1.0," not released**, and v1.0 is the gate for both the security audit that precedes mainnet *and* the JAM-prize payouts. Delivery is **milestone-gated (M1 conformance → M4 full-speed + professional audit), not calendar-gated**; the first team (**JAMdotTech**) cleared the full **M1** review — passing the Fellowship interview in **early Aug 2026** after ~25 months — while core developers estimate ~12–20 months from early 2026, so mainnet is realistically **late-2026 → 2027**, contingent on a final OpenGov referendum. See [[concepts/jam]].

## 2026 strategic pivot

Explicitly shifting from *technology* to **Platform and Product** — building demonstrable, end-user-facing Web3 applications for non-crypto audiences. Sub0 Buenos Aires (2026) framed as *"The Second Coming of Polkadot."* The institutional-access side of this pivot cleared a milestone independent of Wood: the **first US spot DOT ETF (21Shares TDOT) listed on Nasdaq 2026-03-06** — the "sound-money" hard-cap package he championed was explicitly pitched to exactly this ETF/institutional audience (see [[entities/polkadot]] US row). By **Aug 2026** 21Shares had **rebranded TDOT the "Polkadot *Staking* ETF"** (40–95% staked, quarterly yield) — though the early staking economics drew a cautionary "≈$4.52 NAV loss per $1 of staking reward" read, a reminder the institutional-yield story is not yet clean (see [[entities/polkadot]] US row).

**Pivot goes from slogan to shipped surface (verified 2026-09-02).** The pivot stopped being rhetoric on **2026-08-31**, when Polkadot launched the **Products Devnet** — a feeless sandbox where a developer builds a **static web app**, gives it a **`.dot` domain**, publishes the bundle, and calls `@parity/product-sdk` for platform services, with Products hosted across the **Asset Hub + People + Bulletin** chains. This is the first *dated, shipped* instance of the tech→Platform-and-Product turn (and the delivery rail for [[concepts/proof-of-personhood|PoP]]'s personhood-gated short `.dot` names). It sharpens the corpus's standing read into a **three-tier delivery clock**: the **monetary** layer shipped on calendar ([[concepts/dot-hard-cap|hard cap]] live Mar 2026), the **product/application** surface is now shipping on calendar (Products Devnet Aug 2026), while the **deep-protocol** layer ([[concepts/jam|JAM v1.0]], [[concepts/proof-of-personhood|PoP mainnet]]) still runs on a milestone-not-calendar clock into 2027. ([Cointurk](https://en.coin-turk.com/polkadot-launches-products-devnet-with-three-new-chains-for-developer-tools/), [CryptoRank](https://cryptorank.io/news/feed/f0ec8-polkadot-products-devnet-launch))

## Sources

- [[sources/gavin-wood-second-era-2025]]
- [[sources/polkadot-roundup-2025]]
- DL News interview: https://www.dlnews.com/articles/defi/gavin-wood-on-why-ethereum-is-still-unchanged-and-polkadot/
- Polkadot Blog (JAM vision): https://polkadot.com/blog/jam-new-vision-for-polkadot-gavin-wood/

## Related

- [[entities/polkadot]]
- [[concepts/jam]]
- [[concepts/dot-hard-cap]]
- [[concepts/proof-of-personhood]]
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — the macro frame around the "Second Era" package he architected
