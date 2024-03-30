export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";

import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginateProductsWithImages({ page });
  if (products.length === 0) {
    redirect("/");
  }
  console.log(currentPage, totalPages);

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
