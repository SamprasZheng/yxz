---
type: entity
tags: [ai, nous-research, open-source-ai, decentralized-ai, hermes]
---

# Nous Research

**Nous Research** is an open-source AI lab founded in **2023**. Known for the Hermes fine-tuned LLM series, the Hermes Agent framework, and the Psyche decentralized training network. Operates with an explicit decentralized / open-weights posture, positioning itself against the closed-frontier-lab default.

**Site:** https://nousresearch.com — **GitHub:** https://github.com/NousResearch — **HuggingFace:** https://huggingface.co/NousResearch — **Portal:** https://portal.nousresearch.com

## Founding team & key people

- **Jeffrey Quesnelle** — CEO, co-founder
- **Karan Malhotra** — Head of Behavior, co-founder (handle: Karan4D)
- **"Teknium"** — Head of Post-Training, co-founder (primary public face of the Hermes models on X/HF)
- **Shivani Mitra** — co-founder
- Earlier Hermes fine-tunes also credit Emozilla, Huemin Art, Redmond AI as collaborators.

## Funding

| Round | Date | Amount | Lead |
|---|---|---|---|
| Seed | January 2024 | $5.2M | Distributed Global, OSS Capital (Balaji Srinivasan participated) |
| Series A | April 2025 announcement | $65M total ($50M Series A + $15M previously-unannounced June 2024 round) | **Paradigm** lead at **$1B valuation** |

Other Series A investors: Vipul Reddy (CEO of Together AI), Distributed Global, North Island Ventures, Delphi Digital, Raj Gokal (Solana co-founder).

The Paradigm lead at a unicorn valuation is notable — Paradigm is primarily a crypto fund, and Nous positions itself as a "decentralized AI lab," reflected in the Psyche distributed training network.

## Product lines

1. **[[entities/hermes-llm-series]]** — open-weight fine-tuned LLM series. Hermes-2 Pro → Hermes-3 → Hermes-4 (70B, 14B, 405B variants on Llama-3.1 and Qwen-3 bases).
2. **[[concepts/hermes-agent-framework]]** — open-source self-improving AI agent (MIT, ~165k stars May 2026). Distinct from the LLM series — it is the runtime/orchestration layer and is model-agnostic.
3. **Nous Portal** — managed inference endpoint at portal.nousresearch.com.
4. **Psyche** — decentralized training network announced around the April 2025 Series A.
5. **Skills Hub** — community skill registry at agentskills.io, open standard for skill portability.

## OSS posture

MIT-licensed core artifacts; weights released openly on Hugging Face; explicit "you can switch providers at any time with no lock-in" framing in the Hermes Agent docs. This stance is load-bearing for their fundraising narrative — investors are betting on decentralized/open AI as a wedge against OpenAI/Anthropic.

## Wiki relevance

[[entities/sampras]] is competing in the NVIDIA Agent Challenge 2026 (see [[sources/nvidia-agent-challenge-2026]]) using Hermes Agent as the recommended framework. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] --> Nous Research is therefore the upstream org for the hackathon's reference stack.
