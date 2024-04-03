"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useState } from "react";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isErrorSize, setErrorSize] = useState(false);

  const addToCart = () => {
    if (!size) {
      setErrorSize(true);
      return;
    } else {
      setErrorSize(false);
    }
    //Todo add product to cart
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quaity: quantity,
      size: size,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    // action after add product to cart
    setSize(undefined);
    setQuantity(1);
    setErrorSize(false);
  };

  return (
    <>
      {isErrorSize && (
        <span className="mt-2 text-red-500 fade-in">
          Debes seleccionar una talla
        </span>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeSelect={(size) => setSize(size)}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={(quantity) => setQuantity(quantity)}
      />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
