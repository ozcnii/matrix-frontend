// vite.config.ts
import { defineConfig } from "file:///C:/Users/qq/Desktop/code/ambeaver-subwork/matrix-frontend/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Users/qq/Desktop/code/ambeaver-subwork/matrix-frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import react from "file:///C:/Users/qq/Desktop/code/ambeaver-subwork/matrix-frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  base: "./matrix",
  plugins: [
    react(),
    tsconfigPaths()
    // mkcert()
  ],
  publicDir: "./public",
  server: {
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxcVxcXFxEZXNrdG9wXFxcXGNvZGVcXFxcYW1iZWF2ZXItc3Vid29ya1xcXFxtYXRyaXgtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHFxXFxcXERlc2t0b3BcXFxcY29kZVxcXFxhbWJlYXZlci1zdWJ3b3JrXFxcXG1hdHJpeC1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcXEvRGVza3RvcC9jb2RlL2FtYmVhdmVyLXN1YndvcmsvbWF0cml4LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuLy8gaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IFwiLi9tYXRyaXhcIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgLy8gbWtjZXJ0KClcclxuICBdLFxyXG4gIHB1YmxpY0RpcjogXCIuL3B1YmxpY1wiLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVyxTQUFTLG9CQUFvQjtBQUN4WSxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBO0FBQUEsRUFFaEI7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K