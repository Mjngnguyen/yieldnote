import { SITE } from '../site.config.js';
export function GET() {
  const base = SITE.url.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\nDisallow: /go/\nDisallow: /admin/\nSitemap: ${base}/sitemap-index.xml\n`);
}
