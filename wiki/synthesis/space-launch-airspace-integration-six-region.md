---
type: synthesis
tags: [notam, airspace, faa, icao, annex-15, space-launch, six-region, regulatory, eurocontrol, caac, jcab, mission-desk]
sources:
  - "[[sources/faa-part-450-2020]]"
  - "[[sources/faa-notam-search-2024]]"
  - "[[sources/notam-starship-ift8-2025]]"
concepts:
  - "[[concepts/notam]]"
  - "[[concepts/notam-space-operations]]"
  - "[[concepts/launch-hazard-area]]"
  - "[[concepts/launch-window-slip]]"
---

# Space-Launch Airspace Integration — Six-Region Map (台美日韓中國歐洲)

The **third regulatory axis** for space launch, distinct from the two already mapped in [[synthesis/space-regulatory-regimes-six-region]]:

1. **Launch authorization** — *nationally divergent* (FAA AST / China-state / JCAB / KASA / EU FSOA / TASA) — owned by that synthesis.
2. **Spectrum / orbital-slot coordination** — *nationally filed, globally convergent at the ITU* — owned by [[synthesis/fcc-ibfs-filings-coordination]].
3. **Airspace deconfliction (this page)** — *nationally executed, globally harmonized at ICAO* — the **air-navigation** problem of keeping aircraft out of a rocket's debris envelope, published as a **[[concepts/notam|NOTAM]]** activating a **[[concepts/launch-hazard-area|hazard area]]**.

The binding insight: **launch is regulated by a space agency, but the launch's *footprint in the sky* is regulated by an air-navigation service provider (ANSP) filing under a single global standard — [ICAO Annex 15 / PANS-AIM (Doc 10066)](https://www.icao.int/airnavigation/aeronautical-information-management).** This is the exact structural parallel to [[concepts/epfd-equivalent-power-flux-density|EPFD]]: the *values* are nationally executed, but the *grammar* (NOTAM format, Q-codes, FIR boundaries, AIRAC cycle) is one worldwide standard. A NOTAM filed in Boca Chica is parseable by an agent in Taipei because both obey Annex 15. See [[synthesis/faa-notam-launch-lifecycle]] for the US-centric workflow this globalizes.

## The single global layer — ICAO Annex 15 / PANS-AIM

All six regions publish space-launch hazards through the same instrument: **Annex 15 (Aeronautical Information Services)** + the procedural document **PANS-AIM (Doc 10066)** + the **AIS Manual (Doc 8126)**, which together fix NOTAM series/format, the SNOWTAM/ASHTAM variants, the AIRAC 28-day cycle, and the **transition from text NOTAMs to digital AIM** (quality-assured digital datasets, AIXM 5.1 exchange). The long-running ICAO program shifts AIS → **AIM** ("dynamic, integrated management of quality-assured *digital* aeronautical data"), and a parallel ICAO **higher-airspace-operations** workstream is beginning to treat launch/re-entry vehicles as airspace users rather than one-off closures. *No region opts out of this layer* — which is why the airspace axis, like spectrum, is a **commons-governed** axis, not a sovereign one (contrast launch authorization).

## Six-region table — who originates the launch NOTAM, and how

| Region | ANSP / AIS authority | Primary FIR(s) | Posture | Notable |
|---|---|---|---|---|
| **US 🇺🇸** | **FAA** Air Traffic Org / AIM (NMS since 2026-04-18) | KZ** ARTCCs (KZJX, KZHU, KZLA…) | **Authoritative, maturing to dynamic** | World's highest cadence; [CSINAS ConOps](https://www.faa.gov/sites/faa.gov/files/space/airspace_integration/Final_CSINAS_ConOps.pdf) + **Time-Based Procedures** reroute only affected aircraft; **SDI** real-time telemetry; cadence rising exponentially through 2026 |
| **Europe 🇪🇺** | **EUROCONTROL EAD** (central repository) + national ANSPs (NATS/CAA UK, LFV Sweden, Avinor Norway, Isavia Iceland) | EGPX, ESAA, ENOR, BIRD (oceanic) | **Federated-but-pooled** | EAD = world's largest AIM system; new spaceports **SaxaVord** (Shetland, EGPX), **Esrange** (Kiruna, ESAA), **Andøya** (Norway) publish **Temporary Danger Areas**; Isavia ANS coordinates N-Atlantic commercial-space ops |
| **China 🇨🇳** | **CAAC** (state) | ZBPE, ZSHA, ZGZU… | **Sovereign-opaque** | Inland sites (Jiuquan/Xichang/Taiyuan) drop spent stages over *land*; closures often short-notice; **Zhuque-3** reusable first-stage return Nov 2025 (Minqin, Gansu); the 2024-11 seven-block + 2025-02 ~1,000 km Shanghai→Guangdong closures; debris NOTAMs reach the Philippines (CAAP) and the **Taipei FIR** |
| **Japan 🇯🇵** | **JCAB** (Japan Civil Aviation Bureau) | **RJJJ** (Fukuoka FIR) | **Civil-mature** | Tanegashima/Uchinoura (JAXA) + Hokkaido (Interstellar, private); JCAB issues launch NOTAMs; FAA–JCAB cooperation declaration |
| **Korea 🇰🇷** | **KOCA / MOLIT** | **RKRR** (Incheon FIR) | **Civil-building** | Naro Space Center launches; the region's NOTAM picture is dominated by **DPRK launch/missile** danger-area NOTAMs that ripple across RKRR/RJJJ |
| **Taiwan 🇹🇼** | **CAA** (MOTC) | **RCAA** (Taipei FIR) | **Recipient, not originator** | **No sovereign orbital launch** → Taiwan rarely *originates* a launch NOTAM; instead it *receives* and reacts to **PRC** launch-debris and airspace-closure NOTAMs bordering/overflying RCAA (e.g. Oct-2023 overflight) — the airspace-layer instance of upstream-strong/midstream-absent |

