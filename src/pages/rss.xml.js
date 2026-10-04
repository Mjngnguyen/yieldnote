import rss from '@astrojs/rss';
import { SITE } from '../site.config.js';
import { getGuides } from '../lib/site.js';

// Also feeds the newsletter: listmonk-rss or Beehiiv/Kit RSS-to-email can mail new guides automatically.
export async function GET(context) {
  const guides = await getGuides();
  return rss({
    title: SITE.name, description: SITE.tagline, site: context.site,
    items: guides.map((g) => ({ title: g.data.title, description: g.data.description, pubDate: g.data.pubDate, link: `/guides/${g.id}/` }))
  });
}
