<script>
	/** @type {{ url: string; end: string; lang: string; testTime?: string }} */
	let { url, end, lang, testTime = '' } = $props();
	let available = $state(false);

	$effect(() => {
		const endTime = Date.parse(`2026-11-07T${end}:00+09:00`);
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		let timer;
		function update() {
			const remaining = endTime - (testTime ? Date.parse(`2026-11-07T${testTime}:00+09:00`) : Date.now());
			available = remaining <= 0;
			if (!available && !testTime) timer = setTimeout(update, Math.min(remaining, 2147483647));
		}
		update();
		return () => clearTimeout(timer);
	});
</script>

{#if available}
	<a class="slides-button" href={url} target="_blank" rel="noopener noreferrer">{lang === 'ko' ? '발표 자료 보기' : 'View slides'} ↗</a>
{:else}
	<button class="slides-button" type="button" disabled >{lang === 'ko' ? '세션 종료 후 공개' : 'Available after the session'}</button>
{/if}

<style>
	.slides-button { position: relative; z-index: 2; display: inline-block; margin-top: 0.7rem; padding: 0.4rem 0.7rem; border: 1px solid var(--accent); border-radius: 0.4rem; background: transparent; color: var(--accent); font: inherit; font-size: 0.8rem; font-weight: 700; text-decoration: none; }
	a.slides-button:hover { background: var(--accent); color: white; }
	.slides-button:disabled { border-color: #aab2bd; color: #777f89; cursor: not-allowed; }
</style>
