// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",   // ← reemplaza con tu dominio real
  output: "static",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes("/admin"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    },
    // Agregar dominios si usas imágenes externas
    // domains: ["expansiontecmyepe.vercel.app"],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          // Mejor splitting
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'nanostores': ['nanostores', '@nanostores/react', '@nanostores/persistent'],
          },
        },
      },
    },
    // Optimización de dependencias
    optimizeDeps: {
      include: ['react', 'react-dom', 'nanostores'],
    },
  },

  // Prefetch de rutas comunes
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});