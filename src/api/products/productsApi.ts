import type {
  DummyJsonProduct,
  DummyJsonProductsResponse,
  DummyJsonCategory,
  Product,
  Category,
} from './productsTypes';
import {
  mapDummyJsonProductToProduct,
  mapDummyJsonCategoryToCategory,
} from './productsMappers';

const BASE_URL = 'https://dummyjson.com/products';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as T;
  return data;
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/category/${encodeURIComponent(category)}`
    : BASE_URL;
  const data = await fetchJson<DummyJsonProductsResponse>(url);
  return data.products.map(mapDummyJsonProductToProduct);
}

export async function fetchProductById(id: number): Promise<Product> {
  const url = `${BASE_URL}/${id}`;
  const dto = await fetchJson<DummyJsonProduct>(url);
  return mapDummyJsonProductToProduct(dto);
}

export async function fetchCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/categories`;
  const list = await fetchJson<DummyJsonCategory[]>(url);
  return list.map(mapDummyJsonCategoryToCategory);
}
