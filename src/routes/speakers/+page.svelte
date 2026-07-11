<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { links } from '$lib/content.js';
	import { reveal } from '$lib/actions.js';

	const applyIcon = 'M7 17 17 7M9 7h8v8';
</script>

<svelte:head>
	<title>{$t.speakerPage.metaTitle}</title>
	<meta name="description" content={$t.speakerPage.metaDesc} />
</svelte:head>

<article class="speaker-page">
	<div class="container">
		<a class="back" href={`${base}/#top`}>
			<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M19 12H5M11 6l-6 6 6 6" />
			</svg>
			<span>{$t.speakerPage.back}</span>
		</a>

		<!-- Page header -->
		<header class="sp-head reveal" use:reveal>
			<span class="kicker">{$t.speakerPage.kicker}</span>
			<h1 class="sp-title">{$t.speakerPage.title}</h1>
			<p class="sp-intro">{$t.speakerPage.intro}</p>

			<div class="sp-meta">
				<span class="date-chip">
					<span class="date-label">{$t.speakerPage.dateLabel}</span>
					<span class="date-value">{$t.speakerPage.date}</span>
				</span>
				<a class="btn btn-primary" href={links.cfp} target="_blank" rel="noopener noreferrer">
					{$t.speakerPage.applyCta}
					<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d={applyIcon} />
					</svg>
				</a>
			</div>
			<p class="apply-note">{$t.speakerPage.applyNote}</p>
		</header>

		<!-- Levels -->
		<section class="block reveal" use:reveal={{ delay: 80 }}>
			<h2 class="block-title">{$t.speakerPage.levelsTitle}</h2>
			<ul class="levels">
				{#each $t.speakerPage.levels as level, i (level.name)}
					<li class="level-card">
						<span class="level-no">0{i + 1}</span>
						<h3 class="level-name">{level.name}</h3>
						<p class="level-desc">{level.desc}</p>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Categories -->
		<section class="block reveal" use:reveal={{ delay: 80 }}>
			<h2 class="block-title">{$t.speakerPage.categoriesTitle}</h2>
			<ul class="cats">
				{#each $t.speakerPage.categories as cat, i (cat)}
					<li class="cat">
						<span class="cat-no">{i + 1}</span>
						<span>{cat}</span>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Submit checklist + Perks -->
		<div class="two-col">
			<section class="block card-block reveal" use:reveal={{ delay: 80 }}>
				<h2 class="block-title">{$t.speakerPage.submitTitle}</h2>
				<ul class="checklist">
					{#each $t.speakerPage.submitItems as item (item)}
						<li>
							<svg class="tick" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M20 6 9 17l-5-5" />
							</svg>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="block card-block accent-block reveal" use:reveal={{ delay: 160 }}>
				<h2 class="block-title">{$t.speakerPage.perksTitle}</h2>
				<ul class="checklist">
					{#each $t.speakerPage.perks as perk (perk)}
						<li>
							<svg class="tick" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M20 6 9 17l-5-5" />
							</svg>
							<span>{perk}</span>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<!-- Final CTA -->
		<div class="final reveal" use:reveal={{ delay: 80 }}>
			<h2 class="final-title">{$t.cfp.title}</h2>
			<a class="btn btn-primary final-btn" href={links.cfp} target="_blank" rel="noopener noreferrer">
				{$t.speakerPage.applyCta}
				<svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d={applyIcon} />
				</svg>
			</a>
			<a class="back-home" href={`${base}/#top`}>{$t.speakerPage.back}</a>
		</div>
	</div>
</article>

<style>
	.speaker-page {
		position: relative;
		padding-top: calc(var(--header-h) + clamp(2.5rem, 7vw, 5rem));
		padding-bottom: var(--section-y);
		overflow: hidden;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: var(--text-muted);
		margin-bottom: 2rem;
		transition:
			color 0.2s var(--ease),
			gap 0.2s var(--ease);
	}
	.back:hover {
		color: var(--text);
		gap: 0.75rem;
	}

	/* --- Header --- */
	.sp-head {
		max-width: 60ch;
	}
	.sp-title {
		margin-top: 0.9rem;
		font-size: var(--fs-h2);
		color: var(--gradient-text);
	}
	.sp-intro {
		margin-top: 1.25rem;
		font-size: var(--fs-lead);
		color: var(--text-muted);
	}
	.sp-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}
	.date-chip {
		display: inline-flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.6rem 1.1rem;
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--card);
	}
	.date-label {
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-dim);
	}
	.date-value {
		font-weight: 700;
		color: var(--text);
	}
	.apply-note {
		margin-top: 0.85rem;
		font-size: 0.82rem;
		color: var(--text-dim);
	}

	/* --- Blocks --- */
	.block {
		margin-top: clamp(3rem, 7vw, 4.5rem);
	}
	.block-title {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.4rem;
	}

	/* Levels */
	.levels {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 1rem;
	}
	.level-card {
		position: relative;
		padding: 1.5rem;
		border-radius: var(--r-lg);
		border: 1px solid var(--border);
		background: var(--card);
		transition:
			transform 0.25s var(--ease),
			border-color 0.25s var(--ease);
	}
	.level-card:hover {
		transform: translateY(-3px);
		border-color: var(--border-strong);
	}
	.level-no {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-dim);
	}
	.level-name {
		margin-top: 0.5rem;
		font-size: 1.2rem;
		color: var(--text);
	}
	.level-desc {
		margin-top: 0.5rem;
		font-size: 0.92rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	/* Categories */
	.cats {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 0.6rem;
	}
	.cat {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.85rem 1.1rem;
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--card);
		color: var(--text);
		font-size: 0.95rem;
		transition:
			border-color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.cat:hover {
		border-color: var(--border-strong);
		background: var(--card-hover);
	}
	.cat-no {
		flex: none;
		display: grid;
		place-items: center;
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--accent);
		background: var(--gradient-brand-soft);
		border: 1px solid var(--border-strong);
	}

	/* Submit + Perks */
	.two-col {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: clamp(3rem, 7vw, 4.5rem);
	}
	@media (min-width: 760px) {
		.two-col {
			grid-template-columns: 1fr 1fr;
		}
	}
	.card-block {
		margin-top: 0;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--border);
		background: var(--card);
	}
	.accent-block {
		background: var(--gradient-brand-soft);
		border-color: var(--border-strong);
	}
	.checklist {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.checklist li {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
	.checklist .tick {
		flex: none;
		margin-top: 0.2em;
		color: var(--accent);
	}

	/* Final CTA */
	.final {
		margin-top: clamp(3.5rem, 8vw, 5.5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.25rem;
		padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3rem);
		border-radius: var(--r-lg);
		border: 1px solid var(--border-strong);
		background: var(--bg-elevated);
	}
	.final-title {
		font-size: var(--fs-h3);
		max-width: 22ch;
	}
	.final-btn {
		padding-inline: 2rem;
		font-size: 1.05rem;
	}
	.back-home {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-dim);
		transition: color 0.2s var(--ease);
	}
	.back-home:hover {
		color: var(--text);
	}
</style>
