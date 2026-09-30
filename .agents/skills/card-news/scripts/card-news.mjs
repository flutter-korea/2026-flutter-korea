#!/usr/bin/env node
/**
 * Flutter Korea card news CLI — HTML-first SNS card generator with a human
 * approval gate before anything is rendered to an image.
 *
 *   scaffold <preset> [opts]   draft a spec.json from this repo's content (src/lib/content.js)
 *   templates                  list templates and their fields
 *   styles                     list design styles (spec.style / card.style)
 *   compare <deck> [--all]     build <deck>-styles: the deck's first styleable card in every style
 *   build <deck>               spec.json → cards/*.html + preview.html + structure.md
 *   check <deck>               headless QA: overflow, broken / low-res images, proof PNGs
 *   preview <deck>             open preview.html in the default browser
 *   approve <deck> --by NAME   record human approval of the built cards (hash-locked)
 *   render <deck> [--scale N]  approved cards → out/*.png (refuses without valid approval)
 *
 * <deck> is a slug under ./card-news/, a deck directory, or a spec.json path.
 * Runs on Node ≥ 18 or Bun. Only `check` / `render` need playwright-core + a Chromium.
 */
import { createHash } from 'node:crypto';
import { existsSync, statSync } from 'node:fs';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { IMAGE_KEYS, esc, renderCard, templates } from './templates.mjs';
import { styles } from './styles.mjs';

const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = findRepoRoot(SKILL_DIR);
const WORK = join(REPO, 'card-news');

const SIZES = {
	portrait: { w: 1080, h: 1350, note: '4:5 — Instagram/LinkedIn feed (default)' },
	square: { w: 1080, h: 1080, note: '1:1 — feed, X, Facebook' },
	story: { w: 1080, h: 1920, note: '9:16 — Stories/Reels (safe areas padded)' }
};
/**
 * Stand-ins for a missing speaker photo — official brand art only (assets/brand/,
 * provenance in SOURCES.md). Illustrations and logos use `contain` so nothing of
 * the artwork is cropped; the plush photo is a real photo and fills with `cover`.
 */
export const FALLBACKS = {
	dash: { file: 'dash.png', fit: 'contain', inset: '12%', plate: 'paper', attribution: 'Dash artwork © the Flutter project authors, CC BY 3.0 (github.com/flutter/website)', note: '공식 3D Dash (flutter.dev/brand)' },
	'dash-cheer': { file: 'dash-cheer.png', fit: 'contain', inset: '8%', plate: 'white', attribution: 'Dash artwork © the Flutter project authors, CC BY 3.0 (github.com/flutter/website)', note: '응원하는 Dash 3마리 일러스트' },
	'dash-team': { file: 'dash-team.png', fit: 'contain', inset: '8%', plate: 'paper', attribution: 'Dash artwork © the Flutter project authors, CC BY 3.0 (github.com/flutter/website)', note: '모자·안경·노트북 Dash 3마리 (Dashatars)' },
	'dash-plush': { file: 'dash-plush.png', fit: 'cover', focus: '45% 45%', attribution: 'Dash artwork © the Flutter project authors, CC BY 3.0 (github.com/flutter/website)', note: '큰 Dash·작은 Dash 인형 사진' },
	flutter: {
		file: 'flutter-logomark.svg', fit: 'contain', inset: '26%', plate: 'white', note: 'Flutter 로고마크 (변형 금지)',
		trademark: 'Flutter and the related logo are trademarks of Google LLC. Flutter Korea 2026 is not affiliated with or otherwise sponsored by Google LLC.'
	},
	dart: {
		file: 'dart-logomark.svg', fit: 'contain', inset: '26%', plate: 'white', note: 'Dart 로고마크 (변형 금지)',
		trademark: 'Dart and the related logo are trademarks of Google LLC. We are not endorsed by or affiliated with Google LLC.'
	}
};
const AUTO_FALLBACK = ['dash', 'dash-cheer', 'dash-team', 'dash-plush'];

const FONT_CSS =
	'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css';

function findRepoRoot(from) {
	let dir = from;
	while (dir !== dirname(dir)) {
		if (existsSync(join(dir, 'package.json')) && existsSync(join(dir, 'src/lib/content.js'))) return dir;
		dir = dirname(dir);
	}
	return process.cwd();
}

/* ------------------------------------------------------------------------ */
/* CLI plumbing                                                             */
/* ------------------------------------------------------------------------ */

function parseArgs(argv) {
	const pos = [];
	const opt = {};
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a.startsWith('--')) {
			const [k, v] = a.slice(2).split('=');
			if (v !== undefined) opt[k] = v;
			else if (argv[i + 1] && !argv[i + 1].startsWith('--')) opt[k] = argv[++i];
			else opt[k] = true;
		} else pos.push(a);
	}
	return { pos, opt };
}

const log = (...a) => console.log(...a);
function fail(msg) {
	console.error(`✖ ${msg}`);
	process.exit(1);
}
const rel = (p) => relative(process.cwd(), p) || '.';

function deckPaths(arg) {
	if (!arg) fail('deck 인자가 필요합니다 (card-news/<slug>, 디렉터리, 또는 spec.json 경로).');
	let dir;
	if (arg.endsWith('.json') && existsSync(arg)) dir = dirname(resolve(arg));
	else if (existsSync(join(resolve(arg), 'spec.json'))) dir = resolve(arg);
	else if (existsSync(join(WORK, arg, 'spec.json'))) dir = join(WORK, arg);
	else fail(`spec.json을 찾을 수 없습니다: ${arg}`);
	const spec = arg.endsWith('.json') && existsSync(arg) ? resolve(arg) : join(dir, 'spec.json');
	return {
		dir,
		spec,
		cards: join(dir, 'cards'),
		assets: join(dir, 'assets'),
		preview: join(dir, 'preview.html'),
		structure: join(dir, 'structure.md'),
		build: join(dir, '.build.json'),
		approval: join(dir, 'approval.json'),
		out: join(dir, 'out'),
		proof: join(dir, 'proof')
	};
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

async function listFiles(dir) {
	if (!existsSync(dir)) return [];
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await listFiles(p)));
		else out.push(p);
	}
	return out.sort();
}

/** Hash of exactly what the human reviewed: built card HTML + copied assets. */
async function builtHash(P) {
	const h = createHash('sha256');
	for (const f of [...(await listFiles(P.cards)), ...(await listFiles(P.assets))]) {
		h.update(relative(P.dir, f));
		h.update(await readFile(f));
	}
	return h.digest('hex');
}

/* ------------------------------------------------------------------------ */
/* scaffold — draft specs from the repo's content                           */
/* ------------------------------------------------------------------------ */

