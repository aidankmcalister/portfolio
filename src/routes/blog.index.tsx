import { Link, createFileRoute } from "@tanstack/react-router"
import { Fragment } from "react"
import { getPublishedPosts, type Post } from "@/lib/posts"
import { Divider, ListRow, RowArrow } from "@/components/list-row"

export const Route = createFileRoute("/blog/")({ component: Blog })

function formatDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const formatted = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

function Blog() {
  const posts = getPublishedPosts()

  return (
    <div className="animate-fade pb-16">
      <div className="pb-8 pt-20 max-sm:pb-6 max-sm:pt-12">
        <h1 className="mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink">
          Blog
        </h1>
        <p className="max-w-[560px] font-mono text-[13.5px] leading-[1.65] text-page-muted">
          Things I'm thinking about. Mostly docs, dev tools, and the lessons that show up when you ship them.
        </p>
      </div>

      <div className="border-t border-page-border-soft transition-colors duration-[220ms]" />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-28 text-center max-sm:py-20">
          <div className="text-[14px] text-page-faint">nothing posted yet</div>
          <div className="max-w-[320px] text-[13px] leading-[1.6] text-page-muted">
            drafts in progress. first one lands soon.
          </div>
        </div>
      ) : (
        <div>
          {posts.map((post, i) => (
            <Fragment key={post.frontmatter.slug}>
              {i > 0 && <Divider />}
              <BlogRow post={post} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

function BlogRow({ post }: { post: Post }) {
  const { slug, title, date, description, external, link } = post.frontmatter

  return (
    <ListRow
      href={external && link ? link : `/blog/${slug}`}
      internal={!external}
      className="grid-cols-[96px_minmax(0,1fr)_14px] max-sm:grid-cols-[1fr_14px] max-sm:gap-1"
    >
      <div className="text-[11px] text-page-muted max-sm:col-span-full max-sm:-mb-0.5">{formatDate(date)}</div>
      <div className="text-[13.5px] leading-[1.4] text-page-ink">
        {title}
        {description ? (
          <span className="mt-[3px] block text-[12px] leading-[1.5] text-page-muted max-sm:line-clamp-2">
            {description}
          </span>
        ) : null}
      </div>
      <RowArrow direction={external ? "up-right" : "right"} />
    </ListRow>
  )
}
