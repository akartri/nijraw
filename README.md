# NijRAW — Private Photo Editor

**NijRAW** is a single-file, in-browser RAW and photo editor that runs 100% on-device. No uploads, no servers, no accounts — your photos and their sensor data never leave your machine.

> **NijRAW** — from Sanskrit *nij* (निज), "one's own, intrinsic, not borrowed." Paired with **RAW**: your photos, and the raw sensor data behind them, stay entirely your own.

## Highlights

- **100% Private · On-device** — all decoding, editing, and exporting happens locally in the browser. Nothing is ever transmitted anywhere.
- **RAW sensor decoding** — opens camera RAW files and decodes straight from sensor data, with a transparency panel showing exactly what's happening to your pixels ("decode provenance") at every step.
- **Full local photo library** — import, rate (star ratings, pick/reject flags), search, filter, sort, and organize into albums, all stored on-device (IndexedDB) with session restore.
- **Non-destructive editing** — every adjustment is reversible; undo/redo history, before/after split compare, and press-and-hold "show original."

## Editing toolkit

- **Global adjustments** — Exposure, Contrast, Highlights, Shadows, Whites, Blacks, Texture, Clarity, Dehaze, Vibrance, Saturation
- **White balance** — Temp/Tint controls, plus one-tap auto white balance
- **Tone curves & HSL** — per-channel curves and full hue/saturation/luminance color mixing
- **Selective masking** — brush, radial (elliptical spotlight), linear (graduated) and AI-assisted subject-detection masks, with edge sensitivity, feathering, and range-mask style refinement (invert, edge-snap tightness, color-based bulk removal)
- **Geometry** — crop, straighten (with one-tap horizon auto-level), rotate 90°, flip horizontal/vertical
- **Detail & noise** — hybrid VST + low-rank denoise (with auto-estimate), separate color-noise reduction, sharpening, grain, vignette
- **Auto enhance** — one-tap automatic correction, individually toggleable
- **Batch editing** — apply one photo's adjustments to a batch of others and export each
- **Recipes** — save/load your adjustments as a portable `.nijraw.json` file to reuse or share
- **Full project files** — save a `.nijraw` project containing the untouched original plus every edit, mask, and adjustment, to resume later exactly where you left off

## Export

- Formats: JPEG, PNG, and lossless TIFF (8-bit rendered, or 16-bit straight from the decoded RAW master for archival use)
- Quality presets, sRGB or Display P3 color space, and resizing (original, 4K, web, or social)
- Optional inclusion/stripping of camera EXIF/GPS metadata

## Getting started

NijRAW is a single self-contained `index.html` file — no build step, no dependencies, no install.

1. Download `index.html`.
2. Open it in a modern desktop or tablet browser (Chrome, Edge, Firefox, or Safari recommended).
3. Click **Import** to load photos, or **Library** to browse anything you've previously imported.

That's it — everything runs locally from that point on.

> **Note:** Landscape editing isn't supported on phones; use portrait on phone, or a tablet/laptop for landscape.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/⌘ + Z` | Undo |
| `Ctrl/⌘ + Shift + Z` | Redo |
| `\` | Press and hold to view original |
| `Esc` | Close library |
| `0`–`5` | Set star rating (library grid) |
| `P` / `X` | Pick / Reject flag (library grid) |
| `U` | Clear flag (library grid) |
| `Space` | Toggle selection (library grid) |
| Arrow keys | Navigate library grid |

## Privacy

NijRAW makes no network requests for your photos or edits. All storage is local to your browser/device. There are no accounts, no telemetry, and no cloud processing — the "100% Private · On-device" badge in the toolbar is a statement of how the app is built, not just marketing copy.

