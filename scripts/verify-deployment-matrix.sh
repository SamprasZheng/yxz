#!/usr/bin/env bash
# verify-deployment-matrix.sh
#
# Final-delivery verification matrix for the Spacesharks Mission Desk.
# Drives the L1 Nemotron-attestation probe (verify-nemotron-route.sh) against
# all four deployment surfaces (Open Cloud / Nemo Cloud / Sandbox / Docker),
# and prints the markdown matrix the submission README references.
#
# Source of truth for the matrix:
#   wiki/synthesis/spacesharks-mission-desk-verification-plan.md §5
#
# Required env (any unset surface is reported "skipped"):
#   OPEN_CLOUD_BASE_URL   default https://integrate.api.nvidia.com/v1
#   OPEN_CLOUD_API_KEY    (NVIDIA developer key)
#   NEMO_CLOUD_BASE_URL   (paid partner NIM URL; stretch surface)
#   NEMO_CLOUD_API_KEY
#   SANDBOX_BASE_URL      default http://127.0.0.1:8642
#   DOCKER_BASE_URL       default http://127.0.0.1:9000  (mission-desk container exposes here)
#
# Exit codes:
#   0  every "required" cell green; submission is ready
#   1  at least one required cell failed; submission is NOT ready
#   2  argument / environment problem

set -u
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
route_probe="${script_dir}/verify-nemotron-route.sh"

if [[ ! -x "${route_probe}" ]]; then
  if [[ -f "${route_probe}" ]]; then
    chmod +x "${route_probe}" 2>/dev/null || true
  fi
fi
if [[ ! -f "${route_probe}" ]]; then
  echo "missing companion script: ${route_probe}" >&2
  exit 2
fi

OPEN_CLOUD_BASE_URL="${OPEN_CLOUD_BASE_URL:-https://integrate.api.nvidia.com/v1}"
SANDBOX_BASE_URL="${SANDBOX_BASE_URL:-http://127.0.0.1:8642}"
DOCKER_BASE_URL="${DOCKER_BASE_URL:-http://127.0.0.1:9000}"

# Tracking: status per (surface,layer). 0=pass 1=fail 2=skipped 3=n/a
declare -A status
declare -A note

run_layer() {
  # run_layer <surface> <layer-key> <required-bool> <cmd...>
  local surface="$1" layer="$2" required="$3"; shift 3
  local key="${surface}.${layer}"
  if "$@" >/dev/null 2>&1; then
    status["${key}"]=0
  else
    status["${key}"]=1
    if [[ "${required}" == "1" ]]; then
      note["${key}"]="REQUIRED-FAIL"
    else
      note["${key}"]="stretch-fail"
    fi
  fi
}

mark_skipped() {
  local surface="$1" layer="$2"; status["${surface}.${layer}"]=2
}

mark_na() {
  local surface="$1" layer="$2"; status["${surface}.${layer}"]=3
}

probe_route() {
  local surface="$1" base="$2" key="${3:-}"
  bash "${route_probe}" "${surface}" "${base}" "${key}"
}

# ---------- L1: per-surface Nemotron route ----------
echo "== L1: Nemotron route attestation =="

if [[ -n "${OPEN_CLOUD_API_KEY:-}" ]]; then
  if probe_route open-cloud "${OPEN_CLOUD_BASE_URL}" "${OPEN_CLOUD_API_KEY}"; then
    status["open-cloud.L1"]=0
  else
    status["open-cloud.L1"]=1; note["open-cloud.L1"]="REQUIRED-FAIL"
  fi
else
  mark_skipped open-cloud L1
  note["open-cloud.L1"]="OPEN_CLOUD_API_KEY unset"
fi

if [[ -n "${NEMO_CLOUD_BASE_URL:-}" && -n "${NEMO_CLOUD_API_KEY:-}" ]]; then
  if probe_route nemo-cloud "${NEMO_CLOUD_BASE_URL}" "${NEMO_CLOUD_API_KEY}"; then
    status["nemo-cloud.L1"]=0
  else
    status["nemo-cloud.L1"]=1; note["nemo-cloud.L1"]="stretch-fail"
  fi
else
  mark_skipped nemo-cloud L1
  note["nemo-cloud.L1"]="stretch surface — NEMO_CLOUD_* unset"
fi

if probe_route sandbox "${SANDBOX_BASE_URL}"; then
  status["sandbox.L1"]=0
else
  status["sandbox.L1"]=1; note["sandbox.L1"]="REQUIRED-FAIL — judge harness target"
fi

if probe_route docker "${DOCKER_BASE_URL}"; then
  status["docker.L1"]=0
else
  status["docker.L1"]=1; note["docker.L1"]="REQUIRED-FAIL — start the container?"
fi

