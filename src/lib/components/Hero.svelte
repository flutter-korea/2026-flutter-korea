<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Countdown from './Countdown.svelte';

	// Gate the staggered entrance behind a mount flag so the server-rendered
	// markup stays in its resting state and reduced-motion (handled globally)
	// is respected. The CSS keyframes only kick in once `entered` is true.
	let entered = $state(false);
	let px = $state(0);
	let py = $state(0);

	onMount(() => {
		entered = true;

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isDesktop = matchMedia('(min-width: 900px)').matches;
		if (reduce || !isDesktop) return;

		/** @param {PointerEvent} e */
		const onMove = (e) => {
			px = (e.clientX / window.innerWidth - 0.5) * 2;
			py = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener('pointermove', onMove, { passive: true });
		return () => window.removeEventListener('pointermove', onMove);
	});
</script>

<section id="top" class="hero" class:entered>
	<!-- Decorative facet shapes, echoing Flutter's origami-fold mark. -->
	<div class="facets" aria-hidden="true" style="--px: {px}; --py: {py}">
		<span class="facet f1"></span>
		<span class="facet f2"></span>
		<span class="facet f3"></span>
	</div>

	<div class="container inner">
		<div class="copy">
			<span class="chip badge stagger" style="--i: 0">
				<span class="dot" aria-hidden="true"></span>
				{$t.hero.badge}
			</span>

			<h1 class="headline">
				<span class="line stagger" style="--i: 1">{$t.hero.sloganTop}</span>
				<span class="line accent-line stagger" style="--i: 2">{$t.hero.sloganBottom}</span>
			</h1>

			<p class="subtitle stagger" style="--i: 3">{$t.hero.subtitle}</p>
			<p class="description stagger" style="--i: 4">{$t.hero.description}</p>

			<div class="ctas stagger" style="--i: 5">
				<a class="btn btn-on-gradient" href={`${base}/speakers`}>
					{$t.hero.ctaPrimary}
					<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M5 12h14" />
						<path d="m13 6 6 6-6 6" />
					</svg>
				</a>
				<a class="btn btn-outline-on-gradient" href="#about">
					{$t.hero.ctaSecondary}
					<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 5v14" />
						<path d="m6 13 6 6 6-6" />
					</svg>
				</a>
			</div>

			<dl class="facts stagger" style="--i: 6">
				{#each $t.hero.facts.slice(1) as fact (fact.label)}
					<div class="fact">
						<dt>{fact.label}</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="cd-panel stagger" style="--i: 4">
			<Countdown />
		</div>
	</div>

	<a class="scroll-hint" href="#overview" aria-label={$t.hero.scroll}>
		<span class="scroll-text">{$t.hero.scroll}</span>
		<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="m6 9 6 6 6-6" />
		</svg>
	</a>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 640px;
		padding-block: clamp(3.5rem, 8vh, 6rem) clamp(4rem, 9vh, 6.5rem);
		overflow: hidden;
		isolation: isolate;
		background: var(--gradient-hero);
		color: var(--white);
	}

	/* --- Decorative facets --------------------------------------------------- */
	.facets {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}
	.facet {
		position: absolute;
		opacity: 0.16;
		background: var(--white);
		transition: transform 0.2s linear;
	}
	.f1 {
		width: 62rem;
		height: 62rem;
		top: -30rem;
		right: -22rem;
		clip-path: polygon(30% 0%, 100% 20%, 78% 100%, 0% 62%);
		opacity: 0.08;
		transform: translate(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -10px));
	}
	.f2 {
		width: 30rem;
		height: 30rem;
		bottom: -14rem;
		left: -10rem;
		clip-path: polygon(20% 0%, 100% 12%, 84% 100%, 0% 80%);
		opacity: 0.1;
		transform: translate(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 14px));
	}
	.f3 {
		width: 16rem;
		height: 16rem;
		top: 12%;
		right: 8%;
		clip-path: polygon(35% 0%, 100% 30%, 65% 100%, 0% 70%);
		opacity: 0.14;
		transform: translate(calc(var(--px, 0) * 22px), calc(var(--py, 0) * 22px));
	}

	/* --- Foreground layout ---------------------------------------------------- */
	.inner {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}
	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}

	.badge {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.28);
		color: var(--white);
	}
	.badge .dot {
		width: 0.42rem;
		height: 0.42rem;
		border-radius: var(--r-full);
		background: var(--white);
	}

	.headline {
		margin-top: 1.5rem;
		font-size: var(--fs-display);
		font-weight: 800;
		line-height: 1.02;
		letter-spacing: -0.03em;
		color: var(--white);
	}
	.line {
		display: block;
	}
	.accent-line {
		color: #bfe3fc;
	}

	.subtitle {
		margin-top: 1.6rem;
		max-width: 40ch;
		font-size: var(--fs-lead);
		font-weight: 600;
		color: var(--white);
		letter-spacing: -0.01em;
	}

	.description {
		margin-top: 1.05rem;
		max-width: 50ch;
		color: rgba(255, 255, 255, 0.8);
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
		gap: 0;
		margin-top: 2.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.22);
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
	.fact + .fact::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.15rem;
		bottom: 0.15rem;
		width: 1px;
		background: rgba(255, 255, 255, 0.22);
	}
	.fact dt {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.68);
	}
	.fact dd {
		font-weight: 700;
		font-size: 1.02rem;
		color: var(--white);
		letter-spacing: -0.01em;
	}

	/* --- Countdown panel ------------------------------------------------------ */
	.cd-panel {
		justify-self: stretch;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--r-lg);
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.24);
		backdrop-filter: blur(6px);
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
		color: rgba(255, 255, 255, 0.7);
		transition: color 0.25s var(--ease);
	}
	.scroll-hint:hover {
		color: var(--white);
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

	:global(.no-js) .stagger {
		opacity: 1;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.stagger {
			opacity: 1;
			transform: none;
		}
		.facet {
			transform: none !important;
		}
	}

	/* --- Responsive --------------------------------------------------------- */
	@media (min-width: 900px) {
		.inner {
			grid-template-columns: 1.15fr 0.85fr;
			gap: 4rem;
		}
	}

	@media (max-width: 640px) {
		.facts {
			gap: 0.9rem 0;
		}
		.fact {
			flex: 1 1 45%;
			padding: 0.1rem 1rem;
		}
		.fact:nth-child(odd) {
			padding-left: 0;
		}
		.fact::before {
			display: none;
		}
		.fact:nth-child(even)::before {
			display: block;
		}
	}
</style>
