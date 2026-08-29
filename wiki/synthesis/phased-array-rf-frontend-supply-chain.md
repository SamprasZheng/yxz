---
type: synthesis
tags: [rf, phased-array, aesa, supply-chain, gan, beamformer, satcom, leo, taiwan, six-region]
sources:
  - "[[sources/hsieh-xband-leo-transmitter-2020]]"
  - "[[sources/leo-space-datacenter-analysis-2025]]"
concepts:
  - "[[concepts/aesa]]"
  - "[[concepts/hybrid-phased-array]]"
  - "[[concepts/dpd-digital-predistortion]]"
  - "[[concepts/leo-value-chain]]"
---

# Phased-Array RF Front-End — Six-Region Supply-Chain Map

**Question this answers:** Across the phased-array / AESA RF front-end stack (beamformer ICs → GaN power amplifiers → packaging/module → array integration → space-grade transmitter), who leads, who lags, and where does Taiwan actually sit? This is the component-level companion to [[synthesis/leo-taiwan-odc-gap]], which makes the same "strong upstream, absent midstream" argument at the system level.

## The stack, layer by layer

A modern [[concepts/aesa|AESA]] / [[concepts/hybrid-phased-array|hybrid phased array]] is five stacked layers. Value and defensibility differ sharply by layer:

| Layer | What it is | Dominant process | Margin / moat character |
|---|---|---|---|
| 1. Beamformer IC | Multi-channel phase + gain control (4–8+ ch) | **SiGe BiCMOS / CMOS** | Design-IP heavy; few players; high margin |
| 2. Power amplifier | T/R front-end power | **GaN-on-SiC** (>GaAs >LDMOS) | Foundry + thermal; capital heavy |
| 3. Packaging / module | Antenna-in-package, thermal, filters | Substrate / AiP | Integration know-how; mid margin |
| 4. Array integration | Calibration, beam management, [[concepts/dpd-digital-predistortion|DPD]], [[sources/hsieh-xband-leo-transmitter-2020|BIST]] | System | Systems integrator; program-driven |
| 5. Space-grade transmitter | Radiation + vibration qualified ([[concepts/tid-total-ionizing-dose|TID]]/[[concepts/see-single-event-effects|SEE]]) | Qualification | Certification is the hidden gate |

The economic punchline (developed on [[concepts/hybrid-phased-array]]): the *same block diagram* is a $100M defense radar or a sub-$1k consumer SATCOM terminal — the **process mix and integration**, not the architecture, set the price. The commercial inflection of the 2020s is silicon (Layer 1) making flat-panel SATCOM economic. Market sizing for that SATCOM beamformer-IC layer alone (Semiconductor Insight, re-verified 2026-08-29): ≈ **USD 2.87B (2025) → 3.21B (2026) → 7.94B (2034), 10.6% CAGR**. The *level* is source-divergent — SNS/Verified/DataIntelo put the broader beamforming-IC market at ~USD 4.3–6.9B (2025–26) with 11–19% CAGRs — but the *direction* (double-digit growth pulled by LEO flat-panel volume) is robust across all of them.

## Six-region leadership

