// ⚠️ AUTO-GENERADO por scripts/generate-tina-options.mjs
// NO EDITAR MANUALMENTE
// Ejecutar: npm run generate:options

export interface Option {
  value: string;
  label: string;
}

export const brandOptions: Option[] = [
  {
    "value": "apple",
    "label": "Apple"
  },
  {
    "value": "honor",
    "label": "Honor"
  },
  {
    "value": "motorola",
    "label": "Motorola"
  },
  {
    "value": "oppo",
    "label": "Oppo"
  },
  {
    "value": "redmi",
    "label": "Redmi"
  },
  {
    "value": "samsung",
    "label": "Samsung"
  },
  {
    "value": "xiaomi",
    "label": "Xiaomi"
  }
];

export const categoryOptions: Option[] = [
  {
    "value": "accesorios",
    "label": "Accesorios"
  },
  {
    "value": "celulares",
    "label": "Celulares"
  }
];

export const locationOptions: Option[] = [
  {
    "value": "los-olivos",
    "label": "Los Olivos"
  },
  {
    "value": "miraflores",
    "label": "Miraflores"
  }
];

// Helper para obtener label por value
export const getBrandLabel = (value: string): string =>
  brandOptions.find(b => b.value === value)?.label || value;

export const getCategoryLabel = (value: string): string =>
  categoryOptions.find(c => c.value === value)?.label || value;

export const getLocationLabel = (value: string): string =>
  locationOptions.find(l => l.value === value)?.label || value;
