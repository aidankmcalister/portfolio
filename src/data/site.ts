// Edit these to update site-wide info. Projects live in src/content/projects/.
export const SITE = {
  name: "Aidan McAlister",
  role: "Developer advocate and TypeScript engineer",
  email: "aidankmcalister@gmail.com",
  description:
    "Developer advocate and TypeScript engineer. I build the docs, tools, and community that help developers adopt a product.",
  location: "Boston, MA",
  url: "https://www.aidanmcalister.com",
  resume: "/resume.pdf",
  social: {
    github: "https://github.com/aidankmcalister",
    linkedin: "https://www.linkedin.com/in/aidanmcalister",
  },
};

export interface TextItem {
  title: string;
  desc: string;
  href?: string;
}

// "Other work at Prisma" rows on /work.
export const MORE_FROM_PRISMA: TextItem[] = [
  {
    title: "20+ framework guides",
    desc: "Getting-started guides for using Prisma with more than 20 frameworks.",
    href: "https://www.prisma.io/docs/guides",
  },
  {
    title: "Management API reference",
    desc: "An API reference generated from the Swagger spec, so it never drifts from the API.",
    href: "https://www.prisma.io/docs/rest-api",
  },
  {
    title: "Prisma Claude Code plugin",
    desc: "Three Claude Code skills, published in Anthropic's official plugin listing. The team uses them daily.",
    href: "https://claude.com/plugins/prisma",
  },
  {
    title: "Discord and partnerships",
    desc: "The Prisma Discord passed 10,000 members. I worked on partnerships with TanStack, Bun, and Deno.",
    href: "https://pris.ly/discord",
  },
];

// Links point at the repos until the exact PR links are added (see TODO.md).
export const OPEN_SOURCE: TextItem[] = [
  {
    title: "trpc-cli",
    desc: "Added hidden CLI flag support via Zod meta.",
    href: "https://github.com/mmkal/trpc-cli",
  },
  {
    title: "better-hub",
    desc: "Added stars pages and routing to Better Auth's GitHub client.",
    href: "https://github.com/better-auth/better-hub",
  },
  {
    title: "Better Auth",
    desc: "Contributed an upstream docs PR.",
    href: "https://github.com/better-auth/better-auth",
  },
];

export const EXPERIENCE = [
  { date: "Mar 2025 – May 2026", company: "Prisma", role: "Developer Advocate" },
  { date: "Jul 2024 – Mar 2025", company: "Inner Armor", role: "Front End Developer, contract" },
  { date: "Jan 2024 – Aug 2024", company: "Elevate Digital IO", role: "Full Stack Developer, contract" },
];

