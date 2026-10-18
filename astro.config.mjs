// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'LuaHUD',
			customCss: ['./src/assets/css/custom.css'],
      social: [{ icon: 'discord', label: 'Discord', href: 'change here when you create the server' }, { icon: 'github', label: 'GitHub', href: 'https://github.com/iFair1/luahud' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
