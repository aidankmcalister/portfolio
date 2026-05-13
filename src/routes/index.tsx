import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { STATS } from "@/data/work"
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

export const Route = createFileRoute("/")({ component: Home })

const inputClass =
  "h-11 w-full rounded-md border border-page-border bg-transparent px-3 text-[13px] text-page-ink placeholder:text-page-faint outline-none transition-colors duration-[220ms] hover:bg-page-surface focus-visible:border-page-muted focus-visible:bg-page-surface"

const textareaClass =
  "min-h-24 w-full resize-y rounded-md border border-page-border bg-transparent px-3 py-2 text-[13px] leading-[1.55] text-page-ink placeholder:text-page-faint outline-none transition-colors duration-[220ms] hover:bg-page-surface focus-visible:border-page-muted focus-visible:bg-page-surface"

function StatItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 max-sm:flex-row max-sm:items-baseline max-sm:gap-4">
      <span className="text-[10.5px] uppercase tracking-[0.08em] text-page-faint max-sm:w-[64px] max-sm:shrink-0">
        {label}
      </span>
      <div className="text-[13px] leading-[1.55]">{children}</div>
    </div>
  )
}

function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-x-8 border-t border-page-border-soft py-8 max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:py-6">
      <StatItem label="company">
        <span className="font-[600] text-page-ink">{STATS.role}</span>{" "}
        <span className="text-page-muted">@ {STATS.company}</span>
      </StatItem>
      <StatItem label="based">
        <span className="font-[600] text-page-ink">{STATS.location}</span>
      </StatItem>
      <StatItem label="dates">
        <span className="font-[600] text-page-ink">{STATS.tenure}</span>
      </StatItem>
    </div>
  )
}

function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [contactStatus, setContactStatus] = useState<{
    kind: "error" | "success"
    message: string
  } | null>(null)

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

    setIsSending(true)
    setContactStatus(null)

    try {
      const result = await sendContactEmail({ data: payload })
      if (!result.ok) {
        setContactStatus({ kind: "error", message: result.error })
        return
      }
      setContactStatus({
        kind: "success",
        message: "Sent. I'll get back to you soon.",
      })
      form.reset()
    } catch (error) {
      setContactStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Unable to send right now.",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <div className="animate-fade pb-14 pt-24 max-sm:pb-10 max-sm:pt-14">
        <h1 className="mb-6 max-w-[560px] text-[28px] font-[500] leading-[1.3] tracking-[-0.018em] text-page-ink max-sm:text-[22px] max-sm:leading-[1.25]">
          Making developers feel less alone, one doc and bad pun at a time.
        </h1>

        <p className="mb-12 max-w-[520px] text-[14px] leading-[1.75] text-page-mid max-sm:mb-10">
          I turn complex tech into things people actually want to use. Mostly at{" "}
          <a
            className="border-b border-page-faint pb-px text-page-ink transition-colors duration-[220ms] hover:border-page-ink"
            href="https://prisma.io"
            target="_blank"
            rel="noreferrer"
          >
            Prisma
          </a>{" "}
          these days.
        </p>

        <div className="flex flex-wrap gap-x-7 gap-y-3 max-sm:gap-x-5">
          <Dialog
            open={contactOpen}
            onOpenChange={(open) => {
              setContactOpen(open)
              if (!open) setContactStatus(null)
            }}
          >
            <DialogTrigger asChild>
              <button className="btn-link">
                contact <ArrowUpRight className="btn-arrow h-[11px] w-[11px]" />
              </button>
            </DialogTrigger>
            <DialogContent className="font-mono">
              <DialogHeader>
                <DialogTitle className="text-[15px] font-[500]">Contact</DialogTitle>
                <DialogDescription className="text-[12px] text-page-muted">
                  Send a quick note. Delivered through Resend. Usually answered within a few days.
                </DialogDescription>
              </DialogHeader>

              <form className="grid gap-3" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  <div className="grid gap-1.5">
                    <label className="text-[11.5px] text-page-muted" htmlFor="contact-name">
                      name
                    </label>
                    <input
                      className={inputClass}
                      id="contact-name"
                      maxLength={120}
                      name="name"
                      placeholder="your name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <label className="text-[11.5px] text-page-muted" htmlFor="contact-company">
                      company{" "}
                      <span className="text-page-faint text-[11px]">(optional)</span>
                    </label>
                    <input
                      className={inputClass}
                      id="contact-company"
                      maxLength={140}
                      name="company"
                      placeholder="company"
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <label className="text-[11.5px] text-page-muted" htmlFor="contact-email">
                    email
                  </label>
                  <input
                    className={inputClass}
                    id="contact-email"
                    maxLength={320}
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-[11.5px] text-page-muted" htmlFor="contact-subject">
                    subject{" "}
                    <span className="text-page-faint text-[11px]">(optional)</span>
                  </label>
                  <input
                    className={inputClass}
                    id="contact-subject"
                    maxLength={140}
                    name="subject"
                    placeholder="what should we talk about?"
                    type="text"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label className="text-[11.5px] text-page-muted" htmlFor="contact-message">
                    message
                  </label>
                  <textarea
                    className={textareaClass}
                    id="contact-message"
                    maxLength={5000}
                    name="message"
                    placeholder="write your message..."
                    required
                    rows={5}
                  />
                </div>

                {contactStatus ? (
                  <p
                    className={
                      contactStatus.kind === "error"
                        ? "text-[12px] text-red-500"
                        : "text-[12px] italic text-page-muted"
                    }
                    role="status"
                  >
                    {contactStatus.message}
                  </p>
                ) : null}

                <DialogFooter className="mt-2 flex items-center gap-6">
                  <button
                    type="button"
                    className="text-[12.5px] text-page-muted transition-colors hover:text-page-ink"
                    onClick={() => setContactOpen(false)}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="btn-link disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSending ? (
                      "sending..."
                    ) : (
                      <>
                        send message{" "}
                        <ArrowUpRight className="btn-arrow h-[11px] w-[11px]" />
                      </>
                    )}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <a
            className="btn-link"
            href="https://github.com/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            github <ArrowUpRight className="btn-arrow h-[11px] w-[11px]" />
          </a>

          <a
            className="btn-link"
            href="https://www.linkedin.com/in/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            linkedin <ArrowUpRight className="btn-arrow h-[11px] w-[11px]" />
          </a>

          <Link className="btn-link" to="/work">
            work <ArrowUpRight className="btn-arrow h-[11px] w-[11px]" />
          </Link>
        </div>
      </div>

      <StatsBar />
    </>
  )
}
