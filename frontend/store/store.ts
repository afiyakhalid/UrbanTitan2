import { Product as ProductType } from "@/lib/types";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export type CartItemType = ProductType & {
  quantity: number;
};

interface CartStore {
  cart: CartItemType[];
  setCart: (items: CartItemType[]) => void;
  addToCart: (product: ProductType, quantity: number) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        setCart: (items) => set({ cart: items }),
        addToCart: (product, quantity) =>
          set((state) => {
            const existing = state.cart.find((item) => item.id === product.id);

            if (existing) {
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }

            return {
              cart: [...state.cart, { ...product, quantity }],
            };
          }),
        updateQuantity: (productId, newQuantity) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item.id === productId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
              .filter((item) => item.quantity > 0),
          })),
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
