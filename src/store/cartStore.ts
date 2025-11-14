import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const cartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: newItem => {
        set(state => {
          const existingItem = state.items.find(item => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },

      updateQuantity: (id, delta) => {
        set(state => {
          const item = state.items.find(i => i.id === id);
          if (!item) return state;

          const newQuantity = Math.max(0, item.quantity + delta);

          if (newQuantity === 0) {
            return { items: state.items.filter(i => i.id !== id) };
          }

          return {
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity: newQuantity } : i,
            ),
          };
        });
      },

      removeItem: id => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
