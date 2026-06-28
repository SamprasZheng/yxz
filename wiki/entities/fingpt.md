---
type: entity
tags: [trading, quant, llm, fingpt, ai4finance, sentiment, lora, oss, open-source]
---

# FinGPT

**FinGPT** is the AI4Finance Foundation's open-source financial large language model project. It was the first major open-source counter-proposal to BloombergGPT's closed, capital-intensive training paradigm. FinGPT's thesis: **fine-tune open base models cheaply with LoRA on financial text and keep a live data pipeline that re-trains as market regimes drift**.

- **Repo**: [github.com/AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)
- **Paper**: arXiv:2306.06031 — "FinGPT: Open-Source Financial Large Language Models" (June 2023; presented at FinLLM Workshop @ IJCAI 2023)
- **License**: MIT
- **GitHub stars**: ~20,300 (as of 2026-05)
- **Maintainer**: AI4Finance Foundation; key authors: Hongyang Yang (Columbia), Xiao-Yang Liu (Columbia), Christina Dan Wang (NYU Shanghai)
- **HuggingFace org**: [huggingface.co/FinGPT](https://huggingface.co/FinGPT) — hosts trained models and instruction-tuning datasets

## What FinGPT Is

FinGPT is a **data-centric, single-model** financial LLM ecosystem. It is not a multi-agent framework — that role belongs to its successor [[entities/finrobot]]. FinGPT's scope is:

1. **A training methodology**: LoRA-based parameter-efficient fine-tuning of publicly available base models (Llama-2, Llama-3, ChatGLM, etc.) on curated financial instruction sets
2. **A dataset collection**: financial news, company filings, social media (X/Twitter), earnings call transcripts, market commentary
3. **A set of published models**: versioned LoRA adapters on HuggingFace covering sentiment, forecasting, and instruction-following tasks
4. **A live-retraining philosophy**: financial language distribution shifts monthly; LoRA re-runs cost ~$300 vs BloombergGPT's estimated ~$3 million

## Core Design Principles

### Data-Centric over Model-Centric
FinGPT treats the **data pipeline as the moat**, not model size. The framework includes an automatic data curation pipeline that ingests financial news, SEC/EDGAR filings, social media, and macro commentary, applies cleaning and deduplication, and formats examples as instruction-tuning pairs.

### LoRA Fine-Tuning
LoRA reduces trainable parameters from ~6.17 billion (full model) to ~3.67 million for a Llama-2-13B-scale model. For a Llama-3.1-8B run with rank r=8 and scaling α=16, this introduces ~8.3M trainable parameters. A FinGPT sentiment model can be fine-tuned on a consumer RTX 3090 GPU in a weekend — compared to hundreds of thousands of GPU-hours for a full pre-train.

### Low Re-training Cost
Re-training a FinGPT adapter: ~$300. BloombergGPT pre-training: ~$3 million (estimated). This cost gap is the central argument for LoRA-based financial LLMs in continuously changing financial language environments.

## Key Models and Datasets

### FinGPT v3 Series
The v3 series uses Llama-2-13B with LoRA and achieves state-of-the-art scores on financial sentiment benchmarks:

- **FPB** (Financial PhraseBank)
- **FiQA-SA** (Financial Opinion Mining)
- **TFNS** (Twitter Financial News Sentiment)
- **NWGI** (News with GPT Instruction)

v3.3 (Llama2-13B + LoRA) is the published benchmark-beating checkpoint; it outperforms GPT-4 on several financial sentiment benchmarks per the FinGPT paper.

### FinGPT-Forecaster
A robo-advisory application fine-tuned on Dow Jones 30 stock movement data (May 2023 – May 2024). Base: Llama-2-7B-chat + LoRA. Input: ticker, prediction date, news window, optional fundamental data (P/E, ROE, revenue growth). Output: stock movement prediction + explanatory analysis. Dataset: [huggingface.co/datasets/FinGPT/fingpt-forecaster-dow30-202305-202405](https://huggingface.co/datasets/FinGPT/fingpt-forecaster-dow30-202305-202405) (1,530 rows). Live demo on HuggingFace Spaces.

### fingpt-sentiment-train Dataset
The core instruction-tuning dataset for financial sentiment models.

- **Size**: 76,772 rows (6.42 MB Parquet)
- **Columns**: `instruction`, `input`, `output`
- **Labels**: 3-class (`negative / neutral / positive`) and 7-class (`strong negative` → `strong positive`)
- **Sources**: financial news articles, social media posts/tweets, corporate announcements, market commentary
- **DOI**: 10.57967/hf/3856
- **Usage**: LoRA fine-tuning of Llama/Qwen/ChatGLM for financial sentiment; 15+ models publicly fine-tuned on this dataset

Instruction variants target both news and tweet classification, as well as granular 7-class sentiment — designed to produce a **continuous sentiment signal** rather than a coarse label.

## Relationship to FinRobot

FinGPT is the **single-model predecessor**; [[entities/finrobot]] is the multi-agent successor. In a full FinRobot deployment, FinGPT typically operates as the embedded **NLP/sentiment specialist** inside Layer 2 (Financial LLM Algorithms). The evolution:

```
FinGPT (single LoRA model → sentiment label)
  → FinRobot (orchestrated multi-agent → CoT decomposition → FinGPT as one specialist)
```

## Relevance to `trader` Agent

In the `agents/src/trader/` architecture, FinGPT's continuous sentiment scoring is the direct inspiration for [[concepts/llm-as-feature-engineer]]. The recommended integration pattern from [[synthesis/ai-quant-trading-architecture-improvements]] §1.2:

- FinGPT (or a FinGPT-style LoRA adapter) emits a structured JSON with `{ sentiment: float[-1,1], confidence: float[0,1], sectors: [...], horizon: enum, rationale: str }` (enforced via Pydantic/Instructor)
- This continuous sentiment score becomes **one Alpha Factor column** fed into Qlib's LightGBM/XGBoost alongside Alpha158 quantitative features
- IC/RankIC measurement determines whether the LLM sentiment carries incremental alpha

FinGPT's role is strictly **feature engineer**, not decision-maker. No LLM output touches the order API directly.

## Key Properties

- **MIT license** — open for commercial use and modification
- **HuggingFace-native**: models, datasets, and demo spaces all published on HuggingFace under the FinGPT org
- **Accepted at FinLLM Workshop @ IJCAI 2023** — earliest academic venue for this line of work
- **200+ contributors** (shared with AI4Finance Foundation across FinGPT/FinRobot/FinRL)
- **FinNLP** (companion repo) provides the data ingestion pipeline for financial news and social media

## See Also

- [[entities/finrobot]] — multi-agent successor; FinGPT runs as one specialist inside FinRobot
- [[sources/fingpt-ai4finance-2024]] — full source ingest with paper detail
- [[concepts/llm-as-feature-engineer]] — the recommended role for FinGPT outputs in the `trader` stack
- [[concepts/domain-specific-llm-agents]] — FinGPT as a concrete fine-tuned domain specialist
- [[concepts/calibrated-confidence-llm]] — FinGPT sentiment confidence should be calibration-tested
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.2 LLM-降噪, §4.1 structured output, §5 TODO-B entry point
- [[entities/qlib]] — execution/backtest layer that ingests the FinGPT sentiment Alpha Factor
