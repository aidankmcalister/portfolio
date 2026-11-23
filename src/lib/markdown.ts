// The home page as markdown, built from the same data as the HTML page so the two
// never drift. Served at /index.md and inside /llms-full.txt.
import { SITE, WORK, EXPERIENCE, GUIDES, OPEN_SOURCE, type Item } from "../data/site";
import { formatDate } from "./date";
import { getPosts, postHref } from "./posts";

const abs = (href: string) => (href.startsWith("/") ? SITE.url + href : href);
const list = (items: Item[]) =>
  items
    .map((i) => `- ${i.href ? `[${i.title}](${abs(i.href)})` : i.title} (${i.aside}): ${i.desc}`)
    .join("\n");

export async function homeMarkdown() {
  const posts = (await getPosts()).map((p) => ({
    title: p.data.title,
    desc: p.data.description,
    aside: formatDate(p.data.date),
    href: postHref(p),
  }));

  return `# ${SITE.name}

I’m a frontend-leaning full-stack engineer and Developer Advocate. I build TypeScript tools, docs and developer-facing products.

At Prisma, I led the 400+ page docs rebuild, built create-db, and made the docs readable to AI agents. On my own, I built OpenTape, a free and open-source screen recorder for macOS.

I live in Boston and I’m looking for my next role as a frontend, product or full-stack engineer, in developer relations, or in docs or solutions engineering. The best way to reach me is ${SITE.email}.

- Resume: ${SITE.url}${SITE.resume}
- GitHub: ${SITE.social.github}
- LinkedIn: ${SITE.social.linkedin}

## Work

${list(WORK)}

## Experience

${list(EXPERIENCE)}

## Writing

${list(posts)}

## Guides

I wrote 20+ framework and integration guides for the Prisma docs, averaging 3,000+ monthly views each, plus the guide-writing standard the team uses.

${GUIDES.map((g) => `- [${g.title}](${g.href})`).join("\n")}

## Open source

Merged pull requests to other projects, most of them Prisma integration docs.

${list(OPEN_SOURCE)}
`;
}