async function loadContent() {
	const mod = await import(pathToFileURL(join(REPO, 'src/lib/content.js')).href);
	return mod;
}

/** Talks from the timetable, flattened to one record per speaker session. */
function talks(t) {
	const out = [];
	for (const row of t.timetable.tracks.rows) {
		for (const track of ['ai', 'flutter']) {
			const s = row[track];
			if (!s?.speaker || /오거나이저|organizer/i.test(s.speaker)) continue;
			out.push({
				track: t.timetable.tracks[track],
				time: `${row.start} – ${row.end}`,
				room: s.room,
				title: s.title,
				speaker: s.speaker,
				image: s.image
			});
		}
	}
	return out;
}

/** Stable ASCII id for a talk: the speaker photo's file name when present. */
const idOf = (tk) => (tk.image ? basename(tk.image, extname(tk.image)) : tk.speaker);

const TODO = (what) => `TODO: ${what}`;

/**
 * A type-correct placeholder from a field's doc string, so `scaffold blank`
 * builds: "[string] …" → ["TODO"], "[{ a, b }] …" → [{ a, b }], "{ a, b } …" → { a, b }.
 */
function skeleton(key, doc) {
	const keys = (list) => Object.fromEntries(list.split(',').map((x) => x.trim().replace(/\*$/, '')).filter(Boolean).map((x) => [x, TODO(x)]));
	let m;
	if ((m = doc.match(/^\[\{\s*([^}]*)\}\]/))) return [keys(m[1])];
	if (/^\[string\]/.test(doc)) return [TODO(doc.replace(/^\[string\]\s*/, ''))];
	if ((m = doc.match(/^\{\s*([^}]*)\}/))) return keys(m[1]);
	if (/^"light"|여부|true|false/.test(doc)) return undefined; // enum / boolean switches keep their defaults
	return TODO(doc);
}

function speakerCards(tk, lang) {
	const ko = lang === 'ko';
	return [
		{
			template: 'speaker',
			data: {
				photo: tk.image ? { src: tk.image, focus: '50% 35%' } : { src: TODO(ko ? '프로필 이미지 경로' : 'profile image path'), fallback: 'dash' },
				name: tk.speaker,
				role: TODO(ko ? '소속 · 직함' : 'affiliation · title'),
				bio: TODO(ko ? '연사 소개 2~3문장' : '2–3 sentence bio'),
				session: { title: tk.title, track: tk.track, time: tk.time, room: tk.room }
			}
		}
	];
}

function sessionCard(tk, lang) {
	const ko = lang === 'ko';
	return {
		template: 'session',
		data: {
			track: tk.track,
			time: tk.time,
			room: tk.room,
			title: tk.title,
			summary: TODO(ko ? '발표 요약 2~3문장' : '2–3 sentence abstract'),
			points: [TODO(ko ? '핵심 포인트' : 'key point')],
			speaker: {
				name: tk.speaker,
				role: TODO(ko ? '소속' : 'affiliation'),
				photo: tk.image ? tk.image : { src: TODO(ko ? '프로필 이미지 경로' : 'profile image path'), fallback: 'dash' }
			}
		}
	};
}

