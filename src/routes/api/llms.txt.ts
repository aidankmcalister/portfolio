import { createFileRoute } from "@tanstack/react-router"
import { getPublishedPosts } from "@/lib/posts"
import { WORK, EXPERIENCE } from "@/data/work"

const BASE = "https://www.aidanmcalister.com"

export const Route = createFileRoute("/api/llms/txt")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getPublishedPosts().filter((p) => !p.frontmatter.external)

        const workItems = WORK.filter((w) => w.type !== "Post")
        const postItems = WORK.filter((w) => w.type === "Post" && !w.internal)
        const blogPosts = posts

        const workSection = workItems
          .map((w) => {
            const url = w.url.startsWith("/") ? `${BASE}${w.url}` : w.url
            return `- [${w.title}](${url}): ${w.desc}`
          })
          .join("\n")

        const blogSection = blogPosts
          .map(
            (p) =>
              `- [${p.frontmatter.title}](${BASE}/blog/${p.frontmatter.slug}): ${p.frontmatter.description}`,
          )
          .join("\n")

        const externalSection = postItems
          .map((w) => `- [${w.title}](${w.url}): ${w.desc}`)
          .join("\n")

        const experienceSection = EXPERIENCE.map(
          (e) =>
            `- ${e.company}, ${e.role} (${e.date}): ${e.desc}`,
        ).join("\n")

        const content = `# Aidan McAlister

> Developer advocate and technical writer focused on docs, dev tools, and developer experience. Previously at Prisma, where I led a 400+ page docs rebuild, built GEO infrastructure for AI discoverability, and shipped developer-facing tools.

## About

- [Home](${BASE}/): Overview, links, and experience
- [Work](${BASE}/work): Portfolio of docs, tools, OSS, and writing
- [Blog](${BASE}/blog): Posts on docs, dev tools, and AI visibility

## Blog

${blogSection}

## Work

${workSection}

## External posts

${externalSection}

## Experience

${experienceSection}

## Optional

- [Full content](${BASE}/llms-full.txt): Complete text of all blog posts and work descriptions
`

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        })
      },
    },
  },
})
