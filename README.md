# NijRAW: Free Open-Source RAW Photo Editor in Your Browser

**A free, private RAW photo editor that runs entirely in your browser on desktop, laptop, tablet and mobile. No uploads, no account, no watermark, no generative AI.**

[**Open the editor →**](https://www.nijraw.com/editor.html) · [Website](https://www.nijraw.com) · [Screenshot](https://www.nijraw.com/og-image.jpg) · [Demo video](https://www.nijraw.com/media/nijraw-demo.webm) · [Changelog](CHANGELOG.md)

NijRAW develops supported camera RAW files (ARW, NEF, CR2/CR3, DNG, RAF, ORF, RW2) and edits JPEG, PNG, HEIC, TIFF and WebP. It offers approachable editing controls and keeps image processing on your device. It uses conventional imaging algorithms rather than generative AI, and editing continues offline after the editor loads.

It is designed for beginners and intermediate photographers who want a private alternative to subscription RAW editors.

**Works on every screen size.** The interface adapts to desktop monitors, laptops, tablets and phones. No install or app store is needed, just a modern browser.

NijRAW is distributed as a **single self-contained HTML file**. This repository also includes the extracted, editable application source, bundled dependency payloads, licensing information, and a dependency-free build/verification process.

## Why NijRAW

- **Private by design:** image processing stays on your device, with no account and no processing server.
- **Free and open source:** no subscription or watermark. Application code is GPL-3.0-only.
- **Not generative AI:** real, controllable adjustments instead of generated pixels.
- **Any device:** one app for desktop, tablet and phone.
- **Offline capable:** keep editing after the app loads.
- **Portable:** a single `index.html`, plus editable `.nijraw` project files.

## Try NijRAW

1. Open [nijraw.com/editor.html](https://www.nijraw.com/editor.html) on any device, or download [`index.html`](index.html) and open it in a modern browser.
2. Click **Import** and choose a photo, or use the built-in guided sample.
3. Start in **Quick**, then use **Advanced**, **Subject**, **Retouch**, and **Insights** as needed.
4. Use **Export → JPEG** for a shareable result, or **Save project (.nijraw)** for a portable editable copy.

The application does not require an account or a processing server. Optional help and reference links may open external sites only when selected.

> **Device note:** Camera and RAW support depends on the file, browser, and device memory. Very large RAW files may be slower on phones and tablets with limited RAM. See in-app Help for limitations.

## Features

**RAW and format support**
- On-device development for supported RAW formats: ARW, NEF, CR2/CR3, DNG, RAF, ORF, RW2.
- JPEG, PNG, HEIC, TIFF, WebP and other browser-supported images.

**Editing**
- Manual exposure, tone, white balance, curves, colour, HSL, detail, denoise, and geometry.
- Auto improve, crop, perspective, and calibrated Lensfun-based lens corrections.

**Local editing and retouching**
- Classical (non-AI) subject isolation with editable masks and subject/background controls.
- Brush and gradient masks, plus healing and clone tools.

**Workflow**
- Before/after, Two Looks comparison, history, editable projects, presets, batch processing, and a local Library.
- Photo Insights: on-device feedback on lighting, edge detail and composition, based on image measurements, not generative AI.
- Guided learning and an offline sample image.

**Output**
- Export to JPEG, PNG and TIFF.
- sRGB and Display P3 output options where supported by the encoder.
- GPU-accelerated interactive preview where supported, with CPU fallback and a distinct high-precision full-size export path.

## FAQ

**Is NijRAW free?** Yes. No subscription, account or watermark.

**Are my photos uploaded?** No. Files are decoded and edited locally in your browser. Loading the website itself requires connecting to the hosting provider.

**Does NijRAW use generative AI?** No. It uses conventional imaging algorithms, including classical subject isolation.

**Does it work on mobile?** Yes, in any modern mobile browser. Very large RAW files depend on available device memory.

**Does it work offline?** Yes, after the editor has loaded.

**Which RAW formats are supported?** ARW, NEF, CR2/CR3, DNG, RAF, ORF and RW2. Support depends on the specific file, browser, and device.

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

## Contributing

Contributions, bug reports and feedback are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md), or open an [issue](../../issues).

## License

The Akartri-owned application portions are licensed under **GPL-3.0-only**. Embedded dependencies and data retain their distinct terms, including LGPL and CC BY-SA. The GPL does not apply to a user's photographs just because they were edited in NijRAW.

See [LICENSE](LICENSE), [THIRD_PARTY.md](THIRD_PARTY.md), and [`LICENSES/`](LICENSES/).

### Distribution and source-compliance status

This repository includes version-pinned upstream source archives for heic-to, libheif, libde265 and LibRaw, plus build guidance and checksum verification. However, the exact original compilation settings and binary equivalence of NijRAW's embedded HEIC and RAW decoders have **not** been independently established. In particular, the heic-to build differs from the shipped HEIC payload. The remaining verification and relinking steps are recorded in the [Release checklist](docs/RELEASE_CHECKLIST.md) and [Third-party components](THIRD_PARTY.md). The generated JavaScript/WASM payloads are not substitutes for corresponding native source.

Publishing this repository to GitHub is **not** performed by the build commands. Repository setup and release distribution are separate steps; complete the documented binary-correspondence and licensing review before calling the distributable fully source-compliant.

---

Copyright © 2026 [Akartri](https://akartri.com/). NijRAW is a free, open-source, private RAW photo editor.