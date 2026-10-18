import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * /llms.txt — the llmstxt.org convention.
 *
 * A plain-text index an LLM can read to understand the site's structure and
 * find what it needs, without crawling and parsing HTML.
 */

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://orkunkl.com').replace(/\/$/, '');

  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const canon = (await getCollection('canon')).sort((a, b) => a.data.order - b.data.order);

  const line = (title: string, url: string, note?: string) =>
    `- [${title}](${url})${note ? `: ${note}` : ''}`;

  const out: string[] = [];

  out.push('# Orkun Külçe');
  out.push('');
  out.push(
    '> Blockchain technologist and metamodern mystic. Smart contracts in Rust ' +
      'in the Cosmos ecosystem, including StreamSwap on Osmosis, and developer relations ' +
      'for CosmWasm. ' +
      'Interested in regeneration and non-dual philosophies and practices. Delved into ' +
      'Spanda and Pratyabhijñā teachings.'
  );
  out.push('');
  out.push(
    'Everything under Work and Canon is written as Markdown; the full text is ' +
      'available at ' +
      `[${base}/llms-full.txt](${base}/llms-full.txt).`
  );
  out.push('');

  out.push('## About');
  out.push('');
  out.push(line('About', `${base}/about`, 'Background, interests, and what I believe.'));
  out.push('');

  out.push('## Work');
  out.push('');
  if (work.length === 0) out.push('_No entries yet._');
  for (const e of work) {
    out.push(line(e.data.title, `${base}/work/${e.id}`, `${e.data.summary} [${e.data.status}]`));
  }
  out.push('');

  out.push('## Canon');
  out.push('');
  out.push('_Books, texts and teachings that shaped how I think._');
  out.push('');
  if (canon.length === 0) out.push('_No entries yet._');
  for (const e of canon) {
    const by = [e.data.author, e.data.year].filter(Boolean).join(', ');
    out.push(line(e.data.title, `${base}/canon/${e.id}`, `${by ? by + ' — ' : ''}${e.data.whyItMatters}`));
  }
  out.push('');

  out.push('## Optional');
  out.push('');
  out.push(line('Full text', `${base}/llms-full.txt`, 'Every entry concatenated as Markdown.'));
  out.push(line('Search', `${base}/`, 'Pagefind indexes the built site.'));
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
