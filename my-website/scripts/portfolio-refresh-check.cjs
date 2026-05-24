'use strict';

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.resolve(__dirname, '..');
const PORTFOLIO_JSON = path.join(SITE_DIR, 'src', 'pages', 'portfolio', 'github-repo-info.json');
const STATIC_DIR = path.join(SITE_DIR, 'static');

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function main() {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(PORTFOLIO_JSON)) {
    console.error(`Portfolio metadata not found: ${PORTFOLIO_JSON}`);
    process.exit(1);
  }

  let repos;
  try {
    repos = JSON.parse(fs.readFileSync(PORTFOLIO_JSON, 'utf8'));
  } catch (error) {
    console.error(`Invalid JSON: ${error.message}`);
    process.exit(1);
  }

  if (!Array.isArray(repos)) {
    errors.push('Portfolio metadata must be a JSON array.');
  }

  const seenNames = new Set();
  const seenUrls = new Set();

  for (const [index, repo] of (Array.isArray(repos) ? repos : []).entries()) {
    const label = repo && repo.name ? repo.name : `entry ${index}`;
    if (!repo || typeof repo !== 'object' || Array.isArray(repo)) {
      errors.push(`${label}: entry must be an object`);
      continue;
    }

    for (const field of ['name', 'html_url', 'language', 'description']) {
      if (typeof repo[field] !== 'string' || repo[field].trim() === '') {
        errors.push(`${label}: "${field}" must be a non-empty string`);
      }
    }

    if (typeof repo.fork !== 'boolean') errors.push(`${label}: "fork" must be boolean`);
    if (!isNumber(repo.stars)) errors.push(`${label}: "stars" must be a number`);
    if (!isNumber(repo.forksCount)) errors.push(`${label}: "forksCount" must be a number`);

    if (repo.homepage !== null && typeof repo.homepage !== 'string') {
      errors.push(`${label}: "homepage" must be null or string`);
    }

    if (typeof repo.html_url === 'string' && !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(repo.html_url)) {
      errors.push(`${label}: html_url should be a GitHub repository URL`);
    }

    if (typeof repo.name === 'string') {
      const key = repo.name.toLowerCase();
      if (seenNames.has(key)) errors.push(`${label}: duplicate portfolio name`);
      seenNames.add(key);
      if (/stremaer/i.test(repo.name)) warnings.push(`${label}: possible typo, did you mean "Streamer"?`);
    }

    if (typeof repo.html_url === 'string') {
      const key = repo.html_url.toLowerCase().replace(/\/$/, '');
      if (seenUrls.has(key)) errors.push(`${label}: duplicate html_url`);
      seenUrls.add(key);
    }

    if (repo.screenshot !== null && repo.screenshot !== undefined) {
      if (typeof repo.screenshot !== 'string') {
        errors.push(`${label}: "screenshot" must be null or string`);
      } else if (!/^https?:\/\//.test(repo.screenshot)) {
        const localPath = path.join(STATIC_DIR, repo.screenshot.replace(/^\/+/, ''));
        if (!fs.existsSync(localPath)) {
          errors.push(`${label}: screenshot file not found under static/: ${repo.screenshot}`);
        }
      }
    }
  }

  console.log(`Portfolio check scanned ${Array.isArray(repos) ? repos.length : 0} entries.`);

  if (warnings.length) {
    console.log('\nWarnings:');
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (errors.length) {
    console.log('\nErrors:');
    for (const error of errors) console.log(`  - ${error}`);
    process.exit(1);
  }

  console.log('Portfolio metadata passed.');
}

main();
