import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Guides live as Markdown in src/content/articles. Sveltia CMS (/admin) edits these files.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    offers: z.array(z.string()).default([]),
    tool: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { articles };
