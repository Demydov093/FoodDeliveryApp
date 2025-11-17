import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Address = {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  flatNo: string;
  street: string;
  locality: string;
};

type AddressState = {
  addresses: Address[];
  selectedAddressId: string | null;

  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
};

export const addressStore = create<AddressState>()(
  persist(
    set => ({
      addresses: [
        {
          id: '1',
          type: 'Home',
          name: 'Jan Kowalski',
          phone: '+48 501 234 567',
          flatNo: '12B',
          street: 'ul. Nowowiejska 15',
          locality: 'Warszawa',
        },
        {
          id: '2',
          type: 'Work',
          name: 'Anna Nowak',
          phone: '+48 512 987 654',
          flatNo: '3A',
          street: 'ul. Kwiatowa 8',
          locality: 'Kraków',
        },
      ],

      selectedAddressId: '1',

      addAddress: newAddress => {
        const id = Date.now().toString();
        set(state => ({
          addresses: [...state.addresses, { ...newAddress, id }],
        }));
      },

      updateAddress: (id, updated) => {
        set(state => ({
          addresses: state.addresses.map(addr =>
            addr.id === id ? { ...addr, ...updated } : addr,
          ),
        }));
      },

      removeAddress: id => {
        set(state => ({
          addresses: state.addresses.filter(addr => addr.id !== id),
          selectedAddressId:
            state.selectedAddressId === id ? null : state.selectedAddressId,
        }));
      },

      selectAddress: id => {
        set({ selectedAddressId: id });
      },
    }),
    {
      name: 'address-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
