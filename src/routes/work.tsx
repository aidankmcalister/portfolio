import { createFileRoute } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"
import { WORK, type WorkItem, type WorkType } from "@/data/work"

export const Route = createFileRoute("/work")({ component: Work })

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-5 max-sm:flex-col max-sm:items-start max-sm:gap-1.5">
      <span className="w-12 shrink-0 text-[10.5px] uppercase tracking-[0.08em] text-page-faint">
        {label}
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-1">{children}</div>
    </div>
  )
}

function Work() {
  const [activeCo, setActiveCo] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<WorkType | null>(null)

  // Derived dynamically: chips only render for values present in WORK.
  const types = useMemo(() => [...new Set(WORK.map((w) => w.type))], [])
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
      <div className="pb-8 pt-20 max-sm:pb-6 max-sm:pt-12">
        <h2 className="mb-3 text-[22px] font-[500] tracking-[-0.015em] text-page-ink">
          Work
        </h2>
        <p className="max-w-[560px] text-[13.5px] leading-[1.65] text-page-muted">
          A flat index of things I've made or shipped, mostly recent. Filter by tag, or just scroll.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="space-y-3 border-b border-t border-page-border-soft py-4">
        <FilterRow label="type">
          {types.map((type) => (
            <button
              key={type}
              className={chipClass(activeType === type)}
              onClick={() => setActiveType(activeType === type ? null : type)}
            >
              {type.toLowerCase()}
            </button>
          ))}
        </FilterRow>
        <FilterRow label="from">
          {companies.map((co) => (
            <button
              key={co}
              className={chipClass(activeCo === co)}
              onClick={() => setActiveCo(activeCo === co ? null : co)}
            >
              {co.toLowerCase()}
            </button>
          ))}
        </FilterRow>
      </div>

      {/* Result count */}
      <div className="flex items-center gap-3 pt-4 text-[11.5px] text-page-muted">
        <span>
          {filtered.length} of {WORK.length}
        </span>
        {hasFilter && (
          <button
            className="underline decoration-dotted decoration-page-faint underline-offset-[3px] transition-colors hover:decoration-page-ink hover:text-page-ink"
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
              className="underline decoration-dotted decoration-page-faint underline-offset-[3px] transition-colors hover:decoration-page-ink hover:text-page-ink"
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
