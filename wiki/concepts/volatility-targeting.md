---
type: concept
tags: [trading, quant, risk, position-sizing, volatility-targeting, risk-parity, portfolio-management]
---

# Volatility Targeting

## One-Sentence Definition

Volatility targeting scales each position's notional exposure **inversely to its recent realized or forecast volatility** — so the portfolio delivers a roughly constant annualised volatility regardless of which market regime is active.

---

## The Core Formula

$$w_i = \frac{\sigma_{\text{target}}}{\hat{\sigma}_i}$$

where:

- $w_i$ — the scalar weight (or leverage factor) applied to the raw signal for instrument $i$
- $\sigma_{\text{target}}$ — the system-wide annualised volatility target (e.g., 15%)
- $\hat{\sigma}_i$ — the estimated near-term annualised volatility of instrument $i$

**Interpretation:** If an equity is currently showing 30% realised volatility and the target is 15%, $w_i = 0.5$ — take half the base notional. If volatility compresses to 10%, $w_i = 1.5$ — lever up to 150% of base notional (subject to a cap).

Moreira & Muir's (2017) paper formalises the same idea at the portfolio level as:

$$f^{\sigma}_t = \frac{c}{\hat{\sigma}^2_{t}} \cdot f_{t+1}$$

where $f_{t+1}$ is the un-managed factor return signal, $\hat{\sigma}^2_t$ is the realised variance over the prior period, and $c$ is a constant that normalises unconditional variance. Scaling by variance (not standard deviation) is the published convention for the factor literature, but the single-asset practitioner formula above (divide by $\sigma$) is equivalent when $c$ absorbs the annualisation constant.

---

## Why It Improves Risk-Adjusted Returns

The mechanism identified by Moreira & Muir is **asymmetry between volatility and expected returns**:

> "Volatility timing increases Sharpe ratios because changes in volatility are not offset by proportional changes in expected returns."

In other words, when equity volatility doubles, expected next-period returns do *not* double. The variance premium is higher during high-vol regimes, but not high enough to compensate. By reducing exposure in high-vol periods, the managed strategy avoids disproportionate drawdowns relative to return pickup — mechanically increasing the Sharpe ratio.

For equity and credit factors, Moreira & Muir document that volatility targeting produces a **momentum-like overlay** via the leverage effect (vol tends to rise when prices fall), so the strategy naturally de-risks into drawdowns and re-risks into recoveries. For bonds, currencies, and commodities the Sharpe improvement is negligible because volatility and expected returns co-move more symmetrically.

**Empirical results (Moreira & Muir, 2017, *Journal of Finance*, vol. 72(4), pp. 1611–1644):**

| Factor | Unmanaged SR | Managed SR | Alpha |
|---|---|---|---|
| Market (MKT) | ~0.41 | ~0.52 | 4.9% pa |
| Momentum (UMD) | ~0.53 | ~0.73 | material |
| Value (HML) | ~0.38 | ~0.47 | material |
| BAB (Betting-Against-Beta) | material improvement | — | — |

(Exact numbers vary by sample period; the paper covers 1926–2014 for US equities.)

Harvey, Hoyle & Korgaonkar (2018, Oxford Man Institute) confirm the finding for global diversified portfolios: Sharpe ratios improve for equities and credit; the benefit is negligible for rates and commodities in isolation but material in balanced (60/40) and risk-parity portfolios.

---

## Volatility Estimation Methods

### 1. Rolling historical standard deviation

$$\hat{\sigma}_t = \sqrt{\frac{1}{L-1} \sum_{i=1}^{L} (r_{t-i} - \bar{r})^2} \times \sqrt{252}$$

Typical lookback L = 20–60 trading days. Simple, transparent, but all observations in the window receive equal weight — a volatility shock from 40 days ago counts as much as yesterday's.

### 2. EWMA (Exponentially Weighted Moving Average)

$$\hat{\sigma}^2_t = \lambda \hat{\sigma}^2_{t-1} + (1-\lambda) r_{t-1}^2$$

Annualised: $\hat{\sigma}_t = \sqrt{\hat{\sigma}^2_t \times 252}$.

JP Morgan's RiskMetrics canonical choice: **λ = 0.94** for daily data, implying a half-life of approximately 11 days. EWMA reacts faster to recent volatility spikes than rolling window but has no mean-reversion built in — it treats volatility as a random walk.

### 3. GARCH(1,1)

$$\hat{\sigma}^2_t = \omega + \alpha r_{t-1}^2 + \beta \hat{\sigma}^2_{t-1}$$

with $\alpha + \beta < 1$ to ensure stationarity. GARCH adds **mean reversion** toward a long-run variance $\bar{\sigma}^2 = \omega / (1 - \alpha - \beta)$. Empirically superior for single-step-ahead forecasts in equity markets, at the cost of fitting 3 parameters.

### Lookback / Turnover Tradeoff

Shorter lookbacks (e.g., 20-day EWMA λ = 0.94) respond faster to vol regime changes but generate **higher turnover and transaction costs**, especially for institutional investors. Longer lookbacks (e.g., 60-day rolling) produce smoother leverage paths but lag after vol spikes.

