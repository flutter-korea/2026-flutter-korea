<script>
	import EventThumbnail from '$lib/components/EventThumbnail.svelte';
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>{$t.previousEventsPage.metaTitle}</title>
	<meta name="description" content={$t.previousEventsPage.metaDesc} />
</svelte:head>

<article class="previous-page">
	<div class="container">
		<a class="back" href={`${base}/#top`}>
			<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M19 12H5M11 6l-6 6 6 6" />
			</svg>
			<span>{$t.previousEventsPage.back}</span>
		</a>

		<header class="page-head">
			<span class="kicker">{$t.previousEventsPage.kicker}</span>
			<h1 class="page-title">{$t.previousEventsPage.title}</h1>
			<p class="page-intro">{$t.previousEventsPage.intro}</p>
		</header>

		<section class="archive" aria-labelledby="previous-events-title">
			<h2 id="previous-events-title" class="block-title">{$t.previousEventsPage.eventsTitle}</h2>
			<ul class="event-list">
				{#each $t.previousEventsPage.events as event (event.slug)}
					<li>
						<div class="event-card">
							<div class="event-title">
								<a class="event-preview" href={`${base}/previous-events/${event.slug}`}>
									<EventThumbnail {event} label={$t.previousEventsPage.imagePendingLabel} />
								</a>
								<div class="event-top">
									<div>
										<div class="event-meta-line">
											<span>{event.year}</span>
											<span>{event.type}</span>
										</div>
										<h3>
											<a href={`${base}/previous-events/${event.slug}`}>{event.name}</a>
										</h3>
										{#if event.organizer?.includes(' x ')}
											<p class="organizer">{event.organizer}</p>
										{/if}
									</div>
								</div>
							</div>

							<div class="event-body">
								{#if event.intro}
									<p class="intro">{event.intro}</p>
								{:else}
									<p class="intro">{event.summary}</p>
								{/if}

								<div class="event-info">
									{#if event.date}
										<p>{event.date}</p>
									{/if}
									{#if event.venue}
										<p>
											{#if event.venueUrl}
												<a href={event.venueUrl} target="_blank" rel="noopener noreferrer">{event.venue}</a>
											{:else}
												{event.venue}
											{/if}
										</p>
									{/if}
								</div>

								<a class="detail-cta" href={`${base}/previous-events/${event.slug}`}>
									{$t.previousEventsPage.detailCta}
									<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M5 12h14" />
										<path d="m13 6 6 6-6 6" />
									</svg>
								</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>

	</div>
</article>

<style>
	.previous-page {
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

	.page-head {
		max-width: 60ch;
	}
	.page-title {
		margin-top: 0.9rem;
		font-size: var(--fs-h2);
		color: var(--gradient-text);
	}
	.page-intro {
		margin-top: 1.25rem;
		font-size: var(--fs-lead);
		color: var(--text-muted);
	}

	.archive {
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
	.event-list {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
	}
	.event-card {
		display: flex;
		flex-direction: column;
		gap: clamp(0.9rem, 2.5vw, 1.15rem);
		padding: clamp(1rem, 3vw, 1.35rem);
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		background: var(--card);
		transition:
			border-color 0.2s var(--ease),
			transform 0.2s var(--ease),
			box-shadow 0.2s var(--ease);
	}
	.event-card:hover {
		border-color: var(--border-strong);
		box-shadow: 0 14px 28px -24px rgba(11, 18, 32, 0.35);
	}
	.event-title {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: clamp(1rem, 3vw, 1.5rem);
		min-width: 0;
	}
	.event-preview {
		flex: 0 0 min(265px, 40%);
		aspect-ratio: 265 / 149;
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--white);
		overflow: hidden;
	}
	.event-body {
		width: 100%;
		min-width: 0;
	}
	.event-top {
		flex: 1 1 260px;
		min-width: min(100%, 240px);
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem 1rem;
	}
	.event-meta-line {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
	}
	.event-meta-line span + span::before {
		content: '/';
		margin-right: 0.45rem;
		color: var(--text-dim);
	}
	.event-top h3 {
		margin-top: 0.35rem;
		font-size: var(--fs-h3);
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	.event-top h3 a {
		color: var(--text);
		transition: color 0.2s var(--ease);
	}
	.event-top h3 a:hover {
		color: var(--accent);
	}
	.organizer {
		margin-top: 0.25rem;
		color: var(--text-dim);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		word-break: keep-all;
	}
	.intro {
		margin-top: 0.75rem;
		max-width: 60ch;
		color: var(--text);
		font-size: clamp(1.05rem, 2vw, 1.25rem);
		font-weight: 800;
		line-height: 1.45;
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	.event-info {
		display: grid;
		gap: 0.35rem;
		margin-top: 0.9rem;
		color: var(--text-muted);
		line-height: 1.55;
	}
	.event-info a {
		color: var(--accent);
		font-weight: 400;
	}
	.detail-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		margin-top: 1.2rem;
		color: var(--accent);
		font-weight: 700;
	}

	@media (max-width: 640px) {
		.event-title {
			flex-direction: column;
		}
		.event-preview {
			flex-basis: auto;
			width: 100%;
			aspect-ratio: 265 / 149;
		}
	}
</style>
