---
type: concept
tags: [polkadot, risc-v, virtual-machine, smart-contracts, jam, pvm, polkavm, revive]
---

# PolkaVM (PVM)

**PolkaVM** is Polkadot's register-based, **RISC-V**-based virtual machine — the execution substrate that replaces WebAssembly (Wasm) across both of Polkadot's 2026 compute surfaces: the **[[concepts/jam|JAM]] service model** (where the Gray Paper calls it "PVM", the on-chain compute VM) and the **smart-contract layer** (where Solidity/ink! contracts compile down to it via `pallet-revive`). It was split out of [[concepts/jam]] because "the RISC-V VM" is a distinct, now-shipping component with its own lineage, mechanism, and cross-ecosystem story — load-bearing for the whole Polkadot 2.0/JAM thesis but conceptually separable from JAM's Join-Accumulate work model.

Author: **Jan Bujak** (Parity core engineer), who began exploring a Wasm alternative in 2023 and announced PolkaVM on the [Polkadot Forum](https://forum.polkadot.network/t/announcing-polkavm-a-new-risc-v-based-vm-for-smart-contracts-and-possibly-more/3811) ("…and possibly more!" — the "more" became JAM).

## Layer-up — why a new VM at all

The system-level reason: Polkadot bet its next architectural era ([[concepts/jam]]) on a substrate meant to stay stable for *decades*, and Wasm was the wrong foundation for that bet. Wasm is a stack machine designed for a browser sandbox; translating it to the register-based hardware every validator actually runs (x86-64, ARM64) is lossy and hard to JIT-compile to near-native speed deterministically. RISC-V is itself a register ISA — so the VM-to-hardware mapping is direct, the compiler can be simpler and faster, and the ISA is a **frozen, royalty-free open standard** (base ratified 2019, UC Berkeley lineage from 2010) with an independent hardware ecosystem that will outlive any single VM project. Choosing a hardware-native open ISA over a bytecode sandbox is the same **century-scale "stable substrate" bet** that motivates JAM (see [[concepts/jam]] and [[synthesis/polkadot-2026-jam-tokenomics-six-region]]).

**The independent-convergence signal:** Polkadot is not alone. In 2025 Vitalik Buterin proposed replacing the **EVM** bytecode with **RISC-V** for Ethereum's long-term execution layer — arriving at the same conclusion (register ISA > purpose-built bytecode for a durable, ZK-friendly, JIT-able world computer) independently and years after Bujak. Two of the largest smart-contract ecosystems reaching for the same open hardware ISA is the strongest available evidence that this is a structural direction, not a Polkadot idiosyncrasy.

## Layer-down — mechanism and design goals

PolkaVM is a **general-purpose, user-level RISC-V VM** ([paritytech/polkavm](https://github.com/paritytech/polkavm)). Register-based (parameters passed through a limited register file → efficient hardware translation), using a **RISC-V embedded 64-bit base (RV64EM)** instruction set. Stated design goals:

| Goal | Target | Why it matters |
|---|---|---|
| **Secure / sandboxed by default** | code runs in a separate process; no host access even under full in-VM RCE | validator-safety invariant for untrusted contract/service code |
| **Fast to compile** | guaranteed **single-pass, O(n)** compilation | loading new code is near-instant — no expensive pre-verification pass |
| **Low memory footprint** | ≤ **128 KB** baseline overhead per concurrent VM instance | thousands of concurrent instances (JAM services / contracts) per node |
| **JIT to near-native** | 2026 roadmap: PolkaVM **JIT compiler** for near-native execution speed | closes the interpreter-vs-native gap for compute-heavy workloads |

### The compiler path — Revive / `resolc` (the smart-contract side)

Existing Solidity contracts reach PolkaVM through **Revive**, Parity's Solidity/Yul compiler ([paritytech/revive](https://github.com/paritytech/revive)):

- Frontend **`resolc`** ingests Solidity source → **Yul** intermediate representation.
- Backend is **LLVM (v18.1.8)** with RISC-V embedded target support → PolkaVM machine code.
- Runtime target is **`pallet-revive`**, the Substrate pallet that executes the compiled contracts.
- Revive is a *recompiler*, not a bytecode-compatible EVM: the docs flag "**observable semantic differences**" vs the EVM in **gas metering, contract instantiation, and memory allocation** — 100% EVM *source* compatibility, not 100% EVM *bytecode* equivalence.

On **[[entities/polkadot|Polkadot Hub]]**, Revive unifies **EVM + PVM** under one interface: a single address space and **unified gas/weight model** where EVM-semantics contracts (deployable with Remix/Hardhat/Foundry/OpenZeppelin via ETH-RPC) and native PVM contracts (larger, compute-heavy, multi-language) coexist and interact directly.

## Status (verified 2026-07-27)

| Milestone | Date | Note |
|---|---|---|
| PolkaVM announced (Polkadot Forum) | 2023 | Jan Bujak; "for smart contracts and possibly more" |
| PolkaVM on Asset Hub Westend testnet | 2024–2025 | pre-mainnet contract execution |
| PVM adopted as JAM's on-chain VM | Gray Paper v0.7.0 (June 2025) added detailed **PVM pseudocode** | same substrate spans JAM + contracts |
| **Revive / PolkaVM smart contracts go live** | scheduled **2026-01-20** on Polkadot Hub (Kusama runtime-upgrade referendum enacted end-Dec 2025 first) | ✅ EVM+PVM unified execution; the slot-auction-free contract era | ([PolkaWorld](https://x.com/i/status/2001863496070566163), [Parity — What is Polkadot Hub](https://www.parity.io/blog/what-is-polkadot-hub)) |
| PolkaVM **JIT compiler** + more source languages | 2026 roadmap | near-native speed; C/C++/Rust/Go via RISC-V backend |

> **Verification note (2026-07-27).** The RV64EM ISA claim and the ≤128 KB / single-pass-O(n) / sandboxed-by-default design goals are taken from the paritytech/polkavm repository README; the LLVM v18.1.8 / `resolc` / `pallet-revive` details from the paritytech/revive README; the Polkadot Hub unified-EVM+PVM launch (scheduled 2026-01-20) from Parity's "What is Polkadot Hub" post and PolkaWorld's dated announcement. Exact post-launch mainnet-adoption figures (contracts deployed, PVM-vs-EVM share) were **not independently verifiable** at this writing and are deliberately omitted rather than estimated.

## Cross-ecosystem comparison — smart-contract execution engines

| Engine | ISA / model | Ecosystem | Note |
|---|---|---|---|
| **PolkaVM (PVM)** | register-based **RISC-V (RV64EM)**, JIT-target | Polkadot / JAM | same VM for contracts *and* the JAM service layer; open hardware ISA |
| **EVM** | 256-bit stack machine | Ethereum + all EVM L2s | vast tooling/liquidity; slow to JIT; the incumbent standard PolkaVM interoperates *with* (via Revive) not *against* |
| **Ethereum "RISC-V EVM" (proposed)** | register-based RISC-V | Ethereum (research, 2025 Buterin proposal) | independent convergence on the same ISA choice — validates the direction |
| **Solana SVM (SBF/eBPF)** | register-based eBPF-derived | Solana | also register-based-for-speed, but a bespoke ISA, not open-standard RISC-V |
| **Move VM** | bespoke bytecode | Aptos / Sui | resource-oriented safety focus; not RISC-V |

**Read:** the industry's 2024–2026 execution-layer story is a quiet migration from **purpose-built bytecode (Wasm/EVM) → register-based engines close to hardware**, with Polkadot's distinctive move being to pick the **open-standard** RISC-V ISA (not a bespoke one like SVM) *and* to use one VM across both its contract layer and its L0 compute layer. A strict 台美日韓中國歐洲 split is **N/A** — these are protocol-design choices, not national markets; the governance gravity is **Europe (Polkadot/Parity) vs US (Ethereum/Solana research)** with Asia consuming, the recurring upstream/midstream pattern of [[synthesis/leo-taiwan-odc-gap]].

## Historical lineage and long-horizon view

**Lineage (layer-up).** Smart-contract VMs recapitulate general computing's own move off stack machines: EVM/Wasm (stack, portable, slow-to-native) → register VMs mapped onto commodity RISC hardware (SVM, then RISC-V PolkaVM). PolkaVM is Gavin Wood's Yellow-Paper→Polkadot→JAM lineage reaching its **execution-substrate** layer: having generalised *consensus* (relay chain) and *scheduling* (coretime), the VM is the last Wasm-era component to be replaced.

**Long-horizon (scenario — not fact).** If the RISC-V/PolkaVM substrate holds, the 100-year bet is that the *execution ISA* becomes as neutral and durable as TCP/IP is for transport: contracts, JAM services, and languages churn on top while the register-ISA substrate persists and rides the independent RISC-V *hardware* curve (chips optimised for the same ISA the VM speaks). The economic counterpart is on [[concepts/dot-hard-cap]] and [[concepts/agile-coretime]] — PolkaVM is *what* the burned coretime buys the right to execute, so the durability of the VM and the "fee-funded security" endgame are two faces of the same wager: a stable, cheap, trustless compute substrate with real, paid demand.

## Sources

- [paritytech/polkavm](https://github.com/paritytech/polkavm) — design goals, RISC-V register model, sandbox/compile/memory targets
- [paritytech/revive](https://github.com/paritytech/revive) — `resolc` Solidity→Yul→LLVM v18.1.8→PolkaVM; `pallet-revive`; EVM semantic-difference note
- [Announcing PolkaVM — Polkadot Forum](https://forum.polkadot.network/t/announcing-polkavm-a-new-risc-v-based-vm-for-smart-contracts-and-possibly-more/3811) — original 2023 announcement (Jan Bujak)
- [Parity — What is Polkadot Hub](https://www.parity.io/blog/what-is-polkadot-hub) — unified EVM+PVM under Revive
- [[sources/polkasharks-jam-article]] — JAM/PVM context in the wiki corpus
- [[sources/polkadot-roundup-2025]] — 2026 roadmap and Hub migration context

## Related

- [[concepts/jam]] — PolkaVM *is* JAM's on-chain compute VM (Gray Paper "PVM"); the work-model layer above the VM
- [[concepts/agile-coretime]] — coretime is the metering unit; PolkaVM is what the purchased/burned coretime executes
- [[concepts/dot-hard-cap]] — burned coretime revenue is the demand sink for the compute PolkaVM runs
- [[concepts/xcm]] — cross-chain messaging between PolkaVM-executing chains
- [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — canonical Polkadot-2026 integrating synthesis
- [[entities/polkadot]] — Polkadot Hub; PolkaVM deployment surface
- [[entities/gavin-wood]] — Yellow Paper → Polkadot → JAM/PolkaVM lineage
