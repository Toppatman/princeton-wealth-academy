# Princeton Wealth Academy — Astro Phase 1 scaffold

These files implement only the navigation and basic pages requested in Phase 1 of `instructions2.txt`.
They are designed to merge into an existing Astro project without replacing your old homepage, CSS, or existing HTML files.

## Mac installation

1. Open your existing Princeton Wealth Academy project in VS Code.
2. Open Terminal and make sure you're at the repository root (where `package.json` lives).
3. Download `princeton-astro-phase1.zip` from ChatGPT.
4. If it was downloaded to your macOS Downloads directory, run:

   unzip -n ~/Downloads/princeton-astro-phase1.zip -d .

   The `-n` flag prevents overwriting any file that already exists.

5. If you still have a root-level `CNAME` file, copy it so Astro includes it in the build:

   test ! -f CNAME || cp -n CNAME public/CNAME

6. Verify `src/styles/style.css` exists. The generated BaseLayout imports it.
7. Run `npm run dev` and visit `http://localhost:4321/`.
8. Run `npm run build` to check for build errors before deployment.

## Notes

- If `src/pages/index.astro` already exists, the unzip command will keep your version. To share the generated navigation and footer, adjust your existing homepage to use `BaseLayout.astro`.
- The file `src/components/header.html` is intentionally not touched. You can remove it after you switch to `Header.astro`.
- A root `index.html` is also intentionally left untouched as a backup.
- The existing CSS may require small adjustments to match the new classes.
- GitHub Pages workflow, structured data, articles, translations, and event detail pages are not included. Those belong to later phases.
- Work on your migration branch, not `main`, until review is complete.
