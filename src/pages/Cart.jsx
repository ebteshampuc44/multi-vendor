// Cart.jsx - Mobile Responsive
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Tag, Clock, MapPin, Heart } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setLoading(true);
    const savedCart = localStorage.getItem("shopickCart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      calculateTotals(items);
    }
    setLoading(false);
  };

  const calculateTotals = (items) => {
    const sub = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(sub);
    
    const taxAmount = sub * 0.05; // 5% tax
    setTax(taxAmount);
    
    setTotal(sub + taxAmount);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const quantity = Math.min(newQuantity, item.maxQuantity || 10);
        return { ...item, quantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem("shopickCart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
    calculateTotals(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("shopickCart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
    calculateTotals(updatedItems);
  };

  const moveToWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("shopickWishlist")) || [];
    
    const existingItem = wishlist.find(wishlistItem => wishlistItem.id === item.id);
    if (!existingItem) {
      const wishlistItem = {
        ...item,
        addedToWishlist: new Date().toISOString()
      };
      wishlist.push(wishlistItem);
      localStorage.setItem("shopickWishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event('wishlistUpdated'));
    }
    
    removeFromCart(item.id);
    alert(`${item.name} moved to wishlist!`);
  };

  const clearCart = () => {
    if (cartItems.length === 0) return;
    
    if (window.confirm("Are you sure you want to clear your cart?")) {
      localStorage.setItem("shopickCart", JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));
      setCartItems([]);
      calculateTotals([]);
      alert("Cart cleared!");
    }
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    alert("Proceeding to checkout!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <style jsx global>{`
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Review your items and checkout</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear Cart</span>
                <span className="sm:hidden">Clear</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Cart Items */}
            <div className="fade-in">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                    <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Your cart is empty</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all font-medium text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => navigate('/wishlist')}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-xl hover:bg-pink-50 transition-all font-medium text-sm sm:text-base"
                    >
                      View Wishlist
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 fade-in"
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
                            
                            {/* Quantity Badge - Mobile Optimized */}
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                              x{item.quantity}
                            </div>
                          </div>

                          {/* Product Info - Mobile Optimized */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                              <div className="flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                                <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-1">{item.category || item.cuisine}</p>
                                
                                {/* Details - Mobile Optimized */}
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                                  {item.restaurant && (
                                    <span className="flex items-center gap-1">
                                      <span className="hidden sm:inline">🏪</span>
                                      <span className="truncate">{item.restaurant}</span>
                                    </span>
                                  )}
                                  {item.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                      <span className="truncate">{item.location}</span>
                                    </span>
                                  )}
                                  {item.deliveryTime && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                      <span>{item.deliveryTime}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                  ${item.price.toFixed(2)} each
                                </div>
                              </div>
                            </div>

                            {/* Actions - Mobile Optimized */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center justify-between sm:justify-start gap-3">
                                {/* Quantity Control */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                  >
                                    <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                                  </button>
                                  
                                  <span className="w-10 sm:w-12 text-center font-medium text-base sm:text-lg text-gray-900">
                                    {item.quantity}
                                  </span>
                                  
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                  >
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                                  </button>
                                </div>
                                
                                {/* Max Quantity Warning */}
                                {item.quantity >= (item.maxQuantity || 10) && (
                                  <span className="text-xs text-amber-600 font-medium hidden sm:inline">
                                    Max quantity reached
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-2 sm:gap-3">
                                <button
                                  onClick={() => moveToWishlist(item)}
                                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 rounded-xl hover:from-pink-100 hover:to-pink-200 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                                >
                                  <Heart className="w-4 h-4" />
                                  <span className="hidden sm:inline">Save for Later</span>
                                  <span className="sm:hidden">Save</span>
                                </button>
                                
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all flex items-center justify-center gap-2 font-medium text-sm"
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Promo Code Section - Mobile Optimized */}
            {cartItems.length > 0 && (
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-100 p-4 sm:p-6 fade-in">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-lg">Have a promo code?</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none text-sm sm:text-base"
                  />
                  <button className="px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium text-sm sm:text-base">
                    Apply
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs sm:text-sm rounded-full border border-blue-200">
                    SAVE10
                  </span>
                  <span className="px-3 py-1 bg-white text-blue-700 text-xs sm:text-sm rounded-full border border-blue-200">
                    WELCOME20
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar - Mobile Optimized */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 sm:top-6 space-y-4 sm:space-y-6">
              {/* Order Summary Card - Mobile Optimized */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 fade-in">
                <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-lg">Order Summary</h3>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600">Tax (5%)</span>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Checkout Button - Mobile Optimized */}
                <button
                  onClick={proceedToCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all mb-3 sm:mb-4 ${
                    cartItems.length === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                  }`}
                >
                  {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
                </button>
                
                <div className="text-center">
                  <Link to="/" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Security & Support - Mobile Hidden on Small Screens */}
              <div className="hidden sm:block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 fade-in">
                <h4 className="font-bold text-gray-900 mb-4">Secure Checkout</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">🔒</span>
                    </div>
                    <span>SSL Secure Payment</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">🔄</span>
                    </div>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods - Mobile Hidden on Small Screens */}
              <div className="hidden sm:block bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6 fade-in">
                <h4 className="font-bold text-gray-900 mb-4">We Accept</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="w-10 h-6 sm:w-12 sm:h-8 bg-white rounded flex items-center justify-center">
                    <span className="font-bold text-blue-600 text-xs sm:text-sm">VISA</span>
                  </div>
                  <div className="w-10 h-6 sm:w-12 sm:h-8 bg-white rounded flex items-center justify-center">
                    <span className="font-bold text-blue-400 text-xs sm:text-sm">MC</span>
                  </div>
                  <div className="w-10 h-6 sm:w-12 sm:h-8 bg-white rounded flex items-center justify-center">
                    <span className="font-bold text-yellow-600 text-xs sm:text-sm">PP</span>
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

export default Cart;