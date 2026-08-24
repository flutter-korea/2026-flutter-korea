<script>
	import { base } from '$app/paths';

	let { event, label } = $props();

	const labelLines = $derived(label.split('\n'));
</script>

{#if event.imagePending}
	<div class="event-thumbnail is-pending">
		<img
			class="pending-mark"
			src={`${base}/assets/flutter-seoul/dash-right.svg`}
			alt=""
			loading="lazy"
			aria-hidden="true"
		/>
		<span class="pending-text">
			{#each labelLines as line, index (`${line}-${index}`)}
				{line}{#if index < labelLines.length - 1}<br />{/if}
			{/each}
		</span>
	</div>
{:else}
	<img
		class="event-thumbnail"
		src={`${base}${event.image}`}
		alt={`${event.name} timetable preview`}
		loading="lazy"
	/>
{/if}

<style>
	.event-thumbnail {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.is-pending {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.65rem, 2vw, 0.9rem);
		padding: clamp(0.75rem, 2.4vw, 1rem);
		background: var(--paper);
		object-fit: initial;
	}

	.pending-mark {
		display: block;
		width: min(45%, 128px);
		max-height: 72%;
		object-fit: contain;
	}

	.pending-text {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: clamp(0.78rem, 1.8vw, 0.95rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		line-height: 1.45;
		text-align: left;
		white-space: nowrap;
	}
</style>
