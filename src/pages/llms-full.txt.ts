import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, WORK } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  const work = WORK.map((w) => {
    const url = w.internal ? `${SITE.url}${w.url}` : w.url;
    return `- [${w.title}](${url}) (${w.company}): ${w.desc}`;
  }).join("\n");

  const fullPosts = posts
    .map((p) => {
      const header = `# ${p.data.title}\n\nDate: ${p.data.date}\n${
        p.data.description ? `Description: ${p.data.description}\n` : ""
      }`;
      if (p.data.external && p.data.link) {
        return `${header}\nPublished externally: ${p.data.link}`;
      }
      return `${header}\n${(p.body ?? "").trim()}`;
    })
    .join("\n\n---\n\n");

  const body = `# ${SITE.name}

> ${SITE.description}

Developer advocate based in ${SITE.location}. I build docs, tools, and community for developer products. Most recently I led docs and developer relations at Prisma.

## Links

- Home: ${SITE.url}
- Work: ${SITE.url}/work
- Blog: ${SITE.url}/blog
- GitHub: ${SITE.social.github}
- LinkedIn: ${SITE.social.linkedin}
- Email: ${SITE.email}
- Resume: ${SITE.url}/resume.pdf

## Work

${work}

---

# Writing

${fullPosts}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
