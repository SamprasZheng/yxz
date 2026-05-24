#!/usr/bin/env bash
set +e
export PATH="$HOME/.local/bin:$PATH"

for i in 1 2 3 4 5 6 7 8; do
  state=$(docker ps --filter 'name=openshell-my-assistant' --format '{{.Status}}')
  echo "container: $state"
  case "$state" in *healthy*) break;; esac
  sleep 3
done

echo
echo "=== fresh onboard (no --resume) ==="
nemoclaw onboard --name my-assistant --non-interactive --yes --yes-i-accept-third-party-software --no-gpu --no-sandbox-gpu 2>&1 | tail -30

echo
echo "=== sync route ==="
nemoclaw inference set --provider ollama-local --model llama3.1:8b --sandbox my-assistant --no-verify 2>&1 | tail -8

echo
echo "=== doctor ==="
nemoclaw my-assistant doctor 2>&1 | tail -18

echo
echo "=== URL ==="
nemoclaw my-assistant dashboard-url --quiet | sed 's|172\.[0-9.]\+|localhost|'
