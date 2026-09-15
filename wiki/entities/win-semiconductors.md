---
type: entity
tags: [taiwan, rf-hardware, semiconductor, leo, foundry, pa, gaas, supply-chain]
---

# Win Semiconductors (穩懋半導體, Stock: 3105)

## Basic Information

- Taiwan-listed company (3105)
- World-leading compound semiconductor wafer foundry, specializing in GaAs / GaN PA (power amplifiers)

- Founded 1999; **world's largest pure-play compound-semiconductor (GaAs / GaN / SiC) wafer foundry**.

## 2025 financials (verified 2026-06-11)

| Metric | Value | Source |
|---|---|---|
| FY2025 revenue | **NT$16.6 B**, −4.7% YoY | [DigiTimes 2026-02](https://www.digitimes.com/news/a20260212PD221/win-semi-gaas-wafer-revenue-2025.html) |
| Q4 2025 revenue | NT$4.79 B (≈US$152.7 M), +7% QoQ | [DigiTimes 2026-01](https://www.digitimes.com/news/a20260108PD201/revenue-2025-smartphone-shipments-gallium.html) |
| GaAs foundry market share (2025) | **>50%** | DigiTimes 2026-02 |
| Strategic pivot | Speeding shift toward **AI optical (datacom) and LEO satellite** end-markets as handset GaAs softens | DigiTimes 2026-02 |
| End-markets | Mobile, Wi-Fi, cellular infrastructure, **satellite comms**, optical comms, 3D sensing | DigiTimes |

The 2025 dip + deliberate pivot is the key dated update: handset GaAs is mature/cyclical, so Win is repositioning the same GaAs/GaN process base toward optical-datacom and LEO RF — the growth vectors mapped in [[synthesis/phased-array-rf-frontend-supply-chain]] and [[concepts/orbital-data-center]].

## H1-2026 — the pivot starts showing in the numbers (verified 2026-08-23)

| Metric | Value | Source |
|---|---|---|
| Q2-2026 revenue | **NT$5.257 B**, +14.5% QoQ / **+39.1% YoY**, ~4-year high | [cnYES 2026-07 (法說)](https://news.cnyes.com/news/id/6545087) |
| Q2-2026 EPS | **NT$2.30** (beat ≈NT$1.43 consensus) | cnYES |
| H1-2026 revenue | **NT$9.847 B** | cnYES / [Sinotrade RichClub 2026-08](https://www.sinotrade.com.tw/richclub/hotstock/穩懋半導體-3105) |
| H1-2026 EPS | **NT$3.56** (Q1 NT$1.26 + Q2 NT$2.30) | Sinotrade |
| Q1-2026 gross margin | 32.2% | Sinotrade |
| Optical (datacom) revenue mix | **high-single-digit %**, ≈**2× YoY**; receiver-side **1.6T PD** volume-production from late Q2; guided toward **double-digit % by 2027** | Sinotrade / [vocus 法說 2026-07-24](https://vocus.cc/article/6a68b0c0fd897800018799d9) |
| Q3-2026 guidance | revenue **and** gross margin to grow QoQ on **1.6T optical + rising LEO-satellite demand** | vocus / [ChinaTimes 2026-07-25](https://www.chinatimes.com/realtimenews/20260725001277-260410) |

The read: the FY2025 "handset-GaAs → optical-datacom + LEO RF" pivot narrative is now **backed by two consecutive record-trajectory quarters**. AI-datacenter high-speed optical (the 1.6T photodiode ramp) is the near-term engine; LEO-satellite RF is the twin Q3 driver Win explicitly names. This is the clearest evidence in the [[synthesis/leo-taiwan-odc-gap|upstream cluster]] that the ODC/AI-compute buildout pulls Taiwan's compound-semi foundry demand *up*, not just its board/passive suppliers.

## Q3-2026 monthly prints — the ramp confirms into the second half (verified 2026-09-15)

| Metric | Value | Source |
|---|---|---|
| Jul-2026 revenue | **NT$1.892 B** (NT$18.92 億) — a 56-month single-month high | [cnYES 焦點股 2026-09](https://news.cnyes.com/news/id/6601476) |
| Aug-2026 revenue | **NT$1.937 B** (NT$19.37 億), +2.4% MoM, **+30.55% YoY** — second consecutive 56-month high | [cnYES 營收速報 2026-09-09](https://news.cnyes.com/news/id/6600148) |
| 8M-2026 cumulative | **NT$13.676 B** (NT$136.76 億), **+33% YoY** | cnYES |
| Q3 drivers | AI optical (datacom) + LEO-satellite demand; Wi-Fi turned QoQ-positive on router restocking | cnYES / [工商時報 2026-09-15](https://www.ctee.com.tw/news/20260915700895-430201) |

The read: Jul + Aug are Win's **highest monthly revenues since Dec-2021**, extending the Q2 record trajectory into Q3 and validating the guidance that gross margin and revenue both grow QoQ. Foreign brokers lifted the target toward **NT$500**. The 8M print (+33% YoY) is the strongest single-name confirmation in the cluster that the *ODC/AI-optical + LEO* twin demand vector is now feeding the compound-semi foundry tier, not just boards/passives — the same signal now visible in [[entities/ascend-tech|Ascend]] (Aug +93% YoY) and [[entities/huatong-pcb|Compeq]].

## LEO Satellite Positioning

**Global leader in LEO-spec PA foundry services.** LEO constellations (Starlink, Amazon Kuiper class) drive demand for the GaAs/GaN RF front-end PA chips Win fabricates; with Starlink V3 (more laser ISLs, higher power) and AI-computing-satellite RF demand, Win is one of the most direct upstream beneficiaries in the LEO supply chain. *(Specific named-customer foundry contracts are not publicly confirmed by Win; treat constellation attribution as market-level, not contractual.)*

## Six-region foundry context

Win is the Taiwan node of the GaN/GaAs RF foundry tier mapped in [[synthesis/phased-array-rf-frontend-supply-chain]]: it competes with the captive/IDM GaN lines of **Qorvo / [[entities/macom]] (US** — MACOM having absorbed Wolfspeed's RF GaN-on-SiC business in 2023, after which Wolfspeed exited RF entirely to focus on SiC substrates/power), **STMicro / Infineon (Europe)**, **Sumitomo / Mitsubishi (Japan)**, and the sovereign-by-sanction domestic GaN build-out in **China (CETC-affiliated)**. Win's edge is merchant-foundry scale and >50% GaAs share; its structural limit is the same as the rest of Taiwan's RF stack — foundry-strong, **system/space-grade-integration-absent** ([[synthesis/leo-taiwan-odc-gap]]).

## Company lineage + long-horizon view (拉長時間軸)

- **Backward:** founded **1999**; built the merchant **GaAs HBT/pHEMT** foundry model that let fabless RF houses (Skyworks/Qorvo-class designs) outsource compound-semi fab, then extended into **GaN-on-SiC** for higher-power infrastructure/satellite PAs. Two decades of process accumulation = the same *qualification/process moat* that defends [[entities/ascend-tech]] (passives) and [[entities/huatong-pcb]] (boards).
- **~2030:** the deliberate handset-GaAs → **optical-datacom + LEO RF** pivot (above) is the bet; growth tracks AI-cluster optical-interconnect volume and constellation PA demand.
- **~2040+ / 100-year (labelled scenario):** compound semiconductors remain the unavoidable physics layer for high-power/high-frequency RF and optical front-ends — a permanent toll booth like the rest of the cluster. The structural risk is **GaN-IDM in-sourcing** (US/Europe primes captive lines — the concrete 2023–2025 example is [[entities/macom]] absorbing Wolfspeed's RF GaN-on-SiC line and taking full control of the RTP fab in 2025-07) and **China's sovereign-by-sanction GaN build-out** eroding merchant-foundry share, not technology obsolescence ([[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/orbital-data-center-six-region]]).

## Taiwan LEO Supply Chain Position

See [[concepts/leo-value-chain]] upstream RF segment.

## Related Sources

- [[sources/leo-space-datacenter-analysis-2025]]

## Related

- [[concepts/leo-value-chain]]
- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[concepts/dpd-digital-predistortion]]
- [[concepts/zero-if-transmitter]]
- [[concepts/rha-radiation-hardening]]
- [[entities/ascend-tech]]
- [[entities/huatong-pcb]]
- [[entities/macom]]
- [[synthesis/phased-array-rf-frontend-supply-chain]]
- [[synthesis/leo-taiwan-odc-gap]]
- [[synthesis/orbital-data-center-six-region]]
