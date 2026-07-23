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

## Technology Scaling — Why Smaller Nodes Do Not Simply Help (拉高維度 / 加深探究)

A common misconception is that TID gets monotonically worse as processes shrink. The mechanism is the opposite, and the truth is a **two-oxide story**:

- **Gate oxide — scaling *helps***. Below ~10–12 nm the gate oxide becomes too thin to retain trapped holes: tunnelling neutralises the trapped charge, so the gate-oxide contribution to Vth shift collapses. First shown by N. Saks et al. (1984, 1986). Modern sub-5 nm gate stacks are essentially TID-immune *at the gate*.
- **Isolation oxide (STI) — scaling *hurts***. The **shallow-trench-isolation (STI)** field oxide that separates transistors does **not** scale with the gate. It stays thick, traps charge, and becomes the **dominant** TID failure path — radiation-induced positive charge in the STI opens a parasitic edge/sidewall leakage path that raises **off-state and standby current** (NMOS especially). STI is the most TID-susceptible oxide of its thickness class.
- **Net effect**: TID, thought to be "solved" by thin gate oxides, **re-emerged at the 22 nm / 14 nm FinFET and UTBB-SOI nodes** because of the large number of STI/fin interfaces. The binding TID metric in advanced CMOS is *leakage*, not threshold drift.

