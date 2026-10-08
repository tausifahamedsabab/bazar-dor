"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "../lib/types";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm">
      <Link
        href="/"
        className={
          pathname === "/"
            ? "font-semibold text-green-700"
            : "text-gray-600 hover:text-green-700"
        }
      >
        হোম
      </Link>

      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={c.id}
            href={href}
            className={
              isActive
                ? "font-semibold text-green-700"
                : "text-gray-600 hover:text-green-700"
            }
          >
            <span className="mr-1">{c.icon}</span>
            {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
