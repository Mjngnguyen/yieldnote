import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.js';

// Inserts an in-article ad slot after the third top-level block of every guide.
function rehypeInArticleAd() {
  const { client, slots } = SITE.adsense;
  const el = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });
  const text = (value) => ({ type: 'text', value });
  return (tree) => {
    let node;
    if (client && slots.inArticle) {
      node = el('div', { className: ['ad-live'] }, [el('ins', {
        className: ['adsbygoogle'], style: 'display:block;text-align:center', dataAdLayout: 'in-article',
        dataAdFormat: 'fluid', dataAdClient: client, dataAdSlot: slots.inArticle
      })]);
    } else if (SITE.showPlaceholders) {
      node = el('div', { className: ['ad', 'inline'] }, [el('small', {}, [text('Advertisement')]), el('span', {}, [text('In-article slot · add your AdSense ID in src/site.config.js')])]);
    }
    if (!node) return;
    const blocks = tree.children.map((c, i) => [c, i]).filter(([c]) => c.type === 'element');
    if (blocks.length > 4) tree.children.splice(blocks[2][1] + 1, 0, node);
  };
}

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/\/(go|playbook)\//.test(page) })],
  markdown: { rehypePlugins: [rehypeInArticleAd] }
});
