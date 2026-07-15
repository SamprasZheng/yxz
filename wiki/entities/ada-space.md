---
type: entity
tags: [leo, china, space, data-center, ai, strategic]
---

# ADA Space (China's Three-Body Computing Constellation)

## Basic Information

Chinese space-computing company (ADA Space / 国星宇航) executing the largest orbital-supercomputing program announced to date. The flagship effort — the **"Three-Body Computing Constellation" (三体计算星座)**, part of the broader **Star-Compute Program** — is a collaboration with **Zhejiang Lab (之江实验室)**, the Hangzhou state research institute backed by the Zhejiang government, Zhejiang University and (historically) Alibaba. The first **12 satellites launched 2025-05-14 from Jiuquan** — described by ADA Space as the world's first *dedicated* orbital-computing constellation.

## Constellation Specifications

| Item | Value |
|------|------|
| First launch | **2025-05-14**, 12 satellites (Jiuquan) |
| Combined compute (first 12) | **≈5 POPS** (peta-ops/s); 30 TB onboard storage |
| Optical inter-satellite link | up to **100 Gbps** per satellite |
| On-orbit accelerator | up to **744 TOPS** per satellite (remote-sensing payloads processed onboard) |
| On-orbit AI model | **8-billion-parameter** model resident on each satellite (onboard inference) |
| Target constellation size | **2,800 satellites** |
| Full-network target compute | **≈1,000 POPS** (one quintillion ops/s) |

## In-Orbit Status (2026-07)

The first 12 satellites have been on orbit for roughly **fourteen months** (launched 2025-05-14) and ADA Space / Zhejiang Lab report they have **demonstrated the constellation's core capabilities** (onboard processing, ISL, edge inference) — including a reported demonstration of **tasking robots on Earth from orbit**. The wider Chinese space-compute push was a headline theme at the **2026 Space Computing Industry Conference (April 2026)**, and Beijing is moving to **coordinate/manage** the several competing orbital-compute efforts — i.e. the program is transitioning from first-launch demonstration toward managed scale-up.

Two 2026 developments extend this:

- **Commercial pull-through (2026-06-05):** ADA Space signed a **strategic AI cooperation agreement with Tencent**, letting Tencent tap the constellation's on-orbit compute — the first named hyperscale-tier customer for a flying compute constellation, and evidence the "state-directed" read now carries a commercial-demand arm ([china-in-space](https://www.china-in-space.com/p/ada-space-signs-strategic-ai-agreement)).
- **Scale-up cadence (2026 H2):** the **second and third satellite groups** are slated to launch later in 2026 — the **third group ≈14 satellites, ~3,000 kg to a 525 km SSO, in Q4 2026** — boosting combined compute and the number of concurrently deployable models.

The revised deployment staging is now **~1,000 satellites by 2030 → 2,800 by ~2035** (previously stated as "2,800 planned" without a clear year). This keeps China in the **"leads on deployed scale"** seat of the six-region map ([[synthesis/orbital-data-center-six-region]]): it remains the only actor with a *dedicated compute constellation already operating in orbit*, now with a named commercial customer and a concrete H2-2026 scale-up. Sources: [china-in-space](https://www.china-in-space.com/p/ada-space-eyes-launching-2800-ai), [SpaceNews (2025-05)](https://spacenews.com/china-launches-first-of-2800-satellites-for-ai-space-computing-constellation/), [Live Science](https://www.livescience.com/technology/computing/china-is-building-a-constellation-of-ai-supercomputers-in-space-and-just-launched-the-first-pieces) (all accessed 2026-07-15).

## Strategic Positioning

ADA Space's scale far exceeds any existing or planned commercial ODC program. Its nature is **not merely a commercial project** — it is also a strategic positioning move by China in the following three converging domains:
1. AI computing (orbital edge inference)
2. Sensing (Earth observation + intelligence)
3. Communications (inter-satellite optical links)

## Competitive Implications

- Spectrum and orbital resource competition: 500–1200 km high-value commercial orbital inclinations and Ku/Ka/V bands are already approaching exhaustion (ITU 2025–2026 memos)
- A 2,800-satellite constellation means ADA Space alone could fill certain orbital inclination bands

## Why It Matters (six-region context)

ADA Space is the reason the ODC race is not a US-only story. In the six-region map ([[synthesis/orbital-data-center-six-region]]), China **leads on deployed scale** — it is the only actor with a *dedicated compute constellation already in orbit*, where the US leads on *capability per node* ([[entities/starcloud]] H100, [[entities/google-suncatcher]] TPU) and Europe is still at study stage (ASCEND). The state-directed model means orbital-slot and spectrum pre-emption ([[concepts/leo-value-chain]] midstream B) is a strategic, not commercial, calculation — a 2,800-satellite footprint can itself foreclose contested 500–1200 km inclinations and Ku/Ka/V bands.

> **Verification note (2026-06-03):** partner corrected to **Zhejiang Lab (之江实验室)**; program names ("Three-Body Computing Constellation" / Star-Compute) and the 12-sat / 5-POPS-initial / 2,800-sat / 1,000-POPS-target figures confirmed against [SpaceNews (2025-05)](https://spacenews.com/china-launches-first-of-2800-satellites-for-ai-space-computing-constellation/) and Live Science. Per-satellite 744-TOPS figure retained from the original LEO industry analysis source.

## Related Concepts

- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]

## Related Entities

- [[entities/starcloud]], [[entities/google-suncatcher]], [[entities/axiom-space]], [[entities/hanwha-aerospace]]

## Related Synthesis

- [[synthesis/orbital-data-center-six-region]]
- [[synthesis/leo-taiwan-odc-gap]]

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]
