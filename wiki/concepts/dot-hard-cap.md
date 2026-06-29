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
| Governance vehicle | Referendum 1710, on the **"Wish for Change"** track | [Polkassembly #1710](https://polkadot.polkassembly.io/referenda/1710) |
| Approval | 81% in favour | Polkadot (X, 2025-09) |
| Supply at vote | ~1.6 B DOT existing; ~120 M DOT/yr minted | Polkadot, 2025-09 |
| Enactment | runtime upgrade **2026-03-12**, mechanics live **2026-03-14 "Pi Day"** | Phemex / CoinCodex, 2026 |
| Supply at enactment | ~1.68 B DOT circulating (~80% of the 2.1 B ceiling) | MEXC / crypto press, 2026 |
| First reduction (realized) | −13.14% of *remaining* un-issued supply, then every 2 years | Yahoo Finance / KuCoin, 2026 |
| Initial issuance cut (realized) | ~120 M → ~56.88 M DOT/yr (≈ −52.6%) | crypto press, 2026 |
| Inflation glide path | ~7–10% (pre-cap) → **~3.1% (post-enactment, 2026)** → < 1% by mid-2030s; curve softened post-2032 | CoinCodex / MEXC, 2026 |

> **Verification note — updated 2026-06-29 (post-enactment).** The cap is now LIVE: a runtime upgrade enacted **2026-03-12** brought the new issuance function into effect, with the first reduction mechanics taking hold on **2026-03-14 ("Pi Day")**. Realized post-enactment figures match the projections within rounding (annual issuance ~120 M → ~56.88 M DOT; inflation ~3.1%; circulating ~1.68 B ≈ 80% of cap). The earlier two-step nuance still holds for the record: Referendum 1710 (the **"Wish for Change"** signalling track, 81%) bound the DAO to the *policy direction*; the binding runtime change that set the new issuance function was the separate enacted upgrade above — so 1710 was the mandate, the March-2026 upgrade was the mechanism.

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
| **DOT (post-1710)** | −13.14% residual every 2 yr | 2.1 B asymptote | coretime burn + treasury burn | 100× BTC cap; demand sink = blockspace |
| **Ethereum** | No cap; EIP-1559 burn | floating ("ultrasound money") | base-fee burn | net-deflationary only when usage high |
| **Solana** | Disinflationary 8%→1.5% terminal | uncapped (1.5% tail) | 50% fee burn | never zero-inflation by design |
| **Astar (ASTR)** | Fixed cap **10 B**, from 2026-03 | 10 B | — | Japan/Polkadot ecosystem mirror of the same 2026 "cap-the-supply" wave (see [[entities/polkadot]] Japan row) |

The 2026 cluster signal: across the Polkadot ecosystem, both the L1 (DOT, Ref. 1710) and its largest Japanese app-chain ([[entities/polkadot]] → Astar, fixed 10 B ASTR effective March 2026) pivoted to hard caps in the *same quarter*, reframing "sound-money" tokenomics as an institutional-adoption and ETF-readiness argument rather than a pure scarcity play.

## Long-horizon view (scenario / projection — not fact)

A ~100-year structural sketch, labelled as projection:

- **2026–2032 (issuance decay phase):** four biennial cuts take annual emission from ~120 M → roughly the low-tens-of-millions; inflation crosses below ~1% in the mid-2030s. Staking yield compresses; security budget migrates from inflation-funded toward fee/coretime-funded.
- **2030s–2050s (asymptotic tail):** circulating supply approaches the 2.1 B ceiling; the marginal new DOT becomes negligible. If coretime demand grows, **burn can exceed issuance** → net-deflationary DOT, structurally like Bitcoin's post-tail but with a usage-linked sink Bitcoin lacks.
- **Century horizon:** with subsidy issuance effectively exhausted, protocol security must be **entirely demand-funded** (coretime + transaction burn recycled or fee-redistributed). This is the same long-run question Bitcoin faces at its 2140 tail — DOT reaches it decades earlier and, unlike Bitcoin, has a non-zero structural demand sink (compute), which is the central bet of the [[concepts/agile-coretime]] / [[concepts/jam]] design.

This long-run "security must become fee-funded" question is the tokenomic counterpart to JAM's throughput bet: scarce supply only holds value if blockspace demand is real and growing.

## Sources

- [[sources/gavin-wood-second-era-2025]]
- [[sources/polkadot-roundup-2025]]

## Related

- [[entities/gavin-wood]]
- [[entities/alice-und-bob]]
- [[entities/polkadot]] — six-region adoption + ETF/regulatory context
- [[concepts/proof-of-personhood]] — demand-side complement to supply-side scarcity
- [[concepts/agile-coretime]] — the coretime burn that becomes the structural demand sink
- [[concepts/jam]] — throughput bet that underwrites long-run fee-funded security
