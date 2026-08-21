---
type: concept
tags: [ai, llm, nvidia, nemotron, reasoning, agents, hackathon]
---

# Nemotron — NVIDIA's Open Reasoning Model Family

**Nemotron** is NVIDIA's open-weights LLM family, positioned as the company's flagship line for **agentic reasoning** (planning, tool use, multi-step problem solving). All variants ship with open weights under the **NVIDIA Open Model License** (commercial use + derivatives permitted, output ownership retained by user) and are served via [build.nvidia.com](https://build.nvidia.com) NIM endpoints plus [huggingface.co/nvidia](https://huggingface.co/nvidia) checkpoints.

This page is the canonical lineage + variant-selection reference for [[entities/sampras]]'s [[entities/nvidia|NVIDIA]] Agent Challenge 2026 entry (GTC Taipei — see [[sources/nvidia-agent-challenge-2026]] for deadline + rules), where Nemotron is the **mandatory reasoning core**. <!-- deduped → [[sources/nvidia-agent-challenge-2026]] -->

## Family lineage (as of July 2026; Nemotron 3 Ultra fact-checked 2026-07-25)

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
| **Nemotron 3 Ultra** | **2026-06-04** | **550B** MoE / **55B active** | up to **1M** | Deep-research / strategic planning; hybrid Mamba-Transformer MoE. **Now released** (was "~2026-Q2 / TBD" on prior revisions): the **most intelligent US open-weight model** at **Artificial Analysis Intelligence Index 47.7** — ahead of the next US open-weight models Gemma 4 31B (39.2), Nemotron 3 Super (36.0) and gpt-oss-120b (33.3), but **behind the China-led open-weight frontier — Kimi K2.6 (53.9) at release, since superseded by a two-lab China cluster at AA Idx 60: Kimi K3 (re-scored 57→60, weights live 2026-07-27) tied with Z.AI GLM-5.3 (60, launched 2026-08-14), with DeepSeek V4 Pro (GA 2026-08-13) one tier below — leaving Ultra ~12–13 pts adrift of the open frontier as of 2026-08**. Served **>300 tok/s** on a pre-release DeepInfra endpoint (peer China-lab 550B-class models DeepSeek/Kimi typically 50–100 tok/s) — the *speed-at-intelligence* is the differentiator, not the raw score. NVIDIA paired it with **[[concepts/hermes-agent-framework|Hermes Agent]] as a reference runtime** (Nous Research inducted into NVIDIA's **Nemotron Coalition**), coupling the model to the agent-runtime layer ([[synthesis/agent-runtime-orchestration-six-region]]) ([Artificial Analysis](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released)) |

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

> **Openness note (2026-07-25 fact-check):** the **Nemotron 3 Ultra** release (2026-06-04) was reported as shipping not only the open weights but the **training data and recipes** under a permissive license, positioning it toward the "fully open" end of the spectrum vs weights-only peers ([Artificial Analysis](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released)). Treat the exact license identifier as *reported* until confirmed against NVIDIA's own model card; the NVIDIA Open Model License terms above remain the documented baseline for the Nemotron 3 family.

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
- Nemotron 3 Super 120B — paid only ($0.20/$0.80 per M tok), credits won't last (note: this SKU, `nvidia/nemotron-3-super-120b-a12b`, is nonetheless the **default model of the NemoClaw-for-Hermes blueprint** — see [[concepts/hermes-agent-framework]] — so the hackathon-runtime path and the free-tier-budget path pull in opposite directions; keep the router pointed at Super-49B/Nano for cost)
- Nemotron 3 Ultra — **released 2026-06-04** (correcting the earlier "not yet released" note): now a deep-research/strategic-planning tier at 550B/55B-active. Still avoid *for a credit-budgeted hackathon loop* — it is overkill for a triage/tool-calling agent and its size makes it a paid/heavier tier that will burn the 1,000-credit budget; reach for it only for offline deep-research passes, not the live agent loop
- Llama-3.1-Nemotron-Ultra-253B — overkill, slower, will burn the 1,000 credit budget fast

## Six-region open-weight positioning (台美日韓中國歐洲)

Nemotron is the **US national-champion open-weight line**, but it does not sit at the open-weight frontier. As of Aug 2026 the open-weight intelligence frontier is **China-led by a cluster** — Kimi K3 and Z.AI GLM-5.3 both at **AA Idx 60**, DeepSeek V4 Pro (GA 2026-08-13) a tier below, plus Qwen 3.7 Max / Xiaomi MiMo V2.5 — while the *closed* frontier stays US-led (Claude Opus 5 **63.0**, Fable 5 62.1, Grok 4.6 60.9, GPT-5.6 Sol). The best US open-weight, Nemotron 3 Ultra (47.7), now sits **~12–13 pts behind the open frontier**, and the open-vs-closed gap itself has narrowed to **~3 pts** (60 vs 63). Nemotron's role is therefore the **agentic-reasoning, NIM-deployable, license-clean** option a US/Taiwan team reaches for when it wants open weights + a vendor SLA — which is exactly why the [[sources/nvidia-agent-challenge-2026|GTC Taipei Agent Challenge]] mandates it. Taiwan's [[concepts/domain-specific-llm-agents|sovereign-model]] efforts (TAIDE 2.0) are now **migrating onto Nemotron** as their base, making NVIDIA the upstream of the Taiwanese model layer the same way TSMC is the upstream of everyone's compute. Full regional map: [[synthesis/open-weight-llm-agent-stack-six-region]].

## Reference implementation in this repo

The "one model, two modes" idea above is implemented concretely by this wiki's [[synthesis/firefly-nemoclaw-reference-implementation|Firefly agent]]: `agents/src/firefly/llm/router.py` serves the **same** `nemotron-3-nano:4b` as a planner (`detailed thinking on`, temp 0.15) and an executor (`detailed thinking off`, temp 0.3), forced by RTX 5070 VRAM ("can't hold two checkpoints hot") — the cleanest statement of why the Nemotron-family reasoning toggle is the differentiator. Cloud-NIM mode swaps in two SKUs (Super-49B planner + Nano-9B executor). See [[synthesis/firefly-nemoclaw-reference-implementation]] — where, as **re-verified 2026-08-06**, the Python runtime-of-record (`orchestrator.py`, the real entrypoint) now drives *every* agent through this router on Nemotron; the only lagging artifact is `nemo_workflow.yaml`, which still *declares* `claude-opus-4-7` (a doc-only cleanup, not a runtime gap).

## Related

- [[synthesis/firefly-nemoclaw-reference-implementation]] -> how Nemotron is actually wired (Python runtime now Nemotron end-to-end as of 2026-08-06; only the `nemo_workflow.yaml` declaration still lags on Claude)
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
