---
type: concept
tags: [fcc, ibfs, regulatory, spectrum, ngso, epfd, itu, coordination, mission-desk, firefly]
---

# NGSO/GSO Coordination

NGSO/GSO coordination refers to the international regulatory process through which a non-geostationary orbit (NGSO) satellite system operator — and by extension, the administration filing on its behalf (e.g., the FCC for US operators) — establishes the right to operate in shared frequency bands without causing unacceptable interference to geostationary orbit (GSO) networks.

This process operates under the ITU Radio Regulations (primarily Article 22 and Resolution 76) and is one of the two major coordination pathways at ITU — the other being GSO/NGSO (protecting NGSO from GSO) and NGSO/NGSO (constellation-to-constellation).

## The Core Rule

**ITU Radio Regulations No. 22.2** states that NGSO systems shall not cause unacceptable interference to, and shall not claim protection from, GSO networks in the FSS and BSS. This is the foundational asymmetry: NGSO must accommodate GSO, not the reverse.

The operative compliance mechanism is the **[[concepts/epfd-equivalent-power-flux-density|EPFD]]** limit framework of Article 22. An NGSO system that demonstrates EPFD compliance is deemed not to cause unacceptable interference to any GSO network worldwide — eliminating the need for bilateral coordination with each GSO operator.

## ITU Coordination Pipeline (FCC Operator Pathway)

For a US-licensed satellite operator, the pipeline runs through the FCC Space Bureau, which acts as the filing administration at ITU:

### Step 1: FCC Part 25 Application (IBFS)
The operator files an FCC Form 312 + [[concepts/schedule-s|Schedule S]] via IBFS. Orbital parameters, frequency bands, and EIRP/EPFD commitment are declared.

### Step 2: Advance Publication Information (API)
Before the FCC grants a licence, it submits an **API** to the ITU Radiocommunication Bureau (BR). The API establishes the operator's **ITU priority date** — critical for spectrum rights. The ITU publishes the API in the **BR IFIC (International Frequency Information Circular)**, and other administrations have **4 months** to submit comments identifying potentially affected systems.

### Step 3: Coordination Request (CR/C)
If the system is in a frequency band that requires coordination with specific GSO networks (beyond the EPFD-compliance blanket approach), the FCC submits a **Coordination Request (CR/C)**. Affected administrations respond with their coordinating networks list (CR/D special section). The bilateral negotiation phase then begins, targeting technical agreements (power reduction, beam blanking near GSO arc) that protect specific GSO networks beyond the Article 22 baseline.

### Step 4: Notification (N)
After coordination is complete and the FCC has granted the Part 25 licence, the FCC submits a **Notification** to the ITU BR. The Notification contains the final, grant-consistent technical parameters and is registered in the **ITU Master Register** (part of the SNS database). Registration creates the formal international right to operate.

### Step 5: SNS Database Entry
The ITU **Space Network System (SNS)** database is the authoritative international registry of satellite network filings. SNS data is accessible via ITU SpaceExplorer (`itu.int/pub/R-SOFT-SNS`) — a subscription product. A subset of SNS data (IFIC-published records) is publicly accessible; the full API/CR/N history requires an SNS subscription or ITU BR access.

## First-Come-First-Served, Paper Satellites, and the Milestone Rules

The ITU registration system is **first-come-first-served (FCFS)**, not auction-based: the **API priority date** (Step 2) — not hardware, not a domestic license — establishes the international claim to a frequency/orbit resource. Combined with the [[concepts/epfd-equivalent-power-flux-density|EPFD]] blanket finding (one compliant NGSO system is deemed non-interfering worldwide), FCFS strongly rewards *early filing*. This produces two well-documented pathologies:

- **"Paper satellites"** — filings far in excess of, or far ahead of, any real deployment, used to reserve spectrum/slots. WRC-23 tightened the **bringing-into-use (BIU)** and **milestone** rules to curb this: BIU requires a satellite to occupy the notified resource for **90 continuous days**; deployment must reach **10 % / 50 % / 100 %** of the notified constellation within **2 / 5 / 7 years**; **orbital tolerances** (apogee/perigee/inclination) bound the notified values; and operators file a **4-year periodic deployment report** (annual if below the notified count).
- **Equity tension** — FCFS structurally favors early, well-funded, spacefaring filers. Developing states have invoked the ITU's "special needs of developing countries" / equitable-access principle (Constitution Art. 44, live since the 1976 GSO-arc dispute) to seek guaranteed allocations. Megaconstellations now make up **>65 %** of active LEO satellites, sharpening the scarcity.

