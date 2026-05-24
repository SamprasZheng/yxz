---
type: concept
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, astrodynamics]
---

# Pc — Probability of Collision

Pc is the scalar probability that two resident space objects will physically collide during a predicted close-approach event. It is the primary decision metric in all conjunction assessment workflows and the number that determines whether a satellite operator executes a collision avoidance maneuver (CAM).

## Mathematical Definition

For a short-term encounter (relative velocity >> positional uncertainty change during flyby — the standard assumption for LEO), Pc is computed as a 2-D integral of the combined position-error probability density function (PDF) over the collision cross-section in the encounter plane (also called the conjunction plane).

Formally, given:
- combined position covariance projected onto the encounter plane → 2×2 matrix **C**
- combined hard-body radius (HBR) → sets the collision disk of radius *r* = HBR
- relative position at TCA projected onto the encounter plane → **x₀**

Pc = integral over the disk of radius *r* of a bivariate normal PDF centred at **x₀** with covariance **C**.

Because the relative velocity is high and the encounter short, the 3-D problem collapses to 2-D without meaningful loss of accuracy for most LEO events. This assumption breaks down for very low relative-velocity encounters (GEO station-keeping, rendezvous) — for those, long-encounter methods (e.g., Coppola 2012, Alfano 2005 Monte Carlo) are used instead.

## Computation Methods

Eight state-of-the-art methods for short-term encounters are documented in the literature. The five most relevant operationally:

| Method | Type | Key Characteristic |
|---|---|---|
| **Foster & Estes (1992)** | 2-D numerical integration | Original JSpOC/18 SDS baseline; semi-analytic 2-D quadrature over the collision disk |
| **Akella & Alfriend (2000)** | Reformulated numerical | Reformulates Foster as a time integral, equivalent result, improved numerical conditioning |
| **Chan (analytic series)** | Analytic series | Transforms bivariate PDF to Rician, derives a 1-D series expression; fast but converges slowly at high eccentricity ratio |
| **Alfano (error-function series)** | Analytic series | Combination of error functions and exponential terms; good for small miss distances |
| **Patera (numerical)** | Numerical | High accuracy across parameter ranges; computationally heavier |

NASA CARA's implementation recommendations (NTRS 20190028900) benchmark these methods and identify conditions under which each is appropriate. For the Firefly / NemoClaw agent, the Foster/Alfano analytic approximation is adequate for triage; high-fidelity Monte Carlo is used when Pc is near a decision threshold (± one order of magnitude around 1×10⁻⁴).

## Assumptions and Limitations

- **Gaussian covariance**: Pc assumes the position errors of both objects are Gaussian. Real covariances are non-Gaussian (especially for TLE-based estimates) — a major source of Pc unreliability.
- **Covariance realism**: An overconfident (too-small) covariance inflates Pc; an underconfident covariance deflates it. 18 SDS covariances are known to be optimistic for many objects. Commercial providers (LeoLabs, COMSPOC) publish covariance realism metrics.
- **Short-encounter assumption**: Breaks down below ~1 m/s relative speed.
- **Object size uncertainty**: HBR is often assumed; actual size/shape is rarely known precisely for debris.
- **Dilution region events**: When the miss distance is large relative to covariance, Pc is sensitive to small covariance changes — a known pathological regime documented by CARA.

## Operational Thresholds (Verified Values)

| Tier | Pc Range | Action Required |
|---|---|---|
| **Red (High Risk)** | Pc ≥ 1×10⁻⁴ | Mandatory risk mitigation maneuver per NASA NPR 8079.1; ESA also uses 1×10⁻⁴ as HIE threshold |
| **Yellow (Moderate)** | 1×10⁻⁵ ≤ Pc < 1×10⁻⁴ | Enhanced monitoring; maneuver analysis initiated; default NASA yellow threshold is 7×10⁻⁵ per CARA architecture documents |
| **Green (Low)** | Pc < 1×10⁻⁵ | Operational attention possible above 1×10⁻⁷; below 1×10⁻⁷ generally no action |

Notes:
- The NASA yellow/green boundary is frequently cited as 7×10⁻⁵ in CARA architecture documentation (NTRS 20190029214) though some sources round to 1×10⁻⁵.
- ESA uses Pc ≥ 1×10⁻⁴ for High Impact Events (HIE). JAXA uses 1×10⁻³ (more conservative).
- SpaceX Starlink uses the Alfano two-dimensional method for CDM Pc population; their maneuver threshold is not publicly disclosed.
- Commercial operators vary widely: some execute maneuvers at 1×10⁻⁵, others at 1×10⁻⁶. No international standard.

⚠️ The exact NASA yellow floor (7×10⁻⁵ vs 1×10⁻⁵) is a known ambiguity in public documentation. The Firefly agent should treat any event with Pc ≥ 1×10⁻⁵ as requiring maneuver analysis and flag the threshold uncertainty in its output.

## Pc vs. Miss Distance

Pc alone is not sufficient for decision-making:

- A small miss distance + large covariance can give a lower Pc than a large miss distance + tiny covariance.
- Operators combine: (1) Pc, (2) raw miss distance, (3) covariance quality flag (realism score), (4) object sizes, (5) maneuver cost.
- The "dilution region" (high miss distance, poor covariance) requires special handling — CARA tags these events separately.

## Relation to CDM Fields

The CDM (CCSDS 508.0-B-1) includes `COLLISION_PROBABILITY` and `COLLISION_PROBABILITY_METHOD` as fields. The method string (e.g., `FOSTER-1992`, `CHAN-1997`) distinguishes which algorithm produced the reported Pc. In Space-Track `cdm_public`, the Pc field is `PC` (as decimal). In TraCSS CDM spec v2.1 (July 2025), the field name is `COLLISION_PROBABILITY` per CCSDS standard.

## See Also

- [[concepts/tca-time-of-closest-approach]] — the event epoch that defines the encounter plane
- [[concepts/covariance-ellipsoid]] — the uncertainty structure that enters the Pc integral
- [[concepts/hard-body-radius]] — the collision disk radius in the 2-D integral
- [[concepts/screening-volume]] — first-pass filter that generates candidate events for Pc computation
- [[synthesis/cdm-pc-decisioning]] — end-to-end workflow: CDM ingest → Pc → maneuver decision
- [[sources/ccsds-508-cdm-2013]] — standard definition of CDM fields
- [[sources/nasa-cara-handbook-2023]] — NASA operational Pc procedures and thresholds
- [[synthesis/spacesharks-mission-desk-hackathon-plan]] — conjunction triage verb in the mission desk
