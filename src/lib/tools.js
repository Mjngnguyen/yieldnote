/*
 * Calculators — traffic magnets. Each tool declares its inputs and a pure
 * compute() that returns result rows and an optional yearly series to chart.
 */
export const money = (n) => (isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '—');
const num = (n, d = 1) => (isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: d }) : '—');

function growth(start, monthly, ratePct, years) {
  const r = ratePct / 100 / 12;
  let bal = start; const series = [];
  for (let m = 1; m <= years * 12; m++) {
    bal = bal * (1 + r) + monthly;
    if (m % 12 === 0) series.push(bal);
  }
  return { bal, series };
}

export const TOOLS = [
  { id: 'compound', name: 'Compound interest', offer: 'broker',
    desc: 'See how a starting amount and monthly contributions grow.',
    fields: [
      { id: 'start', label: 'Starting amount ($)', value: 5000, step: 100 },
      { id: 'monthly', label: 'Monthly contribution ($)', value: 300, step: 10 },
      { id: 'rate', label: 'Annual return (%)', value: 7, step: 0.1 },
      { id: 'years', label: 'Years', value: 25, step: 1 }],
    compute(v) {
      const { bal, series } = growth(v.start, v.monthly, v.rate, Math.min(60, Math.max(1, Math.round(v.years))));
      const paid = v.start + v.monthly * 12 * Math.round(v.years);
      return { headline: money(bal), rows: [['Total contributed', money(paid)], ['Growth from returns', money(bal - paid)]], series, seriesLabel: 'Balance by year' };
    } },
  { id: 'loan', name: 'Loan & mortgage payment', offer: 'personalLoan',
    desc: 'Monthly payment, total interest and total repaid.',
    fields: [
      { id: 'amount', label: 'Loan amount ($)', value: 250000, step: 1000 },
      { id: 'apr', label: 'APR (%)', value: 6.5, step: 0.05 },
      { id: 'years', label: 'Term (years)', value: 30, step: 1 }],
    compute(v) {
      const n = Math.max(1, Math.round(v.years * 12)), r = v.apr / 100 / 12;
      const pay = r === 0 ? v.amount / n : v.amount * r / (1 - Math.pow(1 + r, -n));
      return { headline: money(pay) + '/mo', rows: [['Total repaid', money(pay * n)], ['Total interest', money(pay * n - v.amount)]] };
    } },
  { id: 'goal', name: 'Savings goal', offer: 'savings',
    desc: 'How long until you reach a target, such as an emergency fund.',
    fields: [
      { id: 'target', label: 'Target ($)', value: 15000, step: 500 },
      { id: 'have', label: 'Saved so far ($)', value: 2000, step: 100 },
      { id: 'monthly', label: 'Monthly saving ($)', value: 500, step: 10 },
      { id: 'rate', label: 'Interest (% a year)', value: 4, step: 0.1 }],
    compute(v) {
      const r = v.rate / 100 / 12; let bal = v.have, m = 0;
      while (bal < v.target && m < 1200) { bal = bal * (1 + r) + v.monthly; m++; }
      const done = bal >= v.target;
      return { headline: done ? m + ' months' : 'Over 100 years', rows: [['That is about', done ? num(m / 12) + ' years' : '—'], ['Interest earned on the way', done ? money(bal - v.have - v.monthly * m) : '—']] };
    } },
  { id: 'crypto', name: 'Crypto DCA', offer: 'exchange',
    desc: 'Value of a fixed weekly buy at an average price versus today’s price.',
    fields: [
      { id: 'weekly', label: 'Weekly buy ($)', value: 50, step: 5 },
      { id: 'weeks', label: 'Number of weeks', value: 104, step: 1 },
      { id: 'avg', label: 'Average buy price ($)', value: 40000, step: 100 },
      { id: 'now', label: 'Current price ($)', value: 60000, step: 100 },
      { id: 'fee', label: 'Fee per buy (%)', value: 0.5, step: 0.1 }],
    compute(v) {
      const spent = v.weekly * v.weeks, units = spent * (1 - v.fee / 100) / v.avg, value = units * v.now;
      return { headline: money(value), rows: [['Total invested', money(spent)], ['Units held', num(units, 6)], ['Profit / loss', money(value - spent) + ' (' + num((value / spent - 1) * 100) + '%)']] };
    } },
  { id: 'freelance', name: 'Freelance rate', offer: 'emailTool',
    desc: 'The hourly rate you need for a target take-home income.',
    fields: [
      { id: 'income', label: 'Target take-home per year ($)', value: 60000, step: 1000 },
      { id: 'costs', label: 'Business costs per year ($)', value: 6000, step: 500 },
      { id: 'tax', label: 'Tax rate (%)', value: 25, step: 1 },
      { id: 'weeks', label: 'Working weeks per year', value: 46, step: 1 },
      { id: 'hours', label: 'Billable hours per week', value: 25, step: 1 }],
    compute(v) {
      const gross = v.income / (1 - v.tax / 100) + v.costs, hrs = v.weeks * v.hours;
      return { headline: money(gross / hrs) + '/hr', rows: [['Revenue needed', money(gross)], ['Billable hours per year', num(hrs, 0)], ['Day rate (8 h)', money(gross / hrs * 8)]] };
    } },
  { id: 'fire', name: 'Financial independence', offer: 'robo',
    desc: 'Your FI number and years to reach it, using a withdrawal rate.',
    fields: [
      { id: 'spend', label: 'Yearly spending ($)', value: 40000, step: 1000 },
      { id: 'have', label: 'Invested now ($)', value: 50000, step: 1000 },
      { id: 'monthly', label: 'Monthly investing ($)', value: 1500, step: 50 },
      { id: 'rate', label: 'Real annual return (%)', value: 5, step: 0.1 },
      { id: 'swr', label: 'Withdrawal rate (%)', value: 4, step: 0.1 }],
    compute(v) {
      const target = v.spend / (v.swr / 100), r = v.rate / 100 / 12; let bal = v.have, m = 0; const series = [];
      while (bal < target && m < 720) { bal = bal * (1 + r) + v.monthly; m++; if (m % 12 === 0) series.push(bal); }
      return { headline: money(target), rows: [['Years to reach it', bal >= target ? num(m / 12) : 'Over 60'], ['Monthly income at that point', money(target * v.swr / 100 / 12)]], series, seriesLabel: 'Portfolio by year' };
    } }
];

