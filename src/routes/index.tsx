import { createFileRoute } from "@tanstack/react-router"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendContactEmail } from "@/server/send-contact-email"

export const Route = createFileRoute("/")({ component: App })

const actionClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-full border border-page-line bg-page-surface px-[1.02rem] py-[0.64rem] font-inherit text-[0.9rem] leading-none font-[500] text-page-ink transition-[transform,border-color,background-color,color] duration-150 ease-out hover:-translate-y-px hover:border-page-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"

const primaryActionClassName =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-page-ink bg-page-ink px-[1.02rem] py-[0.64rem] text-[0.9rem] leading-none font-[500] text-page-surface transition-[transform,border-color,background-color,color,opacity] duration-150 ease-out hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"

const iconClassName = "h-[0.95rem] w-[0.95rem]"
const inputClassName =
  "h-11 w-full rounded-xl border border-page-line bg-page-bg px-3 text-sm text-page-ink placeholder:text-page-muted/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"
const textareaClassName =
  "min-h-32 w-full rounded-xl border border-page-line bg-page-bg px-3 py-2 text-sm text-page-ink placeholder:text-page-muted/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink"

function setThemeFavicon(isDark: boolean) {
  const iconHref = isDark ? "/favicon-dark.svg" : "/favicon-light.svg"
  let faviconLink = document.querySelector<HTMLLinkElement>(
    'link[data-theme-favicon="true"]'
  )

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
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [isSendingContact, setIsSendingContact] = useState(false)
  const [contactStatus, setContactStatus] = useState<{
    kind: "error" | "success"
    message: string
  } | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const storedTheme = localStorage.getItem("theme")
    const initialDark = storedTheme
      ? storedTheme === "dark"
      : mediaQuery.matches

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

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      name: String(formData.get("name") ?? ""),
      subject: String(formData.get("subject") ?? ""),
    }

    setIsSendingContact(true)
    setContactStatus(null)

    try {
      const result = await sendContactEmail({ data: payload })

      if (!result.ok) {
        setContactStatus({
          kind: "error",
          message: result.error,
        })
        return
      }

      setContactStatus({
        kind: "success",
        message: "Message sent. I will get back to you soon.",
      })
      form.reset()
    } catch (error) {
      setContactStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send message right now.",
      })
    } finally {
      setIsSendingContact(false)
    }
  }

  return (
    <section className="grid min-h-svh p-[clamp(1rem,2vw,1.75rem)]">
      <main className="mx-auto my-auto grid w-full max-w-3xl animate-rise justify-items-center gap-[clamp(0.9rem,2vw,1.5rem)] text-center max-[720px]:gap-4">
        <h1 className="m-0 font-serif text-[clamp(2.05rem,6.1vw,4.35rem)] leading-[0.95] font-medium tracking-[-0.034em] text-balance">
          Making developers
          <br />
          feel less alone.
        </h1>

        <p className="m-0 max-w-148 font-serif text-[clamp(1.08rem,2.2vw,1.7rem)] leading-[1.2] tracking-[-0.012em] text-balance text-page-muted italic">
          through docs, demos, and the occasional terrible pun.
        </p>

        <p className="m-0 max-w-136 text-[clamp(0.92rem,1.2vw,1.02rem)] leading-[1.6] text-pretty text-page-muted">
          I&apos;m Aidan McAlister, Developer Advocate at{" "}
          <a
            className="text-page-ink underline decoration-page-muted decoration-dotted decoration-2 underline-offset-[0.2em]"
            href="https://www.prisma.io"
            target="_blank"
            rel="noreferrer"
          >
            Prisma
          </a>
          . I turn complex tech into things people actually want to use.
        </p>

        <div className="mt-[0.2rem] flex flex-wrap justify-center gap-[0.62rem]">
          <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={actionClassName}
                onClick={() => {
                  setContactStatus(null)
                }}
              >
                <Mail className={iconClassName} aria-hidden />
                <span>Contact me</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact me</DialogTitle>
                <DialogDescription>
                  Send a quick note and it will be delivered through Resend.
                </DialogDescription>
              </DialogHeader>

              <form className="grid gap-3" onSubmit={handleContactSubmit}>
                <div className="grid gap-1.5">
                  <label className="text-sm text-page-muted" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    className={inputClassName}
                    id="contact-name"
                    maxLength={120}
                    name="name"
                    placeholder="Your name"
                    required
                    type="text"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm text-page-muted" htmlFor="contact-company">
                    Company (optional)
                  </label>
                  <input
                    className={inputClassName}
                    id="contact-company"
                    maxLength={140}
                    name="company"
                    placeholder="Your company"
                    type="text"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm text-page-muted" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    className={inputClassName}
                    id="contact-email"
                    maxLength={320}
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm text-page-muted" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    className={inputClassName}
                    id="contact-subject"
                    maxLength={140}
                    name="subject"
                    placeholder="What should we talk about?"
                    required
                    type="text"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm text-page-muted" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    className={textareaClassName}
                    id="contact-message"
                    maxLength={5000}
                    name="message"
                    placeholder="Write your message..."
                    required
                  />
                </div>

                {contactStatus ? (
                  <p
                    className={
                      contactStatus.kind === "error"
                        ? "text-sm text-red-600 dark:text-red-400"
                        : "text-sm text-emerald-700 dark:text-emerald-400"
                    }
                    role="status"
                  >
                    {contactStatus.message}
                  </p>
                ) : null}

                <DialogFooter>
                  <button
                    type="button"
                    className={actionClassName}
                    onClick={() => {
                      setContactDialogOpen(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={primaryActionClassName}
                    disabled={isSendingContact}
                    type="submit"
                  >
                    {isSendingContact ? "Sending..." : "Send message"}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

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
        {isDark ? (
          <Sun className="size-4" aria-hidden />
        ) : (
          <Moon className="size-4" aria-hidden />
        )}
      </button>
    </section>
  )
}
