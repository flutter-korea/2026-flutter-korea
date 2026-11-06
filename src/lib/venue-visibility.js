import { readable } from 'svelte/store';

const deadline = Date.parse('2026-11-07T18:00:00+09:00');

// Start hidden during prerendering; the browser decides using its current time.
export const venueVisible = readable(false, (set) => {
	if (typeof window === 'undefined') return;
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let timer;
	function update() {
		const remaining = deadline - Date.now();
		set(remaining > 0);
		if (remaining > 0) timer = setTimeout(update, Math.min(remaining, 2147483647));
	}
	update();
	return () => clearTimeout(timer);
});
