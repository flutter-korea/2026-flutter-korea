<script>
	import { t, lang, toggleLang } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let open = $state(false);
	let activeId = $state('');

	const panelId = 'site-nav-panel';
	const onHome = $derived(page.url.pathname === `${base}/` || page.url.pathname === base || page.url.pathname === '/');

	function closeMenu() {
		open = false;
	}

	function toggleMenu() {
		open = !open;
	}

	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (event.key === 'Escape' && open) {
			closeMenu();
		}
	}

	// Lock body scroll while the mobile panel is open (browser-only).
	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('keydown', onKeydown);

		// Scroll-spy: highlight the nav link for the section currently in view.
		const ids = ['about', 'sessions', 'timetable', 'tickets', 'sponsors'];
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el) => el !== null);
		/** @type {IntersectionObserver | undefined} */
		let observer;
		if (sections.length) {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) activeId = entry.target.id;
					}
				},
				{ rootMargin: '-40% 0px -50% 0px', threshold: 0 }
			);
			for (const s of sections) observer.observe(s);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('keydown', onKeydown);
			observer?.disconnect();
		};
	});
</script>

<header class="site-header" class:scrolled data-open={open}>
	<div class="bar container">
		<!-- Brand -->
		<a class="brand" href={`${base}/#top`} onclick={closeMenu} aria-label={$t.nav.brand}>
			<span class="mark" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none">
					<path d="M13.9 3 6.4 10.5l2.4 2.4L18.7 3H13.9Z" fill="#ffffff" />
					<path d="M13.9 11.3 9.7 15.5l4.2 4.2h4.8l-4.2-4.2 4.2-4.2h-4.8Z" fill="#bfe3fc" />
				</svg>
			</span>
			<span class="brand-text">{$t.nav.brand}</span>
		</a>

		<!-- Desktop nav -->
		<nav class="desktop-nav" aria-label={$t.nav.brand}>
			{#each $t.nav.links as link (link.id)}
				<a
					class="nav-link"
					class:active={onHome && activeId === link.id}
					href={`${base}/#${link.id}`}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="desktop-actions">
			<button
				type="button"
				class="lang-btn"
				onclick={toggleLang}
				aria-label={$t.meta.langButtonLabel}
			>
				<svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18" />
					<path d="M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9Z" />
				</svg>
				<span>{$t.meta.langButton}</span>
			</button>
			<a class="btn btn-primary cta" href={`${base}/speakers`}>{$t.nav.cta}</a>
		</div>

		<!-- Mobile hamburger -->
		<button
			type="button"
			class="hamburger"
			onclick={toggleMenu}
			aria-expanded={open}
			aria-controls={panelId}
			aria-label={open ? $t.nav.close : $t.nav.menu}
		>
			{#if open}
				<svg viewBox="0 0 24 24" width="1.35em" height="1.35em" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
					<path d="m6 6 12 12M18 6 6 18" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" width="1.35em" height="1.35em" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			{/if}
		</button>
	</div>
</header>

<!-- Mobile overlay + panel -->
{#if open}
	<button type="button" class="scrim" aria-label={$t.nav.close} onclick={closeMenu} tabindex="-1"></button>
{/if}

<div id={panelId} class="mobile-panel" class:open aria-hidden={!open}>
	<nav class="mobile-nav" aria-label={$t.nav.menu}>
		{#each $t.nav.links as link (link.id)}
			<a class="mobile-link" href={`${base}/#${link.id}`} onclick={closeMenu} tabindex={open ? 0 : -1}>
				<span>{link.label}</span>
				<svg viewBox="0 0 24 24" width="0.9em" height="0.9em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="m9 5 7 7-7 7" />
				</svg>
			</a>
		{/each}
	</nav>

	<div class="mobile-actions">
		<button
			type="button"
			class="lang-btn wide"
			onclick={toggleLang}
			aria-label={$t.meta.langButtonLabel}
			tabindex={open ? 0 : -1}
		>
			<svg viewBox="0 0 24 24" width="1.05em" height="1.05em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<circle cx="12" cy="12" r="9" />
				<path d="M3 12h18" />
				<path d="M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9Z" />
			</svg>
			<span>{$t.meta.langButton}</span>
		</button>
		<a class="btn btn-primary wide" href={`${base}/speakers`} onclick={closeMenu} tabindex={open ? 0 : -1}>
			{$t.nav.cta}
		</a>
	</div>
</div>

<style>
	.site-header {
		position: sticky;
		top: var(--announce-h);
		z-index: 100;
		height: var(--header-h);
		display: flex;
		align-items: center;
		background: var(--white);
		border-bottom: 1px solid var(--border);
		transition: box-shadow 0.2s var(--ease);
	}
	.site-header.scrolled {
		box-shadow: 0 4px 16px -12px rgba(11, 18, 32, 0.25);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}

	/* --- Brand --- */
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin-right: auto;
		white-space: nowrap;
		min-width: 0;
	}
	.mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 9px;
		background: var(--blue-700);
		flex-shrink: 0;
	}
	.brand-text {
		font-size: 0.98rem;
		color: var(--ink);
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* --- Desktop nav --- */
	.desktop-nav {
		display: none;
	}
	.nav-link {
		position: relative;
		padding: 0.5rem 0;
		font-size: 0.94rem;
		font-weight: 500;
		color: var(--text-muted);
		transition: color 0.2s var(--ease);
	}
	.nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 2px;
		border-radius: 1px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s var(--ease);
	}
	.nav-link:hover {
		color: var(--ink);
	}
	.nav-link.active {
		color: var(--accent);
	}
	.nav-link.active::after {
		transform: scaleX(1);
	}

	.desktop-actions {
		display: none;
	}

	.lang-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border-radius: var(--r-full);
		border: 1px solid var(--border);
		background: var(--white);
		color: var(--text-muted);
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			border-color 0.2s var(--ease),
			color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.lang-btn:hover {
		border-color: var(--border-strong);
		color: var(--accent);
		background: var(--paper);
	}

	.cta {
		padding: 0.6rem 1.15rem;
		font-size: 0.9rem;
	}

	/* --- Mobile hamburger --- */
	.hamburger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--r-sm);
		border: 1px solid var(--border);
		background: var(--white);
		color: var(--ink);
		cursor: pointer;
		flex-shrink: 0;
	}
	.hamburger:hover {
		background: var(--paper);
	}

	@media (min-width: 900px) {
		.desktop-nav {
			display: flex;
			align-items: center;
			gap: 2rem;
			margin-inline: auto;
		}
		.desktop-actions {
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}
		.hamburger {
			display: none;
		}
	}

	/* --- Mobile overlay + panel --- */
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 90;
		background: rgba(11, 18, 32, 0.35);
		border: none;
		cursor: default;
		animation: fade-in 0.2s var(--ease);
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.mobile-panel {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 95;
		width: min(84vw, 360px);
		background: var(--white);
		border-left: 1px solid var(--border);
		box-shadow: -16px 0 40px -20px rgba(11, 18, 32, 0.3);
		padding: calc(var(--announce-h) + var(--header-h) + 1.5rem) 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		transform: translateX(100%);
		transition: transform 0.3s var(--ease);
		overflow-y: auto;
	}
	.mobile-panel.open {
		transform: translateX(0);
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
	}
	.mobile-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0.25rem;
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--ink);
		border-bottom: 1px solid var(--border);
	}
	.mobile-link svg {
		color: var(--text-dim);
	}

	.mobile-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: auto;
	}
	.wide {
		width: 100%;
		justify-content: center;
	}

	@media (min-width: 900px) {
		.scrim,
		.mobile-panel {
			display: none;
		}
	}
</style>
