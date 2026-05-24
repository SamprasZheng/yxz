#!/usr/bin/env bash
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "=== existing providers ==="
openshell provider list

echo
echo "=== cleanup leftover probe ==="
openshell provider delete probe-openai 2>&1 | tail -1

echo
echo "=== create openai-typed provider pointing at Ollama ==="
openshell provider create --name ollama-local --type openai \
  --credential OPENAI_API_KEY=dummy \
  --config base_url=http://127.0.0.1:11434/v1 2>&1

echo
echo "=== providers ==="
openshell provider list

echo
echo "=== nemoclaw inference set --no-verify ==="
nemoclaw inference set --provider ollama-local --model qwen2.5-coder:7b --sandbox my-assistant --no-verify 2>&1 | tail -20

echo
echo "=== verify ==="
openshell inference get
echo
nemoclaw inference get
