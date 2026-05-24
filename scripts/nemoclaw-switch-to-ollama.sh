#!/usr/bin/env bash
# Switch NemoClaw inference from cloud nvidia-prod to local Ollama (GPU)
set -e
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
export PATH="$HOME/.local/bin:$PATH"

echo "=== current inference route ==="
nemoclaw inference get

echo
echo "=== switch to local ollama @ qwen2.5-coder:7b ==="
NEMOCLAW_PROVIDER=ollama \
NEMOCLAW_MODEL=qwen2.5-coder:7b \
NEMOCLAW_YES=1 \
nemoclaw onboard --non-interactive --yes --yes-i-accept-third-party-software --no-gpu --no-sandbox-gpu 2>&1 | tail -50

echo
echo "=== new inference route ==="
nemoclaw inference get

echo
echo "=== sandbox status ==="
nemoclaw my-assistant status 2>&1 | head -20
