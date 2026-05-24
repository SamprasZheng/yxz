# /validate-og

Validate all Open Graph (OG) images in `my-website/static/img/og/` to ensure they meet the required constraints for social sharing: **exactly 1200×630 pixels** and **at most 200 KB** in file size.

## What it checks

| Check | Requirement |
|-------|-------------|
| File size | ≤ 200 KB (204,800 bytes) |
| Dimensions | Exactly 1200 × 630 pixels |
| Supported formats | `.png`, `.jpg`, `.jpeg`, `.webp` |

Dimension reading is done directly from the PNG IHDR binary header — no external libraries required. Non-PNG files that fail the dimension read will report "cannot read dimensions".

## Usage

```bash
# Default: scan my-website/static/img/og/
node my-website/scripts/validate-og.cjs

# Scan a specific directory
node my-website/scripts/validate-og.cjs my-website/static/img/og/
node my-website/scripts/validate-og.cjs --dir my-website/static/img/og/

# Validate a single file
node my-website/scripts/validate-og.cjs --file my-website/static/img/og/default.png
```

## Output

Passing files are prefixed with `✓`. Failing files are prefixed with `✗` with an explanation on the next line.

```
✓ default.png
✓ welcome.png
✗ hero.png
  → size exceeds limit: 215040 bytes (210.0 KB) > 200 KB
✗ banner.png
  → dimension mismatch: got 1200×628, expected 1200×630 (width 1200 height 628)

2 image(s) failed, 2 passed
```

A summary line is printed at the end. The script exits **0** if all images pass, **1** if any violation is found.

## Remediation

**Size too large (>200 KB)**
- Re-export the image with higher compression (e.g. `pngquant`, `optipng`, or Squoosh).
- Save as JPEG at 85% quality if photographic.
- Target ≤150 KB to leave headroom.

**Wrong dimensions**
- The OG image must be exactly 1200×630 px.
- Resize your source file before exporting: `ffmpeg -i input.png -vf scale=1200:630 output.png` or use Figma/Canva with a 1200×630 frame.
- Do not crop asymmetrically — center the subject and pad with background color if needed.

## Running in CI

Add to your build or pre-deploy step:

```bash
node my-website/scripts/validate-og.cjs || exit 1
```

Or call it from `package.json`:

```json
"validate:og": "node scripts/validate-og.cjs"
```
