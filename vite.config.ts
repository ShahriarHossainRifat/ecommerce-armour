// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// --- Set your repository name here ---
const repoName = "ecommerce-armour";
// --- End repository name ---

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Set base path based on command (build vs. serve)
  // For GitHub Pages project deployment (https://<user>.github.io/<repo>/), base should be /<repo>/
  const base =
    command === "build"
      ? `/${repoName}/` // Use '/ecommerce-armour/' for production build
      : "/"; // Use root '/' for local development (npm run dev)

  console.log(`Vite Base Path (${command}): ${base}`); // Log base path for confirmation

  return {
    plugins: [react()],
    base: base, // Set the calculated base path
    build: {
      outDir: "dist", // Default output directory
    },
  };
});
