# Third-party source provenance

NijRAW embeds browser-ready decoder builds in `src/vendor/`. The source archives
in this directory preserve the upstream projects used to identify those
dependencies, at pinned, inspectable commits. They are not replacements for the
existing decoder JavaScript and are not loaded by the browser.

| Source archive | Upstream repository | Tag | Commit |
| --- | --- | --- | --- |
| `NijRAW_HEIC_Source_1.23.7.zip` | `hoppergee/heic-to` | `v1.6.7` | `78345a3fcdb4a1d70d513fce2646aeff0127f7ba` |
| same archive | `strukturag/libheif` | `v1.23.7` | `12a259a5882dd99d45ec5fc77e296a3b620d1e2e` |
| same archive | `strukturag/libde265` | `v1.1.3` | `ba62bf4cfb3242f3bf0a45617ff09e35236e4d82` |
| `NijRAW_LibRaw_Source_0.22.3.zip` | `LibRaw/LibRaw` | `0.22.3` | `cf02d66eb5c19d4e46df7aee0582e47a4918509a` |

Upstream URLs:

- <https://github.com/hoppergee/heic-to/tree/v1.6.7>
- <https://github.com/strukturag/libheif/tree/v1.23.7>
- <https://github.com/strukturag/libde265/tree/v1.1.3>
- <https://github.com/LibRaw/LibRaw/tree/0.22.3>

The archives contain upstream trees **including their own licenses and build
files**. `tools/package-third-party-sources.mjs` verifies the pinned commits,
copies them without `.git` history, and produces the archives and the
machine-readable `source-manifest.json`. `npm run check:release` verifies the
downloaded/published archives against that manifest.

## Important provenance limitation

The NijRAW embedded HEIC decoder is identified by SHA-256:

`0a6c14c89cf584482324ec5ff3ecaf21672bf77a20f95e3c04e2f68823137e59`

That compiled script is **not byte-identical** to the two `libheif.js` variants
included with `heic-to` v1.6.7. Also, the `heic-to` checked-in libheif build
describes `LIBDE265_VERSION=1.0.16`, while NijRAW's own decoder comment
identifies libde265 `1.1.3`. This could reflect a separate rebuild, altered
flags or other local changes. The source archive therefore establishes
availability of the named upstream sources, **not** reproduction of the exact
NijRAW compiled output, its specific compiler flags, or its original patches.

The user who compiled the NijRAW decoder must supply or verify the actual
Emscripten toolchain, build commands, any changes to upstream code, and the
replacement/relinking procedure. See `REBUILDING_HEIC.md`. No claim of complete
LGPL compliance should be made until that verification is finished.

The LibRaw source tree is likewise pinned to the version stated in the editor;
its exact Emscripten flags, any modifications, and binary equivalence have not
been independently established. Source availability alone is not a licensing
audit or a warranty.
