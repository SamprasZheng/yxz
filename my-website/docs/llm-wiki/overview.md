---
sidebar_position: 1
---

# Overview

> Based on [Andrej Karpathy's llm-wiki.md](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (21k ★)

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then _kept current_, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

## Who writes the wiki?

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time.

In practice: have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on your conversation, and you browse the results in real time — following links, checking the graph view, reading the updated pages.

> Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

## Use cases

This pattern applies anywhere you're accumulating knowledge over time:

| Domain | What gets ingested | What the wiki becomes |
|---|---|---|
| **Personal** | Journal entries, articles, podcast notes | Structured self-model — goals, health, psychology |
| **Research** | Papers, reports, articles | Evolving thesis with citations and contradictions flagged |
| **Reading a book** | Chapter notes | Character/theme/plot companion wiki (like a personal Tolkien Gateway) |
| **Business/team** | Slack threads, meeting transcripts, project docs | Living internal wiki, LLM-maintained |
| **Competitive analysis** | News, filings, product releases | Comparison tables and synthesis pages |
| **Course notes** | Lectures, readings, problem sets | Concept pages with cross-references |

## Why this works

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value.

LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

---

*This idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.*
