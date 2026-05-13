import { r as reactExports, j as jsxRuntimeExports } from "../_chunks/_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { E as EXPERIENCE, S as STATS } from "./work-JHlT9NnE.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./index.mjs";
import { A as ArrowUpRight, X } from "../_libs/lucide-react.mjs";
import { R as Root, T as Trigger, C as Content, a as Close, b as Title, D as Description, P as Portal, O as Overlay } from "../_chunks/_libs/@radix-ui/react-dialog.mjs";
import "../_chunks/_libs/@tanstack/router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_chunks/_libs/@tanstack/history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_chunks/_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_chunks/_libs/@radix-ui/primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-compose-refs.mjs";
import "../_chunks/_libs/@radix-ui/react-context.mjs";
import "../_chunks/_libs/@radix-ui/react-id.mjs";
import "../_chunks/_libs/@radix-ui/react-use-layout-effect.mjs";
import "../_chunks/_libs/@radix-ui/react-use-controllable-state.mjs";
import "../_chunks/_libs/@radix-ui/react-dismissable-layer.mjs";
import "../_chunks/_libs/@radix-ui/react-primitive.mjs";
import "../_chunks/_libs/@radix-ui/react-slot.mjs";
import "../_chunks/_libs/@radix-ui/react-use-callback-ref.mjs";
import "../_chunks/_libs/@radix-ui/react-use-escape-keydown.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-scope.mjs";
import "../_chunks/_libs/@radix-ui/react-portal.mjs";
import "../_chunks/_libs/@radix-ui/react-presence.mjs";
import "../_chunks/_libs/@radix-ui/react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/45 backdrop-blur-[1px] transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className
      ),
      ...props
    }
  );
}
function DialogContent({ className, children, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[min(calc(100%-2rem),36rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-page-line bg-page-surface p-6 text-page-ink shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-200 data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Close,
            {
              className: "absolute top-4 right-4 inline-grid size-7 place-items-center rounded-full border border-page-line text-page-muted transition-colors hover:text-page-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-ink",
              "aria-label": "Close",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "dialog-header", className: cn("grid gap-1", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("font-serif text-2xl leading-tight text-page-ink", className),
      ...props
    }
  );
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-sm leading-6 text-page-muted", className),
      ...props
    }
  );
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const MAX_FIELD_LENGTH = {
  company: 140,
  email: 320,
  message: 5e3,
  name: 120,
  subject: 140
};
function normalizeString(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}
function validateInput(input) {
  if (typeof input !== "object" || input === null) {
    throw new Error("Invalid form payload");
  }
  const candidate = input;
  const company = normalizeString(candidate.company).slice(0, MAX_FIELD_LENGTH.company);
  const name = normalizeString(candidate.name).slice(0, MAX_FIELD_LENGTH.name);
  const email = normalizeString(candidate.email).slice(0, MAX_FIELD_LENGTH.email);
  const subject = normalizeString(candidate.subject).slice(0, MAX_FIELD_LENGTH.subject);
  const message = normalizeString(candidate.message).slice(0, MAX_FIELD_LENGTH.message);
  if (!name) {
    throw new Error("Name is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address");
  }
  if (!subject) {
    throw new Error("Subject is required");
  }
  if (!message) {
    throw new Error("Message is required");
  }
  return {
    company,
    email,
    message,
    name,
    subject
  };
}
const sendContactEmail = createServerFn({
  method: "POST"
}).inputValidator(validateInput).handler(createSsrRpc("62eb2622088a44fa097a7668c3c97b4726c73607326b8c019a168e04ddc31486"));
const inputClass = "h-11 w-full rounded-md border border-page-border bg-transparent px-3 text-[13px] text-page-ink placeholder:text-page-faint outline-none transition-colors duration-[220ms] hover:bg-page-surface focus-visible:border-page-muted focus-visible:bg-page-surface";
const textareaClass = "min-h-24 w-full resize-y rounded-md border border-page-border bg-transparent px-3 py-2 text-[13px] leading-[1.55] text-page-ink placeholder:text-page-faint outline-none transition-colors duration-[220ms] hover:bg-page-surface focus-visible:border-page-muted focus-visible:bg-page-surface";
function StatsBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-page-border-soft py-8 max-sm:py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 grid grid-cols-3 gap-x-8 max-sm:hidden", children: ["experience", "based", "dates"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10.5px] tracking-[0.08em] text-page-faint uppercase", children: h }, h)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: EXPERIENCE.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid grid-cols-3 gap-x-8 text-[13px] leading-[1.55] max-sm:grid-cols-1 max-sm:gap-y-0.5 ${item.kind === "contract" ? "opacity-50" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-[600] text-page-ink", children: item.role }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-page-muted", children: [
          "@ ",
          item.company
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-[600] text-page-ink max-sm:hidden", children: STATS.location }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-[600] text-page-ink", children: item.date })
    ] }, item.id)) })
  ] });
}
function Home() {
  const [contactOpen, setContactOpen] = reactExports.useState(false);
  const [isSending, setIsSending] = reactExports.useState(false);
  const [contactStatus, setContactStatus] = reactExports.useState(null);
  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      name: String(formData.get("name") ?? ""),
      subject: String(formData.get("subject") ?? "")
    };
    setIsSending(true);
    setContactStatus(null);
    try {
      const result = await sendContactEmail({
        data: payload
      });
      if (!result.ok) {
        setContactStatus({
          kind: "error",
          message: result.error
        });
        return;
      }
      setContactStatus({
        kind: "success",
        message: "Sent. I'll get back to you soon."
      });
      form.reset();
    } catch (error) {
      setContactStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Unable to send right now."
      });
    } finally {
      setIsSending(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade pt-48 pb-48 max-sm:pt-14 max-sm:pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 max-w-[560px] text-[28px] leading-[1.3] font-[500] tracking-[-0.018em] text-page-ink max-sm:text-[22px] max-sm:leading-[1.25]", children: "Helping developers ship faster, and feel heard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-12 max-w-[520px] text-[14px] leading-[1.75] text-page-mid max-sm:mb-10", children: [
        "I build the docs, tools, and community around developer products. Previously at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "border-b border-page-faint pb-px text-page-ink transition-colors duration-[220ms] hover:border-page-ink", href: "https://prisma.io", target: "_blank", rel: "noreferrer", children: "Prisma" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-7 gap-y-3 max-sm:gap-x-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: contactOpen, onOpenChange: (open) => {
          setContactOpen(open);
          if (!open) setContactStatus(null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn-link", children: [
            "contact ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "btn-arrow h-[11px] w-[11px]" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-[15px] font-[500]", children: "Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-[12px] text-page-muted", children: "Send a quick note. Delivered through Resend. Usually answered within a few days." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "grid gap-3", onSubmit: handleContactSubmit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 max-sm:grid-cols-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11.5px] text-page-muted", htmlFor: "contact-name", children: "name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputClass, id: "contact-name", maxLength: 120, name: "name", placeholder: "your name", required: true, type: "text" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11.5px] text-page-muted", htmlFor: "contact-company", children: [
                    "company",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-page-faint", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputClass, id: "contact-company", maxLength: 140, name: "company", placeholder: "company", type: "text" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11.5px] text-page-muted", htmlFor: "contact-email", children: "email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputClass, id: "contact-email", maxLength: 320, name: "email", placeholder: "you@example.com", required: true, type: "email" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11.5px] text-page-muted", htmlFor: "contact-subject", children: [
                  "subject",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-page-faint", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: inputClass, id: "contact-subject", maxLength: 140, name: "subject", placeholder: "what should we talk about?", type: "text" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11.5px] text-page-muted", htmlFor: "contact-message", children: "message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: textareaClass, id: "contact-message", maxLength: 5e3, name: "message", placeholder: "write your message...", required: true, rows: 5 })
              ] }),
              contactStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: contactStatus.kind === "error" ? "text-[12px] text-red-500" : "text-[12px] text-page-muted italic", role: "status", children: contactStatus.message }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-2 flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-[12.5px] text-page-muted transition-colors hover:text-page-ink", onClick: () => setContactOpen(false), children: "cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSending, className: "btn-link disabled:pointer-events-none disabled:opacity-50", children: isSending ? "sending..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "send message",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "btn-arrow h-[11px] w-[11px]" })
                ] }) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "btn-link", href: "https://github.com/aidankmcalister", target: "_blank", rel: "noreferrer", children: [
          "github ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "btn-arrow h-[11px] w-[11px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "btn-link", href: "https://www.linkedin.com/in/aidankmcalister", target: "_blank", rel: "noreferrer", children: [
          "linkedin ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "btn-arrow h-[11px] w-[11px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { className: "btn-link", to: "/work", children: [
          "work ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "btn-arrow h-[11px] w-[11px]" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, {})
  ] });
}
export {
  Home as component
};
