#!/usr/bin/env bash
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
OLLAMA="$HOME/.local/bin/ollama"
echo "--- ollama list ---"
"$OLLAMA" list
echo
echo "--- one-shot generation (GPU check) ---"
curl -s http://127.0.0.1:11434/api/generate -d '{"model":"qwen2.5-coder:7b","prompt":"print hello in python in one line","stream":false}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('response:', d.get('response','')[:200]); print('eval_count:', d.get('eval_count')); print('eval_duration_ms:', d.get('eval_duration',0)//1_000_000)"
echo
echo "--- ollama ps (shows GPU loading) ---"
"$OLLAMA" ps
echo
echo "--- nvidia-smi VRAM usage ---"
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv
