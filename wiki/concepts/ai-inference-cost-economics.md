---
type: concept
tags: [us-equities, leading-indicator, trader-agent, ai-software, saas-metrics, ai-economics]
---

# AI 推論成本 / 退訂率 — AI Inference Cost & Retention Economics Indicator

**Cluster:** AI Compute Economics | **Dashboard cadence:** Monthly (API prices) + Quarterly (earnings) | **Data type:** Cost-trend + cohort-retention

## What It Is and Why It Leads

The AI Inference Cost and Retention Economics Indicator tracks two interlinked forces that determine whether AI application-layer companies are building durable businesses or racing to the bottom:

1. **Inference cost (推論成本):** the price per million tokens (or per query) charged by AI API providers, and the underlying hardware economics driving that price.
2. **Customer retention / expansion (退訂率):** Net Revenue Retention (NRR / NDR), Gross Revenue Retention (GRR), and Remaining Performance Obligations (RPO) reported by enterprise AI-software companies.

These two signals only mean something in combination:

> Falling inference cost + stable/rising NRR = **real margin inflection** — customers are embedding AI more deeply even as unit cost falls, producing operating leverage.

> Falling inference cost + falling or flat NRR = **commoditisation signal** — customers are switching providers as costs equalize, with no durable retention moat; pricing wars erode gross margins without offsetting volume gains.

The indicator **leads** earnings revisions because:
- API price cuts are announced and visible in vendor price sheets immediately — months before they flow through to reported SaaS gross margins.
- RPO and NRR are the most forward-looking, contractually binding measures of software revenue visibility; they reprice before recognized revenue catches up.
- Hyperscaler AI inference segment revenue (GOOGL/AMZN/MSFT cloud AI) gives a quarterly checkpoint on whether enterprise adoption is accelerating into cheaper tokens or stalling.

## What to Watch (Sub-Metrics)

### 1. AI API Price per Million Tokens (Monthly Observable)

The cost-side of the indicator. Track representative frontier and mid-tier models:

| Model (as of mid-2026) | Input $/M tokens | Output $/M tokens | Notes |
|---|---|---|---|
| GPT-4o (OpenAI) | $2.50 | $10.00 | Halved from $5 input by early 2026 |
| Claude Sonnet 4 (Anthropic) | $3.00 | $15.00 | — |
| Gemini Flash-Lite (Google) | $0.075 | $0.30 | Cheapest frontier-class option |
| DeepSeek V3 class (Dec 2024) | ~$0.27 | ~$1.10 | Triggered a broader market price reset |
| GPT-3.5-class baseline (Nov 2022) | $20.00 equiv. | — | Stanford AI Index 2025 anchor point |

The headline Stanford AI Index finding: a model performing at GPT-3.5 MMLU level (64.8% accuracy) fell from **$20/M tokens in November 2022 to $0.07/M tokens by October 2024** — more than a 280x reduction in 18 months. Depending on task, annual inference-price decline has ranged **9x to 900x per year** per the same report. Hardware cost has declined ~30% annually; energy efficiency improved ~40% annually.

