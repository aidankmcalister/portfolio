/* eslint-disable */
const { useState, useEffect, useMemo, useRef } = React

/* ──────────────────────────────────────────────────────────
   Work data — realistic placeholders for a Prisma DevRel.
   Swap titles, descriptions, and urls for the real thing.
   ────────────────────────────────────────────────────────── */
const WORK = [
  // ── DOCS ───────────────────────────────────────────────
  {
    id: "d-quickstart",
    type: "Docs",
    company: "Prisma",
    title: "Prisma ORM Quickstart for Next.js",
    desc: "Zero-to-deployed app on the App Router — server actions, edge runtime, and a sane migration story.",
    url: "#",
  },
  {
    id: "d-pooling",
    type: "Docs",
    company: "Prisma",
    title: "Connection pooling, demystified",
    desc: "When to pool, when to skip it, and what actually breaks past 200 concurrent connections.",
    url: "#",
  },
  {
    id: "d-migrate",
    type: "Docs",
    company: "Prisma",
    title: "Migrating from Drizzle to Prisma",
    desc: "Side-by-side schema rewrites and a small CLI that handles the boring parts.",
    url: "#",
  },
  {
    id: "d-rls",
    type: "Docs",
    company: "Prisma",
    title: "Row-level security with Prisma Postgres",
    desc: "Patterns for multi-tenant apps that don't fall apart under audit.",
    url: "#",
  },

  // ── DEMOS ──────────────────────────────────────────────
  {
    id: "x-chat",
    type: "Demo",
    company: "Prisma",
    title: "Realtime chat with Prisma + Pusher",
    desc: "End-to-end typed pub/sub over Postgres with optimistic UI and a tiny presence system.",
    url: "#",
  },
  {
    id: "x-webhooks",
    type: "Demo",
    company: "Prisma",
    title: "Type-safe webhooks from your schema",
    desc: "Generate validators and replayers straight from Prisma. Stop drifting from the source of truth.",
    url: "#",
  },
  {
    id: "x-sql",
    type: "Demo",
    company: "Personal",
    title: "An SQL playground for LLMs",
    desc: "Let your model write queries against a sandbox you can actually trust to undo itself.",
    url: "#",
  },

  // ── TALKS ──────────────────────────────────────────────
  {
    id: "t-orm",
    type: "Talk",
    company: "Conferences",
    title: "Why your ORM is the bottleneck",
    desc: "An honest, benchmarked look at where ORMs slow you down — and the (smaller) list of places they don't.",
    url: "#",
  },
  {
    id: "t-postgres",
    type: "Talk",
    company: "Conferences",
    title: "Postgres for people who hate Postgres",
    desc: "A workshop for converts. Done with Postgres? Try Postgres again — but with extensions this time.",
    url: "#",
  },
  {
    id: "t-schema",
    type: "Talk",
    company: "Conferences",
    title: "Schema-first development",
    desc: "30 minutes and lots of diagrams on why Prisma was built the way it was — and what we'd change.",
    url: "#",
  },

  // ── POSTS ──────────────────────────────────────────────
  {
    id: "p-six",
    type: "Post",
    company: "Prisma",
    title: "What I learned shipping Prisma 6",
    desc: "Six months of release notes condensed into one honest postmortem about scope, schedule, and trust.",
    url: "#",
  },
  {
    id: "p-devrel",
    type: "Post",
    company: "Personal",
    title: "DevRel is not marketing",
    desc: "A short field guide for engineers who suddenly find themselves on a stage with a microphone.",
    url: "#",
  },
  {
    id: "p-npm",
    type: "Post",
    company: "Personal",
    title: "The hidden cost of npm install",
    desc: "Measuring the half-second tax on every Node project you ship, and where most of it goes.",
    url: "#",
  },
  {
    id: "p-sdks",
    type: "Post",
    company: "Personal",
    title: "Why I still write SDKs by hand",
    desc: "A defense of artisanal client libraries in the age of OpenAPI generators that almost work.",
    url: "#",
  },

  // ── VIDEOS ─────────────────────────────────────────────
  {
    id: "v-100",
    type: "Video",
    company: "Prisma",
    title: "Prisma in 100 seconds",
    desc: "The one-minute pitch. Watch it before you decide we're not for you.",
    url: "#",
  },
  {
    id: "v-lucia",
    type: "Video",
    company: "Personal",
    title: "Live: Auth with Lucia + Prisma",
    desc: "Two hours, one bug, zero edits. Just like real life. Subscribers know which timestamp to skip to.",
    url: "#",
  },

  // ── OSS ────────────────────────────────────────────────
  {
    id: "o-cache",
    type: "OSS",
    company: "Personal",
    title: "prisma-extension-cache",
    desc: "Drop-in Redis caching for any Prisma query. ~3k stars and a handful of very angry edge cases.",
    url: "#",
  },
  {
    id: "o-route",
    type: "OSS",
    company: "Personal",
    title: "next-route-typesafe",
    desc: "Type-safe routing for the App Router so you can stop guessing the names of your own pages.",
    url: "#",
  },
  {
    id: "o-lint",
    type: "OSS",
    company: "Personal",
    title: "schema-lint",
    desc: "Catch schema smell before it hits production. Pluggable rules, opinionated defaults.",
    url: "#",
  },
]

