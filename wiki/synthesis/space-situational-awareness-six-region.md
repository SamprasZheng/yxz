---
type: synthesis
tags: [ssa, sda, conjunction, space-debris, cdm, six-region, kessler, tracss, eu-sst, jaxa, kasi, apsco, mission-desk, firefly]
sources:
  - "[[sources/tracss-oasis-announcement-2024]]"
  - "[[sources/space-track-cdm-api-2023]]"
concepts:
  - "[[concepts/conjunction-screening-providers]]"
  - "[[concepts/cdm-conjunction-data-message]]"
  - "[[concepts/pc-probability-of-collision]]"
---

# Space Situational Awareness — Six-Region Map (台美日韓中國歐洲) + the 100-Year Kessler View

Who actually *sees* the orbital environment, by region — and why the question of **who holds the authoritative catalog** is becoming a sovereignty question on the scale that GPS once was. The wiki's existing conjunction/SDA pages ([[concepts/conjunction-screening-providers]], [[entities/space-track-19sds]], [[entities/18-sds]], [[entities/leolabs]], [[synthesis/cdm-pc-decisioning]]) are almost entirely **US + US-commercial centric** — natural, because the [[entities/18-sds|18 SDS]] catalog is the only *legally authoritative* CDM source on Earth. This page adds the layer those pages were missing: the **national/governmental SSA infrastructure of all six regions**, the three competing governance models, and the long-horizon structural view in which SSA becomes a permanent planetary utility. Sibling of the corpus's other six-region maps ([[synthesis/orbital-data-center-six-region]], [[synthesis/radiation-test-rad-hard-six-region]], [[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/agentic-payments-six-region]], [[synthesis/polkadot-2026-jam-tokenomics-six-region]]).

> **繁體中文摘要**
> 本頁補上現有「近接/太空態勢感知（SSA）」頁面缺少的一塊：六地域（台美日韓中國歐洲）的**國家級太空監視基礎設施**比較。核心論點：全球唯一**具法律權威**的接近資料（CDM）來源仍是美國太空軍（18/19 SDS，經 Space-Track.org；民用正轉移至商務部 TraCSS）；歐洲走**聯邦協調**路線（EU SST 夥伴關係 15→19 國，整合 GESTRA／GRAVES／TIRA 等國家雷達）；中國走**主權＋多邊**路線（CNSA 碎片中心＋APSCO 的 APOSOS 光學網，資料不公開）；日本軍民並進、2023–2026 快速擴建（Kamisaibara 雷達＋Bisei 光學＋2025/03 新雷達＋FY2026 SDA 衛星）；韓國以天文機構（KASI／OWL-Net 五站光學網）為主、雷達仍待建；台灣civil（TASA）尚無專屬 SSA 雷達，僅有鋪龍 PAVE PAWS 預警雷達兼測、實質為美國 SDA 與商業資料的**消費者**，利基在算力與狀態向量。長期（~100 年）結構觀：即使今天停止所有發射，碎片仍將增長 200 年以上（ESA 2025），Kessler 級聯使「目錄權威歸誰」成為主權問題；可追蹤靈敏度下限（~5–10 cm）以下的「致命但不可追蹤」1–10 cm 族群，是 SSA 永恆的前沿。

## 1. The Six-Region Table — National SSA/SST Infrastructure

