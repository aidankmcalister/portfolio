---
title: "Your docs are invisible to AI. Here's why."
slug: "your-docs-are-invisible-to-ai"
date: "2026-05-12"
description: "Good documentation doesn't automatically get cited by AI. Here's why retrieval systems skip well-written content, and what to do about it."
---

You wrote good docs. They're accurate, detailed, well-organized. The people who find them tell you they're helpful.

So why is the AI assistant citing a 2022 Medium post instead?

I noticed this while working on docs at Prisma. I asked an AI assistant something we had a very clear docs page for, and the answer cited three sources: a tutorial blog from 2022, a Stack Overflow thread, and a comparison page from a small company I'd never heard of. Our page wasn't in the answer at all. I asked the same question across four other AI tools. Only one of them cited us, and it cited us last.

It wasn't a one-off. After spending the last few months tracking how AI tools cite content across the developer ecosystem, I can tell you it isn't a one-company problem either. A lot of good docs are invisible to AI for the same handful of reasons, and none of them are about content quality.

# It's a problem with retrieval, not ranking

When a developer Googles something, the system returns links. The developer picks one, reads it, decides if it's useful. Your job is to rank well enough to get the click.

When that same developer asks an AI assistant, the system reads sources and writes the answer for them. The developer never sees most of those sources. The AI decides what's useful, pulls what it needs, and attributes it or doesn't.

That's a different game. You're not competing for a click anymore. You're competing to be the clearest, most extractable answer when a retrieval system is choosing what to quote.

Even very good documentation can fail that test.

# Why docs get skipped

## The answer is too far down the page

Retrieval systems weight the top of a page more heavily than the bottom. Makes sense. If you're summarizing content quickly, what comes first matters most.

Most docs are written as a logical progression: context, background, then the actual answer. Great for readers who need all of it. Bad for retrieval systems looking for a quotable answer in the first few paragraphs.

If your page on database connections opens with three paragraphs explaining what connection pooling is before it shows how to configure it, you're competing against sources that lead with the configuration.

## The answer lives inside a component that doesn't render

Modern docs frameworks lean on interactive components. Tabbed code blocks. Expandable sections. API references rendered from JSON. Conditional content based on selected framework.

These are great for humans. They're often invisible to crawlers.

Most AI retrieval systems read pages the same way search crawlers do: they see what the page delivers before JavaScript runs. If your answer only appears after a user clicks a tab or picks a runtime, the crawler may never see it. Neither will the AI.

