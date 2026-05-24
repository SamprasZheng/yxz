#!/usr/bin/env bash
URL="http://127.0.0.1:11434/v1/chat/completions"

run() {
  local label="$1"; shift
  local prompt="$1"; shift
  echo
  echo "─── $label ───"
  echo "Q: $prompt"
  local t0=$(date +%s%N)
  local resp=$(curl -s "$URL" -H "Content-Type: application/json" -d "$(python3 -c "
import json,sys
print(json.dumps({
  'model':'llama3.1:8b',
  'messages':[{'role':'user','content':'''$prompt'''}],
  'stream':False
}))")")
  local t1=$(date +%s%N)
  local ms=$(( (t1 - t0) / 1000000 ))
  python3 -c "
import json
d = json.loads('''$resp''')
m = d['choices'][0]['message']['content']
u = d.get('usage',{})
ct = u.get('completion_tokens',0)
tps = ct * 1000 / $ms if $ms > 0 else 0
print('A:', m.strip()[:400])
print(f'[{ct} tok in {$ms} ms = {tps:.1f} tok/s]')
"
}

echo "=== Active model ==="
$HOME/.local/bin/ollama ps

run "Math" "What is 137 times 49? Show the multiplication step by step in 3 lines max."

run "Code" "Write one Python line that returns the largest prime factor of 600851475143."

run "Reasoning" "I have 3 apples. I give 1 to Alice, then buy 5 more, then split them evenly with Bob. How many do I end up with? Reason in 2 sentences."

run "Tool-call format" "You have access to function search_flights(origin, dest, date). User asks: find flights TPE to CDG on 2026-06-15. Respond ONLY with a JSON object like {\"function\":\"search_flights\",\"args\":{\"origin\":\"...\",\"dest\":\"...\",\"date\":\"...\"}}. No other text."

echo
echo "=== GPU after 4 runs ==="
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu,temperature.gpu --format=csv,noheader
