<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { lang, setLang } from '$lib/i18n.js';
	import AnnouncementBar from '$lib/components/AnnouncementBar.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const STORAGE_KEY = 'fk26-lang';

	// At scroll 0 the announcement bar slides down and pushes the header below
	// it; on any scroll the bar slides out and the header pins to the viewport
	// top (both animate their `top` in AnnouncementBar/Header, driven by this
	// one flag).
	let collapsed = $state(false);

	onMount(() => {
		// Restore the visitor's saved language after hydration.
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) setLang(saved);
		} catch {
			/* ignore private-mode storage errors */
		}

		const onScroll = () => {
			collapsed = window.scrollY > 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		// Persist + keep <html lang> in sync.
		const unsubLang = lang.subscribe((v) => {
			document.documentElement.lang = v;
			try {
				localStorage.setItem(STORAGE_KEY, v);
			} catch {
				/* ignore */
			}
		});

		return () => {
			window.removeEventListener('scroll', onScroll);
			unsubLang();
		};
	});
</script>

<a class="skip-link" href="#main">Skip to content</a>

<AnnouncementBar {collapsed} />
<Header {collapsed} />

<main id="main">
	{@render children()}
</main>

<Footer />

<style>
	.skip-link {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translate(-50%, -120%);
		z-index: 200;
		padding: 0.7rem 1.2rem;
		background: var(--accent);
		color: var(--white);
		font-weight: 700;
		border-radius: 0 0 var(--r-sm) var(--r-sm);
		transition: transform 0.2s var(--ease);
	}
	.skip-link:focus {
		transform: translate(-50%, 0);
	}
</style>
