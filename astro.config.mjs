import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import keystatic from '@keystatic/astro';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://expansiontecmyepe.vercel.app",
  adapter: vercel(),
  output: "static", // Keystatic funcionará bien así en Astro 5

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    keystatic(),
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/keystatic"),
    }),
  ],

  vite: {
    // ✅ ESTE BLOQUE ES LA SOLUCIÓN AL ERROR DE ENTRYPOINT
    resolve: {
      alias: [
        {
          // Este alias captura el error exacto que te está dando Vercel
          find: /^astro\/app\/entrypoint$/,
          replacement: "astro/dist/core/app/entrypoint.js"
        }
      ]
    },
    ssr: {
      noExternal: ['@keystatic/astro', '@keystatic/core', '@keystatic/next']
    },
    // Mantén tu configuración previa de build/manualChunks debajo
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
    }
  }
});