---
type: synthesis
tags: [ssa, stm, conjunction, space-debris, commercial-ssa, six-region, tracss, astroscale, adr, mission-desk, firefly, competitive-intel]
sources:
  - "[[sources/tracss-oasis-announcement-2024]]"
  - "[[sources/leolabs-conjunction-alerts-2025]]"
concepts:
  - "[[concepts/conjunction-screening-providers]]"
  - "[[concepts/cdm-conjunction-data-message]]"
  - "[[concepts/pc-probability-of-collision]]"
---

# Commercial Space-Traffic-Management & Space-Safety Services — Six-Region Map (台美日韓中國歐洲)

Who sells **space safety as a product**, by region — the venture-funded *private* industry that screens conjunctions, plans avoidance maneuvers, and removes debris for a fee. This is the third distinct frame in the wiki's SSA stack and the one no other page owned:

- [[synthesis/space-situational-awareness-six-region]] = the **national/governmental sensor + catalog infrastructure** (18 SDS, EU SST, JAXA, KASI, CNSA) and its governance models.
- [[concepts/conjunction-screening-providers]] = the **technical capability table** (data source, cadence, latency, cost) comparing individual providers.
- **This page** = the **commercial industry/market layer** — who the companies are by region, how they are funded, what business model they run, who their *customer of last resort* is, and the long-horizon question of whether STM becomes a regulated private utility or stays a government monopoly.

The entity pages this synthesis ties together — [[entities/slingshot-aerospace]], [[entities/kayhan-space]], [[entities/privateer-space]], [[entities/cognitive-space]] (plus [[entities/leolabs]], [[entities/aiko-space]]) — were almost entirely **US-centric**. This page adds the non-US commercial market and the market-structure read. Sibling of the corpus's other six-region maps ([[synthesis/orbital-data-center-six-region]], [[synthesis/llm-satellite-operations-six-region]], [[synthesis/radiation-test-rad-hard-six-region]], [[synthesis/phased-array-rf-frontend-supply-chain]]).

> **繁體中文摘要**
> 本頁補上 SSA 系列缺的第三塊：**商業太空交通管理（STM）/太空安全服務的產業地圖**（與「國家級基礎設施」「供應商技術比較」兩頁區隔）。核心論點：商業 STM 不是一個正常的自由市場，而是**政府錨定**的市場——美國最深，但其商業供應商（Slingshot、Kayhan、COMSPOC、LeoLabs）的「最後買家」其實是政府的 TraCSS 外包（Slingshot 拿下 1,330 萬美元做使用者介面；CASS 試點）；歐洲走**創投＋機構拉動**（Vyoma、Neuraspace、Okapi 等 AI 除錯新創，由 EU SST／EDF 合約拉出產能）；日本是**商業旗艦**（Astroscale 為全球唯一上市的純商業主動除錯 ADR 公司，2024/06 東京上市，靠 JAXA CRD2 錨定）；韓國商業層薄（KASI 主導，無專屬 STM 廠商）；中國**主權收編**（一家商業 SSA 公司目標 2028 年「TLE 本地化」以脫離美國目錄＝把商業當主權工具）；台灣是**消費者**（owner 的 Spacesharks Mission Desk 為事實上的切入點，又是「上游強、中游缺」的同一個簽名）。長期（~100 年）問題：當 Kessler「收費亭永不關閉」，STM 會變成受監管的私營公用事業，還是停留在政府壟斷？三種服務層級（知 SSA-data → 判 conjunction-SaaS → 行 ADR-as-a-service）各自的商業化速度不同。

## 1. The Three Service Tiers (know → decide → act)

Commercial space-safety is not one market but a stack of three, each at a different commercialization maturity:

| Tier | What it sells | Commercial maturity | Representative vendors |
|---|---|---|---|
| **T1 — Know (SSA data / tracking)** | Independent observations, custody, covariance-better-than-TLE | Mature; subscription | [[entities/leolabs|LeoLabs]] (radar), Vyoma / Neuraspace (optical), COMSPOC (fusion) |
| **T2 — Decide (conjunction screening + CA SaaS)** | Pc computation, alerting dashboards, maneuver planning, M2M coordination | Mature; subscription + gov contract | [[entities/slingshot-aerospace|Slingshot Beacon]], [[entities/kayhan-space|Kayhan Pathfinder/Satcat]], Okapi:Orbits, ([[entities/privateer-space|Privateer]] — *exited*) |
| **T3 — Act (active debris removal / servicing)** | Rendezvous-and-proximity ops, capture, deorbit, life-extension *as a service* | **Early**; mostly agency-funded demos | [[entities/aiko-space|AIKO]] (autonomy SW), Astroscale (ADR pure-play), ClearSpace |
| *Adjacent — Operate (AI tasking/ops automation)* | Collection scheduling, sensor management, NetOps | Mature in EO; SBIR-scale in defense | [[entities/cognitive-space|Cognitive Space]] (TRL-9 CNTIENT.Optimize) |

