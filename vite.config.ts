import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ConfigConstant } from "./src/constants/ConfigConstant";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: ConfigConstant.PORT,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:6780",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 🔥 IMPORTANT
      },
    },
  },
});
