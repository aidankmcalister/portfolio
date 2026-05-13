import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"
import { Analytics } from "@vercel/analytics/react"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import appCss from "../styles.css?url"
import type { ReactNode } from "react"

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
`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aidan McAlister" },
      {
        name: "description",
        content:
          "Developer Advocate building clear docs, practical demos, and better developer experiences.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const stored = localStorage.getItem("theme")
    const dark = stored ? stored === "dark" : mq.matches
    setIsDark(dark)
    setMounted(true)
    document.documentElement.classList.toggle("dark", dark)

    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return
      setIsDark(e.matches)
      document.documentElement.classList.toggle("dark", e.matches)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return { isDark, mounted, toggle }
}

function Nav({
  isDark,
  mounted,
  toggle,
}: {
  isDark: boolean
  mounted: boolean
  toggle: () => void
}) {
  const { location } = useRouterState()
  const path = location.pathname

  const linkClass = (active: boolean) =>
    `py-1 text-[12.5px] transition-colors duration-[220ms] ${
      active
        ? "border-b border-page-ink pb-[3px] text-page-ink"
        : "text-page-muted hover:text-page-ink"
    }`

  return (
    <nav className="nav-bg sticky top-0 z-10 flex items-center justify-between border-b border-page-border-soft py-[22px] backdrop-blur-[10px]">
      <Link to="/" className="text-[13.5px] font-[500] tracking-[-0.005em] text-page-ink">
        Aidan McAlister
      </Link>
      <div className="flex items-center gap-[22px]">
        <Link to="/" className={linkClass(path === "/")}>
          home
        </Link>
        <Link to="/work" className={linkClass(path === "/work")}>
          work
        </Link>
        <Link to="/blog" className={linkClass(path === "/blog")}>
          blog
        </Link>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          suppressHydrationWarning
          className="flex h-6 w-6 items-center justify-center text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
        >
          <span suppressHydrationWarning>
            {mounted ? (
              isDark ? (
                <Sun className="h-[15px] w-[15px]" />
              ) : (
                <Moon className="h-[14px] w-[14px]" />
              )
            ) : (
              <Moon className="h-[14px] w-[14px]" />
            )}
          </span>
        </button>
      </div>
    </nav>
  )
}

function RootLayout() {
  const { isDark, mounted, toggle } = useTheme()
  return (
    <div className="mx-auto max-w-[880px] px-9 max-sm:px-5">
      <Nav isDark={isDark} mounted={mounted} toggle={toggle} />
      <Outlet />
    </div>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <HeadContent />
      </head>
      <body>
        <Analytics />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
