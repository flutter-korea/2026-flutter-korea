<script>
	import { t, lang, toggleLang } from '$lib/i18n.js';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let open = $state(false);

	const panelId = 'site-nav-panel';

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
			scrolled = window.scrollY > 24;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('keydown', onKeydown);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('keydown', onKeydown);
		};
	});
</script>

<header class="site-header" class:scrolled data-open={open}>
	<div class="bar container">
		<!-- Brand -->
		<a class="brand" href={`${base}/#top`} onclick={closeMenu} aria-label={$t.nav.brand}>
			<span class="mark" aria-hidden="true">
				<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true">
					<path d="M13.9 3 6.4 10.5l2.4 2.4L18.7 3H13.9Z" fill="#fff" opacity="0.95" />
					<path d="M13.9 11.3 9.7 15.5l4.2 4.2h4.8l-4.2-4.2 4.2-4.2h-4.8Z" fill="#06121f" opacity="0.55" />
				</svg>
			</span>
			<span class="brand-text">{$t.nav.brand}</span>
		</a>

		<!-- Desktop nav -->
		<nav class="desktop-nav" aria-label={$t.nav.brand}>
			{#each $t.nav.links as link (link.id)}
				<a class="nav-link" href={`${base}/#${link.id}`}>{link.label}</a>
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
	<button
		type="button"
		class="scrim"
		aria-label={$t.nav.close}
		onclick={closeMenu}
		tabindex="-1"
	></button>
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
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 100;
		height: var(--header-h);
		display: flex;
		align-items: center;
		transition:
			background 0.3s var(--ease),
			border-color 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
		border-bottom: 1px solid transparent;
		background: transparent;
	}
	.site-header.scrolled,
	.site-header[data-open='true'] {
		background: color-mix(in srgb, var(--bg) 72%, transparent);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
		backdrop-filter: blur(14px) saturate(140%);
		border-bottom-color: var(--border);
		box-shadow: 0 8px 30px -18px rgba(0, 0, 0, 0.8);
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
		font-size: 20px;
		border-radius: 9px;
		background: var(--gradient-brand);
		box-shadow: 0 6px 18px -8px var(--glow);
		flex-shrink: 0;
	}
	.brand-text {
		font-size: 0.98rem;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.brand:hover .mark {
		box-shadow: 0 8px 22px -8px var(--glow);
	}

	/* --- Desktop nav --- */
	.desktop-nav {
		display: none;
		align-items: center;
		gap: 0.35rem;
	}
	.nav-link {
		position: relative;
		padding: 0.5rem 0.75rem;
		border-radius: var(--r-full);
		font-size: 0.94rem;
		color: var(--text-muted);
		transition:
			color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.nav-link::after {
		content: '';
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.28rem;
		height: 1.5px;
		border-radius: 2px;
		background: var(--gradient-brand);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s var(--ease);
	}
	.nav-link:hover {
		color: var(--text);
	}
	.nav-link:hover::after {
		transform: scaleX(1);
	}

	.desktop-actions {
		display: none;
		align-items: center;
		gap: 0.6rem;
	}

	/* --- Language toggle --- */
	.lang-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border-radius: var(--r-full);
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.lang-btn:hover {
		color: var(--text);
		border-color: var(--border-strong);
		background: var(--card-hover);
	}
	.lang-btn.wide {
		justify-content: center;
		width: 100%;
		padding-block: 0.85rem;
		font-size: 0.85rem;
	}

	.cta {
		padding: 0.6rem 1.15rem;
		font-size: 0.9rem;
	}

	/* --- Hamburger --- */
	.hamburger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: var(--r-md);
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
		flex-shrink: 0;
		transition:
			border-color 0.2s var(--ease),
			background 0.2s var(--ease);
	}
	.hamburger:hover {
		border-color: var(--border-strong);
		background: var(--card-hover);
	}

	/* --- Mobile overlay + panel --- */
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 90;
		border: 0;
		padding: 0;
		background: rgba(4, 8, 18, 0.6);
		-webkit-backdrop-filter: blur(2px);
		backdrop-filter: blur(2px);
		cursor: default;
		animation: scrim-in 0.25s var(--ease);
	}
	@keyframes scrim-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.mobile-panel {
		position: fixed;
		top: var(--header-h);
		left: 0;
		right: 0;
		z-index: 95;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-height: calc(100dvh - var(--header-h));
		overflow-y: auto;
		padding: 1.25rem var(--gutter) 1.75rem;
		background: color-mix(in srgb, var(--bg-elevated) 94%, transparent);
		-webkit-backdrop-filter: blur(16px);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--border);
		box-shadow: var(--shadow-card);
		transform: translateY(-12px);
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition:
			transform 0.28s var(--ease),
			opacity 0.28s var(--ease),
			visibility 0.28s var(--ease);
	}
	.mobile-panel.open {
		transform: translateY(0);
		opacity: 1;
		pointer-events: auto;
		visibility: visible;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
	}
	.mobile-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.95rem 0.25rem;
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--text);
		border-bottom: 1px solid var(--border);
		transition: color 0.2s var(--ease);
	}
	.mobile-link:last-child {
		border-bottom: 0;
	}
	.mobile-link svg {
		color: var(--text-dim);
		transition:
			color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}
	.mobile-link:hover {
		color: var(--accent);
	}
	.mobile-link:hover svg {
		color: var(--accent);
		transform: translateX(3px);
	}

	.mobile-actions {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.btn.wide {
		width: 100%;
	}

	/* --- Breakpoint: desktop --- */
	@media (min-width: 900px) {
		.desktop-nav,
		.desktop-actions {
			display: flex;
		}
		.hamburger,
		.mobile-panel,
		.scrim {
			display: none;
		}
		.brand {
			margin-right: 0;
		}
		.desktop-nav {
			margin-inline: auto;
		}
	}
</style>
