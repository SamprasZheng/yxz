---
type: concept
tags: [rf-hardware, space, radiation, cots, qualification, taiwan, leo, supply-chain]
---

# RHA — Radiation Hardness Assurance

A **systematic engineering process** that ensures space components maintain specification performance under mission radiation environments, encompassing requirements definition, component screening, test verification, and design margin management. For Taiwan's LEO supply chain, it represents an implicit qualification threshold for entering formal constellation supply chains.

## Radiation Design Margin (RDM)

The most critical safety metric in RHA:

```
RDM = Component failure dose / Mission expected cumulative dose
```

**Example**: Component fails at 100 krad(Si), mission expected dose is 60 krad(Si) → RDM = 1.67 (67% margin)

| Mission Type | Minimum RDM Requirement |
|---|---|
| General commercial LEO | 1.5 |
| Government/military LEO | 2.0 |
| Deep space exploration | 2.0–3.0 |

## Test Levels

| Level | Description |
|---|---|
| **Part Level** | Individual component TID / SEE characterization testing, establishing failure curves |
| **Board Level** | Accounts for component interaction effects and shielding |
| **System Level** | Simulates mission profile, verifies complete system performance |

## COTS Component Challenges and "Upscreening"

Commercial LEO constellations (Starlink, Kuiper, etc.) extensively use commercial off-the-shelf (COTS) components to reduce costs, but COTS has no radiation assurance → **upscreening** is required as an intermediate step:

**Upscreening process**:
1. Purchase commercial component lots
2. Perform TID / SEE testing (sampling)
3. Confirm whether the lot meets mission RDM requirements
4. Build component radiation database (lot traceability is important; different lots may vary)

**Challenges**:
- COTS manufacturers provide no radiation data; significant variation between lots
- Advanced process (<28nm) node behavior is complex; traditional test models do not apply
- Cost: complete TID + SEE testing per component can reach thousands to tens of thousands of USD

## Emerging Alternative Test Source: 90Sr/90Y Electron Source

Traditional Co-60 facilities are scarce and expensive; **90Sr/90Y β electron sources** are being evaluated as an alternative TID test tool:

| Characteristic | Co-60 | 90Sr/90Y |
|---|---|---|
| Radiation type | γ (1.2–1.3 MeV) | β electrons (max 2.28 MeV) |
| Advantages | Uniform penetration, standard compliant | Directional irradiation; compact equipment; low cost |
| Special advantage | — | Particular applicability for <28nm FPGA testing |
| Standards status | Current MIL-STD standard | Under evaluation, not yet fully standardized |

## Implicit Threshold for Taiwan's LEO Supply Chain

> No matter how excellent the hardware design, without complete TID/SEE verification, entry into formal constellation supply chains is not possible.

**Current status (2025 update)**:

> ⚠️ **Correction**: Previous assessment of Taiwan's testing infrastructure as "nearly blank" has been revised. The actual situation has improved. See [[concepts/taiwan-radiation-test-ecosystem]] for details.

- Very few institutions globally have complete heavy-ion + Co-60 testing capabilities (LBNL, TRIUMF, GANIL, GSI, HIRFL, etc.)
- Since **2020**, Taiwan has established a "Space Radiation Testing Consortium" (led by NSPO, with Chang Gung, NTHU, Academia Sinica), providing proton SEE + TID testing
- **September 2022**: NSPO × National Taiwan University Hospital Cancer Center MoU; superconducting cyclotron proton beam available for SEE testing from **2023 onwards**
- INER (Institute of Nuclear Energy Research) handles Co-60 TID testing
- **Still lacking**: heavy-ion SEE (LET > 10 MeV·cm²/mg) — Taiwan manufacturers still need to travel to LBNL/TRIUMF for this
- Companies already in the Starlink/Kuiper chain such as Win Semiconductors ([[entities/win-semiconductors]]) and Ascend Technology ([[entities/ascend-tech]]) must have completed some radiation qualification, but details are commercially confidential

## Major Commercial Test Laboratories (Global)

| Institution | Location | Capability | Notes |
|---|---|---|---|
| **LBNL BASE** | Berkeley, USA | Proton + full heavy-ion range (to bismuth) | LET > 99 MeV·cm²/mg; pioneered in 1979 |
| **TRIUMF** | Vancouver, Canada | Proton + heavy-ion | Second largest in North America |
| **GANIL** | Caen, France | Heavy-ion | ESA's primary partner |
| **GSI/FAIR** | Darmstadt, Germany | Heavy-ion | Highest energy in Europe |
| **TRAD (Toulouse)** | France | Co-60 + Cf + Am + low-energy proton + pulsed laser | Founded 1994; subsidiary of 3D Plus/HEICO; clients include Airbus DS, Thales, ESA, NASA; OMERE software tool |
| **Zero-G Radiation Assurance** | USA | Co-60 TID + heavy-ion + proton SEE | >6000 COTS radiation database entries; leading commercial lab for SmallSat ecosystem; >20 years of NASA commercial program experience |
| **JPL Radiation Effects Group** | Pasadena, USA | Full range | NASA government use; accepts some commercial clients |
| **BNL NASA NSRL** | Brookhaven, USA | Heavy-ion (space simulation) | Dual-use for biological + electronics |

**Zero-G's COTS database** is one of the most important tools for commercial New Space: over 6000 radiation test records primarily for COTS and automotive-grade components, enabling pre-screening of components before formal testing and significantly reducing costs.

## Connection to [[concepts/leo-value-chain]]

Radiation qualification is the **implicit admission ticket** for all upstream components entering mid-stream Segment A (satellite manufacturing). The interpretation of Taiwan's competitiveness map should incorporate this dimension:

| Segment | Taiwan Presence | Radiation Qualification Requirement |
|---|---|---|
| Upstream RF PA (Win Semiconductors) | ★★★★★ | Must pass TID; qualified (inferred) |
| Upstream filter (Ascend Tech) | ★★★★★ | Must pass TID + partial SEE; qualified (inferred) |
| Mid-stream A PCB (Huatong) | ★★★★★ | Substrate material TID requirements; qualification status unknown |
| **Taiwan testing infrastructure** | **★★☆☆☆** | **TID + proton SEE established; heavy-ion SEE still lacking** |

## Related

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/taiwan-radiation-test-ecosystem]] — detailed page on Taiwan's testing ecosystem
- [[sources/space-radiation-tid-see-2025]]
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]
