import ProductSection from "../../components/ProductSection";
import { getProducts } from "../../lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts(slug);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        ক্যাটাগরি: {slug}
      </h1>

      <ProductSection title="এই ক্যাটাগরির পণ্য" products={products} />
    </section>
  );
}
