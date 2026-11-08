import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { assemble, root } from './build.mjs';
import { tagPattern } from './source-map.mjs';

function assert(condition, message) { if (!condition) throw Error(message); }
const built = assemble();
const published = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(built === published, 'index.html is outdated: run npm run build');
assert(built.includes('Content-Security-Policy'), 'Missing restrictive CSP');
assert(!built.includes('__NIJRAW_SCRIPT_'), 'Unreplaced build marker');
const scripts = [...built.matchAll(tagPattern('script'))];
assert(scripts.length === 14, `Expected 14 embedded scripts, found ${scripts.length}`);
let parsed = 0;
for (let i = 0; i < scripts.length; i++) {
  const [, attrs, source] = scripts[i];
  if (/type\s*=\s*"(?:text\/plain|application\/json)"/i.test(attrs)) continue;
  new vm.Script(source, { filename: `embedded-script-${i}.js` });
  parsed++;
}
const json = JSON.parse(fs.readFileSync(path.join(root,'src/data/lensfun.json'), 'utf8'));
assert(Array.isArray(json.lenses) && Array.isArray(json.cameras), 'Lensfun DB malformed');
const photo = fs.readFileSync(path.join(root,'src/assets/guided-sample.jpg'));
assert(photo[0] === 0xff && photo[1] === 0xd8 && photo.at(-2) === 0xff && photo.at(-1) === 0xd9, 'Sample JPEG malformed');
for (const name of ['LICENSE','LICENSES/LGPL-2.1.txt','LICENSES/LGPL-3.0.txt'])
  assert(fs.statSync(path.join(root,name)).size > 6000, `${name} is missing/incomplete`);
const heic = fs.readFileSync(path.join(root,'src/vendor/libheif-inline.js'));
const heicSha = crypto.createHash('sha256').update(heic).digest('hex');
assert(heicSha === '0a6c14c89cf584482324ec5ff3ecaf21672bf77a20f95e3c04e2f68823137e59', 'HEIC bundle differs from documented hash');
console.log(`PASS: exact generated HTML, ${parsed} executable script blocks, offline sample, license texts, ${json.lenses.length} lens entries, HEIC SHA-256`);
