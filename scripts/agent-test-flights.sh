#!/usr/bin/env bash
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"

echo "=== probe sandbox interior ==="
nemoclaw my-assistant exec --no-tty -- bash -lc 'echo "--- PATH ---"; echo $PATH; echo "--- agent binaries ---"; ls /opt /home 2>&1 | head -20; which python3 node curl 2>&1; find / -maxdepth 4 -name "nemoclaw-start*" -o -name "openclaw*" 2>/dev/null | head' 2>&1 | tail -30

echo
echo "=== dashboard URL ==="
nemoclaw my-assistant dashboard-url 2>&1
