---
type: concept
tags: [polkadot, governance, opengov, dao, treasury, conviction-voting, referenda, web3]
---

# OpenGov (Polkadot On-Chain Governance)

**OpenGov** (originally "Governance v2" / "Gov2") is Polkadot's fully on-chain, permissionless governance system: any DOT holder can submit a referendum, and *all* binding protocol decisions — runtime upgrades, [[concepts/dot-hard-cap|tokenomics changes]], treasury spends, parameter tweaks — are enacted by token-weighted on-chain vote with **no council, no committee, and no off-chain multisig veto**. It is the decision layer that ratified every milestone the rest of the Polkadot cluster depends on: [[concepts/dot-hard-cap]] (Ref. 1710), [[concepts/proof-of-personhood]] funding (Ref. 1783), [[concepts/jam]] adoption (planned), and the operating budgets of [[entities/polkaworld]] and other ecosystem teams.

This page is the **canonical OpenGov reference**. Pages that mention "OpenGov," "referendum," "Treasury," "conviction voting," or "Decentralized Voices" should link here rather than re-explaining the mechanics.

## Lineage: from Council to fully on-chain (2020 → 2026)

OpenGov is the third governance generation, and the arc is one of *progressively removing privileged human intermediaries*:

| Era | Years | Mechanism | Privileged bodies |
|---|---|---|---|
| **Governance v1** | 2020–2023 | One public-referendum queue + **Council** (13 elected members) + **Technical Committee**; alternating proposal weeks; Adaptive Quorum Biasing | Council could fast-track, veto-by-inaction, and propose; Technical Committee could emergency fast-track |
| **OpenGov / Gov2** | **Kusama 2022 → Polkadot June 2023** | Unlimited simultaneous referenda across **15 origin tracks**; Council **abolished**; Technical Committee replaced by the elected **[[entities/shawn-tabrizi|Technical Fellowship]]** (advisory whitelist only) | None with veto; Fellowship can only *whitelist* (lower the bar on) a track, never block |
| **Wish-for-Change era** | 2025–2026 | Non-binding "Wish for Change" referenda set fiscal/constitutional direction (e.g. Ref. 1710 hard cap) that binding referenda then implement | — |

The structural claim: OpenGov made Polkadot the **largest pure on-chain DAO by treasury and by binding-decision scope** in crypto — there is no equivalent body to Ethereum's core-dev / EF, MakerDAO's facilitators, or a foundation multisig that can override a passed referendum.

## Core machinery

### 1. Origins and the 15 Tracks

Every action requires an **Origin** (the privilege level needed to dispatch it), and each Origin is paired with a **Track** that presets the referendum's parameters (capacity, decision deposit, decision/confirmation period length, and the approval + support threshold *curves*). Lower-privilege tracks decide fast and cheap; high-privilege tracks (Root) decide slowly with high deposits and stringent late-stage thresholds. The 15 tracks include:

| Track | Origin purpose | Relative bar |
|---|---|---|
| **Root** | Runtime upgrades, anything sudo-equivalent (e.g. the hard-cap enactment) | Highest deposit + longest decision/confirmation; ~100%→ tail approval curve |
| **Whitelisted Caller** | Root-equivalent actions *pre-vetted* by the [[entities/shawn-tabrizi|Technical Fellowship]] | Faster than Root, but only for Fellowship-whitelisted calls |
| **Treasurer** | Large treasury spends (top spend tier) | High |
| **Big Spender / Medium Spender / Small Spender** | Tiered treasury spends (descending DOT ceilings) | Descending |
| **Big Tipper / Small Tipper** | Small treasury tips | Low |
| **Staking Admin, Auction Admin, Lease Admin, General Admin, Referendum Canceller, Referendum Killer, Fellowship Admin** | Scoped parameter/role administration | Varies; Canceller/Killer used to stop malicious referenda |

The Spender tiers are the workhorse of ecosystem funding — every [[entities/polkaworld]] operating grant and every research bounty flows through one of them.

### 2. Conviction voting

Voting power = `tokens × conviction multiplier`. Conviction is a **voluntary lock**: lock longer, count for more.

| Conviction | Multiplier | Token lock after the vote |
|---|---|---|
| 0.1x | 0.1× | **No lock** (vote counts for only 10% of tokens) |
| 1x | 1× | 1 lock period |
| 2x | 2× | 2 lock periods |
| 3x | 3× | 4 lock periods |
| 4x | 4× | 8 lock periods |
| 5x | 5× | 16 lock periods |
| 6x | 6× | **32 lock periods** |

