import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    global: {
      // Define globals for simple-peer here
      global: 'window', // Example: Expose 'global' as 'window' for simple-peer
    },
  },
  plugins: [
    react(),
    reactRefresh(),
  ],
});
