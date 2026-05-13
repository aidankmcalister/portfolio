export type WorkType = "Docs" | "Demo" | "Talk" | "Post" | "Video" | "OSS"

export interface WorkItem {
  id: string
  type: WorkType
  company: string
  title: string
  desc: string
  url: string
}

export interface ExperienceItem {
  id: string
  date: string
  role: string
  company: string
  desc: string
  url?: string
}

// Edit these to update the stats bar on the home page.
// The LAST item in `levels` is treated as the current level.
export const STATS = {
  role: "DevRel",
  company: "Prisma",
  levels: ["intern", "junior", "intermediate"],
  tenure: "March 2025 to May 2026",
  location: "Remote, USA",
}

// Edit this array to add/remove/update work items.
// Each item appears as a row on the /work page.
// Set url to "#" for items without a public link yet.
export const WORK: WorkItem[] = [
  // ── DOCS ─────────────────────────────────────────────────
  {
    id: "d-docs-rebuild",
    type: "Docs",
    company: "Prisma",
    title: "Prisma docs rebuild (400+ pages)",
    desc: "Led all three rounds: content architecture, the production 301 redirect map, custom 404, and a Sentry + PostHog pipeline that pages the team in Slack when docs go down.",
    url: "https://www.prisma.io/docs",
  },
  {
    id: "d-tanstack",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with TanStack Start",
    desc: "Full-stack type-safe queries with TanStack Start server functions. Authored as part of the Prisma × TanStack partnership.",
    url: "https://www.prisma.io/docs/guides/frameworks/tanstack-start",
  },
  {
    id: "d-astro",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Astro",
    desc: "Patterns for content-first Astro sites that also need a real database.",
    url: "https://www.prisma.io/docs/guides/frameworks/astro",
  },
  {
    id: "d-clerk",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Clerk",
    desc: "Auth + Prisma without the boilerplate, with webhooks for keeping user state in sync.",
    url: "https://www.prisma.io/docs/guides/authentication/clerk/nextjs",
  },
  {
    id: "d-cloudflare-workers",
    type: "Docs",
    company: "Prisma",
    title: "Prisma on Cloudflare Workers",
    desc: "Edge-runtime Prisma with the right pooling and connection setup for Workers.",
    url: "https://www.prisma.io/docs/guides/deployment/cloudflare-workers",
  },
  {
    id: "d-bun",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Bun",
    desc: "Getting Prisma running cleanly on Bun, including the gotchas.",
    url: "https://www.prisma.io/docs/guides/runtimes/bun",
  },
  {
    id: "d-nestjs",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with NestJS",
    desc: "Wiring Prisma into a NestJS app with the right module structure.",
    url: "https://www.prisma.io/docs/guides/frameworks/nestjs",
  },
  {
    id: "d-deno",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Deno",
    desc: "Running Prisma on Deno with Prisma Postgres, including Deno Deploy.",
    url: "https://www.prisma.io/docs/guides/runtimes/deno",
  },
  {
    id: "d-solid-start",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with SolidStart",
    desc: "Using Prisma ORM in a SolidStart app end-to-end.",
    url: "https://www.prisma.io/docs/guides/frameworks/solid-start",
  },
  {
    id: "d-sveltekit",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with SvelteKit",
    desc: "Setting up Prisma ORM and Prisma Postgres in a SvelteKit application.",
    url: "https://www.prisma.io/docs/guides/frameworks/sveltekit",
  },
  {
    id: "d-shopify",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Shopify",
    desc: "Using Prisma Postgres alongside Shopify.",
    url: "https://www.prisma.io/docs/guides/integrations/shopify",
  },
  {
    id: "d-management-api",
    type: "Docs",
    company: "Prisma",
    title: "Prisma Postgres Management API",
    desc: "Programmatically provision and manage Prisma Postgres databases. Endpoints, auth, and the SDK that wraps it.",
    url: "https://www.prisma.io/docs/management-api",
  },
  {
    id: "d-llms-txt",
    type: "Docs",
    company: "Prisma",
    title: "llms.txt and AI-agent discoverability",
    desc: "llms.txt sub-indexes, content negotiation, .md aliases on every docs route, and a markdown 404 handler. Prisma's GEO architecture for ChatGPT, Claude, and Perplexity.",
    url: "https://www.prisma.io/docs/llms.txt",
  },

  // ── DEMOS ─────────────────────────────────────────────────
  {
    id: "x-create-db",
    type: "Demo",
    company: "Prisma",
    title: "create-db",
    desc: "CLI for provisioning temporary databases. Shortens time-to-first-query for new users. Tracked down a 700-database creation spike, added Cloudflare rate limiting, moved everything into a Turborepo monorepo.",
    url: "https://create-db.prisma.io",
  },
  {
    id: "x-playground",
    type: "Demo",
    company: "Prisma",
    title: "Prisma Playground v2",
    desc: "StackBlitz SDK prototype that enables full project sharing in the browser. Lowers the barrier for developers evaluating Prisma.",
    url: "#",
  },
  {
    id: "x-octolens",
    type: "Demo",
    company: "Prisma",
    title: "Community signal pipeline",
    desc: "Octolens + Cloudflare + webhooks piping community mentions and content signals into Slack. Saved $10k+/year and made it practical to respond to what the community was saying.",
    url: "#",
  },

  // ── POSTS ─────────────────────────────────────────────────
  {
    id: "p-docs-rebuild",
    type: "Post",
    company: "Prisma",
    title: "Rebuilding the Prisma docs",
    desc: "The story behind the 400+ page docs rebuild: what we kept, what we cut, and how we shipped it without breaking SEO.",
    url: "https://www.prisma.io/blog/rebuilding-the-prisma-docs",
  },
  {
    id: "p-vibe-coding",
    type: "Post",
    company: "Prisma",
    title: "Vibe coding with Prisma MCP and Next.js",
    desc: "Building a Next.js app with the Prisma MCP server and an AI agent that actually understands your schema.",
    url: "https://www.prisma.io/blog/vibe-coding-with-prisma-mcp-and-nextjs",
  },

  // ── OSS ───────────────────────────────────────────────────
  {
    id: "o-claude-plugin",
    type: "OSS",
    company: "Prisma",
    title: "Prisma Claude Code plugin",
    desc: "Three skills (prisma-voice, blog-writing, guide-writing) packaged as a plugin and published to Anthropic's official listing. Used daily by the DevRel team.",
    url: "https://claude.com/plugins/prisma",
  },
  {
    id: "o-trpc-cli",
    type: "OSS",
    company: "trpc-cli",
    title: "Hidden CLI flag support",
    desc: "Contributed hidden CLI flag support via Zod meta.",
    url: "#",
  },
  {
    id: "o-better-hub",
    type: "OSS",
    company: "better-hub",
    title: "Stars pages & routing",
    desc: "Contributed stars pages and routing to Better Auth's GitHub client.",
    url: "#",
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "e-prisma",
    date: "Mar 2025 to now",
    role: "Developer Advocate",
    company: "Prisma",
    desc: "Lead docs, guides, and dev tools across the TypeScript ecosystem. Ran the 400+ page docs rebuild, shipped create-db, built Prisma's GEO and AI-citation pipeline, and grew the Discord past 10,000 members.",
    url: "https://prisma.io",
  },
]
