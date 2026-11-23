import type { APIRoute } from "astro";
import { SITE, WORK } from "../data/site";
import { getPosts, postHref } from "../lib/posts";

const abs = (href: string) => (href.startsWith("/") ? SITE.url + href : href);

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const body = `# ${SITE.name}

> ${SITE.description}

Based in ${SITE.location}. Looking for a frontend, product or full-stack engineering role, developer relations, or docs or solutions engineering.

## Pages

- [Home](${SITE.url}/index.md): Bio, work, experience, writing and open source, as markdown.
- [Everything in one file](${SITE.url}/llms-full.txt)
- [Resume](${SITE.url}${SITE.resume})

## Work

${WORK.map((w) => `- [${w.title}](${abs(w.href ?? SITE.url)}): ${w.desc}`).join("\n")}

## Writing

${posts
  .map((p) => {
    const href = postHref(p);
    const md = p.data.external ? href : `${SITE.url}${href}.md`;
    return `- [${p.data.title}](${md}): ${p.data.description}`;
  })
  .join("\n")}

## Contact

- Email: ${SITE.email}
- GitHub: ${SITE.social.github}
- LinkedIn: ${SITE.social.linkedin}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
