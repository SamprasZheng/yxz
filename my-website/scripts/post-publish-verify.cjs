'use strict';

const DEFAULT_SITE = 'https://SamprasZheng.github.io/yxz/';

function parseArgs(argv) {
  const args = { retries: 3 };
  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--slug') args.slug = argv[++i];
    else if (arg === '--expect-youtube') args.expectYoutube = true;
    else if (arg === '--retries') args.retries = Number(argv[++i] || 3);
    else positionals.push(arg);
  }
  args.url = positionals[0];
  return args;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildUrl(args) {
  if (args.url) return args.url;
  if (args.slug) return `${DEFAULT_SITE.replace(/\/$/, '')}/blog/${args.slug.replace(/^\/+/, '')}`;
  return DEFAULT_SITE;
}

async function fetchWithRetry(url, retries) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'yxz-post-publish-verify/1.0' },
      });
      const body = await response.text();
      return { response, body, attempt };
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(2000 * attempt);
    }
  }
  throw lastError;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const url = buildUrl(args);
  const checks = [];

  console.log(`Verifying live page: ${url}`);
  const { response, body, attempt } = await fetchWithRetry(url, args.retries);
  console.log(`HTTP ${response.status} after ${attempt} attempt(s).`);

  checks.push({
    name: 'HTTP status is 2xx',
    ok: response.status >= 200 && response.status < 300,
  });
  checks.push({
    name: 'Docusaurus app markup is present',
    ok: /__docusaurus|docusaurus|navbar/i.test(body),
  });
  checks.push({
    name: 'Open Graph title is present',
    ok: /<meta[^>]+property=["']og:title["'][^>]*>/i.test(body),
  });
  checks.push({
    name: 'Open Graph image is present',
    ok: /<meta[^>]+property=["']og:image["'][^>]*>/i.test(body),
  });

  if (args.slug) {
    checks.push({
      name: `Page contains slug hint "${args.slug}"`,
      ok: body.includes(args.slug),
    });
  }

  if (args.expectYoutube) {
    checks.push({
      name: 'YouTube embed is present',
      ok: /youtube\.com\/embed|youtu\.be/i.test(body),
    });
  }

  let failed = 0;
  for (const check of checks) {
    console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.name}`);
    if (!check.ok) failed += 1;
  }

  if (failed) process.exit(1);
  console.log('Live verification passed.');
}

main().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});
