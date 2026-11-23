// Everything the site says about Aidan. Every fact here comes from the Nov 2026 brief
// (career-ops/output/portfolio-prompt.md) or career-ops/output/everything-ive-done.md.
// Don't add claims that aren't in them.

export const SITE = {
  name: "Aidan McAlister",
  role: "Frontend-leaning full-stack engineer and Developer Advocate",
  email: "aidankmcalister@gmail.com",
  location: "Boston, MA",
  url: "https://www.aidanmcalister.com",
  resume: "/resume.pdf",
  description:
    // Kept under ~125 characters so link previews don't cut it off.
    "Frontend-leaning full-stack engineer and Developer Advocate who builds TypeScript tools, docs and developer-facing products.",
  social: {
    github: "https://github.com/aidankmcalister",
    linkedin: "https://www.linkedin.com/in/aidanmcalister",
  },
};

export interface Item {
  title: string;
  desc: string;
  // Shown quietly on the right: where it happened, or a date.
  aside: string;
  href?: string;
}

// Best work first.
export const WORK: Item[] = [
  {
    title: "Prisma docs rebuild",
    desc: "Led all three phases of the 400+ page rebuild on Fumadocs. The redirect map kept about 90% of organic search traffic.",
    aside: "Prisma",
    href: "https://www.prisma.io/blog/rebuilding-the-prisma-docs",
  },
  {
    title: "create-db",
    desc: "A CLI that cut time to first query for new users from several minutes to under 3 seconds.",
    aside: "Prisma",
    href: "https://github.com/prisma/create-db",
  },
  {
    title: "OpenTape",
    desc: "A free, open-source screen recorder for macOS, built with Tauri 2, Rust and React. Six releases in nine days after launch.",
    aside: "Side project",
    href: "https://opentape.app",
  },
  {
    title: "Docs for AI agents",
    desc: "llms.txt sub-indexes, a markdown version of every route, and content negotiation for agents. 5,000+ monthly AI-crawler requests within weeks.",
    aside: "Prisma",
    href: "/blog/your-docs-are-invisible-to-ai",
  },
  {
    title: "REST API docs",
    desc: "The whole REST and Management API section, with a reference generated from the OpenAPI spec.",
    aside: "Prisma",
    href: "https://www.prisma.io/docs/rest-api",
  },
  {
    title: "Prisma Claude Code plugin",
    desc: "Three Claude Code skills, published as a plugin in Anthropic’s official listing. The team used them daily.",
    aside: "Prisma",
    href: "https://claude.com/plugins/prisma",
  },
  {
    title: "clasp.sh",
    desc: "Code screenshots made in the browser, drawn on a custom Canvas 2D renderer.",
    aside: "Side project",
    href: "https://clasp.sh",
  },
];

export const EXPERIENCE: Item[] = [
  {
    title: "Prisma",
    desc: "Developer Advocate. Docs, developer tools, the TanStack partnership, and the Prisma Discord, which I managed and helped grow past 10,000 members.",
    aside: "Mar 2025 to May 2026",
    href: "https://www.prisma.io",
  },
  {
    title: "Inner Armor",
    desc: "Front End, contract. An admin dashboard in Remix that reached 100% company-wide adoption.",
    aside: "Jul 2024 to Mar 2025",
  },
  {
    title: "Elevate Digital IO",
    desc: "Full Stack, contract. An advanced filter system in RedwoodJS and 10+ CRUD flows in Prisma and GraphQL.",
    aside: "Jan 2024 to Aug 2024",
  },
];

// Guides Aidan wrote for the Prisma docs. URLs checked against prisma.io/docs/llms/guides.txt.
const G = "https://www.prisma.io/docs/guides";
export const GUIDES: { title: string; href: string }[] = [
  { title: "Astro", href: `${G}/frameworks/astro` },
  { title: "TanStack Start", href: `${G}/frameworks/tanstack-start` },
  { title: "SolidStart", href: `${G}/frameworks/solid-start` },
  { title: "SvelteKit", href: `${G}/frameworks/sveltekit` },
  { title: "NestJS", href: `${G}/frameworks/nestjs` },
  { title: "Hono", href: `${G}/frameworks/hono` },
  { title: "React Router", href: `${G}/frameworks/react-router-7` },
  { title: "Bun", href: `${G}/runtimes/bun` },
  { title: "Bun workspaces", href: `${G}/deployment/bun-workspaces` },
  { title: "Deno", href: `${G}/runtimes/deno` },
  { title: "Cloudflare Workers", href: `${G}/deployment/cloudflare-workers` },
  { title: "Clerk", href: `${G}/authentication/clerk/nextjs` },
  { title: "Better Auth", href: `${G}/authentication/better-auth/nextjs` },
  { title: "Auth.js", href: `${G}/authentication/authjs/nextjs` },
  { title: "AI SDK", href: `${G}/integrations/ai-sdk` },
  { title: "Embedded Prisma Studio", href: `${G}/integrations/embed-studio` },
  { title: "Shopify", href: `${G}/integrations/shopify` },
  { title: "Migrate from Neon", href: `${G}/switch-to-prisma-postgres/from-neon` },
  { title: "Migrate from Supabase", href: `${G}/switch-to-prisma-postgres/from-supabase` },
];

