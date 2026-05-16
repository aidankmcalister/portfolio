import { definePlugin } from "nitro"

export default definePlugin((nitro) => {
  nitro.hooks.hook("request", (event) => {
    const pathname = event.url.pathname
    const match = pathname.match(/^\/blog\/([^/]+)\.md$/)
    if (match) {
      event.url.pathname = `/api/blog-md/${match[1]}`
    }
  })
})
