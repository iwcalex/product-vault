import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/products';
import type { Category } from '../api/products';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
