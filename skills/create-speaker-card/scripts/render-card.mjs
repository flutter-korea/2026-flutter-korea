#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { extname, resolve } from 'node:path';

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

const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const wrapTitle = (title) => {
  const words = title.trim().split(/\s+/);
  const lines = [];
  const hasHangul = /[\uac00-\ud7a3]/.test(title);
  const widthOf = (value) => [...value].reduce((width, char) => width + (/\s/.test(char) ? 0.25 : /[\uac00-\ud7a3]/.test(char) ? 1 : 0.55), 0);
  const maxWidth = hasHangul ? 15 : 29;
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (widthOf(candidate) > maxWidth && line) { lines.push(line); line = word; } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
};
const mime = args.photo && { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[extname(args.photo).toLowerCase()];
if (args.photo && !mime) throw new Error('Photo must be a JPG, PNG, or WebP file');
let svg = await readFile(new URL('../assets/card-template.svg', import.meta.url), 'utf8');
const flutterLogo = await readFile(new URL('../assets/flutter-logo.png', import.meta.url));
const aiTrackIcon = await readFile(new URL('../assets/ai-track-icon.svg', import.meta.url));
const photo = args.photo && await readFile(args.photo);
const titleLines = wrapTitle(args.title).map((line, index) => `<text x="78" y="${372 + index * 74}" class="talk">${escapeXml(line)}</text>`).join('\n  ');
const portraitContent = photo
  ? `<image href="data:${mime};base64,${photo.toString('base64')}" x="690" y="879" width="292" height="292" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>`
  : `<circle cx="836" cy="1025" r="146" fill="#eff6ff"/><text x="836" y="1044" text-anchor="middle" class="chip">${args.track === 'AI Track' ? 'AI' : 'Flutter'}</text>`;
const activeChip = args.track === 'AI Track' ? 'ai-chip' : 'flutter-chip';
const replacement = {
  '{{TITLE_LINES}}': titleLines,
  '{{SPEAKER_NAME}}': escapeXml(args.name),
  '{{TIME}}': escapeXml(args.time),
  '{{PORTRAIT_CONTENT}}': portraitContent,
  '{{ACTIVE_CHIP}}': activeChip,
  '{{FLUTTER_LOGO}}': `data:image/png;base64,${flutterLogo.toString('base64')}`,
  '{{AI_TRACK_ICON}}': `data:image/svg+xml;base64,${aiTrackIcon.toString('base64')}`,
};
for (const [token, value] of Object.entries(replacement)) svg = svg.replaceAll(token, value);
const outputPath = resolve(args.out);
await writeFile(outputPath, svg);
if (args['png-out']) {
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const pngOutputPath = resolve(args['png-out']);
  await promisify(execFile)(chrome, [
    '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1080,1350', `--screenshot=${pngOutputPath}`,
    `file://${outputPath}`,
  ]);
}
