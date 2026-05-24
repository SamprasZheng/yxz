---
type: concept
tags: [ai, llm, knowledge-management, obsidian, wiki, agents]
---

# Obsidian-as-LLM-Knowledge-Base

An Obsidian vault can act as the canonical external knowledge corpus for one or more LLM agents. The same plain-text Markdown files are readable by humans in Obsidian and by agents through direct file reads, search, or retrieval pipelines.

Documented by [[entities/sampras|Sampras Zheng]] in [[sources/sampras-mygpts-ai-agent-2025]] as the substrate behind [[entities/jamia-gpt|Jamia]] and [[entities/spacesharks-gpt|Spacesharks]].

This wiki is itself an instance of the pattern. Its layout, wikilink convention, and ingest workflow are codified in `wiki/AGENTS.md`.

## Canonical Directory Layout

```text
wiki/
  sources/      one file per ingested source document
  entities/     people, companies, products, projects
  concepts/     protocols, architectures, frameworks, methodologies
  synthesis/    long-form cross-source analyses
  index.md      catalog of all pages
  log.md        append-only session history
```

The four content directories map to four levels: raw input, entities, ideas, and arguments.

## Ingest Workflow

1. Read new material.
2. Write `sources/<slug>.md` with source frontmatter.
3. Update or create relevant `entities/` and `concepts/` pages.
4. Cross-link using Obsidian wikilinks for internal references.
5. Update `index.md`.
6. Append to `log.md`.

## Why It Works For LLMs

- Plain text ingests cleanly into context windows and retrieval systems.
- Wikilinks create explicit relationships that agents can follow.
- Frontmatter tags provide structured filtering.
- Synthesis pages preserve good answers across sessions instead of losing them in chat history.
- Contradiction handling preserves evidence instead of overwriting older claims.

## Related

- [[concepts/domain-specific-llm-agents]]
- [[entities/jamia-gpt]]
- [[entities/spacesharks-gpt]]
- [[entities/sampras]]

