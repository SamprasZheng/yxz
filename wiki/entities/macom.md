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

The strategic reading: [[entities/win-semiconductors|Wolfspeed]] **exited RF entirely** to focus on SiC substrates + power devices (and subsequently went through Chapter 11, filed 2025-06-30 / emerged 2025-09-29, ~70% debt cut). Its GaN-on-SiC RF fab, design teams and MMIC catalog are now MACOM's — so any pre-2024 "Wolfspeed = US GaN RF-PA leader" claim is stale: that role is **MACOM's** (alongside [[entities/win-semiconductors|Qorvo]]'s captive GaN and the [[concepts/aesa|Analog Devices]]/Qorvo beamformer-IC layer above it).

## 2026 positioning (verified 2026-08-30)

| Metric | Value | Source |
|---|---|---|
| Q3 FY2026 revenue (qtr ended 2026-07-03) | **US$342.2M, +35.8% YoY** (vs $252.1M) | [MACOM Q3 FY26 results](https://www.macom.com/updates/news/2026/macom-reports-fiscal-third-quarter-2026-financial-results) |
| Ka-band SATCOM GaN PA | 25 W GaN-on-SiC (CMPA2H3B025D, 27–31 GHz); linearized Q-band GaN MMIC | [MACOM IMS 2026](https://www.globenewswire.com/news-release/2026/06/04/3306712/19814/en/macom-ims-2026-product-announcements-for-aerospace-and-defense.html) |
| Radar front-ends | 125 W X-band GaN MMIC PA; 50 W C-band FEM; X-band GaN+GaAs FEM; 2–20 GHz wideband PA | MACOM IMS 2026 |

MACOM's product cadence (2026 IMS/SATShow) confirms the Layer-2 role in both directions of the [[concepts/aesa]] dual-use split: Ka-band GaN PAs for LEO **SATCOM** user terminals and X-/C-band GaN for defense **radar** T/R modules — the same-block-diagram / different-power-mix economics developed on [[concepts/hybrid-phased-array]].

## Six-region context

MACOM is a **US** node in the GaN-on-SiC RF foundry/IDM tier of [[synthesis/phased-array-rf-frontend-supply-chain]]: it competes with [[entities/win-semiconductors]] (Taiwan merchant GaAs/GaN foundry), RFHIC (Korea GaN-on-SiC subsystems), Sumitomo/Mitsubishi (Japan devices), UMS/OMMIC/STMicro/Infineon (Europe GaN foundry), and China's sovereign-by-sanction CETC-affiliated GaN lines. Unlike merchant-foundry [[entities/win-semiconductors]], MACOM is an **IDM** — it designs *and* fabs the RF MMIC — which is the in-sourcing pattern that pressures the merchant-foundry model.

## Forward Trajectory (scenario / projection, not fact)

- **2026–2030:** the RTP GaN-on-SiC fab (now fully owned) plus defense-radar + LEO-SATCOM demand is the near-term growth vector; the +35.8% YoY Q3-FY26 print tracks the AI-datacenter-optical + A&D dual pull.
- **~2040+ / 100-year (labelled scenario):** compound-semiconductor GaN-on-SiC remains the unavoidable high-power/high-frequency RF physics layer (a permanent "toll booth," per the cluster's invariant); the structural question is IDM-vs-merchant share, not obsolescence. **Label:** projection from current trajectory, not a forecast.

## Sources & Verification (accessed 2026-08-30)

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
