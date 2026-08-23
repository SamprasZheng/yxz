---
type: entity
tags: [taiwan, rf-hardware, satellite, leo, filter, waveguide, supply-chain]
---

# Ascend Tech / UMT (昇達科技, Universal Microwave Technology, Stock: 3491)

## Basic Information

- Taiwan-listed company (TPEx/OTC: **3491**); English corporate name **Universal Microwave Technology, Inc. (UMT)** — "昇達科技" = Ascend Tech; same company (the wiki previously used only the Chinese short name).
- Core products: **microwave passive components** — filters, waveguides, diplexers, and satellite-communication subassemblies.
- Sits in the **passive RF** segment, structurally opposite [[entities/win-semiconductors|Win's]] active-device foundry: Ascend's moat is high-precision machining fused with RF design, not wafer fab.

## 2025 financials (verified 2026-06-22)

| Metric | Value | Source |
|---|---|---|
| FY2025 revenue | **NT$2.452 B**, +5.02% YoY, **all-time high** | [cnYES 2026-01](https://news.cnyes.com/news/id/6303196) |
| 9M-2025 (Q1–Q3) gross margin | **47.3%** | cnYES / company filing |
| 9M-2025 net profit (after tax) | NT$303 M; **EPS NT$4.6** | cnYES |
| Q4 2025 revenue | **NT$834 M**, +72.44% QoQ, +35.94% YoY, record | cnYES |
| Dec 2025 revenue | NT$321 M, +38.46% YoY, record | cnYES |
| Growth driver | LEO satellite ground/space RF components entering dense-deployment phase | cnYES |

> **Corrected (2026-06-22):** the prior page listed gross margin "**>50%**" sourced only to [[sources/leo-space-datacenter-analysis-2025]] and flagged it as unconfirmed. The verified 9M-2025 figure is **47.3%** — high (well above PCB makers, consistent with the passive-precision moat) but not >50%. Restated above with a primary source. Named-customer (Starlink/Kuiper) attribution remains market-level, not a disclosed contract.

## H1-2026 financials — margin expansion + record half (self-reported, verified 2026-08-23)

| Metric | Value | Source |
|---|---|---|
| Q1-2026 revenue | **NT$1.02 B** (NT$10.2 億), single-quarter record | [cnYES 2026](https://news.cnyes.com/news/id/6546787) |
| Q2-2026 revenue | **NT$902 M** (NT$9.02 億) | cnYES / [Yahoo TW 2026-07](https://tw.stock.yahoo.com/news/昇達科自結上半年稅後賺5-61億元-eps8-15元) |
| Q2-2026 gross margin | **55.6%** (−2.38 pt QoQ, **+12.25 pt YoY**) | cnYES |
| Q2-2026 net profit / EPS | NT$308 M / **EPS NT$4.47** | cnYES |
| **H1-2026 revenue** | **NT$1.922 B**, gross margin **≈56.9%** | Yahoo TW / cnYES |
| **H1-2026 net profit / EPS** | **NT$561 M / EPS NT$8.15 — H1 profit alone > every prior full-year total** | Yahoo TW |
| LEO product mix | **≈80% of revenue** (Q1 LEO rev ≈NT$815 M) | [cnYES 2026 法說](https://news.cnyes.com/news/id/6562930) |
| Outlook | Q3 > Q2's NT$902 M; Q4 to exceed the Q1 NT$1.02 B record; 2027 further growth | cnYES |

> **Margin update (2026-08-23):** the canonical gross-margin figure on this page steps from **9M-2025 ≈47.3% → H1-2026 ≈56.9%** — a ~10-point expansion, driven by LEO product mix rising to ≈80% of revenue and satellite-grade pricing power. This is the concrete rebuttal to the cluster's "operators dual-source → Taiwan upstream margins compress" risk ([[synthesis/leo-taiwan-odc-gap]] falsifier #5): through mid-2026 the passive-precision moat is *widening* margins, not eroding them. Both the record-half framing and the margin are **company self-reported (自結)** ahead of audited financials — treat as directional-but-management-sourced.

## LEO satellite positioning

Widely reported as having entered the **Starlink** and **Amazon Kuiper** supply chains; among the highest-gross-margin Taiwan LEO upstream component makers. Revenue is now visibly LEO-cyclical — the Q4-2025 / FY-2025 records track the international constellations' deployment cadence, which is the cleanest evidence in the cluster that a Taiwan passive-RF vendor has cleared satellite-grade qualification rather than staying in terrestrial telecom.

## Competitive advantages

Satellite filters and waveguides require high-precision machining integrated with RF design — high entry barriers, plus long satellite-grade certification cycles, create strong supplier stickiness. This is a **passive-component, qualification-based** moat, structurally different from Win's active-device foundry moat and similar in kind to [[entities/huatong-pcb|Compeq's]] board-qualification moat — all three Taiwan nodes defend on *accumulated qualification*, not fast-cloned IP.

## Six-region waveguide / filter context (水平展開)

The space-grade waveguide-filter tier is less concentrated than the converter or T&M tiers, but the high-reliability end is still dominated by Western primes' supply chains:

| Region | Role | Representative players |
|---|---|---|
| **Taiwan** | Precision-machined passives into Starlink/Kuiper; rare cleared-midstream-RF role | **Ascend/UMT (3491, this page)** |
| **US** | High-reliability microwave passives, defense heritage | Smiths Interconnect, MtronPTI |
| **Europe** | Space-qualified filters/multiplexers, comms-payload heritage | Tesat, COBHAM/Exodus heritage, Thales-adjacent |
| **Japan** | Ultra-precision machining houses | precision-machining suppliers |
| **China** | Sovereign domestic filter/waveguide base | domestic |

Read: Taiwan's precision-machining + RF-design combination is a **genuine niche strength** here — one of the few midstream RF roles where a Taiwan vendor has cleared satellite-grade certification rather than staying upstream. It remains, however, a component supplier into others' systems — consistent with the [[synthesis/leo-taiwan-odc-gap|midstream-C gap]] and the broader [[synthesis/phased-array-rf-frontend-supply-chain|RF front-end supply-chain map]].

## Long-horizon view (拉長時間軸, labelled scenario)

- **~2030:** revenue stays LEO-cyclical; the bull case is content-per-satellite rising (more filters/waveguides per higher-band Starlink V3 / Kuiper / direct-to-cell payload).
- **~2040+:** passive RF is a slow-moving, qualification-gated franchise — the structural risk is constellation operators in-sourcing or dual-sourcing passives, not technology obsolescence. The durable position is the qualified-supplier slot itself.
- The 100-year invariant is the same as the rest of the cluster: **every RF payload needs qualified passives, and qualification is sticky** — a permanent but commoditisable toll booth ([[synthesis/leo-taiwan-odc-gap]]).

## Taiwan LEO supply-chain position

Upstream RF (passive) segment of [[concepts/leo-value-chain]], feeding the same payloads as [[entities/win-semiconductors]] (active PA) and boarded by [[entities/huatong-pcb]] (interconnect).

## Related sources

- [[sources/leo-space-datacenter-analysis-2025]]

## Related

- [[concepts/leo-value-chain]]
- [[concepts/aesa]]
- [[concepts/hybrid-phased-array]]
- [[concepts/zero-if-transmitter]]
- [[concepts/rha-radiation-hardening]]
- [[entities/win-semiconductors]]
- [[entities/huatong-pcb]]
- [[synthesis/phased-array-rf-frontend-supply-chain]]
- [[synthesis/leo-taiwan-odc-gap]]
