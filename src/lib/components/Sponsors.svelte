<script>
	import { t } from '$lib/i18n.js';
	import { links } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';
	import ComingSoon from './ComingSoon.svelte';
</script>

<section id="sponsors" class="section">
	<div class="container">
		<header class="reveal" use:reveal>
			<span class="kicker">{$t.sponsors.kicker}</span>
			<h2 class="section-title">{$t.sponsors.title}</h2>
			<p class="section-lead">{$t.sponsors.lead}</p>
		</header>

		<div class="cs-wrap reveal" use:reveal={{ delay: 80 }}>
			<ComingSoon
				badge={$t.sponsors.comingSoon.badge}
				title={$t.sponsors.comingSoon.title}
				body={$t.sponsors.comingSoon.body}
			/>
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
	.cs-wrap {
		margin-bottom: 1.5rem;
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
