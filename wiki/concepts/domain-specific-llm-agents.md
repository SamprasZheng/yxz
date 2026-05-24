---
type: concept
tags: [ai, llm, agents, knowledge-management, custom-gpt]
---

# Domain-Specific LLM Agents

A **domain-specific LLM agent** is a general-purpose language model narrowed via (a) a curated external knowledge corpus and (b) a persona/task prompt, so that it outperforms its base model on a specialist domain while remaining a thin wrapper rather than a fine-tune.

Articulated by [[entities/sampras|Sampras Zheng]] in [[sources/sampras-mygpts-ai-agent-2025]] as the design philosophy behind his two production OpenAI Custom GPTs: [[entities/jamia-gpt|Jamia]] (Polkadot/[[concepts/jam|JAM]]) and [[entities/spacesharks-gpt|Spacesharks]] (LEO/space).

## The two-limitation thesis

General-purpose LLMs fail on specialist questions for two structural reasons:

| Limitation | What it looks like |
|---|---|
| **Knowledge lag** | Training cutoff misses cutting-edge developments — e.g. for Polkadot: [[concepts/agile-coretime]], [[concepts/regionx]], post-2024 [[concepts/jam]] designs are absent or stale. |
| **Factual dilution** | Niche fields get averaged out by mass-internet priors; the model returns generic, surface-level answers and hallucinates plausible-sounding specifics. |

The thesis: **bigger models don't solve either**. Knowledge lag is fundamental to pretraining cycles; factual dilution is fundamental to next-token prediction over web-scale corpora. The fix is **external structured knowledge**, not scale.

## The wrapper recipe

A domain-specific agent in this sense is:

```
Base LLM
  + curated knowledge base (plain-text, hand-built context graph)
  + persona prompt
  + task prompt
  + (optional) custom actions/tools
```

The "knowledge base" is typically an [[concepts/obsidian-llm-knowledge-base|Obsidian vault]] with `sources/ entities/ concepts/ synthesis/` directories — see that page for the schema.

## Custom GPT vs self-built RAG

For a **solo-maintained** corpus under ~10 MB, Custom GPTs dominate on no-backend deployment, mobile UX, and shareability. Self-built RAG wins only when scale, multi-tool actions, or specific retrieval logic become limiting. Sampras's heuristic: **knowledge first, system later** — get the corpus right before investing in retrieval infrastructure.

## Implications for wiki design

Because the agent's strength is bounded by the corpus, a domain-specific agent project is **fundamentally a knowledge-management project**, not an ML project. This is why the upstream artifact ([[concepts/obsidian-llm-knowledge-base|the vault]]) and the downstream artifact (the GPT) are co-designed: the vault's schema is what the agent "thinks in."

## Related

- [[concepts/obsidian-llm-knowledge-base]] — the storage substrate
- [[entities/jamia-gpt]], [[entities/spacesharks-gpt]] — example instances
- [[sources/sampras-mygpts-ai-agent-2025]] — origin post
