import { marked } from "marked"
import { createHighlighter } from "shiki"

const highlighter = await createHighlighter({
  themes: ["vitesse-light", "vitesse-dark"],
  langs: ["typescript", "javascript", "markdown", "mdx", "json", "bash", "tsx", "jsx", "css", "html"],
})

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && highlighter.getLoadedLanguages().includes(lang) ? lang : "text"
      return highlighter.codeToHtml(text, {
        lang: language,
        themes: { light: "vitesse-light", dark: "vitesse-dark" },
      })
    },
  },
})

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  description: string
  draft?: boolean
  external?: boolean
  link?: string
}

export interface Post {
  frontmatter: PostFrontmatter
  body: string
  html: string
}

const rawMarkdown = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, unknown> = {}
  let currentArrayKey: string | null = null

  const unquote = (v: string) => v.replace(/^["']|["']$/g, "")

  const parseInlineArray = (v: string): string[] | null => {
    if (!v.startsWith("[") || !v.endsWith("]")) return null
    const inner = v.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(",").map((s) => unquote(s.trim()))
  }

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue
    const arrayItem = line.match(/^\s*-\s+(.+)$/)
    if (arrayItem && currentArrayKey) {
      ;(data[currentArrayKey] as string[]).push(unquote(arrayItem[1].trim()))
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (kv) {
      const key = kv[1]
      const value = kv[2].trim()
      if (value === "") {
        data[key] = []
        currentArrayKey = key
        continue
      }
      const inlineArr = parseInlineArray(value)
      if (inlineArr !== null) {
        data[key] = inlineArr
        currentArrayKey = null
        continue
      }
      const unquoted = unquote(value)
      if (unquoted === "true") data[key] = true
      else if (unquoted === "false") data[key] = false
      else data[key] = unquoted
      currentArrayKey = null
    }
  }

  return { data, content: match[2] }
}

function buildPost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw)
  const fm: PostFrontmatter = {
    title: String(data.title ?? "Untitled"),
    slug: String(data.slug ?? ""),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    draft: data.draft === true,
    external: data.external === true,
    link: data.link ? String(data.link) : undefined,
  }
  const body = fm.external ? "" : content
  const html = fm.external ? "" : (marked.parse(content, { async: false }) as string)
  return { frontmatter: fm, body, html }
}

const ALL_POSTS: Post[] = Object.values(rawMarkdown)
  .map(buildPost)
  .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))

export function getPublishedPosts(): Post[] {
  return ALL_POSTS.filter((p) => !p.frontmatter.draft)
}

export function getAllPosts(): Post[] {
  return ALL_POSTS
}

export function getPostBySlug(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.frontmatter.slug === slug)
}
