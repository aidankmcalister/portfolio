// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import rehypeExternalLinks from "rehype-external-links";
import { grayTheme, grayThemeDark } from "./src/lib/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.aidanmcalister.com",
  // Every page is still prerendered static HTML. The adapter only runs the one
  // server route that opts out (src/pages/api/contact.ts).
  adapter: vercel(),
  // The stylesheet is tiny; inlining it removes a render-blocking request.
  build: { inlineStylesheets: "always" },
  // The site is one page now; old routes land on its sections.
  redirects: { "/blog": "/#writing", "/work": "/#work", "/about": "/" },
  markdown: {
    shikiConfig: {
      themes: { light: /** @type {any} */ (grayTheme), dark: /** @type {any} */ (grayThemeDark) },
    },
    // External links in posts open in a new tab so readers don't lose their place here.
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noreferrer"], properties: { "aria-describedby": "new-tab" } },
      ],
    ],
  },
});