// Merged pull requests to other projects, largest project first. Each was checked as
// merged and authored by Aidan (gh, Nov 2026). Unmerged or open PRs stay off.
export const OPEN_SOURCE: Item[] = [
  {
    title: "supabase",
    desc: "Updated Supabase’s Prisma guide for Prisma 7.",
    aside: "Jun 2026",
    href: "https://github.com/supabase/supabase/pull/46082",
  },
  {
    title: "MCP servers",
    desc: "Got the Prisma MCP server into the official list.",
    aside: "Apr 2025",
    href: "https://github.com/modelcontextprotocol/servers/pull/1357",
  },
  {
    title: "open-source-mac-os-apps",
    desc: "Listed OpenTape.",
    aside: "Nov 2026",
    href: "https://github.com/serhii-londar/open-source-mac-os-apps/pull/1933",
  },
  {
    title: "better-auth",
    desc: "Prisma Postgres in the community dialects docs.",
    aside: "Oct 2025",
    href: "https://github.com/better-auth/better-auth/pull/5492",
  },
  {
    title: "next-auth",
    desc: "Updated the Prisma ORM page for Prisma Postgres.",
    aside: "Oct 2025",
    href: "https://github.com/nextauthjs/next-auth/pull/13299",
  },
  {
    title: "pglite",
    desc: "Prisma ORM on the ORM support page.",
    aside: "Aug 2025",
    href: "https://github.com/electric-sql/pglite/pull/758",
  },
  {
    title: "modelcontextprotocol",
    desc: "Listed Prisma MCP in the protocol docs.",
    aside: "Apr 2025",
    href: "https://github.com/modelcontextprotocol/modelcontextprotocol/pull/367",
  },
  {
    title: "cloudflare-docs",
    desc: "Prisma Postgres docs for Cloudflare.",
    aside: "Aug 2025",
    href: "https://github.com/cloudflare/cloudflare-docs/pull/24582",
  },
  {
    title: "ray.so",
    desc: "Updated the Prisma code theme.",
    aside: "Nov 2025",
    href: "https://github.com/raycast/ray-so/pull/365",
  },
  {
    title: "Astro docs",
    desc: "Prisma Postgres in the Astro docs.",
    aside: "Aug 2025",
    href: "https://github.com/withastro/docs/pull/11974",
  },
  {
    title: "TanStack CLI",
    desc: "A Prisma Postgres user-agent flag, part of the TanStack partnership.",
    aside: "Dec 2025",
    href: "https://github.com/TanStack/cli/pull/259",
  },
  {
    title: "better-hub",
    desc: "Stars pages, routing and a GitHub theme.",
    aside: "Mar 2026",
    href: "https://github.com/better-auth/better-hub/pull/266",
  },
  {
    title: "trpc-cli",
    desc: "Hidden CLI options through Zod meta.",
    aside: "Feb 2026",
    href: "https://github.com/mmkal/trpc-cli/pull/177",
  },
  {
    title: "Clerk docs",
    desc: "A Prisma Postgres integration guide.",
    aside: "Oct 2025",
    href: "https://github.com/clerk/clerk-docs/pull/2465",
  },
  {
    title: "Deno docs",
    desc: "Prisma Postgres in the manual deploy section.",
    aside: "Aug 2025",
    href: "https://github.com/denoland/docs/pull/2407",
  },
  {
    title: "Inngest website",
    desc: "Removed outdated Prisma Pulse references.",
    aside: "Nov 2025",
    href: "https://github.com/inngest/website/pull/1325",
  },
];

export const isExternal = (href: string) => /^https?:/.test(href);
