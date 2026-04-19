---
sidebar_position: 4
---

# Indexing and Logging

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes.

## index.md — content-oriented catalog

`index.md` is a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optional metadata like date or source count. Organized by category (entities, concepts, sources, etc.).

The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them.

**Example structure:**

```markdown
# Wiki Index

## Sources
- [OpenAI o3 announcement](sources/openai-o3.md) — Dec 2024 reasoning model, benchmark results, pricing
- [Karpathy LLM OS talk](sources/karpathy-llm-os.md) — LLMs as OS kernel analogy, tool use patterns

## Entities
- [Andrej Karpathy](entities/karpathy.md) — ex-OpenAI/Tesla, educator, micrograd/nanoGPT author
- [OpenAI](entities/openai.md) — lab, products, key papers

## Concepts
- [Chain-of-thought prompting](concepts/chain-of-thought.md) — step-by-step reasoning elicitation
- [RLHF](concepts/rlhf.md) — reinforcement learning from human feedback

## Synthesis
- [Scaling laws overview](synthesis/scaling-laws.md) — cross-source synthesis, updated 2026-03
```

This approach works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.

## log.md — chronological record

`log.md` is an **append-only** record of what happened and when — ingests, queries, lint passes.

**Format tip:** start each entry with a consistent prefix so the log is parseable with simple Unix tools:

```markdown
## [2026-04-19] ingest | Karpathy llm-wiki.md
Added summary page. Updated concepts/rag.md, concepts/personal-knowledge-management.md.
Created new page: concepts/llm-wiki-pattern.md. 3 new cross-references added.

## [2026-04-18] query | "How does chain-of-thought compare to process reward models?"
Filed answer as synthesis/cot-vs-prm.md.

## [2026-04-15] lint
Found 2 contradictions (flagged inline), 1 orphan page (concepts/sparse-attention.md),
suggested 3 new sources to investigate.
```

With this prefix, the log is trivially queryable:

```bash
# Last 5 entries
grep "^## \[" log.md | tail -5

# All ingests
grep "^## \[.*\] ingest" log.md

# All lint passes
grep "^## \[.*\] lint" log.md
```

The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently when starting a new session.
