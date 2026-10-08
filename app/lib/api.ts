import type { Category, Product } from "./types";

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in .env.local");
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/api/bazardor/categories");
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch<Product[]>(`/api/bazardor/products${query}`);
}

export async function getProductById(id: string): Promise<Product> {
  return apiFetch<Product>(`/api/bazardor/products/${encodeURIComponent(id)}`);
}
