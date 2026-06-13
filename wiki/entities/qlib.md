---
type: entity
tags: [trading, quant, qlib, backtesting, microsoft, ai, alpha-factor, oss]
---

# Qlib

**Type:** Open-source AI-oriented quantitative investment platform
**Maintainer:** Microsoft Research Asia (MSRA)
**Repo:** [github.com/microsoft/qlib](https://github.com/microsoft/qlib)
**License:** MIT
**GitHub scale:** ~43.7 k stars, ~6.9 k forks (as of May 2026)
**Contact:** qlib@microsoft.com
**Paper:** [[sources/qlib-microsoft-2020]] — arXiv:2009.11189 (Sept 2020)
**Platform overview:** [[sources/qlib-microsoft-quant-platform]]

---

## What Qlib Is

Qlib is a modular, production-oriented Python framework that covers the complete quantitative research workflow: data ingestion and feature engineering → model training → alpha-factor mining → portfolio optimization → backtesting → order execution. Its core philosophy is to use AI/ML as a first-class citizen throughout this chain rather than a bolt-on.

In the three-layer AI quant architecture described in [[synthesis/ai-quant-trading-architecture-improvements]], Qlib occupies the **執行 / 回測層 (execution / alpha-factor backtest layer)**. The synthesis page's §5 "first thing to build" recommendation is to add an LLM continuous-sentiment column as a new Alpha158 feature and verify IC > 0 against the stock Alpha158 baseline — all inside Qlib.

---

## Architecture

Qlib is organized into loosely coupled modules that can be used independently or as a full pipeline:

```
Data Server → Data Enhancement → Model Creator → Model Manager
    → Model Ensemble → Portfolio Generator → Order Executor → Analyser
```

### Data Layer

The data layer is the platform's performance centerpiece. It stores financial data in a flat binary (`.bin`) format organized by instrument × attribute × calendar frequency, enabling array-style scientific computation speeds. Key components:

- **Expression Engine** — a declarative domain-specific language for defining features. Example: `(MEAN($close, N) + 2*STD($close, N) - $close) / MEAN($close, N)` computes Bollinger-Band upper deviation. The engine parallelizes across CPU cores and caches results in three tiers (MemCache → ExpressionCache → DatasetCache), cutting repeated computation by up to 80.4 %.
- **DataHandler (DataHandlerLP)** — applies learnable processors (z-score normalization, cross-sectional ranking, missing-value drop) and exports three views: raw (DK_R), inference-ready (DK_I), learning-ready (DK_L).
- **Performance benchmark** — 7.4 s end-to-end with caching vs HDF5/MySQL/MongoDB/InfluxDB as baselines; 3.1 s on 64-core machines.

### Alpha Feature Sets

Two canonical feature datasets ship with Qlib, both covering CSI 300 (China A-shares) and S&P 500 (US equities):

| Dataset | Features | Construction approach | Typical model fit |
|---|---|---|---|
| **Alpha158** | 158 hand-engineered features | Rolling price/volume stats (MA, RSI, MACD, momentum, mean-reversion operators over 5/10/20-day windows), label = `Ref($close,-2)/Ref($close,-1) - 1` (T+2 settlement) | Tree-based models (LightGBM, XGBoost, CatBoost), MLP |
| **Alpha360** | 360 features | Raw close/open/high/low/volume over a 60-day lookback; minimal human engineering; strong temporal spatial structure | Sequence models (LSTM, GRU, TCN, Transformer) |

Adding a new LLM-derived sentiment column to Alpha158 is a canonical first experiment: it slots in alongside the existing 158 factors with no structural change, and IC/RankIC immediately quantify whether the column carries alpha.

### Model Zoo

Qlib ships benchmarked implementations for 25+ models across three paradigms:

**GBDT / tree-based**
- LightGBM, XGBoost, CatBoost

**Deep learning (sequence)**
- MLP, LSTM, GRU, ALSTM, TCN, Transformer, Localformer, TFT (Temporal Fusion Transformer), ADARNN, ADD, KRNN

**Specialized architectures**
- GATs (Graph Attention Networks), SFM, TabNet, TRA (Temporal Routing Adaptor), DoubleEnsemble, TCTS, IGMTF, HIST, Sandwich

Selected **CSI 300 benchmark results** (rolling backtest, annualized return / IC / RankIC on Alpha158 and Alpha360):

| Model | Dataset | IC | RankIC | Ann. Return |
|---|---|---|---|---|
| LightGBM | Alpha158 | 0.0448 | 0.0469 | 9.01 % |
| DoubleEnsemble | Alpha158 | 0.0521 | 0.0502 | 11.58 % |
| ALSTM | Alpha158 | 0.0362 | 0.0463 | 4.70 % |
| TRA | Alpha158 | 0.0440 | 0.0540 | 7.18 % |
| HIST | Alpha360 | 0.0522 | 0.0667 | 9.87 % |
| GRU | Alpha360 | 0.0493 | 0.0584 | 7.20 % |
| LightGBM | Alpha360 | 0.0400 | 0.0499 | 5.58 % |

LightGBM / Alpha158 is the reference baseline against which any new alpha column (including an LLM sentiment factor) must show IC > 0. See [[synthesis/ai-quant-trading-architecture-improvements]] §5.

---

## Workflow: `qrun` + YAML

The primary entry point is the `qrun` CLI command, which takes a YAML workflow config and executes the full pipeline:

```bash
qrun benchmarks/LightGBM/workflow_config_lightgbm_Alpha158.yaml
```

A typical YAML config specifies: data provider, feature handler (Alpha158/Alpha360), dataset split (train/valid/test), model class and hyperparameters, backtest config (rolling window, transaction cost, risk model), and report output path. This YAML-first design makes experiments fully reproducible and config-diff friendly for git tracking.

---

## Backtesting and Walk-Forward

Qlib's backtest harness performs **rolling retraining**: the model is periodically retrained on an expanding or sliding window as the evaluation date advances. This simulates real-world strategy deployment and avoids look-ahead bias.

Limitation: the single-path walk-forward design is susceptible to backtest overfitting (p-hacking), because each YAML-tuned run represents one path through history. [[synthesis/ai-quant-trading-architecture-improvements]] §1.4 recommends replacing or augmenting this with **[[concepts/combinatorial-purged-cross-validation]]** (López de Prado), which generates multiple train-test paths, purges temporally overlapping observations, and embargoes the gap between folds — yielding a distribution of Sharpe ratios instead of a single backtest number.

---

## IC and RankIC: The Alpha-Factor Evaluation Metric

- **IC (Information Coefficient)** — Pearson cross-sectional correlation between a factor's predicted score and the realized next-period return, computed daily and averaged over time. A positive mean IC implies the factor ranks stocks in the right direction.
- **RankIC** — Spearman rank correlation version of IC; more robust to outliers in return distributions.
- **ICIR** — IC ÷ std(IC); measures signal consistency over time.

These three metrics are the primary evaluation criteria for any new alpha column in Qlib, and specifically for the LLM-sentiment-factor validation task in [[synthesis/ai-quant-trading-architecture-improvements]] §5 (TODO-B). The synthesis requires IC > 0 (ideally IC > Alpha158 baseline IC of ~0.045) to justify full architecture investment.

---

## RD-Agent Extension

[github.com/microsoft/RD-Agent](https://github.com/microsoft/RD-Agent) is a multi-agent LLM system built on top of Qlib that automates the factor-mining and model-innovation loop. The companion paper "R&D-Agent-Quant" (Li et al. 2025, arXiv:2505.15155) describes the architecture:

- **Research phase** — Specification Unit + Synthesis Unit generate factor hypotheses drawing on a "knowledge forest" of prior experiments.
- **Development phase** — Co-STEER code agent writes factor code, a Validation Unit backtests it in Qlib, an Analysis Unit scores it; Thompson sampling selects whether to improve factors or models next.
- **Deduplication gate** — new factors with IC ≥ 0.99 correlation to any existing SOTA factor are discarded as redundant.

**Performance results vs Alpha158/Alpha360 baselines (CSI 500 + NASDAQ 100, 2024–2025 OOS test):**
- Alpha158 baseline: IC = 0.0341, ARR = 5.70 %
- Alpha360 baseline: IC = 0.0420, ARR = 4.38 %
- RD-Agent(Q) with o3-mini: IC = 0.0532, **ARR = 14.21 %** (~2× baseline), using 70 % fewer factors

Total cost of one optimization cycle: under $10 in API calls, making it accessible to small teams.

RD-Agent is relevant to [[synthesis/ai-quant-trading-architecture-improvements]] §4.5: the guardrail that "LLM proposes hypotheses; an independent backtest worker evaluates in CPCV" maps directly to RD-Agent's Research / Development phase split.

---

## Role in the Broader AI Quant Stack

Qlib connects to sibling OSS tools documented in the wiki:

- **[[entities/finrobot]]** / **[[entities/fingpt]]** — brain-layer agents that produce sentiment signals; their output (as a continuous float column) feeds Qlib's Alpha158 feature pipeline.
- **[[concepts/llm-as-feature-engineer]]** — the design principle that LLM outputs should be feature columns, not order buttons; Qlib's Alpha158 feature-column extension is the canonical implementation.
- **[[concepts/combinatorial-purged-cross-validation]]** — the anti-overfitting backtest method that should replace Qlib's single-path walk-forward.
- **[[concepts/volatility-targeting]]** — the position-sizing module that consumes Qlib's backtest signals downstream.

---

## See Also

- [[sources/qlib-microsoft-2020]] — formal arXiv:2009.11189 paper citation
- [[sources/qlib-microsoft-quant-platform]] — platform/repo overview page
- [[synthesis/ai-quant-trading-architecture-improvements]] — canonical use-case: LLM sentiment as Qlib Alpha Factor (§1.2, §5, TODO-B)
- [[synthesis/ai-quant-trading-oss-stack-selection]] — where Qlib fits in the full OSS stack
- [[entities/finrobot]] — brain-layer multi-agent platform whose signals feed Qlib
- [[entities/fingpt]] — LoRA-fine-tuned sentiment LLM; output → Qlib feature column
- [[concepts/combinatorial-purged-cross-validation]] — CPCV replaces Qlib's walk-forward
- [[concepts/llm-as-feature-engineer]] — the architectural pattern Qlib enables
- [[concepts/volatility-targeting]] — position-sizing downstream of Qlib signals
