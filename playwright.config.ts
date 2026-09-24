import { defineConfig } from "@playwright/test";

// Runs against the production build. Uses the system Chrome so no browser download is needed.
export default defineConfig({
  testDir: "tests",
  use: { baseURL: "http://localhost:4330", channel: "chrome" },
  webServer: {
    command: "bun run build && bun run preview --port 4330",
    url: "http://localhost:4330",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
