import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const config = defineConfig({
  plugins: [
    devtools(),
    nitro({
      preset: "vercel",
      externals: {
        traceInclude: [
          "node_modules/@takumi-rs/core",
          "node_modules/@takumi-rs/image-response",
          "node_modules/@takumi-rs/helpers",
          "node_modules/@takumi-rs/core-linux-x64-gnu",
          "node_modules/@takumi-rs/core-linux-arm64-gnu",
          "node_modules/@takumi-rs/core-darwin-arm64",
          "node_modules/@takumi-rs/core-darwin-x64",
        ],
      },
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
