import { j as jsxRuntimeExports, r as reactExports } from "../_chunks/_libs/react.mjs";
import { W as WORK, E as EXPERIENCE } from "./work-JHlT9NnE.mjs";
import { A as ArrowUpRight } from "../_libs/lucide-react.mjs";
function FilterRow({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-5 max-sm:flex-col max-sm:items-start max-sm:gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 shrink-0 text-[10.5px] uppercase tracking-[0.08em] text-page-faint", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-4 gap-y-1", children })
  ] });
}
function Work() {
  const [activeCo, setActiveCo] = reactExports.useState(null);
  const [activeType, setActiveType] = reactExports.useState(null);
  const availableTypes = reactExports.useMemo(() => [...new Set(WORK.filter((w) => !activeCo || w.company === activeCo).map((w) => w.type))], [activeCo]);
  const availableCompanies = reactExports.useMemo(() => [...new Set(WORK.filter((w) => !activeType || w.type === activeType).map((w) => w.company))], [activeType]);
  const filtered = reactExports.useMemo(() => WORK.filter((w) => {
    if (activeCo && w.company !== activeCo) return false;
    if (activeType && w.type !== activeType) return false;
    return true;
  }), [activeCo, activeType]);
  function handleSetCo(co) {
    const next = activeCo === co ? null : co;
    setActiveCo(next);
    if (next && activeType) {
      const typesForCo = [...new Set(WORK.filter((w) => w.company === next).map((w) => w.type))];
      if (!typesForCo.includes(activeType)) setActiveType(null);
    }
  }
  function handleSetType(type) {
    const next = activeType === type ? null : type;
    setActiveType(next);
    if (next && activeCo) {
      const cosForType = [...new Set(WORK.filter((w) => w.type === next).map((w) => w.company))];
      if (!cosForType.includes(activeCo)) setActiveCo(null);
    }
  }
  const hasFilter = activeCo !== null || activeType !== null;
  const reset = () => {
    setActiveCo(null);
    setActiveType(null);
  };
  const chipClass = (active) => `py-1 text-[12.5px] transition-colors duration-[220ms] cursor-pointer ${active ? "text-page-ink underline underline-offset-[4px] decoration-1" : "text-page-muted hover:text-page-ink"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-8 pt-20 max-sm:pb-6 max-sm:pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink", children: "Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted", children: "A flat index of things I've made or shipped, mostly recent. Filter by tag, or just scroll." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-b border-t border-page-border-soft py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterRow, { label: "type", children: availableTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: chipClass(activeType === type), onClick: () => handleSetType(type), children: type.toLowerCase() }, type)) }),
      availableCompanies.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(FilterRow, { label: "from", children: availableCompanies.map((co) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: chipClass(activeCo === co), onClick: () => handleSetCo(co), children: co.toLowerCase() }, co)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 text-[11.5px] text-page-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        filtered.length,
        " of ",
        WORK.length
      ] }),
      hasFilter && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "underline decoration-dotted decoration-page-faint underline-offset-[3px] transition-colors hover:decoration-page-ink hover:text-page-ink", onClick: reset, children: "clear filters" })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-[14px] text-page-faint", children: "nothing here" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] text-page-muted", children: [
        "try a different filter, or",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "underline decoration-dotted decoration-page-faint underline-offset-[3px] transition-colors hover:decoration-page-ink hover:text-page-ink", onClick: reset, children: "clear" }),
        "."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[6px]", children: filtered.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkRow, { item }, item.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 text-[11px] uppercase tracking-[0.08em] text-page-faint", children: "Experience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: EXPERIENCE.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceRow, { item }, item.id)) })
    ] })
  ] });
}
function ExperienceRow({
  item
}) {
  const isExternal = !!item.url;
  const Tag = isExternal ? "a" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { className: "exp-row", ...isExternal ? {
    href: item.url,
    target: "_blank",
    rel: "noreferrer"
  } : {}, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13.5px] leading-[1.4] text-page-ink", children: [
      item.role,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[3px] block text-[12px] leading-[1.5] text-page-muted", children: item.desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "exp-co text-[12px] text-page-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-nowrap", children: item.company }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-page-faint", children: item.kind }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2 text-[10.5px] whitespace-nowrap text-page-faint", children: item.date })
    ] }),
    isExternal ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "work-arrow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-[11px] w-[11px]" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
  ] });
}
function WorkRow({
  item
}) {
  const isExternal = item.url !== "#";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "work-row", href: item.url, target: isExternal ? "_blank" : void 0, rel: "noreferrer", "aria-disabled": !isExternal, onClick: !isExternal ? (e) => e.preventDefault() : void 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "work-type text-[11px] lowercase text-page-muted", children: item.type }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13.5px] leading-[1.4] text-page-ink", children: [
      item.title,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[3px] block text-[12px] leading-[1.5] text-page-muted", children: item.desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "work-ctx text-right text-[12px] text-page-muted", children: item.company }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "work-arrow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-[11px] w-[11px]" }) })
  ] });
}
export {
  ExperienceRow,
  Work as component
};
