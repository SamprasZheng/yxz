---
type: entity
tags: [ai, llm, agent, space, leo, odc, custom-gpt]
---

# Spacesharks (Custom GPT)

A domain-specific OpenAI Custom GPT specialized in the **LEO (Low Earth Orbit) space industry** — covering satellite constellations, [[concepts/orbital-data-center|Orbital Data Centers]], the [[concepts/leo-value-chain|LEO value chain]], and the Taiwan supply chain. Built and maintained by [[entities/sampras|Sampras Zheng]]; introduced publicly in [[sources/sampras-mygpts-ai-agent-2025]].

## Quick facts

| Field | Value |
|---|---|
| Type | OpenAI Custom GPT (myGPT) |
| URL | `https://chatgpt.com/g/g-67e254ad68e4819191ea0552732c0979-spacesharks` |
| Author | [[entities/sampras]] |
| Domain | LEO constellations, ODC, ISL, Taiwan space supply chain |
| Released | Public reference: 2025-05-15 |

## Training corpus

- Upstream/midstream/downstream LEO industry breakdown ([[concepts/leo-value-chain]])
- Key [[concepts/orbital-data-center|ODC]] players: [[entities/starcloud]], Axiom, [[entities/ada-space]], [[entities/google-suncatcher]]
- Taiwan supply chain map: Qorvo, [[entities/win-semiconductors]], Auden, Tripod, [[entities/ascend-tech]], [[entities/huatong-pcb]]

Corpus is sourced from a hand-curated [[concepts/obsidian-llm-knowledge-base|Obsidian vault]] following the [[concepts/domain-specific-llm-agents|domain-specific agent]] design pattern.

## Strengths

- LEO lifecycle analysis (launch → operation → deorbit)
- Comparisons across Starlink / Amazon Project Kuiper / [[entities/starcloud]]
- ISL (Inter-Satellite Link) optical communications
- Taiwan's position in the global LEO ecosystem — see [[synthesis/leo-taiwan-odc-gap]]

## Roadmap

- **Actions in progress**: market data fetching tools (shared roadmap with [[entities/jamia-gpt|Jamia]]).

## Related

- Parent concept: [[concepts/domain-specific-llm-agents]]
- Substrate: [[concepts/obsidian-llm-knowledge-base]]
- Sibling agent: [[entities/jamia-gpt]]
- Domain anchors: [[concepts/orbital-data-center]], [[concepts/leo-value-chain]]
- Origin post: [[sources/sampras-mygpts-ai-agent-2025]]
