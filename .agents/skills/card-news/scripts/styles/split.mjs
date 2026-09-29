import { L, article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Split Navy',
	photoMin: 1100, // px — smaller originals get upscaled (check warns)
	inspiration: 'KotlinConf · droidcon · Android Dev Summit',
	description: '상단 사진 / 하단 네이비 정보 패널의 명확한 2분할. 트랙 칩이 경계에 걸쳐 두 영역을 잇는다',
	cards: {
		speaker: (d, ctx) => {
			const s = d.session ?? {};
			const l = L[ctx.lang];
			const hasPhoto = Boolean(d.photo?.src);
			// The frame is ~1080px wide, so the photo already reads large: drop the spec's
			// portrait zoom (tuned for small masked portraits) to keep upscaling minimal.
			return article(
				'split',
				ctx,
				`
<div class="sp-photo">${photo(d, { zoom: undefined })}${hasPhoto ? '' : mark(ctx, 'sp-stand')}</div>
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
</div>`,
				hasPhoto ? '' : 'sp-nophoto'
			);
		}
	}
};
