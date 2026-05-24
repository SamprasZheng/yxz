---
type: concept
tags: [notam, faa, space-operations, space-launch, reentry, spectrum, aircraft-hazard-area, debris-response-area, sdi, mission-desk, regulatory]
---

# NOTAM — Space Operations Subcategories

This page covers the **space-operations-specific NOTAM subcategories** that are distinct from general aviation NOTAMs. For the base NOTAM structure, format, and retrieval methods, see [[concepts/notam]]. For the end-to-end agent integration guide, see [[synthesis/faa-notam-launch-lifecycle]].

The Spacesharks Mission Desk agent ingests all four subcategory types described here as Phase 1 (pre-launch) and Phase 5 (re-entry/EOL) signals. See [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3.

## 1. Launch NOTAM (Aircraft Hazard Area — AHA)

The most common space-operations NOTAM type. Issued by the ARTCC (Air Route Traffic Control Center) responsible for the airspace surrounding the launch site. The NOTAM activates an **Aircraft Hazard Area (AHA)** that defines the debris-risk envelope.

**Regulatory basis:** 14 CFR Part 450 § 450.133 (flight hazard area analysis); 14 CFR § 91.143 (flight limitation in the proximity of space flight operations). See [[sources/faa-part-450-2020]].

**Safety criterion:** The AHA must be sized such that the expected number of casualties among the aircraft population in the hazard area does not exceed 1 × 10⁻⁶ per launch attempt. This is calculated using trajectory dispersion analysis (see [[concepts/launch-hazard-area]] for the geometric derivation).

**Required NOTAM content (per PHAM Chapter 31):**
- Keywords "airspace" and "space launch" or "space reentry" in the E) field
- Launch site description and geographic reference
- Effective times (B) field) and expiry (C) field) in UTC
- Backup launch date/time windows embedded in the E) field
- AHA polygon vertices in lat/lon (degrees-minutes format: `2400N07952W`)
- Altitude extent — defaults to **surface to unlimited** unless otherwise specified
- Availability of inflight status information for non-participating pilots (ATC frequency or phone number)
- Brief launch scenario narrative (vehicle name, flight designation, operator)

**Timing:** The NOTAM must be effective **no less than 30 minutes prior to flight** and must remain active until at least 30 minutes after the airspace can no longer be affected by the vehicle or its debris. In practice, launch operators file 48–72 hours in advance to allow pilots to plan around the closure.

**ARTCC codes for major US launch sites:**

| Launch site | Primary ARTCC | FIR identifier |
|-------------|--------------|----------------|
| Cape Canaveral / Kennedy Space Center | Jacksonville ARTCC | KZJX |
| Vandenberg SFB (Western Range) | Los Angeles ARTCC | KZLA |
| Starbase, Boca Chica TX | Houston ARTCC + Mexico City FIR | KZHU / MUFH |
| Mid-Atlantic Regional Spaceport (MARS) | Washington ARTCC | KZDC |

**Key distinction — AHA vs. TFR:** AHAs are trajectory-derived, surface-to-unlimited, and may span hundreds of nautical miles of ocean. A simple TFR (e.g., the standing Starbase TFR 5/3678 at 0–2,000 ft) is a facility-security measure, not a launch-hazard area. An agent should treat any NOTAM with the phrase "due to space launch" in the E) field and a `QRDCA` or `QRDXX` Q-code as an AHA, regardless of whether the word "TFR" appears.

**Three NOTAM types per launch event:**
1. **Airspace NOTAM** — activates the AHA (described above)
2. **Flow NOTAM** — route-guidance advisory for affected flights (issued by ARTCC traffic management unit)
3. **Security NOTAM** — coordinates UAS restrictions and perimeter-security measures (optional; more common for high-profile/crewed launches)

## 2. Re-entry and Stage-Separation NOTAMs

Re-entry vehicles (spent upper stages, reusable first stages, returning crew capsules) generate NOTAMs for:

