<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	// Gate the staggered entrance behind a mount flag so the server-rendered
	// markup stays in its resting state and reduced-motion (handled globally)
	// is respected. The CSS keyframes only kick in once `entered` is true.
	let entered = $state(false);
	onMount(() => {
		entered = true;
	});
</script>

<section id="top" class="hero" class:entered>
	<!-- Decorative background: soft animated blobs + faint blueprint grid. -->
	<div class="backdrop" aria-hidden="true">
		<span class="grid"></span>
		<span class="blob blob-a"></span>
		<span class="blob blob-b"></span>
		<span class="blob blob-c"></span>
	</div>

	<div class="container inner">
		<span class="chip badge stagger" style="--i: 0">
			<span class="dot" aria-hidden="true"></span>
			{$t.hero.badge}
		</span>

		<h1 class="headline">
			<span class="line stagger" style="--i: 1">{$t.hero.sloganTop}</span>
			<span class="line gradient-text stagger" style="--i: 2">{$t.hero.sloganBottom}</span>
		</h1>

		<p class="subtitle stagger" style="--i: 3">{$t.hero.subtitle}</p>
		<p class="description stagger" style="--i: 4">{$t.hero.description}</p>

		<div class="ctas stagger" style="--i: 5">
			<a class="btn btn-primary" href={`${base}/speakers`}>
				{$t.hero.ctaPrimary}
				<svg
					viewBox="0 0 24 24"
					width="1.1em"
					height="1.1em"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M5 12h14" />
					<path d="m13 6 6 6-6 6" />
				</svg>
			</a>
			<a class="btn btn-ghost" href="#about">
				{$t.hero.ctaSecondary}
				<svg
					viewBox="0 0 24 24"
					width="1em"
					height="1em"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M12 5v14" />
					<path d="m6 13 6 6 6-6" />
				</svg>
			</a>
		</div>

		<dl class="facts stagger" style="--i: 6">
			{#each $t.hero.facts as fact (fact.label)}
				<div class="fact">
					<dt>{fact.label}</dt>
					<dd>{fact.value}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<a class="scroll-hint" href="#overview" aria-label={$t.hero.scroll}>
		<span class="scroll-text">{$t.hero.scroll}</span>
		<svg
			viewBox="0 0 24 24"
			width="1.1em"
			height="1.1em"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</a>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: calc(100svh - var(--header-h));
		padding-top: calc(var(--header-h) + clamp(2.5rem, 8vh, 6rem));
		padding-bottom: clamp(4rem, 10vh, 7rem);
		overflow: hidden;
		isolation: isolate;
	}

	/* --- Decorative backdrop ------------------------------------------------ */
	.backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		overflow: hidden;
	}

	.grid {
		position: absolute;
		inset: -2px;
		background-image:
			repeating-linear-gradient(
				to right,
				var(--border) 0 1px,
				transparent 1px 88px
			),
			repeating-linear-gradient(
				to bottom,
				var(--border) 0 1px,
				transparent 1px 88px
			);
		/* Fade the grid toward the edges so it stays subtle. */
		-webkit-mask-image: radial-gradient(120% 90% at 50% 30%, #000 0%, transparent 78%);
		mask-image: radial-gradient(120% 90% at 50% 30%, #000 0%, transparent 78%);
		opacity: 0.55;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.5;
	}
	.blob-a {
		width: 34rem;
		height: 34rem;
		top: -10rem;
		right: -8rem;
		background: radial-gradient(circle, var(--flutter-blue), transparent 66%);
		opacity: 0.32;
		animation: drift 18s var(--ease) infinite;
	}
	.blob-b {
		width: 26rem;
		height: 26rem;
		bottom: -9rem;
		left: -7rem;
		background: radial-gradient(circle, var(--flutter-sky), transparent 66%);
		opacity: 0.24;
		animation: float 14s var(--ease) infinite;
	}
	.blob-c {
		width: 20rem;
		height: 20rem;
		top: 34%;
		left: 46%;
		background: radial-gradient(circle, var(--flutter-cyan), transparent 68%);
		opacity: 0.14;
		animation: drift 22s var(--ease) infinite reverse;
	}

	/* --- Foreground --------------------------------------------------------- */
	.inner {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.badge {
		--dur-in: 0.7s;
	}
	.badge .dot {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: var(--r-full);
		background: var(--accent);
		box-shadow: 0 0 0 3px rgba(84, 197, 248, 0.18);
	}

	.headline {
		margin-top: 1.5rem;
		font-size: var(--fs-display);
		font-weight: 800;
		line-height: 1.02;
		letter-spacing: -0.03em;
	}
	.line {
		display: block;
	}
	.line.gradient-text {
		/* Ensure descenders/gradient don't clip against tight leading. */
		padding-bottom: 0.06em;
	}

	.subtitle {
		margin-top: 1.6rem;
		max-width: 40ch;
		font-size: var(--fs-lead);
		font-weight: 600;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.description {
		margin-top: 1.05rem;
		max-width: 54ch;
		color: var(--text-muted);
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-top: 2.2rem;
	}

	/* --- Facts bar ---------------------------------------------------------- */
	.facts {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		gap: 0;
		margin-top: 3rem;
		padding-top: 1.6rem;
		border-top: 1px solid var(--border);
		width: 100%;
	}
	.fact {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.1rem 1.5rem;
		flex: 1 1 auto;
	}
	.fact:first-child {
		padding-left: 0;
	}
	/* Thin divider between items. */
	.fact + .fact::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.15rem;
		bottom: 0.15rem;
		width: 1px;
		background: var(--border);
	}
	.fact dt {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--text-dim);
	}
	.fact dd {
		font-weight: 700;
		font-size: 1.02rem;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	/* --- Scroll hint -------------------------------------------------------- */
	.scroll-hint {
		position: absolute;
		left: 50%;
		bottom: clamp(1rem, 3vh, 2rem);
		transform: translateX(-50%);
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		color: var(--text-dim);
		transition: color 0.25s var(--ease);
	}
	.scroll-hint:hover {
		color: var(--accent);
	}
	.scroll-text {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.24em;
	}
	.scroll-hint svg {
		animation: nudge 2s var(--ease) infinite;
	}

	@keyframes nudge {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.7;
		}
		50% {
			transform: translateY(5px);
			opacity: 1;
		}
	}

	/* --- Staggered entrance ------------------------------------------------- */
	/* Resting state (also the server-rendered / no-JS state). Only animates
	   after `.entered` is added on mount; global reduced-motion neutralizes it. */
	.stagger {
		opacity: 0;
		transform: translateY(18px);
	}
	.hero.entered .stagger {
		animation: rise 0.75s var(--ease) both;
		animation-delay: calc(var(--i) * 90ms);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	/* If JS never runs (server HTML with no hydration / .no-js), keep content
	   visible rather than permanently hidden. */
	:global(.no-js) .stagger {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.stagger {
			opacity: 1;
			transform: none;
		}
	}

	/* --- Responsive --------------------------------------------------------- */
	@media (max-width: 640px) {
		.facts {
			gap: 0.9rem 0;
		}
		.fact {
			flex: 1 1 45%;
			padding: 0.1rem 1rem;
		}
		/* 2-column wrap: items 1 & 3 sit in the left column. */
		.fact:nth-child(odd) {
			padding-left: 0;
		}
		/* Divider only before the right-column items (2 & 4). */
		.fact::before {
			display: none;
		}
		.fact:nth-child(even)::before {
			display: block;
		}
	}
</style>
