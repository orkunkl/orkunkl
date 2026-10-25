import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

/**
 * /llms-full.txt — every entry as raw Markdown, in one file.
 *
 * Mirrors sunnya97.com's LLM surface: models get the source text rather than
 * having to reconstruct it from rendered HTML.
 */

export const GET: APIRoute = async ({ site: canonical }) => {
  const base = (canonical?.href ?? 'https://orkunkl.com').replace(/\/$/, '');

  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const canon = (await getCollection('canon')).sort((a, b) => a.data.order - b.data.order);

  const parts: string[] = [];

  parts.push(`# ${site.name} — full text`);
  parts.push('');
  parts.push(`> ${site.bio}`);
  parts.push(`> ${site.intent}`);
  parts.push('');
  parts.push(`Index: ${base}/llms.txt`);
  parts.push('');
  parts.push('---');

  if (work.length) {
    parts.push('');
    parts.push('# Work');
    for (const e of work) {
      parts.push('');
      parts.push(`## ${e.data.title}`);
      parts.push('');
      parts.push(`URL: ${base}/work/${e.id}`);
      parts.push(`Status: ${e.data.status}`);
      if (e.data.tags.length) parts.push(`Tags: ${e.data.tags.join(', ')}`);
      parts.push('');
      parts.push(`> ${e.data.summary}`);
      parts.push('');
      parts.push(e.body ?? '_(no body)_');
      parts.push('');
      parts.push('---');
    }
  }

  if (canon.length) {
    parts.push('');
    parts.push('# Canon');
    for (const e of canon) {
      parts.push('');
      parts.push(`## ${e.data.title}`);
      parts.push('');
      parts.push(`URL: ${base}/canon/${e.id}`);
      parts.push(`Kind: ${e.data.kind}`);
      if (e.data.author) parts.push(`Author: ${e.data.author}`);
      if (e.data.year) parts.push(`Year: ${e.data.year}`);
      if (e.data.tags.length) parts.push(`Tags: ${e.data.tags.join(', ')}`);
      parts.push('');
      parts.push(`Why it matters: ${e.data.whyItMatters}`);
      parts.push('');
      parts.push(e.body ?? '_(no body)_');
      parts.push('');
      parts.push('---');
    }
  }

  parts.push('');

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
