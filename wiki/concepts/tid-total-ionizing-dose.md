---
type: concept
tags: [rf-hardware, space, radiation, semiconductor, testing, mil-std]
---

# TID — Total Ionizing Dose

**Cumulative damage** caused by space radiation to semiconductors; one of the fundamental qualification items for satellite component reliability. Alongside [[concepts/see-single-event-effects]] (transient type), TID represents one of the two major space radiation threats.

## Damage Mechanism

High-energy photons or charged particles passing through the **SiO₂ oxide layer** of a device generate electron-hole pairs. Electrons move quickly and can escape, but **holes move slowly** and are easily trapped by defect sites in the oxide layer, forming fixed positive charges.

Long-term cumulative effects:
- **MOSFET**: threshold voltage (Vth) shift (negative in N-MOS, positive in P-MOS)
- **Analog/linear circuits**: gain reduction, bias current drift
- **Bipolar devices**: current gain (hFE) degradation; special ELDR effect (see below)
- **Interface state generation**: defects at the oxide-silicon interface → reduced carrier mobility, increased 1/f noise

## Dose Units

- **rad(Si)**: absorbed dose in silicon material, 1 rad = 0.01 J/kg
- **krad(Si)**: common engineering unit; typical LEO mission lifetime dose: 20–100 krad(Si) (depending on altitude, inclination, and shielding thickness)

## Standard Test Method: Co-60 γ Source (MIL-STD-883 TM1019)

| Parameter | Specification |
|---|---|
| Radiation source | Co-60; γ-ray energies 1.172 / 1.332 MeV |
| Half-life | 5.3 years (requires periodic activity calibration) |
| Advantages | γ-rays have strong penetration, uniformly irradiating the entire device; fixture material has minimal effect on the radiation field |
| Dose rate (HDR) | Max ~150 rad(Si)/s |
| Measurement uncertainty | ≤3% |
| Applicable standards | MIL-STD-883 TM1019, MIL-STD-750 TM1019 |

## ELDR Effect (Enhanced Low Dose Rate Sensitivity)

A special trap for bipolar linear circuits:

> Under **low dose rate (ELDR)** conditions, TID degradation of bipolar devices can be **more severe than at high dose rates**.

Cause: at low dose rates, more time is available for oxide holes to diffuse to the Si/SiO₂ interface and be trapped, creating more interface states.

**Testing implication**: Testing only at accelerated high dose rates (HDR) is insufficient; mission-equivalent dose rate (typically 0.01–10 mrad(Si)/s) ELDR testing must be performed. This is critical for linear ICs, op-amps, and comparators in space missions.

## Radiation Design Margin (RDM)

See [[concepts/rha-radiation-hardening]]

## Differences from SEE

| | TID | SEE |
|---|---|---|
| Damage type | Cumulative | Instantaneous |
| Triggering particles | Any ionizing radiation (dose integral) | Single high-energy particle |
| Recoverability | Irreversible (cumulative) | Partially recoverable (SEU/SEFI); partially irreversible (SEL/SEGR) |
| Primary test source | Co-60 γ | Heavy-ion accelerator, proton accelerator |

## Related

- [[concepts/see-single-event-effects]]
- [[concepts/rha-radiation-hardening]]
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/leo-value-chain]] — TID qualification is the threshold for entering constellation supply chains
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 peak (2024–2026) drives LEO mission TID doses beyond historical model baselines; RDM safety margins should be increased
