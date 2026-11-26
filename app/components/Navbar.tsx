import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import BanglaDate from "./BanglaDate";
import AuthNav from "./AuthNav";
import { getCategories, getProducts } from "../lib/api";

export default async function Navbar() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
              🛒
            </div>
            <div>
              <Link href="/" className="text-lg font-extrabold text-gray-900">
                বাজার দর
              </Link>
              <BanglaDate />
            </div>
          </div>

          <div className="flex-1 md:px-6">
            <CategoryNav categories={categories} />
          </div>

          <AuthNav />
        </div>
      </div>

      <PriceTicker products={products.slice(0, 10)} />
    </header>
  );
}
