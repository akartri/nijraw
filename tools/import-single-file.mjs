// One-time migration tool. Regenerates all src parts from a complete standalone
// NijRAW HTML. This OVERWRITES the source tree, so --force is mandatory.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parts, tagPattern } from './source-map.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [input, flag] = process.argv.slice(2);
if (!input || flag !== '--force') {
  console.error('Usage: node tools/import-single-file.mjs /path/to/editor.html --force');
  console.error('WARNING: This overwrites src/template.html and all extracted components.');
  process.exit(2);
}
const html = fs.readFileSync(path.resolve(input), 'utf8');
const matches = { style: [...html.matchAll(tagPattern('style'))], script: [...html.matchAll(tagPattern('script'))] };
let template = html;
for (const part of parts) {
  const match = matches[part.tag][part.index];
  if (!match) throw Error(`Missing ${part.tag}[${part.index}] for ${part.file}`);
  const contents = match[2];
  const dest = path.join(root, part.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, part.encoding === 'base64' ? Buffer.from(contents, 'base64') : contents);
  const tag = match[0];
  const openEnd = tag.indexOf('>') + 1;
  const closeStart = tag.toLowerCase().lastIndexOf(`</${part.tag}>`);
  const replacedTag = `${tag.slice(0,openEnd)}${part.slot}${tag.slice(closeStart)}`;
  if (!template.includes(tag)) throw Error(`Could not locate intact ${part.file} tag`);
  template = template.replace(tag, () => replacedTag);
}
const destination = path.join(root, 'src/template.html');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, template);
console.log(`Extracted ${parts.length} components into src/ and LICENSE(S)/`);
