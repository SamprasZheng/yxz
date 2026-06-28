import json

path = r"D:\DOT\$hark\outputs\ma-scan-2026-06-09.json"
with open(path, encoding="utf-8") as f:
    d = json.load(f)

EXCLUDE = {"INTC","VST","ALAB","ARM","STM","ESTC","RKLB","DXCM","OKTA","CLX",
           "MRVL","IRDM","RDW","VECO","PDFS","SJM","PAYO","LFVN","AGMH","BMHL","NOW"}

rows = d["rows"]

def raw_score(r):
    s = 0.0
    if r["aligned"]:
        s += 32
    if r["riding"]:
        s += 26
    if r["cross_ma20"]:
        s += 8
    if r["cross_ma60"]:
        s += 8
    if r["above_ma50"]:
        s += 5
    if r["above_ma200"]:
        s += 5
    # proximity to 52w high: 0 at -30% or worse, up to 10 at the high
    dh = r["dist_52w_high_pct"]
    s += max(0.0, min(10.0, 10.0 * (1 + dh / 30.0)))
    # RSI quality: healthy momentum band
    rsi = r["rsi"]
    if 55 <= rsi <= 70:
        s += 6
    elif 50 <= rsi < 55:
        s += 3
    elif rsi > 75:
        s -= 4
    return s

scored = []
for t, r in rows.items():
    if t in EXCLUDE:
        continue
    if not (r["aligned"] or r["riding"] or r["cross_ma20"] or r["cross_ma60"]):
        continue
    scored.append((raw_score(r), t, r))

scored.sort(key=lambda x: -x[0])
mx = scored[0][0]

print(f"max_raw={mx:.1f}  n_candidates={len(scored)}")
print()
hdr = f"{'rank':<5}{'tkr':<7}{'norm':<6}{'raw':<7}{'algn':<6}{'ride':<6}{'x20':<5}{'x60':<5}{'rsi':<6}{'d52hi':<8}{'d52lo':<9}{'close':<10}sector"
print(hdr)
for i, (s, t, r) in enumerate(scored[:30], 1):
    norm = round(100 * s / mx)
    print(f"{i:<5}{t:<7}{norm:<6}{s:<7.1f}{str(r['aligned']):<6}{str(r['riding']):<6}"
          f"{str(r['cross_ma20']):<5}{str(r['cross_ma60']):<5}{r['rsi']:<6.1f}"
          f"{r['dist_52w_high_pct']:<8.1f}{r['dist_52w_low_pct']:<9.1f}{r['close']:<10.2f}{r['sector']}")

# bottom-signal names (per rows, in case list empty but flags set)
bottoms = [t for t, r in rows.items() if r.get("bottom")]
print(f"\nbottom-flagged rows: {bottoms if bottoms else 'NONE'}")

# vol_contract + rsi_divergence near 52w low (closest analog to bottom setup) for context
near_low = [(t, r) for t, r in rows.items()
            if t not in EXCLUDE and r["dist_52w_low_pct"] < 15 and r["rsi_divergence"]]
near_low.sort(key=lambda x: x[1]["dist_52w_low_pct"])
print("\nnear-52w-low + rsi_divergence (proto-bottom watch):")
for t, r in near_low[:10]:
    print(f"  {t:<7} d52lo={r['dist_52w_low_pct']:.1f}% rsi={r['rsi']:.1f} volc={r['vol_contract']} sector={r['sector']}")

# sector breadth sorted
print("\nsector breadth (pct_above_ma50):")
sb = sorted(d["sector_breadth"].items(), key=lambda kv: -kv[1]["pct_above_ma50"])
for name, v in sb:
    print(f"  {name:<24} n={v['n']:<5} above_ma50={v['pct_above_ma50']:<6} aligned={v['pct_aligned']}")
