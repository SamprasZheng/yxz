---
type: synthesis
tags: [space-weather, six-region, noaa-swpc, esa, nict, kswc, nssc, meridian-project, icao, ises, leo-operations, long-horizon]
sources:
  - "[[sources/noaa-swpc-product-catalog]]"
concepts:
  - "[[concepts/swpc-space-weather-feeds]]"
  - "[[concepts/space-weather-operational-indices]]"
  - "[[concepts/solar-cycle-25-leo-radiation]]"
---

# Space-Weather Forecasting — Six-Region Operational Map (台美日韓中國歐洲)

**Canonical for:** "who runs the operational space-weather forecast centers by region, how they are governed, and why — uniquely among the space domains in this corpus — forecasting is structurally *pooled* rather than enclosed." This is the operational-forecasting companion to [[concepts/swpc-space-weather-feeds]] + [[concepts/space-weather-operational-indices]] (the US-centric feed/index how-to) and the heliophysics sibling of [[synthesis/radiation-test-rad-hard-six-region]] (the *damage-and-qualification* side of the same Sun). The wiki's existing space-weather pages are written entirely from the NOAA SWPC seat; this page adds the layer above them — the international structure that SWPC is only one node of.

## The one-paragraph thesis

Every other six-region map in this corpus ends in *enclosure* or *contest*: ITU spectrum is first-come-first-served land-grab ([[synthesis/space-regulatory-regimes-six-region]]), SSA catalog authority is a sovereignty fight ([[synthesis/space-situational-awareness-six-region]]), heavy-ion beam time is a capacity bottleneck ([[synthesis/radiation-test-rad-hard-six-region]]). Space-weather forecasting is the **inverse**. The driver is a single shared Sun; no nation can see the whole Earth's magnetosphere or the Sun's far side from its own territory; the high-value vantage points (L1, L5) are scientific commons. So the field is the **most internationally pooled** of all the space domains — crystallized by ICAO into just **four global aviation advisory centers** (US NOAA / Europe-led PECASUS / ACFJ / China-Russia CRC) that *rotate duty in two-week shifts*. The structural one-liner: **you cannot nationalize the Sun** — and the regions' strategies differ mainly in *how* they pool (sovereign-authoritative vs federated vs niche-contributor), not whether they do.

## Six-region table