async function cmdScaffold(pos, opt) {
	const preset = pos[0];
	const lang = opt.lang === 'en' ? 'en' : 'ko';
	const size = opt.size ?? 'portrait';
	const { dict, links } = await loadContent();
	const t = dict[lang];
	const ko = lang === 'ko';
	const all = talks(t);
	const pick = () => {
		if (!opt.name) {
			log(`--name 이 필요합니다. 사용 가능한 연사:\n${all.map((x) => `  - ${x.speaker}  (${x.track} ${x.time}) ${x.title}`).join('\n')}`);
			process.exit(1);
		}
		const hits = all.filter((x) => x.speaker.includes(opt.name));
		if (!hits.length) fail(`"${opt.name}" 연사를 타임테이블에서 찾을 수 없습니다. --name 없이 실행하면 목록이 나옵니다.`);
		return hits;
	};
	const cover = (series, title = `${t.hero.sloganTop}\n**${t.hero.sloganBottom}**`) => ({
		template: 'cover',
		data: { badge: t.hero.badge, title, subtitle: t.hero.subtitle, series }
	});
	const ticketCta = {
		template: 'cta',
		data: {
			tone: 'brand',
			kicker: 'Tickets',
			title: t.tickets.title + (ko ? ' 예매 오픈' : ' on sale'),
			lead: t.tickets.lead,
			info: t.hero.facts.map((f) => ({ label: f.label, value: f.value })),
			button: t.tickets.cta,
			url: links.ticket
		}
	};

	let slug;
	let cards;
	let title;
	switch (preset) {
		case 'event':
			slug = `event-${lang}`;
			title = ko ? '행사 소개' : 'Event overview';
			cards = [
				cover('Flutter Korea 2026'),
				{
					template: 'event',
					data: {
						kicker: t.overview.kicker,
						title: t.about.title,
						lead: t.hero.description,
						facts: t.hero.facts.map((f) => ({ label: f.label, value: f.value }))
					}
				},
				ticketCta
			];
			break;
		case 'speaker': {
			const hits = opt.all ? all : pick();
			slug = opt.all ? `speakers-${lang}` : `speaker-${idOf(hits[0])}-${lang}`;
			title = opt.all ? (ko ? '연사 라인업' : 'Speaker lineup') : `${ko ? '연사 소개' : 'Speaker'} — ${hits[0].speaker}`;
			cards = [
				...(opt.all ? [cover('Speaker Lineup', ko ? '**연사**를\n소개합니다' : 'Meet the\n**speakers**')] : []),
				...hits.flatMap((x) => speakerCards(x, lang))
			];
			break;
		}
		case 'session': {
			const hits = pick();
			slug = `session-${idOf(hits[0])}-${lang}`;
			title = `${ko ? '발표 소개' : 'Session'} — ${hits[0].title}`;
			cards = hits.map((x) => sessionCard(x, lang));
			break;
		}
		case 'timetable': {
			slug = `timetable-${lang}`;
			title = t.timetable.title;
			const rowsFor = (track) =>
				t.timetable.tracks.rows
					.filter((r) => !r.empty && r.kind !== 'break' && r.start >= '11:00')
					.map((r) =>
						r.shared
							? { time: r.start, title: r.shared, speaker: r.speaker || undefined }
							: r[track]
								? { time: r.start, title: r[track].title, speaker: r[track].speaker, highlight: !!r.highlight }
								: null
					)
					.filter(Boolean);
			// ≤ 6 rows per card keeps long session titles legible at 1080px
			const per = Number(opt.rows) || 6;
			cards = ['ai', 'flutter'].flatMap((track) => {
				const rows = rowsFor(track);
				const pages = Math.ceil(rows.length / per);
				return Array.from({ length: pages }, (_, i) => ({
					template: 'timetable',
					data: {
						kicker: t.timetable.kicker,
						title: t.timetable.tracks[track] + (pages > 1 ? ` (${i + 1}/${pages})` : ''),
						rows: rows.slice(i * per, (i + 1) * per)
					}
				}));
			});
			break;
		}
		case 'sponsors':
			slug = `sponsors-${lang}`;
			title = t.sponsors.title;
			cards = [
				{
					template: 'sponsor',
					data: {
						kicker: t.sponsors.kicker,
						title: t.sponsors.title,
						items: t.sponsors.items.map((s) => ({ name: s.name, logo: s.logo, description: s.description }))
					}
				},
				{
					template: 'cta',
					data: { kicker: 'Sponsorship', title: t.sponsors.ctaTitle, lead: t.sponsors.ctaBody, button: t.sponsors.cta, url: links.email.replace('mailto:', '') }
				}
			];
			break;
		case 'goods':
			slug = `goods-${lang}`;
			title = ko ? '굿즈 소개' : 'Goods';
			cards = [
				{
					template: 'goods',
					data: {
						title: TODO(ko ? '굿즈 타이틀' : 'goods title'),
						items: [{ name: TODO(ko ? '상품명' : 'item name'), image: TODO(ko ? '상품 이미지 경로' : 'image path'), price: '' }]
					}
				}
			];
			break;
		case 'blank': {
			const tpl = opt.template;
			if (!templates[tpl]) fail(`--template 은 다음 중 하나: ${Object.keys(templates).join(', ')}`);
			slug = `${tpl}-${Date.now().toString(36)}`;
			title = tpl;
			cards = [{ template: tpl, data: Object.fromEntries(Object.entries(templates[tpl].fields).map(([k, doc]) => [k, skeleton(k, doc)])) }];
			break;
		}
		default:
			fail('preset: event | speaker [--name N | --all] | session --name N | timetable | sponsors | goods | blank --template T  (공통: --lang --size --style --slug --force)');
	}
	slug = (opt.slug ?? slug).replace(/[\s/\\]+/g, '-');
	const dir = join(WORK, slug);
	const specPath = join(dir, 'spec.json');
	if (existsSync(specPath) && !opt.force) fail(`${rel(specPath)} 이미 존재합니다 (--force 로 덮어쓰기).`);
	if (opt.style && opt.style !== true && opt.style !== 'default' && !styles[opt.style])
		fail(`--style 은 default 또는 다음 중 하나: ${Object.keys(styles).join(', ')} (node card-news.mjs styles)`);
	const style = opt.style && opt.style !== true && opt.style !== 'default' ? opt.style : undefined;
	const spec = { title, lang, size, ...(style ? { style } : {}), cards };
	await mkdir(dir, { recursive: true });
	await writeFile(specPath, JSON.stringify(spec, null, '\t') + '\n');
	log(`✔ ${rel(specPath)} (${cards.length} cards, style: ${style ?? 'default'})`);
	if (!style) log(`  디자인 스타일: 기본(default). 바꾸려면 spec.json 에 "style" 을 넣거나 --style 로 다시 scaffold 하세요. 비교: compare ${slug}`);
	const todos = JSON.stringify(spec).match(/TODO:[^"]*/g) ?? [];
	if (todos.length) log(`  채워야 할 항목 ${todos.length}개:\n${[...new Set(todos)].map((x) => `   - ${x}`).join('\n')}`);
}

/* ------------------------------------------------------------------------ */
/* build                                                                    */
/* ------------------------------------------------------------------------ */

function resolveImageFile(src, specDir) {
	if (/^(https?:|data:)/.test(src)) return { remote: src };
	const cands = [];
	if (isAbsolute(src)) cands.push(src, join(REPO, 'static', src));
	else cands.push(join(specDir, src), join(REPO, src), join(REPO, 'static', src), resolve(src));
	const hit = cands.find((p) => existsSync(p) && statSync(p).isFile());
	return hit ? { file: hit } : { missing: src };
}

/** Walk card data; normalize & copy every image-valued field. */
async function normalizeImages(value, ctx, path = '') {
	if (Array.isArray(value)) {
		return Promise.all(value.map((v, i) => normalizeImages(v, ctx, `${path}[${i}]`)));
	}
	if (!value || typeof value !== 'object') return value;
	const out = {};
	for (const [k, v] of Object.entries(value)) {
		const p = path ? `${path}.${k}` : k;
		if (IMAGE_KEYS.has(k) && v) {
			const img = typeof v === 'string' ? { src: v } : { ...v };
			if (!img.src || /^TODO:/.test(img.src)) {
				let fb = k === 'photo' ? (img.fallback ?? ctx.photoFallback) : undefined;
				if (fb === 'auto') fb = AUTO_FALLBACK[ctx.autoIndex.n++ % AUTO_FALLBACK.length];
				if (fb && FALLBACKS[fb]) {
					const f = FALLBACKS[fb];
					ctx.warnings.push(`#${ctx.page} ${p}: 사진이 없어 "${fb}"(${f.note})로 대체했습니다. 실제 사진이 생기면 src 를 채우세요`);
					if (f.trademark) ctx.trademarks.add(`상표 고지: "${f.trademark}"`);
					if (f.attribution) ctx.trademarks.add(`출처 표기(CC BY 3.0): "${f.attribution}"`);
					const { file, note, trademark, attribution, ...look } = f;
					out[k] = { ...look, alt: '', ...img, src: `assets/brand/${file}`, brandFallback: fb };
				} else {
					if (fb) ctx.errors.push(`#${ctx.page} ${p}: 알 수 없는 fallback "${fb}" (가능: ${Object.keys(FALLBACKS).join(', ')}, auto)`);
					ctx.warnings.push(
						`#${ctx.page} ${p}: 이미지 미지정 (검토용 placeholder로 표시됨)${k === 'photo' ? ` — 사진이 없으면 photo.fallback 또는 spec.photoFallback 으로 ${Object.keys(FALLBACKS).join('/')}/auto 중 하나를 지정하세요` : ''}`
					);
					out[k] = { ...img, src: undefined };
				}
				continue;
			}
			const r = resolveImageFile(img.src, ctx.specDir);
			if (r.missing) {
				ctx.errors.push(`#${ctx.page} ${p}: 이미지 파일을 찾을 수 없음 → ${img.src}`);
				out[k] = { ...img, src: undefined };
			} else if (r.remote) {
				ctx.warnings.push(`${p}: 원격 이미지 (${img.src}) — 가능하면 로컬 파일로 받아 두세요`);
				out[k] = img;
			} else {
				const buf = await readFile(r.file);
				const name = `${sha(buf).slice(0, 8)}-${basename(r.file).normalize('NFC').replace(/\s+/g, '-')}`;
				await copyFile(r.file, join(ctx.assets, 'img', name));
				ctx.images.push({ path: p, from: relative(REPO, r.file), ...img, src: undefined });
				out[k] = { ...img, src: `assets/img/${name}` };
			}
		} else out[k] = await normalizeImages(v, ctx, p);
	}
	return out;
}

const clip = (s, n = 90) => {
	const t = String(s).replace(/\s+/g, ' ');
	return t.length > n ? `${t.slice(0, n)}…` : t;
};

/** Flatten card data to [path, value] rows for the structure outline. */
function flatten(v, p = '') {
	if (Array.isArray(v)) return v.flatMap((x, i) => flatten(x, `${p}[${i}]`));
	if (v && typeof v === 'object') {
		if ('src' in v && Object.keys(v).every((k) => ['src', 'fit', 'focus', 'zoom', 'mask', 'plate', 'inset', 'alt', 'fallback', 'brandFallback'].includes(k)))
			return [[p, `🖼 ${v.brandFallback ? `대체 이미지: ${v.brandFallback}` : (v.src ?? '(비어 있음)')}${['fit', 'mask', 'focus', 'zoom'].filter((k) => v[k]).map((k) => ` · ${k}=${v[k]}`).join('')}`]];
		return Object.entries(v).flatMap(([k, x]) => flatten(x, p ? `${p}.${k}` : k));
	}
	return [[p, v]];
}

function cardDoc(inner, { w, h, title }) {
	return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${w}">
<base href="../">
<title>${esc(title)}</title>
<link rel="stylesheet" href="${FONT_CSS}">
<link rel="stylesheet" href="assets/theme.css">
<link rel="stylesheet" href="assets/styles.css">
<style>html,body{width:${w}px;height:${h}px;overflow:hidden}</style>
<script>if(/[?&]mode=wire/.test(location.search))document.documentElement.classList.add('wire')</script>
</head>
<body>
${inner}
</body>
</html>
`;
}

function previewDoc(spec, built, size, { warnings, errors }) {
	const { w, h } = SIZES[size];
	const blocks = built
		.map(
			(b) => `
<section class="pv-card" id="card-${b.page}">
	<div class="pv-stage" style="--w:${w}px;--h:${h}px">${b.html}</div>
	<div class="pv-meta">
		<h2>${b.page} / ${built.length} · <code>${b.template}</code>${b.style ? ` · <code>style: ${b.style}</code>` : ''}</h2>
		<p class="pv-desc">${esc(b.style ? `${styles[b.style].label} — ${styles[b.style].description}` : templates[b.template].description)}</p>
		<p class="pv-file"><a href="cards/${b.file}">cards/${b.file}</a></p>
		<table>
			<thead><tr><th>필드</th><th>값</th><th>길이</th></tr></thead>
			<tbody>${b.rows
				.map(
					([k, v]) =>
						`<tr${/^TODO:/.test(v) ? ' class="todo"' : ''}><td><code>${esc(k)}</code></td><td>${esc(clip(v, 140))}</td><td>${String(v).length}</td></tr>`
				)
				.join('')}</tbody>
		</table>
	</div>
</section>`
		)
		.join('');
	return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(spec.title ?? 'Card news')} · 구조 검토</title>
<link rel="stylesheet" href="${FONT_CSS}">
<link rel="stylesheet" href="assets/theme.css">
<link rel="stylesheet" href="assets/styles.css">
<style>
	html, body { background: #f4f6fa; }
	body { font-family: var(--font-sans); }
	.pv-bar { position: sticky; top: 0; z-index: 50; display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; padding: 14px 24px; background: var(--white); border-bottom: 1px solid var(--border); }
	.pv-bar h1 { font-size: 18px; letter-spacing: -0.01em; margin-right: auto; }
	.pv-bar .seg { display: inline-flex; border: 1px solid var(--border-strong); border-radius: 999px; overflow: hidden; }
	.pv-bar button { border: 0; background: none; padding: 8px 16px; font: 600 14px var(--font-sans); cursor: pointer; color: var(--text-muted); }
	.pv-bar button[aria-pressed='true'] { background: var(--blue-700); color: var(--white); }
	.pv-bar label { font: 600 13px var(--font-mono); color: var(--text-muted); display: inline-flex; gap: 8px; align-items: center; }
	.pv-note { margin: 20px 24px 0; padding: 16px 20px; border-radius: 12px; background: var(--white); border: 1px solid var(--border); font-size: 14px; line-height: 1.6; color: var(--text-muted); }
	.pv-note strong { color: var(--ink); }
	.pv-note ul { list-style: disc; padding-left: 20px; margin-top: 6px; }
	.pv-note .err { color: #c62828; }
	.pv-list { display: flex; flex-direction: column; gap: 28px; padding: 24px; }
	.pv-card { display: flex; flex-wrap: wrap; gap: 28px; align-items: flex-start; background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
	.pv-stage { --s: 0.42; width: calc(var(--w) * var(--s)); height: calc(var(--h) * var(--s)); flex: none; border-radius: 10px; overflow: hidden; box-shadow: 0 0 0 1px var(--border), 0 12px 32px -18px rgba(11,18,32,.35); }
	.pv-stage > .card { transform: scale(var(--s)); transform-origin: 0 0; }
	.pv-meta { flex: 1; min-width: 300px; font-size: 14px; }
	.pv-meta h2 { font-size: 18px; letter-spacing: -0.01em; }
	.pv-desc { color: var(--text-muted); margin-top: 6px; }
	.pv-file { margin-top: 4px; font: 12px var(--font-mono); } .pv-file a { color: var(--accent); }
	.pv-meta table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px; }
	.pv-meta th, .pv-meta td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--border); vertical-align: top; word-break: break-word; }
	.pv-meta th { font: 700 11px var(--font-mono); letter-spacing: .08em; color: var(--text-dim); text-transform: uppercase; }
	.pv-meta td:last-child { font-family: var(--font-mono); color: var(--text-dim); width: 48px; }
	.pv-meta tr.todo td { background: #fff4e5; color: #8a4b00; }
	html.pv-hide-meta .pv-meta { display: none; }
</style>
</head>
<body>
<div class="pv-bar">
	<h1>${esc(spec.title ?? 'Card news')} <small style="font-weight:500;color:var(--text-dim)">· ${built.length}장 · ${size} ${w}×${h}</small></h1>
	<div class="seg" role="group" aria-label="보기 모드">
		<button type="button" data-mode="design">디자인</button>
		<button type="button" data-mode="wire">구조</button>
	</div>
	<label>크기 <input type="range" min="0.25" max="1" step="0.01" value="0.42" id="pv-scale"></label>
	<label><input type="checkbox" id="pv-meta" checked> 필드 표</label>
</div>
<div class="pv-note">
	<strong>구조 검토 방법</strong> — "구조" 모드에서 각 카드의 슬롯(점선 라벨)이 의도한 정보 구조와 맞는지, 오른쪽 표에서 값이 정확한지 확인하세요.
	확인이 끝나면 에이전트에게 <strong>승인(confirm)</strong>을 알려 주세요. 승인 후에만 PNG로 렌더링됩니다.
	${errors.length ? `<ul class="err">${errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
	${warnings.length ? `<ul>${warnings.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
</div>
<main class="pv-list">${blocks}</main>
<script>
	const root = document.documentElement;
	const setMode = (m) => {
		root.classList.toggle('wire', m === 'wire');
		document.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
	};
	document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
	setMode(new URLSearchParams(location.search).get('mode') === 'wire' ? 'wire' : 'design');
	const scale = document.getElementById('pv-scale');
	const q = new URLSearchParams(location.search).get('scale');
	if (q) scale.value = q;
	const apply = () => document.querySelectorAll('.pv-stage').forEach((s) => s.style.setProperty('--s', scale.value));
	scale.addEventListener('input', apply); apply();
	const meta = document.getElementById('pv-meta');
	if (new URLSearchParams(location.search).has('nometa')) meta.checked = false;
	const applyMeta = () => root.classList.toggle('pv-hide-meta', !meta.checked);
	meta.addEventListener('change', applyMeta); applyMeta();
</script>
</body>
</html>
`;
}

async function cmdBuild(pos) {
	const P = deckPaths(pos[0]);
	const specRaw = await readFile(P.spec, 'utf8');
	let spec;
	try {
		spec = JSON.parse(specRaw);
	} catch (e) {
		fail(`spec.json 파싱 실패: ${e.message}`);
	}
	const size = spec.size ?? 'portrait';
	if (!SIZES[size]) fail(`size 는 ${Object.keys(SIZES).join(' | ')} 중 하나여야 합니다.`);
	const lang = spec.lang === 'en' ? 'en' : 'ko';
	if (!Array.isArray(spec.cards) || !spec.cards.length) fail('cards 배열이 비어 있습니다.');

	await rm(P.cards, { recursive: true, force: true });
	await rm(P.assets, { recursive: true, force: true });
	await mkdir(P.cards, { recursive: true });
	await mkdir(join(P.assets, 'img'), { recursive: true });
	await copyFile(join(SKILL_DIR, 'assets/theme.css'), join(P.assets, 'theme.css'));
	// One stylesheet per style in assets/styles/, concatenated in registry order.
	const styleCss = ['_shared', ...Object.keys(styles)].map((n) => join(SKILL_DIR, 'assets/styles', `${n}.css`));
	await writeFile(join(P.assets, 'styles.css'), (await Promise.all(styleCss.map((f) => readFile(f, 'utf8')))).join('\n'));
	await mkdir(join(P.assets, 'brand'), { recursive: true });
	for (const f of await readdir(join(SKILL_DIR, 'assets/brand')))
		if (!f.endsWith('.md')) await copyFile(join(SKILL_DIR, 'assets/brand', f), join(P.assets, 'brand', f));
	const brandMark = (await readFile(join(SKILL_DIR, 'assets/brand/flutter-seoul-mark.svg'), 'utf8'))
		.replace(/<svg[^>]*?width="\d+" height="\d+"/, (m) => m.replace(/ width="\d+" height="\d+"/, ''))
		.replace('<svg', '<svg aria-hidden="true" focusable="false"');

	// Footer defaults to the exact date/time and venue from the site's timetable frame
	// (src/lib/content.js), so cards never drift from the published event facts.
	const frame = Object.fromEntries((await loadContent()).dict[lang].timetable.frame.map((f) => [f.label, f.value]));
	const defaultFooter = [`${frame.DATE} ${frame.PROGRAM}`, frame.VENUE];
	const event = { date: frame.DATE, time: frame.PROGRAM, venue: frame.VENUE, doors: frame.DOORS };

	const ctx = {
		specDir: dirname(P.spec),
		assets: P.assets,
		warnings: [],
		errors: [],
		images: [],
		photoFallback: spec.photoFallback,
		autoIndex: { n: 0 },
		trademarks: new Set()
	};
	const built = [];
	for (const [i, card] of spec.cards.entries()) {
		const page = i + 1;
		const tpl = templates[card.template];
		if (!tpl) {
			ctx.errors.push(`#${page}: 알 수 없는 template "${card.template}" (가능: ${Object.keys(templates).join(', ')})`);
			continue;
		}
		const data = card.data ?? {};
		const style = (card.style ?? spec.style) === 'default' ? undefined : (card.style ?? spec.style);
		if (style && style !== 'default' && !styles[style]) ctx.errors.push(`#${page}: 알 수 없는 style "${style}" (가능: default, ${Object.keys(styles).join(', ')})`);
		else if (style && styles[style] && !styles[style].cards[card.template])
			ctx.warnings.push(`#${page} ${card.template}: style "${style}" 는 이 템플릿을 지원하지 않아 기본 디자인으로 렌더됩니다`);
		for (const k of tpl.required) {
			const v = data[k];
			if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) ctx.errors.push(`#${page} ${card.template}: 필수 필드 "${k}" 누락`);
		}
		for (const [k, v] of flatten(data)) if (typeof v === 'string' && /^TODO:/.test(v)) ctx.warnings.push(`#${page} ${k}: ${v}`);
		ctx.page = page;
		const normalized = await normalizeImages(data, ctx);
		const html = renderCard(
			{ template: card.template, data: normalized },
			{
				lang,
				size,
				page,
				total: spec.cards.length,
				brand: spec.brand ?? 'Flutter Korea 2026',
				footer: spec.footer ?? defaultFooter,
				handle: spec.handle ?? '#FlutterKorea2026',
				brandMark,
				event,
				style
			}
		);
		const file = `${String(page).padStart(2, '0')}-${card.template}.html`;
		await writeFile(join(P.cards, file), cardDoc(html, { ...SIZES[size], title: `${page} · ${card.template}` }));
		built.push({ page, template: card.template, style, file, html, rows: flatten(normalized) });
	}

	// Notices never go on the card image itself — only into the post caption / event site.
	for (const notice of ctx.trademarks) ctx.warnings.push(`대체 이미지를 사용했습니다. 카드에는 넣지 말고 게시글 캡션(또는 행사 웹사이트)에 넣으세요 — ${notice}`);
	await writeFile(P.preview, previewDoc(spec, built, size, ctx));

	const md = [
		`# ${spec.title ?? 'Card news'} — 구조 검토`,
		'',
		`- 크기: ${size} (${SIZES[size].w}×${SIZES[size].h}) · 언어: ${lang} · 카드 ${built.length}장 · 스타일: ${spec.style && spec.style !== 'default' ? spec.style : 'default'}`,
		`- 미리보기: ${rel(P.preview)}`,
		'',
		...built.flatMap((b) => [
			`## ${b.page}. ${b.template}${b.style ? ` · style: ${b.style} (${styles[b.style].label})` : ''} — ${templates[b.template].description}`,
			'',
			...b.rows.map(([k, v]) => `- \`${k}\`: ${clip(v, 120)}`),
			''
		]),
		...(ctx.errors.length ? ['## 오류', '', ...ctx.errors.map((e) => `- ${e}`), ''] : []),
		...(ctx.warnings.length ? ['## 확인 필요', '', ...ctx.warnings.map((e) => `- ${e}`), ''] : [])
	].join('\n');
	await writeFile(P.structure, md);

	const hash = await builtHash(P);
	await writeFile(P.build, JSON.stringify({ specHash: sha(specRaw), builtHash: hash, builtAt: new Date().toISOString() }, null, 2));

	log(md);
	if (existsSync(P.approval)) {
		const a = JSON.parse(await readFile(P.approval, 'utf8'));
		if (a.builtHash !== hash) {
			await rm(P.approval);
			log(`\n⚠ 빌드 결과가 바뀌어 기존 승인(${a.approvedBy}, ${a.approvedAt})을 무효화했습니다. 다시 검토·승인이 필요합니다.`);
		}
	}
	log(`\n✔ build → ${rel(P.preview)}`);
	if (ctx.errors.length) fail(`오류 ${ctx.errors.length}건 — spec을 수정한 뒤 다시 build 하세요.`);
}

/* ------------------------------------------------------------------------ */
/* browser: check / render                                                  */
/* ------------------------------------------------------------------------ */

async function launch() {
	let chromium;
	try {
		({ chromium } = await import('playwright-core'));
	} catch {
		fail('playwright-core 가 필요합니다: 저장소 루트에서 `bun install` (devDependency) 후 다시 실행하세요.');
	}
	const tries = [
		process.env.CARD_NEWS_BROWSER && { executablePath: process.env.CARD_NEWS_BROWSER },
		{},
		{ channel: 'chrome' },
		{ channel: 'msedge' }
	].filter(Boolean);
	for (const o of tries) {
		try {
			return await chromium.launch(o);
		} catch {
			/* try next */
		}
	}
	fail('Chromium 을 찾지 못했습니다. Chrome 설치, `bunx playwright-core install chromium`, 또는 CARD_NEWS_BROWSER=<실행파일 경로> 중 하나를 준비하세요.');
}

async function openCard(browser, P, file, size, scale, query = '') {
	const { w, h } = SIZES[size];
	const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
	await page.goto(pathToFileURL(join(P.cards, file)).href + query, { waitUntil: 'load' });
	await page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
	});
	return page;
}

/** In-page QA: overflow of the body / slots, broken and upscaled images. */
function inspect(scale) {
	const card = document.querySelector('.card');
	const body = card.querySelector('.card-body') ?? card;
	const cb = card.getBoundingClientRect();
	const bb = body.getBoundingClientRect();
	const issues = [];
	if (body.scrollHeight > body.clientHeight + 1)
		issues.push({ level: 'error', msg: `본문이 카드 높이를 ${body.scrollHeight - body.clientHeight}px 초과 (텍스트를 줄이거나 항목 수를 줄이세요)` });
	for (const el of card.querySelectorAll('[data-slot]')) {
		const r = el.getBoundingClientRect();
		const inBody = body !== card && body.contains(el);
		const limit = inBody ? bb : cb;
		const name = el.dataset.slot;
		if (r.height > 0 && (r.bottom > limit.bottom + 1 || r.right > limit.right + 1)) {
			el.dataset.overflow = '';
			issues.push({ level: 'error', msg: `슬롯 "${name}" 이 영역 밖으로 넘침` });
		} else if (
			!el.classList.contains('frame') && // frames clip zoomed images on purpose
			el.scrollWidth > el.clientWidth + 2 &&
			getComputedStyle(el).overflow !== 'visible'
		) {
			issues.push({ level: 'warn', msg: `슬롯 "${name}" 가로 넘침` });
		}
	}
	// Anything painted outside a clipping body gets cut off: element boxes, and
	// outlines drawn outside the box (outline-offset). Zoomed images inside a
	// .frame are clipped on purpose and skipped.
	if (body !== card && getComputedStyle(body).overflow !== 'visible') {
		const seen = new Set();
		for (const el of body.querySelectorAll('*')) {
			if (el.closest('.frame') && !el.classList.contains('frame')) continue;
			const r = el.getBoundingClientRect();
			if (!r.width || !r.height) continue;
			const cs = getComputedStyle(el);
			const out = cs.outlineStyle !== 'none' ? (parseFloat(cs.outlineOffset) || 0) + (parseFloat(cs.outlineWidth) || 0) : 0;
			const cutX = Math.max(bb.left - (r.left - out), r.right + out - bb.right);
			const cutY = Math.max(bb.top - (r.top - out), r.bottom + out - bb.bottom);
			if (cutX > 1 || cutY > 1) {
				const name = el.closest('[data-slot]')?.dataset.slot ?? el.className ?? el.tagName;
				if (seen.has(name)) continue;
				seen.add(name);
				const where = cutX > 1 ? `좌우 경계에서 ${Math.round(cutX)}px` : `위아래 경계에서 ${Math.round(cutY)}px`;
				issues.push({ level: 'error', msg: `"${name}" 이 본문 ${where} 잘림` });
			}
		}
	}
	// Text that runs past its own box (it paints over — or under — its neighbours).
	// Decorative, aria-hidden type is allowed to bleed.
	for (const el of card.querySelectorAll('*')) {
		if (el.children.length || !el.textContent.trim() || el.closest('[aria-hidden="true"]')) continue;
		if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
			issues.push({ level: 'error', msg: `텍스트 "${el.textContent.trim().slice(0, 20)}" 가 상자 폭을 ${el.scrollWidth - el.clientWidth}px 넘침` });
		}
	}
	for (const img of card.querySelectorAll('.frame img')) {
		const frame = img.closest('.frame');
		const name = frame.dataset.slot;
		if (!img.naturalWidth) {
			issues.push({ level: 'error', msg: `이미지 "${name}" 로드 실패 (${img.getAttribute('src')})` });
			continue;
		}
		if (/\.svg(\?|$)/i.test(img.getAttribute('src') ?? '')) continue; // vectors scale cleanly
		const f = frame.getBoundingClientRect();
		const cs = getComputedStyle(img);
		const zoom = Number(getComputedStyle(frame).getPropertyValue('--zoom')) || 1;
		const pad = parseFloat(cs.paddingLeft) || 0;
		const fw = f.width - pad * 2;
		const fh = f.height - pad * 2;
		const s =
			cs.objectFit === 'contain'
				? Math.min(fw / img.naturalWidth, fh / img.naturalHeight)
				: Math.max(fw / img.naturalWidth, fh / img.naturalHeight) * zoom;
		const up = s * scale;
		if (up > 1.25)
			issues.push({
				level: 'warn',
				msg: `이미지 "${name}" 해상도 부족: ${img.naturalWidth}×${img.naturalHeight}px 를 ${up.toFixed(1)}배 확대 (흐려질 수 있음 — 더 큰 원본 권장)`
			});
	}
	return issues;
}

