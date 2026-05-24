#!/usr/bin/env bash
# Start Ollama daemon (user-scope install)
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
export OLLAMA_HOST="127.0.0.1:11434"
nohup ollama serve > /tmp/ollama.log 2>&1 &
echo "ollama-pid=$!"
sleep 5
curl -sf http://127.0.0.1:11434/api/version && echo
tail -30 /tmp/ollama.log
