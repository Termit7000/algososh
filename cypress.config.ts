import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1440,
    viewportHeight: 900,
    baseUrl: 'http://localhost:3000/#',
  },
});
