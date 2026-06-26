---
type: concept
tags: [space, radiation, tid, see, calculator, methodology, trade-study, mission-design]
---

# Orbit Dose Budgeting — Trade-Study Calculators

A class of **closed-form, trend-only models** used at the front of a radiation qualification program to size TID dose and SEE event rate against orbit, mission duration, and Al-equivalent shielding. Distinct from full environment tools (SPENVIS, OMERE, CREME96), which integrate AE9/AP9 belt models and slant-thickness shielding — those are for signoff. Orbit dose budgeting is for **day-one trade studies**.

The canonical worked example lives in [[sources/radtest-playbook-sampras-2021]], which exposes a runnable React implementation at `my-website/src/components/RadiationCalculators/index.tsx`.

## Why Closed-Form Models Exist

Mission engineers need to answer questions like:
- "If I move from 550 km / 53° to 1200 km / 98°, how much extra TID am I buying?"
- "If my device fails at 15 krad, how many mm of Al do I need at the box wall?"
- "If I lower my SEU cross-section by 10×, what's the probability of zero events in 365 days?"

These are sensitivity questions. Spinning up SPENVIS for each iteration is too slow. A closed-form model with orbit-baselined coefficients gives the engineer the right derivative, even if the absolute number needs correction.

## TID Budget Equation

```
D_TID = TID_base(orbit) × t_years × f_alt × f_inc × f_shield
```

Typical baseline coefficients (LEO 550 km / 53° / 2 mm Al ≈ 1 krad/yr is the anchor):

| Orbit | `TID_base` krad(Si)/yr |
|---|---|
| LEO | 0.8 |
| MEO (inner belt traversal) | 3.5 |
| GEO (outer belt + GCR) | 8.0 |
| Lunar / cislunar | 12.0 |

Modifiers (from [[sources/radtest-playbook-sampras-2021]]):
- `f_alt` (LEO): roughly linear, capped — `clamp(0.65 + (alt_km − 200)/1600, 0.6, 1.25)`. Captures the trapped-proton dose rise into the inner belt.
- `f_inc` (LEO): polar orbits cross SAA and polar horns more — `clamp(0.8 + inc°/220, 0.8, 1.25)`.
- `f_shield`: exponential `exp(−0.35 × max(0, shield_mm − 2))` anchored at 2 mm Al. Crude but captures the right order of magnitude for electron-dominated LEO doses.

### Inverted form (shielding-for-budget)

Given a device TID limit and mission profile:
```
mm_Al_required = 2 + ln(D_unshielded_at_2mm / D_limit) / 0.35
```

Useful when sizing the box wall before component selection is final.

## SEE Rate Equation

```
N_daily = SEE_base(orbit) × (LET_ref/LET_th)^α × (σ/σ_ref) × (bits/bits_ref) × exp(−κ × shield_mm)
```

In [[sources/radtest-playbook-sampras-2021]] the reference choices are `LET_ref = 20 MeV·cm²/mg`, `σ_ref = 1e-7 cm²`, `bits_ref = 1e6`, `α = 1.2`, `κ = 0.08`. Orbit baselines:

| Orbit | `SEE_base` events/day (at reference σ, LET_th, bits) |
|---|---|
| LEO | 1.0e-6 |
| MEO | 8.0e-6 |
| GEO | 2.0e-5 |
| Lunar | 5.0e-5 |

Key design choices:
- The **LET-power-law term** `(20/LET_th)^1.2` is a Weibull-curve trend approximation — a device with LET_th = 40 sees roughly half the rate of one at LET_th = 20.
- The **shielding exponent (0.08)** is smaller than the TID shielding exponent (0.35) because high-LET heavy ions and high-energy protons are much harder to shield than the electrons that dominate TID.
- Cross-section `σ` is the **saturation cross-section** from the device's heavy-ion test report (see [[concepts/see-single-event-effects]] cross section workflow).

### Poisson framing

```
E[events] = N_daily × mission_days
P(≥1 event) = 1 − exp(−E[events])
```

This is the answer driver — it tells you whether ECC alone is sufficient or whether TMR / scrubbing / part-replacement is required.

## When These Models Are Wrong

| Failure mode | Why the closed form misses it |
|---|---|
| Solar particle events (SPE) | Coefficients assume background GCR + trapped; an X-class flare can deposit a mission's worth of dose in days. See [[concepts/solar-cycle-25-leo-radiation]]. |
| ELDR for bipolar parts | TID model is dose-rate-agnostic; bipolar linear ICs need a separate ELDR derate. See [[concepts/tid-total-ionizing-dose]] ELDR section. |
| Slant-thickness / spot shielding | Single mm-Al input ignores box-wall geometry. Real shielding is directional. |
| Proton-induced SEU at low LET | The `(20/LET_th)^1.2` form is heavy-ion-style; proton SEU via nuclear reaction has different scaling. |
| Advanced-node Qcrit | <28 nm CMOS exhibits multi-bit upsets and angular dependence that pure σ vs. LET misses. |

## Concept↔Code Conformance (向內消化)

