import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { ImageResponse } = await import("@vercel/og")

        const url = new URL(request.url)
        const origin = url.origin
        const title = url.searchParams.get("title") ?? "Aidan McAlister's Portfolio"
        const author = url.searchParams.get("author") ?? "Aidan McAlister"

        const titleSize =
          title.length > 50 ? "64px" : title.length > 25 ? "80px" : "100px"

        const [fontRegular, fontMedium] = await Promise.all([
          fetch(`${origin}/fonts/jetbrains-mono-latin-400-normal.woff2`).then(r => r.arrayBuffer()),
          fetch(`${origin}/fonts/jetbrains-mono-latin-500-normal.woff2`).then(r => r.arrayBuffer()),
        ])

        return new ImageResponse(
          <div
            style={{
              background: "#0b0b0d",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "64px 80px",
              fontFamily: "JetBrains Mono",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#3a3a3e",
                fontSize: "22px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              aidanmcalister.com
            </div>

            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#ebeae6",
                  fontSize: titleSize,
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  maxWidth: "1040px",
                }}
              >
                {title}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "22px",
                  background: "#3a3a3e",
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "#807e78",
                  fontSize: "26px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {author}
              </span>
            </div>
          </div>,
          {
            width: 1200,
            height: 630,
            fonts: [
              { name: "JetBrains Mono", data: fontRegular, weight: 400, style: "normal" },
              { name: "JetBrains Mono", data: fontMedium, weight: 500, style: "normal" },
            ],
          }
        )
      },
    },
  },
})
