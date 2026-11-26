import type { Category, Product } from "./types";

const API_BASE_URL = process.env.API_BASE_URL;

type ApiResponse<T> = {
  success?: boolean;
  data?: T;
};

async function apiFetch<T>(endpoint: string, fallback: T): Promise<T> {
  if (!API_BASE_URL) return fallback;

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return fallback;

    const json = (await res.json()) as ApiResponse<T> | T;
    if (json && typeof json === "object" && "data" in (json as any)) {
      return ((json as ApiResponse<T>).data ?? fallback) as T;
    }
    return (json ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/api/bazardor/categories", []);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch<Product[]>(`/api/bazardor/products${query}`, []);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return getProducts(slug);
}

export async function getProductById(id: string | number): Promise<Product | null> {
  return apiFetch<Product | null>(`/api/bazardor/products/${encodeURIComponent(String(id))}`, null);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}
