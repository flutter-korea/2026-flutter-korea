<script>
	import { t } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
	import { base } from '$app/paths';

	/** @param {{ room?: string; title?: string; speaker?: string; org?: string }} session */
	function speakerMeta(session) {
		if (!session?.speaker) return '';
		return session.org ? `${session.speaker} / ${session.org}` : session.speaker;
	}

	/** @param {string | undefined} speaker */
	function isGoogleSpeaker(speaker) {
		return speaker?.includes('Google') ?? false;
	}

	/** @param {string | undefined} image */
	function speakerImage(image) {
		return image ? base + image.normalize('NFD') : '';
	}

	/** @param {{ title?: string } | undefined} session */
	function isEmptySession(session) {
		return !session || session.title === 'X';
	}

	/** @param {{ start: string; end: string }} row */
	function isWithinProgram(row) {
		/** @param {string} value */
		const toMinutes = (value) => {
			const [hours, minutes] = value.split(':').map(Number);
			return hours * 60 + minutes;
		};
		return toMinutes(row.start) >= 11 * 60 && toMinutes(row.end) <= 18 * 60;
	}
</script>

<section id="timetable" class="section timeline-section">
	<div class="timeline-band" aria-hidden="true"></div>
	<div class="container timeline-container">
		<header class="timeline-header reveal" use:reveal>
			<span class="event-name">Flutter Korea 2026</span>
			<h2 class="timeline-title">{$t.timetable.title}</h2>
			<p class="timeline-lead">{$t.timetable.lead}</p>
		</header>

		<div class="timeline-grid reveal" use:reveal={{ delay: 100 }}>
			<div class="track-label">{$t.timetable.tracks.ai}</div>
			<div class="track-label">{$t.timetable.tracks.flutter}</div>
			{#each $t.timetable.tracks.rows as row}
				{#if !row.empty && isWithinProgram(row)}
					<div class="timeline-row">
						{#if row.shared}
							<div class="shared-event">
								<span class="time-pill">{row.start} – {row.end}</span>
								{#if isGoogleSpeaker(row.speaker)}
									<img class="profile-slot google-profile" src={base + "/assets/google-g.svg"} alt="Google" />
								{:else}
									<img class="profile-slot seoul-profile" src={`${base}/assets/flutter-seoul/flutter-seoul-logo-exact-size.svg`} alt="Flutter Seoul" />
								{/if}
								<div class="event-copy">
									<div class="event-meta">
										<span>{row.speaker || 'Flutter Korea 2026'}</span>
									</div>
									<h3 class="event-title">{row.shared}</h3>
								</div>
							</div>
						{:else if row.kind === 'break'}
							<div class="break-event">
								<span class="time-pill">{row.start} – {row.end}</span>
								<span>{row.label}</span>
							</div>
						{:else}
							{#each [row.ai, row.flutter] as session}
								{#if isEmptySession(session)}
									<div class="event-spacer" aria-hidden="true"></div>
								{:else}
									<article class="event-card">
										<div class="event-layout">
											<span class="time-pill">{row.start} – {row.end}</span>
											{#if isGoogleSpeaker(session?.speaker)}
												<img class="profile-slot google-profile" src={base + "/assets/google-g.svg"} alt="Google" />
											{:else if session?.image}
												<img class="profile-slot" src={speakerImage(session.image)} alt="{session.speaker} 프로필" />
											{:else}
												<span class="profile-slot" aria-label="프로필 사진 자리"></span>
											{/if}
											<div class="event-copy">
												{#if session?.speaker}
													<div class="event-meta">
														<span>{speakerMeta(session)}</span>
													</div>
												{/if}
												<h3 class="event-title">{session?.title ?? ''}</h3>
												</div>
										</div>
									</article>
								{/if}
							{/each}
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	.timeline-section {
		position: relative;
		padding-top: clamp(4.5rem, 9vw, 7rem);
		padding-bottom: clamp(5rem, 10vw, 8rem);
		background: var(--white);
		overflow: hidden;
	}
	.timeline-band {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: clamp(2.2rem, 4vw, 4rem);
		background: linear-gradient(100deg, #1955c5 0%, #087df0 55%, #1660ce 100%);
	}
	.timeline-container {
		position: relative;
		max-width: none;
	}
	.timeline-header {
		max-width: 54rem;
		margin-bottom: clamp(3rem, 6vw, 5rem);
	}
	.event-name {
		display: block;
		color: var(--ink);
		font-size: clamp(1.25rem, 1rem + 0.7vw, 1.65rem);
		font-weight: 700;
		letter-spacing: -0.04em;
	}
	.timeline-title {
		margin-top: 0.8rem;
		color: #147ce5;
		font-size: clamp(3rem, 2.35rem + 3vw, 5rem);
		font-weight: 800;
		letter-spacing: -0.075em;
		line-height: 0.98;
	}
	.timeline-lead {
		max-width: 48rem;
		margin-top: 1.5rem;
		color: var(--text-muted);
		font-size: var(--fs-lead);
	}
	.timeline-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: clamp(2rem, 8vw, 8rem);
		row-gap: 0;
	}
	.event-card,
	.event-spacer,
	.shared-event,
	.break-event {
		min-width: 0;
	}
	.timeline-row {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		row-gap: 2rem;
		column-gap: clamp(2rem, 8vw, 8rem);
		padding: 2.2rem 0;
		border-top: 1px solid var(--border);
	}
	.timeline-row:first-of-type {
		border-top: 0;
	}
	.event-spacer {
		min-height: 5rem;
	}
	.event-card {
		position: relative;
		padding-left: 0;
	}
	.event-card + .event-card {
		border-left: 1px solid var(--border);
		padding-left: 2rem;
	}
	.event-layout {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		min-width: 0;
	}
	.event-copy {
		min-width: 0;
	}
	.profile-slot {
		display: inline-block;
		flex: 0 0 3.5rem;
		width: 3.5rem;
		height: 3.5rem;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--white);
		box-sizing: border-box;
		object-fit: cover;
	}
	.google-profile {
		padding: 5px;
	}
	.seoul-profile {
		padding: 5px;
		object-fit: contain;
	}
	.time-pill {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		min-width: 5.8rem;
		min-height: 2.1rem;
		padding: 0.24rem 0.7rem;
		border-radius: var(--r-full);
		color: #3a3f48;
		border: 1px solid var(--border);
		box-sizing: border-box;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 1.2;
		white-space: nowrap;
	}
	.event-meta {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		align-items: center;
		min-width: 0;
		color: #1681e8;
		font-size: 0.92rem;
		font-weight: 750;
		line-height: 1.35;
	}
	.track-label {
		padding: 1rem;
		border: 1px solid var(--border);
		border-top: 3px solid var(--accent);
		text-align: center;
		color: var(--accent);
		font-size: 0.85rem;
		font-weight: 800;
	}
	.event-title,
	.shared-event h3 {
		margin-top: 0.55rem;
		color: var(--ink);
		font-size: clamp(1.05rem, 0.96rem + 0.28vw, 1.35rem);
		font-weight: 750;
		letter-spacing: -0.035em;
		line-height: 1.35;
		word-break: keep-all;
	}
	.shared-event,
	.break-event {
		grid-column: 1 / -1;
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding-left: 0;
	}
	.shared-event {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		text-align: left;
	}
	.break-event {
		align-items: center;
		gap: 1rem;
		color: var(--text-dim);
		font-size: 0.82rem;
		font-weight: 700;
	}
	.break-event .time-pill {
		border-color: var(--border);
	}
	@media (max-width: 720px) {
		.event-card + .event-card {
			border-left: 0;
			border-top: 1px solid var(--border);
			padding: 2rem 0 0;
		}
		.timeline-grid {
			grid-template-columns: 1fr;
		}
		.timeline-row {
			grid-template-columns: 1fr;
			row-gap: 2rem;
		}
		.event-card {
			padding-left: 0;
		}
		.timeline-title {
			font-size: clamp(2.7rem, 15vw, 4rem);
		}
	}
</style>
