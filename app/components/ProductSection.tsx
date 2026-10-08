import ProductCard from "./ProductCard";
import type { Product } from "../lib/types";

export default function ProductSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl font-bold text-gray-900">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
