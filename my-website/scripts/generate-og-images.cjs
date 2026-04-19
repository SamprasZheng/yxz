/**
 * Generate per-post OG images (1200x630) from blog front matter.
 *
 * - Reads every post under blog/
 * - Builds a themed SVG based on the post's first tag
 * - Rasterizes to PNG via sharp
 * - Writes static/img/og/<slug>.png
 *
 * Usage:   yarn generate:og
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BLOG_DIR = path.resolve(__dirname, '..', 'blog');
const OUT_DIR = path.resolve(__dirname, '..', 'static', 'img', 'og');

// Tag palette — first matching tag wins. Falls back to "default".
const TAG_THEMES = {
  rf:          { accent: '#F97316', bg1: '#1F0F05', bg2: '#431407', label: 'RF / Phased Array' },
  phasedarray: { accent: '#F97316', bg1: '#1F0F05', bg2: '#431407', label: 'Phased Array' },
  space:       { accent: '#60A5FA', bg1: '#030712', bg2: '#0B1220', label: 'Space' },
  polkadot:    { accent: '#E6007A', bg1: '#120014', bg2: '#2A0A28', label: 'Polkadot' },
  dot:         { accent: '#E6007A', bg1: '#120014', bg2: '#2A0A28', label: 'Polkadot' },
  ai:          { accent: '#22D3EE', bg1: '#021018', bg2: '#052E3A', label: 'AI' },
  crypto:      { accent: '#FACC15', bg1: '#1A1203', bg2: '#3B2D05', label: 'Crypto' },
  macro:       { accent: '#34D399', bg1: '#041210', bg2: '#062e28', label: 'Macro' },
  misc:        { accent: '#A78BFA', bg1: '#0F0A1F', bg2: '#1E1540', label: 'Notes' },
  docusaurus:  { accent: '#3ECC5F', bg1: '#071A0F', bg2: '#0C2E1A', label: 'Meta' },
  default:     { accent: '#E6007A', bg1: '#0A0A0F', bg2: '#1A1A2E', label: 'Sampras' },
};

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Light front matter parser: grabs the first --- ... --- block.
 * Returns { title, slug, tags } without pulling in a YAML dependency.
 */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1];
  const get = (key) => {
    const re = new RegExp(`^${key}\\s*:\\s*(.+?)\\s*$`, 'm');
    const m = body.match(re);
    if (!m) return undefined;
    let v = m[1].trim();
    // Strip surrounding quotes
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  };
  const tagsLine = get('tags');
  let tags = [];
  if (tagsLine) {
    tags = tagsLine.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  }
  return {
    title: get('title'),
    slug: get('slug'),
    tags,
  };
}

/**
 * Break title into lines of roughly charsPerLine (CJK counts as 2).
 * Keeps words intact for Latin, hard-wraps otherwise.
 */
function wrapTitle(title, charsPerLine = 28, maxLines = 4) {
  const weight = (ch) => (/[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff00-\uffef]/.test(ch) ? 2 : 1);
  const tokens = title.split(/(\s+)/);
  const lines = [];
  let cur = '';
  let curW = 0;
  for (const tok of tokens) {
    const tokW = [...tok].reduce((s, c) => s + weight(c), 0);
    if (curW + tokW > charsPerLine && cur.trim()) {
      lines.push(cur.trim());
      cur = '';
      curW = 0;
      if (lines.length === maxLines) break;
    }
    // Hard-wrap long unbroken CJK token
    if (tokW > charsPerLine) {
      for (const c of tok) {
        const w = weight(c);
        if (curW + w > charsPerLine) {
          lines.push(cur);
          cur = '';
          curW = 0;
          if (lines.length === maxLines) break;
        }
        cur += c;
        curW += w;
      }
    } else {
      cur += tok;
      curW += tokW;
    }
  }
  if (cur.trim() && lines.length < maxLines) lines.push(cur.trim());
  if (lines.length === maxLines && cur && !lines[lines.length - 1].endsWith('…')) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\s+\S*$/, '') + '…';
  }
  return lines;
}

