---
type: concept
tags: [trading, quant, backtesting, cpcv, overfitting, cross-validation, financial-machine-learning]
---

# Combinatorial Purged Cross-Validation (CPCV)

## One-Sentence Definition

CPCV is a cross-validation scheme for financial time series that (a) removes label-contaminated training observations via **purging** and an **embargo gap**, and (b) exhausts all C(N,k) train/test combinations of N sequential groups to produce a **distribution** of backtest paths — not one number — making overfitting detectable before deployment.

---

## The Problem CPCV Solves

Standard k-fold CV and walk-forward analysis both fail in finance for two independent reasons.

### 1. Look-ahead leakage from overlapping labels

Financial labels are not point-in-time. A label "did this trade profit within the next 5 days?" looks *forward* from the observation timestamp. In a naive train/test split the training set may contain observations whose label windows *overlap in calendar time* with the test set. The model learns from information it would not have had in production.

### 2. Single-path p-hacking

Walk-forward produces **one Sharpe ratio** on **one temporal path**. A researcher who iterates strategy parameters until the walk-forward Sharpe looks good has implicitly searched a high-dimensional hypothesis space using a single noisy number as a compass. Bailey, Borwein, López de Prado & Zhu (2014) show that with enough trials the probability of selecting an overfit strategy approaches 1 — the **Probability of Backtest Overfitting (PBO)**.

Serial correlation in financial data makes both problems worse: observations separated by days or weeks share information (e.g., momentum, earnings windows, macro cycles), so even a gap between train and test windows may be insufficient without an explicit embargo.

---

## The Two Hygiene Mechanisms

### Purging

After constructing a candidate training set, **remove every training observation whose label horizon overlaps in time with any observation in the test set**.

Formally: if observation $i$ has a label that spans calendar time $[t_i, t_i + \Delta_i]$, and the test set covers $[T_{\text{start}}, T_{\text{end}}]$, then $i$ is purged from training if $t_i + \Delta_i > T_{\text{start}}$.

This ensures the training signal is causally prior to the test window regardless of how long labels look forward.

Implemented in `skfolio.model_selection.CombinatorialPurgedCV` as `purged_size` (number of observations to drop around each test boundary) and in `mlfinlab` as `PurgedKFold`.

### Embargo

After purging, **additionally drop a fixed buffer of observations immediately following the test set** before the next training block begins.

Rationale: even with purging, the financial regime immediately after a test period may be correlated with the regime *during* it (e.g., post-earnings drift, macro autocorrelation). The embargo widens the gap to h̄ observations. A typical choice is h̄ = 0.01 × T (1% of the dataset). In `skfolio` this is the `embargo_size` parameter.

> **Purging** handles contamination from **before** the test set.  
> **Embargo** handles contamination from **after** the test set (residual serial correlation in the training data that follows the test block).

---

## The Combinatorial Machinery

### Setup

Divide the time series into **N** sequential, non-overlapping groups (folds), preserving time order. Choose **k < N** groups to serve as the test set in each split.

The number of distinct train/test arrangements is:

$$\binom{N}{k} = \frac{N!}{k!\,(N-k)!}$$

### Number of Backtest Paths

Each arrangement yields a sequence of k non-contiguous test blocks spread across the full time range. Concatenating those blocks in time order produces **one backtest path**. Each observation appears in the test set in exactly $\binom{N-1}{k-1}$ splits.

The total number of reconstructable backtest paths is:

$$\phi(N,k) = \frac{k}{N} \cdot \binom{N}{k}$$

**Example:** N = 6 groups, k = 2 test groups.

$$\binom{6}{2} = 15 \text{ splits}, \qquad \phi(6,2) = \frac{2}{6} \times 15 = 5 \text{ paths}$$

These 5 independent paths each have a Sharpe ratio. Together they form a **distribution** of Sharpe ratios.

### Why a Distribution Matters

Walk-forward gives 1 Sharpe. CPCV gives $\phi(N,k)$ Sharpes drawn from different market regimes (bull/bear/consolidation/crisis). A strategy that is robust across all paths has genuinely generalizable alpha. One that wins on 1 path but loses on the others is overfit to a specific regime.

---

## Companion Anti-Overfitting Metrics

### Deflated Sharpe Ratio (DSR)

Developed by Bailey & López de Prado (2014, SSRN 2460551). The DSR adjusts the Sharpe ratio for:

1. **Selection bias** — if you tested $N_{\text{trials}}$ strategies and picked the best, the expected maximum Sharpe under the null hypothesis is inflated relative to a single trial.
2. **Non-normality** — actual return distributions have negative skew and excess kurtosis, which inflate the naive Sharpe estimate.
3. **Sample length** — shorter backtests have higher Sharpe variance.

The DSR asks: "After correcting for all these inflations, is this Sharpe ratio statistically significant?"

### Probability of Backtest Overfitting (PBO)

