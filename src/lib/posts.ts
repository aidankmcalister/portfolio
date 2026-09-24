import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

// Published posts, newest first. External entries link out to where they were published.
export async function getPosts() {
  return (await getCollection("blog", (p) => !p.data.draft)).sort((a, b) =>
    a.data.date < b.data.date ? 1 : -1,
  );
}

export function postHref(post: Post) {
  return post.data.external && post.data.link ? post.data.link : `/blog/${post.data.slug}`;
}
