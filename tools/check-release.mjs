// Verify pinned upstream source archives. This does not certify a matching
// binary rebuild or replace the manual LGPL/relinking compliance review.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { root } from './build.mjs';

function assert(condition, message) {
  if (!condition) throw Error(`RELEASE BLOCKED: ${message}`);
}
function sha256(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }

// Read central-directory filenames with Node alone: no new runtime packages.
function centralDirectoryNames(bytes) {
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 22 - 65535); i--) {
    if (bytes.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  assert(eocd >= 0, 'source archive is not a complete ZIP');
  const count = bytes.readUInt16LE(eocd + 10);
  let pos = bytes.readUInt32LE(eocd + 16);
  const names = new Set();
  for (let n = 0; n < count; n++) {
    assert(pos + 46 <= bytes.length && bytes.readUInt32LE(pos) === 0x02014b50,
      'invalid ZIP central directory');
    const fileNameLen = bytes.readUInt16LE(pos + 28);
    const extraLen = bytes.readUInt16LE(pos + 30);
    const commentLen = bytes.readUInt16LE(pos + 32);
    assert(pos + 46 + fileNameLen + extraLen + commentLen <= bytes.length,
      'truncated ZIP central directory');
    names.add(bytes.subarray(pos + 46, pos + 46 + fileNameLen).toString('utf8'));
    pos += 46 + fileNameLen + extraLen + commentLen;
  }
  return names;
}

try {
  const manifestPath = path.join(root, 'third_party/source-manifest.json');
  assert(fs.existsSync(manifestPath), 'missing third_party/source-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(manifest.format === 1 && Object.keys(manifest.archives || {}).length === 2,
    'invalid source archive manifest');
  const bundledHeic = fs.readFileSync(path.join(root, 'src/vendor/libheif-inline.js'));
  assert(sha256(bundledHeic) === manifest.embeddedHeicSha256,
    'HEIC vendor script changed without a corresponding-source provenance review');

  for (const [relative, info] of Object.entries(manifest.archives)) {
    assert(/^third_party\/NijRAW_[\w.-]+\.zip$/.test(relative), `unexpected archive path: ${relative}`);
    const target = path.join(root, relative);
    assert(fs.existsSync(target), `missing ${relative}`);
    const bytes = fs.readFileSync(target);
    assert(bytes.length >= 65536 && bytes.length === info.bytes, `incorrect size: ${relative}`);
    assert(sha256(bytes) === info.sha256, `SHA-256 mismatch: ${relative}`);
    const names = centralDirectoryNames(bytes);
    for (const entry of info.requiredFiles || [])
      assert(names.has(entry), `missing ${entry} in ${relative}`);
    assert(Array.isArray(info.upstream) && info.upstream.length > 0,
      `missing pinned source provenance for ${relative}`);
    console.log(`PASS: ${relative} (${(bytes.length / 1048576).toFixed(1)} MiB; SHA-256 verified)`);
  }
  console.log('Source archives present and structurally verified. Manual binary-rebuild and LGPL review remain required.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
