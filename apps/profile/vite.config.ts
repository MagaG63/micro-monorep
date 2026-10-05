import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// Profile — удалённый модуль (Module Federation remote)
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    react(),
    federation({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
  ],
  server: {
    port: 3003,
    cors: true,
  },
  // В dev-режиме remotes не отдают remoteEntry.js (ограничение originjs-плагина),
  // поэтому remote запускается как: vite build --watch + vite preview.
  preview: {
    port: 3003,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
