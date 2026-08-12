---
type: concept
tags: [polkadot, infrastructure, scalability, risc-v, upgrade]
---

# JAM (Join-Accumulate Machine)

Polkadot's proposed replacement for the current Relay Chain — a more modular, asynchronous, high-throughput execution environment. The name comes from its two on-chain operations: **Join** (collect work results) and **Accumulate** (integrate them into state).

## What it does

JAM replaces the Relay Chain with a generalized, permissionless computation layer. Rather than being parachain-specific, JAM can host any stateful service that needs trustless execution and ordering.

## Key technical specs

| Property | Value |
|---|---|
| Target data availability throughput | 850 MB/s |
| Projected TPS | ~3.4 million (⚠️ *theoretical headline figure*; depends on core count, service mix, and DA bandwidth — not a measured mainnet number) |
| VM architecture | **PVM** — a RISC-V-based Polkadot Virtual Machine (replaces WebAssembly/Wasm) |
| Execution model | Asynchronous; transaction-less (all work flows through Refine → Accumulate) |
| Developer API | 3 entry points: `Refine`, `Accumulate`, `onTransfer` |

- **Refine** and collection/aggregation run **off-chain** (the heavy, parallelisable compute)
- **Accumulate** (state changes) run **on-chain** (the cheap, serial integration step)
- This split dramatically reduces on-chain compute burden — it is the same *off-chain-compute / on-chain-settle* pattern as optimistic and ZK rollups, generalised into the L0 itself

### Why RISC-V / PVM (the layer-down mechanism)

JAM swaps the Wasm interpreter for **[[concepts/polkavm|PolkaVM (PVM)]]**, a register-based RISC-V (RV64EM) VM — see that page for the full mechanism (single-pass O(n) compile, ≤128 KB per-instance footprint, sandboxed-by-default, JIT roadmap). The reasons are durability and performance: RISC-V is a frozen, royalty-free open ISA (base spec ratified 2019, lineage from UC Berkeley 2010) with broad hardware support, so JAM's PVM can be JIT-compiled close to bare metal and remain stable for decades. Crucially the **same PolkaVM substrate spans both surfaces**: JAM's on-chain service compute *and* Polkadot Hub's smart-contract layer (via `pallet-revive` / the Revive compiler, which lets contract authors choose 100% EVM source-compatibility *or* native PVM performance — **Revive went live on Polkadot Hub 2026-01-20**). Choosing a hardware-native open ISA over a sandbox bytecode is a deliberate **century-scale bet on a stable substrate** rather than a fast-moving VM — a bet Ethereum independently echoed with Vitalik's 2025 RISC-V-EVM proposal.

## Economic model

Developers purchase "core time" in DOT to run services — analogous to gas fees but purchased in bulk or on demand via [[concepts/agile-coretime]].

## Developer impact

- Eliminates parachain slot auction competition
- Any team can deploy; only three entry functions required
- Combines Ethereum smart-contract expressiveness with Polkadot-scale throughput

## Status (re-verified 2026-08-12)

| Milestone | Date | Note |
|---|---|---|
| Gray Paper v0.1 | April 2024 | first public draft |
| Gray Paper v0.6 | Q2 2024 | first complete spec |
| Community approval | May 2024 | 31 M+ DOT in support |
| JAM Toaster (1,023-node test cluster) | 2025 | reference conformance harness |
| Gray Paper **v0.7.0** | June 2025 | added detailed **PVM pseudocode** |
| Gray Paper **v0.7.1** | July 2025 | community-feedback revision |
| Multiple clients at **100% conformance** | August 2025 | several clean-room impls passed the conformance suite |
| Gray Paper **v0.8** | late 2025 | pre-audit draft |
| **Open JAM testnet** | **January 2026** | ✅ public; supports multiple execution environments incl. RISC-V |
| **Revive / [[concepts/polkavm]] contracts live on Polkadot Hub** | **2026-01-20** | ✅ same PVM substrate now runs *contracts* (EVM+PVM unified), ahead of the JAM relay-chain cutover |
| **First team through full M1 review** | **early August 2026** | **JAMdotTech passed the Polkadot Fellowship interview for JAM Prize Milestone 1** after ~25 months of work — the concrete "a team cleared the entire M1 gate" signal (conformance + KYC/AML + an authorship-and-understanding interview), a step beyond the ~15 teams that had merely *lodged* M1 PRs by Jan 2026 (Polkadot Socials Daily Digest, 2026-08-09) |
| Gray Paper **v1.0** | ⚠️ **slipped — NOT released as of 2026-08-12** | was "targeted before mid-2026"; mid-2026 reporting still describes JAM as *"progressing toward v1.0"*. v1.0 is the **prize-payout and mainnet gate**: JAM-prize milestones are paid *"no earlier than the Polkadot Fellowship's ratification of JAM protocol version 1.0,"* so the v1.0 slip pushes both payout and the mainnet vote right |
| **JAM Mainnet Proposal (OpenGov vote)** | **expected Q3–Q4 2026, now realistically 2027** | on-chain governance vote to upgrade the Relay Chain; CoreChain Phase 1 in the same window; gated on v1.0 ratification (above), which has slipped |

