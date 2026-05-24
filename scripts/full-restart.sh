#!/usr/bin/env bash
# Full clean restart of NemoClaw + Ollama stack
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "═══════════════════════════════════════════════════"
echo "  [1/8] Teardown — kill bridges, gateway, ollama"
echo "═══════════════════════════════════════════════════"
pkill -f "ssh.*L.*18789" 2>/dev/null; echo "  killed ssh -L 18789 bridges"
pkill -f "openshell ssh-proxy" 2>/dev/null; echo "  killed ssh-proxy"
pkill -f "nemoclaw.*connect" 2>/dev/null; echo "  killed nemoclaw connect"
pkill -f openshell-gateway 2>/dev/null; echo "  killed openshell-gateway"
pkill -x ollama 2>/dev/null; echo "  killed ollama"
sleep 2

echo
echo "═══════════════════════════════════════════════════"
echo "  [2/8] Stop sandbox container"
echo "═══════════════════════════════════════════════════"
CNAME=$(docker ps --filter "name=openshell-my-assistant" --format "{{.Names}}")
if [ -n "$CNAME" ]; then
  docker stop "$CNAME" 2>&1 | tail -2
else
  echo "  (no running container)"
fi

echo
echo "═══════════════════════════════════════════════════"
echo "  [3/8] Verify clean state"
echo "═══════════════════════════════════════════════════"
pgrep -af "openshell-gateway|ollama serve|ssh.*L.*18789" | head -5 || echo "  ✓ no leftover procs"
docker ps --format "{{.Names}}" | grep openshell || echo "  ✓ no openshell containers running"
ss -tlnp 2>/dev/null | grep -E ":(8080|11434|18789)" || echo "  ✓ no leftover listeners"

echo
echo "═══════════════════════════════════════════════════"
echo "  [4/8] Start Ollama"
echo "═══════════════════════════════════════════════════"
nohup ollama serve > /tmp/ollama.log 2>&1 &
sleep 5
curl -sf http://127.0.0.1:11434/api/version && echo " ← ollama up"
ollama list

echo
echo "═══════════════════════════════════════════════════"
echo "  [5/8] Ensure provider has correct OPENAI_BASE_URL"
echo "═══════════════════════════════════════════════════"
# Start container first so gateway can talk to it
CNAME=$(docker ps -a --filter "name=openshell-my-assistant" --format "{{.Names}}")
[ -n "$CNAME" ] && docker start "$CNAME" 2>&1 | tail -2
sleep 3

# Bring up gateway via onboard
nemoclaw onboard --resume --name my-assistant --non-interactive --yes --yes-i-accept-third-party-software --no-gpu --no-sandbox-gpu 2>&1 | tail -20

echo
echo "═══════════════════════════════════════════════════"
echo "  [6/8] Verify provider config"
echo "═══════════════════════════════════════════════════"
openshell provider get ollama-local 2>&1 | tail -10

echo
echo "═══════════════════════════════════════════════════"
echo "  [7/8] Force inference route to llama3.1:8b"
echo "═══════════════════════════════════════════════════"
nemoclaw inference set --provider ollama-local --model llama3.1:8b --sandbox my-assistant --no-verify 2>&1 | tail -8

echo
echo "═══════════════════════════════════════════════════"
echo "  [8/8] Final doctor + URL"
echo "═══════════════════════════════════════════════════"
sleep 2
nemoclaw my-assistant doctor 2>&1 | tail -20
echo
echo "  Dashboard URL:"
nemoclaw my-assistant dashboard-url --quiet | sed 's|172\.[0-9.]\+|localhost|'
echo
echo "  GPU:"
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv,noheader
