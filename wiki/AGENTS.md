# LLM Wiki Schema

This file is the **schema** for the Obsidian-compatible wiki under `wiki/`. It is the configuration document an LLM agent reads at the start of a wiki session.

Upstream pattern: [Karpathy, *LLM Wiki* (gist `442a6bf555914893e9891c11519de94f`)](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The conventions below are this repo's concrete instantiation of that pattern — adapted for Sampras's cross-domain RF / Polkadot / space / radiation / AI-agents knowledge base and the Spacesharks + Firefly mission-desk agents that consume it.

## Three-Layer Mental Model

The wiki is the middle layer between immutable raw inputs and durable answers.

| Layer | What it is | Files |
|---|---|---|
| **Raw sources** | Immutable inputs (papers, articles, PDFs, screenshots, user briefings, blog posts) | external; ingested *into* `sources/` but the originals are not stored in the wiki |
| **The wiki** | LLM-maintained markdown the agent reads and writes on every session | everything under `wiki/` |
| **The schema** | This file (`wiki/AGENTS.md`) — directory layout, frontmatter, workflows | `wiki/AGENTS.md` |

Karpathy's core insight applies: *the tedious part of maintaining a knowledge base is not the reading or the thinking — it is the bookkeeping*. LLMs are good at bookkeeping. They touch 10–15 pages per ingest without forgetting cross-references; humans do not.

## Directory Layout

```text
wiki/
  sources/      one page per ingested source (paper, article, briefing, runbook)
  entities/     people, organizations, products, projects, programs
  concepts/     ideas, techniques, methodologies, frameworks, standards
  synthesis/    cross-source analyses, decision guides, durable query answers
  index.md      catalog of all pages, maintained by the LLM
  log.md        append-only session history (parseable timestamps)
```

`index.md` and `log.md` are **navigation files** and must stay current. Every page created or substantially updated requires a one-line `index.md` entry and a one-line `log.md` mention.

## Three Operations

Every wiki session is one (or a mix) of these three operations.

### 1. Ingest

Read a new source, integrate it, update everything it touches.

1. Read or research the source.
2. Write `sources/<slug>.md`.
3. Update or create related `entities/` and `concepts/` pages where there is substantive new information. **Expect to touch 10–15 pages per substantive source** — that is the pattern working, not scope creep.
4. Flag contradictions inline on the *older* page (see "Contradiction Handling" below); never silently overwrite.
5. Write or extend a `synthesis/` page if the ingest enables a cross-source claim that a query could ask later.
6. Update `index.md` (every new page listed under its section).
7. Append to `log.md` (one paragraph: scope, confirmed facts, unconfirmed flags, pages touched, rate-limit hits).
8. Run `cd my-website && yarn lint:wiki`.

### 2. Query

Answer a user question against the wiki, then file the answer so the wiki compounds.

1. Search existing pages first — never re-derive from raw sources if a `concepts/` or `synthesis/` page already covers the answer.
2. Walk the wikilink graph rather than re-grepping: a good `concepts/` page already points at the relevant `sources/` and `entities/`.
3. If the answer is durable (would be useful to a future reader), file it as `synthesis/<name>.md` and add the index entry. Chat-only answers evaporate; synthesis pages compound.
4. If the answer reveals a missing source or stale claim, raise it explicitly — that becomes the next ingest or lint task.

### 3. Lint

Periodic health check. Run before wiki-heavy commits and at least weekly via the `Weekly Wiki Lint` GitHub Action.

Mechanical lint (script-enforced):

```bash
cd my-website
yarn lint:wiki
# or, stricter:
yarn lint:wiki --strict-index
```

Checks include: required frontmatter, source metadata fields, folder/type consistency, broken wikilinks, internal markdown links that should be wikilinks, pages missing from `wiki/index.md` (warning by default, failure under `--strict-index`).

LLM-pass lint (judgment-enforced; run when the agent has spare context):

- **Contradictions** — search for `Contradicted` callouts; confirm both claims still appear correct.
- **Stale claims** — a fact dated > 6 months that the user has since corrected in chat? Update it.
- **Orphans** — pages with zero incoming wikilinks. Either link them from a hub page or delete them.
- **Missing links** — a name or concept mentioned in plain text that already has a page? Convert to `[[wikilink]]`.
- **Data gaps** — a `concepts/` page that should have a source but doesn't? Note in `log.md` as a future ingest task.

## Linking Convention

Use Obsidian wikilink syntax for internal references:

```text
[[path/to/page]]
[[path/to/page|display text]]
```

Do **not** use markdown hyperlinks for internal wiki pages. External source URLs may use markdown links.

## Frontmatter Convention

Every page must have:

```yaml
---
type: source | entity | concept | synthesis
tags: [tag1, tag2]
---
```

Source pages additionally require:

```yaml
title: "..."
author: "..."
date: "YYYY-MM-DD"
ingested: "YYYY-MM-DD"
```

Synthesis pages may optionally list the `sources:` and `concepts:` they draw on as YAML arrays of wikilinks — useful for Dataview queries and the Obsidian graph view.

## Synthesis Layer — The Compounding Output

Synthesis pages are the wiki's **output layer**. Sources and concepts are intermediate; synthesis is what makes the wiki valuable to a future reader, an agent, or a blog post. Karpathy: *good answers to user questions should be filed as `synthesis/<name>.md` — they compound into the wiki instead of disappearing into chat history.*

If you are starting a session and a query touches any of the domains below, **read the matching synthesis page first** before writing anything new. Duplicating synthesis content is the most common way the wiki degrades.

Current synthesis pages (keep this list in sync when adding a new one):

- `[[synthesis/spacesharks-mission-desk-hackathon-plan]]` — NVIDIA Agent Challenge 2026 entry; satellite-lifecycle decision co-pilot on Nemotron + Hermes + NemoClaw. Canonical for hackathon scope, build plan, decision verbs.
- `[[synthesis/spacesharks-trust-stack]]` — Companion to the Mission Desk plan. Four interlocking trust layers (data / model / decision / system) operationalised by small-model ensemble, tiered inference, calibrated confidence, agentic provenance. Canonical for "why should the agent's output be trusted."
- `[[synthesis/cdm-pc-decisioning]]` — End-to-end CDM → Pc → maneuver decision workflow with NASA CARA thresholds and the public-Space-Track MVP recipe. Canonical for the conjunction triage verb.
- `[[synthesis/faa-notam-launch-lifecycle]]` — Full FAA NOTAM lifecycle, AHA vs TFR, USCG NOTMAR, slip-probability scoring. Canonical for the launch-slip verb.
- `[[synthesis/fcc-ibfs-filings-coordination]]` — FCC IBFS + Schedule S + ITU EPFD pipeline; Starlink/Kuiper/AST rulings; public-data MVP. Canonical for the interference-attribution verb.
- `[[synthesis/leo-taiwan-odc-gap]]` — Taiwan "strong upstream, absent midstream C" structural gap; ODC commercialization window. Canonical for Taiwan supply-chain investment framing.
- `[[synthesis/sampras-2026-engineering-thesis]]` — AI × Space × Crypto × RF × Radiation integrated thesis; 2026 convergence triggers and falsifiability table. Canonical for cross-domain personal-roadmap framing.
- `[[synthesis/phased-array-rf-frontend-supply-chain]]` — Six-region (US/Japan/Korea/China/Europe/Taiwan) supply-chain map of the phased-array RF front-end stack (beamformer IC → GaN PA → module → array integration → space-grade transmitter). Canonical for "who leads the AESA/SATCOM RF front-end and where Taiwan sits"; component-level companion to the LEO Taiwan ODC gap.
- `[[synthesis/rf-transmitter-acceptance-layer-six-region]]` — **Mixed-signal + verification companion** to the front-end map. The three sub-layers that *certify* (not fab) a transmitter: (A) transceiver/data-converter IC, (B) DFE/DPD IP, (C) T&M instrument. EVM ceiling as the ship/no-ship gate (3GPP TS 38.104 256-QAM ≤3.5%); Keysight+R&S+Anritsu >50% VSA-market chokepoint; US owns all three, Taiwan owns none. Canonical for "who can independently *certify* a high-order-QAM/APSK transmitter by region"; welds the six-region tables on zero-if-transmitter/evm-calibration/dpd-digital-predistortion into one acceptance-gate view.
- `[[synthesis/polkadot-2026-jam-tokenomics-six-region]]` — Unifying frame for Polkadot's 2026 thesis (JAM architecture + DOT hard-cap tokenomics + coretime burn + Proof-of-Personhood), the six-region adoption map, and the shared long-horizon "fee-funded security" question. Canonical for "how do Polkadot's 2026 protocol/monetary/identity moves fit together and where does each region sit."
- `[[synthesis/polkadot-interoperability-defi-coretime-app-layer]]` — **App-layer companion** to the Polkadot tokenomics synthesis. Polkadot's three application pillars in 2026: interoperability (XCM v5 intra-ecosystem + Snowbridge/Hyperbridge external bridges, with the 2026-04 Hyperbridge exploit as the canonical "bridge-risk reintroduction" lesson), DeFi (Hydration Omnipool + Aave-v3 money market + HOLLAR over-collateralised stablecoin = Polkadot's largest DeFi protocol), and the coretime market (RegionX trustless secondary market over Agile Coretime, live on mainnet SDK 2509). Comparative scorecard vs LayerZero/CCIP, Uniswap+Aave+Maker, Ethereum blobspace/AWS-RI; honest-N/A six-region read; shared 100-year "trust-minimised vs convenient" fork. Canonical for "what runs *on* Polkadot and how each app pillar compares to its non-Polkadot rival."
- `[[synthesis/orbital-data-center-six-region]]` — Six-region (台美日韓中國歐洲) map of orbital data centers: US leads on capability-per-node (Starcloud H100 + first in-orbit LLM training, Google Suncatcher TPU), China on deployed scale (ADA Space + Zhejiang Lab Three-Body / Star-Compute constellation), Europe on net-zero + sovereignty economics (Thales ASCEND), Japan on optical relay/edge fabric (Space Compass), Korea on bus/SAR/AI-analytics supply (Hanwha/KARI), Taiwan upstream-strong/midstream-C-absent. IEA 415→945 TWh demand anchor; σT⁴ heat-rejection as the binding constraint and 100-year ceiling; falsifier table. Canonical for "who leads orbital compute by region and why heat rejection (not energy) bounds the long view"; global companion to the Taiwan-specific leo-taiwan-odc-gap.
- `[[synthesis/agentic-payments-six-region]]` — Six-region (台美日韓中國歐洲) map of agentic payments + the 100-year micropayment question. US leads on open protocols, China on real volume, Japan/Korea/Europe/Taiwan on bank-led sovereign stablecoins; GENIUS Act/MiCA/FSA/FSC regulatory layer; x402-Foundation→Linux-Foundation governance; Szabo-1999 mental-transaction-cost lineage and the machine-payer inversion. Canonical for "who leads agentic commerce by region and why the micropayment dream might finally clear."
- `[[synthesis/space-situational-awareness-six-region]]` — Six-region (台美日韓中國歐洲) map of national Space Situational Awareness / Space Surveillance & Tracking infrastructure: US authoritative-but-militarily-originated (18/19 SDS catalog, civilianizing via TraCSS; SSN + Space Fence), Europe federated-coordination (EU SST Partnership 15→19 members; GESTRA/GRAVES/TIRA), China sovereign + multilateral but data-closed (CNSA NAOC debris center + APSCO/APOSOS), Japan civil-military fast build-out (JAXA Kamisaibara/Bisei + SDA satellite FY2026), Korea astronomy-institute led with a radar gap (KASI OWL-Net), Taiwan consumer + compute niche (PAVE PAWS incidental only). Three governance models (authoritative / federated / sovereign-closed); ESA SER 2025 debris anchor; Kessler cascade + the 1–10 cm "deadly-but-untrackable" gap as the 100-year invariant; falsifier table. Canonical for "who runs the SSA catalogs by region and why catalog authority is a sovereignty question"; geopolitical companion to [[synthesis/cdm-pc-decisioning]] (which is the US-centric technical workflow).
- `[[synthesis/open-weight-llm-agent-stack-six-region]]` — Six-region (台美日韓中國歐洲) map of open-weight foundation models + agent stacks: by 2026 the **open-weight** frontier is China-led (Kimi K2.6 ~54, DeepSeek V4, Qwen, GLM, Xiaomi MiMo; ~45% OpenRouter traffic; 17.1% > US 15.86% of downloads) while the **closed** frontier stays US-led (Claude/GPT/Gemini); US plays open-as-funnel/closed-as-moat (Llama 4, Nemotron 3 Ultra ~48, gpt-oss, Gemma), Europe regulated-sovereignty (Mistral, OpenEuroLLM), Japan/Korea state-funded linguistic sovereignty, Taiwan upstream-strong/midstream-absent (Llama-localization wrappers only). Three strategies (open-as-strategy / open-as-funnel / state-funded linguistic-sovereignty); linguistic-sovereignty + compute-vs-openness 100-year invariants; falsifier table. Canonical for "who builds the open-weight models an agent stack runs on, by region"; AI-layer sibling of the ODC/radiation/SSA/agentic-payments/Polkadot/phased-array six-region maps; model-layer instance of the leo-taiwan-odc-gap pattern.
- `[[synthesis/space-regulatory-regimes-six-region]]` — Six-region (台美日韓中國歐洲) map of space regulation across two axes: launch authorization (nationally divergent — FAA AST / China-state / Japan Space Activities Act / Korea KASA / Europe FSOA+SIA+EU-Space-Act / Taiwan SDA-TASA) and spectrum/orbital-slot coordination (nationally filed but globally convergent at the ITU — FCC/MIIT/MIC/MSIT/national-EU/NCC). Three governance models (mature-independent-commercial / state-directed / civil-building-or-federated); ITU first-come-first-served × finite orbital slots as the institutional 100-year "orbital enclosure" invariant; WRC-23 milestone/BIU + WRC-27 EPFD-study; China's ~193k-satellite ITU filings as FCFS taken to the limit; falsifier table. Canonical for "who regulates launch and spectrum by region and why spectrum (not launch) carries the long-horizon scarcity"; institutional companion to the US-centric [[synthesis/faa-notam-launch-lifecycle]] + [[synthesis/fcc-ibfs-filings-coordination]] and the regulatory-layer sibling of the ODC/SSA/radiation/phased-array six-region maps.
- `[[synthesis/space-launch-airspace-integration-six-region]]` — Six-region (台美日韓中國歐洲) map of the **third regulatory axis**: space-launch **airspace deconfliction** (NOTAM / Aircraft-Hazard-Area layer), distinct from launch-authorization and ITU-spectrum. Nationally executed but globally harmonized at **ICAO Annex 15 / PANS-AIM (Doc 10066)** — the air-navigation parallel to the EPFD single-global-standard pattern. US authoritative-and-integrating (FAA NMS, CSINAS Time-Based Procedures, SDI dynamic corridors), Europe federated-but-pooled (EUROCONTROL EAD + national ANSPs, Temporary Danger Areas), China sovereign-opaque (CAAC short-notice land-overflight closures), Japan JCAB/RJJJ, Korea KOCA/RKRR (DPRK-dominated), Taiwan CAA/RCAA = recipient-not-originator. Three governance models; air-and-orbit-share-the-vertical-column 100-year invariant + static-closure→dynamic-machine-readable-hazard-volume trajectory; falsifier table. Canonical for "who keeps aircraft out of a rocket's debris path by region and why this axis is an ICAO commons"; air-navigation companion to faa-notam-launch-lifecycle + space-regulatory-regimes-six-region.
- `[[synthesis/space-weather-forecasting-six-region]]` — Six-region (台美日韓中國歐洲) map of operational space-weather *forecasting* centers: US flagship-authoritative (NOAA SWPC + 557th WW; ISES flagship), Europe federated (ESA SWESNET + Met Office MOSWOC + PECASUS), China sovereign-large-but-closed (NSSC/CMA + Meridian Project Phase II), Japan NICT (since 1949; ACFJ), Korea KSWC/RRA, Taiwan CWA-SWOO + COSMIC-2 ionospheric sensing (upstream-strong/midstream-absent). Three governance models + the unique ICAO four-global-center rotating structure; the **inverse** of the spectrum/SSA enclosure dynamic ("you cannot nationalize the Sun"); 100-year invariant = fixed solar clocks + Carrington ~12%/decade + shared L1/L5 vantage; falsifier table. Canonical for "who runs the forecast centers by region and why this domain is pooled, not enclosed"; heliophysics sibling of radiation-test-rad-hard-six-region and the operational-forecasting companion to the SWPC feed/index concept pages.
- `[[synthesis/llm-satellite-operations-six-region]]` — Six-region (台美日韓中國歐洲) map of the applied AI-agent/LLM-for-satellite-operations software layer (ops copilots / autonomy / anomaly / NetOps-SDA agents — distinct from base models and tracking sensors). US leads deployment via defense-funded vertical SDA copilots (MSBAI OrbitGuard JEPA+MARL, Lockheed iSpace, Cognitive Space/Slingshot/Kayhan/Privateer) despite a thin LLM-reasoning layer; China builds sovereign full-stack autonomy outside US export controls (2026-05 "Air Target Agent System" on Huawei Ascend, autonomous-action-without-human-handoff; SCNOC-Agentic NetOps; Three-Body in-orbit AI); Europe agency-anchored on-board autonomy (AIKO, ESA/Thales/CNES, no LLM layer); Japan sovereign-reconnaissance/RPO (Synspective+JAXA, Astroscale); Korea AI-on-imagery+edge (Hanwha, TelePIX); Taiwan upstream-supply/midstream-absent (Spacesharks the de-facto entry). Three strategy archetypes; the **data-access asymmetry (not model access) = the moat** thesis tied to catalog authority; 100-year democratized-vs-enclosed fork + autonomy-escalation governance question; falsifier table. Canonical for "who builds the agentic software that operates satellites by region"; applied-software sibling of open-weight-llm-agent-stack-six-region and AI-software companion to space-situational-awareness-six-region.
- `[[synthesis/agent-runtime-orchestration-six-region]]` — Six-region (台美日韓中國歐洲) map of the **agent runtime / orchestration / sandbox layer** — the middle layer between the foundation-model layer (`[[synthesis/open-weight-llm-agent-stack-six-region]]`, below) and the applied satellite-ops vertical (`[[synthesis/llm-satellite-operations-six-region]]`, above). Three sub-layers (framework/orchestration + sandbox/isolation + memory/skill-store). US open-ecosystem dominance (LangChain, MS Agent Framework, OpenAI/Claude SDKs, Nous Hermes ~188k★, NemoClaw/OpenShell), China open-as-model-funnel (Qwen-Agent/AgentScope, Coze, Dify), Europe component-specialist (E2B sandbox flagship, Pydantic AI, Haystack), Japan/Korea/Taiwan consume-and-compose. Two converging lineages (sandbox chroot→Firecracker; agent-loop ReAct→self-improving Hermes); 100-year invariant = the model commoditizes but the orchestration+memory+permission layer is where lock-in accretes; falsifier table. Canonical for "who builds the agent runtime by region and why the runtime, not the model, is the durable moat"; runtime-layer sibling of the open-weight (model) and llm-satellite-ops (applied) maps.
- `[[synthesis/firefly-nemoclaw-reference-implementation]]` — Code↔concept reconciliation for the AI-agent-runtime cluster: maps the abstract NVIDIA Agent-Challenge stack (Nemotron router / NemoClaw + OpenShell sandbox / policy presets / DGX Spark) onto the repo's actual Firefly implementation (`agents/src/firefly/llm/*`, `agents/firefly-sandbox.yaml`, `agents/nemo_workflow.yaml`). 7-layer conformance table; the dual-mode "one model, two modes" Nemotron router explained from VRAM constraints; flags the divergence that the workflow-of-record still orchestrates on Claude while the built Nemotron router is un-wired. Canonical for "is the hackathon entry actually built on the documented stack, and the one fix to make it conformant."
- `[[synthesis/digital-democracy-user-owned-social-six-region]]` — Six-region (台美日韓中國歐洲) map of the user-owned social graph (DSNP/Frequency, ActivityPub, AT Protocol) + plural collective decision-making (Plurality, Quadratic Voting/Funding, vTaiwan/Polis), welded to the shared Proof-of-Personhood dependency. US philanthropy-led (Project Liberty $500M), Taiwan civic-institutional (MODA, most mature), Europe regulation-rail (eIDAS/EUDI + ActivityPub), Korea/Japan municipal/emerging, China state-controlled. Three governance models; the 2025 falsifier = Project Liberty's People's Bid for TikTok lost to the Oracle/Silver Lake/MGX consortium; 100-year invariant = "prove unique personhood without a surveillance honeypot." Canonical for "who makes online identity/graph/choice user-owned and plural by region"; civic/social-layer sibling of the other six-region maps.
- `[[synthesis/techno-industrial-state-defense-tech-six-region]]` — Six-region (台美日韓中國歐洲) map of the defense-tech-state alliance / techno-industrial-state compact; the geopolitical/industrial-policy frame around `[[concepts/technological-republic]]`. US commercial public-private fusion (Palantir Maven/MSS, Anduril), China state-directed Military-Civil Fusion (军民融合), Europe sovereign-autonomy (Helsing), Japan/Korea re-armament with industrial muscle, Taiwan existential dual-use. Three governance models (market-led / state-mandated / threat-forged-or-federated); `[[concepts/soft-belief]]` as the per-region cultural input variable; 100-year fused-compute-and-state-power invariant + the "whose republic governs the AI" wildcard. Canonical for "who is rebuilding the public-private defense-tech compact by region"; political-economy substrate beneath the model/spectrum/ops-AI six-region maps.
- `[[synthesis/commercial-space-traffic-management-six-region]]` — Six-region (台美日韓中國歐洲) map of the **commercial** space-traffic-management / space-safety *services industry* — the third distinct frame in the SSA stack, owning the private vendor market that the national-infrastructure synthesis and the provider-comparison concept page left uncovered. Three service tiers (know SSA-data / decide conjunction-SaaS / act ADR-as-a-service) + the ops-automation adjacency. US deepest but government-anchored (TraCSS outsourcing — Slingshot Beacon ~90% LEO share, Kayhan, COMSPOC, LeoLabs; Privateer the cautionary 2025 *exit*), Europe VC+agency-pulled (Vyoma/Neuraspace/Okapi), Japan commercial-flagship in the act-tier (Astroscale, Tokyo-listed 2024, ADRAS-J 15 m RPO), Korea government-led/thin, China sovereign-folded (commercial-as-sovereignty, "TLE localization" by 2028), Taiwan consumer (Spacesharks the de-facto entry). Three market models; the 100-year STM-as-regulated-utility-vs-government-monopoly question; falsifier table. Canonical for "who *sells* space safety by region and why the customer of last resort is the state"; commercial-market companion to the national-infrastructure SSA six-region map.
- `[[synthesis/radiation-test-rad-hard-six-region]]` — Six-region (台美日韓中國歐洲) map of space radiation-test infrastructure (heavy-ion / proton SEE + Co-60 TID accelerators) and rad-hard IC supply. US leads but its own National Academies review calls capacity "fragile"; Japan deep/dual-use (HIMAC, Renesas); Europe ESA-coordinated ECIF network; China sovereign-by-sanction (HIRFL+CIAE, domestic rad-hard); Korea building hardware ahead of SEE services; Taiwan TID+proton only, heavy-ion + rad-hard IC absent. Heavy-ion SEE is the scarce bottleneck and COTS-upscreen raises beam demand; 100-year "qualification toll booth never closes" view on the GCR + rad-hard-lags-node invariants. Canonical for "who owns the accelerators and rad-hard processes that certify space chips, by region"; qualification-layer companion to phased-array-rf-frontend-supply-chain + orbital-data-center-six-region + leo-taiwan-odc-gap.

