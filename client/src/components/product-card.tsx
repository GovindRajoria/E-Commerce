import { useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  const { data: isInWishlist } = useQuery<{ isInWishlist: boolean }>({
    queryKey: ["/api/wishlist/check", product.id],
    enabled: isAuthenticated,
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (isInWishlist?.isInWishlist) {
        await apiRequest("DELETE", `/api/wishlist/${product.id}`, {});
      } else {
        await apiRequest("POST", "/api/wishlist", { productId: product.id });
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: isInWishlist?.isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist/check", product.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please sign in",
          description: "You need to sign in to manage your wishlist",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    },
  });

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistMutation.mutate();
  };

  const mainImage = product.images?.[0] || "";
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);

  if (layout === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Badges */}
            <div className="absolute top-1 left-1 space-y-1">
              {product.isNew && (
                <span className="bg-pink-500 text-white px-1 py-0.5 text-xs rounded">New</span>
              )}
              {product.isSale && (
                <span className="bg-red-500 text-white px-1 py-0.5 text-xs rounded">Sale</span>
              )}
              {product.isLimited && (
                <span className="bg-green-500 text-white px-1 py-0.5 text-xs rounded">Limited</span>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 hover:text-pink-500 transition-colors truncate">
              {product.name}
            </h4>
            <p className="text-sm text-gray-600 mt-1">Boutique Collection</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="font-semibold text-lg text-pink-500">${product.price}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleWishlistClick}
            disabled={toggleWishlistMutation.isPending}
            className="flex-shrink-0 border-gray-300 hover:border-pink-500"
          >
            <Heart 
              className={`w-4 h-4 ${
                isInWishlist?.isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-400"
              }`} 
            />
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleWishlistClick}
            disabled={toggleWishlistMutation.isPending}
            className={`absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
          >
            <Heart 
              className={`w-4 h-4 ${
                isInWishlist?.isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-400 hover:text-pink-500"
              }`} 
            />
          </Button>
          
          {/* Badges */}
          <div className="absolute bottom-3 left-3 space-y-1">
            {product.isNew && (
              <span className="bg-pink-500 text-white px-2 py-1 text-xs rounded">New</span>
            )}
            {product.isSale && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">Sale</span>
            )}
            {product.isLimited && (
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">Limited</span>
            )}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
            {product.name}
          </h4>
          <p className="text-sm text-gray-600 mt-1">Boutique Collection</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="font-semibold text-lg text-pink-500">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
