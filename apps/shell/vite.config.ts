import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// Shell — хост-приложение (Module Federation host)
// Загружает удалённые модули (remotes) в рантайме
//
// Локально remotes живут на localhost:3001-3003.
// На GitHub Pages все приложения лежат на одном домене:
//   https://<owner>.github.io/<repo>/admin/assets/remoteEntry.js
// Поэтому в CI передаётся переменная VITE_REMOTE_BASE.

const remoteBase = process.env.VITE_REMOTE_BASE;

// ВАЖНО: @originjs/vite-plugin-federation ждёт голый URL без webpack-префикса "name@"
const remote = (name: string, devPort: number) =>
  remoteBase
    ? `${remoteBase}/${name}/assets/remoteEntry.js`
    : `http://localhost:${devPort}/assets/remoteEntry.js`;

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        admin: remote("admin", 3001),
        dashboard: remote("dashboard", 3002),
        profile: remote("profile", 3003),
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
