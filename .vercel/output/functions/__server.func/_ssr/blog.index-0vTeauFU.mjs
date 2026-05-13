import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { g as getPublishedPosts } from "./router-CHZH9jjW.mjs";
import { A as ArrowUpRight } from "../_libs/lucide-react.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
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
import "../_chunks/_libs/@vercel/analytics.mjs";
import "../_libs/marked.mjs";
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const formatted = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
function Blog() {
  const posts = getPublishedPosts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8 pt-20 max-sm:pb-6 max-sm:pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink", children: "Blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted", children: "Things I'm thinking about. Mostly docs, dev tools, and the lessons that show up when you ship them." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-page-border-soft" }),
    posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 py-28 text-center max-sm:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] text-page-faint", children: "nothing posted yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[320px] text-[13px] leading-[1.6] text-page-muted", children: "drafts in progress. first one lands soon." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogRow, { post }, post.frontmatter.slug)) })
  ] });
}
function BlogRow({
  post
}) {
  const {
    slug,
    title,
    date,
    description
  } = post.frontmatter;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { className: "blog-row", to: "/blog/$slug", params: {
    slug
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-date text-[11px] text-page-muted", children: formatDate(date) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13.5px] leading-[1.4] text-page-ink", children: [
      title,
      description ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[3px] block text-[12px] leading-[1.5] text-page-muted", children: description }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "work-arrow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-[11px] w-[11px]" }) })
  ] });
}
export {
  Blog as component
};