⚠️ **Delivery-timeline caution:** in 2026 reporting, three JAM core developers framed full delivery as **"within 12–20 months"** (i.e. into 2027) when discussing the M1 / [[concepts/proof-of-personhood|PoP]] economic model and ZK roadmap alongside JAM — so treat "JAM mainnet in 2026" as the *governance-proposal* window, not a guaranteed production-mainnet date. The testnet is live (Jan 2026); the Relay-Chain cutover is a separate, later governance event.

### Implementation race (the decentralisation-of-clients story)

JAM is being built as a **multi-client, multi-language** protocol from day one — by mid-2026 reporting, **~43 independent teams across ~15 programming languages** were building JAM implementations, competing for a **10 million DOT** prize pool administered by the Web3 Foundation (milestone rewards reportedly start at **~100,000 DOT for early conformance**, with further grants for full-performance builds that pass professional audit; multiple clients had already reached 100% conformance by August 2025). By **January 2026, ~15 teams had lodged their Milestone-1 (M1) deliveries** as pull requests to the `w3f/jam-milestone-delivery` GitHub repository for Web3 Foundation review, and by **early August 2026 the first team — JAMdotTech — had cleared the *entire* M1 gate**, passing the Polkadot Fellowship interview after ~25 months of work (M1 payout is conditional on public + private conformance tests, KYC/AML, *and* an interview that proves the team genuinely authored and understands the code against both the Gray Paper and their own codebase) — the concrete, auditable evidence that the multi-client race is real and not just announced. This is deliberate: a spec with dozens of clean-room clients (Rust, Go, C++, Zig, TypeScript, Python, etc.) is far harder to capture or ossify than a single reference client, and the geographic spread of teams (Europe, Asia incl. Japan/Korea/China dev communities, Americas) is itself a decentralisation property. Contrast Ethereum, which reached client diversity years *after* mainnet; JAM is attempting it *before*.

Gavin Wood's framing (2025):
> *"After EVM, JAM will become the new industry consensus."*

Community debate: whether to call the JAM transition **"Polkadot 3.0"** — supporters see it as a clear system upgrade; critics argue this undersells JAM as a foundational transformation beyond versioning.

## Historical lineage and long-horizon view

**Lineage (layer-up context).** JAM is the third architectural era of the same lineage Gavin Wood started with the Ethereum Yellow Paper (2014): Ethereum (single-chain world computer) → Polkadot relay-chain + parachains (sharded, slot-auctioned, Wasm) → JAM (permissionless, coretime-metered, RISC-V, transaction-less). Each step generalises "trustless shared compute" and removes a bottleneck — JAM removes the parachain-specific framing entirely so *any* stateful service can run.

**Long-horizon (scenario — not fact).** If the RISC-V/PVM substrate holds, the 100-year bet is that JAM becomes a neutral, ISA-stable *settlement-and-compute fabric* the way TCP/IP became a neutral transport: applications churn, the substrate persists. The economic counterpart is on [[concepts/dot-hard-cap]] — once DOT issuance subsidy decays, JAM's security must be funded by real coretime demand, so JAM's throughput bet and DOT's monetary endgame are two halves of one wager: *scarce token + abundant, cheap, durable blockspace*.

## Sources

- [[sources/polkasharks-jam-article]] — most detailed PolkaSharks coverage
- [[sources/polkasharks-ep1-polkadot-intro]] — first mention
- [[sources/polkasharks-ep10-2024-annual]] — deployment context
- [[sources/gavin-wood-second-era-2025]] — Berlin Web3 Summit framing
- [[sources/polkadot-roundup-2025]] — 2026 roadmap and testnet status
- **[2026-08-12 fact-check]** JAMdotTech M1 Fellowship-interview pass (early Aug 2026, ~25 months) + Gray Paper still "progressing toward v1.0" (not yet released) + prizes paid no earlier than Fellowship ratification of JAM v1.0 — Polkadot Socials Daily Digest 2026-08-09 (forum.polkadot.network); "Inside the JAM Implementers Prize — 43 Teams, 15 Submissions, and the Road to JAM 1.0" (polkadot.cloud); Web3 Foundation JAM Prize rules (jam.web3.foundation/rules)

## Related concepts

- [[concepts/polkavm]] — the RISC-V/PVM virtual machine JAM executes on (and that also powers Polkadot Hub contracts)
- [[concepts/agile-coretime]] — resource purchasing model JAM builds on
- [[concepts/dot-hard-cap]] — monetary endgame that JAM's coretime demand must underwrite
- [[concepts/proof-of-personhood]] — the "M1 / PoP economic model" discussed by JAM core devs alongside JAM delivery
- [[entities/polkadot]]
- [[entities/gavin-wood]] — Gray Paper author; Yellow Paper → Polkadot → JAM lineage
