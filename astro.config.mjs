// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import { grayTheme } from "./src/lib/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.aidanmcalister.com",
  // Writing now lives on /work.
  redirects: { "/blog": "/work#writing" },
  markdown: {
    shikiConfig: { theme: /** @type {any} */ (grayTheme) },
    // External links in posts open in a new tab so readers don't lose their place here.
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noreferrer"], properties: { "aria-describedby": "new-tab" } },
      ],
    ],
  },
  vite: { plugins: [tailwindcss()] },
});
