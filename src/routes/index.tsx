import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { EXPERIENCE } from "@/data/work"
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

function StatsBar() {
  return (
    <div className="border-t border-page-border-soft py-8 font-mono transition-colors duration-[220ms] max-sm:py-6">
      {/* Desktop: two-column layout */}
      <div className="flex justify-between gap-16 max-sm:hidden">
        <div>
          <div className="mb-3 text-[10.5px] tracking-[0.08em] text-page-muted uppercase">
            experience
          </div>
          {EXPERIENCE.map((item) => (
            <div
              key={item.id}
              className={`py-1 text-[13px] leading-[1.55] whitespace-nowrap ${item.kind === "contract" ? "opacity-50" : ""}`}
            >
              <span className="font-[600] text-page-ink">{item.role}</span>{" "}
              <span className="text-page-muted">@ {item.company}</span>
            </div>
          ))}
        </div>
        <div className="shrink-0 text-right">
          <div className="mb-3 text-[10.5px] tracking-[0.08em] text-page-muted uppercase">
            dates
          </div>
          {EXPERIENCE.map((item) => (
            <div
              key={item.id}
              className={`py-1 text-[13px] leading-[1.55] font-[600] whitespace-nowrap text-page-ink ${item.kind === "contract" ? "opacity-50" : ""}`}
            >
              {item.date}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked rows */}
      <div className="hidden max-sm:flex max-sm:flex-col max-sm:gap-3">
        {EXPERIENCE.map((item) => (
          <div
            key={item.id}
            className={`text-[13px] leading-[1.55] ${item.kind === "contract" ? "opacity-50" : ""}`}
          >
            <div className="flex justify-between">
              <span className="font-[600] text-page-ink">{item.role}</span>
              <span className="font-[600] text-page-ink">{item.date}</span>
            </div>
            <div className="text-page-muted">@ {item.company}</div>
          </div>
        ))}
      </div>
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
        message:
          error instanceof Error ? error.message : "Unable to send right now.",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <div className="animate-fade pt-48 pb-48 max-sm:pt-14 max-sm:pb-10">
        <h1 className="mb-6 font-mono text-[28px] leading-[1.3] font-[500] tracking-[-0.018em] text-page-ink max-sm:text-[22px] max-sm:leading-[1.25]">
          Helping developers ship faster, and feel heard.
        </h1>

        <p className="mb-12 font-mono text-[14px] leading-[1.75] text-page-mid max-sm:mb-10">
          I build the docs, tools, and community around developer products.
          Previously at{" "}
          <a
            className="border-b border-page-faint pb-px text-page-ink transition-colors duration-[220ms] hover:border-page-ink"
            href="https://prisma.io"
            target="_blank"
            rel="noreferrer"
          >
            Prisma
          </a>
          .
        </p>

        <p className="mb-12 font-mono text-[13px] text-page-muted max-sm:mb-10">
          Open to DevRel roles —{" "}
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="border-b border-page-faint pb-px text-page-ink transition-colors duration-[220ms] hover:border-page-ink"
          >
            get in touch
          </button>
        </p>

        <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono max-sm:gap-x-5">
          <Link
            className="group relative inline-flex items-center gap-2 py-1 text-[13px] text-page-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-page-faint after:transition-colors after:duration-[220ms] hover:after:bg-page-ink"
            to="/work"
          >
            my work{" "}
            <ArrowRight className="h-[11px] w-[11px] text-page-muted transition-all duration-150 group-hover:translate-x-[3px] group-hover:text-page-ink" />
          </Link>

          <a
            className="group relative inline-flex items-center gap-2 py-1 text-[13px] text-page-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-page-faint after:transition-colors after:duration-[220ms] hover:after:bg-page-ink"
            href="https://github.com/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            github{" "}
            <ArrowUpRight className="h-[11px] w-[11px] text-page-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-page-ink" />
          </a>

          <a
            className="group relative inline-flex items-center gap-2 py-1 text-[13px] text-page-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-page-faint after:transition-colors after:duration-[220ms] hover:after:bg-page-ink"
            href="https://www.linkedin.com/in/aidankmcalister"
            target="_blank"
            rel="noreferrer"
          >
            linkedin{" "}
            <ArrowUpRight className="h-[11px] w-[11px] text-page-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-page-ink" />
          </a>
          <Dialog
            open={contactOpen}
            onOpenChange={(open) => {
              setContactOpen(open)
              if (!open) setContactStatus(null)
            }}
          >
            <DialogTrigger asChild>
              <button className="group relative inline-flex items-center gap-2 py-1 text-[13px] text-page-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-page-faint after:transition-colors after:duration-[220ms] hover:after:bg-page-ink">
                contact{" "}
                <ArrowRight className="h-[11px] w-[11px] text-page-muted transition-all duration-150 group-hover:translate-x-[3px] group-hover:text-page-ink" />
              </button>
            </DialogTrigger>
            <DialogContent className="font-mono">
              <DialogHeader>
                <DialogTitle className="text-[15px] font-[500]">
                  Contact
                </DialogTitle>
                <DialogDescription className="text-[12px] text-page-muted">
                  Send a quick message. Usually answered within a few days.
                </DialogDescription>
              </DialogHeader>

              <form className="grid gap-3" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  <div className="grid gap-1.5">
                    <label
                      className="text-[11.5px] text-page-muted"
                      htmlFor="contact-name"
                    >
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
                    <label
                      className="text-[11.5px] text-page-muted"
                      htmlFor="contact-company"
                    >
                      company{" "}
                      <span className="text-[11px] text-page-faint">
                        (optional)
                      </span>
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
                  <label
                    className="text-[11.5px] text-page-muted"
                    htmlFor="contact-email"
                  >
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
                  <label
                    className="text-[11.5px] text-page-muted"
                    htmlFor="contact-subject"
                  >
                    subject{" "}
                    <span className="text-[11px] text-page-faint">
                      (optional)
                    </span>
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
                  <label
                    className="text-[11.5px] text-page-muted"
                    htmlFor="contact-message"
                  >
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
                        : "text-[12px] text-page-muted italic"
                    }
                    role="status"
                  >
                    {contactStatus.message}
                  </p>
                ) : null}

                <DialogFooter className="mt-2 flex items-center gap-6">
                  <button
                    type="button"
                    className="text-[12.5px] text-page-muted transition-colors duration-[220ms] hover:text-page-ink"
                    onClick={() => setContactOpen(false)}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group relative inline-flex items-center gap-2 py-1 text-[13px] text-page-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-page-faint after:transition-colors after:duration-[220ms] hover:after:bg-page-ink disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSending ? (
                      "sending..."
                    ) : (
                      <>
                        send message{" "}
                        <ArrowUpRight className="h-[11px] w-[11px] text-page-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-page-ink" />
                      </>
                    )}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <StatsBar />
    </>
  )
}
