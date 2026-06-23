---
type: synthesis
tags: [regulatory, faa, fcc, itu, spectrum, space-launch, ngso, epfd, six-region, mission-desk, firefly]
sources: ["[[sources/faa-ast-launch-licensing-2025]]", "[[sources/faa-part-450-2020]]", "[[sources/fcc-part-25-2024]]", "[[sources/fcc-space-bureau-2023]]", "[[sources/itu-radio-regulations-article-22-2023]]", "[[sources/fcc-starlink-gen2-kuiper-rulings-2022-2024]]"]
concepts: ["[[concepts/epfd-equivalent-power-flux-density]]", "[[concepts/ngso-gso-coordination]]", "[[concepts/schedule-s]]", "[[concepts/processing-round]]", "[[concepts/launch-window-slip]]", "[[concepts/notam]]"]
---

# Space Regulatory Regimes — Six-Region Map (台美日韓中國歐洲)

**繁體中文摘要：** 本頁是衛星與發射監理制度的六地域（台灣／美國／日本／韓國／中國／歐洲）比較圖，補足本維基既有 FAA（發射）與 FCC（頻譜）頁面以美國為中心的視角。太空監理分兩條主軸：**發射授權**（誰准許火箭升空、公共風險門檻）與**頻譜／軌道槽協調**（誰取得無線電頻率與軌道位置的國際權利）。後者最終都匯入唯一的全球層——**國際電信聯盟（ITU）**，其「先到先得」（first-come-first-served）規則是百年尺度的制度性稀缺根源。美國擁有最成熟的商業監理（FAA AST + FCC Part 25→提案 Part 100）；中國以國家主導、用 ITU 申報作為「圈地」工具（Guowang 12,992 顆 + 2025 年底 CTC-1/CTC-2 各 96,714 顆）；日本（2016 太空活動法，2026 修法）、韓國（2024 成立 KASA）為建制中的civil機關；歐洲為 13 國拼湊、正以《EU Space Act》（2025 提案，2030 適用）邁向協調；台灣《太空發展法》（2021）+ TASA + NCC 為起步階段，重演「上游強、中游缺」格局——零組件供應強，但無主權發射與頻譜申報能力。三種治理模式：成熟獨立監理（美）／國家主導（中）／civil機關建制或協調（日韓歐台）。百年不變量：ITU 先到先得 × 有限軌道槽／頻譜 = 「軌道圈地」風險。

---

## Why this page exists

The wiki's FAA/FCC/ITU regulatory cluster is the substrate for the [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] decision verbs *launch-slip scoring* and *interference attribution* ([[synthesis/faa-notam-launch-lifecycle]], [[synthesis/fcc-ibfs-filings-coordination]]). But every page in it is written from the **US administration's seat**: [[sources/faa-ast-launch-licensing-2025|FAA AST]] for launch, [[concepts/schedule-s|FCC Schedule S]] for spectrum, with [[sources/itu-radio-regulations-article-22-2023|ITU]] appearing only as the body the FCC files into. An orbital-data-center operator deciding *where to incorporate, where to launch from, and whose administration to file spectrum through* needs the comparative map. This is the regulatory sibling of the corpus's other six-region syntheses — [[synthesis/orbital-data-center-six-region]], [[synthesis/space-situational-awareness-six-region]], [[synthesis/radiation-test-rad-hard-six-region]], [[synthesis/phased-array-rf-frontend-supply-chain]], [[synthesis/agentic-payments-six-region]], [[synthesis/open-weight-llm-agent-stack-six-region]], [[synthesis/polkadot-2026-jam-tokenomics-six-region]] — and the institutional layer above [[synthesis/leo-taiwan-odc-gap]].

## The two regulatory axes

Space activity is gated by two **separate** legal clocks that an operator must clear independently (the Mission Desk tracks them as a `{launch_clear, spectrum_clear}` tuple — see [[synthesis/faa-notam-launch-lifecycle|§8 FCC parallel track]]):

