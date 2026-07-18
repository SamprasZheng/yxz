---
type: concept
tags: [ai, llm, nvidia, nemotron, reasoning, agents, hackathon]
---

# Nemotron — NVIDIA's Open Reasoning Model Family

**Nemotron** is NVIDIA's open-weights LLM family, positioned as the company's flagship line for **agentic reasoning** (planning, tool use, multi-step problem solving). All variants ship with open weights under the **NVIDIA Open Model License** (commercial use + derivatives permitted, output ownership retained by user) and are served via [build.nvidia.com](https://build.nvidia.com) NIM endpoints plus [huggingface.co/nvidia](https://huggingface.co/nvidia) checkpoints.

This page is the canonical lineage + variant-selection reference for [[entities/sampras]]'s [[entities/nvidia|NVIDIA]] Agent Challenge 2026 entry (GTC Taipei — see [[sources/nvidia-agent-challenge-2026]] for deadline + rules), where Nemotron is the **mandatory reasoning core**. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

## Family lineage (as of May 2026)

### Generation 1 — Dense Transformer (2023–2024)
| Model | Release | Params | Base | Notes |
|---|---|---|---|---|
| Nemotron-3 8B | 2023-11 | 8B | Original | First Nemotron; foundation experiment |
| Nemotron-4 15B | 2024-02 | 15B | Original | Multilingual base |
| Nemotron-4 340B | 2024-06 | 340B | Original | Synthetic-data generator; rivaled GPT-4 on chat |

### Generation 2 — Llama-Nemotron derivatives (late 2024 – 2025)
NVIDIA pivoted to post-training **Llama** bases with NAS (Neural Architecture Search) + multi-stage RL (GRPO).

| Model | Release | Params | Base | Context | Key trait |
|---|---|---|---|---|---|
| Llama-3.1-Nemotron-70B-Instruct | 2024-10 | 70B | Llama-3.1-70B | 128K | First reasoning post-train; chat-tuned |
| Llama-3.1-Nemotron-Ultra-253B-v1 | 2025-04 | 253B | Llama-3.1-405B | 128K | Vertical-NAS compression of 405B → 253B; **beats DeepSeek-R1 671B at ~½ size** |
| Llama-3.3-Nemotron-Super-49B-v1 | 2025-03 | 49B | Llama-3.3-70B | 128K | Fits one **H200**; reasoning ON/OFF via system prompt |
| Llama-3.3-Nemotron-Super-49B-v1.5 | 2025-Q3 | 49B | Llama-3.3-70B | 128K | Refresh of v1 |

### Generation 3 — Hybrid Mamba-Transformer (2025–2026)
The **Nemotron-H** architecture replaces most self-attention layers with **Mamba-2** state-space layers → up to **6× higher throughput** on long reasoning traces.

| Model | Release | Total / Active | Context | Notes |
|---|---|---|---|---|
| Nemotron-H | 2025-04 | (research preview) | — | Architecture paper |
| **Nemotron Nano 2 (9B v2)** | 2025-08-18 | 9B dense | **128K** | Hybrid Mamba-Transformer; distilled from 12B base trained on 20T tokens (FP8); on-par accuracy with Qwen3-8B, **6× faster** at 8K-in/16K-out; runs on a single A10G |
| **Nemotron 3 Nano** (Omni) | 2025-12 | 31.6B MoE / 3.2B active | up to **1M** | Multimodal (vision + audio + text); cheapest tier; on free build.nvidia.com tier as of 2026 |
| **Nemotron 3 Super** | 2026-03 | ~120B MoE / ~12B active | up to **1M** | Reasoning workhorse for multi-agent apps; paid via Bitdeer/CoreWeave/DigitalOcean partners |
| **Nemotron 3 Ultra** | **released ~2026-Q2** | **~550B** MoE / ~50B active | TBD | Deep-research / strategic planning. **Update (2026-06):** now released — leads US open-weights at **Artificial Analysis Intelligence Index ~48** (ahead of Gemma 4 31B ~39, Nemotron 3 Super ~36, gpt-oss-120b ~33) but **behind the China-led open-weight frontier Kimi K2.6 ~54** ([Artificial Analysis](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released)). NVIDIA paired it with **[[concepts/hermes-agent-framework|Hermes Agent]] as a reference runtime** — coupling the model to the agent-runtime layer ([[synthesis/agent-runtime-orchestration-six-region]]) |

## Benchmark positioning

**Llama-3.1-Nemotron-Ultra-253B-v1** (the public reasoning peak prior to Nemotron 3):
- AIME 2024: **97.0%** (reasoning ON) — near-saturation
- AIME 2025: 16.67% → **72.50%** with reasoning ON
- MATH500: **97.00%**
- GPQA-Diamond: leads category for advanced scientific reasoning
- LiveCodeBench: 29.03% → **66.31%** with reasoning ON
- BFCL v2 (tool calling): strong in both ON/OFF modes
- **4× inference throughput vs DeepSeek-R1 671B** at ~½ the parameters

**Nemotron Nano 2 (9B v2)**: state-of-the-art for ≤10B class on reasoning benchmarks; the sweet spot for low-cost on-device or single-GPU agent loops.

## Access & pricing — build.nvidia.com

- Sign up for free **NVIDIA Developer Program** → API key prefixed `nvapi-`
- Free tier: **1,000 inference credits** on signup, up to **5,000** total on request
- Rate limit: **40 RPM**
- Free Nemotron variants on build.nvidia.com (as of 2026-05):
  - Nemotron Mini 4B
  - Nemotron Nano 2 (9B v2)
  - Nemotron 3 Nano
  - Nemotron Content Safety
  - Llama-3.3-Nemotron-Super-49B-v1 / v1.5
  - Llama-3.1-Nemotron-Ultra-253B-v1
- **Nemotron 3 Super 120B is NOT on free tier** — only via paid partner NIMs: **$0.20 / M input tok, $0.80 / M output tok** (Bitdeer, CoreWeave, DigitalOcean)
- Overall NIM range: $0.10–$10 per million tokens

OpenAI-compatible REST endpoint: `https://integrate.api.nvidia.com/v1/chat/completions` with `Authorization: Bearer $NVIDIA_API_KEY`.

## License

**NVIDIA Open Model License** (introduced Dec 2025 alongside Nemotron 3):
- Commercial use ✅
- Derivative works ✅
- User retains ownership of model outputs ✅
- Termination clause if licensee initiates patent infringement claim against NVIDIA
- Llama-Nemotron derivatives additionally inherit Llama 3.1/3.3 Community License terms

## Variant selection for a "long-running agent" hackathon entry

For [[entities/sampras]]'s GTC Taipei Agent Challenge 2026 entry — agentic loop, tool calling, RAG over Obsidian KB ([[concepts/obsidian-llm-knowledge-base]]), small team (deadline + rules canonical at [[sources/nvidia-agent-challenge-2026]]): <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

**Primary recommendation: `Llama-3.3-Nemotron-Super-49B-v1.5`**
- On free tier of build.nvidia.com → zero infra cost during hackathon
- 128K context — fits multi-turn agent state + tool traces + KB chunks
- Native reasoning ON/OFF toggle via system prompt (cheap mode-switching for planner vs executor sub-agents)
- Strong BFCL v2 tool-calling scores
- Public benchmarks against Claude/GPT — known quantity for demo storytelling
- Fits single H200 if on-prem fallback needed
- Sweet spot of "reasoning quality" vs "free credits won't evaporate in one session"

**Secondary / fallback: `Nemotron Nano 2 (9B v2)`**
- For agent sub-tasks where latency matters (router, classifier, summarizer)
- 6× throughput on long traces → good for "thinking" loops at low credit burn
- Pairs well with Super-49B as orchestrator/worker split

**Avoid for this hackathon:**
- Nemotron 3 Super 120B — paid only ($0.20/$0.80 per M tok), credits won't last
- Nemotron 3 Ultra — not yet released
- Llama-3.1-Nemotron-Ultra-253B — overkill, slower, will burn the 1,000 credit budget fast

## Six-region open-weight positioning (台美日韓中國歐洲)

Nemotron is the **US national-champion open-weight line**, but it does not sit at the open-weight frontier. As of mid-2026 the open-weight intelligence frontier is **China-led** (Kimi K2.6 ~54, DeepSeek V4, Qwen3.5/3.6, GLM-5, Xiaomi MiMo) while the *closed* frontier stays US-led (Claude/GPT/Gemini). Nemotron's role is therefore the **agentic-reasoning, NIM-deployable, license-clean** option a US/Taiwan team reaches for when it wants open weights + a vendor SLA — which is exactly why the [[sources/nvidia-agent-challenge-2026|GTC Taipei Agent Challenge]] mandates it. Taiwan's [[concepts/domain-specific-llm-agents|sovereign-model]] efforts (TAIDE 2.0) are now **migrating onto Nemotron** as their base, making NVIDIA the upstream of the Taiwanese model layer the same way TSMC is the upstream of everyone's compute. Full regional map: [[synthesis/open-weight-llm-agent-stack-six-region]].

## Reference implementation in this repo

The "one model, two modes" idea above is implemented concretely by this wiki's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly agent]]: `agents/src/firefly/llm/router.py` serves the **same** `nemotron-3-nano:4b` as a planner (`detailed thinking on`, temp 0.15) and an executor (`detailed thinking off`, temp 0.3), forced by RTX 5070 VRAM ("can't hold two checkpoints hot") — the cleanest statement of why the Nemotron-family reasoning toggle is the differentiator. Cloud-NIM mode swaps in two SKUs (Super-49B planner + Nano-9B executor). See [[synthesis/firefly-nemoclaw-reference-implementation]] — including the flagged divergence that the workflow-of-record still orchestrates on Claude, not Nemotron.

## Related

- [[synthesis/firefly-nemoclaw-reference-implementation]] -> how Nemotron is actually wired (and the Claude-vs-Nemotron orchestration gap)
- [[synthesis/open-weight-llm-agent-stack-six-region]] -> six-region map of who builds open-weight base models and why it became a sovereignty question
- [[synthesis/agent-runtime-orchestration-six-region]] -> six-region map of the runtime layer *above* the model; Nemotron is the mandated US model the runtime calls
- [[concepts/dgx-spark]] -> local reasoning workstation context for on-prem agent demos
- [[concepts/hermes-agent-framework]] -> framework path used with Nemotron in the GTC Taipei stack
- [[concepts/nemoclaw]] -> sandbox/runtime layer around long-running Nemotron agents

- [[concepts/domain-specific-llm-agents]] — Nemotron is the "base model" half of the (model + KB + persona) triple
- [[concepts/obsidian-llm-knowledge-base]] — the KB this Nemotron-based agent retrieves from
- [[entities/nvidia]] — vendor + hackathon host
- [[entities/jamia-gpt]] / [[entities/spacesharks-gpt]] — existing GPT-4-based myGPTs that will be ported onto Nemotron

## Sources

- NVIDIA Nemotron landing — https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/
- Nemotron 3 newsroom — https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models
- Nemotron 3 research page — https://research.nvidia.com/labs/nemotron/Nemotron-3/
- Nemotron Nano 2 paper (arXiv 2508.14444) — https://arxiv.org/abs/2508.14444
- Llama-Nemotron paper (arXiv 2505.00949) — https://arxiv.org/html/2505.00949v1
- Ultra-253B model card — https://huggingface.co/nvidia/Llama-3_1-Nemotron-Ultra-253B-v1
- Super-49B model card — https://huggingface.co/nvidia/Llama-3_3-Nemotron-Super-49B-v1
- build.nvidia.com Ultra page — https://build.nvidia.com/nvidia/llama-3_1-nemotron-ultra-253b-v1
- VentureBeat coverage of Ultra-253B — https://venturebeat.com/ai/nvidias-new-llama-3-1-nemotron-ultra-outperforms-deepseek-r1-at-half-the-size
- NIM free-tier guide — https://developer.nvidia.com/blog/access-to-nvidia-nim-now-available-free-to-developer-program-members/
- Wikipedia Nemotron — https://en.wikipedia.org/wiki/Nemotron