I hit this directly during a [400+ page docs rebuild](https://www.prisma.io/blog/rebuilding-the-prisma-docs) at Prisma. A surprising amount of useful content was buried inside tabs or interactive panels. Once I made sure those components flattened cleanly into the underlying markdown, citation patterns shifted.

Here's the kind of thing that's invisible to a crawler:

```jsx
<Tabs>
  <Tab label="PostgreSQL">
    Set `DATABASE_URL` in your `.env` file:
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    ```
  </Tab>
  <Tab label="MySQL">
    Set `DATABASE_URL` in your `.env` file:
    ```
    DATABASE_URL="mysql://user:password@localhost:3306/mydb"
    ```
  </Tab>
</Tabs>
```

A retrieval system sees the `<Tabs>` component and gets nothing. The fix is a markdown conversion layer that flattens it:

```markdown
### PostgreSQL

Set `DATABASE_URL` in your `.env` file:

    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

### MySQL

Set `DATABASE_URL` in your `.env` file:

    DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

Same content. No interactivity required. Now both tabs are crawlable and quotable.

## The content is outdated

Retrieval systems don't have a reliable way to know when a page was last updated. But outdated content creates real downstream problems. Developers follow advice that no longer works, lose trust in the source, and the systems trained on that feedback learn to weight your domain a little less over time.

If your docs still reference a deprecated API, an old CLI flag, or a version number from two releases ago, you're eroding the signal that your content is current and worth quoting.

## The question doesn't have a page

This one is easy to miss. Your docs might answer every question about how your product works. But AI assistants get asked questions that span categories your docs don't cover.

"How does X compare to Y?" is one of the most common question shapes in developer AI search. If you don't have a comparison page, someone else does. That third-party page becomes the thing shaping how your product gets described.

I saw this play out at Prisma. A comparison page from a small company was pulling hundreds of AI citations a month at a higher source rank than our own pages, because we hadn't published a direct answer to the comparison question. Same goes for integration questions ("how do I use X with Vercel?"), troubleshooting patterns ("why does X fail on edge runtimes?"), and configuration edge cases.

Once I started auditing what developers were actually asking AI about, the gaps were obvious. There was no "Prisma Postgres vs Neon" comparison page. No "best Postgres for AI apps" guide. No framework-specific setup pages for [Next.js on Vercel](https://www.prisma.io/docs/guides/nextjs), [SvelteKit](https://www.prisma.io/docs/guides/sveltekit), [Nuxt](https://www.prisma.io/docs/guides/nuxt), or Hono on Cloudflare Workers. Every one of those questions had an answer somewhere else, and that answer was the one getting cited.

## The page is crawlable but structurally weak

A page can be fully accessible and still produce nothing useful for a retrieval system to cite. Weak page structure usually looks like:

- Headings that describe the section's theme instead of its answer ("Configuration" instead of "How to configure connection timeouts")
- Long explanatory paragraphs with the key fact buried in the middle
- No concrete examples next to the conceptual explanation
- Topics covered but never directly answered

A retrieval system looking for something quotable needs to extract a discrete, accurate answer. If your page explains the topic without ever stating the answer plainly, it's hard to cite usefully.

Compare these two versions of the same page:

```markdown
## Configuration

Connection pooling allows your application to reuse
database connections efficiently. When working with
high-traffic applications, you'll want to set the
connectionTimeout option to control how long a client
waits for a connection from the pool.
```

```markdown
## How to configure connection timeouts

Set the connectionTimeout option to control how long
a client waits for a connection from the pool:

    connectionTimeout: 5000 // milliseconds
```

The second version leads with the answer. A retrieval system can quote it directly.

# Being cited isn't enough

There's a subtler version of this problem worth pulling out.

When an AI answer lists eight sources, the first ones tend to carry more weight in the actual response. If your content consistently lands at position 6 or 7, it's technically referenced but not shaping the answer.

I tracked this across the [Prisma docs](https://www.prisma.io/docs) with an AI citation monitor like [Promptwatch](https://www.promptwatch.io/) and found that even pages with high citation frequency were averaging a citation rank around 6. The problem wasn't discoverability. It was that other sources were more quotable: more direct, cleaner structure, answer closer to the top.

The fix isn't to publish more. It's to look at the pages you already have and ask: if an AI had to pick one quotable sentence from this page, what would it pick? If you can't answer that fast, the retrieval system probably can't either.

# What to actually do

None of this needs a new content strategy. It mostly needs you to look at what you already have through a different lens.

1. **Audit your top questions.** Open an AI assistant. Ask the five questions developers most commonly ask about your product. Look at what gets cited and at what rank. If your docs aren't in those citations, or show up late, that's where to start.
2. **Move the answer up.** On your highest-traffic pages, check where the actual answer lives. If it's not in the first two paragraphs, move it. Keep the context, but lead with the answer.
3. **Make every page readable without JavaScript.** Disable JS in your browser and load a few key pages. If the answer disappears, retrieval systems probably can't see it either. Flatten interactive components so the content exists as plain text in the HTML, not just as rendered UI. Serve [`.md` aliases or content-negotiated markdown](https://www.prisma.io/docs/guides/nextjs.md) so agents can skip the HTML entirely.
4. **Write for the questions, not just the features.** Audit coverage for integration guides, comparison pages, and troubleshooting patterns. If those questions don't have a clear answer on your domain, someone else's answer becomes the canonical one.
5. **Check what third-party pages are saying.** Search for comparisons involving your product. If those pages are getting cited in AI answers and they're wrong, you can't fix that by publishing internally and hoping. You need a better answer on the same question, or you reach out to the author.
6. **Update before you add.** Outdated pages erode trust in everything around them. Before filling coverage gaps with new content, check what's already there for accuracy.

# Where this goes

The instinct when you hear "AI can't find my docs" is to add something. A new metadata file. An [`llms.txt`](https://llmstxt.org/). More pages. Sometimes that helps. Usually the problem is older than that.

## Infrastructure comes last

There is real infrastructure worth building, but only once the content itself is solid.

At Prisma, I added an [`llms.txt`](https://www.prisma.io/docs/llms.txt) index to the docs. The useful part wasn't the file itself. It was using it as a forcing function to think about what an AI agent actually needs from a docs site: curated entry points by product area, `.md` URL aliases so agents can request markdown directly, content negotiation so agent user-agents get flat text instead of rendered HTML. (I did [the same thing on this site](/llms.txt) — you can see what a minimal `llms.txt` looks like for a portfolio.)

I also exposed a machine-readable changelog so AI tools can check for breaking changes before citing advice that's no longer accurate.

None of that matters if the underlying pages are still burying the answer three paragraphs deep, or hiding it inside a tab component. Fix the content first. Build the infrastructure after.

## The reading context changed

Most docs that are invisible to AI were written for a different reader: someone who has time, who'll navigate through sections, who'll tolerate a slow build to the answer. That reader still exists. They're just not the only one anymore.

AI retrieval systems read your docs the way a developer reads them when they're in a hurry. They want the answer near the top, in plain language, with an example. If your content doesn't work like that, it gets skipped.

A lot of what I know about citation patterns now, I didn't know six months ago. But the pattern is clear enough to share: the same work that makes your docs more citable usually makes them better for humans too. That's the whole point.
