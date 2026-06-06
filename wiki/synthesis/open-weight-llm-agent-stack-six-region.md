---
type: synthesis
tags: [ai, llm, open-weights, sovereign-ai, six-region, agents, nemotron, hermes, geopolitics]
sources:
  - "[[sources/nvidia-agent-challenge-2026]]"
  - "[[sources/sampras-mygpts-ai-agent-2025]]"
concepts:
  - "[[concepts/nemotron]]"
  - "[[concepts/hermes-agent-framework]]"
  - "[[concepts/domain-specific-llm-agents]]"
  - "[[concepts/openclaw]]"
  - "[[concepts/nemoclaw]]"
---

# Open-Weight Foundation-Model & Agent-Stack Sovereignty — Six-Region Map (台美日韓中國歐洲)

This is the six-region companion to the AI-agent cluster ([[concepts/nemotron]], [[concepts/hermes-agent-framework]], [[entities/nous-research]], [[concepts/domain-specific-llm-agents]]). Those pages describe the **stack** [[entities/sampras]] uses for the [[sources/nvidia-agent-challenge-2026|NVIDIA Agent Challenge 2026]] — a US-vendor stack (NVIDIA Nemotron core + Nous Hermes framework + NVIDIA NemoClaw sandbox). This page lifts the dimension up: **who builds the open-weight foundation models that such an agent stack runs on, by region, and why "owning the model layer" became a sovereignty question between 2024 and 2026.**

It is the sibling of [[synthesis/orbital-data-center-six-region]], [[synthesis/radiation-test-rad-hard-six-region]], [[synthesis/space-situational-awareness-six-region]], [[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/agentic-payments-six-region]] and [[synthesis/polkadot-2026-jam-tokenomics-six-region]]. The recurring corpus finding repeats here at the model layer: **Taiwan is upstream-strong (it makes the compute the whole world trains on) but midstream-absent (it ships no sovereign *base* model, only Llama-localization wrappers)** — the same "strong upstream, absent midstream" gap diagnosed for orbital data centers in [[synthesis/leo-taiwan-odc-gap]].

> Naming convention note: "open weight" ≠ "open source." Most models below release downloadable weights under permissive-ish licenses (Apache 2.0, Llama Community, NVIDIA Open Model License) but withhold training data/code. The distinction matters for the 100-year governance question below.

## The core 2024→2026 shift

