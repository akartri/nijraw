# Architecture

NijRAW's production artifact is **one HTML document**. Everything required for ordinary editing—layout, styles, classic JavaScript, decoder bundles, camera/lens data, the sample photo, and offline license text—is inlined at build time. This preserves the supplied editor's local `file://` behavior.

## Source-order contract

The assembly manifest is [`tools/source-map.mjs`](../tools/source-map.mjs). It maps every embedded script or style block to a source file, retaining the original tag attributes and position in the HTML template.

1. `src/template.html` — document structure, controls, dialogs, markup, and build slots.
2. `src/styles/editor.css` — responsive desktop/mobile visual system and canvas layout.
3. `src/scripts/01-early-startup.js` — early boot/progress handling.
4. `src/assets/guided-sample.jpg` — offline sample, base64 in `<script type="text/plain">`.
5. `LICENSE` and `LICENSES/` — full license texts, inert in the HTML.
6. `src/vendor/libheif-inline.js`, `src/vendor/libraw-inline.js` — generated inlined decoder payloads, inert until consumed by application logic.
7. `src/data/lensfun.json` — imported Lensfun data, embedded in `<script type="application/json">`.
8. `src/scripts/02-editor-core.js` — primary application and rendering implementation.
9. `src/scripts/03-*` through `07-*` — later viewport, slider, popup, landscape, and license refinements.

**Do not casually reorder top-level scripts or split the core into ES modules.** The classic-script execution order, hoisted functions, late patches, inline event handlers, and offline worker behavior are coupled. Refactoring is possible, but must be a separate tested project, not part of repository packaging.

## Data and rendering paths

Camera-native RAW data and decoded non-RAW image data use different internal routes. The source comments describe 8-bit compatibility, 16-bit, and native-float paths, with a WebGL preview and precision-oriented full-size export implementation. The pipelines are not assumed byte-identical, so a visual/export-parity test is required for algorithm changes.

Main operations include:

- File import, EXIF and RAW decoding
- Non-destructive global edit parameters and tone curves
- Subject/background masks, local masks and retouch operations
- On-device Library/session persistence in IndexedDB
- Responsive preview rendering with GPU eligibility/fallback
- Full-size colour/geometry processing and format encoders
- Portable `.nijraw` projects and batch operations

The current standalone editor is the reference implementation for behavior. No GPU or RAW implementation was modified by extracting the source.

## Dependency boundaries

The vendor JavaScript includes generated decoder runtime artifacts. The Lensfun JSON is an adapted licensed dataset, not handwritten application code. Changes must retain licenses and be backed by corresponding-source and rebuild materials; see [`THIRD_PARTY.md`](../THIRD_PARTY.md).

The app's Content Security Policy limits network/resource access. The source may display links to optional external information, but it has no required runtime photo-processing endpoint.
