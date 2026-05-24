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
- [[sources/itu-radio-regulations-article-22-2023]]
- [[sources/fcc-part-25-2024]]
- [[concepts/orbital-data-center]]
- [[concepts/leo-value-chain]]
