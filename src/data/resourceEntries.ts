import type { ResourceCategorySlug, ResourceLocale } from './resources';

/**
 * Add real resources here AFTER their titles, descriptions, URLs, and
 * translations have been approved. Keep the array empty for Phase 6.
 */
export interface ResourceEntry {
  id: string;
  category: ResourceCategorySlug;
  locale: ResourceLocale;
  title: string;
  description: string;
  href: string;
  format: 'PDF' | 'Article' | 'Video' | 'Webpage';
  external?: boolean;
}

export const resourceEntries: ResourceEntry[] = [];

/*
Example for the later content-upload phase (do not activate until the file exists):

export const resourceEntries: ResourceEntry[] = [
  {
    id: 'sample-guide-en',
    category: 'guides',
    locale: 'en',
    title: 'Approved Guide Title',
    description: 'Approved summary of the guide.',
    href: '/resources/approved-guide.pdf',
    format: 'PDF',
  },
  {
    id: 'sample-guide-zh',
    category: 'guides',
    locale: 'zh',
    title: '已审核的指南标题',
    description: '已审核的指南简介。',
    href: '/resources/approved-guide-zh.pdf',
    format: 'PDF',
  },
];

Place these PDFs in public/resources/ (or link to actual published pages).
*/
