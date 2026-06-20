---
type: concept
tags: [conjunction, cdm, pc, ssa, space-debris, mission-desk, firefly, astrodynamics]
---

# Hard-Body Radius (HBR)

The Hard-Body Radius (HBR) is the radius of a sphere that is used to represent a space object's physical extent for the purpose of collision probability calculation. In the [[concepts/pc-probability-of-collision|Pc]] integral, the **combined HBR** of the primary and secondary objects defines the radius of the collision disk in the encounter plane — the area over which the bivariate normal PDF is integrated.

## Definition

Because real satellites are non-spherical, HBR is a conservative simplification: a sphere large enough to circumscribe the object in its worst-case orientation relative to the approaching trajectory. NASA CARA's published methodology (NTRS 20190028904, "Recommended Methods for Setting Mission Hard Body Radii") provides three approaches:

1. **Circumscribing sphere**: radius = largest dimension / 2. Most conservative; appropriate when satellite orientation is unknown.
2. **RMS effective radius**: root-mean-square of half the projected area across random orientations; less conservative, statistically motivated.
3. **Cross-section-weighted average**: physical cross-section averaged over all orientations; used when attitude knowledge is available.

## Combined HBR

For a conjunction between primary object A and secondary object B:

```
HBR_combined = HBR_A + HBR_B
```

This combined HBR is the disk radius in the encounter plane. The CDM field `AREA_PC` encodes the cross-sectional area of each object used in Pc calculation (= π × HBR²), so HBR can be reverse-engineered from AREA_PC.

## Typical Values

These are representative order-of-magnitude values for planning; actual values depend on specific satellite configuration:

| Object Class | Typical HBR |
|---|---|
| CubeSat (3U) | 0.1–0.2 m |
| Small LEO satellite (50–200 kg) | 0.5–1.5 m |
| Large GEO satellite (3,000+ kg bus) | 3–8 m |
| Spent rocket body (upper stage) | 2–5 m |
| Fragmentation debris (10 cm trackable) | ~0.05–0.2 m |
| ISS | ~50 m (extreme end due to solar array span) |

For tracked debris where physical dimensions are unknown, 18 SDS applies a default HBR based on the object's radar cross-section (RCS) estimate. Space Fence data significantly improved RCS resolution for small debris (10 cm class) after 2020.

## Effect on Pc

HBR has a nonlinear effect on Pc:
- A doubling of HBR (combined) quadruples the collision disk area.
- For a miss distance close to HBR (near-miss event), even a small HBR uncertainty can change Pc by an order of magnitude.
- For a miss distance >> HBR (typical screening-volume event), HBR uncertainty has second-order effect on Pc.

Operators are advised (CARA best practices) to use conservative (larger) HBR estimates when object dimensions are poorly known, accepting false-alarm cost over missed-event cost.

## HBR in CDM Fields

CCSDS 508.0-B-1 defines `HARD_BODY_RADIUS` as an optional field (unit: km). In practice, Space-Track CDMs often do not populate this field for secondary (debris) objects. The Firefly agent should apply a default HBR from a size/mass estimate lookup table when the CDM field is absent.

## Historical Lineage

HBR formalises a simplification implicit in conjunction analysis since **Foster & Estes (1992)**: the [[concepts/pc-probability-of-collision|Pc]] integral needs a finite collision area, so each object is reduced to a circumscribing sphere. As tracking resolution improved — particularly **Space Fence** (Kwajalein, operational 2020, ~5 cm LEO RCS resolution) — RCS-derived default HBRs for small debris became less crude. NASA CARA codified the three setting methods (circumscribing / RMS-effective / cross-section-weighted) in NTRS 20190028904, and the field was carried as optional in CCSDS 508.0-B-1 (2013). The trajectory is from "assume a worst-case sphere" toward "use measured size when the sensor network can resolve it."

## Long-Horizon View (labelled scenario, not fact)

On a 100-year horizon HBR has a paradoxical fate: **it becomes simultaneously more standardised and less relevant.** More standardised because mega-constellations and active-debris-removal programs will publish authoritative per-bus dimensions, retiring the RCS-guess defaults for tracked objects. Less relevant because the population that actually drives the Kessler cascade is the **1–10 cm "deadly-but-untrackable" debris** (see [[synthesis/space-situational-awareness-six-region]]): for those fragments there is no catalog entry, no covariance, and therefore no Pc integral to put an HBR into — the lethal kinetic energy (a 1 cm aluminium fragment at ~10 km/s ≈ a small grenade) far exceeds what any HBR-based maneuver budget can dodge, because the conjunction is never seen. Scenario fork: either sub-10 cm tracking (space-based optical / advanced radar) brings these objects into the HBR/Pc regime, or HBR remains a precise answer to the wrong question for the objects that matter most. The invariant: **HBR is only meaningful for objects you can already track.**

## Standards / Provider Convention (horizontal axis)

Strict 台美日韓中國歐洲 geography is **N/A** — HBR is object geometry, not national policy (the regional axis is the *sensor resolution* behind default-HBR estimation, covered in [[synthesis/space-situational-awareness-six-region]]). The meaningful horizontal axis is **who supplies the HBR**: operators supply true bus dimensions for their own (primary) satellites; 18 SDS / Space-Track applies an RCS-based default for untracked-dimension secondaries (often leaving `HARD_BODY_RADIUS` unpopulated in `cdm_public`); commercial providers with better imaging/RCS (LeoLabs radar, space-based optical) tighten the secondary estimate. CARA best practice across all of them is identical: **when in doubt, bias HBR larger** (accept false-alarm cost over missed-event cost).

## Implementation Reality (code↔concept, 2026-06-20)

The "apply a default HBR from a size/mass lookup table" behaviour described above is **not implemented**. The built Firefly `RiskAgent` (`agents/src/firefly/agents/risk.py`) never computes a Pc integral and therefore never sets or defaults an HBR — it consumes a pre-computed probability from the 30-day shell aggregate `cdm_30d_summary` (`agents/src/firefly/tools/space_track.py`). HBR handling is part of the aspirational independent-Pc path, not the current build — flagged for the owner (no code edited).

## See Also

- [[concepts/pc-probability-of-collision]] — uses HBR to define the integration domain
- [[concepts/covariance-ellipsoid]] — the other input to the Pc integral
- [[concepts/screening-volume]] — a separate box filter applied before HBR/covariance-based Pc
- [[sources/nasa-cara-handbook-2023]] — CARA methodology for setting HBR
- [[synthesis/cdm-pc-decisioning]] — how to handle missing HBR in public CDMs
- [[synthesis/space-situational-awareness-six-region]] — the 1–10 cm untrackable-debris gap that bounds HBR's relevance
