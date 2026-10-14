#!/usr/bin/env node
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const required = new Set(['name', 'title', 'time', 'track', 'out']);
const args = Object.create(null);
for (let index = 2; index < process.argv.length; index += 2) {
  const flag = process.argv[index];
  const value = process.argv[index + 1];
  if (!flag?.startsWith('--') || !value) throw new Error(`Expected --name value pairs; received ${flag ?? ''}`);
  args[flag.slice(2)] = value;
}
for (const key of required) if (!args[key]) throw new Error(`Missing --${key}`);
if (!['AI Track', 'Flutter Track'].includes(args.track)) throw new Error('--track must be "AI Track" or "Flutter Track"');
const language = args.language ?? (/[\uac00-\ud7a3]/.test(`${args.name} ${args.title}`) ? 'ko' : 'en');
if (!['en', 'ko'].includes(language)) throw new Error('--language must be "en" or "ko"');
const room = args.track === 'AI Track'
  ? (language === 'ko' ? '401호' : 'Room 401')
  : (language === 'ko' ? '300 ~ 400호' : 'Room 300 ~ 400');

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const wrapTitle = (title) => {
  const words = title.trim().split(/\s+/);
  const lines = [];
  const widthOf = (value) => [...value].reduce((width, char) => width + (/\s/.test(char) ? 0.25 : /[\uac00-\ud7a3]/.test(char) ? 1 : 0.55), 0);
  // Keep the same title column width for Korean and English cards.
  const maxWidth = 13;
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (widthOf(candidate) > maxWidth && line) { lines.push(line); line = word; } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
};

const template = await readFile(new URL('../assets/card-template.html', import.meta.url), 'utf8');
const photoMime = args.photo && { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[extname(args.photo).toLowerCase()];
if (args.photo && !photoMime) throw new Error('Photo must be a JPG, PNG, or WebP file');
const photo = args.photo && await readFile(args.photo);
const speakerUnits = [...args.name].reduce((width, char) => width + (/\s/.test(char) ? 0.25 : /[\uac00-\ud7a3]/.test(char) ? 1 : 0.55), 0);
const speakerFontSize = Math.min(47, Math.floor(520 / speakerUnits));
const portrait = photo
  ? `<img class="portrait" src="data:${photoMime};base64,${photo.toString('base64')}" alt="${escapeHtml(args.name)}">`
  : '';
const replacements = {
  '{{FRAME_IMAGE}}': './card.svg',
  '{{CHIP_IMAGE}}': './flutter-chip.svg',
  '{{TRACK_CLASS}}': args.track === 'AI Track' ? 'ai' : 'flutter',
  '{{TITLE_LINES}}': wrapTitle(args.title).map((line) => `<div class="title-line">${escapeHtml(line)}</div>`).join(''),
  '{{SPEAKER_NAME}}': escapeHtml(args.name),
  '{{SPEAKER_FONT_SIZE}}': String(speakerFontSize),
  '{{TIME}}': escapeHtml(args.time),
  '{{ROOM}}': escapeHtml(room),
  '{{PORTRAIT_CONTENT}}': portrait,
};
let html = template;
for (const [token, value] of Object.entries(replacements)) html = html.replaceAll(token, value);
const outputPath = resolve(args.out);
await mkdir(dirname(outputPath), { recursive: true });
await copyFile(new URL('../assets/card.svg', import.meta.url), resolve(dirname(outputPath), 'card.svg'));
await copyFile(new URL('../assets/flutter-chip.svg', import.meta.url), resolve(dirname(outputPath), 'flutter-chip.svg'));
await writeFile(outputPath, html);
if (args['png-out']) {
  const browserCache = join(homedir(), 'Library/Caches/ms-playwright');
  const browsers = await readdir(browserCache);
  const shellDir = browsers.filter((name) => name.startsWith('chromium_headless_shell-')).sort().at(-1);
  if (!shellDir) throw new Error('Playwright Chrome headless shell is not installed');
  const chrome = join(browserCache, shellDir, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
  const browser = await chromium.launch({ headless: true, executablePath: chrome, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1024, height: 1372 }, deviceScaleFactor: 1 });
    await page.goto(`file://${outputPath}`, { waitUntil: 'load' });
    await page.screenshot({ path: resolve(args['png-out']) });
  } finally {
    await browser.close();
  }
}
