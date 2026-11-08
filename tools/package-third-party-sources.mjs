// Produce distributable, version-pinned upstream source archives.
// This does not (and cannot) prove that the checked-in decoder is a byte-for-byte
// build of those sources; see third_party/SOURCE_PROVENANCE.md.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { root } from './build.mjs';

const repositories = [
  { name: 'heic-to-1.6.7', url: 'https://github.com/hoppergee/heic-to.git',
    tag: 'v1.6.7', commit: '78345a3fcdb4a1d70d513fce2646aeff0127f7ba' },
  { name: 'libheif-v1.23.7', url: 'https://github.com/strukturag/libheif.git',
    tag: 'v1.23.7', commit: '12a259a5882dd99d45ec5fc77e296a3b620d1e2e' },
  { name: 'libde265-v1.1.3', url: 'https://github.com/strukturag/libde265.git',
    tag: 'v1.1.3', commit: 'ba62bf4cfb3242f3bf0a45617ff09e35236e4d82' },
  { name: 'LibRaw-0.22.3', url: 'https://github.com/LibRaw/LibRaw.git',
    tag: '0.22.3', commit: 'cf02d66eb5c19d4e46df7aee0582e47a4918509a' }
];

function run(program, args, cwd = root) {
  const result = spawnSync(program, args, { cwd, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`${program} ${args.join(' ')} failed:\n${result.stderr || result.stdout || result.error}`);
  return result.stdout.trim();
}
function sha256(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }

const localIndex = process.argv.indexOf('--from-local');
if (process.argv.length > 2 && (localIndex !== 2 || process.argv.length !== 4)) {
  console.error('Usage: node tools/package-third-party-sources.mjs [--from-local /path/to/pinned-clones]');
  process.exit(2);
}
const checkedOut = localIndex === 2 ? path.resolve(process.argv[3]) : undefined;
const scratch = fs.mkdtempSync(path.join(root, '.source-work-'));

try {
  for (const repo of repositories) {
    const src = checkedOut ? path.join(checkedOut, repo.name) : path.join(scratch, 'clones', repo.name);
    if (!checkedOut) {
      fs.mkdirSync(path.dirname(src), { recursive: true });
      run('git', ['clone', '--depth', '1', '--branch', repo.tag, repo.url, src]);
    }
    const actual = run('git', ['-C', src, 'rev-parse', 'HEAD']);
    if (actual !== repo.commit) throw new Error(`${repo.name} is not the pinned ${repo.tag}: ${actual}`);
    const exportTar = path.join(scratch, `${repo.name}.tar`);
    run('git', ['-C', src, 'archive', '--format=tar', '-o', exportTar, 'HEAD']);
    repo.exportTar = exportTar;
  }

  const outputs = [
    { name: 'NijRAW_HEIC_Source_1.23.7.zip',
      sources: repositories.slice(0, 3),
      notes: ['SOURCE_PROVENANCE.md', 'REBUILDING_HEIC.md'],
      critical: [
        'heic-to-1.6.7/LICENSE', 'heic-to-1.6.7/src/index.js',
        'heic-to-1.6.7/src/lib/libheif.js',
        'libheif-v1.23.7/COPYING', 'libheif-v1.23.7/build-emscripten.sh',
        'libde265-v1.1.3/COPYING', 'libde265-v1.1.3/CMakeLists.txt'
      ] },
    { name: 'NijRAW_LibRaw_Source_0.22.3.zip',
      sources: repositories.slice(3), notes: ['SOURCE_PROVENANCE.md'],
      critical: ['LibRaw-0.22.3/COPYRIGHT', 'LibRaw-0.22.3/LICENSE.LGPL',
        'LibRaw-0.22.3/LICENSE.CDDL'] }
  ];
  const archives = {};
  for (const output of outputs) {
    const folder = output.name.replace(/\.zip$/i, '');
    const destination = path.join(scratch, folder);
    fs.mkdirSync(destination, { recursive: true });
    for (const repo of output.sources) {
      const target = path.join(destination, repo.name);
      fs.mkdirSync(target, { recursive: true });
      run('tar', ['-xf', repo.exportTar, '-C', target]);
    }
    for (const name of output.notes)
      fs.copyFileSync(path.join(root, 'third_party', name), path.join(destination, name));
    const outputPath = path.join(root, 'third_party', output.name);
    const tempOutput = path.join(scratch, output.name);
    run('zip', ['-q', '-X', '-r', tempOutput, folder], scratch);
    fs.renameSync(tempOutput, outputPath);
    const bytes = fs.readFileSync(outputPath);
    const archiveKey = path.posix.join('third_party', output.name);
    archives[archiveKey] = {
      sha256: sha256(bytes), bytes: bytes.length,
      requiredFiles: [
        ...output.sources.map(repo => `${folder}/${repo.name}/README.md`),
        ...output.critical.map(name => `${folder}/${name}`),
        ...output.notes.map(name => `${folder}/${name}`)
      ],
      upstream: output.sources.map(({ name, url, tag, commit }) => ({ name, url, tag, commit }))
    };
    console.log(`${output.name}: ${(bytes.length / (1024 * 1024)).toFixed(1)} MiB`);
  }
  fs.writeFileSync(path.join(root, 'third_party', 'source-manifest.json'),
    JSON.stringify({ format: 1,
      embeddedHeicSha256: '0a6c14c89cf584482324ec5ff3ecaf21672bf77a20f95e3c04e2f68823137e59',
      provenanceNote: 'Upstream tags are not proof of byte-for-byte correspondence with embedded WASM/JS.',
      archives }, null, 2) + '\n');
  console.log('Wrote third_party/source-manifest.json');
} finally {
  // Only remove the exact scratch directory created by this invocation.
  fs.rmSync(scratch, { recursive: true, force: true });
}
