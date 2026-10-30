import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insights = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/insights',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    author: z.literal('Sharon R. Deng, MBA'),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    references: z.array(z.object({
      title: z.string(),
      url: z.string().url().optional(),
    })).default([]),
    relatedArticles: z.array(z.string()).default([]),
  }),
});

export const collections = { insights };
