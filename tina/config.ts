// tina/config.ts
import { defineConfig } from "tinacms";
import { slidersCollection } from "./collections/sliders";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  schema: {
    collections: [

      // ── SLIDERS ──────────────────────────────────────
      slidersCollection,

      // ── BRANDS ──────────────────────────────────────
      {
        name: "brands",
        label: "Marcas",
        path: "src/content/brands",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Nombre", required: true },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "website", label: "Sitio web" },
        ],
      },

      // ── CATEGORIES ──────────────────────────────────
      {
        name: "categories",
        label: "Categorías",
        path: "src/content/categories",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Nombre", required: true },
          { type: "string", name: "description", label: "Descripción" },
          { type: "string", name: "icon", label: "Ícono" },
        ],
      },

      // ── LOCATIONS ───────────────────────────────────
      {
        name: "locations",
        label: "Sucursales",
        path: "src/content/locations",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Nombre", required: true },
          { type: "string", name: "district", label: "Distrito", required: true },
          { type: "string", name: "city", label: "Ciudad" },
          { type: "string", name: "address", label: "Dirección", required: true },
          { type: "string", name: "phone", label: "Teléfono", required: true },
          { type: "string", name: "email", label: "Email" },
          {
            type: "object",
            name: "coordinates",
            label: "Coordenadas",
            fields: [
              { type: "number", name: "lat", label: "Latitud", required: true },
              { type: "number", name: "lng", label: "Longitud", required: true },
            ],
          },
          { type: "string", name: "schedule", label: "Horario" },
          { type: "boolean", name: "isActive", label: "Activa" },
          { type: "rich-text", name: "body", label: "Descripción", isBody: true },
        ],
      },

      // ── ACTIVATIONS ─────────────────────────────────
      {
        name: "activations",
        label: "Activaciones",
        path: "src/content/activations",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "datetime", name: "startDate", label: "Fecha inicio", required: true },
          { type: "datetime", name: "endDate", label: "Fecha fin", required: true },
          {
            type: "reference",
            name: "location",
            label: "Sucursal",
            collections: ["locations"],
            required: true,
          },
          {
            type: "object",
            name: "products",
            label: "Productos vinculados",
            list: true,
            fields: [
              {
                type: "reference",
                name: "product",
                label: "Producto",
                collections: ["products"],
              },
            ],
          },
          { type: "image", name: "banner", label: "Banner" },
          { type: "boolean", name: "isPublished", label: "Publicado" },
          { type: "rich-text", name: "body", label: "Descripción", isBody: true },
        ],
      },

      // ── PRODUCTS ────────────────────────────────────
      {
        name: "products",
        label: "Productos",
        path: "src/content/products",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Nombre del producto", required: true },
          { type: "number", name: "price", label: "Precio", required: true },
          { type: "number", name: "salePrice", label: "Precio oferta" },
          {
            type: "reference",
            name: "brand",
            label: "Marca",
            collections: ["brands"],
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Categoría",
            collections: ["categories"],
            required: true,
          },
          {
            type: "object",
            name: "locations",
            label: "Sucursales disponibles",
            list: true,
            fields: [
              {
                type: "reference",
                name: "location",
                label: "Sucursal",
                collections: ["locations"],
              },
            ],
          },
          {
            type: "image",
            name: "images",
            label: "Imágenes",
            list: true,
          },
          {
            type: "object",
            name: "specs",
            label: "Especificaciones técnicas",
            list: true,
            fields: [
              { type: "string", name: "key", label: "Característica" },
              { type: "string", name: "value", label: "Valor" },
            ],
          },
          { type: "boolean", name: "inStock", label: "En stock" },
          { type: "boolean", name: "featured", label: "Destacado" },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          { type: "string", name: "seoTitle", label: "SEO: Título" },
          { type: "string", name: "seoDescription", label: "SEO: Descripción", ui: { component: "textarea" } },
          { type: "datetime", name: "publishedAt", label: "Fecha publicación" },
          { type: "rich-text", name: "body", label: "Descripción del producto", isBody: true },
        ],
      },
    ],
  },
});