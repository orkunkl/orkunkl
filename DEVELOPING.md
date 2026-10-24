# Developing orkun.kl

Personal site — Astro + Pagefind, no framework theme, hand-written CSS.

```
src/
├── content.config.ts          # collection schemas (the shape of every entry)
├── content/                   # ← ALL CONTENT LIVES HERE (Markdown)
│   ├── work/                  #   /work
│   ├── canon/                 #   /canon
│   └── README.md              #   frontmatter reference
├── layouts/BaseLayout.astro   # <head>, nav, footer, search
├── components/                # Nav · Footer · Search
├── pages/
│   ├── index.astro            # /
│   ├── about.astro            # /about
│   ├── work/index.astro       #   list
│   ├── work/[...slug].astro   #   detail
│   ├── canon/…                #   same pattern
│   ├── llms.txt.ts            # /llms.txt
│   ├── llms-full.txt.ts       # /llms-full.txt
│   ├── robots.txt.ts          # /robots.txt
│   └── sitemap.xml.ts         # /sitemap.xml
└── styles/theme.css           # tokens and everything else, CSS custom properties
```

## Commands

```bash
bun install
bun run dev          # dev server, http://localhost:4321
bun run build        # astro build → dist/, then the Pagefind index over it
bun run preview      # serve dist/
bun run site         # build, then preview
```

`build` runs Pagefind itself, so search is indexed in the same step — there is no
separate post-build command.

Search, `llms.txt`, `llms-full.txt`, `robots.txt` and `sitemap.xml` exist only in a
**built** site: they are static endpoints, and Pagefind indexes `dist/`. In dev the
search panel opens and says so.

## Adding content

Copy `_template.md` in the right `src/content/<collection>/` folder to a new
name and fill in the frontmatter. Listing, detail page, search index and
`llms.txt` all update on the next build — no code changes.

Files starting with `_` are ignored by the loader, so templates never publish.

## Gotchas

- **The content cache goes stale when you *delete* a Markdown file.** Astro's
  `.astro/` cache does not invalidate on deletion, so a removed entry keeps
  publishing. If a deleted page is still in `dist/`, run:

  ```bash
  rm -rf .astro node_modules/.astro dist && bun run build
  ```

- **`build.format` is `directory`** — `/work` is `dist/work/index.html`. Every
  static host resolves that without rewrite rules. Changing it to `file` breaks
  extension-less URLs on plain file servers.

- **Search assets load lazily.** `pagefind-ui.js` is injected on first open of
  the panel, so a 404 there means Pagefind hasn't run over the current `dist/`.

- **A `public/` asset keeps its filename across deploys**, so a replaced image
  can lag behind the HTML on the CDN. Bundled CSS and JS are content-hashed and
  never go stale; images under `public/` are not.

## Deploy

Static output — point any host at `dist/`. On Cloudflare, set the build command to
`bun run build` and the output directory to `dist`.

Two things that have broken this build before:

- **Do not add a separate post-build step** for Pagefind; `build` already chains it.
- **Pin the host's Bun to the version that wrote `bun.lock`.** A newer Bun writes a
  lockfile version the CI's Bun cannot parse, which fails at `bun install` before
  the framework ever runs.

Set the real domain in `astro.config.mjs` → `site`, so `llms.txt`, `sitemap.xml`
and the canonical URLs are absolute.