/* ──────────────────────────────────────────────────────────
   Experience data — placeholders. Swap for the real thing.
   ────────────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    id: "e-prisma",
    date: "2024 — now",
    role: "Developer Advocate",
    company: "Prisma",
    desc: "Leading docs and developer experience for Prisma ORM and Prisma Postgres — talks, demos, the occasional product feedback that turns into a roadmap item.",
    url: "#",
  },
  {
    id: "e-vercel",
    date: "2022 — 2024",
    role: "Developer Experience Engineer",
    company: "Vercel",
    desc: "Wrote guides, examples, and SDKs for Next.js. Helped launch the App Router educational track and the first official server actions reference.",
    url: "#",
  },
  {
    id: "e-plaid",
    date: "2020 — 2022",
    role: "Software Engineer",
    company: "Plaid",
    desc: "Internal tooling and the public Node SDK. Discovered I liked the writing part more than the writing-code part — which is what got me into DevRel.",
    url: "#",
  },
  {
    id: "e-stripe",
    date: "2018 — 2020",
    role: "Software Engineer (contract)",
    company: "Stripe",
    desc: "API ergonomics work on the typed SDKs. First taste of DevRel-adjacent work, mostly through deeply caring about argument names.",
    url: "#",
  },
]

/* ──────────────────────────────────────────────────────────
   Icons (hairline)
   ────────────────────────────────────────────────────────── */
const Icon = {
  arrow: (p) => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...p}
    >
      <path d="M7 17 L17 7" />
      <path d="M9 7 L17 7 L17 15" />
    </svg>
  ),
  sun: (p) => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      {...p}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  moon: (p) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  close: (p) => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      {...p}
    >
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  ),
}

/* ──────────────────────────────────────────────────────────
   Hooks
   ────────────────────────────────────────────────────────── */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("am.theme") || "dark"
    } catch {
      return "dark"
    }
  })
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    try {
      localStorage.setItem("am.theme", theme)
    } catch {}
  }, [theme])
  return [theme, setTheme]
}

