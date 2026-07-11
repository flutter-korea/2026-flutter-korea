<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
	import ComingSoon from './ComingSoon.svelte';
</script>

<section id="sessions" class="section">
	<div class="container">
		<header class="reveal">
			<span class="kicker">{$t.sessions.kicker}</span>
			<h2 class="section-title">{$t.sessions.title}</h2>
			<p class="section-lead">{$t.sessions.lead}</p>
		</header>

		<div class="cs-wrap reveal" use:reveal={{ delay: 80 }}>
			<ComingSoon
				badge={$t.sessions.comingSoon.badge}
				title={$t.sessions.comingSoon.title}
				body={$t.sessions.comingSoon.body}
				cta={{ label: $t.sessions.cta, href: `${base}/speakers` }}
			/>
		</div>

		<!-- Confirmed program element -->
		<article class="fireside reveal" use:reveal={{ delay: 140 }}>
			<div class="fs-head">
				<span class="fs-badge">
					<span class="fs-dot" aria-hidden="true"></span>
					{$t.sessions.mentoring.badge}
				</span>
			</div>
			<h3 class="fs-title">{$t.sessions.mentoring.title}</h3>
			<p class="fs-body">{$t.sessions.mentoring.body}</p>
			<ul class="fs-tags">
				{#each $t.sessions.mentoring.tags as tag (tag)}
					<li class="chip">{tag}</li>
				{/each}
			</ul>
		</article>
	</div>
</section>

<style>
	header {
		margin-bottom: 2.5rem;
	}
	.cs-wrap {
		margin-bottom: 1.5rem;
	}

	.fireside {
		position: relative;
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--border-strong);
		background: var(--gradient-brand-soft);
		overflow: hidden;
	}
	.fs-head {
		margin-bottom: 1.1rem;
	}
	.fs-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.08em;
		color: var(--accent);
		padding: 0.35rem 0.85rem;
		border-radius: var(--r-full);
		border: 1px solid var(--border-strong);
		background: rgba(6, 18, 31, 0.35);
	}
	.fs-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 var(--glow);
		animation: pulse-ring 2.4s ease-out infinite;
	}
	.fs-title {
		font-size: var(--fs-h3);
		max-width: 26ch;
	}
	.fs-body {
		margin-top: 0.9rem;
		max-width: 60ch;
		color: var(--text-muted);
	}
	.fs-tags {
		list-style: none;
		padding: 0;
		margin-top: 1.4rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}
</style>
