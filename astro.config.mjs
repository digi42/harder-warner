// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Mostly-static site: pages prerender by default. Interactive routes opt into
// on-demand rendering with `export const prerender = false`.
export default defineConfig({
  site: 'https://harderandwarner.com',

  // Clean URLs with no trailing slash (e.g. /about, not /about/).
  trailingSlash: 'never',
  build: {
    // Emit /about.html instead of /about/index.html so `never` is served correctly.
    format: 'file',
  },

  adapter: cloudflare({
    // Use Cloudflare's platform proxy in `astro dev` so D1/KV/etc. bindings
    // from wrangler.jsonc are available locally.
    platformProxy: {
      enabled: true,
    },
  }),
});
