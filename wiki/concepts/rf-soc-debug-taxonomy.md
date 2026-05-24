---
type: concept
tags: [rf, wifi, soc, npi, debug, ate, smt, otp, firmware, methodology]
---

# RF / SoC Cross-Layer NPI Bug Taxonomy

## Definition

A four-layer classification of bugs encountered during New Product Introduction (NPI) of Wi-Fi / RF SoC products, intended to be applied **before** root-cause debug. The premise: roughly 80% of NPI bugs are not isolated code defects but **cross-layer interactions** — each layer passes individually, but the combination fails. Classifying first prevents engineers from chasing symptoms inside the wrong layer.

Source: [[sources/sampras-rf-soc-debug-playbook-2025]].

## The Four Layers

### Layer 1 — Hardware (HW)

Four sub-phases, each with its own dominant failure mode and triage entry point:

| Sub-phase | Dominant failure mode | Triage entry point |
|---|---|---|
| Design | Footprint/pin errors, missing matching parts, sim-only antenna tuning | Golden-board BOM + layout diff, re-run DRC |
| PCB | Laminate thickness drift → impedance off; CAM-vs-source mismatch; via-in-pad; diff-pair skew | 10-board TDR + VNA sweep, stop line if impedance >±10% off |
| PCBA | SMT reflow defects (cold joint, tombstoning); alt-part datasheet drift (cap ESR, inductor Q); variant mix (WiFi vs WiFi+BT) | BOM diff + X-ray; **full RF certification** after any alt-part swap |
| System integration | Coexistence (WiFi/BT/LTE B40); FFC/FPC length, ground loops; ESD/EMC | Spectrum-analyzer out-of-band spurious capture, time-correlated to subsystem |

### Layer 2 — Firmware (FW)

Two sub-classes:

- **OTP / SoC configuration**: OTP version × MCN# (Mask Change Number) × variant mapping; register write order at boot; calibration tables (RX gain, TX power, antenna switch). **Calibration data such as LO-leakage DC bias codes and IQ imbalance pre-distortion matrices (see [[concepts/evm-calibration]] / [[concepts/zero-if-transmitter]]) and DPD coefficients (see [[concepts/dpd-digital-predistortion]]) live in OTP — making OTP/MCN discipline a Layer-2 protection for Layer-1 RF performance.**
- **Platform metadata**: build branch / tag / compile flags; clear distinction between **regression** (full coverage) and **sanity** (minimum acceptance); review-stage boundaries RTL → FW → FW+SW → system.

Triage rule of thumb: *"The cheapest root cause is a wrong part burned in."* Confirm OTP matches MCN# before any deeper FW debug. Every bug ticket records **version / branch / config / flags** — missing any → don't start.

### Layer 3 — Software / Test (SW / ATE)

Four sub-areas:

1. **Test config** — Dialog (DUT↔tester), Profile (channel/BW/MCS/antenna), Sequence (Pre-cal → cal → verify → stress), Coverage (temperature/Vbat corners).
2. **Preconditions** — ATE-vendor DLL/.so versions, config file paths (local vs network), tester-FW × DUT-FW compatibility table.
3. **ATE itself** — Python/TCL/C# scripts, extension/plug-in vs tester SDK match, package management on shared lines.
4. **Data review** — Parser (log → structured), Visualize (boxplot, yield/wafer map), KPI (yield, Cpk, outlier distribution).

Triage rule: **Is the log readable?** Yes → data problem (script bug, wrong config). No → tooling problem (parser broken, tester version mismatch).

### Layer 4 — Environment

The hardest class because it "looks like black magic, not a bug." Disciplines:

- **Comparison** — same DUT, two environments, diff temperature / humidity / power cleanliness / adjacent equipment.
- **Reproduce** — only counts as a bug once reproducible 100%. Otherwise document environmental variables and stop.
- **Tool-chain re-check** — ATE / extension / package versions (yes, again — silent updates are common).
- **Compatibility** — same FW × different hosts / APs / routers / regulatory region codes.

Field-escalation triage: three questions — (1) how many DUTs, (2) does the neighbor station see it, (3) which build last passed. Missing answer → factory retest.

## Why Layered Classification Matters

Cross-layer bugs share a signature: **each layer passes in isolation, but combinations fail.** The taxonomy provides three benefits:

1. **Cheap-check-first ordering** — each layer has a low-cost entry point (golden-board diff, MCN# check, log-readability test, three-question field triage) that resolves a large fraction of cases without deep debug.
2. **Prevents misattribution** — a coexistence bug looks like an FW regression; an SMT-batch impedance shift looks like a firmware cal failure; a wrong-OTP-on-MCN# looks like a software bug. Classify before debugging.
3. **Reproduction discipline** — environment-class symptoms must be reproduced before deep debug, preventing engineering time from being consumed by folklore.

## The Debug Pipeline That Uses This Taxonomy

```
1. Classify symptom (HW / FW / SW / ENV)
2. Freeze versions (OTP / branch / ATE / platform)
3. Compare against golden
4. Binary search (commit / component / test item)
5. Reproduce on demand
6. Root cause + Mitigation + Prevention
```

When step 5 stalls, the bug is almost certainly cross-layer. Go back to step 1 and add **upstream batch** (SMT lot, wafer split, alt-part) and **downstream platform** (host, regulatory region, coexistence neighbor) to the classification tree.

## Calibration Data: Where the RF/SoC Layers Couple

OTP-stored calibration tables are the most concentrated coupling point in the taxonomy:

- **LO leakage DC bias codes** ([[concepts/evm-calibration]], [[concepts/zero-if-transmitter]]) — burned per-unit; a wrong OTP↔MCN# pairing replays the wrong leakage null, presenting as a Layer-1 EVM failure with a Layer-2 root cause.
- **IQ imbalance pre-distortion matrix** ([[concepts/evm-calibration]]) — same coupling pattern.
- **DPD coefficients** ([[concepts/dpd-digital-predistortion]]) — wrong PA model on the wrong SKU drives ACPR out of spec, mimicking a Layer-1 PA problem.
- **TX power / RX gain tables, antenna-switch map** — wrong variant burn produces "phantom" Layer-1 RF problems on perfectly good hardware.

This is why the playbook's hardest discipline is OTP/MCN# version-locking — it is the **cheapest single check** that resolves the largest cross-layer surface.

## Related Pages

- [[sources/sampras-rf-soc-debug-playbook-2025]] — primary source
- [[concepts/evm-calibration]] — calibration data class stored in OTP; debug entry point when EVM regresses
- [[concepts/zero-if-transmitter]] — LO leakage + IQ imbalance are the canonical OTP-resident cal targets
- [[concepts/dpd-digital-predistortion]] — PA linearization coefficients, another OTP-resident cal class
- [[concepts/aesa]] — phased-array debug specialization (pattern, calibration drift, beam-steering) — follow-on article promised
