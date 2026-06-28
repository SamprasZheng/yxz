---
type: concept
tags: [us-equities, leading-indicator, trader-agent, energy, offshore-drilling, capex-cycle]
---

# 深水鑽井船日租金 / 稼動率指標 / Offshore Drillship Dayrate & Utilization Indicator

**Cluster:** Real-economy capex — energy & metals
**Companion indicator:** [[concepts/lme-copper-inventory-indicator]] (physical-tightness signal in metals)
**Data source:** [[sources/baker-hughes-rig-count-2026]] (rig count); driller fleet-status reports (dayrates/utilization)
**Trader-agent umbrella:** [[synthesis/ai-quant-trading-architecture-improvements]]

---

## 1. What It Is and Why It Leads

The **deepwater drillship dayrate / utilization indicator** tracks two co-moving variables that together signal whether offshore oil & gas operators are committing real capital to deep-water well programs:

- **Dayrate (日租金):** The contracted daily cash price an oil company pays to lease a drillship or semisubmersible — typically expressed in USD per day. Ultra-deepwater 7th-generation drillships commanded $450,000–$520,000+/day at the 2025 market peak.
- **Utilization (稼動率):** The fraction of the marketed (available) drillship fleet that is under contract. Marketed utilization above ~90% indicates a tight market; below ~85% indicates slack capacity.

Together these variables lead the broader offshore E&P (exploration & production) sector because:
1. Drillship contracts are signed 6–18 months before drilling begins — the backlog is visible capex commitment.
2. Dayrate levels determine driller cash margins and influence whether cold-stacked rigs get reactivated (supply response lag: 12–24 months to reactivate; 3–4 years for new builds).
3. Rising utilization + rising dayrates = operators competing for scarce rigs = evidence that deepwater capex cycle is real, not just a headline.

When dayrates rise while utilization stays flat, the signal may reflect contract repricing of a stable fleet rather than new drilling demand. When utilization rises while dayrates stagnate, it may indicate excess idle capacity being absorbed without pricing power. **Both moving together is the confirmation signal.**

---

## 2. What to Watch (Sub-Metrics)

### Primary sub-metrics

| Sub-metric | Definition | Relevance |
|---|---|---|
| **Leading-edge dayrate** | Highest rate achievable for new near-term contracts on top-spec (7G/8G) drillships | Sets the ceiling; lags coincide with demand inflections |
| **Rolled-average dayrate** | Fleet-wide average (blends legacy + new contracts) | Smooths spikes; slower to move but more durable |
| **Marketed utilization** | Contracted rigs / available-for-marketing rigs (excludes cold-stacked) | Key tightness gauge; sustained >90% → pricing power |
| **Committed utilization** | Contracted + firm options / total competitive fleet | Forward view; 7G drillships >40% committed for 2027 (as of Nov 2025) |
| **Contract backlog ($B)** | Sum of (contracted daily rate × days remaining in firm contracts) | Capital visibility; Transocean ~$7.1B (May 2026), combined TDW+VAL post-merger ~$10B |
| **Cold-stacked count** | Rigs idle without maintenance contract; reactivation cost $50–200M+ | Supply ceiling; high cold-stack count → limits near-term supply response |
| **Offshore rig count (Baker Hughes)** | Active offshore rotary rigs worldwide per Baker Hughes monthly | Macro directional read; April 2026 = 229 international offshore rigs |

### Secondary / context sub-metrics

- **Brent oil price:** Operators typically need $60–70+/bbl to sanction new deepwater programs.
- **E&P capex budgets:** Major IOC/NOC announcements (Petrobras, Shell, TotalEnergies, ExxonMobil GoM) are leading commitments.
- **Contract award announcements:** Public contract awards (via press releases or 8-K filings) are the most direct evidence of new demand.

---

## 3. Update Cadence and Data Sources

### Baker Hughes Rig Count (active-rig macro read)

