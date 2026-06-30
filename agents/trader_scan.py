"""
Daily trader scan — standalone script (no trader CLI pipeline yet).
Fetches 30d OHLCV via yfinance, computes RSI-14, 5/20-day momentum,
volume ratio, and produces a JSON scan artifact.

Run: python3 agents/trader_scan.py --date 2026-06-30
"""

import json
import sys
import argparse
from datetime import date, timedelta, datetime

try:
    import yfinance as yf
except ImportError:
    print("yfinance not installed; run: pip install yfinance", file=sys.stderr)
    sys.exit(1)

WATCHLIST = [
    "NVDA", "AAPL", "TSLA", "MSFT", "AMD",
    "GOOGL", "META", "AMZN", "SMCI", "PLTR",
    "AVGO", "TSM", "ARM", "INTC", "QCOM",
]


def rsi(closes, period=14):
    if len(closes) < period + 1:
        return None
    gains, losses = [], []
    for i in range(1, len(closes)):
        d = closes[i] - closes[i - 1]
        gains.append(max(d, 0))
        losses.append(max(-d, 0))
    avg_g = sum(gains[:period]) / period
    avg_l = sum(losses[:period]) / period
    for i in range(period, len(gains)):
        avg_g = (avg_g * (period - 1) + gains[i]) / period
        avg_l = (avg_l * (period - 1) + losses[i]) / period
    if avg_l == 0:
        return 100.0
    rs = avg_g / avg_l
    return round(100 - 100 / (1 + rs), 2)


def direction_from_signals(rsi_val, mom5, mom20, vol_ratio):
    score = 0
    if rsi_val is not None:
        if rsi_val < 35:
            score += 1  # oversold → bullish
        elif rsi_val > 70:
            score -= 1  # overbought → bearish
    if mom5 is not None:
        score += 1 if mom5 > 0.01 else (-1 if mom5 < -0.01 else 0)
    if mom20 is not None:
        score += 1 if mom20 > 0.03 else (-1 if mom20 < -0.03 else 0)
    if vol_ratio is not None:
        score += 0.5 if vol_ratio > 1.3 else (-0.5 if vol_ratio < 0.7 else 0)
    if score > 0.5:
        return "long"
    elif score < -0.5:
        return "short"
    return "abstain"


def confidence_from_score(score_abs):
    # 0..3.5 → 0..1
    return round(min(score_abs / 3.5, 1.0), 3)


def sizing_sigma(confidence, rsi_val):
    # Larger position when confidence high and RSI not extreme
    base = confidence
    if rsi_val is not None and 40 <= rsi_val <= 65:
        base *= 1.2  # sweet-spot RSI
    return round(min(base, 1.0), 3)


def scan_ticker(ticker, window_days=30):
    end = date.today()
    start = end - timedelta(days=window_days + 10)
    try:
        df = yf.download(
            ticker,
            start=start.isoformat(),
            end=end.isoformat(),
            auto_adjust=True,
            progress=False,
        )
    except Exception as e:
        return {"ticker": ticker, "error": str(e)}

    if df is None or len(df) < 5:
        return {"ticker": ticker, "error": "insufficient data"}

    closes = [float(v) for v in df["Close"].dropna().tolist()]
    volumes = [float(v) for v in df["Volume"].dropna().tolist()]

    if len(closes) < 5:
        return {"ticker": ticker, "error": "insufficient closes"}

    rsi_val = rsi(closes)
    mom5 = (closes[-1] / closes[-6] - 1) if len(closes) >= 6 else None
    mom20 = (closes[-1] / closes[-21] - 1) if len(closes) >= 21 else None
    avg_vol = sum(volumes[-20:]) / min(len(volumes), 20) if volumes else None
    vol_ratio = (volumes[-1] / avg_vol) if avg_vol and avg_vol > 0 else None

    # Raw score for direction
    raw_score = 0
    if rsi_val is not None:
        if rsi_val < 35:
            raw_score += 1
        elif rsi_val > 70:
            raw_score -= 1
    if mom5 is not None:
        raw_score += 1 if mom5 > 0.01 else (-1 if mom5 < -0.01 else 0)
    if mom20 is not None:
        raw_score += 1 if mom20 > 0.03 else (-1 if mom20 < -0.03 else 0)
    if vol_ratio is not None:
        raw_score += 0.5 if vol_ratio > 1.3 else (-0.5 if vol_ratio < 0.7 else 0)

    direction = "long" if raw_score > 0.5 else ("short" if raw_score < -0.5 else "abstain")
    conf = confidence_from_score(abs(raw_score))
    sz = sizing_sigma(conf, rsi_val)

    return {
        "ticker": ticker,
        "price": round(closes[-1], 2),
        "rsi14": rsi_val,
        "mom5d_pct": round(mom5 * 100, 2) if mom5 is not None else None,
        "mom20d_pct": round(mom20 * 100, 2) if mom20 is not None else None,
        "vol_ratio": round(vol_ratio, 3) if vol_ratio is not None else None,
        "raw_score": round(raw_score, 2),
        "direction": direction,
        "confidence": conf,
        "sizing_sigma": sz,
        "error": None,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", default=date.today().isoformat())
    parser.add_argument("--tickers", default=",".join(WATCHLIST))
    parser.add_argument("--window", type=int, default=30)
    parser.add_argument("--out", default=None)
    args = parser.parse_args()

    tickers = [t.strip().upper() for t in args.tickers.split(",") if t.strip()]
    print(f"Scanning {len(tickers)} tickers for {args.date}...", file=sys.stderr)

    results = []
    for t in tickers:
        r = scan_ticker(t, args.window)
        print(f"  {t}: {r.get('direction','?')} conf={r.get('confidence','?')} err={r.get('error')}", file=sys.stderr)
        results.append(r)

    output = {
        "scan_date": args.date,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "backend": "yfinance-local",
        "note": "Trader CLI pipeline not yet present; standalone yfinance scan used.",
        "tickers": results,
    }

    out_path = args.out or f"/home/user/yxz/agents/outputs/scan-{args.date}.json"
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
