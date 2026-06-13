---
type: concept
tags: [us-equities, leading-indicator, trader-agent, cybersecurity, insurance, macro, sector-signal]
---

# 資安險保費 / 攻擊頻率指標 (Cyber-Insurance Premium & Attack Frequency Indicator)

## What It Is and Why It Matters

This indicator monitors the intersection of **cyber insurance pricing** (the insurance market's risk assessment of the cyber threat environment) and **attack frequency / severity data** (the actual realized threat landscape). Together they form a **sector-demand leading indicator** for enterprise cybersecurity spending — which in turn drives revenue at security software and services companies.

The core logic: when enterprises face rising cyber threats, security budgets expand. When the insurance market also prices those risks higher (rising premiums), that price signal reinforces and accelerates security-budget expansion. The combination — rising premiums AND rising attacks — is the genuine **cybersecurity budget tailwind** that supports revenue visibility for CRWD, PANW, ZS, NET, FTNT, S, CHKP (illustrative sector proxies only; these are not holdings).

**This is not a trading signal on individual securities.** It is a macro regime signal that informs sector allocation and confidence in cybersecurity revenue forecasts.

---

## What to Watch — Sub-Metrics Defined

### 1. Cyber Insurance Rate Index (費率指數)

**Definition:** Year-over-year percentage change in cyber insurance premium rates at renewal, aggregated across a large brokerage portfolio. Marsh GIMI is the canonical institutional reference.

**What it is NOT:** This is a rate-change index, not an absolute premium level. A −7% rate change on a $500K premium is still a $500K premium; the number tells you pricing *direction* and *competition intensity*, not cost burden.

**Current reading (as of 2026-06-01):**
- Marsh GIMI reports cyber rates **declined every single quarter since at least Q2 2022**, including −6% to −7% globally in every quarter of 2025 and −5% in Q1 2026.
- US-specific: 11+ consecutive quarters of decline through Q4 2025; US Q4 2025 = −3%.
- Source: [[sources/marsh-global-insurance-market-index-2025]]

### 2. Claims Frequency (理賠頻率)

**Definition:** How often insured organizations file cyber insurance claims. Tracked by insurers (Coalition, Munich Re, Beazley) from their own policyholder pools. Coalition is the most transparent data publisher.

**Current reading (as of 2026-06-01):**
- Coalition 2026 report (2025 data): claims frequency **+3% YoY globally**.
- Coalition 2025 report (2024 data): claims frequency **−7% YoY** — a year of brief respite before re-acceleration.
- Source: [[sources/coalition-cyber-claims-report-2026]]

### 3. Claims Severity / Average Loss (理賠嚴重度 / 平均損失)

**Definition:** Average financial loss per insurance claim. Affected by attack type mix, target sector, IR quality, and ransom payment rates.

**Current reading (as of 2026-06-01):**
- Coalition 2026 (2025 data): average loss **$116,000** (−19% YoY) — severity *declining* despite frequency rising.
- Coalition 2025 (2024 data): ransomware average loss $292,000 (−7% YoY).

### 4. Ransom Demand (勒索金額)

**Definition:** The amount demanded by ransomware threat actors at the initial contact, before negotiation. A lagging indicator of attacker confidence and target quality.

**Current reading (as of 2026-06-01):**
- 2025: Initial demands **+47% YoY** (Coalition 2026 report), averaging well above $1M for large targets.
- 2024: Initial demands −22% YoY ($1.1M average) — a brief dip before the 2025 surge.
- Payment refusal rate: 86% of targeted businesses refused to pay in 2025 (record high), up from 56% in 2024.

### 5. IC3 Complaints and Losses (FBI投訴量與損失)

**Definition:** Total cybercrime complaints and reported financial losses filed with the FBI's Internet Crime Complaint Center. The broadest US government crime-frequency measure, published annually.

**Current reading (as of 2026-06-01):**
- 2025 (published March 2026): **1,008,597 complaints** (first time exceeding 1M); **$20.877 billion in losses** (+26% YoY).
- 2024 (published May 2025): 859,532 complaints; **$16.6 billion in losses** (+33% YoY).
- Source: [[sources/fbi-ic3-annual-report]]

---

## Update Cadence

| Feed | Frequency | Publisher | URL |
|---|---|---|---|
| Marsh GIMI cyber sub-index | Quarterly (published ~6 weeks after quarter-end) | Marsh | [marsh.com/en/…/global-insurance-market-index.html](https://www.marsh.com/en/services/international-placement-services/insights/global-insurance-market-index.html) |
| Coalition cyber claims report | Annual (published Q1 following year) | Coalition | [coalitioninc.com/claims-report/2026](https://www.coalitioninc.com/claims-report/2026) |
| FBI IC3 annual report | Annual (published Q2 following year) | FBI/IC3 | [ic3.gov/annualreport/reports](https://www.ic3.gov/annualreport/reports) |
| US insurance rate updates | Quarterly | Marsh | [marsh.com/en/…/us-insurance-rates.html](https://www.marsh.com/en/services/international-placement-services/insights/us-insurance-rates.html) |

---

## Interpretation and Judgment Table

This is the **core analytical crux of the indicator**. The rate direction and attack direction can diverge, and the divergence matters enormously.

| Scenario | Cyber Rate | Attack Frequency | Interpretation |
|---|---|---|---|
| **Classic tailwind** | Rising | Rising | Premiums rise because attacks cost more → enterprises forced to buy more coverage AND spend more on prevention → budget expansion at CRWD/PANW/ZS/NET confirmed by both demand channels |
| **Soft market trap** | Falling | Rising | Premiums fall due to insurer competition and capacity glut — NOT because attacks declined. This is the **current regime (2022–2026)**. Attacks rise but insurance is cheap → enterprises may underinvest in security relative to actual risk. NOT a positive demand signal; may even indicate future severity correction |
| **Post-hardening cooldown** | Falling | Falling | Premiums fall AND attacks fall → genuine improvement in security posture across the market; cybersecurity budget growth slows or normalizes |
| **Hardening market** | Rising | Stable | Capacity withdrawal or catastrophic loss event forces rates up even without new attack escalation → insurance-cost pressure catalyzes incremental security spending |
| **Decoupled severity** | Falling (frequency) | Rising (severity) | Attackers shift from volume plays to high-value targets → fewer, larger claims. Watch average loss and ransom demand data, not just rate direction |

> **The current regime (2026-06-01) is the "soft market trap":** global cyber rates have declined every quarter for 3+ years while FBI IC3 losses grew +33% (2024) and +26% (2025). Premiums falling does NOT mean the cyber threat is subsiding. Analysts who read falling premiums as a demand headwind for cybersecurity vendors are making a category error — they are conflating **insurance pricing competition** with **threat level**.

### Reading the Cross-Signal

To form a view on cybersecurity sector tailwind strength, monitor all three feeds simultaneously:

```
Strong tailwind:   Marsh rates rising OR flat + IC3 losses YoY up + Coalition freq up
Moderate tailwind: Marsh rates falling (soft market) + IC3 losses up + Coalition freq up/flat
Neutral:           Marsh rates falling + IC3 losses flat + Coalition freq down
Bear scenario:     Sustained hard evidence of attack frequency collapse (has not occurred as of 2026)
```

---

## Representative Sector Proxies

These are **illustrative sector proxies only** — they track the cybersecurity software/services sector response to this indicator. They are not the owner's holdings and are not investment recommendations.

| Ticker | Category | Relevance |
|---|---|---|
| CRWD | Endpoint / XDR | Largest pure-play; revenue most correlated to enterprise security budget expansion |
| PANW | Platform / SASE | Largest by revenue; platformization thesis depends on budget consolidation |
| ZS | SASE / Zero Trust | Cloud-delivered; sensitive to mid-market security spending |
| NET | Edge / Zero Trust | Network-layer security + DDoS; broader attack surface |
| FTNT | On-prem + Cloud | Hardware + software; split exposure |
| S | AI-native EDR | Fastest-growing pure-play, most exposed to AI-driven threat escalation theme |
| CHKP | Incumbent gateway | Stable FCF, less growth-sensitive but benefits from budget expansion |

**Exchange/broker beneficiaries:** None for this indicator (see [[concepts/zero-dte-options-share-indicator]] for CBOE/IBKR/HOOD framing).

---

## Canonical Data Sources

1. **Marsh Global Insurance Market Index** — [[sources/marsh-global-insurance-market-index-2025]] — Quarterly cyber rate index, canonical institutional reference
2. **FBI IC3 Annual Report** — [[sources/fbi-ic3-annual-report]] — Annual US cybercrime complaint and loss totals
3. **Coalition Cyber Claims Report** — [[sources/coalition-cyber-claims-report-2026]] — Annual insurer-side claims frequency and severity data

---

## See Also

- [[synthesis/us-equity-secondary-variable-dashboard]] — the dashboard this indicator belongs to
- [[synthesis/ai-quant-trading-architecture-improvements]] — Trader-agent umbrella; this indicator feeds the regime-awareness layer for sector allocation
- [[concepts/zero-dte-options-share-indicator]] — Sibling indicator in the same Risk cluster; market-structure signal vs this fundamental/macro signal
- [[concepts/volatility-targeting]] — Position-sizing framework; macro sector signals like this one inform directional confidence that feeds into the vol-targeting weight
- [[concepts/llm-as-feature-engineer]] — LLM-as-feature-engineer pattern: the quarterly Marsh/IC3 data can be structured as a macro regime feature column in the quant pipeline
