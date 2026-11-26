import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { getProductBySlug } from "@/app/lib/api";

type Props = { params: Promise<{ slug: string }> };

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function toBanglaNumber(value: number | string) {
  const map: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
    ".": ".", ",": ",",
  };
  return String(value).replace(/[0-9.,]/g, (ch) => map[ch] ?? ch);
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const markets = Array.isArray(product.markets) ? product.markets : [];
  const prices = markets.flatMap((m) => [m.min, m.max]).filter((n) => typeof n === "number");
  const minPrice = prices.length ? Math.min(...prices) : product.today;
  const maxPrice = prices.length ? Math.max(...prices) : product.today;
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : product.today;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="text-5xl">{product.image || product.categoryIcon}</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-gray-600">
              {product.categoryNameBn} বিভাগের দৈনিক বাজার দর ও মূল্য পরিবর্তন।
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                {product.categoryNameBn}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {product.category}
              </span>
            </div>
            <p className="text-sm text-gray-500">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard label="সর্বনিম্ন দাম" value={`${toBanglaNumber(minPrice)} টাকা`} />
          <SummaryCard label="সর্বোচ্চ দাম" value={`${toBanglaNumber(maxPrice)} টাকা`} />
          <SummaryCard label="গড় দাম" value={`${toBanglaNumber(avgPrice)} টাকা`} />
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length === 0 ? (
          <p className="text-gray-500">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-600">
                  <th className="px-3 py-2 font-medium">বাজার</th>
                  <th className="px-3 py-2 font-medium">বিভাগ</th>
                  <th className="px-3 py-2 font-medium">সর্বনিম্ন</th>
                  <th className="px-3 py-2 font-medium">সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market, index) => (
                  <tr key={`${market.market}-${index}`} className="border-b border-gray-100">
                    <td className="px-3 py-3 font-medium text-gray-900">{market.market}</td>
                    <td className="px-3 py-3 text-gray-600">{market.division}</td>
                    <td className="px-3 py-3 text-gray-700">{toBanglaNumber(market.min)} টাকা</td>
                    <td className="px-3 py-3 text-gray-700">{toBanglaNumber(market.max)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function ProductFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="h-12 w-12 rounded bg-gray-200" />
        <div className="mt-4 h-8 w-64 rounded bg-gray-200" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
      <div className="h-64 rounded-3xl border border-gray-200 bg-white" />
    </div>
  );
}
