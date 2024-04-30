import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("ort-web")) return "ort-min"; //separate biggest deps
          else return "index";
        },
      },
    },
  },
});
