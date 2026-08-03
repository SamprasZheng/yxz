---
type: entity
tags: [taiwan, space, leo, odc, gpu, edge-ai, on-orbit-compute, cubesat, radiation, supply-chain, midstream-c]
---

# Liscotech (立創科技) — GPGPU100 Space Compute Module

**Liscotech** is a Taiwanese space-electronics company whose **GPGPU100** is, as of mid-2026, the **first *flown* Taiwan-built space-grade general-purpose GPU (GPGPU) compute module** — the concrete artifact that partially fills the long-flagged "midstream-C absent" gap in Taiwan's LEO value chain ([[synthesis/leo-taiwan-odc-gap]]). The module commercialises a satellite-grade GPGPU design **licensed from [[entities/nspo|TASA]]** (Taiwan Space Agency) on **2025-04-15**.

> New page (2026-08-03 deepen). Prior to this the wiki asserted "almost no Taiwan midstream-C on-orbit-compute vendors" as a flat void; a flown edge-inference node now exists and is recorded here, with the tier caveat below.

## Why It Matters (System Layer)

The wiki's recurring thesis is that Taiwan is *upstream-strong / midstream-C-absent* — world-class at RF PA ([[entities/win-semiconductors]]), passives ([[entities/ascend-tech]]) and boards ([[entities/huatong-pcb]]), but with **no on-orbit compute integrator**. Liscotech's GPGPU100 is the first concrete counter-data-point: a Taiwan-built, radiation-qualified, **flown** space compute module. It matters *because* it is small — it clarifies exactly **which tier** of the midstream-C gap is closing and which is not:

- **Edge-inference tier (closing):** the GPGPU100 is built on an **Nvidia Jetson Orin Nano** delivering **up to ~40 TOPS** — an on-board image-processing / data-reduction class of device, not a training accelerator.
- **Hyperscale-compute tier (still absent):** this is ~2 orders of magnitude below the ODC nodes the *hottest* midstream-C theme is about — [[entities/starcloud]]'s **H100** (Starcloud-1), [[entities/ada-space]]'s **744 TOPS/satellite**, or a rack of Blackwell. Taiwan still has no H100/Blackwell-class orbital-compute integrator.

So the honest read: **Taiwan has now cleared the space-grade edge-GPGPU bar (flown, qualified), but the orbital-data-center-scale integration gap remains open.** See [[concepts/cots-gpu-radiation-risk]] for the COTS-GPU-in-orbit radiation ledger this module joins at the small-node end.

## GPGPU100 — Specifications

| Attribute | Value | Note |
|---|---|---|
| Processor | **Nvidia Jetson Orin Nano** | COTS edge-AI SoC, space-screened |
| Compute | **up to ~40 TOPS** | INT8 edge-inference class |
| Form factor | CubeSat computing module | fits nanosat/CubeSat buses |
| Qualification | radiation exposure + vacuum thermal cycling + vibration tested | space-grade screening, not rad-hard-by-design |
| IP origin | licensed from **[[entities/nspo|TASA]]** satellite-grade GPGPU program (2025-04-15) | TASA → commercial transfer |

## Flight Heritage — Black Kite-1 (2025-11-28)

The GPGPU100 flew as a payload on **Black Kite-1**, a CubeSat built by **Rapidtek Technologies** for a Taiwan LEO-IoT constellation:

