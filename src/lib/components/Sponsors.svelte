<script>
	import { t } from '$lib/i18n.js';
	import { links } from '$lib/content.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
</script>

<section id="sponsors" class="section">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.sponsors.kicker}</span>
			<h2 class="section-title">{$t.sponsors.title}</h2>
			<p class="section-lead">{$t.sponsors.lead}</p>
		</header>

		<div class="sponsors-grid reveal" use:reveal={{ delay: 80 }}>
			{#each $t.sponsors.items as sponsor (sponsor.name)}
				<a
					class="sponsor-card card"
					href={sponsor.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${sponsor.name} (${sponsor.description})`}
				>
					<div class="logo-wrap">
						<img
							class="sponsor-logo"
							src={`${base}${sponsor.logo}`}
							alt={sponsor.name}
							loading="lazy"
						/>
					</div>
					<div class="sponsor-info">
						<div class="sponsor-head">
							<span class="sponsor-name">{sponsor.name}</span>
							<span class="ext-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M7 17L17 7" />
									<path d="M7 7h10v10" />
								</svg>
							</span>
						</div>
						<p class="sponsor-desc">{sponsor.description}</p>
					</div>
				</a>
			{/each}
		</div>

		<div class="sponsor-cta reveal" use:reveal={{ delay: 160 }}>
			<div class="cta-copy">
				<h3 class="cta-title">{$t.sponsors.ctaTitle}</h3>
				<p class="cta-body">{$t.sponsors.ctaBody}</p>
			</div>
			<a class="btn btn-primary" href={links.email}>
				{$t.sponsors.cta}
				<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M4 6h16v12H4zM4 7l8 6 8-6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	header {
		margin-bottom: 2.5rem;
	}

	.sponsors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: clamp(1rem, 2.5vw, 1.5rem);
		margin-bottom: 2rem;
	}

	.sponsor-card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: clamp(1.75rem, 3.5vw, 2.25rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--border);
		background: var(--card);
		text-decoration: none;
		overflow: hidden;
		transition:
			transform 0.3s var(--ease),
			border-color 0.3s var(--ease),
			box-shadow 0.3s var(--ease),
			background 0.3s var(--ease);
	}

	.sponsor-card::before {
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

	.sponsor-card:hover {
		transform: translateY(-4px);
		border-color: var(--border-strong);
		background: var(--card-hover);
		box-shadow: var(--shadow-card);
	}

	.sponsor-card:hover::before {
		opacity: 1;
		transform: scaleX(1);
	}

	.logo-wrap {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 56px;
		margin-bottom: 1.25rem;
	}

	.sponsor-logo {
		max-height: 48px;
		max-width: 180px;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.sponsor-info {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.sponsor-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.sponsor-name {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.ext-icon {
		display: inline-flex;
		align-items: center;
		color: var(--text-muted);
		font-size: 0.95rem;
		transition:
			color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}

	.sponsor-card:hover .ext-icon {
		color: var(--accent);
		transform: translate(2px, -2px);
	}

	.sponsor-desc {
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.sponsor-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: clamp(1.75rem, 4vw, 2.5rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--border);
		background: var(--gradient-brand-soft);
	}

	.cta-title {
		font-size: var(--fs-h3);
	}

	.cta-body {
		margin-top: 0.6rem;
		max-width: 52ch;
		color: var(--text-muted);
	}

	.sponsor-cta .btn {
		flex-shrink: 0;
	}
</style>
