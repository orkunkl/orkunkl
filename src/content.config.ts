import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections.
 *
 * Every entry is a Markdown file in src/content/<collection>/.
 * Files starting with an underscore (`_template.md`) are ignored — they exist
 * only as copy-paste templates.
 *
 * To publish something: copy `_template.md` to a new name and fill in the
 * frontmatter. The page, the index listing, the search index and llms.txt all
 * pick it up automatically — no code changes.
 */

const IGNORE = '!**/_*.md';

const work = defineCollection({
  loader: glob({ pattern: ['**/*.md', IGNORE], base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    // the role held — "Blockchain Software Architect"
    role: z.string().optional(),
    // free text — "2022 — Present"
    period: z.string().optional(),
    summary: z.string(),
    status: z.enum(['active', 'maintenance', 'experiment', 'archived']).default('active'),
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),
    order: z.number().default(99),
  }),
});

const canon = defineCollection({
  loader: glob({ pattern: ['**/*.md', IGNORE], base: './src/content/canon' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    kind: z.enum(['book', 'teaching', 'text', 'talk', 'essay', 'channel', 'account']).default('book'),
    // the shelf it sits on — entries are grouped by this on /canon
    category: z.string().default('Other'),
    year: z.string().optional(),
    // the one line you'd give someone who asked "why does this matter?"
    whyItMatters: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { work, canon };