# ---------- L2: parser unit tests ----------
echo
echo "== L2: parser unit tests =="
unit_cmd=(python -m pytest -q tests/unit)
for surface in open-cloud nemo-cloud sandbox docker; do
  run_layer "${surface}" L2 1 "${unit_cmd[@]}"
done

# ---------- L3: schema + provenance integration ----------
echo
echo "== L3: schema + provenance integration =="
int_cmd=(python -m pytest -q tests/integration)
for surface in open-cloud nemo-cloud sandbox docker; do
  run_layer "${surface}" L3 1 "${int_cmd[@]}"
done

# ---------- L4: sandbox-policy chaos (sandbox only) ----------
echo
echo "== L4: sandbox policy chaos =="
mark_na open-cloud L4
mark_na nemo-cloud L4
mark_na docker L4
if [[ -x tests/sandbox/test_nemoclaw_denies_offlist.sh ]]; then
  run_layer sandbox L4 1 bash tests/sandbox/test_nemoclaw_denies_offlist.sh
else
  status["sandbox.L4"]=1; note["sandbox.L4"]="REQUIRED-FAIL — chaos script missing"
fi

# ---------- L5: golden-event replay ----------
echo
echo "== L5: golden-event replay =="
golden_cmd=(python -m pytest -q tests/golden)
for surface in open-cloud nemo-cloud sandbox docker; do
  required=1
  [[ "${surface}" == "nemo-cloud" ]] && required=0  # stretch
  run_layer "${surface}" L5 "${required}" "${golden_cmd[@]}"
done

# ---------- L6: 24h soak (sandbox only; sentinel-file gated) ----------
echo
echo "== L6: 24h soak =="
mark_na open-cloud L6
mark_na nemo-cloud L6
mark_na docker L6
soak_sentinel="data/soak/last-run-success.json"
if [[ -f "${soak_sentinel}" ]]; then
  status["sandbox.L6"]=0
else
  status["sandbox.L6"]=1; note["sandbox.L6"]="REQUIRED-FAIL — no successful soak sentinel at ${soak_sentinel}"
fi

# ---------- L7: final-delivery gate (derived) ----------
echo
echo "== L7: final-delivery gate =="
# L7 passes for a surface iff all its required layers pass.
for surface in open-cloud nemo-cloud sandbox docker; do
  all_required_pass=1
  for layer in L1 L2 L3 L4 L5 L6; do
    key="${surface}.${layer}"
    s="${status[${key}]:-3}"
    if [[ "${s}" == "1" ]]; then
      if [[ "${surface}" == "nemo-cloud" ]]; then
        continue  # stretch
      fi
      all_required_pass=0
      break
    fi
  done
  if [[ "${all_required_pass}" == "1" ]]; then
    status["${surface}.L7"]=0
  else
    status["${surface}.L7"]=1
    [[ "${surface}" != "nemo-cloud" ]] && note["${surface}.L7"]="REQUIRED-FAIL"
  fi
done

# ---------- Render matrix ----------
cell() {
  local key="$1"
  local s="${status[${key}]:-3}"
  case "${s}" in
    0) printf '✅' ;;
    1) printf '❌' ;;
    2) printf '⏭️' ;;
    3) printf 'n/a' ;;
  esac
}

echo
echo "== Verification matrix =="
printf '| Layer | Open Cloud | Nemo Cloud | Sandbox | Docker |\n'
printf '|---|---|---|---|---|\n'
for layer in L1 L2 L3 L4 L5 L6 L7; do
  printf '| %s | %s | %s | %s | %s |\n' \
    "${layer}" \
    "$(cell open-cloud.${layer})" \
    "$(cell nemo-cloud.${layer})" \
    "$(cell sandbox.${layer})" \
    "$(cell docker.${layer})"
done

# ---------- Notes ----------
echo
echo "== Notes =="
for key in "${!note[@]}"; do
  printf '  - %s: %s\n' "${key}" "${note[${key}]}"
done | sort

# ---------- Final verdict ----------
fail=0
required_keys=(
  open-cloud.L1 open-cloud.L2 open-cloud.L3 open-cloud.L5 open-cloud.L7
  sandbox.L1   sandbox.L2   sandbox.L3   sandbox.L4 sandbox.L5 sandbox.L6 sandbox.L7
  docker.L1    docker.L2    docker.L3    docker.L5  docker.L7
)
for key in "${required_keys[@]}"; do
  if [[ "${status[${key}]:-1}" != "0" ]]; then
    fail=1
    break
  fi
done

echo
if [[ "${fail}" == "0" ]]; then
  echo "SUBMISSION READY — all required cells green"
  exit 0
fi
echo "SUBMISSION NOT READY — at least one required cell failed; see Notes" >&2
exit 1
