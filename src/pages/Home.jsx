import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, Tag, Heart, ShoppingCart, Check } from "lucide-react";

const sliderImages = [
  "https://i.ibb.co.com/fdNr8h41/wallpaperflare-com-wallpaper-2.jpg",
  "https://i.ibb.co.com/LhhG3SZT/wallpaperflare-com-wallpaper-3.jpg",
  "https://i.ibb.co.com/B5Y1xrG4/wallpaperflare-com-wallpaper-4.jpg",
];

const categories = [
  { 
    name: "Hot Deal", 
    image: "https://i.ibb.co.com/kV1BKc2q/Screenshot-2025-12-24-135227.jpg",
    featured: true 
  },
  { 
    name: "Electronics", 
    image: "https://i.ibb.co.com/bwLcpjs/Screenshot-2025-12-24-135227.jpg"
  },
  { 
    name: "Travel & Vacation", 
    image: "https://i.ibb.co.com/GvgWJqKF/Screenshot-2025-12-24-135615.jpg"
  },
  { 
    name: "Book Stationery", 
    image: "https://i.ibb.co.com/CsTRdJ4r/Screenshot-2025-12-23-174230.jpg"
  },
  { 
    name: "Fashion", 
    image: "https://i.ibb.co.com/tTmqX4KQ/Hanger-Heart-logo-Boutique-logo-design-Boutique-logo-Logo-online-shop.jpg"
  },
  { 
    name: "Sport & Entertainment", 
    image: "https://i.ibb.co.com/27DC1jJz/Hanger-Heart-logo-Boutique-logo-design-Boutique-logo-Logo-online-shop.jpg"
  },
  { 
    name: "Spa & Massage", 
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Real House", 
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Mom & Baby", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Food & Restaurant", 
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "More Categories", 
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
];

// প্রোডাক্ট ডেটা
const productsData = [
  // Fashion & Accessories (4 items)
  {
    id: 1,
    name: "Designer Handbag",
    category: "Fashion",
    price: "$189.99",
    originalPrice: "$279.99",
    discount: "32% OFF",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Luxury", "Premium"],
    type: "fashion"
  },
  {
    id: 2,
    name: "Leather Jacket",
    category: "Fashion",
    price: "$149.99",
    originalPrice: "$229.99",
    discount: "35% OFF",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Best Seller", "New"],
    type: "fashion"
  },
  {
    id: 3,
    name: "Sunglasses",
    category: "Accessories",
    price: "$89.99",
    originalPrice: "$129.99",
    discount: "31% OFF",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Trending", "UV Protection"],
    type: "fashion"
  },
  {
    id: 4,
    name: "Sports Shoes",
    category: "Footwear",
    price: "$79.99",
    originalPrice: "$119.99",
    discount: "33% OFF",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Sport", "Best Price"],
    type: "fashion"
  },
  // Digital & Electronics (8 items)
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$129.99",
    originalPrice: "$199.99",
    discount: "35% OFF",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Best Seller", "Free Shipping"],
    type: "digital"
  },
  {
    id: 6,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: "$299.99",
    originalPrice: "$399.99",
    discount: "25% OFF",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["New", "Limited Stock"],
    type: "digital"
  },
  {
    id: 7,
    name: "Laptop Pro",
    category: "Electronics",
    price: "$1299.99",
    originalPrice: "$1599.99",
    discount: "19% OFF",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["New", "Premium"],
    type: "digital"
  },
  {
    id: 8,
    name: "DSLR Camera",
    category: "Electronics",
    price: "$899.99",
    originalPrice: "$1199.99",
    discount: "25% OFF",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Professional", "Best Seller"],
    type: "digital"
  },
  {
    id: 9,
    name: "Gaming Console",
    category: "Electronics",
    price: "$499.99",
    originalPrice: "$599.99",
    discount: "17% OFF",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Gaming", "Hot Deal"],
    type: "digital"
  },
  {
    id: 10,
    name: "Tablet Pro",
    category: "Electronics",
    price: "$399.99",
    originalPrice: "$499.99",
    discount: "20% OFF",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Portable", "New"],
    type: "digital"
  },
  {
    id: 11,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "$79.99",
    originalPrice: "$99.99",
    discount: "20% OFF",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Wireless", "Best Price"],
    type: "digital"
  },
  {
    id: 12,
    name: "Smartphone X",
    category: "Electronics",
    price: "$799.99",
    originalPrice: "$999.99",
    discount: "20% OFF",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Latest", "Premium"],
    type: "digital"
  },
];

