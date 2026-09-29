import { L, article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Side Rail',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
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
};
