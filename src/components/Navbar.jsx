// Navbar.jsx
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Home, Grid, Menu, X, Heart } from "lucide-react"; // Heart import করুন
import { useState, useEffect } from "react"; // useEffect import করুন

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0); // নাম পরিবর্তন
  const [wishlistCount, setWishlistCount] = useState(0); // নতুন state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0); // কার্ট টোটাল

  // কার্ট আইটেম কাউন্ট আপডেট ফাংশন
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("shopickCart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(count);
    
    // কার্ট টোটাল ক্যালকুলেট
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  };

  // উইশলিস্ট কাউন্ট আপডেট ফাংশন
  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("shopickWishlist")) || [];
    setWishlistCount(wishlist.length);
  };

  // লোকাল স্টোরেজ পরিবর্তন শোনা
  useEffect(() => {
    // প্রথম লোডে কাউন্ট আপডেট
    updateCartCount();
    updateWishlistCount();

    // লোকাল স্টোরেজ পরিবর্তনের জন্য ইভেন্ট লিসেনার
    const handleStorageChange = () => {
      updateCartCount();
      updateWishlistCount();
    };

    // স্টোরেজ ইভেন্ট শুনুন
    window.addEventListener('storage', handleStorageChange);
    
    // কাস্টম ইভেন্টের জন্য লিসেনার (নিজের ট্যাবের পরিবর্তনের জন্য)
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
    };
  }, []);

  // ক্যাটেগরি ডেটা
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

  return (
    <>
      {/* Top Menu Bar - Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-pink-600 to-pink-700 text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            {/* Left Menu */}
            <div className="hidden lg:flex">
              <ul className="flex gap-6 font-medium">
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    FEATURES
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    COLLECTIONS
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    ACCESSORIES
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    PAGES
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-pink-200 transition-colors">
                    BLOG
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Info */}
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm">
                Get an extra <span className="font-bold">10% OFF</span> on select hotels!
              </span>
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <select className="bg-transparent outline-none text-sm cursor-pointer">
                    <option className="bg-pink-700">English</option>
                    <option className="bg-pink-700">Bangla</option>
                  </select>
                  <ChevronDown size={14} />
                </div>
                <div className="flex items-center gap-1">
                  <select className="bg-transparent outline-none text-sm cursor-pointer">
                    <option className="bg-pink-700">$ USD</option>
                    <option className="bg-pink-700">৳ BDT</option>
                  </select>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Main Navbar */}
      <div className="hidden lg:block bg-gradient-to-r from-pink-700 to-pink-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo - Desktop Only */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="https://i.ibb.co.com/TMBDhPGq/Black-White-Minimal-Simple-Modern-Classic-Photography-Studio-Salt-Logo-2.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Search Bar - Desktop - FIXED spacing */}
            <div className="flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full bg-white rounded-full overflow-hidden shadow-lg py-2.5 px-4">
                <div className="relative flex items-center px-4 border-r">
                  <select className="outline-none bg-transparent text-gray-700 font-medium pr-6 text-sm">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Garden</option>
                    <option>Sports</option>
                    <option>Books</option>
                  </select>
                  <ChevronDown className="absolute right-2 text-gray-500" size={16} />
                </div>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="flex-1 px-4 outline-none text-gray-800 text-sm"
                />
                <button className="bg-gradient-to-r from-gray-900 to-black text-white px-6 hover:from-black hover:to-gray-900 transition-all">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Desktop Navigation Items - FIXED spacing */}
            <div className="flex items-center gap-4">
              {/* Wishlist - Link দিয়ে wrap করুন */}
              <Link to="/wishlist" className="relative group cursor-pointer">
                <div className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                  <div className="relative">
                    {wishlistCount > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red-500 absolute -top-1 -right-1 flex items-center justify-center">
                        <span className="text-xs font-bold">{wishlistCount}</span>
                      </div>
                    )}
                    <Heart
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="font-medium hidden lg:block">Wishlist</span>
                </div>
              </Link>

              {/* Cart - Link already exists */}
              <Link to="/cart" className="relative group">
                <div className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                  <div className="relative">
                    <ShoppingCart size={22} />
                    {cartItemsCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {cartItemsCount}
                      </div>
                    )}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-sm leading-tight">My Cart</div>
                    <div className="font-bold text-sm">${cartTotal.toFixed(2)}</div>
                  </div>
                </div>
              </Link>

              {/* Login/Register - FIXED overlap issue */}
              <Link to="/login" className="group relative">
                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition-all duration-300">
                  <User size={18} className="text-white" />
                  <div className="text-white font-medium text-sm hidden xl:block">
                    Login /<br className="sm:hidden" /> Register
                  </div>
                  <ChevronDown size={14} className="text-white" />
                </div>
                {/* Dropdown Menu */}
                <div className="absolute hidden group-hover:block mt-2 right-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
                    >
                      👤 Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
                    >
                      📝 Register
                    </Link>
                    <div className="border-t my-1"></div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
                    >
                      🏠 My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
                    >
                      📦 My Orders
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden">
        {/* Mobile Top Bar with Hamburger and Search - FIXED spacing */}
        <div className="flex items-center justify-between px-3 pt-4 pb-3">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gradient-to-r from-gray-900 to-black text-white flex-shrink-0"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Search Bar - FIXED spacing */}
          <div className="flex-1 ml-3 mr-3">
            <div className="flex bg-white rounded-full overflow-hidden shadow-lg py-2.5 px-3">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-3 outline-none text-gray-800 text-sm"
              />
              <button className="bg-gradient-to-r from-gray-900 to-black text-white px-5">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Categories Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div 
              className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-white flex items-center">
                      <span className="mr-3">📁</span>
                      ALL CATEGORIES
                    </h2>
                    <p className="text-gray-300 text-sm mt-1">Browse by category</p>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white p-2 rounded-full hover:bg-white/10"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Categories List */}
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

              {/* Close Button at Bottom */}
              <div className="sticky bottom-0 bg-white border-t p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-semibold"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar - Fixed at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40 shadow-2xl">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Home */}
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center flex-1 active:bg-gray-100 rounded-lg p-1 transition"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <Home size={22} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700 font-medium">Home</span>
          </Link>

          {/* Collections */}
          <Link 
            to="/collections" 
            className="flex flex-col items-center justify-center flex-1 active:bg-gray-100 rounded-lg p-1 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Grid size={22} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700 font-medium">Shop</span>
          </Link>

          {/* Wishlist (Mobile) */}
          <Link 
            to="/wishlist" 
            className="flex flex-col items-center justify-center flex-1 relative active:bg-gray-100 rounded-lg p-1 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <Heart 
                size={22} 
                className="text-gray-700 mb-1" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2}
              />
              {wishlistCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-[10px] font-bold">{wishlistCount}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-700 font-medium">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center justify-center flex-1 relative active:bg-gray-100 rounded-lg p-1 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <ShoppingCart size={22} className="text-gray-700 mb-1" />
              {cartItemsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-[10px] font-bold">{cartItemsCount}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-700 font-medium">Cart</span>
          </Link>

          {/* Account/Login */}
          <Link 
            to="/login" 
            className="flex flex-col items-center justify-center flex-1 active:bg-gray-100 rounded-lg p-1 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={22} className="text-gray-700 mb-1" />
            <span className="text-xs text-gray-700 font-medium">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;