import { Suspense } from "react";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import { getProducts } from "./lib/api";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<HomeProductsFallback />}>
        <HomeProducts />
      </Suspense>
    </>
  );
}

async function HomeProducts() {
  const products = await getProducts();

  const upProducts = products.filter((p) => (p.change?.pct ?? 0) > 0).slice(0, 6);
  const downProducts = products.filter((p) => (p.change?.pct ?? 0) < 0).slice(0, 6);
  const allProducts = products.slice(0, 33);

  return (
    <>
      <ProductSection
        title="আজ দাম বেড়েছে ▲"
        subtitle={`মোট ${upProducts.length}টি পণ্য`}
        products={upProducts}
      />
      <ProductSection
        title="আজ দাম কমেছে ▼"
        subtitle={`মোট ${downProducts.length}টি পণ্য`}
        products={downProducts}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${allProducts.length}টি পণ্য`}
        products={allProducts}
      />
    </>
  );
}

function HomeProductsFallback() {
  return (
    <div className="mt-10 space-y-10">
      {Array.from({ length: 3 }).map((_, section) => (
        <section key={section} className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
