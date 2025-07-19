export function InstagramFeed() {
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
      alt: "Fashion flatlay"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
      alt: "Model in boutique outfit"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
      alt: "Boutique styling session"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
      alt: "Jewelry and accessories"
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="px-4">
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl font-semibold mb-2">Follow Us @boutique</h3>
          <p className="text-gray-600">Get inspired by our community</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {instagramPosts.map((post) => (
            <div key={post.id} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <a
            href="https://instagram.com/boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-pink-500 hover:text-pink-600 font-medium"
          >
            <i className="fab fa-instagram text-xl"></i>
            <span>Follow us on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
