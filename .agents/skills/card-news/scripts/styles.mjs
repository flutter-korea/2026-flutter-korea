/**
 * Design styles — alternative visual directions that re-render a template with
 * their own layout while reading the SAME spec data. Select with `spec.style`
 * (whole deck) or `card.style` (one card). Styles live in assets/styles.css,
 * scoped by `.style-<name>`.
 *
 * Every style keeps the readability floor of the base theme (nothing under
 * 24px on the 1080 canvas; name ≥ 96px; talk title ≥ 44px) and shows the exact
 * date/time/venue from ctx.event. Brand = the Flutter Seoul mark (ctx.brandMark),
 * its facet palette, and the official Dash (assets/brand/dash.png).
 */
import { esc, media, rich, slot, when } from './templates.mjs';

/* ---------------------------------------------------------------- helpers */

/** "가애KAAE" → ["가애", "KAAE"]; names without a Latin tail stay whole. */
const nameParts = (name) => {
	const m = String(name ?? '').match(/^(.*?[^A-Za-z\s])\s*([A-Za-z][A-Za-z .'-]*)$/);
	return m ? [m[1], m[2]] : [String(name ?? ''), ''];
};

/** Break a talk title after its colon: "A: B" → ["A:", "B"]. */
const titleLines = (t) => {
	const s = String(t ?? '');
	const i = s.indexOf(': ');
	return i > 0 ? [s.slice(0, i + 1), s.slice(i + 2)] : [s];
};

const titleHtml = (t) => titleLines(t).map((l) => `<span class="line">${rich(l)}</span>`).join('');

/** "2026.11.07 (토)" → "11.07 SAT" style short date. */
const shortDate = (date, lang) => {
	const m = String(date).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
	if (!m) return date;
	const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
	const dow = (lang === 'en' ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] : ['일', '월', '화', '수', '목', '금', '토'])[d.getUTCDay()];
	return `${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')} ${dow}`;
};

const mark = (ctx, cls = '') => `<span class="fs-mark ${cls}" aria-hidden="true">${ctx.brandMark}</span>`;

const article = (name, ctx, inner, extra = '') =>
	`<article class="card style-${name} t-speaker size-${ctx.size} ${extra}" data-template="speaker" data-style="${name}">${inner}</article>`;

/** Date · time on line 1, venue on line 2 — every style shows both. */
const whereLines = (ctx, cls = 'where') =>
	`<span class="${cls}" ${slot('footer')}><span>${esc(`${ctx.event.date} ${ctx.event.time}`)}</span><span>${esc(ctx.event.venue)}</span></span>`;

const L = {
	ko: { talk: '발표', track: '트랙', time: '시간', room: '장소', date: '날짜', speaker: '연사' },
	en: { talk: 'TALK', track: 'TRACK', time: 'TIME', room: 'ROOM', date: 'DATE', speaker: 'SPEAKER' }
};

/** Portrait in the style's own shape: the style decides mask/fit; the spec keeps focus/zoom. */
const photo = (d, opts = {}, name = 'photo') =>
	media(d.photo?.src ? { ...d.photo, fit: 'cover', mask: 'none', plate: undefined, ...opts } : d.photo, { fit: 'cover', mask: 'none', ...opts }, { name, label: 'PROFILE' });

/* ----------------------------------------------------------------- styles */

export const styles = {
	editorial: {
		label: 'Editorial Rules',
		inspiration: 'Next.js Conf · Rails World · Swiss editorial posters',
		description: '흰 지면, 가로 괘선이 정보를 나누는 에디토리얼 레이아웃. 초대형 이름과 표 형식 메타',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const [ko, en] = nameParts(d.name);
				const l = L[ctx.lang];
				return article(
					'editorial',
					ctx,
					`
	<header class="ed-top">
		<span class="ed-brand">${mark(ctx)}<span>${esc(ctx.brand)}</span></span>
		<span class="ed-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
	</header>
	<div class="card-body">
		<div class="ed-hero">
			<div class="ed-side">
				${when(s.track, () => `<span class="ed-track" ${slot('session.track')}>${esc(s.track)}</span>`)}
				${when(d.role, () => `<span class="ed-role" ${slot('role')}>${rich(d.role)}</span>`)}
			</div>
			<div class="ed-photo">${photo(d, { mask: 'none' })}</div>
		</div>
		<h2 class="ed-name" ${slot('name')}><span>${esc(ko)}</span>${en ? `<span class="en">${esc(en)}</span>` : ''}</h2>
		<div class="ed-talk" ${slot('session')}>
			<span class="ed-label">${esc(l.talk)}</span>
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
		</div>
		<dl class="ed-meta" ${slot('meta')}>
			<div><dt>${esc(l.date)}</dt><dd>${esc(shortDate(ctx.event.date, ctx.lang))}</dd></div>
			<div><dt>${esc(l.time)}</dt><dd>${esc(s.time ?? ctx.event.time)}</dd></div>
			<div><dt>${esc(l.room)}</dt><dd>${esc(s.room ?? '')}</dd></div>
		</dl>
	</div>
	<footer class="ed-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	poster: {
		label: 'Bold Poster',
		inspiration: 'Config (Figma) · Smashing Conference · 타이포 포스터',
		description: '단색 브랜드 블루 위 초대형 라틴 이름 타이포와 아치 마스크 사진, 하단 흰 정보 슬랩',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const [ko, en] = nameParts(d.name);
				return article(
					'poster',
					ctx,
					`
	<header class="po-top">
		<span class="po-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
		<span class="po-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
	</header>
	<div class="po-type" aria-hidden="true">${esc(en || ko)}</div>
	<div class="po-photo">${photo(d, { mask: 'arch' })}</div>
	<div class="po-who">
		<h2 class="po-name" ${slot('name')}>${esc(ko)}${en ? `<span class="en">${esc(en)}</span>` : ''}</h2>
		${when(d.role, () => `<p class="po-role" ${slot('role')}>${rich(d.role)}</p>`)}
	</div>
	<div class="card-body po-slab">
		<div ${slot('session')}>
			${when(s.track, () => `<span class="po-track">${esc(s.track)}</span>`)}
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
		</div>
		<div class="po-meta" ${slot('meta')}>
			<span><b>${esc(shortDate(ctx.event.date, ctx.lang))}</b> ${esc(s.time ?? '')}</span>
			<span>${esc(s.room ?? '')}</span>
		</div>
		<div class="po-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></div>
	</div>`
				);
			}
		}
	},

	duotone: {
		label: 'Blue Duotone',
		inspiration: 'Spotify/포스터 듀오톤 · droidcon 스피커 카드',
		description: '사진을 Flutter Seoul 네이비↔스카이 듀오톤으로 처리해 풀블리드. 사진 톤이 달라도 덱 전체가 한 톤으로 묶임',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				return article(
					'duotone',
					ctx,
					`
	<div class="dt-photo">${photo(d)}</div>
	<header class="dt-top">
		<span class="dt-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
		<span class="dt-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
	</header>
	<div class="card-body dt-panel">
		<h2 class="dt-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="dt-role" ${slot('role')}>${rich(d.role)}</p>`)}
		<div class="dt-talk" ${slot('session')}>
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
			<div class="dt-meta" ${slot('meta')}>
				${[s.track, s.time && `${shortDate(ctx.event.date, ctx.lang)} ${s.time}`, s.room]
					.filter(Boolean)
					.map((v) => `<span>${esc(v)}</span>`)
					.join('')}
			</div>
		</div>
		<footer class="dt-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>
	</div>`
				);
			}
		}
	},

	badge: {
		label: 'Name Badge',
		inspiration: 'GitHub Universe · Laracon 행사 명찰',
		description: '행사장 명찰(랜야드 배지) 메타포. 스트랩에 Flutter Seoul, 배지 한 장에 연사 정보가 완결',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				return article(
					'badge',
					ctx,
					`
	<div class="bd-strap" aria-hidden="true"><span>FLUTTER SEOUL · FLUTTER KOREA 2026 · FLUTTER SEOUL · FLUTTER KOREA 2026 ·</span></div>
	<div class="bd-clip" aria-hidden="true"></div>
	<div class="card-body bd-badge">
		<div class="bd-band">
			${mark(ctx, 'on-plate')}
			<span class="bd-kind" ${slot('tag')}>${esc(d.tag ?? 'SPEAKER')}</span>
		</div>
		<div class="bd-photo">${photo(d, { mask: 'circle' })}</div>
		<h2 class="bd-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="bd-role" ${slot('role')}>${rich(d.role)}</p>`)}
		<div class="bd-perf" aria-hidden="true"></div>
		<div class="bd-talk" ${slot('session')}>
			${when(s.track, () => `<span class="bd-track">${esc(s.track)}</span>`)}
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
			<p class="bd-meta" ${slot('meta')}>${esc([s.time && `${shortDate(ctx.event.date, ctx.lang)} ${s.time}`, s.room].filter(Boolean).join(' · '))}</p>
		</div>
		<div class="bd-event">${whereLines(ctx)}</div>
	</div>`
				);
			}
		}
	},

	code: {
		label: 'Dart Snippet',
		inspiration: 'JSConf · dev.to · 코드 스니펫 공지',
		description: '발표 정보를 Dart 생성자 코드로 표현한 에디터 창. 문자열(핵심 정보)을 가장 밝고 크게',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const m = String(ctx.event.date).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/) ?? [];
				const [hh, mm] = String(s.time ?? '').match(/\d{1,2}:\d{2}/)?.[0].split(':') ?? [];
				const track = /flutter/i.test(s.track ?? '') ? 'flutter' : /ai/i.test(s.track ?? '') ? 'ai' : null;
				const str = (v) => `<span class="c-str">'${esc(v)}'</span>`;
				const lines = [
					`<span class="c-kw">final</span> talk = <span class="c-type">Talk</span>(`,
					...titleLines(s.title).map((t, i) => `  ${i === 0 ? '<span class="c-key">title</span>: ' : '<span class="c-pad">title: </span>'}${str(t)}${i === titleLines(s.title).length - 1 ? ',' : ''}`),
					`  <span class="c-key">speaker</span>: ${str(d.name)},`,
					track ? `  <span class="c-key">track</span>: <span class="c-type">Track</span>.${track},` : '',
					m[1] && hh
						? `  <span class="c-key">at</span>: <span class="c-type">DateTime</span>(<span class="c-num">${+m[1]}</span>, <span class="c-num">${+m[2]}</span>, <span class="c-num">${+m[3]}</span>, <span class="c-num">${+hh}</span>, <span class="c-num">${+mm}</span>),`
						: '',
					s.room ? `  <span class="c-key">room</span>: ${str(s.room)},` : '',
					`);`
				].filter(Boolean);
				return article(
					'code',
					ctx,
					`
	<header class="cd-top">
		<span class="cd-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
		<span class="cd-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
	</header>
	<div class="cd-who">
		<div class="cd-photo">${photo(d, { mask: 'circle' })}</div>
		<div>
			<p class="cd-comment">// ${esc(s.track ?? 'Speaker')}</p>
			<h2 class="cd-name" ${slot('name')}>${esc(d.name)}</h2>
			${when(d.role, () => `<p class="cd-role" ${slot('role')}>${rich(d.role)}</p>`)}
		</div>
	</div>
	<div class="card-body cd-editor" ${slot('session')}>
		<div class="cd-tabs"><span class="cd-tab">talk.dart</span></div>
		<ol class="cd-code" ${slot('session.title')}>${lines.map((l) => `<li><code>${l}</code></li>`).join('')}</ol>
	</div>
	<footer class="cd-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	inspector: {
		label: 'Widget Inspector',
		inspiration: 'Flutter DevTools · debugPaintSizeEnabled',
		description: 'Flutter 디버그 페인트처럼 각 정보 블록에 위젯 이름과 크기 라벨. 모서리 디버그 배너로 Flutter 개발자 위트',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				const tag = (t) => `<span class="in-tag" aria-hidden="true">${esc(t)}</span>`;
				return article(
					'inspector',
					ctx,
					`
	<div class="in-banner" aria-hidden="true"><span>${esc(d.tag ?? 'SPEAKER')}</span></div>
	<header class="in-top">
		<span class="in-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	</header>
	<div class="card-body">
		<div class="in-hero">
			<div class="in-box in-photo">${tag('CircleAvatar · 360×360')}${photo(d, { mask: 'circle' })}</div>
			<div class="in-box in-who">${tag('Column')}
				<h2 class="in-name" ${slot('name')}>${esc(d.name)}</h2>
				${when(d.role, () => `<p class="in-role" ${slot('role')}>${rich(d.role)}</p>`)}
				${when(s.track, () => `<span class="in-chip">${esc(s.track)}</span>`)}
			</div>
		</div>
		<div class="in-box in-talk" ${slot('session')}>${tag('Card')}
			<span class="in-label">${esc(l.talk)}</span>
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
		</div>
		<div class="in-box in-meta" ${slot('meta')}>${tag('Row')}
			<span><b>${esc(l.date)}</b>${esc(shortDate(ctx.event.date, ctx.lang))}</span>
			<span><b>${esc(l.time)}</b>${esc(s.time ?? '')}</span>
			<span><b>${esc(l.room)}</b>${esc(s.room ?? '')}</span>
		</div>
	</div>
	<footer class="in-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	split: {
		label: 'Split Navy',
		inspiration: 'KotlinConf · droidcon · Android Dev Summit',
		description: '상단 사진 / 하단 네이비 정보 패널의 명확한 2분할. 트랙 칩이 경계에 걸쳐 두 영역을 잇는다',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				return article(
					'split',
					ctx,
					`
	<div class="sp-photo">${photo(d)}</div>
	<header class="sp-top">
		<span class="sp-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	</header>
	<div class="card-body sp-panel">
		${when(s.track, () => `<span class="sp-track" ${slot('session.track')}>${esc(s.track)}</span>`)}
		<h2 class="sp-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="sp-role" ${slot('role')}>${rich(d.role)}</p>`)}
		<h3 class="sp-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
		<div class="sp-meta" ${slot('meta')}>
			<span><b>${esc(l.time)}</b>${esc(shortDate(ctx.event.date, ctx.lang))} ${esc(s.time ?? '')}</span>
			<span><b>${esc(l.room)}</b>${esc(s.room ?? '')}</span>
		</div>
		<footer class="sp-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>
	</div>`
				);
			}
		}
	},

	magazine: {
		label: 'Magazine Cover',
		inspiration: 'TIME · WIRED 표지 · Smashing Magazine',
		description: '풀블리드 인물 사진 위 대형 마스트헤드와 커버 라인. 고해상도 사진이 있을 때 가장 강력',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				return article(
					'magazine',
					ctx,
					`
	<div class="mg-photo">${photo(d)}</div>
	<header class="mg-top">
		<div class="mg-mast" aria-label="${esc(ctx.brand)}">FLUTTER<br>KOREA</div>
		<div class="mg-issue">
			${mark(ctx, 'on-plate')}
			<span>${esc(ctx.lang === 'ko' ? '2026 연사 시리즈' : '2026 SPEAKER SERIES')}</span>
			<span ${slot('tag')}>${esc(s.track ?? 'Speaker')}</span>
		</div>
	</header>
	<div class="card-body mg-lines">
		<h2 class="mg-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="mg-role" ${slot('role')}>${rich(d.role)}</p>`)}
		<h3 class="mg-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
		<p class="mg-meta" ${slot('meta')}>${esc([shortDate(ctx.event.date, ctx.lang), s.time, s.room].filter(Boolean).join('  ·  '))}</p>
		<footer class="mg-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>
	</div>`
				);
			}
		}
	},

	facets: {
		label: 'Seoul Pavilion',
		inspiration: 'Flutter Seoul 누각 마크 · Google I/O 도형 시스템(차용이 아닌 자체 마크 확장)',
		description: 'Flutter Seoul 누각 마크의 면 분할을 확장해, 누각의 “문”에 연사 사진이 들어가는 브랜드 프레임',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				// Pavilion frame: the mark's roof facets across the width, the dark door
				// block replaced by the portrait, flanked by the mark's two side facets.
				const W = 936;
				const R = 176; // roof height
				const D = 400; // door (portrait) size
				const x0 = (W - D) / 2;
				const rx = (x) => (W / 2 + ((x - 159.7) * W) / 260.2).toFixed(1);
				const ry = (y) => ((y / 65.6) * R).toFixed(1);
				const roof = [
					['#285BAD', [[29.6, 65.6], [94.6, 0], [159.7, 0], [94.6, 65.6]]],
					['#3381E1', [[94.6, 65.6], [159.7, 0], [159.7, 65.6]]],
					['#5A9CEB', [[159.6, 0], [224.7, 0], [159.6, 65.6]]],
					['#8FC3FF', [[224.7, 0], [289.8, 65.6], [159.6, 65.6]]]
				]
					.map(([c, pts]) => `<polygon fill="${c}" points="${pts.map(([x, y]) => `${rx(x)},${ry(y)}`).join(' ')}"/>`)
					.join('');
				const sides = `<polygon fill="#6DBAF5" points="${x0},${R} ${x0},${R + D} ${x0 - D * 0.9},${R + D}"/><polygon fill="#4DA4FF" points="${x0 + D},${R} ${x0 + D},${R + D} ${x0 + D + D * 0.9},${R + D}"/>`;
				return article(
					'facets',
					ctx,
					`
	<header class="fc-top">
		<span class="fc-brand">${mark(ctx)}<span>${esc(ctx.brand)}</span></span>
		<span class="fc-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
	</header>
	<div class="fc-pavilion" style="--door:${D}px;--roof:${R}px">
		<svg class="fc-art" viewBox="0 0 ${W} ${R + D}" aria-hidden="true">${roof}${sides}<rect x="${x0}" y="${R}" width="${D}" height="${D}" fill="#103E86"/></svg>
		<div class="fc-door">${photo(d)}</div>
	</div>
	<div class="card-body fc-info">
		<h2 class="fc-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="fc-role" ${slot('role')}>${rich(d.role)}</p>`)}
		<div class="fc-talk" ${slot('session')}>
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
			<div class="fc-meta" ${slot('meta')}>
				${when(s.track, () => `<span class="fc-chip">${esc(s.track)}</span>`)}
				<span>${esc(shortDate(ctx.event.date, ctx.lang))} ${esc(s.time ?? '')}</span>
				<span>${esc(s.room ?? '')}</span>
			</div>
		</div>
	</div>
	<footer class="fc-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	sticker: {
		label: 'Community Stickers',
		inspiration: 'PyCon · Fluttercon 커뮤니티 굿즈 · 노트북 스티커',
		description: '사진·이름표·발표 정보를 스티커처럼 붙인 커뮤니티 무드. 공식 Dash가 함께하는 친근한 톤',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				return article(
					'sticker',
					ctx,
					`
	<header class="sk-top">
		<span class="sk-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	</header>
	<div class="card-body sk-board">
		<div class="sk-photo">${photo(d, { mask: 'circle' })}</div>
		<img class="sk-dash" src="assets/brand/dash.png" alt="">
		<div class="sk-tag" ${slot('name')}>
			<span class="sk-hello">${esc(ctx.lang === 'ko' ? '안녕하세요, 연사' : 'HELLO, my name is')}</span>
			<strong>${esc(d.name)}</strong>
			${when(d.role, () => `<span class="sk-role" ${slot('role')}>${rich(d.role)}</span>`)}
		</div>
		<div class="sk-talk" ${slot('session')}>
			${when(s.track, () => `<span class="sk-track">${esc(s.track)}</span>`)}
			<h3 ${slot('session.title')}>${titleHtml(s.title)}</h3>
			<p class="sk-meta" ${slot('meta')}>${esc([s.time && `${shortDate(ctx.event.date, ctx.lang)} ${s.time}`, s.room].filter(Boolean).join(' · '))}</p>
		</div>
	</div>
	<footer class="sk-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	}
};
