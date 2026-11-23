---
name: Aidan McAlister
description: A calm, text-first personal site that reads like a short, well-set letter.
colors:
  paper: "#f7f7f6"
  ink: "#1b1b1a"
  body: "#3d3d3a"
  muted: "#6b6b66"
  rule: "#e2e2df"
  mark: "rgb(226 170 52 / 0.32)"
  mark-strong: "rgb(226 170 52 / 0.5)"
  code-bg: "#efefed"
  code-line: "#e0e0dc"
  paper-dark: "#151514"
  ink-dark: "#ecebe7"
  body-dark: "#c9c8c3"
  muted-dark: "#94938e"
  rule-dark: "#2a2a28"
  mark-dark: "rgb(214 160 52 / 0.26)"
  mark-strong-dark: "rgb(214 160 52 / 0.42)"
  code-bg-dark: "#1e1e1c"
  code-line-dark: "#2f2f2c"
typography:
  display:
    fontFamily: "Spectral, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 2rem + 4vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Spectral, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2rem, 1.6rem + 2vw, 2.9rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Spectral, Iowan Old Style, Georgia, serif"
    fontSize: "1.55rem"
    fontWeight: 500
    lineHeight: 1.2
  subtitle:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    fontFeature: "tnum"
  code:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  inline: "4px"
  image: "6px"
  panel: "8px"
spacing:
  measure: "36rem"
  gutter: "clamp(1.25rem, 9vw, 10rem)"
  row: "0.85rem"
  row-gap: "1.25rem"
  stack: "1.1rem"
  inline-gap: "1.5rem"
  section: "clamp(3.5rem, 9vh, 5rem)"
components:
  list-row:
    textColor: "{colors.body}"
    padding: "0.85rem 0"
  list-row-title:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  list-row-aside:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  list-row-desc:
    textColor: "{colors.muted}"
    typography: "{typography.body-small}"
  link-highlight:
    textColor: "{colors.ink}"
    backgroundColor: "{colors.mark}"
  quiet-link:
    textColor: "{colors.muted}"
    padding: "0.65rem 0"
  quiet-link-hover:
    textColor: "{colors.ink}"
  code-panel:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.body}"
    typography: "{typography.code}"
    rounded: "{rounded.panel}"
    padding: "1rem 1.25rem"
  code-inline:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inline}"
    padding: "0.1em 0.35em"
---

# Design System: Aidan McAlister

## Overview

**Creative North Star: "The Well-Set Letter"**

The site reads like a short letter set with care: a name in a large italic serif, three plain paragraphs, then tidy lists. Everything is type on a near-neutral ground. There are no surfaces to speak of, no boxes, no imagery and no ornament; hierarchy comes from the two type voices, ink versus muted grey, and hairline rules between rows. It is the calm text-first personal site played straight, a mix of evanyou.me (big italic serif name, prose bio, soft highlighted links) and leerob.com (lists with a quiet date on the right).

Density is low and the measure is short (36rem). Light or dark follows the visitor's system setting with no toggle; both themes are the same warm-neutral grey scale inverted, with the same ochre highlighter slightly dimmed for dark. On wide screens the page opens into two columns: the intro stays pinned on the left while the lists scroll on the right, so the email is always in view.

The developer-portfolio template (hero headline, button row, card grid, stat tiles) and any concept-world costume are rejected.

**Key Characteristics:**
- Neutral ground and ink; one warm ochre accent, used only as a highlighter under links and as the selection color.
- Two type voices: Spectral 500 italic for the name and headings, the system UI sans for everything else.
- Lists, not cards: title, one line, a quiet date or place on the right, hairline rules between rows.
- Flat. No shadows, no filled surfaces except the code panel.
- Motion is a single hover fill, removed under reduced motion.

## Colors

A warm-neutral grey scale with one translucent ochre highlighter; the dark theme inverts the neutrals and keeps the ochre.

