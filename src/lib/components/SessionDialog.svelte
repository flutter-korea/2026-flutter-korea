<script>
	/** @type {{ details: { title: string; speaker?: string; org?: string; description?: string; time: string; track?: string } | null; lang?: string; onClose?: () => void }} */
	let { details = null, lang = 'ko', onClose = () => {} } = $props();
	/** @type {HTMLDialogElement | undefined} */
	let dialog;

	$effect(() => {
		if (!dialog) return;
		if (details && !dialog.open) dialog.showModal();
		else if (!details && dialog.open) dialog.close();
	});
</script>

<dialog bind:this={dialog} onclose={onClose} aria-label={lang === 'ko' ? '세션 상세 정보' : 'Session details'}>
	{#if details}
		<div class="dialog-head">
			<p class="time">{details.time}{details.track ? ` · ${details.track}` : ''}</p>
			<button type="button" class="close" onclick={() => dialog?.close()} aria-label={lang === 'ko' ? '닫기' : 'Close'}>×</button>
		</div>
		{#if details.speaker}<p class="speaker">{details.speaker}{details.org ? ` / ${details.org}` : ''}</p>{/if}
		<h2>{details.title}</h2>
		<p class="description">{details.description || (lang === 'ko' ? '세션 설명을 준비 중입니다.' : 'Session description coming soon.')}</p>
	{/if}
</dialog>

<style>
	dialog {
		width: min(40rem, calc(100vw - 2rem));
		max-height: min(80vh, 50rem);
		padding: clamp(1.3rem, 4vw, 2rem);
		border: 1px solid var(--border);
		border-radius: 1rem;
		background: var(--white);
		color: var(--ink);
		box-shadow: 0 24px 80px rgb(10 32 73 / 18%);
		overflow-y: auto;
	}
	dialog::backdrop { background: rgb(15 30 55 / 56%); }
	.dialog-head { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
	.time { color: var(--text-muted); font-size: 0.8rem; font-weight: 700; }
	.close { border: 0; background: transparent; color: var(--ink); font: inherit; font-size: 1.8rem; line-height: 1; cursor: pointer; }
	.speaker { margin-top: 1rem; color: var(--accent); font-weight: 700; }
	h2 { margin-top: 0.5rem; font-size: clamp(1.3rem, 4vw, 1.85rem); line-height: 1.35; word-break: keep-all; }
	.description { margin-top: 1.3rem; color: var(--text-muted); line-height: 1.7; white-space: pre-line; overflow-wrap: anywhere; }
</style>
