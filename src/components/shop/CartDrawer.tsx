import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartStore, removeFromCart, updateQuantity, generateWhatsAppMessage, clearCart } from '../../stores/cart';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '51930569934'; // ⚠️ REEMPLAZAR CON NÚMERO REAL

export default function CartDrawer({ isOpen, onClose }: Props) {
  const cart = useStore(cartStore);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cart.items.length === 0) return;

    const url = generateWhatsAppMessage(WHATSAPP_NUMBER, customerInfo);
    window.open(url, '_blank');

    // Opcional: limpiar carrito después de enviar
    // clearCart();
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
            <p className="text-sm text-gray-500">{cart.count} {cart.count === 1 ? 'producto' : 'productos'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <button
                onClick={onClose}
                className="mt-4 text-blue-600 hover:underline font-medium"
              >
                Ir a la tienda →
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.slug} className="flex gap-4 border rounded-lg p-3 bg-white shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-blue-600 font-bold">S/ {item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                    >−</button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="w-8 h-8 rounded border hover:bg-gray-100 flex items-center justify-center"
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="ml-auto text-red-500 hover:text-red-700 p-1"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t bg-gray-50 p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
              <span>Total:</span>
              <span className="text-blue-600">S/ {cart.total.toFixed(2)}</span>
            </div>

            {/* Formulario de checkout (opcional) */}
            {!showCheckoutForm ? (
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Agregar datos de envío (opcional)
              </button>
            ) : (
              <div className="space-y-3 bg-white p-3 rounded-lg border">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Dirección de entrega"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  placeholder="Notas adicionales..."
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                />
              </div>
            )}

            {/* Botón WhatsApp */}
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.004 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Comprar por WhatsApp
            </button>

            <p className="text-xs text-center text-gray-500">
              Serás redirigido a WhatsApp para confirmar tu pedido
            </p>
          </div>
        )}
      </div>
    </div>
  );
}