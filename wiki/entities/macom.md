---
type: entity
tags: [rf-hardware, gan, gan-on-sic, semiconductor, pa, satcom, radar, defense, six-region, us, supply-chain]
---

# MACOM (MACOM Technology Solutions Holdings, NASDAQ: MTSI)

## Basic Information

- US analog/RF semiconductor company (Lowell, Massachusetts); MMIC power amplifiers, front-end modules, data-converter and optical components for RF/microwave, aerospace-and-defense, and datacenter-optical end markets.
- The node that **consolidated the US merchant GaN-on-SiC RF-PA business** after acquiring Wolfspeed's RF product line — the reason the six-region [[synthesis/phased-array-rf-frontend-supply-chain|RF front-end map]] now lists MACOM (not [[entities/win-semiconductors|Wolfspeed]]) at the US Layer-2 (GaN power-amplifier) node.

## Why It Matters (System Layer)

MACOM occupies **Layer 2 (the GaN power amplifier)** and adjacent front-end-module integration of the [[synthesis/phased-array-rf-frontend-supply-chain|phased-array RF front-end stack]] — the T/R power stage of an [[concepts/aesa|AESA]] / [[concepts/hybrid-phased-array|hybrid phased array]]. It is the concrete US answer to the "who fabs the GaN-on-SiC PA" question that [[entities/win-semiconductors]] answers for Taiwan and RFHIC for Korea. Its 2023–2025 absorption of Wolfspeed's RF business is a textbook **US IDM in-sourcing** event — exactly the "GaN-IDM in-sourcing erodes merchant-foundry share" structural risk flagged on [[entities/win-semiconductors]]: a US prime pulling a domestic GaN-on-SiC RF fab under one roof, secured by a US supply chain, for defense-radar and SATCOM demand.

## The Wolfspeed RF-business consolidation (the dated correction)

