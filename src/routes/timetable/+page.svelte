<script>
	import { t, lang } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';

	const googlePortraits = [
		`${base}/assets/flutter-seoul/speaker/craig-labenz.jpg`,
		`${base}/assets/flutter-seoul/speaker/khanh-nguyen.jpg`,
		`${base}/assets/flutter-seoul/speaker/mariam-hasnany.jpg`
	];

	/** @param {{ speaker?: string }} session */
	function portraitsFor(session) {
		if (session?.speaker?.includes('Craig Labenz')) {
			return session.speaker.includes('Mariam') ? googlePortraits : googlePortraits.slice(0, 2);
		}
		return [];
	}

	/** @param {{ start: string; end: string }} row */
	function inProgram(row) {
		return row.start >= '11:00' && row.end <= '18:00';
	}
</script>

<svelte:head>
	<title>{$t.timetable.title} · Flutter Korea 2026</title>
	<meta name="description" content={$t.timetable.lead} />
</svelte:head>

<article class="timetable-page">
	<div class="container">
		<header class="page-head reveal" use:reveal>
			<div class="brand-line">
				<a class="brand" href={`${base}/#top`}>Flutter Korea 2026</a>
			</div>
			<h1>{$t.timetable.title}</h1>
			<p class="lead">{$t.timetable.lead}</p>
			<p class="date-line">{$t.timetable.dateLine}</p>
		</header>

		<div class="tracks reveal" use:reveal={{ delay: 80 }}>
			<div class="track-label">{$t.timetable.tracks.flutter}</div>
			<div class="track-label">{$t.timetable.tracks.ai}</div>

			{#each $t.timetable.tracks.rows as row}
				{#if !row.empty && inProgram(row)}
					{#if row.kind === 'break'}
						<div class="schedule-row break-row">
							<span class="time-pill">{row.start} – {row.end}</span>
							<span>{$lang === 'en' ? 'Break' : row.label}</span>
						</div>
					{:else if row.shared}
						<div class="schedule-row shared-row">
							<span class="time-pill">{row.start} – {row.end}</span>
							{#if row.shared.toLowerCase().includes('lunch') || row.shared.includes('런치')}
								<div class="shared-content centered">
									<img class="lunch-logo" src={`${base}/assets/crycheese-burger-logo.png`} alt="Crycheese Burger" />
									<h2 class="center-title">{row.shared}</h2>
								</div>
							{:else if row.shared.toLowerCase().includes('photo') || row.shared.includes('사진')}
								<div class="shared-content centered">
									<h2 class="center-title">{row.shared}</h2>
								</div>
							{:else}
								<div class="shared-content">
					<div class="portrait-stack" aria-hidden="true">
						{#if row.shared.toLowerCase().includes('opening') || row.shared.includes('오프닝')}
							<img class="flutter-logo" src={`${base}${row.image ?? '/assets/flutter-seoul/flutter-seoul-logo-exact-size.svg'}`} alt="" />
										{:else}
											{#each portraitsFor(row) as portrait (portrait)}
												<img src={portrait} alt="" />
											{/each}
										{/if}
									</div>
									<div class="shared-copy">
										{#if row.speaker || row.org}
											<p class="speaker"><span>{row.speaker}</span>{#if row.org}<small>{row.org}</small>{/if}</p>
										{/if}
										<h2>{row.shared}</h2>
									</div>
								</div>
							{/if}
						</div>
					{:else}
						<article class="schedule-row session-row">
							{#each [row.flutter, row.ai] as session, i (`${row.start}-${i}`)}
								<div class="session">
									<span class="time-pill">{row.start} – {row.end}</span>
									{#if session?.image}
										<img class="portrait" src={`${base}${session.image.normalize('NFD')}`} alt="{session.speaker} 프로필" />
									{:else if session?.speaker?.includes('Google')}
										<img class="portrait google-mark" src={`${base}/assets/google-g.svg`} alt="Google" />
									{:else}
										<span class="portrait empty-portrait" aria-hidden="true"></span>
									{/if}
									<div class="session-copy">
										{#if session?.speaker}
											<p class="speaker">
												<span>{session.speaker}</span>
								{#if session && 'org' in session && session.org}<small>{session.org}</small>{/if}
											</p>
										{/if}
										<h2>{session?.title ?? ''}</h2>
									</div>
									</div>
							{/each}
						</article>
					{/if}
				{/if}
			{/each}
		</div>
	</div>
</article>

<footer class="page-footer">
	<span>Flutter Korea 2026 · Organized by Flutter Seoul</span>
	<span>2026.11.07 · AWS Korea</span>
</footer>

<style>
	:global(body) {
		padding-top: 0 !important;
	}
	:global(.site-header),
	:global(footer.site-footer) {
		display: none !important;
	}
	.timetable-page {
		padding: clamp(1.25rem, 2.2vw, 2rem) 0 clamp(4rem, 8vw, 7rem);
		background: var(--white);
	}
	.timetable-page :global(.container) {
		max-width: none;
		padding-inline: clamp(0.75rem, 1.35vw, 1.5rem);
	}
	.page-head {
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}
	.brand {
		font-size: clamp(1rem, 0.9rem + 0.35vw, 1.25rem);
		font-weight: 750;
		letter-spacing: -0.035em;
	}
	.brand-line {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	h1 {
		margin-top: 0.35rem;
		color: #147ce5;
		font-size: clamp(2.7rem, 6.4vw, 4.4rem);
		line-height: 1;
		letter-spacing: -0.065em;
	}
	.lead {
		margin-top: 1.4rem;
		color: #71829a;
		font-size: clamp(1rem, 1.8vw, 1.25rem);
		line-height: 1.5;
	}
	.date-line {
		margin-top: 0.65rem;
		color: var(--blue-700);
		font-size: 0.7rem;
		font-weight: 650;
	}
	.tracks {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: clamp(1.5rem, 8vw, 6rem);
	}
	.track-label {
		margin-bottom: 1.4rem;
		padding: 0.8rem 0.5rem;
		border: 1px solid #dbe7f6;
		border-top: 3px solid #075fc5;
		background: #fff;
		color: #075fc5;
		font-size: 0.92rem;
		font-weight: 750;
		text-align: center;
	}
	.schedule-row {
		grid-column: 1 / -1;
		min-width: 0;
		border-top: 1px solid #dbe7f6;
	}
	.schedule-row:last-child {
		border-bottom: 1px solid #dbe7f6;
	}
	.session-row {
		display: flex;
		align-items: stretch;
		padding: 1.25rem 0;
	}
	.session {
		display: grid;
		grid-template-columns: auto 3.25rem minmax(0, 1fr);
		align-items: start;
		gap: 0.8rem;
		width: 50%;
		min-width: 0;
		padding-right: clamp(1rem, 3vw, 2.5rem);
	}
	.session + .session {
		border-left: 1px solid #dbe7f6;
		padding: 0 0 0 clamp(1rem, 3vw, 2.5rem);
	}
	.session:nth-child(2) {
		margin-left: 0;
	}
	.session-row > .session:nth-child(2) {
		margin-left: auto;
	}
	.time-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 1.8rem;
		padding: 0.2rem 0.65rem;
		border: 1px solid #dbe7f6;
		border-radius: var(--r-full);
		background: #fff;
		color: #545e6c;
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 1.2;
		white-space: nowrap;
	}
	.portrait {
		width: 3.25rem;
		height: 3.25rem;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: white;
		object-fit: cover;
	}
	.google-mark {
		padding: 0.35rem;
		object-fit: contain;
	}
	.empty-portrait {
		display: block;
	}
	.session-copy,
	.shared-copy {
		min-width: 0;
	}
	.speaker {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.4rem;
		color: #1681e8;
		font-size: 0.88rem;
		font-weight: 750;
		line-height: 1.35;
	}
	.speaker small {
		color: #8795a8;
		font-size: 0.65rem;
		font-weight: 500;
	}
	.session-copy h2,
	.shared-copy h2 {
		margin-top: 0.45rem;
		font-size: clamp(0.98rem, 1.2vw, 1.13rem);
		font-weight: 750;
		line-height: 1.3;
		letter-spacing: -0.025em;
	}
	.break-row,
	.shared-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-height: 4.1rem;
		padding: 0.55rem 0;
	}
	.break-row {
		color: var(--text-dim);
		font-size: 0.8rem;
		font-weight: 700;
	}
	.shared-row {
		gap: 1rem;
	}
	.shared-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex: 1;
		min-width: 0;
	}
	.shared-content.centered {
		justify-content: center;
	}
	.center-title {
		font-size: clamp(0.98rem, 1.2vw, 1.13rem);
		font-weight: 750;
		line-height: 1.3;
		letter-spacing: -0.025em;
	}
	.shared-row .shared-copy {
		flex: 1;
	}
	.shared-row .shared-copy h2 {
		margin-top: 0.2rem;
	}
	.portrait-stack {
		display: flex;
		align-items: center;
		padding-left: 0.25rem;
	}
	.portrait-stack img {
		width: 3rem;
		height: 3rem;
		margin-left: -0.3rem;
		border: 2px solid white;
		border-radius: 50%;
		object-fit: cover;
	}
	.portrait-stack .flutter-logo {
		padding: 0.45rem;
		border: 1px solid var(--border);
	}
	.lunch-logo {
		width: clamp(8rem, 14vw, 10rem);
		height: auto;
		object-fit: contain;
	}
	.page-footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem clamp(0.75rem, 1.35vw, 1.5rem);
		color: #71829a;
		font-size: 0.65rem;
	}
	@media (min-width: 561px) and (max-width: 760px) {
		.session {
			grid-template-columns: auto 2.5rem minmax(0, 1fr);
			gap: 0.5rem;
			padding-right: 0.5rem;
		}
		.session + .session {
			padding-left: 0.5rem;
		}
		.time-pill {
			padding-inline: 0.4rem;
			font-size: 0.62rem;
		}
		.portrait {
			width: 2.5rem;
			height: 2.5rem;
		}
		.speaker {
			font-size: 0.74rem;
		}
		.speaker small {
			font-size: 0.58rem;
		}
		.session-copy h2,
		.shared-copy h2,
		.center-title {
			font-size: 0.86rem;
		}
	}
	@media (max-width: 560px) {
		.tracks {
			grid-template-columns: minmax(0, 1fr);
		}
		.track-label:nth-child(2) {
			grid-row: 2;
			margin-top: -1.4rem;
		}
		.session-row {
			display: grid;
			grid-template-columns: minmax(0, 1fr);
			gap: 1rem;
		}
		.session {
			width: 100%;
			padding: 0;
		}
		.session + .session {
			border-top: 1px solid #dbe7f6;
			border-left: 0;
			padding: 1rem 0 0;
		}
		.session-row > .session:nth-child(2) {
			margin-left: 0;
		}
		.time-pill {
			font-size: 0.66rem;
		}
	}
	@media (max-width: 480px) {
		.session {
			grid-template-columns: auto 2.8rem minmax(0, 1fr);
			gap: 0.55rem;
		}
		.portrait {
			width: 2.8rem;
			height: 2.8rem;
		}
		.time-pill {
			min-width: 5.3rem;
			padding-inline: 0.45rem;
		}
		.page-footer {
			font-size: 0.56rem;
		}
	}
</style>
