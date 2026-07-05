---
type: entity
tags: [blockchain, social, dsnp, web3, polkadot, parachain, decentralized-social]
---

# Frequency

A Polkadot **parachain** purpose-built to host [[concepts/dsnp]] (Decentralized Social Networking Protocol) data at scale — the **first production implementation of DSNP**. Frequency provides cheap, high-throughput on-chain storage for social-graph operations (identity, follows, content references) so that the graph lives on neutral infrastructure rather than inside a single platform's silo.

## What it is (layer-up)

Frequency is the *settlement and data-availability layer* for the user-owned social web that [[entities/project-liberty]] is trying to build. Where a Web2 social network stores your identity, follow-graph, and handles in a proprietary database, Frequency anchors those primitives on a public chain so any application can read them and a user can carry them between apps. It is the chain-level counterpart to the philosophy on [[concepts/plurality]] and the protocol on [[concepts/dsnp]].

## Mechanism (layer-down)

| Component | Detail |
|---|---|
| Base stack | Substrate parachain on [[entities/polkadot]]; launched as a parachain **November 2022** |
| Native token | **FRQCY** (mainnet) / **XRQCY** (testnet); pays transaction fees or is staked for Capacity |
| **Capacity model** | Rather than charging a per-message gas fee, token holders **stake FRQCY to mint *Capacity*** — a renewable, non-transferable allowance that refills every N blocks and is spent on high-frequency social messages. This keeps the *marginal* cost of posting near zero while still pricing spam, the key UX unlock for social-scale write volume. |
| **MSA (Message Source Account)** | A chain-native identity primitive that decouples a user's durable identity from any single key or app; supports delegation so an application can act on a user's behalf within scoped permissions. |
| Batched messages | Bulk social events are committed off-chain in Parquet-style batches and anchored on-chain (an L2-companion pattern), so a feed of millions of actions does not require millions of individual extrinsics. |
| Core developer | **Amplica Labs** (under the [[entities/project-liberty]] umbrella) builds Frequency + DSNP core protocols; also ships "Frequency/Amplica Access" SSO-style account onboarding. |

## Adoption signal (verified 2026-07-05)

- **MeWe migration:** Amplica Labs + MeWe moved **500,000+ MeWe users** onto Frequency (milestone announced Jan 2024); by 2025–2026 the figure is reported as **"almost a million"** DSNP identities. The original 2023 announcement framed a path to MeWe's ~20 M-user base, so penetration of MeWe's own base remains partial. MeWe appointed **Carlos Betancourt** CEO in 2025 to continue the Web3 push. Still among the largest Web2→Web3 social migrations to date.
- Frequency has at times **led the Polkadot ecosystem in daily active addresses** (press figures ~70 K DAA) ⚠️ — engagement metric from ecosystem coverage, not an audited on-chain report; treat as order-of-magnitude.
- **Scale context (the humbling comparison):** the *federated/off-chain* rival **AT Protocol / Bluesky** reached **~15 M MAU / ~43.5 M registered (Apr 2026)** — ~40× Frequency's DSNP-identity count. Chain-anchoring buys a stronger portability guarantee but has *not* won the adoption race; the market picked the lighter DID/federation model. See the architecture-split table on [[synthesis/digital-democracy-user-owned-social-six-region]].

## Horizontal view — decentralized-social substrates compared

Frequency is one of several competing answers to "where should the social graph live." The honest comparison axis here is *protocol architecture*, not geography (the geographic read is on [[synthesis/digital-democracy-user-owned-social-six-region]]):

| Project | Substrate | Identity model | Funding / backer | Note |
|---|---|---|---|---|
| **Frequency / DSNP** | Polkadot parachain (chain-anchored) | MSA on-chain | [[entities/project-liberty]] / McCourt ($500 M) | Only one anchoring the full graph on an L1 + Capacity anti-spam |
| **AT Protocol (Bluesky)** | Federated PDS servers (off-chain) | DID + handle | Bluesky PBC / VC | Largest user base; no token; data portability via DIDs |
| **Farcaster** | Optimism L2 + off-chain "hubs" | FID (onchain ID) | Merkle / a16z | Crypto-native; "sufficiently decentralized" hybrid |
| **Lens Protocol** | Lens Chain / Polygon | NFT-based profile | Avara (Aave) | Graph-as-NFT; composable with DeFi |
| **Nostr** | Relays (no chain) | Pubkey only | grassroots / Bitcoin-adjacent | Maximal simplicity; no consensus layer |
| **ActivityPub (Mastodon)** | Federated instances | @user@instance | non-profit / W3C standard | The incumbent open standard; no portability of followers across instances |

Frequency's distinctive bet: put the *graph itself* on a shared L1 with an anti-spam economic layer, rather than federating servers (ActivityPub/AT Proto) or living entirely off-chain (Nostr). The trade-off is chain dependency and token complexity in exchange for hard portability guarantees.

## Historical lineage & long-horizon view

**Lineage.** Frequency descends from the same 2018–2022 "fix social media's ownership model" impulse that produced ActivityPub (W3C, 2018), the AT Protocol (Bluesky spun out of Twitter, 2021), and Project Liberty's DSNP (2021). Its choice to build *on Polkadot* ties its fate to [[concepts/agile-coretime]] economics and [[entities/polkadot]] shared security.

**Long-horizon (scenario — not fact).** If user-owned social graphs ever reach escape velocity, the century-scale question is whether the graph standardizes on a *chain-anchored* substrate (Frequency's bet), a *federated-server* substrate (ActivityPub/AT Proto), or stays captured inside super-apps. The same identity-portability question is the social-layer twin of [[concepts/proof-of-personhood]]'s "portable human credential" question — both ask whether the primitives of online life become public infrastructure or remain private platform property.

## Related

- [[concepts/dsnp]] — the protocol Frequency implements
- [[entities/project-liberty]] — sponsor; Amplica Labs parent
- [[entities/polkadot]] — host relay chain
- [[concepts/agile-coretime]] — the coretime economics Frequency's blockspace cost rides on
- [[concepts/plurality]] — governance philosophy of the user-owned-social movement
- [[synthesis/digital-democracy-user-owned-social-six-region]] — six-region map this entity sits inside
- [[sources/plurality-audrey-tang-sampras-2025]]
