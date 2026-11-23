import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { SITE } from "../../data/site";
import { formatDate } from "../../lib/date";

// One social card per page, rendered at build time. Keys become /og/<key>.png.
const posts = await getCollection("blog", (p) => !p.data.draft && !p.data.external);

const pages: Record<string, { title: string; description: string }> = {
  index: { title: SITE.name, description: SITE.role },
  ...Object.fromEntries(
    posts.map((p) => [
      `blog/${p.data.slug}`,
      { title: p.data.title, description: `${SITE.name} · ${formatDate(p.data.date, "long")}` },
    ]),
  ),
};

// Light palette from global.css.
const bg: [number, number, number] = [247, 247, 246];
const ink: [number, number, number] = [27, 27, 26];
const muted: [number, number, number] = [107, 107, 102];

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [bg],
    // Shared backdrop with the rule and footer row; see src/og/background.html.
    bgImage: { path: "./src/og/background.png", fit: "none", position: "start" },
    padding: 96,
    font: {
      title: { families: ["Spectral"], weight: "Medium", size: 76, lineHeight: 1.1, color: ink },
      description: { families: ["Spectral"], weight: "Medium", size: 32, lineHeight: 1.4, color: muted },
    },
    // Only the italic is loaded: the renderer prefers an upright face when both exist.
    fonts: ["./node_modules/@fontsource/spectral/files/spectral-latin-500-italic.woff2"],
  }),
});
