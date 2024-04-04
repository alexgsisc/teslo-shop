"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";

export const ProductsInCart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cartProducts);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex mb-5 bg-red-200 border-gray-800 rounded-lg"
        >
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quaity}
              onQuantityChanged={(value) => updateProductQuantity(product, value)}
            />

            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
