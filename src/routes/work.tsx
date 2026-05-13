import { createFileRoute } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useMemo, useState } from "react"
import { WORK, type WorkItem, type WorkType } from "@/data/work"

export const Route = createFileRoute("/work")({ component: Work })

const ALL_TYPES: WorkType[] = ["Docs", "Demo", "Talk", "Post", "Video", "OSS"]

function Work() {
  const [activeCo, setActiveCo] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<WorkType | null>(null)

  const companies = useMemo(() => [...new Set(WORK.map((w) => w.company))], [])

  const filtered = useMemo(
    () =>
      WORK.filter((w) => {
        if (activeCo && w.company !== activeCo) return false
        if (activeType && w.type !== activeType) return false
        return true
      }),
    [activeCo, activeType]
  )

  const hasFilter = activeCo !== null || activeType !== null
  const reset = () => {
    setActiveCo(null)
    setActiveType(null)
  }

  const chipClass = (active: boolean) =>
    `py-1 text-[12.5px] transition-colors duration-[220ms] cursor-pointer ${
      active
        ? "text-page-ink underline underline-offset-[4px] decoration-1"
        : "text-page-muted hover:text-page-ink"
    }`

  return (
    <div className="animate-fade pb-16">
      {/* Header */}
      <div className="pb-7 pt-16 max-sm:pb-5 max-sm:pt-10">
        <h2 className="mb-[10px] text-[22px] font-[500] tracking-[-0.015em] text-page-ink">
          Work
        </h2>
        <p className="max-w-[580px] text-[13.5px] leading-[1.65] text-page-muted">
          A flat index of things I've made or shipped, mostly recent. Filter by tag, or just scroll.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-t border-page-border-soft py-[14px]">
        <div className="flex flex-wrap items-center gap-0 text-[12.5px]">
          <button className={chipClass(!hasFilter)} onClick={reset}>
            all
          </button>
          <span className="select-none px-[9px] text-page-faint">·</span>
          {companies.map((co, i) => (
            <span key={co} className="inline-flex items-center">
              <button
                className={chipClass(activeCo === co)}
                onClick={() => setActiveCo(activeCo === co ? null : co)}
              >
                {co.toLowerCase()}
              </button>
              {i < companies.length - 1 && (
                <span className="select-none px-[9px] text-page-faint">·</span>
              )}
            </span>
          ))}

          <span className="select-none px-[12px] text-page-faint">/</span>

          {ALL_TYPES.map((type, i) => (
            <span key={type} className="inline-flex items-center">
              <button
                className={chipClass(activeType === type)}
                onClick={() => setActiveType(activeType === type ? null : type)}
              >
                {type.toLowerCase()}
              </button>
              {i < ALL_TYPES.length - 1 && (
                <span className="select-none px-[9px] text-page-faint">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center gap-[10px] pt-[14px] text-[11.5px] text-page-muted">
        <span>
          {filtered.length} of {WORK.length}
        </span>
        {hasFilter && (
          <button
            className="border-b border-dotted border-page-faint transition-colors hover:border-page-ink hover:text-page-ink"
            onClick={reset}
          >
            clear filters
          </button>
        )}
      </div>

      {/* Work list */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-3 text-[14px] text-page-faint">nothing here</div>
          <div className="text-[13px] text-page-muted">
            try a different filter, or{" "}
            <button
              className="border-b border-dotted border-page-faint transition-colors hover:border-page-ink hover:text-page-ink"
              onClick={reset}
            >
              clear
            </button>
            .
          </div>
        </div>
      ) : (
        <div className="mt-[6px]">
          {filtered.map((item) => (
            <WorkRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function WorkRow({ item }: { item: WorkItem }) {
  const isExternal = item.url !== "#"
  return (
    <a
      className="work-row"
      href={item.url}
      target={isExternal ? "_blank" : undefined}
      rel="noreferrer"
      aria-disabled={!isExternal}
      onClick={!isExternal ? (e) => e.preventDefault() : undefined}
    >
      <div className="work-type text-[11px] lowercase text-page-muted">{item.type}</div>
      <div className="text-[13.5px] leading-[1.4] text-page-ink">
        {item.title}
        <span className="mt-[3px] block text-[12px] leading-[1.5] text-page-muted">
          {item.desc}
        </span>
      </div>
      <div className="work-ctx text-right text-[12px] text-page-muted">{item.company}</div>
      <div className="work-arrow">
        <ArrowUpRight className="h-[11px] w-[11px]" />
      </div>
    </a>
  )
}
