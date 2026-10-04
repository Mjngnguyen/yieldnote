import { getCollection } from 'astro:content';
import { TOPICS } from './catalog.js';

export const topicBy = (slug) => TOPICS.find((t) => t.slug === slug);
export const usd = (n) => '$' + Number(n).toLocaleString('en-US');

export async function getGuides() {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.pubDate - a.data.pubDate || a.data.title.localeCompare(b.data.title));
}

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
