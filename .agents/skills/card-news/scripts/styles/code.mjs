import { article, esc, mark, photo, rich, slot, titleLines, when, whereLines } from './_shared.mjs';

export default {
	label: 'Dart Snippet',
	photoMin: 600, // px — smaller originals get upscaled (check warns)
	inspiration: 'JSConf · dev.to · 코드 스니펫 공지',
	description: '발표 정보를 Dart 생성자 코드로 표현한 에디터 창. 문자열(핵심 정보)을 가장 밝고 크게',
	cards: {
		speaker: (d, ctx) => {
			const s = d.session ?? {};
			const m = String(ctx.event.date).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/) ?? [];
			const [hh, mm] = String(s.time ?? '').match(/\d{1,2}:\d{2}/)?.[0].split(':') ?? [];
			const track = /flutter/i.test(s.track ?? '') ? 'flutter' : /ai/i.test(s.track ?? '') ? 'ai' : null;
			const str = (v) => `<span class="c-str">'${esc(v)}'</span>`;
			// Each line = [lead, value]. The lead never wraps; a long value wraps
			// inside its own column so continuation text hangs under the opening quote.
			const tl = titleLines(s.title);
			const lines = [
				['', `<span class="c-kw">final</span> talk = <span class="c-type">Talk</span>(`],
				...tl.map((t, i) => [
					`  ${i === 0 ? '<span class="c-key">title</span>: ' : '<span class="c-pad">title: </span>'}`,
					`${str(t)}${i === tl.length - 1 ? ',' : ''}`
				]),
				['  <span class="c-key">speaker</span>: ', `${str(d.name)},`],
				track ? ['  <span class="c-key">track</span>: ', `<span class="c-type">Track</span>.${track},`] : null,
				m[1] && hh
					? ['  <span class="c-key">at</span>: ', `<span class="c-type">DateTime</span>(<span class="c-num">${+m[1]}</span>, <span class="c-num">${+m[2]}</span>, <span class="c-num">${+m[3]}</span>, <span class="c-num">${+hh}</span>, <span class="c-num">${+mm}</span>),`]
					: null,
				s.room ? ['  <span class="c-key">room</span>: ', `${str(s.room)},`] : null,
				['', ');']
			].filter(Boolean);
			return article(
				'code',
				ctx,
				`
<header class="cd-top">
	<span class="cd-brand">${mark(ctx, 'on-plate')}<span>${esc(ctx.brand)}</span></span>
	<span class="cd-kind" ${slot('tag')}>${esc(d.tag ?? 'Speaker')}</span>
</header>
<div class="cd-who">
	<div class="cd-photo">${photo(d, { mask: 'circle' })}</div>
	<div>
		<p class="cd-comment">// ${esc(s.track ?? 'Speaker')}</p>
		<h2 class="cd-name" ${slot('name')}>${esc(d.name)}</h2>
		${when(d.role, () => `<p class="cd-role" ${slot('role')}>${rich(d.role)}</p>`)}
	</div>
</div>
<div class="card-body cd-editor" ${slot('session')}>
	<div class="cd-tabs"><span class="cd-tab">talk.dart</span></div>
	<ol class="cd-code" ${slot('session.title')}>${lines.map(([lead, val]) => `<li><code>${lead ? `<span class="c-lead">${lead}</span>` : ''}<span class="c-val">${val}</span></code></li>`).join('')}</ol>
</div>
<footer class="cd-foot">${whereLines(ctx)}<span>${esc(ctx.handle)}</span></footer>`
			);
		}
	}
};
