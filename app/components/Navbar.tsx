import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import BanglaDate from "./BanglaDate";
import { getCategories, getProducts } from "../lib/api";
import Image from "next/image";

const user = {
  name: "Rezwan",
  image: "https://i.pravatar.cc/40?img=12",
};

export default async function Navbar() {
  const categories = await getCategories();
  const products = await getProducts();

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
              <BanglaDate dateString="আজকের সর্বশেষ বাজার দর" />
            </div>
          </div>

          <div className="flex-1 md:px-6">
            <CategoryNav categories={categories} />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2">
            <Image
              src={user.image}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
        </div>
      </div>

      <PriceTicker products={products.slice(0, 10)} />
    </header>
  );
}
