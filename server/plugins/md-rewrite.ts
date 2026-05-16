import { definePlugin } from "nitro"

const AI_AGENT_PATTERN =
  /ChatGPT-User|GPTBot|ClaudeBot|Anthropic-AI|PerplexityBot|Google-Extended|cohere-ai/i

const PAGE_MD_MAP: Record<string, string> = {
  "/": "/api/page-md/index",
  "/work": "/api/page-md/work",
  "/blog": "/api/page-md/blog",
}

export default definePlugin((nitro) => {
  nitro.hooks.hook("request", (event) => {
    const ua = event.req.headers.get("user-agent") ?? ""
    const accept = event.req.headers.get("accept") ?? ""
    if (!AI_AGENT_PATTERN.test(ua) || accept.includes("text/html")) return

    const pathname = event.url.pathname

    const blogSlugMatch = pathname.match(/^\/blog\/([^/.]+)\/?$/)
    if (blogSlugMatch) {
      event.url.pathname = `/api/blog-md/${blogSlugMatch[1]}`
      return
    }

    if (PAGE_MD_MAP[pathname]) {
      event.url.pathname = PAGE_MD_MAP[pathname]
    }
  })
})
