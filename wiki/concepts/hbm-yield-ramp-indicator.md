---
type: concept
tags: [us-equities, leading-indicator, trader-agent, ai-hardware, semiconductors, memory, hbm]
---

# HBM 良率爬坡 — HBM Yield Ramp Indicator

The HBM yield ramp indicator tracks the production yield and customer qualification progress of High Bandwidth Memory (HBM) — the stacked DRAM that ships bonded to every high-end AI accelerator (NVIDIA H100/H200/B200/GB200, Google TPU v5/v6/v7, AMD MI300X). Yield is a leading indicator for AI chip supply because CoWoS advanced packaging at TSMC bonds HBM stacks to GPU/ASIC dies in the same process step; if either the HBM yield or the CoWoS yield drops, the assembled accelerator cannot ship.

## What It Is / Why It Leads

HBM is manufactured by stacking 8–16 individual DRAM dies using Through-Silicon Via (TSV) interconnects, then microbumping the entire stack onto a logic die (controller/buffer). The stacking process is yield-limiting: a single bad die in a 12-die stack scraps the entire unit. As stack height increases (8Hi → 12Hi → 16Hi for HBM4E), yield sensitivity compounds.

The physical mechanism that makes yield a leading indicator:

1. **TSV yield × die count = stack yield** — at 99% per-die TSV yield, a 12-die stack has only 88.6% probability of being defect-free. Improving TSV yield from 99% to 99.5% raises stack yield to 94.2% — a 6-point improvement that materially changes output per wafer.
2. **CoWoS capacity is fully booked** — TSMC's CoWoS-L and CoWoS-S are 100% allocated through end-2026, with monthly capacity of 75,000–80,000 wafers scaling toward 120,000–130,000 by end-2026. Every HBM stack that fails qualification consumes a CoWoS slot that cannot be recovered quickly. See the CoWoS data from TrendForce at [[sources/trendforce-hbm-tracking-2026]].
3. **Qualification gates** — NVIDIA, Google, Amazon, and AMD each run independent qualification programs. A memory supplier must pass qualification before any volume HBM can ship into an accelerator. Samsung's failure to qualify 8Hi HBM3E for NVIDIA until September 2025 (18 months after development) eliminated its GPU revenue for that window entirely; SK Hynix captured ~62% HBM market share as a result.
4. **Silicon-per-bit intensity** — HBM3E consumes ~3× the DRAM silicon vs. DDR5 per bit. A yield improvement thus has an outsized capacity multiplier: if yield rises 5 percentage points, effective output rises by ~5%/(1-baseline_yield) — more than 5% at the wafer level because fewer die are scrapped.

## What to Watch (Sub-Metrics)

| Sub-metric | What it signals | Data source | Cadence |
|---|---|---|---|
| HBM3e/HBM4 yield rates (% good die per wafer) | Production efficiency; gross margin direction | Memory-maker earnings calls; TrendForce yield commentary | Quarterly |
| Customer qualification status (NVIDIA/Google/AMD/Amazon) | Revenue gating event — approval unlocks volume | Company press releases; SEC 8-K filings | Event-driven |
| CoWoS capacity utilization at TSMC | Joint bottleneck with HBM; if CoWoS is full and yield falls, accelerator output falls more than proportionally | TSMC quarterly call; TrendForce CoWoS tracking | Quarterly |
| HBM ASP trends ($/GB or $/stack) | Margin direction; demand/supply balance | TrendForce HBM price tracking; earnings guidance | Monthly/Quarterly |
| Memory-maker capex (SK Hynix, Samsung, Micron) | 12–18 month capacity signal | Annual/quarterly earnings | Quarterly |
| Stack height in production (8Hi vs 12Hi mix) | Technology maturity; yield at leading edge | Earnings calls; technology day announcements | Quarterly |
| HBM content per accelerator | Demand intensity per GPU unit | NVIDIA product specs; analyst estimates | Per new GPU platform |

## Update Cadence and Data Sources

