---
name: wiki-ingest-parallel
description: >
  Parallel wiki ingestion for multiple research topics in one shot. Use this
  whenever you have 2+ topics to research and ingest into the wiki simultaneously.
  Accepts a YAML list of topics, launches one independent research subagent per
  topic (all in parallel), enforces exponential backoff on rate limits, writes
  structured wiki pages, then runs a reviewer subagent that validates frontmatter,
  deduplicates overlapping claims, updates index.md and log.md, and opens a single PR.
  Trigger on phrases like: "ingest parallel", "batch ingest", "research and ingest these
  topics", "wiki ingest parallel", or any request to ingest 2+ topics at once.
---

# /wiki-ingest-parallel

Batch-ingest multiple research topics into the wiki in parallel. Each topic gets
its own independent research subagent; a reviewer subagent validates and merges
everything afterward; one PR bundles all changes.

## Usage

```
/wiki-ingest-parallel
- topic 1
- topic 2
- topic 3
```

Or inline: `/wiki-ingest-parallel x402 autopayments, Polkadot KOLs, LEO radiation`

---

## Session startup (before launching subagents)

1. Read `wiki/log.md` (last 10 entries) — note any recently ingested topics to avoid
   duplicating work.
2. Read `wiki/index.md` — identify existing coverage per topic so subagents focus on gaps.
3. Parse the topic list from args (YAML list or comma-separated inline string).
4. For each topic, summarise existing wiki coverage in one line — pass this to the
   subagent so it knows what's already there.

---

## Phase 1 — Research subagents (one per topic, launched simultaneously)

Launch all research subagents **in a single message** (multiple Agent tool calls) so
they run in true parallel. Each subagent receives:

- Topic name
- One-line summary of existing wiki coverage for that topic
- The full prompt template below

### Research subagent prompt template

```
You are a wiki research agent for the topic: <TOPIC>.

Existing wiki coverage for this topic:
<EXISTING_COVERAGE_SUMMARY>

Your job:
1. Check the existing wiki pages listed above (read them from wiki/) for gaps.
2. Research the gaps via WebSearch + WebFetch.
3. Write new or updated wiki pages into wiki/ following the schema in wiki/AGENTS.md.
4. Append one log entry to wiki/log.md.
5. Report: pages created/updated, pages skipped, rate-limit attempts.

## Rate limit backoff (critical — do not abort on rate limit)

If WebSearch returns a rate-limit error:
  Attempt 1: try again immediately with a narrower query
  Attempt 2: wait 30s (use ScheduleWakeup if available, else continue), broaden query
  Attempt 3: wait 60s, try a different query angle
  Attempt 4: wait 120s, pivot to WebFetch on canonical URLs for this topic
  Attempt 5: wait 240s, last attempt
  After 5 failures: mark topic section as RATE_LIMITED and report what was attempted.

Never abort silently. Always report rate-limit attempts in your final summary.

## Wiki schema (enforce strictly)

Every page frontmatter:
  ---
  type: source | entity | concept | synthesis
  tags: [<topic-tag>, ...]
  ---

Source pages additionally:
  title: "..."
  author: "..."
  date: "YYYY-MM-DD"
  ingested: "<today>"

Internal links: ALWAYS use [[path/to/page]] wikilink syntax — never markdown URLs.
Contradictions: flag on the OLDER page with:
  > ⚠️ **Contradicted** by [[sources/<slug>]]: <note>

Slug conventions:
  sources/: <topic>-<descriptive-name>-<year>
  entities/ and concepts/: kebab-case proper name

## Output

At the end, output a structured report:
  TOPIC: <topic>
  PAGES_CREATED: [list of paths]
  PAGES_UPDATED: [list of paths]
  PAGES_SKIPPED: [reason]
  RATE_LIMIT_ATTEMPTS: N
  STATUS: complete | partial | rate_limited
```

---

## Phase 2 — Wait for all subagents to finish

Collect all subagent reports. Summarise to the user:

