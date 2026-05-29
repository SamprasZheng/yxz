---
type: source
tags: [ai, quant, llm, finma, pixiu, flare, benchmark, instruction-tuning, oss]
title: "PIXIU / FinMA — Financial LLM, Instruction Data, and FLARE Benchmark"
author: "The-FinAI (Xie, Han et al.); arXiv:2306.05443"
date: "2023-06-08"
ingested: "2026-05-29"
---

# PIXIU / FinMA — Financial LLM, Instruction Data, and Evaluation Benchmark

**Repo**: [github.com/The-FinAI/PIXIU](https://github.com/The-FinAI/PIXIU) · paper [arXiv:2306.05443](https://arxiv.org/abs/2306.05443).

> ⚠️ **Owner-intel correction**: the original briefing filed PIXIU/FinMA under "AI4Finance / FinNLP." The canonical PIXIU repo is maintained by **The-FinAI** organisation, *not* AI4Finance-Foundation. (AI4Finance maintains FinGPT/FinRobot/FinNLP — a separate lineage.)

PIXIU is the academic-benchmark counterpart to FinGPT: an open-source bundle of (1) **FinMA**, a financial LLM fine-tuned on LLaMA; (2) **FIT**, a 136K-sample financial instruction-tuning dataset; and (3) **FLARE**, an evaluation benchmark.

## Key facts

- **FinMA** — LLaMA fine-tuned on FIT; competitive on financial NLP tasks (sentiment, classification, NER, stock-movement prediction).
- **FIT** — 136K instruction samples spanning sentiment analysis, headline classification, named-entity recognition, and stock-movement prediction.
- **FLARE** — 5 task types / 9 datasets; the standard yardstick for "is this financial LLM any good." Notable finding: strong on **textual** analysis, weak on **numerical reasoning** — directly supports the architecture-page rule that the LLM should *not* do floating-point risk math (§1.3).

## Why it matters here

FLARE is the benchmark to cite when choosing/comparing a financial LLM for the brain layer. The "weak numerical reasoning" result is the empirical backing for keeping volatility-targeting and position sizing in deterministic Python rather than the LLM.

## See Also

- [[synthesis/ai-quant-trading-oss-stack-selection]] — §2 financial LLMs
- [[sources/fingpt-ai4finance-2024]] — the AI4Finance-lineage financial LLM
- [[sources/xuanyuan-financial-llm]] — bilingual Chinese-English financial LLM
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.3 (no LLM floating-point math)
