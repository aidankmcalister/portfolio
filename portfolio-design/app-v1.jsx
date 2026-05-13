/* eslint-disable */
const { useState, useEffect, useMemo, useRef } = React;

/* ──────────────────────────────────────────────────────────
   Work data — realistic placeholders for a Prisma DevRel.
   Aidan should swap these for real entries.
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
    company: "Next.js Conf",
    title: "Why your ORM is the bottleneck",
    desc: "An honest, benchmarked look at where ORMs slow you down — and the (smaller) list of places they don't.",
    url: "#",
  },
  {
    id: "t-postgres",
    type: "Talk",
    company: "Render Worldwide",
    title: "Postgres for people who hate Postgres",
    desc: "A workshop for converts. Done with Postgres? Try Postgres again — but with extensions this time.",
    url: "#",
  },
  {
    id: "t-schema",
    type: "Talk",
    company: "Reactathon",
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
];

/* ──────────────────────────────────────────────────────────
   ASCII art glyphs
   ────────────────────────────────────────────────────────── */
const ASCII_HERO = `   /\\\\\\      |\\\\\\
  ///\\\\     |\\\\\\
 ////\\\\    |\\\\\\
~~~~~~~~~  ~~~~~~~
|/-\\-\\-|   |==|
|     |   |  |
|     |   |  |
|_____|   |__|`;

const ASCII_WORK = `  ┌──────┐
  │ //// │
  │ //// │
  │ ──── │
  └──────┘`;

const ASCII_EMPTY = `   ┌────┐
   │    │
   │ ?? │
   │    │
   └────┘`;

/* ──────────────────────────────────────────────────────────
   Icons (minimal, Lucide-style hairline)
   ────────────────────────────────────────────────────────── */
const Icon = {
  arrow: (p) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" {...p}>
      <path d="M7 17 L17 7" />
      <path d="M9 7 L17 7 L17 15" />
    </svg>
  ),
  mail: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" {...p}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 7 L12 13 L21 7" />
    </svg>
  ),
  github: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.17c0-1.47-.03-3.37-2.05-3.37-2.05 0-2.37 1.6-2.37 3.26V22H8V8z" />
    </svg>
  ),
  sun: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  moon: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  list: (p) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  grid: (p) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  reader: (p) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}>
      <path d="M4 5h12M4 10h16M4 15h12M4 20h16" />
    </svg>
  ),
};

/* ──────────────────────────────────────────────────────────
   Theme + persistent state
   ────────────────────────────────────────────────────────── */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("am.theme") || "dark"; } catch { return "dark"; }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("am.theme", theme); } catch {}
  }, [theme]);
  return [theme, setTheme];
}

