# LLM Wiki Schema

This file is the **schema** for the Obsidian-compatible wiki under `wiki/`. It is the configuration document an LLM agent reads at the start of a wiki session.

Upstream pattern: [Karpathy, *LLM Wiki* (gist `442a6bf555914893e9891c11519de94f`)](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The conventions below are this repo's concrete instantiation of that pattern — adapted for Sampras's cross-domain RF / Polkadot / space / radiation / AI-agents knowledge base and the Spacesharks + Firefly mission-desk agents that consume it.

## Three-Layer Mental Model

The wiki is the middle layer between immutable raw inputs and durable answers.

| Layer | What it is | Files |
|---|---|---|
| **Raw sources** | Immutable inputs (papers, articles, PDFs, screenshots, user briefings, blog posts) | external; ingested *into* `sources/` but the originals are not stored in the wiki |
| **The wiki** | LLM-maintained markdown the agent reads and writes on every session | everything under `wiki/` |
| **The schema** | This file (`wiki/AGENTS.md`) — directory layout, frontmatter, workflows | `wiki/AGENTS.md` |

Karpathy's core insight applies: *the tedious part of maintaining a knowledge base is not the reading or the thinking — it is the bookkeeping*. LLMs are good at bookkeeping. They touch 10–15 pages per ingest without forgetting cross-references; humans do not.

## Directory Layout

```text
wiki/
  sources/      one page per ingested source (paper, article, briefing, runbook)
  entities/     people, organizations, products, projects, programs
  concepts/     ideas, techniques, methodologies, frameworks, standards
  synthesis/    cross-source analyses, decision guides, durable query answers
  index.md      catalog of all pages, maintained by the LLM
  log.md        append-only session history (parseable timestamps)
```

`index.md` and `log.md` are **navigation files** and must stay current. Every page created or substantially updated requires a one-line `index.md` entry and a one-line `log.md` mention.

## Three Operations

Every wiki session is one (or a mix) of these three operations.

### 1. Ingest

Read a new source, integrate it, update everything it touches.

1. Read or research the source.
2. Write `sources/<slug>.md`.
3. Update or create related `entities/` and `concepts/` pages where there is substantive new information. **Expect to touch 10–15 pages per substantive source** — that is the pattern working, not scope creep.
4. Flag contradictions inline on the *older* page (see "Contradiction Handling" below); never silently overwrite.
5. Write or extend a `synthesis/` page if the ingest enables a cross-source claim that a query could ask later.
6. Update `index.md` (every new page listed under its section).
7. Append to `log.md` (one paragraph: scope, confirmed facts, unconfirmed flags, pages touched, rate-limit hits).
8. Run `cd my-website && yarn lint:wiki`.

### 2. Query

Answer a user question against the wiki, then file the answer so the wiki compounds.

1. Search existing pages first — never re-derive from raw sources if a `concepts/` or `synthesis/` page already covers the answer.
2. Walk the wikilink graph rather than re-grepping: a good `concepts/` page already points at the relevant `sources/` and `entities/`.
3. If the answer is durable (would be useful to a future reader), file it as `synthesis/<name>.md` and add the index entry. Chat-only answers evaporate; synthesis pages compound.
4. If the answer reveals a missing source or stale claim, raise it explicitly — that becomes the next ingest or lint task.

### 3. Lint

Periodic health check. Run before wiki-heavy commits and at least weekly via the `Weekly Wiki Lint` GitHub Action.

Mechanical lint (script-enforced):

```bash
cd my-website
yarn lint:wiki
# or, stricter:
yarn lint:wiki --strict-index
```

Checks include: required frontmatter, source metadata fields, folder/type consistency, broken wikilinks, internal markdown links that should be wikilinks, pages missing from `wiki/index.md` (warning by default, failure under `--strict-index`).

LLM-pass lint (judgment-enforced; run when the agent has spare context):

- **Contradictions** — search for `Contradicted` callouts; confirm both claims still appear correct.
- **Stale claims** — a fact dated > 6 months that the user has since corrected in chat? Update it.
- **Orphans** — pages with zero incoming wikilinks. Either link them from a hub page or delete them.
- **Missing links** — a name or concept mentioned in plain text that already has a page? Convert to `[[wikilink]]`.
- **Data gaps** — a `concepts/` page that should have a source but doesn't? Note in `log.md` as a future ingest task.

## Linking Convention

Use Obsidian wikilink syntax for internal references:

```text
[[path/to/page]]
[[path/to/page|display text]]
```

Do **not** use markdown hyperlinks for internal wiki pages. External source URLs may use markdown links.

## Frontmatter Convention

Every page must have:

```yaml
---
type: source | entity | concept | synthesis
tags: [tag1, tag2]
---
```

Source pages additionally require:

```yaml
title: "..."
author: "..."
date: "YYYY-MM-DD"
ingested: "YYYY-MM-DD"
```

Synthesis pages may optionally list the `sources:` and `concepts:` they draw on as YAML arrays of wikilinks — useful for Dataview queries and the Obsidian graph view.

## Synthesis Layer — The Compounding Output

Synthesis pages are the wiki's **output layer**. Sources and concepts are intermediate; synthesis is what makes the wiki valuable to a future reader, an agent, or a blog post. Karpathy: *good answers to user questions should be filed as `synthesis/<name>.md` — they compound into the wiki instead of disappearing into chat history.*

If you are starting a session and a query touches any of the domains below, **read the matching synthesis page first** before writing anything new. Duplicating synthesis content is the most common way the wiki degrades.

Current synthesis pages (keep this list in sync when adding a new one):

- `[[synthesis/spacesharks-mission-desk-hackathon-plan]]` — NVIDIA Agent Challenge 2026 entry; satellite-lifecycle decision co-pilot on Nemotron + Hermes + NemoClaw. Canonical for hackathon scope, build plan, decision verbs.
- `[[synthesis/spacesharks-trust-stack]]` — Companion to the Mission Desk plan. Four interlocking trust layers (data / model / decision / system) operationalised by small-model ensemble, tiered inference, calibrated confidence, agentic provenance. Canonical for "why should the agent's output be trusted."
- `[[synthesis/cdm-pc-decisioning]]` — End-to-end CDM → Pc → maneuver decision workflow with NASA CARA thresholds and the public-Space-Track MVP recipe. Canonical for the conjunction triage verb.
- `[[synthesis/faa-notam-launch-lifecycle]]` — Full FAA NOTAM lifecycle, AHA vs TFR, USCG NOTMAR, slip-probability scoring. Canonical for the launch-slip verb.
- `[[synthesis/fcc-ibfs-filings-coordination]]` — FCC IBFS + Schedule S + ITU EPFD pipeline; Starlink/Kuiper/AST rulings; public-data MVP. Canonical for the interference-attribution verb.
- `[[synthesis/leo-taiwan-odc-gap]]` — Taiwan "strong upstream, absent midstream C" structural gap; ODC commercialization window. Canonical for Taiwan supply-chain investment framing.
- `[[synthesis/sampras-2026-engineering-thesis]]` — AI × Space × Crypto × RF × Radiation integrated thesis; 2026 convergence triggers and falsifiability table. Canonical for cross-domain personal-roadmap framing.
- `[[synthesis/phased-array-rf-frontend-supply-chain]]` — Six-region (US/Japan/Korea/China/Europe/Taiwan) supply-chain map of the phased-array RF front-end stack (beamformer IC → GaN PA → module → array integration → space-grade transmitter). Canonical for "who leads the AESA/SATCOM RF front-end and where Taiwan sits"; component-level companion to the LEO Taiwan ODC gap.
- `[[synthesis/ai-quant-trading-architecture-improvements]]` — AI quant trading three-layer architecture engineering memo (event-driven + CPCV + LLM-as-feature-engineer + volatility targeting + circuit breakers). Canonical for "how to harden the 3-layer quant architecture to production grade."
- `[[synthesis/ai-quant-trading-oss-stack-selection]]` — AI quant trading OSS selection guide: which open-source project per layer + per trading style recommendation table. Canonical for "which OSS project per layer + per trading style."
- `[[synthesis/us-equity-secondary-variable-dashboard]]` — 12-variable US-equity leading-indicator monitoring dashboard for the trader agent; decomposes macro narratives into verifiable earnings + market-structure signals. Canonical for "which secondary variables to watch per sector and how to read them."

When a query lands in any of these domains, the workflow is:

1. Read the relevant synthesis page in full.
2. Read its `See also` / companion-page links.
3. Only then walk down to the underlying `concepts/` and `sources/`.
4. If your new answer extends or contradicts the synthesis page, edit it in place — don't write a parallel synthesis with overlapping scope. New synthesis pages are for new domains, not for new takes on the same domain.

## Contradiction Handling

Flag contradictions inline on the *older* page rather than silently overwriting:

```text
> **Contradicted** by [[sources/<newer-slug>]]: <brief note on the discrepancy>
```

Preserve both claims and leave the resolution to human review or to a subsequent ingest that has a third corroborating source.

## Session Startup Checklist

Run at the beginning of every wiki session:

1. Read the last 10 entries of `log.md` (`grep "^## \[" log.md | tail -10`).
2. Read `index.md`.
3. If the user's request matches a synthesis page's domain, read that synthesis page **before** searching anything else.
4. Search existing pages for the request's key entities/concepts before creating new pages.

## Tooling

| Tool | Purpose |
|---|---|
| `yarn lint:wiki` (from `my-website/`) | Mechanical lint — frontmatter, links, index coverage |
| Obsidian graph view | Visual orphan / cluster / hub detection |
| `git log -- wiki/` | Provenance — who/when changed any wiki page |
| `Weekly Wiki Lint` GitHub Action | Scheduled lint with PR-failing checks |
| Dataview (Obsidian plugin) | Frontmatter queries — e.g. "all sources tagged `polkadot` ingested in 2026" |

## When to Update This Schema

Update `wiki/AGENTS.md` when any of the following change:

- Directory layout (a new top-level folder, a folder renamed).
- Frontmatter conventions (a new required field).
- A new operation is added beyond Ingest / Query / Lint.
- The synthesis-page list grows or a synthesis page changes scope — keep the bulleted list above in sync.

Schema-only edits should be small, recorded in `log.md` as a `## [YYYY-MM-DD] schema | <title>` entry, and PR-titled `wiki(schema): ...`.
