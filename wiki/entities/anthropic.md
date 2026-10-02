---
type: entity
tags: [ai, llm, company, anthropic, claude]
---

# Anthropic

US AI safety company founded 2021 by Dario Amodei, Daniela Amodei, and former OpenAI colleagues; creator of the Claude model family.

## Model family (as of September 2026)

| Model | Release | Notes |
|---|---|---|
| Claude Fable 5.1 | 2026-09-01 | Coding + knowledge work; two safety-tier twins with Mythos 5.1 |
| Claude Mythos 5.1 | 2026-09-01 | Identical capability to Fable 5.1, higher default safety level for scientific research |
| Claude Opus 5.5 | 2026-09-22 | Most capable generally available model; matches Fable 5.1; 1M-token context; $4/$20/$0.20 per M input/output/cache |
| Claude Sonnet 5.5 | TBD | Announced "coming in weeks" as of 2026-09-22 |
| Claude Haiku 5.5 | TBD | Announced "coming in weeks" as of 2026-09-22 |

Claude Opus 5.5 is 40% cheaper to run than Opus 5 on typical workloads; API input prices 20% lower, cache reads 60% lower.

## Products

- **Claude.ai** — web + mobile chat interface; multi-tier plans
- **Claude Code** — CLI + IDE + CI/CD developer tool; spans terminals, Slack, GitHub Actions
- **Claude Small Business** — 43 new workflows + 27 connectors (Shopify, Salesforce, Zoom, Xero, Stripe, Zapier) as of September 2026
- **Claude API** — Messages API + managed agent SDK; Anthropic's primary developer surface

## See also

- [[synthesis/open-weight-llm-agent-stack-six-region]] — closed-frontier benchmark table; Claude Fable 5.1 / Opus 5.5 scoring
- [[concepts/nemoclaw]] — NVIDIA Agent Challenge stack; Claude appears only in a doc-only `nemo_workflow.yaml` lag (Nemotron is the production router)
- [[entities/peter-steinberger]] — creator of [[concepts/openclaw]], now OpenAI personal-agents lead; prior competitor context
