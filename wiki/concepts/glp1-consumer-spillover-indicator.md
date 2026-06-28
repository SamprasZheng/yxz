---
type: concept
tags: [us-equities, leading-indicator, trader-agent, healthcare, consumer-staples]
---

# GLP-1 外溢影響 (GLP-1 Consumer Spillover Indicator)

## What It Is / Why It Leads

GLP-1 receptor agonists (glucagon-like peptide-1 agonists) — principally semaglutide (Ozempic/Wegovy, NVO) and tirzepatide (Mounjaro/Zepbound, LLY) — suppress appetite by mimicking an incretin hormone. As prescription volumes scale toward mass-market penetration, they are becoming a slow-moving but structurally significant demand shock for US consumer-staples and healthcare sectors.

The signal leads because the drug's commercial adoption precedes any measurable change in category volumes by 12–24 months: prescriptions ramp first, body-weight change accumulates over months, and shifted purchasing behavior appears in scanner data even later. The indicator therefore functions as a long-duration secular demand monitor, not a high-frequency trading signal. It sits within the second layer of the [[synthesis/ai-quant-trading-architecture-improvements]] trader-agent architecture as an exogenous macro feature, updated monthly or quarterly.

## What to Watch (Sub-metrics)

| Sub-metric | Source | Cadence |
|---|---|---|
| Total US GLP-1 TRx (new + refill prescriptions) | IQVIA National Prescription Audit / Fierce Pharma weekly tracker | Weekly (IQVIA licensed); monthly aggregate public |
| LLY/NVO quarterly revenue + volume/mix commentary | SEC 6-K/10-Q filings | Quarterly |
| Packaged food volume/mix (especially snacks, biscuits, chocolate, beverages) | Nielsen/Circana scanner data; company earnings call volume commentary | Monthly/Quarterly |
| Restaurant same-store traffic (casual dining, fast casual) | Company earnings; Black Box Intelligence | Quarterly |
| Alcohol category volume | Distilled Spirits Council; beer/wine company earnings | Quarterly |
| CPAP/sleep-device prescription volume (RMD proxy) | ResMed (RMD) earnings; insurance claims data | Quarterly |
| Fitness spending (gym memberships, equipment) | Peloton (PTON) churn + new member data; Planet Fitness SSS | Quarterly |
| GLP-1 adherence and discontinuation rates | IQVIA adherence studies | Periodic research reports |

## Update Cadence

Monthly for prescription-volume reads (IQVIA aggregate). Quarterly for category-volume confirmation (packaged food earnings + scanner data). The signal evolves slowly — a single quarter's category-volume miss does not confirm a structural shift without prescription trajectory agreement.

### Real Data Feeds