function useHashRoute() {
  const [route, setRoute] = useState(() => (window.location.hash || "#/").replace(/^#/, "") || "/");
  useEffect(() => {
    const onHash = () => setRoute((window.location.hash || "#/").replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (r) => { window.location.hash = r; }];
}

/* ──────────────────────────────────────────────────────────
   Nav
   ────────────────────────────────────────────────────────── */
function Nav({ route, go, theme, setTheme }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#/" className="nav-brand" onClick={(e) => { e.preventDefault(); go("/"); }}>
          aidan.mcalister<span className="dim"> :: portfolio</span>
        </a>
        <div className="nav-tabs">
          <a href="#/" className={`nav-tab ${route === "/" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); go("/"); }}>home</a>
          <a href="#/work" className={`nav-tab ${route.startsWith("/work") ? "active" : ""}`} onClick={(e) => { e.preventDefault(); go("/work"); }}>work</a>
        </div>
      </div>
      <div className="nav-right">
        <span>{theme === "dark" ? "// night" : "// day"}</span>
        <button
          className="theme-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
        </button>
      </div>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────
   Home page
   ────────────────────────────────────────────────────────── */
function Home({ go }) {
  const counts = useMemo(() => {
    const c = { total: WORK.length };
    WORK.forEach(w => { c[w.type] = (c[w.type] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="page-fade">
      <div className="home-wrap">
        <pre className="ascii">{ASCII_HERO}</pre>
        <div className="home-hero">
          <h1>
            Making developers feel less alone <span className="accent">—</span><br />
            through docs, demos, and the occasional terrible pun.
          </h1>
          <p className="bio">
            I'm Aidan McAlister, Developer Advocate at <em>Prisma</em>. I turn complex tech into things people actually want to use — and write about the parts I get wrong on the way there.
          </p>
          <div className="btn-row">
            <a className="btn" href="mailto:hi@aidan.dev">
              <Icon.mail /> contact
              <Icon.arrow className="arrow" />
            </a>
            <a className="btn" href="https://github.com" target="_blank" rel="noreferrer">
              <Icon.github /> github
              <Icon.arrow className="arrow" />
            </a>
            <a className="btn" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Icon.linkedin /> linkedin
              <Icon.arrow className="arrow" />
            </a>
            <a className="btn" href="#/work" onClick={(e) => { e.preventDefault(); go("/work"); }}>
              <span className="glyph">▦</span> work
              <Icon.arrow className="arrow" />
            </a>
          </div>
        </div>
      </div>

      <div className="home-meta">
        <div>
          <div className="k">// now</div>
          <div className="v">DevRel @ <span className="dim">Prisma</span></div>
        </div>
        <div>
          <div className="k">// shipped</div>
          <div className="v">{counts.total} pieces <span className="dim">— {counts.Docs || 0} docs, {counts.Demo || 0} demos, {counts.Talk || 0} talks</span></div>
        </div>
        <div>
          <div className="k">// based</div>
          <div className="v">Berlin <span className="dim">/ remote, mostly</span></div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Work page
   ────────────────────────────────────────────────────────── */
const ALL_TYPES = ["Docs", "Demo", "Talk", "Post", "Video", "OSS"];
const ALL_COMPANIES = ["Prisma", "Personal", "Conferences"];

function classifyCompany(company) {
  if (company === "Prisma") return "Prisma";
  if (company === "Personal") return "Personal";
  return "Conferences";
}

function Work({ tweaks }) {
  const [view, setView] = useState(() => {
    try { return localStorage.getItem("am.view") || (tweaks?.defaultView || "list"); } catch { return tweaks?.defaultView || "list"; }
  });
  useEffect(() => { try { localStorage.setItem("am.view", view); } catch {} }, [view]);

  const [activeType, setActiveType] = useState("All");
  const [activeCo, setActiveCo] = useState("All");

  const typeCounts = useMemo(() => {
    const c = { All: WORK.length };
    ALL_TYPES.forEach(t => { c[t] = WORK.filter(w => w.type === t).length; });
    return c;
  }, []);
  const coCounts = useMemo(() => {
    const c = { All: WORK.length };
    ALL_COMPANIES.forEach(co => { c[co] = WORK.filter(w => classifyCompany(w.company) === co).length; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    return WORK.filter(w => {
      if (activeType !== "All" && w.type !== activeType) return false;
      if (activeCo !== "All" && classifyCompany(w.company) !== activeCo) return false;
      return true;
    });
  }, [activeType, activeCo]);

  return (
    <div className="page-fade">
      <div className="work-head">
        <pre className="ascii">{ASCII_WORK}</pre>
        <div>
          <div className="crumb">~ / work</div>
          <h2>Selected work, mostly recent.</h2>
          <p>
            Docs, demos, talks, posts, and side projects. Most of it is for Prisma; some of it is for me. Filter by tag or company below — or just scroll.
          </p>
        </div>
      </div>

      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Filter by type">
          {["All", ...ALL_TYPES].map(t => (
            <button
              key={t}
              className={`chip ${activeType === t ? "active" : ""}`}
              onClick={() => setActiveType(t)}
            >
              {t.toLowerCase()} <span className="count">{typeCounts[t] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="viewswitch" role="tablist" aria-label="View mode">
          <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><Icon.list /> list</button>
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon.grid /> grid</button>
          <button className={view === "reader" ? "active" : ""} onClick={() => setView("reader")}><Icon.reader /> reader</button>
        </div>
      </div>

      <div className="filter-meta">
        <div className="chips">
          {["All", ...ALL_COMPANIES].map(co => (
            <button
              key={co}
              className={`chip ${activeCo === co ? "active" : ""}`}
              onClick={() => setActiveCo(co)}
            >
              {co.toLowerCase()} <span className="count">{coCounts[co] ?? 0}</span>
            </button>
          ))}
        </div>
        <span className="sep">·</span>
        <span>showing {filtered.length} of {WORK.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <pre>{ASCII_EMPTY}</pre>
          <div>nothing here yet. try a different filter.</div>
        </div>
      ) : (
        <div className="page-fade" key={view}>
          {view === "list" && <ListView items={filtered} />}
          {view === "grid" && <GridView items={filtered} />}
          {view === "reader" && <ReaderView items={filtered} />}
        </div>
      )}
    </div>
  );
}

function ListView({ items }) {
  return (
    <div className="list">
      {items.map(it => (
        <a key={it.id} className="list-row" href={it.url} target="_blank" rel="noreferrer">
          <div className="list-type">{it.type}</div>
          <div className="list-title">
            {it.title}
            <span className="desc">{it.desc}</span>
          </div>
          <div className="list-ctx"><span className="at">@ </span>{it.company}</div>
          <div className="list-arrow"><Icon.arrow /></div>
        </a>
      ))}
    </div>
  );
}

function GridView({ items }) {
  return (
    <div className="grid">
      {items.map(it => (
        <a key={it.id} className="card" href={it.url} target="_blank" rel="noreferrer">
          <div className="card-head">
            <span>{it.type.toLowerCase()}</span>
            <span className="card-arrow"><Icon.arrow /></span>
          </div>
          <div className="card-title">{it.title}</div>
          <div className="card-desc">{it.desc}</div>
          <div className="card-foot"><span className="at">@</span> {it.company}</div>
        </a>
      ))}
    </div>
  );
}

function ReaderView({ items }) {
  return (
    <div className="reader">
      {items.map((it, i) => (
        <a key={it.id} className="reader-item" href={it.url} target="_blank" rel="noreferrer">
          <div className="reader-num">{String(i + 1).padStart(2, "0")}</div>
          <div className="reader-body">
            <div className="reader-meta">
              {it.type}<span className="sep">/</span>{it.company}
            </div>
            <h3 className="reader-title">{it.title}</h3>
            <p className="reader-desc">{it.desc}</p>
          </div>
          <div className="reader-arrow"><Icon.arrow /></div>
        </a>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div>aidan.mcalister<span style={{ color: "var(--fg-faint)" }}> // built in a single HTML file, on purpose</span></div>
      <div className="right">
        <span>v2.0</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────
   Tweaks
   ────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "defaultView": "list",
  "showAscii": true,
  "fontSize": 13.5
}/*EDITMODE-END*/;

function Tweaks({ tweaks, setTweak }) {
  if (typeof TweaksPanel === "undefined") return null;
  return (
    <TweaksPanel>
      <TweakSection label="Work page" />
      <TweakRadio
        label="Default view"
        value={tweaks.defaultView}
        options={[
          { label: "List", value: "list" },
          { label: "Grid", value: "grid" },
          { label: "Reader", value: "reader" },
        ]}
        onChange={(v) => setTweak("defaultView", v)}
      />
      <TweakSection label="Display" />
      <TweakToggle
        label="ASCII art"
        value={tweaks.showAscii}
        onChange={(v) => setTweak("showAscii", v)}
      />
      <TweakSlider
        label="Base font size"
        min={12} max={16} step={0.5} unit="px"
        value={tweaks.fontSize}
        onChange={(v) => setTweak("fontSize", v)}
      />
    </TweaksPanel>
  );
}

/* ──────────────────────────────────────────────────────────
   App
   ────────────────────────────────────────────────────────── */
function App() {
  const [theme, setTheme] = useTheme();
  const [route, go] = useHashRoute();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply font size tweak
  useEffect(() => {
    document.body.style.fontSize = `${tweaks.fontSize}px`;
  }, [tweaks.fontSize]);

  // toggle ASCII visibility
  useEffect(() => {
    document.querySelectorAll(".ascii").forEach(el => {
      el.style.display = tweaks.showAscii ? "block" : "none";
    });
  }, [tweaks.showAscii, route]);

  return (
    <>
      <div className="shell">
        <Nav route={route} go={go} theme={theme} setTheme={setTheme} />
        <main data-screen-label={route === "/work" ? "Work" : "Home"}>
          {route === "/work" ? <Work tweaks={tweaks} /> : <Home go={go} />}
        </main>
        <Footer />
      </div>
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
