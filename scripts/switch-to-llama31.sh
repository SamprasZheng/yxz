#!/usr/bin/env bash
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "=== patch sandboxes.json + onboard-session.json to llama3.1:8b ==="
python3 - <<'PY'
import json, os
home = os.path.expanduser("~")
p1 = home + "/.nemoclaw/sandboxes.json"
d = json.load(open(p1))
d["sandboxes"]["my-assistant"]["model"] = "llama3.1:8b"
d["sandboxes"]["my-assistant"]["provider"] = "ollama-local"
json.dump(d, open(p1,"w"), indent=2)
print("sandboxes.json patched ->", d["sandboxes"]["my-assistant"]["model"])

p2 = home + "/.nemoclaw/onboard-session.json"
d2 = json.load(open(p2))
d2["model"] = "llama3.1:8b"
d2["provider"] = "ollama-local"
d2["endpointUrl"] = "http://127.0.0.1:11434/v1"
json.dump(d2, open(p2,"w"), indent=2)
print("onboard-session.json patched ->", d2["model"])
PY

echo
echo "=== switch openshell route ==="
nemoclaw inference set --provider ollama-local --model llama3.1:8b --sandbox my-assistant --no-verify 2>&1 | tail -6

echo
echo "=== re-run onboard (resume) ==="
nemoclaw onboard --resume --name my-assistant --non-interactive --yes --yes-i-accept-third-party-software --no-gpu --no-sandbox-gpu 2>&1 | tail -50

echo
echo "=== sandbox processes ==="
nemoclaw my-assistant exec --no-tty --timeout 10 -- bash -lc 'ps -ef | head -20'
