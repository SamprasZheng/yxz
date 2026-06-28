---
type: source
tags: [ai-economics, inference-cost, ai-software, leading-indicator, trader-agent]
title: "Artificial Intelligence Index Report 2025"
author: "Stanford HAI AI Index Steering Committee"
date: "2025-04-07"
ingested: "2026-06-01"
---

# Stanford AI Index 2025 — Artificial Intelligence Index Report 2025

**Institution:** Stanford University, Institute for Human-Centered Artificial Intelligence (HAI)
**Edition:** 8th annual
**Published:** April 7, 2025
**Landing page:** [hai.stanford.edu/ai-index/2025-ai-index-report](https://hai.stanford.edu/ai-index/2025-ai-index-report)
**Full PDF:** [hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf](https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf)
**Chapter 1 (R&D) PDF:** [hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf](https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter1_final.pdf)
**Chapter 2 (Technical Performance) PDF:** [hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter2_final.pdf](https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter2_final.pdf)
**arXiv preprint:** [arxiv.org/abs/2504.07139](https://arxiv.org/abs/2504.07139)

## Key Scope

The 2025 edition is described as the most comprehensive to date and contains new elements not in prior editions:

- In-depth analysis of the AI hardware landscape.
- Novel quantitative estimates of inference costs (Chapter 1 / R&D chapter).
- New AI publication and patenting trend analyses.
- Expanded coverage of AI in science and medicine.
- Corporate responsible-AI practices data.

## Inference Cost Decline — Key Finding

The report's most cited data point for AI economics:

> The cost of querying an AI model performing at GPT-3.5 level (64.8% accuracy on MMLU) fell from **$20 per million tokens** in November 2022 to **$0.07 per million tokens** by October 2024 (achieved by Gemini-1.5-Flash-8B) — a **more than 280× reduction in approximately 18 months**.

Additional framing from the same report:

- Depending on the task, LLM inference prices have fallen anywhere from **9× to 900×** per year.
- At the hardware level, cost declined by approximately **30% annually** while energy efficiency improved by approximately **40% annually**.
- The primary driver of the cost collapse was increasingly capable small models, not hardware alone.

This data is the canonical quantitative anchor for the [[concepts/ai-inference-cost-economics]] leading indicator.

## Relation to Other Wiki Pages

- [[concepts/ai-inference-cost-economics]] — the trader-agent indicator page that uses this as its primary quantitative source
- [[concepts/tiered-inference]] — the cost-aware routing concept that benefits from the hardware-level 30%/yr cost decline
- [[synthesis/ai-quant-trading-architecture-improvements]] — quant architecture context that the inference-cost signal informs

## Limitations / Caveats

- The $0.07/M token figure reflects the cheapest publicly available model matching GPT-3.5 quality as of October 2024; frontier model pricing (GPT-4o, Claude 3.5 Sonnet) was significantly higher at the same date.
- The data cut-off is October 2024; the report was published April 2025. Prices have continued to fall in 2025–2026 (e.g., GPT-4o input halved from $5 to $2.50/M tokens by early 2026 per vendor price sheets).
- The 2026 AI Index (successor report, landing page visible at hai.stanford.edu/ai-index/2026-ai-index-report) will provide updated figures; no chapter-level PDFs confirmed available as of June 2026 ingest.
