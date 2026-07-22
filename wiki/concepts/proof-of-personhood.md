---
type: concept
tags: [polkadot, governance, identity, tokenomics, human-centric]
---

# Proof of Personhood (PoP)

A proposed replacement for Polkadot's current staking mechanism, announced by [[entities/gavin-wood]] at the 2025 Berlin Web3 Summit. Uses on-chain decentralized human validation to distinguish real individuals from bots and AI agents.

## Problem it solves

Current staking concentrates governance power with large DOT holders. PoP shifts influence from token-weighted voting to human-weighted validation — one verified human = meaningful participation rights, regardless of stake size. Also addresses AI/bot manipulation of governance at scale.

## Project Individuality and the DIMs (layer-down)

The product name for Polkadot's PoP system is **Project Individuality** — the product of roughly **three years of design and development at Parity Technologies**. It is built from multiple **Decentralised Individuality Mechanisms (DIMs)** — Gavin Wood describes these as *"personhood games"* engineered to make it costly or difficult for one person to register as many identities (Sybil resistance), without a central KYC authority. The two launch DIMs now have official names (verified 2026-07-22): **Proof-of-Ink (PoI)** — a physical, hard-to-repeat mark (a tattoo/ink credential) — and **Proof-of-Video-Interaction (PoVI)** — an interactive video liveness challenge. These are deliberately *behavioural and physical* uniqueness signals rather than a single biometric capture.

**Cryptographic mechanism (layer-down).** Project Individuality is built on **zero-knowledge proofs (ZK)** plus a **Bandersnatch Ring VRF** — the same anonymised-credential primitive Polkadot also uses in the SASSAFRAS block-production scheme. The Ring VRF lets a verified participant prove membership in the "set of unique humans" and derive a per-context pseudonym *without* revealing which member they are, so one-human-one-vote holds while individual votes stay unlinkable — the technical expression of the "prove uniqueness, not identity" stance below.

| Stage | Name | Launch DIM(s) | Target | Description |
|---|---|---|---|---|
| DIM1 | Proof of Individuality | **Proof-of-Ink (PoI)** + **Proof-of-Video-Interaction (PoVI)** | **Q1 2026** target | Basic uniqueness: prove you are not the same person as any other registered participant. Code reported *"basically complete"* on the technical-fellowship calls (June 2025); as of mid-2026 reporting both DIMs were *"in the final stages of testing and optimisation… to launch in quick succession in the coming months"* — i.e. a **slip past the Q1 2026 target** (see Status below). |
| DIM2 | Proof of Verified Individuality | credential attestation on top of DIM1 | **Q2 2026** target | Layer real-world identity signals on top of DIM1 uniqueness; higher assurance for high-value operations (e.g. Treasury payouts) |
| Mainnet | Full PoP on Polkadot | — | **Q3 2026** target | Full Project Individuality deployment on Polkadot mainnet (new third milestone on the official roadmap, verified 2026-07-22) |

**Design stance — privacy-preserving, not biometric.** PoP is a protocol-layer primitive intended to verify *unique humans in a Sybil-resistant way while avoiding centralised KYC and biometric data collection*. This is its deliberate contrast with **Worldcoin/World ID** (rebranded **"World"**), which establishes uniqueness via iris-biometric "Orb" scanning — an approach that has drawn data-protection bans and investigations in several jurisdictions. World is the *deployed-scale* rival: **~18 M Orb-verified humans across 160 countries and ~38 M World App downloads (Apr 2026)**, with a 2026 "Full-Stack Proof of Human" re-architecture and US consumer-integration deals (Tinder/Match age-check pilots, and a reported Zoom partnership) even as the iris-scan remains banned or under investigation in several jurisdictions. Polkadot's bet is that decentralised "personhood games" can reach comparable Sybil resistance *without* a biometric honeypot — but as of mid-2026 the biometric approach has the multi-order-of-magnitude lead in verified humans, while Polkadot's DIM1 has yet to launch.

## Governance connection

Gavin Wood filed his **first personal treasury proposal** to fund PoP's initial deployment — **Referendum 1783 (November 2025), requesting ~$3 million**, which he framed as funding *"the fairest airdrop ever"* and restarting Polkadot's "human-centric growth" trajectory. The mechanism is intended to complement [[concepts/dot-hard-cap]] (supply scarcity, the *supply* side) with genuine demand from verified human users (the *demand* side) — and to make one-human-one-vote [[entities/polkadot]] OpenGov resistant to AI/bot capture as agentic accounts proliferate.

## Six-region digital-identity context (水平展開)

PoP does not exist in a vacuum — every major jurisdiction is simultaneously building or mandating a digital-identity / personhood layer, and PoP's "decentralised, no-KYC" positioning reads very differently against each:

