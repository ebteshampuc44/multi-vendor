// PizzaBurgMenu.jsx - Updated with black + and - buttons and mobile navigation
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Clock, ChevronRight, ChefHat, Heart, Menu, Home, User } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PizzaBurgMenu = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [quantity, setQuantity] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  // লোকাল স্টোরেজ থেকে ডেটা লোড
  useEffect(() => {
    const savedCart = localStorage.getItem("shopickCart");
    const savedWishlist = localStorage.getItem("shopickWishlist");
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // লোকাল স্টোরেজে সেভ
  useEffect(() => {
    localStorage.setItem("shopickCart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("shopickWishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  }, [wishlist]);

  // Shopping cart button টোস্ট সহকারে
  const handleViewCartToast = () => {
    if (cartItems.length > 0) {
      toast.info(`🛒 You have ${cartItems.length} items in cart`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
    } else {
      toast.info(`🛒 Your cart is empty`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(75, 85, 99, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
    }
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  // Wishlist button টোস্ট সহকারে
  const handleViewWishlistToast = () => {
    if (wishlist.length > 0) {
      toast.info(`❤️ You have ${wishlist.length} items in wishlist`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(219, 39, 119, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
    } else {
      toast.info(`❤️ Your wishlist is empty`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(75, 85, 99, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
    }
    setTimeout(() => {
      navigate('/wishlist');
    }, 500);
  };

  // মেনু আইটেম ডেটা - PizzaBurg
  const menuItems = [
    {
      id: 1,
      name: "Classic Cheese Burger",
      description: "Juicy beef patty with melted cheese and fresh veggies",
      price: 320,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "burgers",
      rating: 4.7,
      prepTime: "15-20 min"
    },
    {
      id: 2,
      name: "BBQ Bacon Burger",
      description: "Beef patty with crispy bacon and BBQ sauce",
      price: 380,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "burgers",
      rating: 4.8,
      prepTime: "18-23 min"
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce and mozzarella",
      price: 450,
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "pizza",
      rating: 4.6,
      prepTime: "20-25 min"
    },
    {
      id: 4,
      name: "Pepperoni Pizza",
      description: "Pizza with spicy pepperoni and extra cheese",
      price: 550,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "pizza",
      rating: 4.9,
      prepTime: "22-27 min"
    },
    {
      id: 5,
      name: "Chicken Wings",
      description: "Crispy chicken wings with buffalo sauce",
      price: 280,
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "appetizers",
      rating: 4.5,
      prepTime: "12-15 min"
    },
    {
      id: 6,
      name: "French Fries",
      description: "Golden crispy fries with seasoning",
      price: 120,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "sides",
      rating: 4.3,
      prepTime: "8-10 min"
    },
    {
      id: 7,
      name: "Onion Rings",
      description: "Crispy battered onion rings",
      price: 150,
      image: "https://images.unsplash.com/photo-1639024471286-8f2d51f5c21f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "sides",
      rating: 4.4,
      prepTime: "10-12 min"
    },
    {
      id: 8,
      name: "Chicken Burger",
      description: "Grilled chicken burger with mayo",
      price: 300,
      image: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "burgers",
      rating: 4.6,
      prepTime: "16-21 min"
    },
    {
      id: 9,
      name: "Veggie Pizza",
      description: "Pizza loaded with fresh vegetables",
      price: 480,
      image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "pizza",
      rating: 4.5,
      prepTime: "21-26 min"
    },
    {
      id: 10,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter",
      price: 100,
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "appetizers",
      rating: 4.2,
      prepTime: "7-10 min"
    },
    {
      id: 11,
      name: "Chocolate Milkshake",
      description: "Creamy chocolate milkshake",
      price: 180,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "drinks",
      rating: 4.7,
      prepTime: "5-7 min"
    },
    {
      id: 12,
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with toppings",
      price: 200,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "desserts",
      rating: 4.8,
      prepTime: "3-5 min"
    },
    {
      id: 13,
      name: "Double Beef Burger",
      description: "Double beef patty with special sauce",
      price: 450,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "burgers",
      rating: 4.9,
      prepTime: "20-25 min"
    },
    {
      id: 14,
      name: "Mushroom Pizza",
      description: "Pizza with fresh mushrooms and herbs",
      price: 500,
      image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "pizza",
      rating: 4.7,
      prepTime: "23-28 min"
    },
    {
      id: 15,
      name: "Coca Cola",
      description: "Cold Coca Cola 500ml",
      price: 60,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "drinks",
      rating: 4.0,
      prepTime: "2 min"
    }
  ];

  // ক্যাটেগরি ডেটা
  const categories = [
    { id: "all", name: "All Items", count: menuItems.length },
    { id: "burgers", name: "Burgers", count: menuItems.filter(item => item.category === "burgers").length },
    { id: "pizza", name: "Pizza", count: menuItems.filter(item => item.category === "pizza").length },
    { id: "appetizers", name: "Appetizers", count: menuItems.filter(item => item.category === "appetizers").length },
    { id: "sides", name: "Sides", count: menuItems.filter(item => item.category === "sides").length },
    { id: "drinks", name: "Drinks", count: menuItems.filter(item => item.category === "drinks").length },
    { id: "desserts", name: "Desserts", count: menuItems.filter(item => item.category === "desserts").length }
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
      restaurant: "PizzaBurg",
      quantity: quantity[item.id] || 1,
      maxQuantity: 10,
      restaurantId: 6,
      deliveryTime: "25-35 min",
      location: "Gulshan, Dhaka",
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
    
    setQuantity(prev => ({ ...prev, [item.id]: 1 }));
    toast.success(`${item.name} added to cart! 🎉`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: "🛒",
      style: {
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    });
  };

  // Wishlist ফাংশন
  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const existingItemIndex = prev.findIndex(wishItem => wishItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems.splice(existingItemIndex, 1);
        toast.info(`${item.name} removed from wishlist`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
        return updatedItems;
      } else {
        const wishlistItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          restaurant: "PizzaBurg",
          restaurantId: 6
        };
        toast.success(`${item.name} added to wishlist! ❤️`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
        return [...prev, wishlistItem];
      }
    });
  };

  // Increase Quantity
  const increaseQuantity = (itemId) => {
    setQuantity(prev => {
      const currentQty = prev[itemId] || 1;
      return { ...prev, [itemId]: Math.min(currentQty + 1, 10) };
    });
  };

  // Decrease Quantity
  const decreaseQuantity = (itemId) => {
    setQuantity(prev => {
      const currentQty = prev[itemId] || 1;
      return { ...prev, [itemId]: Math.max(currentQty - 1, 1) };
    });
  };

  // রেস্টুরেন্ট ডিটেইল
  const restaurantInfo = {
    name: "PizzaBurg",
    rating: 4.4,
    deliveryTime: "25-35 min",
    minOrder: 200,
    deliveryFee: 50,
    locations: ["Gulshan", "Dhanmondi", "Mirpur"],
    cuisine: ["Pizza", "Burgers", "Fast Food"],
    openingHours: "10:00 AM - 11:00 PM"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pb-20">
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
          background: linear-gradient(135deg, #dc2626, #ef4444);
          color: white;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        /* কালো + এবং - বাটনের স্টাইল */
        .simple-quantity-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #d1d5db;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: bold;
          color: #000000 !important;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .simple-quantity-btn:hover {
          background-color: #f3f4f6;
        }
        
        .simple-quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #f3f4f6;
          color: #9ca3af !important;
        }
        
        .quantity-count {
          font-size: 1.125rem;
          font-weight: bold;
          color: #000000;
          min-width: 20px;
          text-align: center;
        }
        
        /* মোবাইল বটম নেভিগেশন স্টাইল */
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          z-index: 50;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }
        
        .mobile-bottom-nav .nav-buttons {
          display: flex;
          justify-content: space-around;
          width: 100%;
        }
        
        .mobile-bottom-nav .nav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
          position: relative;
        }
        
        .mobile-bottom-nav .nav-btn:hover {
          background-color: #f9fafb;
        }
        
        .mobile-bottom-nav .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #ef4444;
          color: white;
          font-size: 0.75rem;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* মোবাইল জন্য কালো + এবং - */
        @media (max-width: 640px) {
          .simple-quantity-btn {
            width: 32px;
            height: 32px;
            font-size: 1.125rem;
            color: #000000 !important;
          }
          
          .quantity-count {
            font-size: 1rem;
            color: #000000;
          }
        }
        
        /* ট্যাবলেট জন্য কালো + এবং - */
        @media (min-width: 641px) and (max-width: 768px) {
          .simple-quantity-btn {
            width: 34px;
            height: 34px;
            font-size: 1.125rem;
            color: #000000 !important;
          }
          
          .quantity-count {
            font-size: 1.125rem;
            color: #000000;
          }
        }
        
        /* কালো রংয়ের জন্য অতিরিক্ত ক্লাস */
        .text-black-important {
          color: #000000 !important;
        }
        
        /* মোবাইল জন্য বিশেষ স্টাইল */
        @media (max-width: 640px) {
          .restaurant-info-mobile {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .logo-mobile {
            width: 80px;
            height: 80px;
          }
          
          .title-mobile {
            font-size: 1.75rem;
          }
          
          .subtitle-mobile {
            font-size: 0.95rem;
          }
          
          .stats-mobile {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
          
          .stat-item-mobile {
            flex: 1 0 45%;
          }
          
          .info-grid-mobile {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .special-offer-mobile {
            margin-top: 1rem;
            width: 100%;
          }
          
          .category-filter-mobile {
            position: sticky;
            top: 0;
            z-index: 40;
            background: white;
            padding: 0.75rem 0;
          }
          
          .categories-toggle-btn {
            display: flex !important;
          }
          
          .categories-scroll-mobile {
            max-height: ${showCategories ? '200px' : '0'};
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          
          .menu-grid-mobile {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .menu-card-mobile {
            margin: 0.5rem;
          }
          
          .image-container-mobile {
            height: 200px;
          }
          
          .item-details-mobile {
            padding: 1rem;
          }
          
          .item-name-mobile {
            font-size: 1.1rem;
          }
          
          .item-price-mobile {
            font-size: 1.5rem;
          }
          
          .action-buttons-mobile {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .quantity-selector-mobile {
            width: 100%;
            justify-content: center;
          }
          
          .add-to-cart-btn-mobile {
            width: 100%;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .menu-grid-tablet {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          
          .image-container-tablet {
            height: 180px;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .menu-grid-desktop {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Restaurant Info Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-red-200 p-4 sm:p-6 mb-6 sm:mb-8 fade-in">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 restaurant-info-mobile">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="logo-mobile w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 sm:border-4 border-red-100 shadow-md">
                <img 
                  src="https://i.postimg.cc/qBmMSFHK/logo-1727.jpg" 
                  alt="PizzaBurg Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="title-mobile text-2xl sm:text-3xl font-bold text-gray-900">PizzaBurg</h2>
                <p className="subtitle-mobile text-sm sm:text-lg text-gray-600 mt-1">Pizza & Burgers - Best of Both Worlds</p>
              </div>
            </div>
            
            <div className="w-full">
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 stats-mobile">
                <div className="stat-item-mobile flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-red-400 text-red-400" />
                  <span className="font-bold text-base sm:text-lg text-gray-900">{restaurantInfo.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-500">(350+)</span>
                </div>
                <div className="stat-item-mobile flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <span className="font-medium text-sm sm:text-base text-gray-900">{restaurantInfo.deliveryTime}</span>
                </div>
                <div className="stat-item-mobile flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                  <span className="text-sm sm:text-base text-gray-900">
                    Min: <span className="font-bold">৳{restaurantInfo.minOrder}</span>
                  </span>
                </div>
                <div className="stat-item-mobile flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                  <span className="text-sm sm:text-base text-gray-900">
                    Fee: <span className="font-bold">৳{restaurantInfo.deliveryFee}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 info-grid-mobile">
                <div className="bg-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Cuisine</div>
                  <div className="font-medium text-sm sm:text-base text-gray-800 truncate">{restaurantInfo.cuisine.join(", ")}</div>
                </div>
                <div className="bg-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Locations</div>
                  <div className="font-medium text-sm sm:text-base text-gray-800 truncate">{restaurantInfo.locations.join(", ")}</div>
                </div>
                <div className="bg-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">Open Hours</div>
                  <div className="font-medium text-sm sm:text-base text-gray-800">{restaurantInfo.openingHours}</div>
                </div>
              </div>
              
              <div className="special-offer-mobile bg-gradient-to-br from-red-100 to-pink-100 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-red-200 shadow-md mt-4 sm:mt-0">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-red-800">Special Combo Offer</div>
                    <div className="text-sm sm:text-lg text-red-700 font-medium">Burger + Pizza = 15% OFF</div>
                    <div className="text-xs sm:text-sm text-gray-700 mt-1 bg-white/50 py-1 px-2 sm:px-3 rounded-full inline-block">
                      Use code: <span className="font-bold">PIZZABURG15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="category-filter-mobile mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Menu Categories</h3>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="categories-toggle-btn sm:hidden flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span className="text-sm font-medium">Categories</span>
            </button>
            <div className="hidden sm:block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredItems.length} items
            </div>
          </div>
          
          <div className="categories-scroll-mobile sm:block">
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 min-w-max sm:min-w-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    if (window.innerWidth < 640) setShowCategories(false);
                  }}
                  className={`category-btn px-3 py-2 sm:px-5 sm:py-3 rounded-full font-medium transition-all flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base ${
                    activeCategory === category.id 
                      ? 'active text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-semibold">{category.name}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 menu-grid-mobile menu-grid-tablet menu-grid-desktop">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="menu-item-card bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md border border-gray-200 overflow-hidden fade-in menu-card-mobile"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Item Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden food-image-container image-container-mobile image-container-tablet">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover food-image"
                />

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <Heart 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    fill={wishlist.find(wishItem => wishItem.id === item.id) ? "#ef4444" : "none"}
                    color={wishlist.find(wishItem => wishItem.id === item.id) ? "#ef4444" : "#6b7280"}
                  />
                </button>
              </div>
              
              {/* Item Details */}
              <div className="p-3 sm:p-4 md:p-5 item-details-mobile">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 item-name-mobile truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-red-600 font-bold text-xl sm:text-2xl ml-2 item-price-mobile">
                    ৳{item.price}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 md:mb-5">
                  <div className="flex items-center gap-1 mb-1 sm:mb-0">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-red-400 text-red-400" />
                      <span className="font-medium text-gray-800">{item.rating}</span>
                    </div>
                    <div className="capitalize bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">
                      {item.category}
                    </div>
                  </div>
                </div>
                
                {/* Quantity Selector and Add to Cart - কালো + এবং - সহ */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 action-buttons-mobile">
                  <div className="flex items-center gap-2 quantity-selector-mobile">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="simple-quantity-btn text-black-important"
                      disabled={(quantity[item.id] || 1) <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-count text-black-important">
                      {quantity[item.id] || 1}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="simple-quantity-btn text-black-important"
                      disabled={(quantity[item.id] || 1) >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full sm:flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base add-to-cart-btn-mobile"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6 rounded-full bg-red-100 flex items-center justify-center shadow-lg">
              <ChefHat className="w-10 h-10 sm:w-14 sm:h-14 text-red-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No items found</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-lg">Try selecting a different category</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 text-sm sm:text-lg"
            >
              View All Menu Items
            </button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden mobile-bottom-nav">
        <div className="nav-buttons">
          <button
            onClick={() => navigate('/')}
            className="nav-btn text-gray-600 hover:text-green-600"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={handleViewWishlistToast}
            className="nav-btn text-gray-600 hover:text-pink-600"
          >
            <Heart 
              className="w-5 h-5" 
              fill={wishlist.length > 0 ? "#ef4444" : "none"}
              color={wishlist.length > 0 ? "#ef4444" : "#6b7280"}
            />
            <span className="text-xs font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </button>
          
          <button
            onClick={handleViewCartToast}
            className="nav-btn text-gray-600 hover:text-blue-600"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs font-medium">Cart</span>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </button>
          
          <button
            onClick={() => navigate('/profile')}
            className="nav-btn text-gray-600 hover:text-purple-600"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating Buttons */}
      <div className="hidden lg:flex fixed bottom-8 right-8 z-40 gap-3">
        <button
          onClick={handleViewWishlistToast}
          className="relative bg-white text-gray-700 font-medium px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-gray-200"
        >
          <Heart className="w-5 h-5" fill={wishlist.length > 0 ? "#ef4444" : "none"} 
            color={wishlist.length > 0 ? "#ef4444" : "#6b7280"} />
          <span>Wishlist ({wishlist.length})</span>
        </button>
        <button
          onClick={handleViewCartToast}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-6 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          View Cart ({cartItems.length})
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PizzaBurgMenu;