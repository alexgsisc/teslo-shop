//manger cache
export const revalidate = 259200; // 3 days

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";

import { getProductBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { AddtoCart } from "./ui/AddtoCart";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  //const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "Product not found",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "Product not found",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

//const products = initialData.products;

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          className="hidden md:block"
          images={product.images}
          title={product.title}
        />
      </div>
      {/*Product info */}
      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        {/* Stock */}
        <StockLabel slug={product.slug} />

        {/* Precio */}
        <p className="text-lg mb-5">${product.price}</p>

        <AddtoCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
