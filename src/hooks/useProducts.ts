import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import type { Product } from '../api/products';

const productsQueryKey = (category?: string) =>
  category ? ['products', category] : ['products'];

export function useProducts(category?: string) {
  return useQuery<Product[]>({
    queryKey: productsQueryKey(category),
    queryFn: () => fetchProducts(category),
  });
}
