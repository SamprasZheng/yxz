#!/usr/bin/env bash
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "=== sandbox status ==="
nemoclaw my-assistant status 2>&1 | head -15

echo
echo "=== VRAM baseline ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader

echo
echo "=== fire a request through the OpenShell gateway (sandbox-facing route) ==="
# the OpenShell gateway proxies inference requests via inference.local; from host it is on the gateway port.
# Fastest verify path: just probe gateway-side health.
nemoclaw my-assistant doctor 2>&1 | head -25

echo
echo "=== fire a real chat via gateway upstream (Ollama directly) to time GPU response ==="
time curl -s http://127.0.0.1:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen2.5-coder:7b","messages":[{"role":"user","content":"write a python one-liner that sums squares 1 to 10"}],"stream":false}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); m=d['choices'][0]['message']['content']; u=d.get('usage',{}); print('reply:',m[:200]); print('usage:',u)"

echo
echo "=== VRAM after ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader

echo
echo "=== ollama ps ==="
$HOME/.local/bin/ollama ps
