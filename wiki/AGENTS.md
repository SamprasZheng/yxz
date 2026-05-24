# LLM Wiki Schema

This file governs the Obsidian-compatible wiki under `wiki/`.

## Directory Layout

```text
wiki/
  sources/      one page per ingested source
  entities/     people, organizations, products, projects
  concepts/     ideas, techniques, methodologies, frameworks
  synthesis/    cross-source analyses, comparisons, essays
  index.md      catalog of all pages, maintained by the LLM
  log.md        append-only session history
```

## Linking Convention

Use Obsidian wikilink syntax for internal references:

```text
[[path/to/page]]
[[path/to/page|display text]]
```

Do not use markdown hyperlinks for internal wiki pages. External source URLs may use markdown links.

## Frontmatter Convention

Every page must have:

```yaml
---
type: source | entity | concept | synthesis
tags: [tag1, tag2]
---
```

Source pages also require:

```yaml
title: "..."
author: "..."
date: "YYYY-MM-DD"
ingested: "YYYY-MM-DD"
```

## Session Startup

1. Read the last 10 entries of `log.md`.
2. Read `index.md`.
3. Search existing pages for overlap before creating new pages.

## Ingest Workflow

1. Read or research the source.
2. Write `sources/<slug>.md`.
3. Update or create related entity and concept pages when there is substantive information.
4. Write synthesis pages for cross-source analysis or durable answers.
5. Update `index.md`.
6. Append to `log.md`.
7. Run `cd my-website && yarn lint:wiki`.

## Lint Workflow

Run periodically and before wiki-heavy commits:

```bash
cd my-website
yarn lint:wiki
```

Checks include:

- required frontmatter
- source metadata fields
- folder/type consistency
- broken wikilinks
- internal markdown links that should be wikilinks
- pages not listed in `wiki/index.md` as warnings

Use `yarn lint:wiki --strict-index` when missing index entries should fail the run.

## Contradiction Handling

Flag contradictions inline on the older page:

```text
> **Contradicted** by [[sources/<newer-slug>]]: <brief note on discrepancy>
```

Do not silently overwrite claims. Preserve both claims and flag the conflict for human review.

## Query Answers

Good answers to user questions should be filed as `synthesis/<name>.md`. They compound into the wiki instead of disappearing into chat history.

