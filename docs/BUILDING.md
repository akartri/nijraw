# Build, test and development

## Requirements

- Node.js 20 or later
- A modern browser for manual testing
- No npm dependencies, account, build service or network connection

The normal editor build and tests require no network connection. The **optional**
source-archive regeneration command below does require GitHub access, `git`,
`tar`, and `zip`, unless the pinned upstream Git clones are provided locally.

## Build

```bash
npm run build
npm test
```

`tools/build.mjs` reads `src/template.html`, replaces its 15 uniquely named slots with their exact component bodies, base64-encodes the guided JPEG, and writes `index.html`. It does not minify/reformat the supplied application logic, change browser security policy, or download dependencies.

`tools/check.mjs` checks that the committed HTML exactly matches the assembled source, parses the executable inline scripts, validates Lensfun JSON, checks the sample JPEG and bundled licenses, and matches the documented inlined HEIC payload SHA-256.

Initially, `index.html` is **byte-identical** to the attached `editor(2).html` from which this source tree was extracted. The checksum comparison was part of packaging verification.

## Make changes

1. Edit the relevant file in `src/scripts`, `src/styles`, or `src/template.html`.
2. Run `npm run build`.
3. Run `npm test`.
4. Open the generated `index.html` locally and verify a browser edit/export flow.
5. Check both desktop and mobile layouts before merging UI changes.
6. For RAW/export/mask changes, compare representative original/preview/export results and inspect performance diagnostics.

For safety, do not use bulk formatting on generated decoder files or refactor the order of the classic scripts as a cosmetic change.

## Import a newer standalone editor

There is a migration helper for future upstream snapshots:

```bash
node tools/import-single-file.mjs /path/to/new-editor.html --force
npm run build
npm test
```

**Warning:** `--force` intentionally replaces every extracted source component and license text. Review its diff carefully; the helper does not semantically merge independently edited source files. Only use it when replacing the canonical standalone source on purpose.

## Publish to GitHub

The repository includes the downloaded, version-pinned HEIC and LibRaw source
archives. To rebuild these archives from the exact upstream commits when
updating third-party sources:

```bash
npm run package:sources
npm run check:release
```

Offline, if you have Git checkouts of the four pinned repositories in folders
named exactly as listed in `third_party/SOURCE_PROVENANCE.md`:

```bash
node tools/package-third-party-sources.mjs --from-local /path/to/pinned-clones
```

See [`PUBLISHING.md`](PUBLISHING.md) for repository upload and optional
GitHub Pages instructions. The remaining binary-correspondence, replacement
and license review is tracked in [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).
