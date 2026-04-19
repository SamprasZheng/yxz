---
sidebar_position: 3
---

# Operations

There are three core operations: **Ingest**, **Query**, and **Lint**. Your schema should document the workflow for each.

## Ingest

Drop a new source into the raw collection and tell the LLM to process it.

**Example flow:**

1. LLM reads the source document in full
2. Discusses key takeaways with you
3. Writes a summary page in the wiki
4. Updates `index.md`
5. Updates relevant entity and concept pages across the wiki (a single source might touch 10–15 pages)
6. Appends an entry to `log.md`

**Supervision style** is up to you:

- **Hands-on**: Ingest one source at a time, read the summaries and updates as they happen, guide the LLM on emphasis. Better for complex or nuanced sources.
- **Batch**: Feed the LLM many sources at once with less supervision. Faster, but you review after the fact.

Document your preferred style in the schema so the LLM follows it consistently across sessions.

## Query

Ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations.

**Answer formats:**

| Format | When to use |
|---|---|
| Markdown prose | Narrative explanations, summaries |
| Comparison table | Side-by-side analysis |
| Marp slide deck | Presentations directly from wiki content |
| Matplotlib chart | Quantitative data |
| Canvas / diagram | Structural/relational views |

**The key insight:** good answers can be filed back into the wiki as new pages. A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. File them back in, and your explorations compound in the knowledge base just like ingested sources do.

```
question → answer → new wiki page → richer future answers
```

## Lint

Periodically ask the LLM to health-check the wiki. Things to look for:

- **Contradictions**: claims on different pages that conflict
- **Stale claims**: assertions superseded by newer sources
- **Orphan pages**: pages with no inbound links from other pages
- **Concept gaps**: important concepts mentioned repeatedly but lacking their own page
- **Missing cross-references**: pages that should link to each other but don't
- **Data gaps**: questions the wiki can't yet answer — candidates for new source ingestion

The LLM is also good at suggesting new questions to investigate and new sources to look for. A lint pass keeps the wiki healthy as it grows and often surfaces the most interesting next directions.

```bash
# Example lint prompt
"Health-check the wiki. List: contradictions, stale claims, orphan pages,
missing concept pages, and the top 3 gaps I should fill next."
```
