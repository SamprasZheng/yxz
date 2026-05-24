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

## See Also

- [[concepts/pc-probability-of-collision]] — uses HBR to define the integration domain
- [[concepts/covariance-ellipsoid]] — the other input to the Pc integral
- [[concepts/screening-volume]] — a separate box filter applied before HBR/covariance-based Pc
- [[sources/nasa-cara-handbook-2023]] — CARA methodology for setting HBR
- [[synthesis/cdm-pc-decisioning]] — how to handle missing HBR in public CDMs
