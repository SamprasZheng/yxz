---
type: source
tags: [trading, quant, llm, fingpt, ai4finance, sentiment, lora, oss]
title: "FinGPT: Open-Source Financial Large Language Models"
author: "Hongyang Yang, Xiao-Yang Liu, Christina Dan Wang"
date: "2023-06-09"
ingested: "2026-05-29"
---

# FinGPT: Open-Source Financial Large Language Models

**arXiv**: [2306.06031](https://arxiv.org/abs/2306.06031) (submitted 2023-06-09; v2 updated 2023)
**GitHub**: [github.com/AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) — MIT — ~20,300 stars (2026-05)
**HuggingFace**: [huggingface.co/FinGPT](https://huggingface.co/FinGPT)
**Venue**: FinLLM Workshop at IJCAI 2023 (accepted workshop paper)

## Abstract (paraphrased)

FinGPT is an open-source framework for building financial large language models using a data-centric approach. Unlike the closed, capital-intensive BloombergGPT (estimated ~$3 million in training cost), FinGPT uses **LoRA fine-tuning** on open base models — reducing re-adaptation cost to approximately $300. The paper emphasizes an automatic data curation pipeline covering financial news, social media, company filings, and market data, arguing that the data pipeline — not model architecture — is the differentiating moat for financial LLMs.

## Core Design Philosophy: Data-Centric

FinGPT's foundational claim: in financial NLP, **data freshness and domain specificity matter more than model scale**. Financial language evolves with market regimes, regulatory changes, and news cycles. The correct response is frequent, cheap re-adaptation — not larger, more expensive pre-training.

Three pillars:
1. **Open base models** (Llama, ChatGLM, Falcon, etc.) as starting points — no proprietary pre-training
2. **LoRA (Low-Rank Adaptation)** — reduces trainable parameters from ~6.17 billion (full model) to ~3.67 million; runnable on a consumer RTX 3090 GPU
3. **Automated data pipeline** — FinNLP companion repo continuously ingests and cleans financial text from multiple sources

## LoRA Fine-Tuning Details

For the flagship sentiment experiment:
- **Base model**: Llama-3.1-8B-Instruct (v2 paper; earlier versions used Llama-2-7B/13B and ChatGLM)
- **Rank**: r=8; scaling factor α=16
- **Trainable parameters introduced**: ~8.3 million (vs. ~8 billion full model parameters)
- **Training cost**: ~$300 per adapter fine-run (vs. BloombergGPT ~$3 million full pre-train)
- **Hardware requirement**: consumer RTX 3090 (24 GB VRAM) is sufficient

FinGPT v3 series (Llama-2-13B + LoRA) achieves state-of-the-art results on multiple financial sentiment benchmarks, reported to outperform GPT-4 on FPB, FiQA-SA, TFNS, and NWGI per the paper's evaluation table.

## Sentiment Datasets

### fingpt-sentiment-train
The primary instruction-tuning dataset for financial sentiment models.

- **Location**: [huggingface.co/datasets/FinGPT/fingpt-sentiment-train](https://huggingface.co/datasets/FinGPT/fingpt-sentiment-train)
- **Size**: 76,772 rows / 6.42 MB Parquet
- **DOI**: 10.57967/hf/3856
- **Schema**: three columns — `instruction`, `input`, `output`
- **Output classes**: 3-class (`negative / neutral / positive`) AND 7-class (`strong negative` → `strong positive`)
- **Sources**: financial news articles, social media/tweets, corporate announcements, market commentary
- **Instruction variants**: news sentiment, tweet sentiment, and fine-grained 7-class sentiment prompts
- **Downstream usage**: 15+ public models fine-tuned on this dataset; 3 HuggingFace Spaces reference it

### fingpt-forecaster-dow30-202305-202405
Forecasting instruction dataset for the FinGPT-Forecaster application.

- **Location**: [huggingface.co/datasets/FinGPT/fingpt-forecaster-dow30-202305-202405](https://huggingface.co/datasets/FinGPT/fingpt-forecaster-dow30-202305-202405)
- **Size**: 1,530 rows / 4.5 MB
- **Coverage**: Dow Jones 30 companies, May 2023 – May 2024
- **Content**: structured news headlines aligned with weekly stock performance + fundamentals (P/E, ROE, revenue growth)
- **Splits**: train + test

## FinGPT-Forecaster

A stock movement prediction application fine-tuned on the Dow30 dataset.

- **Base model**: Llama-2-7B-chat + LoRA adapter
- **Interface**: interactive HuggingFace Space (live demo at huggingface.co/spaces/FinGPT/FinGPT-Forecaster)
- **Input**: ticker symbol, prediction date, news retrieval window, optional fundamental data
- **Output**: stock movement prediction (up/down/flat) + explanatory natural-language rationale
- **Training approach**: Reinforcement Learning on Stock Prices (RLSP) — a variant of RLHF where realised stock price movements replace human feedback labels

## Model Versions Published on HuggingFace

| Model | Base | Task |
|---|---|---|
| fingpt-sentiment_llama2-13b_lora | Llama-2-13B | Sentiment (SOTA benchmark) |
| fingpt-forecaster-dow30_llama2-7b_lora | Llama-2-7B-chat | Forecasting |
| (multiple v3.x variants) | Llama-2, Llama-3, ChatGLM | Sentiment, instruction-following |

All models are published under the FinGPT HuggingFace org, MIT licensed.

## Relationship to FinRobot

FinGPT is the **single-model predecessor**. When [[entities/finrobot]] (arXiv:2405.14767, 2024) was released, FinGPT became the embedded financial NLP/sentiment specialist inside FinRobot's Layer 2 (Financial LLM Algorithms). The architecture evolution:

```
FinGPT 2023: single fine-tuned model → sentiment label or movement prediction
FinRobot 2024: multi-agent orchestration → FinGPT as one specialist in a CoT pipeline
```

## Relevance to `trader` Agent

Per [[synthesis/ai-quant-trading-architecture-improvements]] §1.2 (LLM 降噪 — from "Decision-Maker" to "Feature Engineer"):

- FinGPT (or a FinGPT-style LoRA adapter) emits a structured Pydantic JSON: `{ sentiment: float[-1,1], confidence: float[0,1], sectors: [...], horizon: enum, rationale: str, source_urls: [...] }`
- This continuous sentiment score is ingested as one **Alpha Factor column** in [[entities/qlib]]'s feature pipeline alongside Alpha158 quantitative features
- LightGBM/XGBoost uses it as one of many inputs; IC/RankIC measurement determines whether LLM sentiment carries incremental predictive value
- FinGPT is a **feature engineer**, not a decision-maker; it never touches the order API

This is the recommended first experiment (TODO-B in the architecture synthesis) because it is non-destructive, adds a feature column without touching execution or risk infrastructure, and delivers a measurable alpha signal within 1-2 weeks.

## Key Confirmed Facts

- **Paper date**: arXiv 2306.06031, submitted 2023-06-09; presented at IJCAI 2023 FinLLM Workshop
- **License**: MIT
- **GitHub stars**: ~20,300 (2026-05-29)
- **Lead authors**: Hongyang Yang (Columbia / AI4Finance Foundation); Xiao-Yang Liu (Columbia); Christina Dan Wang (NYU Shanghai)
- **AI4Finance Foundation**: US 501(c)(3) nonprofit, founded 2017 at Columbia University; >43,000 total GitHub stars across projects

## Unconfirmed / Flagged

- FinGPT v3.3 SOTA vs GPT-4 claims (FPB/FiQA-SA): reported in the FinGPT paper via internal evaluation; independent third-party replication results are mixed. The [[sources/finma-pixiu-benchmark-2023]] FLARE benchmark provides a more controlled comparative evaluation framework.
- Some web sources cite "620,000 cleaned financial news headlines" for the sentiment dataset; the released public `fingpt-sentiment-train` dataset contains 76,772 rows. The larger figure likely refers to an internal or pre-release data collection.

## See Also

- [[entities/fingpt]] — entity page
- [[entities/finrobot]] — multi-agent successor; FinGPT embedded in its Layer 2
- [[sources/finrobot-ai4finance-2024]] — FinRobot paper
- [[sources/finma-pixiu-benchmark-2023]] — third-party financial LLM benchmark context
- [[synthesis/ai-quant-trading-architecture-improvements]] — §1.2 LLM-as-feature-engineer; §4.1 structured output; §5 TODO-B
- [[concepts/llm-as-feature-engineer]] — the pattern FinGPT's continuous sentiment score directly demonstrates
- [[concepts/domain-specific-llm-agents]] — FinGPT as a concrete fine-tuned domain specialist
- [[concepts/calibrated-confidence-llm]] — FinGPT confidence scores must be calibration-tested before production use
- [[entities/qlib]] — ingests the FinGPT sentiment Alpha Factor column
