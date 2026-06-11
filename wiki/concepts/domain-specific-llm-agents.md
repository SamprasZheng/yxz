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

## The same logic, scaled up to nations (台美日韓中國歐洲)

"Compete on the layer you can move" is not only a personal-scale tactic — it is the **dominant national strategy** for every country that cannot reach the capability frontier. As of mid-2026 the open-weight frontier is China-led and the closed frontier is US-led ([[synthesis/open-weight-llm-agent-stack-six-region]]), so **Korea, Japan, Taiwan, and Europe do at national scale exactly what this page describes at individual scale**: they take an open base (usually Llama or Qwen) and narrow it with a curated national corpus + language + persona rather than training a frontier base from scratch.

| Scale | Base they cannot move | Layer they compete on |
|---|---|---|
| **Individual** (this page) | GPT-4 / Nemotron / Llama | curated Obsidian vault + persona ([[entities/jamia-gpt]] / [[entities/spacesharks-gpt]]) |
| **National — Taiwan** | Llama 3.1/3.2 (→ Nemotron) | Traditional-Chinese corpus + Taiwan context (TAIDE 2.0, TAME, MediaTek Breeze2) |
| **National — Japan** | Llama / from-scratch | Japanese corpus + on-prem deployment (tsuzumi, ELYZA, PLaMo, Swallow) |
| **National — Korea** | mixed | Korean corpus + sovereign deployment (EXAONE, HyperCLOVA X, Solar) |

Taiwan's national programs are, structurally, **the same thin-wrapper recipe as a Custom GPT — just funded as sovereign infrastructure** — which is why the corpus repeatedly diagnoses Taiwan as *upstream-strong / midstream-absent* at the model layer (see [[synthesis/leo-taiwan-odc-gap]]).

## Long-horizon: the corpus is the durable moat (projection)

If model capability commoditizes — which the open-weight commons is actively driving — then the *base model* becomes a replaceable substrate (a compiler) and the **only durable, defensible asset is the curated proprietary corpus + its provenance** ([[concepts/agentic-provenance]]). The 100-year read of this page's thesis: "knowledge first, system later" is not just a solo-builder heuristic, it is the structural reason language-bloc model programs persist indefinitely (the *linguistic-sovereignty invariant* of [[synthesis/open-weight-llm-agent-stack-six-region]]). Whoever owns the corpus — and the [[synthesis/orbital-data-center-six-region|compute to run it]] — holds the lever after the model itself stops being scarce.

## Related

- [[synthesis/open-weight-llm-agent-stack-six-region]] — the national-scale six-region map of this exact logic
- [[concepts/obsidian-llm-knowledge-base]] — the storage substrate
- [[concepts/agentic-provenance]] — the corpus-as-durable-moat / provenance layer
- [[entities/jamia-gpt]], [[entities/spacesharks-gpt]] — example instances
- [[sources/sampras-mygpts-ai-agent-2025]] — origin post
