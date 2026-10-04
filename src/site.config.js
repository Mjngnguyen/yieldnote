/*
 * Site configuration — the only file you need to edit to start earning.
 * Every revenue channel reads from here. Empty values fall back to a
 * visible placeholder (when showPlaceholders is true) or are hidden.
 */
export const SITE = {
  name: 'Yieldnote',
  tagline: 'Money guides, calculators and income ideas that pay off.',
  url: 'https://example.com',
  contactEmail: 'hello@example.com',
  showPlaceholders: true, // set false before launch to hide unfilled ad/affiliate slots

  // 1. Display ads (Google AdSense, Ezoic, Mediavine, Raptive…)
  adsense: {
    client: '', // e.g. 'ca-pub-1234567890123456' — also put it in ads.txt
    slots: { leaderboard: '', inArticle: '', sidebar: '', footer: '' }
  },

  // Analytics. GA4 and AdSense load only after cookie consent (vanilla-cookieconsent).
  // Umami is cookieless, so it loads without a banner: https://github.com/umami-software/umami
  ga4: '', // e.g. 'G-XXXXXXX'
  umami: { src: '', websiteId: '' }, // e.g. src 'https://analytics.example.com/script.js'

  // 2. Email list. provider 'listmonk' (self-hosted, https://github.com/knadh/listmonk)
  //    posts to <endpoint>/subscription/form with your list UUID; 'form' posts email to any form URL.
  newsletter: {
    provider: 'listmonk', endpoint: '', listUuid: '',
    leadMagnet: 'Money Starter Kit', leadMagnetDetail: 'Budget sheet and 30-day checklist'
  },

  // Comments via GitHub Discussions (https://giscus.app). Leave repo empty to disable.
  giscus: { repo: '', repoId: '', category: 'Comments', categoryId: '' },

  // 3. Affiliate links — paste your tracked links. Keys are used across all topics.
  affiliates: {
    broker: '', robo: '', exchange: '', hardwareWallet: '', budgetApp: '',
    savings: '', creditCard: '', creditMonitor: '', personalLoan: '',
    lifeInsurance: '', autoInsurance: '', realEstate: '', hosting: '',
    emailTool: '', aiWriter: '', courses: '', fitnessApp: '',
    travelCard: '', travelInsurance: '', booking: ''
  },

  // 4. Digital products (Gumroad, Lemon Squeezy, Payhip, Stripe Payment Links)
  products: [
    { id: 'budget-kit', title: 'Budget Spreadsheet Kit', price: 19, type: 'Template',
      desc: 'Monthly budget, debt payoff tracker and net-worth sheet for Google Sheets and Excel.', checkoutUrl: '' },
    { id: 'side-income', title: 'Side Income Playbook', price: 29, type: 'Ebook',
      desc: '60 pages on picking, validating and pricing a side hustle, with worksheets.', checkoutUrl: '' },
    { id: 'invest-course', title: 'Investing Foundations', price: 79, type: 'Video course',
      desc: '8 lessons: accounts, index funds, allocation, rebalancing and taxes.', checkoutUrl: '' },
    { id: 'crypto-guide', title: 'Crypto Safety Checklist', price: 9, type: 'PDF',
      desc: 'Wallet setup, seed phrase storage and scam red flags on one printable page.', checkoutUrl: '' }
  ],

  // 5. Memberships (Stripe Payment Links, Memberful, Patreon, Ghost)
  membership: [
    { name: 'Free', price: 0, period: 'forever', perks: ['Weekly newsletter', 'All public guides', 'Basic calculators'], url: '/#newsletter' },
    { name: 'Insider', price: 6, period: 'month', perks: ['Ad-free reading', 'Monthly deep-dive report', 'Downloadable templates', 'Members-only Q&A'], url: '', featured: true },
    { name: 'Pro', price: 49, period: 'year', perks: ['Everything in Insider', 'All digital products included', '1 portfolio or business review per year'], url: '' }
  ],

  // 6. Sponsorships — your rate card (set your own numbers)
  sponsorRates: [
    { format: 'Newsletter primary sponsor', unit: 'per issue', price: '' },
    { format: 'Sponsored guide', unit: 'per article, permanent', price: '' },
    { format: 'Sitewide banner', unit: 'per month', price: '' },
    { format: 'Tool page sponsor', unit: 'per month', price: '' }
  ],

  // 7. Services / lead generation (Calendly, Cal.com, TidyCal)
  bookingUrl: '',
  // 8. Tips / donations (Ko-fi, Buy Me a Coffee)
  donateUrl: ''
};
