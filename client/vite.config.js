import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
})


/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // the library used for resolving paths for imports

export default defineConfig({
  plugins: [react()], // this is a array with the plug-ins used to extend vite
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // resolve paths using the path library, now instead of src you can just use @
    },
  },
  server: { // this is everything to do with the development server that runs locally on your machine
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: { // this object is everything to do with how vite processes your application for production
    outDir: "dist",
    minify: "esbuild",
    sourcemap: true,
    chunkSizeWarningLimit: 500,
  },
  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },
  define: {
    "process.env": {}, // Makes process.env work (some libraries depend on it)
  },
});
*/