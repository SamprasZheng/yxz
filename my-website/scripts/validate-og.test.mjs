import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const SCRIPT_PATH = join(__dirname, 'validate-og.cjs');
const COMMAND_PATH = join(REPO_ROOT, '.claude', 'commands', 'validate-og.md');
const OG_DIR = join(__dirname, '..', 'static', 'img', 'og');

/**
 * Build a minimal synthetic PNG buffer with the given width, height, and byte length.
 * PNG header layout (bytes):
 *   0-7  : signature (89 50 4E 47 0D 0A 1A 0A)
 *   8-11 : IHDR chunk data length = 13 (BE uint32)
 *  12-15 : 'IHDR' chunk type
 *  16-19 : width  (BE uint32)
 *  20-23 : height (BE uint32)
 * Remaining bytes are zero-filled; the script only needs the header.
 */
function makePngBuffer(widthPx, heightPx, totalBytes) {
  const buf = Buffer.alloc(totalBytes, 0);
  buf[0]=0x89; buf[1]=0x50; buf[2]=0x4E; buf[3]=0x47;
  buf[4]=0x0D; buf[5]=0x0A; buf[6]=0x1A; buf[7]=0x0A;
  buf.writeUInt32BE(13, 8);
  buf[12]=0x49; buf[13]=0x48; buf[14]=0x44; buf[15]=0x52; // 'IHDR'
  buf.writeUInt32BE(widthPx, 16);
  buf.writeUInt32BE(heightPx, 20);
  return buf;
}

function writeTmpPng(name, widthPx, heightPx, sizeBytes) {
  const dir = join(tmpdir(), 'validate-og-test-' + randomBytes(4).toString('hex'));
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, name);
  writeFileSync(filePath, makePngBuffer(widthPx, heightPx, sizeBytes));
  return { filePath, dir };
}

function runScript(args) {
  const result = spawnSync(process.execPath, [SCRIPT_PATH, ...args], { encoding: 'utf8' });
  return {
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    combined: (result.stdout || '') + (result.stderr || ''),
  };
}

// T1 – Proves that validate-og.cjs exists at the expected path.
test('T1: validate-og.cjs exists at my-website/scripts/validate-og.cjs', () => {
  assert.ok(existsSync(SCRIPT_PATH), `Expected script at ${SCRIPT_PATH} — file not found`);
});

// T2 – Proves that validate-og.cjs is syntactically valid CJS.
test('T2: validate-og.cjs passes `node --check` (valid syntax)', () => {
  const result = spawnSync(process.execPath, ['--check', SCRIPT_PATH], { encoding: 'utf8' });
  assert.strictEqual(result.status, 0, `node --check failed:\n${result.stderr}`);
});

// T3 – Proves that the slash-command definition file exists for Claude Code discovery.
test('T3: .claude/commands/validate-og.md exists', () => {
  assert.ok(existsSync(COMMAND_PATH), `Expected slash-command file at ${COMMAND_PATH} — file not found`);
});

// T4 – Proves that all currently-committed OG images already satisfy the constraints
//      (script exits 0, no false positives).
test('T4: script exits 0 against the real OG directory (all current images are valid)', () => {
  if (!existsSync(OG_DIR)) return; // graceful skip if dir missing
  const result = runScript([OG_DIR]);
  assert.strictEqual(result.status, 0,
    `Expected exit 0 but got ${result.status}.\nOutput:\n${result.combined}`);
});

// T5 – Proves that a PNG exceeding 200 KB is flagged and causes non-zero exit.
test('T5: script exits non-zero and mentions size for a 201 KB PNG (correct 1200×630 dims)', (t) => {
  const { filePath, dir } = writeTmpPng('og-too-large.png', 1200, 630, 201 * 1024);
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = runScript(['--file', filePath]);
  assert.notStrictEqual(result.status, 0,
    `Expected non-zero exit for oversized PNG.\nOutput:\n${result.combined}`);
  assert.match(result.combined.toLowerCase(), /size|kb|bytes|large|exceeds/,
    `Expected output to mention size violation.\nActual:\n${result.combined}`);
});

// T6 – Proves that a PNG with wrong dimensions (100×100) is flagged and causes non-zero exit.
test('T6: script exits non-zero and mentions dimensions for a 1 KB PNG with 100×100 dims', (t) => {
  const { filePath, dir } = writeTmpPng('og-wrong-dims.png', 100, 100, 1024);
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = runScript(['--file', filePath]);
  assert.notStrictEqual(result.status, 0,
    `Expected non-zero exit for wrong-dimension PNG.\nOutput:\n${result.combined}`);
  assert.match(result.combined.toLowerCase(), /dimension|width|height|1200|630|expected/,
    `Expected output to mention dimension mismatch.\nActual:\n${result.combined}`);
});

// T7 – Proves that --file <path> single-file mode is supported; a valid PNG must exit 0.
test('T7: --file flag works for single-file mode (valid 1200×630 10 KB PNG exits 0)', (t) => {
  const { filePath, dir } = writeTmpPng('og-valid.png', 1200, 630, 10 * 1024);
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const result = runScript(['--file', filePath]);
  assert.strictEqual(result.status, 0,
    `Expected exit 0 for valid PNG via --file but got ${result.status}.\nOutput:\n${result.combined}`);
});
