# Princeton Wealth Academy — Phase 4/5 Priority Fixes

Prepared against the publicly visible `main` branch on November 22, 2026.

## What this patch does
1. Changes `src/components/Header.astro` to use Chinese labels and `/zh/` destinations on Chinese pages. Retains the separate EN/中文 switcher and responsive mobile drawer.
2. Adds Chinese article publishing using `/zh/insights/<slug>/` and reuses the existing article layout with localized labels. The English Insights list and article generator now ignore Chinese content entries; the Chinese equivalents show only Chinese content.
3. Changes `src/pages/zh/events/index.astro` to `<EventList lang="zh" />`, reusing your existing event component and event pages.

## File changes
- REPLACE `src/components/Header.astro`
- REPLACE `src/components/LanguageSwitcher.astro`
- ADD `src/components/InsightsList.astro`
- REPLACE `src/layouts/ArticleLayout.astro`
- REPLACE `src/pages/insights/index.astro`
- REPLACE `src/pages/insights/[...slug].astro`
- REPLACE `src/pages/zh/insights/index.astro`
- ADD `src/pages/zh/insights/[...slug].astro` (if already present, compare before overwriting)
- ADD `src/content/insights/zh/retirement/retirement-income-planning.md`
- REPLACE `src/pages/zh/events/index.astro`

## Installation
1. Commit or back up your existing project first.
2. At your local `princeton-wealth-academy` project root, extract this archive **into the existing repository folder**, merging `src/` with your existing `src/`. **Do not delete the original `src` folder.**
3. Review the changes in VS Code, then run:
   ```sh
   npm install
   npm run build
   npm run dev
   ```
4. Test:
   - `/zh/` — Chinese header labels and Chinese navigation URLs
   - `/zh/education/` — Chinese navigation is retained after clicking menu links
   - `/insights/` — shows only English demo article
   - `/zh/insights/` — shows only Chinese demo article
   - `/insights/retirement/retirement-income-planning/` — language switch goes to Chinese counterpart
   - `/zh/insights/retirement/retirement-income-planning/` — language switch returns to English counterpart
   - `/zh/events/` — shows Chinese demo event(s), if your existing Chinese event content is present
   - Mobile width — language switch remains LEFT of hamburger menu

## Publish to main after tests pass
```sh
git status
git add src
git commit -m "Complete bilingual navigation, insights, and events"
git pull --rebase origin main
git push origin main
```
If you are on another branch, merge it through a pull request or switch to `main` and merge the branch first; don't blindly run `git push origin main` while on a different branch. Resolve any conflicts carefully.

## Important notes
- Only the added Chinese article is placeholder/demo content. Replace and review the text before publishing real educational articles.
- For new Chinese articles, use `src/content/insights/zh/<category>/<slug>.md` with a matching English file at `src/content/insights/<category>/<slug>.md` if you want deep-link switching to preserve the exact article. If a matching translation doesn't exist, the language switcher falls back to the corresponding Insights landing page.
- Event translations work similarly when filenames/slugs match under `src/content/events/en/` and `src/content/events/zh/`.
- This archive is a targeted patch, **not** a full replacement project. It uses your existing `BaseLayout`, `EventList`, `EventLayout`, styles and other pages.
- This archive was prepared from public source inspection. A full Astro build cannot run in this isolated environment without your project dependencies. Validate locally with `npm run build` before pushing.
