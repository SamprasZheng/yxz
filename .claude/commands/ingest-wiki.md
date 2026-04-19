# /ingest-wiki

See `.claude/skills/ingest-wiki/SKILL.md` for the full workflow.

Ingest sources on a topic into the wiki — fetches URLs or accepts a pasted research dump, writes structured wiki pages (sources/entities/concepts/synthesis), updates index.md, appends to log.md, and commits.

```
/ingest-wiki <topic> [url1 url2 ...]
/ingest-wiki <topic> --dump
```
