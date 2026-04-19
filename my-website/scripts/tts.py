"""tts.py — edge-tts wrapper for blog-to-video pipeline
Usage: python scripts/tts.py <slug>
Requires: pip install edge-tts  (already in D:\\ai_streamer\\venv)
Input:  scripts/video-drafts/<slug>.json
Output: scripts/video-drafts/<slug>.mp3 + <slug>.srt
"""
from __future__ import annotations

import asyncio
import json
import re
import sys
from pathlib import Path

try:
    import edge_tts
except ModuleNotFoundError:
    print(
        "edge-tts not found.\n"
        "Install: pip install edge-tts\n"
        "Or activate ai_streamer venv: D:\\ai_streamer\\venv\\Scripts\\activate",
        file=sys.stderr,
    )
    sys.exit(1)

DRAFTS_DIR = Path(__file__).parent / "video-drafts"
DEFAULT_VOICE = "zh-TW-HsiaoChenNeural"
# Chars per paragraph chunk — keeps edge-tts responsive on long scripts
CHUNK_CHARS = 2000


def split_chunks(text: str, limit: int) -> list[str]:
    """Split by paragraph; merge short paragraphs; never exceed limit."""
    paras = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks: list[str] = []
    buf = ""
    for p in paras:
        if len(buf) + len(p) + 1 > limit:
            if buf:
                chunks.append(buf)
            # If a single paragraph is too long, split by sentence
            if len(p) > limit:
                sentences = re.split(r"(?<=[。！？…])", p)
                sub = ""
                for s in sentences:
                    if len(sub) + len(s) > limit:
                        if sub:
                            chunks.append(sub)
                        sub = s
                    else:
                        sub += s
                if sub:
                    buf = sub
                else:
                    buf = ""
            else:
                buf = p
        else:
            buf = (buf + "\n\n" + p).lstrip() if buf else p
    if buf:
        chunks.append(buf)
    return chunks


def vtt_to_srt(vtt: str) -> str:
    """Convert WebVTT string to SRT format."""
    lines = vtt.strip().splitlines()
    srt_blocks: list[str] = []
    idx = 1
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Skip WEBVTT header and NOTE blocks
        if line.startswith("WEBVTT") or line.startswith("NOTE") or not line:
            i += 1
            continue
        if "-->" in line:
            # Timestamp: replace . → , for SRT, strip cue settings
            ts = re.sub(r"\s+\S+=\S+", "", line).replace(".", ",")
            i += 1
            text_lines: list[str] = []
            while i < len(lines) and lines[i].strip():
                text_lines.append(lines[i].strip())
                i += 1
            if text_lines:
                srt_blocks.append(f"{idx}\n{ts}\n" + "\n".join(text_lines) + "\n")
                idx += 1
        else:
            i += 1
    return "\n".join(srt_blocks)


async def tts_chunk(
    text: str,
    voice: str,
    mp3_fh,
    submaker: "edge_tts.SubMaker",
    time_offset_100ns: int,
) -> int:
    """Stream one chunk of TTS; write audio bytes + accumulate sub cues.
    Returns the total duration in 100-nanosecond units."""
    communicate = edge_tts.Communicate(text, voice)
    duration = 0
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            mp3_fh.write(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            offset = chunk["offset"] + time_offset_100ns
            dur = chunk["duration"]
            submaker.create_sub((offset, dur), chunk["text"])
            duration = max(duration, chunk["offset"] + dur)
    return duration


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
    vtt_path = DRAFTS_DIR / f"{slug}.vtt"
    srt_path = DRAFTS_DIR / f"{slug}.srt"

    print(f"\n🔊 TTS: {title}")
    print(f"   Voice : {voice}")
    print(f"   Script: {len(script)} chars")

    chunks = split_chunks(script, CHUNK_CHARS)
    print(f"   Chunks: {len(chunks)}\n")

    submaker = edge_tts.SubMaker()
    time_offset = 0  # in 100-nanosecond units

    with open(mp3_path, "wb") as mp3_fh:
        for i, chunk in enumerate(chunks, 1):
            print(f"   [{i}/{len(chunks)}] {len(chunk)} chars...", end=" ", flush=True)
            chunk_duration = await tts_chunk(chunk, voice, mp3_fh, submaker, time_offset)
            time_offset += chunk_duration
            print("done")

    # Generate VTT (word-level, groups of 6 words per cue)
    vtt_content = submaker.generate_subs(words_in_cue=6)
    vtt_path.write_text(vtt_content, encoding="utf-8")

    # Convert VTT → SRT for FFmpeg
    srt_content = vtt_to_srt(vtt_content)
    srt_path.write_text(srt_content, encoding="utf-8")

    print(f"\n✅ Audio → {mp3_path}")
    print(f"✅ SRT   → {srt_path}")
    print(f"   Total audio offset: {time_offset / 1e7:.1f}s\n")

    draft["mp3Path"] = str(mp3_path)
    draft["srtPath"] = str(srt_path)
    json_path.write_text(
        json.dumps(draft, indent=2, ensure_ascii=False), encoding="utf-8"
    )


asyncio.run(main())
