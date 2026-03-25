import React, {useMemo, useState} from 'react';

type OrbitKey = 'LEO' | 'MEO' | 'GEO' | 'Lunar';

type OrbitCfg = {
  label: string;
  tidBase: number;
  seeBase: number;
};

const ORBIT_OPTIONS: Record<OrbitKey, OrbitCfg> = {
  LEO: {label: 'LEO', tidBase: 0.8, seeBase: 1.0e-6},
  MEO: {label: 'MEO', tidBase: 3.5, seeBase: 8.0e-6},
  GEO: {label: 'GEO', tidBase: 8.0, seeBase: 2.0e-5},
  Lunar: {label: 'Lunar', tidBase: 12.0, seeBase: 5.0e-5},
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function toNum(value: string | number, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return 'N/A';
  return value.toLocaleString(undefined, {maximumFractionDigits: digits});
}

function estimateTidKrad({
  orbit,
  years,
  shieldMm,
  leoAltitudeKm,
  leoInclinationDeg,
}: {
  orbit: OrbitKey;
  years: string | number;
  shieldMm: string | number;
  leoAltitudeKm: string | number;
  leoInclinationDeg: string | number;
}) {
  const cfg = ORBIT_OPTIONS[orbit];
  const y = clamp(toNum(years, 1), 0.1, 20);
  const sh = clamp(toNum(shieldMm, 2), 0, 20);
  const alt = clamp(toNum(leoAltitudeKm, 550), 200, 2000);
  const inc = clamp(toNum(leoInclinationDeg, 53), 0, 98);

  const altitudeFactor = orbit === 'LEO' ? clamp(0.65 + (alt - 200) / 1600, 0.6, 1.25) : 1.0;
  const inclinationFactor = orbit === 'LEO' ? clamp(0.8 + inc / 220, 0.8, 1.25) : 1.0;
  const shieldingFactor = Math.exp(-0.35 * Math.max(0, sh - 2));

  return cfg.tidBase * y * altitudeFactor * inclinationFactor * shieldingFactor;
}

function solveShieldForTidLimit({
  orbit,
  years,
  tidLimitKrad,
  leoAltitudeKm,
  leoInclinationDeg,
}: {
  orbit: OrbitKey;
  years: string | number;
  tidLimitKrad: string | number;
  leoAltitudeKm: string | number;
  leoInclinationDeg: string | number;
}) {
  const cfg = ORBIT_OPTIONS[orbit];
  const y = clamp(toNum(years, 1), 0.1, 20);
  const limit = clamp(toNum(tidLimitKrad, 10), 0.1, 2000);
  const alt = clamp(toNum(leoAltitudeKm, 550), 200, 2000);
  const inc = clamp(toNum(leoInclinationDeg, 53), 0, 98);
  const altitudeFactor = orbit === 'LEO' ? clamp(0.65 + (alt - 200) / 1600, 0.6, 1.25) : 1.0;
  const inclinationFactor = orbit === 'LEO' ? clamp(0.8 + inc / 220, 0.8, 1.25) : 1.0;

  const unshieldedAt2mm = cfg.tidBase * y * altitudeFactor * inclinationFactor;
  if (unshieldedAt2mm <= limit) return 2;

  const mm = 2 + Math.log(unshieldedAt2mm / limit) / 0.35;
  return clamp(mm, 0, 20);
}

function estimateSee({
  orbit,
  missionDays,
  shieldMm,
  letThreshold,
  sigmaCm2,
  protectedBits,
}: {
  orbit: OrbitKey;
  missionDays: string | number;
  shieldMm: string | number;
  letThreshold: string | number;
  sigmaCm2: string | number;
  protectedBits: string | number;
}) {
  const cfg = ORBIT_OPTIONS[orbit];
  const days = clamp(toNum(missionDays, 365), 1, 3650);
  const sh = clamp(toNum(shieldMm, 2), 0, 20);
  const letTh = clamp(toNum(letThreshold, 20), 1, 120);
  const sigma = clamp(toNum(sigmaCm2, 1e-7), 1e-10, 1e-3);
  const bits = clamp(toNum(protectedBits, 1e6), 1, 1e12);

  const sensitivityFactor = Math.pow(20 / letTh, 1.2);
  const crossSectionFactor = sigma / 1e-7;
  const bitsFactor = bits / 1e6;
  const shieldingFactor = Math.exp(-0.08 * sh);

  const dailyEvents = cfg.seeBase * sensitivityFactor * crossSectionFactor * bitsFactor * shieldingFactor;
  const expectedEvents = dailyEvents * days;
  const probabilityAtLeastOne = 1 - Math.exp(-expectedEvents);

  return {dailyEvents, expectedEvents, probabilityAtLeastOne};
}

function TidCalculator() {
  const [orbit, setOrbit] = useState<OrbitKey>('LEO');
  const [years, setYears] = useState<string | number>(3);
  const [shieldMm, setShieldMm] = useState<string | number>(2);
  const [leoAltitudeKm, setLeoAltitudeKm] = useState<string | number>(550);
  const [leoInclinationDeg, setLeoInclinationDeg] = useState<string | number>(53);
  const [tidLimitKrad, setTidLimitKrad] = useState<string | number>(15);

  const doseKrad = useMemo(
    () =>
      estimateTidKrad({
        orbit,
        years,
        shieldMm,
        leoAltitudeKm,
        leoInclinationDeg,
      }),
    [orbit, years, shieldMm, leoAltitudeKm, leoInclinationDeg]
  );

  const requiredShield = useMemo(
    () =>
      solveShieldForTidLimit({
        orbit,
        years,
        tidLimitKrad,
        leoAltitudeKm,
        leoInclinationDeg,
      }),
    [orbit, years, tidLimitKrad, leoAltitudeKm, leoInclinationDeg]
  );

  return (
    <div>
      <h3>Simple Orbital TID Calculator</h3>
      <p>Trend-only tool: dose or shielding versus orbit across LEO/MEO/GEO/Lunar.</p>
      <p>
        Orbit:
        <select value={orbit} onChange={(e) => setOrbit(e.target.value as OrbitKey)} style={{marginLeft: 8}}>
          {Object.keys(ORBIT_OPTIONS).map((k) => (
            <option key={k} value={k}>
              {ORBIT_OPTIONS[k as OrbitKey].label}
            </option>
          ))}
        </select>
      </p>
      <p>
        Mission duration (years):
        <input type="number" min="0.1" max="20" step="0.1" value={years} onChange={(e) => setYears(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>
        Al equivalent shielding (mm):
        <input type="number" min="0" max="20" step="0.1" value={shieldMm} onChange={(e) => setShieldMm(e.target.value)} style={{marginLeft: 8}} />
      </p>
      {orbit === 'LEO' && (
        <>
          <p>
            LEO altitude (km):
            <input type="number" min="200" max="2000" step="10" value={leoAltitudeKm} onChange={(e) => setLeoAltitudeKm(e.target.value)} style={{marginLeft: 8}} />
          </p>
          <p>
            LEO inclination (deg):
            <input type="number" min="0" max="98" step="1" value={leoInclinationDeg} onChange={(e) => setLeoInclinationDeg(e.target.value)} style={{marginLeft: 8}} />
          </p>
        </>
      )}
      <p>
        Device TID limit (krad(Si)):
        <input type="number" min="0.1" max="2000" step="0.1" value={tidLimitKrad} onChange={(e) => setTidLimitKrad(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>Estimated mission TID: <strong>{format(doseKrad, 3)} krad(Si)</strong></p>
      <p>Estimated shielding to meet TID limit: <strong>{format(requiredShield, 2)} mm Al eq.</strong></p>
    </div>
  );
}

function SeeCalculator() {
  const [orbit, setOrbit] = useState<OrbitKey>('LEO');
  const [missionDays, setMissionDays] = useState<string | number>(365);
  const [shieldMm, setShieldMm] = useState<string | number>(2);
  const [letThreshold, setLetThreshold] = useState<string | number>(20);
  const [sigmaCm2, setSigmaCm2] = useState<string | number>(1e-7);
  const [protectedBits, setProtectedBits] = useState<string | number>(1e6);

  const result = useMemo(
    () =>
      estimateSee({
        orbit,
        missionDays,
        shieldMm,
        letThreshold,
        sigmaCm2,
        protectedBits,
      }),
    [orbit, missionDays, shieldMm, letThreshold, sigmaCm2, protectedBits]
  );

  return (
    <div>
      <h3>Simple Orbital SEE Calculator</h3>
      <p>Trend-only tool: expected SEE events across LEO/MEO/GEO/Lunar.</p>
      <p>
        Orbit:
        <select value={orbit} onChange={(e) => setOrbit(e.target.value as OrbitKey)} style={{marginLeft: 8}}>
          {Object.keys(ORBIT_OPTIONS).map((k) => (
            <option key={k} value={k}>
              {ORBIT_OPTIONS[k as OrbitKey].label}
            </option>
          ))}
        </select>
      </p>
      <p>
        Mission duration (days):
        <input type="number" min="1" max="3650" step="1" value={missionDays} onChange={(e) => setMissionDays(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>
        Al equivalent shielding (mm):
        <input type="number" min="0" max="20" step="0.1" value={shieldMm} onChange={(e) => setShieldMm(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>
        LET threshold (MeV*cm2/mg):
        <input type="number" min="1" max="120" step="0.5" value={letThreshold} onChange={(e) => setLetThreshold(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>
        Device cross-section sigma (cm2/event):
        <input type="number" min="1e-10" max="1e-3" step="1e-8" value={sigmaCm2} onChange={(e) => setSigmaCm2(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>
        Sensitive/protected bits:
        <input type="number" min="1" max="1000000000000" step="1000" value={protectedBits} onChange={(e) => setProtectedBits(e.target.value)} style={{marginLeft: 8}} />
      </p>
      <p>Estimated SEE/day: <strong>{result.dailyEvents.toExponential(3)}</strong></p>
      <p>Expected SEE in mission: <strong>{format(result.expectedEvents, 4)}</strong></p>
      <p>Probability of at least one SEE: <strong>{format(result.probabilityAtLeastOne * 100, 2)}%</strong></p>
    </div>
  );
}

export default function RadiationCalculators(): JSX.Element {
  return (
    <>
      <TidCalculator />
      <SeeCalculator />
    </>
  );
}
