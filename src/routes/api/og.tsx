import { createFileRoute } from "@tanstack/react-router"

let fontRegular: ArrayBuffer | null = null
let fontMedium: ArrayBuffer | null = null

async function loadFont(weight: 400 | 500): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }
  ).then((r) => r.text())

  const url = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1]
  if (!url) throw new Error("Could not parse font URL from Google Fonts")
  return fetch(url).then((r) => r.arrayBuffer())
}

async function getFonts() {
  if (!fontRegular) fontRegular = await loadFont(400)
  if (!fontMedium) fontMedium = await loadFont(500)
  return [
    {
      name: "JetBrains Mono",
      data: fontRegular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "JetBrains Mono",
      data: fontMedium,
      weight: 500 as const,
      style: "normal" as const,
    },
  ]
}

export const Route = createFileRoute("/api/og")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { ImageResponse } = await import("@takumi-rs/image-response")

        const url = new URL(request.url)
        const title =
          url.searchParams.get("title") ?? "Aidan McAlister's Portfolio"
        const author = url.searchParams.get("author") ?? "Aidan McAlister"

        const fonts = await getFonts()

        return new ImageResponse(<OgImage title={title} author={author} />, {
          width: 1200,
          height: 630,
          fonts,
        })
      },
    },
  },
})

function OgImage({ title, author }: { title: string; author: string }) {
  const titleSize =
    title.length > 50 ? "64px" : title.length > 25 ? "80px" : "100px"

  return (
    <div
      style={{
        background: "#0b0b0d",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#3a3a3e",
          fontSize: "22px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: 400,
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
    </div>
  )
}
