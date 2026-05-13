import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { getPublishedPosts, type Post } from "@/lib/posts"

export const Route = createFileRoute("/blog")({ component: Blog })

function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

function Blog() {
  const posts = getPublishedPosts()

  return (
    <div className="animate-fade pb-16">
      {/* Header */}
      <div className="pb-8 pt-20 max-sm:pb-6 max-sm:pt-12">
        <h2 className="mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink">
          Blog
        </h2>
        <p className="max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted">
          Things I'm thinking about. Mostly docs, dev tools, and the lessons that show up when you ship them.
        </p>
      </div>

      <div className="border-t border-page-border-soft" />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-28 text-center max-sm:py-20">
          <div className="text-[14px] text-page-faint">nothing posted yet</div>
          <div className="max-w-[320px] text-[13px] leading-[1.6] text-page-muted">
            drafts in progress. first one lands soon.
          </div>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogRow key={post.frontmatter.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

function BlogRow({ post }: { post: Post }) {
  const { slug, title, date, description } = post.frontmatter
  return (
    <Link
      className="blog-row"
      to="/blog/$slug"
      params={{ slug }}
    >
      <div className="blog-date text-[11px] lowercase text-page-muted">{formatDate(date)}</div>
      <div className="text-[13.5px] leading-[1.4] text-page-ink">
        {title}
        {description ? (
          <span className="mt-[3px] block text-[12px] leading-[1.5] text-page-muted">
            {description}
          </span>
        ) : null}
      </div>
      <div className="work-arrow">
        <ArrowUpRight className="h-[11px] w-[11px]" />
      </div>
    </Link>
  )
}
