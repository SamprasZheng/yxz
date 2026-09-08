---
type: concept
tags: [governance, philosophy, civic-tech, web3, taiwan, opengov, social-graph, digital-democracy]
---

# Plurality

A governance philosophy — and the title of an open-source book co-authored by **[[entities/audrey-tang]]** and economist **[[entities/glen-weyl|E. Glen Weyl]]** (*Plurality: Technology for Collaborative Diversity and Democracy*, published **2024-05-20**) — arguing that decision-making should be **plural**: multi-perspective, inclusive, and adaptive, rather than collapsed into a single centralized authority or a single market price.

## Core tenets

- Reject single-path decision-making; embrace **multi-angle deliberation**.
- Build governance structures that are **inclusive and adaptive**.
- Let participants explore **multiple possibilities** by context rather than be forced down one predetermined route.
- Treat **collaborative diversity across difference** as the operating principle of legitimate governance — explicitly a *third way* between centralized state planning ("Technocracy") and atomized market libertarianism ("Libertarianism").

## Intellectual lineage (layer-down) — the missing depth

Plurality is not free-floating philosophy; it is the popular synthesis of a concrete decade of mechanism-design work, mostly from [[entities/glen-weyl]]'s **RadicalxChange** movement and its Ethereum-adjacent collaborators:

| Mechanism | Origin | What it operationalizes |
|---|---|---|
| **Quadratic Voting (QV)** | Weyl & Posner, *Radical Markets* (2018) | vote intensity at quadratic cost → protects minorities from simple majority steamroll |
| **Quadratic / Plural Funding (QF)** | Buterin, Hitzig & Weyl, *"Liberal Radicalism"* (2018) | matches public-goods funding by *breadth* of support, not size of donation; the math behind **Gitcoin Grants** (but note: Gitcoin itself moved *beyond* pure QF in 2025 — see below) |
| **Polis / bridging algorithms** | g0v / vTaiwan ([[entities/audrey-tang]]) | surface "rough consensus" across a population instead of amplifying the loudest poles |
| **Plural identity / connected society** | *Plurality* book | model people as overlapping group memberships, not isolated individuals — the social-graph version of the same idea |

The through-insight: *technology should widen the space of collective choice rather than narrow it*. Vitalik Buterin and the Ethereum public-goods ecosystem (Gitcoin) are the largest real-world deployers of the QF half; Taiwan's vTaiwan/Join is the largest deployer of the deliberation half.

> **Update — Gitcoin's own "plural" pivot (verified 2026-09-08).** The QF flagship has itself moved past single-mechanism QF: Gitcoin **sunset the Grants Stack** infrastructure in **May 2025** (QF operations migrated to Giveth and mechanism-specific platforms), and **GG24** (donation window **2025-10-14 → 28**) launched **"Gitcoin 3.0"** — a *plural, multi-mechanism* funding model organized around six thematic domains rather than QF alone; identity/Sybil tooling now lives under **Human Passport**. Ironically, the largest QF deployer became *more* plural in exactly the [[concepts/plurality|Plurality]] sense — QF is now one mechanism among several, not the whole product. ([Gitcoin Grants 24](https://gitcoin.co/campaigns/gitcoin-grants-24-gg24), [Gitcoin review 2026](https://cryptoadventure.com/gitcoin-review-2026-grants-human-passport-and-public-goods-funding/))

## AI-mediated deliberation — the 2024–26 frontier of the deliberation half

The deliberation half of Plurality has a new operational layer: **[[concepts/ai-mediated-deliberation]]** — using LLMs to cluster, translate, and synthesize population-scale open-ended input (Polis → **Talk to the City**), and even to *draft* the consensus statement (DeepMind's **Habermas Machine**, *Science* 2024, which out-scored human mediators across >5,700 UK participants). Taiwan's **MODA Alignment Assemblies** already run this in real policy processes, and Japan's **Team Mirai** built its 2026 electoral breakthrough on AI "broadlistening." This is where the [[concepts/plurality|Plurality]] deliberation lineage fuses with the AI-agent stack ([[synthesis/open-weight-llm-agent-stack-six-region]]) — and inherits its risk: whoever owns the mediating model can shape the "consensus" it surfaces. See [[concepts/ai-mediated-deliberation]] for the full mechanism, six-region read, and capture-risk analysis.

## Two parallel implementations

[[sources/plurality-audrey-tang-sampras-2025]] frames two complementary expressions of the Plurality impulse:

1. **Civic-tech OpenGov** — transparency, civic participation, accountability between governments and citizens; [[entities/audrey-tang]]'s lineage of work in Taiwan (g0v, vTaiwan, Polis, Join).
2. **On-chain OpenGov** — token-/conviction-weighted, self-upgrading governance as implemented by [[entities/polkadot]]; transparent by virtue of the blockchain.

Both reject centralized governance but differ on emphasis: institutional reform vs. technical decentralization.

## Six-region read (水平展開)

Where the *plural-governance* practice actually runs (honest-N/A noted):

| Region | Deployment | Maturity |
|---|---|---|
| **Taiwan** | vTaiwan / Join / Polis institutionalized in **MODA** | most mature institutional adoption |
| **US** | RadicalxChange + Gitcoin QF (crypto public goods); Colorado used **STAR/Quadratic-style** experiments | strong in crypto, niche in government |
| **Europe** | Decidim (Barcelona), CONSUL, EU Conference on the Future of Europe; QF in some city budgets | municipal-led, regulation-friendly |
| **Korea** | Seoul mVoting / Democracy Seoul participatory budgeting | municipal e-participation |
| **Japan** | "Digital Democracy 2030" + **[[entities/audrey-tang|Team Mirai]]** (Takahiro Anno) — explicitly *Plurality*-inspired party running on AI "broadlistening"; **1 House of Councillors seat (2025) → 11 House of Representatives seats (2026-02, 3.97 M votes / 6.9%)** | **parliamentary force** — the model reached, then scaled inside, a foreign national legislature |
| **China** | N/A — consultative e-gov portals only; open deliberation is structurally excluded | not applicable by design |

## Connections beyond the blog

- [[concepts/dsnp]] — applies plural governance to social graphs (user-owned, portable, multi-platform)
- [[entities/project-liberty]] — funds Plurality-aligned research (Tang is a Senior Fellow)
- [[entities/frequency]] — the chain that hosts the user-owned-social layer
- [[entities/polkadot]] OpenGov — closest Web3 governance analog cited
- [[concepts/proof-of-personhood]] — QV/QF and one-human-one-vote both require Sybil-resistant personhood to work

## Long-horizon view (scenario / projection)

If AI agents make text-based discourse untrustworthy, the *deliberation and plural-funding* mechanisms above become candidate century-scale civic infrastructure — but every one of them (QV, QF, one-human-one-vote) collapses without robust [[concepts/proof-of-personhood]]: you cannot do quadratic voting if one actor can mint a thousand identities. So Plurality's long-run viability is welded to the personhood problem, which is exactly why Polkadot's PoP and Plurality appear in the same intellectual orbit.

## Source

- Book repo: https://github.com/pluralitybook/plurality (open-source; *Plurality*, 2024-05-20)
- Ingested via [[sources/plurality-audrey-tang-sampras-2025]]

## Related

- [[concepts/ai-mediated-deliberation]] — the LLM-era operational layer of the deliberation half
- [[concepts/dsnp]]
- [[entities/audrey-tang]]
- [[entities/glen-weyl]]
- [[entities/project-liberty]]
- [[entities/frequency]]
- [[entities/polkadot]]
- [[concepts/proof-of-personhood]]
- [[synthesis/digital-democracy-user-owned-social-six-region]]
