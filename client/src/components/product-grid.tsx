import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@shared/schema";

export function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<{
    category?: string;
    search?: string;
    new?: boolean;
    sale?: boolean;
  }>({});

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const newFilters: typeof filters = {};
    
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    const isNew = urlParams.get('new');
    const isSale = urlParams.get('sale');
    
    if (category && category !== 'all') newFilters.category = category;
    if (search) newFilters.search = search;
    if (isNew === 'true') newFilters.new = true;
    if (isSale === 'true') newFilters.sale = true;
    
    setFilters(newFilters);
  }, []);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    return params.toString();
  };

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", buildQueryParams()],
  });

  // Apply client-side filters for new/sale items
  const filteredProducts = products.filter(product => {
    if (filters.new && !product.isNew) return false;
    if (filters.sale && !product.isSale) return false;
    return true;
  });

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="px-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-2xl font-semibold">Featured Items</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-2xl font-semibold">
            {filters.search ? `Search Results for "${filters.search}"` : 
             filters.new ? "New Arrivals" :
             filters.sale ? "Sale Items" :
             "Featured Items"}
          </h3>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-black text-white" : "text-gray-600 hover:text-pink-500"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-black text-white" : "text-gray-600 hover:text-pink-500"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            {(filters.search || filters.new || filters.sale || filters.category) && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setFilters({});
                  window.history.pushState({}, '', window.location.pathname);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-2 lg:grid-cols-4 gap-4" 
              : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                layout={viewMode}
              />
            ))}
          </div>
        )}
        
        {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-300 text-gray-800 hover:border-black hover:text-black">
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
