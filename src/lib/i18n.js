import { writable, derived } from 'svelte/store';
import { dict } from './content.js';

/**
 * Current language: 'ko' | 'en'. Defaults to 'ko' so it matches the
 * prerendered HTML (avoids a hydration mismatch); the layout restores the
 * visitor's saved choice from localStorage after mount.
 */
/** @type {import('svelte/store').Writable<'ko' | 'en'>} */
export const lang = writable('ko');

/** Reactive translation dictionary for the active language. */
export const t = derived(lang, ($lang) => dict[$lang]);

export function toggleLang() {
	lang.update((v) => (v === 'ko' ? 'en' : 'ko'));
}

/** @param {string} v */
export function setLang(v) {
	if (v === 'ko' || v === 'en') lang.set(v);
}
