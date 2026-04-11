// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://tu-dominio.com", // ← cambiar al dominio real en Vercel
  output: "static",
  integrations: [
    react(),
    sitemap(),
    tailwind({ applyBaseStyles: false }), sitemap()
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      },
    },

    plugins: [tailwindcss()],
  },
});