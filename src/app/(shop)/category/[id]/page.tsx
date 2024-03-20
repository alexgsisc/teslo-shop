import { notFound } from "next/navigation";

interface CategoryBiIdPageProps {
  params: {
    id: string
  }
}

export default function CategoryByIdPage({ params }: CategoryBiIdPageProps) {
  const { id } = params;

  if (id === 'kids') {
    notFound();
  }

  return (
    <div>
      <h1>Hello CategoryById {id}</h1>
    </div>
  );
}