The wiki's owner-built [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] sits across T2 (CDM triage) and the *Operate* row, deliberately fusing signals ([[concepts/swpc-space-weather-feeds|SWPC]], [[concepts/notam-space-operations|NOTAM]], CDM) that the single-tier vendors do not.

## 2. The Six-Region Table — Commercial STM/Space-Safety Vendors

| Region | Market depth | Flagship commercial vendors (dated) | Customer-of-last-resort | Market model |
|---|---|---|---|---|
| **台 Taiwan** | Negligible | No sovereign commercial STM vendor; owner's [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] is the de-facto entry | US SDA + commercial data (consumer) | **Consumer**; upstream-strong / midstream-absent (★☆☆☆☆) |
| **美 US** | Deepest | [[entities/slingshot-aerospace|Slingshot]] (Beacon, ~90% of LEO operators; $13.3M TraCSS UI Nov-2024), [[entities/kayhan-space|Kayhan]] (Satcat/Pathfinder, ~$11M VC), COMSPOC, [[entities/leolabs|LeoLabs]], [[entities/cognitive-space|Cognitive Space]] (TRL-9, ~$5M SDA-2025); [[entities/privateer-space|Privateer]] **exited SSA** (Wayfinder cancelled 2025) | **US government (TraCSS/OSC + SDA/USSF)** — the state outsources STM to vendors | **Government-anchored commercial market** (★★★★★) |
| **日 Japan** | Flagship in T3 | **Astroscale** — only Tokyo-listed (2024-06, ¥20.1B raised) commercial ADR pure-play; ADRAS-J 15 m RPO (2024-11), ADRAS-J2 ¥12B/$82M JAXA CRD2; ELSA-M (UK) | JAXA (CRD2) + commercial deorbit demand | **Commercial flagship** (one listed pure-play) (★★★★☆ in T3 / thin in T2) |
| **歐 Europe** | Rising (VC + agency-pulled) | **Vyoma** (DE, optical+space-based, €16M+), **Neuraspace** (PT, AI-debris, optical Beja+Chile), **Okapi:Orbits** (DE, €13M seed Apr-2025), GMV (ES, won SDA SDC rebuild Mar-2026) | EU SST + EDF + ESA contracts pull capacity | **VC + agency-pulled** (★★★★☆ momentum) |
| **韓 Korea** | Thin | No dedicated commercial STM SaaS vendor; KASI (gov) leads, CONTEC (ground-services), Hanwha (bus/imagery) adjacent | Government (KASI/NSSAO) | **Government-led, commercial-thin** (★★☆☆☆) |
| **中 China** | State-folded, emerging | A commercial SSA firm reported (CASI, 2025-10) merging UDL+TraCSS-equivalent functions, aiming to **"localize the TLE" by 2028** to make China's STM independent of the US catalog | The state (commercial = sovereignty instrument) | **Sovereign-folded** (commercial-as-sovereignty-tool) (★★★☆☆) |

## 3. Three Market Models — the Real Story

The capability table matters less than **why these companies exist and who actually pays them** — and that splits three ways, echoing the governance split in [[synthesis/space-situational-awareness-six-region]] but at the *market* layer:

