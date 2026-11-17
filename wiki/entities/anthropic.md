---
type: entity
tags: [ai, llm, company, us]
---

# Anthropic

US AI safety company (San Francisco); founded 2021 by Dario Amodei, Daniela Amodei, and former OpenAI researchers; principal product: Claude LLM family (Haiku / Sonnet / Opus) and Claude Code (agentic coding CLI + IDE extensions). Focus on Constitutional AI and interpretability research.

## Status (2026-11)

- **IPO:** Reportedly targeting a Nasdaq listing mid-November 2026, ahead of [[entities/openai]]'s projected 2027 debut.
- **Claude Code incidents (early Nov 2026):**
  - Background-subagent context-reread bug: subagents re-read full context every 30 seconds; fix released Nov 4, cuts status-update token cost ~99% (CLI only).
  - Email-address leak report (Nov 5): account emails reportedly passed in HTTP User-Agent headers during web searches; Anthropic confirmed plan to remove them from model context.
  - Game-recreation restrictions: Claude Code v2.1.317 blocks direct game recreation on Opus 5.5; genre/mechanics references allowed.
  - Tampered Cursor marketplace extension (late Oct): malicious actor published a backdoored copy of the Claude Code extension; Anthropic systems not compromised.
- **Compute demand:** [[entities/spacex-orbital-data-center]] entity notes a reported ~$1.25B/month compute demand figure.

## See also

- [[synthesis/agent-runtime-orchestration-six-region]] — Claude Agent SDK in the US open-ecosystem tier
- [[synthesis/open-weight-llm-agent-stack-six-region]] — Claude in the closed-frontier US leadership row
- [[entities/openai]] — primary rival
- [[concepts/nemoclaw]] — NemoClaw supports Claude-compatible API endpoints on port 8642
