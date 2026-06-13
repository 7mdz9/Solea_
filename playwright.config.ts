import { defineConfig } from "@playwright/test";

const e2eAdminPassword =
  process.env.E2E_ADMIN_PASSWORD ?? "playwright-admin-password";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command:
      "npm run build && npm run start -- --hostname 127.0.0.1 --port 3000",
    env: {
      ADMIN_PASSWORD: e2eAdminPassword,
    },
    timeout: 180_000,
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
  },
});
