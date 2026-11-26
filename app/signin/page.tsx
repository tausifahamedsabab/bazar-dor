"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md p-6">লোড হচ্ছে...</div>}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const notified = useRef(false);

  useEffect(() => {
    if (callbackUrl !== "/" && !notified.current) {
      notified.current = true;
      toast.error("এই পেজ দেখতে আগে লগইন করুন");
    }
  }, [callbackUrl]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "লগইন করতে সমস্যা হয়েছে");
      return;
    }

    toast.success("সফলভাবে লগইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  async function socialLogin(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: callbackUrl,
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করতে সমস্যা হয়েছে");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mt-1 text-sm text-gray-600">আপনার অ্যাকাউন্টে লগইন করুন</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">ইমেইল</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">পাসওয়ার্ড</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "লগইন হচ্ছে..." : "লগইন"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => socialLogin("google")}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Google দিয়ে লগইন করুন
        </button>
        <button
          type="button"
          onClick={() => socialLogin("github")}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          GitHub দিয়ে লগইন করুন
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-green-700 hover:underline">
          রেজিস্টার করুন
        </Link>
      </p>
    </div>
  );
}
