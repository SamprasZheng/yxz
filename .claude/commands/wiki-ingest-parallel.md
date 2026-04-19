# /wiki-ingest-parallel

See `.claude/skills/wiki-ingest-parallel/SKILL.md` for the full workflow.

Parallel wiki ingestion for multiple research topics. Launches one independent
research subagent per topic simultaneously, enforces exponential backoff on rate
limits, then runs a reviewer subagent that validates, deduplicates, and opens a
single PR.

```
/wiki-ingest-parallel
- topic 1
- topic 2
- topic 3
```
