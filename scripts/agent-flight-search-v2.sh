#!/usr/bin/env bash
set +e
PROMPT="Search round-trip flights Taipei TPE to Paris CDG, depart 2026-06-15 return 2026-06-29, 1 adult economy. List top 3: airline, USD price, total duration, layover count. Use web search for real prices."

echo "=== [1/3] recover gateway pairing ==="
$HOME/.local/bin/nemoclaw my-assistant recover 2>&1 | tail -10

echo
echo "=== [2/3] retry via gateway (default) ==="
date
time $HOME/.local/bin/nemoclaw my-assistant exec --no-tty --timeout 300 -- \
  bash -lc "openclaw agent --to '+15550000001' --message '$PROMPT' --timeout 240 2>&1 | tail -50" 2>&1 | tail -60
date

echo
echo "=== [3/3] if above failed, retry with explicit --local + env wired to Ollama ==="
date
time $HOME/.local/bin/nemoclaw my-assistant exec --no-tty --timeout 300 -- \
  bash -lc "export OPENAI_API_KEY=dummy OPENAI_BASE_URL=http://host.docker.internal:11434/v1 OPENAI_MODEL=qwen2.5-coder:7b; openclaw agent --local --to '+15550000001' --message '$PROMPT' --timeout 240 2>&1 | tail -50" 2>&1 | tail -60
date

echo
echo "=== GPU stats ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader
