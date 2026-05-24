---
type: concept
tags: [launch-hazard-area, lha, aha, aircraft-hazard-area, faa, space-launch, flight-safety, trajectory-dispersion, part-450, part-417, mission-desk]
---

# Launch Hazard Area (LHA) / Aircraft Hazard Area (AHA)

A **Launch Hazard Area (LHA)** — formally called an **Aircraft Hazard Area (AHA)** in current FAA Part 450 terminology — is the airspace volume closed to non-participating aircraft and maritime vessels around a rocket launch or re-entry event to ensure that the probability of debris striking an aircraft does not exceed a defined safety threshold. The LHA is the geometric product of a **flight hazard analysis** and is the single most operationally consequential output of that analysis, because it directly determines which flights are rerouted and by how much.

For the Spacesharks Mission Desk, the LHA polygon embedded in a launch NOTAM is the primary Phase 1 signal for pre-launch survivability assessment: an unusually large LHA relative to prior launches of the same vehicle is an early indicator of a trajectory change, reliability concern, or expanded mission scope. See [[synthesis/spacesharks-mission-desk-hackathon-plan]] §3 and [[concepts/notam-space-operations]].

## 1. Terminology: LHA vs. AHA vs. TFR

The term **LHA** (Launch Hazard Area) appears in older FAA literature (14 CFR Part 417, which governed expendable launch vehicle safety before Part 450 replaced it in March 2021). **AHA** is the current Part 450 term for the same concept extended to both launch and re-entry. A **TFR** (Temporary Flight Restriction) is one of the airspace tools used to implement an AHA, but is not the AHA itself — a single AHA may be implemented as a combination of TFRs, Warning Areas, ATCAAs (Air Traffic Control Assigned Airspace), and ALTRVs (Stationary Altitude Reservations).

**Current regulatory home:** 14 CFR Part 450 § 450.133 (Aircraft Hazard Areas) and Appendix B to former Part 417 (Flight Hazard Area Analysis for Aircraft and Ship Protection). See [[sources/faa-part-450-2020]].

## 2. Geometric derivation — how the AHA footprint is computed

The AHA is not a fixed circle around the launch pad. It is constructed from a **trajectory dispersion analysis** as follows:

### Launch-site AHA (near-field)
1. **Nominal trajectory simulation:** Compute the vehicle's planned trajectory from T-0 to stage separation or orbital insertion.
2. **Dispersed trajectory envelope:** Propagate Monte Carlo dispersions (wind, thrust variation, guidance error, structural failure modes) to find the farthest left/right crossrange, downrange, and uprange footprint positions.
3. **Bounding box:** Draw a polygon enclosing the four extreme dispersed positions (uprange, downrange, max crossrange left, max crossrange right).
4. **Near-launch radial expansion:** For the area immediately surrounding the launch site, add **5 nautical miles in every radial direction** as a buffer for short-range debris trajectories not captured by the trajectory dispersions.
5. **Altitude extent:** Surface to **100,000 ft MSL** for the launch-site AHA in most analyses; this is effectively "surface to unlimited" for commercial aviation (all commercial routes operate below 45,000 ft).

### Stage-impact AHA (downrange)
1. **Stage-2/upper-stage impact ellipse:** Compute the **three-sigma dispersion ellipse** for the planned impact location (Gaussian spread of potential impact points at the 3σ confidence level).
2. **10 nm buffer:** Extend both axes of the ellipse by 10 nautical miles.
3. **Infinite vertical extent:** The stage-impact AHA extends from surface to unlimited upward.

### Blast overpressure radius (land hazard — relevant for pad failures)
For catastrophic pad explosions, the overpressure radius is computed as:

```
R_op = 45 × (NEW)^(1/3)
```

where NEW = Net Explosive Weight (kg of propellant TNT equivalent). This formula yields meters; convert to nautical miles for the NOTAM polygon.

### Safety threshold
The AHA is sized so that for every aircraft that might be in the hazard area, the **individual expected casualty (Ec) probability does not exceed 1 × 10⁻⁶**. This is the FAA/Part 450 standard. The maritime ship threshold is 1 × 10⁻⁵.

## 3. What the LHA covers operationally

A single orbital launch from Kennedy Space Center can generate **four separate AHAs** filed as separate NOTAMs:

1. **Launch-site AHA** — surface to unlimited, covers the immediate pad area and low-altitude flight path (radius ~30 NM from KSC for Falcon 9)
2. **Ascent corridor AHA** — extends over the Atlantic trajectory (for KSC eastward launches), reaching hundreds of NM over ocean
3. **Stage-1 (booster) landing zone AHA** — covers the drone-ship or RTLS landing zone; activated and deactivated in real time as the booster descends
4. **Stage-2 re-entry/impact AHA** — covers the planned upper-stage disposal point; often extends into international airspace requiring foreign FIR coordination

For the Starship Super Heavy system, the expanded AHA for IFT-9 (May 2025 license modification) covered the Bahamas and Turks & Caicos Islands — affecting more than 175 airline flights with an average 40-minute delay per flight.

## 4. AHA size as an operational intelligence signal

An agent that tracks AHA polygon area over successive launches of the same vehicle can detect operationally meaningful changes:

| LHA area change (vs. prior flight) | Probable cause |
|-------------------------------------|---------------|
| Larger than previous flight | New trajectory, reliability reduction, expanded mission (RTLS add-on, new stage-2 disposal site) |
| Smaller than previous flight | Improved reliability score, simplified mission profile, SDI real-time shrink |
| Same polygon, different orientation | Trajectory azimuth change (inclination change, launch window timing) |
| New foreign FIR polygon added | Expanded trajectory (e.g., Starship eastward KSC launch adding Bahamas AHA that wasn't in Boca Chica trajectory) |

**Implementation:** Parse the NOTAM E) field coordinates list, compute the polygon area using the shoelace formula, store in the dataset as `{flight_id, aha_polygon_area_nm2, aha_vertex_count, aha_firs_affected}`, and compare against the rolling vehicle-family baseline.

## 5. Dynamic AHA: real-time shrinking during flight

Traditional AHAs are **static** — the full polygon is activated before launch and released after the flight. The FAA is moving toward **dynamic AHAs** that shrink in real time as the vehicle clears each hazard zone. This is enabled by the **Space Data Integrator (SDI)**, which feeds live vehicle state vectors into TFMS.

**Current state (2024–2026):**
- SDI is operational and used for every major US commercial launch.
- SpaceX shares live telemetry via SDI.
- FAA ATC can reroute aircraft dynamically when the actual debris falls within a **sub-corridor** of the pre-activated AHA polygon — aircraft that are outside the real-time debris cone but inside the pre-declared AHA polygon can be released into their original flight path sooner than the NOTAM expiry time.
- A formally designated "dynamic LHA" (dLHA) protocol does not yet exist as a named regulatory framework (as of mid-2026). The FAA uses SDI-enabled real-time monitoring and controller judgment rather than automated dLHA activation.
- The size of the AHA can **shrink over successive flights** as the operator accumulates reliability data — this is a vehicle-level learning effect across flights, not a within-flight dynamic. For Falcon 9, the AHA has decreased over its ~340-flight history compared to its initial LHA sizing. For Starship, the AHA grew between IFT-4 and IFT-9 after the IFT-8 mishap increased conservative analysis inputs.

**Trend (2024–2026):** The FAA CSINAS ConOps (Commercial Space Integration into the National Airspace System) calls for progressive adoption of **Time-Based Launch Procedures** — shifting from blanket airspace closures to per-flight dynamic corridors keyed to the actual vehicle state. This will reduce the average divert burden from 40+ minutes per affected flight toward single-digit minutes for nominal flights.

## 6. AHA and the NOTAM agent: what to extract

For each launch NOTAM the agent parses, extract and store:

```json
{
  "notam_number": "A1559/25",
  "vehicle": "STARSHIP",
  "flight": "IFT-9",
  "launch_site": "BOCA CHICA TX",
  "aha_type": "ascent+stage2",
  "effective_utc": "2025-05-13T23:30Z",
  "expiry_utc": "2025-05-14T01:35Z",
  "backup_windows": ["2025-05-14T23:30Z/2025-05-15T01:35Z", "..."],
  "aha_polygon_vertices": [
    "2400N07952W", "2318N07658W", "2211N07525W",
    "2320N07951W", "2340N08121W", "2346N08205W", "2400N08302W"
  ],
  "aha_firs_affected": ["MUFH", "MUHA", "MKJK"],
  "altitude_floor_ft": 0,
  "altitude_ceiling": "UNLIMITED",
  "airlines_affected_estimate": null,
  "aha_polygon_area_nm2": null
}
```

**Phase 1 decision verbs this enables:**
- **Predict:** Slip probability increases if no NOTAM filed within 72h of NET date, or if AHA includes new foreign FIR (regulatory coordination delay)
- **Recommend:** Defer any downlink scheduling window that overlaps the AHA activation time (SDR ground station operators near the launch corridor may see RF interference from the vehicle)
- **Brief:** Pre-launch survivability brief includes AHA size vs. vehicle baseline; flag if the current LHA is significantly larger than prior flights of the same vehicle

## 7. AHA for re-entry and EOL operations (Phase 5)

Re-entry AHAs are sized by the same dispersion-ellipse + buffer method, applied to the predicted impact point of the re-entering body. For:

- **Controlled re-entry (deorbit burn):** Tight dispersion ellipse + 10 nm buffer; NOTAM filed 48–72h in advance when the planned impact zone is defined
- **Uncontrolled/decaying re-entry:** AHA is not filed until the impact window narrows to a predictable footprint (typically within 12–24 hours). The NOTAM may cover very large ocean areas early and shrink as tracking improves.

For Spacesharks Phase 5, the agent should watch for re-entry NOTAMs filed under the satellite's operator name or NORAD ID as indicators that the deorbit has been initiated or that decay is imminent.

## 8. Related pages

- [[concepts/notam]] — NOTAM base structure and retrieval
- [[concepts/notam-space-operations]] — all space-ops NOTAM subcategories
- [[concepts/launch-window-slip]] — how AHA activation interacts with slips and scrubs
- [[synthesis/faa-notam-launch-lifecycle]] — end-to-end agent guide
- [[sources/faa-part-450-2020]] — regulatory basis (§ 450.133 and Appendix B to former Part 417)
- [[sources/faa-ast-launch-licensing-2025]] — licensing chain upstream of each AHA
- [[sources/notam-starship-ift8-2025]] — concrete AHA example (IFT-8 scrub + IFT-9 expanded AHA)
- [[sources/faa-notam-search-2024]] — retrieval recipe for AHA polygon data
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — mission-desk agent that uses AHA data
