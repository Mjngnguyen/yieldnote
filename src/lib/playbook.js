/*
 * Revenue playbook: every monetisation model the site supports, where it
 * lives on the site, and an estimator driven by the owner's own assumptions.
 */
export const MODELS = [
  ['Display advertising', 'Paid per 1,000 pageviews (RPM). Rates depend on topic, reader country and season.', 'Leaderboard, in-article and sidebar slots on every page', 'AdSense first; managed networks (Ezoic, Mediavine, Raptive) once you meet their traffic minimums', 'Easy'],
  ['Affiliate marketing', 'Commission per sale, signup or funded account. Finance and SaaS programs pay the most.', '"Partner pick" boxes in guides, topic pages and calculators', 'Join programs directly or via networks (Impact, CJ, PartnerStack, Awin). Paste links in config.js', 'Medium'],
  ['Lead generation', 'Paid per qualified lead for insurance, loans, mortgages and services.', 'Quote and comparison offers on high-value topics', 'Lead-gen networks or direct deals with local brokers and agencies', 'Medium'],
  ['Email newsletter', 'Turns one-time visitors into repeat readers you can sell sponsorships and products to.', 'Lead-magnet signup on home, articles and sidebars', 'Beehiiv, Kit or MailerLite. Paste the form endpoint in config.js', 'Easy'],
  ['Digital products', 'Highest margin: build once, sell indefinitely.', 'Shop page and product cards on the home page', 'Gumroad, Lemon Squeezy or Payhip checkout links', 'Medium'],
  ['Online courses', 'Higher price point for structured teaching.', 'Shop page; promote through the newsletter', 'Teachable, Podia, Thinkific or a Stripe link plus private videos', 'Hard'],
  ['Memberships', 'Recurring revenue for ad-free reading and premium content.', 'Premium page with three tiers', 'Stripe Payment Links, Memberful, Ghost or Patreon', 'Medium'],
  ['Sponsorships', 'Flat fees from brands for labelled placements.', 'Advertise page and rate card', 'Pitch brands that already advertise in your topic', 'Medium'],
  ['Services & consulting', 'Sell your expertise directly to readers.', 'Booking button on Contact and Advertise', 'Calendly or Cal.com link in config.js', 'Medium'],
  ['Tool sponsorship', 'Calculators attract steady search traffic that a brand can sponsor.', 'Every calculator page', 'Sell "Presented by" placements per tool per month', 'Medium'],
  ['Tips & donations', 'Small but frictionless for loyal readers.', 'Premium page', 'Ko-fi or Buy Me a Coffee link', 'Easy'],
  ['Selling the site', 'Content sites with steady profit sell for a multiple of monthly profit.', 'The whole business', 'Marketplaces such as Empire Flippers or Flippa; keep clean revenue records', 'Long-term']
];

export const FIELDS = [
  ['pv', 'Monthly pageviews', 50000, 1000], ['rpm', 'Ad RPM ($ per 1,000 views)', 12, 0.5],
  ['ctr', 'Affiliate click rate (%)', 3, 0.1], ['cvr', 'Affiliate conversion (%)', 4, 0.1], ['com', 'Average commission ($)', 40, 1],
  ['sub', 'Visitor → subscriber (%)', 1.5, 0.1], ['buy', 'New subscribers who buy a product (%)', 2, 0.1], ['price', 'Average product price ($)', 29, 1],
  ['members', 'Paying members', 40, 1], ['mprice', 'Member price ($/month)', 6, 1], ['spons', 'Sponsorship income ($/month)', 0, 50]
];

export function estimate(v) {
  const subs = v.pv * v.sub / 100;
  const ch = [
    ['Display ads', v.pv / 1000 * v.rpm],
    ['Affiliate', v.pv * v.ctr / 100 * v.cvr / 100 * v.com],
    ['Digital products', subs * v.buy / 100 * v.price],
    ['Memberships', v.members * v.mprice],
    ['Sponsorships', v.spons]
  ];
  return { channels: ch, total: ch.reduce((s, c) => s + c[1], 0), subs };
}

export function estimateHTML(v) {
  const e = estimate(v), max = Math.max(1, ...e.channels.map((c) => c[1]));
  const f = (n) => '$' + Math.round(n).toLocaleString('en-US');
  return `<div class="big">${f(e.total)}<small class="muted" style="font:500 1rem var(--f-ui)"> / month</small></div>
    <div class="rows">${e.channels.map(([k, n]) => `<div><span>${k}</span><b>${f(n)}</b></div><div aria-hidden="true" style="border:0;padding:0"><span style="display:block;height:6px;border-radius:3px;background:var(--accent);width:${(n / max * 100).toFixed(1)}%"></span></div>`).join('')}
    <div><span>New subscribers per month</span><b>${Math.round(e.subs).toLocaleString('en-US')}</b></div></div>`;
}

