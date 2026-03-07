import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"
import type { ReactNode } from "react"

const themeBootstrapScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem("theme");
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
      var iconHref = shouldUseDark ? "/favicon-dark.svg" : "/favicon-light.svg";

      if (shouldUseDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      var faviconLink = document.querySelector('link[data-theme-favicon="true"]');
      if (!faviconLink) {
        faviconLink = document.createElement("link");
        faviconLink.setAttribute("rel", "icon");
        faviconLink.setAttribute("type", "image/svg+xml");
        faviconLink.setAttribute("data-theme-favicon", "true");
        document.head.appendChild(faviconLink);
      }
      faviconLink.setAttribute("href", iconHref);
    } catch (_error) {}
  })();
`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Aidan McAlister",
      },
      {
        name: "description",
        content:
          "Developer Advocate building clear docs, practical demos, and better developer experiences.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
