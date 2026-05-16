import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"
import { Analytics } from "@vercel/analytics/react"
import { Menu, Moon, Sun, X } from "lucide-react"
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

function getOrigin(): string {
  if (typeof window !== "undefined") return window.location.origin
  return import.meta.env.VITE_APP_URL ?? "http://localhost:3000"
}

export const Route = createRootRoute({
  head: () => {
    const origin = getOrigin()
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Aidan McAlister" },
        {
          name: "description",
          content:
            "Developer Advocate building clear docs, practical demos, and better developer experiences.",
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Aidan McAlister" },
        {
          property: "og:description",
          content:
            "Developer Advocate building clear docs, practical demos, and better developer experiences.",
        },
        {
          property: "og:image",
          content: `${origin}/api/og?title=Aidan+McAlister&author=Aidan+McAlister`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${origin}/api/og?title=Aidan+McAlister&author=Aidan+McAlister`,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Aidan McAlister",
            url: "https://www.aidanmcalister.com",
            jobTitle: "Developer Advocate",
            knowsAbout: [
              "Developer Relations",
              "Technical Writing",
              "Documentation",
              "Developer Experience",
            ],
            sameAs: [
              "https://github.com/aidankmcalister",
              "https://www.linkedin.com/in/aidankmcalister",
            ],
          }),
        },
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap",
        },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "icon", href: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
        { rel: "icon", href: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      ],
    }
  },
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [path])

  const linkClass = (active: boolean) =>
    `py-2.5 text-[12.5px] transition-colors duration-[220ms] ${
      active
        ? "border-b border-page-ink pb-[9px] text-page-ink"
        : "text-page-muted hover:text-page-ink"
    }`

  const mobileLinkClass = (active: boolean) =>
    `block py-3 text-[14px] transition-colors duration-[220ms] ${
      active ? "text-page-ink" : "text-page-muted"
    }`

  return (
    <nav className="nav-bg sticky top-0 z-10 border-b border-page-border-soft font-mono backdrop-blur-[10px] transition-[border-color] duration-[220ms]">
      <div className="flex items-center justify-between py-[22px]">
        <Link
          to="/"
          className="text-[13.5px] font-[500] tracking-[-0.005em] text-page-ink"
        >
          Aidan McAlister
        </Link>
        <div className="flex items-center gap-[22px] max-sm:hidden">
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
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
          >
            <span suppressHydrationWarning>
              {mounted ? (
                isDark ? (
                  <Sun className="h-[15px] w-[15px]" />
                ) : (
                  <Moon className="h-[15px] w-[15px]" />
                )
              ) : (
                <Moon className="h-[15px] w-[15px]" />
              )}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
          >
            <span suppressHydrationWarning>
              {mounted ? (
                isDark ? (
                  <Sun className="h-[15px] w-[15px]" />
                ) : (
                  <Moon className="h-[15px] w-[15px]" />
                )
              ) : (
                <Moon className="h-[15px] w-[15px]" />
              )}
            </span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
          >
            {menuOpen ? (
              <X className="h-[17px] w-[17px]" />
            ) : (
              <Menu className="h-[17px] w-[17px]" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-page-border-soft pb-4 pt-2 transition-colors duration-[220ms] sm:hidden">
          <Link to="/" className={mobileLinkClass(path === "/")}>
            home
          </Link>
          <Link to="/work" className={mobileLinkClass(path === "/work")}>
            work
          </Link>
          <Link to="/blog" className={mobileLinkClass(path === "/blog")}>
            blog
          </Link>
        </div>
      )}
    </nav>
  )
}

function RootLayout() {
  const { isDark, mounted, toggle } = useTheme()
  return (
    <div className="mx-auto max-w-[880px] px-12 max-sm:px-5">
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav isDark={isDark} mounted={mounted} toggle={toggle} />
      <main id="main">
        <Outlet />
      </main>
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
