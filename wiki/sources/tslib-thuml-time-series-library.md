---
type: source
tags: [ai, quant, time-series, tslib, thuml, timesnet, patchtst, itransformer, forecasting, oss]
title: "TSlib (THUML Time-Series-Library) — Deep Time-Series Model Zoo"
author: "THUML, Tsinghua University (github.com/thuml/Time-Series-Library)"
date: "2026-05-29"
ingested: "2026-05-29"
---

# TSlib — THUML Time-Series-Library

**Repo**: [github.com/thuml/Time-Series-Library](https://github.com/thuml/Time-Series-Library) · maintained by **THUML (Tsinghua University Machine Learning group)** · grew out of the original Autoformer repo · snapshot 2026-05-29.

TSlib is the de-facto open benchmark + model zoo for **deep time-series models**. For quant use it is the place to get state-of-the-art volatility / price-band forecasters that ingest hundreds of days of multivariate features (volatility, volume, margin/short balances) at once — far beyond MA / Bollinger.

## Models included (the ones that matter for quant)

- **TimesNet** — 2D-variation modeling of multi-periodicity; strong all-rounder, frequently top-3 across tasks.
- **PatchTST** (ICLR 2023) — patch + channel-independent Transformer; the §5 decision-table pick for swing / medium-horizon forecasting.
- **iTransformer** (ICLR 2024) — inverts the attention to treat variates as tokens; strong on multivariate forecasting.
- **Autoformer** (NeurIPS 2021) — decomposition + auto-correlation; the repo's ancestor.
- **Informer** — ProbSparse attention for long-sequence forecasting.

## Key facts

- Unified `run.py` harness with a public leaderboard across 5 task types (long/short forecasting, imputation, anomaly detection, classification).
- July 2024: THUML published a deep-time-series-models survey backed by TSlib benchmarks.
- Designed for research/benchmarking — wire its forecasts into Qlib as features rather than treating it as a trading engine.

## What it is for (in the three-layer model)

Perception → feature layer: produce **forward volatility / price-band predictions** that feed dynamic position sizing (architecture page §1.3 volatility targeting) or become Qlib feature columns. See the concept hub [[concepts/time-series-forecasting-quant]].

## See Also

- [[concepts/time-series-forecasting-quant]] — model-family hub (TimesNet / PatchTST / iTransformer / Autoformer / Informer)
- [[synthesis/ai-quant-trading-oss-stack-selection]] — §4 ML models; §5 decision table
- [[sources/qlib-microsoft-quant-platform]] — where TSlib forecasts become features
