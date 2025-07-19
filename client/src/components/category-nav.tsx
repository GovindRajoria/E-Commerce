import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { Category } from "@shared/schema";

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const isNew = urlParams.get('new');
    const isSale = urlParams.get('sale');
    
    if (isNew === 'true') {
      setActiveCategory('new');
    } else if (isSale === 'true') {
      setActiveCategory('sale');
    } else if (category) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
  }, []);

  const handleCategoryClick = (categoryKey: string, categoryId?: number) => {
    setActiveCategory(categoryKey);
    
    // Update URL
    const url = new URL(window.location.href);
    url.search = ''; // Clear existing params
    
    if (categoryKey === 'all') {
      // No params needed for "all"
    } else if (categoryKey === 'new') {
      url.searchParams.set('new', 'true');
    } else if (categoryKey === 'sale') {
      url.searchParams.set('sale', 'true');
    } else if (categoryId) {
      url.searchParams.set('category', categoryId.toString());
    }
    
    window.history.pushState({}, '', url.toString());
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('categoryChanged'));
  };

  const categoryButtons = [
    { key: "all", label: "All", onClick: () => handleCategoryClick("all") },
    ...categories.map(cat => ({ 
      key: cat.id.toString(), 
      label: cat.name, 
      onClick: () => handleCategoryClick(cat.id.toString(), cat.id) 
    })),
    { key: "new", label: "New Arrivals", onClick: () => handleCategoryClick("new") },
    { key: "sale", label: "Sale", onClick: () => handleCategoryClick("sale") },
  ];

  return (
    <section className="py-6 border-b border-gray-200">
      <div className="px-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {categoryButtons.map((button) => (
            <Button
              key={button.key}
              variant={activeCategory === button.key ? "default" : "outline"}
              onClick={button.onClick}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === button.key
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
