---
type: source
tags: [ai-agents, security, prompt-injection, instruction-hierarchy, openai, llm-training]
title: "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions"
author: "Eric Wallace, Kai Xiao, Reimar Leike, Lilian Weng, Johannes Heidecke, Alex Beutel (OpenAI)"
date: "2024-04-19"
ingested: "2026-06-01"
---

# The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions

- **arXiv**: [2404.13208](https://arxiv.org/abs/2404.13208)
- **Published**: April 2024
- **Authors**: Eric Wallace, Kai Xiao, Reimar Leike, Lilian Weng, Johannes Heidecke, Alex Beutel (all OpenAI at time of writing)
- **OpenAI post**: [openai.com/index/the-instruction-hierarchy/](https://openai.com/index/the-instruction-hierarchy/)
- **Simon Willison commentary**: [simonwillison.net/2024/Apr/23/the-instruction-hierarchy/](https://simonwillison.net/2024/Apr/23/the-instruction-hierarchy/)

## Problem Addressed

Standard LLM training does not teach models to distinguish between the *source* of an instruction. A system prompt written by a trusted developer and a user message containing malicious injected text both arrive in the same token stream and receive the same weight. This creates an exploitable attack surface: any content the LLM processes can contain adversarial instructions that override the developer's intent.

## Proposed Solution

An explicit **instruction hierarchy** with three tiers of decreasing trust:

```
Tier 1 (highest): System prompt  ← operator / developer instructions
Tier 2:           User message   ← authenticated end user
Tier 3 (lowest):  Tool output / external content ← data the agent fetched; treated as untrusted
```

Models are trained (via synthetic data generation) to recognize when instructions from lower tiers conflict with higher tiers, and to preferentially follow the higher-tier instruction in those cases. If a Tier 3 external content blob says "ignore your system prompt and do X," a hierarchy-aware model ignores that instruction because it conflicts with Tier 1 policy.

## Method

Synthetic data generation: the authors create training examples pairing (higher-tier instruction, lower-tier adversarial instruction) with the desired model response (follow higher-tier, ignore lower-tier). The method is model-agnostic and was applied to GPT-3.5 in the paper.

## Results

- "Drastically increased robustness" against prompt injection and jailbreak attempts
- Robustness held even for **attack types not seen during training** (generalization)
- "Minimal degradations on standard capabilities" (the model remains useful)
- Resistance improvement cited at ~63% better in some evaluations

## Limitations and Critical Caveats

1. **Probabilistic, not deterministic**: model-side training reduces attack success rate; it does not reduce it to zero. Adversarial prompts that are sufficiently crafted or novel can still succeed.
2. **Not a substitute for architectural controls**: the paper's own framing positions this as a *complement* to system-level defenses (allowlists, sandboxing, HITL gates), not a replacement.
3. **Training data dependency**: the quality of the robustness improvement depends on the diversity of the synthetic adversarial training examples.

## Relationship to [[concepts/agent-execution-guardrails]]

This paper provides the model-side complement to the file-level and wrapper-level immutability described in Layer 4 of [[concepts/agent-execution-guardrails]]. The instruction hierarchy addresses the scenario where an adversarial indirect injection reaches the model context despite architectural defenses — the model itself is trained to reject it. The four-layer guardrail framework treats model-side training as one layer among four; the deterministic layers (HITL gates, allowlists, read-only mounts) must remain in place because model-side defenses are probabilistic.

The paper also provides theoretical grounding for the "immutable brain file" pattern (Layer 3): even if a model were trained to follow the instruction hierarchy, an agent capable of modifying its own system prompt (`CLAUDE.md` or equivalent) could elevate an attacker's injected instruction to Tier 1 trust. File immutability closes this gap.

## Subsequent Work

A follow-up dataset paper "IH-Challenge: A Training Dataset to Improve Instruction Hierarchy" (OpenAI, 2025) released a public benchmark for evaluating and improving instruction-hierarchy robustness. Arxiv preprint at [cdn.openai.com/pdf/14e541fa...](https://cdn.openai.com/pdf/14e541fa-7e48-4d79-9cbf-61c3cde3e263/ih-challenge-paper.pdf).