async function builtState(P) {
	if (!existsSync(P.build)) fail('아직 build 되지 않았습니다. 먼저 build 를 실행하세요.');
	const b = JSON.parse(await readFile(P.build, 'utf8'));
	const specHash = sha(await readFile(P.spec, 'utf8'));
	return { ...b, specChanged: specHash !== b.specHash, currentHash: await builtHash(P) };
}

async function cmdCheck(pos, opt) {
	const P = deckPaths(pos[0]);
	const st = await builtState(P);
	if (st.specChanged) fail('spec.json 이 마지막 build 이후 변경되었습니다. build 를 다시 실행하세요.');
	const spec = JSON.parse(await readFile(P.spec, 'utf8'));
	const size = spec.size ?? 'portrait';
	const scale = Number(opt.scale ?? 1);
	const browser = await launch();
	let errors = 0;
	await rm(P.proof, { recursive: true, force: true });
	await mkdir(P.proof, { recursive: true });
	try {
		for (const file of (await readdir(P.cards)).filter((f) => f.endsWith('.html')).sort()) {
			const page = await openCard(browser, P, file, size, 1);
			// Per-card proof image for self-review only — final images come from `render` after approval.
			await page.locator('.card').screenshot({ path: join(P.proof, file.replace(/\.html$/, '.png')) });
			const issues = await page.evaluate(inspect, scale);
			errors += issues.filter((i) => i.level === 'error').length;
			log(`${issues.length ? (issues.some((i) => i.level === 'error') ? '✖' : '⚠') : '✔'} ${file}`);
			for (const i of issues) log(`   ${i.level === 'error' ? '✖' : '⚠'} ${i.msg}`);
			await page.close();
		}
		const pv = await browser.newPage({ viewport: { width: 1400, height: 900 } });
		for (const mode of ['design', 'wire']) {
			await pv.goto(`${pathToFileURL(P.preview).href}?mode=${mode}&scale=0.36`, { waitUntil: 'load' });
			await pv.evaluate(() => document.fonts.ready);
			await pv.screenshot({ path: join(P.proof, `proof-${mode}.png`), fullPage: true });
		}
		await pv.close();
		log(`\n  proof: ${rel(P.proof)}/ (카드별 NN-*.png, proof-design.png, proof-wire.png — 검토용, 배포용 아님)`);
	} finally {
		await browser.close();
	}
	if (errors) fail(`레이아웃 오류 ${errors}건 — spec 수정 → build → check 를 반복하세요.`);
	log('✔ check 통과');
}