Two things inverted between [[sources/sampras-mygpts-ai-agent-2025|Sampras's 2025 myGPT thesis]] and mid-2026:

1. **The open-weight frontier moved to China.** By download share, Chinese open-weight models reached **17.1 % of global model downloads in the year ending Aug 2025, narrowly passing the US's 15.86 % — the first time China led** ([Stanford HAI](https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications)). By traffic, **Chinese providers crossed ~45 % of OpenRouter token volume in April 2026** (Xiaomi MiMo V2 Pro alone ~4.79 T tokens/week, the #1 model by ~3×) ([understandingai](https://www.understandingai.org/p/the-best-chinese-open-weight-models)). On the open-weight intelligence frontier, **Kimi K2.6 (Moonshot) leads at AA Intelligence Index ~54**, ahead of the best US open-weights, **NVIDIA Nemotron 3 Ultra at ~48** ([Artificial Analysis](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released)).

2. **The true frontier stayed closed — and stayed American.** Reasoning-heavy benchmarks in 2026 are still topped by closed US models (Claude Opus 4.6, GPT-5.x, Gemini 3.x). So the global picture is a **scissors**: closed-frontier capability is US-led; open-weight capability is China-led; everyone else competes on *language + data + deployment sovereignty*, not raw frontier capability.

This is the structural fact the six-region map organizes.

## Six-region comparison

| Region | Flagship open-weight base models (mid-2026) | Agent/runtime layer | Strategy posture | Frontier gap |
|---|---|---|---|---|
| **US 美** | Meta **Llama 4** (Scout/Maverick; Behemoth 2T training), NVIDIA **Nemotron 3** (Nano/Super-120B/**Ultra**, AA Idx ~48), OpenAI **gpt-oss-120b/20b** (Apache 2.0, Aug 2025), Google **Gemma 3/4** | [[concepts/hermes-agent-framework|Hermes Agent]] (Nous), [[concepts/nemoclaw|NemoClaw]]/[[concepts/openclaw|OpenClaw]], LangGraph, etc. | **Open as ecosystem play, closed as the real moat** — best models (Claude/GPT/Gemini) stay closed; open line is a developer-funnel + China-counter | Leads *closed*; trails *open* (Ultra 48 < Kimi 54) |
| **China 中** | **DeepSeek V4**, Alibaba **Qwen3.5/3.6**, Z.AI **GLM-5/5.1**, Moonshot **Kimi K2.6** (open-weight #1 ~54), **MiniMax M2.7**, **Xiaomi MiMo V2 Pro** (#1 OpenRouter) | Native agent harnesses + heavy use of *any* open framework (incl. OpenClaw forks) | **Open-weight as sovereignty + reach** — sanctioned off top chips, so release openly to harvest external feedback & capture Global South (Malaysia→DeepSeek, Singapore→Qwen) | **Leads the open frontier**; still trails closed-US on hardest reasoning |
| **Europe 歐** | **Mistral** (Paris; open-weight + Le Chat; €1B Sweden DC 2027), **Teuken-7B** (OpenGPT-X, Apache 2.0), **OpenEuroLLM** (24 EU languages; v1 mid-2026, final 2028; EU-funded) | Mistral-native + EU-sovereign-cloud wrappers | **Regulated sovereignty** — one commercial champion (Mistral) + public multilingual projects, framed against US dependence under the EU AI Act | One champion near-frontier; public projects experimental |
| **Japan 日** | NTT **tsuzumi 2** (30B, single H100), Fujitsu **Takane**, KDDI/ELYZA **Llama-3.1-ELYZA-JP-70B**, PFN **PLaMo 2.0 Prime**, **Sakana AI** (evolutionary merge), **Swallow** (Tokyo Tech) | Digital Agency **"Gennai"** gov platform — 7 vendors selected Mar 2026 for ~180k staff | **Linguistic + data sovereignty, pragmatic bases** — mix of from-scratch (PLaMo/tsuzumi) and Llama-continued-pretrain; govt-procurement anchored | Behind frontier by design; optimizes Japanese + on-prem |
| **Korea 韓** | LG **EXAONE 4.0** (30B)→**K-EXAONE 236B MoE**, Naver **HyperCLOVA X** (Think/OMNI), Upstage **Solar Pro 2** (only KR entry on Frontier-LM leaderboard), SKT **A.X K1** (~500B) | National-contest selection | **State-funded national champion bake-off** — "Sovereign AI Foundation Model" project (₩213.6B/~$162M); MSIT advanced LG/SKT/Upstage past stage 1 Jan 2026, **eliminated Naver on an *originality* test** (non-independent pretrained components) | Solar near-frontier-efficient; others sovereign-first |
| **Taiwan 台** | **TAIDE 2.0** (Llama3.1-TAIDE, moving onto Nemotron), **TAME / Llama-3-Taiwan-70B** (MiuLab/yentinglin), MediaTek **Breeze2** (Llama-3.2 base, Traditional-Chinese + vision + function-calling) | Localization wrappers; relies on US frameworks | **Upstream-strong / midstream-absent** — makes the world's training compute (TSMC) but ships only *Llama-localization* wrappers, no sovereign from-scratch base; motivated by Traditional Chinese ≈ 0.5 % of web text | Largest gap: no independent base model |

Sources: [Stanford HAI](https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications); [MIT Tech Review 2026-04](https://www.technologyreview.com/2026/04/21/1135658/china-open-source-models-ai-artificial-intelligence/); [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models); [OpenAI gpt-oss](https://openai.com/index/introducing-gpt-oss/); [Meta Llama 4](https://ai.meta.com/blog/llama-4-multimodal-intelligence/); [OpenEuroLLM](https://openeurollm.eu/); [Korea Times 2025-12-30](https://www.koreatimes.co.kr/business/tech-science/20251230/consortia-unveil-models-for-national-ai-project); [llm-jp awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm); [NVIDIA TAIDE blog](https://blogs.nvidia.com/blog/taiwan-research-supercomputer/); [MediaTek Breeze2](https://huggingface.co/MediaTek-Research/Llama-Breeze2-8B-Instruct).

## Three sovereignty strategies (the recurring corpus trichotomy)

Just as [[synthesis/space-situational-awareness-six-region]] and [[synthesis/radiation-test-rad-hard-six-region]] resolve into three governance bets, the open-weight model layer resolves into three:

1. **Open-weight-as-strategy (China).** Sanctioned off the newest accelerators by US export controls, China releases at the frontier *because* it is constrained: open weights buy external contribution, distribution, and Global-South lock-in that compensate for compute scarcity. The constraint *produced* the openness.
2. **Open-as-funnel, closed-as-moat (US).** The US ships strong open-weights (Llama/Nemotron/gpt-oss/Gemma) but keeps its actual frontier (Claude/GPT/Gemini) closed. Openness is an ecosystem + counter-China lever, not a sovereignty necessity — the US already owns the frontier and the compute.
3. **State-funded linguistic sovereignty (Korea / Japan / Europe / Taiwan).** Public money, national-language base models, deployment under domestic control. Sovereignty here means "we own our language's representation, our data, and where the weights run" — *not* matching the capability frontier. Korea's national bake-off (with an explicit *originality* gate that eliminated Naver) is the sharpest instance; Taiwan is the weakest (wrappers only).

The owner's own [[concepts/domain-specific-llm-agents|domain-specific-agent thesis]] is the **fourth, individual-scale** instance of the same logic: when you cannot move the base model, you compete on the *curated corpus + persona* layer instead — exactly what Korea/Japan/Taiwan do at national scale with continued-pretraining and what the [[concepts/obsidian-llm-knowledge-base|Obsidian KB]] does at personal scale.

## Long-horizon view (labelled scenario — projection, not fact)

The model layer admits a long-horizon read because it sits on two slow-moving invariants:

- **Linguistic-sovereignty invariant.** Every language community will demand a model that represents it natively. Traditional Chinese (~0.5 % of web text), Korean, Japanese, and the EU's 24 languages are each structurally under-served by English-majority training corpora, so state-funded localized models persist regardless of where the capability frontier sits. This is the AI-layer analog of the σT⁴ heat-rejection ceiling in [[synthesis/orbital-data-center-six-region]] and the Kessler invariant in [[synthesis/space-situational-awareness-six-region]]: a fixed structural floor that keeps multiple regional programs alive forever.
- **Compute-vs-openness fork.** Whether a multipolar *open-weight commons* survives depends on the export-control regime. If chip controls hold, China keeps releasing openly (its rational response) and the commons stays vibrant; if controls ease or China reaches compute parity, the commercial incentive to keep the frontier closed may pull even Chinese labs toward closed releases.

| Horizon | Convergent scenario | Multipolar / fork scenario |
|---|---|---|
| **~2030** | A handful of open-weight bases (1–2 US, 2–3 Chinese) become the global substrate; everyone else fine-tunes them | Each major bloc maintains ≥1 sovereign base; "AI non-alignment" (Global South picks the cheapest open model) hardens |
| **~2050** | Capability commoditizes; value moves entirely to data + agent-orchestration + deployment trust ([[synthesis/spacesharks-trust-stack]] logic) | Persistent linguistic-sovereignty programs in EU/JP/KR/TW; model "passports" / provenance ([[concepts/agentic-provenance]]) gate cross-border use |
| **~2100** | The "base model" is as commoditized as a compiler; sovereignty is about *corpus + compute siting*, not model identity | A stable multipolar set of language-bloc model commons, the way natural languages themselves are multipolar and durable |

Either way, **the durable scarce resource is not the model — it is (a) curated proprietary data and (b) the compute siting** (which loops back to [[synthesis/orbital-data-center-six-region]] and [[synthesis/leo-taiwan-odc-gap]]: whoever rejects the most heat per watt in orbit, and whoever fabs the accelerators, holds the long lever — and that is exactly where Taiwan *is* strong).

## Falsifier table

| Claim on this page | Falsified if… |
|---|---|
| China leads the *open-weight* frontier | A US/EU open-weight model retakes #1 on AA Intelligence Index *and* OpenRouter share for 2+ consecutive quarters |
| US keeps its *true* frontier closed | A US lab open-weights a model that matches its own closed flagship within one quarter of release |
| Taiwan is midstream-absent at the model layer | A Taiwan team ships a competitive **from-scratch** (not Llama/Qwen-continued) sovereign base model |
| Export controls *cause* China's openness | Controls ease materially and Chinese labs keep releasing open at the frontier anyway |
| Linguistic sovereignty is a permanent floor | A single multilingual model so dominates that EU/JP/KR/TW wind down their national base-model programs |
| Open-weight commons persists | Top open-weight labs (any region) shift to closed-only releases and downloads collapse to a few gated APIs |

## See also

- [[concepts/nemotron]] — US open-reasoning core; Nemotron 3 Ultra now released (AA Idx ~48)
- [[concepts/hermes-agent-framework]] — model-agnostic agent layer (region-neutral runtime over a contested model layer)
- [[entities/nous-research]] — US open-weight lab; Hermes-4 14B builds on a **Chinese** (Qwen-3) base — the regions are already entangled
- [[entities/hermes-llm-series]] — the Llama+Qwen-based open-weight lineage
- [[concepts/domain-specific-llm-agents]] — the individual-scale instance of the same "compete on corpus, not base model" logic
- [[synthesis/orbital-data-center-six-region]] · [[synthesis/radiation-test-rad-hard-six-region]] · [[synthesis/space-situational-awareness-six-region]] · [[synthesis/agentic-payments-six-region]] · [[synthesis/polkadot-2026-jam-tokenomics-six-region]] · [[synthesis/phased-array-rf-frontend-supply-chain]] — sibling six-region maps
- [[synthesis/leo-taiwan-odc-gap]] — the "strong upstream, absent midstream" pattern this page rediscovers at the model layer
