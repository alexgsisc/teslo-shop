import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  getTotalItems: () => number;
  cartProducts: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  //removeProductToCart: (product: CartProct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cartProducts: [],
       getTotalItems: () => {
         const {cartProducts} = get();
         return cartProducts.reduce((total, item) => total + item.quaity, 0);
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
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