### Primary
- **Ochre Highlighter** (`mark`, `mark-dark`): a translucent warm ochre laid under link text as a marker stroke (the lower 0.42em at rest in running text) and filled to full height on hover. It never colors text, borders or fills. **Strong Ochre** (`mark-strong`, `mark-strong-dark`) is the text selection background.

### Neutral
- **Paper** (`paper` / `paper-dark`): the page ground, also the browser theme-color and the social card background.
- **Ink** (`ink` / `ink-dark`): the name, headings, list titles, link text, strong text and the focus ring.
- **Body Grey** (`body` / `body-dark`): running paragraph text.
- **Muted Grey** (`muted` / `muted-dark`): dates and places, list descriptions, the section lede, the footer, the Resume/GitHub/LinkedIn row, the back link, comments in code.
- **Hairline** (`rule` / `rule-dark`): row separators, the resting underline on list titles and guides, blockquote rule, hr, scrollbar.
- **Code Tint** (`code-bg` / `code-bg-dark`) and **Code Edge** (`code-line` / `code-line-dark`): the code panel's fill and 1px edge; Code Tint also backs inline code.

Syntax highlighting is grayscale ("paper" and "paper-dark" Shiki themes): keywords bold in ink, comments italic in muted, strings one step lighter than body, functions in ink. No hue enters code.

### Named Rules
**The One Accent Rule.** Ochre is the only hue on the site, and it appears only as a highlighter behind text (links, selection). Text, rules and fills stay neutral.

**The Follow-the-Visitor Rule.** Every color is a custom property on `:root` with a `prefers-color-scheme: dark` override. No theme toggle, no hard-coded color outside the token set (the social card is the one place light values are inlined, since it is a raster).

## Typography

**Display Font:** Spectral 500 italic, self-hosted (latin subset, preloaded), with Iowan Old Style and Georgia as fallbacks
**Body Font:** system UI sans (system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue)
**Label/Mono Font:** ui-monospace, SF Mono, Menlo, Consolas for code only

**Character:** One soft italic serif carries the personal voice in the name and headings; the system sans does all the reading work and disappears.

### Hierarchy
- **Display** (Spectral italic 500, fluid 2.75 to 4.75rem, line-height 1.02, -0.02em): the name at the top of the home page and the 404 heading.
- **Headline** (Spectral italic 500, fluid 2 to 2.9rem, line-height 1.12, -0.015em, balanced wrap): blog post titles.
- **Title** (Spectral italic 500, 1.55rem, line-height 1.2): home section headings (Work, Experience, Writing, Guides, Open source). Prose h2 in posts uses the same voice at 1.5rem / 1.25.
- **Subtitle** (sans 600, 1.05rem): prose h3 in posts.
- **Body** (sans 400, 17px, line-height 1.65): bio and post prose, within the 36rem measure. List titles use this size at weight 500.
- **Body Small** (sans 400, 15.5px, line-height 1.55): list descriptions and the section lede. The links row, back link and post date sit at 15px.
- **Label** (sans 400, 14px, tabular figures, no wrap): the right-hand date or place in list rows, and the footer (line-height 1.7).
- **Code** (mono, 13px, line-height 1.6): code blocks; inline code is 0.86em.

### Named Rules
**The Two Voices Rule.** Serif italic is for the name and headings only, always Spectral 500 italic. Everything else is the system sans. No third family, no upright Spectral on the site, no uppercase or letter-spaced labels.

## Layout

A single reading column: max width is the 36rem measure plus a fluid gutter (`clamp(1.25rem, 9vw, 10rem)`) each side, left-aligned, with a top pad of `clamp(3.5rem, 11vh, 8rem)`. Blog posts keep this single column.

At 68rem and wider the home page switches to a two-column grid: intro column up to 27rem, lists column up to 40rem, column gap `clamp(4rem, 8vw, 9rem)`. When the viewport is also at least 46rem tall, the intro is sticky at the same top offset, so name, bio, email and links stay in view while the lists scroll. The footer aligns to the lists column.

