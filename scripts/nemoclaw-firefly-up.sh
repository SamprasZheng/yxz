#!/usr/bin/env bash
# Bring up the Firefly sandbox inside NemoClaw + point it at local Ollama.
# Idempotent. Assumes scripts/start-ollama.sh has already been run.
#
# Usage:
#   bash scripts/nemoclaw-firefly-up.sh
#
# Pre-reqs (one-time):
#   bash scripts/start-ollama.sh
#   ~/.local/bin/ollama pull nemotron-3-nano:4b
#   bash scripts/nemoclaw-force-ollama.sh    # creates ollama-local provider

set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
POLICY="$REPO_ROOT/agents/firefly-sandbox.yaml"

echo "=== Firefly sandbox policy: $POLICY ==="
test -f "$POLICY" || { echo "MISSING policy file: $POLICY"; exit 1; }

echo
echo "=== ollama health ==="
curl -sS --max-time 3 http://127.0.0.1:11434/api/tags | head -c 400 || echo "ollama not reachable — run scripts/start-ollama.sh first"

echo
echo "=== existing sandboxes ==="
openshell sandbox list 2>&1 | head -20

echo
echo "=== create or update firefly sandbox ==="
openshell sandbox create --name firefly --policy "$POLICY" 2>&1 | tail -10
openshell sandbox update --name firefly --policy "$POLICY" 2>&1 | tail -5

echo
echo "=== bind-mount wiki/ + agents/ into the sandbox ==="
openshell sandbox mount --sandbox firefly --source "$REPO_ROOT/wiki" --target /sandbox/wiki --mode rw 2>&1 | tail -3
openshell sandbox mount --sandbox firefly --source "$REPO_ROOT/agents" --target /sandbox/agents --mode ro 2>&1 | tail -3

echo
echo "=== route inference to ollama-local + nemotron-3-nano:4b ==="
nemoclaw inference set --provider ollama-local --model nemotron-3-nano:4b --sandbox firefly --no-verify 2>&1 | tail -10

echo
echo "=== verify ==="
nemoclaw inference get --sandbox firefly 2>&1
echo
echo "READY. Run a mission with:"
echo "  nemoclaw agent run --sandbox firefly --cmd 'cd /sandbox/agents && firefly plan --from Taiwan --to SSO-600km --window 30d'"
