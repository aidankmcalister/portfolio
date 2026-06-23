// Edit these to update site-wide info.
export const SITE = {
  name: "Aidan McAlister",
  role: "Developer Advocate",
  email: "aidankmcalister@gmail.com",
  description:
    "Developer advocate. I build docs, tools, and community for developer products.",
  location: "Boston, USA",
  url: "https://www.aidanmcalister.com",
  social: {
    github: "https://github.com/aidankmcalister",
    linkedin: "https://www.linkedin.com/in/aidankmcalister",
  },
};

export type WorkType = "Docs" | "Demo" | "Talk" | "Post" | "Video" | "OSS";

export interface WorkItem {
  type: WorkType;
  company: string;
  title: string;
  desc: string;
  url: string;
  internal?: boolean;
}

export interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  desc: string;
  kind: "full-time" | "contract";
  url?: string;
}

// Each item appears as a row on the /work page.
export const WORK: WorkItem[] = [
  {
    type: "OSS",
    company: "Personal",
    title: "BetterBox",
    desc: "A tiling interface for Gmail built on the Gmail API. Link the Google accounts you already have and arrange every inbox as panes you drag, split, and resize, with your GitHub PRs in the same window. Nothing migrates and mail never touches a server. TanStack Start, Better Auth, and Prisma 7, open source and self-hostable.",
    url: "https://betterbox.dev",
  },
  {
    type: "Docs",
    company: "Prisma",
    title: "Prisma docs rebuild (400+ pages)",
    desc: "Led all three rounds: content architecture, the production 301 redirect map, custom 404, and a Sentry + PostHog pipeline that pages the team in Slack when docs go down.",
    url: "https://www.prisma.io/docs",
  },
  {
    type: "Docs",
    company: "Prisma",
    title: "20+ framework, runtime, and integration guides",
    desc: "Authored most of the Prisma guides section: frameworks (Next.js, Astro, Nuxt, SvelteKit, SolidStart, TanStack Start), runtimes (Bun, Deno), auth (Clerk, Better Auth, Auth.js), deployment (Cloudflare Workers), and integrations (Vercel AI SDK, Shopify).",
    url: "https://www.prisma.io/docs/guides",
  },
  {
    type: "Docs",
    company: "Prisma",
    title: "llms.txt and AI-agent discoverability",
    desc: "llms.txt sub-indexes, content negotiation, .md aliases on every docs route, and a markdown 404 handler. Prisma's GEO architecture for ChatGPT, Claude, and Perplexity.",
    url: "https://www.prisma.io/docs/llms.txt",
  },
  {
    type: "Docs",
    company: "Prisma",
    title: "Prisma Postgres Management API",
    desc: "Programmatically provision and manage Prisma Postgres databases. Endpoints, auth, and the SDK that wraps it. Docs entirely generated from the Swagger spec.",
    url: "https://www.prisma.io/docs/management-api",
  },
  {
    type: "OSS",
    company: "Prisma",
    title: "create-db",
    desc: "CLI for provisioning temporary databases. Shortens time-to-first-query for new users. Tracked down a 700-database creation spike, added Cloudflare rate limiting, moved everything into a Turborepo monorepo.",
    url: "https://create-db.prisma.io",
  },
  {
    type: "OSS",
    company: "Prisma",
    title: "Prisma Claude Code plugin",
    desc: "Three skills (prisma-voice, blog-writing, guide-writing) packaged as a plugin and published to Anthropic's official listing. Used daily by the DevRel team.",
    url: "https://claude.com/plugins/prisma",
  },
  {
    type: "Post",
    company: "Personal",
    title: "Your docs are invisible to AI. Here's why.",
    desc: "Why well-written docs still get skipped by AI retrieval systems, and what to do about it. Covers citation patterns, GEO infrastructure, and making content that AI can actually read.",
    url: "/blog/your-docs-are-invisible-to-ai",
    internal: true,
  },
  {
    type: "Post",
    company: "Prisma",
    title: "Rebuilding the Prisma docs",
    desc: "The story behind the 400+ page docs rebuild: what we kept, what we cut, and how we shipped it without breaking SEO.",
    url: "https://www.prisma.io/blog/rebuilding-the-prisma-docs",
  },
  {
    type: "Post",
    company: "Prisma",
    title: "Vibe coding with Prisma MCP and Next.js",
    desc: "Building a Next.js app with the Prisma MCP server and an AI agent that actually understands your schema.",
    url: "https://www.prisma.io/blog/vibe-coding-with-prisma-mcp-and-nextjs",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: "Mar 2025 – May 2026",
    role: "Developer Advocate",
    company: "Prisma",
    kind: "full-time",
    desc: "Led docs, guides, and dev tools across the TypeScript ecosystem. Ran the 400+ page docs rebuild, shipped create-db, built Prisma's GEO and AI-citation pipeline, and grew the Discord past 10,000 members.",
    url: "https://prisma.io",
  },
  {
    date: "Jul 2024 – Mar 2025",
    role: "Front End",
    company: "Inner Armor",
    kind: "contract",
    desc: "Built a Remix + TypeScript admin dashboard to replace a legacy tool, and hit 100% company-wide adoption. Added 10+ interactive graphs in Observable Plot and ShadCN for cross-period data analysis, plus reusable components with NextUI and AG Grid.",
    url: "https://www.forgeinnerarmor.com/",
  },
  {
    date: "Jan 2024 – Aug 2024",
    role: "Full Stack",
    company: "Elevate Digital IO",
    kind: "contract",
    desc: "Led development of an advanced filter system in RedwoodJS and Tailwind for efficient information retrieval. Built 10+ specialized CRUD interactions in Prisma and GraphQL, each with 12+ fields, focused on query efficiency and data integrity.",
    url: "https://elevatedigital.io/",
  },
];
