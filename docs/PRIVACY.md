# Privacy and local processing

NijRAW is designed to perform photo decoding, editing, selection, retouch and export **on the user's device**. The standalone HTML requires no account, analytics, photo upload or remote processing API.

- The HTML's Content Security Policy restricts connection and resource origins; the embedded decoders and data run locally.
- Local Library and session state use browser storage. Clearing site/browser data, changing browsers, storage pressure, or private-browsing policies can remove that state. Keep downloadable `.nijraw` projects as portable backups.
- Optional EXIF inclusion in image exports is off by default in the supplied editor. A `.nijraw` project retains the original source, including its original metadata.
- External links in Help, licensing, and reference material are user-initiated. Opening them contacts the destination site under that site's policy.
- Hosting via GitHub Pages downloads the public application HTML from GitHub's servers, but normal photo processing remains in the browser.

When contributing, do not add hidden analytics, automatic photo transfer, external model inference, or diagnostic upload behavior. If you intentionally add networking or sharing, document it clearly and obtain meaningful user consent where required.

Do not attach private photos or EXIF/GPS data to public issues; use non-sensitive samples with permission.
