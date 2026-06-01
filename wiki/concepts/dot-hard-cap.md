---
type: concept
tags: [polkadot, tokenomics, supply, dot, halving]
---

# DOT Hard Supply Cap

A supply ceiling of **2.1 billion DOT** approved via Polkadot governance, marking a fundamental shift in DOT's monetary policy from uncapped-inflationary to Bitcoin-style asymptotically-capped. The first issuance reduction takes effect **2026-03-14**.

## Key facts

| Parameter | Value | Source |
|---|---|---|
| Hard cap | 2.1 billion DOT (100× Bitcoin's 21M) | Ref. 1710 |
| Governance vehicle | Referendum 1710, on the **"Wish for Change"** track | [Polkassembly #1710](https://polkadot.polkassembly.io/referenda/1710) |
| Approval | 81% in favour | Polkadot (X, 2025-09) |
| Supply at vote | ~1.6 B DOT existing; ~120 M DOT/yr minted | Polkadot, 2025-09 |
| First reduction | **2026-03-14**: −13.14% of *remaining* u/issued supply, then every 2 years | Yahoo Finance / KuCoin, 2026 |
| Initial issuance cut | ~120 M → ~56.9 M DOT/yr (≈ −52.6%) | Globe & Mail, 2026 |
| Inflation glide path | ~7.5% (2025) → ~3.3% (2026) → < 1% by mid-2030s; curve softened post-2032 | Crypto press, 2026 |

> **Verification note (2026-06-01):** Referendum 1710 passed on the **"Wish for Change"** governance track — a *signalling* referendum that binds the DAO to the policy direction; the binding runtime change that sets the new issuance function is enacted through follow-up technical/treasury referenda. The "2026-03-14 first reduction" is the scheduled effect of that enactment, not the date 1710 itself closed. Pages that call 1710 "the cap being enacted" are simplifying a two-step governance process.

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
