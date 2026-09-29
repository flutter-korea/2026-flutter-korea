import { L, article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Flutter App Screen',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
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
};
