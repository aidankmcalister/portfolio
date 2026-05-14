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
  kind: "full-time" | "contract"
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
  // ── FRAMEWORKS ───────────────────────────────────────────
  {
    id: "d-astro",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Astro",
    desc: "Patterns for content-first Astro sites that also need a real database.",
    url: "https://www.prisma.io/docs/guides/frameworks/astro",
  },
  {
    id: "d-nuxt",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Nuxt",
    desc: "Using Prisma ORM and Prisma Postgres in a Nuxt application.",
    url: "https://www.prisma.io/docs/guides/frameworks/nuxt",
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
    id: "d-solid-start",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with SolidStart",
    desc: "Using Prisma ORM in a SolidStart app end-to-end.",
    url: "https://www.prisma.io/docs/guides/frameworks/solid-start",
  },

  // ── RUNTIMES ─────────────────────────────────────────────
  {
    id: "d-bun",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Bun",
    desc: "Getting Prisma running cleanly on Bun, including the gotchas.",
    url: "https://www.prisma.io/docs/guides/runtimes/bun",
  },
  {
    id: "d-deno",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Deno",
    desc: "Running Prisma on Deno with Prisma Postgres, including Deno Deploy.",
    url: "https://www.prisma.io/docs/guides/runtimes/deno",
  },

  // ── DEPLOYMENT ───────────────────────────────────────────
  {
    id: "d-cloudflare-workers",
    type: "Docs",
    company: "Prisma",
    title: "Prisma on Cloudflare Workers",
    desc: "Edge-runtime Prisma with the right pooling and connection setup for Workers.",
    url: "https://www.prisma.io/docs/guides/deployment/cloudflare-workers",
  },
  {
    id: "d-bun-workspaces",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Bun Workspaces",
    desc: "Monorepo deployment using Bun workspaces with Prisma Postgres.",
    url: "https://www.prisma.io/docs/guides/deployment/bun-workspaces",
  },

  // ── AUTH ─────────────────────────────────────────────────
  {
    id: "d-clerk-nextjs",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Clerk (Next.js)",
    desc: "Auth + Prisma without the boilerplate, with webhooks for keeping user state in sync.",
    url: "https://www.prisma.io/docs/guides/authentication/clerk/nextjs",
  },
  {
    id: "d-clerk-astro",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Clerk (Astro)",
    desc: "Clerk authentication integrated with Prisma in an Astro application.",
    url: "https://www.prisma.io/docs/guides/authentication/clerk/astro",
  },
  {
    id: "d-better-auth-nextjs",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Better Auth (Next.js)",
    desc: "Setting up Better Auth with Prisma as the database adapter in Next.js.",
    url: "https://www.prisma.io/docs/guides/authentication/better-auth/nextjs",
  },
  {
    id: "d-better-auth-astro",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Better Auth (Astro)",
    desc: "Better Auth and Prisma together in an Astro project.",
    url: "https://www.prisma.io/docs/guides/authentication/better-auth/astro",
  },
  {
    id: "d-authjs-nextjs",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Auth.js (Next.js)",
    desc: "Auth.js adapter wired to Prisma for session and user persistence.",
    url: "https://www.prisma.io/docs/guides/authentication/authjs/nextjs",
  },

  // ── INTEGRATIONS ─────────────────────────────────────────
  {
    id: "d-ai-sdk",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Vercel AI SDK",
    desc: "Connecting Vercel's AI SDK to Prisma for persisting chats, embeddings, and structured AI outputs.",
    url: "https://www.prisma.io/docs/guides/integrations/ai-sdk",
  },
  {
    id: "d-embed-studio",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Embed Studio",
    desc: "Embedding Prisma Studio into your own app with the Embed Studio integration.",
    url: "https://www.prisma.io/docs/guides/integrations/embed-studio",
  },
  {
    id: "d-integrations-deno",
    type: "Docs",
    company: "Prisma",
    title: "Prisma Postgres on Deno Deploy",
    desc: "Deploying Prisma Postgres to Deno Deploy via the integrations guide.",
    url: "https://www.prisma.io/docs/guides/integrations/deno",
  },
  {
    id: "d-shopify",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with Shopify",
    desc: "Using Prisma Postgres alongside Shopify.",
    url: "https://www.prisma.io/docs/guides/integrations/shopify",
  },

  // ── POSTGRES ─────────────────────────────────────────────
  {
    id: "d-viewing-data",
    type: "Docs",
    company: "Prisma",
    title: "Viewing data in Prisma Postgres",
    desc: "Built-in tools for browsing and querying your Prisma Postgres data.",
    url: "https://www.prisma.io/docs/guides/postgres/viewing-data",
  },
  {
    id: "d-from-supabase",
    type: "Docs",
    company: "Prisma",
    title: "Switch to Prisma Postgres from Supabase",
    desc: "Step-by-step migration guide from Supabase to Prisma Postgres.",
    url: "https://www.prisma.io/docs/guides/switch-to-prisma-postgres/from-supabase",
  },
  {
    id: "d-from-neon",
    type: "Docs",
    company: "Prisma",
    title: "Switch to Prisma Postgres from Neon",
    desc: "Step-by-step migration guide from Neon to Prisma Postgres.",
    url: "https://www.prisma.io/docs/guides/switch-to-prisma-postgres/from-neon",
  },

  // ── META / INFRA ──────────────────────────────────────────
  {
    id: "d-making-guides",
    type: "Docs",
    company: "Prisma",
    title: "How to write a Prisma guide",
    desc: "Internal style guide and structure template for authoring new Prisma guides.",
    url: "https://www.prisma.io/docs/guides/making-guides",
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
    type: "OSS",
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
    id: "p-geo-docs",
    type: "Post",
    company: "Personal",
    title: "Your docs are invisible to AI. Here's why.",
    desc: "Why well-written docs still get skipped by AI retrieval systems, and what to do about it. Covers citation patterns, GEO infrastructure, and making content that AI can actually read.",
    url: "https://www.prisma.io/blog/rebuilding-the-prisma-docs",
  },
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
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "e-prisma",
    date: "Mar 2025 – May 2026",
    role: "Developer Advocate",
    company: "Prisma",
    kind: "full-time",
    desc: "Lead docs, guides, and dev tools across the TypeScript ecosystem. Ran the 400+ page docs rebuild, shipped create-db, built Prisma's GEO and AI-citation pipeline, and grew the Discord past 10,000 members.",
    url: "https://prisma.io",
  },
  {
    id: "e-inner-armor",
    date: "Jul 2024 – Mar 2025",
    role: "Front End",
    company: "Inner Armor",
    kind: "contract",
    desc: "Built a Remix + TypeScript admin dashboard to replace a legacy tool — hit 100% company-wide adoption. Added 10+ interactive graphs in Observable Plot and ShadCN for cross-period data analysis, plus reusable components with NextUI and AG Grid.",
    url: "https://www.forgeinnerarmor.com/",
  },
  {
    id: "e-elevate",
    date: "Jan 2024 – Aug 2024",
    role: "Full Stack",
    company: "Elevate Digital IO",
    kind: "contract",
    desc: "Led development of an advanced filter system in RedwoodJS and Tailwind for efficient information retrieval. Built 10+ specialized CRUD interactions in Prisma and GraphQL, each with 12+ fields, focused on query efficiency and data integrity.",
    url: "https://elevatedigital.io/",
  },
]
