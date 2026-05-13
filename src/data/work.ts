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

// Edit these to update the stats bar on the home page
export const STATS = {
  role: "DevRel",
  company: "Prisma",
  location: "Berlin",
  locationNote: "remote, mostly",
}

// Edit this array to add/remove/update work items.
// Each item appears as a row on the /work page.
// Set url to "#" for items without a public link yet.
export const WORK: WorkItem[] = [
  // ── DOCS ─────────────────────────────────────────────────
  {
    id: "d-quickstart",
    type: "Docs",
    company: "Prisma",
    title: "Prisma ORM Quickstart for Next.js",
    desc: "Zero-to-deployed app on the App Router — server actions, edge runtime, and a sane migration story.",
    url: "https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres",
  },
  {
    id: "d-tanstack",
    type: "Docs",
    company: "Prisma",
    title: "Prisma with TanStack Start",
    desc: "Full-stack type-safe queries with TanStack Start server functions and Prisma ORM.",
    url: "https://www.prisma.io/docs/guides/frameworks/tanstack-start",
  },
  {
    id: "d-pooling",
    type: "Docs",
    company: "Prisma",
    title: "Connection pooling, demystified",
    desc: "When to pool, when to skip it, and what actually breaks past 200 concurrent connections.",
    url: "https://www.prisma.io/docs/guides/performance-and-optimization/connection-management",
  },
  {
    id: "d-rls",
    type: "Docs",
    company: "Prisma",
    title: "Row-level security with Prisma Postgres",
    desc: "Patterns for multi-tenant apps that don't fall apart under audit.",
    url: "https://www.prisma.io/docs/postgres/row-level-security",
  },

  // ── DEMOS ─────────────────────────────────────────────────
  {
    id: "x-chat",
    type: "Demo",
    company: "Prisma",
    title: "Realtime chat with Prisma + Pusher",
    desc: "End-to-end typed pub/sub over Postgres with optimistic UI and a tiny presence system.",
    url: "#",
  },
  {
    id: "x-webhooks",
    type: "Demo",
    company: "Prisma",
    title: "Type-safe webhooks from your schema",
    desc: "Generate validators and replayers straight from Prisma. Stop drifting from the source of truth.",
    url: "#",
  },
  {
    id: "x-sql",
    type: "Demo",
    company: "Personal",
    title: "An SQL playground for LLMs",
    desc: "Let your model write queries against a sandbox you can actually trust to undo itself.",
    url: "#",
  },

  // ── TALKS ─────────────────────────────────────────────────
  {
    id: "t-orm",
    type: "Talk",
    company: "Conferences",
    title: "Why your ORM is the bottleneck",
    desc: "An honest, benchmarked look at where ORMs slow you down — and the smaller list of places they don't.",
    url: "#",
  },
  {
    id: "t-postgres",
    type: "Talk",
    company: "Conferences",
    title: "Postgres for people who hate Postgres",
    desc: "A workshop for converts. Done with Postgres? Try it again — but with extensions this time.",
    url: "#",
  },
  {
    id: "t-schema",
    type: "Talk",
    company: "Conferences",
    title: "Schema-first development",
    desc: "30 minutes and lots of diagrams on why Prisma was built the way it was — and what we'd change.",
    url: "#",
  },

  // ── POSTS ─────────────────────────────────────────────────
  {
    id: "p-six",
    type: "Post",
    company: "Prisma",
    title: "What I learned shipping Prisma 6",
    desc: "Six months of release notes condensed into one honest postmortem about scope, schedule, and trust.",
    url: "#",
  },
  {
    id: "p-devrel",
    type: "Post",
    company: "Personal",
    title: "DevRel is not marketing",
    desc: "A short field guide for engineers who suddenly find themselves on a stage with a microphone.",
    url: "#",
  },
  {
    id: "p-npm",
    type: "Post",
    company: "Personal",
    title: "The hidden cost of npm install",
    desc: "Measuring the half-second tax on every Node project you ship, and where most of it goes.",
    url: "#",
  },
  {
    id: "p-sdks",
    type: "Post",
    company: "Personal",
    title: "Why I still write SDKs by hand",
    desc: "A defense of artisanal client libraries in the age of OpenAPI generators that almost work.",
    url: "#",
  },

  // ── VIDEOS ────────────────────────────────────────────────
  {
    id: "v-100",
    type: "Video",
    company: "Prisma",
    title: "Prisma in 100 seconds",
    desc: "The one-minute pitch. Watch it before you decide we're not for you.",
    url: "#",
  },
  {
    id: "v-lucia",
    type: "Video",
    company: "Personal",
    title: "Live: Auth with Lucia + Prisma",
    desc: "Two hours, one bug, zero edits. Just like real life.",
    url: "#",
  },

  // ── OSS ───────────────────────────────────────────────────
  {
    id: "o-cache",
    type: "OSS",
    company: "Personal",
    title: "prisma-extension-cache",
    desc: "Drop-in Redis caching for any Prisma query. ~3k stars and a handful of very angry edge cases.",
    url: "#",
  },
  {
    id: "o-route",
    type: "OSS",
    company: "Personal",
    title: "next-route-typesafe",
    desc: "Type-safe routing for the App Router so you can stop guessing the names of your own pages.",
    url: "#",
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "e-prisma",
    date: "2024 — now",
    role: "Developer Advocate",
    company: "Prisma",
    desc: "Leading docs and developer experience for Prisma ORM and Prisma Postgres — talks, demos, the occasional product feedback that turns into a roadmap item.",
    url: "https://prisma.io",
  },
  {
    id: "e-vercel",
    date: "2022 — 2024",
    role: "Developer Experience Engineer",
    company: "Vercel",
    desc: "Wrote guides, examples, and SDKs for Next.js. Helped launch the App Router educational track and the first official server actions reference.",
    url: "https://vercel.com",
  },
]
