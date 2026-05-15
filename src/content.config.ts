// src/content.config.ts  ← nueva ubicación
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// ── SLIDERS ──────────────────────────────────────────────
const sliders = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/sliders" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    image: z.string(),
    imageAlt: z.string().optional(),
    order: z.number().default(0),
    active: z.boolean().default(true),
  }),
});

// ── BRANDS ──────────────────────────────────────────────
const brandsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/brands" }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    website: z.url().optional(),
  }),
});

// ── CATEGORIES ──────────────────────────────────────────
const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    featuredImage: z.string().optional(),
    banner: z.string().optional(),
    slug: z.string().optional(),
  }),
});

// ── LOCATIONS (Sucursales) ───────────────────────────────
const locationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/locations" }),
  schema: z.object({
    name: z.string(),
    image: z.string().optional(),
    district: z.string(),
    city: z.string().default("Lima"),
    address: z.string(),
    phone: z.string(),
    email: z.email().optional(),
    mapEmbedUrl: z.string().optional(),
    googleMapsUrl: z.url().optional(),
    wazeUrl: z.url().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    schedule: z.string(),
    isActive: z.boolean().default(true),
  }),
});

// ── ACTIVATIONS (Eventos) ────────────────────────────────
const activationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/activations" }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    locations: z.array(z.string()),
    products: z.array(z.object({
      product: z.string(),
    })).optional(),
    banner: z.string().optional(),
    isPublished: z.boolean().default(true),
  }),
});

// ── PRODUCTS ─────────────────────────────────────────────
const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    title: z.string().min(3).max(100),
    shortDescription: z.string().max(200).optional(),
    price: z.number().positive(),
    salePrice: z.number().positive().optional(),
    brand: z.string(),
    category: z.string(),
    locations: z.array(z.object({
      location: z.string(),
    })),
    images: z.array(z.string()).min(1),
    specs: z.array(z.object({
      key: z.string().min(1),
      value: z.string().min(1),
    })).optional(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    publishedAt: z.coerce.date().default(() => new Date()),
    stockQuantity: z.number().int().min(0).default(0),
    maxPerOrder: z.number().int().min(1).default(5),
  }),
});

export const collections = {
  products: productsCollection,
  categories: categoriesCollection,
  brands: brandsCollection,
  locations: locationsCollection,
  activations: activationsCollection,
  sliders,
};