- **IQVIA National Prescription Audit** (licensed; public summary tier): [iqvia.com/insights](https://www.iqvia.com/insights). Captures ~90% of US retail pharmacy dispensing projected to population level. Published monthly for aggregate categories; licensed weekly for brand-level TRx.
- **Fierce Pharma Oral GLP-1 Tracker**: weekly IQVIA-sourced brand-level data [fiercepharma.com](https://www.fiercepharma.com). Free summary, paid detail.
- **Morgan Stanley Research — "GLP-1 Market Expected to More Than Double to $190B by 2035"**: [morganstanley.com/insights/articles/glp1-weight-loss-market-may-double-190-billion-2035](https://www.morganstanley.com/insights/articles/glp1-weight-loss-market-may-double-190-billion-2035) and companion behavioral-shift research at [morganstanley.com/im/en-us/individual-investor/insights/articles/medications-and-shifting-consumer-behavior.html](https://www.morganstanley.com/im/en-us/individual-investor/insights/articles/medications-and-shifting-consumer-behavior.html). Note: MS research articles are publicly accessible but content requires free registration; cited by URL only as no Morgan Stanley source page was created.
- **LLY 10-Q / NVO 6-K filings**: [sec.gov/cgi-bin/browse-edgar](https://www.sec.gov/cgi-bin/browse-edgar). Revenue + management volume/mix commentary each quarter.
- **Circana (formerly IRI+NPD)**: US scanner data; "GLP-1 users to represent 35% of US food and beverage sales by 2030" report cited frequently by food companies. License required for category-level data.
- **Company earnings transcripts**: HSY, MDLZ, PEP, KO, WMT, RMD — quarterly calls contain the most accessible public volume/mix commentary.

## Interpretation / Judgment Table

The critical insight is **prescription volume ≠ immediate snack-stock collapse**. The causal chain is long and attenuated:

| Stage | Mechanism | Typical Lag | What to Look For |
|---|---|---|---|
| 1. Prescription growth | More patients start GLP-1 therapy | T+0 | Weekly TRx growth; 2025 total US GLP-1 TRx up ~3.6% WoW vs ~1.8% prior year |
| 2. Body-weight change | Average ~15–20% body weight loss over 6–12 months on semaglutide | T+6–12 mo | LLY/NVO adherence data; discontinuation rates remain high (~50% at 12 months) |
| 3. Appetite / appetite-adjacent behavioral shift | Reduced caloric intake, less craving for high-sugar / high-fat items | T+3–18 mo | Morgan Stanley survey: 65% of users drink fewer sugary sodas; 62% cut back on alcohol; savory snacks −11% |
| 4. Category volume shift | Scanner data reflects changed purchasing mix | T+6–24 mo | Circana data: GLP-1 users cut food spending −5.3% vs non-users; premium protein/produce up; biscuits/chips/candy down |
| 5. Company earnings impact | Volume/mix headwind shows in quarterly revenue | T+2–8 qtrs | MDLZ Q4 2025 volume/mix −4.8% (multi-cause: cocoa cost, GLP-1 behavioral overlay not isolated); HSY Q4 2025 volume/mix −3% on +5.7% organic (price-led) |

### The Real Signal: Category Mix + Consumption Frequency, Not Just Units

- **HSY/MDLZ** vulnerability: chocolate and biscuits are impulse-driven, addictive foods — the GLP-1 appetite-suppression mechanism directly targets the craving/reward pathway. Long-run volume risk is real; near-term the signal is masked by pricing power and cocoa-inflation-driven mix.
- **PEP/KO** vulnerability: sugary carbonated beverages are at moderate risk; sugar-free/zero variants provide a partial demand bridge. PEP's salty-snacks portfolio (Frito-Lay) is higher-risk than beverages.
- **WMT** — partially immune: GLP-1 users still purchase food but shift to higher-nutrient, premium SKUs. WMT benefits from basket-value maintenance even if unit volume shifts.
- **RMD** (ResMed) — the counter-intuitive read: Initial fear (GLP-1 could reduce obesity-driven sleep apnea, destroying CPAP demand) has reversed. FY2025 RMD grew 10% YoY. The mechanism: GLP-1 prescribing visits drive co-diagnosis of sleep apnea, increasing CPAP initiation rates in the near term. A combined GLP-1 + CPAP protocol is emerging as a clinical standard. RMD is now partially a GLP-1 beneficiary, not a victim. Watch this if clinical evidence on long-term apnea reversal via weight loss strengthens — that could reintroduce demand risk in a 3–5 year window.
- **PTON** (Peloton) — mixed: exercise frequency doubles for GLP-1 users (Morgan Stanley survey); but Peloton's specific connected-fitness model is challenged by churn and competitive pressures independently of GLP-1.

### Avoiding False Signals

- A single quarter of negative volume at a packaged-food company is insufficient to attribute to GLP-1. Cocoa inflation, pricing elasticity, and consumer trade-down to private label are simultaneous pressures in 2025.
- MDLZ itself estimated GLP-1 adoption would produce only 0.5%–1.5% volume effect even at 10–20% US adoption over 10 years — the magnitude is modest relative to year-to-year pricing variance.
- The structural shift becomes signal-grade when: (a) TRx continues compounding (≥20% YoY); AND (b) scanner data shows persistent category-volume declines in impulse snacks for ≥2 consecutive quarters, not explained by pricing elasticity alone.

## Representative Tickers (Sector Proxies, Not Holdings)

| Ticker | Sector Role | GLP-1 Linkage |
|---|---|---|
| LLY | Drug supply — GLP-1 dominant | Tirzepatide revenue growth; US market share ~57% of GLP-1 as of Q2 2025 |
| NVO | Drug supply — GLP-1 incumbent | Semaglutide (Ozempic/Wegovy); Wegovy Q3 2025 revenue +18% YoY; market share competition with LLY |
| HSY | Consumer staples — confectionery | Impulse chocolate/candy: highest appetite-suppression risk; Q4 2025 volume/mix −3% |
| MDLZ | Consumer staples — biscuits/snacks | Global biscuit/chocolate; management estimates ≤1.5% vol effect at mature adoption; Q4 2025 vol/mix −4.8% (multi-cause) |
| PEP | Consumer staples — snacks + beverages | Frito-Lay salty snacks + beverage; sugar-zero line partially hedges beverage risk |
| KO | Consumer staples — beverages | Carbonated soda at risk from GLP-1-driven sugar reduction; zero-sugar line partially mitigates |
| WMT | Retail | Basket-value monitor; GLP-1 users shift to premium protein/produce — modest positive mix |
| RMD | Healthcare — CPAP devices | Near-term beneficiary (co-diagnosis effect); watch for long-run demand risk if weight-loss reverses sleep apnea at scale |
| PTON | Fitness equipment/platform | Exercise frequency rises for GLP-1 users; Peloton's specific model challenged by churn |

## Canonical Data Sources with Latest Concrete Data Points (2025–2026)

- **GLP-1 prescription volume (2025)**: Total US GLP-1 TRx growing ~3.6% WoW as of mid-2025 vs ~1.8% prior year (IQVIA via Fierce Pharma). Wegovy oral formulation (semaglutide pill) logged ~142,000 prescriptions in the week ended May 2025.
- **Market size**: Global GLP-1 obesity market $8.21 billion in 2025; projected $66.57 billion by 2035 (CAGR 23.3%, Precedence Research). Morgan Stanley projects $190 billion total GLP-1 market (including diabetes, CV, NASH indications) by 2035 — more than double the ~$80 billion 2025 level.
- **Market share shift (2025)**: LLY surpassed NVO to hold ~57% of GLP-1 market by Q2 2025.
- **Consumer behavior (Morgan Stanley 2024 survey)**: 65% of GLP-1 users drink fewer sugary sodas; 62% cut back on alcohol; savory snacks consumption −11%; nearly two-thirds cut restaurant spending.
- **Grocery spend impact (Circana/IQVIA 2025)**: GLP-1 users cut food spending −5.3% in tracked categories; grocery units −4% in first six months after starting therapy; GLP-1 user households = 23% of US households, projected 35% of food/beverage units sold by 2030.
- **Packaged food earnings (2025)**: MDLZ full-year 2025 volume/mix −3.7%; Q4 volume/mix −4.8%. HSY Q4 2025 volume/mix −3% on +5.7% organic (price-led).
- **RMD (ResMed) FY2025**: Revenue +10% YoY; US masks/accessories +16% YoY in the December 2025 quarter. GLP-1 scare reversed — co-diagnosis driving short-term demand.

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[synthesis/ai-quant-trading-architecture-improvements]] — Trader-agent umbrella; this indicator feeds the macro/feature-engineering layer
- [[synthesis/ai-quant-trading-oss-stack-selection]] — OSS data stack that ingests this signal
- [[concepts/robotaxi-fsd-regulation-tracker]] — Sister indicator in the same secular demand/autonomy cluster
- [[entities/finrobot]] — FinRobot multi-agent platform that can ingest macro features like this
- [[concepts/llm-as-feature-engineer]] — Pattern for demoting macro narrative to a structured Qlib alpha column
