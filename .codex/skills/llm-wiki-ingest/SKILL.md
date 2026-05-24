---
name: llm-wiki-ingest
description: Research, ingest, lint, and maintain the yxz Obsidian-compatible wiki. Use when adding sources, entities, concepts, synthesis pages, KOL digests, research notes, or when answering a question that should be persisted under wiki/.
---

# LLM Wiki Ingest

## Startup

1. Read `wiki/AGENTS.md`.
2. Read the last 10 entries of `wiki/log.md`.
3. Read `wiki/index.md` to avoid duplicate pages.
4. Search existing pages before creating a new source, entity, concept, or synthesis page.

## Ingest Workflow

1. Create or update `wiki/sources/<slug>.md` for source material.
2. Add frontmatter:
   - all pages: `type`, `tags`
   - source pages: `title`, `author`, `date`, `ingested`
3. Update related pages in `wiki/entities/`, `wiki/concepts/`, and `wiki/synthesis/` only when they add real information.
4. Use `[[path/to/page]]` wikilinks for internal wiki references.
5. Preserve contradictions by flagging the older page instead of silently overwriting claims.
6. Update `wiki/index.md`.
7. Append a concise entry to `wiki/log.md`.

## Validation

From `my-website/`, run:

```bash
yarn lint:wiki
```

Use `yarn lint:wiki --strict-index` only when intentionally enforcing complete `wiki/index.md` coverage.

## Output Standard

Report created files, updated files, skipped pages, unresolved claims, and validation status.

