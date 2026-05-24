#!/usr/bin/env bash
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
OLLAMA="$HOME/.local/bin/ollama"

# Ensure daemon is up
if ! curl -sf http://127.0.0.1:11434/api/version >/dev/null 2>&1; then
  echo "Ollama daemon not running, starting..."
  bash /mnt/d/DOT/yxz/scripts/start-ollama.sh
  sleep 3
fi

echo "=== pulling llama3.1:8b (~4.9 GB) ==="
"$OLLAMA" pull llama3.1:8b
echo
echo "=== capabilities ==="
"$OLLAMA" show llama3.1:8b | grep -A4 -i "capab"
echo
echo "=== list ==="
"$OLLAMA" list
