import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
// import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // mkcert()
  ],
  publicDir: "./public",
  server: {
    host: true,
  },
  base: "/matrix",
});
