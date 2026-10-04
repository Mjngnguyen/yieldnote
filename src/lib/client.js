/*
 * Browser runtime: calculators, revenue estimator, newsletter forms,
 * copy buttons, ad slots and cookie consent.
 */
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { SITE } from '../site.config.js';
import { toolBy, resultHTML } from './tools.js';
import { estimateHTML } from './playbook.js';

const numbers = (form) => Object.fromEntries([...form.elements].filter((el) => el.name).map((el) => [el.name, parseFloat(el.value) || 0]));

document.querySelectorAll('[data-tool]').forEach((box) => {
  const t = toolBy(box.dataset.tool), form = box.querySelector('form'), out = box.querySelector('.result');
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('input', () => { out.innerHTML = resultHTML(t, numbers(form), box.dataset.compact === '1'); });
});

const est = document.querySelector('[data-estimator]');
if (est) {
  const form = est.querySelector('form');
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('input', () => { est.querySelector('.result').innerHTML = estimateHTML(numbers(form)); });
}

document.querySelectorAll('.nl-form').forEach((form) => form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = form.querySelector('.msg'), email = form.elements.email.value.trim(), n = SITE.newsletter;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Enter a full email address, like name@example.com.'; return; }
  if (!n.endpoint) { msg.textContent = 'Signup is in demo mode. Add your newsletter endpoint in src/site.config.js to collect subscribers.'; return; }
  msg.textContent = 'Subscribing…';
  const body = new FormData();
  body.append('email', email);
  let url = n.endpoint;
  if (n.provider === 'listmonk') { url = n.endpoint.replace(/\/$/, '') + '/subscription/form'; body.append('l', n.listUuid); }
  try {
    await fetch(url, { method: 'POST', body, mode: 'no-cors' });
    msg.textContent = 'Almost done: check your inbox to confirm your subscription.';
    window.umami?.track('newsletter-signup');
    window.gtag?.('event', 'generate_lead', { method: 'newsletter' });
  } catch {
    msg.textContent = 'Couldn’t reach the signup service. Check your connection and try again.';
  }
}));

document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', () => {
  const text = btn.dataset.copy === 'share' ? location.href : btn.dataset.copy;
  const note = btn.parentElement.querySelector('[data-copy-msg]');
  const show = (m) => { if (note) note.textContent = m; };
  navigator.clipboard?.writeText(text).then(() => show('Copied'), () => show('Copy this: ' + text)) ?? show('Copy this: ' + text);
}));

// Queue every ad slot; AdSense fills them once its consent-gated script loads.
document.querySelectorAll('ins.adsbygoogle').forEach(() => { (window.adsbygoogle = window.adsbygoogle || []).push({}); });

// Affiliate clicks → analytics event
document.querySelectorAll('a[href^="/go/"]').forEach((a) => a.addEventListener('click', () => {
  const id = a.getAttribute('href').split('/')[2];
  window.umami?.track('affiliate-click', { offer: id });
  window.gtag?.('event', 'affiliate_click', { offer: id });
}));

// Cookie consent only when a consent-requiring script (GA4, AdSense) is configured.
if (document.body.dataset.consent === '1') {
  CookieConsent.run({
    guiOptions: { consentModal: { layout: 'box', position: 'bottom left' } },
    categories: { necessary: { enabled: true, readOnly: true }, analytics: {}, ads: {} },
    language: { default: 'en', translations: { en: {
      consentModal: {
        title: 'Cookies on ' + SITE.name,
        description: 'We use cookies for analytics and to show ads that keep this site free. Choose what you allow.',
        acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Necessary only', showPreferencesBtn: 'Choose'
      },
      preferencesModal: {
        title: 'Cookie preferences', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Necessary only', savePreferencesBtn: 'Save choices', closeIconLabel: 'Close',
        sections: [
          { title: 'Necessary', description: 'Required for the site to work.', linkedCategory: 'necessary' },
          { title: 'Analytics', description: 'Google Analytics measures which guides are useful.', linkedCategory: 'analytics' },
          { title: 'Advertising', description: 'Google AdSense shows ads and may personalise them.', linkedCategory: 'ads' },
          { title: 'More information', description: 'See our <a href="/privacy/">privacy policy</a>.' }
        ]
      }
    } } }
  });
}
