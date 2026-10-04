import { SITE } from '../site.config.js';
export function GET() {
  const c = SITE.adsense.client;
  return new Response(c ? `google.com, ${c.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n` : '# Add your AdSense publisher ID to src/site.config.js and rebuild.\n');
}