This is the inverse of [[concepts/see-single-event-effects|SEE]], where scaling lowers Qcrit and makes things *worse* — the two threats pull in opposite directions as nodes shrink (see SEE page's scaling section). Sources: [TID effects on isolation oxides in modern CMOS (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S0168583X07006696), [TID in STI oxides (ResearchGate)](https://www.researchgate.net/publication/222014143_Total_ionizing_dose_effects_in_shallow_trench_isolation_oxides).

## Historical Lineage & 100-Year View (拉長時間軸)

| Era | Milestone | Why it mattered |
|---|---|---|
| **1962** | **Starfish Prime** (1962-07-09, ~400 km, 1.4 Mt) injected ~10²⁹ electrons → an **artificial radiation belt** that killed **Telstar 1, Ariel 1, TRAAC, Transit 4B, Injun I, Kosmos 5** within months (Telstar failed 1963-02-21) | First mass demonstration that the space radiation environment destroys electronics; **birth of the radiation-effects discipline** |
| **1960s–70s** | MOS oxide trapped-charge model worked out; Co-60 γ adopted as the screening source | Gave the mechanism (hole trapping) and the test method |
| **1968→** | **MIL-STD-883** established (Method 1019 = ionizing-dose procedure) | US DoD becomes the standards author (see six-region below) |
| **1991** | **ELDRS** discovered in bipolar linear parts (Enlow, Pease, Schrimpf et al., BCTM 1991) | Broke the "test fast = conservative" assumption; forced low-dose-rate testing |
| **1984–2010s** | Thin-gate-oxide TID immunity (Saks) → STI re-emergence at FinFET nodes | The scaling story above |
| **2024–26** | Solar Cycle 25 peak raises LEO baselines; COTS-in-space explosion ([[concepts/cots-gpu-radiation-risk]]) | Demand for dose budgeting surges as NewSpace flies un-hardened parts |

**100-year structural view (labelled scenario, not fact):** TID is **astrophysically permanent** — trapped-belt electrons/protons and GCR are set by the Sun and the geomagnetic field, not by technology, so the dose environment never "closes." What *changes* is the device side: as logic migrates to ever-thinner gate stacks the gate becomes irrelevant and the entire TID fight concentrates in **isolation/back-end oxides and packaging**. A century out, the invariant is that **every device flown above the atmosphere pays a cumulative-dose toll**, and the qualification methodology survives even as the failing structure moves from gate → STI → 3D-stack interfaces. This mirrors the "qualification toll booth never closes" thesis of [[synthesis/radiation-test-rad-hard-six-region]].

## Standards Authorship & Rad-Hard Approach — Six-Region (台美日韓中國歐洲)

The geographic axis for TID is **not** test-lab capacity (that is mapped on [[concepts/rha-radiation-hardening]] + [[synthesis/radiation-test-rad-hard-six-region]]) but **who authors the test standards and owns the rad-hard design/process IP** — a different, less-duplicated layer:

| Region | TID / SEE standards authored | Rad-hard part & process IP | Role |
|---|---|---|---|
| **US** | **MIL-STD-883 TM1019** (microcircuit TID), **MIL-STD-750 TM1019** (discrete), **ASTM F1892** (TID), **JEDEC JESD57** + **ASTM F1192** (SEE) | BAE (RAD750/RAD5545), Microchip/Microsemi, Renesas-Intersil (US ops, traces to *Radiation, Inc.* 1950), VORAGO (HARDSIL RHBP), Apogee | **Primary standards author** + deepest rad-hard supply |
| **Europe** | **ESA/ESCC 22900** (TID steady-state), **ESCC 25100** (SEE), **ECSS-Q-ST-60-15C** (RHA process standard) | STMicro, Infineon, Teledyne e2v (UK), 3D Plus (FR) | **Co-primary author** via ESA; ESA-anchored supply |
| **Japan** | JAXA standards, largely harmonised to MIL/ESCC | Renesas (heritage rad-hard analog) | Adapter + niche supplier |
| **China** | **GJB (国军标)** sovereign military standards (parallel, sanction-driven) | Domestic-only rad-hard (export controls forced indigenisation; historically lags Western CPU/DSP) | **Sovereign-parallel** authorship |
| **Korea** | Adopts MIL/ESCC | Largely absent | Adopter |
| **Taiwan** | Adopts MIL/ESCC — **no sovereign radiation standard** | ❌ Absent (foundry-strong upstream, but no rad-hard IC line) | **Adopter** — the standards-layer instance of the recurring upstream-strong/midstream-absent signature ([[synthesis/leo-taiwan-odc-gap]]) |

**Rad-hard *by design* (RHBD) vs *by process* (RHBP):** RHBD hardens via layout libraries (enclosed-layout transistors, guard rings, TMR) on a *standard* commercial foundry — cheaper, scalable, the NewSpace default; RHBP uses a *special* process (SOI, epitaxial, HARDSIL) — more robust, more expensive. **Market split (fact-check, accessed 2026-07-23):** the two techniques are near-parity and the crossover year is analyst-contested — one house still has **RHBP ahead at ~54.5% (2025)**, another projects **RHBD taking ~52% (2026)** with the higher long-run CAGR; all agree RHBD is the *rising* share because it rides commodity nodes and the NewSpace cost curve. The overall rad-hard-electronics market is ≈**$1.77B (2025) → ~$2.30B (2030)**, ~5.4% CAGR, space the largest end-use (~58%). The RHBD tilt ties directly back to the COTS-upscreening economics on [[concepts/rha-radiation-hardening]]. Sources: [VORAGO RHBD vs RHBP](https://www.voragotech.com/blog/rhbd-vs-hardsil), [MarketsandMarkets rad-hard electronics](https://www.marketsandmarkets.com/Market-Reports/radiation-hardened-electronics-market-44047967.html), [JESD57 test standard (NASA NTRS)](https://ntrs.nasa.gov/api/citations/20160014892/downloads/20160014892.pdf), [Starfish Prime / List of artificial radiation belts (Wikipedia)](https://en.wikipedia.org/wiki/List_of_artificial_radiation_belts).

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
- [[concepts/orbit-dose-budgeting]] — closed-form TID dose-vs-shielding calculator for trade studies
- [[sources/space-radiation-tid-see-2025]]
- [[sources/radtest-playbook-sampras-2021]] — practical TID screening as step 2 of the engineer's playbook
- [[concepts/leo-value-chain]] — TID qualification is the threshold for entering constellation supply chains
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 peak (2024–2026) drives LEO mission TID doses beyond historical model baselines; RDM safety margins should be increased
- [[synthesis/radiation-test-rad-hard-six-region]] — Co-60 TID is the *least* geographically scarce test mode (Taiwan has it via INER; every region does); heavy-ion SEE is the bottleneck, not TID; companion to the standards-authorship six-region table above
- [[concepts/cots-gpu-radiation-risk]] — applied TID case (H100/Orin), the COTS-in-space driver behind the 2024–26 demand surge
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan adopts but does not author radiation standards: the standards-layer instance of the upstream-strong/midstream-absent gap
