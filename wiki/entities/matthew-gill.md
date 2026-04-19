---
type: entity
tags: [rf-hardware, space, radiation, person, consultant]
---

# Matthew Gill

Founder and CEO of [Space Radiation Services](https://www.spaceradiationservices.com/) (est. 2022). PhD in Nuclear Engineering. Primary source for practical space radiation engineering guidance for commercial LEO programs.

## Background

- **PhD**: Nuclear Engineering
- **Former Director**, Apollo Fusion (electric propulsion startup, acquired by Astra): led radiation testing and analysis; spearheaded inaugural flight program from clean-sheet to on-orbit in 6 months
- **Radiation consultant**, San Francisco Bay Area space startups: >100 systems on-orbit
- Sold radiation testing and analysis for >200 systems to Maxar, Airbus OneWeb Satellites, York Space Systems, and others
- Prior work in UK nuclear facilities and UK's nuclear regulator

## Space Radiation Services

Founded to offer flexible cost/schedule/risk-balanced radiation consulting — a reaction to the "rigid and slow" traditional radiation testing industry. By 2025, supports "dozens of companies across three continents and eight time zones."

**Offerings**:
- Consulting (TID, SEE, atomic oxygen, charging)
- Free orbit radiation models (TID tool, SEE tool)
- Radiation GPT (AI assistant for radiation questions)

## Key Published Positions

### New Space testing pragmatism
Formally argues skipping radiation testing can be correct in two cases:
1. Short proof-of-concept demonstrations — failure risk is bounded and acceptable
2. Long missions where orbit-dose analysis + heritage component selection keeps expected failure probability within risk budget

Alternative mitigations (without formal testing): flight-heritage sourcing, NSREC/RADECS public test data mining, avoiding complex uncharacterized ICs, design-level ECC/watchdog/de-rating.

### On-orbit failure data
Primary early failure mode in LEO: **device resets** — especially radios and OBCs. Concrete data: **Xilinx Zynq-7000 at 800 km ≈ 3 SEU-induced resets/day** (no internal ECC). Reliable public failure attribution data is nearly absent; companies rarely disclose causes.

### Key radiation environment insights (non-obvious)
- COTS part TID ceiling: ~**25 krad(Si)** — most COTS fails above this
- High LEO (>1000 km) SEE rates can be **worse than GEO**
- Orbital inclination has significant impact on SEE rates
- Shielding **cannot prevent** destructive SEE (SEL, SEB, SEGR)
- Power device de-rating is one of few cost-effective hardware SEE mitigations
- Proton SEE testing understates heavy-ion GCR sensitivity

## Blog posts

| Title | Date | URL |
|---|---|---|
| Radiation in different orbits — Free model | 2024-07-17 | /post/radiation-in-different-orbit-model |
| Most used charts showing key radiation insights | 2024-04-16 | /post/key-space-radiation-insights |
| New Space radiation testing: Why some companies ignore it | 2024-02-06 | /post/new-space-radiation-testing |
| On-orbit radiation failures and published data | 2023-09-21 | /post/on-orbit-radiation-failures-and-published-data |

## Related

- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/rha-radiation-hardening]]
- [[concepts/leo-value-chain]]
- [[sources/space-radiation-tid-see-2025]]
