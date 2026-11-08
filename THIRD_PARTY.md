# Third-party components and attribution

The files in `src/vendor/`, `src/data/`, and `src/assets/` do **not** become GPL-3.0-only just because they are embedded into NijRAW. Keep their upstream copyright statements, licenses, and corresponding-source obligations when redistributing.

| Component | Source/version asserted by bundled editor | License/attribution | Where included |
| --- | --- | --- | --- |
| **LibRaw** | [LibRaw 0.22.3](https://github.com/LibRaw/LibRaw/tree/0.22.3) | LGPL 2.1 or CDDL 1.0, recipient's choice (per embedded notice) | `src/vendor/libraw-inline.js` (generated JavaScript/WASM payload) |
| **libheif** | [libheif v1.23.7](https://github.com/strukturag/libheif/tree/v1.23.7) | LGPL-3.0-or-later, © Struktur AG and contributors | `src/vendor/libheif-inline.js` |
| **libde265** | [libde265 v1.1.3](https://github.com/strukturag/libde265/tree/v1.1.3) | LGPL-3.0-or-later, © Struktur AG, Dirk Farin and contributors; statically linked into HEIC fallback | In libheif embedded output |
| **heic-to** | [heic-to v1.6.7](https://github.com/hoppergee/heic-to/tree/v1.6.7), upstream browser-wrapper/reference build of libheif 1.23.7 | LGPL-3.0; © its contributors | Pinned source in `third_party/NijRAW_HEIC_Source_1.23.7.zip`; its prebuilt decoder is **not byte-identical** to NijRAW's bundle |
| **Lensfun data** | [Lensfun XML database](https://github.com/lensfun/lensfun/tree/master/data/db) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), © respective Lensfun contributors; adapted data | `src/data/lensfun.json` |
| **Guided sample photo** | [North Brofjorden at Sandvik – just lens](https://commons.wikimedia.org/wiki/File:North_Brofjorden_at_Sandvik_-_just_lens.jpg), W.carter (2017) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `src/assets/guided-sample.jpg` |
| **Emscripten-generated runtime** | SDK 4.0.8, as stated in original editor | Retains its own applicable licenses/notices | Generated embedded decoder bundles |

Copies of the **GPL 3**, **LGPL 2.1**, and **LGPL 3** license texts are stored in `LICENSE` and `LICENSES/` and remain embedded for offline use in the generated editor.

## Upstream source archives included — build correspondence still unverified

The editor's own redistribution notice calls for a file named:

`NijRAW_HEIC_Source_1.23.7.zip`

The repository now includes this archive under `third_party/`, assembled from the verified upstream Git tags for **heic-to 1.6.7**, **libheif 1.23.7** and **libde265 1.1.3**, including their source files, native build scripts, license notices, pinned commit provenance, and a reference replacement/rebuild guide. It also includes `NijRAW_LibRaw_Source_0.22.3.zip` at the tagged LibRaw commit. The archive hashes are recorded in `third_party/source-manifest.json` and checked by `npm run check:release`.

**Important:** these are authentic *upstream version snapshots*, but a byte-for-byte reproduction of the distributed decoder from those snapshots has **not** been demonstrated. In particular, the prebuilt libheif script in `heic-to` 1.6.7 does not match NijRAW's embedded script; that upstream build identifies libde265 **1.0.16** instead of the **1.1.3** claimed by NijRAW. Original NijRAW build options, any patches and the exact relinking/replacement setup still need confirmation. See [`third_party/SOURCE_PROVENANCE.md`](third_party/SOURCE_PROVENANCE.md) and [`third_party/REBUILDING_HEIC.md`](third_party/REBUILDING_HEIC.md).

The source editor reports the SHA-256 of its **inlined libheif script body** as:

`0a6c14c89cf584482324ec5ff3ecaf21672bf77a20f95e3c04e2f68823137e59`

`npm test` checks that the extracted bundle matches this value. That verifies the extracted payload, **not** whether the included upstream source archives reproduce it.

Before claiming a completely compliant redistribution, independently verify the exact decoder build provenance, whether modified source or build inputs are missing, and the effectiveness of recipients' replacement/relinking rights. Also verify LibRaw's corresponding-source distribution requirements and any HEVC patent or platform considerations. Seek qualified advice if there is uncertainty; this documentation is not a compliance warranty.

## Change history of adapted materials

- Lensfun XML records were selected and transformed into a JSON representation with camera/lens names, aliases and calibrated measurement rows. Attribution and CC BY-SA terms remain attached to that data.
- The guided sample photo is embedded as JPEG/base64 in the standalone HTML to permit offline guided editing; the extracted image here is the same byte content.
- The decoder bundles are precompiled/generated outputs. Tagged upstream C/C++ source is included, but complete original compilation provenance and binary equivalence are unverified.

Do not remove component credit or relicense any upstream material without permission.
