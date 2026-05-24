#!/usr/bin/env bash
URL="http://127.0.0.1:11434/v1/chat/completions"
TMP=$(mktemp)
TMPRESP=$(mktemp)

run() {
  local label="$1"; shift
  local prompt="$1"
  python3 -c "import json,sys; print(json.dumps({'model':'llama3.1:8b','messages':[{'role':'user','content':sys.argv[1]}],'stream':False,'options':{'num_predict':400}}))" "$prompt" > "$TMP"

  echo
  echo "═══ $label ═══"
  echo "Q: $prompt"
  local t0=$(date +%s%N)
  curl -s "$URL" -H "Content-Type: application/json" --data @"$TMP" > "$TMPRESP"
  local t1=$(date +%s%N)
  local ms=$(( (t1 - t0) / 1000000 ))
  python3 -c "
import json
try:
    d = json.load(open('$TMPRESP'))
    m = d['choices'][0]['message']['content']
    u = d.get('usage',{})
    ct = u.get('completion_tokens',0)
    tps = ct * 1000 / $ms if $ms > 0 else 0
    print('A:', m.strip())
    print(f'⏱  {ct} tok / {$ms/1000:.1f}s = {tps:.1f} tok/s')
except Exception as e:
    print('PARSE ERROR:', e)
    print(open('$TMPRESP').read()[:400])
"
}

echo "═══ Model status ═══"
$HOME/.local/bin/ollama ps

run "中文問答" "台北是哪個國家的首都？一句話回答。"
run "翻譯" "Translate to traditional Chinese: 'The flight from Taipei to Paris takes about 13 hours with a layover.'"
run "代碼" "Write a Python function that returns whether a year is a leap year. Just the function, no explanation."
run "數學推理" "A train leaves Taipei at 9:00 AM going 80 km/h. Paris is 9700 km away. When does it arrive? Show calculation, one line."
run "創意寫作" "Write a haiku (3 lines, 5-7-5 syllables) about ramen, in English."

echo
echo "═══ GPU final ═══"
nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu,temperature.gpu --format=csv,noheader

rm -f "$TMP" "$TMPRESP"
