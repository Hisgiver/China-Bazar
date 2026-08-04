import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const items = [...get().items];
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          items.push(item);
        }
        set({ items, total: items.reduce((acc, i) => acc + i.price * i.quantity, 0) });
      },
      removeItem: (id) => {
        const items = get().items.filter((i) => i.id !== id);
        set({ items, total: items.reduce((acc, i) => acc + i.price * i.quantity, 0) });
      },
      updateQuantity: (id, qty) => {
        const items = get().items.map(i => i.id === id ? {...i, quantity: Math.max(1, qty)} : i);
        set({ items, total: items.reduce((acc, i) => acc + i.price * i.quantity, 0) });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: 'china-bazar-cart' }
  )
);
