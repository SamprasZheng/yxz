---
type: synthesis
tags: [us-equities, leading-indicator, trader-agent, macro, market-structure, dashboard]
sources:
  - "[[sources/ocp-uqd-spec-2024]]"
  - "[[sources/trendforce-hbm-tracking-2026]]"
  - "[[sources/trendforce-csp-capex-asic-2026]]"
  - "[[sources/stanford-ai-index-2025]]"
  - "[[sources/baker-hughes-rig-count-2026]]"
  - "[[sources/lme-copper-data-2026]]"
  - "[[sources/manheim-used-vehicle-value-index-2026]]"
  - "[[sources/nyfed-household-debt-credit-2026]]"
  - "[[sources/cfpb-bnpl-report]]"
  - "[[sources/ca-dmv-autonomous-vehicle-program]]"
  - "[[sources/nhtsa-sgo-crash-reporting]]"
  - "[[sources/marsh-global-insurance-market-index-2025]]"
  - "[[sources/coalition-cyber-claims-report-2026]]"
  - "[[sources/fbi-ic3-annual-report]]"
  - "[[sources/cboe-spx-0dte-volume-2025]]"
concepts:
  - "[[concepts/liquid-cooling-leadtime-indicator]]"
  - "[[concepts/hbm-yield-ramp-indicator]]"
  - "[[concepts/asic-penetration-indicator]]"
  - "[[concepts/ai-inference-cost-economics]]"
  - "[[concepts/offshore-drilling-dayrate-indicator]]"
  - "[[concepts/lme-copper-inventory-indicator]]"
  - "[[concepts/manheim-used-vehicle-indicator]]"
  - "[[concepts/bnpl-subprime-auto-credit-indicator]]"
  - "[[concepts/glp1-consumer-spillover-indicator]]"
  - "[[concepts/robotaxi-fsd-regulation-tracker]]"
  - "[[concepts/cyber-insurance-attack-frequency-indicator]]"
  - "[[concepts/zero-dte-options-share-indicator]]"
  - "[[concepts/llm-as-feature-engineer]]"
  - "[[concepts/volatility-targeting]]"
  - "[[concepts/event-driven-quant-architecture]]"
---

# 美股次級變數監測儀表板 — US-Equity Secondary-Variable Dashboard

A monitoring framework that decomposes a dozen consensus US-equity narratives ("AI 資本支出在燒錢"、"美國消費要崩了"、"資安是長期趨勢") into **次級變數 (secondary / derivative variables)** — leading signals that can be checked against a public data feed or a line in a quarterly filing, rather than re-litigated as opinion.

