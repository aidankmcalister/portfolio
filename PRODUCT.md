# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers deciding whether to interview Aidan McAlister, weighted equally between two groups:

- Heads of DevRel / developer experience hiring a developer advocate.
- Engineering managers hiring for frontend or developer-tools roles.

Recruiters screening on a phone are a common first pass for both. Visitors skim; most arrive from a resume, LinkedIn, or an application link and spend well under a minute.

## Product Purpose

A personal portfolio for an active job search (Aidan was laid off from Prisma in May 2026). Success means a visitor understands who he is, sees proof of shipped work, and emails him or opens the resume.

## Positioning

A developer advocate who ships real engineering: at Prisma he built create-db (a CLI with 6M+ runs) solo, led a 400+ page docs rebuild that kept ~90% of search traffic, and built the docs' AI-agent discoverability layer. Few candidates can show both the DevRel and the engineering track with this kind of evidence.

## Operating Context

- Astro 6 static site with Tailwind 4, deployed on Vercel at aidanmcalister.com.
- Pages: home, /work, /blog (markdown collection, some posts link out to prisma.io), /resume.pdf, plus llms.txt, llms-full.txt, and sitemap endpoints.
- Content lives in `src/data/site.ts` and `src/content/blog/`.

## Capabilities and Constraints

- Must stay simple, fast, and minimal: static HTML, near-zero client JS.
- One resume only: `/resume.pdf` (the general/master version).
- Prisma is a past role (Mar 2025 – May 2026). Present its metrics as past accomplishments, never as ongoing ones.
- The Prisma website, the Prisma docs, and create-db are owned and maintained by Prisma. Aidan built them (create-db solo) while employed there. Frame them as "Prisma's X, which I built/rebuilt while I was there", never as his own products, and label live screenshots with their capture date since Prisma keeps changing them.
- No phone number on the site.
- Readable and skimmable on a phone first.

## Brand Commitments

- Visual identity (binding, set by Aidan, Sep 2026): a warm off-white paper background with near-black ink and warm grays. No accent colors, no textures. Calm and uncluttered, inspired by conordewey.com without copying it (no photo, no tags, no serif).
- Typography (binding): JetBrains Mono for the name, headings, nav, labels, and meta; Inter for body text. Compact sizes (15px body, 20–22px name and page titles). Do not swap fonts or scale type up. Both fonts are self-hosted via Fontsource.
- Keep it simple: one narrow column; work and writing are plain rows (title, one line, a quiet date or site on the right). No borders or rules; sections are separated by space. Arrows only on external links. Tokens live in `src/styles/global.css`.
- Voice: plain, direct, first person, no hype. Short sentences.
- The site should not look template-made or AI-generated, should not feel corporate or stiff, should not be busy or dense, and should not rely on flashy animation.

## Evidence on Hand

- Resume PDF at `public/resume.pdf` (source of truth for all facts and numbers).
- Shipped work with live links: create-db, Prisma docs, Prisma docs llms.txt, clasp.sh, Prisma guides, Management API docs, Prisma Claude Code plugin.
- OSS contributions: trpc-cli, better-hub, Better Auth.
- Blog posts in `src/content/blog/`.
- Open items are tracked in `TODO.md`. No testimonials or headshot exist. Do not fabricate testimonials, quotes, or metrics.

## Product Principles

1. Proof over claims: every claim links to something real.
2. Skimmable in under 30 seconds on a phone.
3. Honest framing: past roles read as past, numbers match the resume.
4. Restraint: fewer, better elements.

## Accessibility & Inclusion

WCAG AA contrast, keyboard-focusable links, respects reduced motion.
