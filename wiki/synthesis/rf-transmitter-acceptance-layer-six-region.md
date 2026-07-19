---
type: synthesis
tags: [rf, transmitter, evm, calibration, dpd, data-converter, transceiver, test-and-measurement, six-region, acceptance-gate, leo, satcom]
sources:
  - "[[sources/hsieh-xband-leo-transmitter-2020]]"
concepts:
  - "[[concepts/zero-if-transmitter]]"
  - "[[concepts/evm-calibration]]"
  - "[[concepts/dpd-digital-predistortion]]"
---

# RF Transmitter Acceptance Layer — Six-Region Map

**Question this answers:** A phased-array RF front-end can be *fabricated* by many regions ([[synthesis/phased-array-rf-frontend-supply-chain]] maps the beamformer-IC → GaN-PA → module → array → space-grade *analog* stack). But a transmitter does not *ship* until a measured constellation clears a spec-defined **EVM ceiling**. That certification depends on a different, narrower tier of IP: the **mixed-signal transceiver / data-converter IC** the chain is built around, the **digital-front-end (DFE) / [[concepts/dpd-digital-predistortion|DPD]] IP** that linearizes it, and the **test-and-measurement (T&M) instrument** that measures the error vector. This page maps *who owns each of those three sub-layers by region* — the "who can independently **certify** a high-order-QAM/APSK transmitter" question — and why it is a strictly harder gate than "who can fab the atoms."

This is the **mixed-signal-and-verification companion** to [[synthesis/phased-array-rf-frontend-supply-chain]] (which owns the analog front-end) and the system-level [[synthesis/leo-taiwan-odc-gap]]. The three concept pages it unifies — [[concepts/zero-if-transmitter]], [[concepts/evm-calibration]], [[concepts/dpd-digital-predistortion]] — each carry one sub-layer's six-region table; this synthesis welds them into one acceptance-gate view.

## The acceptance gate — EVM as the ship/no-ship number

EVM ([[concepts/evm-calibration]]) is the single number that licenses a radio to carry a given modulation order. The ceilings are standardized and tighten monotonically with constellation density — **3GPP TS 38.104 Table 6.5.2.2-1 (5G NR base station)**, identical to the long-standing TS 36.104 (LTE) values (verified 2026-07-19):

| Modulation | EVM ceiling | What it demands of the acceptance layer |
|---|---|---|
| QPSK | **17.5%** | coarse [[concepts/zero-if-transmitter|LO-leakage/IQ]] calibration sufficient |
| 16-QAM | **12.5%** | |
| 64-QAM | **8%** | DPD begins to matter |
| 256-QAM | **3.5%** | LO leakage / IQ imbalance / DPD all first-order; PA runs ~8–10 dB below P1dB back-off |
| 1024-QAM | ~2% (not yet a ratified 3GPP BS limit; used in practice/proposals) | calibration-and-converter-limited regime |

Satellite APSK (DVB-S2X; e.g. 16APSK measured at 8% on [[sources/hsieh-xband-leo-transmitter-2020]]) sits on the same risk curve. The structural point: **each step up in modulation order transfers the binding constraint from the analog front-end onto this acceptance layer.** A region that fabs a clean PA but cannot independently *measure* 3.5% EVM cannot license its own 256-QAM/high-APSK product — it must send the part abroad to be certified. Certification, not fabrication, is the sovereignty question.

## The three sub-layers of the acceptance gate

| Sub-layer | What it is | Chokepoint character |
|---|---|---|
| **A. Transceiver / data-converter IC** | The quadrature transceiver ([[concepts/zero-if-transmitter|zero-IF]]) or RF-sampling ADC/DAC the chain is built around | Mixed-signal design-IP heavy; a handful of merchant vendors |
| **B. DFE / DPD IP** | The digital-front-end block (DPD + crest-factor reduction + digital up/down-conversion) that linearizes the PA so it clears EVM/spectral-mask ([[concepts/dpd-digital-predistortion]]) | Standard-essential patents + DFE silicon; US/EU concentrated |
| **C. T&M instrument** | The VSA / signal analyzer that *measures* the error vector and issues the pass/fail | The narrowest tier — three vendors hold >50% of the merchant market |

