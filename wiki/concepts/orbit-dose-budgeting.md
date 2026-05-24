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
