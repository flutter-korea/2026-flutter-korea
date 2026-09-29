import { esc, media, rich, slot, when } from '../templates.mjs';

export { esc, rich, slot, when };

/* Shared helpers for design styles (one module per style in this folder). */

/** "가애KAAE" → ["가애", "KAAE"]; names without a Latin tail stay whole. */
export const nameParts = (name) => {
	const m = String(name ?? '').match(/^(.*?[^A-Za-z\s])\s*([A-Za-z][A-Za-z .'-]*)$/);
	return m ? [m[1], m[2]] : [String(name ?? ''), ''];
};

/** Break a talk title after its colon: "A: B" → ["A:", "B"]. */
export const titleLines = (t) => {
	const s = String(t ?? '');
	const i = s.indexOf(': ');
	return i > 0 ? [s.slice(0, i + 1), s.slice(i + 2)] : [s];
};

export const titleHtml = (t) => titleLines(t).map((l) => `<span class="line">${rich(l)}</span>`).join('');

/** "2026.11.07 (토)" → "11.07 SAT" style short date. */
export const shortDate = (date, lang) => {
	const m = String(date).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
	if (!m) return date;
	const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
	const dow = (lang === 'en' ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] : ['일', '월', '화', '수', '목', '금', '토'])[d.getUTCDay()];
	return `${m[2].padStart(2, '0')}.${m[3].padStart(2, '0')} ${dow}`;
};

export const mark = (ctx, cls = '') => `<span class="fs-mark ${cls}" aria-hidden="true">${ctx.brandMark}</span>`;

export const article = (name, ctx, inner, extra = '') =>
	`<article class="card style-${name} t-speaker size-${ctx.size} ${extra}" data-template="speaker" data-style="${name}">${inner}</article>`;

/** Date · time on line 1, venue on line 2 — every style shows both. */
export const whereLines = (ctx, cls = 'where') =>
	`<span class="${cls}" ${slot('footer')}><span>${esc(`${ctx.event.date} ${ctx.event.time}`)}</span><span>${esc(ctx.event.venue)}</span></span>`;

export const L = {
	ko: { talk: '발표', track: '트랙', time: '시간', room: '장소', date: '날짜', speaker: '연사' },
	en: { talk: 'TALK', track: 'TRACK', time: 'TIME', room: 'ROOM', date: 'DATE', speaker: 'SPEAKER' }
};

/** Portrait in the style's own shape: the style decides mask/fit; the spec keeps focus/zoom. */
export const photo = (d, opts = {}, name = 'photo') =>
	media(d.photo?.src ? { ...d.photo, fit: 'cover', mask: 'none', plate: undefined, ...opts } : d.photo, { fit: 'cover', mask: 'none', ...opts }, { name, label: 'PROFILE' });

/* ----------------------------------------------------------------- styles */

