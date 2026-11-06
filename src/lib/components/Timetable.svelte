<script>
	import { t, lang } from '$lib/i18n.js';
	import { reveal } from '$lib/actions.js';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import slides from '../../../static/session-slides.json';
	import SlidesButton from '$lib/components/SlidesButton.svelte';
	import SessionDialog from './SessionDialog.svelte';
	import VenueMap from './VenueMap.svelte';

	/** @type {{ title: string; speaker?: string; org?: string; description?: string; time: string; track?: string } | null} */
	let details = $state(null);
	/** @type {'all' | 'flutter' | 'ai'} */
	let selectedTrack = $state('all');
	let now = $state(0);
	let testTime = $state('');
	let effectiveNow = $derived(testTime ? Date.parse(`2026-11-07T${testTime}:00+09:00`) : now);
	onMount(() => {
		const update = () => now = Date.now();
		update();
		const timer = setInterval(update, 30000);
		return () => clearInterval(timer);
	});
	let currentRow = $derived.by(() => {
		if (!effectiveNow) return undefined;
		const kst = new Date(effectiveNow + 9 * 60 * 60 * 1000);
		if (kst.toISOString().slice(0, 10) !== '2026-11-07') return undefined;
		const time = `${String(kst.getUTCHours()).padStart(2, '0')}:${String(kst.getUTCMinutes()).padStart(2, '0')}`;
		return $t.timetable.tracks.rows.find((row) => !row.empty && row.start <= time && time < row.end);
	});
	/** @param {'flutter' | 'ai'} track */
	function currentTitle(track) {
		const kst = new Date(effectiveNow + 9 * 60 * 60 * 1000);
		const minutes = kst.getUTCHours() * 60 + kst.getUTCMinutes();
		if (!currentRow || (track === 'ai' && (minutes < 11 * 60 + 50 || minutes >= 16 * 60 + 50))) return $lang === 'ko' ? '진행 중인 일정 없음' : 'No session in progress';
		if (currentRow.kind === 'break') return currentRow.label;
		if (currentRow.shared) return currentRow.shared;
		return currentRow[track]?.title && currentRow[track]?.title !== 'X' ? currentRow[track].title : ($lang === 'ko' ? '진행 중인 일정 없음' : 'No session in progress');
	}
	/** @param {'flutter' | 'ai'} track */
	function currentDetails(track) {
		if (!currentRow || currentRow.kind === 'break') return null;
		const session = currentRow.shared ? currentRow : currentRow[track];
		if (!session) return null;
		const speaker = 'speaker' in session ? session.speaker : '';
		const org = 'org' in session ? session.org : '';
		const image = 'image' in session ? session.image : (speaker?.includes('Craig Labenz') ? '/assets/flutter-seoul/speaker/craig-labenz.jpg' : '');
		const room = 'room' in session ? session.room : (track === 'flutter' ? $t.timetable.tracks.flutter.split(' · ')[1] : $t.timetable.tracks.ai.split(' · ')[1]);
		return { speaker, org, image, room };
	}
	/** @param {string} start @param {string} track */
	function slideUrl(start, track) { return /** @type {Record<string, string>} */ (slides)[`${start}-${track}`]; }
	/** @param {{ title?: string; speaker?: string; org?: string; description?: string } | undefined} session
	 *  @param {{ start: string; end: string }} row
	 *  @param {string} [track] */
	function openSession(session, row, track) {
		if (!session?.description?.trim()) return;
		details = { title: session.title ?? '', speaker: session.speaker, org: session.org, description: session.description, time: `${row.start} – ${row.end}`, track };
	}
	/** @param {{ room?: string; title?: string; speaker?: string }} session */
	function speakerMeta(session) {
		if (!session?.speaker) return '';
		return session.speaker;
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

<section class="section timeline-section">
	<div class="timeline-band" aria-hidden="true"></div>
	<div class="container timeline-container">
		<VenueMap />
		<div id="timetable">
		<header class="timeline-header reveal" use:reveal>
			<span class="kicker">TIMETABLE</span>
			<h2 class="section-title">{$t.timetable.title}</h2>
			<p class="timeline-lead">{$t.timetable.lead}</p>
		</header>

		{#if import.meta.env.DEV}
			<div class="time-test"><label for="test-time">{$lang === 'ko' ? '타임테이블 시간 테스트 (11월 7일 KST)' : 'Timetable time test (Nov 7 KST)'}</label><input id="test-time" type="time" bind:value={testTime} /><button type="button" onclick={() => testTime = ''}>{$lang === 'ko' ? '현재 시간으로' : 'Use current time'}</button></div>
		{/if}
		<section class="now-on" aria-label="Now On" aria-live="polite">
			<div class="now-heading"><span class="now-kicker">NOW ON</span><span class="now-time">KST · {$lang === 'ko' ? '현재 진행 중인 일정' : 'Happening now'}</span></div>
			<div class="live-grid">
				{#each ['flutter', 'ai'] as track}
					{@const title = currentTitle(/** @type {'flutter' | 'ai'} */ (track))}
					{@const live = title !== ($lang === 'ko' ? '진행 중인 일정 없음' : 'No session in progress')}
					{@const info = live ? currentDetails(/** @type {'flutter' | 'ai'} */ (track)) : null}
					<div class="live-card" class:is-live={live}>
						<div class="live-top"><span class="live-track">{track === 'flutter' ? 'Flutter Track' : 'AI Track'}</span><span class="live-badge"><span class="live-dot"></span>{live ? 'LIVE' : 'OFF AIR'}</span></div>
						<div class="live-content">
							{#if info?.image}<img class="live-avatar" src={`${base}${info.image.normalize('NFD')}`} alt="" />{/if}
							<div><p class="live-title">{title}</p>
								{#if info?.speaker}<p class="live-speaker">{info.speaker}{#if info.org} <span>· {info.org}</span>{/if}</p>{/if}
								{#if info?.room}<p class="live-room">{info.room}</p>{/if}
							</div>
						</div>
						{#if live && currentRow}<span class="live-time">{currentRow.start} – {currentRow.end} KST</span>{/if}
					</div>
				{/each}
			</div>
		</section>
		<fieldset class="track-filter">
			<legend>{$lang === 'ko' ? '트랙 선택' : 'Choose track'}</legend>
			<label><input type="radio" name="track" value="all" bind:group={selectedTrack} /> {$lang === 'ko' ? '전체' : 'All'}</label>
			<label><input type="radio" name="track" value="flutter" bind:group={selectedTrack} /> Flutter Track</label>
			<label><input type="radio" name="track" value="ai" bind:group={selectedTrack} /> AI Track</label>
		</fieldset>
		<div class="timeline-grid reveal" use:reveal={{ delay: 100 }}>
			<div class="track-headers">
				<div class="track-label time-header">{$lang === 'ko' ? '시간' : 'Time'}</div>
				{#if selectedTrack !== 'ai'}<div class="track-label">{$t.timetable.tracks.flutter}</div>{/if}
				{#if selectedTrack !== 'flutter'}<div class="track-label">{$t.timetable.tracks.ai}</div>{/if}
			</div>
			{#each $t.timetable.tracks.rows as row}
				{#if !row.empty && isWithinProgram(row) && !(selectedTrack === 'ai' && row.shared && !row.shared.toLowerCase().includes('lunch') && !row.shared.includes('런치'))}
					<div class="timeline-row" class:single-track={selectedTrack !== 'all'}>
						{#if row.shared}
							<div class="shared-event">
								{#if 'description' in row && typeof row.description === 'string' && row.description.trim()}<button type="button" class="card-hit" aria-label={`${row.shared} · ${$lang === 'ko' ? '세션 설명 보기' : 'View session details'}`} onclick={() => openSession({ title: row.shared, speaker: row.speaker, org: 'org' in row && typeof row.org === 'string' ? row.org : undefined, description: row.description }, row)}></button>{/if}
								<span class="time-pill">{row.start} – {row.end}</span>
								{#if row.shared.toLowerCase().includes('lunch') || row.shared.includes('런치')}
									<img class="lunch-logo" src={`${base}/assets/crycheese-burger-logo.png`} alt="Crycheese Burger" />
								{:else if row.speaker?.includes('Craig Labenz')}
									<div class="portrait-stack" aria-label={row.speaker}>
										<img src={`${base}/assets/flutter-seoul/speaker/craig-labenz.jpg`} alt="" />
										{#if row.speaker.includes('Khanh')}<img src={`${base}/assets/flutter-seoul/speaker/khanh-nguyen.jpg`} alt="" />{/if}
										{#if row.speaker.includes('Mariam')}<img src={`${base}/assets/flutter-seoul/speaker/mariam-hasnany.jpg`} alt="" />{/if}
									</div>
								{:else if row.shared.toLowerCase().includes('aws')}
									<img class="profile-slot aws-profile" src={base + "/assets/aws-logo.svg"} alt="AWS" />
								{:else if isGoogleSpeaker(row.speaker)}
									<img class="profile-slot google-profile" src={base + "/assets/google-g.svg"} alt="Google" />
								{:else}
									<img class="profile-slot seoul-profile" src={`${base}/assets/flutter-seoul/flutter-seoul-logo-exact-size.svg`} alt="Flutter Seoul" />
								{/if}
								<div class="event-copy">
									{#if row.speaker}<div class="event-meta"><span>{row.speaker}</span>{#if 'org' in row && row.org}<small>{row.org}</small>{/if}</div>{/if}
									<h3 class="event-title">{row.shared}</h3>
									{#if slideUrl(row.start, 'shared')}<SlidesButton url={slideUrl(row.start, 'shared')} end={row.end} lang={$lang} {testTime} />{/if}
								</div>
							</div>
						{:else if row.kind === 'break'}
							<div class="break-event">
								<span class="time-pill">{row.start} – {row.end}</span>
								<span>{row.label}</span>
							</div>
						{:else}
							{#each selectedTrack === 'flutter' ? [row.flutter] : selectedTrack === 'ai' ? [row.ai] : [row.flutter, row.ai] as session}
								{#if isEmptySession(session)}
									<div class="event-spacer" aria-hidden="true"></div>
								{:else}
									<article class="event-card">
										{#if session?.description?.trim()}<button type="button" class="card-hit" aria-label={`${session?.title ?? ''} · ${$lang === 'ko' ? '세션 설명 보기' : 'View session details'}`} onclick={() => openSession(session, row, session === row.flutter ? $t.timetable.tracks.flutter : $t.timetable.tracks.ai)}></button>{/if}
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
														<span>{speakerMeta(session)}</span>{#if session && 'org' in session && session.org}<small>{session.org}</small>{/if}
													</div>
												{/if}
												<h3 class="event-title">{session?.title ?? ''}</h3>
													{#if slideUrl(row.start, session === row.flutter ? 'flutter' : 'ai')}<SlidesButton url={slideUrl(row.start, session === row.flutter ? 'flutter' : 'ai')} end={row.end} lang={$lang} {testTime} />{/if}
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
	</div>
</section>
<SessionDialog {details} lang={$lang} onClose={() => details = null} />

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
	}
	.timeline-header {
		max-width: 54rem;
		margin-bottom: clamp(3rem, 6vw, 5rem);
	}
	.timeline-lead {
		max-width: 48rem;
		margin-top: 1.5rem;
		color: var(--text-muted);
		font-size: var(--fs-lead);
	}
	.time-test { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; padding: 0.8rem 1rem; border: 1px dashed #97a7bb; border-radius: 0.6rem; font-size: 0.85rem; }
	.time-test input, .time-test button { padding: 0.4rem 0.6rem; border: 1px solid var(--border); border-radius: 0.35rem; background: white; font: inherit; }
	.time-test button { cursor: pointer; }
	.now-on { margin-bottom: 2.4rem; }
	.now-heading { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.5rem 1rem; margin-bottom: 0.9rem; }
	.now-kicker { color: var(--ink); font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em; }
	.now-time { color: var(--text-muted); font-size: 0.8rem; }
	.live-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	.live-card { min-width: 0; padding: clamp(1rem, 2.5vw, 1.5rem); border: 1px solid #d6e4f6; border-radius: 1rem; background: #f4f8ff; }
	.live-top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; }
	.live-track { color: #075fc5; font-size: 0.8rem; font-weight: 800; }
	.live-badge { display: inline-flex; align-items: center; gap: 0.35rem; border-radius: 99px; padding: 0.25rem 0.55rem; color: #657487; background: #e8edf3; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.05em; }
	.is-live .live-badge { color: #bd3434; background: #ffebeb; }
	.live-dot { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: currentColor; }
	.live-content { display: flex; align-items: flex-start; gap: 0.85rem; margin-top: 1rem; }
	.live-avatar { width: 3.2rem; height: 3.2rem; flex-shrink: 0; border-radius: 50%; object-fit: cover; }
	.live-speaker, .live-room { margin-top: 0.4rem; font-size: 0.8rem; color: var(--text-muted); }
	.live-speaker { color: var(--accent); font-weight: 700; }
	.live-speaker span { color: var(--text-muted); font-weight: 500; }
	.live-title { margin-top: 0; color: var(--ink); font-weight: 750; line-height: 1.4; overflow-wrap: anywhere; }
	.live-time { display: block; margin-top: 0.6rem; font-size: 0.75rem; color: var(--text-muted); }
	.track-filter { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; border: 0; padding: 0; margin: 0 0 1.5rem; }
	.track-filter legend { font-weight: 700; margin-bottom: 0.7rem; }
	.track-filter label { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.65rem 1rem; border: 1px solid var(--border); border-radius: 99px; background: white; color: var(--text-muted); font-size: 0.9rem; font-weight: 650; cursor: pointer; }
	.track-filter label:has(input:checked) { color: var(--accent); background: #edf5ff; border-color: var(--accent); }
	.track-filter label:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 3px; }
	.track-filter input { accent-color: var(--accent); width: 1rem; height: 1rem; }
	.track-headers { grid-column: 1 / -1; display: flex; }
	.track-headers .track-label { flex: 1; }
	.track-headers .time-header { flex: 0 0 7.5rem; }
	.timeline-row.single-track { grid-template-columns: minmax(0, 1fr); }
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
	.portrait-stack { display: flex; align-items: center; flex-shrink: 0; padding-left: 0.25rem; }
	.portrait-stack img { width: 3rem; height: 3rem; margin-left: -0.3rem; border: 2px solid white; border-radius: 50%; object-fit: cover; }
	.lunch-logo { width: clamp(8rem, 14vw, 10rem); height: auto; object-fit: contain; }
	.google-profile {
		padding: 5px;
	}
	.aws-profile {
		padding: 7px;
		object-fit: contain;
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
	.event-meta small { color: var(--text-dim); font-size: 0.72rem; font-weight: 500; }
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
	.card-hit { position: absolute; inset: 0; z-index: 1; width: 100%; border: 0; background: transparent; cursor: pointer; }
	.card-hit:hover ~ .event-layout .event-title, .card-hit:hover ~ .event-copy .event-title { color: var(--accent); }
	.card-hit:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 0.25rem; }
	.shared-event,
	.break-event {
		grid-column: 1 / -1;
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding-left: 0;
	}
	.shared-event { position: relative; }
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
		.track-headers .time-header { flex-basis: 5.8rem; }
		.track-headers .track-label { font-size: 0.7rem; padding-inline: 0.2rem; }
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
	}
</style>
