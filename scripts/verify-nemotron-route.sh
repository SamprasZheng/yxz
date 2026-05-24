#!/usr/bin/env bash
# verify-nemotron-route.sh
#
# L1 health + route attestation for ONE deployment surface.
# Greps the surface's /v1/models for a Nemotron model id; exits 0 only on match.
#
# Backs the L7 final-delivery gate from:
#   wiki/synthesis/spacesharks-mission-desk-verification-plan.md
#
# Usage:
#   verify-nemotron-route.sh <surface-name> <base-url> [api-key]
#
# Examples:
#   verify-nemotron-route.sh open-cloud  https://integrate.api.nvidia.com/v1  "$NVIDIA_API_KEY"
#   verify-nemotron-route.sh nemo-cloud  "$NEMO_CLOUD_BASE_URL"               "$NEMO_CLOUD_API_KEY"
#   verify-nemotron-route.sh sandbox     http://127.0.0.1:8642
#   verify-nemotron-route.sh docker      http://127.0.0.1:9000
#
# Exit codes:
#   0  Nemotron route attested
#   1  health failed
#   2  /v1/models returned no Nemotron id
#   3  bad arguments

set -u

surface="${1:-}"
base_url="${2:-}"
api_key="${3:-}"

if [[ -z "${surface}" || -z "${base_url}" ]]; then
  echo "usage: $0 <surface-name> <base-url> [api-key]" >&2
  exit 3
fi

auth_args=()
if [[ -n "${api_key}" ]]; then
  auth_args=( -H "Authorization: Bearer ${api_key}" )
fi

# Strip trailing slash to keep URL composition unambiguous.
base_url="${base_url%/}"

echo "[${surface}] L1.a health: ${base_url}/health"
if ! curl -sfm 5 "${auth_args[@]}" "${base_url}/health" >/dev/null; then
  # Some NIM surfaces do not expose /health; fall back to a /v1/models probe.
  echo "[${surface}] /health unavailable, falling back to /v1/models" >&2
fi

echo "[${surface}] L1.b route attestation: ${base_url}/v1/models"
models_json="$(curl -sfm 10 "${auth_args[@]}" "${base_url}/v1/models" || true)"
if [[ -z "${models_json}" ]]; then
  echo "[${surface}] FAIL: /v1/models unreachable" >&2
  exit 1
fi

# Try jq if available; otherwise grep.
if command -v jq >/dev/null 2>&1; then
  matched_id="$(printf '%s' "${models_json}" | jq -r '.data[].id // empty' 2>/dev/null \
                 | grep -iE 'nemotron' | head -1 || true)"
else
  matched_id="$(printf '%s' "${models_json}" \
                 | grep -ioE '"id"[[:space:]]*:[[:space:]]*"[^"]*nemotron[^"]*"' \
                 | head -1 | sed -E 's/.*"id"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/' || true)"
fi

if [[ -z "${matched_id}" ]]; then
  echo "[${surface}] FAIL: no Nemotron model id in /v1/models" >&2
  printf '%s\n' "${models_json}" | head -5 >&2
  exit 2
fi

echo "[${surface}] PASS: routed model = ${matched_id}"
printf '%s\n' "${matched_id}"
exit 0
