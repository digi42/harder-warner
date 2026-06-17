# Harder & Warner

Rebuild of [harderandwarner.com](https://harderandwarner.com) — a mostly-static
[Astro](https://astro.build) site deployed to **Cloudflare Pages**, with **D1**
for form/order data and **Cloudflare Email Sending** for notifications.

## Stack

- **Astro 5** — default static output; interactive routes opt into SSR
  (Pages Functions) with `export const prerender = false`.
- **@astrojs/cloudflare** adapter → Cloudflare Pages (`_worker.js` + `_routes.json`).
- **D1** (`DB` binding) — orders, registrations, leads, contact submissions.
- **Turnstile** — spam protection on public forms.
- Clean URLs: `trailingSlash: 'never'` + `build.format: 'file'`.

## Site structure

Divisions live under subpaths; global pages are single-slug.

```
/                          home
/about  /careers  /contact global pages  (/contact is interactive)
/garden-center/*           Garden Center (bulk-goods + classes are interactive)
/design-build/*            Design & Build (consultation is interactive)
/professional-services/*   Professional Services (request-bid is interactive)
/tree-farm/*               Tree Farm (quote is interactive)
```

The sitemap is modeled in `src/lib/nav.ts`, which drives the header, footer, and
division landing pages.

## Local development

```bash
npm install
npm run dev                 # astro dev with Cloudflare bindings (platformProxy)
npm run db:migrate:local    # apply D1 migrations to local state
```

Copy `.dev.vars.example` → `.dev.vars` for local secrets.

## Cloudflare setup (one-time)

```bash
wrangler d1 create harderandwarner       # paste database_id into wrangler.jsonc
npm run db:migrate:remote                # apply schema to the remote DB
```

## Deployment — Cloudflare Pages + GitHub

One-time: in the Cloudflare dashboard, **Workers & Pages → Create → Pages →
Connect to Git**, select this repo, and set:

- Build command: `npm run build`
- Build output directory: `dist`

Pushing to the production branch then auto-builds and deploys; every PR gets a
preview URL. Bindings (D1, etc.) are read from `wrangler.jsonc` on build, or set
under the Pages project's **Settings → Functions → Bindings**.

Manual deploy (without Git): `npm run deploy`.

## TODO / open items

- Replace placeholder brand colors in `src/styles/global.css` with exact logo hex.
- Add the real logo SVG (`Header.astro`, `Footer.astro`).
- Wire Cloudflare Email Sending in `src/lib/email.ts` (currently logs).
- Replace Turnstile test keys with real keys.
- Build out interactive forms: bulk-goods, classes, consultation, tree quote, bid request.
- Decide on `/admin` auth (Cloudflare Access vs custom) — pending client confirmation.
- Migrate content (story, hours, areas served, testimonials, FAQ) into Content Collections.
