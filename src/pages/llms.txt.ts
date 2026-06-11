import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, WORK } from "../data/site";

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

  const work = WORK.map((w) => {
    const url = w.internal ? `${SITE.url}${w.url}` : w.url;
    return `- [${w.title}](${url}) (${w.company}): ${w.desc}`;
  }).join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

Developer advocate based in ${SITE.location}. I build docs, tools, and community for developer products. Most recently I led docs and developer relations at Prisma.

## Pages

- [Home](${SITE.url}): Bio, selected work, and recent writing.
- [Work](${SITE.url}/work): Full list of shipped work and experience.
- [Blog](${SITE.url}/blog): Writing on docs, dev tools, and developer experience.

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