Rhythm: sections are separated by `clamp(3.5rem, 9vh, 5rem)`, bio paragraphs by 1.1rem, list rows pad 0.85rem top and bottom. Below 30rem a list row stacks: the date or place drops under the description.

Guides use a compact auto-fill link grid (columns at least `min(9rem, 40%)`, 1.5rem gap) instead of list rows, for many short entries.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is conveyed only by ink versus muted text, hairline rules, and the code panel's slight tint against the page.

### Named Rules
**The Flat Page Rule.** Nothing floats. Separation is a 1px hairline or whitespace, never a shadow, card or filled box.

## Shapes

Square by default; text and hairlines carry the form. Radius appears only on small contained things: the focus ring (2px), inline code (4px), post images (6px) and the code panel (8px). Borders are 1px hairlines, except the 2px blockquote rule and the 2px focus outline.

## Components

### List Row (signature)
The core unit, shared by Work, Experience, Writing and Open source.
- **Structure:** a two-column grid, title left and a quiet date or place right (baseline aligned, 1.25rem gap), with one description line spanning below.
- **Separation:** 1px hairline above every row except the first; no box, no icon, no thumbnail.
- **Title:** ink, weight 500. When linked it carries a hairline underline (1px, offset 4px) in the rule color; on hover the ochre highlighter fills behind the text and the underline fades. A padded 44px tap area does not change row spacing, and the highlight is clipped to the text, not the tap area.
- **Aside:** muted, 14px, tabular figures, never wraps.
- **Description:** muted, 15.5px.

### Highlighted Link
Links in running text (bio, prose, 404). Ink text, no underline, an ochre stroke under the lower 0.42em; on hover it fills to full height over 0.2s. Bio links do not wrap.

### Quiet Link
Secondary navigation: the Resume / GitHub / LinkedIn row, the back link on posts, footer links. Muted text, 15px (footer 14px with a hairline underline), turning ink on hover over 0.15s. Each has at least 0.65rem vertical padding for tap size.

### Guide Link
Links in the guides grid: ink with a hairline underline at rest, highlighter fill on hover, same as a linked list title.

### Code Panel
Code blocks in posts sit in a quiet tinted panel (Code Tint fill, 1px Code Edge, 8px radius, 1rem by 1.25rem padding, 13px mono, horizontal scroll), following the visitor's theme through the paired grayscale syntax themes.

### Focus
Every focusable element shows a 2px ink outline, 3px offset, 2px radius.

### Social Card
Per-page 1200 by 630 raster in the light palette: Spectral italic title in ink, a muted Spectral description line, and a hairline footer row with the domain over a shared backdrop.

## Do's and Don'ts

### Do:
- **Do** take every color from the `:root` custom properties and give it a `prefers-color-scheme: dark` value.
- **Do** use the ochre only as the link highlighter and the selection color.
- **Do** set the name and headings in Spectral 500 italic and everything else in the system sans.
- **Do** present collections as list rows: title, one line, a quiet right-aligned date or place, hairline rules between rows.
- **Do** open external links in a new tab with `rel="noreferrer"` and `aria-describedby="new-tab"` so screen readers announce it; internal links stay in the tab.
- **Do** keep motion to the 0.2s highlight fill (`cubic-bezier(0.22, 1, 0.36, 1)`) and 0.15s color shifts on hover, and remove all transitions under `prefers-reduced-motion: reduce`.
- **Do** keep copy in Aidan's voice per PRODUCT.md: short plain sentences, no em or en dashes in prose, no colons in sentences.

### Don't:
- **Don't** add cards, boxes, icons, thumbnails, stat tiles, badges or a button row.
- **Don't** introduce a second accent hue, colored text, or colored fills.
- **Don't** add shadows or elevated surfaces.
- **Don't** add a hero headline, eyebrow or uppercase label above headings.
- **Don't** add a theme toggle; the visitor's system setting decides.
- **Don't** animate on load or on scroll; the only motion is a hover response.
