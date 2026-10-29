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
          label: 'Canvas',
          items: [{ autogenerate: { directory: 'canvas' } }],
        },
        {
          label: 'Reference',
          items: [
            { label: 'API', link: '/api/' },
            { label: 'Events', link: '/api/events/' },
            { label: 'All types', link: '/api/types/' },
            { label: 'Models', items: [{ autogenerate: { directory: 'models' } }], collapsed: true },
            { label: 'Options', items: [{ autogenerate: { directory: 'options' } }], collapsed: true },
          ],
        }
			],
		}),
	],
});