1. **US — government-anchored commercial market.** The deepest private STM market on Earth, but its demand floor is the **state**: [[sources/tracss-oasis-announcement-2024|TraCSS]] is explicitly an *outsourcing* architecture — the DoC Office of Space Commerce buys the UI from [[entities/slingshot-aerospace|Slingshot]] ($13.3M = $5.3M build + $8M 4-yr ops), the data feeds from [[entities/leolabs|LeoLabs]]/Slingshot/COMSPOC/[[entities/kayhan-space|Kayhan]]/SpaceNav, and the CASS conjunction-screening pilots from commercial vendors. The private market is real but its **customer of last resort is a government program**. The cautionary tale is [[entities/privateer-space|Privateer]] — $56.5M Series A, Wozniak co-founder, *exited SSA entirely* by 2025 when the standalone-commercial debris-data thesis did not pay.
2. **Europe — VC + agency-pulled.** A genuine wave of VC-funded AI-debris startups (Vyoma, Neuraspace, Okapi:Orbits) — but the demand is **pulled into being by agency programs** (EU SST front desk, European Defence Fund EMISSARY, ESA Space Safety), and GMV winning the SDA's next-gen SDC rebuild (2026-03) shows European astrodynamics houses taking *US-industry* contracts. Same federated-coordination instinct as Europe's radiation-test ([[synthesis/radiation-test-rad-hard-six-region]]) and SSA models, now expressed as a startup ecosystem rather than a single champion.
3. **Japan — commercial flagship (in the "act" tier).** Astroscale is the anomaly: the **only listed, commercially-structured ADR pure-play** at scale, anchored by JAXA's CRD2 program but pursuing a genuine *servicing-as-a-service* business (life-extension, deorbit, multi-client docking plates with Airbus). Japan skipped the crowded T2 screening market and bet the T3 "act" tier nobody else commercialized.

China (**commercial-as-sovereignty** — a "commercial" SSA firm whose actual purpose is TLE-localization independence by 2028), Korea (**government-led, commercial-thin**), and Taiwan (**consumer**, the recurring upstream-strong/midstream-absent signature — [[synthesis/leo-taiwan-odc-gap]]) sit outside the three main models.

## 4. Where Taiwan Sits — and the Mission-Desk opening

Taiwan has **no commercial STM vendor**. This is the same gap recorded across the corpus ([[synthesis/leo-taiwan-odc-gap]], [[synthesis/space-situational-awareness-six-region]] §3, [[synthesis/llm-satellite-operations-six-region]]): strong upstream components, no midstream *services/compute* layer. The realistic opening is **not** another sensor or a me-too Beacon clone but the **fusion + decision** niche the US single-tier vendors leave open — exactly the [[synthesis/spacesharks-mission-desk-hackathon-plan|Spacesharks Mission Desk]] thesis: take the commercial CDM streams (Tier 0 Space-Track → Tier 1 LeoLabs → Tier 2 Beacon, per [[synthesis/cdm-pc-decisioning]]) and add lifecycle + environmental ([[concepts/swpc-space-weather-feeds|space-weather]]) + launch ([[concepts/notam-space-operations|NOTAM]]) context that none of Slingshot/Kayhan/Privateer fuse. The commercial moat in this market is **not** the Pc integral (settled physics) but the **labeled cross-signal decision dataset** ([[synthesis/spacesharks-trust-stack]]).

## 5. The 100-Year Structural View (labelled scenario, not fact)

The physical invariant is owned by [[synthesis/space-situational-awareness-six-region]] §4: the **Kessler cascade** (Kessler & Cour-Palais 1978) means the debris population grows for 200+ years even at zero launch (ESA SER 2025), so the "toll booth never closes." This page asks the *market* question that physics forces: **does space-traffic management commercialize into a regulated private utility, or stay a government monopoly?**

| Horizon | Scenario (labelled projection) |
|---|---|
| **~2030s** | TraCSS-style outsourcing matures the **government-anchored** model in the US; EU SST + EDF keep pulling European startups; Astroscale proves (or fails to prove) ADR unit economics. The T3 "act" tier is the pivotal bet — if deorbit-as-a-service clears a price point, a genuine private debris-removal *industry* exists; if not, T3 stays agency-grant-funded. China's 2028 TLE-localization either lands (a second authoritative catalog) or slips. |
| **~2050s** | Either (a) **STM-as-regulated-utility** — licensed private CA/ADR providers operating under an ICAO/IADC-brokered regime (the air-traffic-control privatization analogy), or (b) **bloc-monopoly** — US/EU/China each run state-anchored STM inside their sphere with commercial vendors as subcontractors only. Trajectory currently favors (b)'s *anchoring* with (a)'s *vendor layer* — i.e. the US TraCSS pattern globalized. |
| **~2100** | If ADR scales and Kessler is managed: STM is a **permanent regulated industry** like marine salvage or air-traffic services — invisible, assumed, dominated by a few incumbents per bloc. If ADR fails: STM contracts to *exclusion-zone management*, a government function with thin commercial margin. The market invariant: **the only durable commercial moat is independent custody + the labeled decision dataset**, because the physics (Pc, screening volume) is public and the catalog trends toward open. |