| Region | Lead org(s) | Flagship sensors (dated) | Catalog role | Governance model |
|---|---|---|---|---|
| **台 Taiwan** | TASA (civil); MND (defense) | **AN/FPS-115 PAVE PAWS** early-warning radar (Leshan/Loshan; activated 2013; missile-defense, *incidentally* tracks objects over China); **no dedicated SSA radar or public catalog** | **Consumer** of US SDA + commercial data; niche in compute / state-vector production | Defense dual-use; civil SSA nascent (★☆☆☆☆) |
| **美 US** | USSF Space Delta 2 — [[entities/18-sds]] (catalog) + 19 SDS (conjunction assessment); DoC OSC [[sources/tracss-oasis-announcement-2024]] (civil) | **SSN** ~30 sensors; **Space Fence** (Kwajalein, op. 2020, ~5 cm LEO); GEODSS optical; Cobra Dane | **Authoritative** global catalog (>40,000 tracked, ESA 2025); **sole legally-authoritative CDM source** | Military-origin, civilianizing via TraCSS (★★★★★) |
| **日 Japan** | JAXA (civil) + MoD/JASDF Space Operations (military) | **Kamisaibara radar** (LEO 200–1,000 km) + **Bisei optical** (GEO), STCC Tsukuba analysis; **new Sanyo-Onoda radar op. 2025-03**; laser ranging + dedicated **SDA satellite both FY2026** | National catalog for Japanese assets; ops system live since 2023-03 | Civil-military split; rapid 2023→2026 military build-out (★★★★☆) |
| **韓 Korea** | KASI (Korea Astronomy & Space Science Institute) / NSSAO (national SSA org) | **OWL-Net** — 5 robotic optical observatories (Mongolia, Morocco, Israel, US, Korea; op. 2018; 0.5 m); **2D space-surveillance radar in development** | Tracks ~11 Korean LEO sats + GEO over peninsula; building radar tier | Civil astronomy-institute led; radar gap (★★☆☆☆) |
| **中 China** | CNSA **Space Debris Observation & Data Application Center** (NAOC, Beijing); APSCO/APOSOS; PLA-SSF military network | **APOSOS** 15 cm optical nodes across APSCO members + Beijing data center; large undisclosed military radar/optical network; claimed near-full LEO+GEO coverage (Lowy Institute) | **Sovereign** catalog (not public); multilateral reach via APSCO | State + multilateral (APSCO); opaque (★★★★☆ capability / data closed) |
| **歐 Europe** | **EU SST Partnership** (EUSPA front desk) + ESA Space Safety Programme | **GESTRA** (Germany, Fraunhofer FHR, in service **2024-01**, ≤3,000 km, >200 obj/hr); **GRAVES** (France, ≤1,000 km); **TIRA** (Germany, L-band track + Ku imaging); networked national radars + telescopes | EU catalog via *networked* national assets; collision-avoidance / re-entry / fragmentation services | **Federated / coordination** model; **15→19** members (Belgium/Bulgaria/Lithuania/Luxembourg approved 2025-12-17) (★★★★☆) |

## 2. Three Governance Models — the Real Story

The capability rankings matter less than the **three structurally different bets on who holds the gate** — a direct parallel to the radiation-test finding ([[synthesis/radiation-test-rad-hard-six-region]]) that "US leads but calls itself fragile, China is sovereign-by-sanction, Europe wins on coordination."

1. **US — authoritative-but-militarily-originated.** The 18/19 SDS catalog is the only CDM source with *legal* standing for US-licensed satellites, and de-facto the global default ([[entities/space-track-19sds]]). The strategic move of the decade is **civilianization**: handing routine conjunction screening to the DoC Office of Space Commerce via [[sources/tracss-oasis-announcement-2024|TraCSS]] (17 pilot users Feb 2026; production target 2026) so the military keeps the SDA mission while a civil agency owns space-traffic management. Single point of authority; single point of failure.
2. **Europe — federated coordination.** No single European sensor rivals the SSN, but the **EU SST Partnership networks 15 (→19) national assets** — GESTRA, GRAVES, TIRA, optical telescopes — behind one front desk delivering collision-avoidance, re-entry, and fragmentation services. The bet: *coordination beats raw capacity*. This is the same ECIF-style federated model Europe uses for radiation testing — the continent's signature institutional form.
3. **China — sovereign + multilateral, data-closed.** A domestic CNSA debris center (NAOC Beijing) plus the **APSCO/APOSOS** optical network gives Beijing both a national catalog and a multilateral footprint spanning Asia and South America — but the catalog is **not public**, the inverse of Space-Track's open posture. Sovereign capability with closed data is itself a strategic position.

Japan (civil JAXA + a fast military build-out), Korea (astronomy-institute-led, radar-deferred), and Taiwan (a consumer with a compute niche) sit *between* these poles and are the three regions most likely to re-align over the next decade — the CommonWealth/Taipei-Times argument that **Japan + Korea + Taiwan should pool ground + in-orbit sensors + compute to augment US SDA** is exactly a bet on which of the three models the Indo-Pacific democracies adopt.

