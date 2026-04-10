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
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
