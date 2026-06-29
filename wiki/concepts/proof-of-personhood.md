---
type: concept
tags: [polkadot, governance, identity, tokenomics, human-centric]
---

# Proof of Personhood (PoP)

A proposed replacement for Polkadot's current staking mechanism, announced by [[entities/gavin-wood]] at the 2025 Berlin Web3 Summit. Uses on-chain decentralized human validation to distinguish real individuals from bots and AI agents.

## Problem it solves

Current staking concentrates governance power with large DOT holders. PoP shifts influence from token-weighted voting to human-weighted validation — one verified human = meaningful participation rights, regardless of stake size. Also addresses AI/bot manipulation of governance at scale.

## Project Individuality and the DIMs (layer-down)

The product name for Polkadot's PoP system is **Project Individuality** — the product of roughly **three years of design and development at Parity Technologies**. It is built from multiple **Decentralised Individuality Mechanisms (DIMs)** — Gavin Wood describes these as *"personhood games"* engineered to make it costly or difficult for one person to register as many identities (Sybil resistance), without a central KYC authority. Concretely, the launch DIMs are reported to combine **physical, hard-to-repeat marks (e.g. a tattoo/ink credential)** and **interactive video-game-style liveness challenges** — deliberately *behavioural and physical* uniqueness signals rather than a single biometric capture.

| Stage | Name | Target | Description |
|---|---|---|---|
| DIM1 | Proof of Individuality | **Q1 2026** launch | Basic uniqueness: prove you are not the same person as any other registered participant. Code reported *"basically complete"* on the technical-fellowship calls (June 2025). |
| DIM2 | Proof of Verified Individuality | **Q2 2026** launch | Layer real-world identity signals on top of DIM1 uniqueness |
| DIM3+ | Further mechanisms | through 2026 | Additional personhood games / privilege tiers |

**Design stance — privacy-preserving, not biometric.** PoP is a protocol-layer primitive intended to verify *unique humans in a Sybil-resistant way while avoiding centralised KYC and biometric data collection*. This is its deliberate contrast with **Worldcoin/World ID**, which establishes uniqueness via iris-biometric "Orb" scanning — an approach that has drawn data-protection bans and investigations in several jurisdictions. Polkadot's bet is that decentralised "personhood games" can reach Sybil resistance *without* a biometric honeypot.

## Governance connection

Gavin Wood filed his **first personal treasury proposal** to fund PoP's initial deployment — **Referendum 1783 (November 2025), requesting ~$3 million**, which he framed as funding *"the fairest airdrop ever"* and restarting Polkadot's "human-centric growth" trajectory. The mechanism is intended to complement [[concepts/dot-hard-cap]] (supply scarcity, the *supply* side) with genuine demand from verified human users (the *demand* side) — and to make one-human-one-vote [[entities/polkadot]] OpenGov resistant to AI/bot capture as agentic accounts proliferate.

## Six-region digital-identity context (水平展開)

PoP does not exist in a vacuum — every major jurisdiction is simultaneously building or mandating a digital-identity / personhood layer, and PoP's "decentralised, no-KYC" positioning reads very differently against each:

| Region | State / dominant identity rail (2026) | Model | Friction vs. a decentralised PoP |
|---|---|---|---|
| **EU/Europe** | **eIDAS 2.0 / EUDI Wallet** — all 27 states must offer a wallet by Dec 2026 (Reg. 2024/1183) | state-issued, wallet-based, privacy-by-design but government-rooted | Closest philosophical overlap (selective disclosure) but EUDI is state-anchored; a permissionless PoP is complementary, not a substitute |
| **US** | No national ID; sectoral (state driver's licences, mDL, Login.gov) | fragmented, market-led | Light-touch regime → most room for a private PoP, but also least demand-pull |
| **China** | Real-name registration mandatory; national digital ID pilot (2025) | centralised, state-controlled, anti-anonymity | Structurally hostile to anonymity-preserving PoP; crypto trading banned |
| **Japan** | **My Number** card; FSA "Digital Year-One" reform (2026) | state ID + crypto-friendly finance reform | Crypto-progressive ([[entities/polkadot]] Japan row); a complement to My Number for on-chain use |
| **Korea** | Resident Registration Number + mobile ID; strict real-name crypto (banking-linked) | centralised, real-name-linked exchanges | Real-name exchange rules sit awkwardly with a pseudonymous PoP |
| **Taiwan** | Digital ID (TW FidO / planned eID); civic-tech tradition | state ID + strong civic-tech / Plurality ethos | Most culturally aligned via [[concepts/plurality]] / [[entities/audrey-tang]] — pluralistic, consent-based identity |

The throughline: **states are building identity wallets that prove *who you are*; PoP tries to prove *that you are a unique human* without revealing who.** Those are different primitives — PoP is closest to the EU's selective-disclosure ideal and to Taiwan's [[concepts/plurality]] consent ethos, and most at odds with real-name regimes (China, Korea-exchange).

## Status (re-verified 2026-06-29)

- Announced July 2025 (Berlin Web3 Summit) as part of the "Second Era" package; ~3 years of Parity design behind it
- **DIM1 (Proof of Individuality)** scheduled to go live **Q1 2026**; **DIM2 (Proof of Verified Individuality)** **Q2 2026** — note this is a slip from the originally-floated "Q4 2025" Project-Individuality target
- **Referendum 1783** (Nov 2025): ~$3 M treasury request to fund initial deployment ("fairest airdrop ever") — Gavin Wood's first personal treasury proposal
- DIM1 code reported "basically complete" (June 2025 fellowship calls); DIM2/DIM3 timelines staged through 2026
- Gavin Wood's framing (2026): *"There is a need for an authentic social media where the content is authentic and the people are authentic. Proof of personhood and content credentials are going to play a huge role."*

## Long-horizon view (scenario / projection)

As AI agents become indistinguishable from humans in text, *proof of humanity* plausibly becomes century-scale civic infrastructure — the on-chain analogue of a passport for the agentic era. The long-run question is **interoperability**: do state wallets (eIDAS/EUDI, My Number, India's Aadhaar) and decentralised PoP converge into a portable "human credential," or fork into rival state-rooted vs. permissionless identity stacks? Polkadot is betting on the permissionless branch; the EU's privacy-by-design EUDI is the closest state-built sibling, and whether the two ever interoperate is one of the defining digital-rights questions of the coming decades.

## Sources

- [[sources/gavin-wood-second-era-2025]]

## Related

- [[entities/gavin-wood]]
- [[entities/polkadot]]
- [[concepts/dot-hard-cap]] — supply-side scarcity that PoP demand-side complements
- [[concepts/plurality]] — Audrey Tang's consent-based, pluralistic identity ethos (closest civic parallel)
- [[entities/audrey-tang]] — Taiwan civic-tech alignment
- [[concepts/jam]] — JAM core devs discuss the PoP / "M1" economic model alongside JAM delivery