## 3. Where Taiwan Actually Sits (and the compute niche)

Taiwan has **no dedicated civil SSA radar and no public catalog**. Its only space-tracking-capable asset is the **PAVE PAWS (AN/FPS-115)** missile early-warning radar at Leshan — built for ballistic-missile defense, it incidentally tracks objects in the space above China, but it is an MND asset, not a TASA SSA instrument. This mirrors the wiki's recurring Taiwan finding for [[entities/nspo|TASA/NSPO]] across domains: **upstream-strong / midstream-absent** ([[synthesis/leo-taiwan-odc-gap]], [[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/radiation-test-rad-hard-six-region]]).

The realistic Taiwan play is **not** another radar but the **compute + state-vector layer**: producing the orbit-determination products, conjunction-screening compute, and AI triage (the Spacesharks Mission Desk verb in [[synthesis/cdm-pc-decisioning]]) that every regional sensor owner needs and few want to build — the same "midstream-C / compute" gap identified for orbital data centers ([[synthesis/orbital-data-center-six-region]]). SSA is where Taiwan's [[concepts/orbital-data-center|ODC]] ambition and its [[concepts/leo-value-chain|LEO supply-chain]] role could actually converge.

## 4. The 100-Year Structural View (labelled scenario, not fact)

SSA is the rare space domain where the **long-horizon constraint is a settled physical result**, not a projection: the [[synthesis/orbital-data-center-six-region|σT⁴ heat ceiling]]'s conceptual cousin here is the **Kessler cascade** (Kessler & Cour-Palais, *JGR* 1978) — above a critical density, collisions create fragments faster than atmospheric drag removes them, and the debris population self-sustains.

**Anchored facts (ESA *Space Environment Report 2025*):** >40,000 objects tracked; MASTER-8 models **~54,000 objects >10 cm** and **>1.2 million >1 cm**; ~9,300 active payloads; at ~550 km the debris-threat count is now **the same order of magnitude as active satellites**; >3,000 tracked objects were added in 2024 alone, largely from fragmentation. The report's structural finding: **even if all launches stopped today, the orbital population would keep growing for 200+ years** — debris is created faster than it decays. Active debris removal (ADR), not just mitigation, is the only path to a stable environment.

| Horizon | Scenario (labelled projection) |
|---|---|
| **~2030s** | TraCSS production + EU SST expansion + Japan FY2026 SDA satellite + Korean radar mature the three governance models in parallel. The **1–10 cm "deadly-but-untrackable" gap** (below the ~5–10 cm sensor floor, above the lethal-energy threshold) becomes the explicit SSA frontier; commercial radar (LeoLabs RANGER) + space-based optical (Vyoma, Korea) push the floor down. |
| **~2050s** | Either (a) a **converged international catalog** (TraCSS + EU SST + an opened Chinese/APSCO feed under a UN/IADC-brokered STM regime), or (b) a **multipolar catalog** world — US, EU SST, China/APSCO each authoritative inside their bloc, with no shared truth. The choice is political, not technical; (b) is the current trajectory. |
| **~2100** | If ADR scales: a managed, instrumented orbital commons with SSA as a **permanent planetary utility** (the GPS analogy — invisible, assumed, sovereignty-laden). If ADR fails: Kessler-locked shells at the most-used altitudes (~550–900 km), with SSA reduced to *managing exclusion zones* rather than enabling traffic. The invariant: **tracking sensitivity must out-run fragment creation, forever** — the catalog is never "done." |

**Invariant that bounds the century:** the lethal-fragment population is physically fixed once created (no σT⁴-style escape), and sensor sensitivity always lags the debris size that can kill a satellite — so the "toll booth never closes," exactly as in the [[synthesis/radiation-test-rad-hard-six-region|radiation-qualification]] long view.

## 5. Falsifier Table

