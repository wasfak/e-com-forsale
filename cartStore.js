import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      adminItems: [],
      selectedProducts: [],
      categories: [],

      // Adds an item or increases its quantity
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === newItem._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === newItem._id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { ...newItem, quantity: 1 }] };
          }
        }),
      getItemById: (itemId) =>
        get().adminItems.find((item) => item._id === itemId) || null,
      setOrders: (newOrders) => set({ orders: newOrders }),
      setCategories: (newCategories) => set({ categories: newCategories }),
      setAdminItems: (newItems) => set({ adminItems: newItems }),
      // Removes an item from the cart
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== itemId),
        })),

      // Clears all items from the cart
      clearCart: () => set({ items: [] }),
      clearOrders: () => set({ orders: [] }),
      clearAdminItems: () => set({ adminItems: [] }),
      clearSelectedItems: () => set({ selectedProducts: [] }),
      clearCategories: () => set({ categories: [] }),

      // Increase the quantity of an item
      increase: (item) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        })),

      // Decrease the quantity of an item
      decrease: (item) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i._id === item._id ? { ...i, quantity: (i.quantity || 1) - 1 } : i
            )
            .filter((i) => i.quantity > 0), // Remove the item if quantity is 0
        })),

      // Calculates the total sum of the items in the cart
      totalSum: () =>
        set((state) => ({
          ...state, // maintain the rest of your state
        })).items.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        ),
    }),

    {
      name: "cart-storage", // unique name
      getStorage: () => (typeof window !== "undefined" ? localStorage : null), // use localStorage in the browser
      blacklist: ["selectedProducts"],
    }
  )
);

export default useCartStore;
