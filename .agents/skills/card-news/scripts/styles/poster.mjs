import { article, esc, mark, nameParts, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

const HANGUL = /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/;
const TYPE_MAX = 330; // px — the poster's display size
const TYPE_MIN = 220; // px — below this the backdrop stops reading as a poster
const TYPE_ROOM = 960; // px — widest run that stays on the canvas

/** Rough advance width in em at the backdrop's -0.06em tracking. */
const ems = (t) =>
	[...t].reduce((w, c) => w + (HANGUL.test(c) ? 0.88 : c === ' ' ? 0.22 : /[A-Z]/.test(c) ? 0.64 : 0.54), 0);

/**
 * Backdrop word: the Latin name when present, else the whole name. A run too
 * wide for the canvas falls back to its first word, then scales down to fit, so
 * the type never reads as a clipped fragment ("Khan|").
 */
const backdrop = (ko, en) => {
	let text = (en || ko).trim();
	if (ems(text) * TYPE_MAX > TYPE_ROOM && text.includes(' ')) text = text.split(/\s+/)[0];
	const size = Math.round(Math.max(TYPE_MIN, Math.min(TYPE_MAX, TYPE_ROOM / ems(text))));
	return { text, size, hangul: HANGUL.test(text) };
};

export default {
	label: 'Bold Poster',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
	inspiration: 'Config (Figma) · Smashing Conference · 타이포 포스터',
	description: '단색 브랜드 블루 위 초대형 라틴 이름 타이포와 원형 사진, 하단 흰 정보 슬랩',
	cards: {
		speaker: (d, ctx) => {
			const s = d.session ?? {};
			const [ko, en] = nameParts(d.name);
			const type = backdrop(ko, en);
			return article(
				'poster',
				ctx,
				`
<header class="po-top">
	<span class="po-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	<span class="po-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
</header>
<div class="po-type${type.hangul ? ' is-hangul' : ''}" style="--po-type:${type.size}px" aria-hidden="true">${esc(type.text)}</div>
<div class="po-photo${d.photo?.src ? '' : ' is-empty'}">${photo(d, { mask: 'circle' })}</div>
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
		<span><b>${esc(shortDate(ctx.event.date, ctx.lang))}</b>${when(s.time, () => ` ${esc(s.time)}`)}</span>
		${when(s.room, () => `<span class="po-room">${esc(s.room)}</span>`)}
	</div>
	<div class="po-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></div>
</div>`
			);
		}
	}
};
