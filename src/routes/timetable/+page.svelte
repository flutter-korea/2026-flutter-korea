<script>
	import { t } from '$lib/i18n.js';
	import Timetable from '$lib/components/Timetable.svelte';
</script>

<svelte:head>
	<title>{$t.timetable.title} · Flutter Korea 2026</title>
	<meta name="description" content={$t.timetable.lead} />
</svelte:head>

<Timetable />