The design goal (owner's words): **把「宏觀敘事」拆成可驗證的財報與市場結構訊號** — turn macro storytelling into falsifiable earnings-line and market-structure signals. Each variable below has its own concept page with the sub-metrics, the canonical feed (verified URL), an explicit bull/bear judgment table, and the illustrative sector proxies.

> Scope note: the tickers in every row are **illustrative sector proxies**, not holdings or recommendations. This dashboard is a research instrument for the `trader` agent's perception/regime layer — see [[synthesis/ai-quant-trading-architecture-improvements]] for how signals like these are demoted to feature columns rather than acted on directly.

## The 12 variables

| # | 變數 (Variable) | 主要看什麼 (What to watch) | 節奏 | 判讀邏輯 (Read) | 代表股 (proxies) | Concept page |
|---|---|---|---|---|---|---|
| 1 | 液冷散熱交期 | UQD / CDU / 冷板 / 泵浦 / 歧管 交期；OCP UQD 認證與擴產 | 月/季 | 交期↑ + 毛利↑ → 利多零組件；交期↑ + 整機出貨延後 → 利空伺服器放量 | VRT, ETN, SMCI, DELL, HPE, NVDA | [[concepts/liquid-cooling-leadtime-indicator]] |
| 2 | HBM 良率爬坡 | HBM3e/HBM4 良率、客戶認證、CoWoS 配合度、記憶體廠 capex | 月/季 | 良率↑ + ASP 穩 + 產能售罄 → 利多記憶體/設備；良率卡關 → 拖慢 AI 晶片放量 | MU, AMAT, LRCX, KLAC, ASML, TSM, NVDA | [[concepts/hbm-yield-ramp-indicator]] |
| 3 | ASIC 滲透率 | TPU / Trainium / MTIA / Maia 部署；AVGO/MRVL 客製晶片收入 | 季 | ASIC 比例↑ → 敘事由「GPU 壟斷」轉向「GPU + 客製化晶片」，重估 AVGO/MRVL、壓抑 NVDA 獨佔溢價 | AVGO, MRVL, GOOGL, AMZN, META, MSFT, NVDA | [[concepts/asic-penetration-indicator]] |
| 4 | AI 推論成本 / 退訂率 | $/M token、毛利率、NRR/GRR/RPO、用量型收入增速 | 月/季 | 成本↓ + 留存弱 → AI 工具同質化；成本↓ + NRR 穩 → 真正的利潤轉折 | MSFT, GOOGL, AMZN, NOW, CRM, SNOW, DDOG, PLTR, ADBE | [[concepts/ai-inference-cost-economics]] |
| 5 | 深水鑽井船日租金/稼動率 | Rig count、fleet status、dayrate、contract backlog | 週/月 | 日租金與稼動率「同步」↑ → offshore capex 真正回來（非單月雜訊） | RIG, VAL, NE, SLB, HAL, BKR | [[concepts/offshore-drilling-dayrate-indicator]] |
| 6 | LME 銅庫存/現貨溢價 | LME stocks、cash-3M spread、cancelled warrants、COMEX/SHFE 庫存 | 日/週 | 庫存↓ + 現貨升水擴大 → 實體供應緊；若只是跨市場搬倉（關稅套利）→ 假訊號 | FCX, SCCO, TECK, BHP, RIO, ETN, PWR | [[concepts/lme-copper-inventory-indicator]] |
| 7 | Manheim 二手車指數 | UVVI、零售庫存天數、拍賣成交率 | 月 | 車價反彈 → 核心通膨壓力回來；價格↓ 但違約↑ → 消費信用惡化 | CVNA, KMX, AN, LAD, GM, F, ALLY, COF | [[concepts/manheim-used-vehicle-indicator]] |
| 8 | BNPL / 次級車貸違約 | BNPL charge-off、Affirm delinquency、NY Fed auto delinquency、Fitch subprime ABS | 月/季 | 違約率「先升」通常比信用卡更早反映低收入消費壓力（最早的裂縫） | AFRM, ALLY, COF, SYF, KMX, CVNA | [[concepts/bnpl-subprime-auto-credit-indicator]] |
| 9 | GLP-1 外溢影響 | 處方量、食品籃變化、零食/酒精/外食、CPAP 需求 | 月/季 | 藥品銷售 ≠ 食品股立刻崩；重點是品類組合與消費頻率變化 | LLY, NVO, HSY, MDLZ, PEP, KO, WMT, RMD, PTON | [[concepts/glp1-consumer-spillover-indicator]] |
| 10 | FSD / Robotaxi 法規 | 州級 driverless permit、商營許可、NHTSA crash report、CPUC/DMV 文件 | 事件型 | 真正重估 = 「無安全員 + 可收費 + 可擴區」三者同時成立 | TSLA, GOOGL, AMZN, UBER, LYFT, MBLY | [[concepts/robotaxi-fsd-regulation-tracker]] |
| 11 | 資安險保費 / 攻擊頻率 | Cyber rate、claims frequency、ransom demand、IC3 損失 | 月/季/年 | 保費↑ + 攻擊↑ → 支持資安預算；保費↓ 但攻擊↑ → 軟市場 (soft market)，是定價競爭、不是需求訊號 | CRWD, PANW, ZS, NET, FTNT, S, CHKP | [[concepts/cyber-insurance-attack-frequency-indicator]] |
| 12 | 0DTE 選擇權佔比 | SPX 0DTE volume share、put/call、dealer gamma、VIX/VVIX/SKEW | 日 | **波動放大器，不是基本面**。0DTE 佔比高 → 盤中假突破與急殺更容易出現 | CBOE, IBKR, HOOD（標的 SPX/SPY） | [[concepts/zero-dte-options-share-indicator]] |

## 優先盯的 5 個 (Highest-signal subset)

The owner's top-5 by signal-to-noise — the variables that most directly decide a sector's earnings outcome rather than just colour the narrative:

1. **HBM 良率 + CoWoS** → [[concepts/hbm-yield-ramp-indicator]] — directly gates whether AI-hardware revenue can physically ship.
2. **ASIC 滲透率** → [[concepts/asic-penetration-indicator]] — decides whether AI-semis valuation stays GPU-single-core or re-rates to "GPU + custom silicon".
3. **Manheim + 次級車貸違約** → [[concepts/manheim-used-vehicle-indicator]] + [[concepts/bnpl-subprime-auto-credit-indicator]] — the earliest crossing point of US consumer + inflation risk.
4. **AI 推論成本 + NRR** → [[concepts/ai-inference-cost-economics]] — verifies whether AI software actually earns money (cost down *and* retention stable).
5. **0DTE 佔比** → [[concepts/zero-dte-options-share-indicator]] — not a stock-picking signal, but it decides whether the trading environment itself is prone to distortion.

## 掃描節奏 (Scan cadence)

The practical loop — match polling frequency to each feed's update cadence so the agent isn't re-reading quarterly data daily or missing a daily structural shift:

| Cadence | Variables | Why |
|---|---|---|
| **每週 (weekly)** | 銅 [[concepts/lme-copper-inventory-indicator]] · 0DTE [[concepts/zero-dte-options-share-indicator]] · rig count [[concepts/offshore-drilling-dayrate-indicator]] | High-frequency feeds (LME daily, Cboe daily, Baker Hughes Friday NA count) where weekly sampling catches turns early |
| **每月 (monthly)** | Manheim [[concepts/manheim-used-vehicle-indicator]] · 信用 [[concepts/bnpl-subprime-auto-credit-indicator]] · GLP-1 [[concepts/glp1-consumer-spillover-indicator]] · 液冷 [[concepts/liquid-cooling-leadtime-indicator]] | Monthly index / prescription / lead-time prints |
| **每季 (quarterly, 看財報)** | HBM [[concepts/hbm-yield-ramp-indicator]] · ASIC [[concepts/asic-penetration-indicator]] · AI 軟體留存 [[concepts/ai-inference-cost-economics]] · 資安預算 [[concepts/cyber-insurance-attack-frequency-indicator]] | Confirmed only in 10-Q/10-K and earnings-call commentary |
| **事件型 (event-driven)** | FSD/Robotaxi 法規 [[concepts/robotaxi-fsd-regulation-tracker]] | Re-rates only on a permit / NHTSA filing event, not on a clock |

## 現況快照 — Current readings (2026-06-01)

A dated snapshot to anchor the framework; each concept page carries the full sourcing. These will go stale — re-poll per the cadence table above.

| Variable | Latest verified reading | Direction |
|---|---|---|
| 液冷散熱 | Vertiv Q1 2026 backlog >$15B, book-to-bill ~2.9×; SMCI ~2,000 DLC racks/mo; DLC market +156% YoY (2Q25) | Deep undersupply → component-maker bullish |
| HBM 良率 | HBM4 NVIDIA contracts finalized Q1 2026; SK Hynix ~67% of NVDA HBM4 2026; TSMC CoWoS 100% booked (→120–130K wafers/mo end-26); ~20% HBM3e ASP hike planned; Samsung HBM4E samples 3.6 TB/s (May 30 26) | Sold out; yield is the gate |
| ASIC 滲透率 | Top-8 CSP capex >$710B 2026 (+61% YoY); ASIC AI-server share 27.8% (+44.6% YoY); Google TPU ~78% of Google AI servers; AVGO AI run-rate ~$20B, $73B backlog | Custom-silicon share rising |
| AI 推論成本 | Stanford AI Index: 280× cost decline ($20→$0.07/M, Nov22–Oct24); GPT-4o input → $2.50/M; SNOW NRR ~125%, DDOG ~120%, PLTR GM 84% | Cost ↓; retention so far holding |
| 深水鑽井 | Leading-edge dayrates <$400k (off $515k 2024 peak); 7G marketed utilization ~94% (2026); Transocean backlog ~$7.1B; Transocean–Valaris merger announced Feb 2026 | Near-term soft, forward firming |
| LME 銅 | Cash-3M backwardation ~$19–22/mt (May 26); cancelled warrants ~46% (May 25); COMEX-LME premium ~$390/t (Mar 26) off ~$950/t peak (Jul 25); US Section 232 probe (Feb 25) | Tight, but tariff-arbitrage noise |
| Manheim | UVVI Q1 2026 = 215.3 (+6.2% YoY, strongest since summer 2023); mid-May 213.1 (+3.8%); conversion 61.3%; days-supply 26 | Used-car prices rebounding |
| BNPL / 次級車貸 | Fitch subprime auto ABS 60+ day delinquency **6.90% (Jan 26 — 32-yr high)**; NY Fed Q1 26 auto 90-day transition 2.97%; Affirm 30-day 2.8% | Subprime stress at record |
| GLP-1 | MS projects ~$190B obesity-drug market by 2035; 65% users cut sugary soda / 62% cut alcohol (MS survey); MDLZ Q4 25 vol/mix −4.8%; RMD FY25 +10% (GLP-1 scare reversed) | Category-mix shift, not a cliff |
| Robotaxi | Waymo ~500K paid rides/wk (Mar 26, 10× since May 24), 10 cities; Tesla Austin robotaxi live (Jun 22 25) but still safety-rider, not paid-driverless; NHTSA SGO CFR rulemaking proposed Mar 26 | Waymo clears all 3 gates; Tesla 1 of 3 |
| 資安險 | Marsh cyber rate −5% Q1 2026 (11+ consecutive quarterly declines); FBI IC3 2025 losses $20.877B / >1M complaints (+26% YoY); Coalition 26: freq +3%, ransom demand +47%, 86% refusal | **Soft-market trap**: rates ↓ while attacks ↑ |
| 0DTE | 2025 SPX 0DTE ADV 2.3M / **59% of SPX volume**; Aug 2025 record 62.4%; Q4 2025 2.6M/day | Structurally high → vol-amplifier on |

## 如何接回 trader agent (Wiring into the agent)

These twelve are **perception-layer / regime inputs**, not order signals. They plug into the existing three-layer architecture:

- **As feature columns** — quarterly/monthly readings (HBM, ASIC, NRR, cyber, Manheim, credit) become structured macro/sector feature columns, validated by IC/RankIC before they earn any weight. See [[concepts/llm-as-feature-engineer]].
- **As a regime gate for position sizing** — 0DTE share + VIX/VVIX/SKEW feed the volatility-regime discount that scales notional down in amplification regimes. See [[concepts/volatility-targeting]] and [[concepts/zero-dte-options-share-indicator]].
- **As asynchronous events** — high-frequency feeds (copper, 0DTE, rig count) and event-type triggers (robotaxi permits) arrive on the pub/sub bus rather than blocking the loop. See [[concepts/event-driven-quant-architecture]].
- **Governance** — like every other agent output, an indicator-derived view is logged with provenance and never auto-executes; it informs confidence, it does not pull the trigger ([[synthesis/ai-quant-trading-architecture-improvements]] §3).

## See also

- [[synthesis/ai-quant-trading-architecture-improvements]] — the three-layer architecture these indicators feed (perception → brain → execution), and the risk/governance guardrails
- [[synthesis/ai-quant-trading-oss-stack-selection]] — which OSS components per layer ingest and act on signals like these
- The 12 concept pages linked in the table above — each carries the full sub-metric list, verified feed URLs, judgment table, and proxies
