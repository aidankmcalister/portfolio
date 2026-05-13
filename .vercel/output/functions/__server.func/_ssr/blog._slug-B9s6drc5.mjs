import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { a as Route$1 } from "./router-CHZH9jjW.mjs";
import { a as ArrowLeft } from "../_libs/lucide-react.mjs";
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
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogPost() {
  const {
    post
  } = Route$1.useLoaderData();
  const {
    title,
    date
  } = post.frontmatter;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "animate-fade pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10 pt-20 max-sm:pb-8 max-sm:pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "mb-8 inline-flex items-center gap-1.5 text-[12px] text-page-muted transition-colors hover:text-page-ink", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-[11px] w-[11px]" }),
        "back to blog"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-5 max-w-[640px] text-[26px] font-[500] leading-[1.3] tracking-[-0.018em] text-page-ink max-sm:text-[22px]", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-page-muted", children: formatDate(date) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-page-border-soft" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-blog pt-10 max-sm:pt-8", dangerouslySetInnerHTML: {
      __html: post.html
    } })
  ] });
}
export {
  BlogPost as component
};
