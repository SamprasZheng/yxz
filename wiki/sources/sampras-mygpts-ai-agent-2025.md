---
type: source
title: "Domain-Specific AI Agents — Why I Build My Own myGPTs"
author: sampras
date: 2025-05-15
ingested: 2026-05-24
tags: [ai, polkadot, space, knowledge-management, llm, agents]
---

# Domain-Specific AI Agents — Why I Build My Own myGPTs

Sampras Zheng's manifesto post on building narrow, domain-grounded LLM agents (Custom GPTs) backed by a hand-curated [[concepts/obsidian-llm-knowledge-base|Obsidian knowledge base]]. The post introduces two production myGPTs — **[[entities/jamia-gpt|Jamia]]** for Polkadot/[[concepts/jam|JAM]] and **[[entities/spacesharks-gpt|Spacesharks]]** for the LEO/space industry — and lays out the workflow that produces their training corpus.

> 🔁 **Self-reference note:** This blog post is the **conceptual precursor to this very wiki**. The `sources/ entities/ concepts/ synthesis/` layout described in section "The System Behind Them" is exactly the schema codified in `wiki/AGENTS.md` and instantiated in `wiki/`. The ingest loop the post describes (read → discuss with Claude Code → write `sources/<slug>.md` → touch 5–15 entity/concept pages → update `index.md` + `log.md`) is the workflow this very ingestion is executing.

## Core thesis

General-purpose LLMs have **two hard limitations** for specialist domains:

1. **Knowledge lag** — cutting-edge developments (e.g. [[concepts/agile-coretime]], [[concepts/regionx]], [[concepts/jam]] post-2024) are simply absent from base model weights.
2. **Factual dilution** — niche fields get crowded out by mass-internet priors; the model averages toward generic answers.

The author's claim: the fix is **not a bigger model**, but **a structured, trustworthy external knowledge base** wrapped with persona + task prompts. See [[concepts/domain-specific-llm-agents]].

## The two production myGPTs

### Jamia — Polkadot × JAM expert

- URL: `https://chatgpt.com/g/g-67825a109c408191aaaef28a62051059-jamia`
- Training corpus: Gavin Wood talk transcripts, JAM Gray Paper summaries, Polkadot Wiki, cross-source synthesis from 10+ [[entities/polkasharks]] podcast episodes.
- Strengths: [[concepts/jam]] architecture, Coretime economics ([[concepts/agile-coretime]]), [[concepts/xcm]] cross-chain messaging, OpenGov governance.
- Weaknesses: real-time prices, simple definitions — author defers to Grok/ChatGPT for those.
- Full page: [[entities/jamia-gpt]]

### Spacesharks — Space industry analyst

- URL: `https://chatgpt.com/g/g-67e254ad68e4819191ea0552732c0979-spacesharks`
- Training corpus: LEO upstream/midstream/downstream breakdown ([[concepts/leo-value-chain]]), [[concepts/orbital-data-center|ODC]] players, Taiwan supply chain map (Qorvo, [[entities/win-semiconductors]], Auden, Tripod, etc.).
- Strengths: LEO lifecycle analysis, Starlink/Amazon Leo/[[entities/starcloud]] comparisons, ISL optical communications, Taiwan's position in the global LEO ecosystem.
- Full page: [[entities/spacesharks-gpt]]

## The system behind them

Both GPTs share a single Obsidian vault as their knowledge backbone, organized into four directories: `sources/`, `entities/`, `concepts/`, `synthesis/` — identical to this wiki.

Workflow per new source:

1. Discuss key takeaways with Claude Code.
2. Write `sources/<slug>.md`.
3. Update/create relevant `entities/` and `concepts/` pages (5–15 pages per ingest).
4. Update `index.md` and `log.md`.

The **plain-text content** of the vault is what feeds Jamia and Spacesharks. When a reader asks a cross-source question, the model retrieves from a **hand-built context graph**, not the open internet.

## Why Custom GPT instead of RAG / API agent

For a **solo-maintained** knowledge base under ~10 MB, Custom GPTs win on four axes:

| Need | Custom GPT | Self-built RAG |
|---|---|---|
| No backend, shareable | ✅ | ❌ host vector store |
| KB under 10 MB | ✅ direct upload | ⚠️ over-engineering |
| Mobile frontend UX | ✅ ChatGPT app | ❌ build your own |
| Custom tools (news/price) | ⚠️ limited actions | ✅ fully controllable |

Migration to RAG/agent architecture remains an option once scale or interaction patterns demand it. Author's rule: **"Get the knowledge right first, then worry about the system."**

## Roadmap signals

- Synthesis pieces from `wiki/synthesis/` will be progressively published to the blog (starting with [[synthesis/leo-taiwan-odc-gap]]).
- Jamia and Spacesharks `actions` (market price / on-chain data fetching) are in development — separate post planned.
- **Next myGPT**: an RF/hardware debug assistant, grounded in the author's RF/SoC Debug Playbook taxonomy.

## Cross-links

- Domain concept: [[concepts/domain-specific-llm-agents]]
- KB methodology: [[concepts/obsidian-llm-knowledge-base]]
- Agents: [[entities/jamia-gpt]], [[entities/spacesharks-gpt]]
- Subject domains: [[concepts/jam]], [[concepts/orbital-data-center]], [[concepts/leo-value-chain]]
- Source community: [[entities/polkasharks]]
