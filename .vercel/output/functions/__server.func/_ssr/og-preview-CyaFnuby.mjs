import { j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { R as Route$5 } from "./router-CHZH9jjW.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/@tanstack/react-router.mjs";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_chunks/_libs/@vercel/analytics.mjs";
import "../_libs/marked.mjs";
import "../_libs/lucide-react.mjs";
function OgPreview() {
  const {
    pages,
    origin
  } = Route$5.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8 pt-20 max-sm:pb-6 max-sm:pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink", children: "OG Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted", children: "Generated Open Graph images for every page. New pages appear automatically." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-page-border-soft" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-10 pt-10", children: pages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-baseline gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-[500] text-page-ink", children: page.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-page-faint", children: page.path })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${origin}/api/og?title=${encodeURIComponent(page.title)}&author=Aidan+McAlister`, alt: `OG image for ${page.label}`, width: 1200, height: 630, className: "w-full max-w-[560px] rounded-sm border border-page-border-soft" })
    ] }, page.path)) })
  ] });
}
export {
  OgPreview as component
};