**Where to find it:** Vendor pricing pages are the primary source. A good aggregator is [llmpricingcalculator.com](https://llmpricingcalculator.com/) and [artificialanalysis.ai](https://artificialanalysis.ai). The AI-pricing history site [tokenmix.ai/blog/ai-pricing-trends-history](https://tokenmix.ai/blog/ai-pricing-trends-history) provides longitudinal views.

**Key event to calibrate on:** DeepSeek's December 2024 model at $0.27/$1.10 input/output forced OpenAI and Google into immediate price cuts, compressing the entire frontier market. This is the kind of discontinuous event the indicator should flag as a commoditisation trigger.

### 2. Gross Margin (Quarterly, Earnings)

AI infrastructure and SaaS companies report gross margin quarterly. Falling inference cost is supposed to flow through to gross margin expansion for AI-native software companies:

- If a company's gross margin is *rising* as token costs fall → it is capturing the savings as profit, suggesting real moat.
- If gross margin is *flat or falling* as token costs fall → it is passing savings to customers (competitive pressure) or has a cost structure that does not benefit from cheaper inference (e.g., heavy human services).

**Current benchmarks (2025–2026):**
- Palantir (PLTR): ~84% gross margin on $4.4B FY2025 revenue (+53% YoY)
- Snowflake (SNOW): ~75% non-GAAP product gross margin; FY2027 guidance $5.84B product revenue (+31% YoY)
- ServiceNow (NOW): ~70–75% gross margin; NRR consistently 120–125%
- Datadog (DDOG): ~74% gross margin; NRR ~120% on $3.43B 2025 revenue

### 3. Net Revenue Retention (NRR) and Gross Revenue Retention (GRR) (Quarterly)

**NRR (Net Dollar Retention / NDR):** Percentage of recurring revenue retained from the prior period's customer cohort, including expansion, contraction, and churn. Formula:

```
NRR = (Beginning ARR + Expansion - Contraction - Churn) / Beginning ARR
```

NRR > 100% means existing customers are spending more over time — the hallmark of a usage-based or land-and-expand model successfully embedding AI into workflows.

**GRR (Gross Revenue Retention):** NRR without expansion; captures pure churn. A GRR < NRR gap that is widening indicates growth is relying increasingly on upsell rather than base retention — a yellow flag if upsell slows.

**Current benchmarks for AI-adjacent SaaS (2024–2025):**

| Company | NRR (approx.) | Notes |
|---|---|---|
| Snowflake (SNOW) | ~125% (Q4 FY2026) | Consumption-based; usage scales with AI workload growth |
| Datadog (DDOG) | ~120% | Observability of AI pipelines; usage-based expansion |
| ServiceNow (NOW) | 120–125% | Renewal > 98%; AI Now Assist driving upsell |
| Palantir (PLTR) | Not disclosed (private-sector NRR >115% estimated) | Government + commercial; AI Platform (AIP) driving expansion |
| Salesforce (CRM) | ~110–115% (estimated) | Agentforce AI layer; disclosed renewal in lieu of explicit NRR |

**What the number means for the indicator:**
- NRR ≥ 120% in usage-based AI tools → customers are growing into AI capabilities; cost-per-token decline is not causing substitution.
- NRR declining toward 100–110% → customers are tightening budgets or moving to cheaper alternatives as the market commoditises.
- NRR < 100% → customers are churning out of the product; the AI tool is not sticking regardless of cost.

### 4. Remaining Performance Obligations (RPO) (Quarterly)

RPO is the total contractual backlog of future revenue not yet recognized. It is the most forward-looking, most binding measure of revenue visibility in enterprise software.

**Formula:** RPO = Deferred Revenue (short-term) + Long-term contracted but undelivered revenue.

**Current data points (2025):**
- ServiceNow current RPO: $11.35B as of Q3 FY2025 (+21% YoY); $10.31B Q1 FY2025; $10.92B Q2 FY2025 — steady acceleration.
- Microsoft commercial RPO: $625B (includes significant OpenAI concentration; 45% reportedly from OpenAI contracts — concentration risk).
- Google/Alphabet: Publicly discloses backlog in Cloud segment; watch for acceleration in AI-specific contracted revenue.

**Signal:** RPO growth rate decelerating = enterprise customers not committing to multi-year AI contracts → commoditisation risk visible before revenue turns.

### 5. Usage-Based Revenue Growth Rate (Quarterly)

Usage-based (consumption pricing) models are the most sensitive real-time signal of AI adoption depth. If a company charges per API call, per query, or per compute unit consumed:

- Accelerating usage revenue → AI workloads are growing in the installed base → customers are embedding deeply.
- Decelerating usage revenue → either AI workloads are being cut or customers are shifting to competing providers.

**Watch especially:** Snowflake AI product consumption growth; Datadog APM + LLM observability growth; AWS Bedrock and Google Vertex AI consumption revenue (buried in Cloud segments but directionally disclosed in earnings commentary).

## Update Cadence and Data Sources

| Source | Cadence | What it gives you | URL |
|---|---|---|---|
| Vendor API pricing pages (OpenAI, Anthropic, Google) | Real-time | Current $/M token rates | openai.com/api/pricing; anthropic.com/pricing; cloud.google.com/vertex-ai/pricing |
| LLM pricing aggregators | Weekly | Cross-vendor comparison | [artificialanalysis.ai](https://artificialanalysis.ai); [llmpricingcalculator.com](https://llmpricingcalculator.com) |
| SaaS 10-Q filings | Quarterly | NRR, GRR, RPO, gross margin | Via [[sources/sec-edgar-api-2025]] |
| ServiceNow, Snowflake, Datadog, Palantir earnings | Quarterly | Retention + usage metrics + guidance | SEC EDGAR EDGAR EFTS |
| [[sources/stanford-ai-index-2025]] | Annual (April) | Inference cost decline baseline; hardware-level economics | [hai.stanford.edu/ai-index/2025-ai-index-report](https://hai.stanford.edu/ai-index/2025-ai-index-report) |
| MacroMicro AI Software RPO chart | Monthly (from SEC filings) | Aggregated RPO across AI software names | [macromicro.me/charts/139557](https://en.macromicro.me/charts/139557/us-ai-software-company-remaining-performance-obligations) |

## Interpretation / Judgment Table

| Cost trend | NRR trend | RPO trend | Read | Implication |
|---|---|---|---|---|
| Inference cost falling steeply | NRR ≥ 120% and stable/rising | RPO accelerating | **Profit inflection** — lower input cost + sticky customers = operating leverage building | Bull: expand AI-software positions (NOW, SNOW, DDOG, PLTR) |
| Inference cost falling steeply | NRR falling toward 100–110% | RPO decelerating | **Commoditisation** — customers price-shopping; no differentiation moat | Bear: compress AI-software multiples; watch for gross-margin pressure |
| Inference cost stable or rising | NRR > 120% | RPO growing | Capacity-constrained; customers paying premium but sticky | Cautiously bull; watch for cost normalization |
| Inference cost falling + new cheap model emerges (DeepSeek-style event) | NRR ambiguous | Short-term RPO shock | **Repricing event** — acute pressure on frontier API providers; medium-term filter to find which SaaS names retain customers anyway | Short-term negative for MSFT/GOOGL/AMZN API pricing; long-term filter on retention |
| Inference cost falling | NRR diverging (some names > 120%, others < 110%) | Diverging RPO | **Segmentation** — AI tools with workflow lock-in (PLTR, NOW) separating from commodity tools (generic chatbots, point solutions) | Rotate toward lock-in names; reduce commodity-tool exposure |

### Economic Logic: Why NRR Is the Gating Signal

The core insight is asymmetric:

- **Inference cost falling alone** is not a profit signal. It is a *necessary* condition for AI software to have good unit economics at scale, but it can simultaneously mean intense competition that eliminates the margin advantage.
- **NRR stability above 120%** in a falling-cost environment is the *sufficient* condition for profit inflection. It demonstrates that customers value the workflow integration, data flywheel, or compliance/trust layer — not just the underlying token compute — enough to keep expanding spend even as the commodity layer cheapens.
- A company where NRR is 105% while inference cost falls 80% is losing pricing power faster than it is gaining customer-value moat. This is the commoditisation death spiral: each token-cost cut attracts marginal customers who leave when the next cheaper provider arrives.

The tiered analogy from [[concepts/tiered-inference]] is instructive: the cheapest inference tier handles commodity queries. The question is whether AI software companies have built enough differentiation to sit *above* the commodity tier — in the same way that a T3/T2 model cascade captures work the cheapest T1 model cannot handle. If AI software companies are competing on the T1 tier (pure cost), they are in a race to zero. If they are in the T2/T3 tier (workflow depth, auditability, regulated-industry trust), falling inference cost is pure tailwind.

## Representative Tickers (Sector Proxies, Illustrative Only)

Not the owner's holdings. Sensitivity split:

| Ticker | Category | Primary sensitivity |
|---|---|---|
| MSFT (Microsoft) | AI infrastructure + SaaS | Azure OpenAI token pricing + Copilot NRR; RPO concentration risk |
| GOOGL (Alphabet) | AI infrastructure + Search + Vertex AI | Vertex token pricing; Cloud NRR; TPU unit economics |
| AMZN (Amazon/AWS) | AI infrastructure + Bedrock | Bedrock usage growth; Trainium cost efficiency |
| NOW (ServiceNow) | Enterprise workflow AI | Now Assist NRR expansion; RPO growth rate |
| CRM (Salesforce) | Enterprise CRM AI | Agentforce adoption rate; renewal rate vs NRR |
| SNOW (Snowflake) | Usage-based data AI | Consumption revenue acceleration; NRR |
| DDOG (Datadog) | AI observability | LLM monitoring adoption; usage-based NRR |
| PLTR (Palantir) | Government + enterprise AI platform | AIP adoption; gross margin at scale |
| ADBE (Adobe) | Creative AI | Firefly monetisation; Creative Cloud NRR |

## Canonical Data Sources

1. **[[sources/stanford-ai-index-2025]]** — Stanford HAI, April 2025. Canonical anchor: 280x inference cost decline, $20 → $0.07/M tokens (Nov 2022–Oct 2024). Full PDF: [hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf](https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf)
2. **Vendor API price sheets (live)** — [openai.com/api/pricing](https://openai.com/api/pricing); [cloud.google.com pricing](https://cloud.google.com/vertex-ai/pricing); anthropic.com. Spot-check quarterly for rate movements.
3. **SaaS 10-Q NRR / RPO disclosures** — Via [[sources/sec-edgar-api-2025]]. Key tickers: SNOW, DDOG, NOW, PLTR, CRM, ADBE.
4. **MacroMicro RPO aggregator** — [macromicro.me/charts/139557](https://en.macromicro.me/charts/139557/us-ai-software-company-remaining-performance-obligations) — tracks combined AI software RPO from SEC filings monthly.
5. **Historical API pricing history** — [tokenmix.ai/blog/ai-pricing-trends-history](https://tokenmix.ai/blog/ai-pricing-trends-history) — longitudinal price-cut timeline by model.

## Metric Glossary

- **NRR (Net Revenue Retention / Net Dollar Retention):** Beginning ARR + expansion − contraction − churn, divided by beginning ARR. Above 100% = existing customers growing. The most important SaaS health metric for AI tools.
- **GRR (Gross Revenue Retention):** NRR without expansion. Measures baseline churn. Healthy GRR ≥ 90–95% for enterprise SaaS.
- **RPO (Remaining Performance Obligations):** Total contracted future revenue not yet recognized. The single most forward-looking revenue metric disclosed under ASC 606.
- **Usage-based revenue:** Revenue that scales with consumption (tokens, API calls, queries, data volume) rather than with seat count. The most direct real-time signal of AI workload depth.
- **$/M tokens:** Standard unit for comparing LLM inference pricing across providers and model generations. "Input" tokens = the prompt; "output" tokens = the generated response (typically 3–4x more expensive).

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[concepts/tiered-inference]] — cost-aware model cascade; the same inference-cost economics that drive this indicator determine which T1/T2/T3 routing decisions are cost-effective
- [[concepts/asic-penetration-indicator]] — sibling indicator: hardware-layer shift from GPU to custom ASIC that is the primary driver of the infrastructure cost decline
- [[sources/stanford-ai-index-2025]] — canonical quantitative source for the 280x inference cost decline
- [[sources/sec-edgar-api-2025]] — programmatic access to NRR/RPO/gross-margin disclosures in 10-Q filings
- [[synthesis/ai-quant-trading-architecture-improvements]] — quant architecture that this indicator cluster feeds into as a macro/sector-rotation signal
- [[entities/nvidia]] — GPU vendor whose inference-side pricing partially determines the "inference cost" numerator
