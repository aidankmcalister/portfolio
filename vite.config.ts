import type { Plugin } from "vite"
import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const AI_AGENT_PATTERN =
  /ChatGPT-User|GPTBot|ClaudeBot|Anthropic-AI|PerplexityBot|Google-Extended|cohere-ai/i

function mdAliasPlugin(): Plugin {
  return {
    name: "md-alias",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const blogMatch = req.url?.match(/^\/blog\/(.+)\.md$/)
        if (blogMatch) {
          req.url = `/api/blog-md/${blogMatch[1]}`
          return next()
        }

        const pageMap: Record<string, string> = {
          "/index.md": "/api/page-md/index",
          "/work.md": "/api/page-md/work",
          "/blog.md": "/api/page-md/blog",
        }
        if (req.url && pageMap[req.url]) {
          req.url = pageMap[req.url]
          return next()
        }

        const ua = req.headers["user-agent"] ?? ""
        const accept = req.headers["accept"] ?? ""
        if (AI_AGENT_PATTERN.test(ua) && !accept.includes("text/html")) {
          const blogSlugMatch = req.url?.match(/^\/blog\/([^/.]+)\/?$/)
          if (blogSlugMatch) {
            req.url = `/api/blog-md/${blogSlugMatch[1]}`
            return next()
          }

          const contentNegMap: Record<string, string> = {
            "/": "/api/page-md/index",
            "/work": "/api/page-md/work",
            "/blog": "/api/page-md/blog",
          }
          if (req.url && contentNegMap[req.url]) {
            req.url = contentNegMap[req.url]
            return next()
          }
        }

        next()
      })
    },
  }
}

const config = defineConfig({
  plugins: [
    mdAliasPlugin(),
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: "vercel",
      routeRules: {
        "/llms.txt": { proxy: "/api/llms/txt" },
        "/llms-full.txt": { proxy: "/api/llms-full/txt" },
      },
    }),
    viteReact(),
  ],
})

export default config
