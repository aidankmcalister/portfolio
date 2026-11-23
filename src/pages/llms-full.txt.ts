import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";
import { homeMarkdown } from "../lib/markdown";

// The whole site in one file: the home page, then every post on this site in full.
export const GET: APIRoute = async () => {
  const posts = (await getPosts()).filter((p) => !p.data.external);
  const full = posts
    .map((p) => `# ${p.data.title}\n\nDate: ${p.data.date}\n\n${(p.body ?? "").trim()}`)
    .join("\n\n---\n\n");
  return new Response(`${await homeMarkdown()}\n---\n\n${full}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
