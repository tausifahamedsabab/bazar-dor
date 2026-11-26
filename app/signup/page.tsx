"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে");
      return;
    }

    toast.success("সফলভাবে রেজিস্ট্রেশন হয়েছে");
    router.push("/signin");
  }

  async function socialLogin(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন করতে সমস্যা হয়েছে");
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">সাইন আপ</h1>
      <p className="mt-1 text-sm text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">নাম</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
            placeholder="আপনার নাম"
          />
        </label>

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
            minLength={8}
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
          {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => socialLogin("google")}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => socialLogin("github")}
          className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-green-700 hover:underline">
          লগইন করুন
        </Link>
      </p>
    </div>
  );
}
