<script>
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n.js';

	// Event start: 2026-11-07 11:00 KST — encoded with an explicit offset so it
	// evaluates identically regardless of the visitor's local timezone.
	const EVENT_START = new Date('2026-11-07T11:00:00+09:00').getTime();
	const EVENT_END = new Date('2026-11-07T18:00:00+09:00').getTime();

	let mounted = $state(false);
	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let phase = $state('before'); // 'before' | 'live' | 'done'

	function tick() {
		const now = Date.now();
		if (now >= EVENT_END) {
			phase = 'done';
			return;
		}
		if (now >= EVENT_START) {
			phase = 'live';
			return;
		}
		phase = 'before';
		const diff = EVENT_START - now;
		days = Math.floor(diff / 86_400_000);
		hours = Math.floor((diff % 86_400_000) / 3_600_000);
		minutes = Math.floor((diff % 3_600_000) / 60_000);
		seconds = Math.floor((diff % 60_000) / 1000);
	}

	onMount(() => {
		mounted = true;
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	/** @param {number} n */
	const pad = (n) => String(n).padStart(2, '0');
</script>

<div class="countdown" role="timer" aria-live="off">
	<span class="cd-label">{$t.countdown.label}</span>

	{#if !mounted || phase === 'before'}
		<div class="cd-grid">
			<div class="cd-cell">
				<span class="cd-num">{mounted ? pad(days) : '--'}</span>
				<span class="cd-unit">{$t.countdown.units.days}</span>
			</div>
			<span class="cd-colon" aria-hidden="true">:</span>
			<div class="cd-cell">
				<span class="cd-num">{mounted ? pad(hours) : '--'}</span>
				<span class="cd-unit">{$t.countdown.units.hours}</span>
			</div>
			<span class="cd-colon" aria-hidden="true">:</span>
			<div class="cd-cell">
				<span class="cd-num">{mounted ? pad(minutes) : '--'}</span>
				<span class="cd-unit">{$t.countdown.units.minutes}</span>
			</div>
			<span class="cd-colon" aria-hidden="true">:</span>
			<div class="cd-cell">
				<span class="cd-num">{mounted ? pad(seconds) : '--'}</span>
				<span class="cd-unit">{$t.countdown.units.seconds}</span>
			</div>
		</div>
	{:else if phase === 'live'}
		<p class="cd-status">
			<span class="cd-pulse" aria-hidden="true"></span>
			{$t.countdown.live}
		</p>
	{:else}
		<p class="cd-status">{$t.countdown.done}</p>
	{/if}
</div>

<style>
	.countdown {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
	}
	.cd-label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.72);
	}
	.cd-grid {
		/* Digits and colons share one size + baseline, so they render exactly
		   like a single line of mono text — no optical nudging needed. */
		--cd-num-size: clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem);
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
	}
	.cd-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 2.8ch;
	}
	.cd-num {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-weight: 700;
		font-size: var(--cd-num-size);
		color: var(--white);
		line-height: 1;
	}
	.cd-unit {
		margin-top: 0.35rem;
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.68);
		letter-spacing: 0.02em;
	}
	.cd-colon {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: var(--cd-num-size);
		line-height: 1;
		color: rgba(255, 255, 255, 0.4);
	}
	.cd-status {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--white);
	}
	.cd-pulse {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
		animation: cd-pulse 1.8s ease-out infinite;
	}
	@keyframes cd-pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cd-pulse {
			animation: none;
		}
	}
</style>
