import { createFileRoute } from "@tanstack/react-router"
import { getPublishedPosts } from "@/lib/posts"
import { WORK } from "@/data/work"

const BASE = "https://www.aidanmcalister.com"

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getPublishedPosts()

        const staticPages = [
          { loc: "/", priority: "1.0", changefreq: "weekly" },
          { loc: "/work", priority: "0.8", changefreq: "monthly" },
          { loc: "/blog", priority: "0.8", changefreq: "weekly" },
        ]

        const blogEntries = posts
          .filter((p) => !p.frontmatter.external)
          .map((p) => ({
            loc: `/blog/${p.frontmatter.slug}`,
            lastmod: p.frontmatter.date,
            priority: "0.6",
            changefreq: "monthly",
          }))

        const blogSlugs = new Set(blogEntries.map((e) => e.loc))
        const workEntries = WORK.filter(
          (w) => w.internal && !blogSlugs.has(w.url),
        ).map((w) => ({
          loc: w.url,
          priority: "0.5",
          changefreq: "yearly",
        }))

        const urls = [...staticPages, ...blogEntries, ...workEntries]

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        })
      },
    },
  },
})
