import { E as notFound } from "../_chunks/_libs/@tanstack/router-core.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, O as Outlet, H as HeadContent, S as Scripts, u as useRouterState, L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { A as Analytics } from "../_chunks/_libs/@vercel/analytics.mjs";
import { g } from "../_libs/marked.mjs";
import { S as Sun, M as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
const appCss = "/assets/styles-CMFw6VYt.css";
const themeBootstrapScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem("theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
      if (shouldUseDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (_error) {}
  })();
`;
function getOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}
const Route$7 = createRootRoute({
  head: () => {
    const origin = getOrigin();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Aidan McAlister" },
        {
          name: "description",
          content: "Developer Advocate building clear docs, practical demos, and better developer experiences."
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Aidan McAlister" },
        {
          property: "og:description",
          content: "Developer Advocate building clear docs, practical demos, and better developer experiences."
        },
        {
          property: "og:image",
          content: `${origin}/api/og?title=Aidan+McAlister&author=Aidan+McAlister`
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${origin}/api/og?title=Aidan+McAlister&author=Aidan+McAlister`
        }
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "icon", href: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
        { rel: "icon", href: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" }
      ]
    };
  },
  shellComponent: RootDocument,
  component: RootLayout
});
function useTheme() {
  const [isDark, setIsDark] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : mq.matches;
    setIsDark(dark);
    setMounted(true);
    document.documentElement.classList.toggle("dark", dark);
    const handler = (e) => {
      if (localStorage.getItem("theme")) return;
      setIsDark(e.matches);
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return { isDark, mounted, toggle };
}
function Nav({
  isDark,
  mounted,
  toggle
}) {
  const { location } = useRouterState();
  const path = location.pathname;
  const linkClass = (active) => `py-1 text-[12.5px] transition-colors duration-[220ms] ${active ? "border-b border-page-ink pb-[3px] text-page-ink" : "text-page-muted hover:text-page-ink"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "nav-bg sticky top-0 z-10 flex items-center justify-between border-b border-page-border-soft py-[22px] backdrop-blur-[10px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "text-[13.5px] font-[500] tracking-[-0.005em] text-page-ink",
        children: "Aidan McAlister"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[22px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: linkClass(path === "/"), children: "home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/work", className: linkClass(path === "/work"), children: "work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: linkClass(path === "/blog"), children: "blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggle,
          "aria-label": "Toggle theme",
          suppressHydrationWarning: true,
          className: "flex h-6 w-6 items-center justify-center text-page-muted transition-colors duration-[220ms] hover:text-page-ink",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { suppressHydrationWarning: true, children: mounted ? isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-[15px] w-[15px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-[14px] w-[14px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-[14px] w-[14px]" }) })
        }
      )
    ] })
  ] });
}
function RootLayout() {
  const { isDark, mounted, toggle } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[880px] px-9 max-sm:px-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, { isDark, mounted, toggle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: themeBootstrapScript } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Analytics, {}),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./work-BCF7TEzu.mjs");
const Route$6 = createFileRoute("/work")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const __vite_glob_0_0 = `---
title: "The push I didn't ask for"
slug: "the-push-i-didnt-ask-for"
date: "2026-05-13"
description: "I read my termination notice alone in the morning. Half my company was gone by end of day. Here's what that was actually like."
draft: false
---

Yesterday I got laid off.

I woke up, saw a weird meeting on my calendar, opened Slack, and read that my position had been affected. Notice of termination attached. The company runs on European time, so the announcement had come through at 4:30am. That meant I wasn't a part of the announcement call.

The first thing that went through my head was "I'm fucked."

## What the rest of that morning looked like

22 people were cut, dropping the company by about 50%. The whole DevRel team, mostly gone.

Once I knew I wasn't the only one, it made it a bit easier to swallow and helped me not feel alone in this process. There were people in it with me, and that mattered. Before we all lost Slack access, we scrambled to stay connected. Discord channels, WhatsApp group chats, whatever we could set up fast. Most of that first day I spent talking to people and pulling together what I needed for my resume.

It helped to have something to still think about and work on.

Over the weekend and into Monday I pushed hard to get through a lot of what I had open. Tuesday morning I was laid off.

That timeline is hard to sit with. I'm pissed about it. But I also understand why it happened. This wasn't a "we want more profit" situation, but knowing that doesn't make it hurt any less, but it makes it easier to process and understand that I need to keep moving forward.

## A year of actual progress

In one year I went from a no-experience intern, to a junior, to an intermediate. I was told I did good work. I was promoted because of it.

That doesn't go away because the job did. The layoff says something about the situation. It doesn't say anything about what I built or what I'm capable of.

I'm not going to pretend the "I'm fucked" feeling is gone. It's still there. I'm just pushing forward anyway, because sitting still doesn't help and will just make it harder in the future.

What's actually helping is the people. My *former* team, my family. The relationships I built don't expire with the contract, and I'm not treating them like they do. That support is real, and right now it matters more than I expected. We need to lean on eachother and push forward.

## If this just happened to you

This is just a thing that happens.

It doesn't mean you didn't do good work. It means circumstances changed and you got caught in it. Feel the bad feeling. It's honest. Then take a breath and keep going.

Stay as positive as you can and push through it. That's what I'm doing.
`;
const __vite_glob_0_1 = `---
title: "Your docs are invisible to AI. Here's why."
slug: "your-docs-are-invisible-to-ai"
date: "2026-05-12"
description: "Good documentation doesn't automatically get cited by AI. Here's why retrieval systems skip well-written content, and what to do about it."
draft: true
---

You wrote good docs. They're accurate, detailed, well-organized. The people who find them tell you they're helpful.

So why is the AI assistant citing a 2022 Medium post instead?

I noticed this a few months back. I asked an AI assistant something we have a very clear docs page for, and the answer cited three sources: a tutorial blog from 2022, a Stack Overflow thread, and a comparison page from a small company I'd never heard of. Our page wasn't in the answer at all. I asked the same question across four other AI tools. Only one of them cited us, and it cited us last.

It wasn't a one-off. After spending the last few months tracking how AI tools cite content across the developer ecosystem, I can tell you it isn't a one-company problem either. A lot of good docs are invisible to AI for the same handful of reasons, and none of them are about content quality.

## It's a retrieval problem, not a ranking problem

When a developer Googles something, the system returns links. The developer picks one, reads it, decides if it's useful. Your job is to rank well enough to get the click.

When that same developer asks an AI assistant, the system reads sources and writes the answer for them. The developer never sees most of those sources. The AI decides what's useful, pulls what it needs, and attributes it or doesn't.

That's a different game. You're not competing for a click anymore. You're competing to be the clearest, most extractable answer when a retrieval system is choosing what to quote.

Even very good documentation can fail that test.

## Why docs get skipped

### The answer is too far down the page

Retrieval systems weight the top of a page more heavily than the bottom. Makes sense. If you're summarizing content quickly, what comes first matters most.

Most docs are written as a logical progression: context, background, then the actual answer. Great for readers who need all of it. Bad for retrieval systems looking for a quotable answer in the first few paragraphs.

If your page on database connections opens with three paragraphs explaining what connection pooling is before it shows how to configure it, you're competing against sources that lead with the configuration.

### The answer lives inside a component that doesn't render

Modern docs frameworks lean on interactive components. Tabbed code blocks. Expandable sections. API references rendered from JSON. Conditional content based on selected framework.

These are great for humans. They're often invisible to crawlers.

Most AI retrieval systems read pages the same way search crawlers do: they see what the page delivers before JavaScript runs. If your answer only appears after a user clicks a tab or picks a runtime, the crawler may never see it. Neither will the AI.

We hit this directly during a recent 400+ page docs rebuild. A surprising amount of useful content was buried inside tabs or interactive panels. Once we made sure those components flattened cleanly into the underlying markdown, citation patterns shifted.

### The content is outdated

Retrieval systems don't have a reliable way to know when a page was last updated. But outdated content creates real downstream problems. Developers follow advice that no longer works, lose trust in the source, and the systems trained on that feedback learn to weight your domain a little less over time.

If your docs still reference a deprecated API, an old CLI flag, or a version number from two releases ago, you're eroding the signal that your content is current and worth quoting.

### The question doesn't have a page

This one is easy to miss. Your docs might answer every question about how your product works. But AI assistants get asked questions that span categories your docs don't cover.

"How does X compare to Y?" is one of the most common question shapes in developer AI search. If you don't have a comparison page, someone else does. That third-party page becomes the thing shaping how your product gets described.

We've seen this play out in our own space. A comparison page from a small company can pull hundreds of AI citations a month at a higher source rank than your own pages, because you hadn't published a direct answer to the comparison question. Same goes for integration questions ("how do I use X with Vercel?"), troubleshooting patterns ("why does X fail on edge runtimes?"), and configuration edge cases.

### The page is crawlable but structurally weak

A page can be fully accessible and still produce nothing useful for a retrieval system to cite. Weak page structure usually looks like:

- Headings that describe the section's theme instead of its answer ("Configuration" instead of "How to configure connection timeouts")
- Long explanatory paragraphs with the key fact buried in the middle
- No concrete examples next to the conceptual explanation
- Topics covered but never directly answered

A retrieval system looking for something quotable needs to extract a discrete, accurate answer. If your page explains the topic without ever stating the answer plainly, it's hard to cite usefully.

[IMAGE: side-by-side comparison. Left card labeled "HARD TO CITE" with heading "Configuration" and a paragraph where the key sentence about setting the connectionTimeout option is buried in the middle (highlighted red). Right card labeled "EASY TO CITE" with heading "How to configure connection timeouts" and a paragraph where the same key sentence is the opening line (highlighted green).]

## Being cited isn't enough

There's a subtler version of this problem worth pulling out.

When an AI answer lists eight sources, the first ones tend to carry more weight in the actual response. If your content consistently lands at position 6 or 7, it's technically referenced but not shaping the answer.

We tracked this across our own docs with an AI citation monitor like [Promptwatch](https://www.promptwatch.io/) and found that even pages with high citation frequency were averaging a citation rank around 6. The problem wasn't discoverability. It was that other sources were more quotable: more direct, cleaner structure, answer closer to the top.

The fix isn't to publish more. It's to look at the pages you already have and ask: if an AI had to pick one quotable sentence from this page, what would it pick? If you can't answer that fast, the retrieval system probably can't either.

## What to actually do

None of this needs a new content strategy. It mostly needs you to look at what you already have through a different lens.

1. **Audit your top questions.** Open an AI assistant. Ask the five questions developers most commonly ask about your product. Look at what gets cited and at what rank. If your docs aren't in those citations, or show up late, that's where to start.
2. **Move the answer up.** On your highest-traffic pages, check where the actual answer lives. If it's not in the first two paragraphs, move it. Keep the context, but lead with the answer.
3. **Make every page readable without JavaScript.** Disable JS in your browser and load a few key pages. If the answer disappears, retrieval systems probably can't see it either. Flatten interactive components so the content exists as plain text in the HTML, not just as rendered UI.
4. **Write for the questions, not just the features.** Audit coverage for integration guides, comparison pages, and troubleshooting patterns. If those questions don't have a clear answer on your domain, someone else's answer becomes the canonical one.
5. **Check what third-party pages are saying.** Search for comparisons involving your product. If those pages are getting cited in AI answers and they're wrong, you can't fix that by publishing internally and hoping. You need a better answer on the same question, or you reach out to the author.
6. **Update before you add.** Outdated pages erode trust in everything around them. Before filling coverage gaps with new content, check what's already there for accuracy.

## Where this goes

The instinct when you hear "AI can't find my docs" is to add something. A new metadata file. An \`llms.txt\`. More pages. Sometimes that helps. Usually the problem is older than that.

Most docs that are invisible to AI retrieval systems were written for a different reading context: a developer who has time to read, who'll navigate through sections, who'll tolerate a slow build to the answer. That reading context still exists. It just isn't the only one anymore.

AI retrieval systems read your docs the way a developer reads them when they're in a hurry. They want the answer near the top, in plain language, with an example. If your content doesn't work like that, it gets skipped.

We're not done with this either. A lot of what we know about citation patterns now, we didn't know six months ago, and our own docs still have pages that fail the test. But the pattern is clear enough to share: the same work that makes your docs more citable usually makes them better for humans too. That's not a coincidence. It's the whole point.
`;
const rawMarkdown = /* @__PURE__ */ Object.assign({
  "../../content/blog/the-push-you-didnt-ask-for.md": __vite_glob_0_0,
  "../../content/blog/your-docs-are-invisible-to-ai.md": __vite_glob_0_1
});
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  let currentArrayKey = null;
  const unquote = (v) => v.replace(/^["']|["']$/g, "");
  const parseInlineArray = (v) => {
    if (!v.startsWith("[") || !v.endsWith("]")) return null;
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((s) => unquote(s.trim()));
  };
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const arrayItem = line.match(/^\s*-\s+(.+)$/);
    if (arrayItem && currentArrayKey) {
      data[currentArrayKey].push(unquote(arrayItem[1].trim()));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      const value = kv[2].trim();
      if (value === "") {
        data[key] = [];
        currentArrayKey = key;
        continue;
      }
      const inlineArr = parseInlineArray(value);
      if (inlineArr !== null) {
        data[key] = inlineArr;
        currentArrayKey = null;
        continue;
      }
      const unquoted = unquote(value);
      if (unquoted === "true") data[key] = true;
      else if (unquoted === "false") data[key] = false;
      else data[key] = unquoted;
      currentArrayKey = null;
    }
  }
  return { data, content: match[2] };
}
function buildPost(raw) {
  const { data, content } = parseFrontmatter(raw);
  const fm = {
    title: String(data.title ?? "Untitled"),
    slug: String(data.slug ?? ""),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    draft: data.draft === true
  };
  const html = g.parse(content, { async: false });
  return { frontmatter: fm, body: content, html };
}
const ALL_POSTS = Object.values(rawMarkdown).map(buildPost).sort((a, b) => a.frontmatter.date < b.frontmatter.date ? 1 : -1);
function getPublishedPosts() {
  return ALL_POSTS.filter((p) => !p.frontmatter.draft);
}
function getPostBySlug(slug) {
  return ALL_POSTS.find((p) => p.frontmatter.slug === slug);
}
const $$splitComponentImporter$4 = () => import("./og-preview-CyaFnuby.mjs");
const Route$5 = createFileRoute("/og-preview")({
  loader: () => {
    const origin = "http://localhost:3000";
    const posts = getPublishedPosts();
    const pages = [{
      label: "Home",
      path: "/",
      title: "Aidan McAlister"
    }, {
      label: "Work",
      path: "/work",
      title: "Work"
    }, {
      label: "Blog",
      path: "/blog",
      title: "Blog"
    }, ...posts.map((post) => ({
      label: post.frontmatter.title,
      path: `/blog/${post.frontmatter.slug}`,
      title: post.frontmatter.title
    }))];
    return {
      pages,
      origin
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./blog-9Hd3AP52.mjs");
const Route$4 = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-Bnqt9L5N.mjs");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./blog.index-0vTeauFU.mjs");
const Route$2 = createFileRoute("/blog/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog._slug-B9s6drc5.mjs");
const Route$1 = createFileRoute("/blog/$slug")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: ({
    params
  }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    const origin = "http://localhost:3000";
    return {
      post,
      origin
    };
  },
  head: ({
    loaderData
  }) => {
    const fm = loaderData?.post.frontmatter;
    const origin = loaderData?.origin ?? "";
    if (!fm) return {};
    const ogImage = `${origin}/api/og?title=${encodeURIComponent(fm.title)}&author=Aidan+McAlister`;
    return {
      meta: [{
        title: fm.title
      }, ...fm.description ? [{
        name: "description",
        content: fm.description
      }] : [], {
        property: "og:title",
        content: fm.title
      }, ...fm.description ? [{
        property: "og:description",
        content: fm.description
      }] : [], {
        property: "og:type",
        content: "article"
      }, {
        property: "og:image",
        content: ogImage
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: fm.title
      }, {
        name: "twitter:image",
        content: ogImage
      }]
    };
  }
});
let fontRegular = null;
let fontMedium = null;
async function loadFont(weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1];
  if (!url) throw new Error("Could not parse font URL from Google Fonts");
  return fetch(url).then((r) => r.arrayBuffer());
}
async function getFonts() {
  if (!fontRegular) fontRegular = await loadFont(400);
  if (!fontMedium) fontMedium = await loadFont(500);
  return [
    {
      name: "JetBrains Mono",
      data: fontRegular,
      weight: 400,
      style: "normal"
    },
    {
      name: "JetBrains Mono",
      data: fontMedium,
      weight: 500,
      style: "normal"
    }
  ];
}
const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { ImageResponse } = await import("../_chunks/_libs/@takumi-rs/image-response.mjs");
        const url = new URL(request.url);
        const title = url.searchParams.get("title") ?? "Aidan McAlister's Portfolio";
        const author = url.searchParams.get("author") ?? "Aidan McAlister";
        const fonts = await getFonts();
        return new ImageResponse(/* @__PURE__ */ jsxRuntimeExports.jsx(OgImage, { title, author }), {
          width: 1200,
          height: 630,
          fonts
        });
      }
    }
  }
});
function OgImage({ title, author }) {
  const titleSize = title.length > 50 ? "64px" : title.length > 25 ? "80px" : "100px";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#0b0b0d",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        fontFamily: '"JetBrains Mono", monospace'
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "flex",
              color: "#3a3a3e",
              fontSize: "22px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 400
            },
            children: "aidanmcalister.com"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "flex",
              flex: 1,
              alignItems: "center"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  color: "#ebeae6",
                  fontSize: titleSize,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  maxWidth: "1040px"
                },
                children: title
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    width: "3px",
                    height: "22px",
                    background: "#3a3a3e",
                    display: "flex"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    color: "#807e78",
                    fontSize: "26px",
                    fontWeight: 400,
                    letterSpacing: "-0.01em"
                  },
                  children: author
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const WorkRoute = Route$6.update({
  id: "/work",
  path: "/work",
  getParentRoute: () => Route$7
});
const OgPreviewRoute = Route$5.update({
  id: "/og-preview",
  path: "/og-preview",
  getParentRoute: () => Route$7
});
const BlogRoute = Route$4.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const BlogIndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const BlogSlugRoute = Route$1.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute
});
const ApiOgRoute = Route.update({
  id: "/api/og",
  path: "/api/og",
  getParentRoute: () => Route$7
});
const BlogRouteChildren = {
  BlogSlugRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  BlogRoute: BlogRouteWithChildren,
  OgPreviewRoute,
  WorkRoute,
  ApiOgRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  Route$1 as a,
  getPublishedPosts as g,
  router as r
};
