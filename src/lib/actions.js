/**
 * Svelte action: reveal an element when it scrolls into view.
 *
 * Usage:  <div use:reveal>  or  <div use:reveal={{ delay: 120 }}>
 * Adds the `is-visible` class (see app.css `.reveal`) once, then disconnects.
 * Respects prefers-reduced-motion by revealing immediately.
 */
/**
 * @param {HTMLElement} node
 * @param {{ delay?: number, threshold?: number, once?: boolean }} [options]
 */
export function reveal(node, options = {}) {
	const { delay = 0, threshold = 0.14, once = true } = options;

	node.classList.add('reveal');
	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	const reduce =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduce || typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					if (once) observer.disconnect();
				} else if (!once) {
					node.classList.remove('is-visible');
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