| Region | State / dominant identity rail (2026) | Model | Friction vs. a decentralised PoP |
|---|---|---|---|
| **EU/Europe** | **eIDAS 2.0 / EUDI Wallet** — all 27 states must offer a wallet by **2026-12-24** (Reg. 2024/1183); as of mid-2026 **fewer than one-third of member states meet the readiness benchmark** (France Identité live and leading, Italy/Poland next; cross-border interoperability the hardest gap) | state-issued, wallet-based, privacy-by-design but government-rooted | Closest philosophical overlap (selective disclosure) but EUDI is state-anchored; a permissionless PoP is complementary, not a substitute |
| **US** | No national ID; sectoral (state driver's licences, mDL, Login.gov) | fragmented, market-led | Light-touch regime → most room for a private PoP, but also least demand-pull |
| **China** | Real-name registration mandatory; national digital ID pilot (2025) | centralised, state-controlled, anti-anonymity | Structurally hostile to anonymity-preserving PoP; crypto trading banned |
| **Japan** | **My Number** card; FSA "Digital Year-One" reform (2026) | state ID + crypto-friendly finance reform | Crypto-progressive ([[entities/polkadot]] Japan row); a complement to My Number for on-chain use |
| **Korea** | Resident Registration Number + mobile ID; strict real-name crypto (banking-linked) | centralised, real-name-linked exchanges | Real-name exchange rules sit awkwardly with a pseudonymous PoP |
| **Taiwan** | Digital ID (TW FidO / planned eID); civic-tech tradition | state ID + strong civic-tech / Plurality ethos | Most culturally aligned via [[concepts/plurality]] / [[entities/audrey-tang]] — pluralistic, consent-based identity |

The throughline: **states are building identity wallets that prove *who you are*; PoP tries to prove *that you are a unique human* without revealing who.** Those are different primitives — PoP is closest to the EU's selective-disclosure ideal and to Taiwan's [[concepts/plurality]] consent ethos, and most at odds with real-name regimes (China, Korea-exchange).

## Status (re-verified 2026-07-22)

- Announced July 2025 (Berlin Web3 Summit) as part of the "Second Era" package; ~3 years of Parity design behind it; built on **ZK + Bandersnatch Ring VRF**
- Official roadmap (as of 2026-07): **DIM1 Q1 2026 → DIM2 Q2 2026 → full Polkadot mainnet Q3 2026** — the earlier "DIM3+ through 2026" framing is superseded by a named three-step ladder ending in mainnet deployment
- **DIM1 launch DIMs named — Proof-of-Ink (PoI) + Proof-of-Video-Interaction (PoVI)**; as of mid-2026 reporting both were *"in the final stages of testing and optimisation… to launch in quick succession in the coming months"* → the Q1 2026 target has **slipped** (a further slip on top of the earlier "Q4 2025 → Q1 2026" one). ⚠️ No confirmed mainnet-live date for PoI/PoVI as of 2026-07-22 — flagged for re-check next pass.
- **Referendum 1783** (Nov 2025), the **"Polkadot People Initiative"**: ~$3 M treasury request to fund initial deployment ("the fairest airdrop ever") — Gavin Wood's first personal treasury proposal; goal = onboard millions of verified-unique users irrespective of token holdings. Passage status not independently confirmed here.
- Gavin Wood's framing (2026): *"There is a need for an authentic social media where the content is authentic and the people are authentic. Proof of personhood and content credentials are going to play a huge role."*

## Long-horizon view (scenario / projection)

As AI agents become indistinguishable from humans in text, *proof of humanity* plausibly becomes century-scale civic infrastructure — the on-chain analogue of a passport for the agentic era. The long-run question is **interoperability**: do state wallets (eIDAS/EUDI, My Number, India's Aadhaar) and decentralised PoP converge into a portable "human credential," or fork into rival state-rooted vs. permissionless identity stacks? Polkadot is betting on the permissionless branch; the EU's privacy-by-design EUDI is the closest state-built sibling, and whether the two ever interoperate is one of the defining digital-rights questions of the coming decades.

## Sources

- [[sources/gavin-wood-second-era-2025]]
- **[2026-07-22 fact-check]** DIM1/DIM2/mainnet Q1/Q2/Q3-2026 roadmap; PoI + PoVI names; ZK + Bandersnatch Ring VRF; Referendum 1783 "Polkadot People Initiative" — [Polkadot official blog](https://polkadot.com/blog/proof-of-personhood-polkadot-project-individuality/), [Ref. 1783 (Subsquare)](https://polkadot.subsquare.io/referenda/1783), [CryptoPotato](https://cryptopotato.com/polkadot-unveils-bold-vision-for-proof-of-personhood-identity-system/)
- **[2026-07-22 fact-check]** World ID ~18 M Orb-verified / ~38 M World App downloads (Apr 2026) + US consumer integrations — [World.org "Full-Stack Proof of Human"](https://world.org/blog/announcements/world-id-full-stack-proof-of-human), [Rest of World](https://restofworld.org/2026/sam-altman-worldcoin-zoom-tinder-partnerships/)
- **[2026-07-22 fact-check]** EUDI Wallet 2026-12-24 deadline + <⅓-of-states readiness — [Corbado EUDI 2026](https://www.corbado.com/blog/eudi-wallet-2026-deadline-rollout-eic-2026), Reg. (EU) 2024/1183

## Related

- [[entities/gavin-wood]]
- [[entities/polkadot]]
- [[concepts/dot-hard-cap]] — supply-side scarcity that PoP demand-side complements
- [[concepts/plurality]] — Audrey Tang's consent-based, pluralistic identity ethos (closest civic parallel)
- [[entities/audrey-tang]] — Taiwan civic-tech alignment
- [[concepts/jam]] — JAM core devs discuss the PoP / "M1" economic model alongside JAM delivery
- [[synthesis/digital-democracy-user-owned-social-six-region]] — the six-region map where PoP is the **load-bearing shared dependency** for both the user-owned graph and plural-decision axes
- [[concepts/agentic-payments]] — the mirror-image demand: as autonomous agents proliferate, distinguishing human from machine payer/voter is the same Sybil problem PoP solves
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — PoP as the *verified-human-demand* leg of Polkadot's 2026 thesis
