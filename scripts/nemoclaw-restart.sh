#!/usr/bin/env bash
# Full NemoClaw restart: stop gateway + sandbox, then bring back up.
# Preserves sandbox data and current inference config (ollama-local / qwen2.5-coder:7b).
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "=== [1/5] state before ==="
nemoclaw status 2>&1 | head -15
echo
echo "openshell-gateway PIDs:"
pgrep -af openshell-gateway | head

echo
echo "=== [2/5] stop gateway + sandbox container ==="
# Stop sandbox container (Docker Desktop driver)
CNAME=$(docker ps --filter "name=openshell-my-assistant" --format "{{.Names}}")
if [ -n "$CNAME" ]; then
  echo "stopping container: $CNAME"
  docker stop "$CNAME" 2>&1 | tail -3
fi

# Kill openshell-gateway and any leftover ssh/ssh-proxy bridges
pkill -f openshell-gateway 2>/dev/null
pkill -f "openshell ssh-proxy" 2>/dev/null
pkill -f "nemoclaw my-assistant connect" 2>/dev/null

sleep 3
echo "remaining openshell procs:"
pgrep -af "openshell|nemoclaw " | grep -v "$$" | head

echo
echo "=== [3/5] verify clean ==="
docker ps --filter "name=openshell-my-assistant" --format "{{.Names}} | {{.Status}}"
ss -tlnp 2>/dev/null | grep -E "8080|18789" || echo "no gateway listeners"

echo
echo "=== [4/5] bring back up (onboard --resume keeps existing config) ==="
nemoclaw onboard --resume --non-interactive --yes --yes-i-accept-third-party-software --no-gpu --no-sandbox-gpu 2>&1 | tail -30

echo
echo "=== [5/5] state after ==="
sleep 2
nemoclaw status 2>&1 | head -20
echo
nemoclaw my-assistant doctor 2>&1 | head -20
echo
nemoclaw inference get
