import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://colvex.io',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } },
    }),
  ],
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: 'never' },
  /* The CSP allows external scripts only. Astro inlines script chunks smaller than this Vite
     limit by default, so it is set to 0 to keep bundled scripts out of the HTML. */
  vite: { build: { assetsInlineLimit: 0 } },
});