function pickTheme(tags) {
  for (const t of tags) {
    const key = t.toLowerCase();
    if (TAG_THEMES[key]) return TAG_THEMES[key];
  }
  return TAG_THEMES.default;
}

function buildSVG({ title, tags, theme }) {
  const lines = wrapTitle(title, 26, 4);
  const lineHeight = 82;
  const startY = 300 - ((lines.length - 1) * lineHeight) / 2;
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * lineHeight}">${esc(l)}</tspan>`)
    .join('');

  const shownTags = tags.slice(0, 4);
  const tagChips = shownTags
    .map((t, i) => {
      const x = 80 + i * 140;
      return `
        <g transform="translate(${x} 520)">
          <rect rx="18" ry="18" width="120" height="44" fill="rgba(255,255,255,0.06)" stroke="${theme.accent}" stroke-width="1.5"/>
          <text x="60" y="28" text-anchor="middle" font-family="Inter, 'Noto Sans TC', system-ui, sans-serif" font-size="18" fill="#E5E7EB" font-weight="500">${esc('#' + t)}</text>
        </g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${theme.bg1}"/>
      <stop offset="1" stop-color="${theme.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="60%">
      <stop offset="0" stop-color="${theme.accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="8" height="630" fill="${theme.accent}"/>

  <g font-family="Inter, 'Noto Sans TC', system-ui, sans-serif">
    <text x="80" y="110" font-size="22" font-weight="600" fill="${theme.accent}" letter-spacing="3">${esc(theme.label.toUpperCase())}</text>

    <text font-size="64" font-weight="700" fill="#F9FAFB" style="line-height:1.1">
      ${titleTspans}
    </text>

    ${tagChips}

    <g transform="translate(80 595)">
      <circle cx="0" cy="-8" r="6" fill="${theme.accent}"/>
      <text x="16" y="-3" font-size="20" font-weight="500" fill="#9CA3AF">sampraszheng.github.io/yxz — Sampras Zheng</text>
    </g>
  </g>
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
  const jobs = [];

  for (const ent of entries) {
    const abs = path.join(BLOG_DIR, ent.name);
    let mdPath;
    if (ent.isFile() && /\.(md|mdx)$/.test(ent.name)) {
      if (ent.name === 'authors.yml' || ent.name === 'tags.yml') continue;
      mdPath = abs;
    } else if (ent.isDirectory()) {
      const idx = ['index.md', 'index.mdx'].map((f) => path.join(abs, f)).find((p) => fs.existsSync(p));
      if (!idx) continue;
      mdPath = idx;
    } else {
      continue;
    }

    const raw = fs.readFileSync(mdPath, 'utf8');
    const fm = parseFrontMatter(raw);
    if (!fm.title) continue;

    // Derive slug: front-matter slug wins, else filename without date prefix
    let slug = fm.slug;
    if (!slug) {
      const base = ent.isDirectory() ? ent.name : ent.name.replace(/\.(md|mdx)$/, '');
      slug = base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    }

    const theme = pickTheme(fm.tags || []);
    const svg = buildSVG({ title: fm.title, tags: fm.tags || [], theme });
    const outPath = path.join(OUT_DIR, `${slug}.png`);

    jobs.push(
      sharp(Buffer.from(svg))
        .png({ compressionLevel: 9 })
        .toFile(outPath)
        .then(() => console.log(`  generated ${path.relative(path.resolve(__dirname, '..'), outPath)}`))
    );
  }

  await Promise.all(jobs);

  // Also generate a site-wide default card
  const defaultSvg = buildSVG({
    title: 'Sampras — RF, Polkadot & AI Engineering Notes',
    tags: ['rf', 'polkadot', 'ai'],
    theme: TAG_THEMES.default,
  });
  await sharp(Buffer.from(defaultSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'default.png'));
  console.log('  generated static/img/og/default.png');
  console.log(`done. ${jobs.length + 1} images in ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
