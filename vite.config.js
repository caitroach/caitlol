import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Markdown from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [react(), Markdown()],
  base: "/",
  build: {
    outDir: "docs",
  },
});