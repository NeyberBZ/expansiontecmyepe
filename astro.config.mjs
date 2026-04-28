import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import keystatic from '@keystatic/astro';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",
  adapter: vercel(),
  // Eliminamos output: "static" para que el adaptador tome el control total

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    keystatic(),
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/keystatic"),
    }),
  ],

  // Eliminamos la sección vite.resolve.alias y vite.ssr.noExternal
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'nanostores': ['nanostores', '@nanostores/react', '@nanostores/persistent'],
          },
        },
      },
    },
  },
});