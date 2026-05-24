#!/usr/bin/env bash
# Path 1: create low-temp llama3.1 variant to suppress tool-name hallucination
# Path 2: pull nemotron-3-nano:4b
set +e
export PATH="$HOME/.local/bin:$PATH"
export LD_LIBRARY_PATH="$HOME/.local/lib/ollama:$LD_LIBRARY_PATH"
OLLAMA="$HOME/.local/bin/ollama"

echo "═══ Path 1: build llama3.1:8b-tight (temp=0, strict tool calling) ═══"
cat > /tmp/Modelfile.llama-tight <<EOF
FROM llama3.1:8b
PARAMETER temperature 0
PARAMETER top_p 0.1
PARAMETER repeat_penalty 1.1
SYSTEM """You are a strict tool-using assistant. When you need a tool, you MUST use the exact name from the available tools list. If unsure which tool to use, call the meta-tool tool_search first to discover available tools. NEVER invent tool names. For trivial questions that don't need tools, answer directly in plain text."""
EOF
"$OLLAMA" create llama3.1:8b-tight -f /tmp/Modelfile.llama-tight 2>&1 | tail -5
echo

echo "═══ Path 2: pull nemotron-3-nano:4b (Nemotron-3 family, hackathon-aligned) ═══"
"$OLLAMA" pull nemotron-3-nano:4b 2>&1 | tail -3
echo
echo "Capabilities:"
"$OLLAMA" show nemotron-3-nano:4b | grep -A4 -i "capab"
echo
"$OLLAMA" list
