// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = "ecommerce-armour";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base =
    command === "build"
      ? `/${repoName}/` // Use repo name for GitHub Pages build
      : "/"; // Use root for local development

  return {
    plugins: [react()],
    base: base, // Set the base path here
    build: {
      outDir: "dist", // Ensure output directory is 'dist' (default)
    },
  };
});