## 6. Falsifier Table

| Claim in this synthesis | What would falsify it | Status (2026-06) |
|---|---|---|
| US commercial STM's customer-of-last-resort is the government | A US STM vendor reaches sustainable scale on purely-commercial (non-gov) revenue | Holds; TraCSS/SDA contracts anchor every major vendor; Privateer's pure-commercial SSA pivot *failed* |
| Privateer exited the SSA/debris market | Privateer relaunches Wayfinder debris as a core product | Holds (Wayfinder debris cancelled 2025; pivot to terrestrial data) |
| Astroscale is the only listed commercial ADR pure-play at scale | A second pure-play ADR company lists or matches ADRAS-J-class RPO commercially | Holds (2024-06 TSE listing; ADRAS-J 15 m RPO unmatched commercially) |
| Europe's STM commercial layer is agency-pulled, not standalone | A European STM startup scales on commercial revenue independent of EU SST/EDF/ESA | Holds; funding tracks agency programs |
| China's "commercial" SSA is a sovereignty instrument | China's commercial SSA firm sells openly to non-Chinese operators as a normal vendor | Holds (CASI: goal is TLE-localization independence by 2028) |
| Taiwan has no commercial STM vendor | A Taiwanese company fields a commercial conjunction-screening / CA / ADR product | Holds; Spacesharks Mission Desk is a project, not a fielded vendor |
| The durable moat is custody + labeled decisions, not the Pc math | A vendor wins durably on a proprietary Pc/screening algorithm alone | Holds; Pc methods (Foster/Chan/Alfano) are public, catalog trends open |

## See Also

- [[synthesis/space-situational-awareness-six-region]] — the **national-infrastructure** companion (governments/sensors/catalogs + Kessler physics); this page is the **commercial-market** companion
- [[concepts/conjunction-screening-providers]] — the technical capability table this page reads as an industry
- [[synthesis/cdm-pc-decisioning]] — the Tier-0→1→2 provider upgrade path in the Firefly workflow
- [[synthesis/llm-satellite-operations-six-region]] — sibling: the AI-ops *software* layer (Cognitive Space sits in both)
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — the owner's cross-signal fusion entry point into this market
- [[entities/slingshot-aerospace]] · [[entities/kayhan-space]] · [[entities/privateer-space]] · [[entities/cognitive-space]] · [[entities/leolabs]] · [[entities/aiko-space]] — the vendor pages this synthesis ties together
- [[synthesis/leo-taiwan-odc-gap]] — the recurring Taiwan upstream-strong/midstream-absent finding

## Sources

- Office of Space Commerce / NOAA TraCSS — https://space.commerce.gov/traffic-coordination-system-for-space-tracss/ ; Slingshot $13.3M TraCSS UI — https://space.commerce.gov/noaa-awards-tracss-presentation-layer-contract/
- Kayhan Space $7M seed extension + Satcat Suite — https://payloadspace.com/kayhan-space-closes-7m-seed-extension-updates-pathfinder/ ; https://www.kayhanspace.com/newsroom/kayhan-space-launches-satcat-product-suite-the-industrys-first-unified-space-intelligence-and-operations-platform/aid/430
- Privateer SSA pivot / Wayfinder cancelled — https://en.wikipedia.org/wiki/Privateer_Space ; https://www.factoriesinspace.com/privateer
- Astroscale Tokyo IPO + ADRAS-J / ADRAS-J2 — https://en.wikipedia.org/wiki/Astroscale ; https://spacenews.com/astroscale-finalizes-contract-for-japanese-debris-removal-mission/
- Europe: Vyoma EIF top-up — https://www.vyoma.space/news-items/vyoma-secures-an-additional-5-million-euros-from-eif-backed-space-fund ; Okapi:Orbits €13M — https://www.factoriesinspace.com/okapi ; Neuraspace — https://www.factoriesinspace.com/neuraspace
- China commercial SSA / "TLE localization" by 2028 — CASI, 2025-10 — https://www.airuniversity.af.edu/CASI/Display/Article/4315534/chinas-commercial-ssa-company-and-tle-localization/
- Cognitive Space SDA/NOAA contracts, CNTIENT TRL-9 — https://spacenews.com/cognitive-space-claims-two-sda-awards/ ; https://www.cognitivespace.com/news/cognitive-space-wins-NOAA-contract/
- ESA *Space Environment Report 2025* (Kessler anchor) — https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025
