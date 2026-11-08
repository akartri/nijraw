// No build dependencies. Assemble the exact classic-script HTML so file://
// distribution and the offline editor continue working as before.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parts } from './source-map.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function assemble() {
  let html = fs.readFileSync(path.join(root, 'src/template.html'), 'utf8');
  for (const part of parts) {
    const occurrences = html.split(part.slot).length - 1;
    if (occurrences !== 1) throw Error(`Expected one ${part.slot}; found ${occurrences}`);
    const bytes = fs.readFileSync(path.join(root, part.file));
    const body = part.encoding === 'base64' ? bytes.toString('base64') : bytes.toString('utf8');
    html = html.replace(part.slot, () => body);
  }
  return html;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = path.join(root, 'index.html');
  fs.writeFileSync(out, assemble());
  console.log(`Built ${out} (self-contained, with no runtime network dependency)`);
}
