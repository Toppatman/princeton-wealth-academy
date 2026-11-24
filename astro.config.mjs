import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const excludedPaths = new Set([
  '/zh/insights/language-test/',
  '/insights/retirement/retirement-income-planning/',
  '/zh/insights/retirement/retirement-income-planning/',
  '/events/retirement-basics/',
  '/zh/events/retirement-basics/',
]);

export default defineConfig({
  site: 'https://princetonwealthacademy.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !excludedPaths.has(new URL(page).pathname),
    }),
  ],
});
