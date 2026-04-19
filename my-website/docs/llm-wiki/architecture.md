---
sidebar_position: 2
---

# Architecture

The system has three distinct layers. Each has a clear owner and a clear role.

```
┌─────────────────────────────────────────────┐
│              Raw Sources                    │
│  articles, papers, images, data files       │
│  (immutable — LLM reads, never writes)      │
└───────────────────┬─────────────────────────┘
                    │ ingest
                    ▼
┌─────────────────────────────────────────────┐
│                The Wiki                     │
│  LLM-generated markdown files               │
│  summaries, entities, concepts, synthesis   │
│  (LLM owns this layer entirely)             │
└───────────────────┬─────────────────────────┘
                    │ governed by
                    ▼
┌─────────────────────────────────────────────┐
│               The Schema                   │
│  CLAUDE.md / AGENTS.md                      │
│  conventions, workflows, page formats       │
│  (you and the LLM co-evolve this)           │
└─────────────────────────────────────────────┘
```

## Layer 1: Raw Sources

Your curated collection of source documents — articles, papers, images, data files. These are **immutable**: the LLM reads from them but never modifies them. This is your source of truth.

Sources can arrive as:
- Web articles clipped to markdown (Obsidian Web Clipper is ideal)
- PDFs, papers, reports
- Images, screenshots, diagrams
- Exported transcripts (podcasts, meetings, video lectures)
- Data files (CSVs, JSON exports)

## Layer 2: The Wiki

A directory of LLM-generated markdown files. The LLM owns this layer entirely — it creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

Typical page types:

| Type | Purpose |
|---|---|
| **Summary pages** | One per source — what it says, key claims, quality notes |
| **Entity pages** | People, organizations, products — aggregated across sources |
| **Concept pages** | Ideas, techniques, theories — explained and cross-referenced |
| **Comparison pages** | Side-by-side analysis of related things |
| **Synthesis pages** | High-level essays drawing across many sources |
| **index.md** | Catalog of all pages with one-line summaries |
| **log.md** | Append-only timeline of all wiki activity |

## Layer 3: The Schema

A configuration document (e.g. `CLAUDE.md` for Claude Code, `AGENTS.md` for Codex) that tells the LLM:

- How the wiki directory is structured
- What the naming and formatting conventions are
- What workflows to follow when ingesting a new source
- How to handle contradictions between sources
- What constitutes a "complete" entity or concept page
- When to create a new page vs. update an existing one

This is the key piece that turns the LLM from a generic chatbot into a **disciplined wiki maintainer**. You and the LLM co-evolve it over time as you learn what works for your domain.

### Example schema excerpt

```markdown
## Wiki conventions

- All pages live under wiki/
- Source summaries: wiki/sources/<slug>.md
- Entity pages: wiki/entities/<name>.md
- Concept pages: wiki/concepts/<name>.md

## Ingest workflow

When asked to ingest a source:
1. Read the source fully
2. Discuss key takeaways with the user
3. Write wiki/sources/<slug>.md
4. Update wiki/index.md
5. Update or create any entity/concept pages touched
6. Append an entry to wiki/log.md
```
