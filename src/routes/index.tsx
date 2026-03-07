import { createFileRoute } from "@tanstack/react-router"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/")({ component: App })

const actionClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-full border border-page-line bg-page-surface px-[1.02rem] py-[0.64rem] font-inherit text-[0.9rem] leading-none font-[500] text-page-ink transition-[transform,border-color,background-color,color] duration-150 ease-out hover:-translate-y-px hover:border-page-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"

const iconClassName = "h-[0.95rem] w-[0.95rem]"

function setThemeFavicon(isDark: boolean) {
  const iconHref = isDark ? "/favicon-dark.svg" : "/favicon-light.svg"
  let faviconLink = document.querySelector<HTMLLinkElement>('link[data-theme-favicon="true"]')

  if (!faviconLink) {
    faviconLink = document.createElement("link")
    faviconLink.rel = "icon"
    faviconLink.type = "image/svg+xml"
    faviconLink.dataset.themeFavicon = "true"
    document.head.appendChild(faviconLink)
  }

  faviconLink.href = iconHref
}

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const storedTheme = localStorage.getItem("theme")
    const initialDark = storedTheme ? storedTheme === "dark" : mediaQuery.matches

    setIsDark(initialDark)
    document.documentElement.classList.toggle("dark", initialDark)
    setThemeFavicon(initialDark)

    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) {
        return
      }

      setIsDark(event.matches)
      document.documentElement.classList.toggle("dark", event.matches)
      setThemeFavicon(event.matches)
    }

    mediaQuery.addEventListener("change", handleThemeChange)
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange)
    }
  }, [])

  function toggleTheme() {
    const nextDark = !isDark
    setIsDark(nextDark)
    document.documentElement.classList.toggle("dark", nextDark)
    localStorage.setItem("theme", nextDark ? "dark" : "light")
    setThemeFavicon(nextDark)
  }

  return (
    <section className="grid min-h-svh p-[clamp(1rem,2vw,1.75rem)]">
      <main className="mx-auto my-auto grid w-full max-w-[48rem] justify-items-center gap-[clamp(0.9rem,2vw,1.5rem)] text-center animate-rise max-[720px]:gap-4">
        <h1 className="m-0 font-serif text-[clamp(2.05rem,6.1vw,4.35rem)] font-[500] leading-[0.95] tracking-[-0.034em] text-balance">
          Making developers
          <br />
          feel less alone.
        </h1>

        <p className="m-0 max-w-[37rem] font-serif text-[clamp(1.08rem,2.2vw,1.7rem)] italic leading-[1.2] tracking-[-0.012em] text-page-muted text-balance">
          through docs, demos, and the occasional terrible pun.
        </p>

        <p className="m-0 max-w-[34rem] text-[clamp(0.92rem,1.2vw,1.02rem)] leading-[1.6] text-page-muted [text-wrap:pretty]">
          I&apos;m Aidan McAlister, Developer Advocate at{" "}
          <a
            className="text-page-ink underline decoration-page-muted decoration-2 decoration-dotted underline-offset-[0.2em]"
            href="https://www.prisma.io"
            target="_blank"
            rel="noreferrer"
          >
            Prisma
          </a>
          . I turn complex tech into things people actually want to use.
        </p>

        <div className="mt-[0.2rem] flex flex-wrap justify-center gap-[0.62rem]">
          <button type="button" className={actionClassName}>
            <Mail className={iconClassName} aria-hidden />
            <span>Contact me</span>
          </button>

          <a
            className={actionClassName}
            href="https://github.com/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            <Github className={iconClassName} aria-hidden />
            <span>GitHub</span>
          </a>

          <a
            className={actionClassName}
            href="https://www.linkedin.com/in/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className={iconClassName} aria-hidden />
            <span>LinkedIn</span>
          </a>
        </div>
      </main>

      <button
        type="button"
        className="fixed right-[clamp(1rem,2vw,1.75rem)] bottom-[clamp(1rem,2vw,1.75rem)] inline-grid size-10 place-items-center rounded-full border border-page-line bg-page-surface text-page-ink transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-px hover:border-page-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
      </button>
    </section>
  )
}
