import { article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Community Stickers',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
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
};
