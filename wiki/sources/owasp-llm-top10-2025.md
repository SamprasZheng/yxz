---
type: source
tags: [security, ai-agents, guardrails, prompt-injection, owasp, standards]
title: "OWASP Top 10 for LLM Applications 2025"
author: "OWASP Gen AI Security Project"
date: "2024-11-14"
ingested: "2026-06-01"
---

# OWASP Top 10 for LLM Applications 2025

The OWASP Gen AI Security Project's enumeration of the ten most critical security risks for LLM-based applications, version 2025 (document version v4.2.0a, published 2024-11-14). It is the practitioner-canonical reference for LLM security threat classification.

Canonical PDF: [OWASP-Top-10-for-LLMs-v2025.pdf](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf)
Per-risk detail: [genai.owasp.org](https://genai.owasp.org/)

## The 2025 List

| ID | Name | Notes vs 2023 list |
|---|---|---|
| LLM01 | Prompt Injection | #1 in both lists |
| LLM02 | Sensitive Information Disclosure | |
| LLM03 | Supply Chain | |
| LLM04 | Data and Model Poisoning | |
| LLM05 | Improper Output Handling | |
| LLM06 | Excessive Agency | Was LLM08 in 2023 |
| LLM07 | System Prompt Leakage | New entry |
| LLM08 | Vector and Embedding Weaknesses | Was LLM06 "overreliance" area in 2023 |
| LLM09 | Misinformation | |
| LLM10 | Unbounded Consumption | |

Note: **LLM06 is Excessive Agency** (not LLM08 as in some earlier drafts). Numbered positions shifted between the 2023 and 2025 versions.

## LLM01:2025 — Prompt Injection

**Definition**: "A Prompt Injection Vulnerability occurs when user prompts alter the LLM's behavior or output in unintended ways." Inputs may be imperceptible to humans and can force models to violate guidelines, generate harmful content, enable unauthorized access, or influence critical decisions.

### Attack forms

**Direct injection**: User or operator prompt directly alters model behavior — either intentionally (jailbreak) or unintentionally.

**Indirect injection**: The LLM accepts input from external sources (websites, files, emails, database rows) that contain attacker-controlled text. When the model processes the content, the malicious instructions execute in the model's context. The threat has shifted toward indirect injection and cross-modal attacks (hidden instructions in image pixels, PDFs, web pages fetched by tool calls).

### Key mitigations

1. Constrain model behavior via system prompts (role, capabilities, limitations)
2. Input/output filtering (semantic filters, RAG Triad assessment)
3. **Human-in-the-loop controls for privileged operations**
4. Segregate external content (clearly label untrusted data; don't mix with trusted instructions)
5. Privilege control (minimum necessary API token scopes)
6. Adversarial testing (red team, penetration testing)

## LLM06:2025 — Excessive Agency

**Definition**: An LLM-based system is often granted a degree of agency — the ability to call functions or interface with other systems. Excessive Agency is the vulnerability that enables damaging actions when the LLM produces unexpected, ambiguous, or manipulated outputs (from hallucination, prompt injection, or malfunction).

### Three root-cause sub-categories

| Sub-category | Description | Example |
|---|---|---|
| **Excessive functionality** | Agent has tools / extensions beyond what the task requires | Email agent with send capability when only read is needed |
| **Excessive permissions** | Extensions operate with more privilege than needed on downstream systems | Using admin credentials when user-scoped OAuth suffices |
| **Excessive autonomy** | No verification before executing high-impact / irreversible operations | Deleting documents without user confirmation |

### Attack scenario

A personal assistant app with email summarization access receives a malicious email crafted for indirect prompt injection. The email tricks the LLM into forwarding sensitive inbox contents to an attacker's server — exploiting the unnecessary send-mail function and the missing approval workflow.

### Key mitigations

- Minimize extension availability to absolutely necessary tools only
- Restrict functions within extensions to the minimum needed operations
- Avoid open-ended capabilities like arbitrary shell command execution
- Apply principle of least privilege to database / system permissions
- Execute extensions within individual user OAuth contexts with minimal scopes
- **Implement mandatory human approval for consequential / irreversible actions**
- Enforce authorization at downstream systems (not only at LLM level)
- Monitor and log extension activity; implement rate-limiting on sensitive operations

## Relationship to [[concepts/agent-execution-guardrails]]

LLM01 and LLM06 are the two OWASP entries most directly addressed by the four-layer guardrail engineering framework in [[concepts/agent-execution-guardrails]]:

- LLM01 → Layer 4 (instruction hierarchy + architectural segregation patterns)
- LLM06 excessive autonomy → Layer 1 (HITL approval gates)
- LLM06 excessive functionality → Layer 2 (tool allowlists)
- LLM06 excessive permissions → Layer 2 (path blacklists + least-privilege credential scoping)
