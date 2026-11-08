# Contributing to NijRAW

Thanks for helping build a private, non-AI photo editor for photographers.

## Before you start

1. Check existing issues and explain the user problem you want to solve.
2. Keep ordinary photo processing on-device; avoid telemetry, accounts, or image uploads.
3. Preserve the documented GPU preview, CPU export, masks, original RAW, and non-destructive editing behavior unless your change intentionally addresses one of them.
4. Do not introduce model-backed or cloud-based AI processing as an implicit dependency.
5. Document changes in beginner-friendly language and add a manual reproduction checklist for UI work.

## Edit and validate

```bash
npm run build
npm test
```

- Change the extracted files in `src/`, not only the generated `index.html`.
- Keep the order of executable classic scripts; moving declarations can alter initialization timing.
- Do not hand-edit the generated decoder payloads under `src/vendor/` or the Lensfun snapshot.
- Preserve license notices, attribution and the browser's restrictive Content Security Policy.
- If you modify colour, geometry, masks or export, verify a sample photo visually and compare export against preview on at least one desktop and one mobile browser where possible.
- Do not upload private photos or EXIF/GPS information to public issues. Use opt-in, rights-cleared fixtures.

## Pull requests

Explain the user-visible change, list tested browsers/file formats, and include screenshots only when they contain no private user material. For performance changes include before/after timings and image dimensions. For output changes note colour space and bit depth. When a dependency or payload changes, provide complete source, license information, reproducible build steps and checksums.

Contributions to Akartri-owned application files are expected to be compatible with the repository's GPL-3.0-only licensing. Third-party code/data may have different obligations; discuss any new vendor component before adding it.
