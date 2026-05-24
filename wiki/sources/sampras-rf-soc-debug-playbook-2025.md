---
type: source
title: "RF / SoC System Debug — A Bug Taxonomy from Hardware to Firmware to ATE"
author: sampras
date: 2025-06-02
ingested: 2026-05-24
tags: [rf, wifi, phasedarray, soc, npi, debug, ate, firmware, methodology, calibration]
---

# RF / SoC System Debug Playbook (Sampras, 2025)

## Source

Sampras Zheng's NPI (New Product Introduction) debug checklist for Wi-Fi / RF SoC product lines. Thesis: ~80% of NPI bugs are not "wrong line of code" issues but **cross-layer interactions** — hardware passes review but SMT variation kills a batch; ATE passes but firmware hits a corner case on a different profile; lab works but the customer environment surfaces coexistence interference. Classify first, then root-cause.

## Core Framework: 4 Layers

The playbook partitions bug surface area into four layers, each with characteristic failure modes and a triage **entry point** (the cheapest first check before deep debug):

### Layer 1: Hardware (HW)

| Sub-phase | Common bugs | Entry point |
|---|---|---|
| Design | Footprint/pin-swap errors; missing power-sequence or RF matching parts; antenna tuning with sim-only | Golden-board pin-by-pin BOM+layout diff, re-run DRC before any new production run |
| PCB | CAM-vs-source Gerber/ODB++ diff; laminate cross-section (dielectric thickness → 50 Ω impedance); via-in-pad / diff-pair skew | Pull 10 boards from first run, TDR + VNA sweep; **stop the line** if impedance deviates >±10% |
| PCBA | SMT reflow profile, cold joints, tombstoning; alt-part datasheet drift (cap ESR, inductor Q); WiFi-only vs WiFi+BT variant differences | BOM diff + X-ray spot check; **full RF certification** (not sanity) after any alt-part swap |
| System integration | WiFi 2.4G × BT × LTE B40 coexistence; FFC/FPC length and shield ground loops; ESD/EMC only visible at full-system | Spectrum-analyzer capture of out-of-band spurious, time-axis correlate to subsystem at startup |

### Layer 2: Firmware (FW)

- **OTP / SoC config**: OTP version × MCN# (Mask Change Number) × variant mapping; register write order (wrong startup sequence corrupts every downstream layer); calibration data (RX gain table, TX power table, antenna switch mapping).
- **Platform metadata**: ADB/host command scripts; code builder (compile flags, branch, tag); **regression (full coverage) vs sanity (minimum acceptance) — never mix**; clean review stage boundaries RTL → FW → FW+SW → system.

> "The cheapest root cause is a wrong part burned in." For any FW issue, confirm OTP matches MCN# first. On every bug ticket, record **version / branch / config / flags** — if any is missing, don't start debugging.

### Layer 3: Software / Test (SW / ATE)

- **Test config**: Dialog (DUT↔tester interaction), Profile (channel/BW/MCS/antenna), Sequence (Pre-cal → cal → verify → stress), Coverage (low/high temp, low Vbat corners).
- **Preconditions**: ATE-vendor DLL/.so versions, config file paths (local vs network), tester-firmware × DUT-firmware compatibility table.
- **ATE itself**: Python/TCL/C# scripts; extension/plug-in vs tester SDK version match; package management when multiple lines share a tester.
- **Data review**: Parser (raw log → structured), Visualize (boxplot, yield map, wafer map), KPI (yield, Cpk, outlier distribution).

> ATE triage rule: **Is the log readable?** Yes → data problem (script bug / wrong config). No → tooling problem (broken parser / tester version mismatch).

### Layer 4: Environment

The most treacherous — looks like black magic, not a bug.

- **Comparison**: same DUT in two environments, diff temperature / humidity / power cleanliness / adjacent equipment.
- **Reproduce**: only counts as a real bug when reproducible 100% in the lab. Otherwise document environmental variables first.
- **Tool-chain re-check**: ATE / extension / package versions (yes, again).
- **Compatibility**: same FW across different hosts / APs / routers / regulatory region codes.

> Field-escalation triage: ask three questions first — (1) how many DUTs affected, (2) does the neighboring test station see it, (3) which build last passed. Any missing answer → send back to factory for retest.

## Debug Mental Model (Pipeline)

```
1. Classify symptom (HW / FW / SW / ENV — which layer?)
2. Freeze versions (OTP / branch / ATE / platform locked)
3. Compare against golden board (same version pass on golden?)
4. Binary search (which commit / component / test item started failing?)
5. Reproduce on demand (only a real bug if triggered on command)
6. Root cause + Mitigation + Prevention
```

When step 5 is stuck, the issue is almost always a **cross-layer interaction** — each layer passes individually, but combination blows up. Return to step 1 and reclassify with "upstream batch" and "downstream platform" both inside the classification tree.

## Key Takeaways

1. NPI bugs are dominantly cross-layer; classification beats deep-dive as the first move.
2. Hardware failures shift root cause from design (caught by review) to **process variation** (SMT, alt-part, laminate) once the design freezes — different debug entry points per phase.
3. The OTP/MCN/variant triple is the cheapest first check for any FW symptom — "wrong part burned in" is the most common false-FW-bug.
4. Distinguish **regression** (full coverage) from **sanity** (minimum acceptance); conflating them masks real failures.
5. ATE issues split cleanly on "is the log readable?" — data vs tooling.
6. Environment-class bugs require reproduction discipline before debug — otherwise they consume engineering time as folklore.

## Cross-References

- [[concepts/hybrid-phased-array]] -> array architecture where RF/SoC debug, calibration drift, and beam-steering errors meet
- [[concepts/rha-radiation-hardening]] -> space qualification workflow for the follow-on radiation-aware debug article
- [[concepts/tid-total-ionizing-dose]] and [[concepts/see-single-event-effects]] -> radiation failure classes that would extend this NPI taxonomy into space silicon

- [[concepts/rf-soc-debug-taxonomy]] — the cross-layer NPI bug taxonomy distilled from this playbook
- [[concepts/evm-calibration]] — RX gain table / TX power table calibration data lives in OTP (Layer 2 sub-bug class)
- [[concepts/zero-if-transmitter]] — LO leakage / IQ imbalance calibrations are the canonical OTP-stored cal data that the playbook protects via MCN# discipline
- [[concepts/aesa]] — phased-array-specific debug (pattern, calibration drift, beam-steering error) is the forthcoming follow-on article
- [[concepts/dpd-digital-predistortion]] — PA linearization coefficients are another class of OTP-resident calibration data

## Follow-on Articles (Author-promised)

- Phased-array-specific debug checklist (pattern measurement, calibration drift, beam steering error) — extending [[concepts/aesa]] / [[concepts/hybrid-phased-array]]
- Radiation-aware debug for space silicon — TID drift and SEU recovery field workflow, extending [[concepts/tid-total-ionizing-dose]] / [[concepts/see-single-event-effects]]
