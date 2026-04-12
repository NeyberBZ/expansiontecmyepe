// src/content/config.ts
import { defineCollection, z, reference } from "astro:content";

// ── SLIDERS ──────────────────────────────────────────────
const sliders = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    image: z.string(),        // URL de TinaCMS
    imageAlt: z.string().optional(),
    order: z.number().default(0),
    active: z.boolean().default(true),
  }),
});

// ── BRANDS ──────────────────────────────────────────────
const brandsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

// ── CATEGORIES ──────────────────────────────────────────
const categoriesCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  }),
});

// ── LOCATIONS (Sucursales) ───────────────────────────────
const locationsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    district: z.string(),
    city: z.string().default("Lima"),
    address: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    schedule: z.string(),         // "Lun-Sab 10am-8pm"
    isActive: z.boolean().default(true),
  }),
});

// ── ACTIVATIONS (Eventos) ────────────────────────────────
const activationsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    location: reference("locations"),
    products: z.array(z.object({
      product: reference("products"),
    })).optional(),
    banner: z.string().optional(),
    isPublished: z.boolean().default(true),
  }),
});

// ── PRODUCTS ─────────────────────────────────────────────
const productsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    price: z.number().positive(),
    salePrice: z.number().positive().optional(),
    brand: reference("brands"),
    category: reference("categories"),
    locations: z.array(z.object({
      location: reference("locations"),
    })),
    images: z.array(z.string()).min(1),
    specs: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    publishedAt: z.date().default(() => new Date()),
  }),
});

export const collections = {
  products: productsCollection,
  categories: categoriesCollection,
  brands: brandsCollection,
  locations: locationsCollection,
  activations: activationsCollection,
  sliders
};