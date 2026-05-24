---
type: entity
tags: [ai, llm, agent, polkadot, jam, custom-gpt]
---

# Jamia (Custom GPT)

A domain-specific OpenAI Custom GPT specialized in the **Polkadot ecosystem** and the **[[concepts/jam|JAM (Join-Accumulate Machine)]]** roadmap. Built and maintained by [[entities/sampras|Sampras Zheng]]; introduced publicly in [[sources/sampras-mygpts-ai-agent-2025]].

## Quick facts

| Field | Value |
|---|---|
| Type | OpenAI Custom GPT (myGPT) |
| URL | `https://chatgpt.com/g/g-67825a109c408191aaaef28a62051059-jamia` |
| Author | [[entities/sampras]] |
| Domain | Polkadot, JAM, Coretime, XCM, OpenGov |
| Released | Public reference: 2025-05-15 |

## Training corpus

- Gavin Wood ([[entities/gavin-wood]]) talk transcripts
- JAM Gray Paper summaries
- Polkadot Wiki extracts
- Cross-source synthesis from 10+ [[entities/polkasharks]] podcast episodes (Polkadot Decoded, PolkaSharks News Brief)

Corpus is sourced from a hand-curated [[concepts/obsidian-llm-knowledge-base|Obsidian vault]] following the [[concepts/domain-specific-llm-agents|domain-specific agent]] design pattern.

## Strengths

- [[concepts/jam]] architecture (RISC-V, async model, 850 MB/s, 3.4M projected TPS)
- Coretime economics — see [[concepts/agile-coretime]] and [[concepts/regionx]]
- [[concepts/xcm]] cross-chain messaging
- OpenGov governance dynamics

## Weaknesses (per author)

- Real-time prices — defer to Grok / general ChatGPT
- Simple term definitions — faster via general models

## Roadmap

- **Actions in progress**: market price + on-chain data fetching tools (planned standalone post when shipped).

## Related

- Parent concept: [[concepts/domain-specific-llm-agents]]
- Substrate: [[concepts/obsidian-llm-knowledge-base]]
- Sibling agent: [[entities/spacesharks-gpt]]
- Origin post: [[sources/sampras-mygpts-ai-agent-2025]]
