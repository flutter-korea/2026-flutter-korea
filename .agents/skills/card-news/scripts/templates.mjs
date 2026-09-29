/**
 * Card news templates. Every template shares the same frame (brand header →
 * body → footer) and theme (assets/theme.css), but lays out its body with a
 * structure specific to the information it carries.
 *
 * Each template exports:
 *   description  one line, shown by `card-news templates`
 *   required     data keys that must be present (validated at build time)
 *   fields       human-readable field docs (key → description)
 *   body(d, ctx) HTML string for the card body
 *
 * Every meaningful region carries `data-slot="<name>"` so the structure
 * (wireframe) review mode can label it and `check` can detect overflow.
 *
 * Image fields (keys named photo / image / logo / banner) arrive already
 * normalized by the builder: { src, fit, focus, zoom, mask, plate, inset, alt }.
 */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Escaped text with light markup: **accent**, and newlines → <br>. */
export const rich = (v) =>
	esc(v)
		.replace(/\*\*(.+?)\*\*/g, '<em class="hl">$1</em>')
		.replace(/\n/g, '<br>');

const slot = (name) => `data-slot="${name}"`;
const when = (v, html) => (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length) ? '' : html());
const long = (v, n) => (String(v ?? '').replace(/\*\*/g, '').length > n ? ' is-long' : '');

/**
 * Masked image frame. `defaults` are the template's preferred treatment for
 * the slot (e.g. speaker photos → cover + squircle; logos → contain on white).
 * Per-image options in the spec override them.
 */
export function media(img, defaults = {}, { cls = '', name = 'image', label } = {}) {
	const o = { fit: 'cover', mask: 'rounded', plate: undefined, ...defaults, ...(img ?? {}) };
	const classes = ['frame', `mask-${o.mask}`, `fit-${o.fit}`, cls];
	if (o.plate) classes.push(`plate-${o.plate}`);
	if (o.fit === 'contain') classes.push('bordered');
	const style = [
		o.focus && `--focus:${esc(o.focus)}`,
		o.zoom && `--zoom:${Number(o.zoom)}`,
		o.inset && `--inset:${esc(o.inset)}`
	]
		.filter(Boolean)
		.join(';');
	if (!img?.src) {
		return `<div class="${classes.join(' ')} is-empty" ${slot(name)}>${esc(label ?? name)}</div>`;
	}
	return `<div class="${classes.join(' ')}" ${slot(name)}${style ? ` style="${style}"` : ''}><img src="${esc(img.src)}" alt="${esc(o.alt ?? '')}"></div>`;
}

const ARROW = `<svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>`;

/** Same word modulo case / plural — used to drop a kicker that repeats the tag chip. */
const sameWord = (a, b) => {
	const n = (v) => String(v ?? '').trim().toLowerCase().replace(/s$/, '');
	return n(a) && n(a) === n(b);
};

const heading = (d, fallbackKicker, tag) => {
	const kicker = d.kicker ?? fallbackKicker;
	return `
	<div ${slot('heading')}>
		${kicker && !sameWord(kicker, d.tag ?? tag) ? `<span class="kicker" ${slot('kicker')}>${esc(kicker)}</span>` : ''}
		${when(d.title, () => `<h2 class="title${long(d.title, 22)}" ${slot('title')}>${rich(d.title)}</h2>`)}
		${when(d.lead, () => `<p class="lead" ${slot('lead')}>${rich(d.lead)}</p>`)}
	</div>`;
};

const metaRow = (pairs) => {
	const items = pairs.filter(([, v]) => v);
	return items.length
		? `<div class="meta-row" ${slot('meta')}>${items.map(([k, v]) => `<span><b>${esc(k)}</b>${esc(v)}</span>`).join('')}</div>`
		: '';
};

const L = {
	ko: { time: '시간', room: '장소', track: '트랙', session: 'SESSION', speaker: 'SPEAKER' },
	en: { time: 'TIME', room: 'ROOM', track: 'TRACK', session: 'SESSION', speaker: 'SPEAKER' }
};

