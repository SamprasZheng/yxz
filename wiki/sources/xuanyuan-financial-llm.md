---
type: source
tags: [ai, quant, llm, xuanyuan, duxiaoman, chinese-finance, bilingual, oss]
title: "XuanYuan (轩辕) — Duxiaoman Bilingual Chinese Financial LLM"
author: "Duxiaoman-DI / 度小满 (github.com/Duxiaoman-DI/XuanYuan)"
date: "2026-05-29"
ingested: "2026-05-29"
---

# XuanYuan (轩辕) — Duxiaoman Bilingual Chinese Financial LLM

**Repo**: [github.com/Duxiaoman-DI/XuanYuan](https://github.com/Duxiaoman-DI/XuanYuan) · weights on [Hugging Face (Duxiaoman-DI)](https://huggingface.co/Duxiaoman-DI) · snapshot 2026-05-29.

XuanYuan (轩辕) is a Chinese-financial dialogue LLM family from **Duxiaoman (度小满)**'s Data Intelligence team. Its differentiator vs the FinGPT/FinMA lineage is **Chinese ⇄ English bilingual** financial competence — parsing Chinese-language listed-company reports, PBoC / macro-policy documents, and supply-chain news at a granularity general open models miss.

## Version lineage

- **XuanYuan-70B** — base Llama2-70B with Chinese enhancement; incremental pre-training on large Chinese+English corpora; chat model RLHF-aligned; **8k context** (notable for a 70B at release).
- **XuanYuan3-70B** — base **Llama3-70B**; incremental pre-training + SFT + RL alignment; **16k context**, targeting long financial research-report analysis and financial-agent windows; improved financial-terminology grounding over the prior gen.
- Earlier smaller variants (XuanYuan-6B/13B) and the **FinanceIQ** Chinese financial evaluation set live in the same repo.

## What it is for (in the three-layer model)

Brain-layer LLM for **Chinese / cross-strait fundamental analysis** — turning unstructured Chinese news and filings into structured factors. In the §5 decision table it pairs with CrewAI for the low-frequency / long-horizon office-worker profile.

## Why it matters here

For a Taiwan/China-facing book, XuanYuan's bilingual financial grounding is a better news-parsing front-end than an English-centric model. Same caveat as all brain-layer LLMs: emit a **structured sentiment factor**, never a direct order (see [[synthesis/ai-quant-trading-architecture-improvements]] §1.2 / §4.6).

## See Also

- [[synthesis/ai-quant-trading-oss-stack-selection]] — §2 financial LLMs; §5 decision table
- [[sources/finma-pixiu-benchmark-2023]] — English-centric academic financial LLM
- [[sources/fingpt-ai4finance-2024]] — LoRA-fine-tune lineage
