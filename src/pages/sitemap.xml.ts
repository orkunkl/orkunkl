import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://orkunkl.com').replace(/\/$/, '');
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const canon = (await getCollection('canon')).sort((a, b) => a.data.order - b.data.order);
  const urls = [
    { loc: `${base}/`, priority: '1.0' },
    { loc: `${base}/about/`, priority: '0.8' },
    { loc: `${base}/work/`, priority: '0.8' },
    ...work.map((e) => ({ loc: `${base}/work/${e.id}/`, priority: '0.6' })),
    { loc: `${base}/canon/`, priority: '0.8' },
    ...canon.map((e) => ({ loc: `${base}/canon/${e.id}/`, priority: '0.6' })),
  ];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`),
    '</urlset>', '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