export const templates = {
	cover: {
		tag: '',
		description: '덱 표지 — 히어로 그라디언트 위 대형 타이틀 (시리즈 첫 장)',
		required: ['title'],
		fields: {
			badge: '상단 배지 (예: "2026.11.07 SAT · SEOUL")',
			title: '대형 타이틀 * (줄바꿈 \\n, 강조 **텍스트**)',
			subtitle: '부제',
			series: '하단 시리즈 라벨 (예: "SPEAKER LINEUP")',
			swipe: '넘김 화살표 표시 여부 (기본 true)'
		},
		body: (d) => `
			${when(d.badge, () => `<span class="badge" ${slot('badge')}>${esc(d.badge)}</span>`)}
			<h1 class="${long(d.title, 26).trim()}" ${slot('title')}>${rich(d.title)}</h1>
			${when(d.subtitle, () => `<p class="subtitle" ${slot('subtitle')}>${rich(d.subtitle)}</p>`)}
			<div class="series">
				${when(d.series, () => `<span class="series-label" ${slot('series')}>${esc(d.series)}</span>`) || '<span></span>'}
				${d.swipe === false ? '' : `<span class="swipe" aria-hidden="true">${ARROW}</span>`}
			</div>`
	},

	event: {
		tag: 'EVENT',
		description: '행사 소개 — 헤딩 + 선택 배너 이미지 + 2열 팩트 카드 (일시/장소/주최 등)',
		required: ['title', 'facts'],
		fields: {
			kicker: '키커 (기본 "Event Overview")',
			title: '타이틀 *',
			lead: '리드 문단',
			banner: '배너 이미지 (선택, 행사장/지난 행사 사진). square 사이즈에선 숨김',
			facts: '[{ label, value }] * — 2~6개 권장'
		},
		body: (d) => `
			${heading(d, 'Event Overview')}
			${when(d.banner, () => media(d.banner, { fit: 'cover', mask: 'rounded' }, { cls: 'banner', name: 'banner' }))}
			<div class="facts" ${slot('facts')}>
				${(d.facts ?? [])
					.map(
						(f) => `<div class="fact"><span class="label">${esc(f.label)}</span><span class="value">${rich(f.value)}</span></div>`
					)
					.join('')}
			</div>`
	},

	speaker: {
		tag: 'SPEAKER',
		description: '연사자 소개 — 마스킹된 프로필 사진 + 이름/소속 + 소개 + 발표 세션 패널',
		required: ['name'],
		fields: {
			photo: '프로필 이미지 (기본 cover + squircle 마스크, focus로 얼굴 위치 조정)',
			name: '이름 *',
			nameSub: '보조 이름 (영문 표기 등)',
			role: '소속 · 직함',
			bio: '소개 (2~3문장 권장). square 사이즈에선 숨김',
			tags: '[string] 키워드 칩',
			session: '{ title, track, time, room } — 발표 세션'
		},
		body: (d, ctx) => {
			const s = d.session ?? {};
			const mask = d.photo?.mask ?? 'squircle';
			return `
			<div class="hero">
				<div class="portrait shape-${esc(mask)}">${media(d.photo, { fit: 'cover', mask }, { name: 'photo', label: 'PROFILE' })}</div>
				<div class="who">
					${when(d.nameSub, () => `<span class="name-sub" ${slot('nameSub')}>${esc(d.nameSub)}</span>`)}
					<h2 class="name" ${slot('name')}>${esc(d.name)}</h2>
					${when(d.role, () => `<p class="role" ${slot('role')}>${rich(d.role)}</p>`)}
				</div>
			</div>
			${when(d.tags, () => `<div class="chips" ${slot('tags')}>${d.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>`)}
			${when(d.bio, () => `<p class="bio" ${slot('bio')}>${rich(d.bio)}</p>`)}
			${when(
				s.title,
				() => `
			<div class="panel talk" ${slot('session')}>
				<span class="label">${esc(L[ctx.lang].session)}</span>
				<h3 ${slot('session.title')}>${rich(s.title)}</h3>
				${metaRow([
					[L[ctx.lang].track, s.track],
					[L[ctx.lang].time, s.time],
					[L[ctx.lang].room, s.room]
				])}
			</div>`
			)}`;
		}
	},

	session: {
		tag: 'SESSION',
		description: '발표 주제 소개 — 트랙/시간 메타 + 대형 제목 + 요약 + 핵심 포인트 + 연사 스트립',
		required: ['title'],
		fields: {
			track: '트랙 칩 (예: "AI Track")',
			level: '난이도/대상 칩',
			time: '시간 (예: "13:00 – 13:30")',
			room: '룸',
			title: '발표 제목 *',
			summary: '요약 문단',
			points: '[string] 핵심 포인트 (3~4개 권장, 번호 없는 체크 불릿)',
			speaker: '{ name, role, photo } — 하단 연사 스트립'
		},
		body: (d, ctx) => {
			const sp = d.speaker ?? {};
			return `
			<div class="chips" ${slot('chips')}>
				${when(d.track, () => `<span class="chip solid">${esc(d.track)}</span>`)}
				${when(d.level, () => `<span class="chip">${esc(d.level)}</span>`)}
			</div>
			${metaRow([
				[L[ctx.lang].time, d.time],
				[L[ctx.lang].room, d.room]
			])}
			<h2 class="session-title${long(d.title, 40)}" ${slot('title')}>${rich(d.title)}</h2>
			${when(d.summary, () => `<p class="summary" ${slot('summary')}>${rich(d.summary)}</p>`)}
			${when(d.points, () => `<ul class="points" ${slot('points')}>${d.points.map((p) => `<li>${rich(p)}</li>`).join('')}</ul>`)}
			${when(
				sp.name,
				() => `
			<div class="by" ${slot('speaker')}>
				${media(sp.photo, { fit: 'cover', mask: 'circle' }, { cls: 'avatar', name: 'speaker.photo', label: 'PHOTO' })}
				<div>
					<div class="name">${esc(sp.name)}</div>
					${when(sp.role, () => `<div class="role">${rich(sp.role)}</div>`)}
				</div>
			</div>`
			)}`;
		}
	},

	timetable: {
		tag: 'TIMETABLE',
		description: '타임테이블 — 시간 | 세션(+연사·트랙) 행 목록. 6행 이상이면 자동 압축',
		required: ['rows'],
		fields: {
			kicker: '키커 (기본 "Timetable")',
			title: '타이틀',
			lead: '리드',
			rows: '[{ time, title, speaker, track, highlight }] * — portrait 기준 6~7행 권장 (긴 제목이면 더 적게)'
		},
		cardClass: (d) => ((d.rows ?? []).length > 5 ? 'is-dense' : ''),
		body: (d) => `
			${heading(d, 'Timetable', 'TIMETABLE')}
			<div class="rows" ${slot('rows')}>
				${(d.rows ?? [])
					.map(
						(r) => `
				<div class="row${r.highlight ? ' is-highlight' : ''}">
					<span class="time">${esc(r.time)}</span>
					<div class="what">
						<span class="t">${rich(r.title)}</span>
						${when(r.speaker, () => `<span class="s">${esc(r.speaker)}</span>`)}
						${when(r.track, () => `<span class="chip">${esc(r.track)}</span>`)}
					</div>
				</div>`
					)
					.join('')}
			</div>`
	},

	sponsor: {
		tag: 'SPONSOR',
		description: '후원사 — 로고를 흰 플레이트에 contain 배치. 1곳이면 스포트라이트, 여러 곳이면 티어별 그리드',
		required: [],
		fields: {
			kicker: '키커 (기본 "Sponsors")',
			title: '타이틀',
			lead: '리드',
			items: '[{ name, logo, description }] — 단일 티어일 때',
			tiers: '[{ label, cols, items: [{ name, logo }] }] — 티어 구분이 있을 때 (items 대신)',
			showNames: '로고 아래 이름 표시 (기본 false)'
		},
		body: (d) => {
			const tiers = d.tiers ?? [{ items: d.items ?? [] }];
			const all = tiers.flatMap((t) => t.items ?? []);
			if (all.length === 1 && !d.tiers) {
				const s = all[0];
				return `
			${heading(d, 'Sponsors', 'SPONSOR')}
			<div class="spotlight">
				${media(s.logo, { fit: 'contain', mask: 'rounded', plate: 'white' }, { cls: 'logo', name: 'logo', label: 'LOGO' })}
				<div>
					<h3 class="name" ${slot('name')}>${esc(s.name)}</h3>
					${when(s.description, () => `<p class="desc" ${slot('description')}>${rich(s.description)}</p>`)}
				</div>
			</div>`;
			}
			return `
			${heading(d, 'Sponsors', 'SPONSOR')}
			${tiers
				.map(
					(t, i) => `
			<div class="tier" ${slot(`tier${tiers.length > 1 ? `[${i}]` : ''}`)}>
				${when(t.label, () => `<span class="label">${esc(t.label)}</span>`)}
				<div class="logos" style="--cols:${Number(t.cols) || Math.min(3, Math.max(2, (t.items ?? []).length))}">
					${(t.items ?? [])
						.map(
							(s) => `<div>${media(s.logo, { fit: 'contain', mask: 'rounded', plate: 'white' }, { cls: 'logo', name: 'logo', label: s.name })}${
								d.showNames ? `<div class="logo-name">${esc(s.name)}</div>` : ''
							}</div>`
						)
						.join('')}
				</div>
			</div>`
				)
				.join('')}`;
		}
	},

	goods: {
		tag: 'GOODS',
		description: '굿즈/후원상품 — 헤딩 + 1~4개 이미지 갤러리 (개수별 레이아웃 자동) + 이름/가격 캡션',
		required: ['items'],
		fields: {
			kicker: '키커 (기본 "Goods")',
			title: '타이틀',
			lead: '리드',
			items: '[{ name, image, price, description }] * — 1~4개. 누끼 이미지는 image.fit="contain" 권장'
		},
		body: (d) => {
			const items = (d.items ?? []).slice(0, 4);
			return `
			${heading(d, 'Goods', 'GOODS')}
			<div class="gallery n-${items.length}" ${slot('gallery')}>
				${items
					.map(
						(it, i) => `
				<div class="item">
					${media(it.image, { fit: 'cover', mask: 'rounded', plate: 'paper' }, { name: `items[${i}].image`, label: it.name })}
					<div class="cap">
						<div>
							<div class="n">${esc(it.name)}</div>
							${when(it.description, () => `<div class="d">${rich(it.description)}</div>`)}
						</div>
						${when(it.price, () => `<span class="p">${esc(it.price)}</span>`)}
					</div>
				</div>`
					)
					.join('')}
			</div>`;
		}
	},

	cta: {
		tag: 'INFO',
		description: '안내/CTA — 헤딩 + 정보 목록 + 버튼형 CTA + URL (티켓 오픈, 마감 공지, 마지막 장)',
		required: ['title'],
		fields: {
			tone: '"light" (기본, 흰 배경) | "brand" (단색 네이비 배경 — 그라디언트 아님)',
			kicker: '키커 (기본 "Join Us")',
			title: '타이틀 *',
			lead: '리드',
			info: '[{ label, value }] 정보 목록',
			button: '버튼 라벨',
			url: '표시할 URL (텍스트로만 표시됨 — 이미지는 클릭 불가)'
		},
		cardClass: (d) => `tone-${d.tone === 'brand' ? 'brand' : 'light'}`,
		body: (d) => `
			${heading(d, 'Join Us')}
			${when(
				d.info,
				() => `<div class="info" ${slot('info')}>${d.info
					.map((r) => `<div><span class="label">${esc(r.label)}</span><span>${rich(r.value)}</span></div>`)
					.join('')}</div>`
			)}
			${when(d.button, () => `<span class="button" ${slot('button')}>${esc(d.button)}${ARROW}</span>`)}
			${when(d.url, () => `<span class="url" ${slot('url')}>${esc(d.url)}</span>`)}`
	}
};

/** Keys whose values are treated as images and normalized by the builder. */
export const IMAGE_KEYS = new Set(['photo', 'image', 'logo', 'banner']);

const BRAND_MARK = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#0553B1"/><path d="M37.1 8 17.1 28l6.4 6.4L49.9 8H37.1Z" fill="#fff"/><path d="M37.1 30.1 25.9 41.3l11.2 11.2h12.8l-11.2-11.2 11.2-11.2H37.1Z" fill="#bfe3fc"/></svg>`;

/** Full card <article>: shared frame around the template body. */
export function renderCard(card, ctx) {
	const tpl = templates[card.template];
	const d = card.data ?? {};
	const extra = tpl.cardClass?.(d) ?? '';
	const coverArt =
		card.template === 'cover'
			? `<svg class="cover-art" viewBox="0 0 64 64" aria-hidden="true"><path d="M37.1 8 17.1 28l6.4 6.4L49.9 8H37.1Z" fill="#fff"/><path d="M37.1 30.1 25.9 41.3l11.2 11.2h12.8l-11.2-11.2 11.2-11.2H37.1Z" fill="#fff"/></svg>`
			: '';
	return `<article class="card t-${card.template} size-${ctx.size} ${extra}" data-template="${card.template}">
	${coverArt}
	<header class="card-top">
		<span class="brand">${BRAND_MARK}${esc(ctx.brand)}</span>
		${
			// the cover carries its own badge; it only gets a chip when asked for
			card.template === 'cover' && !d.tag ? '' : `<span class="chip${card.template === 'cover' ? '' : ' solid'}" ${slot('tag')}>${esc(d.tag ?? tpl.tag)}</span>`
		}
	</header>
	<div class="card-body">${tpl.body(d, ctx)}</div>
	<footer class="card-foot">
		<span ${slot('footer')}>${esc(ctx.footer)}</span>
		<span>${esc(ctx.handle)}${ctx.total > 1 ? ` · <span class="page">${ctx.page} / ${ctx.total}</span>` : ''}</span>
	</footer>
</article>`;
}
