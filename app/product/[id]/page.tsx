import { getProductById } from "../../lib/api";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);
  const pct = product.change.pct;
  const isUp = pct > 0;
  const isDown = pct < 0;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="text-5xl">{product.image || product.categoryIcon}</div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
          <p className="mt-2 text-gray-500">
            ক্যাটাগরি: {product.categoryNameBn}
          </p>

          <p className="mt-4 text-2xl font-bold text-green-700">
            {product.today} টাকা/{product.unit}
          </p>

          <p
            className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              isUp
                ? "bg-red-50 text-red-500"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(pct)}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">গতকাল</p>
          <p className="mt-1 text-xl font-semibold">{product.yesterday} টাকা</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">গত সপ্তাহ</p>
          <p className="mt-1 text-xl font-semibold">{product.lastWeek} টাকা</p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">গত মাস</p>
          <p className="mt-1 text-xl font-semibold">{product.lastMonth} টাকা</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          বিভিন্ন বাজারের দর
        </h2>
        <div className="grid gap-3">
          {product.markets.map((market, index) => (
            <div
              key={`${market.market}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{market.market}</p>
                <p className="text-sm text-gray-500">{market.division}</p>
              </div>
              <p className="font-medium text-gray-700">
                {market.min} - {market.max} টাকা
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