| Event | Date | Detail | Source |
|---|---|---|---|
| Agreement to buy Wolfspeed's RF business | 2023-08-22 | ~US$75M cash + 711,528 MTSI shares (~US$61M) | [Wolfspeed PR](https://www.wolfspeed.com/company/news-events/news/wolfspeed-to-sell-rf-business-to-macom-for-125-million/) |
| Deal completed | **2023-12-02** | GaN-on-SiC RF product portfolio + design teams (AZ/CA/NC) + CA/Malaysia back-end | [TrendForce](https://www.trendforce.com/news/2023/12/06/news-wolfspeed-completes-rf-business-sale-to-macom-focusing-on-sic-substrate-leadership/) |
| **RTP (Research Triangle Park, NC) GaN-on-SiC wafer fab transfer completed** | **2025-07-25** | MACOM assumed full operational control of the 100 mm GaN-on-SiC fab, ~2 yrs after close as scheduled | [MACOM PR](https://www.macom.com/updates/news/2025/macom-completes-transfer-of-rtp-wafer-fab); [Semiconductor Today](https://www.semiconductor-today.com/news_items/2025/jul/macom-250725.shtml) |

The strategic reading: [[entities/win-semiconductors|Wolfspeed]] **exited RF entirely** to focus on SiC substrates + power devices (and subsequently went through Chapter 11, filed 2025-06-30 / emerged 2025-09-29, ~70% debt cut). Its GaN-on-SiC RF fab, design teams and MMIC catalog are now MACOM's — so any pre-2024 "Wolfspeed = US GaN RF-PA leader" claim is stale: that role is **MACOM's** (alongside Qorvo's captive GaN and the [[concepts/aesa|Analog Devices]]/Qorvo beamformer-IC layer above it — a layer that itself consolidated again in 2026-10 when **Skyworks completed its ~US$22B combination with Qorvo**, folding the merchant beamformer-IC + captive-GaN stack into Skyworks and leaving MACOM the principal *independent merchant* GaN-on-SiC/GaN-on-Si IDM beside the ADI + Skyworks(-Qorvo) design houses).

## The OMMIC / MESC acquisition — MACOM's European GaN-on-Si + GaAs fab (the second fab, often mislabeled)

Separately from the Wolfspeed RF deal, MACOM **completed the asset acquisition of OMMIC SAS on 2023-05-31** (~US$36.9M, cash) — the Limeil-Brévannes facility near Paris, rebranded the **MACOM European Semiconductor Center (MESC)**. OMMIC is a 100-nm **GaN-on-Si** + GaAs MMIC foundry; the deal gave MACOM a *second substrate platform in a second region*: **RTP (NC) = GaN-on-SiC**, **MESC/OMMIC (France) = higher-frequency GaN-on-Si + GaAs**. This is a frequent error in supply-chain maps (including an earlier version of [[synthesis/phased-array-rf-frontend-supply-chain]]): **OMMIC is not an independent European GaN competitor — it has been MACOM's since 2023.** It also means the leading *space-grade Ka-band GaN-on-Si* work runs inside MACOM's own fab: the **2025 IEEE TMTT space-grade Ka-band GaN/Si SAR MMIC** (Politecnico di Torino/Tor Vergata/Bologna, ESA-funded — 35.5–36 GHz, 10 W de-biased to 6.6 W to meet the 160 °C junction derating) is built on **OMMIC's D01GH 100-nm GaN-on-Si process**. So MACOM is simultaneously the US GaN-on-SiC leader (RTP) *and* the foundry behind the most mature space-grade GaN-on-Si Ka-band demonstrator (MESC) — it sits on *both* sides of the GaN-on-SiC-vs-GaN-on-Si substrate split tracked on [[synthesis/phased-array-rf-frontend-supply-chain]] (whose falsifier watches exactly this GaN-on-Si-at-Ka-band axis; status 2026-11: demonstrated, not yet volume-qualified).

## 2026 positioning (verified 2026-08-30; Q4/FY2026 results added 2026-11-13)

| Metric | Value | Source |
|---|---|---|
| Q3 FY2026 revenue (qtr ended 2026-07-03) | **US$342.2M, +35.8% YoY** (vs $252.1M) | [MACOM Q3 FY26 results](https://www.macom.com/updates/news/2026/macom-reports-fiscal-third-quarter-2026-financial-results) |
| **Q4 FY2026 revenue** (qtr ended ~2026-10-03) | **US$424.8M, +62.7% YoY** (vs $261.2M); adj. operating margin **38.2%** ($162.3M); adj. EPS $2.09 | [MACOM 8-K Q4 FY2026 earnings release (SEC), 2026-11-05](https://www.sec.gov/Archives/edgar/data/0001493594/000149359426000041/ex99_1earningsreleaseq4fy26.htm) |
| Q4 FY2026 segment split | Data-center **$188.1M** (+~37% QoQ); **Industrial-&-Defense $164.6M**; Telecom $72.1M | SEC 8-K Q4 FY26 |
| **FY2026 revenue** | **US$1.33B, +37% YoY**; FY telecom +~11% "driven mainly by 5G and SATCOM" | SEC 8-K Q4 FY26 |
| Q1 FY2027 guidance | revenue **$450–460M**; management flagged FY2027 could approach ~$2B (not formal guidance) | SEC 8-K Q4 FY26 |
| Ka-band SATCOM GaN PA | 25 W GaN-on-SiC (CMPA2H3B025D, 27–31 GHz); linearized Q-band GaN MMIC | [MACOM IMS 2026](https://www.globenewswire.com/news-release/2026/06/04/3306712/19814/en/macom-ims-2026-product-announcements-for-aerospace-and-defense.html) |
| Radar front-ends | 125 W X-band GaN MMIC PA; 50 W C-band FEM; X-band GaN+GaAs FEM; 2–20 GHz wideband PA | MACOM IMS 2026 |

MACOM's product cadence (2026 IMS/SATShow) confirms the Layer-2 role in both directions of the [[concepts/aesa]] dual-use split: Ka-band GaN PAs for LEO **SATCOM** user terminals and X-/C-band GaN for defense **radar** T/R modules — the same-block-diagram / different-power-mix economics developed on [[concepts/hybrid-phased-array]]. The Q4/FY2026 print hardens this: FY2026 revenue crossed **US$1.33B (+37%)** with the Industrial-&-Defense line ($164.6M in Q4 alone) and a SATCOM-driven telecom lift confirming the defense-radar + LEO-SATCOM dual pull the cluster maps — the US-node counterpart to the same demand vector showing up in [[entities/win-semiconductors|Win Semi's]] record Taiwan prints.

## Six-region context

MACOM is a **US** node in the GaN-on-SiC RF foundry/IDM tier of [[synthesis/phased-array-rf-frontend-supply-chain]]: it competes with [[entities/win-semiconductors]] (Taiwan merchant GaAs/GaN foundry), RFHIC (Korea GaN-on-SiC subsystems), Sumitomo/Mitsubishi (Japan devices), **UMS** + STMicro/Infineon (the remaining *independent* Europe GaN houses — OMMIC is now MACOM's own MESC fab, not a competitor), and China's sovereign-by-sanction CETC-affiliated GaN lines. Unlike merchant-foundry [[entities/win-semiconductors]], MACOM is an **IDM** — it designs *and* fabs the RF MMIC, across **both** GaN-on-SiC (RTP/NC) and GaN-on-Si + GaAs (MESC/France) — which is the in-sourcing pattern that pressures the merchant-foundry model.

## Forward Trajectory (scenario / projection, not fact)

- **2026–2030:** the RTP GaN-on-SiC fab (now fully owned) plus defense-radar + LEO-SATCOM demand is the near-term growth vector; the +35.8% YoY Q3-FY26 print tracks the AI-datacenter-optical + A&D dual pull.
- **~2040+ / 100-year (labelled scenario):** compound-semiconductor GaN-on-SiC remains the unavoidable high-power/high-frequency RF physics layer (a permanent "toll booth," per the cluster's invariant); the structural question is IDM-vs-merchant share, not obsolescence. **Label:** projection from current trajectory, not a forecast.

## Sources & Verification (accessed 2026-08-30; OMMIC/MESC + Q4-FY2026 + space-grade Ka-band GaN-on-Si + Skyworks–Qorvo context added 2026-11-13)

- **OMMIC SAS acquisition completed 2023-05-31 (~US$36.9M; Limeil-Brévannes/Paris; MACOM European Semiconductor Center / MESC; GaN-on-Si + GaAs):** [MACOM/Business Wire 2023-05-31](https://www.businesswire.com/news/home/20230531005671/en); [Semiconductor Today 2023-06-01](https://semiconductor-today.com/news_items/2023/jun/macom-010623.shtml)
- **Q4 + FY2026 results (reported 2026-11-05):** FY2026 rev $1.33B (+37%); Q4 $424.8M (+62.7% YoY), adj. op. margin 38.2%, adj. EPS $2.09; I&D $164.6M, data-center $188.1M, telecom $72.1M (FY telecom +~11% on 5G + SATCOM); Q1 FY2027 guide $450–460M — [MACOM 8-K Q4 FY2026 earnings release (SEC)](https://www.sec.gov/Archives/edgar/data/0001493594/000149359426000041/ex99_1earningsreleaseq4fy26.htm); [finviz mirror](https://finviz.com/news/416818/macom-reports-fiscal-fourth-quarter-and-fiscal-year-2026-financial-results)
- **Space-grade Ka-band GaN-on-Si MMIC on OMMIC's (= MACOM's) D01GH process:** Ramella et al., *Development of a Space-Grade Ka-Band MMIC Power Amplifier in GaN/Si Technology for SAR Applications*, IEEE Trans. MTT 2025 (Politecnico di Torino + Tor Vergata + Bologna, ESA-funded; 35.5–36 GHz, 10/8.4/6.6 W at 11.25/10/9 V, de-biased to meet 160 °C junction derating) — [paper record (iris.polito.it)](https://iris.polito.it/handle/11583/2995144)
- **Skyworks–Qorvo combination completed 2026-10-05 (~US$22B; context for MACOM's competitive node):** [Skyworks completes combination with Qorvo (Qorvo IR)](https://www.qorvo.com/about/news-events/news-releases/2026/skyworks-completes-combination-with-qorvo); [everythingRF](https://www.everythingrf.com/news/details/21006-skyworks-and-qorvo-merge-to-build-a-22-billion-us-giant-in-high-performance-rf-and-mixed-signal-technology)
- Wolfspeed RF-business sale to MACOM (2023-08-22 announced, 2023-12-02 completed, ~$125M cash+shares): [Wolfspeed PR](https://www.wolfspeed.com/company/news-events/news/wolfspeed-to-sell-rf-business-to-macom-for-125-million/); [TrendForce](https://www.trendforce.com/news/2023/12/06/news-wolfspeed-completes-rf-business-sale-to-macom-focusing-on-sic-substrate-leadership/)
- RTP GaN-on-SiC fab transfer completed 2025-07-25: [MACOM PR](https://www.macom.com/updates/news/2025/macom-completes-transfer-of-rtp-wafer-fab); [Semiconductor Today](https://www.semiconductor-today.com/news_items/2025/jul/macom-250725.shtml)
- Q3 FY2026 revenue $342.2M / +35.8% YoY: [MACOM Q3 FY26 results](https://www.macom.com/updates/news/2026/macom-reports-fiscal-third-quarter-2026-financial-results)
- 2026 GaN A&D/SATCOM product line (IMS 2026): [GlobeNewswire](https://www.globenewswire.com/news-release/2026/06/04/3306712/19814/en/macom-ims-2026-product-announcements-for-aerospace-and-defense.html)
- Wolfspeed Chapter 11 filed 2025-06-30 / emerged 2025-09-29 (~70% debt reduction): [Wolfspeed PR](https://www.wolfspeed.com/company/news-events/news/wolfspeed-successfully-completes-financial-restructuring-emerges-as-financially-stronger-company-well-positioned-in-silicon-carbide-market/); [Semiconductor Today](https://www.semiconductor-today.com/news_items/2025/sep/wolfspeed-300925.shtml)

## Related

- [[concepts/aesa]] — the array architecture MACOM's GaN PAs power
- [[concepts/hybrid-phased-array]] — the T/R front-end where the GaN PA sits
- [[concepts/dpd-digital-predistortion]] — linearization paired with the GaN PA (MACOM ships analog-linearized GaN MMICs)
- [[entities/win-semiconductors]] — Taiwan merchant-foundry counterpart at the same GaN layer
- [[synthesis/phased-array-rf-frontend-supply-chain]] — six-region RF front-end supply-chain map
- [[synthesis/leo-taiwan-odc-gap]] — the upstream/midstream context
