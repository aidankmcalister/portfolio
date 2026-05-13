import { defineNitroConfig } from "nitropack/config"

export default defineNitroConfig({
  externals: {
    external: [
      "@takumi-rs/core",
      "@takumi-rs/image-response",
      "@takumi-rs/helpers",
    ],
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
})
