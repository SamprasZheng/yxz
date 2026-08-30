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

The economic punchline (developed on [[concepts/hybrid-phased-array]]): the *same block diagram* is a $100M defense radar or a sub-$1k consumer SATCOM terminal — the **process mix and integration**, not the architecture, set the price. The commercial inflection of the 2020s is silicon (Layer 1) making flat-panel SATCOM economic. Market sizing for that SATCOM beamformer-IC layer alone (Semiconductor Insight, re-verified 2026-08-30, unchanged): ≈ **USD 2.87B (2025) → 3.21B (2026) → 7.94B (2034)**, **10.6% CAGR**. Broader phased-array beamforming-IC estimates (all applications) span USD ~3.8–6.9B (2025) at 8.6–18.9% CAGR — treat the *direction* (double-digit growth driven by LEO flat-panel volume) as robust and the *level* as source-dependent.

## Six-region leadership

| Region | Beamformer IC (L1) | GaN PA (L2) | Array integration (L4) | Space-grade (L5) | Net position |
|---|---|---|---|---|---|
| **US** | **Leads** — Analog Devices, **Qorvo (absorbed Anokiwave 2024)** | **Leads** — **Qorvo, [[entities/macom|MACOM]]** (absorbed Wolfspeed's RF GaN-on-SiC 2023), ADI; DoD raised GaN to MRL-10, >$3B radar funding 2024–25 | Leads — Lockheed, Northrop, Raytheon | Leads — heritage rad-hard supply | Full-stack leader |
| **Japan** | Mid | Strong devices — Sumitomo, Mitsubishi Electric | **Early pioneer** — first operational AESA fighter ([[concepts/aesa|J/APG-1, 1995–2002]]) | Mid | Deep components, smaller commercial terminal market |
| **Korea** | Mid | **Rising** — RFHIC GaN-on-SiC (invested in SweGaN, Sweden); MaxLinear DPD partnership (IMS 2024) | Rising — KF-21 indigenous AESA (Hanwha/LIG Nex1) | Emerging | Fast vertical climb via defense + GaN |
| **China** | Growing (state-backed) | Vertically integrated — CETC institutes | **Leads by volume** — CETC all-digital active phased arrays (YLC-16); 100+ systems at World Radar Expo 2025 | State programs + [[entities/ada-space]] ODC | Scale + integration, opaque supply |
| **Europe** | Mid | **GaN foundry** — UMS, OMMIC (France); Infineon | Strong — Thales, Leonardo, Saab, Hensoldt | ESA heritage | Strong in defense segments + GaN foundry |
| **Taiwan** | Absent (no indigenous beamformer-IC product line) | **Upstream foundry strength** — [[entities/win-semiconductors]] GaAs/GaN MMIC (+Viper RF, 1–150 GHz coverage) | Absent as integrator | **Absent — heavy-ion SEE still requires foreign labs** ([[concepts/rha-radiation-hardening]]) | Upstream-strong, midstream/system absent |

## 2026 structural update — US vendor consolidation at Layers 1–2 (verified 2026-08-30)

The single biggest change to this map since the 2026-05 build is **US supplier consolidation**, not a shift in national leadership. Two 2020s M&A events re-drew the US column:

- **Layer 2 (GaN PA): Wolfspeed exited RF; [[entities/macom|MACOM]] now owns the merchant GaN-on-SiC RF line.** Wolfspeed sold its entire RF (GaN-on-SiC MMIC) business to MACOM — agreed 2023-08-22, **completed 2023-12-02** — and MACOM **completed the transfer of the Research Triangle Park, NC 100 mm GaN-on-SiC wafer fab on 2025-07-25**, taking full operational control. Wolfspeed then refocused on SiC substrates + power devices and went through Chapter 11 (filed 2025-06-30, **emerged 2025-09-29** with ~70% debt reduction, maturities to 2030). So the pre-2024 "Wolfspeed = US GaN RF-PA leader" framing is **stale** — that node is now **MACOM** (Q3 FY2026 revenue US$342.2M, +35.8% YoY; shipping 25 W Ka-band SATCOM GaN PAs 27–31 GHz and 125 W X-band radar GaN MMICs), alongside Qorvo's captive GaN.
- **Layer 1 (beamformer IC): Qorvo absorbed Anokiwave (2024).** Qorvo acquired Anokiwave (announced 2024-01-31, closed Q1 2024); the team moved into Qorvo's High-Performance Analog segment. The Ku-band silicon beamformer ICs cited below (AWMF-0240/0241, 2025-03, −25% Tx / −14% Rx power) are **ex-Anokiwave, now-Qorvo** products. US beamformer-IC leadership has therefore consolidated from "ADI + Anokiwave" to **ADI + Qorvo**.

Net effect: US front-end leadership is **unchanged at the national level but more concentrated** — Qorvo now spans both the beamformer-IC (L1) and GaN-PA (L2) layers, with MACOM the second GaN-on-SiC RF-PA node and ADI the other beamformer house. This is the "GaN-IDM in-sourcing" risk (flagged on [[entities/win-semiconductors]]) playing out on the US side: a domestic GaN-on-SiC RF fab pulled under a single IDM's roof.

## Where Taiwan sits (the honest read)

Taiwan's strength is concentrated in **Layer 2 (and adjacent passives)**: [[entities/win-semiconductors]] is a world-class GaAs/GaN MMIC foundry, [[entities/ascend-tech]] supplies filters/waveguides into Starlink/Kuiper, and [[entities/huatong-pcb]] holds large LEO-PCB share. But Taiwan has **no indigenous Layer-1 beamformer-IC product line, no fighter-grade array integration, and an incomplete Layer-5 radiation-qualification chain** (heavy-ion SEE still requires LBNL/TRIUMF travel per [[concepts/taiwan-radiation-test-ecosystem]]). This is the *exact same shape* as the system-level gap in [[synthesis/leo-taiwan-odc-gap]]: Taiwan is a high-margin **supplier of the hardest-to-make atoms**, not an owner of the integrated product. The investment/strategy implication is identical — the value capture sits one layer up (integration + certification) from where Taiwan currently plays.

## Falsifiability / what would change this read

- If a Taiwanese fabless house ships a competitive SiGe/CMOS SATCOM beamformer IC (Layer 1) at volume → the "L1 absent" claim is falsified; watch Win Semi's foundry customers and local fabless RF startups.
- If Taiwan's superconducting-cyclotron + heavy-ion qualification ([[concepts/taiwan-radiation-test-ecosystem]]) reaches routine flight-part throughput → the Layer-5 gate closes domestically.
- If China's CETC/[[entities/ada-space]] commercial flat-panel terminals reach cost parity with US silicon → the "China = scale, US = silicon-IP" split compresses.

## Cross-links

- Architecture mechanism: [[concepts/aesa]], [[concepts/hybrid-phased-array]], [[concepts/zero-if-transmitter]], [[concepts/evm-calibration]], [[concepts/dpd-digital-predistortion]]
- Mixed-signal + verification companion: [[synthesis/rf-transmitter-acceptance-layer-six-region]] — the transceiver/converter + DFE/DPD-IP + T&M-instrument tier that *certifies* the front-end this page maps
- Source measurements: [[sources/hsieh-xband-leo-transmitter-2020]]
- System-level + investment framing: [[synthesis/leo-taiwan-odc-gap]], [[concepts/leo-value-chain]], [[concepts/orbital-data-center]]
- Taiwan entities: [[entities/win-semiconductors]], [[entities/ascend-tech]], [[entities/huatong-pcb]], [[entities/tron-future-tech]]
- US GaN-PA node: [[entities/macom]] (absorbed Wolfspeed's RF GaN-on-SiC business 2023; RTP fab transfer 2025-07-25)
- Radiation gate: [[concepts/rha-radiation-hardening]], [[concepts/taiwan-radiation-test-ecosystem]], [[concepts/tid-total-ionizing-dose]], [[concepts/see-single-event-effects]]

## Sources (accessed 2026-05-31; US-consolidation + market re-verify 2026-08-30)

- **US vendor consolidation (2026-08-30 verification):** Wolfspeed RF-business → MACOM (agreed 2023-08-22, completed 2023-12-02) — [Wolfspeed PR](https://www.wolfspeed.com/company/news-events/news/wolfspeed-to-sell-rf-business-to-macom-for-125-million/), [TrendForce](https://www.trendforce.com/news/2023/12/06/news-wolfspeed-completes-rf-business-sale-to-macom-focusing-on-sic-substrate-leadership/); RTP GaN-on-SiC fab transfer completed 2025-07-25 — [MACOM PR](https://www.macom.com/updates/news/2025/macom-completes-transfer-of-rtp-wafer-fab); MACOM Q3 FY2026 rev $342.2M/+35.8% + 2026 GaN A&D/SATCOM products — [MACOM Q3 FY26](https://www.macom.com/updates/news/2026/macom-reports-fiscal-third-quarter-2026-financial-results), [IMS 2026](https://www.globenewswire.com/news-release/2026/06/04/3306712/19814/en/macom-ims-2026-product-announcements-for-aerospace-and-defense.html); Qorvo–Anokiwave acquisition (announced 2024-01-31, closed Q1 2024) — [Semiconductor Today](https://www.semiconductor-today.com/news_items/2024/feb/qorvo-010224.shtml); Wolfspeed Chapter 11 emerged 2025-09-29 — [Wolfspeed PR](https://www.wolfspeed.com/company/news-events/news/wolfspeed-successfully-completes-financial-restructuring-emerges-as-financially-stronger-company-well-positioned-in-silicon-carbide-market/)
- SATCOM beamformer-IC market sizing & vendors: [Semiconductor Insight — Phased Array Beamforming IC for SATCOM market](https://semiconductorinsight.com/report/phased-array-antenna-beamforming-ic-for-satcom-market/); [Anokiwave SATCOM (now Qorvo)](https://www.anokiwave.com/satcom/index.html); [Renesas phased-array beamformers](https://www.renesas.com/us/en/products/rf-products/phased-array-beamformers)
- GaN RF foundry landscape (top-5 ≈ 60% revenue; DoD GaN MRL-10, >$3B radar 2024–25): [Mordor Intelligence — GaN RF semiconductor devices](https://www.mordorintelligence.com/industry-reports/gan-rf-semiconductor-devices-market)
- RFHIC GaN-on-SiC + DPD (Korea): [RFHIC + MaxLinear DPD, IMS 2024](https://rfhic.com/product-demo/rfhics-gan-on-sic-solutions-featuring-maxlinears-dpd-at-ims-2024/); [RFHIC invests in SweGaN](https://www.semiconductor-today.com/news_items/2024/apr/swegan-150424.shtml)
- China CETC phased array: [China Daily — World Radar Expo 2025 (100+ systems)](https://investinchina.chinadaily.com.cn/s/202505/21/WS682d90f1498eec7e1f737549/china-debuts-over-100-advanced-radar-systems-at-world-radar-expo.html)
- AESA fighter history (Japan first): [J/APG-1 — Wikipedia](https://en.wikipedia.org/wiki/J/APG-1)
