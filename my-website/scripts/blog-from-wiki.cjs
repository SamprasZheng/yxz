'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '..');
const REPO_DIR = path.resolve(SITE_DIR, '..');
const WIKI_DIR = path.join(REPO_DIR, 'wiki');
const DRAFT_DIR = path.join(SITE_DIR, 'draft');
const TAGS_FILE = path.join(SITE_DIR, 'blog', 'tags.yml');

function parseArgs(argv) {
  const args = { force: false, dryRun: false };
  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--force') args.force = true;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--slug') args.slug = argv[++i];
    else if (arg === '--date') args.date = argv[++i];
    else if (arg === '--tag') args.tag = argv[++i];
    else positionals.push(arg);
  }
  args.source = positionals[0];
  return args;
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const parsed = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!parsed) continue;
    data[parsed[1]] = parsed[2].trim();
  }

  return { data, body: raw.slice(match[0].length).trim() };
}

function parseTags(value) {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function readBlogTags() {
  if (!fs.existsSync(TAGS_FILE)) return new Set(['misc']);
  const raw = fs.readFileSync(TAGS_FILE, 'utf8');
  const keys = raw
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*$/))
    .filter(Boolean)
    .map((match) => match[1]);
  return new Set(keys);
}

function chooseTag(wikiTags, explicitTag, allowed) {
  if (explicitTag && allowed.has(explicitTag)) return explicitTag;

  const map = {
    dot: 'polkadot',
    polkadot: 'polkadot',
    substrate: 'polkadot',
    jam: 'polkadot',
    rf: 'rf',
    hardware: 'rf',
    phasedarray: 'phasedarray',
    phased_array: 'phasedarray',
    space: 'space',
    leo: 'space',
    ai: 'ai',
    agents: 'ai',
    crypto: 'crypto',
    macro: 'macro',
    investing: 'macro',
    plurality: 'plurality',
  };

  for (const tag of wikiTags) {
    const key = tag.toLowerCase();
    const mapped = map[key] || key;
    if (allowed.has(mapped)) return mapped;
  }

  if (allowed.has('misc')) return 'misc';
  return allowed.values().next().value || 'misc';
}

function extractTitle(data, body, sourcePath) {
  if (data.title) return data.title.replace(/^['"]|['"]$/g, '');
  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return path.basename(sourcePath).replace(/\.mdx?$/i, '').replace(/-/g, ' ');
}

function cleanBodyForBlog(body) {
  return body
    .replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]|#]+)(?:#[^\]]+)?\]\]/g, (_, target) => path.basename(target).replace(/-/g, ' '))
    .replace(/^#\s+.+\r?\n+/, '')
    .trim();
}

function yamlString(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.source) {
    console.error('Usage: node scripts/blog-from-wiki.cjs <wiki/synthesis/page.md> [--slug slug] [--date YYYY-MM-DD] [--tag tag] [--force] [--dry-run]');
    process.exit(1);
  }

  const sourcePath = path.isAbsolute(args.source)
    ? path.resolve(args.source)
    : path.resolve(process.cwd(), args.source);
  if (!sourcePath.startsWith(WIKI_DIR) || !fs.existsSync(sourcePath)) {
    console.error(`Wiki source not found: ${sourcePath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(sourcePath, 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const title = extractTitle(data, body, sourcePath);
  const slug = args.slug || slugify(title);
  const date = args.date || new Date().toISOString().slice(0, 10);
  const allowedTags = readBlogTags();
  const tag = chooseTag(parseTags(data.tags), args.tag, allowedTags);
  const cleanBody = cleanBodyForBlog(body);
  const outPath = path.join(DRAFT_DIR, `${date}-${slug}.md`);
  const relSource = path.relative(REPO_DIR, sourcePath).replace(/\\/g, '/');

  const output = `---\nslug: ${slug}\ntitle: ${yamlString(title)}\nauthors: [sampras]\ntags: [${tag}]\ndraft: true\ndescription: ${yamlString(`Draft adapted from wiki synthesis: ${title}`)}\n---\n\n<!-- Source: ${relSource}. Review claims, citations, and tone before moving to blog/. -->\n\n${cleanBody}\n`;

  if (args.dryRun) {
    console.log(output);
    return;
  }

  fs.mkdirSync(DRAFT_DIR, { recursive: true });
  if (fs.existsSync(outPath) && !args.force) {
    console.error(`Refusing to overwrite existing draft: ${outPath}`);
    console.error('Use --force to overwrite.');
    process.exit(1);
  }

  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`Created draft: ${path.relative(SITE_DIR, outPath).replace(/\\/g, '/')}`);
}

main();
