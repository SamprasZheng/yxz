---
type: entity
tags: [openai, ai, llm, gpt, codex, agents, ipo]
---

# OpenAI

US AI company founded 2015; creator of the GPT model family, ChatGPT, and Codex. Backed by Microsoft (multi-billion-dollar partnership and Azure integration). As of May 2026, preparing a confidential IPO filing with Goldman Sachs and Morgan Stanley.

## Products

- **GPT family** — flagship LLMs (GPT-4o, o-series reasoning models)
- **Codex** — code-generation and software-agent product; enterprise hybrid/on-premises deployments via Dell partnership (May 2026)
- **ChatGPT** — consumer and enterprise chat interface; personal-finance experience added May 2026
- **OpenAI Deployment Company** — launched May 11 2026 to help organizations build and deploy AI systems; acquired Tomoro for Forward Deployed Engineers
- **Agents Platform (ACP)** — co-developed with Stripe; agentic commerce standard competing with x402

## Key facts

- Model disproved a conjecture in discrete geometry (May 22 2026) — symbolic AI-for-math milestone
- Content provenance / watermarking framework announced May 20 2026
- Confidential IPO filing preparations confirmed as of late May 2026
- Peter Steinberger (OpenClaw creator) joined OpenAI Feb 2026 to lead personal-agents division; OpenClaw moved to an independent OpenAI-backed foundation

## Relevance to this wiki

OpenAI's OpenAI-compatible API spec (`base_url` + `OPENAI_API_KEY`) is the de-facto interoperability standard for the NemoClaw :8642 endpoint, the Hermes Agent runtime, and OpenClaw's model-agnostic backend. The `OPENAI_BASE_URL` silent-fallback-to-real-OpenAI risk (when a local proxy is misconfigured) is a noted gotcha in the Spacesharks verification plan.

## See also

- [[concepts/openclaw]] — OpenClaw is OpenAI-backed (via personal-agents foundation) and model-agnostic
- [[entities/peter-steinberger]] — OpenClaw creator; joined OpenAI Feb 2026
- [[concepts/nemoclaw]] — NemoClaw's :8642 endpoint uses the OpenAI-compatible wire format; misconfigured `OPENAI_BASE_URL` can silently route to real OpenAI (L1 test catches this)
- [[concepts/agentic-payment-protocols]] — ACP is the OpenAI + Stripe agentic payments standard
- [[synthesis/spacesharks-mission-desk-verification-plan]] — Documents the OPENAI_BASE_URL silent-fallback gotcha at L1 probe layer
