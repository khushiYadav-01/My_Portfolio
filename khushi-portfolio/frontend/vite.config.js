import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // any request to /api/* from the React app is forwarded to Express
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true
      }
    }
  }
});
