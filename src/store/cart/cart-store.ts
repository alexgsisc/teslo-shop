import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  getTotalItems: () => number;
  cartProducts: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductToCart: (product: CartProduct) => void;
  getDataSummary: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
  };
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cartProducts: [],
      getTotalItems: () => {
        const { cartProducts } = get();
        return cartProducts.reduce((total, item) => total + item.quaity, 0);
      },
      getDataSummary: () => {
        const { cartProducts } = get();
        const subTotal = cartProducts.reduce(
          (subtotal, item) => (item.price * item.quaity) + subtotal
          , 0);

        const tax = subTotal * 0.16;
        const total = subTotal + tax;
        const totalItems = get().getTotalItems();
        return { subTotal, tax, total, totalItems };
      },
      //methods
      addProductToCart: (product: CartProduct) => {
        const { cartProducts } = get();
        //1. validate if the product with size selected is already in the cart
        const productInCart = cartProducts.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cartProducts: [...cartProducts, product] });
          return;
        }
        //2. exist product in cart by size, change quantity
        const updatedCartProducts = cartProducts.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quaity: item.quaity + product.quaity };
          }
          return item;
        });
        set({ cartProducts: updatedCartProducts });
      },
      updateProductQuantity(product: CartProduct, quantity: number) {
        const { cartProducts } = get();
        const updatedCartProducts = cartProducts.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quaity: quantity };
          }
          return item;
        });
        set({ cartProducts: updatedCartProducts });
      },
      removeProductToCart: (product: CartProduct) => {
        const { cartProducts } = get();
        const productCart = cartProducts.filter(
          (item) => (item.id !== product.id || item.size !== product.size)
        )
        set({ cartProducts: productCart });
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
