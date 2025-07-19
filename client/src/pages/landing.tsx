import { HeroSection } from "@/components/hero-section";
import { CategoryNav } from "@/components/category-nav";
import { ProductGrid } from "@/components/product-grid";
import { InstagramFeed } from "@/components/instagram-feed";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const handleLoginClick = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header for landing page */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="font-serif font-bold text-2xl text-black">Boutique</h1>
            <Button 
              onClick={handleLoginClick}
              className="bg-black text-white hover:bg-gray-800"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      <HeroSection />
      <CategoryNav />
      <ProductGrid />
      <InstagramFeed />

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-xl mb-4">Boutique</h3>
              <p className="text-gray-400 mb-4">Curating timeless fashion for the modern woman.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-pinterest text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dresses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bottoms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest collections and exclusive offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded-r hover:bg-pink-600 transition-colors">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Boutique. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
