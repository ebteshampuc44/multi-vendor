import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, Tag, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    name: "Fresh Fruits", 
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Vegetables", 
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Dairy & Eggs", 
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Meat & Poultry", 
    image: "https://images.unsplash.com/photo-1603048297172-c6094b697c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Bakery", 
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Beverages", 
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Snacks", 
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Canned Goods", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "Spices & Condiments", 
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  { 
    name: "More Categories", 
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
];

// Top Brands Data
const topBrands = [
  {
    id: 1,
    name: "Sultan's Dine",
    logo: "public/sd.jpg",
    description: "Authentic Bengali cuisine",
    url: "/brand/sultans-dine"
  },
  {
    id: 2,
    name: "Kacchi Bhai",
    logo: "public/kb.png",
    description: "Best Kacchi in town",
    url: "/brand/kacchi-bhai"
  },
  {
    id: 3,
    name: "7 Days Restaurant",
    logo: "public/7days.jpg",
    description: "Open 7 days a week",
    url: "/brand/7days-restaurant"
  },
  {
    id: 4,
    name: "Chillox",
    logo: "public/chillox.png",
    description: "Famous for burgers",
    url: "/brand/chillox"
  },
  {
    id: 5,
    name: "PizzaBurg",
    logo: "public/logo_1727.jpeg",
    description: "Pizza & Burgers",
    url: "/brand/pizzaburg"
  },
  {
    id: 6,
    name: "Kacchi Dine",
    logo: "public/Kacchi_Dine.jpg",
    description: "Fast food chain",
    url: "/brand/kacchi-dine"
  },
  {
    id: 7,
    name: "sadia's kitchen",
    logo: "public/sadia's_kitchen.jpg",
    description: "Popular local brand",
     url: "/brand/sadias-kitchen"  
  },
  {
    id: 8,
    name: "Pizza Hut Bangladesh",
    logo: "Pizza_Hut.png",
    description: "International pizza chain",
    url: "/brand/pizza-hut"
  },
  {
    id: 9,
    name: "Domino's Pizza Bangladesh",
    logo: "Dominos_pizza.png",
    description: "World famous pizza",
    url: "/brand/dominos-pizza"
  },
  {
    id: 10,
    name: "KFC",
    logo: "public/KFC.png",
    description: "Finger lickin' good",
    url: "/brand/kfc"
  }
];

