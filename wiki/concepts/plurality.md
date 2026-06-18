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
| **Quadratic / Plural Funding (QF)** | Buterin, Hitzig & Weyl, *"Liberal Radicalism"* (2018) | matches public-goods funding by *breadth* of support, not size of donation; the math behind **Gitcoin Grants** |
| **Polis / bridging algorithms** | g0v / vTaiwan ([[entities/audrey-tang]]) | surface "rough consensus" across a population instead of amplifying the loudest poles |
| **Plural identity / connected society** | *Plurality* book | model people as overlapping group memberships, not isolated individuals — the social-graph version of the same idea |

The through-insight: *technology should widen the space of collective choice rather than narrow it*. Vitalik Buterin and the Ethereum public-goods ecosystem (Gitcoin) are the largest real-world deployers of the QF half; Taiwan's vTaiwan/Join is the largest deployer of the deliberation half.

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
| **Japan** | "Digital Democracy 2030" + AI-assisted candidate experiments | emerging, tech-led |
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

- [[concepts/dsnp]]
- [[entities/audrey-tang]]
- [[entities/glen-weyl]]
- [[entities/project-liberty]]
- [[entities/frequency]]
- [[entities/polkadot]]
- [[concepts/proof-of-personhood]]
- [[synthesis/digital-democracy-user-owned-social-six-region]]
