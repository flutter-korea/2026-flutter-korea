<script>
	import { t } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="overview" class="section">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.overview.kicker}</span>
			<h2 class="section-title">{$t.overview.title}</h2>
			<p class="section-lead">{$t.overview.lead}</p>
		</header>

		<ul class="stats">
			{#each $t.overview.stats as stat, i}
				<li class="stat card reveal" use:reveal={{ delay: 80 + i * 80 }}>
					<span class="stat-accent" aria-hidden="true"></span>
					<span class="stat-label">{stat.label}</span>
					<span class="stat-value">
						<span class="stat-num gradient-text">{stat.value}</span>
						{#if stat.unit}
							<span class="stat-unit">{stat.unit}</span>
						{/if}
					</span>
					<span class="stat-note">{stat.note}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.stats {
		list-style: none;
		padding: 0;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		display: grid;
		/* 1 → 2 → 4 columns only: with 4 cards, a 3-column state would strand
		   the last card alone on a second row. */
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.4vw, 1.5rem);
	}
	@media (min-width: 640px) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.stats {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.stat {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: clamp(1.5rem, 3vw, 2rem);
		transition:
			transform 0.3s var(--ease),
			border-color 0.3s var(--ease),
			background 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	/* Gradient accent line on hover along the top edge — same treatment as
	   the About section's compass cards. */
	.stat-accent {
		position: absolute;
		inset: 0 0 auto 0;
		height: 2px;
		background: var(--gradient-brand);
		opacity: 0;
		transform: scaleX(0.35);
		transform-origin: left;
		transition:
			opacity 0.3s var(--ease),
			transform 0.4s var(--ease);
	}

	.stat:hover {
		transform: translateY(-4px);
		border-color: var(--border-strong);
		background: var(--card-hover);
		box-shadow: var(--shadow-card);
	}
	.stat:hover .stat-accent {
		opacity: 1;
		transform: scaleX(1);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-dim);
	}

	.stat-value {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem;
		line-height: 1.05;
	}

	.stat-num {
		font-weight: 800;
		font-size: clamp(2.4rem, 1.8rem + 2.6vw, 3.4rem);
		letter-spacing: -0.03em;
	}

	.stat-unit {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text-muted);
		letter-spacing: -0.01em;
	}

	.stat-note {
		margin-top: auto;
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
