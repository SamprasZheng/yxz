---
type: source
tags: [ai, quant, trading, reinforcement-learning, trademaster, ntu, finrl, oss]
title: "TradeMaster — RL Platform for Quantitative Trading (NTU)"
author: "AMI Group, Nanyang Technological University (github.com/TradeMaster-NTU/TradeMaster)"
date: "2023-01-01"
ingested: "2026-05-29"
---

# TradeMaster — Reinforcement-Learning Platform for Quantitative Trading

**Repo**: [github.com/TradeMaster-NTU/TradeMaster](https://github.com/TradeMaster-NTU/TradeMaster) · latest tagged release 1.0.0 · maintained by the AMI group at **Nanyang Technological University (NTU)**, Singapore.

> ⚠️ **Owner-intel correction**: the original briefing described TradeMaster as an "LLM + RL fusion" model library. The repo is in fact **RL-first** — its core is a full pipeline for *reinforcement-learning* quant strategies (FinRL-style agents + a market simulator + a benchmark). LLM integration is peripheral, not the headline. Treat TradeMaster as the **RL execution/strategy layer**, not as a financial LLM.

## What it is

A first-of-its-kind open platform covering the full RL-for-trading lifecycle: design → implement → evaluate → deploy. Six core modules.

## Key facts

- **Data module** — long-horizon, multi-modal (K-line + order flow) data across **four markets**: China, US equities, crypto, FX.
- **Market simulator** — high-fidelity, data-driven; for portfolio management and algorithmic trading tasks.
- **10+ RL methods** — standard implementations of FinRL-lineage algorithms (DQN/DDQN, PPO, SAC, etc.).
- **PRUDEX-Compass** — a systematic evaluation benchmark (profitability / risk / universality / diversity / reliability / explainability axes).

## What it is for (in the three-layer model)

Execution / strategy layer — an RL alternative to a hand-coded Qlib+Backtrader strategy. In the §5 decision table it is *not* the recommended default (RL adds overfitting + non-determinism risk that fights the architecture page's §1.4 CPCV / §4.6 guardrail goals), but it is the canonical reference for anyone explicitly wanting RL agents.

## See Also

- [[synthesis/ai-quant-trading-oss-stack-selection]] — §4 ML models; §1 layer mapping
- [[sources/qlib-microsoft-quant-platform]] — supervised-learning alternative
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.4 anti-overfitting; §4.6 guardrails
