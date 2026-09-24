// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { grayTheme } from "./src/lib/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.aidanmcalister.com",
  // Writing now lives on /work.
  redirects: { "/blog": "/work#writing" },
  markdown: { shikiConfig: { theme: /** @type {any} */ (grayTheme) } },
  vite: { plugins: [tailwindcss()] },
});