## Three governance models

- **Authoritative-and-integrating (US):** a single mature regulator absorbing exponential cadence by moving from blanket closure → dynamic, telemetry-keyed corridors. The frontier of *efficiency*.
- **Federated-but-pooled (Europe):** sovereignty stays national (each ANSP issues its own Danger Areas) but data is *pooled* in EAD — the same architecture as the EU SST / space-weather PECASUS pattern.
- **Sovereign-opaque (China):** airspace is a state instrument; launch closures double as strategic-signaling tools, with short notice and land-overflight drop zones the rest of the world cannot influence — the airspace mirror of China's ITU "land-grab" filing behavior.

## 拉長時間軸 — lineage and the 100-year view

**Backward:** ICAO Annex 15 dates to the post-1947 Chicago-Convention build-out; NOTAMs have been text telex messages for ~70 years; the AIS→AIM digital pivot (AIXM, PANS-AIM Doc 10066) is the once-in-a-generation modernization now in flight (US NMS 2026, EAD digital NOTAM, FAA's slipped ICAO-format cutover now late-2027/2028).

**Forward (labeled scenario, not fact):** as launch cadence approaches *airline-like* frequency, the static-NOTAM-closure model becomes untenable — the 100-year trajectory is **launch/re-entry vehicles treated as ordinary airspace users** inside CNS/ATM (ICAO higher-airspace-operations), with **machine-readable, dynamically-shrinking hazard volumes** (the [[concepts/launch-hazard-area]] dynamic-AHA endpoint) replacing the blunt "surface-to-unlimited" closure. The **invariant**: *air and orbit share the same vertical column for the first ~100 km, so deconfliction is permanent and necessarily pooled* — you cannot nationalize the sky-lane any more than you can nationalize the Sun ([[synthesis/space-weather-forecasting-six-region]]). The open governance question is whether sovereign-opaque actors (China's land-overflight closures, DPRK launches) force the commons to harden, the inverse of the cooperative digital-AIM trend.

## Falsifier table

| Claim | Status (2026-06) | What would falsify it |
|---|---|---|
| Airspace axis is ICAO-harmonized, not sovereign | Holds (Annex 15 universal) | A major power formally exiting Annex 15 NOTAM format for space ops |
| US is moving blanket-closure → dynamic corridors | Holds (CSINAS Time-Based Procedures, SDI) | A formal named dynamic-AHA regulatory framework still absent past ~2030 |
| Taiwan is airspace **recipient**, not originator | Holds (no sovereign launch) | TASA standing up a sovereign launch site that *originates* RCAA launch NOTAMs |
| China closures are short-notice/strategic | Holds (2024–25 closures) | CAAC adopting standardized 48–72 h advance launch-NOTAM practice |
| Digital/machine-readable NOTAM is the trajectory | Holds (NMS, EAD, AIXM 5.1) | The AIS→AIM digital pivot stalling and text NOTAM persisting past 2030 |

## See also

- [[synthesis/space-regulatory-regimes-six-region]] — the launch-authorization + spectrum axes (this page is the third, air-navigation axis)
- [[synthesis/faa-notam-launch-lifecycle]] — the US-centric end-to-end workflow this globalizes
- [[synthesis/fcc-ibfs-filings-coordination]] — the ITU-spectrum sibling commons
- [[concepts/notam]] · [[concepts/notam-space-operations]] · [[concepts/launch-hazard-area]] · [[concepts/launch-window-slip]]
- [[synthesis/cdm-pc-decisioning]] — the LCOLA / on-orbit conjunction handoff downstream of the launch NOTAM
- Sibling six-region maps: [[synthesis/space-situational-awareness-six-region]], [[synthesis/space-weather-forecasting-six-region]], [[synthesis/orbital-data-center-six-region]]