// Inline SVG bar chart drawn to one linear scale from 0 to the max value.
export function barChart(series, label) {
  if (!series || !series.length) return '';
  const W = 560, H = 160, padL = 56, padB = 22, max = Math.max(...series) || 1;
  const bw = (W - padL - 8) / series.length;
  const ticks = [0, 0.5, 1].map((t) => {
    const y = H - padB - t * (H - padB - 10);
    return `<line x1="${padL}" x2="${W}" y1="${y}" y2="${y}" class="grid"/><text x="${padL - 6}" y="${y + 4}" text-anchor="end" class="axis">${money(max * t)}</text>`;
  }).join('');
  const bars = series.map((v, i) => {
    const h = v / max * (H - padB - 10), last = i === series.length - 1;
    return `<rect x="${padL + i * bw + 1}" y="${H - padB - h}" width="${Math.max(1, bw - 2)}" height="${h}" class="${last ? 'bar end' : 'bar'}"/>`;
  }).join('');
  return `<figure class="chart"><figcaption>${label}</figcaption><div class="chart-scroll"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${ticks}${bars}<text x="${padL}" y="${H - 4}" class="axis">Year 1</text><text x="${W}" y="${H - 4}" text-anchor="end" class="axis">Year ${series.length}</text></svg></div></figure>`;
}

export const toolBy = (id) => TOOLS.find((t) => t.id === id);

// Result markup shared by the server render and the client update.
export function resultHTML(t, v, compact) {
  const r = t.compute(v);
  return `<div class="big">${r.headline}</div><div class="rows">${r.rows.map(([k, val]) => `<div><span>${k}</span><b>${val}</b></div>`).join('')}</div>${!compact && r.series ? barChart(r.series, r.seriesLabel) : ''}`;
}
