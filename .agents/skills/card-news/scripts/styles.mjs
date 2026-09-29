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
	poster: {
		label: 'Bold Poster',
		inspiration: 'Config (Figma) · Smashing Conference · 타이포 포스터',
		description: '단색 브랜드 블루 위 초대형 라틴 이름 타이포와 원형 사진, 하단 흰 정보 슬랩',
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
	<div class="po-photo">${photo(d, { mask: 'circle' })}</div>
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
	},
	ticket: {
		label: 'Admission Ticket',
		inspiration: 'PyCon “I’m a speaker” 공유 카드 · 공연 입장권',
		description: '입장권 메타포. 본권에 연사와 발표, 절취선 아래 스텁에 날짜·시간·장소를 크게 배치',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				return article(
					'ticket',
					ctx,
					`
	<header class="tk-top">
		<span class="tk-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
		<span class="tk-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker Pass')}</span>
	</header>
	<div class="card-body tk-ticket">
		<div class="tk-main">
			<div class="tk-who">
				<div class="tk-photo">${photo(d, { mask: 'circle' })}</div>
				<div>
					${when(s.track, () => `<span class="tk-track" ${slot('session.track')}>${esc(s.track)}</span>`)}
					<h2 class="tk-name" ${slot('name')}>${esc(d.name)}</h2>
					${when(d.role, () => `<p class="tk-role" ${slot('role')}>${rich(d.role)}</p>`)}
				</div>
			</div>
			<h3 class="tk-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
		</div>
		<div class="tk-perf" aria-hidden="true"></div>
		<dl class="tk-stub" ${slot('meta')}>
			<div><dt>${esc(l.date)}</dt><dd>${esc(shortDate(ctx.event.date, ctx.lang))}</dd></div>
			<div><dt>${esc(l.time)}</dt><dd>${esc(String(s.time ?? '').split(/\s*[–-]\s*/)[0])}</dd></div>
			<div><dt>${esc(l.room)}</dt><dd>${esc(s.room ?? '')}</dd></div>
		</dl>
	</div>
	<footer class="tk-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	rail: {
		label: 'Side Rail',
		inspiration: 'Smashing Conference 사이드 레일',
		description: '왼쪽 네이비 레일에 날짜·시간·장소를 크게 세로로 쌓고, 오른쪽 넓은 면은 연사와 발표에 집중',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				const [mm, dd] = (String(ctx.event.date).match(/\d{4}\D+(\d{1,2})\D+(\d{1,2})/) ?? []).slice(1);
				const dow = shortDate(ctx.event.date, ctx.lang).split(' ')[1] ?? '';
				return article(
					'rail',
					ctx,
					`
	<aside class="rl-rail" ${slot('meta')}>
		${mark(ctx, 'on-plate')}
		<div class="rl-date"><span>${esc(mm ?? '')}.${esc(dd ?? '')}</span><small>${esc(dow)}</small></div>
		<div class="rl-item"><small>${esc(l.time)}</small><span>${esc(String(s.time ?? '').split(/\s*[–-]\s*/)[0])}</span></div>
		<div class="rl-item"><small>${esc(l.room)}</small><span>${esc(s.room ?? '')}</span></div>
		${when(s.track, () => `<div class="rl-item"><small>${esc(l.track)}</small><span>${esc(s.track.replace(/\s*track$/i, ''))}</span></div>`)}
	</aside>
	<div class="rl-main">
		<header class="rl-top">
			<span class="rl-brand">${esc(ctx.brand)}</span>
			<span class="rl-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
		</header>
		<div class="card-body rl-body">
			<div class="rl-photo">${photo(d, { mask: 'circle' })}</div>
			<h2 class="rl-name" ${slot('name')}>${esc(d.name)}</h2>
			${when(d.role, () => `<p class="rl-role" ${slot('role')}>${rich(d.role)}</p>`)}
			<h3 class="rl-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
		</div>
		<footer class="rl-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>
	</div>`
				);
			}
		}
	},

	app: {
		label: 'Flutter App Screen',
		inspiration: 'Material 3 · Flutter 앱 화면',
		description: 'Material 3 앱의 연사 상세 화면처럼 앱 바, 프로필 헤더, 세션 정보 ListTile로 구성. Flutter로 만든 앱 같은 카드',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				const icon = (path) => `<svg class="ap-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
				const I = {
					back: 'M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z',
					clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7z',
					place: 'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
					track: 'M17.6 5.8A2 2 0 0 0 16 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 1.6-.8L22 12z',
					event: 'M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14z'
				};
				const tile = (ic, k, v) => `<li><span class="ap-lead">${icon(I[ic])}</span><span class="ap-text"><small>${esc(k)}</small><span>${esc(v)}</span></span></li>`;
				return article(
					'app',
					ctx,
					`
	<div class="ap-status" aria-hidden="true"><span>${esc(String(s.time ?? '').split(/\s*[–-]\s*/)[0] || '11:00')}</span><span class="ap-sys"><i></i><i></i><i></i></span></div>
	<header class="ap-bar">
		${icon(I.back)}
		<span class="ap-bar-title">${esc(ctx.brand)}</span>
		${mark(ctx, 'on-plate')}
	</header>
	<div class="card-body ap-body">
		<div class="ap-profile">
			<div class="ap-photo">${photo(d, { mask: 'circle' })}</div>
			<div class="ap-who">
				<span class="ap-overline" ${slot('tag')}>${esc(d.tag ?? l.speaker)}</span>
				<h2 class="ap-name" ${slot('name')}>${esc(d.name)}</h2>
				${when(d.role, () => `<p class="ap-role" ${slot('role')}>${rich(d.role)}</p>`)}
			</div>
		</div>
		<section class="ap-card" ${slot('session')}>
			${when(s.track, () => `<span class="ap-chip">${esc(s.track)}</span>`)}
			<h3 class="ap-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
			<ul class="ap-tiles" ${slot('meta')}>
				${tile('clock', l.time, `${shortDate(ctx.event.date, ctx.lang)} ${s.time ?? ''}`)}
				${tile('place', l.room, `${s.room ?? ''} · ${ctx.event.venue}`)}
			</ul>
		</section>
	</div>
	<footer class="ap-nav">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	},

	slide: {
		label: 'Title Slide',
		inspiration: 'Fluttercon EU · droidcon 제목 우선 세션 카드 · 발표 표지 슬라이드',
		description: '발표 표지 슬라이드(16:9)에 제목을 크게 싣고, 아래에 발표자 한 줄과 일정. 사람보다 “무엇을 듣는가”를 먼저 전하는 제목 우선형',
		cards: {
			speaker: (d, ctx) => {
				const s = d.session ?? {};
				const l = L[ctx.lang];
				return article(
					'slide',
					ctx,
					`
	<header class="sl-top">
		<span class="sl-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
		<span class="sl-kind" ${slot('tag')}>${esc(d.tag ?? 'Session')}</span>
	</header>
	<div class="card-body sl-body">
		<div class="sl-screen" ${slot('session')}>
			<div class="sl-slide">
				${when(s.track, () => `<span class="sl-track">${esc(s.track)}</span>`)}
				<h3 class="sl-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
				<div class="sl-slide-foot" aria-hidden="true">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></div>
			</div>
		</div>
		<div class="sl-presenter">
			<div class="sl-photo">${photo(d, { mask: 'circle' })}</div>
			<div>
				<span class="sl-by">${esc(l.speaker)}</span>
				<h2 class="sl-name" ${slot('name')}>${esc(d.name)}</h2>
				${when(d.role, () => `<p class="sl-role" ${slot('role')}>${rich(d.role)}</p>`)}
			</div>
		</div>
		<dl class="sl-meta" ${slot('meta')}>
			<div><dt>${esc(l.date)}</dt><dd>${esc(shortDate(ctx.event.date, ctx.lang))}</dd></div>
			<div><dt>${esc(l.time)}</dt><dd>${esc(s.time ?? '')}</dd></div>
			<div><dt>${esc(l.room)}</dt><dd>${esc(s.room ?? '')}</dd></div>
		</dl>
	</div>
	<footer class="sl-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
				);
			}
		}
	}
};
