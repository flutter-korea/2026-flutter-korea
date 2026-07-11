import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * SvelteKit config for a fully static site published to GitHub Pages.
 *
 * On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
 * so every asset/link must be prefixed with the repo name. The deploy workflow
 * sets BASE_PATH=/<repo> at build time; locally it is empty so `bun dev` works
 * from the root.
 */
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base
		},
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
