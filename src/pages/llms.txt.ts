import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  const writing = posts
    .map((p) => {
      const url =
        p.data.external && p.data.link
          ? p.data.link
          : `${SITE.url}/blog/${p.data.slug}`;
      return `- [${p.data.title}](${url}): ${p.data.description}`;
    })
    .join("\n");

  const work = (await getCollection("projects"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((p) => {
      return `- [${p.data.title}](${p.data.href}): ${p.data.summary}`;
    })
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

Developer advocate and TypeScript engineer based in ${SITE.location}. I'm looking for my next role in developer relations or frontend and devtools engineering. At Prisma I shipped create-db, a CLI with 6M+ runs, led a 400+ page docs rebuild that kept ~90% of search traffic, and grew the Discord community past 10,000 members.

## Pages

- [Home](${SITE.url}): Bio, links, and what I'm currently building.
- [Work](${SITE.url}/work): Projects, writing, open source, and tools.
- [About](${SITE.url}/about): Background and how to reach me.

## Writing

${writing}

## Work

${work}

## Links

- GitHub: ${SITE.social.github}
- LinkedIn: ${SITE.social.linkedin}
- Email: ${SITE.email}
- Resume: ${SITE.url}/resume.pdf
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
