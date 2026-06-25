import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function localFileBuildHtml(): Plugin {
  return {
    name: "local-file-build-html",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html
          .replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/,
            '<script defer src="$1"></script>',
          )
          .replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            '<link rel="stylesheet" href="$1">',
          );
      },
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), localFileBuildHtml()],
});
