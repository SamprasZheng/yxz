---
type: synthesis
tags: [digital-democracy, decentralized-social, dsnp, plurality, web3, governance, six-region, identity]
sources:
  - "[[sources/plurality-audrey-tang-sampras-2025]]"
concepts:
  - "[[concepts/plurality]]"
  - "[[concepts/dsnp]]"
  - "[[concepts/proof-of-personhood]]"
---

# Digital Democracy & the User-Owned Social Graph — Six-Region Map

**Canonical for:** "who is trying to make online identity, the social graph, and collective decision-making *user-owned and plural* rather than platform-owned — and where each region sits." This is the **civic/social-layer sibling** of the wiki's other six-region maps (ODC, SSA, agentic-payments, open-weight-LLM, space-regulatory, space-weather), and the synthesis hub for the previously-thin Plurality / DSNP / Frequency / Project Liberty / Audrey Tang cluster.

## The one-paragraph thesis

Two movements are converging on the same goal — wresting the primitives of online life (identity, the social graph, collective choice) away from platform monopolies. One is **bottom-up protocol/chain work** (DSNP on [[entities/frequency]], ActivityPub, AT Protocol) backed by private capital ([[entities/project-liberty]], $500 M) and crypto public-goods funding. The other is **civic-tech deliberation** ([[entities/audrey-tang]]'s vTaiwan/Polis + [[entities/glen-weyl]]'s Quadratic Voting/Funding), synthesized in the 2024 book [[concepts/plurality]]. Both rest on an unsolved foundation — **Sybil-resistant personhood** ([[concepts/proof-of-personhood]]) — because every plural mechanism (one-human-one-vote, QV, QF, portable graph) breaks the moment one actor can mint a thousand fake identities. The decisive 2025 data point: the user-owned thesis can still *lose* — Project Liberty's People's Bid for TikTok was rejected in favor of an Oracle/Silver Lake/MGX investor consortium.

## Two axes, one dependency

| Axis | What it owns | Lead artifacts |
|---|---|---|
| **A. User-owned social graph** | identity + follow-graph + content as portable public infrastructure | [[concepts/dsnp]] / [[entities/frequency]]; ActivityPub; AT Protocol (Bluesky); Farcaster; Nostr |
| **B. Plural collective decision-making** | deliberation, voting, public-goods funding | [[concepts/plurality]]; Quadratic Voting/Funding ([[entities/glen-weyl]]); vTaiwan/Polis/Join ([[entities/audrey-tang]]); Gitcoin QF |
| **⚓ Shared dependency** | proof you are a unique human | [[concepts/proof-of-personhood]] (Polkadot Project Individuality — launch DIMs **Proof-of-Ink + Proof-of-Video-Interaction** on ZK+Bandersnatch Ring VRF; DIM1→DIM2→mainnet Q1→Q2→Q3-2026 roadmap, **slipping** as of mid-2026); EU EUDI (all 27 states by **2026-12-24**, Reg. 2024/1183 — but **<⅓ of states ready**, France Identité leading); **World ID** (biometric — ~18 M Orb-verified across 160 countries, ~38 M World App downloads, "Full-Stack Proof of Human" 2026 + US Tinder/Zoom integrations; contested/banned in places) |

## Six-region comparison (台美日韓中國歐洲)