Developed by Bailey, Borwein, López de Prado & Zhu (2014, SSRN 2326253). Using combinatorial cross-validation, compute the fraction of test paths on which the **in-sample best** strategy also performs *below the median* out-of-sample. That fraction is the PBO. A PBO > 0.5 is a red flag that the selection process has overfit.

CPCV's multi-path output directly feeds PBO computation: pick the strategy with the best median in-sample Sharpe across training sets, then check what fraction of the $\phi(N,k)$ out-of-sample paths it underperforms.

---

## Comparison Table

| Property | Standard k-Fold | Walk-Forward | CPCV |
|---|---|---|---|
| Respects time order | No (random shuffles) | Yes (one direction) | Yes (N groups preserved) |
| Label leakage control | None | Partial (fixed gap) | Explicit purge + embargo |
| Number of backtest paths | Meaningless (shuffled) | 1 | φ(N,k) ≥ 2 |
| Overfitting detection | Poor | Low signal | DSR + PBO from path distribution |
| Sample efficiency | High | Low (only uses late data as test) | High |
| Serial correlation handling | None | Partial | Embargo handles post-test correlation |

---

## Practical Implementation

**skfolio** (Python, open-source):

```python
from skfolio.model_selection import CombinatorialPurgedCV

cv = CombinatorialPurgedCV(
    n_folds=6,          # N
    n_test_folds=2,     # k
    purged_size=5,      # days purged around test boundary
    embargo_size=10,    # days dropped after test fold
)
# cv.n_splits == C(6,2) == 15
# cv.n_test_paths == phi(6,2) == 5
```

**mlfinlab** (Hudson & Thames, implements AFML chapter directly):
- `PurgedKFold` for simple purge-only CV
- `CombinatorialPurgedKFold` for the full CPCV

**sktime** `SlidingWindowSplitter` does walk-forward only (no purge/embargo).

A typical workflow:

1. Generate $\binom{N}{k}$ splits with CPCV.
2. Train and score the strategy on each split.
3. Reconstruct $\phi(N,k)$ backtest paths.
4. Report the **distribution** of Sharpe ratios (mean, 10th percentile, PBO).
5. Accept the strategy only if the 10th-percentile Sharpe exceeds a minimum threshold and PBO < 0.1.

---

## Relationship to the Trader Agent Architecture

In [[synthesis/ai-quant-trading-architecture-improvements]] (§1.4, TODO-D), CPCV replaces walk-forward in the backtest gate:

- The LLM proposes a new strategy hypothesis or parameter set.
- An independent backtest worker (not the LLM) runs CPCV.
- The worker reports the **Sharpe distribution + PBO** back to the LLM.
- The LLM is explicitly prohibited from tuning parameters until the backtest passes all regime buckets.

This architectural separation ensures the LLM sees only the *outcome* of a rigorous test, not a single number it can game by iterating. The regime-aware buckets (bull / bear / consolidation / high-volatility) map to the multi-path distribution: a strategy that is only a bull-market artifact will show near-zero PBO success rate across bearish paths.

CPCV also complements [[concepts/calibrated-confidence-llm]]: just as calibration forces the LLM to attach meaningful probabilities to predictions, CPCV forces the backtest layer to attach a meaningful *distribution* to strategy performance — both fight against single-point overconfidence.

---

## Key References

- López de Prado, M. (2018). *Advances in Financial Machine Learning*. Wiley. ISBN 978-1-119-48208-6. Chapters 7 (labelling), 12 (backtesting / CPCV).
- Bailey, D. H. & López de Prado, M. (2014). "The Deflated Sharpe Ratio." [SSRN 2460551](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551).
- Bailey, D. H., Borwein, J., López de Prado, M. & Zhu, Q. J. (2014). "The Probability of Backtest Overfitting." [SSRN 2326253](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2326253).
- skfolio `CombinatorialPurgedCV` — [documentation](https://skfolio.org/generated/skfolio.model_selection.CombinatorialPurgedCV.html) (open-source Python, implements AFML).
- mlfinlab `CombinatorialPurgedKFold` — [documentation](https://www.mlfinlab.com/en/latest/cross_validation/cpcv.html) (Hudson & Thames, close to AFML reference implementation).

---

## See Also

- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.4 and TODO-D: CPCV as the mandatory backtest gate
- [[concepts/calibrated-confidence-llm]] — parallel concept: calibration forces single-model overconfidence to yield a probability distribution; CPCV forces single-path Sharpes to yield a distribution
- [[concepts/event-driven-quant-architecture]] — sibling concept: the event bus that feeds CPCV-validated strategies at runtime
- [[concepts/llm-as-feature-engineer]] — sibling concept: LLM outputs (sentiment scores) are the features being evaluated under CPCV, not the evaluator
- [[entities/qlib]] — Qlib backtest platform where CPCV validation integrates with Alpha factor evaluation
