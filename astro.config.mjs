import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",
  output: "static",
  adapter: vercel(),

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
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

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    },
  },
});