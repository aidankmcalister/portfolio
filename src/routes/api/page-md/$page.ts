import { createFileRoute } from "@tanstack/react-router"
import { getPublishedPosts } from "@/lib/posts"
import { WORK, EXPERIENCE, STATS } from "@/data/work"

const BASE = "https://www.aidanmcalister.com"

function generateHomeMd() {
  const experienceLines = EXPERIENCE.map(
    (e) => `- **${e.role}** @ ${e.company} (${e.date}): ${e.desc}`,
  ).join("\n")

  return `# Aidan McAlister

> Helping developers ship faster, and feel heard.

I build the docs, tools, and community around developer products. Previously at [Prisma](https://prisma.io).

## Links

- [Work](${BASE}/work): Portfolio of docs, tools, OSS, and writing
- [Blog](${BASE}/blog): Posts on docs, dev tools, and AI visibility
- [GitHub](https://github.com/aidankmcalister)
- [LinkedIn](https://www.linkedin.com/in/aidankmcalister/)

## Experience

${experienceLines}

## See also

- [Full llms.txt index](${BASE}/llms.txt)
- [Complete content dump](${BASE}/llms-full.txt)
`
}

function generateWorkMd() {
  const workByType = new Map<string, typeof WORK>()
  for (const item of WORK) {
    const list = workByType.get(item.type) ?? []
    list.push(item)
    workByType.set(item.type, list)
  }

  const sections = Array.from(workByType.entries())
    .map(([type, items]) => {
      const lines = items
        .map((w) => {
          const url = w.url.startsWith("/") ? `${BASE}${w.url}` : w.url
          return `### ${w.title}\n\n${w.desc}\n\nCompany: ${w.company} | [View](${url})`
        })
        .join("\n\n---\n\n")
      return `## ${type}\n\n${lines}`
    })
    .join("\n\n")

  const experienceLines = EXPERIENCE.map(
    (e) =>
      `### ${e.role} @ ${e.company}\n\n${e.date} | ${e.kind}\n\n${e.desc}`,
  ).join("\n\n---\n\n")

  return `# Aidan McAlister — Work

> Portfolio of docs, tools, OSS, and writing.

${sections}

## Experience

${experienceLines}
`
}

function generateBlogIndexMd() {
  const posts = getPublishedPosts()

  const lines = posts
    .map(
      (p) =>
        `- [${p.frontmatter.title}](${BASE}/blog/${p.frontmatter.slug}) (${p.frontmatter.date}): ${p.frontmatter.description}`,
    )
    .join("\n")

  return `# Aidan McAlister — Blog

> Posts on docs, dev tools, and AI visibility.

${lines}
`
}

const generators: Record<string, () => string> = {
  index: generateHomeMd,
  work: generateWorkMd,
  blog: generateBlogIndexMd,
}

export const Route = createFileRoute("/api/page-md/$page")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const gen = generators[params.page]
        if (!gen) {
          return new Response(
            `# 404 — Page not found

The page "${params.page}" doesn't exist.

## Available pages

- [Home](https://www.aidanmcalister.com/index.md)
- [Work](https://www.aidanmcalister.com/work.md)
- [Blog](https://www.aidanmcalister.com/blog.md)

## Navigation

- [llms.txt index](https://www.aidanmcalister.com/llms.txt)
- [Full content](https://www.aidanmcalister.com/llms-full.txt)
`,
            {
              status: 404,
              headers: { "Content-Type": "text/markdown; charset=utf-8" },
            },
          )
        }

        return new Response(gen(), {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        })
      },
    },
  },
})
