---
type: concept
tags: [us-equities, leading-indicator, trader-agent, semiconductors, ai-compute, hyperscaler-capex]
---

# ASIC 滲透率 — Custom-ASIC Penetration Indicator

**Cluster:** AI Compute Economics | **Dashboard cadence:** Quarterly | **Data type:** Structural / regime-shift

## What It Is and Why It Leads

The ASIC Penetration Indicator measures the share of AI compute deployed by hyperscalers (Cloud Service Providers — CSPs) that runs on custom Application-Specific Integrated Circuits rather than on commodity GPU clusters. This share is rising structurally: TrendForce estimated custom ASIC-based AI server shipments at **27.8% of the total AI server market in 2026**, up 44.6% YoY — the highest since 2023 and a clear multi-year inflection.

The indicator **leads** earnings revisions for both incumbent GPU vendors and ASIC design partners because:

1. **Capex allocation precedes revenue recognition by 1–3 quarters.** When a hyperscaler announces an ASIC program (e.g., Google's TPU v7 Ironwood deployment cluster), the silicon design win flows to Broadcom or Marvell months before the chip ships at volume, and the cloud savings flow back to the CSP's gross margin a quarter after deployment.
2. **Narrative shift drives multiple compression / expansion before the fundamental moves.** Markets price GPU-monopoly pricing power into NVIDIA's forward multiple; evidence that a meaningful share of new inference capacity will bypass NVIDIA chips forces that premium to be recalibrated upward for AVGO/MRVL and downward for NVDA's "indispensability" premium — independent of near-term unit volume.
3. **It is not captured in standard semi-cycle indicators** (book-to-bill, wafer starts). Custom ASIC revenue appears in Broadcom's "Semiconductor Solutions — AI" line and Marvell's "Data Center" segment, not in any standard equipment index, making it a differentiated alpha signal.

## What to Watch (Sub-Metrics)

### Hyperscaler In-House Silicon Generations

| CSP | Current generation | Key facts | Signal to watch |
|---|---|---|---|
| Google (GOOGL) | TPU v7 Ironwood (Nov 2025) | 9,216-chip pods; 42.5 FP8 ExaFLOPS; ~78% of Google AI servers are ASIC-based; only CSP where ASIC > GPU | v8 roadmap announcement; cluster scale-up orders |
| Google | TPU v6e Trillium (2024) | 32 GB HBM3; focused on low-power inference | Inference-cluster build cadence |
| AWS (AMZN) | Trainium 2 (deployed) | 500,000+ units in production as of late 2025; largest commercial ASIC fleet by unit count | Trainium 3 ramp (Q2 2026 target; TSMC N3P; 128 GB HBM3E) |
| Meta | MTIA v2 | Narrow workloads: ad ranking, feed recommendation; competitive with TPU v5 on recommendation tasks | MTIA v3 announcement (TSMC N3, HBM3E, 2026) |
| Microsoft | Maia 100 (late 2023) | 5nm, 105B transistors, 64 GB HBM2E; delayed vs Google/AWS | Maia 200 roadmap; deployment share in Azure AI |

### Design-Partner Revenue Lines

These are the most directly investable ASIC-penetration data points — reported quarterly in earnings:

| Company | Reporting segment | Latest data point | YoY growth |
|---|---|---|---|
| Broadcom (AVGO) | "AI revenue" (primarily XPU + networking) | $5.2B in Q3 FY2025 | +63% YoY |
| Broadcom | Cumulative FY2025 AI revenue | ~$20B (FY2025 run-rate) | From $12.2B FY2024 |
| Broadcom | AI-related backlog | $73B (disclosed Aug 2025) | — |
| Marvell (MRVL) | "Data Center" (ASIC component) | FY2025 AI revenue >$1.5B | From ~$550M FY2024 |
| Marvell | FY2026 AI revenue guidance | Expected to "significantly exceed" $2.5B | +67% CAGR vs FY2025 |

**Broadcom's market position:** Approximately 70% share of the custom AI ASIC design-partner market. XPU customers include Google, Meta, OpenAI (new; $10B order disclosed Q3 FY2025, shipping 2026), ByteDance, and Arm/SoftBank. XPU revenue is roughly 65% of Broadcom's total AI revenue.

**Marvell's position:** Smaller but growing; focused on optical interconnects and custom AI inference ASICs for a different subset of hyperscalers; Q1 FY2027 Data Center revenue grew 42% YoY to $678M.

### ASIC-vs-GPU Market Share (Quarterly)

- **Primary source:** TrendForce quarterly AI server shipment reports (paid research + free press releases at trendforce.com/presscenter).
- **Secondary proxy:** Broadcom + Marvell combined AI revenue as a fraction of the combined revenue from NVIDIA's Data Center segment — a rough but publicly accessible quarterly ratio.
- **Baseline (2026):** ASIC = 27.8% of AI server shipments per TrendForce; GPU (NVIDIA-led) ≈ 72.2%.

## Update Cadence and Data Sources

| Source | Cadence | What it gives you | URL |
|---|---|---|---|
| Broadcom earnings (AVGO) | Quarterly (Mar/Jun/Sep/Dec) | AI revenue segment (XPU + networking) | sec.gov EDGAR AVGO filings; avgo IR |
| Marvell earnings (MRVL) | Quarterly (Jan/Apr/Jul/Oct) | Data Center segment with custom ASIC commentary | sec.gov EDGAR MRVL filings; marvell.com/company/investors |
| Hyperscaler earnings (GOOGL/AMZN/META/MSFT) | Quarterly | CapEx guidance; qualitative ASIC deployment commentary | Via [[sources/sec-edgar-api-2025]] |
| TrendForce press releases | ~Quarterly | ASIC shipment share; CSP capex forecast | [trendforce.com/presscenter](https://www.trendforce.com/presscenter) |
| Tom's Hardware ASIC tracking | Ad hoc | Generation launches, cluster scale, competitive framing | [tomshardware.com](https://www.tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia) |
| [[sources/trendforce-csp-capex-asic-2026]] | Snapshot Feb 2026 | 27.8% ASIC market share; Google 78% TPU; Trainium 3 timeline | See source page |

**Earnings access:** Use [[sources/sec-edgar-api-2025]] XBRL endpoints for programmatic retrieval of AVGO/MRVL/GOOGL/AMZN/META/MSFT financial segments. Rate limit: 10 req/s.

## Interpretation / Judgment Table

| Signal combination | Narrative | Implication |
|---|---|---|
| AVGO/MRVL custom-AI revenue accelerating > 40% YoY + ASIC market share rising | ASIC penetration inflecting; hyperscalers paying for tighter hardware-software integration | Re-rate AVGO/MRVL higher; begin questioning NVDA's monopoly-premium multiple |
| ASIC share rising but GPU absolute volume still growing (both up) | Compute pie expanding faster than ASIC takes share — still GPU-bullish | Benign for NVDA; bullish for AVGO/MRVL; no multiple compression yet |
| ASIC share rising + GPU ASP falling | Commoditisation pressure on GPU side; NVDA losing pricing power | Compress NVDA multiple; expand AVGO/MRVL |
| ASIC ramp delayed (Trainium 3 / MTIA v3 slip) | Custom silicon harder to productionize than GPUs; GPU-monopoly narrative intact | Defensive for NVDA; tactically negative for AVGO/MRVL near-term revenue |
| Google TPU fraction staying ~78% but shrinking for other CSPs | Platform-specific result, not an industry trend; Google's vertical integration is an outlier | Neutral for the general ASIC thesis |
| AVGO adds new XPU customer (like OpenAI $10B order Aug 2025) | TAM expanding; design wins broaden beyond original Google/Meta | Strong bull signal for AVGO; incremental negative for NVDA |

### The GPU-Monopoly → GPU + Custom-Silicon Narrative Shift

The key economic logic: NVIDIA earns a **monopoly premium** on its GPUs partly because buyers historically had no alternative for AI training and inference. This premium is embedded in NVDA's forward P/E and EV/Sales multiples. As ASIC penetration rises:

- Each percentage point of AI compute migrating from NVIDIA GPUs to custom ASICs chips away at the addressable market NVDA can price at monopoly-premium margins.
- Concurrently, AVGO and MRVL capture design revenue at high gross margins (Broadcom AI segment gross margins run ~65–70% per reported data) without the capital intensity of a GPU manufacturer.
- The **critical threshold** to watch is whether ASIC share crosses 30–35% of total AI server shipments — historically associated with "structural duopoly" framing rather than "niche alternative" framing. TrendForce's 27.8% (2026) is approaching this range.

The indicator does **not** imply NVIDIA revenue falls in absolute terms — CSP CapEx is growing fast enough that GPU volumes can still rise even as ASIC share grows. The multiple compression is a relative re-rating, not an earnings decline call.

## Representative Tickers (Sector Proxies, Illustrative Only)

These are not the owner's holdings. They represent the sectors and positions most sensitive to this indicator.

| Ticker | Role | Sensitivity |
|---|---|---|
| AVGO (Broadcom) | Custom ASIC design partner | Direct — XPU revenue is the denominator of the ASIC penetration signal |
| MRVL (Marvell) | Custom ASIC design partner | Direct — growing but smaller share vs Broadcom |
| NVDA (NVIDIA) | GPU incumbent | Inverse via multiple; GPU volume still growing but monopoly-premium at risk |
| GOOGL (Alphabet) | Most ASIC-intense CSP (TPU ~78%) | Gross-margin beneficiary if TPU economics beat GPU cost-per-FLOP |
| AMZN (Amazon/AWS) | Trainium program; GPU-still-dominant | Signal for AWS own-silicon ramp maturity |
| META (Meta) | MTIA for recommendation; GPU-majority for GenAI | Watch MTIA v3 volume vs GPU capex split |
| MSFT (Microsoft) | Maia 100/200 delayed vs peers | Lagging ASIC penetration; Azure AI still GPU-heavy |

## Canonical Data Sources

1. **[[sources/trendforce-csp-capex-asic-2026]]** — TrendForce press release Feb 25, 2026: 27.8% ASIC market share; Google 78% TPU; Trainium 3 ramp. URL: [trendforce.com/presscenter/news/20260225-12934.html](https://www.trendforce.com/presscenter/news/20260225-12934.html)
2. **Broadcom FY2025 Q3 Earnings (Aug 2025)** — $5.2B Q3 AI revenue (+63% YoY); OpenAI $10B XPU order; five named XPU customers. [SEC EDGAR AVGO 8-K](https://www.sec.gov/Archives/edgar/data/0001730168/000173016825000094/avgo-08032025x8kxex99.htm)
3. **Marvell FY2025 Earnings / Q1 FY2027** — AI revenue >$1.5B FY2025; Data Center +42% YoY Q1 FY2027. [SEC EDGAR MRVL](https://www.sec.gov/Archives/edgar/data/0001835632/000183563224000060/q125_8kx542024ex-991.htm)
4. **Tom's Hardware ASIC state of play (May 2026)** — TPU v7 Ironwood pod specs; AWS 500K Trainium2 units; Meta MTIA v3 timeline; Microsoft Maia positioning. [tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia](https://www.tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia)
5. **[[sources/sec-edgar-api-2025]]** — Access path for quarterly earnings segment data for all above tickers.

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[entities/nvidia]] — GPU incumbent whose monopoly-premium multiple is the counter-narrative to this indicator
- [[concepts/tiered-inference]] — cost-aware routing concept that benefits from both cheaper GPU and ASIC inference economics
- [[concepts/ai-inference-cost-economics]] — sibling indicator: tracks whether cheaper inference hardware converts to software gross-margin inflection
- [[synthesis/ai-quant-trading-architecture-improvements]] — quant architecture context; ASIC economics is part of the AI-compute cost structure this architecture runs on
- [[sources/trendforce-csp-capex-asic-2026]] — primary structural data source for 2026 ASIC share figures
- [[sources/sec-edgar-api-2025]] — programmatic access to hyperscaler and ASIC-vendor earnings