The multiplier rises by one each time the lock *doubles*, capped at 6 doublings (= 32 lock periods). **One lock period = 28 days on Polkadot mainnet**, so a maximum-conviction vote locks tokens for ~32 × 28 ≈ **896 days (~2.45 years)**. Abstain and split votes cannot carry conviction. This is the mechanism's core trade: it lets long-term-aligned holders outweigh mercenary capital *without* a wealth cap.

### 3. Referendum lifecycle — four periods

1. **Lead-in (Preparation):** minimum waiting time after submission; the proposer must post a **decision deposit**; a track slot must be free; voting is already open.
2. **Decision:** the main voting window for that track.
3. **Confirmation:** the referendum must hold **both approval and support above the track's threshold curves for the entire period** or it is rejected. High-privilege tracks demand near-unanimity late; low tracks relax quickly.
4. **Enactment:** approved changes execute on-chain after a track-set delay (longer for Root).

**Approval** = ayes ÷ (ayes + nays), conviction-weighted. **Support** = (ayes + abstains) ÷ *total possible* tokens in the system, *excluding* conviction — a turnout/legitimacy floor that scales the bar to participation.

## Treasury through OpenGov

OpenGov is also Polkadot's fiscal machine. The on-chain **Treasury** receives transaction fees, slashes, and a slice of inflation, and disburses only via passed Spender/Treasurer/Tipper referenda (plus Bounties).

- **Burn / spend period:** every **24 days** an unspent slice is burned (the deflationary backstop). Per public dashboards, **108,162 DOT** burned in the 2025-10-24 spend period; **~20.12M DOT** burned cumulatively since 2020.
- **Income is now structurally falling.** Treasury income ran ~**18M DOT/year** (≈15% of issuance) through 2025, but the [[concepts/dot-hard-cap|Capped & Stepped supply]] (Ref. 1710, enacted from 2026-03-14) cuts it to **≈8.32M DOT/yr (Mar 2026) → 6.15M (2028) → 4.53M (2030)**. Since the cap was adopted the community has **sharply cut spending** — the single most important live fact about Polkadot governance in 2026: *OpenGov is transitioning from a growth-subsidy treasury to a scarcity-disciplined one.* This is the on-chain face of the [[synthesis/polkadot-2026-jam-tokenomics-six-region|fee-funded-security question]].

## Delegation and Decentralized Voices (DV)

Most DOT holders **delegate** their conviction-weighted vote to an active voter per-track rather than voting on every referendum. Large delegate pools — e.g. **[[entities/alice-und-bob|ChaosDAO]]** (~14M DOT) — concentrate informed turnout.

**Decentralized Voices (DV)** was Web3 Foundation's flagship delegation experiment: W3F delegated **~42M DOT + 80,000 KSM** of its own voting power to rotating cohorts of selected community delegates to bootstrap independent, non-W3F voting blocs.

> **Status update (verified 2026-06 vs. older entity-page text):** DV is **winding down, by design**. Cohort 4 ran from ~April 2025 (6 delegates, 4-month term); **Cohort 5** (Sep 2025–Jan 2026) added more seats with *slimmer per-seat clout* and a new **"DV-Light"** track for domain guardians; and in **December 2025 W3F announced it will not run a new cohort after Cohort 5** ("Decentralized Voices — Closing This Chapter & Carrying the Lessons Forward"). The framing: the program succeeded in seeding independent voting culture, so W3F is stepping *back* rather than perpetuating a foundation-granted voting class. Pages describing DV as an open, ongoing program are now stale.

[[entities/polkaworld]] (first-cohort DV, voted on 54 proposals) and [[entities/alice-und-bob]] (OpenGov.Watch) are the cluster's two governance-monitor anchors.

## Tooling

Referenda are discussed and voted through **Polkassembly** and **Subsquare** (proposal front-ends with off-chain discussion), **Nova Wallet** (mobile voting/delegation), and analysed by **OpenGov.Watch** ([[entities/alice-und-bob]]) and dotreasury/Subsquare treasury dashboards. None of these is privileged — they are read/UX layers over the same on-chain state.

## Six-region participation read (台美日韓中國歐洲)

OpenGov is **permissionless and global** — there is no per-region "authority," so the honest framing is *participation gravity*, not jurisdiction (contrast the enclosure dynamics in [[synthesis/space-regulatory-regimes-six-region]]):

