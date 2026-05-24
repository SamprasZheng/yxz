---
type: source
title: "Radiation Test Playbook: TID / SEE with Simple Orbit Calculators"
author: Sampras Zheng
date: 2021-01-13
ingested: 2026-05-24
tags: [space, rf, radiation, tid, see, workflow, calculator, cots, playbook]
---

# Radiation Test Playbook — Sampras (2021, blog refresh)

Source: `my-website/blog/2021-01-13-radtest.mdx` (slug `/blog/radtest`) — Sampras Zheng's personal radiation-qualification playbook, refreshed from an older internal blog into a Docusaurus post backed by an inline React component (`src/components/RadiationCalculators/index.tsx`) providing two trend-only calculators (orbital TID dose + orbital SEE rate).

Unique angle vs. existing wiki coverage:
- [[sources/space-radiation-tid-see-2025]] is an industry/supply-chain analysis (Taiwan LEO threshold).
- This source is a **personal hands-on workflow** — the order of operations an engineer should follow before signing off a mission, with inline tools for fast trade studies. It exposes a concrete (if simplified) calculation methodology that is otherwise scattered across NASA/TI handbooks.

## Practical Qualification Flow (the author's playbook)

Five ordered steps, framed as "TI-style radiation qualification":

1. **Define mission profile first** — orbit (LEO/MEO/GEO/Lunar), lifetime, shielding stack-up, reliability target. Nothing else can be sized without this.
2. **Screen TID margin** with system-level assumptions (orbit-baseline × duration × altitude × inclination × shielding). See the orbital TID calculator and [[concepts/orbit-dose-budgeting]].
3. **Characterize SEE sensitivity** — SEU/SEL/SEFI/SET, identified by **LET threshold** and **cross-section** from accelerator test data. (See [[concepts/see-single-event-effects]].)
4. **Build mitigation at design level**:
   - ECC / scrubbing for memory ([[concepts/see-single-event-effects]] SEU)
   - Watchdog / recovery paths for functional interrupts (SEFI)
   - Current limiting and latch-up protection for SEL risk ([[concepts/see-single-event-effects]] SEL)
5. **Re-run mission-level estimates with mitigation assumptions**, then lock the test plan.

Author explicitly cautions: these inline tools are **for mission trade studies, not qualification signoff**. Production decisions must use full environment tools (SPENVIS, OMERE, CREME96) and part-level radiation test reports.

## The Inline Calculators (methodology summary)

Both tools are deliberately simple closed-form expressions — no Monte Carlo, no Vette/AP9 spectra — designed to give an engineer a feel for sensitivity to orbit, duration, and shielding inside a browser tab. Full derivation in [[concepts/orbit-dose-budgeting]].

### TID Calculator

Estimated mission dose:
```
D_krad = TID_base(orbit) × years × altitudeFactor × inclinationFactor × shieldingFactor
```

| Term | Form |
|---|---|
| `TID_base` | LEO 0.8, MEO 3.5, GEO 8.0, Lunar 12.0 krad(Si)/yr at 2 mm Al reference |
| `altitudeFactor` (LEO only) | `clamp(0.65 + (alt_km − 200)/1600, 0.6, 1.25)` |
| `inclinationFactor` (LEO only) | `clamp(0.8 + inc°/220, 0.8, 1.25)` |
| `shieldingFactor` | `exp(−0.35 × max(0, shield_mm − 2))` — exponential trend, anchored at 2 mm Al |

A second mode inverts the equation to solve for **minimum Al-equivalent shielding** to keep mission TID under a device limit:
```
mm_shield = 2 + ln(unshielded_at_2mm / TID_limit) / 0.35
```

### SEE Calculator

Estimated SEE events per day:
```
N_daily = SEE_base(orbit) × (20 / LET_th)^1.2 × (σ / 1e-7) × (bits / 1e6) × exp(−0.08 × shield_mm)
```

| Term | Source |
|---|---|
| `SEE_base` | LEO 1.0e-6, MEO 8.0e-6, GEO 2.0e-5, Lunar 5.0e-5 events/day/Mbit at LET=20 |
| `(20/LET_th)^1.2` | Power-law sensitivity in LET threshold (Weibull-curve approximation) |
| `σ` | Device saturation cross-section from heavy-ion test |
| `bits` | Sensitive/protected bit count |
| `exp(−0.08 × shield_mm)` | SEE shielding falls off more slowly than TID (heavy ions punch through Al more efficiently) |

Mission expectation and probability:
```
E[events] = N_daily × mission_days
P(≥1 event) = 1 − exp(−E[events])     // Poisson model
```

The Poisson framing is the key pedagogical choice: it lets an engineer answer "given my device cross-section curve and orbit, what's the probability of *any* SEU in the mission?" — the question that drives whether ECC is sufficient or whether full TMR / scrubbing is required.

## Notes on Model Limits (explicit in the source)

- TID model is an **exponential shielding trend approximation** — no slant-thickness, no spot-shield, no electron-vs-proton breakdown.
- SEE model is a **Poisson-style expectation** with orbit-dependent baseline — no LET-spectrum integration over the orbit, no proton-induced SEU separate from heavy-ion direct ionization.
- For production decisions: full environment tools + part-level radiation reports.

The author treats the tool as **first-pass sanity-check**, comparable in role to a back-of-envelope link budget vs. STK / FEKO simulation in RF.

## References Cited in the Post

- Space Radiation Services free tools — `spaceradiationservices.com/free-radiation-tools`
- TI radiation webinar (linked handbook/resources) — YouTube `m9Nk1aQarGw`
- NASA HPSC (High-Performance Spaceflight Computing) program page

## Why This Source Matters

For Sampras's own portfolio: it documents **personal engineering judgment** about radiation qualification in a way the analytical sources don't — the ordering of TID-before-SEE-before-mitigation, and the insistence on "mission profile first" before any test plan or component selection. Useful as both a reference and a teaching artifact when the question is "what does a radiation engineer actually *do* on day one of a new program?"

## Related

- [[concepts/tid-total-ionizing-dose]] — the underlying physics
- [[concepts/see-single-event-effects]] — full SEE classification
- [[concepts/rha-radiation-hardening]] — RDM, COTS upscreening, test labs
- [[concepts/orbit-dose-budgeting]] — methodology behind the inline calculators (new page)
- [[concepts/solar-cycle-25-leo-radiation]] — why the LEO baseline is being revised upward
- [[concepts/cots-gpu-radiation-risk]] — mitigation patterns referenced (ECC, scrubbing, latch-up protection)
- [[sources/space-radiation-tid-see-2025]] — industry-level analysis companion piece
