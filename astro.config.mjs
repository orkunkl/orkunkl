import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://orkunkl.com',
  // directory format → /work/ resolves to work/index.html on every static host,
  // no rewrite rules needed. Same shape as sunnya97.com, whose canonical is
  // https://sunnya97.com/now/
  build: { format: 'directory' },
  trailingSlash: 'ignore',
});