| Claim in this synthesis | What would falsify it | Status (2026-06) |
|---|---|---|
| Space-Track / 18 SDS is the only *legally authoritative* CDM source | A non-US catalog (EU SST, China, a UN registry) gains regulatory standing for non-US operators' maneuver obligations | Holds; TraCSS is still US-DoC, not international |
| Europe's bet is coordination, not capacity | A single European sensor (e.g., a future GESTRA-class network) matches SSN catalog completeness standalone | Holds; EU SST is explicitly a *networking* programme |
| China's catalog is sovereign/closed | China publishes an open, queryable conjunction-screening API comparable to Space-Track | Holds; APOSOS data flows to APSCO members, not the public |
| Taiwan is an SSA *consumer* with a compute niche | TASA fields a dedicated civil SSA radar + public catalog | Holds; only the MND PAVE PAWS exists |
| Even zero launches → 200+ yr debris growth | A revised ESA/IADC model showing near-term net decay without ADR | Holds (ESA SER 2025) |
| The 1–10 cm "deadly gap" stays untrackable | A deployed sensor routinely catalogs sub-5 cm LEO debris at scale | Holds; commercial radar approaching but not there |

## See Also

- [[concepts/conjunction-screening-providers]] — the commercial/governmental provider comparison this page extends with the national layer
- [[entities/space-track-19sds]] — the US authoritative source (18 SDS catalog + 19 SDS CA)
- [[entities/18-sds]] — US catalog-maintenance squadron
- [[entities/leolabs]] — US commercial radar SSA (Europe's Vyoma is the rough analog)
- [[concepts/pc-probability-of-collision]] — the metric every regional catalog ultimately computes
- [[concepts/cdm-conjunction-data-message]] — the data format all six regions converge on (CCSDS 508)
- [[synthesis/cdm-pc-decisioning]] — the technical workflow companion (US-centric); this page is the geopolitical companion
- [[sources/tracss-oasis-announcement-2024]] — US civilianization of conjunction screening
- [[synthesis/orbital-data-center-six-region]] — sibling six-region map; the σT⁴ ceiling is the ODC analog of the Kessler invariant
- [[synthesis/radiation-test-rad-hard-six-region]] — sibling six-region map; the "Europe coordinates / China sovereign / toll booth never closes" structure recurs here
- [[synthesis/leo-taiwan-odc-gap]] — Taiwan upstream-strong/midstream-absent; SSA is the same gap
- [[synthesis/commercial-space-traffic-management-six-region]] — the **commercial-market** companion to this **national-infrastructure** page: who *sells* space safety by region (Slingshot/Kayhan/Astroscale/Vyoma), market models, and the STM-commercialization 100-year question

## Sources

- ESA, *ESA Space Environment Report 2025* — https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025
- EU SST / EUSPA — https://www.eusst.eu/ ; new members 2025-12-17 — https://defence-industry-space.ec.europa.eu/belgium-bulgaria-lithuania-and-luxembourg-are-set-join-eu-sst-partnership-2025-12-19_en
- Fraunhofer FHR / DLR GESTRA — https://www.dlr.de/en/ar/topics-missions/space-safety/gestra
- JAXA SSA System — https://global.jaxa.jp/projects/ssa/index.html ; Kamisaibara/Bisei — https://track.sfo.jaxa.jp/en/facilities/kamisaibara_bisei.html
- KASI OWL-Net — https://www.kasi.re.kr/eng/pageView/325 ; NSSAO — https://www.nssao.or.kr/eng/
- APSCO APOSOS — http://www.apsco.int/html/comp1/content/APOSOS/2019-03-01/59-261-1.shtml ; NAOC CNSA Space Debris Center — https://english.nao.cas.cn/research/telescopesprojects/researchprograms/202103/t20210321_265701.html ; Lowy Institute — https://www.lowyinstitute.org/the-interpreter/space-surveillance-aukus-power-awareness
- Taiwan SDA — https://english.cw.com.tw/article/article.action?id=4095 ; PAVE PAWS — https://en.wikipedia.org/wiki/PAVE_PAWS
- Kessler & Cour-Palais (1978), *Collision Frequency of Artificial Satellites: The Creation of a Debris Belt*, JGR 83(A6)
