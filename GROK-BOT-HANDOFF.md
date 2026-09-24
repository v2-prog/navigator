# Handoff — convert Navigator into an installable app

**For a later Grok session / Grok bot.** Do not treat this as licensed advice work.

## What already exists

Static Australia-only notebook:

- SPA source: https://github.com/v2-prog/navigator
- Multi-page twin: https://github.com/v2-prog/acerlab
- Parent studio: https://github.com/v2-prog/structure-lab · live https://acerlab.link
- Local copy in this workspace: `artifacts/navigator/`

It is already a PWA shell:

- `site.webmanifest` + `sw.js`
- Icons `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- Install button on the home screen (Chrome / Edge / Android)
- iOS: Share → Add to Home Screen
- Calculators and progress stay in `localStorage`. No accounts. No bank feeds.

## What “convert into an app” still means (pick one, do not do all three at once)

1. **Ship the PWA** (preferred, already started)
   - Cloudflare Pages on `v2-prog/navigator`, Framework None, output `/`
   - Custom host `navigator.acerlab.link` (zone acerlab.link, account Amarwakara@gmail.com)
   - HTTPS is required for install prompts and service workers
   - Do not attach earthacer.in

2. **Wrap as a Capacitor / TWA Android package** only if a store listing is actually required
   - Keep the same static files as the webview content
   - No new backend
   - Still education-only; keep the banner

3. **Do not** rebuild this as a React Native / store-first product unless Doug asks again. The members have mixed digital literacy. A home-screen PWA matches the brief.

## Rules the next bot must not break

- Australia only. ACT default jurisdiction.
- Education, not advice. Banner on every screen.
- No storage of TFNs, account numbers, or payroll files.
- CLT / charity with an asset lock is not a family discretionary trust.
- Zoning output is a council-email draft, not a determination.
- Wage sketch = marginal rates + Medicare levy illustration only (FY figures in `data.js`).
- Treasurer desk is a local pass-phrase, default `acerlab`, not a multi-user server.

## Suggested next commits

1. Copy current workspace `app.js`, `data.js`, `app.css`, `sw.js`, `site.webmanifest`, icons onto `v2-prog/navigator` main if they are not already there.
2. Connect Cloudflare Pages and the CNAME.
3. Test install on Android Chrome and iPhone Safari.
4. Only then consider a Play Store TWA.

## Voice / brand

Paper + forest green. Newsreader + IBM Plex. Structure Lab AU / Earth Acer / Ever Earth Acre / Doug’s Lab AU. No US tax toys (no LLC, no 1031, no Augusta rule).
