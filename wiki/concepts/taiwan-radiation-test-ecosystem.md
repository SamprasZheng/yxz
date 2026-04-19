---
type: concept
tags: [taiwan, radiation, testing, space, leo, infrastructure, cots, qualification]
---

# Taiwan Space Radiation Test Ecosystem

Between 2020 and 2023, Taiwan established initial space component radiation testing capabilities, centered on a consortium architecture led by NSPO. While full heavy-ion SEE testing capability is still lacking, proton SEE and Co-60 TID are now feasible domestically.

> ⚠️ **Update to existing assessment**: The [[concepts/rha-radiation-hardening]] page describes Taiwan's testing infrastructure as "nearly blank (★☆☆☆☆)." This assessment requires correction — Taiwan has established an initial testing consortium since 2020, and added proton therapy accelerator-based proton beam SEE testing capability from 2023 onwards. The correct assessment should be "**partially established (★★☆☆☆)**, heavy-ion still lacking."

## Taiwan Space Radiation Testing Consortium

**Established**: 2020

**Lead institution**: NSPO (National Space Program Office)

**Founding members and capabilities**:

| Institution | Testing Capability | Radiation Source |
|---|---|---|
| **Chang Gung Memorial Hospital (CGMH)** | Proton SEE testing (primary) | Proton therapy accelerator |
| **National Tsing Hua University (NTHU)** | Material/component radiation characterization research | Nuclear reactor + accelerator |
| **Academia Sinica** | Particle detection + analytical support | — |

## NSPO × National Taiwan University Hospital Cancer Center MoU (2022)

**Signing date**: September 30, 2022

**Collaboration content**: NTU Hospital Cancer Center provides a superconducting cyclotron and high-resolution pencil beam scanning technology for space component radiation testing.

**Equipment highlights**:
- Superconducting cyclotron: capable of providing high-energy proton beams (protons account for 90% of high-energy cosmic ray particles)
- FLASH ultra-high dose rate beam capability (medical use with test acceleration potential)
- Projected to be **operational in 2023**

**Strategic significance**: Prior to this, Taiwan manufacturers had to ship electronic components overseas (Europe, USA) for radiation testing, increasing time and cost. This collaboration brings proton SEE testing capability back to Taiwan.

## Taiwan's Current Testing Capability Map

| Test Type | Capability Status | Institution |
|---|---|---|
| TID (Co-60 γ) | ✅ Available | INER (Institute of Nuclear Energy Research) |
| Proton SEE | ✅ Available (since 2023) | Chang Gung CGMH + NTU Cancer Center |
| Heavy-ion SEE | ❌ **Not available** | Must go to LBNL, TRIUMF, GANIL |
| Electron irradiation | ⚠️ Under evaluation | — |

## Structural Gap: Heavy-Ion SEE

Heavy-ion testing (LET > 10 MeV·cm²/mg) remains **the only critical capability Taiwan lacks**. Complete SEL and SEU cross-section curves require facilities at:
- **LBNL BASE** (Berkeley, USA — most comprehensive globally, LET > 99 MeV·cm²/mg)
- **TRIUMF** (Vancouver, Canada)
- **GANIL** (France)
- **GSI/FAIR** (Germany)

For complete RHA qualification requiring TID + proton SEE + heavy-ion SEE, Taiwan manufacturers still need at least one overseas trip (heavy-ion), but TID and proton components can now be completed domestically, reducing overall testing cost and scheduling pressure.

## Impact on Taiwan's LEO Supply Chain

1. **Short-term (2023–2026)**: Companies already in the Starlink/Kuiper chain such as Win Semiconductors and Ascend Tech can complete TID + proton SEE in Taiwan; heavy-ion still requires overseas testing. Compared to previously sending everything overseas, cost and scheduling have improved significantly.

2. **Medium-term opportunity**: If Taiwan establishes a heavy-ion accelerator (requiring investment on the order of tens of billions NTD), complete domestic RHA qualification would be possible — no such investment plan is currently visible.

3. **Competitive positioning**: Compared to South Korea (KAERI has heavy-ion capability) and Japan (HIMAC, RIKEN), Taiwan has caught up on proton SEE but remains behind on heavy-ion.

## Related

- [[concepts/rha-radiation-hardening]] — ⚠️ Taiwan infrastructure assessment updated: revised from blank to partially established
- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/leo-value-chain]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]
