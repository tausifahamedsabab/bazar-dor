import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="text-2xl font-bold text-gray-900">পৃষ্ঠা খুঁজে পাওয়া যায়নি</h1>
      <p className="text-gray-600">আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই বা সরানো হয়েছে।</p>
      <Link
        href="/"
        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
