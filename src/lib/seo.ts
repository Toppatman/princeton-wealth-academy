import { getCollection } from 'astro:content';
import { educationCategories } from '../data/educationCategories';
import { resourceCategories } from '../data/resources';
import { educationCategoriesZh } from '../i18n/educationCategoriesZh';

const origin = 'https://princetonwealthacademy.com';

const pairedStaticRoutes = new Set([
  '/',
  '/about/',
  '/about/sharon-deng/',
  '/contact/',
  '/education/',
  '/insights/',
  '/events/',
  '/resources/',
  ...educationCategories
    .filter((category) => Object.hasOwn(educationCategoriesZh, category.slug))
    .map((category) => '/education/' + category.slug + '/'),
  ...resourceCategories.map((category) => '/resources/' + category.slug + '/'),
]);

const descriptions: Record<string, { en: string; zh: string }> = {
  '/': {
    en: 'Explore financial education on retirement, investments, taxes, insurance, estate planning, and college funding at Princeton Wealth Academy.',
    zh: '探索普林斯顿财富学院的退休、投资、税务、保险、遗产规划及大学教育资金等财务教育资源。',
  },
  '/about/': {
    en: 'Learn about the mission, founder, and team behind Princeton Wealth Academy.',
    zh: '了解普林斯顿财富学院的使命、创办人和团队。',
  },
  '/about/sharon-deng/': {
    en: 'Learn about Sharon R. Deng, MBA, founder of Princeton Wealth Academy.',
    zh: '了解普林斯顿财富学院创办人 Sharon R. Deng, MBA。',
  },
  '/contact/': {
    en: 'Contact Princeton Wealth Academy with questions about its financial education resources and events.',
    zh: '联系普林斯顿财富学院，了解财务教育资源与活动。',
  },
  '/education/': {
    en: 'Explore financial education topics including retirement, investments, taxes, insurance, and college funding.',
    zh: '探索退休、投资、税务、保险、长期护理、遗产规划及大学教育资金等主题。',
  },
};

const draftRoutes = new Set([
  '/zh/insights/language-test/',
  '/insights/retirement/retirement-income-planning/',
  '/zh/insights/retirement/retirement-income-planning/',
  '/events/retirement-basics/',
  '/zh/events/retirement-basics/',
]);

function cleanRoute(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === '/' ? '/' : path + '/';
}

/**
 * Prepare metadata for both languages without assuming every page has a translation.
 * Return alternate-language links only when the corresponding content actually exists.
 */
export async function getSeoMetadata(pathname: string, title: string, description?: string) {
  const path = cleanRoute(pathname);
  const isChinese = path === '/zh/' || path.startsWith('/zh/');
  const language = isChinese ? 'zh-Hans' : 'en';
  const basePath = isChinese ? path.slice(3) || '/' : path;
  const enPath = basePath;
  const zhPath = enPath === '/' ? '/zh/' : '/zh' + enPath;

  let hasTranslation = pairedStaticRoutes.has(basePath);

  if (!hasTranslation && basePath.startsWith('/insights/')) {
    const slug = basePath.slice('/insights/'.length).replace(/\/$/, '');
    const articles = await getCollection('insights');
    hasTranslation =
      articles.some((entry) => entry.id === slug) &&
      articles.some((entry) => entry.id === 'zh/' + slug);
  } else if (!hasTranslation && basePath.startsWith('/events/')) {
    const slug = basePath.slice('/events/'.length).replace(/\/$/, '');
    const events = await getCollection('events');
    hasTranslation =
      events.some((entry) => entry.id === 'en/' + slug) &&
      events.some((entry) => entry.id === 'zh/' + slug);
  }

  const suffix = ' | Princeton Wealth Academy';
  const cleanTitle = title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
  const brand = isChinese ? '普林斯顿财富学院' : 'Princeton Wealth Academy';
  const pageTitle = cleanTitle === 'Home'
    ? (isChinese ? '普林斯顿财富学院 | 财务教育' : 'Princeton Wealth Academy | Financial Education')
    : cleanTitle === brand ? brand : cleanTitle + ' | ' + brand;
  const pageDescription = description?.trim() ||
    descriptions[basePath]?.[isChinese ? 'zh' : 'en'] ||
    (isChinese
      ? '普林斯顿财富学院提供财务教育文章、活动与学习资源。'
      : 'Princeton Wealth Academy offers educational information about important financial topics.');

  return {
    language,
    pageTitle,
    pageDescription,
    canonical: new URL(path, origin).href,
    alternateEnglish: hasTranslation ? new URL(enPath, origin).href : undefined,
    alternateChinese: hasTranslation ? new URL(zhPath, origin).href : undefined,
    noindex: draftRoutes.has(path),
    isHome: path === '/' || path === '/zh/',
  };
}
