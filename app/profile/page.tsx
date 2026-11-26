import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md p-6">লোড হচ্ছে...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <div className="mt-6 space-y-3 text-sm">
        <div>
          <p className="text-gray-500">নাম</p>
          <p className="font-medium text-gray-900">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-500">ইমেইল</p>
          <p className="font-medium text-gray-900">{user.email}</p>
        </div>
      </div>

      <Link
        href="/profile/update"
        className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
      >
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
