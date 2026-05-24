#!/usr/bin/env bash
TOKEN="$(${HOME}/.local/bin/nemoclaw my-assistant gateway-token --quiet 2>/dev/null || true)"
URL="$(${HOME}/.local/bin/nemoclaw my-assistant dashboard-url --quiet 2>/dev/null | sed -n 's/.*\(http:[^ ]*\)/\1/p')"
BASE="${URL%%#*}"
[ -z "$BASE" ] && BASE="http://127.0.0.1:18789/"
[ -z "$TOKEN" ] && TOKEN="${URL##*token=}"

echo "BASE=$BASE"
echo "TOKEN(len)=${#TOKEN}"
echo

for p in api/ api/health api/state api/chat api/sessions api/agents api/threads api/messages openapi.json docs healthz; do
  full="${BASE}${p}"
  code=$(curl -s -o /tmp/probe.body -w "%{http_code}" -H "Authorization: Bearer $TOKEN" --max-time 3 "$full")
  size=$(stat -c %s /tmp/probe.body 2>/dev/null)
  echo "$code  ($size B)  $p"
done

echo
echo "--- root HTML (first 60 lines, look for JS endpoints) ---"
curl -s -H "Authorization: Bearer $TOKEN" "$BASE" | head -60