// Top Shops Data
const topShops = [
  {
    id: 1,
    name: "Fruit Zone",
    logo: "public/Fruit_Zone.jpg",
    description: "Premium shopping mall with international brands",
    url: "/shop/Fruit_Zone.jpg"
  },
  {
    id: 2,
    name: "Bengal Meat - Dhali (DCC Market)",
    logo: "public/bengal_meat.png",
    description: "Fresh meat and poultry shop",
    url: "/shop/bengal-meat-dhali"
  },
  {
    id: 3,
    name: "RFL Best Buy Pharma (Kalachandpur)",
    logo: "public/rfl_pharma.jpg",
    description: "Pharmacy and medical supplies",
    url: "/shop/rfl-best-buy-pharma"
  },
  {
    id: 4,
    name: "Unimart - Gulshan 2",
    logo: "public/unimart.jpg",
    description: "Supermarket and grocery store",
    url: "/shop/unimart-gulshan"
  },
  {
    id: 5,
    name: "Amana Big Bazar - Mohakhali",
    logo: "public/amana_big_bazar.jpg",
    description: "Departmental store with variety of products",
    url: "/shop/amana-big-bazar"
  },
  {
    id: 6,
    name: "Agora (RM Center)",
    logo: "public/agora.jpg",
    description: "Retail supermarket chain",
    url: "/shop/agora-rm-center"
  }
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const sliderRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const shopsMarqueeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isShopsHovered, setIsShopsHovered] = useState(false);
  const navigate = useNavigate();

  // লোকাল স্টোরেজ থেকে ডেটা লোড
  useEffect(() => {
    const savedWishlist = localStorage.getItem("shopickWishlist");
    const savedCart = localStorage.getItem("shopickCart");
    
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // লোকাল স্টোরেজে সেভ
  useEffect(() => {
    localStorage.setItem("shopickWishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("shopickCart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

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

  // ব্র্যান্ড ক্লিক হ্যান্ডলার
  const handleBrandClick = (brand) => {
    navigate(brand.url, { state: { brandName: brand.name, brandDescription: brand.description } });
  };

  // শপ ক্লিক হ্যান্ডলার
  const handleShopClick = (shop) => {
    navigate(shop.url, { state: { shopName: shop.name, shopDescription: shop.description } });
  };

  // Brands মার্কুই ড্রাগ ফাংশন
  const handleBrandsMouseDown = (e) => {
    if (!marqueeContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - marqueeContainerRef.current.offsetLeft);
    setScrollLeft(marqueeContainerRef.current.scrollLeft);
    marqueeContainerRef.current.style.cursor = 'grabbing';
    marqueeContainerRef.current.style.userSelect = 'none';
  };

  const handleBrandsMouseMove = (e) => {
    if (!isDragging || !marqueeContainerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - marqueeContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleBrandsMouseUp = () => {
    setIsDragging(false);
    if (marqueeContainerRef.current) {
      marqueeContainerRef.current.style.cursor = 'grab';
      marqueeContainerRef.current.style.removeProperty('user-select');
    }
  };

  // Shops মার্কুই ড্রাগ ফাংশন
  const handleShopsMouseDown = (e) => {
    if (!shopsMarqueeRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - shopsMarqueeRef.current.offsetLeft);
    setScrollLeft(shopsMarqueeRef.current.scrollLeft);
    shopsMarqueeRef.current.style.cursor = 'grabbing';
    shopsMarqueeRef.current.style.userSelect = 'none';
  };

  const handleShopsMouseMove = (e) => {
    if (!isDragging || !shopsMarqueeRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - shopsMarqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    shopsMarqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleShopsMouseUp = () => {
    setIsDragging(false);
    if (shopsMarqueeRef.current) {
      shopsMarqueeRef.current.style.cursor = 'grab';
      shopsMarqueeRef.current.style.removeProperty('user-select');
    }
  };

  // Brands মার্কুই হোভার
  const handleBrandsMouseEnter = () => {
    setIsHovered(true);
    if (marqueeContainerRef.current) {
      marqueeContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleBrandsMouseLeave = () => {
    setIsHovered(false);
    if (marqueeContainerRef.current) {
      marqueeContainerRef.current.style.cursor = 'default';
    }
  };

  // Shops মার্কুই হোভার
  const handleShopsMouseEnter = () => {
    setIsShopsHovered(true);
    if (shopsMarqueeRef.current) {
      shopsMarqueeRef.current.style.cursor = 'grab';
    }
  };

  const handleShopsMouseLeave = () => {
    setIsShopsHovered(false);
    if (shopsMarqueeRef.current) {
      shopsMarqueeRef.current.style.cursor = 'default';
    }
  };

  // Brands মার্কুই হুইল স্ক্রল
  const handleBrandsWheel = (e) => {
    if (!marqueeContainerRef.current) return;
    
    e.preventDefault();
    marqueeContainerRef.current.scrollLeft += e.deltaY;
  };

  // Shops মার্কুই হুইল স্ক্রল
  const handleShopsWheel = (e) => {
    if (!shopsMarqueeRef.current) return;
    
    e.preventDefault();
    shopsMarqueeRef.current.scrollLeft += e.deltaY;
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

  // Brands মার্কুই ইভেন্ট লিসেনার
  useEffect(() => {
    const container = marqueeContainerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleBrandsWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleBrandsWheel);
    };
  }, []);

  // Shops মার্কুই ইভেন্ট লিসেনার
  useEffect(() => {
    const container = shopsMarqueeRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleShopsWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleShopsWheel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <style jsx global>{`
        @keyframes bounce-once-strong {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-once-strong {
          animation: bounce-once-strong 0.5s ease-in-out;
        }
        
        /* মার্কুই কন্টেইনার স্টাইল */
        .marquee-container {
          overflow-x: auto;
          overflow-y: hidden;
          position: relative;
          width: 100%;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .marquee-container::-webkit-scrollbar {
          display: none;
        }
        
        .marquee-content {
          display: flex;
          gap: 1.5rem;
          padding: 0.5rem 0;
          width: max-content;
        }
        
        /* ব্র্যান্ড/শপ কার্ড স্টাইল */
        .brand-card {
          transition: all 0.3s ease;
          flex-shrink: 0;
          width: 260px;
          height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .brand-card:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* প্রথম এবং শেষ কার্ডের জন্য বিশেষ স্পেস */
        .first-card-spacer {
          min-width: 1rem;
          flex-shrink: 0;
        }
        
        .last-card-spacer {
          min-width: 1rem;
          flex-shrink: 0;
        }
        
        /* ড্রাগ ইন্ডিকেটর */
        .drag-indicator {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          height: 4px;
          width: 100px;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .drag-indicator.green {
          background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .drag-indicator.blue {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        
        /* স্ক্রল ইন্ডিকেটর */
        .scroll-indicator {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.2s ease;
          z-index: 20;
        }
        
        .scroll-indicator:hover {
          transform: translateY(-50%) scale(1.1);
          background: white;
        }
        
        .scroll-left {
          left: 0.5rem;
        }
        
        .scroll-right {
          right: 0.5rem;
        }
        
        .scroll-arrow {
          color: #10b981;
          font-weight: bold;
        }
        
        .scroll-arrow.blue {
          color: #3b82f6;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Bar সম্পূর্ণ রিমুভ করা হয়েছে */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - Categories (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-5">
                <h2 className="font-bold text-xl text-white flex items-center">
                  <span className="mr-3">🛒</span>
                  GROCERY CATEGORIES
                </h2>
                <p className="text-gray-200 text-sm mt-1">Browse fresh groceries</p>
              </div>

              <div className="px-5 py-4 space-y-1">
                {categories.map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      item.featured
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border border-green-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
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
            
            {/* Wishlist Preview */}
            {wishlist.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5" fill="white" />
                    My Wishlist ({wishlist.length})
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {wishlist.slice(0, 3).map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{item.name}</div>
                          <div className="text-xs text-gray-500">${item.price.toFixed(2)}</div>
                        </div>
                        <button
                          onClick={() => navigate('/cart')}
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded transition-colors"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                  {wishlist.length > 3 && (
                    <button
                      onClick={() => navigate('/wishlist')}
                      className="w-full mt-3 text-center text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      View All {wishlist.length} Items →
                    </button>
                  )}
                </div>
              </div>
            )}
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

                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

                <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-5 py-1.5 rounded-full text-sm font-semibold inline-flex items-center animate-bounce-once-strong">
                      <Tag className="w-4 h-4 mr-2" />
                      Fresh Grocery Sale
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Daily Fresh
                    </div>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    Fresh Groceries <span className="text-green-300 animate-pulse">30% Off</span>
                  </h2>
                  <p className="text-lg mb-8 opacity-90">
                    Get fresh fruits, vegetables, dairy and more at amazing prices. Daily delivery available!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => navigate('/cart')}
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center"
                    >
                      View Cart <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => navigate('/wishlist')}
                      className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 flex items-center"
                    >
                      View Wishlist <Heart className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

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

              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {index + 1} / {sliderImages.length}
              </div>
            </div>

            {/* Top Brands Section */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Brands</h2>
                <button 
                  onClick={() => navigate('/brands')}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center transition-all duration-300 hover:scale-105 group"
                >
                  View All Brands <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="relative">
                {/* স্ক্রল ইন্ডিকেটর বাটন */}
                <div 
                  className="scroll-indicator scroll-left"
                  style={{ opacity: isHovered ? 1 : 0 }}
                  onClick={() => {
                    if (marqueeContainerRef.current) {
                      marqueeContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="scroll-arrow">←</span>
                </div>
                
                <div 
                  className="scroll-indicator scroll-right"
                  style={{ opacity: isHovered ? 1 : 0 }}
                  onClick={() => {
                    if (marqueeContainerRef.current) {
                      marqueeContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="scroll-arrow">→</span>
                </div>
                
                {/* ড্রাগ ইন্ডিকেটর */}
                <div className="drag-indicator green" style={{ opacity: isHovered ? 0.8 : 0 }}></div>
                
                {/* ড্রাগযোগ্য মার্কুই কন্টেইনার */}
                <div
                  ref={marqueeContainerRef}
                  className="marquee-container"
                  onMouseDown={handleBrandsMouseDown}
                  onMouseMove={handleBrandsMouseMove}
                  onMouseUp={handleBrandsMouseUp}
                  onMouseLeave={() => {
                    handleBrandsMouseUp();
                    handleBrandsMouseLeave();
                  }}
                  onMouseEnter={handleBrandsMouseEnter}
                >
                  <div className="marquee-content">
                    <div className="first-card-spacer"></div>
                    
                    {topBrands.map((brand) => (
                      <div
                        key={brand.id}
                        onClick={() => handleBrandClick(brand)}
                        className="brand-card bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-white p-4 flex items-center justify-center">
                          <img 
                            src={brand.logo} 
                            alt={brand.name}
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="text-center flex-grow flex flex-col justify-center">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors duration-300 mb-2">
                            {brand.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{brand.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="last-card-spacer"></div>
                  </div>
                </div>
              </div>
              
              {/* ব্র্যান্ড স্ট্যাটাস বার */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-green-800 text-lg">Premium Brand Partners</h3>
                    <p className="text-sm text-green-600">
                      {isHovered 
                        ? "Drag left/right or use arrows to scroll • Click on any brand to explore" 
                        : "Click on any brand to explore their products"
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-green-700 text-xl">{topBrands.length}</div>
                      <div className="text-xs text-green-600">Brands</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-700 text-xl">500+</div>
                      <div className="text-xs text-green-600">Food Items</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Shops Section */}
            <div className="mt-12 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Shops</h2>
                <button 
                  onClick={() => navigate('/shops')}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-all duration-300 hover:scale-105 group"
                >
                  View All Shops <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="relative">
                {/* স্ক্রল ইন্ডিকেটর বাটন */}
                <div 
                  className="scroll-indicator scroll-left"
                  style={{ opacity: isShopsHovered ? 1 : 0 }}
                  onClick={() => {
                    if (shopsMarqueeRef.current) {
                      shopsMarqueeRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="scroll-arrow blue">←</span>
                </div>
                
                <div 
                  className="scroll-indicator scroll-right"
                  style={{ opacity: isShopsHovered ? 1 : 0 }}
                  onClick={() => {
                    if (shopsMarqueeRef.current) {
                      shopsMarqueeRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="scroll-arrow blue">→</span>
                </div>
                
                {/* ড্রাগ ইন্ডিকেটর */}
                <div className="drag-indicator blue" style={{ opacity: isShopsHovered ? 0.8 : 0 }}></div>
                
                {/* ড্রাগযোগ্য মার্কুই কন্টেইনার */}
                <div
                  ref={shopsMarqueeRef}
                  className="marquee-container"
                  onMouseDown={handleShopsMouseDown}
                  onMouseMove={handleShopsMouseMove}
                  onMouseUp={handleShopsMouseUp}
                  onMouseLeave={() => {
                    handleShopsMouseUp();
                    handleShopsMouseLeave();
                  }}
                  onMouseEnter={handleShopsMouseEnter}
                >
                  <div className="marquee-content">
                    <div className="first-card-spacer"></div>
                    
                    {topShops.map((shop) => (
                      <div
                        key={shop.id}
                        onClick={() => handleShopClick(shop)}
                        className="brand-card bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-white p-4 flex items-center justify-center">
                          <img 
                            src={shop.logo} 
                            alt={shop.name}
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                        <div className="text-center flex-grow flex flex-col justify-center">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 mb-2">
                            {shop.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{shop.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="last-card-spacer"></div>
                  </div>
                </div>
              </div>
              
              {/* শপ স্ট্যাটাস বার */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-blue-800 text-lg">Premium Shopping Partners</h3>
                    <p className="text-sm text-blue-600">
                      {isShopsHovered 
                        ? "Drag left/right or use arrows to scroll • Click on any shop to explore" 
                        : "Click on any shop to explore their products and services"
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold text-blue-700 text-xl">{topShops.length}</div>
                      <div className="text-xs text-blue-600">Shops</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-700 text-xl">1000+</div>
                      <div className="text-xs text-blue-600">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-700 text-xl">24/7</div>
                      <div className="text-xs text-blue-600">Service</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;