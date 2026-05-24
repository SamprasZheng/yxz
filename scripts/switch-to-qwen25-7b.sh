#!/usr/bin/env bash
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
OLLAMA="$HOME/.local/bin/ollama"

echo "=== [1/4] pull qwen2.5:7b (~4.4 GB) ==="
"$OLLAMA" pull qwen2.5:7b
echo

echo "=== [2/4] verify tools capability ==="
"$OLLAMA" show qwen2.5:7b | grep -A4 -i "capab"
echo

echo "=== [3/4] switch NemoClaw route ==="
# Try WITHOUT --no-verify first — qwen2.5 instruct should pass the smoke test
nemoclaw inference set --provider ollama-local --model qwen2.5:7b --sandbox my-assistant 2>&1 | tail -15
echo
echo "If verify failed above, force it:"
nemoclaw inference set --provider ollama-local --model qwen2.5:7b --sandbox my-assistant --no-verify 2>&1 | tail -8

echo
echo "=== [4/4] doctor ==="
nemoclaw my-assistant doctor 2>&1 | tail -12

echo
echo "Dashboard URL:"
nemoclaw my-assistant dashboard-url --quiet | sed "s|172\.[0-9.]\+|localhost|"