- **Stage impact zones:** Expendable first/second stages have planned ocean impact zones. Each zone is an AHA, sized by the debris dispersion ellipse plus 10 nm buffer (see [[concepts/launch-hazard-area]]). A single Falcon 9 launch can generate two separate NOTAMs — one for the ascent corridor and one for the stage 2 re-entry/splashdown zone.
- **RTLS (Return to Launch Site) re-entry corridor:** When a reusable booster returns to the launch site (e.g., Falcon 9 booster at Cape Canaveral or Falcon Heavy side cores), a separate AHA NOTAM covers the re-entry trajectory and landing zone.
- **Starship orbital re-entry:** Generates a third AHA covering the re-entry corridor (currently over the Indian Ocean or Pacific for IFT missions; over the Bahamas/Turks & Caicos for Starship-at-KSC trajectories per the May 2025 license modification covering IFT-9).

**Verified example:** Starship IFT-5 (October 2024) generated NOTAM `F3682/24` specifically for the Ship (Stage 2) atmospheric re-entry and splashdown zone, in addition to the main AHA NOTAM for the ascent phase.

**EOL/deorbit NOTAMs:** Controlled satellite re-entry generates NOTAMs for the predicted impact footprint. These are issued by the range authority responsible for the disposal trajectory, coordinated through the operator's deorbit plan filed with the FAA. For uncontrolled re-entries, the FAA issues a NOTAM when the impact window narrows to less than 12 hours and the footprint is defined with sufficient confidence. For Spacesharks Phase 5 (EOL & deorbit), an agent should poll NOTAM Search for the satellite's catalog number or operator name during the predicted decay window.

## 3. Debris Response Area (DRA) NOTAM

A **DRA** is a reactive NOTAM activated only after an anomaly occurs during flight — it is NOT issued pre-launch. Activation criteria: FAA receives confirmation that a space vehicle malfunction has produced unplanned debris capable of endangering aircraft.

**Activation sequence:**
1. Vehicle telemetry shows anomaly (explosion, breakup, loss of control)
2. FAA range safety officer / SDI system detects debris event
3. FAA issues emergency DRA NOTAM — aircraft in the area receive immediate ATC alerts and rerouting instructions
4. DRA remains active until all debris has reached the surface
5. FAA issues DRA closeout NOTAM / alert

**SDI role:** The **Space Data Integrator** (SDI) feeds real-time vehicle state vectors (position, altitude, velocity, deviation from planned trajectory) into the FAA's Traffic Flow Management System (TFMS). SDI is now operational and used for every major US commercial launch. SpaceX is the primary operator currently sharing telemetry. SDI enables the FAA to detect a vehicle breakup within seconds of telemetry loss and trigger the DRA NOTAM faster than the traditional range-safety phone-call chain.

**Agent implication:** A DRA NOTAM appearing in the feed for a vehicle the agent is tracking is a high-confidence signal of a launch failure. Cross-check against the NOTAM E) field for the vehicle name, then immediately:
- Update the launch phase status to `ANOMALY`
- Trigger Hermes skill `score_launch_failure_probability` if available
- Check FAA AST statements for mishap investigation opening

## 4. Spectrum / RF NOTAMs

These NOTAMs cover temporary frequency use, transmitter activation, or radio silence requirements associated with space operations. Less commonly searched by satellite operators but relevant for:

- **Telemetry and tracking activation windows:** Some range safety NOTAMs specify the transmitter frequency bands used for range tracking during a launch. This is operationally relevant for ground stations that share frequency allocations with range tracking radars.
- **Radar / uplink interference zones:** High-power radar transmitters used for space surveillance (e.g., Space Fence) can generate RF NOTAMs when their scan patterns intersect with instrument approach corridors.
- **GPS jamming notices:** FAA issues GPS interference NOTAMs (typically under the `QNMAS` Q-code) for range safety testing and some launch activities that generate GPS signal degradation in surrounding airspace. These affect instrument approaches and en-route navigation, and are therefore listed in the NOTAM feed under affected ARTCCs.

**For Spacesharks Phase 4 interference attribution:** When investigating downlink degradation, cross-check the GPS NOTAM feed for the time window. A GPS jamming NOTAM overlapping the satellite's downlink window is a possible environmental interference source. Query NOTAM Search with keyword "GPS" or "GNSS" filtered to the relevant ARTCC.

Q-codes relevant to spectrum/RF NOTAMs:

| Q-code | Meaning |
|--------|---------|
| `QNMAS` | GPS/GNSS navigation aid — signal unreliable or unavailable |
| `QNMAU` | GPS/GNSS navigation aid — unserviceable |
| `QNTAU` | TACAN — unserviceable (less relevant but shares spectrum) |

