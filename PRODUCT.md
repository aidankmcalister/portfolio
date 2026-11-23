# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers and recruiters deciding whether to talk to Aidan McAlister. He links the site from almost every job application. Roles he wants, IC only:

- Frontend, product, or full-stack engineer.
- Developer Advocate, DevRel, or DX engineer.
- Docs or technical writing engineer.
- Solutions engineer.

Visitors skim, often on a phone, and spend well under a minute. They should reach his best work in under 30 seconds.

## Product Purpose

The site advocates for Aidan: it shows who he is, proves what he shipped, and gets the visitor to email him or open the resume. Success is an email or a resume open.

## Positioning

A frontend-leaning full-stack engineer and Developer Advocate (never "former"; Aidan, Nov 2026) who builds TypeScript tools, docs, and developer-facing products, and can show both tracks with shipped evidence: create-db and the Prisma docs rebuild at Prisma, and OpenTape, a native macOS app he built and released alone.

## Operating Context

- Astro 6 static site, deployed on Vercel at aidanmcalister.com.
- Structure (Aidan, Nov 2026): one page, plus a page per blog post. Keep llms.txt / llms-full.txt and a markdown version of pages, blog post URLs under /blog/<slug>, RSS, sitemap, and generated per-page social cards.
- Content source of truth: `/Users/aidankmcalister/projects/career-ops/output/portfolio-prompt.md` (Nov 2026 brief). Resume at `public/resume.pdf`.

## Capabilities and Constraints

- Simple, clean, lightweight, easy to digest. Fast static HTML, near-zero client JS.
- Every fact comes from the brief. No invented metrics, employers, titles, dates, tools, or projects. Ask before adding anything not in it.
- Prisma (Developer Advocate, March 2025 to May 2026) is past work on Prisma's products. Never say anything negative about Prisma. Don't mention the layoff.
- Inner Armor (Front End, contract, July 2024 to March 2025) and Elevate Digital IO (Full Stack, contract, January 2024 to August 2024).
- Education: Nucamp Full Stack Development Bootcamp (March 2023 to February 2024). No CS degree; never imply one.
- OpenTape is the main side project (sole creator). clasp.sh may appear as a minor entry. SureUI is not on the site.
- TanStack is the only partnership. Never list Bun or Deno as partnerships.
- Discord: "managed and helped grow" past 10,000 members, never "grew".
- create-db: never "6M runs". Keep every number exactly as the brief writes it.
- OpenTape: no GitHub stars, never "halved export time".
- No phone number on the site.

## Brand Commitments

- Voice (binding): Aidan's own. Short, plain sentences; specific facts over adjectives; peer tone, not student. Lead with what he built and what it did. Past tense for finished work.
- Copy bans (binding): no em or en dashes in prose; avoid colons in sentences; never "passionate", "excited", "genuinely", "thrilled", "I usually design what I build", "where I do my best work", "not just X but Y", one-line dramatic closers, or "eager to learn" lines. Don't mention his own use of AI coding tools (shipped AI work is fine).
- Visual identity (binding, Aidan, Nov 2026): the calm, text-first personal site, played straight. References he chose: evanyou.me (light, big italic serif name, prose bio, soft highlighted links) and leerob.com (tidy lists with dates on the right); mhartington.io as a third. A mix of Evan and Lee. Follows the visitor's light or dark setting. Not a concept world; craft is the bar.

## Evidence on Hand

- Links: GitHub github.com/aidankmcalister, LinkedIn linkedin.com/in/aidanmcalister, email aidankmcalister@gmail.com, OpenTape opentape.app and github.com/aidankmcalister/OpenTape, create-db github.com/prisma/create-db (docs prisma.io/docs/postgres/npx-create-db), docs rebuild write-up prisma.io/blog/rebuilding-the-prisma-docs, AI-docs post /blog/your-docs-are-invisible-to-ai, Claude Code plugin claude.com/plugins/prisma, REST API docs prisma.io/docs/rest-api.
- Posts: "Your Docs Are Invisible to AI. Here's Why" (May 2026), "Rebuilding the Prisma Docs" (2026), "Vibe Coding with Prisma MCP and Next.js" (2025).
- Screenshots of shipped work are archived on branch `archive/two-readers-revamp` in `src/assets/work/` (create-db, Prisma docs, Prisma home and Postgres pages, llms.txt, clasp).
- No testimonials, headshot, or press. Do not fabricate any.

## Product Principles

1. Best work within 30 seconds.
2. Proof over claims; every claim traceable to the brief or a live link.
3. Two tracks, one person: engineering and DevRel evidence side by side.
4. Restraint: fewer, better elements.

## Accessibility & Inclusion

WCAG AA contrast, keyboard reachable, respects reduced motion, works on a phone first.
