<script>
	import { lang } from '$lib/i18n.js';
	import VenueMap from '$lib/components/VenueMap.svelte';
</script>

<svelte:head><title>{$lang === 'ko' ? '행사장 안내도' : 'Venue map'} · Flutter Korea 2026</title></svelte:head>
<div class="section"><div class="container"><VenueMap /></div></div>