The migration between sub-layer A's two options is itself dated: the analog/digital boundary is moving toward the antenna. **Zero-IF** needs only a baseband-rate DAC + low-pass filter but must calibrate LO leakage and IQ imbalance; **direct-RF sampling** (e.g. AMD/Xilinx Zynq UltraScale+ RFSoC Gen 3: eight 14-bit DACs at 10 GSPS / eight 14-bit ADCs at 5 GSPS; RF-DAC NSD ~−160 dBm/Hz, RF-ADC ~−153 dBm/Hz at 3.5 GHz; verified 2026-07-19) removes the analog mixer entirely — and with it LO leakage and IQ imbalance are *structurally absent* — at the cost of multi-GSPS converter power and a calibration burden that shifts to **converter linearity (spurs/SFDR) and clock jitter**. Zero-IF remains the cost optimum for dense consumer/LEO arrays; direct-RF wins where wideband/multi-band/fully-digital beamforming justifies the watts.

## Six-region map — who owns the acceptance layer

| Region | A. Transceiver / converter IC | B. DFE / DPD IP | C. T&M instrument | Net acceptance-layer position |
|---|---|---|---|---|
| **US** | **Leads** — Analog Devices (transceivers + RF-sampling ADC/DAC), AMD/Xilinx (RFSoC), TI, Broadcom | **Leads** — ADI (ADRV904x integrated DFE), Broadcom (*BroadPeak* 5 nm 6G DFE, 19.6 GS/s, announced 2026), AMD/Xilinx DPD IP | **Co-leads** — Keysight (89600 VSA, Infiniium), Tektronix | **Only region owning all three** — can self-certify end-to-end |
| **Europe** | Mixed-signal — NXP (NL), STMicro, Infineon (front-end/GaN) | **Leads on patents** — Ericsson (largest DPD patent portfolio), Nokia, NXP/Infineon | **Co-leads** — Rohde & Schwarz (the 5G/6G modulation-analysis reference) | Owns B + C; leans on US for the RF-sampling converter tier |
| **Japan** | Strong converter/module — Renesas (ex-Intersil/IDT), Sony (CMOS converters), Murata | O-RAN radio-unit DPD — Fujitsu (*1FINITY*), NTT DOCOMO, NEC | **Strong** — Anritsu, Advantest (ATE) | Owns C + fielded-DPD; merchant transceiver tier thinner than US |
| **Korea** | Captive RFIC (Samsung in-house); merchant transceivers thin | RFHIC (GaN + MaxLinear DPD), Samsung (vRAN DFE) | **Imported** — no merchant high-end VSA vendor | Owns B for its own radios; **cannot self-supply the instrument (C)** |
| **China** | Fast-rising merchant RF (Maxscend 卓胜微, Vanchip); converter tier still trails ADI/TI | **Sovereign-integrated but sanction-isolated** — Huawei/ZTE fold DPD into own mMIMO ASICs | Rising domestic (RIGOL, Ceyear 中电科思仪); **high-end VSA still largely imported** | Building all three under sanction pressure; closed, export-constrained; high-end C the last gap |
| **Taiwan** | **Upstream-strong, space-grade-absent** — MediaTek/Richwave (handset/Wi-Fi transceivers); no sovereign space-grade RF-sampling converter | Emerging — MediaTek DNN-PA research; owns the [[entities/win-semiconductors|GaN PA]] that DPD corrects, not the DFE/DPD IP | **Imported** — relies on Keysight / R&S / Anritsu | **Owns none of the three** — fabs the atoms, imports every layer that *certifies* them |

**Market anchor for the instrument chokepoint (C):** Keysight + Rohde & Schwarz + Anritsu hold **>50%** of the merchant vector-signal-analysis market (≈**$422.9M in 2025**, ~7.1% CAGR to 2033; Keysight ~27% / R&S ~19% of the adjacent VNA volume). Sub-layer C is deliberately the last column because it is the narrowest and least substitutable: calibration *know-how* (the LO-leakage ternary search, the IQ pre-distortion matrix, GMP/NN-DPD identification) is **portable IP that travels in a person's head**; the instrument that measures whether the calibration worked is a capital good only three firms make well.

## Where Taiwan (and Korea) sit — the honest read

