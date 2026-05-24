---
title: "Space Radiation Testing in the New Space Era: When the Rules Change"
description: "Matthew Gill has tested over 200 flight systems and argues that sometimes skipping formal radiation testing is the right call. Here's the engineering framework behind that claim."
slug: new-space-radiation-reality
date: 2026-04-19
authors: [sampras]
tags: [space, rf]
video_ready: true
---

The traditional space industry has a simple answer to radiation: test everything, apply twice the design margin, and only use military-spec parts.

That approach made sense when launching a billion-dollar GEO satellite. It makes much less sense when you're a New Space startup trying to ship a CubeSat in nine months on a shoestring budget.

<!-- truncate -->

## Matthew Gill's Argument

Matthew Gill is a PhD nuclear engineer who spent years qualifying radiation-tolerant hardware for companies like Maxar, Airbus, and OneWeb. He has worked on over 200 flight systems. And he has published something that most radiation engineers won't say out loud: **sometimes, skipping formal radiation testing is the right call**.

Before getting into that argument, it helps to calibrate on the environment itself — because not all orbits are equal, and this is where most engineers' intuition breaks down.

## Three Things That Surprise Engineers

**1. COTS parts have a dose ceiling around 25 krad.**
Commercial off-the-shelf components tend to fail when they accumulate more than about 25 kilorad of total ionizing dose. That's the threshold where semiconductor oxide layers start to degrade in ways that affect performance.

**2. High LEO can be worse than GEO for single-event effects.**
Single-event effect rates at high LEO altitudes (above ~1,000 km) can actually exceed rates at GEO. Altitude is not monotonically safer. The Van Allen belt's inner proton zone, combined with the South Atlantic Anomaly, creates elevated flux zones that geosynchronous orbits largely avoid.

**3. Shielding cannot stop destructive SEE.**
No amount of aluminum will protect against latch-up. A single high-energy heavy ion can trigger a low-impedance short circuit in a CMOS device regardless of how much metal you wrap around it. De-rating power devices is one of the few hardware-level mitigations that actually works.

## When You Can Skip Testing

Gill identifies two scenarios where formal radiation testing may not be worth the cost:

**Short demonstration missions.** A proof-of-concept payload flying for six months doesn't need the same qualification rigor as a seven-year communications satellite. The TID budget is low, mission criticality is bounded, and the cost of testing may exceed the value of the information you'd get back.

**Longer missions where the numbers work out.** If you've done orbit dose analysis, selected components with known flight heritage, applied reasonable COTS selection rules, and your expected failure probability sits within your risk budget — formal testing may not add enough marginal information to justify the cost. This isn't a license to be careless; it's an actuarial engineering framework.

## On-Orbit Failure Data

The most cited concrete data point is the **Xilinx Zynq-7000** — one of the most popular SoCs in the CubeSat world. At 800 km altitude, it experiences approximately **three SEU-induced resets per day** because it lacks built-in error-correcting memory.

Three reboots a day isn't catastrophic, but it means your system is constantly losing state and potentially corrupting data. The fix is well-known: add external ECC, run a memory scrubber, implement watchdog recovery. Skipping these because you're using commercial parts is an engineering error, not a cost saving.

## When You Can't Test: The Hierarchy of Alternatives

Gill outlines a practical hierarchy:

1. **Use hardware with flight history**, even without formal test data
2. **Mine the public databases** — NSREC and RADECS conference proceedings contain test characterization data for hundreds of common components
3. **Avoid complex ICs with no documented radiation history**
4. **Apply design-level mitigations**: ECC memory, watchdog timers, power de-rating, current limiting

## The Taiwan Supply Chain Angle

There's a broader supply chain implication worth flagging. Companies like Win Semiconductors and Ascend Technology have clearly passed some form of radiation qualification to sit inside Starlink and Kuiper supply chains. But Taiwan has no domestic heavy-ion accelerator or large Co-60 facility capable of running full SEE and TID qualification to MIL-STD-883 standards.

Since 2020, Taiwan has built a "Space Radiation Testing Consortium" (NSPO-led, with Chang Gung, NTHU, Academia Sinica), and from 2023 NTU Hospital's superconducting cyclotron proton beam became available for SEE testing. INER handles Co-60 TID. But heavy-ion SEE (LET > 10 MeV·cm²/mg) still requires a trip to LBNL in Berkeley, TRIUMF in Vancouver, or GANIL in France.

For a new entrant trying to qualify a novel component, that's a serious time and cost multiplier that rarely gets discussed in investor presentations or supply chain analyses.

---

*All sources referenced in this post are linked in the video description. Matthew Gill's free orbit radiation analysis tools are available at [spaceradiationservices.com](https://www.spaceradiationservices.com/).*
