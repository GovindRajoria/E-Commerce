import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigationHeader } from "@/components/navigation-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const { data: isInWishlist } = useQuery<{ isInWishlist: boolean }>({
    queryKey: ["/api/wishlist/check", id],
    enabled: !!id && isAuthenticated,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (cartData: { productId: number; quantity: number; size?: string; color?: string }) => {
      await apiRequest("POST", "/api/cart", cartData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product added to cart!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please sign in",
          description: "You need to sign in to add items to cart",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (isInWishlist?.isInWishlist) {
        await apiRequest("DELETE", `/api/wishlist/${id}`, {});
      } else {
        await apiRequest("POST", "/api/wishlist", { productId: parseInt(id!) });
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: isInWishlist?.isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist/check", id] });
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

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlistMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationHeader />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
            <Button onClick={() => setLocation("/")}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const mainImage = product.images?.[selectedImageIndex] || product.images?.[0] || "";
  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-serif text-3xl font-semibold mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-pink-500">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                disabled={toggleWishlistMutation.isPending}
                className="border-gray-300 hover:border-pink-500"
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isInWishlist?.isInWishlist ? "fill-pink-500 text-pink-500" : "text-gray-400"
                  }`} 
                />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex space-x-2 mb-6">
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

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Size:</h4>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-black text-white" : ""}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Color:</h4>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={selectedColor === color ? "bg-black text-white" : ""}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Quantity:</h4>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (product.stock || 1)}
                >
                  +
                </Button>
              </div>
              {product.stock && (
                <p className="text-sm text-gray-500 mt-1">
                  {product.stock} items in stock
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending || (product.stock || 0) <= 0}
              className="w-full bg-black text-white hover:bg-gray-800 mb-4"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>

            {(product.stock || 0) <= 0 && (
              <p className="text-red-500 text-center">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
