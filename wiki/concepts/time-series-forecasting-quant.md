---
type: concept
tags: [ai, quant, time-series, forecasting, timesnet, patchtst, itransformer, autoformer, informer, volatility]
---

# Deep Time-Series Forecasting Models for Quant

Hub page for the family of deep time-series models (most of them collected in [[sources/tslib-thuml-time-series-library]]) that a quant system uses to forecast **future price bands and volatility** from long multivariate histories — well beyond moving averages or Bollinger bands.

## Why it matters for trading

Classical quant looks at MA / Bollinger / a handful of indicators. These models ingest **hundreds of days × many features** (returns, realised volatility, volume, margin/short balances, cross-asset signals) in one shot and output a forecast distribution. The high-value quant use is **dynamic position sizing and option strategy** — feed a forward volatility estimate into the volatility-targeting formula (see [[synthesis/ai-quant-trading-architecture-improvements]] §1.3) rather than betting on a single point price.

## The model families

| Model | One-line | Venue | Best for |
|---|---|---|---|
| **TimesNet** | 1D series → 2D tensor on multiple periods; CNN over period-variations | ICLR 2023 | strong all-rounder, multi-periodic signals |
| **PatchTST** | patching + channel-independent Transformer | ICLR 2023 | swing / medium-horizon forecasting (§5 decision-table pick) |
| **iTransformer** | inverts attention — variates as tokens | ICLR 2024 | multivariate, many correlated features |
| **Autoformer** | series decomposition + auto-correlation | NeurIPS 2021 | long-horizon trend/seasonal |
| **Informer** | ProbSparse attention | AAAI 2021 (best paper) | very long input sequences |

## How to use it in the stack

1. Treat the forecaster as a **feature/perception** component, not a trader.
2. Pipe its volatility / price-band output into **Qlib** as a feature column ([[sources/qlib-microsoft-quant-platform]]) or directly into the position-sizing module.
3. Validate under **CPCV**, not naive walk-forward — these high-capacity models overfit fast (architecture page §1.4).
4. Do **not** use them on raw tick / order-book data — that is [[concepts/deep-lob]]'s job.

## See Also

- [[sources/tslib-thuml-time-series-library]] — the reference implementation + benchmark
- [[concepts/deep-lob]] — the microstructure (order-book) counterpart
- [[synthesis/ai-quant-trading-oss-stack-selection]] — §4 ML models; §5 decision table
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.3 volatility targeting; §1.4 CPCV