- **Quarterly**: SK Hynix, Samsung Electronics, Micron Technology earnings calls are the primary source. NVIDIA quarterly calls (10-Q at SEC EDGAR, see [[sources/sec-edgar-api-2025]]) report on HBM supply tightness.
- **Monthly**: TrendForce HBM4/HBM3e tracking at [trendforce.com/news/](https://www.trendforce.com/news/) — TrendForce is the most-cited independent tracker. Verified live as of June 2026.
- **Event-driven**: OEM qualification announcements (press releases + Tom's Hardware / KED Global / Nikkei reporting).

See [[sources/trendforce-hbm-tracking-2026]] for the canonical data feed anchor.

## 2025–2026 Verified State of Play

### Supplier Market Share and Qualification Status (as of Q2 2026)

| Supplier | HBM3e Status | HBM4 Status | NVIDIA Share |
|---|---|---|---|
| **SK Hynix** | Dominant; ~62% HBM revenue H1 2025; 2026 HBM supply fully pre-booked; M15X Cheongju fab operational for HBM4 (May 2026 pilot) | Mass-production system in place Sept 2025; first paid samples to NVIDIA Dec 2025; contracts finalized Q1 2026; ~67% of NVIDIA HBM4 allocation | ~67% of NVIDIA HBM4 |
| **Samsung** | Cleared NVIDIA 12-layer HBM3e qualification September 2025 after 18-month delay; redesigned DRAM core to fix thermal issues; sold out 2026 HBM supply after Nvidia qualification | HBM4 samples delivered Dec 2025; mass production targeted Feb 2026; achieved pricing parity with SK Hynix for HBM4 (vs. 30% discount on HBM3e); adopted 4nm logic die + 6th-gen 10nm-class DRAM | ~30%+ NVIDIA HBM4; dominant Google TPU3e supplier (60%+) |
| **Micron** | 12Hi HBM3e yields "rapidly improving"; 12Hi to surpass 8Hi in shipment volume by August 2025; product powering NVIDIA B300; praised by major CSPs; 1b-process (10nm class) advantage in heat management | HBM4 samples delivered to multiple customers; mass production ramp calendar 2026; HBM4E planned 2027–2028 | Minority share; growing fast |

Key dated facts:
- Samsung passed NVIDIA HBM3e 12-layer qualification: **September 2025** (Tom's Hardware, KED Global)
- SK Hynix HBM4 paid samples to NVIDIA: **December 2025** (~20,000–30,000 final samples; TrendForce Dec 16, 2025)
- HBM4 contract finalization at NVIDIA: **Q1 2026** (TrendForce Jan 28, 2026)
- HBM4 12-layer pricing expected to exceed **$600 per stack** (TrendForce Jan 2026)
- HBM3e 20% ASP hike planned by Samsung and SK Hynix for 2026 (TrendForce Dec 24, 2025), driven by NVIDIA H200 China export approval (40,000–80,000 chips) + Google TPU v7 (8 stacks/chip) + Amazon Trainium3 (4 stacks/chip)
- 2026 HBM revenue mix forecast: ~55% HBM4, ~45% HBM3e (TrendForce Jan 2026)
- Samsung ships industry-first **HBM4E** samples (3.6 TB/s, 16 Gbps pin speed): **May 30, 2026** (TechTimes); full qualification may slip to late 2026

### CoWoS / Advanced Packaging Bottleneck

TSMC CoWoS-L and CoWoS-S fully booked as of December 2025 (TrendForce). Equipment suppliers fulfilling only ~50% of TSMC's expansion orders. ASE/SPIL entering with CoWoP (Chip-on-Wafer-on-PCB) at 20,000–25,000 wafers/month by end 2026. AP8 facility (Southern Taiwan Science Park) and AP7 (Chiayi) both began equipment installation in late 2025. This bottleneck is a **joint constraint**: HBM yield improvement alone does not translate to more accelerator output if CoWoS slots are unavailable.

### SK Hynix Capex Signal

SK Hynix maintains capex at ~mid-30% of sales on a 3-year moving average, with "significantly higher" investment in 2026. The Cheongju M15X fab carries >KRW 20 trillion investment and will produce both HBM3e and HBM4 alongside HBM4E development lines.

## Interpretation / Judgment Table

| Observation | Physical mechanism | Memory/equipment signal | AI-chip downstream signal |
|---|---|---|---|
| Yield rising + ASP stable + capacity sold out | Efficiency gain without ASP dilution; scarce supply | **Highly bullish** — MU, AMAT, LRCX, KLAC (yield tools drive equipment spend); SK Hynix/Samsung gross margin expansion | **Bullish** for NVDA AI revenue; constrained volumes still mean premium ASP |
| Yield rising + ASP falling (HBM commoditizing) | Too many good stacks; demand failing to absorb | Mixed for memory makers; margins compress | Neutral to bullish for GPU OEM (lower BoM) but may signal AI capex cycle peak |
| Yield stuck + qualification delayed | Stack defect rate persists; TSV or microbump issue | **Bearish** for memory maker in question; competitor takes share | **Bearish** for NVDA GB300/Rubin ramp timing; may delay GPU availability |
| New supplier qualifies (e.g., Samsung passed HBM3e Sept 2025) | Supply source diversified | Mixed — incumbent loses exclusivity, market grows | Neutral to bullish — NVDA now has dual supply security |
| CoWoS capacity expansion announced | Packaging bottleneck loosens in 12–18 months | Bullish for TSMC-adjacent OSAT (ASE) and equipment (KLAC/LRCX/AMAT) | Bullish for GPU volume ramp 12–18 months out |
| CoWoS oversold / equipment orders at 50% fulfillment | Hard physical constraint on packaging throughput | Bullish for AMAT/LRCX/KLAC equipment pricing | Cap on how fast HBM yield improvements can translate to accelerator volume |
| Memory capex surges (SK Hynix M15X, Samsung 50% HBM capacity surge) | 18–24 month capacity signal | Near-term positive for WFE (AMAT/LRCX/KLAC/ASML); watch for oversupply signal 2027+ | Longer term: more HBM capacity → lower ASP → lower memory-make margin |

**Engineering logic behind the HBM yield-chip-volume coupling**: NVIDIA's GB200 contains six HBM3e stacks per GPU; each 96-GB HBM3e stack is a 12-die assembly. One GPU therefore requires 72 individually-stacked DRAM dies to be defect-free. A 1% improvement in per-die yield across a 12-die stack increases GPU final yield by several percent — a direct multiplier on accelerator shipment volume.

## Representative Tickers (Sector Proxies)

Illustrative sector proxies; not the owner's holdings.

| Ticker | Supply-chain role | HBM exposure |
|---|---|---|
| MU (Micron) | HBM manufacturer (ramp #3 behind SK Hynix, Samsung); 1b-process advantage in heat management | Direct — revenue gated by yield ramp |
| AMAT (Applied Materials) | Deposition, etch, TSV fill, packaging equipment | High — each yield problem triggers equipment upgrades |
| LRCX (Lam Research) | Etch equipment for TSV; CVD for inter-die layers | High — TSV etch is a key yield step |
| KLAC (KLA) | Wafer inspection and yield management tools | Direct — KLA process control systems enable yield ramp |
| ASML | EUV lithography for 1b-class DRAM base die | High exposure at leading edge; limited to EUV-enabled nodes |
| TSM (TSMC) | CoWoS advanced packaging; logic die for HBM4 controller | Critical packaging bottleneck; capacity = accelerator throughput |
| NVDA | Largest customer; sets HBM spec and qualification bar | Downstream — supply constraints cap revenue ramp |

## Cross-Links

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[concepts/liquid-cooling-leadtime-indicator]] — sister indicator; liquid cooling lead times determine how fast a qualified GPU can be integrated into a server rack and shipped
- [[concepts/cots-gpu-radiation-risk]] — mentions HBM3 ECC coverage and radiation risk context for COTS GPUs in space; different application but same physical components
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent context that motivated this indicator cluster
- [[synthesis/ai-quant-trading-oss-stack-selection]] — OSS stack where this indicator feeds as a macro/alternative data input
- [[sources/trendforce-hbm-tracking-2026]] — canonical TrendForce HBM data feed
- [[sources/sec-edgar-api-2025]] — earnings filings for MU, AMAT, LRCX, KLAC, TSM, NVDA
- [[entities/nvidia]] — sets HBM qualification bar; largest HBM customer
