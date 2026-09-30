import { L, article, esc, mark, photo, rich, shortDate, slot, titleHtml, when, whereLines } from './_shared.mjs';

export default {
	label: 'Admission Ticket',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
	inspiration: 'PyCon “I’m a speaker” 공유 카드 · 공연 입장권',
	description: '입장권 메타포. 본권에 연사와 발표, 절취선 아래 스텁에 날짜·시간·장소를 크게 배치',
	cards: {
		speaker: (d, ctx) => {
			const s = d.session ?? {};
			const l = L[ctx.lang];
			const date = shortDate(ctx.event.date, ctx.lang);
			const time = String(s.time ?? '').split(/\s*[–-]\s*/)[0];
			const room = String(s.room ?? '');
			// Multi-room values ("300/301/400호") step the whole stub row down so it stays on one line.
			const long = date.length + time.length + room.length > 20;
			return article(
				'ticket',
				ctx,
				`
<header class="tk-top">
	<span class="tk-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	<span class="tk-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker Pass')}</span>
</header>
<div class="card-body tk-ticket">
	<div class="tk-main">
		<div class="tk-who">
			<div class="tk-photo">${photo(d, { mask: 'circle' })}</div>
			<div>
				${when(s.track, () => `<span class="tk-track" ${slot('session.track')}>${esc(s.track)}</span>`)}
				<h2 class="tk-name" ${slot('name')}>${esc(d.name)}</h2>
				${when(d.role, () => `<p class="tk-role" ${slot('role')}>${rich(d.role)}</p>`)}
			</div>
		</div>
		<h3 class="tk-title" ${slot('session.title')}>${titleHtml(s.title)}</h3>
	</div>
	<div class="tk-perf" aria-hidden="true"></div>
	<dl class="tk-stub${long ? ' is-long' : ''}" ${slot('meta')}>
		<div><dt>${esc(l.date)}</dt><dd>${esc(date)}</dd></div>
		<div><dt>${esc(l.time)}</dt><dd>${esc(time)}</dd></div>
		<div><dt>${esc(l.room)}</dt><dd>${esc(room)}</dd></div>
	</dl>
</div>
<footer class="tk-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
			);
		}
	}
};
