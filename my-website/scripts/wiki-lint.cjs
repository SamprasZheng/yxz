'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '..');
const REPO_DIR = path.resolve(SITE_DIR, '..');
const WIKI_DIR = path.join(REPO_DIR, 'wiki');
const STRICT_INDEX = process.argv.includes('--strict-index');

const EXPECTED_TYPES = {
  sources: 'source',
  entities: 'entity',
  concepts: 'concept',
  synthesis: 'synthesis',
};

const SKIP_FILES = new Set(['AGENTS.md', 'index.md', 'log.md']);
const VALID_TYPES = new Set(Object.values(EXPECTED_TYPES));

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs));
    if (entry.isFile() && /\.mdx?$/i.test(entry.name)) out.push(abs);
  }
  return out;
}

function relWiki(abs) {
  return path.relative(WIKI_DIR, abs).replace(/\\/g, '/');
}

function pageId(abs) {
  return relWiki(abs).replace(/\.mdx?$/i, '');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const parsed = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!parsed) continue;
    data[parsed[1]] = parsed[2].trim();
  }
  return data;
}

function parseTags(value) {
  if (!value) return [];
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return trimmed
    .split(/\s+/)
    .map((tag) => tag.trim().replace(/^-\s*/, ''))
    .filter(Boolean);
}

function isExternalLink(target) {
  return /^(https?:|mailto:|tel:|#|obsidian:)/i.test(target);
}

function stripWikiTarget(target) {
  return target
    .split('|')[0]
    .split('#')[0]
    .trim()
    .replace(/^\/+/, '');
}

function buildPageIndex(files) {
  const ids = new Map();
  for (const file of files) {
    const id = pageId(file);
    ids.set(id.toLowerCase(), file);
    ids.set(path.basename(id).toLowerCase(), file);
  }
  return ids;
}

function resolveWikiTarget(target, fromFile, ids) {
  const clean = stripWikiTarget(target);
  if (!clean) return true;

  const direct = clean.replace(/\.mdx?$/i, '');
  if (ids.has(direct.toLowerCase())) return true;

  const fromDir = path.dirname(pageId(fromFile)).replace(/\\/g, '/');
  const relative = path.posix.normalize(path.posix.join(fromDir, direct));
  if (ids.has(relative.toLowerCase())) return true;

  return false;
}

function main() {
  if (!fs.existsSync(WIKI_DIR)) {
    console.error(`wiki directory not found: ${WIKI_DIR}`);
    process.exit(1);
  }

  const files = walk(WIKI_DIR).filter((file) => !SKIP_FILES.has(path.basename(file)));
  const ids = buildPageIndex(files);
  const indexPath = path.join(WIKI_DIR, 'index.md');
  const indexRaw = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  const errors = [];
  const warnings = [];

  for (const file of files) {
    const rel = relWiki(file);
    const raw = fs.readFileSync(file, 'utf8');
    const fm = parseFrontmatter(raw);

    if (!fm) {
      errors.push(`${rel}: missing YAML frontmatter`);
      continue;
    }

    if (!fm.type) errors.push(`${rel}: missing frontmatter field "type"`);
    if (fm.type && !VALID_TYPES.has(fm.type)) errors.push(`${rel}: invalid type "${fm.type}"`);

    const folder = rel.split('/')[0];
    const expectedType = EXPECTED_TYPES[folder];
    if (expectedType && fm.type && fm.type !== expectedType) {
      errors.push(`${rel}: type "${fm.type}" should be "${expectedType}" for wiki/${folder}/`);
    }

    const tags = parseTags(fm.tags);
    if (tags.length === 0) errors.push(`${rel}: missing or empty frontmatter field "tags"`);

    if (fm.type === 'source') {
      for (const key of ['title', 'author', 'date', 'ingested']) {
        if (!fm[key]) errors.push(`${rel}: source page missing frontmatter field "${key}"`);
      }
    }

    const markdownLinkRe = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let markdownMatch;
    while ((markdownMatch = markdownLinkRe.exec(raw))) {
      if (markdownMatch[0].startsWith('!')) continue;
      const target = markdownMatch[1].trim();
      if (!isExternalLink(target)) {
        errors.push(`${rel}: internal markdown link should be a wikilink: ${target}`);
      }
    }

    const wikiLinkRe = /\[\[([^\]]+)\]\]/g;
    let wikiMatch;
    while ((wikiMatch = wikiLinkRe.exec(raw))) {
      const target = wikiMatch[1];
      if (!resolveWikiTarget(target, file, ids)) {
        errors.push(`${rel}: broken wikilink [[${target}]]`);
      }
    }

    const id = pageId(file);
    if (indexRaw && !indexRaw.includes(`[[${id}`)) {
      const message = `${rel}: not listed in wiki/index.md`;
      if (STRICT_INDEX) errors.push(message);
      else warnings.push(message);
    }
  }

  console.log(`Wiki lint checked ${files.length} pages.`);

  if (warnings.length) {
    console.log('\nWarnings:');
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (errors.length) {
    console.log('\nErrors:');
    for (const error of errors) console.log(`  - ${error}`);
    process.exit(1);
  }

  console.log('Wiki lint passed.');
}

main();
