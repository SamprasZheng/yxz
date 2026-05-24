#!/usr/bin/env bash
PROMPT="Search for round-trip flight options from Taipei (TPE) to Paris (CDG), France, departing 2026-06-15 returning 2026-06-29 for 1 adult, economy class. Return top 3 options with airline, price (USD), total duration, layovers. Use web search if you need real prices."

echo "=== firing agent turn (will take 30-60s due to tools + GPU inference) ==="
date
time $HOME/.local/bin/nemoclaw my-assistant exec --no-tty --timeout 300 -- bash -lc "openclaw agent --to '+15550000001' --message '$PROMPT' --json --timeout 240 2>&1" 2>&1 | tail -60
echo
date
echo
echo "=== GPU stats after run ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader
