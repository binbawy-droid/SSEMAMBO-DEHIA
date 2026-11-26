import { writeFile } from 'node:fs/promises';

const FEED = 'https://weworkremotely.com/remote-jobs.rss';
const OUT = new URL('../data/remote-jobs.json', import.meta.url);

function decode(value='') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, ' ').trim();
}
function tag(xml, name) {
  const match = xml.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + name + '>', 'i'));
  return match ? decode(match[1]) : '';
}
const response = await fetch(FEED, { headers: { 'user-agent': 'BINBAWY-TECH-UG-Remote-Jobs/1.0' } });
if (!response.ok) throw new Error('We Work Remotely RSS returned HTTP ' + response.status);
const xml = await response.text();
const items = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
  const title = tag(item, 'title');
  const rawUrl = tag(item, 'link');
  const url = new URL(rawUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'weworkremotely.com') return null;
  const rawDate = tag(item, 'pubDate');
  const date = rawDate && !Number.isNaN(Date.parse(rawDate)) ? new Date(rawDate).toISOString() : null;
  const description = tag(item, 'description');
  const company = title.includes(':') ? title.split(':', 1)[0].trim() : 'We Work Remotely';
  return { title, company, url: url.href, published: date, summary: description.slice(0, 260), source: 'We Work Remotely' };
}).filter(x => x && x.title && x.url);
const unique = [...new Map(items.map(x => [x.url, x])).values()].slice(0, 40);
await writeFile(OUT, JSON.stringify(unique, null, 2) + '\n', 'utf8');
console.log('Saved ' + unique.length + ' attributed remote listings.');
