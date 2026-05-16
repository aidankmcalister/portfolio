import { createFileRoute } from "@tanstack/react-router"
import { getAllPosts } from "@/lib/posts"
import { WORK, EXPERIENCE } from "@/data/work"

export const Route = createFileRoute("/api/llms-full/txt")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts().filter(
          (p) => !p.frontmatter.draft && !p.frontmatter.external,
        )

        const workSection = WORK.map(
          (item) =>
            `### ${item.title}\n\nType: ${item.type} | Company: ${item.company}\n\n${item.desc}\n\nURL: ${item.url}`,
        ).join("\n\n---\n\n")

        const experienceSection = EXPERIENCE.map(
          (item) =>
            `### ${item.role} @ ${item.company}\n\n${item.date} | ${item.kind}\n\n${item.desc}`,
        ).join("\n\n---\n\n")

        const postSections = posts
          .map(
            (post) =>
              `### ${post.frontmatter.title}\n\nDate: ${post.frontmatter.date}\n\n${post.body}`,
          )
          .join("\n\n---\n\n")

        const content = `# Aidan McAlister — Full Content

> Developer advocate and technical writer focused on docs, dev tools, and developer experience. Previously at Prisma, where I led a 400+ page docs rebuild, built GEO infrastructure for AI discoverability, and shipped developer-facing tools.

This file contains the full text of all published blog posts and work descriptions. For a shorter overview with links, see /llms.txt.

## Work

${workSection}

## Experience

${experienceSection}

## Blog posts

${postSections}
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
