import { article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

/** Keep Latin hyphenated compounds ("capability-first") on one line; only touches text, never tags. */
const noHyphenBreak = (html) =>
	html
		.split(/(<[^>]+>)/)
		.map((part) => (part.startsWith('<') ? part : part.replace(/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+/g, '<span class="bd-nw">$&</span>')))
		.join('');

export default {
	label: 'Name Badge',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
	inspiration: 'GitHub Universe · Laracon 행사 명찰',
	description: '행사장 명찰(랜야드 배지) 메타포. 스트랩에 Flutter Seoul, 배지 한 장에 연사 정보가 완결',
	cards: {
		speaker: (d, ctx) => {
			const s = d.session ?? {};
			const hasPhoto = Boolean(d.photo?.src);
			const longTitle = String(s.title ?? '').length > 40;
			return article(
				'badge',
				ctx,
				`
<div class="bd-strap" aria-hidden="true"></div>
<div class="bd-clip" aria-hidden="true"></div>
<div class="card-body bd-badge${hasPhoto ? '' : ' no-photo'}">
	<div class="bd-band">
		${mark(ctx, 'on-plate')}
		<span class="bd-kind" ${slot('tag')}>${esc(d.tag ?? 'SPEAKER')}</span>
	</div>
	<div class="bd-id">
		<div class="bd-photo">${photo(d, { mask: 'circle' })}</div>
		<h2 class="bd-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="bd-role" ${slot('role')}>${rich(d.role)}</p>`)}
	</div>
	<div class="bd-perf" aria-hidden="true"></div>
	<div class="bd-talk${longTitle ? ' is-long' : ''}" ${slot('session')}>
		${when(s.track, () => `<span class="bd-track">${esc(s.track)}</span>`)}
		<h3 ${slot('session.title')}>${noHyphenBreak(titleHtml(s.title))}</h3>
		<p class="bd-meta" ${slot('meta')}>${esc([s.time && `${shortDate(ctx.event.date, ctx.lang)} ${s.time}`, s.room].filter(Boolean).join(' · '))}</p>
	</div>
	<div class="bd-event">${whereLines(ctx)}</div>
</div>`
			);
		}
	}
};
