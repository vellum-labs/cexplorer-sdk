import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist",
      entryRoot: "src",
      staticImport: true,
    }),
    {
      name: "copy-css",
      closeBundle() {
        mkdirSync("dist", { recursive: true });
        let css = readFileSync("src/styles/style.css", "utf-8");

        css = css.replace(/@import\s+['"](.+)['"]\s*;/g, (match, path) => {
          const filePath = resolve(__dirname, "src/styles", path);
          try {
            return readFileSync(filePath, "utf-8");
          } catch (e) {
            console.warn(`Could not read ${filePath}`);
            return match;
          }
        });

        const minified = css
          .replace(/\s+/g, " ")
          .replace(/\s*([{}:;,])\s*/g, "$1")
          .trim();
        writeFileSync("dist/style.css", minified);
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Cexplorer SDK",
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
      ],
    },
  },
});
