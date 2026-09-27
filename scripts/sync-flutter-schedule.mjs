import { mkdir, readdir, copyFile, writeFile } from 'node:fs/promises';
import { dict } from '../src/lib/content.js';

const assetName = (name) => {
  const normalized = name.normalize('NFC');
  const dot = normalized.lastIndexOf('.');
  return normalized.slice(0, dot) + normalized.slice(dot).toLowerCase();
};

const schedule = Object.fromEntries(['ko', 'en'].map((lang) => [lang, {
  title: dict[lang].timetable.title,
  lead: dict[lang].timetable.lead,
  trackAi: dict[lang].timetable.tracks.ai,
  trackFlutter: dict[lang].timetable.tracks.flutter,
  rows: dict[lang].timetable.tracks.rows.filter((row) =>
    !row.empty && row.start >= '11:00' && row.end <= '18:00'),
}]));
await writeFile(new URL('../flutter/lib/content/schedule.dart', import.meta.url),
  "// Generated from src/lib/content.js by scripts/sync-flutter-schedule.mjs.\nimport 'dart:convert';\n\nfinal Map<String, dynamic> schedule = jsonDecode(r'''" +
  JSON.stringify(schedule, (key, value) => key === 'image' ? 'assets/images/speaker/' + assetName(value.split('/').at(-1)) : value) + "''') as Map<String, dynamic>;\n");
const target = new URL('../flutter/assets/images/speaker/', import.meta.url);
await mkdir(target, { recursive: true });
const source = new URL('../static/assets/flutter-seoul/speaker/', import.meta.url);
for (const name of await readdir(source)) {
  if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
  await copyFile(new URL(name, source), new URL(assetName(name), target));
}
await copyFile(new URL('../static/assets/google-g.svg', import.meta.url),
  new URL('../flutter/assets/images/google-g.svg', import.meta.url));
