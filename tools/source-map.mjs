// The source order is intentionally fixed. The browser runs the classic scripts
// in document order; the inert text/plain bundles are read by the editor later.
export const parts = [
  { tag: 'style', index: 0, file: 'src/styles/editor.css', slot: '__NIJRAW_STYLE_00__' },
  { tag: 'script', index: 0, file: 'src/scripts/01-early-startup.js', slot: '__NIJRAW_SCRIPT_00__' },
  { tag: 'script', index: 1, file: 'src/assets/guided-sample.jpg', encoding: 'base64', slot: '__NIJRAW_SCRIPT_01__' },
  { tag: 'script', index: 2, file: 'LICENSE', slot: '__NIJRAW_SCRIPT_02__' },
  { tag: 'script', index: 3, file: 'LICENSES/LGPL-2.1.txt', slot: '__NIJRAW_SCRIPT_03__' },
  { tag: 'script', index: 4, file: 'LICENSES/LGPL-3.0.txt', slot: '__NIJRAW_SCRIPT_04__' },
  { tag: 'script', index: 5, file: 'src/vendor/libheif-inline.js', slot: '__NIJRAW_SCRIPT_05__' },
  { tag: 'script', index: 6, file: 'src/vendor/libraw-inline.js', slot: '__NIJRAW_SCRIPT_06__' },
  { tag: 'script', index: 7, file: 'src/data/lensfun.json', slot: '__NIJRAW_SCRIPT_07__' },
  { tag: 'script', index: 8, file: 'src/scripts/02-editor-core.js', slot: '__NIJRAW_SCRIPT_08__' },
  { tag: 'script', index: 9, file: 'src/scripts/03-toolbar-overflow.js', slot: '__NIJRAW_SCRIPT_09__' },
  { tag: 'script', index: 10, file: 'src/scripts/04-slider-visuals.js', slot: '__NIJRAW_SCRIPT_10__' },
  { tag: 'script', index: 11, file: 'src/scripts/05-popover-position.js', slot: '__NIJRAW_SCRIPT_11__' },
  { tag: 'script', index: 12, file: 'src/scripts/06-landscape-layout.js', slot: '__NIJRAW_SCRIPT_12__' },
  { tag: 'script', index: 13, file: 'src/scripts/07-license-download.js', slot: '__NIJRAW_SCRIPT_13__' },
];

export const tagPattern = tag => new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
