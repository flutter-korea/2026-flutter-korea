import { article, esc, mark, nameParts, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Bold Poster',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
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
};
