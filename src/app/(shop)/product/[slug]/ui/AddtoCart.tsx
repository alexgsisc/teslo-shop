"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import React, { useState } from "react";

interface Props {
  product: Product;
}
export const AddtoCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isErrorSize, setErrorSize] = useState(false);

  const addProductToCart = () => {
    if (!size) {
      setErrorSize(true);
      return;
    } else {
      setErrorSize(false);
    }
    console.log({ size, quantity });
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
      <button onClick={addProductToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
