<script>
	import EventSourceButtons from '$lib/components/EventSourceButtons.svelte';
	import EventThumbnail from '$lib/components/EventThumbnail.svelte';
	import { t } from '$lib/i18n.js';
	import { base } from '$app/paths';

	let { data } = $props();

const event = $derived($t.previousEventsPage.events.find((item) => item.slug === data.slug));
</script>

<svelte:head>
	<title>{event ? `${event.name} · Flutter Korea 2026` : $t.previousEventsPage.metaTitle}</title>
	<meta name="description" content={event ? event.summary : $t.previousEventsPage.metaDesc} />
</svelte:head>

{#if event}
	<article class="event-page">
		<div class="container">
			<a class="back" href={`${base}/previous-events`}>
				<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M19 12H5M11 6l-6 6 6 6" />
				</svg>
				<span>{$t.previousEventsPage.listBack}</span>
			</a>

			<header class="event-head">
				<div class="head-copy">
					<span class="kicker">{$t.previousEventsPage.kicker}</span>
					<h1>{event.name}</h1>
					<div class="theme-row">
						<span>{event.year}</span>
						<span>{event.type}</span>
						<strong>{event.theme}</strong>
					</div>
					<p>{event.summary}</p>
					<EventSourceButtons links={event.eventLinks ?? []} />
					<ul class="stats">
						{#each event.stats as stat (stat)}
							<li>{stat}</li>
						{/each}
					</ul>
				</div>

				<div class="preview">
					<EventThumbnail {event} label={$t.previousEventsPage.imagePendingLabel} />
				</div>
			</header>

			<section class="schedule-section" aria-labelledby="schedule-title">
				<h2 id="schedule-title" class="block-title">{$t.previousEventsPage.scheduleLabel}</h2>
				<ol class="schedule">
					{#each event.schedule as item, index (`${item.time}-${item.room}-${item.title}-${index}`)}
						<li class:break-row={item.kind === 'break' || item.kind === 'reception' || item.kind === 'closing'}>
							<div class="time">{item.time}</div>
							<div class="session">
								<div class="session-meta">
									{#if item.room}
										<span>{item.room}</span>
									{/if}
									{#if item.lang}
										<span>{item.lang}</span>
									{/if}
									<span>{item.kind}</span>
								</div>
								<h3>{item.title}</h3>
								{#if item.subtitle}
									<p>{item.subtitle}</p>
								{/if}
								{#if item.speaker || item.org}
									<div class="speaker">
										{#if item.speaker}<strong>{item.speaker}</strong>{/if}
										{#if item.org}<span>{item.org}</span>{/if}
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			</section>
		</div>
	</article>
{:else}
	<article class="event-page">
		<div class="container">
			<a class="back" href={`${base}/previous-events`}>
				<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M19 12H5M11 6l-6 6 6 6" />
				</svg>
				<span>{$t.previousEventsPage.listBack}</span>
			</a>
		</div>
	</article>
{/if}

<style>
	.event-page {
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

	.event-head {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(260px, 420px);
		gap: clamp(1.5rem, 5vw, 3rem);
		align-items: start;
	}
	.head-copy {
		min-width: 0;
	}
	.head-copy h1 {
		margin-top: 0.9rem;
		font-size: var(--fs-h2);
		color: var(--gradient-text);
	}
	.head-copy p {
		margin-top: 1.15rem;
		max-width: 68ch;
		font-size: var(--fs-lead);
		color: var(--text-muted);
	}
	.theme-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
		margin-top: 1rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--text-dim);
	}
	.theme-row strong {
		color: var(--accent);
	}
	.stats {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.35rem;
	}
	.stats li {
		padding: 0.42rem 0.7rem;
		border-radius: var(--r-full);
		background: #f6f8fb;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 700;
	}
	.preview {
		max-height: 520px;
		border: 1px solid var(--border);
		border-radius: var(--r-lg);
		background: var(--white);
		overflow: hidden;
	}
	.schedule-section {
		margin-top: clamp(3rem, 7vw, 4.75rem);
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
	.schedule {
		list-style: none;
		padding: 0;
		display: grid;
		border-top: 1px solid var(--border);
	}
	.schedule li {
		display: grid;
		grid-template-columns: 132px 1fr;
		gap: clamp(1rem, 3vw, 1.5rem);
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--border);
	}
	.time {
		align-self: start;
		display: inline-flex;
		justify-content: center;
		width: fit-content;
		min-width: 86px;
		padding: 0.32rem 0.65rem;
		border-radius: var(--r-full);
		background: #f6f8fb;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 700;
	}
	.session {
		min-width: 0;
	}
	.session-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 0.5rem;
	}
	.session-meta span {
		padding: 0.18rem 0.5rem;
		border-radius: var(--r-full);
		background: var(--paper);
		color: var(--text-dim);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.session h3 {
		color: var(--accent);
		font-size: clamp(1.05rem, 2vw, 1.35rem);
		line-height: 1.35;
	}
	.session p {
		margin-top: 0.35rem;
		color: var(--text-muted);
		line-height: 1.55;
	}
	.speaker {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 0.5rem;
		margin-top: 0.7rem;
		color: var(--text-muted);
	}
	.speaker strong {
		color: var(--text);
	}
	.break-row .session h3 {
		color: var(--text);
	}

	@media (max-width: 760px) {
		.event-head,
		.schedule li {
			grid-template-columns: 1fr;
		}
		.preview {
			max-height: 360px;
		}
	}
</style>
