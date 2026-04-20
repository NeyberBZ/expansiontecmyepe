import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { cartStore } from '../../stores/cart';
import CartDrawer from './CartDrawer';

export default function CartIcon() {
  const cart = useStore(cartStore);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Abrir carrito"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>

        {cart.count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
            {cart.count > 99 ? '99+' : cart.count}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}