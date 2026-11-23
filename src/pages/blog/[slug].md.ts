import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { formatDate } from "../../lib/date";

// Each post's markdown source, for agents.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", (p) => !p.data.draft && !p.data.external);
  return posts.map((post) => ({ params: { slug: post.data.slug }, props: { post } }));
};

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<"blog">>>[number] };
  const body = `# ${post.data.title}\n\n${formatDate(post.data.date, "long")}\n\n${(post.body ?? "").trim()}\n`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