```
Research complete:
  topic-1: N pages created, M updated — STATUS
  topic-2: N pages created, M updated — STATUS
  topic-3: N pages created, M updated — STATUS
```

If any subagent reports `STATUS: rate_limited`, ask the user whether to retry or proceed
with partial results.

---

## Phase 3 — Reviewer subagent

After all research agents are done, spawn a single reviewer subagent with this prompt:

```
You are a wiki reviewer. The following pages were just created or updated in wiki/:

<LIST_OF_ALL_NEW_AND_UPDATED_PAGES>

Your tasks:

1. FRONTMATTER VALIDATION
   Read each page. Flag any page that is missing required frontmatter fields
   (type, tags; source pages also need title/author/date/ingested).

2. INDEX LINKAGE CHECK
   Read wiki/index.md. For every new page not already listed, add the correct
   one-line entry under the appropriate section heading (Sources/Entities/Concepts/Synthesis).
   Format: - [[path/to/page]] — <10-word description> (<date if source>)

3. CITATION / WIKILINK CHECK
   Flag any page that uses markdown hyperlinks [text](url) for internal wiki references
   instead of [[wikilink]] syntax. Do NOT auto-fix — report for human review.

4. DEDUPLICATION
   Identify overlapping claims across the newly ingested topics. For each overlap:
   a. Keep the claim on the page where it fits best.
   b. On all other pages, replace the claim with a wikilink to the canonical page.
   c. Document the deduplication in a short inline comment: <!-- deduped → [[page]] -->

5. UPDATE wiki/index.md
   Write all index additions atomically (single Edit or Write call after the full scan).

6. UPDATE wiki/log.md
   Append one reviewer entry:
   ## [<date>] review | parallel ingest batch — <N> topics
   Reviewed N pages. Frontmatter issues: X. Deduplication: Y overlapping claims resolved.
   Index additions: Z. Citation issues flagged: W.

7. README + CLAUDE.md CHECK (lightweight)
   Read README.md and CLAUDE.md. If newly ingested content adds a major new domain
   (e.g. first radiation-hardware page, first space-tech page), add a one-line mention
   to the README's "Wiki" section. Only update if genuinely additive — do not pad.

8. Open a PR
   Stage all modified wiki files and any README/CLAUDE.md changes:
     git add wiki/ README.md CLAUDE.md
     git commit -m "wiki(batch-ingest): <N> topics — <comma-separated topic names>"
   Then create a PR using:
     gh pr create --title "wiki: batch ingest <topics>" --body "..."
   Body should list: topics ingested, pages created/updated, deduplication actions,
   frontmatter issues found, and any README additions.

Report the PR URL when done.
```

---

## Error handling reference

| Situation | Action |
|---|---|
| WebSearch rate-limited | Backoff + retry up to 5×; pivot to WebFetch on canonical URLs; report attempts |
| WebFetch 403 / paywall | Skip URL; note in log; try alternative URL for same content |
| Subagent times out | Treat as partial; reviewer proceeds with available pages |
| Reviewer finds frontmatter error | Flag in PR body; do not silently fix (preserve audit trail) |
| Duplicate claim across topics | Canonical source wins; others wikilink to it |
| PR already open for this branch | Push to existing branch; comment on existing PR |

---

## Quality bar for research subagents

A page is worth creating if it adds at least one of:
- A concrete fact not already in the wiki (metric, date, person, event)
- A new entity or concept with its own identity
- A cross-link that makes an existing concept clearer

Do not create stub pages with only a title and tags. If there's nothing substantive to say
about a topic yet, record the null result in log.md and move on.

---

## Checklist (reviewer subagent internal)

- [ ] All new pages validated for frontmatter
- [ ] wiki/index.md updated with all new page entries
- [ ] Internal links use [[wikilink]] not [markdown](url)
- [ ] Overlapping claims deduplicated (or flagged)
- [ ] wiki/log.md has reviewer entry
- [ ] README.md / CLAUDE.md updated if new domain added
- [ ] All files committed
- [ ] PR opened and URL reported
