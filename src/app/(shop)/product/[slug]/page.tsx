import { SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const products = initialData.products;

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((product) => product.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/*Slideshow */}
      <div className="col-span-1 md:col-span-2 ">Manager</div>
      {/*Product info */}
      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de Tallas */}

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de Cantidad */}

        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
