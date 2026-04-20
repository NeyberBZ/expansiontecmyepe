import { atom } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  maxStock?: number; // Para validar límite
}

export const cartStore = persistentMap('cart:', {
  items: [] as CartItem[],
  total: 0,
  count: 0,
  lastUpdated: ''
});

// Acciones
export const addToCart = (item: CartItem) => {
  const current = cartStore.get();
  const existingIndex = current.items.findIndex(i => i.slug === item.slug);

  let newItems = [...current.items];

  if (existingIndex >= 0) {
    // Actualiza cantidad si no excede stock
    const existing = newItems[existingIndex];
    const newQuantity = Math.min(
      existing.quantity + item.quantity,
      item.maxStock || 99
    );
    newItems[existingIndex] = { ...existing, quantity: newQuantity };
  } else {
    newItems.push(item);
  }

  updateCart(newItems);
};

export const removeFromCart = (slug: string) => {
  const current = cartStore.get();
  const newItems = current.items.filter(i => i.slug !== slug);
  updateCart(newItems);
};

export const updateQuantity = (slug: string, quantity: number) => {
  const current = cartStore.get();
  const newItems = current.items.map(item =>
    item.slug === slug
      ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxStock || 99)) }
      : item
  );
  updateCart(newItems);
};

export const clearCart = () => {
  cartStore.set({ items: [], total: 0, count: 0, lastUpdated: new Date().toISOString() });
};

const updateCart = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  cartStore.set({
    items,
    total,
    count,
    lastUpdated: new Date().toISOString()
  });
};

// Generar mensaje de WhatsApp
export const generateWhatsAppMessage = (phone: string, customerInfo?: {
  name?: string;
  address?: string;
  notes?: string;
}): string => {
  const { items, total } = cartStore.get();

  if (items.length === 0) return '';

  const itemsList = items.map((item, index) =>
    `${index + 1}. *${item.title}* (${item.brand})\n` +
    `   Cant: ${item.quantity} × S/ ${item.price.toFixed(2)} = *S/ ${(item.price * item.quantity).toFixed(2)}*`
  ).join('\n\n');

  let message = `*🛒 Nuevo Pedido - ExpansionTec*\n\n`;
  message += `*Productos:*\n${itemsList}\n\n`;
  message += `*💰 Total: S/ ${total.toFixed(2)}*\n\n`;

  if (customerInfo?.name) {
    message += `*👤 Cliente:* ${customerInfo.name}\n`;
  }
  if (customerInfo?.address) {
    message += `*📍 Dirección:* ${customerInfo.address}\n`;
  }
  if (customerInfo?.notes) {
    message += `*📝 Notas:* ${customerInfo.notes}\n`;
  }

  message += `\nPor favor confirmar disponibilidad. ¡Gracias!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};