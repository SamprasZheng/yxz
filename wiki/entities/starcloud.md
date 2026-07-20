---
type: entity
tags: [leo, space, data-center, ai, gpu, startup, odc, cots, radiation]
---

# Starcloud

## Basic Information

US space-computing startup; "the first company to train an LLM in space." Founded **January 2024** (El Segundo, CA; now operating from Redmond, WA) as **Lumen Orbit** by Philip Johnston (ex-McKinsey), Adi Oltean (ex-SpaceX / Azure), and Ezra Feilden (ex-Airbus Defence & Space). Went through **Y Combinator S24**, raised one of the largest seed rounds in YC demo-day history, and **rebranded to Starcloud in March 2025** after a trademark challenge from Lumen Technologies. NVIDIA Inception–backed.

## Key Milestones

| Date | Event |
|------|------|
| 2024-01 | Founded as Lumen Orbit; published orbital-DC white paper, YC S24 |
| 2025-03 | Renamed **Starcloud** (Lumen Technologies legal challenge) |
| 2025-11-02 | **Starcloud-1** launched on a SpaceX rideshare — 60 kg, single NVIDIA H100 |
| 2025-12 | Trained **NanoGPT** (Karpathy, on Shakespeare) on-orbit; ran a **Gemini** model in space |
| 2026-03-30 | **$170M Series A** at **$1.1B** valuation (Benchmark + EQT) — fastest YC unicorn (17 months) |
| 2026-10 (targeted) | **Starcloud-2**: ~100× the power-generation capacity of Starcloud-1; NVIDIA **Blackwell B200** + an **AWS server blade** + bitcoin-mining ASICs (revenue bridge in low-utilisation windows); runs **live commercial workloads** for AWS, Google Cloud, NVIDIA, Crusoe; will deploy what Starcloud claims is the **largest radiator ever flown in orbit** — the σT⁴ heat-rejection term made physical |
| later (roadmap) | **Starcloud-3**: a **200 kW, three-tonne** spacecraft sized for SpaceX's Starship "PEZ-dispenser" deployment system |

## Starcloud-1 Satellite

- ~60 kg, about the size of a small refrigerator; carries **one NVIDIA H100 GPU**
- ~100× the on-orbit GPU compute of any prior in-orbit device (NVIDIA's claim)
- First on-orbit **LLM training** (NanoGPT) and first **frontier-model inference** (Gemini) in space — Dec 2025

## Roadmap

Starcloud's stated strategy is to launch a **larger satellite each year toward gigawatt scale**. The escalation is now concrete (verified 2026-07): **Starcloud-2** — now targeted for an **October 2026** launch ([ainvest](https://www.ainvest.com/news/starcloud-october-2026-launch-validate-orbital-data-center-curve-spark-infrastructure-race-2604/)) — jumps to a Blackwell-B200 + AWS-blade payload running paying workloads, with bitcoin-mining ASICs as a revenue bridge and the **largest radiator yet flown** as its headline thermal claim; **Starcloud-3** is a 200 kW three-tonne free-flyer; and Starcloud has filed with the **FCC for up to ~88,000 satellites** — the paper runway to gigawatt-class orbital compute. As of mid-2026 this ~88k filing is dwarfed by [[entities/spacex-orbital-data-center]]'s million-satellite FCC filing, but Starcloud remains the actor with **compute actually flown and computing**, not just filed. The thesis: free 24/7 solar + radiative cooling makes a future orbital data centre cheaper than a grid-and-water-constrained terrestrial one — the demand case quantified on [[concepts/orbital-data-center]] (IEA: 415→945 TWh by 2030). The binding limit on that runway remains heat rejection (σT⁴), not power — see [[synthesis/orbital-data-center-six-region]].

## Significance

Starcloud-1 is the milestone *commercial* validation for [[concepts/orbital-data-center]]: it shows a **COTS** high-performance GPU surviving and computing in LEO radiation — the central engineering bet of [[concepts/cots-gpu-radiation-risk]]. It anchors the **US** column of the six-region map ([[synthesis/orbital-data-center-six-region]]), contrasting with China's state-scaled [[entities/ada-space]] and hyperscaler [[entities/google-suncatcher]]. The unsolved counter-risk is single-event latchup over a full solar cycle ([[concepts/see-single-event-effects]], [[concepts/solar-cycle-25-leo-radiation]]) — one H100 over weeks is not yet a fleet over years.

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]

## Related

- [[concepts/orbital-data-center]]
- [[concepts/cots-gpu-radiation-risk]]
- [[concepts/rha-radiation-hardening]]
- [[concepts/see-single-event-effects]]
- [[concepts/solar-cycle-25-leo-radiation]]
- [[entities/nvidia]]
- [[entities/google-suncatcher]]
- [[entities/ada-space]]
- [[entities/axiom-space]]
- [[entities/spacex-orbital-data-center]]
- [[synthesis/leo-taiwan-odc-gap]]
- [[synthesis/orbital-data-center-six-region]]
