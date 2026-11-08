# Rebuilding and replacing the HEIC decoder

This is a **reference procedure**, not a verified byte-reproduction of the
embedded `src/vendor/libheif-inline.js`. NijRAW's runtime and GPU processing
remain unchanged by the corresponding-source archive.

## Contents

Unzip `NijRAW_HEIC_Source_1.23.7.zip`. The source archive includes:

- `heic-to-1.6.7/` — the browser wrapper, its original libheif output,
  distribution/build files, license and examples.
- `libheif-v1.23.7/` — native decoder source and `build-emscripten.sh`.
- `libde265-v1.1.3/` — native HEVC decoder source, linked by libheif.
- These provenance/rebuild notes and the vendors' own license files.

## Reference build

Use Emscripten SDK **4.0.8** (the editor's stated build SDK), plus CMake,
Make and pkg-config. The included libde265 **1.1.3** source now uses CMake;
libheif's older `build-emscripten.sh` assumes an Autotools-based libde265
distribution, so running that legacy script unmodified with 1.1.3 will fail.

The following is a reference way to build the static libraries using the
matching CMake sources. With an activated Emscripten environment, from the
extracted archive root:

```sh
emcmake cmake -S libde265-v1.1.3 -B build-de265 \
  -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF \
  -DENABLE_SIMD=OFF -DENABLE_SDL=OFF -DENABLE_ENCODER=OFF \
  -DCMAKE_INSTALL_PREFIX="$PWD/build-de265/install"
emmake cmake --build build-de265 --parallel
emmake cmake --install build-de265

emcmake cmake -S libheif-v1.23.7 -B build-libheif \
  -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF \
  -DENABLE_PLUGIN_LOADING=OFF -DWITH_LIBDE265=ON \
  -DWITH_LIBDE265_PLUGIN=OFF -DWITH_X265=OFF \
  -DLIBDE265_INCLUDE_DIR="$PWD/build-de265/install/include" \
  -DLIBDE265_LIBRARY="$PWD/build-de265/install/lib/libde265.a"
emmake cmake --build build-libheif --parallel
```

These commands build the static libraries, **not the final `libheif.js`**.
The JavaScript binding step in `libheif-v1.23.7/build-emscripten.sh` provides
a useful reference for `emcc`, exported C symbols, Embind, `post.js`, memory
growth and modularization. Reproduce or adapt that *link step* against the
newly built static libraries. The resulting binding API, flags and inlining
format require manual verification. Do not expect binary-equivalent output
without the precise original NijRAW compiler/linker configuration. CMake
options, installation paths and any further required codec disables may need
adjustment for your Emscripten environment.

Note: the `heic-to` v1.6.7 README illustrates a different configuration with
libde265 `1.0.16`. It should not be treated as the exact NijRAW recipe.

## Replacing the decoder in a modified NijRAW build

1. Compile the replacement for the same `HeifDecoder` / `image.display`
   browser API used in `src/scripts/02-editor-core.js`.
2. Ensure the compiled decoder can be inlined in the existing inert
   `id="libheif-inline"` payload, with no external fetch. NijRAW currently
   expects a global `libheif` factory after evaluating that payload.
3. Replace `src/vendor/libheif-inline.js` with the **tested** result and
   update its expected SHA-256 in `tools/check.mjs` and the provenance docs.
4. Run `npm run build`, `npm test`, `npm run check:release`, and browser tests
   of HEIC import on desktop and mobile while offline. Confirm metadata,
   orientation, alpha, errors, memory use, and output pixels. Verify the
   stand-alone HTML remains fully self-contained.
5. Retain the modified native source, your complete build inputs and flags,
   licenses, and effective recipient replacement/relinking instructions in
   the redistributed archive.

The archive does **not** certify a binary-identical rebuild or establish
that LGPL relinking requirements are fully met. Any such claim must follow
an independent reproducibility and licensing review.
