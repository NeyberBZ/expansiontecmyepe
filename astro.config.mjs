// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import keystatic from '@keystatic/astro';
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",
  adapter: vercel(),

  // ✅ Cambiado a hybrid para que el panel de Keystatic funcione en Vercel
  output: "static",

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    keystatic(),
    sitemap({
      // ✅ Excluimos también /keystatic del sitemap
      filter: (page) => !page.includes("/admin") && !page.includes("/keystatic"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    },
  },

  compressHTML: true,

  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    ssr: {
      noExternal: ['@keystatic/astro', '@keystatic/core', '@keystatic/next']
    },
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
    optimizeDeps: {
      include: ['react', 'react-dom', 'nanostores'],
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  adapter: vercel(),
});