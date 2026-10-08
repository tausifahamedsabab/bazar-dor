import type { Product } from "../lib/types";

export default function PriceTicker({ products }: { products: Product[] }) {
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-t border-gray-200 bg-white">
      <div className="flex min-w-max animate-marquee gap-8 py-2">
        {items.map((item, index) => {
          const pct = item.change.pct;
          const isUp = pct > 0;
          const isDown = pct < 0;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-700"
            >
              <span>{item.categoryIcon}</span>
              <span className="font-medium">{item.nameBn}</span>
              <span className="text-gray-500">
                {item.today} টাকা/{item.unit}
              </span>
              <span
                className={`font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