async function cmdApprove(pos, opt) {
	const P = deckPaths(pos[0]);
	if (!opt.by || opt.by === true) fail('--by "<승인자 이름>" 이 필요합니다. 사람이 구조를 검토하고 명시적으로 승인한 경우에만 실행하세요.');
	const st = await builtState(P);
	if (st.specChanged) fail('spec.json 이 마지막 build 이후 변경되었습니다. build → 검토 후 다시 승인하세요.');
	if (st.currentHash !== st.builtHash) fail('빌드 산출물(cards/, assets/)이 build 이후 수정되었습니다. build 를 다시 실행하세요.');
	const approval = {
		approvedBy: opt.by,
		approvedAt: new Date().toISOString(),
		builtHash: st.builtHash,
		note: typeof opt.note === 'string' ? opt.note : undefined
	};
	await writeFile(P.approval, JSON.stringify(approval, null, 2) + '\n');
	log(`✔ 승인 기록: ${rel(P.approval)} (${approval.approvedBy})`);
}

async function cmdRender(pos, opt) {
	const P = deckPaths(pos[0]);
	const st = await builtState(P);
	if (!existsSync(P.approval))
		fail('승인 기록이 없습니다. preview.html 로 사람이 구조를 검토하고 승인한 뒤 `approve --by <이름>` 을 먼저 실행하세요.');
	const a = JSON.parse(await readFile(P.approval, 'utf8'));
	if (st.specChanged) fail('spec.json 이 승인된 build 이후 변경되었습니다. build → 재검토 → approve 가 필요합니다.');
	if (a.builtHash !== st.currentHash) fail('승인 이후 빌드 산출물이 바뀌었습니다. 재검토 → approve 가 필요합니다.');
	const spec = JSON.parse(await readFile(P.spec, 'utf8'));
	const size = spec.size ?? 'portrait';
	const scale = Number(opt.scale ?? 1);
	const fmt = opt.format === 'jpg' || opt.format === 'jpeg' ? 'jpeg' : 'png';
	await rm(P.out, { recursive: true, force: true });
	await mkdir(P.out, { recursive: true });
	const browser = await launch();
	const files = [];
	try {
		for (const file of (await readdir(P.cards)).filter((f) => f.endsWith('.html')).sort()) {
			const page = await openCard(browser, P, file, size, scale);
			const issues = (await page.evaluate(inspect, scale)).filter((i) => i.level === 'error');
			for (const i of issues) log(`   ⚠ ${file}: ${i.msg}`);
			const outFile = join(P.out, file.replace(/\.html$/, fmt === 'png' ? '.png' : '.jpg'));
			await page.locator('.card').screenshot({ path: outFile, type: fmt, ...(fmt === 'jpeg' ? { quality: 92 } : {}) });
			files.push(outFile);
			await page.close();
		}
	} finally {
		await browser.close();
	}
	const { w, h } = SIZES[size];
	log(`✔ render (${w * scale}×${h * scale}, ${fmt}) — 승인: ${a.approvedBy} @ ${a.approvedAt}`);
	for (const f of files) log(`   ${rel(f)}`);
}

