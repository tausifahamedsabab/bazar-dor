export default function Hero() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        বুধবার, ৯ অক্টোবর, ২০২৬
      </span>

      <div className="mt-5 grid items-center gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের
            সর্বশেষ বাজার দর দেখুন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            সব দর দেখুন
          </a>
        </div>

        <div className="flex justify-center">
          <div className="text-8xl">🧺</div>
        </div>
      </div>
    </section>
  );
}
