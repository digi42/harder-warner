/// <reference types="astro/client" />

// Bindings available on `Astro.locals.runtime.env` (see wrangler.jsonc).
// Run `npm run cf-typegen` to regenerate richer types into worker-configuration.d.ts.
interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
  NOTIFY_EMAIL: string;
  // EMAIL?: SendEmail; // Cloudflare Email Sending binding (added when provisioned)
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
