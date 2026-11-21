/**
 * Phase 6: Resource categories and bilingual interface text.
 * The same slugs are used for the English and Chinese URLs.
 */
export type ResourceLocale = 'en' | 'zh';

export type ResourceCategorySlug =
  | 'guides'
  | 'checklists'
  | 'faqs'
  | 'videos'
  | 'workshop-materials';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface ResourceCategory {
  slug: ResourceCategorySlug;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: 'guides',
    icon: '📖',
    title: { en: 'Guides', zh: '学习指南' },
    description: {
      en: 'Step-by-step educational reading on financial topics.',
      zh: '通过循序渐进的阅读资料了解各类财务主题。',
    },
  },
  {
    slug: 'checklists',
    icon: '☑️',
    title: { en: 'Checklists', zh: '检查清单' },
    description: {
      en: 'Practical lists to help organize questions and prepare for decisions.',
      zh: '利用实用清单整理问题，为重要决定做好准备。',
    },
  },
  {
    slug: 'faqs',
    icon: '❔',
    title: { en: 'FAQs', zh: '常见问题' },
    description: {
      en: 'Clear answers to frequently asked financial education questions.',
      zh: '以清晰易懂的方式解答常见的财务教育问题。',
    },
  },
  {
    slug: 'videos',
    icon: '▶️',
    title: { en: 'Videos', zh: '视频' },
    description: {
      en: 'Watchable educational explanations and presentations.',
      zh: '观看财务知识讲解及教育演示视频。',
    },
  },
  {
    slug: 'workshop-materials',
    icon: '🗂️',
    title: { en: 'Workshop Materials', zh: '讲座资料' },
    description: {
      en: 'Slides, handouts, and follow-up materials from educational events.',
      zh: '查阅教育讲座的演示文稿、讲义及后续参考资料。',
    },
  },
];

export const resourceCopy = {
  en: {
    eyebrow: 'PRINCETON WEALTH ACADEMY',
    pageTitle: 'Resources',
    pageDescription:
      'Explore educational resources from Princeton Wealth Academy, including guides, checklists, FAQs, videos, and workshop materials.',
    heroText:
      'Explore financial education materials organized in one place. Our resource library is being prepared for future additions.',
    browseHeading: 'Browse by resource type',
    browseIntro: 'Choose a category to explore its materials.',
    viewCategory: 'Explore category',
    noteTitle: 'More resources are on the way',
    noteText:
      'These sections are ready for future guides, checklists, videos, and workshop materials. Content will be added after review.',
    breadcrumb: 'Resources',
    categoryEyebrow: 'RESOURCE LIBRARY',
    materialsHeading: 'Available materials',
    emptyTitle: 'Materials coming soon',
    emptyText:
      'This section is ready for future resources. Please check back as educational materials are published.',
    openResource: 'View resource',
    back: 'Back to all resources',
    educationText: 'For topic-based learning, visit our',
    educationLink: 'Education section',
  },
  zh: {
    eyebrow: '普林斯顿财富学院',
    pageTitle: '学习资源',
    pageDescription:
      '浏览普林斯顿财富学院的教育资源，包括学习指南、检查清单、常见问题、视频及讲座资料。',
    heroText:
      '在这里按类别浏览财务教育资源。资源库已预留好空间，未来将持续增加资料。',
    browseHeading: '按资源类型浏览',
    browseIntro: '选择一个类别，查看相应的学习资料。',
    viewCategory: '查看类别',
    noteTitle: '更多资源即将推出',
    noteText:
      '这些栏目已为未来的指南、清单、视频和讲座资料做好准备。内容将在审核后陆续发布。',
    breadcrumb: '学习资源',
    categoryEyebrow: '学习资源库',
    materialsHeading: '现有资料',
    emptyTitle: '资料即将发布',
    emptyText: '此栏目已准备就绪。相关教育资料发布后将在这里展示。',
    openResource: '查看资料',
    back: '返回全部资源',
    educationText: '如需按财务主题学习，请访问',
    educationLink: '财务教育专区',
  },
} satisfies Record<ResourceLocale, Record<string, string>>;

export function resourcesHome(locale: ResourceLocale): string {
  return locale === 'zh' ? '/zh/resources/' : '/resources/';
}

export function resourceCategoryUrl(
  locale: ResourceLocale,
  slug: ResourceCategorySlug,
): string {
  return `${resourcesHome(locale)}${slug}/`;
}
