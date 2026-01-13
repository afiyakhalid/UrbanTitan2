import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface CompareItem {
  productId: string;
  productName: string;
  brandName: string;
  categorySlug: string;
  productImage: string;
  price: number;
  mrp: number;
}

interface CompareStore {
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  devtools(
    persist(
      (set, get) => ({
        compareItems: [],

        addToCompare: (item) =>
          set((state) => {
            if (state.compareItems.length >= 4) {
              return state;
            }
            if (state.compareItems.some((i) => i.productId === item.productId)) {
              return state;
            }
            return { compareItems: [...state.compareItems, item] };
          }),

        removeFromCompare: (productId) =>
          set((state) => ({
            compareItems: state.compareItems.filter((i) => i.productId !== productId),
          })),

        clearCompare: () => set({ compareItems: [] }),

        isInCompare: (productId) => get().compareItems.some((i) => i.productId === productId),
      }),
      {
        name: "compare-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
