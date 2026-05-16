import { Link } from "@tanstack/react-router"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

interface ListRowProps {
  children: ReactNode
  href?: string
  internal?: boolean
  className?: string
}

export function ListRow({ children, href, internal, className = "" }: ListRowProps) {
  const base = `group grid gap-5 rounded p-[14px_12px] items-baseline relative no-underline text-inherit font-mono transition-[background] duration-100 hover:bg-page-surface ${className}`

  if (!href || href === "#") {
    return <div className={base}>{children}</div>
  }

  if (internal) {
    return (
      <Link className={base} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <a className={base} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export function RowArrow({ direction = "up-right" }: { direction?: "right" | "up-right" }) {
  const hoverTransform =
    direction === "right"
      ? "group-hover:translate-x-[3px]"
      : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"

  return (
    <div className={`self-start pt-0.5 text-page-faint transition-all duration-150 group-hover:text-page-ink ${hoverTransform}`}>
      {direction === "right" ? (
        <ArrowRight className="h-[11px] w-[11px]" />
      ) : (
        <ArrowUpRight className="h-[11px] w-[11px]" />
      )}
    </div>
  )
}

export function Divider() {
  return <div className="h-px bg-page-border-soft transition-colors duration-[220ms]" />
}