async function cmdPreview(pos, opt) {
	const P = deckPaths(pos[0]);
	if (!existsSync(P.preview)) fail('preview.html 이 없습니다. 먼저 build 하세요.');
	log(`미리보기: ${P.preview}\n          ${pathToFileURL(P.preview).href}`);
	if (opt['no-open']) return;
	const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
	const args = process.platform === 'win32' ? ['/c', 'start', '', P.preview] : [P.preview];
	spawn(cmd, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
}

function cmdStyles() {
	log('디자인 스타일 — spec.style(덱 전체) 또는 card.style(카드 한 장)로 지정. 생략하거나 "default"면 기본 디자인.\n');
	log(`■ default — 기본 디자인 (사이트 테마 그대로, 모든 템플릿 지원)`);
	for (const [k, st] of Object.entries(styles)) {
		log(`■ ${k} — ${st.label}`);
		log(`    ${st.description}`);
		log(`    지원 템플릿: ${Object.keys(st.cards).join(', ')} (그 외는 기본 디자인) · 권장 사진 원본: ${st.photoMin ?? 600}px 이상 · 참고: ${st.inspiration}`);
	}
	log('\n내 데이터로 비교하려면: compare <deck>  → 모든 스타일로 렌더한 비교 덱을 만든다');
}

/** Render the deck's styleable cards in every style so a human can pick one with real data. */
async function cmdCompare(pos, opt) {
	const P = deckPaths(pos[0]);
	const spec = JSON.parse(await readFile(P.spec, 'utf8'));
	const only = typeof opt.styles === 'string' ? opt.styles.split(',') : Object.keys(styles);
	const bad = only.filter((k) => !styles[k] && k !== 'default');
	if (bad.length) fail(`알 수 없는 style: ${bad.join(', ')}`);
	const source = spec.cards.filter((c) => only.some((k) => k === 'default' || styles[k].cards[c.template]));
	if (!source.length) fail(`스타일을 지원하는 카드가 없습니다 (지원 템플릿: ${[...new Set(Object.values(styles).flatMap((st) => Object.keys(st.cards)))].join(', ')}).`);
	const pick = opt.all ? source : [source[0]];
	const cards = ['default', ...only.filter((k) => k !== 'default')].flatMap((k) =>
		pick
			.filter((c) => k === 'default' || styles[k].cards[c.template])
			.map((c) => ({ ...c, style: k }))
	);
	const dir = `${P.dir}-styles`;
	await mkdir(dir, { recursive: true });
	// Image paths in the source spec resolve relative to its folder; keep them working from the sibling deck.
	const fix = (v) =>
		Array.isArray(v)
			? v.map(fix)
			: v && typeof v === 'object'
				? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, IMAGE_KEYS.has(k) ? fixImg(x) : fix(x)]))
				: v;
	const fixImg = (x) => {
		const src = typeof x === 'string' ? x : x?.src;
		if (!src || /^(https?:|data:|\/)/.test(src) || isAbsolute(src) || !existsSync(join(dirname(P.spec), src))) return x;
		const abs = join(dirname(P.spec), src);
		return typeof x === 'string' ? abs : { ...x, src: abs };
	};
	const out = { title: `${spec.title ?? 'Card news'} — 스타일 비교`, lang: spec.lang, size: spec.size, cards: fix(cards) };
	await writeFile(join(dir, 'spec.json'), JSON.stringify(out, null, '\t') + '\n');
	log(`✔ 비교 덱: ${rel(join(dir, 'spec.json'))} (${cards.length}장 = default + 스타일 ${only.filter((k) => k !== 'default').length}종)`);
	await cmdBuild([dir]);
	log(`\n사용자에게 ${rel(join(dir, 'preview.html'))} 를 보여 주고 스타일을 고르게 하세요. 고른 값을 원래 spec의 "style" 에 넣습니다.`);
}

