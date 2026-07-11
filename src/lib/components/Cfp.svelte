<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
</script>

<section id="speakers" class="section">
	<div class="container">
		<div class="panel reveal" use:reveal>
			<div class="panel-inner">
				<!-- Left: copy -->
				<div class="copy">
					<header class="reveal" use:reveal={{ delay: 80 }}>
						<span class="kicker">{$t.cfp.kicker}</span>
						<h2 class="section-title">{$t.cfp.title}</h2>
					</header>

					<p class="body reveal" use:reveal={{ delay: 160 }}>{$t.cfp.body}</p>

					<ul class="perks reveal" use:reveal={{ delay: 240 }}>
						{#each $t.cfp.perks as perk}
							<li class="perk">
								<span class="perk-icon" aria-hidden="true">
									<svg
										viewBox="0 0 24 24"
										width="1em"
										height="1em"
										fill="none"
										stroke="currentColor"
										stroke-width="2.2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<circle cx="12" cy="12" r="9" />
										<path d="M8.5 12.2l2.4 2.4 4.6-4.9" />
									</svg>
								</span>
								<span class="perk-text">{perk}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Right: action -->
				<div class="action reveal" use:reveal={{ delay: 200 }}>
					<div class="meta">
						<span class="meta-label">{$t.cfp.deadlineLabel}</span>
						<span class="meta-value">{$t.cfp.deadline}</span>
					</div>

					<a class="btn btn-primary apply" href={`${base}/speakers`}>
						<span>{$t.cfp.cta}</span>
						<svg
							viewBox="0 0 24 24"
							width="1.15em"
							height="1.15em"
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

					<p class="cta-note">{$t.cfp.ctaNote}</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.panel {
		position: relative;
		border-radius: var(--r-lg);
		border: 1px solid var(--border-strong);
		background: var(--bg-elevated);
		overflow: hidden;
		isolation: isolate;
	}

	.panel-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		padding: clamp(1.75rem, 5vw, 3.75rem);
	}

	@media (min-width: 860px) {
		.panel-inner {
			grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
			align-items: center;
		}
	}

	.copy {
		min-width: 0;
	}

	.copy .section-title {
		max-width: 18ch;
	}

	.body {
		color: var(--text-muted);
		font-size: var(--fs-lead);
		margin-top: 1.25rem;
		max-width: 52ch;
	}

	/* --- Perks list --- */
	.perks {
		list-style: none;
		padding: 0;
		margin-top: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}
	.perk {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}
	.perk-icon {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5em;
		height: 1.5em;
		font-size: 1.05rem;
		color: var(--accent);
		margin-top: 0.05em;
	}
	.perk-text {
		color: var(--text);
		font-weight: 500;
	}

	/* --- Action column --- */
	.action {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.15rem;
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--white);
	}

	@media (min-width: 860px) {
		.action {
			align-items: stretch;
			text-align: left;
		}
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.meta-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-dim);
	}
	.meta-value {
		font-weight: 700;
		font-size: 1.05rem;
		line-height: 1.35;
		color: var(--text);
	}

	.apply {
		width: 100%;
		padding-block: 1.05rem;
		font-size: 1.05rem;
	}
	.apply svg {
		transition: transform 0.25s var(--ease);
	}
	.apply:hover svg {
		transform: translateX(3px);
	}

	.cta-note {
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	@media (min-width: 860px) {
		.cta-note {
			text-align: center;
		}
	}
</style>
