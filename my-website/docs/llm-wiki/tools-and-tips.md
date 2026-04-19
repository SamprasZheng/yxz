---
sidebar_position: 5
---

# Tools and Tips

## Optional CLI tools

At some point you may want small tools that help the LLM operate on the wiki more efficiently.

### Search

At small scale, the `index.md` file is enough navigation. As the wiki grows, you want proper search. [qmd](https://github.com/tobi/qmd) is a strong option:

- Local search engine for markdown files
- Hybrid BM25 + vector search with LLM re-ranking
- All on-device
- Both a CLI (LLM can shell out) and an MCP server (LLM can use as a native tool)

You could also vibe-code a naive search script yourself as the need arises — the LLM can help.

### Git

The wiki is just a directory of markdown files. Put it in a git repo and you get:
- Full version history of every edit
- The ability to diff what changed after an ingest
- Branching (e.g. experimental branches for speculative synthesis)
- Collaboration

## Tips

### Obsidian Web Clipper
Browser extension that converts web articles to markdown. Fast path for getting sources into your raw collection without manual copy-paste.

### Download images locally
In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. `raw/assets/`). Then bind "Download attachments for current file" to a hotkey (Ctrl+Shift+D). After clipping an article, hit the hotkey — all images download to local disk.

This lets the LLM view and reference images directly instead of relying on URLs that may break. Note: LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view referenced images separately for additional context.

### Obsidian graph view
Best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans. Useful during lint passes.

### Marp slide decks
[Marp](https://marp.app/) is a markdown-based slide deck format. Obsidian has a plugin. Useful for generating presentations directly from wiki content without leaving markdown.

### Dataview
Obsidian plugin that runs queries over page frontmatter. If the LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists — effectively a spreadsheet view over your wiki.

```yaml
---
tags: [llm, reasoning]
sources: 4
updated: 2026-04-19
---
```

```dataview
TABLE sources, updated FROM "wiki/concepts"
SORT updated DESC
```

### Session continuity
Start each session by having the LLM read `log.md` (last 10 entries) and `index.md`. This re-orients it to the current state of the wiki without re-reading every page. Include this in your schema as the standard session-open procedure.