| Region | Social-graph (Axis A) | Deliberation/plural (Axis B) | Identity rail | Model |
|---|---|---|---|---|
| **US** | [[entities/project-liberty]] + Amplica/[[entities/frequency]] (DSNP); Bluesky (AT Proto); Farcaster | RadicalxChange + Gitcoin QF ([[entities/glen-weyl]]); Colorado QV experiments | No national ID; sectoral mDL/Login.gov | **philanthropy- + market-led**; biggest private bet, weakest state pull |
| **Taiwan** | upstream-strong / midstream-absent — no sovereign social chain | **most mature**: vTaiwan/Join/Polis in **MODA** ([[entities/audrey-tang]]) | TW FidO / planned eID + [[concepts/plurality]] ethos | **civic-tech institutionalized in a ministry** — unique |
| **Europe** | ActivityPub/**Mastodon** (W3C standard); EU funds Decidim/CONSUL | Decidim, Conference on the Future of Europe; QF in some city budgets | **eIDAS 2.0 / EUDI wallet** (mandatory by Dec 2026) | **standards- + regulation-led**; the state builds the rail |
| **Korea** | consumes global platforms | Seoul mVoting / Democracy Seoul participatory budgeting | RRN + mobile ID; real-name crypto | **municipal e-participation**; real-name regime |
| **Japan** | consumes global platforms; Astar/Polkadot dev community | **Team Mirai** (Takahiro Anno, explicitly [[concepts/plurality]]-inspired) — 1 House of Councillors seat, 2025 (~2.3%); "Digital Democracy 2030"; Digital Agency | My Number card | **tech-led, now electoral** — Plurality reached a legislature |
| **China** | sovereign super-apps (WeChat); no portable graph | N/A — consultative portals only; open deliberation excluded by design | mandatory real-name + national digital ID pilot | **state-controlled, anti-anonymity** |

## Three governance models (the structural read)

1. **Philanthropic-private (US):** a single $500 M fund + crypto public-goods grants drive the agenda. Maximum freedom to build, minimum coercive power — which is why the TikTok bid lost to capital.
2. **Civic-institutional (Taiwan):** grassroots civic-hacking absorbed into the state (MODA). Highest deployment maturity, but tied to one country's political will.
3. **Regulation-rail (Europe):** the state builds the identity wallet (EUDI) and funds municipal deliberation; portability becomes law, not product. Slowest, most durable.
   *(China is the negative case: same primitives, inverted purpose — identity to control, not to empower.)*

## The 2025 falsifier built into the cluster (resolved 2026-01)

Unlike the purely technical six-region maps, this domain already produced a hard outcome: **the user-owned thesis lost a live test.** Project Liberty's People's Bid for TikTok (2025-01-09) — a real, funded attempt to migrate a 170 M-user app onto DSNP — was passed over for the **TikTok USDS Joint Venture** (Oracle/Silver Lake/MGX, Trump EO 2025-09-25). The deal **closed 2026-01-22** (verified 2026-07-05): TikTok USDS Joint Venture LLC — new-investor consortium 50% (Oracle/Silver Lake/MGX ~15% each), existing-ByteDance-investor affiliates ~30.1%, ByteDance ~19.9%; former TikTok ops head **Adam Presser** installed as CEO. Lesson: a regulatory forcing-event plus a $500 M backer was *still* not enough to beat incumbent capital — the resolution concentrated control in a conventional US-investor consortium, not a user-owned graph. The realistic path to user-owned social may therefore be **regulation-forced (EU model)**, not market-won (US model).

## 2026 scale check — which *architecture* crossed the line (verified 2026-07-05)

The single most important cluster update since this map was drawn: **Axis A now has a live >10 M-MAU proof point — but it is the federated/off-chain wing, not the chain-anchored one.** The sub-architectures have diverged by two orders of magnitude:

| Axis-A substrate | Architecture | Scale (2026) | Read |
|---|---|---|---|
| **AT Protocol / Bluesky** | federated PDS + DIDs (off-chain) | ~15 M MAU · ~43.5 M registered (Apr 2026); +60% in 2025 | the winner *at scale*; portability via DIDs, no token |
| **ActivityPub / Mastodon** | federated instances | ~1 M+ MAU (fediverse-wide larger) | the standards incumbent |
| **[[concepts/dsnp]] / [[entities/frequency]]** | chain-anchored graph (Polkadot L1) | **~1 M** DSNP identities (MeWe migration, up from 500 K) | the strongest *portability guarantee*, the weakest *adoption* |

**The refined thesis:** "user-owned social can reach mass scale" is no longer speculative — Bluesky settled it. What remains open is **whether the graph must live on a chain to be truly user-owned.** The market has voted for the *lighter* portability model (DIDs/federation) over the *harder* one (L1-anchored graph + token). So the chain-anchored bet ([[entities/project-liberty]]'s DSNP wager) is now competing not against Web2 silos but against a *decentralized-but-off-chain* rival that already won the adoption race — a much harder position than the original 2021 framing assumed.

## 100-year invariant (scenario — not fact)

The century question is whether the primitives of online life — **identity, graph, and collective choice** — become *public infrastructure* (portable, plural, user-owned) or remain *private property* (platform-owned, or state-owned in the China case). Every branch routes through one chokepoint: **can we prove unique personhood without a surveillance honeypot?** If yes, the plural/user-owned branch is buildable (QV/QF/DSNP all function); if no, both axes default back to platform or state control. This is why [[concepts/proof-of-personhood]] is the load-bearing dependency for the entire field, and why Polkadot's PoP, the EU's EUDI, and Worldcoin's biometric Orb are three rival answers to the *same* foundational question.

## Falsifier table

| If this happens | Effect on the thesis |
|---|---|
| A user-owned-graph app crosses ~10 M MAU and retains them | **✅ FIRED (2026):** [[entities/frequency|Bluesky]] on the AT Protocol reached **~15 M MAU / ~43.5 M registered accounts (Apr 2026)** with a strong ~30% DAU/MAU ratio — the first *decentralized-substrate* social app past 10 M MAU, strengthening Axis A **decisively**. Caveat below: this fired for the **federated/off-chain** architecture, **not** the chain-anchored DSNP bet (still ~1 M) |
| A national government *mandates* social-graph portability | strengthens the EU regulation-rail model decisively (EUDI mandates *identity* portability by Dec 2026, not yet the graph) |
| QV/QF gets adopted in a binding national budget (not just municipal/crypto) | strengthens Axis B beyond niche status |
| A Plurality-inspired party wins elected office | **✅ FIRED (2025):** Japan's **Team Mirai** (Takahiro Anno, explicitly [[concepts/plurality]]-inspired) won a House of Councillors seat (~2.3%) — Axis B crossed from experiment to legislature |
| PoP/EUDI deployments interoperate into one portable human credential | the 100-year "public-infrastructure" branch wins |
| AI-agent Sybil attacks defeat one-human-one-vote at scale before PoP matures | both axes collapse back to platform/state control |

## See also

- [[concepts/plurality]] · [[concepts/dsnp]] · [[concepts/proof-of-personhood]]
- [[entities/audrey-tang]] · [[entities/glen-weyl]] · [[entities/project-liberty]] · [[entities/frequency]] · [[entities/polkadot]]
- Sibling six-region maps: [[synthesis/agentic-payments-six-region]], [[synthesis/open-weight-llm-agent-stack-six-region]], [[synthesis/polkadot-2026-jam-tokenomics-six-region]]
- [[sources/plurality-audrey-tang-sampras-2025]]
