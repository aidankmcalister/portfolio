import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  const work = (await getCollection("projects"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((p) => {
      return `- [${p.data.title}](${p.data.href}): ${p.data.summary}`;
    })
    .join("\n");

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

Developer advocate and TypeScript engineer based in ${SITE.location}. I'm looking for my next role in developer relations or frontend and devtools engineering. At Prisma I shipped create-db, a CLI with 6M+ runs, led a 400+ page docs rebuild that kept ~90% of search traffic, and grew the Discord community past 10,000 members.

## Links

- Home: ${SITE.url}
- Work (projects and writing): ${SITE.url}/work
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
