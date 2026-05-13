import { createFileRoute } from "@tanstack/react-router"
import { getPublishedPosts } from "@/lib/posts"

export const Route = createFileRoute("/og-preview")({
  loader: () => {
    const origin = import.meta.env.VITE_APP_URL ?? "http://localhost:3000"

    const posts = getPublishedPosts()

    const pages = [
      { label: "Home", path: "/", title: "Aidan McAlister" },
      { label: "Work", path: "/work", title: "Work" },
      { label: "Blog", path: "/blog", title: "Blog" },
      ...posts.map((post) => ({
        label: post.frontmatter.title,
        path: `/blog/${post.frontmatter.slug}`,
        title: post.frontmatter.title,
      })),
    ]

    return { pages, origin }
  },
  component: OgPreview,
})

function OgPreview() {
  const { pages, origin } = Route.useLoaderData()

  return (
    <div className="animate-fade pb-20">
      <div className="pb-8 pt-20 max-sm:pb-6 max-sm:pt-12">
        <h2 className="mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink">
          OG Preview
        </h2>
        <p className="max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted">
          Generated Open Graph images for every page. New pages appear automatically.
        </p>
      </div>

      <div className="border-t border-page-border-soft" />

      <div className="flex flex-col gap-10 pt-10">
        {pages.map((page) => (
          <div key={page.path}>
            <div className="mb-3 flex items-baseline gap-2.5">
              <span className="text-[13px] font-[500] text-page-ink">{page.label}</span>
              <span className="font-mono text-[11px] text-page-faint">{page.path}</span>
            </div>
            <img
              src={`${origin}/api/og?title=${encodeURIComponent(page.title)}&author=Aidan+McAlister`}
              alt={`OG image for ${page.label}`}
              width={1200}
              height={630}
              className="w-full max-w-[560px] rounded-sm border border-page-border-soft"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
