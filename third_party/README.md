# Third-party sources

This directory contains version-pinned, complete **upstream source trees**
for the decoder dependencies distributed in NijRAW:

- `NijRAW_HEIC_Source_1.23.7.zip`: heic-to 1.6.7, libheif 1.23.7 and
  libde265 1.1.3, including their upstream licenses and build material.
- `NijRAW_LibRaw_Source_0.22.3.zip`: LibRaw 0.22.3, including its upstream
  licensing and build material.
- `SOURCE_PROVENANCE.md`: exact upstream tags, commits, and important
  distinctions between the upstream builds and NijRAW's embedded payload.
- `REBUILDING_HEIC.md`: reference source rebuild and decoder-replacement steps.
- `source-manifest.json`: source-archive SHA-256 hashes, sizes, expected
  contents and upstream commit identifiers.

The user-provided editor did **not** include the original compiler commands,
patch history or reproducible-build evidence for its embedded WASM/JS payload.
These newly retrieved authentic upstream snapshots do not prove byte-for-byte
correspondence, particularly because heic-to's build differs from NijRAW's.

`npm run check:release` verifies archive presence, contents and hashes. The
remaining manual binary-provenance and license audit is documented in
[`../docs/RELEASE_CHECKLIST.md`](../docs/RELEASE_CHECKLIST.md).