## 5. NMS modernization and ICAO format transition (2026–2028)

**NMS deployment (April 18, 2026):** The FAA replaced its 1980s-era U.S. NOTAM System (USNS) with the cloud-based **NOTAM Management Service (NMS)**, deployed April 18, 2026 between midnight–04:00 Eastern. The system processes 4+ million NOTAMs per year. This was a back-end replacement; NOTAM content, format, and the public search interface at `notams.aim.faa.gov/notamSearch/` are unchanged.

**ICAO format transition (planned late 2027 – early 2028):** The FAA missed its December 2024 target for full ICAO format adoption. As of April 2026, NOTAMs remain available in domestic, ICAO, or plain-language formats simultaneously. Full retirement of the domestic format is planned for late 2027 or early 2028.

**What changes for space ops:** The ICAO format separates altitude limits into explicit `F)` (lower) and `G)` (upper) fields, making the `surface to unlimited` specification machine-parseable without text extraction from the E) field. Agent code written today against the E) field regex will continue to work through at least 2027; add `F)` and `G)` field parsing as a non-breaking upgrade when the ICAO transition completes.

**SWIM / FNS programmatic access:** Unchanged by NMS deployment. Continue to use `scds.faa.gov` account → AIM FNS subscription → FIL SFTP initial load + JMS real-time updates. Reference implementation: `github.com/faa-swim/fns-client`. Payload format remains AIXM 5.1 XML.

## 6. Foreign FIR NOTAM coordination (international launch trajectories)

For launches with trajectory segments over foreign FIRs, the FAA must coordinate AHA NOTAMs with the relevant Air Navigation Service Providers (ANSPs). Typical coordination timeline: **7–10 days** for ANSPs familiar with US space operations. This is a documented bottleneck in the FAA Space CDM (Collaborative Decision Making) process.

Affected FIRs for common US launch trajectories:

| Trajectory | Foreign FIRs affected |
|------------|----------------------|
| Starship Boca Chica eastward | MUFH (Mexico City), MUHA (Havana), MKJK (Kingston), TJZS (San Juan) |
| Falcon 9 from KSC to LEO ISS | KZJX, KZMA, then Caribbean FIRs |
| Vandenberg Polar/SSO | Pacific FIRs (KZOA, then Fukuoka / Auckland depending on trajectory) |

An agent monitoring a launch from an non-US site (e.g., Rocket Lab Electron from Mahia, New Zealand) should query the relevant national NOTAM database. Rocket Lab New Zealand operations appear under **NZZO** (Oceanic FIR) and nearby ARTCCs. NOTAM `B0423/26` (Electron launch, 2026) is a documented example.

## 7. Spacesharks integration decision table

| Phase | NOTAM subcategory | Agent action |
|-------|------------------|-------------|
| Phase 1 (Pre-launch) | Launch AHA NOTAM (NOTAMN) | Extract window B/C, vehicle, backup dates; compute slip probability |
| Phase 1 (Pre-launch) | NOTAMR / NOTAMC | Detect slip; recompute conjunction screening epoch; emit CDM re-screen event |
| Phase 2 (Launch & ascent) | DRA NOTAM | Flag anomaly; update launch phase to ANOMALY; open mishap investigation watch |
| Phase 4 (On-orbit ops) | GPS/GNSS NOTAM | Check overlap with downlink schedule; attribute interference |
| Phase 5 (EOL/Deorbit) | Re-entry impact zone NOTAM | Parse footprint polygon; compute casualty risk overlap; update deorbit tracking |

## 8. Related pages

- [[concepts/notam]] — NOTAM base structure, number format, ICAO format fields, retrieval methods
- [[concepts/launch-hazard-area]] — geometric derivation of AHA footprints, trajectory dispersion, dynamic LHA trends
- [[concepts/launch-window-slip]] — NOTAM lifecycle during slips and scrubs
- [[synthesis/faa-notam-launch-lifecycle]] — end-to-end agent integration guide
- [[sources/faa-notam-search-2024]] — retrieval recipe with code
- [[sources/notam-starship-ift8-2025]] — IFT-8 scrub case study
- [[sources/faa-part-450-2020]] — regulatory basis
- [[sources/faa-ast-launch-licensing-2025]] — licensing chain
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — agent that ingests these signals
- [[concepts/orbital-data-center]] — downstream consumer of launch-window signals
