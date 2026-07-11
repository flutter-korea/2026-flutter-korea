<script>
	import { t } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
</script>

<section id="about" class="section about">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.about.kicker}</span>
			<h2 class="section-title">{$t.about.title}</h2>
		</header>

		<!-- Narrative column: 3 paragraphs, first slightly lead-like -->
		<div class="narrative reveal" use:reveal={{ delay: 80 }}>
			{#each $t.about.paragraphs as para, i}
				<p class:lede={i === 0}>{para}</p>
			{/each}
		</div>

		<!-- Two paired compass cards -->
		<div class="compasses reveal" use:reveal={{ delay: 160 }}>
			{#each $t.about.compasses as compass, i}
				<article class="compass" class:forward={i === 1}>
					<div class="compass-grid" aria-hidden="true"></div>

					<div class="compass-top">
						<span class="compass-tag">{compass.tag}</span>
						<span class="compass-icon" aria-hidden="true">
							{#if i === 0}
								<!-- Back to Basics: blueprint / compass-draft -->
								<svg
									viewBox="0 0 24 24"
									width="1.4em"
									height="1.4em"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="9" />
									<path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
									<path d="m14.5 9.5-2.5 6-2.5-6" />
									<circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
								</svg>
							{:else}
								<!-- Move Forward: arrow up-right / forward motion -->
								<svg
									viewBox="0 0 24 24"
									width="1.4em"
									height="1.4em"
									fill="none"
									stroke="currentColor"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M7 17 17 7" />
									<path d="M9 7h8v8" />
									<path d="M3 20h4M3 15h2" opacity="0.55" />
								</svg>
							{/if}
						</span>
					</div>

					<h3 class="compass-title">{compass.title}</h3>
					<span class="compass-subtitle">{compass.subtitle}</span>
					<p class="compass-body">{compass.body}</p>
				</article>
			{/each}
		</div>

		<!-- Closing pull-quote -->
		<blockquote class="closing reveal" use:reveal={{ delay: 120 }}>
			<p>{$t.about.closing}</p>
		</blockquote>
	</div>
</section>

<style>
	.about {
		overflow: hidden;
	}

	/* --- Narrative -------------------------------------------------------- */
	.narrative {
		max-width: 64ch;
		margin-top: 2.75rem;
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}
	.narrative p {
		color: var(--text-muted);
		line-height: 1.75;
	}
	.narrative p.lede {
		font-size: var(--fs-lead);
		line-height: 1.6;
		color: var(--text);
	}

	/* --- Compass cards ---------------------------------------------------- */
	.compasses {
		margin-top: clamp(3rem, 6vw, 4.5rem);
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1.25rem, 3vw, 2rem);
	}

	.compass {
		position: relative;
		overflow: hidden;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		padding: clamp(1.75rem, 4vw, 2.75rem);
		backdrop-filter: blur(4px);
		transition:
			transform 0.3s var(--ease),
			border-color 0.3s var(--ease),
			box-shadow 0.3s var(--ease),
			background 0.3s var(--ease);
	}
	.compass:hover {
		transform: translateY(-4px);
		border-color: var(--border-strong);
		background: var(--card-hover);
		box-shadow: var(--shadow-card);
	}

	/* Gradient accent line that appears on hover along the top edge */
	.compass::before {
		content: '';
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
	.compass:hover::before {
		opacity: 1;
		transform: scaleX(1);
	}

	/* Decorative grid removed for a flat look */
	.compass-grid {
		display: none;
	}

	.compass-top {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	.compass-tag {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-dim);
	}
	.compass-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.9rem;
		height: 2.9rem;
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--accent);
		flex: none;
		transition:
			border-color 0.3s var(--ease),
			color 0.3s var(--ease),
			background 0.3s var(--ease);
	}
	.compass.forward .compass-icon {
		background: var(--gradient-brand-soft);
	}
	.compass:hover .compass-icon {
		border-color: var(--border-strong);
	}

	.compass-title {
		position: relative;
		font-size: var(--fs-h3);
		color: var(--text);
	}
	.compass-subtitle {
		position: relative;
		display: block;
		margin-top: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--accent);
	}
	.compass-body {
		position: relative;
		margin-top: 1.15rem;
		color: var(--text-muted);
		line-height: 1.7;
	}

	/* --- Closing pull-quote ----------------------------------------------- */
	.closing {
		margin-top: clamp(3.25rem, 7vw, 5rem);
		max-width: 52ch;
		margin-inline: auto;
		padding: 0.5rem 0 0.5rem clamp(1.25rem, 3vw, 2rem);
		border-left: 3px solid transparent;
		border-image: var(--gradient-brand) 1;
		text-align: left;
	}
	.closing p {
		font-size: clamp(1.35rem, 1rem + 1.6vw, 2rem);
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.02em;
		color: var(--text);
		text-wrap: balance;
	}

	/* --- Responsive ------------------------------------------------------- */
	@media (max-width: 720px) {
		.compasses {
			grid-template-columns: 1fr;
		}
	}
</style>