| Region | Lead operational center(s) | ICAO global-center bloc | Governance model | Distinctive capability / niche |
|---|---|---|---|---|
| **US 美** | **NOAA SWPC** (Boulder CO, 24/7, DoC/NWS); **USAF 557th Weather Wing** (military) | **NOAA** (solo global center) | Sovereign single-authority + ISES *flagship* RWC | Sets ISES standards + global feed infra; owns the L1 fleet upgrade (**SOLAR-1 / SWFO-L1** — launched 2025-09-24, operational at L1 2026-06-10, now the primary real-time solar-wind + coronagraph monitor) and the WSA-Enlil/-derived CME models |
| **Europe 歐** | **ESA Space-Weather Service Network / SWESNET** (coordinated from the SSCC, Space Pole, Brussels; 5 Expert Service Centres, 40+ teams); **UK Met Office MOSWOC** (est. 2014, 24/7) | **PECASUS** (Finland-led consortium: FI/BE/AT/IT/UK/CY/PL/NL/DE/ZA) | **Federated / pooled** — multi-national network behind one front desk | Coordination-as-product (same model as EU SST in SSA); building the **L5 vantage** via ESA **Vigil** (launch 2031, carries NOAA CCOR coronagraph) |
| **China 中** | **NSSC** (CAS) + **CMA National Center for Space Weather**; **Meridian Project** Phase II (national acceptance Mar 2025 — world's largest ground-based monitoring network) | **CRC** (China-Russia Consortium; free service extended to Nov 2026) | Sovereign single-authority, multilateral-outward but data-largely-closed | Largest ground sensor ring ("two-vertical/two-horizontal" along 100°E·120°E × 30°N·40°N); 72-hr warnings; launching the **International Meridian Circle Program (IMCP)** 120°E→60°W |
| **Japan 日** | **NICT** (space-weather forecasts since **1949**; ISES RWC since **1996**; 4 ionosondes) | **ACFJ** (Australia-Canada-France-Japan consortium) | National-agency + pooled-consortium contributor | Longest continuous forecast lineage in Asia; ionospheric/HF-propagation specialty; the "J" in ACFJ |
| **Korea 韓** | **KSWC** under the **National Radio Research Agency (RRA)** (est. **2011-08-19**; ISES RWC since end-2011; 2 ionospheric observatories: Icheon + Jeju); **KASI** (research) | — (national RWC, not an ICAO global center) | National-niche / data-contributor | Radio/ionospheric-propagation focus (RRA = a *radio* regulator running the center); TEC monitoring |
| **Taiwan 台** | **Central Weather Administration (CWA, ex-CWB) Space-Weather Operation Office (SWOO)**; **FORMOSAT-7/COSMIC-2** GNSS-RO (joint US-Taiwan, launched 2019-06-25) | — (not an ICAO global center; not a designated ISES RWC) | **Data-contributor / upstream-strong, midstream-thin** | World-class ionospheric **GNSS radio-occultation sensing** (COSMIC-2 feeds *both* CWB/SWOO *and* NOAA SWPC ionospheric specification) — but no sovereign global-forecast authority |

> **Reading the table.** The US is the only *flagship* (it sets the standards everyone files to, exactly as it is the only legally-authoritative SSA catalog). Europe wins on **federation** — the same coordination-as-product bet it makes in [[synthesis/space-situational-awareness-six-region]] (EU SST) and at the regulatory layer ([[synthesis/space-regulatory-regimes-six-region]]). China runs the **largest physical sensor ring** (Meridian) but keeps data largely closed (same posture as its SSA catalog). Japan/Korea/Taiwan repeat the corpus's recurring Asia pattern: a **niche-specialty contributor** to a system someone else integrates — and **Taiwan repeats its exact upstream-strong / midstream-absent signature** (it has arguably the best ionospheric *sensor* in the world via COSMIC-2, but no sovereign global forecast desk and no ICAO/ISES seat).

## Three governance models (the recurring corpus trichotomy)

1. **Sovereign single-authority** — one national agency owns the end-to-end forecast and is internationally *authoritative*. **US (NOAA SWPC)**, **China (NSSC + CMA)**. (Mirrors US-18/19-SDS authority in SSA; China sovereign-closed in both SSA and radiation-test.)
2. **Federated / pooled** — multi-national coordination behind one service front. **Europe (ESA SWESNET + PECASUS)**, **ACFJ**. (Mirrors EU SST in SSA and ESA-ECIF in radiation-test — Europe's consistent bet across all four space domains.)
3. **National-niche / data-contributor** — a sovereign agency with one excellent observation feeding the global system. **Japan (NICT ionosphere)**, **Korea (KSWC ionosphere/TEC)**, **Taiwan (CWA-SWOO + COSMIC-2 GNSS-RO)**.

The distinctive twist versus the other domains: **ICAO has forced a fourth, supra-model layer on top** — for aviation, the entire planet is served by only **four** global advisory centers (NOAA / PECASUS / ACFJ / CRC) on a rotating two-week On-Duty-Center schedule. That is *more* pooled than anything in spectrum, SSA, launch, radiation, or AI — and it is pooled by physics, not by treaty generosity.

## 拉長時間軸 — the 100-year structural view (labelled scenario, not fact)

**The invariant.** The Sun is a single shared driver on fixed physical clocks: the ~11-year Schwabe cycle (SC25 maximum declared **2024-10-15**, smoothed sunspot number ≈161 — see [[concepts/solar-cycle-25-leo-radiation]]), the ~80–100-year Gleissberg envelope, and grand minima/maxima on multi-century scales. Two tail risks bound the century:

- **Carrington-class storms** (1859) — Riley (2012) put the canonical figure at **~12% per decade**, i.e. *near-certain within a 100-year window* (per-century estimates run ~50–60% on the higher models, lower on lognormal fits). A modern repeat is the planetary-grid / GNSS / satellite-fleet stress event everyone plans against.
- **Miyake-class events** (cosmogenic-isotope superflares, e.g. 774 AD) — far rarer (millennial), but an order of magnitude beyond Carrington; the genuine civilizational tail.

**Why the infrastructure is permanent.** Forecast *skill* improves, but lead time is **capped by physics**: a flare's X-rays and the fastest protons arrive at light-speed (≈0 warning for the R-scale / prompt-SEU threat), while a CME's transit gives only **~1–4 days** ([[concepts/space-weather-operational-indices]] timeline). Closing even that window requires a permanent, *shared* vantage architecture no single nation sustains alone:

- **L1** (sunward, ~1.5M km): operational since SOHO/ACE/DSCOVR (1995→); **NOAA SWFO-L1** launched **2025-09-24**, reached L1 **2026-01-23**, and entered operational service **2026-06-10 as SOLAR-1** — now the primary real-time solar-wind monitor (with a compact coronagraph delivering CME imagery to SWPC within ~30 min), closing the long-feared data-continuity gap left by the aging ACE/DSCOVR.
- **L5** (60° behind Earth): the side-view that sees CMEs *and* active regions before they rotate to face Earth; **ESA Vigil** (launch **2031**, lifetime 5 yr) is the first operational L5 mission — and it carries a **NOAA** coronagraph, i.e. the flagship bet is *already* cross-national.

**Scenario fork (≈2030 / 2050 / 2100).**
- *Optimistic — global-utility consolidation:* the four ICAO blocs + ISES harden into a permanent shared early-warning utility; L1+L5 (and eventually L4) vantage is jointly funded; forecasting is treated like GPS — a global public good. The "you cannot nationalize the Sun" logic wins because the physics never stops demanding a 360° view.
- *Pessimistic — pooling fractures on geopolitics **or cost**:* the CRC free-service window (currently extended only to **Nov 2026**) lapses; sensor/model data gets export-controlled the way rad-hard and SSA data already are; regions duplicate L1/L5 assets defensively. Forecasting *degrades* precisely because the one domain that physically demands cooperation gets caught in the same enclosure dynamic as spectrum and SSA. **The first cracks are already showing on the *cost* axis, not the geopolitical one:** at the ICAO A42 Assembly (2025), **PECASUS and ACFJ began seeking cost recovery** for their global-advisory services, while only the **CRC (China-Russia) is still offering the service free — and only through Nov 2026**. A domain that is pooled *by physics* is nonetheless funded *by nations*, and the funding is where the pooling is most fragile: if the aviation-advisory tier fragments into paid/free tiers, the "global public good" framing weakens from the billing side before any export-control fight begins.

The 100-year question is therefore **institutional, not physical**: the Sun guarantees the hazard and caps the warning; the open question is whether the unusually-pooled governance of *this* domain survives the enclosure pressure that dominates every *other* space domain in this corpus.

## Falsifier table

| If this turns out to be true… | …it would overturn the claim that |
|---|---|
| A single nation builds an end-to-end forecast with no reliance on foreign sensor/vantage data and matches the pooled system's skill | "you cannot nationalize the Sun" / pooling is physics-forced |
| ICAO consolidates to **one** global center, or fragments to **>4** national centers | the four-bloc rotating-pool structure is the stable equilibrium |
| Taiwan/Korea/Japan stand up sovereign *global* forecast desks (not just niche feeds) | the Asia "niche-contributor" pattern holds for forecasting |
| Carrington-class frequency is shown to be ≪1%/decade (Riley over-estimated) | the storm tail is a near-certain 100-year planning case |
| L5 (Vigil) is cancelled and no nation funds a side-view vantage | the permanent shared L1+L5 architecture is the long-horizon invariant |
| CRC / cross-national coronagraph-sharing (Vigil-CCOR) collapses on export-control grounds before 2035 | the optimistic global-utility fork is the base case |
| The ICAO SWX advisory service settles into a stable free-for-all with no cost-recovery tiering (PECASUS/ACFJ drop their A42 cost-recovery bids) | the pessimistic "pooling fractures on cost before geopolitics" signal is real rather than a transient billing dispute |

## See also

- [[concepts/swpc-space-weather-feeds]] — the US-node feed/polling how-to this page sits above
- [[concepts/space-weather-operational-indices]] — Kp/Ap/F10.7/Dst/Bz/S/R definitions + the storm-timeline that sets the physics-capped lead time
- [[concepts/solar-cycle-25-leo-radiation]] — SC25 intensity, May-2024 G5 case, the damage-side physics
- [[entities/noaa-swpc]] — the US flagship node + ISES + 557th WW detail
- [[sources/noaa-swpc-product-catalog]] — the verified feed catalog
- [[synthesis/radiation-test-rad-hard-six-region]] — heliophysics sibling: the *damage-and-qualification* side of the same Sun
- [[synthesis/space-situational-awareness-six-region]] — the domain whose CDM pipeline *degrades* during the storms this domain forecasts (May-2024 G5 link)
- [[synthesis/space-regulatory-regimes-six-region]] — the *enclosure* domain this one is the inverse of
- [[synthesis/orbital-data-center-six-region]] — the LEO/ODC assets exposed to the G/S/R hazard
- [[synthesis/leo-taiwan-odc-gap]] — the Taiwan upstream-strong/midstream-absent pattern this map repeats

## Sources (verified 2026-06-08; fact-refreshed 2026-07-17)

- ICAO four global centers (NOAA / PECASUS / ACFJ / CRC), two-week rotation, CRC free service to Nov 2026 — [PECASUS](https://pecasus.eu/), [Spaceweather-CRC](https://www.spaceweather-crc.com/views/home.html), [STCE ICAO SWX service](https://www.stce.be/content/icao-space-weather-information-service)
- **[2026-07-17 refresh]** ICAO A42 cost-recovery pressure — PECASUS + ACFJ seeking cost recovery, CRC free only to Nov 2026 — [ICAO A42 WP cost recovery](https://www.icao.int/sites/default/files/Meetings/a42/Documents/WP/wp_541_en.pdf); the concrete evidence for the pessimistic-fork "pooling fractures on cost" signal
- **[2026-07-17 refresh]** SC25 declining-phase storm cadence continues into H2-2026: **G3 (Strong)** storm 2026-07-04 (Kp 7.33) off an **X1.1** flare 2026-06-30, aurora to New Mexico / ~26 US states — [SWPC](https://www.swpc.noaa.gov/news/g3-strong-geomagnetic-storming-continues-g4-severe-still-expected), [The Watchers](https://watchers.news/2026/07/04/g3-strong-geomagnetic-storm-observed-aurora-as-low-as-new-mexico-after-june-30-cme-impacts-earth/); full chain in [[concepts/solar-cycle-25-leo-radiation]]
- ESA Space-Weather Service Network / SWESNET, SSCC at Space Pole Brussels, 5 ESCs / 40+ teams — [ESA Space Weather Office](https://www.esa.int/Space_Safety/Space_weather/Space_Weather_Office), [ESA SWE Programme](https://swe.ssa.esa.int/space-weather-and-space-safety-programme)
- UK Met Office MOSWOC (est. 2014, 24/7) — [Met Office](https://www.metoffice.gov.uk/blog/2025/how-does-the-met-office-monitor-space-weather)
- China Meridian Project Phase II national acceptance Mar 2025, 72-hr warnings, IMCP — [CAS](https://english.cas.cn/newsroom/cas_media/202503/t20250324_908599.shtml), [NSSC](https://english.nssc.ac.cn/news/202503/t20250320_908344.html)
- NICT (forecasts since 1949; ISES RWC since 1996) — [NICT SWC / ISES RWC Japan](https://swc.nict.go.jp/en/)
- KSWC / RRA (est. 2011-08-19; ISES RWC end-2011; Icheon + Jeju observatories) — [KSWC](https://spaceweather.rra.go.kr/eng/Survey.do)
- Taiwan CWB/SWOO + FORMOSAT-7/COSMIC-2 GNSS-RO (launched 2019-06-25) — [MDPI Atmosphere 13(6):858](https://www.mdpi.com/2073-4433/13/6/858), [eoPortal FormoSat-7/COSMIC-2](https://www.eoportal.org/satellite-missions/stp2-formosat-7)
- SC25 maximum declared 2024-10-15, SSN ≈161 — [NASA/NOAA joint announcement](https://science.nasa.gov/science-research/heliophysics/nasa-noaa-sun-reaches-maximum-phase-in-11-year-solar-cycle/)
- Carrington recurrence ~12%/decade — [Riley 2012, Space Weather](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2011sw000734)
- L1 fleet + SWFO-L1 → **SOLAR-1 operational 2026-06-10** (launched 2025-09-24, arrived L1 2026-01-23) + ESA Vigil L5 (2031, carries NOAA CCOR) — [NOAA SWFO-L1 mission](https://www.nesdis.noaa.gov/our-satellites/future-programs/swfo/space-weather-follow-l1-mission), [NOAA SOLAR-1 operational release](https://www.noaa.gov/news-release/noaas-solar-1-enters-new-era-of-space-weather-monitoring), [ESA Vigil](https://www.esa.int/Space_Safety/Vigil/Vigil_mission_overview)
- SC25 now in **declining phase** with a sustained G4 storm cadence (2025-06, 2025-11 behind an X5.1 flare, 2026-01) — the hazard did not end at the 2024 max; detail in [[concepts/solar-cycle-25-leo-radiation]]
</content>
</invoke>