- **Launch:** 2025-11-28, **SpaceX Falcon 9 Transporter-15** rideshare from **Vandenberg SFB** (the same rideshare cohort as [[entities/nspo|TASA]]'s FORMOSAT-8A launch window).
- **Orbit:** Sun-synchronous, ~**500–600 km**; passes over Taiwan 1–2×/day, ~5-minute comm windows.
- **Mission objectives (compute-relevant):** validate system stability + pointing; validate Rapidtek's **Ku-band high-speed + LoRa low-rate** comm payloads; **test the high-precision GPS receiver and the TASA-derived space-grade GPGPU** — i.e. an explicit **on-orbit GPGPU demonstration**, the point of interest here.

The mission logic is the canonical edge-ODC value proposition ([[concepts/orbital-data-center]]): **process imagery on-orbit to cut the downlink**, given the ~5-minute-per-pass bandwidth constraint.

## Six-Region Context (水平展開)

Where a flown Taiwan edge-GPGPU sits against the global on-orbit-compute field ([[synthesis/orbital-data-center-six-region]]):

| Region | On-orbit-compute node (representative) | Tier |
|---|---|---|
| **US** | [[entities/starcloud]] H100 (training-in-orbit); [[entities/axiom-space]] relay-node ODC; [[entities/google-suncatcher]] TPU | hyperscale / training |
| **China** | [[entities/ada-space]] 744 TOPS/sat, 2,800-sat target; **Orbital Chenguang** ¥57.7B/$8.4B credit, 1 GW+ by 2035 | national-scale constellation |
| **Europe** | Thales ASCEND (net-zero economics study) | study/architecture |
| **Japan** | Space Compass optical-relay edge fabric | relay/edge |
| **Korea** | Hanwha ₩55T orbital-AI-DC plan (declared, unflown) | declared |
| **Taiwan** | **Liscotech GPGPU100 — Jetson Orin Nano ~40 TOPS, FLOWN 2025-11** | **edge-inference (smallest, but real + flown)** |

Read: Taiwan's entry is the **smallest node but among the few actually flown and qualified** — consistent with the island's *make-the-hard-component, not the system* signature, now extended one tier into on-orbit compute.

## Forward Trajectory (scenario / projection, not fact)

- **2026–2028:** more CubeSat-class edge-GPGPU flights; the open question is whether Liscotech / [[entities/nspo|TASA]] scale from **Orin-Nano edge nodes** toward **higher-power (Orin AGX / Blackwell-class) racks** — the jump from data-reduction to orbital *inference-as-a-service*.
- **2030s+:** whether a Taiwan vendor can integrate a **kW-class** orbital compute node (the σT⁴ heat-rejection ceiling of [[synthesis/orbital-data-center-six-region]] becomes binding well before then) decides if the midstream-C gap truly closes or Taiwan stays an *edge-node + upstream-component* supplier into others' hyperscale ODCs. **Label:** projection from a single flight, not a program forecast.

## Sources & Verification (accessed 2026-08-03)

- GPGPU100 = Nvidia Jetson Orin Nano, up to 40 TOPS, CubeSat module, radiation/vacuum-thermal/vibration tested: [Liscotech — Systems](https://liscotech.com/systems.php); [Orbital Today, "Taiwan Space Agency Prepares A Satellite-Grade General-Purpose GPU For Commercialisation" (2026-04-19)](https://orbitaltoday.com/2026/04/19/taiwan-space-agency-prepares-a-satellite-grade-general-purpose-gpu-for-commercialisation/)
- TASA license to Liscotech 2025-04-15; flown 2025-11-28 Black Kite-1 (Rapidtek), Falcon 9 Transporter-15, Vandenberg, SSO ~500–600 km, on-orbit GPGPU test objective: [The AI Journal, "Rapidtek Successfully Launches Black Kite-1 with TASA to Advance LEO IoT Constellation"](https://aijourn.com/rapidtek-successfully-launches-black-kite-1-with-tasa-to-advance-leo-iot-constellation/); Orbital Today (above)

## Related

- [[entities/nspo]] — TASA; licensed the satellite-grade GPGPU IP to Liscotech
- [[entities/tron-future-tech]] — the other concrete Taiwan midstream counter-example (AESA array integrator)
- [[concepts/leo-value-chain]] — midstream-C on-orbit-compute node
- [[concepts/orbital-data-center]] — the ODC theme this module's edge-tier partially enters
- [[concepts/cots-gpu-radiation-risk]] — COTS-GPU-in-orbit radiation ledger (H100/Trillium/Orin)
- [[concepts/rha-radiation-hardening]] — qualification the module cleared by screening
- [[synthesis/leo-taiwan-odc-gap]] — the "absent midstream-C" thesis this node partially counters
- [[synthesis/orbital-data-center-six-region]] — global ODC map; Taiwan row
