---
slug: debug
title: "RF / SoC Debug Playbook — A Bug Taxonomy from Hardware to ATE"
authors: ["sampras"]
tags: [rf, wifi, phasedarray]
description: "A systematic debug checklist for wireless/SoC product engineers — from PCB layer to OTP programming, ATE test scripts, and environmental compatibility, covering common bug types and root-cause entry points at every layer."
image: /img/og/debug.png
---

Bugs in NPI (New Product Introduction) are rarely a pure "typo on line N" software issue — eight out of ten are **cross-layer interactions**: hardware design passes but SMT variation breaks a batch; ATE passes but the system hits a firmware corner case due to a different profile; works fine in the lab but coexistence interference surfaces only in the customer's environment.

This post writes out the checklist I use on Wi-Fi / RF SoC product lines to "classify first, then find root cause" — so any new case can be screened systematically.



:::info 📺 影片版 TLDR
<iframe
  width="100%"
  style={{aspectRatio: '16/9'}}
  src="https://www.youtube.com/embed/356hMg9Vdr8"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
/>
:::

<!-- truncate -->

## Layer 1: Hardware (HW)

### Design Phase
| Item | Common bugs |
|------|------------|
| Symbol / Package / Pin | Wrong footprint, pin swap, power/ground routed to wrong layer |
| Schematic | Power sequence, clock tree, RF matching — missing components or misuse |
| Simulation | S-parameters not verified, antenna tuning based on simulator results only |

🎯 **Entry point:** Before any new production run, use a golden board to cross-check every pin against BOM + layout, then run DRC one more time.

### PCB Phase
- CAM output vs. original (Gerber / ODB++ diff)
- Cross-section to verify stackup (dielectric thickness directly affects 50 Ω impedance)
- DRC: trace width, spacing, via-in-pad, differential pair skew
- Review RF / DDR / clock regions separately

🎯 **Entry point:** Pull 10 boards from the first production run, run TDR and VNA sweep, compare against design targets. Impedance deviation > ±10%: stop the line.

### PCBA Phase
- SMT: oven temperature profile, reflow defects, cold solder joints, tombstoning
- BOM management: datasheet differences when switching to alternate parts (especially capacitor ESR, inductor Q)
- Variants: component differences across SoC variants (Wi-Fi-only vs. Wi-Fi+BT)

🎯 **Entry point:** BOM diff + X-ray spot check. Alternate part changes require a full RF certification run — not just sanity.

### System Integration
- Module-to-module interference: Wi-Fi 2.4 GHz × BT × LTE Band 40 coexistence is a classic
- Interconnect: FFC/FPC length, shield ground loops
- ESD / EMC: only visible at the full-system level

🎯 **Entry point:** Use a spectrum analyzer to capture out-of-band spurious emissions — correlate to the timeline to identify which subsystem is active at the time.

## Layer 2: Firmware (FW)

### OTP / SoC Configuration
- OTP version × MCN# (Mask Change Number) × variant cross-reference
- Register write order (wrong startup sequence corrupts every downstream layer)
- Calibration data: RX gain table, TX power table, antenna switch mapping

🎯 **Entry point:** For every FW issue, first confirm OTP version matches MCN#. **The cheapest root cause is always wrong parts.**

### Platform Meta
- ADB command scripts (Android) or host interface command sequence
- Code builder: compile flags, branch, tag
- Regression vs. sanity: regression is **full coverage**, sanity is **minimum viable pass** — never conflate them
- Review stages: RTL → FW → FW+SW → system — know the boundaries

🎯 **Entry point:** Record four parameters on every bug ticket — version, branch, config, flags. If any one is missing, don't debug yet.

## Layer 3: Software / Test (SW / ATE)

### Test Config
- Dialog: test flow dialogue (DUT ↔ tester interaction)
- Profile: channel, bandwidth, modulation (MCS), antenna combo
- Sequence: pre-cal → calibration → verification → stress
- Coverage: are corner cases covered? (low temp, high temp, low Vbat)

### Prerequisites
- Library dependencies (DLL / .so versions from ATE vendor)
- Config file paths (local vs. network)
- Tester firmware × DUT firmware compatibility matrix

### ATE Platform
- Script (Python / TCL / C#)
- Extension / plug-in compatibility with tester SDK version
- Package management (especially when multiple product lines share a tester)

### Data Review
- Parser: raw log → structured data
- Visualize: boxplot, yield map, wafer map
- KPI: yield, Cpk, outlier distribution

🎯 **Entry point:** For every ATE issue, first ask "can I read the log?" If yes → data problem (script bug, wrong config). If no → tooling problem (broken parser, tester version mismatch).

## Layer 4: Environment

This layer is the trickiest because **it looks like voodoo, not a bug.**

| Category | Action |
|---------|--------|
| Comparison | Run the same DUT in two environments and diff the result (temperature, humidity, power supply cleanliness, adjacent equipment) |
| Reproduce | You don't have a bug until you can reproduce it 100% in the lab. Can't reproduce? Document all environment variables first. |
| ATE / extension / package | Check the toolchain versions again. Yes, again. |
| Compatibility | Same firmware, different host / AP-router / country region code |

🎯 **Entry point:** For on-site escalations, ask three things first — (1) how many DUTs are affected, (2) does the adjacent test station show it, (3) what was the last passing build. If any answer is unknown, send it back for in-factory retest.

## The Debug Mental Model

In practice, I run this flow:

```
 1. Classify the symptom (HW / FW / SW / ENV — which layer?)
         ↓
 2. Lock the version (frozen config: OTP / branch / ATE / platform)
         ↓
 3. Compare against golden (does the same config pass on a golden board?)
         ↓
 4. Bisect (which commit / which part / which test item started failing?)
         ↓
 5. Reproduce on demand (it's not a real bug until you can trigger it with a button)
         ↓
 6. Root cause + Mitigation + Prevention
```

When step 5 is stuck, it's usually a **cross-layer problem**: each layer passes individually but fails combined. Go back to step 1, reclassify — this time put "upstream batch" and "downstream platform" both into the classification tree.

## What's Next

This checklist will branch into two follow-up posts:

- **Phased-array-specific debug checklist** (pattern measurement, calibration drift, beam steering error) — following on from [Phased Arrays](/blog/PA)
- **Radiation-aware debug for space silicon** — following on from [Radiation Test Playbook](/blog/radtest), adding TID drift / SEU recovery field debug flows
