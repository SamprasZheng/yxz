---
type: concept
tags: [protocol, social, decentralization, web3, polkadot, governance, identity, social-graph, interoperability]
---

# DSNP — Decentralized Social Networking Protocol

An open protocol for **portable social graphs and user-owned social identity** — championed and stewarded by the [[entities/project-liberty]] Institute as free **"digital public infrastructure,"** and given its first production home on the [[entities/frequency]] blockchain.

## Core idea (layer-up)

Move the social graph — identity, the follow/connection graph, and content references — *out of platform silos* and into a shared, neutral substrate so **users, not platforms, own and port their network**. The thesis: today the graph is the lock-in; if the graph is portable, switching apps stops meaning starting over, and competition shifts from "who owns your data" to "who serves you best."

## How it works (layer-down)

DSNP defines protocol-level objects rather than a product:

- **Identity** — a durable, platform-independent user identifier (on Frequency, realized as the on-chain **MSA / Message Source Account**), separable from any single login or app.
- **Graph** — follows/connections as portable, signed records the user controls.
- **Announcements / messages** — content references and social actions published as standardized events that any compliant app can read.
- **Delegation** — scoped permissions letting an app act for a user without owning their identity.

DSNP is *substrate-agnostic by design* (it is a specification), but [[entities/frequency]] is the reference chain that makes it economical at social scale via the **Capacity** anti-spam model. The protocol is governed as an open standard rather than a company product — the Project Liberty Institute is steward, not owner.

## Where it sits among open-social standards (horizontal view)

DSNP is one of several rival answers; they differ on *what* they standardize:

| Standard | Standardizes | Backing | Relation to DSNP |
|---|---|---|---|
| **DSNP** | the graph + identity, anchored on a chain | [[entities/project-liberty]] | the only chain-anchored full-graph approach |
| **ActivityPub** (W3C, 2018) | server-to-server messaging (Mastodon) | W3C / non-profit | the incumbent; federates servers, no portable follower graph |
| **AT Protocol** (Bluesky) | account portability via DIDs + PDS | Bluesky PBC | closest *portability* rival; off-chain |
| **Nostr** | relay-published signed events | grassroots | minimal; pubkey identity, no graph standard |
| **Farcaster** | onchain IDs + off-chain hubs | Merkle/a16z | crypto-native hybrid |

The decisive distinction: DSNP tries to make the **graph itself** a public good on a shared ledger; ActivityPub/AT Proto keep it in federated servers; Nostr/Farcaster put identity on-chain but the graph off-chain.

**Adoption reality (verified 2026-07-05).** The architectures have diverged by ~two orders of magnitude on adoption. DSNP has **~1 M identities** (the [[entities/frequency]]/MeWe migration, up from the 500 K announced Jan 2024; MeWe appointed **Carlos Betancourt** CEO in 2025 to continue the Web3 push). Meanwhile the *federated/off-chain* rival — **AT Protocol / Bluesky** — reached **~15 M MAU and ~43.5 M registered accounts (Apr 2026)**. So the "user-owned social at mass scale" question is now *answered* — but the market chose the **lighter portability model (DIDs/federation) over DSNP's harder L1-anchored-graph bet.** DSNP's remaining edge is the *strength* of its portability guarantee (a chain-anchored graph is harder to reverse than a federated one), not its adoption. See the architecture-split table on [[synthesis/digital-democracy-user-owned-social-six-region]].

## Why it matters here

DSNP is the **social-protocol counterpart to chain-level governance experiments** like [[entities/polkadot|Polkadot OpenGov]]: both try to replace centralized gatekeeping with transparent, user-participatory systems. It is also the operational expression of [[concepts/plurality]] applied to social networks, and its identity primitive is a cousin of [[concepts/proof-of-personhood]] — DSNP asks "can your *graph* be yours and portable?", PoP asks "can your *personhood* be yours and portable?"

## Historical lineage & long-horizon view

**Lineage.** DSNP (2021) is the McCourt/Project Liberty answer to the same problem ActivityPub (2018) and the AT Protocol (2021) attacked: the post-2016 recognition that platform-owned social graphs are both a competition problem and a civic problem. Its bet on a *chain* (Frequency, on [[entities/polkadot]]) over federation is the architectural fork.

**Long-horizon (scenario — not fact).** If portability becomes mandated or normative, the century question is which substrate the graph settles on. The 2025 **TikTok-bid loss** (see [[entities/project-liberty]]) is the first hard evidence that the user-owned-graph thesis can lose to incumbent capital even with a $500 M backer and a regulatory opening — so the realistic long-run path may be regulation-forced (EU-style) rather than market-won.

## Related

- [[entities/project-liberty]] — steward
- [[entities/frequency]] — reference chain
- [[concepts/plurality]] — governance philosophy
- [[entities/audrey-tang]] — civic-tech bridge
- [[entities/polkadot]] — on-chain OpenGov analog + host ecosystem
- [[concepts/proof-of-personhood]] — portable-identity sibling problem
- [[concepts/xcm]] — cross-chain messaging in the host ecosystem
- [[synthesis/digital-democracy-user-owned-social-six-region]]
- [[sources/plurality-audrey-tang-sampras-2025]]
