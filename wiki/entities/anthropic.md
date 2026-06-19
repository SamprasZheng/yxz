---
type: entity
tags: [ai, anthropic, llm, us]
---

# Anthropic

US AI safety company founded 2021 by ex-OpenAI researchers (Dario Amodei, CEO; Daniela Amodei, President). Builder of the Claude family of LLMs. Core mission: responsible development and maintenance of advanced AI for the long-term benefit of humanity. Series E round values company at ~$61B (2025). Confidential IPO S-1 filed June 2026.

## Products

- **Claude**: flagship LLM family — Haiku / Sonnet / Opus / Fable / Mythos tiers; latest Fable 5 + Mythos 5 (June 2026), 1M context, 128k max output, always-on adaptive thinking
- **Claude Code**: agentic developer CLI spanning terminal / IDE / web / desktop / scheduled workflows
- **Claude Agent SDK**: programmatic runtime for building agent pipelines; moved to API-rate billing 2026-06-15
- **Anthropic Developer Platform**: vault credentials, Managed Agents scheduled deployments, session thread webhooks

## Notable 2026 events

- **Claude Fable 5** released 2026-06-09 (supersedes Opus 4.8; leads Cognition FrontierCode eval + vision)
- **Agent SDK billing split** 2026-06-15: headless/agent use billed at API rates, separate from interactive subscription
- **US access restriction** 2026-06-16: US government ordered denial of Fable + Mythos models to foreign nationals ([Bloomberg](https://www.bloomberg.com/news/articles/2026-06-16/trump-s-anthropic-crackdown-sets-off-ai-alarms-for-us-allies)) — triggered concern among allied-nation AI teams
- **Seoul office opened** 2026-06-17 with Korean ecosystem partnerships (TCS, DXC for regulated industries)
- **Confidential S-1** filed for public stock offering; racing [[entities/openai]] to market
- **Project Glasswing** expanded; first Anthropic Public Record published

## See also

- [[synthesis/open-weight-llm-agent-stack-six-region]] — Anthropic holds the closed-frontier alongside [[entities/openai]] and Google
- [[synthesis/firefly-nemoclaw-reference-implementation]] — Claude Opus used as Firefly orchestrator in current `nemo_workflow.yaml`
- [[concepts/nemoclaw]] — NemoClaw integrates alongside Claude as the local/on-prem reasoning alternative
