/** DummyJSON API response types */

export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

/** App domain types (used by UI / hooks) */

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  thumbnail: string;
  images: string[];
}

export interface Category {
  slug: string;
  name: string;
}
