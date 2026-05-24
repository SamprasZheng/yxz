'use strict';

/**
 * validate-og.cjs
 *
 * Validates Open Graph images: checks that every .png/.jpg/.jpeg/.webp file
 * in the target directory is ≤200 KB and exactly 1200×630 pixels.
 *
 * Usage:
 *   node validate-og.cjs                     # scan default OG dir
 *   node validate-og.cjs <dirpath>            # scan given directory
 *   node validate-og.cjs --dir <dirpath>      # same as above
 *   node validate-og.cjs --file <filepath>    # validate a single file
 */

const fs = require('fs');
const path = require('path');

const SIZE_LIMIT = 200 * 1024; // 200 KB in bytes
const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 630;
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

// Default OG directory: ../static/img/og relative to this script
const DEFAULT_OG_DIR = path.join(__dirname, '..', 'static', 'img', 'og');

/**
 * Read PNG dimensions from the IHDR header.
 * Returns { width, height } or null if the buffer is not a valid PNG.
 *
 * PNG layout:
 *   bytes  0-7  : PNG signature (89 50 4E 47 0D 0A 1A 0A)
 *   bytes  8-11 : IHDR data length = 13 (BE uint32)
 *   bytes 12-15 : 'IHDR' chunk type
 *   bytes 16-19 : width  (BE uint32)
 *   bytes 20-23 : height (BE uint32)
 */
function readPngDimensions(buf) {
  if (buf.length < 24) return null;
  // Check PNG signature
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47 ||
      buf[4] !== 0x0D || buf[5] !== 0x0A || buf[6] !== 0x1A || buf[7] !== 0x0A) {
    return null;
  }
  // Check IHDR marker
  if (buf[12] !== 0x49 || buf[13] !== 0x48 || buf[14] !== 0x44 || buf[15] !== 0x52) {
    return null;
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

/**
 * Validate a single image file.
 * Returns an array of violation strings (empty = pass).
 */
function validateFile(filePath) {
  const violations = [];
  const stat = fs.statSync(filePath);
  const sizeBytes = stat.size;

  // Size check
  if (sizeBytes > SIZE_LIMIT) {
    violations.push(
      `size exceeds limit: ${sizeBytes} bytes (${(sizeBytes / 1024).toFixed(1)} KB) > ${SIZE_LIMIT / 1024} KB`
    );
  }

  // Dimension check (PNG only; non-PNG: report cannot read)
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') {
    // Read just enough bytes for the header
    const headerSize = 24;
    let buf;
    try {
      const fd = fs.openSync(filePath, 'r');
      buf = Buffer.alloc(Math.min(headerSize, sizeBytes));
      fs.readSync(fd, buf, 0, buf.length, 0);
      fs.closeSync(fd);
    } catch (e) {
      violations.push('cannot read dimensions: failed to open file');
      return violations;
    }

    const dims = readPngDimensions(buf);
    if (!dims) {
      violations.push('cannot read dimensions: not a valid PNG header');
    } else {
      if (dims.width !== EXPECTED_WIDTH || dims.height !== EXPECTED_HEIGHT) {
        violations.push(
          `dimension mismatch: got ${dims.width}×${dims.height}, expected ${EXPECTED_WIDTH}×${EXPECTED_HEIGHT} (width ${dims.width} height ${dims.height})`
        );
      }
    }
  } else {
    // For non-PNG image files we cannot read dimensions
    violations.push('cannot read dimensions: only PNG dimension checks are supported');
  }

  return violations;
}

/**
 * Collect all image files in a directory (non-recursive).
 */
function collectImages(dirPath) {
  const entries = fs.readdirSync(dirPath);
  return entries
    .filter(name => IMAGE_EXTS.has(path.extname(name).toLowerCase()))
    .map(name => path.join(dirPath, name));
}

/**
 * Validate a list of files and print results.
 * Returns true if all pass, false if any fail.
 */
function validateFiles(filePaths) {
  let passed = 0;
  let failed = 0;

  for (const filePath of filePaths) {
    const name = path.basename(filePath);
    const violations = validateFile(filePath);
    if (violations.length === 0) {
      console.log(`✓ ${name}`);
      passed++;
    } else {
      console.log(`✗ ${name}`);
      for (const v of violations) {
        console.log(`  → ${v}`);
      }
      failed++;
    }
  }

  console.log('');
  if (failed === 0) {
    console.log(`All OG images pass (${passed} checked)`);
    return true;
  } else {
    console.log(`${failed} image(s) failed, ${passed} passed`);
    return false;
  }
}

// ── CLI entry point ──────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  // --file <path>
  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1) {
    const filePath = args[fileIdx + 1];
    if (!filePath) {
      console.error('Error: --file requires a path argument');
      process.exit(1);
    }
    if (!fs.existsSync(filePath)) {
      console.error(`Error: file not found: ${filePath}`);
      process.exit(1);
    }
    const ok = validateFiles([filePath]);
    process.exit(ok ? 0 : 1);
  }

  // --dir <path>
  const dirIdx = args.indexOf('--dir');
  if (dirIdx !== -1) {
    const dirPath = args[dirIdx + 1];
    if (!dirPath) {
      console.error('Error: --dir requires a path argument');
      process.exit(1);
    }
    if (!fs.existsSync(dirPath)) {
      console.error(`Error: directory not found: ${dirPath}`);
      process.exit(1);
    }
    const files = collectImages(dirPath);
    const ok = validateFiles(files);
    process.exit(ok ? 0 : 1);
  }

  // Positional arg: treat as directory
  if (args.length > 0 && !args[0].startsWith('--')) {
    const dirPath = args[0];
    if (!fs.existsSync(dirPath)) {
      console.error(`Error: directory not found: ${dirPath}`);
      process.exit(1);
    }
    const files = collectImages(dirPath);
    const ok = validateFiles(files);
    process.exit(ok ? 0 : 1);
  }

  // Default: scan the default OG dir
  if (!fs.existsSync(DEFAULT_OG_DIR)) {
    console.error(`Error: default OG directory not found: ${DEFAULT_OG_DIR}`);
    process.exit(1);
  }
  const files = collectImages(DEFAULT_OG_DIR);
  const ok = validateFiles(files);
  process.exit(ok ? 0 : 1);
}

main();
