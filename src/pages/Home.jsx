import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, Tag, Heart, Star, MapPin, Timer, ShoppingCart, Home as HomeIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

// Top Brands Data - Updated with menu page URLs
const topBrands = [
  {
    id: 1,
    name: "Sultan's Dine",
    logo: "https://i.postimg.cc/kXBXmy7x/sd.jpg",
    description: "Authentic Bengali cuisine",
    url: "/restaurant/sultans-dine"
  },
  {
    id: 2,
    name: "Kacchi Bhai",
    logo: "https://i.postimg.cc/Y2XqZPBL/kb.png",
    description: "Best Kacchi in town",
    url: "/restaurant/kacchi-bhai"
  },
  {
    id: 3,
    name: "Chillox",
    logo: "https://i.postimg.cc/2jH8MtNr/chillox.png",
    description: "Famous for burgers",
    url: "/restaurant/chillox"
  },
  {
    id: 4,
    name: "Pizza Hut",
    logo: "https://i.postimg.cc/fTJTNvMV/Pizza-Hut.png",
    description: "International pizza chain",
    url: "/restaurant/pizza-hut"
  },
  {
    id: 5,
    name: "7 Days Restaurant",
    logo: "https://i.postimg.cc/2jH8MtRg/7days.jpg",
    description: "Open 7 days a week",
    url: "/restaurant/7days-restaurant"
  },
  {
    id: 6,
    name: "PizzaBurg",
    logo: "https://i.postimg.cc/qBmMSFHK/logo-1727.jpg",
    description: "Pizza & Burgers",
    url: "/restaurant/pizzaburg"
  },
  {
    id: 7,
    name: "Kacchi Dine",
    logo: "https://i.postimg.cc/sfnDqLCg/Kacchi-Dine.jpg",
    description: "Fast food chain",
    url: "/restaurant/kacchi-dine"
  },
  {
    id: 8,
    name: "sadia's kitchen",
    logo: "https://i.postimg.cc/SNJNhGm8/sadia-s-kitchen.jpg",
    description: "Popular local brand",
    url: "/restaurant/sadias-kitchen"
  },
  {
    id: 9,
    name: "Domino's Pizza Bangladesh",
    logo: "https://i.postimg.cc/ZYfK2Qzn/Dominos-pizza.png",
    description: "World famous pizza",
    url: "/restaurant/dominos-pizza"
  },
  {
    id: 10,
    name: "KFC",
    logo: "https://i.postimg.cc/pXpXHBPy/KFC.png",
    description: "Finger lickin' good",
    url: "/restaurant/kfc"
  },
  {
    id: 11,
    name: "Peyari Tehari",
    logo: "https://i.postimg.cc/Bn9NQ691/Peyari-Tehari.jpg",
    description: "Famous for Tehari",
    url: "/restaurant/peyari-tehari"
  }
];

// Top Shops Data - UPDATED URLs
const topShops = [
  {
    id: 1,
    name: "Fruit Zone",
    logo: "https://i.postimg.cc/v8PHkKwB/Fruit-Zone.jpg",
    description: "Premium shopping mall with international brands",
    url: "/shop/fruit-zone" // আপডেট করা
  },
  {
    id: 2,
    name: "Bengal Meat - Dhali (DCC Market)",
    logo: "https://i.postimg.cc/v8PHkKFj/bengal-meat.png",
    description: "Fresh meat and poultry shop",
    url: "/shop/bengal-meat-dhali" // আপডেট করা
  },
  {
    id: 3,
    name: "RFL Best Buy Pharma (Kalachandpur)",
    logo: "https://i.postimg.cc/J4G4LQR0/rfl-pharma.jpg",
    description: "Pharmacy and medical supplies",
    url: "/shop/rfl-best-buy-pharma" // আপডেট করা
  },
  {
    id: 4,
    name: "Unimart - Gulshan 2",
    logo: "https://i.postimg.cc/m2t2sST3/unimart.jpg",
    description: "Supermarket and grocery store",
    url: "/shop/unimart-gulshan" // আপডেট করা
  },
  {
    id: 5,
    name: "Amana Big Bazar - Mohakhali",
    logo: "https://i.postimg.cc/tJmq6sNz/amana-big-bazar.jpg",
    description: "Departmental store with variety of products",
    url: "/shop/amana-big-bazar" // আপডেট করা
  },
  {
    id: 6,
    name: "Agora (RM Center)",
    logo: "https://i.postimg.cc/C56h8RsJ/agora.jpg",
    description: "Retail supermarket chain",
    url: "/shop/agora-rm-center" // আপডেট করা
  }
];

