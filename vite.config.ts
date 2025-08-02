import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // increase from 500 KB to 1000 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split big dependencies into separate chunks
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("bootstrap")) return "bootstrap-vendor";
            if (id.includes("chart.js")) return "chart-vendor";
            return "vendor";
          }
        },
      },
    },
  },
}));
