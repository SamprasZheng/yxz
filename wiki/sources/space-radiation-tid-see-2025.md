---
type: source
title: "In-Depth Analysis of Space Radiation Environments: TID, SEE, and RHA Radiation Hardening Assurance"
author: user-provided synthesis
date: 2026-04-19
ingested: 2026-04-19
tags: [rf-hardware, space, radiation, tid, see, rha, cots, taiwan, leo]
---

# In-Depth Analysis of Space Radiation Environments: TID, SEE, and RHA

User-provided systematic technical analysis covering the three major sources of space radiation, TID cumulative damage mechanisms, SEE transient effect classifications, test facilities and methods, and RHA challenges for commercial COTS components. Key conclusion: radiation testing and certification is the hidden threshold for Taiwan's LEO supply chain to enter formal constellation supply chains.

---

## I. Three Major Radiation Sources

| Source | Characteristics | Primary Threats |
|---|---|---|
| **GCR (Galactic Cosmic Rays)** | Supernova-accelerated high-energy heavy particles; extremely high energy, nearly impossible to shield | SEE (heavy particle direct ionization) |
| **Van Allen Belt Trapped Particles** | Inner belt protons are the most important SEU source for LEO; SAA (South Atlantic Anomaly) is a recessed high-exposure zone | TID accumulation + SEE |
| **Solar Particle Events (SPE)** | Explosive, high dose rate; greatest threat for deep-space missions | TID peak + SEL risk |

---

## II. TID (Total Ionizing Dose)

See [[concepts/tid-total-ionizing-dose]]

Core mechanism: high-energy photons/particles pass through the SiO₂ oxide layer, generating electron-hole pairs; holes are trapped at defects → threshold voltage drift, increased leakage current, reduced analog component gain.

**Co-60 γ source** is the standard test choice (1.172 / 1.332 MeV γ ray; half-life 5.3 years; HDR maximum 150 rad(Si)/s; measurement uncertainty <3%; MIL-STD-883 TM1019 compliant).

**ELDR (Enhanced Low Dose Rate) effect**: bipolar devices may degrade more severely at low dose rates than at high dose rates → cannot rely solely on accelerated HDR testing; must conduct mission-equivalent ELDR testing.

---

## III. SEE (Single-Event Effects) Classification

See [[concepts/see-single-event-effects]]

### Soft Errors (Recoverable)

| Type | Full Name | Mechanism | Notes |
|---|---|---|---|
| **SEU** | Single Event Upset | Particle flips a memory bit | SRAM caches most vulnerable (small size, low Qcrit) |
| **SET** | Single Event Transient | Particle generates voltage pulse in analog/timing circuits | Threat increases in deep sub-micron CMOS high-speed logic |
| **SEFI** | Single Event Functional Interrupt | Strikes FPGA configuration memory → functional abnormality | Requires power reset to recover |

**Real-world case (2025-10-30)**: A JetBlue aircraft suddenly plunged during flight; Airbus investigation confirmed intense solar radiation/cosmic rays caused a bit flip leading to flight control system malfunction.

### Hard Errors (Destructive, Unrecoverable)

| Type | Full Name | Mechanism |
|---|---|---|
| **SEL** | Single Event Latchup | CMOS parasitic PNPN structure triggers low-impedance short circuit → current surge → burnout (requires immediate power cut) |
| **SEB** | Single Event Burnout | Power MOSFET secondary breakdown → irreversible damage |
| **SEGR** | Single Event Gate Rupture | Gate oxide breakdown → permanent failure |

**Test sequence principle**: SEL testing should precede SEU testing — if a device latches up, it is not applicable and subsequent test resources need not be wasted.

---

## IV. SEE Test Facilities and Methods

**Heavy ions preferred**: far greater ionization capability than protons; directly reveals device SEE vulnerabilities.

**LBNL BASE (Berkeley Accelerator Space Effects)**: world's first SEE heavy ion test site in 1979; provides full range from proton to bismuth; LET can exceed 99 MeV·cm²/mg.

**Core measurement parameter: Cross Section**
- Definition: number of upset events ÷ particle fluence; units cm²
- SEU rate calculation: measure cross-section vs. LET curve → determine sensitive volume → integrate with orbital LET spectrum

**Indirect effects of protons**: proton LET is too low to directly cause SEU; triggers SEE indirectly through nuclear reactions with high-Z materials producing high-LET secondary ions.

---

## V. RHA Radiation Hardening Assurance × COTS Challenges

See [[concepts/rha-radiation-hardening]]

**Radiation Design Margin (RDM)**:
- Formula: RDM = device failure dose / mission expected accumulated dose
- General mission requirement: RDM ≥ 1.5 (50% safety margin)
- Deep-space mission requirement: RDM ≥ 2.0

**Hidden threshold for Taiwan's LEO supply chain**:
No matter how good the hardware design, without complete TID / SEE validation, entry into formal constellation supply chains (SpaceX, Amazon Kuiper, etc.) is impossible. Very few institutions globally have complete testing capability — a highly monopolized critical node.

**Emerging alternative test sources**: ⁹⁰Sr/⁹⁰Y electron sources are being evaluated (advantages: directional irradiation; simplified equipment; special advantages for FPGA testing at <28 nm nodes).

---

## Concept Pages

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/rha-radiation-hardening]]

## Related Entities

- [[entities/win-semiconductors]] — GaAs PA, requires TID validation
- [[entities/ascend-tech]] — filters/waveguides, LEO spec requires radiation testing
- [[concepts/leo-value-chain]] — radiation testing certification is the hidden threshold for entering midstream A
- [[concepts/orbital-data-center]] — COTS GPU radiation protection is the biggest engineering challenge
