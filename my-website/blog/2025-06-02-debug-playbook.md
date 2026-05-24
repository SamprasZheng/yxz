---
slug: debug
title: "RF / SoC System Debug — A Bug Taxonomy from Hardware to Firmware to ATE"
authors: ["sampras"]
tags: [rf, wifi, phasedarray]
description: A systematic debug checklist for wireless / SoC product engineers — from PCB layer to OTP burn-in, ATE test scripts, and environmental compatibility, with common bug types and root-cause entry points at each layer.
image: /img/og/debug.png
---

Bugs encountered during New Product Introduction (NPI) are eighty percent not the "wrong line of code" variety of pure software problem — they are **cross-layer interactions**: hardware design passes review but SMT variation kills a certain batch; ATE test passes but the system side hits a firmware corner case because of a different profile; everything works in the lab until the customer's environment surfaces a coexistence interference issue.

This post fully documents the checklist I use on Wi-Fi / RF SoC product lines to "classify first, find root cause second." Future cases can be run through this list from the top.

<!-- truncate -->

## Layer 1: Hardware (HW)

### Design Phase
| Item | Common bugs |
|------|---------|
| Symbol / Package / Pin | Footprint errors, pin swap, power/ground routed to wrong layer |
| Schematic | Power sequencing, clock tree, RF matching missing components or incorrect values |
| Simulation | S-parameters not verified, antenna tuning relying solely on simulator results |

🎯 **Entry point**: Before any new production run, use a golden board to do a pin-by-pin check against the BOM + layout and re-run DRC.

### PCB Phase
- Verify CAM output against source (Gerber / ODB++ diff)
- Cross-section to verify laminate structure (dielectric thickness directly affects 50 Ω impedance)
- DRC: trace width, spacing, via-in-pad, differential pair skew
- Separate review for RF / DDR / clock module areas

🎯 **Entry point**: Pull 10 boards from the first production run and do TDR + VNA sweeps against design values. If impedance deviates more than ±10%, stop the line first.

### PCBA Phase
- SMT: reflow oven temperature profile, reflow defects, cold joints, tombstoning
- BOM management: datasheet differences when swapping to alternative parts (especially capacitor ESR, inductor Q)
- Variants: component differences between variants of the same SoC (WiFi-only vs WiFi+BT)

🎯 **Entry point**: BOM diff + X-ray spot check. After any alt-part swap, a full RF certification run is required (not just a sanity check).

### System Integration
- Module-to-module interference: WiFi 2.4G × BT × LTE B40 coexistence is the classic example
- Interconnect: FFC/FPC length, shielding ground loops
- ESD / EMC: only visible at full system level

🎯 **Entry point**: Use a spectrum analyzer to capture out-of-band spurious emissions; correlate to the time axis to identify which subsystem causes them at startup.

## Layer 2: Firmware (FW)

### OTP / SoC Configuration
- OTP version × MCN# (Mask Change Number) × variant mapping
- Register write order (wrong startup sequence corrupts every downstream layer)
- Calibration data: RX gain table, TX power table, antenna switch mapping

🎯 **Entry point**: For every FW issue, first confirm OTP version matches MCN#. **The cheapest root cause is a wrong part burned in.**

### Platform Metadata
- ADB command scripts (Android) or host interface command sequences
- Code builder (compile flags, branch, tag)
- Difference between regression screen and sanity check: regression is **full coverage**, sanity is **minimum acceptance** — do not mix them
- Review stages: define clear boundaries from RTL → FW → FW+SW → system

🎯 **Entry point**: Record all four parameters — "which version, which branch, what config, what flags" — on the bug ticket. If any one is missing, don't start debugging.

## Layer 3: Software / Test (SW / ATE)

### Test Config
- Dialog: the test flow dialogue (DUT ↔ tester interaction)
- Profile: channel, bandwidth, modulation (MCS), antenna combination
- Sequence: Pre-cal → calibration → verification → stress
- Coverage: whether corner cases are covered (low temperature, high temperature, low Vbat)

### Preconditions
- Library dependencies (DLL / .so version from ATE vendor)
- Config file paths (local vs. network)
- Version compatibility table between tester firmware and DUT firmware

### ATE Itself
- Scripts (Python / TCL / C#)
- Extension / plug-in version match with tester SDK
- Package management (especially when multiple lines share a tester)

### Data Review
- Parser: raw log → structured data
- Visualize: boxplot, yield map, wafer map
- KPI: yield, Cpk, outlier distribution

🎯 **Entry point**: For all ATE issues, first ask "is the log readable?" If yes, it's a data problem (script bug, wrong config). If no, it's a tooling problem (broken parser, tester version mismatch).

## Layer 4: Environment

This layer is the most treacherous, because it **looks like black magic, not a bug**.

| Category | Action |
|------|------|
| Comparison | Run the same DUT in two environments and diff the difference (temperature, humidity, power cleanliness, adjacent equipment) |
| Reproduce | The bug is only real once you can reproduce it 100% in the lab. If you can't reproduce it, document the environmental variables first |
| ATE / extension / package | Check the tool chain versions again (yes, again) |
| Compatibility | Same firmware on different hosts, different APs/Routers, different country regulatory region codes |

🎯 **Entry point**: When an escalation arrives from the field, ask three questions first — (1) how many DUTs are affected, (2) does the neighboring test station see it, (3) which build last passed. If any answer is missing, send it back for retesting at the factory.

## The Debug Mental Model

In practice I run this flow:

```
 1. Classify the symptom (HW / FW / SW / ENV — which layer?)
         ↓
 2. Freeze versions (locked config: OTP / branch / ATE / platform)
         ↓
 3. Compare against golden (does the same version pass on a golden board?)
         ↓
 4. Binary search (which commit / which component / which test item started failing?)
         ↓
 5. Reproduce on demand (only counts as a real bug if you can trigger it on command)
         ↓
 6. Root cause + Mitigation + Prevention
```

When step 5 is stuck, the issue is usually a **cross-layer interaction**: each layer passes individually, but they blow up in combination. Go back to step 1, reclassify — this time put "upstream batch" and "downstream platform" into the classification tree together.

## Next Steps

This checklist will expand into two further articles:

- **Phased-array-specific debug checklist** (pattern measurement, calibration drift, beam steering error) — follow-on to [Phased Arrays: From WWII Radar to LEO Satellites](/blog/PA)
- **Radiation-aware debug for space silicon** — follow-on to [Radiation Test Playbook](/blog/radtest), adding a field debug workflow for TID drift and SEU recovery
