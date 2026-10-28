import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages sets SITE_URL (https://usuario.github.io) and BASE_PATH (/repositorio).
// With a custom domain configured in Settings > Pages, BASE_PATH comes empty and the site runs at the root.
const site = process.env.SITE_URL || 'https://www.hlar.com.br';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
