import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";   // ← nuevo
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",
  output: "static",
  adapter: vercel(),

  integrations: [
    react(),
    // tailwind() ← ya no va aquí
    sitemap({
      filter: (page) => !page.includes("/admin"),
    }),
  ],

  vite: {
    plugins: [
      tailwindcss(),   // ← va aquí
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
});