#!/usr/bin/env bash
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
"$HOME/.local/bin/ollama" pull qwen2.5-coder:7b
echo "--- list ---"
"$HOME/.local/bin/ollama" list
