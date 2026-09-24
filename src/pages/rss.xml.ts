import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "../data/site";
import { getPosts, postHref } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name}: Writing`,
    description: "Notes on docs, developer experience, and building for AI agents.",
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.date),
      link: postHref(p),
    })),
  });
}
