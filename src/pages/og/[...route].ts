import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { SITE } from "../../data/site";
import { formatDate } from "../../lib/date";

// One social card per page, rendered at build time. Keys become /og/<key>.png.
const posts = await getCollection("blog", (p) => !p.data.draft && !p.data.external);

const pages: Record<string, { title: string; description: string }> = {
  index: { title: SITE.name, description: SITE.role },
  work: { title: "Work", description: `${SITE.name} · Things I built, shipped, and wrote.` },
  about: { title: "About", description: `${SITE.name} · ${SITE.role}` },
  ...Object.fromEntries(
    posts.map((p) => [
      `blog/${p.data.slug}`,
      { title: p.data.title, description: `${SITE.name} · ${formatDate(p.data.date, "long")}` },
    ]),
  ),
};

// Paper palette from global.css.
const bg: [number, number, number] = [246, 243, 236];
const ink: [number, number, number] = [28, 27, 24];
const muted: [number, number, number] = [88, 85, 78];

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
      title: { families: ["JetBrains Mono"], weight: "Medium", size: 64, lineHeight: 1.2, color: ink },
      description: { families: ["Inter"], weight: "Normal", size: 32, lineHeight: 1.4, color: muted },
    },
    fonts: [
      "./node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
      "./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
    ],
  }),
});
