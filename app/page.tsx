import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import { getProducts } from "./lib/api";

export default async function HomePage() {
  const products = await getProducts();

  const upProducts = products.filter((p) => p.change.pct > 0).slice(0, 6);
  const downProducts = products.filter((p) => p.change.pct < 0).slice(0, 6);
  const allProducts = products.slice(0, 9);

  return (
    <>
      <Hero />
      <ProductSection title="🔺 আজ দাম বেড়েছে" products={upProducts} />
      <ProductSection title="🟢 আজ দাম কমেছে" products={downProducts} />
      <ProductSection title="সব পণ্য" products={allProducts} />
    </>
  );
}
