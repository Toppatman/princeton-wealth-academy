/** Simplified Chinese text keyed by the slugs in src/data/educationCategories.ts.
 *  Confirm these keys against your actual category slugs before importing.
 */
export const educationCategoriesZh = {
  retirement: {
    title: '退休规划',
    description: '了解退休储蓄、退休收入及长期财务规划的基本概念。',
  },
  'investments-asset-allocation': {
    title: '投资与资产配置',
    description: '了解投资基础、分散投资及资产配置的基本原则。',
  },
  'tax-education': {
    title: '税务教育',
    description: '了解常见税务概念及税务规划的基本知识。',
  },
  'insurance-risk-management': {
    title: '保险与风险管理',
    description: '探索保险的作用以及识别和管理财务风险的方法。',
  },
  'long-term-care': {
    title: '长期护理',
    description: '了解长期护理需求、相关费用及规划时需要考虑的因素。',
  },
  'estate-legacy-planning': {
    title: '遗产与财富传承规划',
    description: '了解遗产安排、受益人指定及财富传承的基本概念。',
  },
  'college-funding': {
    title: '大学教育资金规划',
    description: '探索教育费用、储蓄方式和大学教育资金规划。',
  },
} as const;

export function getEducationCategoryZh(slug: string) {
  return (educationCategoriesZh as Record<string, { title: string; description: string }>)[slug];
}
