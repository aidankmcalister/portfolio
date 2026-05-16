import { Link, createFileRoute, notFound, redirect } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, type Post } from "@/lib/posts"

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  beforeLoad: ({ params }) => {
    if (params.slug.endsWith(".md")) {
      const realSlug = params.slug.slice(0, -3)
      throw redirect({ to: `/api/blog-md/${realSlug}` as string, statusCode: 302 })
    }
  },
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post || post.frontmatter.draft || post.frontmatter.external) throw notFound()

    const origin = import.meta.env.DEV
      ? "http://localhost:3000"
      : "https://www.aidanmcalister.com"

    return { post, origin }
  },
  head: ({ loaderData }) => {
    const fm = loaderData?.post.frontmatter
    const origin = loaderData?.origin ?? ""
    if (!fm) return {}

    const encodedTitle = encodeURIComponent(fm.title).replace(/'/g, "%27")
    const ogImage = `${origin}/api/og?title=${encodedTitle}&author=Aidan+McAlister`

    return {
      meta: [
        { title: fm.title },
        ...(fm.description ? [{ name: "description", content: fm.description }] : []),
        { property: "og:title", content: fm.title },
        ...(fm.description
          ? [{ property: "og:description", content: fm.description }]
          : []),
        { property: "og:type", content: "article" },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fm.title },
        { name: "twitter:image", content: ogImage },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: fm.title,
            description: fm.description,
            datePublished: fm.date,
            image: ogImage,
            author: {
              "@type": "Person",
              name: "Aidan McAlister",
              url: "https://www.aidanmcalister.com",
            },
            publisher: {
              "@type": "Person",
              name: "Aidan McAlister",
              url: "https://www.aidanmcalister.com",
            },
          }),
        },
      ],
    }
  },
})

function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: Post }
  const { title, date } = post.frontmatter

  return (
    <article className="animate-fade pb-20">
      <div className="pb-10 pt-20 max-sm:pb-8 max-sm:pt-12">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-[12px] text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
        >
          <ArrowLeft className="h-[11px] w-[11px]" />
          back to blog
        </Link>

        <h1 className="mb-5 text-[26px] font-[500] leading-[1.3] tracking-[-0.018em] text-page-ink max-sm:text-[22px]">
          {title}
        </h1>

        <div className="font-mono text-[12px] text-page-muted">{formatDate(date)}</div>
      </div>

      <div className="border-t border-page-border-soft transition-colors duration-[220ms]" />

      <div
        className="prose-blog pt-10 max-sm:pt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
