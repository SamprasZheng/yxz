---
slug: new-space-radiation-reality
title: "Space Radiation Testing in the New Space Era: When the Rules Change"
authors: ["sampras"]
tags: [space, rf]
description: "Matthew Gill of Space Radiation Services makes a contrarian case: sometimes skipping radiation testing is the right call. Here's what New Space companies actually face — and what the data says about on-orbit failures."
image: /img/og/radtest.png
video_ready: true
---

The traditional space industry has a simple answer to radiation qualification: test everything, apply 2× design margin, use MIL-spec parts. That answer costs time and money that New Space companies often don't have. [Matthew Gill](https://www.spaceradiationservices.com/about) — PhD nuclear engineer, former Director at Apollo Fusion, consultant on radiation for over 200 systems sold to Maxar, Airbus, OneWeb, and York Space — makes a more nuanced argument. Sometimes skipping formal radiation testing is the right engineering decision.

Here's what I took from his work.

<!-- truncate -->

## The Environment Varies More Than You Think

Before getting into testing philosophy, the key calibration is: **not all orbits are equal**.

Nine charts from Gill's [key radiation insights post](https://www.spaceradiationservices.com/post/key-space-radiation-insights) that I keep coming back to:

| Insight | Implication |
|---|---|
| Radiation is a common failure source for high-reliability satellites | Even curated, tested hardware fails |
| COTS parts fail when TID exceeds ~25 krad(Si) | Most COTS has a hard ceiling below typical LEO mission dose |
| Shielding has limited value for TID in high LEO / MEO | You can't bulk-shield your way out of the problem |
| High LEO (>1000 km) SEE rates can be **worse than GEO** | Counterintuitive — altitude is not monotonically safer |
| Inclination significantly affects SEE rates | Two missions at the same altitude but different inclinations are not equivalent |
| Shielding cannot prevent destructive SEE (SEL, SEB, SEGR) | No amount of aluminum stops a single heavy ion from latching up a MOSFET |
| De-rating power devices reduces destructive SEE risk | One of few cost-effective hardware mitigations |
| Proton SEE testing has limits vs. heavy ion | Proton data alone may underestimate sensitivity to heavy GCR ions |

The practical takeaway: if you're building for sun-synchronous orbit at 500–600 km with a 2-year mission, your total dose budget is manageable. If you're at 1200 km polar orbit for 5 years, you're in a different regime entirely. [His free orbit models](https://www.spaceradiationservices.com/post/radiation-in-different-orbit-model) let you sanity-check both scenarios before committing to a test plan.

For a quick engineering estimate of your own mission, the calculator on my earlier [Radiation Test Playbook](/blog/radtest) post covers the same trade-space interactively.

---

## When Skipping Testing Is Defensible

This is where Gill's perspective diverges from textbook aerospace. From his [February 2024 post](https://www.spaceradiationservices.com/post/new-space-radiation-testing):

**Case 1 — Short demonstration missions**

A proof-of-concept payload on a 6-month LEO demo doesn't need the same qualification standard as a 7-year GEO communications satellite. The TID budget is low, mission criticality is bounded, and the cost of testing may exceed the value of the information it generates. Fail fast, learn, iterate.

**Case 2 — Long missions where the math works without testing**

If you've done orbit dose analysis, chosen components with known heritage, applied COTS selection rules, and the failure probability is within your risk budget — testing may not add enough information to justify the cost. This is the actuarial version of radiation engineering.

The catch: "most situations require formal testing." This isn't a license to ignore radiation. It's a decision framework.

---

## What the On-Orbit Data Actually Shows

The most honest section of Gill's [September 2023 post](https://www.spaceradiationservices.com/post/on-orbit-radiation-failures-and-published-data) is the admission: reliable on-orbit failure attribution data is **almost impossible to get**. Companies rarely disclose causes; failures are hard to characterize even when observed.

What we do know:

- **Device resets are the dominant early failure mode** in LEO — primarily affecting radios and onboard computers
- The most commonly cited concrete data point: **Xilinx Zynq-7000 at 800 km altitude — approximately 3 SEU-induced resets per day**, caused by the absence of built-in ECC on its internal SRAM
- Standard 6-source reference set from NASA, NSREC, and Petersen methodology remains the empirical baseline; not much has been published since

The Zynq example is clarifying. The Zynq-7000 is one of the most widely used SoCs in CubeSat and small satellite platforms. Three resets per day is operationally significant — it's not a catastrophic failure, but it means your system is rebooting itself multiple times daily, losing state, and potentially corrupting mission data. The fix (external ECC, scrubbing, watchdog recovery) is well-understood; skipping it because "we're using COTS" is an engineering error, not a cost saving.

---

## Risk Mitigation Without Full Testing

For programs where formal TID/SEE testing isn't feasible, Gill recommends a hierarchy of alternatives:

1. **Use hardware with flight heritage** — even without specific test documentation, something that has flown successfully has empirical evidence of survival
2. **Mine public radiation databases** — NSREC and RADECS conference proceedings contain test data for common components, especially microcontrollers and FPGAs; the data exists, it just takes effort to find
3. **Avoid complex ICs with no history** — dense power management ICs with no test data are high-risk; simpler discrete designs are more predictable
4. **Apply standard design-level mitigations** — ECC/memory scrubbing, watchdog timers, redundancy, power de-rating, current limiting, and health monitoring add meaningful protection at low cost

The underlying logic: radiation engineering is risk management, not binary pass/fail. You can reduce the expected failure rate substantially through design choices without a single trip to an accelerator facility.

---

## The Taiwan LEO Supply Chain Angle

Reading Gill's framework from a Taiwan supply chain perspective (穩懋, 昇達科, 華通 are the dominant upper-tier suppliers), there's a structural observation that rarely gets discussed:

**Radiation test certification is an invisible entry barrier.** These companies have evidently passed some form of TID qualification to be in Starlink and Kuiper supply chains — but Taiwan has no domestic heavy-ion accelerator or large Co-60 facility capable of full SEE+TID qualification to MIL-STD-883 TM1019 standards.

Every certification cycle currently requires overseas travel (LBNL in Berkeley, TRIUMF in Vancouver, GANIL in France, GSI in Germany). For a Tier-1 supplier to a Tier-1 satellite constellation, that's manageable overhead. For a new entrant trying to qualify a novel component, it's a significant time and cost multiplier.

Gill's position is that the traditional testing industry is "rigid and slow" — which is exactly why he founded Space Radiation Services to offer flexible, cost/schedule-aware consulting. The same market gap that created his consultancy exists in Asia: the testing infrastructure that would let Taiwan's hardware ecosystem iterate faster simply isn't here yet.

---

## Resources

- Matthew Gill's blog: [spaceradiationservices.com](https://www.spaceradiationservices.com/blog)
- Free TID and SEE orbit models: [spaceradiationservices.com/free-radiation-tools](https://www.spaceradiationservices.com/free-radiation-tools)
- Radiation GPT (Gill's AI assistant for radiation questions): on the same site
- NSREC proceedings (public SEE data): [nsrec.com](https://nsrec.com)
- My earlier [Radiation Test Playbook](/blog/radtest) with orbit calculators
