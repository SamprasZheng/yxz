"""tts.py — edge-tts 7.x wrapper for blog-to-video pipeline
Usage: python scripts/tts.py <slug>
Requires: edge-tts >=7.0  (in D:\\ai_streamer\\venv)
Input:  scripts/video-drafts/<slug>.json
Output: scripts/video-drafts/<slug>.mp3 + <slug>.srt
"""
from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

try:
    import edge_tts
except ModuleNotFoundError:
    print(
        "edge-tts not found.\n"
        "Run: D:\\ai_streamer\\venv\\Scripts\\python.exe scripts/tts.py <slug>",
        file=sys.stderr,
    )
    sys.exit(1)

DRAFTS_DIR = Path(__file__).parent / "video-drafts"
DEFAULT_VOICE = "zh-TW-HsiaoChenNeural"


async def main() -> None:
    slug = sys.argv[1] if len(sys.argv) > 1 else None
    if not slug:
        print("Usage: python tts.py <slug>", file=sys.stderr)
        sys.exit(1)

    json_path = DRAFTS_DIR / f"{slug}.json"
    if not json_path.exists():
        print(f"Draft not found: {json_path}\nRun blog-to-script.cjs first.", file=sys.stderr)
        sys.exit(1)

    draft = json.loads(json_path.read_text(encoding="utf-8"))
    title: str = draft["title"]
    script: str = draft["script"]
    voice: str = draft.get("ttsVoice", DEFAULT_VOICE)

    mp3_path = DRAFTS_DIR / f"{slug}.mp3"
    srt_path = DRAFTS_DIR / f"{slug}.srt"

    print(f"\n🔊 TTS: {title}")
    print(f"   Voice : {voice}")
    print(f"   Script: {len(script)} chars")
    print("   Streaming...", flush=True)

    communicate = edge_tts.Communicate(script, voice)
    submaker = edge_tts.SubMaker()

    with open(mp3_path, "wb") as mp3_fh:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                mp3_fh.write(chunk["data"])
            elif chunk["type"] in ("WordBoundary", "SentenceBoundary"):
                submaker.feed(chunk)

    srt_content = submaker.get_srt()
    srt_path.write_text(srt_content, encoding="utf-8")

    print(f"\n✅ Audio → {mp3_path}")
    print(f"✅ SRT   → {srt_path}\n")

    draft["mp3Path"] = str(mp3_path)
    draft["srtPath"] = str(srt_path)
    json_path.write_text(
        json.dumps(draft, indent=2, ensure_ascii=False), encoding="utf-8"
    )


asyncio.run(main())
