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

## LEO Satellite Positioning

**Global leader in LEO-spec PA foundry services.** LEO constellations (Starlink, Amazon Kuiper class) drive demand for the GaAs/GaN RF front-end PA chips Win fabricates; with Starlink V3 (more laser ISLs, higher power) and AI-computing-satellite RF demand, Win is one of the most direct upstream beneficiaries in the LEO supply chain. *(Specific named-customer foundry contracts are not publicly confirmed by Win; treat constellation attribution as market-level, not contractual.)*

## Six-region foundry context

Win is the Taiwan node of the GaN/GaAs RF foundry tier mapped in [[synthesis/phased-array-rf-frontend-supply-chain]]: it competes with the captive/IDM GaN lines of **Qorvo / Wolfspeed / MACOM (US)**, **STMicro / Infineon (Europe)**, **Sumitomo / Mitsubishi (Japan)**, and the sovereign-by-sanction domestic GaN build-out in **China (CETC-affiliated)**. Win's edge is merchant-foundry scale and >50% GaAs share; its structural limit is the same as the rest of Taiwan's RF stack — foundry-strong, **system/space-grade-integration-absent** ([[synthesis/leo-taiwan-odc-gap]]).

## Company lineage + long-horizon view (拉長時間軸)

- **Backward:** founded **1999**; built the merchant **GaAs HBT/pHEMT** foundry model that let fabless RF houses (Skyworks/Qorvo-class designs) outsource compound-semi fab, then extended into **GaN-on-SiC** for higher-power infrastructure/satellite PAs. Two decades of process accumulation = the same *qualification/process moat* that defends [[entities/ascend-tech]] (passives) and [[entities/huatong-pcb]] (boards).
- **~2030:** the deliberate handset-GaAs → **optical-datacom + LEO RF** pivot (above) is the bet; growth tracks AI-cluster optical-interconnect volume and constellation PA demand.
- **~2040+ / 100-year (labelled scenario):** compound semiconductors remain the unavoidable physics layer for high-power/high-frequency RF and optical front-ends — a permanent toll booth like the rest of the cluster. The structural risk is **GaN-IDM in-sourcing** (US/Europe primes captive lines) and **China's sovereign-by-sanction GaN build-out** eroding merchant-foundry share, not technology obsolescence ([[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/orbital-data-center-six-region]]).

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
- [[entities/huatong-pcb]]
- [[synthesis/phased-array-rf-frontend-supply-chain]]
- [[synthesis/leo-taiwan-odc-gap]]
- [[synthesis/orbital-data-center-six-region]]
