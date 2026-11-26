import Link from "next/link";
import type { Product } from "../lib/types";

function toBanglaNumber(value: number | string) {
  const map: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    ".": ".",
  };
  return String(value).replace(/[0-9.]/g, (ch) => map[ch] ?? ch);
}

export default function ProductCard({ product }: { product: Product }) {
  const pct = Number(product.change?.pct ?? 0);
  const isUp = pct > 0;
  const isDown = pct < 0;
  const pctText = toBanglaNumber(Math.abs(pct).toFixed(1));

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-3xl">{product.image || product.categoryIcon}</div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="mt-1 text-sm text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-2xl font-bold text-gray-900">
            {toBanglaNumber(product.today)}{" "}
            <span className="text-sm font-medium text-gray-500">টাকা</span>
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
            {isUp ? "▲" : isDown ? "▼" : "—"} {pctText}%
          </span>
        </div>
      </div>
    </Link>
  );
}
