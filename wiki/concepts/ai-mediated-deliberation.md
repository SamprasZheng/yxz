---
type: concept
tags: [governance, civic-tech, digital-democracy, ai-agents, deliberation, plurality, llm, taiwan]
---

# AI-Mediated Deliberation

Using large language models to **mediate, scale, and synthesize democratic deliberation** — ingesting many people's open-ended opinions and either (a) *mapping* where a population already agrees (clustering / sensemaking) or (b) *generating* a group statement that maximizes collective endorsement (mediation / common-ground synthesis). This is the **AI-era frontier of the deliberation half of [[concepts/plurality]]** (Axis B of [[synthesis/digital-democracy-user-owned-social-six-region]]): the same LLM capability that threatens to flood public discourse with synthetic text (the pressure behind [[concepts/proof-of-personhood]]) is simultaneously being turned into *infrastructure for* deliberation. Split out 2026-09-08 because by 2026 this is a distinct, load-bearing idea that welds the civic-tech cluster to the AI-agent cluster ([[synthesis/open-weight-llm-agent-stack-six-region]] / [[synthesis/agent-runtime-orchestration-six-region]]).

## Why it matters (拉高維度 — system level)

Classical deliberative democracy does not scale: a town hall of 20 works, a town hall of 20 million does not — facilitation, summarization, and consensus-finding are all human-labor-bound. Pre-LLM civic-tech ([[entities/audrey-tang]]'s **Polis**) already partially automated the *clustering* step. LLMs now automate the *reading, summarizing, translating, and statement-drafting* steps too, so the deliberative loop can in principle run at population scale in real time. That is the optimistic case: AI as the missing throughput layer that makes plural collective choice operationally feasible. The pessimistic mirror (see the risk section) is that whoever owns the mediating model owns the outcome.

## Two live mechanism archetypes (加深探究 — layer down)

| Archetype | Direction | Flagship system | What the LLM does |
|---|---|---|---|
| **Sensemaking / clustering** | many opinions **in** → a map **out** | **Polis → Talk to the City** ([[entities/audrey-tang]] lineage + AI Objectives Institute) | real-time AI summarization, translation, and clustering of open-ended input into interactive "areas of consensus / division" diagrams |
| **Mediation / statement-generation** | many opinions **in** → one endorsed statement **out** | **DeepMind "Habermas Machine"** | iteratively drafts and refines a *group statement* that maximizes collective endorsement, using participants' opinions + critiques |

**The Habermas Machine result (the hard evidence).** Tessler et al., *"AI can help humans find common ground in democratic deliberation,"* **Science 2024** (DOI [10.1126/science.adq2852](https://doi.org/10.1126/science.adq2852)), ran the system with **>5,700 UK participants**: AI-generated group statements were **preferred over human-mediator statements** (clarity, informativeness, fairness) and produced **greater within-group convergence** than unmediated discussion. Named for Jürgen Habermas's theory of communicative action. Open-sourced (github.com/google-deepmind/habermas_machine). This is the first large-N, peer-reviewed evidence that an LLM can *out-mediate* a human facilitator on the consensus-building task.

**Talk to the City (the deployed civic tool).** Open-source LLM interface by the **AI Objectives Institute**; the LLM layer on top of [[entities/audrey-tang]]'s Polis. Taiwan's **MODA** used it in the **Alignment Assemblies** (AI policy 2023), and for same-sex-marriage and **2024-election party-platform** analysis: MODA gathered statements via Polis, then Talk to the City clustered/visualized/translated them ([MODA — Alignment Assemblies](https://moda.gov.tw/en/major-policies/alignment-assemblies/1453), [AI Objectives Institute — Talk to the City in Taiwan](https://ai.objectives.institute/blog/amplifying-voices-talk-to-the-city-in-taiwan)).

## The governance-of-AI feedback loop (向內消化 — integration)

AI-mediated deliberation is increasingly used to **govern AI itself**, closing a loop:

- **Alignment Assemblies** — MODA (Taiwan) × the **Collective Intelligence Project (CIP)** (Divya Siddarth / Saffron Huang), from **May 2023**: population-scale deliberation to align AI policy with public preference ([CIP — Alignment Assemblies](https://www.cip.org/alignmentassemblies)).
- **Anthropic — Collective Constitutional AI (2023):** used **Polis** to source a model constitution from ~1,000 Americans.
- **OpenAI — "Democratic Inputs to AI" grants (2023–24):** funded experiments in democratic AI governance.

So the deliberation layer both *runs on* LLMs and is *used to steer* LLMs — the civic-tech and AI-agent clusters are no longer separable. This is why the concept lives at the seam of [[synthesis/digital-democracy-user-owned-social-six-region]] and [[synthesis/open-weight-llm-agent-stack-six-region]].

## The electoral proof point (向外抓取 — 2026)

The clearest sign this left the lab: **[[entities/audrey-tang|Team Mirai]]'s Takahiro Anno** built his campaign around **AI "broadlistening" (ブロードリスニング)** — a Talk-to-the-City-style pipeline that ingests citizen input at scale and surfaces convergence — and **Team Mirai won 11 House-of-Representatives seats (3.97 M votes, 6.9%) in Japan's February 2026 general election**, up from a single upper-house seat in 2025. A Plurality-inspired party running *on* AI-mediated deliberation is now a genuine parliamentary force, not a demo (see [[synthesis/digital-democracy-user-owned-social-six-region]]).

## Six-region read (水平展開)

| Region | Position | Note |
|---|---|---|
| **Taiwan** | **most mature deployment** | MODA Alignment Assemblies + Talk to the City in real policy processes; the Polis→LLM lineage originates with [[entities/audrey-tang]] |
| **Japan** | **now electoral** | Team Mirai's "broadlistening" localized the toolkit into a *campaign method* that won 11 Lower-House seats (2026-02) |
| **US** | research + AI-governance vehicles | CIP, OpenAI Democratic Inputs, Anthropic Collective Constitutional AI; DeepMind team is UK/US |
| **Europe** | research flagship | DeepMind (London) Habermas Machine; academic deliberative-democracy tradition |
| **Korea** | consumer | municipal e-participation (Seoul mVoting) without an LLM-mediation layer yet |
| **China** | N/A by design | consultative portals only; open deliberation structurally excluded (state-controlled, per the cluster's China row) |

## The risk (加深探究 — the load-bearing caveat)

The same paper-and-policy literature that celebrates the throughput gain flags the mirror risk: AI mediation can **centralize control among the platforms and well-resourced actors who own the mediating model** (Knight First Amendment Institute, *"Can AI Mediation Improve Democratic Deliberation?"*). Two chokepoints:

1. **Who owns the mediator** — a proprietary, closed model that drafts the "consensus" statement is a single point of capture; this is exactly why the **open-weight-model sovereignty question** ([[synthesis/open-weight-llm-agent-stack-six-region]]) is a *democratic* question, not just an industrial one.
2. **Who the participants are** — every mechanism assumes one-human-one-voice, so AI-mediated deliberation inherits the whole field's dependency on [[concepts/proof-of-personhood]]: if agents can astroturf the input, the mediator faithfully synthesizes a manufactured consensus.

## Historical lineage & long-horizon view (拉長時間軸)

**Lineage.** Deliberative-democracy theory (Habermas, 1980s) → participatory-budgeting and citizens'-assembly practice (1989 Porto Alegre onward) → **computational** deliberation: Polis / bridging algorithms (g0v/vTaiwan, ~2014) → **LLM-mediated** deliberation (Talk to the City ~2023; Habermas Machine, *Science* 2024). Each step raised the number of people whose open-ended input can be processed into a decision from tens → thousands → (in principle) millions.

**Long-horizon view (scenario — not fact).** The century question is whether the deliberation mediator becomes a **neutral, auditable public good** (open-weight model + open-source pipeline + [[concepts/proof-of-personhood]]-gated participation) or a **captured chokepoint** (one company's closed model quietly shaping which "consensus" surfaces). This is the deliberation-layer instance of the same fork that runs through every six-region map in this wiki: public-infrastructure vs. platform-owned. Because AI-mediated deliberation sits *on top of* both the personhood layer and the model layer, it inherits both of their unresolved dependencies at once.

## Sources

- Tessler et al., "AI can help humans find common ground in democratic deliberation," *Science* 2024 — [DOI 10.1126/science.adq2852](https://doi.org/10.1126/science.adq2852)
- [MODA — Alignment Assemblies](https://moda.gov.tw/en/major-policies/alignment-assemblies/1453) · [CIP — Alignment Assemblies](https://www.cip.org/alignmentassemblies) · [AI Objectives Institute — Talk to the City in Taiwan](https://ai.objectives.institute/blog/amplifying-voices-talk-to-the-city-in-taiwan)
- [Knight First Amendment Institute — Can AI Mediation Improve Democratic Deliberation?](https://knightcolumbia.org/content/can-ai-mediation-improve-democratic-deliberation)

## Related

- [[concepts/plurality]] — the governance philosophy whose deliberation half this operationalizes
- [[entities/audrey-tang]] — Polis / vTaiwan / Alignment Assemblies lineage
- [[entities/glen-weyl]] — the plural-mechanism co-author; AI-governance turn (2026)
- [[concepts/proof-of-personhood]] — the load-bearing participation dependency
- [[synthesis/digital-democracy-user-owned-social-six-region]] — the civic/social six-region map this deepens
- [[synthesis/open-weight-llm-agent-stack-six-region]] — why "who owns the mediating model" is a democratic question
- [[synthesis/agent-runtime-orchestration-six-region]] — the runtime layer the mediating agents run on
