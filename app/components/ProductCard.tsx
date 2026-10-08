import Link from "next/link";
import type { Product } from "../lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const pct = product.change.pct;
  const isUp = pct > 0;
  const isDown = pct < 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-3xl">
            {product.image || product.categoryIcon}
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.categoryNameBn}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">
            {product.today}{" "}
            <span className="text-sm font-medium text-gray-500">
              টাকা/{product.unit}
            </span>
          </p>

          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              isUp
                ? "bg-red-50 text-red-500"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
