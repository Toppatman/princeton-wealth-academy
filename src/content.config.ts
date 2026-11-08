
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Phase 3: Insights
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

// Phase 5: Events
const events = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/events',
  }),
  schema: z.object({
    lang: z.enum(['en', 'zh']),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    location: z.string().optional(),
    presentedBy: z.string(),
    hostedBy: z.string(),
    collaboration: z.string().optional(),

    whatYouWillLearn: z.array(z.string()).default([]),

    relatedResources: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).default([]),

    photos: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).default([]),

    videoUrl: z.string().url().optional(),
    recap: z.string().optional(),

    presentationResources: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).default([]),

    relatedArticles: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).default([]),
  }),
});

// Export both collections
export const collections = { insights, events };