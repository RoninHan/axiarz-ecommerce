import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: string;
        image_url: string;
        type_name: string;
    };
    quantity: number;
}

interface CartState {
    selectedItems: number[];
    checkoutItems: CartItem[];
    totalPrice: number;
    setSelectedItems: (items: number[]) => void;
    toggleSelectedItem: (id: number) => void;
    setCheckoutData: (items: CartItem[], total: number) => void;
    clearCheckoutData: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            selectedItems: [],
            checkoutItems: [],
            totalPrice: 0,
            setSelectedItems: (items) => set({ selectedItems: items }),
            toggleSelectedItem: (id) => {
                const currentItems = get().selectedItems;
                if (currentItems.includes(id)) {
                    set({ selectedItems: currentItems.filter(item => item !== id) });
                } else {
                    set({ selectedItems: [...currentItems, id] });
                }
            },
            setCheckoutData: (items, total) => set({ checkoutItems: items, totalPrice: total }),
            clearCheckoutData: () => set({ checkoutItems: [], totalPrice: 0 }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => sessionStorage), // 使用 sessionStorage，页面关闭后数据会被清除
        }
    )
); 