function useHashRoute() {
  const [route, setRoute] = useState(
    () => (window.location.hash || "#/").replace(/^#/, "") || "/"
  )
  useEffect(() => {
    const onHash = () =>
      setRoute((window.location.hash || "#/").replace(/^#/, "") || "/")
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  return [
    route,
    (r) => {
      window.location.hash = r
    },
  ]
}

/* ──────────────────────────────────────────────────────────
   Nav
   ────────────────────────────────────────────────────────── */
function Nav({ route, go, theme, setTheme }) {
  const is = (r) => route === r || (r !== "/" && route.startsWith(r))
  return (
    <nav className="nav">
      <a
        href="#/"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault()
          go("/")
        }}
      >
        Aidan McAlister
      </a>
      <div className="nav-right">
        <a
          href="#/"
          className={`nav-link ${route === "/" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            go("/")
          }}
        >
          home
        </a>
        <a
          href="#/work"
          className={`nav-link ${is("/work") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            go("/work")
          }}
        >
          work
        </a>
        <a
          href="#/experience"
          className={`nav-link ${is("/experience") ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            go("/experience")
          }}
        >
          experience
        </a>
        <button
          className="theme-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
        </button>
      </div>
    </nav>
  )
}

/* ──────────────────────────────────────────────────────────
   Home
   ────────────────────────────────────────────────────────── */
function Home({ go, onOpenContact }) {
  return (
    <div className="home page-fade">
      <h1 className="home-headline">
        Making developers feel less alone <span className="em">—</span> through
        docs, demos, and the occasional terrible pun.
      </h1>

      <p className="home-bio">
        I turn complex tech into things people actually want to use, and write
        about the parts I get wrong on the way there. Mostly at{" "}
        <a
          className="link"
          href="https://prisma.io"
          target="_blank"
          rel="noreferrer"
        >
          Prisma
        </a>{" "}
        these days, in docs, demos, and the odd conference room.
      </p>

      <div className="btn-row">
        <button className="btn" onClick={onOpenContact}>
          contact{" "}
          <span className="arrow">
            <Icon.arrow />
          </span>
        </button>
        <a
          className="btn"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          github{" "}
          <span className="arrow">
            <Icon.arrow />
          </span>
        </a>
        <a
          className="btn"
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
        >
          linkedin{" "}
          <span className="arrow">
            <Icon.arrow />
          </span>
        </a>
        <a
          className="btn"
          href="#/work"
          onClick={(e) => {
            e.preventDefault()
            go("/work")
          }}
        >
          work{" "}
          <span className="arrow">
            <Icon.arrow />
          </span>
        </a>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Work
   ────────────────────────────────────────────────────────── */
const TYPES = ["Docs", "Demo", "Talk", "Post", "Video", "OSS"]
const COMPANIES = ["Prisma", "Personal", "Conferences"]

function Work() {
  const [activeCo, setActiveCo] = useState(null)
  const [activeType, setActiveType] = useState(null)

  const filtered = useMemo(() => {
    return WORK.filter((w) => {
      if (activeCo && w.company !== activeCo) return false
      if (activeType && w.type !== activeType) return false
      return true
    })
  }, [activeCo, activeType])

  const toggleCo = (c) => setActiveCo((prev) => (prev === c ? null : c))
  const toggleType = (t) => setActiveType((prev) => (prev === t ? null : t))
  const reset = () => {
    setActiveCo(null)
    setActiveType(null)
  }
  const hasFilter = activeCo || activeType

  return (
    <div className="page-fade">
      <div className="work-head">
        <h2 className="work-title">Work</h2>
        <p className="work-sub">
          A flat index of things I've made or shipped, mostly recent. Filter by
          tag, or just scroll.
        </p>
      </div>

      <div className="toolbar">
        <div className="filter-row" role="tablist" aria-label="Filters">
          <button
            className={`chip ${!hasFilter ? "active" : ""}`}
            onClick={reset}
          >
            all
          </button>
          <span className="chip-sep">·</span>
          {COMPANIES.map((co, i) => (
            <React.Fragment key={co}>
              <button
                className={`chip ${activeCo === co ? "active" : ""}`}
                onClick={() => toggleCo(co)}
              >
                {co.toLowerCase()}
              </button>
              {i < COMPANIES.length - 1 && <span className="chip-sep">·</span>}
            </React.Fragment>
          ))}
          <span className="chip-div">/</span>
          {TYPES.map((t, i) => (
            <React.Fragment key={t}>
              <button
                className={`chip ${activeType === t ? "active" : ""}`}
                onClick={() => toggleType(t)}
              >
                {t.toLowerCase()}
              </button>
              {i < TYPES.length - 1 && <span className="chip-sep">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="result-line">
        <span>
          {filtered.length} of {WORK.length}
        </span>
        {hasFilter && (
          <button className="reset" onClick={reset}>
            clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <div className="x">nothing here</div>
          <div>
            try a different filter, or{" "}
            <button className="reset" onClick={reset}>
              clear
            </button>
            .
          </div>
        </div>
      ) : (
        <div className="list page-fade">
          {filtered.map((it) => (
            <a
              key={it.id}
              className="list-row"
              href={it.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="list-type">{it.type.toLowerCase()}</div>
              <div className="list-title">
                {it.title}
                <span className="desc">{it.desc}</span>
              </div>
              <div className="list-ctx">{it.company}</div>
              <div className="list-arrow">
                <Icon.arrow />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Experience
   ────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <div className="page-fade">
      <div className="work-head">
        <p className="id-name">Aidan McAlister</p>
        <p className="id-role">
          Developer Advocate <span className="dot">·</span> Prisma{" "}
          <span className="dot">·</span> Berlin
        </p>
        <h2 className="work-title">Experience</h2>
        <p className="work-sub">
          Where I've worked, in reverse-chronological order. The short version
          is "moved gradually from writing code to writing about code".
        </p>
      </div>

      <div
        className="list"
        style={{ borderTop: "1px solid var(--border-soft)" }}
      >
        {EXPERIENCE.map((e) => {
          const Tag = e.url ? "a" : "div"
          const linkProps = e.url
            ? { href: e.url, target: "_blank", rel: "noreferrer" }
            : {}
          return (
            <Tag
              key={e.id}
              className={`exp-row ${e.url ? "linkable" : ""}`}
              {...linkProps}
            >
              <div className="exp-date">{e.date}</div>
              <div className="exp-body">
                <div className="exp-head">
                  {e.role}
                  <span className="at">·</span>
                  <span className="co">{e.company}</span>
                </div>
                <p className="exp-desc">{e.desc}</p>
              </div>
              <div className="exp-arrow">{e.url ? <Icon.arrow /> : null}</div>
            </Tag>
          )
        })}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Contact Modal
   ────────────────────────────────────────────────────────── */
function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("idle") // idle | sending | sent | error
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!open) {
      setStatus("idle")
      setForm({ name: "", company: "", email: "", subject: "", message: "" })
      return
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    setTimeout(() => firstFieldRef.current?.focus(), 50)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid =
    form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim()

  const submit = async (e) => {
    e.preventDefault()
    if (!valid) return
    setStatus("sending")
    // placeholder: wire up to Resend later
    await new Promise((r) => setTimeout(r, 800))
    setStatus("sent")
    setTimeout(onClose, 1200)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <header className="modal-head">
          <div>
            <h3 className="modal-title">Contact</h3>
            <p className="modal-sub">
              Send a quick message. Usually answered within a few days.
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon.close />
          </button>
        </header>

        <div className="modal-body">
          <div className="field-row">
            <div className="field">
              <label className="field-label">name</label>
              <input
                ref={firstFieldRef}
                className="input"
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="your name"
              />
            </div>
            <div className="field">
              <label className="field-label">
                company <span className="opt">optional</span>
              </label>
              <input
                className="input"
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="company"
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">email</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label className="field-label">
              subject <span className="opt">optional</span>
            </label>
            <input
              className="input"
              type="text"
              value={form.subject}
              onChange={set("subject")}
              placeholder="what should we talk about?"
            />
          </div>

          <div className="field">
            <label className="field-label">message</label>
            <textarea
              className="textarea"
              rows="5"
              value={form.message}
              onChange={set("message")}
              placeholder="write your message..."
            />
          </div>
        </div>

        <div className="modal-actions">
          {status === "sending" && (
            <div className="modal-status">sending...</div>
          )}
          {status === "sent" && (
            <div className="modal-status">sent. talk soon.</div>
          )}
          {status === "error" && (
            <div className="modal-status" style={{ color: "var(--fg)" }}>
              something broke. try email.
            </div>
          )}
          <button type="button" className="modal-cancel" onClick={onClose}>
            cancel
          </button>
          <button
            type="submit"
            className="modal-send"
            disabled={!valid || status === "sending"}
          >
            send message{" "}
            <span className="arrow">
              <Icon.arrow />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Tweaks
   ────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  fontSize: 13.5,
} /*EDITMODE-END*/

function Tweaks({ tweaks, setTweak }) {
  if (typeof TweaksPanel === "undefined") return null
  return (
    <TweaksPanel>
      <TweakSection label="Typography" />
      <TweakSlider
        label="Base size"
        min={12}
        max={16}
        step={0.5}
        unit="px"
        value={tweaks.fontSize}
        onChange={(v) => setTweak("fontSize", v)}
      />
    </TweaksPanel>
  )
}

/* ──────────────────────────────────────────────────────────
   App
   ────────────────────────────────────────────────────────── */
function App() {
  const [theme, setTheme] = useTheme()
  const [route, go] = useHashRoute()
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    document.body.style.fontSize = `${tweaks.fontSize}px`
  }, [tweaks.fontSize])

  const screenLabel =
    route === "/work" ? "Work" : route === "/experience" ? "Experience" : "Home"

  return (
    <>
      <div className="shell">
        <Nav route={route} go={go} theme={theme} setTheme={setTheme} />
        <main data-screen-label={screenLabel}>
          {route === "/work" && <Work />}
          {route === "/experience" && <Experience />}
          {route === "/" && (
            <Home go={go} onOpenContact={() => setContactOpen(true)} />
          )}
        </main>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
