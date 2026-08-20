---
type: concept
tags: [polkadot, tokenomics, supply, dot, halving]
---

# DOT Hard Supply Cap

A supply ceiling of **2.1 billion DOT** approved via Polkadot governance, marking a fundamental shift in DOT's monetary policy from uncapped-inflationary to Bitcoin-style asymptotically-capped. The runtime upgrade was **enacted on 2026-03-12 and took mechanical effect on 2026-03-14 ("Pi Day")** — DOT is now a disinflationary, supply-capped asset (no longer a projection: confirmed live as of this writing, 2026-06-29).

## Key facts

| Parameter | Value | Source |
|---|---|---|
| Hard cap | 2.1 billion DOT (100× Bitcoin's 21M) | Ref. 1710 |
| Governance vehicle | Referendum 1710 (**"Wish for Change"** signalling track) + companion **Ref. 1828** (the binding issuance-function change) | [Polkassembly #1710](https://polkadot.polkassembly.io/referenda/1710); MEXC/CoinCodex 2026 |
| Approval | 81% in favour | Polkadot (X, 2025-09) |
| Supply at vote | ~1.6 B DOT existing; ~120 M DOT/yr minted | Polkadot, 2025-09 |
| Enactment | runtime upgrade **2026-03-12**, mechanics live **2026-03-14 "Pi Day"** | Phemex / CoinCodex, 2026 |
| Supply at enactment | ~1.68 B DOT circulating (~80% of the 2.1 B ceiling) | MEXC / crypto press, 2026 |
| First reduction (realized) | −13.14% of *remaining* un-issued supply, then every 2 years | Yahoo Finance / KuCoin, 2026 |
| Initial issuance cut (realized) | ~120 M → ~56.88 M DOT/yr (≈ −52.6% by the arithmetic; some outlets round it to "−53.6%") | crypto press, 2026 |
| Cap mathematically reached | **~2160** (~135 yr out; asymptote never *exactly* touched but rounds to 2.1 B) | Yahoo Finance / MEXC, 2026 |
| Inflation glide path | ~7–10% (pre-cap) → **~3.1% (post-enactment, 2026)** → < 1% by mid-2030s; curve softened post-2032 | CoinCodex / MEXC, 2026 |

> **Verification note — updated 2026-06-29 (post-enactment).** The cap is now LIVE: a runtime upgrade enacted **2026-03-12** brought the new issuance function into effect, with the first reduction mechanics taking hold on **2026-03-14 ("Pi Day")**. Realized post-enactment figures match the projections within rounding (annual issuance ~120 M → ~56.88 M DOT; inflation ~3.1%; circulating ~1.68 B ≈ 80% of cap). The earlier two-step nuance still holds for the record: Referendum 1710 (the **"Wish for Change"** signalling track, 81%) bound the DAO to the *policy direction*; the binding runtime change that set the new issuance function was a separate enacted upgrade (companion **Ref. 1828**) — so 1710 was the mandate, the March-2026 upgrade was the mechanism.
> **Re-verified 2026-08-01.** No further monetary changes since enactment; ~5 months of live data continue to match the glide path (inflation **~3.11%**, issuance ~56.88 M DOT/yr). Two refinements added this pass: (i) the terminal asymptote rounds to 2.1 B around **~2160** (~135 yr out — a *later* horizon than a naïve "Bitcoin-like tail by the 2050s" read, because the residual-fraction decay keeps a small positive emission for well over a century); (ii) sources disagree on the headline cut depth — **−52.6%** is the correct arithmetic on 120 → 56.88 M, though several outlets round to "−53.6%." *(Sources: [Yahoo Finance — "Put Away Your Calculators"](https://finance.yahoo.com/news/polkadots-2-1-billion-hard-122300662.html); [CoinCodex — Polkadot halving](https://coincodex.com/article/83208/polkadot-halving/); [MEXC — DOT price history / sub-$1 2026](https://www.mexc.com/news/1174328), accessed 2026-08-01.)*
> **Correction — the *burn* sink was replaced by the DAP (verified 2026-08-20).** The tables and long-horizon below (and this page's earlier revisions) list DOT's issuance sink as **"coretime burn + treasury burn."** That is **pre-DAP**. The **Dynamic Allocation Pool Phase 1** — a *companion* change to the hard cap, governance-signalled via **Referendum #1827** and enacted in the **same 2026-03-12→03-14 runtime upgrade** as the cap and the issuance-function change (Ref #1828) — **halts DOT burning system-wide**: transaction fees, coretime sales revenue, validator slashes, and newly-issued DOT are **no longer burned** but collected into the **DAP, a permanent on-chain account that OpenGov allocates** to staking rewards / treasury / reserves. So post-2026-03 DOT has **no active burn sink** — the disinflation comes entirely from the **capped, decaying issuance**, and any "net-deflation" now requires *governance to allocate less than it collects*, not a token burn. Cells and long-horizon lines below are corrected in place with this reframe. *(Sources: [Figment — DAP](https://www.figment.io/insights/polkadots-dynamic-allocation-pool-dap-an-evolution-in-issuance-and-staking/); [Parity — Refining Polkadot's Economic Architecture](https://www.parity.io/blog/refining-polkadots-economic-architecture-issuance-DOT-DAP-and-network-adjustments); [OneBlock+ — Jan-2026 Reset](https://medium.com/@OneBlockplus/polkadots-january-2026-reset-from-economic-model-to-execution-layer-7542898bc471); [Ref #1827](https://polkadot.subsquare.io/referenda/1827); accessed 2026-08-20.)*

### The "Pi" design motif (layer-down)

Two of the headline parameters are deliberate **π references**, not coincidences: the **2.1 B** cap is 100× Bitcoin's 21 M *and* echoes π (3.14…→ the "2.1" framing is marketed alongside Pi-Day), and the **13.14%** biennial residual cut and the **2026-03-14** ("3/14") enactment date both point at **Pi Day**. The mechanism is a stepped, pi-flavoured disinflation rather than Bitcoin's strict 4-year halving — a smoother residual-fraction decay that keeps issuance positive (asymptotic) forever while the marketing leans on the Bitcoin/π scarcity narrative for ETF and institutional audiences.

## Mechanism

Before the cap, DOT had an uncapped inflationary supply (originally ~10% annual inflation, later moved to a linear/exponential-to-linear model — 8% in year one of the 2024 change). Post-cap, issuance follows a **stepped diminishing curve**: every two years a fixed fraction (13.14%) is cut from the residual annual emission, so nominal supply approaches the 2.1 B asymptote without ever mathematically reaching it (Bitcoin-analogous tail).

Validator rewards are restructured in the same package: the original Berlin "Second Era" proposal floated a per-validator reward cap (~$5,000/month) with a biennial halving, cutting projected protocol security spend by a large factor. ⚠️ The precise validator-reward parameters are set by **separate follow-up referenda**, not by 1710 itself; treat the specific dollar figure as the original-proposal target, not a confirmed enacted value.

## Context & significance

Proposed by [[entities/gavin-wood]] at the 2025 Berlin Web3 Summit as part of the "Second Era" package. The cap addresses a long-standing community concern that perpetual inflation suppressed DOT price appreciation and undermined long-term holder confidence.

[[entities/alice-und-bob]] (Tommi Enenkel) reported on and helped shape the referendum. His public position: supply-side changes are necessary but should be paired with demand-side ecosystem growth.

## Cross-asset monetary comparison

| Asset | Supply policy | Terminal supply | Issuance sink | Notes |
|---|---|---|---|---|
| **Bitcoin** | Halving every ~4 yr | 21 M (≈ 2140) | none (pure PoW subsidy decay) | DOT's philosophical template |
| **DOT (post-1710 + DAP)** | −13.14% residual every 2 yr | 2.1 B asymptote | **none — DAP replaced the burns (Ref #1827, 2026-03)**; fees/coretime/slashes → governable pool | 100× BTC cap; disinflation = capped issuance, not burn; demand sink = blockspace |
| **Ethereum** | No cap; EIP-1559 burn | floating ("ultrasound money") | base-fee burn | net-deflationary only when usage high |
| **Solana** | Disinflationary 8%→1.5% terminal | uncapped (1.5% tail) | 50% fee burn | never zero-inflation by design |
| **Astar (ASTR)** | Fixed cap **10 B**, from 2026-03 | 10 B | — | Japan/Polkadot ecosystem mirror of the same 2026 "cap-the-supply" wave (see [[entities/polkadot]] Japan row) |

The 2026 cluster signal: across the Polkadot ecosystem, both the L1 (DOT, Ref. 1710) and its largest Japanese app-chain ([[entities/polkadot]] → Astar, fixed 10 B ASTR effective March 2026) pivoted to hard caps in the *same quarter*, reframing "sound-money" tokenomics as an institutional-adoption and ETF-readiness argument rather than a pure scarcity play.

## Long-horizon view (scenario / projection — not fact)

A ~100-year structural sketch, labelled as projection:

- **2026–2032 (issuance decay phase):** four biennial cuts take annual emission from ~120 M → roughly the low-tens-of-millions; inflation crosses below ~1% in the mid-2030s. Staking yield compresses; security budget migrates from inflation-funded toward fee/coretime-funded.
- **2030s–2050s (asymptotic tail):** circulating supply approaches the 2.1 B ceiling; the marginal new DOT becomes negligible. *(Pre-DAP this line read "if coretime demand grows, **burn can exceed issuance** → net-deflationary DOT.")* Post-DAP (2026-03, Ref #1827) there is **no burn** — net-deflation would instead require **OpenGov allocating out of the DAP less than the DAP collects** (fees + coretime revenue + slashes + issuance). The usage-linked lever survives (coretime revenue is still the demand signal) but it now runs through a *governance* valve, not an automatic burn — a softer, more discretionary form of the same "usage-funds-security" bet Bitcoin lacks.
- **Century horizon (to ~2160):** the residual-fraction decay keeps issuance mathematically positive but negligible until the count rounds to the 2.1 B ceiling around **~2160** — notably *later* than Bitcoin's 2140 tail, not earlier as the "reaches it decades earlier" intuition suggests. What DOT *does* reach earlier is the **sub-1%-inflation regime** (early-2030s), at which point protocol security must migrate to being **demand-funded** (coretime + transaction revenue routed through the DAP — see [[concepts/regionx|coretime revenue → DAP, RFC-0010 burn superseded by Ref #1827]]) rather than subsidy-funded. Unlike Bitcoin, DOT has a non-zero structural demand sink (compute), which is the central bet of the [[concepts/agile-coretime]] / [[concepts/jam]] design — and the [[synthesis/polkadot-interoperability-defi-coretime-app-layer|app-layer synthesis]] tracks whether that sink is actually filling (as of mid-2026: not yet — burn still well below issuance).

This long-run "security must become fee-funded" question is the tokenomic counterpart to JAM's throughput bet: scarce supply only holds value if blockspace demand is real and growing.

## Sources

- [[sources/gavin-wood-second-era-2025]]
- [[sources/polkadot-roundup-2025]]

## Related

- [[entities/gavin-wood]]
- [[entities/alice-und-bob]]
- [[entities/polkadot]] — six-region adoption + ETF/regulatory context
- [[concepts/proof-of-personhood]] — demand-side complement to supply-side scarcity
- [[concepts/agile-coretime]] — the coretime revenue that becomes the structural demand sink (now routed to the DAP, not burned)
- [[concepts/regionx]] — coretime revenue → DAP (Ref #1827 superseded the RFC-0010 burn, 2026-03) → the concrete DOT demand signal
- [[concepts/jam]] — throughput bet that underwrites long-run fee-funded security
- [[synthesis/polkadot-interoperability-defi-coretime-app-layer]] — tracks whether the demand sink is actually filling
