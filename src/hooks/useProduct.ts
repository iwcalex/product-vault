import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import type { Product } from '../api/products';

export function useProduct(productId: number) {
  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: productId > 0,
  });
}
