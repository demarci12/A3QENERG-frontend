// @ts-check
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://a3qenerg.com',
	adapter: vercel(),
	integrations: [
		react(),
		sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en-GB', hu: 'hu-HU', ro: 'ro-RO' } } }),
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'hu', 'ro'],
		routing: { prefixDefaultLocale: false },
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
