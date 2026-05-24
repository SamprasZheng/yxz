#!/usr/bin/env bash
# Enable NemoClaw sandbox GPU passthrough.
# Run this INSIDE WSL Ubuntu (will sudo-prompt). Idempotent.
set -e

echo "=== [1/5] NVIDIA Container Toolkit apt repo ==="
if [ ! -f /etc/apt/sources.list.d/nvidia-container-toolkit.list ]; then
  curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
    | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
  curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
    | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#' \
    | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list >/dev/null
else
  echo "  repo already present"
fi

echo "=== [2/5] apt install nvidia-container-toolkit ==="
sudo apt-get update -qq
sudo apt-get install -y nvidia-container-toolkit

echo "=== [3/5] Generate CDI spec ==="
sudo mkdir -p /etc/cdi
sudo nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml
nvidia-ctk cdi list

echo "=== [4/5] Restart Docker Desktop integration ==="
echo "If the next step fails with 'CDI not loaded', toggle Docker Desktop > Settings > Resources > WSL integration off/on for this distro, then rerun [5/5]."

echo "=== [5/5] Re-onboard NemoClaw with GPU ==="
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
nemoclaw onboard \
  --non-interactive --yes --yes-i-accept-third-party-software \
  --recreate-sandbox \
  --sandbox-gpu --sandbox-gpu-device nvidia.com/gpu=0 \
  --name my-assistant 2>&1 | tail -40

echo
echo "=== status ==="
nemoclaw my-assistant status 2>&1 | head -15
