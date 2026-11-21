PRINCETON WEALTH ACADEMY — UPDATED HOMEPAGE PATCH
Based on the astro-migration branch checked November 21, 2026
===================================================================

IMPORTANT: THIS IS AN UPDATE PATCH, NOT YOUR ENTIRE src FOLDER.
Do not delete/replace your existing src directory. Extract the ZIP into a
separate folder and copy/merge ONLY the included files into your project.

FILES INCLUDED
  src/pages/index.astro       English homepage
  src/pages/zh/index.astro    Chinese homepage
  src/assets/.gitkeep         Holds the assets directory in the ZIP

WHAT'S UPDATED
  - English homepage retains its existing Astro <Image> implementation.
  - Chinese homepage now uses the same responsive WebP image optimization.
  - Both homepages use priority loading for the above-the-fold image.
  - Both use a neutral warm-white (#faf9f6) loading fallback instead of navy.
  - Overlay gradients become neutral black/gray so no blue background shows
    while the image loads; white hero text remains readable on the image.
  - Preserve navigation links, translations, mobile cropping, and styling.
  - No modification to shared layouts, global CSS, header, content, or data.

REQUIRED MANUAL STEP: ORIGINAL PHOTO IS NOT IN THIS ZIP
  In the verified remote branch, the source image is at:
    src/Homepage.jpeg
  But the homepage code imports it from:
    src/assets/Homepage.jpeg
  Move the ORIGINAL jpeg to src/assets/Homepage.jpeg to avoid build errors.
  In VS Code, drag Homepage.jpeg from src into the new src/assets folder.
  Or in PowerShell at your repository root (once assets exists):
    Move-Item .\src\Homepage.jpeg .\src\assets\Homepage.jpeg

INSTALLATION
  1. In VS Code, commit or back up your existing local project.
  2. Extract this ZIP to a temporary folder, NOT over your existing repo.
  3. Compare both new homepages with any local edits made after syncing.
  4. Copy src/pages/index.astro and src/pages/zh/index.astro into your repo,
     replacing these two files only after comparison.
  5. Create src/assets if needed; move src/Homepage.jpeg into it.
  6. From the repo root, run:
       npm run build
       npm run preview
  7. Check / and /zh/ on both desktop and mobile.
  8. When verified, commit and push to astro-migration:
       git add -A
       git commit -m "Optimize bilingual homepage hero images"
       git push origin astro-migration

WHAT I CHECKED
  - src/pages/index.astro (astro-migration) had <Image> + priority, but still
    expected image at src/assets/Homepage.jpeg.
  - src/pages/zh/index.astro still used <img> and background:#0b2d5b.
  - src/layouts/BaseLayout.astro already recognizes /, /zh and /zh/ as
    homepages, so no BaseLayout modification is necessary.
  - src/styles/style.css uses .home-hero (different selector), so its blue
    fallback is not what is shown by the current .lighthouse-hero.
  - package.json uses Astro ^7.4.13, compatible with <Image> priority/layout.

NOT VERIFIED / NOT INCLUDED
  - I cannot access your unsynced VS Code files or the live Git worktree.
  - Original 6.67 MB image is not included; it must be moved locally.
  - I could not run npm install/build on the remote repository or measure LCP.
  - No generated blurred image placeholder; this would require the original.
  - This ZIP does not contain your other src subfolders and is NOT a full
    application snapshot.

TROUBLESHOOTING
  "Cannot find module ../assets/Homepage.jpeg": move the jpeg as above.
  Blue flash still appears: make sure the updated branch deployed and force
  refresh; inspect the relevant CSS and the actual served image in DevTools.
  Images take time to load on slow connections; priority/optimization reduce
  time but cannot guarantee an instant display.

REFERENCES
  https://github.com/Toppatman/princeton-wealth-academy/tree/astro-migration
  https://docs.astro.build/en/reference/modules/astro-assets/
