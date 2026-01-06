// Wishlist.jsx - Mobile Responsive
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star, Clock } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    setLoading(true);
    const savedWishlist = localStorage.getItem("shopickWishlist");
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlistItems(items);
      
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalPrice(total);
    }
    setLoading(false);
  };

  const removeFromWishlist = (id) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem("shopickWishlist", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const moveToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("shopickCart")) || [];
    
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.restaurantId === item.restaurantId && cartItem.name === item.name
    );
    
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: Math.min(
          updatedCart[existingItemIndex].quantity + item.quantity,
          updatedCart[existingItemIndex].maxQuantity
        )
      };
    } else {
      updatedCart = [...cart, item];
    }
    
    localStorage.setItem("shopickCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    removeFromWishlist(item.id);
    alert(`${item.name} moved to cart!`);
  };

  const moveAllToCart = () => {
    if (wishlistItems.length === 0) {
      alert("Your wishlist is empty!");
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem("shopickCart")) || [];
    
    wishlistItems.forEach(item => {
      const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.restaurantId === item.restaurantId && cartItem.name === item.name
      );
      
      if (existingItemIndex !== -1) {
        cart[existingItemIndex] = {
          ...cart[existingItemIndex],
          quantity: Math.min(
            cart[existingItemIndex].quantity + item.quantity,
            cart[existingItemIndex].maxQuantity
          )
        };
      } else {
        cart.push(item);
      }
    });
    
    localStorage.setItem("shopickCart", JSON.stringify(cart));
    localStorage.setItem("shopickWishlist", JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    setWishlistItems([]);
    setTotalPrice(0);
    alert(`All ${wishlistItems.length} items moved to cart!`);
  };

  const clearWishlist = () => {
    if (wishlistItems.length === 0) return;
    
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      localStorage.setItem("shopickWishlist", JSON.stringify([]));
      window.dispatchEvent(new Event('wishlistUpdated'));
      setWishlistItems([]);
      setTotalPrice(0);
      alert("Wishlist cleared!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Items you've saved for later</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-sm text-gray-500">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Actions Bar - Mobile Optimized */}
            {wishlistItems.length > 0 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" fill="currentColor" />
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      Total: <span className="text-pink-600">${totalPrice.toFixed(2)}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={moveAllToCart}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Move All to Cart</span>
                      <span className="sm:hidden">Move All</span>
                    </button>
                    
                    <button
                      onClick={clearWishlist}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all flex items-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Clear All</span>
                      <span className="sm:hidden">Clear</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Items - Mobile Optimized */}
            <div>
              {wishlistItems.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Your wishlist is empty</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                    Start exploring and add your favorites!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all font-medium text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => navigate('/cart')}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl hover:bg-pink-50 transition-all font-medium text-sm sm:text-base"
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {wishlistItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Product Image - Mobile Optimized */}
                          <div className="relative flex-shrink-0">
                            <div className="w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            
                            {/* Discount Badge - Mobile Optimized */}
                            {item.discount && (
                              <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                                {item.discount}
                              </div>
                            )}
                          </div>

                          {/* Product Info - Mobile Optimized */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                              <div className="flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                                <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-1">{item.category || item.cuisine}</p>
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                                  ${item.price.toFixed(2)}
                                </div>
                                {item.originalPrice && (
                                  <div className="text-xs sm:text-sm text-gray-500 line-through">
                                    ${item.originalPrice.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Tags and Rating - Mobile Optimized */}
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                              {item.tags && item.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              
                              {item.rating && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-500" />
                                  {item.rating}
                                </span>
                              )}
                            </div>

                            {/* Details - Mobile Optimized */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
                              {item.location && (
                                <div className="flex items-center gap-1">
                                  <span>📍</span>
                                  <span className="truncate">{item.location}</span>
                                </div>
                              )}
                              
                              {item.deliveryTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>{item.deliveryTime}</span>
                                </div>
                              )}
                            </div>

                            {/* Actions - Mobile Optimized */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => moveToCart(item)}
                                className="flex-1 px-3 sm:px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden sm:inline">Add to Cart</span>
                                <span className="sm:hidden">Add to Cart</span>
                              </button>
                              
                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="flex-1 px-3 sm:px-5 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Remove</span>
                                <span className="sm:hidden">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Mobile Optimized */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 sm:top-6 space-y-4 sm:space-y-6">
              {/* Summary Card - Mobile Optimized */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Wishlist Summary</h3>
                
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Items</span>
                    <span className="font-medium text-sm sm:text-base">{wishlistItems.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Estimated Total</span>
                    <span className="text-xl sm:text-2xl font-bold text-pink-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={moveAllToCart}
                    disabled={wishlistItems.length === 0}
                    className={`w-full py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
                      wishlistItems.length === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    Add All to Cart
                  </button>
                  
                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium text-sm sm:text-base"
                  >
                    Go to Cart
                  </button>
                </div>
              </div>

              {/* Tips Card - Mobile Hidden on Small Screens */}
              <div className="hidden sm:block bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl border border-pink-100 p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" fill="currentColor" />
                  Wishlist Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">•</span>
                    Items stay in your wishlist until you remove them
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">•</span>
                    Get notified when items go on sale
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">•</span>
                    Share your wishlist with friends
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;