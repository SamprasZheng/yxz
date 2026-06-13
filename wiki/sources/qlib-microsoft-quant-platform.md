---
type: source
tags: [ai, quant, trading, qlib, microsoft, backtesting, alpha-factor, oss]
title: "Microsoft Qlib — AI-Oriented Quantitative Investment Platform"
author: "Microsoft (github.com/microsoft/qlib)"
date: "2020-09-01"
ingested: "2026-05-29"
---

# Microsoft Qlib — AI-Oriented Quantitative Investment Platform

**Repo**: [github.com/microsoft/qlib](https://github.com/microsoft/qlib) · open-sourced ~Sept 2020 · actively maintained (snapshot 2026-05-29).

Qlib is Microsoft Research's AI-oriented quantitative investment platform — it aims to use AI to empower the full Quant research lifecycle, "from exploring ideas to implementing productions." It supports multiple ML paradigms (supervised learning, market-dynamics modeling, reinforcement learning) and is now bundled with [RD-Agent](https://github.com/microsoft/RD-Agent) to automate the factor/model R&D loop (RD-Agent-Quant).

## What it is for (in the three-layer model)

Qlib sits in the **執行 / 回測層 (execution / backtest layer)** of [[synthesis/ai-quant-trading-architecture-improvements]]: it is the place to do feature engineering, train supervised models, mine Alpha factors, and run end-to-end backtests — **not** an LLM or an agent.

## Key facts

- **`qrun`** — one command runs the whole workflow (build dataset → train model → backtest → evaluate).
- **Alpha158** — a tabular dataset of 158 human-engineered features (price/volume/rolling stats); low spatial relationship between features. The canonical place to bolt on a **new feature column** (e.g. an LLM sentiment factor — see [[synthesis/ai-quant-trading-architecture-improvements]] §1.2 / TODO-B).
- **Alpha360** — raw price+volume over a lookback window with little feature engineering; meant for models that learn features themselves.
- **Model zoo** — benchmark results for LightGBM/XGBoost, MLP, LSTM/GRU, TFT, Transformer, TRA, etc. on Alpha158/Alpha360 with CSI300 China A-share data.
- **RD-Agent integration** — LLM-driven automation of factor proposal + model iteration (2025 work; relevant to the §4.5 "LLM proposes hypotheses, an independent worker evaluates" guardrail).

## Why it matters here

Qlib is the lowest-risk place to test whether the owner's planned **LLM continuous-sentiment factor actually carries alpha**: add it as an Alpha158 feature column, train a baseline LightGBM, and compare IC / RankIC against the stock factor set. This is the §5 "first thing to build" recommendation in the architecture page.

## See Also

- [[sources/qlib-microsoft-2020]] — the formal arXiv:2009.11189 paper citation with full benchmark tables and algorithm detail
- [[synthesis/ai-quant-trading-oss-stack-selection]] — where Qlib sits in the OSS stack
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.2 LLM-as-feature-engineer; TODO-B; §4.5
- [[sources/tslib-thuml-time-series-library]] — deep time-series models that can supply Qlib features
