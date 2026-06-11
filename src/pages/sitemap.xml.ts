import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).filter(
    (p) => !p.data.draft && !p.data.external,
  );

  const urls = [
    { loc: SITE.url },
    { loc: `${SITE.url}/work` },
    { loc: `${SITE.url}/blog` },
    ...posts.map((p) => ({
      loc: `${SITE.url}/blog/${p.data.slug}`,
      lastmod: p.data.date,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${
        "lastmod" in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""
      }</url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
