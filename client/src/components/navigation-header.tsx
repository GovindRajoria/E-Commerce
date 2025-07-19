import { useState } from "react";
import { Link } from "wouter";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface NavigationHeaderProps {
  onCartToggle?: () => void;
  onProfileToggle?: () => void;
}

export function NavigationHeader({ onCartToggle, onProfileToggle }: NavigationHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { cartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleCartClick = () => {
    if (onCartToggle) {
      onCartToggle();
    } else {
      // Fallback to global cart toggle
      document.getElementById('cart-toggle')?.click();
    }
  };

  const handleProfileClick = () => {
    if (onProfileToggle) {
      onProfileToggle();
    } else {
      // Fallback to global profile toggle
      document.getElementById('profile-toggle')?.click();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Link href="/">
                <h1 className="font-serif font-bold text-2xl text-black cursor-pointer">Boutique</h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/?category=all" className="text-gray-800 hover:text-pink-500 transition-colors">
                Shop
              </Link>
              <Link href="/?new=true" className="text-gray-800 hover:text-pink-500 transition-colors">
                New Arrivals
              </Link>
              <Link href="/?category=1" className="text-gray-800 hover:text-pink-500 transition-colors">
                Collections
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-pink-500 transition-colors">
                About
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-800 hover:text-pink-500"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleProfileClick}
                className="text-gray-800 hover:text-pink-500"
                id="profile-toggle"
              >
                <User className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartClick}
                className="relative text-gray-800 hover:text-pink-500"
                id="cart-toggle"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </nav>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 rounded-full focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </Button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif font-bold text-xl">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="space-y-6">
                <Link 
                  href="/?category=all" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop All
                </Link>
                <Link 
                  href="/?new=true" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link 
                  href="/?category=1" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dresses
                </Link>
                <Link 
                  href="/?category=2" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tops
                </Link>
                <Link 
                  href="/?category=4" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
                <Link 
                  href="/?sale=true" 
                  className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sale
                </Link>
                <hr className="border-gray-200" />
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleProfileClick();
                      }}
                      className="block text-lg text-gray-800 hover:text-pink-500 transition-colors w-full text-left"
                    >
                      My Account
                    </button>
                    <Link 
                      href="/orders" 
                      className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <Link 
                      href="/wishlist" 
                      className="block text-lg text-gray-800 hover:text-pink-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = "/api/login";
                    }}
                    className="block text-lg text-gray-800 hover:text-pink-500 transition-colors w-full text-left"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
