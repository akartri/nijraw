# NijRAW

**Private, non-AI photo editing in your browser.** NijRAW develops supported camera RAW files, offers approachable editing controls, and keeps image processing on the device. It is designed for beginners and intermediate photographers who prefer conventional imaging algorithms over generative AI.

NijRAW is distributed as a **single self-contained HTML file**. This repository also includes the extracted, editable application source, bundled dependency payloads, licensing information, and a dependency-free build/verification process.

> **Distribution notice:** This repository includes version-pinned upstream source archives for heic-to, libheif, libde265 and LibRaw, plus build guidance and checksum verification. However, the exact original compilation settings and binary equivalence of NijRAW's embedded HEIC and RAW decoders have **not** been independently established. In particular, the heic-to build differs from the shipped HEIC payload. The remaining verification and relinking steps are recorded in the [Release checklist](docs/RELEASE_CHECKLIST.md) and [Third-party components](THIRD_PARTY.md). The generated JavaScript/WASM payloads are not substitutes for corresponding native source.

## Try NijRAW

1. Download [`index.html`](index.html).
2. Open it in a modern browser (desktop or mobile).
3. Click **Import** and choose a photo, or use the built-in guided sample.
4. Start in **Quick**, then use **Advanced**, **Subject**, **Retouch**, and **Insights** as needed.
5. Use **Export → JPEG** for a shareable result, or **Save project (.nijraw)** for a portable editable copy.

The application does not require an account or a processing server. Optional help and reference links may open external sites only when selected. Camera and RAW support depends on the file, browser, and device memory; see in-app Help for limitations.

## Features

- On-device development for supported RAW formats, plus JPEG/PNG and browser-supported images.
- Manual exposure, tone, white balance, curves, colour, HSL, detail, denoise, and geometry.
- Classical (non-AI) subject isolation with editable masks and subject/background controls.
- Local adjustments, healing/clone tools, crop, perspective, and calibrated Lensfun-based corrections.
- GPU-accelerated interactive preview where supported, with CPU fallback and a distinct high-precision full-size export path.
- Before/after, history, editable projects, presets, batch processing, and a local Library.
- Guided learning, photo insights and an offline sample image.
- sRGB and Display P3 output options where supported by the encoder.

## Repository map

| Location | Purpose |
| --- | --- |
| [`index.html`](index.html) | Ready-to-run, fully embedded application; the GitHub Pages entry point. |
| [`src/template.html`](src/template.html) | HTML structure and source-order placeholders. |
| [`src/styles/editor.css`](src/styles/editor.css) | Complete editor styling. |
| [`src/scripts/`](src/scripts/) | Editable JavaScript, in execution order. |
| [`src/vendor/`](src/vendor/) | Generated embedded decoder payloads, kept separate from application code. |
| [`src/data/lensfun.json`](src/data/lensfun.json) | Embedded adapted Lensfun dataset. |
| [`src/assets/guided-sample.jpg`](src/assets/guided-sample.jpg) | CC0 guided sample photograph. |
| [`tools/`](tools/) | Source import, deterministic build, validation, and release checks. |
| [`third_party/`](third_party/) | Pinned upstream HEIC/RAW source archives, provenance, rebuild instructions and integrity manifest. |
| [`LICENSE`](LICENSE), [`LICENSES/`](LICENSES/), [`THIRD_PARTY.md`](THIRD_PARTY.md) | GPL, LGPL, third-party provenance and distribution notes. |
| [`docs/`](docs/) | Architecture, build instructions, privacy, and release checklist. |

## Build and test

Requires **Node.js 20 or newer**, no npm packages or internet connection.

```bash
npm run build
npm test
```

The build inlines source components into `index.html` and maintains the exact script order, MIME types, policy, base64-encoded sample, and decoder payloads. The checked-in output initially matches the supplied HTML **byte-for-byte**. Tests validate syntax, bundle integrity, license text presence, and that the generated file is up to date.

To update an extracted component, edit its file in `src/`, run `npm run build`, then `npm test`. Do not edit the generated decoder files by hand. Further details: [Building](docs/BUILDING.md) and [Architecture](docs/ARCHITECTURE.md).

## Hosting

GitHub Pages can serve the root `index.html` as a static site. File processing remains local to the user's browser, but loading the website itself requires connecting to the hosting provider. Review the Content Security Policy and privacy notes before changing external resources.

Publishing this repository to GitHub is **not** performed by the build commands. Repository setup and release distribution are separate steps; complete the documented binary-correspondence and licensing review before calling the distributable fully source-compliant.

## License and contributions

The Akartri-owned application portions are licensed under **GPL-3.0-only**. Embedded dependencies and data retain their distinct terms, including LGPL and CC BY-SA. The GPL does not apply to a user's photographs just because they were edited in NijRAW.

See [LICENSE](LICENSE), [THIRD_PARTY.md](THIRD_PARTY.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [SECURITY.md](SECURITY.md).

Copyright © 2026 Akartri.