**Extreme case — China.** Filing through MIIT (Ministry of Industry & Information Technology), China has taken FCFS to its limit: Guowang **GW-A59 (6,080) + GW-2 (6,912) = 12,992** satellites (ITU filing 2020-09), then in **December 2025 the CTC-1 and CTC-2 filings of 96,714 satellites each** (≈193,000 total notional satellites). These illustrate FCFS as a strategic land-grab instrument rather than a response to built hardware. *(Sources: [SpaceNews](https://spacenews.com/china-files-itu-paperwork-for-megaconstellations-totaling-nearly-200000-satellites/); [ITU Main WRC-23 Results](https://ctu.int/wp-content/uploads/2023/12/Main-WRC-23-Result-20.02.24.pdf), accessed 2026-06-07.)* See [[synthesis/space-regulatory-regimes-six-region]] for how the FCFS rule shapes the six-region (台美日韓中國歐洲) regulatory landscape and the ~100-year "orbital enclosure" question.

## NGSO/NGSO Coordination

EPFD compliance under Article 22 does **not** address NGSO-to-NGSO interference (two LEO constellations interfering with each other). For co-frequency NGSO systems:
- The ITU applies **resolution-based coordination** (e.g., for non-GSO FSS systems below 1° angular separation from a GSO arc)
- The FCC uses its **[[concepts/processing-round|processing round]]** system to batch competing applications and may condition grants on bilateral spectrum-sharing agreements between operators

## GSO Arc Exclusion Zone

Many NGSO operators implement operational constraints near the GSO arc (±8° or as negotiated) to avoid line-of-sight interference paths to GSO earth stations. This shows up in [[concepts/schedule-s|Schedule S]] antenna pattern exhibits and in the EPFD compliance simulations.

## FCC Coordination Letter Workflow

Once the FCC Space Bureau (formerly International Bureau) receives a coordination letter from another administration (via the ITU process), it:
1. Forwards the letter to the operator's point of contact on file within IBFS
2. Requests a response **3–4 business days** before the ITU deadline to allow Space Bureau processing time
3. May hold technical discussions with the operator before filing the response at ITU

Operators must maintain an active IBFS account and point-of-contact record to receive these letters. Missed deadlines can result in adverse ITU findings affecting the operator's coordination record.

## Public Data vs. ITU SNS Subscription

| Data | Public availability |
|---|---|
| IBFS Part 25 filings (US operators) | Fully public via `licensing.fcc.gov/myibfs/` and `fcc.report/IBFS/` |
| ITU BR IFIC API/CR publications | Publicly downloadable (PDF) from `itu.int/en/ITU-R/space/asreceived/` |
| ITU SNS full database (machine-readable) | Requires ITU SpaceExplorer subscription |
| EPFD validation software | Freely downloadable from `itu.int/epfdsupport/` |

## Relevance to Mission Desk / NemoClaw

- The coordination pipeline explains why a **Part 25 grant date** does not equal the **ITU notification date** — the two are distinct regulatory events with different implications for interference protection rights
- An interference-attribution query from [[synthesis/spacesharks-mission-desk-hackathon-plan|Mission Desk]] should check the IBFS filing status (is the neighbouring operator's modification application in a pending processing round?) AND the ITU BR IFIC (has the API/CR been published, establishing priority?) to determine whether the interference source has a valid regulatory right to operate
- The FCC coordination FAQ at `fcc.gov/space/faq-coordination` and the ITU e-submission guide are the primary operator-facing procedural references

## See Also
- [[concepts/epfd-equivalent-power-flux-density]]
- [[concepts/processing-round]]
- [[concepts/schedule-s]]
- [[synthesis/fcc-ibfs-filings-coordination]]
- [[synthesis/space-regulatory-regimes-six-region]]
- [[sources/itu-radio-regulations-article-22-2023]]
- [[sources/fcc-part-25-2024]]
- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
