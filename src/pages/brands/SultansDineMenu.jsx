// SultansDineMenu.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star, Clock, MapPin, ChevronRight, ChefHat } from "lucide-react";

const SultansDineMenu = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [quantity, setQuantity] = useState({});

  // লোকাল স্টোরেজ থেকে কার্ট ডেটা লোড
  useEffect(() => {
    const savedCart = localStorage.getItem("shopickCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // লোকাল স্টোরেজে কার্ট সেভ
  useEffect(() => {
    localStorage.setItem("shopickCart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  // মেনু আইটেম ডেটা
  const menuItems = [
    {
      id: 1,
      name: "Kacchi Bashmati Full",
      description: "Authentic Dhakaiya Kacchi with aromatic Bashmati rice",
      price: 850,
      image: "https://i.ibb.co.com/PGt9bVK0/Kacchi-Bashmati-Full.webp",
      category: "kacchi",
      rating: 4.8,
      prepTime: "30-40 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 2,
      name: "Kacchi Bashmati Half",
      description: "Half portion of our signature Kacchi",
      price: 450,
      image: "https://i.ibb.co.com/2YC4Xktp/Kacchi-Bashmati-Half.webp",
      category: "kacchi",
      rating: 4.7,
      prepTime: "25-35 min",
      popular: false,
      spicy: "Medium"
    },
    {
      id: 3,
      name: "Kacchi Platter",
      description: "Complete Kacchi meal with borhani and salad",
      price: 1200,
      image: "https://i.ibb.co.com/xtqc45XV/Kacchi-Platter.webp",
      category: "kacchi",
      rating: 4.9,
      prepTime: "40-50 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 4,
      name: "Plain Polao Platter",
      description: "Fragrant polao with choice of meat",
      price: 650,
      image: "https://i.ibb.co.com/bMMTh4xT/Plain-Polao-Platter.webp",
      category: "polao",
      rating: 4.6,
      prepTime: "20-30 min",
      popular: false,
      spicy: "Mild"
    },
    {
      id: 5,
      name: "Plain Polao Chicken Roast Borhani",
      description: "Combo meal with chicken roast and borhani",
      price: 550,
      image: "https://i.ibb.co.com/FLD5bGzw/Plain-Polao-Chicken-Roast-Borhani.webp",
      category: "combo",
      rating: 4.7,
      prepTime: "25-35 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 6,
      name: "Mutton Tehari",
      description: "Spicy mutton tehari with aromatic rice",
      price: 480,
      image: "https://i.ibb.co.com/s9cKtSz2/Mutton-Tehari.webp",
      category: "tehari",
      rating: 4.5,
      prepTime: "30-40 min",
      popular: false,
      spicy: "Hot"
    },
    {
      id: 7,
      name: "Chicken Roast",
      description: "Tender roasted chicken with spices",
      price: 320,
      image: "https://i.ibb.co.com/4wHK7nL9/Chicken-Roast.webp",
      category: "roast",
      rating: 4.4,
      prepTime: "20-25 min",
      popular: false,
      spicy: "Medium"
    },
    {
      id: 8,
      name: "Beef Rezala",
      description: "Creamy beef rezala in rich gravy",
      price: 380,
      image: "https://i.ibb.co.com/KzS5wqpG/Beef-Rezala.webp",
      category: "beef",
      rating: 4.6,
      prepTime: "35-45 min",
      popular: true,
      spicy: "Mild"
    },
    {
      id: 9,
      name: "Plain Polao",
      description: "Simple fragrant polao rice",
      price: 150,
      image: "https://i.ibb.co.com/WpnpX1hG/Plain-Polao.webp",
      category: "polao",
      rating: 4.2,
      prepTime: "15-20 min",
      popular: false,
      spicy: "Mild"
    },
    {
      id: 10,
      name: "Beef Chap",
      description: "Juicy beef chap kebab",
      price: 280,
      image: "https://i.ibb.co.com/Fb1r7YSN/Beef-Chap.webp",
      category: "kebab",
      rating: 4.7,
      prepTime: "25-30 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 11,
      name: "Jali Kabab",
      description: "Crispy net-style chicken kabab",
      price: 220,
      image: "https://i.ibb.co.com/4ZvpKwvg/Jali-kabab.webp",
      category: "kebab",
      rating: 4.5,
      prepTime: "20-25 min",
      popular: false,
      spicy: "Medium"
    },
    {
      id: 12,
      name: "Beef Chap with Plain Polao Combo",
      description: "Beef chap with polao and salad",
      price: 420,
      image: "https://i.ibb.co.com/3yjW7Yh0/Beef-Chap-with-Plain-Polao-Combo.webp",
      category: "combo",
      rating: 4.8,
      prepTime: "30-35 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 13,
      name: "Chutney",
      description: "Special homemade chutney",
      price: 50,
      image: "https://i.ibb.co.com/23QrLdVR/Chutney.webp",
      category: "sides",
      rating: 4.3,
      prepTime: "5 min",
      popular: false,
      spicy: "Mild"
    },
    {
      id: 14,
      name: "Firni",
      description: "Creamy rice pudding dessert",
      price: 120,
      image: "https://i.ibb.co.com/s9CdXSvt/Firni.webp",
      category: "dessert",
      rating: 4.6,
      prepTime: "10-15 min",
      popular: true,
      spicy: "None"
    },
    {
      id: 15,
      name: "Jorda",
      description: "Sweet saffron rice dessert",
      price: 130,
      image: "https://i.ibb.co.com/vvfXwK1V/Jorda.webp",
      category: "dessert",
      rating: 4.4,
      prepTime: "10-15 min",
      popular: false,
      spicy: "None"
    },
    {
      id: 16,
      name: "Borhani",
      description: "Traditional spicy yogurt drink",
      price: 80,
      image: "https://i.ibb.co.com/HDW14ywM/Borhani.webp",
      category: "drinks",
      rating: 4.7,
      prepTime: "5 min",
      popular: true,
      spicy: "Medium"
    },
    {
      id: 17,
      name: "Soft Drinks",
      description: "Various cold soft drinks",
      price: 40,
      image: "https://i.ibb.co.com/KjKZQZSH/Soft-Drinks.webp",
      category: "drinks",
      rating: 4.0,
      prepTime: "2 min",
      popular: false,
      spicy: "None"
    },
    {
      id: 18,
      name: "Water",
      description: "Mineral water",
      price: 20,
      image: "https://i.ibb.co.com/d0gxYfHf/Water.webp",
      category: "drinks",
      rating: 4.1,
      prepTime: "1 min",
      popular: false,
      spicy: "None"
    },
    {
      id: 19,
      name: "Zafrani Sorbot",
      description: "Refreshing saffron sherbet",
      price: 110,
      image: "https://i.ibb.co.com/Y7XsZwBs/Zafrani-Sorbot.webp",
      category: "drinks",
      rating: 4.5,
      prepTime: "5 min",
      popular: true,
      spicy: "None"
    },
    {
      id: 20,
      name: "Chicken Dum Biryani",
      description: "Aromatic chicken biryani cooked in dum style",
      price: 380,
      image: "https://i.ibb.co.com/hRhVLf1V/Chicken-Dum-Biryani.webp",
      category: "biryani",
      rating: 4.8,
      prepTime: "35-45 min",
      popular: true,
      spicy: "Medium"
    }
  ];

  // ক্যাটেগরি ডেটা
  const categories = [
    { id: "all", name: "All Items", count: menuItems.length },
    { id: "kacchi", name: "Kacchi", count: menuItems.filter(item => item.category === "kacchi").length },
    { id: "biryani", name: "Biryani", count: menuItems.filter(item => item.category === "biryani").length },
    { id: "polao", name: "Polao", count: menuItems.filter(item => item.category === "polao").length },
    { id: "tehari", name: "Tehari", count: menuItems.filter(item => item.category === "tehari").length },
    { id: "kebab", name: "Kabab", count: menuItems.filter(item => item.category === "kebab").length },
    { id: "combo", name: "Combo Meals", count: menuItems.filter(item => item.category === "combo").length },
    { id: "roast", name: "Roast", count: menuItems.filter(item => item.category === "roast").length },
    { id: "beef", name: "Beef", count: menuItems.filter(item => item.category === "beef").length },
    { id: "dessert", name: "Desserts", count: menuItems.filter(item => item.category === "dessert").length },
    { id: "drinks", name: "Drinks", count: menuItems.filter(item => item.category === "drinks").length },
    { id: "sides", name: "Sides", count: menuItems.filter(item => item.category === "sides").length }
  ];

  // ফিল্টার করা মেনু আইটেম
  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Add to Cart ফাংশন
  const addToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      restaurant: "Sultan's Dine",
      quantity: quantity[item.id] || 1,
      maxQuantity: 10,
      restaurantId: 1, // Sultan's Dine ID
      deliveryTime: "45-55 min",
      location: "Gulshan, Dhanmondi, Uttara",
      description: item.description
    };
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(
            updatedItems[existingItemIndex].quantity + (quantity[item.id] || 1),
            updatedItems[existingItemIndex].maxQuantity
          )
        };
        return updatedItems;
      } else {
        return [...prev, cartItem];
      }
    });
    
    // রেসেট quantity
    setQuantity(prev => ({ ...prev, [item.id]: 1 }));
    
    alert(`${item.name} added to cart!`);
  };

  // Quantity পরিবর্তন
  const handleQuantityChange = (itemId, value) => {
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 10) {
      setQuantity(prev => ({ ...prev, [itemId]: numValue }));
    }
  };

  // View Cart ফাংশন
  const viewCart = () => {
    navigate('/cart');
  };

  // রেস্টুরেন্ট ডিটেইল
  const restaurantInfo = {
    name: "Sultan's Dine",
    rating: 4.7,
    deliveryTime: "45-55 min",
    minOrder: 300,
    deliveryFee: 60,
    locations: ["Gulshan", "Dhanmondi", "Uttara", "Banani"],
    cuisine: ["Bengali", "Mughlai", "Biryani", "Kacchi"],
    openingHours: "11:00 AM - 11:00 PM"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .menu-item-card {
          transition: all 0.3s ease;
        }
        
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .category-btn.active {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        
        .spicy-indicator.hot {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }
        
        .spicy-indicator.medium {
          background: linear-gradient(135deg, #ea580c, #c2410c);
        }
        
        .spicy-indicator.mild {
          background: linear-gradient(135deg, #d97706, #b45309);
        }
        
        .spicy-indicator.none {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        /* স্ক্রলবার স্টাইল */
        .categories-scroll::-webkit-scrollbar {
          height: 6px;
        }
        
        .categories-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .categories-scroll::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
        
        .categories-scroll::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-amber-700/30 p-2 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="hidden sm:inline font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">Sultan's Dine</h1>
              <p className="text-sm opacity-90">Authentic Bengali & Mughlai Cuisine</p>
            </div>
            
            <button
              onClick={viewCart}
              className="relative flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors"
            >
              <ShoppingCart size={22} />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 mb-8 fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-amber-100">
                  <img 
                    src="https://i.postimg.cc/kXBXmy7x/sd.jpg" 
                    alt="Sultan's Dine Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sultan's Dine</h2>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{restaurantInfo.rating}</span>
                      <span className="text-gray-500 text-sm">(500+ ratings)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>{restaurantInfo.deliveryTime}</span>
                    </div>
                    <div className="text-gray-500">
                      Min Order: ৳{restaurantInfo.minOrder}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Cuisine</div>
                  <div className="font-medium">{restaurantInfo.cuisine.join(", ")}</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Locations</div>
                  <div className="font-medium">{restaurantInfo.locations.join(", ")}</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Opening Hours</div>
                  <div className="font-medium">{restaurantInfo.openingHours}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-4 border border-amber-200">
              <div className="text-center">
                <ChefHat className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-amber-800">Special Offer</div>
                <div className="text-sm text-amber-700">10% OFF on first order</div>
                <div className="text-xs text-gray-600 mt-1">Use code: SULTAN10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Menu Categories</h3>
            <div className="text-sm text-gray-500">
              {filteredItems.length} items
            </div>
          </div>
          
          <div className="categories-scroll overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeCategory === category.id 
                      ? 'active text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.id 
                      ? 'bg-white/30' 
                      : 'bg-gray-300'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="menu-item-card bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Item Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                </div>
                
                {/* Spicy Indicator */}
                <div className={`absolute bottom-3 left-3 spicy-indicator ${item.spicy.toLowerCase()} text-white px-2 py-1 rounded-md text-xs font-medium`}>
                  {item.spicy} Spicy
                </div>
              </div>
              
              {/* Item Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <div className="text-amber-600 font-bold text-lg">৳{item.price}</div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="capitalize">{item.category}</div>
                </div>
                
                {/* Quantity Selector and Add to Cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantity[item.id] || 1) - 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      disabled={(quantity[item.id] || 1) <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity[item.id] || 1}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-12 text-center outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, (quantity[item.id] || 1) + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      disabled={(quantity[item.id] || 1) >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try selecting a different category</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              View All Menu Items
            </button>
          </div>
        )}

        {/* Cart Summary Footer (Mobile Only) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-2xl z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="text-sm text-gray-600">Total in Cart</div>
                <div className="text-xl font-bold text-amber-600">
                  ৳{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </div>
              </div>
              <button
                onClick={viewCart}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                View Cart ({cartItems.length})
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Cart Button (Desktop Only) */}
        <div className="hidden lg:block fixed bottom-8 right-8 z-40">
          <button
            onClick={viewCart}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart ({cartItems.length})
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SultansDineMenu;