# Generated decoder bundles

These files are **generated third-party code**, extracted without modification from the supplied standalone NijRAW editor:

- `libraw-inline.js`: bundled LibRaw runtime (original notice: 0.22.3).
- `libheif-inline.js`: bundled libheif 1.23.7 + statically linked libde265 1.1.3 runtime.

They are inserted into the standalone HTML inside **inert** `text/plain` script tags and loaded by application code only when needed. Keep their content byte-for-byte unless rebuilding with the correct upstream sources and licenses.

This folder contains the shipped payloads, **not** the C/C++ corresponding source. Pinned upstream C/C++ source archives are now included under [`third_party/`](../../third_party/), along with their provenance and reference rebuild notes. The exact original compilation flags and byte-for-byte correspondence to the embedded decoder are **not yet verified**. Do not advertise complete LGPL compliance until the remaining provenance and relinking audit is resolved; see [`THIRD_PARTY.md`](../../THIRD_PARTY.md).