The arxiv paper "Smoothing Volatility Targeting" (2022, arxiv:2212.07288) formalises this tradeoff: optimal smoothing depends on the half-life of volatility persistence and the transaction cost coefficient. In practice, a 21–63 day EWMA is most common in medium-frequency systems.

---

## Relationship to Risk Parity

Risk parity allocates capital so that each asset contributes **equal volatility** to the portfolio. Volatility targeting is the single-asset analogue: it scales each position so that its *contribution* to portfolio volatility is proportional to its signal strength, not its notional dollar size.

The conceptual bridge:

| Concept | Allocation target | Rebalancing trigger |
|---|---|---|
| Equal-weight | Equal notional | Periodic |
| Risk parity | Equal volatility contribution | Vol change or drift |
| **Volatility targeting** | Constant aggregate vol | Vol change (rolling) |
| Kelly sizing | Maximise log-wealth | Edge + vol estimate |

Volatility targeting is strictly more conservative than full Kelly in high-vol environments, since full Kelly scales *up* when the Sharpe ratio is high even if volatility is also high.

---

## The LLM Guardrail Architecture

The [[synthesis/ai-quant-trading-architecture-improvements]] architecture (§1.3, §4.6) restricts the LLM's visibility to **sigma units**, not dollar amounts:

> "LLM 不能直接看到 / 寫入『帳戶餘額』『未實現損益』等可能誘發追漲殺跌行為的欄位；只能看『標準化波動率單位』(σ) 與『目前部位 vs 目標部位』。"

The `trader` agent in `agents/src/trader/` emits a `TradeThesis` with a `position_hint` expressed in **σ units**. The deterministic risk layer then applies:

```
dollar_notional = (position_hint_sigma * sigma_target / sigma_asset) * account_equity
```

This separation has two benefits:

1. **Hallucination containment.** The LLM cannot generate a position that references account equity directly. Even if it outputs a wildly large σ value, the risk layer clips it via the `sigma_cap` parameter.
2. **Risk budget portability.** The same `TradeThesis` YAML works whether the account holds $10K or $10M — the dollar conversion is handled entirely outside the model's context window.

This idiom is the *practical implementation* of volatility targeting: the LLM expresses conviction in normalized units; the risk module translates to notional and enforces the $\sigma_{\text{target}}$ constraint deterministically.

---

## Practical Implementation Sketch

```python
import numpy as np

def volatility_target_weight(
    returns: np.ndarray,        # daily returns, recent-to-past
    sigma_target: float = 0.15, # 15% annualised
    lookback: int = 60,         # days
    sigma_cap: float = 3.0,     # cap at 3× target (avoid near-zero vol)
    lam: float = None,          # if set, use EWMA instead of rolling
) -> float:
    """Return scalar weight w = sigma_target / sigma_hat."""
    r = returns[:lookback]
    if lam is None:
        sigma_hat = r.std(ddof=1) * np.sqrt(252)
    else:
        var_ewma = 0.0
        for ri in r[::-1]:           # oldest to newest
            var_ewma = lam * var_ewma + (1 - lam) * ri**2
        sigma_hat = np.sqrt(var_ewma * 252)
    sigma_hat = max(sigma_hat, sigma_target / sigma_cap)  # floor
    return sigma_target / sigma_hat
```

Unit test contract (matches [[synthesis/ai-quant-trading-architecture-improvements]] TODO-C):

```python
assert abs(volatility_target_weight(np.full(60, 0.01), sigma_target=0.15) - 0.944) < 0.01
# daily vol 1% → annualised ≈ 15.87% → weight ≈ 0.944
```

---

## Key References

- Moreira, A. & Muir, T. (2017). "Volatility-Managed Portfolios." *Journal of Finance*, 72(4), 1611–1644. [Wiley](https://onlinelibrary.wiley.com/doi/abs/10.1111/jofi.12513) | [SSRN 2659431](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2659431) | [NBER w22208](https://www.nber.org/papers/w22208).
- Harvey, C. R., Hoyle, E. & Korgaonkar, R. (2018). "The Impact of Volatility Targeting." Oxford Man Institute / Man Group. [Man Group article](https://www.man.com/insights/the-impact-of-volatility-targeting).
- Cederburg, S., O'Doherty, M. S., Wang, F. & Yan, X. (2020). "On the Performance of Volatility-Managed Portfolios." *Journal of Financial Economics*. [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0304405X2030132X). (Critical follow-up: turnover costs reduce gains for large institutional investors.)

---

## See Also

- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.3 (volatility targeting replaces Kelly) and §4.6 (LLM σ-unit guardrail)
- [[concepts/calibrated-confidence-llm]] — calibration forces probability outputs to be meaningful; vol targeting forces position sizes to be bounded — both are "output normalisation" guardrails
- [[concepts/combinatorial-purged-cross-validation]] — sibling concept: CPCV validates the signal quality that goes into position sizing; vol targeting determines the size of validated signals
- [[concepts/event-driven-quant-architecture]] — sibling concept: the event stream that delivers regime signals to the volatility estimator
- [[concepts/llm-as-feature-engineer]] — sibling concept: LLM produces the alpha signal (sentiment score, event classification) that the vol-targeting layer then sizes
- [[entities/qlib]] — Qlib execution layer where `volatility_target.py` plugs in as a position-sizing module
