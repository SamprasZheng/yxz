#!/usr/bin/env bash
URL="http://127.0.0.1:11434/v1/chat/completions"
TMP=$(mktemp)
TMPRESP=$(mktemp)

run() {
  local label="$1"; shift
  local prompt="$1"
  python3 -c "import json,sys; print(json.dumps({'model':'llama3.1:8b','messages':[{'role':'user','content':sys.argv[1]}],'stream':False}))" "$prompt" > "$TMP"

  echo
  echo "─── $label ───"
  echo "Q: $prompt"
  local t0=$(date +%s%N)
  curl -s "$URL" -H "Content-Type: application/json" --data @"$TMP" > "$TMPRESP"
  local t1=$(date +%s%N)
  local ms=$(( (t1 - t0) / 1000000 ))
  python3 -c "
import json, sys
d = json.load(open('$TMPRESP'))
m = d['choices'][0]['message']['content']
u = d.get('usage',{})
ct = u.get('completion_tokens',0)
tps = ct * 1000 / $ms if $ms > 0 else 0
print('A:', m.strip())
print(f'[{ct} tok / {$ms} ms = {tps:.1f} tok/s]')
"
}

echo "=== Active model ==="
$HOME/.local/bin/ollama ps

run "Math" "What is 137 times 49? Show the multiplication in 3 lines max."

run "Code" "Write a single Python lambda that returns the nth Fibonacci number using recursion."

run "Reasoning" "I have 3 apples. I give 1 to Alice, then buy 5 more, then split them evenly with Bob. How many do I have? Reason in 2 sentences."

run "Tool-call JSON" 'You have function search_flights(origin, dest, date). User: find flights TPE to CDG on 2026-06-15. Respond ONLY with valid JSON like {"function":"search_flights","args":{"origin":"TPE","dest":"CDG","date":"2026-06-15"}}. No other text.'

run "Multi-step" "Write 3 lines: (1) a one-sentence summary of CRISPR, (2) the year it won the Nobel, (3) the names of the two scientists."

echo
echo "=== GPU after experiments ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu,temperature.gpu --format=csv,noheader

rm -f "$TMP" "$TMPRESP"
