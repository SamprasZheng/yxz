# /video-script

Read a blog MDX file and generate a YouTube narration script, saving it to the video-drafts folder. Uses Claude Code directly — no API key or credits required.

## Usage
```
/video-script <blog-file-or-slug>
```

## Steps

### 1 — Resolve the blog file
If a full path is given, use it directly. If a slug or partial name is given, find the matching file in `my-website/blog/`. Show the resolved path and ask for confirmation if ambiguous.

### 2 — Read and parse the file
Read the blog MDX file. Extract:
- `title` from frontmatter
- `slug` from frontmatter (or derive from filename)
- `image` from frontmatter (OG image path)
- Body text: strip frontmatter, code blocks (```), inline code, tables, HTML tags, image refs, MDX imports, heading markers, bold/italic markers, list bullets, blockquotes, `<!-- truncate -->`

### 3 — Generate narration script
Write a YouTube narration script following these rules:
- Conversational, flowing English — as if explaining to a smart colleague
- 3–5 sentences per paragraph, blank line between paragraphs
- On first use, briefly define jargon in parentheses, e.g. "OTP (one-time programmable memory)"
- Never read out heading levels; use natural transitions like "Let's start with the hardware layer"
- Skip bullet symbols, tables, code — weave key points into spoken sentences
- Emojis like 🎯 → use "The key takeaway here is..."
- Opening: 1–2 hook sentences surfacing the core problem or value
- Closing: 20–30 word call-to-action inviting viewers to subscribe or comment
- Target length: 3–6 minutes of spoken content (~400–800 words)

### 4 — Save draft JSON
Write to `my-website/scripts/video-drafts/<slug>.json`:
```json
{
  "title": "<title>",
  "slug": "<slug>",
  "blogFilePath": "<absolute path to blog file>",
  "ogImagePath": "<absolute path to static/img/og/...png or null>",
  "ttsVoice": "en-US-GuyNeural",
  "script": "<narration script>"
}
```
Use the Write tool to create or overwrite the file.

### 5 — Preview
Show the first 300 characters of the generated script and the total word count. Offer to revise any section if the user requests it.

### Next step
```
/video-from-draft <slug>
```
