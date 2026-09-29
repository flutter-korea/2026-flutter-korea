import { L, article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Widget Inspector',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
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
};