| Region | Beamformer IC (L1) | GaN PA (L2) | Array integration (L4) | Space-grade (L5) | Net position |
|---|---|---|---|---|---|
| **US** | **Leads** — Analog Devices, **Qorvo** (absorbed **Anokiwave** Q1 2024 — now "Anokiwave is now Qorvo") | **Leads** — **Qorvo, MACOM** (acquired Wolfspeed's RF GaN-on-SiC line 2023, RTP fab fully transferred Jul 2025), ADI; DoD raised GaN to MRL-10, >$3B radar funding 2024–25 | Leads — Lockheed, Northrop, Raytheon | Leads — heritage rad-hard supply | Full-stack leader; **merchant L1+L2 consolidating (see below)** |
| **Japan** | Mid | Strong devices — Sumitomo, Mitsubishi Electric | **Early pioneer** — first operational AESA fighter ([[concepts/aesa|J/APG-1, 1995–2002]]) | Mid | Deep components, smaller commercial terminal market |
| **Korea** | Mid | **Rising** — RFHIC GaN-on-SiC (invested in SweGaN, Sweden); MaxLinear DPD partnership (IMS 2024) | Rising — KF-21 indigenous AESA (Hanwha/LIG Nex1) | Emerging | Fast vertical climb via defense + GaN |
| **China** | Growing (state-backed) | Vertically integrated — CETC institutes | **Leads by volume** — CETC all-digital active phased arrays (YLC-16); 100+ systems at World Radar Expo 2025 | State programs + [[entities/ada-space]] ODC | Scale + integration, opaque supply |
| **Europe** | Mid | **GaN foundry** — UMS, OMMIC (France); Infineon | Strong — Thales, Leonardo, Saab, Hensoldt | ESA heritage | Strong in defense segments + GaN foundry |
| **Taiwan** | Absent (no indigenous beamformer-IC product line) | **Upstream foundry strength** — [[entities/win-semiconductors]] GaAs/GaN MMIC (+Viper RF, 1–150 GHz coverage) | Absent as integrator | **Absent — heavy-ion SEE still requires foreign labs** ([[concepts/rha-radiation-hardening]]) | Upstream-strong, midstream/system absent |

## The US merchant L1+L2 layer is consolidating (2023–2026)

The layer-up story of the 2020s is not just "silicon makes SATCOM cheap" — it is that the US **merchant** beamformer-IC (L1) and RF-GaN-PA (L2) suppliers, historically a scatter of independents, are **consolidating into a few vertically-integrated primes** that can ship a complete active-antenna front-end:

- **MACOM ← Wolfspeed RF (2023).** MACOM acquired Wolfspeed's entire GaN-on-SiC RF business for ~$125M (≈$150M annualized rev, >1,400 patents, the 100 mm RTP fab in North Carolina); the RTP fab conveyed to full MACOM control **ahead of schedule in July 2025**. **Wolfspeed exited RF entirely** — it is now a SiC-*substrate*/power-device maker (and itself emerged from a 91-day prepackaged **Chapter 11 on 2025-09-29**, cutting ≈70% / ~$4.6B of debt). So any map that lists "Wolfspeed" as an RF GaN-PA supplier is stale by three years; the US merchant RF-GaN seat now belongs to **MACOM** (+ Qorvo captive GaN + ADI).
- **Qorvo ← Anokiwave (Q1 2024).** Qorvo absorbed the leading independent SATCOM/AESA silicon beamformer-IC house (Anokiwave, Boston) into its High-Performance-Analog segment — the Anokiwave brand is retired ("Anokiwave is now Qorvo"). Qorvo can now pair its own GaN PA with an in-house beamformer, i.e. **vertically supply the whole APAA front-end** rather than selling one layer.
- **2026 product cadence confirms the vertical model.** Qorvo's Ku-band TDD silicon beamformers **AWMF-0240 (Rx) / AWMF-0241 (Tx)** reached **volume production in Q1 2026**, joined by the **AWMF-0247** (Quad 4×1 Tx/Rx TDD for LEO *user terminals*) and Ka-band **AWMF-0238/0239** — a merchant catalog aimed squarely at the LEO flat-panel volume that drives the market figure above.

**Why this matters for the six-region read:** consolidation *raises* the US moat at exactly the layers Taiwan is absent from, and it *narrows the on-ramp* for a would-be Taiwanese entrant. When the merchant beamformer-IC and RF-GaN IP that a Taiwanese fabless house would license or second-source is being pulled inside two US primes (Qorvo, MACOM) that prefer to sell integrated modules, the "buy the IP and integrate locally" path gets harder, not easier — the value keeps migrating up into the integrated front-end where the US already leads. This is the front-end-layer echo of the same "the missing rung is integration, not fabrication" thesis in [[synthesis/leo-taiwan-odc-gap]].

## Where Taiwan sits (the honest read)

Taiwan's strength is concentrated in **Layer 2 (and adjacent passives)**: [[entities/win-semiconductors]] is a world-class GaAs/GaN MMIC foundry, [[entities/ascend-tech]] supplies filters/waveguides into Starlink/Kuiper, and [[entities/huatong-pcb]] holds large LEO-PCB share. But Taiwan has **no indigenous Layer-1 beamformer-IC product line, no fighter-grade array integration, and an incomplete Layer-5 radiation-qualification chain** (heavy-ion SEE still requires LBNL/TRIUMF travel per [[concepts/taiwan-radiation-test-ecosystem]]). This is the *exact same shape* as the system-level gap in [[synthesis/leo-taiwan-odc-gap]]: Taiwan is a high-margin **supplier of the hardest-to-make atoms**, not an owner of the integrated product. The investment/strategy implication is identical — the value capture sits one layer up (integration + certification) from where Taiwan currently plays.

## Falsifiability / what would change this read

- If a Taiwanese fabless house ships a competitive SiGe/CMOS SATCOM beamformer IC (Layer 1) at volume → the "L1 absent" claim is falsified; watch Win Semi's foundry customers and local fabless RF startups.
- If Taiwan's superconducting-cyclotron + heavy-ion qualification ([[concepts/taiwan-radiation-test-ecosystem]]) reaches routine flight-part throughput → the Layer-5 gate closes domestically.
- If China's CETC/[[entities/ada-space]] commercial flat-panel terminals reach cost parity with US silicon → the "China = scale, US = silicon-IP" split compresses.
- If the US L1+L2 consolidation *reverses* — a merchant beamformer-IC or RF-GaN independent re-emerges at scale, or Qorvo/MACOM spin the merchant catalog back out — the "consolidation raises the barrier to Taiwanese entry" read weakens; watch whether Qorvo/MACOM keep selling discrete ICs or pivot to integrated-module-only.

## Cross-links

- Architecture mechanism: [[concepts/aesa]], [[concepts/hybrid-phased-array]], [[concepts/zero-if-transmitter]], [[concepts/evm-calibration]], [[concepts/dpd-digital-predistortion]]
- Mixed-signal + verification companion: [[synthesis/rf-transmitter-acceptance-layer-six-region]] — the transceiver/converter + DFE/DPD-IP + T&M-instrument tier that *certifies* the front-end this page maps
- Source measurements: [[sources/hsieh-xband-leo-transmitter-2020]]
- System-level + investment framing: [[synthesis/leo-taiwan-odc-gap]], [[concepts/leo-value-chain]], [[concepts/orbital-data-center]]
- Taiwan entities: [[entities/win-semiconductors]], [[entities/ascend-tech]], [[entities/huatong-pcb]]
- Radiation gate: [[concepts/rha-radiation-hardening]], [[concepts/taiwan-radiation-test-ecosystem]], [[concepts/tid-total-ionizing-dose]], [[concepts/see-single-event-effects]]

## Sources

Original pass accessed 2026-05-31; **US-consolidation + market re-verification accessed 2026-08-29.**

- SATCOM beamformer-IC market sizing (2.87B/2025 → 3.21B/2026 → 7.94B/2034, 10.6% CAGR) & vendors: [Semiconductor Insight — Phased Array Antenna (Beamforming) IC for SATCOM market](https://semiconductorinsight.com/report/phased-array-antenna-beamforming-ic-for-satcom-market/); level-divergence per [SNS Insider](https://www.snsinsider.com/reports/phased-array-beamforming-ics-market-9280)
- **Qorvo ← Anokiwave (Q1 2024):** [Qorvo to Acquire Anokiwave](https://www.qorvo.com/newsroom/news/2024/qorvo-to-acquire-anokiwave); ["Anokiwave is now Qorvo"](https://p.qorvo.com/Qorvo-Anokiwave.html). 2026 products: [Qorvo Ku-band TDD beamformer (AWMF-0240/0241, volume prod. Q1 2026)](https://www.qorvo.com/newsroom/news/2025/qorvo-introduces-tdd-beamformer-ic)
- **MACOM ← Wolfspeed RF (2023; RTP fab full control Jul 2025):** [MACOM to acquire Wolfspeed RF business ($125M, GaN-on-SiC)](https://www.macom.com/updates/news/2023/macom-announces-definitive-agreement-to-acquire-the-rf-business-); [Macom completes takeover of Wolfspeed RF fab](https://compoundsemiconductor.net/article/122201/Macom_completes_takeover_of_Wolfspeed_RF_fab). Wolfspeed Ch.11 exit: [Wolfspeed emerges from Chapter 11, ~70%/$4.6B debt cut (2025-09-29)](https://www.semiconductor-today.com/news_items/2025/sep/wolfspeed-300925.shtml)
- GaN RF foundry landscape (top-5 ≈ 60% revenue; DoD GaN MRL-10, >$3B radar 2024–25): [Mordor Intelligence — GaN RF semiconductor devices](https://www.mordorintelligence.com/industry-reports/gan-rf-semiconductor-devices-market)
- RFHIC GaN-on-SiC + DPD (Korea): [RFHIC + MaxLinear DPD, IMS 2024](https://rfhic.com/product-demo/rfhics-gan-on-sic-solutions-featuring-maxlinears-dpd-at-ims-2024/); [RFHIC invests in SweGaN](https://www.semiconductor-today.com/news_items/2024/apr/swegan-150424.shtml)
- China CETC phased array: [China Daily — World Radar Expo 2025 (100+ systems)](https://investinchina.chinadaily.com.cn/s/202505/21/WS682d90f1498eec7e1f737549/china-debuts-over-100-advanced-radar-systems-at-world-radar-expo.html)
- AESA fighter history (Japan first): [J/APG-1 — Wikipedia](https://en.wikipedia.org/wiki/J/APG-1)
