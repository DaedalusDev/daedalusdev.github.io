import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://daedalusdev.github.io',
  i18n: { defaultLocale: 'fr', locales: ['fr', 'en'] },
  integrations: [sitemap()],
})
