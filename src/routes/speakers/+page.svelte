<script>
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
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

		<header class="page-head reveal" use:reveal>
			<p class="brand">Flutter Korea 2026</p>
			<h1>{$t.speakerPage.title}</h1>
			<p class="intro">{$t.speakerPage.intro}</p>
			<div class="meta-row">
				<span class="date">{$t.speakerPage.dateLabel} · {$t.speakerPage.date}</span>
				<span class="status">{$t.speakerPage.closedLabel}</span>
			</div>
		</header>

		<section class="content-block reveal" use:reveal aria-labelledby="levels-title">
			<h2 id="levels-title" class="block-title">{$t.speakerPage.levelsTitle}</h2>
			<div class="level-grid">
				{#each $t.speakerPage.levels as level (level.name)}
					<article class="level-row">
						<h3>{level.name}</h3>
						<p>{level.desc}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="content-block reveal" use:reveal={{ delay: 80 }} aria-labelledby="categories-title">
			<h2 id="categories-title" class="block-title">{$t.speakerPage.categoriesTitle}</h2>
			<ol class="category-list">
				{#each $t.speakerPage.categories as category (category)}
					<li>{category}</li>
				{/each}
			</ol>
		</section>

		<div class="detail-grid reveal" use:reveal={{ delay: 80 }}>
			<section class="detail-block" aria-labelledby="submit-title">
				<h2 id="submit-title" class="block-title">{$t.speakerPage.submitTitle}</h2>
				<ul>
					{#each $t.speakerPage.submitItems as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</section>
			<section class="detail-block" aria-labelledby="perks-title">
				<h2 id="perks-title" class="block-title">{$t.speakerPage.perksTitle}</h2>
				<ul>
					{#each $t.speakerPage.perks as perk (perk)}
						<li>{perk}</li>
					{/each}
				</ul>
			</section>
		</div>

		<div class="page-end reveal" use:reveal={{ delay: 80 }}>
			<a class="btn btn-primary" href={`${base}/timetable/`}>
				{$t.speakerPage.timetableCta}
				<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</a>
		</div>
	</div>
</article>

<style>
	.speaker-page {
		padding: clamp(2.5rem, 7vw, 5rem) 0 var(--section-y);
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.5rem;
		color: var(--text-muted);
		font-size: 0.85rem;
		transition: color 0.2s var(--ease);
	}
	.back:hover {
		color: var(--accent);
	}
	.page-head {
		max-width: 62rem;
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}
	.brand {
		margin-bottom: 0.55rem;
		font-size: 1rem;
		font-weight: 750;
		color: var(--ink);
	}
	h1 {
		font-size: var(--fs-display);
		line-height: 1.08;
		color: var(--blue-500);
	}
	.intro {
		max-width: 58ch;
		margin-top: 1rem;
		color: var(--text-muted);
		font-size: var(--fs-lead);
		line-height: 1.55;
	}
	.meta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.25rem;
		font-size: 0.82rem;
	}
	.date,
	.status {
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: var(--r-full);
	}
	.date {
		color: var(--text-muted);
	}
	.status {
		color: var(--blue-700);
		font-weight: 700;
	}
	.content-block {
		margin-top: clamp(2.5rem, 5vw, 3.75rem);
	}
	.block-title {
		margin-bottom: 1rem;
		font-size: 1.2rem;
		font-weight: 750;
		color: var(--blue-700);
	}
	.level-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		gap: 0.75rem;
	}
	.level-row {
		padding: 1.15rem 1.25rem;
		border: 1px solid var(--border);
		border-radius: var(--r-sm);
		background: var(--white);
	}
	.level-row h3 {
		font-size: 1.12rem;
		color: var(--blue-700);
	}
	.level-row p {
		margin-top: 0.35rem;
		color: var(--text-muted);
		font-size: 0.92rem;
	}
	.category-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: 0.5rem 1rem;
		padding: 0;
		list-style: none;
		counter-reset: category;
	}
	.category-list li {
		counter-increment: category;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		min-height: 3rem;
		padding: 0.65rem 0.8rem;
		border: 1px solid var(--border);
		border-radius: var(--r-sm);
		font-size: 0.93rem;
	}
	.category-list li::before {
		content: counter(category);
		flex: 0 0 1.65rem;
		color: var(--blue-700);
		font-size: 0.78rem;
		font-weight: 700;
	}
	.detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 1rem;
		margin-top: clamp(2.5rem, 5vw, 3.75rem);
	}
	.detail-block {
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid var(--border);
		border-radius: var(--r-sm);
	}
	.detail-block ul {
		padding-left: 1.2rem;
		color: var(--text-muted);
	}
	.detail-block li + li {
		margin-top: 0.45rem;
	}
	.page-end {
		display: flex;
		justify-content: center;
		margin-top: clamp(2.5rem, 6vw, 4rem);
	}
	.page-end .btn {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
	}
</style>