const navbarCategories = [
  { 
    name: "SPA & Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    products: "120+ Products"
  },
  { 
    name: "Health Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    products: "85+ Products"
  },
  { 
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    products: "300+ Products"
  },
  { 
    name: "Beauty Care",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    products: "150+ Products"
  },
  { 
    name: "Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    products: "75+ Products"
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const sliderRef = useRef(null);

  const prevSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const goToSlide = (slideIndex) => {
    setIsTransitioning(true);
    setIndex(slideIndex);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const addToCart = (id) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[id]) {
        newCart[id] += 1;
      } else {
        newCart[id] = 1;
      }
      return newCart;
    });
    
    // Reset to "Add to Cart" after 2 seconds
    setTimeout(() => {
      setCartItems(prev => {
        const newCart = { ...prev };
        return newCart;
      });
    }, 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [index]);

  // প্রোডাক্ট ফিল্টার
  const fashionProducts = productsData.filter(product => product.type === "fashion");
  const digitalProducts = productsData.filter(product => product.type === "digital");
  const featureProducts = productsData; // সব প্রোডাক্ট

  // Product Card Component for reusability
  const ProductCard = ({ product }) => {
    const isInCart = cartItems[product.id] > 0;
    
    return (
      <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.discount}
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
          >
            <Heart 
              className={`w-5 h-5 ${
                favorites.includes(product.id) 
                  ? "fill-red-500 text-red-500" 
                  : "text-gray-600"
              }`} 
            />
          </button>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{product.category}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xl text-gray-900">{product.price}</div>
              <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
            </div>
            <button 
              onClick={() => addToCart(product.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                isInCart 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" 
                  : "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 animate-pulse" />
                  <span className="hidden lg:inline">Added!</span>
                  <span className="lg:hidden">✓</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden lg:inline">Add to Cart</span>
                  <span className="lg:hidden">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - Categories (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                <h2 className="font-bold text-xl text-white flex items-center">
                  <span className="mr-3">📁</span>
                  ALL CATEGORIES
                </h2>
                <p className="text-gray-300 text-sm mt-1">Browse by category</p>
              </div>

              <div className="px-5 py-4 space-y-1">
                {categories.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.featured
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 font-semibold border border-blue-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 flex-shrink-0 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {!item.featured && (
                      <span className="text-gray-400 text-lg">›</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            {/* Hero Slider */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl group" ref={sliderRef}>
              <div className="relative h-[400px] lg:h-[450px] overflow-hidden rounded-2xl">
                {sliderImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      index === i
                        ? "opacity-100 transform translate-x-0"
                        : "opacity-0 transform translate-x-full"
                    }`}
                  />
                ))}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

                {/* Slide Content */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-1.5 rounded-full text-sm font-semibold inline-flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Summer Sale
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Limited Time
                    </div>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    Big Sale Up To <span className="text-blue-300">70% Off</span>
                  </h2>
                  <p className="text-lg mb-8 opacity-90">
                    Discover amazing products at unbelievable prices. Limited time offer!
                  </p>
                  <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center">
                    Shop Now <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {sliderImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === i
                        ? "bg-white w-8"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                  ></button>
                ))}
              </div>

              {/* Slide Counter */}
              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {index + 1} / {sliderImages.length}
              </div>
            </div>

            {/* Featured Categories */}
            <div className="mt-10 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {navbarCategories.map((category, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.products}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fashion & Accessories Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Fashion & Accessories</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fashionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

        
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Digital & Electronics</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  View All <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {digitalProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Feature Items Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Feature Items</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Sorted by:</span>
                    <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Popularity</option>
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    View All <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featureProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;