- **North America:** Weekly, Friday noon Central Time — [rigcount.bakerhughes.com/na-rig-count/](https://rigcount.bakerhughes.com/na-rig-count/)
- **International:** Monthly, last working day of first week of month — [rigcount.bakerhughes.com/intl-rig-count](https://rigcount.bakerhughes.com/intl-rig-count)
- Free Excel downloads available directly from the site.
- **Important:** Baker Hughes counts active rigs; it does **not** report dayrates, utilization rates, or contract backlog.

### Driller Fleet Status Reports (dayrates, utilization, backlog)

Dayrates and utilization come from the offshore drillers' own **quarterly Fleet Status Reports**, filed as 8-K exhibits or posted on investor relations pages:

| Company | Report | URL |
|---|---|---|
| **Transocean (RIG)** | Quarterly Fleet Status Report | [deepwater.com/investors/fleet-status-report](https://www.deepwater.com/investors/fleet-status-report) |
| **Valaris (VAL)** | Fleet Status Report | [valaris.com/news](https://www.valaris.com/news/) (quarterly 8-K exhibits) |
| **Noble Corporation (NE)** | Fleet Status Report | Filed with SEC; also on NE investor relations page |

Each report lists: rig name, rig class (generation), current status (drilling / mobilizing / shipyard / cold-stacked), contract operator, dayrate, contract expiry date, and options.

### Commercial Data Services (most granular)

- **Westwood Global Energy / RigLogix:** The industry-standard platform for fleet analytics, utilization metrics, and market-wide backlog tracking. Americas Research Director Cinnamon Edralin (former ODS-Petrodata / Esgian) is a leading analyst voice.
- **Esgian (formerly IHS Markit Offshore Research):** Fleet-level analytics and market forecasts.
- **Clarksons Research:** Also cited for fleet supply/demand modelling.

---

## 4. Interpretation / Judgment Table

### Bullish (Real offshore capex cycle)

| Signal | What it means |
|---|---|
| Leading-edge dayrate **rising** + marketed utilization **>90%** | Operators are competing for scarce rigs; pricing power exists; capex committed |
| Contract backlog **growing** in dollar terms | New contracts being signed above roll-off rate; future revenue visibility expanding |
| Cold-stacked rig **reactivations** announced | Demand has consumed available fleet; supply response underway (takes 12–24 months) |
| Brent **>$70** + major IOC/NOC capex budgets **increasing** | Sanction-level economics confirmed; project funnel active |
| Baker Hughes international offshore count **rising** | Broader offshore activity (jackups + semis + drillships) all trending up |

### Bearish (Cycle stalling / false recovery)

| Signal | What it means |
|---|---|
| Rig count rising but dayrates **flat or falling** | Idle capacity being absorbed without pricing power; supply overhang persists |
| Utilization high on **6G/older fleet** but 7G/8G backlog not growing | Legacy rig demand; high-specification deepwater (the real capex signal) is soft |
| Saudi Aramco or major NOC **suspending rigs** / not renewing contracts | Demand destruction at the margin; cycle inflection risk |
| Dayrate compression on **rolling contracts** (legacy → new rate lower) | Market repricing downward; operators regaining leverage |
| Oil price **<$60/bbl** sustained | Below sanctioning threshold for most new deepwater projects; capex freezes |

### Current market read (as of late 2025 / early 2026)

The market is in a **mild correction phase** after a 2023–2024 upcycle. SPE/JPT analysis (November 2025) shows:
- 7G drillship marketed utilization: 91% (2025) → 94% projected (2026) → 94% (2027)
- Leading-edge dayrates near-term: **under $400,000/day** (compressed from $460–520k peak in 2024)
- Rates for later-delivery work (2027+): firming up
- Transocean July 2025 backlog: ~$7.2B; May 2026: ~$7.1B (stable)
- Transocean-Valaris merger announced February 9, 2026: combined 73 rigs, ~$10B backlog

The compression in near-term dayrates (from ~$515k for one US GoM contract in June 2024 to ~$405k for a similar rig in East Mediterranean in Q4 2026) is the key bear signal to watch. If dayrates stabilize and committed utilization for 2027 holds above 85%, a new up-leg is credible. If Brent slides below $60 and NOCs continue rig suspensions, the correction deepens.

---

## 5. Why Dayrate + Utilization Rising Together Signals a Real Cycle

The key analytical distinction is between a **count blip** and a **structural capex cycle**:

- A **count blip** occurs when operators reactivate rigs to catch up on deferred maintenance or short-cycle tie-backs. Active rig count rises; but available fleet absorbs the demand; dayrates barely move; backlog does not grow meaningfully.
- A **structural cycle** occurs when the marketed fleet is full, operators cannot get rigs on short notice, and they bid up dayrates to secure forward positions. Visible signals: (1) dayrate for new contracts exceeds legacy roll-off rate, (2) utilization crosses 90%+, (3) contract backlog grows in dollar terms quarter-over-quarter, (4) cold-stacked rigs begin reactivation discussions.

Baker Hughes offshore count alone does not distinguish these two cases — it measures rigs currently drilling, not marginal pricing or backlog depth. Dayrates and backlog from fleet status reports provide the economically meaningful signal.

---

## 6. Representative Sector Tickers (Illustrative Proxies)

These are sector proxies for the offshore-drilling and oilfield-services themes — not the owner's holdings:

| Ticker | Company | Role |
|---|---|---|
| **RIG** | Transocean | Largest ultra-deepwater driller; 7G+/semisub fleet; pending merger with Valaris |
| **VAL** | Valaris | Major deepwater + jackup fleet; merger target (Transocean, Feb 2026) |
| **NE** | Noble Corporation | Post-merger (Pacific Drilling + Maersk Drilling); mixed 6G/7G fleet |
| **SLB** | SLB (Schlumberger) | Dominant oilfield services; drill-bits to reservoir analysis |
| **HAL** | Halliburton | Completion services; pumping / cementing / wireline |
| **BKR** | Baker Hughes | Oilfield equipment + LNG + data; also the rig count publisher |

---

## 7. Canonical Data Sources

| Source | What It Provides | URL | Cadence |
|---|---|---|---|
| Baker Hughes Rig Count | Active offshore/onshore rig count | [rigcount.bakerhughes.com](https://rigcount.bakerhughes.com/) | NA weekly Fri, Int'l monthly |
| Transocean Fleet Status | Per-rig dayrate, status, backlog | [deepwater.com/investors/fleet-status-report](https://www.deepwater.com/investors/fleet-status-report) | Quarterly |
| Valaris Fleet Status | Per-rig dayrate, status, backlog | [valaris.com/news](https://www.valaris.com/news/) (8-K) | Quarterly |
| Noble Fleet Status | Per-rig dayrate, status, backlog | NE investor relations + SEC EDGAR | Quarterly |
| Westwood/RigLogix | Market-wide utilization, analytics | [westwoodenergy.com](https://www.westwoodenergy.com/) | Subscription |
| SPE JPT articles | Quarterly market analysis | [jpt.spe.org](https://jpt.spe.org/) | Periodic |

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[concepts/lme-copper-inventory-indicator]] — companion real-economy physical-tightness signal (metals)
- [[sources/baker-hughes-rig-count-2026]] — Baker Hughes rig count feed details
- [[synthesis/ai-quant-trading-architecture-improvements]] — trader-agent architecture this indicator feeds into
