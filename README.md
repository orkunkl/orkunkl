# orkun.kl

Personal site — Astro + Pagefind, no framework theme, hand-written CSS.

```
src/
├── content.config.ts          # collection schemas (the shape of every entry)
├── content/                   # ← ALL CONTENT LIVES HERE (Markdown)
│   ├── work/                  #   /work
│   ├── inspirations/          #   /inspirations
│   ├── canon/                 #   /canon
│   └── README.md              #   frontmatter reference
├── layouts/BaseLayout.astro   # <head>, nav, footer, search
├── components/                # Nav · Footer · Search
├── pages/
│   ├── index.astro            # /
│   ├── about.astro            # /about
│   ├── work/index.astro       #   list
│   ├── work/[...slug].astro   #   detail
│   ├── inspirations/…         #   same pattern
│   ├── canon/…                #   same pattern
│   ├── llms.txt.ts            # /llms.txt
│   └── llms-full.txt.ts       # /llms-full.txt
└── styles/global.css          # everything, CSS custom properties
```

## Commands

```bash
bun install
bun run dev          # dev server, http://localhost:4321
bun run build        # → dist/
bun run postbuild    # Pagefind index over dist/  (run after build)
bun run preview      # serve dist/
```

`bun run site` chains build → preview.

Search and `llms.txt` only exist in a **built** site — Pagefind indexes `dist/`,
and both are static endpoints. In dev the search panel opens and says so.

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

## Deploy

Static output — point any host at `dist/`. On Netlify / Vercel / Cloudflare
Pages set the build command to `bun run build` and add `bun run postbuild` as
the post-build step (or use `bun run build && bun run postbuild`).

Set the real domain in `astro.config.mjs` → `site`, so `llms.txt` and canonical
URLs are absolute.
