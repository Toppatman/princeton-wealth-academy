# Princeton Wealth Academy — Phase 6: Resources

This package implements **Phase 6 only**, without publishing educational content.
It uses the existing `src/layouts/BaseLayout.astro`, header, footer, and global
color variables. It does **not** include a new navigation menu, new dependencies,
or modifications to your existing pages outside Resources.

## Installation

1. Back up or commit your current changes first.
2. Open your Astro repository (the folder containing `package.json`).
3. Copy the supplied `src/` directory into the repository's `src/` directory,
   merging directories. Do **not** replace the whole `src` directory.
4. If you already have `src/pages/resources/index.astro`, replace that
   placeholder page with the supplied file.
5. Keep your existing `BaseLayout.astro`, `Header.astro`, `Footer.astro`,
   and `src/styles/style.css` (no changes needed for this phase).
6. Run `npm install` if dependencies are missing, `npm run dev` to preview,
   then `npm run build` to verify the production build.

## Files

```text
src/
├── data/
│   ├── resources.ts
│   └── resourceEntries.ts
├── components/
│   └── resources/
│       ├── ResourceCategoryCard.astro
│       ├── ResourceItemCard.astro
│       ├── ResourcesLanding.astro
│       └── ResourcesCategoryPage.astro
└── pages/
    ├── resources/
    │   ├── index.astro
    │   └── [category].astro
    └── zh/
        └── resources/
            ├── index.astro
            └── [category].astro
```

## URLs to test

- http://localhost:4321/resources/
- http://localhost:4321/resources/guides/
- http://localhost:4321/resources/checklists/
- http://localhost:4321/resources/faqs/
- http://localhost:4321/resources/videos/
- http://localhost:4321/resources/workshop-materials/
- http://localhost:4321/zh/resources/
- http://localhost:4321/zh/resources/guides/
- http://localhost:4321/zh/resources/workshop-materials/

The Chinese category pages use the same slugs as their English counterparts.
All 12 pages (2 landing pages plus 10 category pages) are statically generated.

## Adding content later

After Phase 6 approval, add approved PDF files to `public/resources/` or
publish their target URLs elsewhere. Add a record in `src/data/resourceEntries.ts`
with `category`, `locale`, `title`, `description`, `href`, and `format`.
The relevant category page will automatically list the resource. A model
comment in that file shows examples. No redesign or new page is necessary.
Resources are intentionally empty now to comply with Phase 6 instructions.

## Optional accessibility patch to BaseLayout

Some earlier versions of your `BaseLayout.astro` hardcoded `<html lang="en">`.
To indicate Chinese correctly on `/zh/` pages, update only these lines:

```astro
---
// Add to existing frontmatter (don't replace existing imports/props):
const language = Astro.url.pathname.startsWith('/zh/') ? 'zh-CN' : 'en';
---
<!-- Change the opening html tag: -->
<html lang={language}>
```

If this is already handled by your current BaseLayout, don't change it.
Your existing header/language switcher should point to `/resources/` and
`/zh/resources/` (and keep the category suffix when switching languages).

## Notes

- The Resources menu item already existed in the earlier Header you provided;
  do not add a duplicate one.
- No login system or CMS is needed for this phase.
- No placeholder PDFs, false resource titles, or fabricated publication details
  are being published.
- Show both language versions on desktop/mobile for review before Phase 7.