// All Restaurants Data - বিভিন্ন ধরনের রেস্তোরাঁ
const allRestaurants = [
  {
    id: 1,
    name: "Sultan's Dine",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Bengali, Biryani",
    rating: 4.6,
    deliveryTime: "45-55 min",
    priceRange: "$$",
    location: "Gulshan, Dhaka",
    tags: ["Biryani", "Kacchi", "Traditional"],
    featured: true,
    discount: "20% OFF",
    url: "/restaurant/sultans-dine"
  },
  {
    id: 2,
    name: "Kacchi Bhai",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Biryani, Bengali",
    rating: 4.7,
    deliveryTime: "50-60 min",
    priceRange: "$$",
    location: "Dhanmondi, Dhaka",
    tags: ["Special Kacchi", "Biryani", "Popular"],
    featured: true,
    discount: "15% OFF",
    url: "/restaurant/kacchi-bhai"
  },
  {
    id: 3,
    name: "Chillox",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Burgers, American",
    rating: 4.5,
    deliveryTime: "40-50 min",
    priceRange: "$",
    location: "Bashundhara, Dhaka",
    tags: ["Burgers", "Fast Food", "American"],
    featured: false,
    discount: "10% OFF",
    url: "/restaurant/chillox"
  },
  {
    id: 4,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Pizza, Italian",
    rating: 4.3,
    deliveryTime: "35-45 min",
    priceRange: "$$",
    location: "Uttara, Dhaka",
    tags: ["Pizza", "Pasta", "Italian"],
    featured: false,
    discount: "Buy 1 Get 1",
    url: "/restaurant/pizza-hut"
  },
  {
    id: 5,
    name: "7 Days Restaurant",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Bangladeshi, Indian",
    rating: 4.2,
    deliveryTime: "30-40 min",
    priceRange: "$",
    location: "Various locations, Dhaka",
    tags: ["Bangladeshi", "Indian", "Fast Food"],
    featured: false,
    discount: "15% OFF",
    url: "/restaurant/7days-restaurant"
  },
  {
    id: 6,
    name: "PizzaBurg",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Pizza, Burgers",
    rating: 4.4,
    deliveryTime: "25-35 min",
    priceRange: "$",
    location: "Gulshan, Dhaka",
    tags: ["Pizza", "Burgers", "Fast Food"],
    featured: false,
    discount: "Combo Deal",
    url: "/restaurant/pizzaburg"
  },
  {
    id: 7,
    name: "Kacchi Dine",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Fast Food, Biryani",
    rating: 4.1,
    deliveryTime: "20-30 min",
    priceRange: "$",
    location: "Various locations, Dhaka",
    tags: ["Fast Food", "Biryani", "Bangladeshi"],
    featured: false,
    discount: "10% OFF",
    url: "/restaurant/kacchi-dine"
  },
  {
    id: 8,
    name: "sadia's kitchen",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Bangladeshi, Home Style",
    rating: 4.3,
    deliveryTime: "35-45 min",
    priceRange: "$",
    location: "Dhanmondi, Dhaka",
    tags: ["Home Style", "Bangladeshi", "Traditional"],
    featured: false,
    discount: "",
    url: "/restaurant/sadias-kitchen"
  },
  {
    id: 9,
    name: "Domino's Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Pizza, Fast Food",
    rating: 4.0,
    deliveryTime: "30-40 min",
    priceRange: "$$",
    location: "Mirpur 10, Dhaka",
    tags: ["Pizza", "Fast Delivery", "Italian"],
    featured: false,
    discount: "30 min delivery",
    url: "/restaurant/dominos-pizza"
  },
  {
    id: 10,
    name: "KFC",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Fried Chicken, Fast Food",
    rating: 4.1,
    deliveryTime: "25-35 min",
    priceRange: "$$",
    location: "Mirpur, Dhaka",
    tags: ["Fried Chicken", "Fast Food", "Buckets"],
    featured: false,
    discount: "30% OFF",
    url: "/restaurant/kfc"
  },
  {
    id: 11,
    name: "Peyari Tehari",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Tehari, Bangladeshi",
    rating: 4.6,
    deliveryTime: "35-45 min",
    priceRange: "$",
    location: "Old Dhaka",
    tags: ["Tehari", "Spicy", "Traditional"],
    featured: true,
    discount: "Free Salad",
    url: "/restaurant/peyari-tehari"
  },
  {
    id: 12,
    name: "Baskin Robbins",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    cuisine: "Ice Cream, Desserts",
    rating: 4.4,
    deliveryTime: "20-30 min",
    priceRange: "$$",
    location: "Banani, Dhaka",
    tags: ["Ice Cream", "Desserts", "Sweets"],
    featured: false,
    discount: "",
    url: "/restaurant/baskin-robbins"
  }
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);
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

  // ব্র্যান্ড ক্লিক হ্যান্ডলার - উন্নত টোস্ট ডিজাইন সহ
  const handleBrandClick = (brand) => {
    toast.info(`🚀 Opening ${brand.name}...`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    });
    
    setTimeout(() => {
      navigate(brand.url, { state: { brandName: brand.name, brandDescription: brand.description } });
    }, 500);
  };

  // শপ ক্লিক হ্যান্ডলার - উন্নত টোস্ট ডিজাইন সহ
  const handleShopClick = (shop) => {
    toast.info(`🛍️ Opening ${shop.name}...`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
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
    
    setTimeout(() => {
      navigate(shop.url, { state: { shopName: shop.name, shopDescription: shop.description } });
    }, 500);
  };

  // রেস্তোরাঁ ক্লিক হ্যান্ডলার - উন্নত টোস্ট ডিজাইন সহ
  const handleRestaurantClick = (restaurant) => {
    toast.info(`🍽️ Opening ${restaurant.name} menu...`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      style: {
        background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    });
    
    setTimeout(() => {
      navigate(restaurant.url, { 
        state: { 
          restaurantName: restaurant.name, 
          cuisine: restaurant.cuisine,
          rating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime,
          location: restaurant.location
        } 
      });
    }, 500);
  };

  // Add to Cart ফাংশন - শুধু একবার টোস্ট দেখাবে
  const addToCart = (restaurant) => {
    // আগের সব টোস্ট ক্লিয়ার করুন (যদি থাকে)
    toast.dismiss();
    
    const cartItem = {
      id: Date.now(), // Unique ID
      name: restaurant.name,
      price: restaurant.priceRange === '$$$' ? 25.99 : 
             restaurant.priceRange === '$$' ? 15.99 : 9.99,
      image: restaurant.image,
      category: restaurant.cuisine,
      quantity: 1,
      maxQuantity: 10,
      restaurantId: restaurant.id,
      deliveryTime: restaurant.deliveryTime,
      location: restaurant.location,
      priceRange: restaurant.priceRange
    };
    
    // প্রথমে কার্ট আইটেম আপডেট করুন
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(item => 
      item.restaurantId === restaurant.id && item.name === restaurant.name
    );
    
    let message = "";
    let icon = "🛒";
    
    if (existingItemIndex !== -1) {
      // আইটেম ইতিমধ্যে কার্টে আছে, ক্যোয়ান্টিটি বাড়ান
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: Math.min(
          updatedCartItems[existingItemIndex].quantity + 1,
          updatedCartItems[existingItemIndex].maxQuantity
        )
      };
      message = `Increased quantity for ${restaurant.name} in cart!`;
      icon = "📈";
    } else {
      // নতুন আইটেম অ্যাড করুন
      updatedCartItems.push(cartItem);
      message = `${restaurant.name} added to cart! 🎉`;
      icon = "🛒";
    }
    
    // স্টেট আপডেট করুন
    setCartItems(updatedCartItems);
    
    // টোস্ট মেসেজ শো করুন
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: icon,
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

  // Shopping cart button টোস্ট সহকারে
  const handleViewCartToast = () => {
    toast.dismiss();
    
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
    toast.dismiss();
    
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

  // স্ক্রল করে আরো রেস্তোরাঁ লোড করার ফাংশন
  const handleScrollLoad = () => {
    if (loadingMore || visibleRestaurants >= allRestaurants.length) return;
    
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setLoadingMore(true);
      
      setTimeout(() => {
        setVisibleRestaurants(prev => {
          const newCount = prev + 4;
          return newCount > allRestaurants.length ? allRestaurants.length : newCount;
        });
        setLoadingMore(false);
      }, 500);
    }
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

  // স্ক্রল ইভেন্ট লিসেনার - window scroll
  useEffect(() => {
    const handleScroll = () => {
      handleScrollLoad();
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleRestaurants, loadingMore]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
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
          gap: 0.75rem;
          padding: 0.5rem 0;
          width: max-content;
        }
        
        /* ব্র্যান্ড/শপ কার্ড স্টাইল - ছোট লোগোর জন্য */
        .brand-card {
          transition: all 0.3s ease;
          flex-shrink: 0;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .brand-card:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
        }
        
        /* লোগো ইমেজ স্টাইল */
        .brand-card img {
          max-height: 80px !important;
          max-width: 80px !important;
          object-fit: contain;
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
        
        /* স্টিকি সাইডবার স্টাইল - নেভিবারের নিচে ঢুকবেনা */
        .sticky-sidebar {
          position: sticky;
          top: 6rem;
          height: calc(100vh - 8rem);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
          z-index: 40;
        }
        
        .sticky-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .sticky-sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .sticky-sidebar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .sticky-sidebar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* স্টিকি হেডার */
        .sticky-categories-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(to right, #10b981, #34d399);
          margin: 0 -1.25rem;
          padding: 0 1.25rem;
        }
        
        /* ক্যাটেগরি আইটেমের জন্য হোভার ইফেক্ট */
        .category-item:hover {
          transform: translateX(5px);
          transition: transform 0.3s ease;
        }

        /* Restaurant Card Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .restaurant-card {
          animation: fadeInUp 0.5s ease-out;
        }
        
        /* লোডিং ইন্ডিকেটর */
        .loading-indicator {
          text-align: center;
          padding: 20px;
          color: #10b981;
          font-weight: 500;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(16, 185, 129, 0.3);
          border-radius: 50%;
          border-top-color: #10b981;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* অটো-রিলোড মেসেজ */
        .auto-reload-message {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
          border: 1px dashed #d1d5db;
        }
        
        /* Custom Toast Styles - উন্নত ভার্সন */
        .Toastify__toast {
          border-radius: 12px !important;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          font-weight: 500 !important;
        }
        
        .Toastify__toast--success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          color: white !important;
        }
        
        .Toastify__toast--info {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          color: white !important;
        }
        
        .Toastify__toast--warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
          color: white !important;
        }
        
        .Toastify__toast--error {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
          color: white !important;
        }
        
        .Toastify__progress-bar {
          height: 4px !important;
          background: rgba(255, 255, 255, 0.7) !important;
        }
        
        .Toastify__close-button {
          color: white !important;
          opacity: 0.8 !important;
        }
        
        .Toastify__close-button:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }
        
        .Toastify__toast-body {
          padding: 12px 16px !important;
          font-weight: 500 !important;
        }
        
        /* Brand toast specific */
        .brand-toast {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
          color: white !important;
          font-weight: 600 !important;
        }

        /* Mobile Bottom Navigation স্টাইল */
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

        .mobile-bottom-nav .nav-btn.active {
          background-color: #f3f4f6;
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
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - Categories (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky-sidebar">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="sticky-categories-header px-6 py-5">
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
                      className={`flex justify-between items-center py-3.5 px-4 rounded-xl cursor-pointer transition-all duration-300 category-item ${
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
                      onClick={handleViewCartToast}
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center"
                    >
                      View Cart <ChevronRight className="ml-2 w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleViewWishlistToast}
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
                <p className="text-sm text-gray-600">Click on any brand to explore</p>
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
                        className="brand-card bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white p-3 flex items-center justify-center">
                          <img 
                            src={brand.logo} 
                            alt={brand.name}
                            className="w-full h-full object-contain max-h-[80px] max-w-[80px] transition-transform duration-300 group-hover:scale-105"
                            title={`${brand.name} - ${brand.description}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="last-card-spacer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Shops Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Shops</h2>
                <p className="text-sm text-gray-600">Click on any shop to explore</p>
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
                        className="brand-card bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white p-3 flex items-center justify-center">
                          <img 
                            src={shop.logo} 
                            alt={shop.name}
                            className="w-full h-full object-contain max-h-[80px] max-w-[80px] transition-transform duration-300 group-hover:scale-105"
                            title={`${shop.name} - ${shop.description}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="last-card-spacer"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Restaurants Section - গ্রিড লেআউটে */}
            <div className="mt-12 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Restaurants</h2>
                  <p className="text-gray-600 mt-1">Discover amazing food from top restaurants in Dhaka</p>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {visibleRestaurants} of {allRestaurants.length} restaurants
                </div>
              </div>
              
              {/* ফিল্টার বার */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
                  All
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Biryani
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Burgers
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Pizza
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Fast Food
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  Desserts
                </button>
              </div>

              {/* রেস্তোরাঁ গ্রিড - সাধারণ কন্টেইনার */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allRestaurants.slice(0, visibleRestaurants).map((restaurant) => (
                    <div
                      key={restaurant.id}
                      onClick={() => handleRestaurantClick(restaurant)}
                      className="restaurant-card bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      {/* রেস্তোরাঁ ইমেজ */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* ফিচার্ড ব্যাজ */}
                        {restaurant.featured && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            FEATURED
                          </div>
                        )}
                        
                        {/* ডিসকাউন্ট ব্যাজ */}
                        {restaurant.discount && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {restaurant.discount}
                          </div>
                        )}
                        
                        {/* রেটিং ব্যাজ */}
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      {/* রেস্তোরাঁ তথ্য */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 text-lg truncate">{restaurant.name}</h3>
                          <span className="text-gray-500 text-sm font-medium">{restaurant.priceRange}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                        
                        {/* ট্যাগস */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {restaurant.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* লোকেশন এবং ডেলিভারি টাইম */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{restaurant.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Timer className="w-4 h-4" />
                            <span className="font-medium">{restaurant.deliveryTime}</span>
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(restaurant);
                            }}
                            className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* লোডিং ইন্ডিকেটর */}
                {loadingMore && (
                  <div className="loading-indicator mt-6">
                    <div className="loading-spinner"></div>
                    Loading more restaurants...
                  </div>
                )}
                
                {/* অটো-রিলোড মেসেজ */}
                {visibleRestaurants < allRestaurants.length && (
                  <div className="auto-reload-message mt-6">
                    ⬆️ Scroll down to load more restaurants automatically
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden mobile-bottom-nav">
        <div className="nav-buttons">
          <button
            onClick={() => navigate('/')}
            className="nav-btn text-gray-600 hover:text-green-600"
          >
            <HomeIcon className="w-5 h-5" />
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
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-6 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          View Cart ({cartItems.length})
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Home;