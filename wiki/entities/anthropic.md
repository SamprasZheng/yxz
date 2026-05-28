---
type: entity
tags: [anthropic, ai, llm, claude, agent-framework, mcp]
---

# Anthropic

US AI safety company founded 2021 by Dario Amodei, Daniela Amodei, and other former OpenAI researchers. Maker of the Claude LLM family and Claude Code CLI. Primary backer of the Model Context Protocol (MCP) open standard for agent tool integration.

## Products

- **Claude** — flagship LLM family (Haiku / Sonnet / Opus tiers); powers Claude Code and Claude.ai
- **Claude Code** — autonomous coding agent CLI and web/IDE experience; weekly release cadence
- **Claude Managed Agents** — hosted agent execution with self-hosted sandbox support (public beta May 2026)
- **Project Glasswing / Claude Security** — AI-augmented security scanning (public beta May 2026)

## Key facts

- Revenue grew ~80× in a single quarter (Q1 2026 per Fortune reporting); renting SpaceX data-center capacity to cope
- Code w/ Claude conference series (San Francisco, London) showcases agent-developer use cases
- Investors include Google, Amazon, Salesforce, and Spark Capital

## Relevance to this wiki

Anthropic's Claude stack is the reasoning layer for the Spacesharks Mission Desk agent; Claude Code is the primary dev environment for this repo. MCP tunnels enable the NemoClaw ↔ private-MCP-server integration path.

## See also

- [[concepts/openclaw]] — OpenClaw is MIT-licensed and model-agnostic; Anthropic Claude is one of its supported backends
- [[concepts/nemoclaw]] — NemoClaw exposes an OpenAI-compatible :8642 endpoint that accepts Claude API calls via `base_url` override
- [[concepts/hermes-agent-framework]] — Hermes Agent is model-agnostic; Claude is a supported inference backend
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — Anthropic MCP is the tool-integration standard in the Mission Desk stack