Taiwan and Korea fab and assemble RF at world scale but sit *below* the acceptance layer on all three sub-columns to differing degrees. Taiwan is the sharper case: it owns the [[entities/win-semiconductors|GaN/GaAs foundry]] (front-end Layer 2 in [[synthesis/phased-array-rf-frontend-supply-chain]]) and the LEO passives/PCB ([[entities/ascend-tech]], [[entities/huatong-pcb]]) — but **no sovereign space-grade transceiver/converter IP (A), no DFE/DPD product line (B), and no domestic high-end VSA (C)**. This is the *exact same shape* as [[synthesis/leo-taiwan-odc-gap]] and the front-end map, now proven one more layer out: the value and the sovereignty sit in the **mixed-signal + verification** tier, one step up from where Taiwan plays. The optimistic corollary: the calibration/linearization discipline captured on [[concepts/evm-calibration]] and [[concepts/zero-if-transmitter]] is *exactly* the portable system-integration IP the midstream gap leaves on the table — it is learnable without a fab, and it is the cheapest layer for Taiwan to climb into.

## 100-year structural view (labeled scenario, not fact)

Two invariants bound the long horizon:

1. **The analog/digital boundary migrates toward the antenna, but calibration never disappears — only its substrate changes.** Heterodyne → zero-IF → direct-RF sampling → per-element direct-digital → (late-century) photonic/optically-clocked converters. At each step the *named* defect changes (image rejection → LO leakage/IQ imbalance → converter spurs/clock jitter → device-level linearity), but a correction layer is always required, because **any amplifier near saturation is nonlinear and any converter has finite linearity**. Linearization is a permanent tax on physics ([[concepts/dpd-digital-predistortion]]), steadily consuming more of the same silicon/compute budget that runs everything else on the node — the RF↔AI-compute convergence.

2. **Certification authority is stickier than fabrication authority.** Fabs diffuse (China is closing sub-layer A/B under sanction pressure within a decade); the standardized *measurement* of quality — the T&M instrument tier (C) and the standards bodies (3GPP, ITU) that set the ceilings — concentrates and persists. Over a century, the region that fabs the chip may rotate; the region that owns the instrument and the ceiling changes far more slowly.

## Falsifiability / what would change this read

- If a Taiwanese fabless house ships a competitive space-grade RF-sampling converter or SATCOM transceiver at volume → the "A absent" claim falsifies; watch MediaTek/Richwave space-grade roadmaps and Win Semi foundry customers.
- If Ceyear (or another China vendor) fields a high-end VSA that qualifies 256-QAM/1024-QAM at merchant scale → the "high-end C still imported" claim for China falsifies, and the three-vendor >50% instrument concentration begins to erode.
- If direct-RF sampling displaces zero-IF in dense LEO consumer arrays (converter power-per-GSPS falls enough) → sub-layer A's "zero-IF is the cost optimum" framing shifts, and LO-leakage/IQ calibration fades as a discipline faster than projected.
- If online/in-orbit NN-DPD ([[concepts/dpd-digital-predistortion]] forward trajectory) makes linearization a live model retrained on-node → the factory-calibration-table paradigm ([[concepts/rf-soc-debug-taxonomy|OTP/MCN-managed]]) is superseded, moving sub-layer B's value from IP-at-manufacture to compute-at-operate.

## Cross-links

- Sub-layer concept pages (each carries its own six-region table): [[concepts/zero-if-transmitter]] (A — transceiver/converter), [[concepts/evm-calibration]] (C — the EVM gate + T&M tier), [[concepts/dpd-digital-predistortion]] (B — DFE/DPD IP)
- Analog-front-end companion: [[synthesis/phased-array-rf-frontend-supply-chain]] (beamformer-IC → GaN-PA → module → array → space-grade)
- System-level parent pattern: [[synthesis/leo-taiwan-odc-gap]] ("strong upstream, absent midstream")
- Architecture context: [[concepts/aesa]], [[concepts/hybrid-phased-array]], [[concepts/leo-value-chain]]
- Measured reference system: [[sources/hsieh-xband-leo-transmitter-2020]] (LO calibration −10 dB → pass; 16APSK EVM 8%)
- NPI discipline for calibration tables: [[concepts/rf-soc-debug-taxonomy]]
