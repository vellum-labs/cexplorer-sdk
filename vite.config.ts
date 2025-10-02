import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist",
      entryRoot: "src",
      staticImport: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Cexplorer SDK",
      formats: ["es", "umd"],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: [
        {
          format: "es",
          entryFileNames: "index.es.js",
          plugins: [
            terser({
              compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 10,
                unsafe: true,
                toplevel: true,
                dead_code: true,
              },
              mangle: {
                toplevel: true,
              },
              format: {
                comments: false,
              },
            }),
          ],
        },
        {
          format: "umd",
          entryFileNames: "index.umd.js",
          name: "CexplorerSDK",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
          plugins: [
            terser({
              compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 10,
                unsafe: true,
                toplevel: true,
                dead_code: true,
              },
              mangle: {
                toplevel: true,
              },
              format: {
                comments: false,
              },
            }),
          ],
        },
      ],
    },
  },
});
