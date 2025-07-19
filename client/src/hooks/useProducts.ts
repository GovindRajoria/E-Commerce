import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

interface UseProductsOptions {
  category?: string;
  search?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (options.category) params.set('category', options.category);
    if (options.search) params.set('search', options.search);
    return params.toString();
  };

  const queryParams = buildQueryParams();
  
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", queryParams],
  });

  return {
    products,
    isLoading,
    error,
  };
}

export function useProduct(id: string | number) {
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id.toString()],
    enabled: !!id,
  });

  return {
    product,
    isLoading,
    error,
  };
}
