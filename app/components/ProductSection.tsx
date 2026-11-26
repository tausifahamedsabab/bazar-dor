import ProductCard from "./ProductCard";
import type { Product } from "../lib/types";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
};

export default function ProductSection({ id, title, subtitle, products }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section id={id} className="mt-10 scroll-mt-28">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
      </div>

      {safeProducts.length === 0 ? (
        <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {safeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
