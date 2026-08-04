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

> *Fact-refreshed 2026-08-04:* open-weight leaderboard turned over (Kimi K2.6 → **K3**, ~54 → **57**); OpenRouter Chinese share **~45 % → ~61 %** while US fell to ~30 %; Korea's national bake-off entered its **phase-2 elimination (2026-08-08→11)**; Japan's Digital Agency **named its three Gennai base models (2026-07-10)**; Mistral shipped a new open MoE and OpenEuroLLM its first cluster (2026-07-31). Full deltas below.

Two things inverted between [[sources/sampras-mygpts-ai-agent-2025|Sampras's 2025 myGPT thesis]] and mid-2026, and by August 2026 both had *intensified*:

1. **The open-weight frontier moved to China — and kept moving.** By download share, Chinese open-weight models reached **17.1 % of global model downloads in the year ending Aug 2025, narrowly passing the US's 15.86 % — the first time China led** ([Stanford HAI](https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications)). By *traffic* the lead then widened fast: Chinese providers were **~45 % of OpenRouter token volume in April 2026 → ~61 % of the top-10 models' token consumption by mid-2026, as the US share collapsed from ~70 % (June 2025) to ~30 %**; Chinese models held **all top-5 OpenRouter slots by 2026-07-29**, led by **Xiaomi MiMo V2.5** on volume ([understandingai](https://www.understandingai.org/p/the-best-chinese-open-weight-models); [TechBriefly 2026-07-29](https://techbriefly.com/2026/07/29/chinese-ai-models-lead-openrouter-for-first-time/)). On the open-weight *intelligence* frontier the leader turned over: **Moonshot's Kimi K3 — the largest open-weight model ever released at 2.8 T params (16 of 896 experts active/token, 1 M context), launched 2026-07-16, weights on Hugging Face 2026-07-27 under a Modified-MIT license — scores AA Intelligence Index 57**, ahead of Z.AI **GLM-5.2 (~51)** and **DeepSeek V4 Pro (~44)**, and well ahead of the best US open-weight, **NVIDIA Nemotron 3 Ultra (47.7)** ([Artificial Analysis](https://artificialanalysis.ai/articles/nvidia-nemotron-3-ultra-released); [MarkTechPost 2026-07-18](https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/)).

2. **The true frontier stayed closed and American — but the gap is closing.** The overall AA Intelligence Index is still led by a *closed* US model — **Claude Opus 5 at 60.7** (Aug 2026) — yet the distance from the best *open* weight to the proprietary frontier has compressed to **~6 points (Kimi K3 57 vs Opus 5 60.7), down from ~13 a year earlier**. So the global picture is a **narrowing scissors**: closed-frontier capability is US-led; open-weight capability is China-led; the delta between the two is shrinking each quarter; and everyone else competes on *language + data + deployment sovereignty*, not raw frontier capability.

This is the structural fact the six-region map organizes.

## Six-region comparison

| Region | Flagship open-weight base models (mid-2026) | Agent/runtime layer | Strategy posture | Frontier gap |
|---|---|---|---|---|
| **US 美** | Meta **Llama 4** (Scout/Maverick; Behemoth 2T training), NVIDIA **Nemotron 3 Ultra** (550B/55B-active MoE, **AA Idx 47.7** — best US open-weight) + Super/Nano, OpenAI **gpt-oss-120b/20b** (Apache 2.0, Aug 2025), Google **Gemma 3/4** | [[concepts/hermes-agent-framework|Hermes Agent]] (Nous), [[concepts/nemoclaw|NemoClaw]]/[[concepts/openclaw|OpenClaw]], LangGraph, etc. | **Open as ecosystem play, closed as the real moat** — best models (Claude/GPT/Gemini) stay closed; open line is a developer-funnel + China-counter | Leads *closed* (Claude Opus 5 60.7); trails *open* (Ultra 47.7 < Kimi K3 57) |
| **China 中** | Moonshot **Kimi K3** (open-weight #1, 2.8T MoE / 16-of-896 active, **AA Idx 57**), Z.AI **GLM-5.2** (744B MoE ~51), **DeepSeek V4 Pro** (1.6T MoE / 49B active ~44), Alibaba **Qwen 3.7 Max**, **Xiaomi MiMo V2.5** (#1 OpenRouter by volume), **MiniMax** | Native agent harnesses + heavy use of *any* open framework (incl. OpenClaw forks) | **Open-weight as sovereignty + reach** — sanctioned off top chips, so release openly to harvest external feedback & capture Global South (Malaysia→DeepSeek, Singapore→Qwen) | **Leads the open frontier**; ~6 pts behind closed-US on hardest reasoning |
| **Europe 歐** | **Mistral** (Paris; new "fat-but-sparse" open-weight MoE July-2026 early access, Apache 2.0; €4B DC + **Mistral Compute** EU AI cloud on NVIDIA; Le Chat rebrand), **OpenEuroLLM** (24 EU languages, €37.4M / 20 orgs; **first cluster 2026-07-31** — models + dataset + eval), **Teuken** (OpenGPT-X) | Mistral-native + EU-sovereign-cloud wrappers | **Regulated sovereignty** — one commercial champion (Mistral) + public multilingual projects, framed against US dependence under the EU AI Act | One champion near-frontier; public projects now shipping first artifacts |
| **Japan 日** | NTT **tsuzumi 2** (single-GPU JP business docs, upd. 2026-05), Fujitsu **Takane 32B**, PFN **PLaMo 2.0 Prime** — the **three domestic bases the Digital Agency chose (2026-07-10) for the *Gennai* gov platform** on Sakura Internet domestic cloud; plus KDDI/ELYZA, **Sakana AI**, **Swallow** (Tokyo Tech) | Digital Agency **"Gennai"** — blind-test Sept–Nov 2026 across ~180k staff → FY2027 procurement | **Linguistic + data sovereignty, pragmatic bases** — mix of from-scratch (PLaMo/tsuzumi) and continued-pretrain; a *fully-homegrown* dev-through-ops stack (domestic models on domestic cloud) | Behind frontier by design; optimizes Japanese + on-prem |
| **Korea 韓** | LG **EXAONE**→K-EXAONE, SKT **A.X**, Upstage **Solar Pro 2** (only KR entry on Frontier-LM leaderboard), **Motif Technologies** — the **four teams surviving the "Sovereign AI Foundation Model" bake-off** (₩213.6B/~$162M) | National-contest selection | **State-funded national champion bake-off** — Naver Cloud + NC AI **cut in round 1 (Jan 2026) on an *originality* gate** (Naver used frozen Alibaba-Qwen encoder weights); Motif added Feb 2026 | Solar near-frontier-efficient; **phase-2 eval 2026-08-08→11 cuts to 3; final by year-end picks 2** to power the national chatbot for 51M citizens |
| **Taiwan 台** | **TAIDE 2.0** (Llama3.1-TAIDE, moving onto Nemotron), **TAME / Llama-3-Taiwan-70B** (MiuLab/yentinglin), MediaTek **Breeze2** (Llama-3.2 base, Traditional-Chinese + vision + function-calling) | Localization wrappers; relies on US frameworks | **Upstream-strong / midstream-absent** — makes the world's training compute (TSMC) but ships only *Llama-localization* wrappers, no sovereign from-scratch base; motivated by Traditional Chinese ≈ 0.5 % of web text | Largest gap: no independent base model |

Sources: [Stanford HAI](https://hai.stanford.edu/policy/beyond-deepseek-chinas-diverse-open-weight-ai-ecosystem-and-its-policy-implications); [Artificial Analysis leaderboards](https://artificialanalysis.ai/leaderboards/models); [Kimi K3 comparison — MarkTechPost 2026-07-18](https://www.marktechpost.com/2026/07/18/kimi-k3-vs-deepseek-v4-pro-vs-glm-5-2-open-trillion-scale-moe-models-compared-on-benchmarks-license-and-serving-cost/); [OpenRouter Chinese-share — TechBriefly 2026-07-29](https://techbriefly.com/2026/07/29/chinese-ai-models-lead-openrouter-for-first-time/); [OpenAI gpt-oss](https://openai.com/index/introducing-gpt-oss/); [Meta Llama 4](https://ai.meta.com/blog/llama-4-multimodal-intelligence/); [Mistral open MoE — TechTimes 2026-07-06](https://www.techtimes.com/articles/319798/20260706/mistral-ai-targets-frontier-gap-open-weight-model-entering-july-early-access.htm); [OpenEuroLLM](https://openeurollm.eu/); [Japan Gennai models — NTT 2026-05-19](https://group.ntt/en/newsrelease/2026/05/19/260519a.html); [Korea sovereign-AI phase-2 — Korea Herald 2026](https://www.koreaherald.com/article/10656367); [NVIDIA TAIDE blog](https://blogs.nvidia.com/blog/taiwan-research-supercomputer/); [MediaTek Breeze2](https://huggingface.co/MediaTek-Research/Llama-Breeze2-8B-Instruct).

## Three sovereignty strategies (the recurring corpus trichotomy)

Just as [[synthesis/space-situational-awareness-six-region]] and [[synthesis/radiation-test-rad-hard-six-region]] resolve into three governance bets, the open-weight model layer resolves into three:

1. **Open-weight-as-strategy (China).** Sanctioned off the newest accelerators by US export controls, China releases at the frontier *because* it is constrained: open weights buy external contribution, distribution, and Global-South lock-in that compensate for compute scarcity. The constraint *produced* the openness.
2. **Open-as-funnel, closed-as-moat (US).** The US ships strong open-weights (Llama/Nemotron/gpt-oss/Gemma) but keeps its actual frontier (Claude/GPT/Gemini) closed. Openness is an ecosystem + counter-China lever, not a sovereignty necessity — the US already owns the frontier and the compute.
3. **State-funded linguistic sovereignty (Korea / Japan / Europe / Taiwan).** Public money, national-language base models, deployment under domestic control. Sovereignty here means "we own our language's representation, our data, and where the weights run" — *not* matching the capability frontier. Korea's national bake-off (with an explicit *originality* gate that eliminated **both** Naver Cloud and NC AI in round 1) is the sharpest instance; Taiwan is the weakest (wrappers only). By **August 2026** this strategy stopped being aspirational and became procurement: Korea's phase-2 elimination runs **2026-08-08→11** (four teams → three, then two by year-end to power a chatbot for 51 M citizens), and Japan's Digital Agency has already **locked its three domestic bases** (tsuzumi 2 / Takane 32B / PLaMo 2.0 Prime) onto a domestic cloud for a Sept–Nov blind-test across ~180 k civil servants — i.e. the sovereignty bet is now being decided by government RFPs, not benchmarks.

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

- [[concepts/nemotron]] — US open-reasoning core; Nemotron 3 Ultra = best US open-weight (AA Idx 47.7), still behind China's Kimi K3 (57)
- [[concepts/hermes-agent-framework]] — model-agnostic agent layer (region-neutral runtime over a contested model layer)
- [[entities/nous-research]] — US open-weight lab; Hermes-4 14B builds on a **Chinese** (Qwen-3) base — the regions are already entangled
- [[entities/hermes-llm-series]] — the Llama+Qwen-based open-weight lineage
- [[concepts/domain-specific-llm-agents]] — the individual-scale instance of the same "compete on corpus, not base model" logic
- [[synthesis/orbital-data-center-six-region]] · [[synthesis/radiation-test-rad-hard-six-region]] · [[synthesis/space-situational-awareness-six-region]] · [[synthesis/agentic-payments-six-region]] · [[synthesis/polkadot-2026-jam-tokenomics-six-region]] · [[synthesis/phased-array-rf-frontend-supply-chain]] — sibling six-region maps
- [[synthesis/leo-taiwan-odc-gap]] — the "strong upstream, absent midstream" pattern this page rediscovers at the model layer