This page is a **faithful, verified description** of the runnable implementation at `my-website/src/components/RadiationCalculators/index.tsx` (read 2026-06-26). Every coefficient on this page matches the code exactly — a clean ✅ conformance (the positive counterpart to the Nemotron-router divergence flagged in [[synthesis/firefly-nemoclaw-reference-implementation]]):

| Quantity | This page | Code (`index.tsx`) | Match |
|---|---|---|---|
| `TID_base` LEO / MEO / GEO / Lunar | 0.8 / 3.5 / 8.0 / 12.0 | 0.8 / 3.5 / 8.0 / 12.0 | ✅ |
| `SEE_base` LEO / MEO / GEO / Lunar | 1.0e-6 / 8e-6 / 2e-5 / 5e-5 | 1.0e-6 / 8e-6 / 2e-5 / 5e-5 | ✅ |
| `f_alt` (LEO) | `clamp(0.65+(alt−200)/1600, 0.6, 1.25)` | identical | ✅ |
| `f_inc` (LEO) | `clamp(0.8+inc/220, 0.8, 1.25)` | identical | ✅ |
| `f_shield` (TID) | `exp(−0.35·max(0, sh−2))` | identical | ✅ |
| Inverted solver | `2 + ln(D/limit)/0.35` | `solveShieldForTidLimit` identical | ✅ |
| SEE sensitivity / shield | `(20/LET_th)^1.2` · `exp(−0.08·sh)` | identical | ✅ |
| `σ_ref` / `bits_ref` / `α` / `κ` | 1e-7 / 1e6 / 1.2 / 0.08 | identical | ✅ |

**Two precision notes for the owner (not divergences):**
1. The page calls "LEO 550 km / 53° / 2 mm Al ≈ 1 krad/yr" the anchor, but the code's *effective* baseline at that exact point is `0.8 × 0.869 × 1.041 ≈ 0.72 krad/yr` — i.e. the "≈1 krad/yr" is an order-of-magnitude rounding, not the computed value. Harmless for a trend-only tool; worth a one-word "~0.7–1" qualifier if ever tightened.
2. The code **clamps every input** (years 0.1–20, alt 200–2000 km, inc 0–98°, shield 0–20 mm, LET 1–120, σ 1e-10–1e-3, bits 1–1e12). Trade studies outside those ranges silently saturate — a deliberate guard-rail, but callers should know the tool stops responding at the rails.

No code was modified (read-only reconciliation; `my-website/src` is out of edit-scope for this routine).

## Six-Region & Time-Horizon Note

- **六地域 (台美日韓中國歐洲): honest N/A.** These are closed-form approximations of *universal physics* — orbit dose has no nationality, exactly as the conjunction-Pc math is region-agnostic. The meaningful horizontal axis is **which signoff tool/standard convention** a region's primes default to: US/NASA → **CREME96** (SEE) + **AE9/AP9**; ESA/Europe → **SPENVIS** (free, ESA-hosted) + **OMERE** (TRAD, France); both feed the same standards-authorship duopoly mapped on [[concepts/tid-total-ionizing-dose]]. Closed-form budgeting like this sits *upstream* of all of them.
- **拉長時間軸:** the *structure* of closed-form trade models is durable (the questions — "how much more dose if I raise the orbit?" — never change), but the *coefficients* drift: Solar Cycle 25's stronger-than-forecast peak ([[concepts/solar-cycle-25-leo-radiation]]) means the LEO `TID_base` deserves a periodic upward derate, and advanced-node Qcrit collapse (see [[concepts/see-single-event-effects]] scaling section) steadily erodes the `(20/LET_th)^1.2` approximation's validity. The model is a 100-year *pattern*; its numbers are a per-decade *calibration*.

## Workflow Placement

Closed-form orbit-dose budgeting is **step 2 and 3** of the Sampras playbook ([[sources/radtest-playbook-sampras-2021]]):

```
1. Mission profile
2. TID screen ─── orbit-dose budget (this concept)
3. SEE characterize ─── orbit-rate budget (this concept)
4. Design mitigation
5. Lock test plan ─── full environment tool (SPENVIS/OMERE/CREME96) takes over here
```

For signoff you graduate to full tools. For weekly trade-study iteration, closed-form stays.

## Related

- [[sources/radtest-playbook-sampras-2021]] — runnable implementation
- [[concepts/tid-total-ionizing-dose]] — dose physics
- [[concepts/see-single-event-effects]] — LET / cross-section / Weibull background
- [[concepts/rha-radiation-hardening]] — RDM ties to the TID output
- [[concepts/solar-cycle-25-leo-radiation]] — why 2024–2026 baselines deserve a derate
- [[concepts/cots-gpu-radiation-risk]] — applied case (H100 ECC vs. SEL risk)
- [[concepts/rha-radiation-hardening]] — RDM / upscreening economics the budget output feeds
- [[synthesis/radiation-test-rad-hard-six-region]] — where the qualified parts that close the budget get tested, by region
- [[synthesis/firefly-nemoclaw-reference-implementation]] — sibling code↔concept reconciliation (the divergence counterpart to this page's ✅ conformance)
