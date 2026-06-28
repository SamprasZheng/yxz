---
type: source
tags: [ai, quant, hft, deeplob, limit-order-book, cnn, lstm, microstructure, oss]
title: "DeepLOB — Deep Convolutional Neural Networks for Limit Order Books"
author: "Zihao Zhang, Stefan Zohren, Stephen Roberts (Oxford); IEEE TSP 2019; arXiv:1808.03668"
date: "2018-08-10"
ingested: "2026-05-29"
---

# DeepLOB — Deep Convolutional Neural Networks for Limit Order Books

**Paper**: [arXiv:1808.03668](https://arxiv.org/abs/1808.03668) (IEEE Transactions on Signal Processing, 2019). **Repo**: [github.com/zcakhaa/DeepLOB-Deep-Convolutional-Neural-Networks-for-Limit-Order-Books](https://github.com/zcakhaa/DeepLOB-Deep-Convolutional-Neural-Networks-for-Limit-Order-Books) (TensorFlow + PyTorch). Authors: Zhang / Zohren / Roberts (Oxford-Man Institute).

DeepLOB predicts short-horizon price-move direction (up / stationary / down over the next k ticks) directly from raw **limit-order-book** snapshots. It is the canonical "no-LLM, pure neural network on the order book" model for high-frequency / microstructure work.

## Architecture

- **2D-CNN** front end — convolves over the bid/ask price+size ladder to capture the *spatial* structure of the book (queue depth, imbalance, cancellation patterns).
- **Inception module** — multi-scale feature extraction.
- **LSTM** back end — captures *temporal* dynamics across snapshots.
- Output: softmax over {up, stationary, down} at a chosen horizon.

## Owner-intel correction

> ⚠️ The original briefing said DeepLOB is "designed for the **LOBSTER** dataset." The canonical DeepLOB paper trains and benchmarks on **FI-2010** (the standard public LOB benchmark) and on LSE equities — **not** LOBSTER. LOBSTER is a *separate commercial* LOB-reconstruction service (Nasdaq ITCH → reconstructed book); DeepLOB *can* be applied to LOBSTER-reconstructed data, but the two are not the same thing, and LOBSTER licensing (ITCH/OUCH) is a real cost item — see [[synthesis/ai-quant-trading-architecture-improvements]] §3.3.

## What it is for (in the three-layer model)

Pure perception→signal at the **microsecond/tick** end. In the §5 decision table it is the high-frequency / weekend-crypto pick (DeepLOB + Backtrader, **LLM deliberately dropped**). Concept hub: [[concepts/deep-lob]].

## See Also

- [[concepts/deep-lob]] — model-family + data-licensing concept page
- [[synthesis/ai-quant-trading-oss-stack-selection]] — §4 ML models; §5 decision table
- [[synthesis/ai-quant-trading-architecture-improvements]] — §3.3 data-licensing open question; §4.3 (don't RAG/LLM the tick stream)
