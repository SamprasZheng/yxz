# /ingest-wiki

Ingest one or more sources on a topic into the LLM wiki. Handles both live URL fetching and pre-downloaded research dumps. Outputs structured wiki pages, updates the index, appends to the log, and commits.

## Usage

```
/ingest-wiki <topic> [url1 url2 ...] [--dump]
```

- `<topic>` — short identifier used for tagging, e.g. `polkadot`, `rf-hardware`, `leo-space`
- `[url1 url2 ...]` — one or more URLs to fetch (mode A)
- `--dump` — omit URLs; Claude will ask you to paste or describe the research content (mode B)

## Session startup

Before any other step, orient to the current wiki state:

1. Read `wiki/log.md` — last 10 entries (`grep "^## \[" wiki/log.md | tail -10`)
2. Read `wiki/index.md` — scan for existing pages related to `<topic>` to avoid duplicates and spot update candidates
3. Read `wiki/AGENTS.md` if this is the first ingest of the session

## Step 1 — Acquire source content

### Mode A: URL list provided

Fetch each URL using `WebFetch`. For each URL:

- On success: extract title, author (if present), publication date, and full body text. Strip nav/footer/ads/cookie banners.
- On failure (rate-limit, 403, paywall, timeout): **stop fetching that URL, report the error, and ask the user**:

  > "Failed to fetch `<url>` (`<error>`). Please paste the page content here, or skip this URL."

  Wait for user response before continuing. Do not invent or summarise content you couldn't actually retrieve.

After all URLs are processed (or skipped), summarise what was acquired:
> "Fetched N of M sources. Continuing with: [list]. Skipped: [list]."

Ask: "Proceed with ingestion? (y/n)"

### Mode B: Pre-downloaded dump (`--dump`)

Ask the user to paste or describe the content:
> "Please paste the research content, or describe what you have (e.g. 'transcript of video', 'PDF extract', 'my own notes')."

Once content is received, confirm its scope in one sentence and ask: "Proceed? (y/n)"

## Step 2 — Analyse and plan pages

Read the acquired content and determine which wiki pages to create or update. Follow the schema in `wiki/AGENTS.md` exactly.

Typical output for one source (adjust based on actual content):
- 1 `sources/<slug>.md` — primary record of this source
- 0–5 `entities/<name>.md` — people, orgs, products mentioned
- 0–5 `concepts/<name>.md` — techniques, frameworks, protocols
- 0–1 `synthesis/<name>.md` — only if a genuine cross-source insight emerges

Show the plan as a checklist:
```
Pages to create:
  [ ] sources/my-source-slug.md (new)
  [ ] entities/some-person.md (new)
  [ ] concepts/some-concept.md (new)
Pages to update:
  [ ] entities/existing-entity.md (add 2 new facts)
Skipping:
  - entities/already-complete.md (no new information)
```

Ask: "Looks good? (y/n/adjust)"

## Step 3 — Write wiki pages

Write each planned page using the Write or Edit tool.

### Frontmatter rules (from AGENTS.md)

Every page:
```yaml
---
type: source | entity | concept | synthesis
tags: [<topic>, tag2, ...]
---
```

Source pages also include:
```yaml
title: "<title>"
author: "<author or unknown>"
date: "<YYYY-MM-DD or unknown>"
ingested: "<today's date>"
```

### Content rules

- Internal links: always use `[[path/to/page]]` wikilink syntax — never markdown URLs
- Contradictions: flag on the **older** page with `> ⚠️ **Contradicted** by [[sources/<slug>]]: <note>` — never silently overwrite
- No hallucination: only write claims that appear in the acquired source content
- Depth over breadth: one accurate paragraph beats three vague bullets

### Slug convention

`sources/` and `synthesis/` slugs: `<topic>-<descriptive-name>-<year>` e.g. `polkadot-hub-migration-2025`
`entities/` and `concepts/` slugs: kebab-case proper name e.g. `gavin-wood`, `agile-coretime`

## Step 4 — Update wiki/index.md

Add one line per **new** page under the correct section heading (`## Sources`, `## Entities`, `## Concepts`, `## Synthesis`). Format:

```markdown
- [[sources/my-source-slug]] — <10-word description> (<date>)
```

For updated pages, add a note `(updated <date>)` if the entry already exists.

## Step 5 — Append to wiki/log.md

Append a new entry at the **end** of `wiki/log.md`. Format:

```markdown
## [<YYYY-MM-DD>] ingest | <topic> — <brief title>

<2–4 sentence summary of what was ingested, what pages were created/updated, and any key insight or cross-link discovered.> Created: [[sources/...]], [[entities/...]], [[concepts/...]]. Updated: [[entities/...]]. <Any notable null results or skipped URLs.>
```

## Step 6 — Commit

Stage and commit the new/updated wiki files:

```bash
git add wiki/
git commit -m "wiki(ingest): <topic> — <short description of what was ingested>"
```

Do NOT commit anything outside `wiki/` in this step. Do NOT push unless the user asks.

## Error handling reference

| Situation | Action |
|---|---|
| URL fetch rate-limited or 403 | Stop, report error, ask user to paste content or skip |
| URL returns empty or irrelevant page | Report it, ask user to confirm skip or provide alternative |
| Entity/concept already exists with same info | Skip creation, note "no new information" |
| Source references pages not yet in wiki | Create stub entity/concept pages with what's known; mark `status: stub` in frontmatter |
| Content contradicts existing wiki claim | Flag contradiction on older page; do not silently overwrite |

## Checklist (internal)

- [ ] Read log.md + index.md before starting
- [ ] All fetched URLs — success or explicit skip confirmed
- [ ] Plan shown and approved before writing
- [ ] All new pages have correct frontmatter + wikilinks (no markdown URLs)
- [ ] index.md updated
- [ ] log.md appended
- [ ] Committed (wiki/ only)
