import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface CategoryBiIdPageProps {
  params: {
    id: Category;
  };
}
const products = initialData.products;
const labels: Record<Category, string> = {
  men: "para hombres",
  women: "para mujeres",
  kid: "para niños",
  unisex: "para todos",
};

export default function CategoryByIdPage({ params }: CategoryBiIdPageProps) {
  const { id } = params;
  const productByCategory = products.filter((product) => product.gender === id);

  if (productByCategory.length === 0) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Articulos ${(labels as any)[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={productByCategory} />
    </>
  );
}
