import path from "path";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // 1. Force IPv4 to avoid "localhost" DNS resolution lag
    host: "127.0.0.1",
    // 2. Optional: Ensure the port stays consistent
    port: 5173,
    // 3. Helpful if you are on Windows to prevent file-watching lag
    watch: {
      usePolling: false, 
    },
  },
  // 4. This helps Vite "pre-bundle" dependencies so it doesn't 
  // discover them one-by-one while you are trying to load the page
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});