function cmdTemplates() {
	log('Templates (공통 프레임: 브랜드 헤더 → 본문 → 푸터, 공통 옵션: data.tag = 우상단 칩 라벨)\n');
	for (const [name, t] of Object.entries(templates)) {
		log(`■ ${name} — ${t.description}`);
		for (const [k, v] of Object.entries(t.fields)) log(`    ${k.padEnd(10)} ${v}`);
		log('');
	}
	log('Sizes:');
	for (const [k, s] of Object.entries(SIZES)) log(`    ${k.padEnd(10)} ${s.w}×${s.h}  ${s.note}`);
	log('\nStyles (spec.style 또는 card.style — 해당 템플릿을 스타일 전용 레이아웃으로 렌더):');
	for (const [k, st] of Object.entries(styles)) log(`    ${k.padEnd(12)} ${st.label} — ${st.description} [${Object.keys(st.cards).join(', ')}]`);
	log('\nImage options (photo/image/logo/banner 필드에 문자열 또는 객체):');
	log('    { src, fit: cover|contain, mask: circle|squircle|rounded|arch|leaf|none, focus: "50% 30%", zoom: 1.2, plate: white|paper|none, inset: "12%", fallback }');
	log('\nPhoto fallbacks (사진이 없을 때 photo.fallback 또는 spec.photoFallback):');
	for (const [k, f] of Object.entries(FALLBACKS)) log(`    ${k.padEnd(12)} ${f.note}`);
	log(`    ${'auto'.padEnd(12)} 사진 없는 카드마다 ${AUTO_FALLBACK.join(' → ')} 순서로 돌아가며 사용`);
}

const [cmd, ...rest] = process.argv.slice(2);
const { pos, opt } = parseArgs(rest);
const commands = {
	scaffold: cmdScaffold,
	templates: cmdTemplates,
	build: cmdBuild,
	check: cmdCheck,
	preview: cmdPreview,
	approve: cmdApprove,
	styles: cmdStyles,
	compare: cmdCompare,
	render: cmdRender
};
if (!commands[cmd]) {
	log(`usage: card-news <${Object.keys(commands).join('|')}> ...\n(see .agents/skills/card-news/SKILL.md)`);
	process.exit(cmd ? 1 : 0);
}
await commands[cmd](pos, opt);
