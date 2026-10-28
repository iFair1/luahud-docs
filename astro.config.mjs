// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://luahud.ifair.dev',
	integrations: [
		starlight({
			title: 'LuaHUD',
			customCss: ['/src/assets/css/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/iFair1/luahud' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						// Each item here is one entry in the navigation menu.
						{ autogenerate: { directory: 'getting-started' } }
					],
				},
        {
          label: "Lua",
          items: [
            { autogenerate: { directory: 'lua' } }
          ]
        },
        {
          label: "Guides",
          items: [
            { autogenerate: { directory: 'guides' } }
          ]
				},
        {
          label: 'Reference',
          items: [
            { label: 'API', link: '/api/' },
          ],
        }
			],
		}),
	],
});
