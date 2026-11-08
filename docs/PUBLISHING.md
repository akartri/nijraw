# Adding NijRAW to GitHub

The project in this folder is already structured as a repository. **No GitHub repository was created or published automatically.**

## Upload through the GitHub website

1. Create a new **public** repository named `nijraw` (or your preferred name).
2. Keep the repository empty—avoid asking GitHub to generate a second README, license or `.gitignore`.
3. Upload **the contents of this folder**, preserving the nested `src`, `tools`, `docs`, `LICENSES`, `third_party`, and `.github` directories. Include the two pinned upstream source archives, not just the generated `index.html`.
4. Commit the files and check that the license and third-party attribution display correctly.
5. Run `npm run check:release` to verify the included dependency-source archives. Complete the remaining binary-reproduction and LGPL/relinking review on the release checklist before advertising full source compliance.

## Upload using Git

In the extracted project directory, after creating an empty GitHub repository:

```bash
git init
git add .
git commit -m "Initial NijRAW open-source source tree"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/nijraw.git
git push -u origin main
```

Replace `YOUR_ACCOUNT` with your actual GitHub account or organization. If the remote has existing commits, integrate those changes rather than overwriting them.

## Optional GitHub Pages

Because the complete distributable is root `index.html`, Pages can publish it as a static site from the `main` branch root. Confirm the browser receives the correct MIME type and check offline editing after the initial page load. External help links require connectivity.

The HTML does not use a hosted backend, but visiting the website necessarily transfers the public application to the browser. The user's actual photos are processed locally.
