# LLM Wiki — Schema

This file governs how the wiki is structured and maintained. Read it at the start of each session.

## Directory layout

```
wiki/
├── sources/      ← one .md per source document ingested
├── entities/     ← people, organizations, products, projects
├── concepts/     ← ideas, techniques, methodologies, frameworks
├── synthesis/    ← cross-source analyses, comparisons, essays
├── index.md      ← catalog of all pages (LLM maintains)
└── log.md        ← append-only session history (LLM maintains)
```

## Linking convention

Use Obsidian wikilink syntax: `[[path/to/page]]` or `[[page-name|display text]]`.
Never use markdown hyperlinks for internal pages — wikilinks are required for graph view.

## Frontmatter convention

Every page should have:
```yaml
---
type: source | entity | concept | synthesis
tags: [tag1, tag2]
---
```

Source pages also include: `title`, `author`, `date`, `ingested`.

## Session startup

1. Read `log.md` (last 10 entries) to see what was done recently
2. Read `index.md` to orient to the current page inventory
3. Proceed with the user's request

## Ingest workflow

See the `llm-wiki-ingest` skill for the full step-by-step process.

Short version:
1. Read source → discuss key takeaways with user
2. Write `sources/<slug>.md`
3. Update or create entity and concept pages (expect 5–15 page touches per source)
4. Update `index.md`
5. Append to `log.md`

## Lint workflow

See the `llm-wiki-lint` skill for the full step-by-step process.

Run periodically (every 5–10 ingests). Checks: contradictions, stale claims, orphan pages, concept gaps, missing cross-references, data gaps.

## Contradiction handling

Flag inline on the older page:
```
> ⚠️ **Contradicted** by [[sources/<newer-slug>]]: <brief note on discrepancy>
```
Do not silently overwrite — preserve both claims and flag the conflict for human review.

## Query answers

Good answers to user questions can be filed as `synthesis/<name>.md`. They compound like ingested sources — don't let them disappear into chat history.
