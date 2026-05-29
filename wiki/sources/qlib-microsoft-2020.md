---
type: source
tags: [trading, quant, qlib, backtesting, microsoft, ai, alpha-factor, oss, paper]
title: "Qlib: An AI-oriented Quantitative Investment Platform"
author: "Xiao Yang, Weiqing Liu, Dong Zhou, Jiang Bian, Tie-Yan Liu (Microsoft Research Asia)"
date: "2020-09-22"
ingested: "2026-05-29"
---

# Qlib: An AI-oriented Quantitative Investment Platform

**arXiv:** [arXiv:2009.11189](https://arxiv.org/abs/2009.11189) — submitted 22 September 2020
**Repo:** [github.com/microsoft/qlib](https://github.com/microsoft/qlib) — MIT license, ~43.7 k stars (May 2026)
**Authors:** Xiao Yang, Weiqing Liu, Dong Zhou, Jiang Bian, Tie-Yan Liu
**Affiliation:** Microsoft Research Asia (MSRA)
**Entity page:** [[entities/qlib]]

---

## Abstract (paraphrased)

Quantitative investment aims to maximize return and minimize risk over a set of financial instruments across a sequential trading period. The rapid development of AI technologies has created new infrastructure challenges: financial data is high-volume and time-sensitive; ML models require reproducible feature pipelines; and the research-to-production cycle is slow and fragile. Qlib is presented as the first open-source platform that accommodates the full workflow of a modern quantitative researcher in the AI era. The authors describe the platform's architecture and show that it achieves state-of-the-art performance across multiple standard benchmarks.

---

## Platform Architecture (from paper)

The paper documents eight primary modules organized as a modular, loosely coupled pipeline:

1. **Data Server** — retrieves and stores raw financial data in a flat binary format organized by frequency × instrument × attribute. Achieves array-speed access comparable to HDF5 while supporting incremental updates.
2. **Data Enhancement** — constructs datasets with derived factors/features via a declarative **expression engine** (DSL). Example expression: `(MEAN($close,N) + 2*STD($close,N) - $close) / MEAN($close,N)` computes Bollinger upper bound. The engine parallelizes across CPU cores and maintains three cache tiers (MemCache / ExpressionCache / DatasetCache), reducing repeated computation by up to 80.4 %.
3. **Model Creator** — trains predictive models on the constructed dataset; supports LightGBM, XGBoost, LSTM, Transformer, and custom PyTorch models.
4. **Model Manager** — handles lifecycle of multiple concurrently tracked models (versioning, storage, retrieval).
5. **Model Ensemble** — combines multiple models for robustness (bagging, boosting, stacking).
6. **Portfolio Generator** — converts model prediction scores to portfolio weights via mean-variance optimization or signal-rank weighting.
7. **Orders Executor** — high-fidelity trading simulator with configurable latency, transaction cost, and market impact; used for both backtesting and live paper trading.
8. **Analyser** — evaluates alpha signals (IC, RankIC, ICIR), portfolio performance (annualized return, Sharpe, max drawdown), and execution quality (slippage, fill rates).

---

## Data Layer: High-Performance Expression Engine

The paper's main technical contribution on the data side is the expression-based feature DSL. Feature definitions are written as composable operator trees over raw price/volume fields (`$close`, `$open`, `$high`, `$low`, `$volume`, `$vwap`). Supported operator categories include:

- **Rolling statistics**: `MEAN`, `STD`, `VAR`, `MAX`, `MIN`, `SUM`
- **Shift/reference**: `Ref` (look-back), `Delta` (difference), `Slope`
- **Cross-sectional**: `Rank`, `CSRankNorm`, `CSZScoreNorm`
- **Math**: `Log`, `Power`, `Abs`, `Sign`, `If`

Expressions are parsed into a DAG, computed in parallel, and cached per expression node — enabling incremental updates when new trading days arrive without re-computing the full historical feature matrix.

**Benchmark**: total pipeline time with full caching — 7.4 s on single machine, 3.1 s on 64-core machine. All faster than MySQL, MongoDB, InfluxDB, and HDF5 without caching.

---

## Alpha Feature Datasets

Two benchmark feature sets ship with Qlib for both CSI 300 (China A-shares) and S&P 500 (US equities):

### Alpha158

- **158 features** constructed by human expert factor engineering
- Features are rolling technical indicators: multi-period price ratios, momentum, mean-reversion, volatility, volume ratios, computed over 5 / 10 / 20-day windows
- Low spatial (cross-feature) correlation; suited to GBDT / tree-based models that do not exploit spatial structure
- **Label definition**: `Ref($close, -2) / Ref($close, -1) - 1` — uses T+2 settlement convention (China); the T+2 shift ensures no look-ahead on the trade date
- The canonical target for adding a new LLM-derived feature column: slot alongside 158 existing features, retrain LightGBM, check IC improvement

### Alpha360

- **360 features** from raw close/open/high/low/volume over a 60-day lookback; minimal human engineering
- Strong temporal spatial structure between features across the time dimension
- Designed for models that self-learn feature interactions: LSTM, GRU, TCN, Transformer
- Harder to beat with a single hand-crafted factor because the model already internalizes many price patterns

---

## Model Zoo: Benchmark Results

Full benchmark on CSI 300 with rolling backtest (from `examples/benchmarks/README.md`):

### Alpha158 Results

| Model | IC | RankIC | Ann. Return |
|---|---|---|---|
| LightGBM | 0.0448 | 0.0469 | 9.01 % |
| XGBoost | 0.0498 | 0.0505 | 7.80 % |
| CatBoost | 0.0481 | 0.0454 | 7.65 % |
| DoubleEnsemble | 0.0521 | 0.0502 | 11.58 % |
| TRA | 0.0440 | 0.0540 | 7.18 % |
| ALSTM | 0.0362 | 0.0463 | 4.70 % |
| LSTM | 0.0318 | 0.0435 | 3.81 % |
| GRU | 0.0315 | 0.0428 | 3.44 % |
| Transformer | 0.0264 | 0.0407 | 2.73 % |
| MLP | 0.0376 | 0.0429 | 8.95 % |
| Linear | 0.0397 | 0.0472 | 6.92 % |

### Alpha360 Results

| Model | IC | RankIC | Ann. Return |
|---|---|---|---|
| HIST | 0.0522 | 0.0667 | 9.87 % |
| TCTS | 0.0508 | 0.0599 | 8.93 % |
| IGMTF | 0.0480 | 0.0606 | 9.46 % |
| TRA | 0.0485 | 0.0587 | 9.20 % |
| GRU | 0.0493 | 0.0584 | 7.20 % |
| ALSTM | 0.0497 | 0.0599 | 6.26 % |
| LightGBM | 0.0400 | 0.0499 | 5.58 % |
| DoubleEnsemble | 0.0390 | 0.0486 | 4.62 % |

---

## Alpha-Factor Evaluation Metrics

The paper adopts three core metrics for evaluating any predictive alpha column:

- **IC (Information Coefficient)** — daily Pearson cross-sectional correlation between predicted score and next-period return, then averaged over time. Positive mean IC = factor ranks stocks in the correct direction.
- **RankIC** — Spearman rank-order version of IC; more robust to fat-tailed return distributions.
- **ICIR** — IC ÷ std(IC); measures consistency (high ICIR = IC does not vary too much across regimes).

These are the metrics used in [[synthesis/ai-quant-trading-architecture-improvements]] §5 (TODO-B) to validate whether an LLM-derived sentiment column carries alpha: the target is IC > 0 vs the Alpha158 stock-factor IC baseline (LightGBM IC ≈ 0.045).

---

## Workflow: `qrun` + YAML

The paper presents `qrun` as the primary research interface:

```bash
qrun benchmarks/LightGBM/workflow_config_lightgbm_Alpha158.yaml
```

A workflow YAML specifies: data provider class, dataset handler (Alpha158 or Alpha360), train/valid/test time splits, model class and hyperparameters, backtest config (rolling window, transaction cost model, benchmark index, risk model), and report output. The YAML-driven design enables full reproducibility and clean experiment diffs.

---

## Rolling / Walk-Forward Backtest Harness

Qlib's standard backtesting mode is **rolling retraining**: as the evaluation date advances, the model is periodically retrained on an expanding or sliding window of historical data and then tested on the next out-of-sample period. This avoids look-ahead bias and simulates real-world deployment.

**Limitation identified in [[synthesis/ai-quant-trading-architecture-improvements]] §1.4**: single-path walk-forward provides only one performance number, making it susceptible to p-hacking — tuning YAML hyperparameters until a good number appears. The synthesis recommends augmenting or replacing this with **[[concepts/combinatorial-purged-cross-validation]]** (CPCV; López de Prado), which generates multiple train-test paths, purges temporally leaking observations across folds, and produces a distribution of Sharpe ratios — making overfitting detection tractable.

---

## RD-Agent Extension (2025)

The 2025 companion work "R&D-Agent-Quant" (arXiv:2505.15155; Li et al., MSRA + CMU + HKUST + Oxford) introduces a multi-agent LLM framework that automates Qlib's manual factor-mining and model-selection stages. Key points:

- Architecture: two-phase Research (Specification + Synthesis) → Development (Co-STEER code generation + Validation + Analysis) loop.
- Factor deduplication: IC ≥ 0.99 correlation with any existing SOTA factor → discard as redundant.
- OOS results (2024–2025, CSI 500 + NASDAQ 100): RD-Agent(Q) with o3-mini reaches ARR = 14.21 % vs Alpha158 baseline ARR = 5.70 % (≈2×), using 70 % fewer factors. ICIR of the best RD-Agent run = 1.7382 vs 1.3406 for MASTER (best deep learning baseline).
- Cost: full optimization cycle < $10 in API calls.

This maps directly to [[synthesis/ai-quant-trading-architecture-improvements]] §4.5 guardrail: "LLM proposes hypotheses, an independent CPCV worker evaluates."

---

## Significance

- **First open-source full-stack quant platform** built around AI/ML as a first-class citizen (paper's own claim; 2020).
- **Standard benchmark reference** for academic quant ML work: Alpha158 and Alpha360 are now the de facto standard datasets for comparing new alpha models in the Chinese academic quant literature.
- **LLM factor integration target**: the Alpha158 feature column extension path is the lowest-risk entry point for validating whether any LLM-derived signal (FinGPT sentiment, FinRobot analysis, custom NemoClaw inference) carries measurable alpha before full architecture investment.

---

## See Also

- [[entities/qlib]] — entity hub page with full architecture and model zoo details
- [[sources/qlib-microsoft-quant-platform]] — companion platform/repo overview (workflow, RD-Agent details)
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.2 LLM-as-feature-engineer; §1.4 CPCV; §5 TODO-B (the first thing to build)
- [[synthesis/ai-quant-trading-oss-stack-selection]] — Qlib's position in the full OSS quant stack
- [[entities/finrobot]] — brain-layer multi-agent platform whose sentiment output feeds Qlib Alpha158
- [[entities/fingpt]] — LoRA-fine-tuned LLM; output → continuous sentiment float → Qlib feature column
- [[concepts/combinatorial-purged-cross-validation]] — CPCV anti-overfitting method to replace walk-forward
- [[concepts/llm-as-feature-engineer]] — the design principle that LLM output should be a feature column, not a decision
- [[concepts/volatility-targeting]] — position-sizing module downstream of Qlib signals