1. **Launch / re-entry authorization** — national: who may put a vehicle into the air, under what public-safety risk ceiling (US: Expected Casualty ≤ 1×10⁻⁴ per operation, [[sources/faa-ast-launch-licensing-2025|§ 450.101]]), debris and environmental review, and operational airspace/maritime clearance ([[concepts/notam]], [[concepts/launch-window-slip]]).
2. **Spectrum + orbital-slot coordination** — national filing → **global ITU registration**: who holds the international right to a frequency band and orbital position. This axis always terminates at the ITU, which makes it the genuinely supranational part of space regulation.

The launch axis is *national and divergent*; the spectrum axis is *national in form but globally convergent* — every administration files into the **one** ITU Master Register under the **same** [[concepts/ngso-gso-coordination|API → CR → Notification]] pipeline and the **same** [[concepts/epfd-equivalent-power-flux-density|Article 22 EPFD]] limits. That asymmetry is the key to the whole map.

## Six-region comparison table

| Region | Launch / re-entry regulator (basis) | Spectrum / ITU-filing administration | Posture & 2025–26 status |
|---|---|---|---|
| **🇹🇼 Taiwan** | **TASA** under the **Space Development Act (太空發展法, 2021)** — registers launch vehicles/spacecraft, issues launch permits, building first national launch site (sounding-rocket site completed 2025); **no sovereign orbital launch yet** (Formosat-8 #1 flew on Falcon 9 from Vandenberg, 2025-11) | **NCC** (National Communications Commission) + **MODA** (Ministry of Digital Affairs) satellite-comms policy; files ITU via NCC | Nascent. Strong **component upstream**, absent **launch + spectrum-filing midstream** — the [[synthesis/leo-taiwan-odc-gap|upstream-strong/midstream-absent]] pattern repeated at the regulatory layer |
| **🇺🇸 United States** | **FAA AST** (51 U.S.C. § 50901; [[sources/faa-part-450-2020|14 CFR Part 450]]; EC ≤ 1×10⁻⁴) — 1,000th licensed op 2025-08-14 | **FCC** ([[sources/fcc-space-bureau-2023|Space Bureau]], 2023; [[concepts/schedule-s|Part 25 / Schedule S]] → proposed **Part 100**) | **Most mature commercial regime.** Carr "Space Month" Oct 2025 NPRM: Part 25→Part 100, "default-to-yes" licensing assembly line, single-Form-312 modular licensing; comments due 2026-01-20 |
| **🇯🇵 Japan** | **Cabinet Office (PM)** under the **Space Activities Act (Act No. 76 of 2016, eff. 2018)** — 3 licenses (launch vehicle / satellite control / third-party liability); **amendment approved by cabinet 2026-03-27** → "Next-Generation Transportation Services" (reuse, OOS, return) | **MIC** (Ministry of Internal Affairs & Communications) under the **Radio Act** — both ground *and* on-board stations licensed | Civil, methodical, modernizing for reusable/suborbital |
| **🇰🇷 Korea** | **KASA** (Korea AeroSpace Administration, est. **2024-05-27**) under the **Space Development Promotion Act**; **MSIT** amendment (Mar 2024) allows a single license for repeated launches of the same vehicle from the same site | **MSIT** (Ministry of Science and ICT) | Newest dedicated agency; building launch + LEO-comms demo pipeline from 2025 |
| **🇨🇳 China** | **No FAA-style independent commercial license**; launches are state activity (CASC) under **SASTIND/CNSA** + military-controlled ranges | **MIIT** (Ministry of Industry & Information Technology) files all ITU paperwork | **State-directed; ITU filing used as a land-grab.** Guowang **GW-A59 6,080 + GW-2 6,912 = 12,992** (ITU filing 2020-09); **Dec 2025 CTC-1/CTC-2, each 96,714 sats** (≈193k total); MIIT Aug 2025 guideline to "optimize business access" |
| **🇪🇺 Europe** | **Fragmented — 13 national laws.** France **FSOA** (2008, in force 2010; **CNES** technical control, Ministry of Economy grants); UK **Space Industry Act 2018** (**CAA** licenses; SaxaVord first vertical spaceport licence Dec 2023, ≤30 launches/yr); Germany etc. | **National regulators + CEPT/ECC** coordination; each state files ITU individually | Federated → **harmonizing**: **EU Space Act** proposed **2025-06-25** (authorization/registration/STM/"space label", EUSA cert ≤12 mo), **applies from 2030-01-01** |

(Region order follows the corpus convention 台美日韓中國歐洲.)

## Three governance models

The same structural trichotomy recurs across the corpus's six-region maps (cf. the SSA "authoritative / federated / sovereign-closed" split in [[synthesis/space-situational-awareness-six-region]] and the radiation "leads-but-fragile / sovereign-by-sanction / coordinated" split in [[synthesis/radiation-test-rad-hard-six-region]]):

1. **Mature independent-regulator commercial (US).** An independent agency licenses *private* launch and spectrum as a product input; the 2025–26 reform direction is explicitly *permissionless* ("default-to-yes"). The license is something a company *obtains*; the regulator's job is throughput.
2. **State-directed sovereign (China).** There is no independent commercial launch license because launch *is* the state. The ITU filing — not a domestic license — is the strategic instrument: MIIT files megaconstellation paperwork far ahead of hardware, converting the ITU's first-come rule into a frequency/slot **land claim**. This is the spectrum analog of China's "sovereign-by-sanction" rad-hard posture.
3. **Civil-agency building / federated-harmonizing (Japan, Korea, Europe, Taiwan).** Civil agencies (Cabinet Office, KASA, CNES/CAA, TASA) authorize methodically, often via brand-new institutions (KASA 2024, TASA-from-NSPO 2023) or supranational harmonization (EU Space Act). They trade speed for legal certainty and treaty compliance. Taiwan sits at the nascent end of this model — a law and an agency exist, but sovereign launch and ITU-filing muscle do not.

## The common substrate: ITU first-come-first-served

All six regions' spectrum axes converge on the ITU, and the ITU's allocation rule is the load-bearing institutional fact:

- **First-come-first-served (FCFS)**, not auction. Priority date is set by the [[concepts/ngso-gso-coordination|Advance Publication Information (API)]]; the [[concepts/epfd-equivalent-power-flux-density|EPFD]] framework lets a *single* compliant NGSO system be deemed non-interfering worldwide, which removes the brake on first-movers.
- **The "paper satellite" problem.** FCFS rewards *filing*, not flying. WRC-23 tightened the **milestone / bringing-into-use** rules: a deployment must reach **10 % / 50 % / 100 %** of the notified constellation within **2 / 5 / 7 years**, with a 90-day-continuous BIU test, **orbital tolerances** around notified values, a post-milestone mechanism, and **4-year periodic deployment reporting** (annual if the count drops below notified). WRC-23 also referred an **EPFD-limit review study to WRC-27** (without committing to regulatory change there).
- **The equity tension.** FCFS structurally favors early, well-funded, spacefaring filers; developing states have pressed the ITU's "special needs of developing countries" / equitable-access principle (Constitution Art. 44, live since the 1976 GSO-arc dispute) for guaranteed allocations. Megaconstellations — now **>65 %** of active LEO satellites — sharpen the scarcity. China's ~193k-satellite filings are FCFS taken to its logical extreme.

This is why the spectrum axis, not the launch axis, carries the long-horizon story: launch regimes diverge but are each nationally self-contained; spectrum/slot rights are a **single global commons** governed by a rule that advantages whoever files first.

## Long-horizon (≈100-year) view — *scenario, not fact*

Unlike the σT⁴ heat-rejection ceiling ([[synthesis/orbital-data-center-six-region]]) or the Kessler cascade ([[synthesis/space-situational-awareness-six-region]]), the binding 100-year invariant here is **institutional, not physical** — but it has a physical floor: the GSO arc is a finite ring, LEO shells and usable spectrum are finite, and FCFS converts "finite + first-come" into a durable first-mover asset.

| Horizon | Optimistic (commons renegotiated) | Pessimistic (orbital enclosure) |
|---|---|---|
| **~2030** | WRC-27 EPFD review + EU Space Act (in force 2030) + US Part 100 set converging, transparent, machine-readable filing norms | Megaconstellation filings (US + China) lock the prime LEO shells/bands; latecomers (incl. Taiwan, Global South) priced out |
| **~2050** | Slot/spectrum scarcity forces use-it-or-lose-it + secondary-market or auction reform; STM + ADR regimes mature | FCFS "paper-claim" rights become a permanently-captured asset class held by ~3 spacefaring blocs |
| **~2100** | A renegotiated orbital commons with equitable-access guarantees; ITU evolves from registrar to allocator | Orbital-slot/spectrum rights are inherited geopolitical property — the "spectrum enclosure" — and access is a sovereignty question on the scale that catalog authority is for SSA |

The durable scarce resource across all scenarios is **filed-and-brought-into-use ITU priority** plus the **launch + ground infrastructure** to defend it — which is exactly where Taiwan's regulatory gap bites (it can build the components but neither files the priority nor flies the vehicle), closing the loop back to [[synthesis/leo-taiwan-odc-gap]].

## Falsifier table

| Claim in this page | What would falsify it | Status (2026-06) |
|---|---|---|
| US has the most mature *commercial* space-regulatory regime | A region demonstrably faster end-to-end for a *private* operator's launch+spectrum | Holds; Part 100 reform aims to widen the lead |
| China uses ITU filing as a land-grab rather than commercial licensing | China adopting an independent FAA-style commercial launch-license regime | Holds; launch remains state activity, MIIT files mega-constellations |
| Europe is fragmented and only now harmonizing | EU Space Act stalls in trilogue / withdrawn before 2030 | Pending — proposed 2025-06, applies 2030, under co-decision now |
| Taiwan repeats upstream-strong/midstream-absent at the regulatory layer | TASA achieving sovereign orbital launch + independent ITU priority filings | Holds; Formosat-8 launched from Vandenberg, no orbital launch site yet |
| FCFS is the binding 100-year institutional invariant | ITU shifts to auction / guaranteed equitable allocation | No change to FCFS at WRC-23; EPFD review only *studied* for WRC-27 |
| Spectrum (not launch) carries the long-horizon scarcity | Launch capacity becomes the binding constraint instead of slots/spectrum | Launch cost falling fast (reuse); slot/spectrum congestion rising — supports the claim |

## Relevance to Mission Desk / Firefly agents

- An ODC siting/incorporation decision is a **regulatory-arbitrage** problem: where to launch (FAA vs CAA vs KASA vs state-China vs TASA-dependent-on-foreign) and **whose administration to file spectrum through** (FCC vs MIIT vs MIC vs national-European). The agent should surface the `{launch_regulator, spectrum_administration, ITU_priority_status}` triple per candidate jurisdiction.
- Interference-attribution ([[synthesis/fcc-ibfs-filings-coordination]]) is incomplete with IBFS alone: a Chinese MIIT or European national filing may hold ITU priority for a band that never appears in the FCC's IBFS. The agent must check the **ITU BR IFIC** for non-US administrations' API/CR records.
- Launch-slip scoring ([[synthesis/faa-notam-launch-lifecycle]], [[concepts/launch-window-slip]]) is US-airspace-specific (NOTAM/AHA/NOTMAR); a non-US launch needs the analogous national clearance signal (e.g., UK CAA range licence, Japanese MIC + Cabinet Office).

## See also

- [[synthesis/faa-notam-launch-lifecycle]] — US launch-clearance workflow (the launch-axis deep dive this page generalizes)
- [[synthesis/fcc-ibfs-filings-coordination]] — US spectrum-filing workflow (the spectrum-axis deep dive this page generalizes)
- [[synthesis/space-launch-airspace-integration-six-region]] — the **third axis**: air-navigation/NOTAM deconfliction (ICAO Annex 15), nationally executed but globally harmonized — the airspace sibling of the launch-authorization and spectrum axes mapped here
- [[synthesis/leo-taiwan-odc-gap]] — the upstream/midstream gap this page extends to the regulatory layer
- [[synthesis/orbital-data-center-six-region]] · [[synthesis/space-situational-awareness-six-region]] · [[synthesis/radiation-test-rad-hard-six-region]] — sibling six-region maps with the same governance trichotomy
- [[concepts/ngso-gso-coordination]] · [[concepts/epfd-equivalent-power-flux-density]] · [[concepts/schedule-s]] · [[concepts/processing-round]]
- [[sources/faa-ast-launch-licensing-2025]] · [[sources/itu-radio-regulations-article-22-2023]] · [[sources/fcc-part-25-2024]] · [[sources/fcc-starlink-gen2-kuiper-rulings-2022-2024]]

## Sources consulted (2026-06-07)

- ITU/WRC-23 milestone, BIU, orbital-tolerance & WRC-27 EPFD-study outcomes — [ITU/CTU Main WRC-23 Results](https://ctu.int/wp-content/uploads/2023/12/Main-WRC-23-Result-20.02.24.pdf); [Digital Regulation Platform — Regulation of NGSO constellations](https://digitalregulation.org/regulation-of-ngso-satellite-constellations/)
- ITU FCFS / paper satellites / equitable access — [Globalex — Paper Satellites](https://www.nyulawglobal.org/globalex/paper_satellites_free_use_outer_space1.html); [Brown Political Review — First Come, Only Served](https://brownpoliticalreview.org/first-come-only-served/)
- China Guowang + CTC-1/CTC-2 ITU filings, MIIT — [SpaceNews — China files for ~200,000 satellites](https://spacenews.com/china-files-itu-paperwork-for-megaconstellations-totaling-nearly-200000-satellites/); [gov.cn — MIIT satcom guideline Aug 2025](https://english.www.gov.cn/news/202508/27/content_WS68af0c13c6d0868f4e8f51e4.html)
- Japan Space Activities Act + 2026 amendment + MIC Radio Act — [Chambers Space Law 2025 — Japan](https://practiceguides.chambers.com/practice-guides/space-law-2025/japan/trends-and-developments); [Greenberg Traurig — Japan amends Space Activities Act](https://www.gtlaw.com/en/insights/2025/7/japanese-government-plans-to-amend-space-activities-act-part-1)
- Korea KASA + Space Development Promotion Act amendment + MSIT — [Kim & Chang — KASA & SDPA amendment](https://www.kimchang.com/en/insights/detail.kc?sch_section=4&idx=30464); [SpaceQuip — KASA launch](https://www.spacequip.eu/2024/05/27/korea-official-launches-its-new-korean-aerospace-administration-kasa-aiming-to-foster-the-countrys-role-in-the-new-space-era/)
- EU Space Act + UK SIA/CAA + France FSOA — [European Commission — EU Space Act](https://defence-industry-space.ec.europa.eu/eu-space-act_en); [Cooley — EU Space Act 10 implications](https://www.cooley.com/news/insight/2025/2025-07-24-the-proposed-eu-space-act-10-key-implications-us-and-non-eu-satellite-operators-should-know); [UK CAA — SaxaVord spaceport licence](https://www.caa.co.uk/newsroom/news/saxavord-granted-spaceport-licence-by-uk-civil-aviation-authority/); [CNES — FSOA](https://cnes.fr/en/projects/los)
- Taiwan Space Development Act + TASA + launch site — [Taiwan Space Agency (Wikipedia)](https://en.wikipedia.org/wiki/Taiwan_Space_Agency); [Taiwan Insight — Commencing Countdown](https://taiwaninsight.org/2025/02/28/commencing-countdown-taiwans-journey-in-space-development/); [Focus Taiwan — Formosat-8 #1 launch](https://focustaiwan.tw/sci-tech/202511290004)
- US FCC Part 25→Part 100 reform — [FCC — Space Modernization for the 21st Century NPRM](https://www.fcc.gov/document/space-modernization-21st-century-nprm); [Via Satellite — Carr Space Month](https://www.satellitetoday.com/government-military/2025/10/07/fcc-chair-targets-satellite-licensing-and-spectrum-reform-in-space-month/)