When a query lands in any of these domains, the workflow is:

1. Read the relevant synthesis page in full.
2. Read its `See also` / companion-page links.
3. Only then walk down to the underlying `concepts/` and `sources/`.
4. If your new answer extends or contradicts the synthesis page, edit it in place — don't write a parallel synthesis with overlapping scope. New synthesis pages are for new domains, not for new takes on the same domain.

## Contradiction Handling

Flag contradictions inline on the *older* page rather than silently overwriting:

```text
> **Contradicted** by [[sources/<newer-slug>]]: <brief note on the discrepancy>
```

Preserve both claims and leave the resolution to human review or to a subsequent ingest that has a third corroborating source.

## Session Startup Checklist

Run at the beginning of every wiki session:

1. Read the last 10 entries of `log.md` (`grep "^## \[" log.md | tail -10`).
2. Read `index.md`.
3. If the user's request matches a synthesis page's domain, read that synthesis page **before** searching anything else.
4. Search existing pages for the request's key entities/concepts before creating new pages.

## Tooling

| Tool | Purpose |
|---|---|
| `yarn lint:wiki` (from `my-website/`) | Mechanical lint — frontmatter, links, index coverage |
| Obsidian graph view | Visual orphan / cluster / hub detection |
| `git log -- wiki/` | Provenance — who/when changed any wiki page |
| `Weekly Wiki Lint` GitHub Action | Scheduled lint with PR-failing checks |
| Dataview (Obsidian plugin) | Frontmatter queries — e.g. "all sources tagged `polkadot` ingested in 2026" |

## When to Update This Schema

Update `wiki/AGENTS.md` when any of the following change:

- Directory layout (a new top-level folder, a folder renamed).
- Frontmatter conventions (a new required field).
- A new operation is added beyond Ingest / Query / Lint.
- The synthesis-page list grows or a synthesis page changes scope — keep the bulleted list above in sync.

Schema-only edits should be small, recorded in `log.md` as a `## [YYYY-MM-DD] schema | <title>` entry, and PR-titled `wiki(schema): ...`.
