import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import CategorySort from "@/app/components/CategorySort";
import { getCategories, getProductsByCategory } from "@/app/lib/api";
import type { Product } from "@/app/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default function CategoryPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

function sortProducts(products: Product[], sort?: string) {
  const items = [...products];
  if (sort === "price-asc") {
    items.sort((a, b) => (a.today ?? 0) - (b.today ?? 0));
  } else if (sort === "price-desc") {
    items.sort((a, b) => (b.today ?? 0) - (a.today ?? 0));
  }
  return items;
}

async function CategoryContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find((c) => c.slug === slug || c.id === slug);

  if (!category && products.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-6xl">🔍</p>
        <h1 className="text-2xl font-bold text-gray-900">ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="text-gray-600">এই ক্যাটাগরিতে কোনো পণ্য নেই বা ক্যাটাগরিটি সঠিক নয়।</p>
        <Link
          href="/"
          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const sorted = sortProducts(products, sort);
  const title = category ? `${category.icon} ${category.nameBn}` : slug;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <CategorySort current={sort ?? "default"} />
      </div>

      {sorted.length === 0 ? (
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-5xl">📦</p>
          <h2 className="text-xl font-bold text-gray-900">কোনো পণ্য পাওয়া যায়নি</h2>
          <Link
            href="/"
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function CategoryFallback() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </section>
  );
}
