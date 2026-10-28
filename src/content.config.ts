import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { LANGS } from './i18n'

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    lang: z.enum(LANGS),
    title: z.string(),
    role: z.string(),
    period: z.string(),
    summary: z.string(),
    order: z.number(),
    stack: z.array(z.string()),
    demo: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number() })).default([]),
  }),
})

export const collections = { cases }