| Region | Governance-participation role | Notes |
|---|---|---|
| **Europe** | **Origination & monitoring core.** Web3 Foundation (Zug) sets DV/treasury policy; OpenGov.Watch ([[entities/alice-und-bob]], German-speaking) is the canonical analytics org; ChaosDAO European-led. | Where the *rules about the rules* are written. |
| **China** | **Largest organized delegate/education bloc.** [[entities/polkaworld]] = first-cohort DV (54 proposals), 12 consecutive treasury grants. | Permissionless voting routes around the mainland trading ban. |
| **Taiwan** | **Education + civic-tech affinity.** [[entities/polkasharks]]/[[entities/sampras]] ambassador layer; conceptual kinship with [[concepts/plurality]] / [[entities/audrey-tang]] consent-based governance. | OpenGov ↔ vTaiwan/Polis is the live cross-domain parallel. |
| **US** | **Capital, thin governance presence.** ETF-access story (21Shares/Grayscale); little organized voting/delegation. | N/A as an origination node — regulatory caution keeps US capital passive. |
| **Japan / Korea** | **App-chain & retail, light governance.** Astar/retail liquidity dominate; little dedicated OpenGov delegation infrastructure. | Largely N/A as governance originators. |

**Pattern:** governance *design* gravity in **Europe**, the largest *organized delegate* bloc in **China**, civic-tech *affinity* in **Taiwan**, and passive capital in the **US** — the mirror image of the capital/dev split in [[entities/polkadot]]'s adoption map.

## Long-horizon view (scenario, not fact — up to ~100 years)

OpenGov is an experiment in **governance-as-code as a durable constitution**. Three structural tensions decide its century:

1. **Treasury sustainability (the binding constraint).** Under the hard cap, treasury income falls ~4× by 2030 (18M → 4.5M DOT/yr). A governance system whose budget was built on inflation must either grow fee revenue (JAM/coretime burn demand) or shrink ambition. This is the same **fee-funded-security** invariant flagged in [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — viewed from the *spending* side.
2. **Plutocracy vs. participation.** Conviction voting rewards long-term lockers, but power still tracks tokens. The deliberate wind-down of DV is W3F betting that organic delegate culture (not foundation grants) carries legitimacy — the unresolved question is whether that converges to a healthy delegate democracy or to a few mega-delegates. [[concepts/proof-of-personhood]] (one-human-one-vote for *some* tracks) is the proposed long-run counterweight.
3. **Constitutional immutability vs. adaptability.** A fully on-chain constitution with no veto body is maximally credible but also maximally exposed to a well-funded malicious supermajority (the Canceller/Killer tracks + Root's slow curves are the only brakes). Over a century the open question is whether such a system ossifies, captures, or stays adaptive.

**100-year invariant:** *whoever controls the conviction-weighted majority controls the protocol, and no off-chain body can override them* — the opposite of every legacy corporate or sovereign governance model, and the property that makes Polkadot's OpenGov a clean test case for the durability of pure on-chain constitutions.

## Verification & provenance notes

- OpenGov launched on Polkadot **June 2023** (Kusama 2022); 15 origin tracks; conviction 0.1x–6x with a 32-lock-period max, one lock period = 28 days on Polkadot mainnet — per the [Polkadot Wiki OpenGov page](https://wiki.polkadot.com/learn/learn-polkadot-opengov/) and [Origins & Tracks docs](https://docs.polkadot.com/reference/governance/origins-tracks/).
- Treasury burn 108,162 DOT (2025-10-24 period) / ~20.12M DOT cumulative, and the 18M→8.32M→6.15M→4.53M DOT/yr income decline, are from public treasury dashboards reconciled against [[concepts/dot-hard-cap]] (Ref. 1710, 81% approval, first step 2026-03-14).
- DV conclusion after Cohort 5 confirmed by Web3 Foundation, *Decentralized Voices — Closing This Chapter & Carrying the Lessons Forward* (Dec 2025) and the Cohort 5 announcement (Jul–Sep 2025). No repo code implements OpenGov, so no `agents/` code↔concept reconciliation applies here (governance is consumed as on-chain state, not modelled in Firefly).

## Related

- [[entities/polkadot]] — the protocol OpenGov governs
- [[entities/gavin-wood]] — architect of the Gov1→OpenGov transition and "Wish for Change" framing
- [[entities/alice-und-bob]] — OpenGov.Watch, ChaosDAO, PBA OpenGov instructor; the governance-first thesis
- [[entities/bill-laboon]] — W3F education/governance lead; DV program coordinator; Kusama Council (Gov1 legacy)
- [[entities/polkaworld]] — first-cohort DV delegate; treasury-grant track record
- [[entities/shawn-tabrizi]] — Technical Fellowship (the body that replaced the Technical Committee)
- [[concepts/dot-hard-cap]] — the tokenomics change OpenGov ratified (Ref. 1710); sets the treasury's falling budget
- [[concepts/proof-of-personhood]] — proposed long-run counterweight to token-weighted plutocracy
- [[concepts/plurality]] — the civic-tech parallel (vTaiwan/Polis ↔ OpenGov)
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — the fee-funded-security frame OpenGov's treasury feeds into
- [[synthesis/digital-democracy-user-owned-social-six-region]] — plural collective decision-making sibling
