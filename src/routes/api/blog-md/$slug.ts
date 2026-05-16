import { createFileRoute } from "@tanstack/react-router"
import { getPostBySlug, getPublishedPosts } from "@/lib/posts"

export const Route = createFileRoute("/api/blog-md/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const post = getPostBySlug(params.slug)

        if (!post || post.frontmatter.draft) {
          const posts = getPublishedPosts()
          const suggestions = posts
            .filter((p) => !p.frontmatter.external)
            .slice(0, 5)
            .map(
              (p) =>
                `- [${p.frontmatter.title}](https://www.aidanmcalister.com/blog/${p.frontmatter.slug}.md)`,
            )
            .join("\n")

          return new Response(
            `# 404 — Post not found

The post "${params.slug}" doesn't exist.

## Available posts

${suggestions}

## Navigation

- [All posts](https://www.aidanmcalister.com/blog.md)
- [llms.txt index](https://www.aidanmcalister.com/llms.txt)
- [Full content](https://www.aidanmcalister.com/llms-full.txt)
`,
            {
              status: 404,
              headers: { "Content-Type": "text/markdown; charset=utf-8" },
            },
          )
        }

        const content = `---
title: ${post.frontmatter.title}
date: ${post.frontmatter.date}
description: ${post.frontmatter.description}
---

${post.body}`

        return new Response(content, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        })
      },
    },
  },
})
