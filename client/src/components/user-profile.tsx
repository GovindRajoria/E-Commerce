import { useState } from "react";
import { X, Package, Heart, MapPin, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Make profile globally accessible
  useState(() => {
    const profileToggle = document.getElementById('profile-toggle');
    if (profileToggle) {
      profileToggle.onclick = () => setIsOpen(true);
    }
  });

  const handleSignOut = () => {
    toast({
      title: "Signing out...",
      description: "You will be redirected to the login page",
    });
    setTimeout(() => {
      window.location.href = "/api/logout";
    }, 1000);
  };

  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">My Account</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isAuthenticated && user ? (
              <>
                {/* User Info */}
                <div className="text-center mb-6">
                  <img
                    src={user.profileImageUrl || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-semibold text-lg">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.email?.split('@')[0] || 'User'
                    }
                  </h4>
                  {user.email && (
                    <p className="text-gray-600">{user.email}</p>
                  )}
                </div>
                
                {/* Navigation Menu */}
                <nav className="space-y-4">
                  <Link href="/orders">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                    >
                      <Package className="h-5 w-5 text-gray-600" />
                      <span>Order History</span>
                    </button>
                  </Link>
                  
                  <Link href="/wishlist">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                      <span>Wishlist</span>
                    </button>
                  </Link>
                  
                  <button className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <span>Addresses</span>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>Payment Methods</span>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full text-left">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span>Settings</span>
                  </button>
                </nav>
              </>
            ) : (
              /* Not authenticated */
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                  <LogOut className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Welcome to Boutique</h4>
                <p className="text-gray-600 mb-6">Sign in to access your account, orders, and wishlist.</p>
                <Button 
                  onClick={handleSignIn}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {isAuthenticated && (
            <div className="p-4 border-t">
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
