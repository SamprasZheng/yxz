---
type: entity
tags: [taiwan, pcb, satellite, leo, manufacturing, rf-hardware, substrate, supply-chain, hdi]
---

# Huatong / Compeq (華通電腦, COMPEQ MANUFACTURING, Stock: 2313)

## Basic Information

- Taiwan-listed PCB manufacturer (TWSE: **2313**); English corporate name **Compeq Manufacturing Co., Ltd.** ("華通電腦" = Huatong; the two names refer to the same company — the wiki previously used only the Chinese name).
- Founded **August 1973** in Luzhu, Taoyuan — **Taiwan's first specialized printed-circuit-board company**, established to support the government's high-tech industrial policy.
- Global leader in **high-density interconnect (HDI)** PCBs; product span = multilayer / HDI / high-layer-count / FPC / rigid-flex / PCBA.

## Company lineage (拉長時間軸 — backward)

| Year | Milestone | Why it matters |
|---|---|---|
| **1973** | Founded; single/double-sided PCBs | First dedicated PCB house in Taiwan — the seed of the island's PCB cluster (now ~30%+ of global PCB value) |
| **1983** | Mass production of 6+-layer multilayer boards | Moved up the complexity curve early |
| **1989** | Utah (USA) plant | Early globalisation; later relevant to defense/aerospace proximity |
| **1996** | Huizhou (China) plant | Mainland cost base for volume consumer boards |
| **1998–99** | Class-1000 cleanroom plant (Taoyuan) + **laser-drilled HDI / micro-via** for mobile + base stations | Pivot into high-end communication PCBs — the technology base later reused for satellite boards |
| **2020s** | "Satellite + AI dual-theme" growth stock | HDI know-how redeployed into LEO satellite boards and AI-server/data-center boards |

The throughline: Compeq has spent 50 years climbing the **reliability/precision** curve (single-sided → multilayer → HDI/micro-via). Space-grade boards are the current top of that same curve — the moat is accumulated process control, not any single product.

## LEO satellite positioning

Compeq is a core PCB supplier to **SpaceX Starlink** and **Amazon Kuiper**, leveraging its HDI base into satellite-dedicated boards.

