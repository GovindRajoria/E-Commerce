import { Button } from "@/components/ui/button";

export function HeroSection() {
  const handleShopNowClick = () => {
    // Scroll to products section
    const productsSection = document.querySelector('section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen lg:h-96 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-4">New Collection</h2>
        <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
          Discover the latest trends and timeless pieces curated for the modern woman
        </p>
        <Button 
          onClick={handleShopNowClick}
          className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}
