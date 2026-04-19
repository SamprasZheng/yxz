---
type: concept
tags: [rf-hardware, space, radiation, semiconductor, testing, sram, fpga, mosfet]
---

# SEE — Single Event Effects

A single high-energy particle passing through the sensitive volume of a semiconductor deposits ionized charge along its track; if the collected charge exceeds the **critical charge (Qcrit)**, it triggers a logic upset or destructive failure. Alongside [[concepts/tid-total-ionizing-dose]] (cumulative type), SEE represents one of the two major space radiation threats.

## Triggering Mechanism

```
High-energy particle (heavy ion / proton nuclear reaction product)
    → Traverses sensitive volume (active volume)
    → Ionized charge deposited along particle track
    → Electric field collects charge
    → If collected charge ≥ Qcrit → triggers SEE
```

**Qcrit (Critical Charge)**: Minimum charge required to flip a circuit node; decreases as process node shrinks → advanced processes are more sensitive to SEE.

## Classification

### Soft Errors (Soft Errors) — Recoverable

**SEU (Single Event Upset)**
- A bit in memory is flipped (0→1 or 1→0)
- SRAM cache is most vulnerable: small size, low Qcrit, high-density layout
- Recoverable via ECC (Error Correcting Code) correction or data re-read
- **Real-world case (2025-10-30)**: A JetBlue Airbus aircraft suddenly pitched during flight; Airbus investigation confirmed a bit flip caused by solar radiation/cosmic rays, leading to flight control system malfunction. This demonstrates SEU is not just a space issue — high-altitude aviation also faces this threat.

**SET (Single Event Transient)**
- A particle generates a brief voltage pulse in analog or sequential circuits
- If the pulse is captured by downstream circuits, it can cause erroneous output
- Growing threat in deep-submicron CMOS high-speed logic (faster circuits are more likely to capture brief transient pulses)

**SEFI (Single Event Functional Interrupt)**
- A particle strikes FPGA configuration memory or controller state registers → entire functional state becomes abnormal
- Requires power cycling to recover; cannot be corrected by ECC
- Significant impact on FPGA-intensive satellite systems

### Hard Errors (Hard Errors) — Destructive, Unrecoverable

**SEL (Single Event Latchup)**
- The **parasitic PNPN (SCR) structure** in CMOS devices is triggered by a particle, forming a low-impedance short-circuit path
- Current surges dramatically (can reach tens of mA → ampere level); if power is not immediately cut, the device is destroyed
- **Testing principle: SEL testing should precede SEU testing** — if latchup is discovered, the device is fundamentally unsuitable, saving significant subsequent testing costs
- Mitigation: current limiting circuits, FPGA scrubbing, power switching mechanisms

**SEB (Single Event Burnout)**
- Power MOSFETs enter secondary breakdown (avalanche breakdown) after particle strike
- Irreversible damage; particularly threatening to power management ICs and driver circuits

**SEGR (Single Event Gate Rupture)**
- Gate oxide is broken down by a localized electric field triggered by a particle
- Permanent failure; higher risk in high-voltage applications

## Testing Methods

### Heavy-Ion Accelerator (Preferred)
- Direct ionization, high LET, capable of fully revealing SEU / SEL / SEFI vulnerabilities
- **LBNL BASE (Berkeley Accelerator Space Effects)**: World's first SEE heavy-ion test facility in 1979; provides full range from proton to bismuth; LET > 99 MeV·cm²/mg
- Other major facilities: TRIUMF (Canada), GANIL (France), GSI (Germany)

### Proton Accelerator (Supplementary)
- Proton LET is too low to directly cause SEU/SEL
- Through **nuclear reactions (nuclear elastic scattering)** with high atomic number materials (Au, W, Cu) in the device, generates high-LET secondary ions that indirectly trigger SEE
- Suitable for verifying reliability under orbital proton environment (Van Allen inner belt)

### Core Measurement Parameter: Cross Section

```
Cross section (cm²) = number of upset events / particle fluence (particles/cm²)
```

**SEU rate calculation workflow**:
1. Measure cross section σ vs. LET curve (Weibull fit)
2. Determine device sensitive volume
3. Integrate with mission orbital LET spectrum → obtain on-orbit SEU rate (events/device/day)

## Differences from TID

| | SEE | TID |
|---|---|---|
| Damage characteristics | Instantaneous, single-particle triggered | Cumulative, dose integral |
| Key parameters | LET, cross section, Qcrit | Total dose (krad), dose rate |
| Test tools | Heavy-ion/proton accelerator | Co-60 γ source |
| Primary affected devices | SRAM, FPGA, power MOSFET | All MOS devices, bipolar linear ICs |

## Related

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/rha-radiation-hardening]]
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/orbital-data-center]] — SEU/SEL risk of COTS GPUs is the biggest engineering challenge for ODC
- [[concepts/cots-gpu-radiation-risk]] — H100/Orin specific test data and on-orbit mitigation strategies
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 peak (2024–2026) increases SEU/SEL event rates