| Metric | Value | Source / note |
|---|---|---|
| FY2025 total revenue | **≈NT$76.0 B** (NT$759.96 億), +4.87% YoY, three-year high | [vocus deep analysis](https://vocus.cc/article/69609d46fd897800012c7c3b), [DigiTimes 2025-12](https://www.digitimes.com/news/a20251202PD219/leo-pcb-economy-taiwan-launch.html) |
| **2025 satellite-board revenue** | **>NT$15.1 B**, ≈**20% of total revenue** | DigiTimes / vocus (full-year 2025) |
| 2026 satellite-board target | **NT$20 B**, ≥+30% YoY | company guidance via vocus |
| Customers | Starlink, Kuiper | market-level |

> **Corrected (2026-06-22):** the prior version of this page recorded "2025 **Q4** LEO satellite-board revenue >NT$15.5 B (all-time high)." The authoritative figure (~NT$15.1 B, ≈20% of NT$76 B total) is a **full-year 2025** number, not a single quarter — the "Q4" attribution was an error. Restated above; the older $25B→$45B "global LEO investment" framing came from [[sources/leo-space-datacenter-analysis-2025]] and is one analyst definition (LEO market-size estimates vary widely by methodology — e.g. ~$12.6B (2024)→~$41B (2033) on a narrower "LEO satellite market" basis), so treat absolute market totals as order-of-magnitude.

> The frequently-cited **"~80% global market share in LEO-dedicated PCBs"** is an analyst/market-level figure repeated in Taiwan press; no independent primary audit of the denominator was found on a 2026-06-22 check — treat as directional dominance, not a precise audited share.

## Competitive advantages

Satellite PCBs demand far higher reliability, **radiation tolerance** ([[concepts/tid-total-ionizing-dose]] / [[concepts/see-single-event-effects]]), thermal-cycling endurance, and outgassing control than consumer boards; the certification barrier ([[concepts/rha-radiation-hardening]]) plus long qualification cycles create strong supplier stickiness. This is a **process-and-qualification moat** layered on top of HDI scale — structurally similar to [[entities/ascend-tech|Ascend's]] precision-machining moat and [[entities/win-semiconductors|Win's]] foundry moat: all three are upstream/midstream-A Taiwan nodes whose defensibility is *accumulated qualification*, not IP they can be designed around quickly.

## Six-region high-reliability PCB / IC-substrate context (水平展開)

The board/substrate layer beneath every RF front-end ([[synthesis/phased-array-rf-frontend-supply-chain]]) and every orbital compute node ([[synthesis/orbital-data-center-six-region]]). The advanced end is an Asia-anchored oligopoly — APAC ≈**78%** of the advanced-IC-substrate market (2025), and the top-five FCBGA makers (**Unimicron, Ibiden, Nan Ya PCB, Shinko, AT&S**) hold ≈**60%** of global advanced-substrate capacity:

| Region | High-reliability / space PCB & substrate role | Representative players |
|---|---|---|
| **Taiwan** | HDI + FCBGA volume leader; LEO satellite-board leader | **Compeq (2313, this page)**, Unimicron, Nan Ya PCB, Kinsus, Gold Circuit |
| **US** | **Aerospace & defense high-frequency/high-speed boards — undisputed global leader**; CHIPS-Act substrate build-out | **TTM Technologies** |
| **Japan** | High-end IC substrates / FCBGA, server boards (14–16 layer); $1.2B Arizona substrate fab | **Ibiden, Shinko Electric** |
| **Korea** | ABF / FCBGA substrates | Samsung Electro-Mechanics, LG Innotek, Daeduck |
| **Europe** | Automotive/industrial + defense; $800M Texas fab | **AT&S** (Austria), Schweizer (Germany) |
| **China** | Sovereign domestic build-out, volume HDI; high-reliability/space end still catching up | domestic (e.g. SCC, WUS) |

Key read: Taiwan **leads on commercial HDI/satellite-board volume** but the **defense/aerospace space-qualified niche is US-held (TTM)** and the highest-end substrate IP is Japan/Korea — the same *upstream-strong / top-of-stack-elsewhere* signature as the rest of Taiwan's space supply chain ([[synthesis/leo-taiwan-odc-gap]]). Compeq's commercial-LEO dominance is real but sits one tier below the mil-space-qualified board franchise.

## Long-horizon view (拉長時間軸 — forward, labelled scenario)

- **~2030:** LEO board demand scales with Starlink V3 / Kuiper full deployment + the first wave of orbital-data-center buses ([[concepts/orbital-data-center]]); Compeq's satellite line plausibly grows from ~20% toward a larger revenue share if the NT$20B/2026 target trajectory holds.
- **~2040:** the binding question becomes **radiation- and thermal-cycle-qualified board processes** as compute density per satellite rises (the σT⁴ heat-rejection ceiling of [[synthesis/orbital-data-center-six-region]] pushes more dissipation through the board stack).
- **~2100 (structural, not forecast):** PCB/substrate is a *permanent toll booth* — every electronic system that flies needs a qualified interconnect layer, and qualification is slow-moving and sticky. The risk to a commercial-volume leader is not disappearance but **commoditisation** if space-grade qualification diffuses; the durable franchise is the mil/space-qualified niche currently held outside Taiwan.

## Taiwan LEO supply-chain position

Midstream-A segment of [[concepts/leo-value-chain]] (board/interconnect), feeding the upstream RF segment ([[entities/win-semiconductors]], [[entities/ascend-tech]]) and the midstream-C ODC gap ([[synthesis/leo-taiwan-odc-gap]]).

## Related sources

- [[sources/leo-space-datacenter-analysis-2025]]

## Related

- [[concepts/leo-value-chain]]
- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[concepts/rha-radiation-hardening]]
- [[concepts/tid-total-ionizing-dose]]
- [[concepts/see-single-event-effects]]
- [[concepts/orbital-data-center]]
- [[entities/win-semiconductors]]
- [[entities/ascend-tech]]
- [[synthesis/leo-taiwan-odc-gap]]
- [[synthesis/phased-array-rf-frontend-supply-chain]]
- [[synthesis/orbital-data-center-six-region]]
</content>
</invoke>
