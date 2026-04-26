import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'NeyberBZ/expansiontecmyepe', // Asegúrate de que este sea el nombre exacto de tu repo
      }
    : {
        kind: 'local',
      },
  collections: {
    // ── BRANDS ──────────────────────────────────────
    brands: collection({
      label: 'Marcas',
      slugField: 'name',
      path: 'src/content/brands/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/uploads/brands',
          publicPath: '/uploads/brands/',
        }),
        website: fields.text({ label: 'Sitio web' }),
      },
    }),

    // ── CATEGORIES ──────────────────────────────────
    categories: collection({
      label: 'Categorías',
      slugField: 'name',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        slug: fields.text({ label: 'Slug (ID)', description: 'Debe coincidir con el nombre del archivo' }),
        description: fields.text({ label: 'Descripción', multiline: true }),
        image: fields.image({
          label: 'Imagen',
          directory: 'public/uploads/categories',
          publicPath: '/uploads/categories/',
        }),
        featuredImage: fields.image({
          label: 'Imagen destacada',
          directory: 'public/uploads/categories',
          publicPath: '/uploads/categories/',
        }),
        banner: fields.image({
          label: 'Banner',
          directory: 'public/uploads/categories',
          publicPath: '/uploads/categories/',
        }),
      },
    }),

    // ── LOCATIONS ───────────────────────────────────
    locations: collection({
      label: 'Sucursales',
      slugField: 'name',
      path: 'src/content/locations/**',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        image: fields.image({
          label: 'Foto de la tienda',
          directory: 'public/uploads/locations',
          publicPath: '/uploads/locations/',
        }),
        district: fields.text({ label: 'Distrito' }),
        city: fields.text({ label: 'Ciudad' }),
        address: fields.text({ label: 'Dirección' }),
        phone: fields.text({ label: 'Teléfono' }),
        email: fields.text({ label: 'Email' }),
        coordinates: fields.object({
          lat: fields.number({ label: 'Latitud' }),
          lng: fields.number({ label: 'Longitud' }),
        }, { label: 'Coordenadas' }),
        schedule: fields.text({ label: 'Horario' }),
        mapEmbedUrl: fields.text({ label: 'Link de Mapa (Embed)' }),
        googleMapsUrl: fields.text({ label: 'URL Google Maps' }),
        wazeUrl: fields.text({ label: 'URL Waze' }),
        isActive: fields.checkbox({ label: 'Activa', defaultValue: true }),
        body: fields.markdoc({ label: 'Descripción', extension: 'md' }),
      },
    }),

    // ── PRODUCTS ────────────────────────────────────
    products: collection({
      label: 'Productos',
      slugField: 'title',
      path: 'src/content/products/**',
      format: {
        contentField: 'body',
      },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Nombre del producto' } }),
        shortDescription: fields.text({ label: 'Descripción corta', multiline: true }),
        price: fields.number({ label: 'Precio' }),
        salePrice: fields.number({ label: 'Precio oferta' }),
        // Relaciones mediante slug (usamos relationship para vincular con otras colecciones)
        brand: fields.relationship({ label: 'Marca', collection: 'brands' }),
        category: fields.relationship({ label: 'Categoría', collection: 'categories' }),
        locations: fields.array(
          fields.object({
            location: fields.relationship({ label: 'Sucursal', collection: 'locations' }),
          }),
          {
            label: 'Sucursales disponibles',
            itemLabel: (props) => props.fields.location.value ?? 'Seleccionar sucursal',
          }
        ),
        images: fields.array(
          fields.image({
            label: 'Imagen',
            directory: 'public/uploads/products',
            publicPath: '/uploads/products/',
          }),
          { label: 'Galería de Imágenes' }
        ),
        specs: fields.array(
          fields.object({
            key: fields.text({ label: 'Característica' }),
            value: fields.text({ label: 'Valor' }),
          }),
          {
            label: 'Especificaciones técnicas',
            itemLabel: (props) => `${props.fields.key.value}: ${props.fields.value.value}`,
          }
        ),
        inStock: fields.checkbox({ label: 'En stock', defaultValue: true }),
        featured: fields.checkbox({ label: 'Destacado', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        seoTitle: fields.text({
            label: 'SEO: Título',
            validation: { length: { max: 60 } }
        }),
        seoDescription: fields.text({
            label: 'SEO: Descripción',
            multiline: true,
            validation: { length: { max: 160 } }
        }),
        publishedAt: fields.date({ label: 'Fecha publicación' }),
        body: fields.markdoc({ label: 'Descripción del producto', extension: 'md' }),
      },
    }),
  },
});