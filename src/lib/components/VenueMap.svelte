<script>
	import { base } from '$app/paths';
	import { lang } from '$lib/i18n.js';
	import { venueVisible } from '$lib/venue-visibility.js';
</script>

{#if $venueVisible}
	<section id="venue-map" class="venue" aria-label={$lang === 'ko' ? '행사장 안내도' : 'Venue map'}>
		<span class="kicker">VENUE MAP</span>
		<h2 class="section-title">{$lang === 'ko' ? '행사장 안내도' : 'Venue map'}</h2>
		<p>{$lang === 'ko' ? '안내도를 선택하면 크게 볼 수 있습니다.' : 'Select the map to view it full size.'}</p>
		<a href={`${base}/assets/venue-map.png`} target="_blank" rel="noopener noreferrer" aria-label={$lang === 'ko' ? '행사장 안내도 크게 보기 (새 창)' : 'View the venue map full size (opens in a new tab)'}>
			<img src={`${base}/assets/venue-map.png`} alt={$lang === 'ko' ? '행사장 안내도: 입구, 체크인, Google 부스, Flutter Track, AI Track, Cafe 1과 2, 스태프 룸' : 'Venue map showing the entrance, check-in, Google booth, Flutter Track, AI Track, Cafe 1 and 2, and staff room'} />
		</a>
	</section>
{/if}

<style>
	.venue { margin-bottom: clamp(3rem, 6vw, 5rem); }
	p { margin-top: .75rem; color: var(--text-muted); }
	a { display: block; margin-top: 1.5rem; border: 1px solid var(--border); border-radius: 1rem; overflow: hidden; }
	a:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }
	img { display: block; width: 100%; height: auto; }
</style>
