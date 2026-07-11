<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
	import { links } from '$lib/content.js';
</script>

<footer class="site-footer">
	<div class="container">
		<div class="cols">
			<!-- Brand block -->
			<div class="brand-col reveal" use:reveal>
				<a class="brand" href={`${base}/#top`} aria-label={$t.footer.org}>
					<span class="mark" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true">
							<path d="M13.9 3 6.4 10.5l2.4 2.4L18.7 3H13.9Z" fill="#fff" opacity="0.95" />
							<path
								d="M13.9 11.3 9.7 15.5l4.2 4.2h4.8l-4.2-4.2 4.2-4.2h-4.8Z"
								fill="#06121f"
								opacity="0.55"
							/>
						</svg>
					</span>
					<span class="brand-meta">
						<span class="made-by">{$t.footer.madeBy}</span>
						<span class="org">{$t.footer.org}</span>
					</span>
				</a>
				<p class="tagline">{$t.footer.tagline}</p>
			</div>

			<!-- Navigate column -->
			<nav class="link-col reveal" use:reveal={{ delay: 80 }} aria-label={$t.footer.nav}>
				<h2 class="col-title">{$t.footer.nav}</h2>
				<ul class="link-list">
					{#each $t.nav.links as link (link.id)}
						<li><a href={`${base}/#${link.id}`}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Connect column -->
			<div class="link-col reveal" use:reveal={{ delay: 160 }}>
				<h2 class="col-title">{$t.footer.connect}</h2>
				<ul class="link-list">
					<li>
						<a href={`${base}/speakers`}>{$t.footer.speakers}</a>
					</li>
					<li>
						<a href={`${base}/#tickets`}>{$t.tickets.title}</a>
					</li>
					<li>
						<a href={links.meetup} target="_blank" rel="noopener noreferrer" class="ext">
							<span>Meetup</span>
							<svg
								viewBox="0 0 24 24"
								width="0.85em"
								height="0.85em"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M7 17 17 7" />
								<path d="M8 7h9v9" />
							</svg>
						</a>
					</li>
					<li>
						<a href={links.discord} target="_blank" rel="noopener noreferrer" class="ext">
							<span>Discord</span>
							<svg
								viewBox="0 0 24 24"
								width="0.85em"
								height="0.85em"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M7 17 17 7" />
								<path d="M8 7h9v9" />
							</svg>
						</a>
					</li>
					<li>
						<a href={links.email}>Contact</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="bottom reveal" use:reveal={{ delay: 240 }}>
			<div class="bottom-row">
				<p class="rights">{$t.footer.rights}</p>
				<a class="to-top" href={`${base}/#top`}>
					<span>{$t.footer.backToTop}</span>
					<svg
						viewBox="0 0 24 24"
						width="1em"
						height="1em"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 19V5" />
						<path d="m6 11 6-6 6 6" />
					</svg>
				</a>
			</div>
			<p class="trademark">{$t.footer.trademark}</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
		padding-block: clamp(3rem, 7vw, 5rem) 2.25rem;
		background: transparent;
	}

	/* --- Columns --- */
	.cols {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.75rem 2rem;
	}

	/* --- Brand block --- */
	.brand-col {
		max-width: 40ch;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
	}
	.mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		font-size: 22px;
		border-radius: 10px;
		background: var(--gradient-brand);
		box-shadow: 0 6px 18px -8px var(--glow);
		flex-shrink: 0;
		transition: box-shadow 0.25s var(--ease);
	}
	.brand:hover .mark {
		box-shadow: 0 8px 22px -8px var(--glow);
	}
	.brand-meta {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
		min-width: 0;
	}
	.made-by {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-dim);
	}
	.org {
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		color: var(--text);
	}
	.tagline {
		margin-top: 1.1rem;
		color: var(--text-muted);
		font-size: 0.96rem;
		line-height: 1.6;
	}

	/* --- Link columns --- */
	.col-title {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-dim);
		margin-bottom: 1.1rem;
	}
	.link-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.link-list a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0;
		color: var(--text-muted);
		font-size: 0.95rem;
		width: fit-content;
		max-width: 100%;
		transition:
			color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}
	.link-list a:hover {
		color: var(--text);
		transform: translateX(3px);
	}
	.link-list a.ext svg {
		color: var(--text-dim);
		flex-shrink: 0;
		transition:
			color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}
	.link-list a.ext:hover svg {
		color: var(--accent);
		transform: translate(1px, -1px);
	}

	/* --- Bottom bar --- */
	.bottom {
		margin-top: clamp(2.5rem, 6vw, 4rem);
		padding-top: 1.75rem;
		border-top: 1px solid var(--border);
	}
	.bottom-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.9rem 1.5rem;
	}
	.rights {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: var(--text-muted);
	}
	.to-top {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.9rem;
		border-radius: var(--r-full);
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.to-top:hover {
		color: var(--text);
		border-color: var(--border-strong);
		background: var(--card-hover);
	}
	.to-top:hover svg {
		transform: translateY(-2px);
	}
	.to-top svg {
		transition: transform 0.2s var(--ease);
	}
	.trademark {
		margin-top: 1.25rem;
		max-width: 78ch;
		color: var(--text-dim);
		font-size: 0.78rem;
		line-height: 1.55;
	}

	/* --- Breakpoints --- */
	@media (min-width: 560px) {
		.cols {
			grid-template-columns: 1.4fr 1fr 1fr;
			gap: 2rem;
		}
		.brand-col {
			grid-column: 1;
		}
	}
	@media (min-width: 880px) {
		.cols {
			grid-template-columns: 2fr 1fr 1fr;
			gap: 3rem;
		}
	}
</style>
