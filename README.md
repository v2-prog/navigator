# AcerLab Navigator

Financial literacy + cohabitation / eco-village navigator. Companion notebook to [Structure Lab AU](https://acerlab.link) (`v2-prog/structure-lab`).

**Australia only. General education, not advice.**

Canonical product family: Structure Lab AU · Earth Acer · Ever Earth Acre · workshop voice Doug’s Lab AU.

## Why this is a separate repo

Structure Lab AU already holds trusts, CGT flags, CLT vs family-trust forks. Navigator holds:

1. Money literacy for community / Quaker / co-op members (budget, wage language, compounding, debt, glossary, device-local progress).
2. Shared-living pathway questions (title models, zoning email drafts, NCC class flags, levies, checklists, directory).

Calculators stay in the browser. No bank feeds. No lead capture. Treasurer desk is a local pass-phrase over `localStorage`, not a multi-user backend.

## GitHub + Cloudflare

| Role | URL |
| --- | --- |
| Source (this repo) | https://github.com/v2-prog/navigator |
| Structure Lab (parent notebook) | https://github.com/v2-prog/structure-lab |
| Live Structure Lab | https://acerlab.link |
| Suggested Pages hostname | `navigator.acerlab.link` |

The GitHub account attached to this workspace is **v2-prog**, not AmarWak. AmarWak copies have historically been mirrors without Cloudflare source rights. Ship from v2-prog; fork or mirror to AmarWak if you want a second copy.

Cloudflare account: **Amarwakara@gmail.com** (zone `acerlab.link`).

### Pages settings

1. Workers & Pages → Create → Connect to Git → **v2-prog/navigator**, branch `main`.
2. Framework preset: None. Build command: empty. Output directory: `/`.
3. Custom domain: `navigator.acerlab.link` (add a CNAME in the acerlab.link zone).
4. Do not attach `earthacer.in`.

## Local

Open `index.html` in a browser, or:

```
python3 -m http.server 8080
```

## Prompt adjustments made while building

- Jurisdiction pack is Australia-only (ACT default), matching Structure Lab — not a generic multi-country zoning engine.
- No server-side member database. Progress and treasurer extras stay on-device so sensitive money data is never stored by us.
- Wage module is labelled a sketch (marginal rates + Medicare levy only). Caps shown as FY2025–26 illustrations.
- Zoning output is a council-email draft, not a determination.
- Asset-lock warning is repeated: a CLT/charity is not a family discretionary trust.
- Admin engagement is anonymised page-open counts in this browser, not a group analytics product.
- Brand tokens copied from Structure Lab AU (paper, forest green, Newsreader / IBM Plex).

## Files

- `index.html` — shell
- `app.css` — brand
- `data.js` — copy, caps, structures, directory
- `app.js` — hash router, calculators, treasurer desk
- `wrangler.toml` — Pages hint
