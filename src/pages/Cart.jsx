import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, Trash2, Plus, Minus, Heart, 
  ArrowRight, Tag, Shield, Truck, RefreshCw, X, AlertCircle
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(5.99);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // লোকাল স্টোরেজ থেকে ডেটা লোড করার ফাংশন
  const loadCartData = () => {
    try {
      const savedCart = localStorage.getItem("shopickCart");
      console.log("Loading cart from localStorage:", savedCart);
      
      if (savedCart) {
        const parsedData = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedData) ? parsedData : []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }
    setLoading(false);
  };

  // লোকাল স্টোরেজে সেভ
  const saveCartData = (items) => {
    try {
      localStorage.setItem("shopickCart", JSON.stringify(items));
      console.log("Saved cart to localStorage:", items);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // লোকাল স্টোরেজ থেকে ডেটা লোড
  useEffect(() => {
    loadCartData();

    // লোকাল স্টোরেজ পরিবর্তনের জন্য ইভেন্ট লিসেনার
    const handleStorageChange = (e) => {
      if (e.key === "shopickCart") {
        console.log("Cart storage changed, reloading...");
        loadCartData();
      }
    };

    // কাস্টম ইভেন্টের জন্য লিসেনার
    const handleCustomEvent = () => {
      console.log("Custom cart event received");
      loadCartData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomEvent);
    };
  }, []);

  // লোকাল স্টোরেজে সেভ যখন cartItems পরিবর্তন হয়
  useEffect(() => {
    if (!loading) {
      saveCartData(cartItems);
      // ইভেন্ট ডিসপ্যাচ করুন অন্য কম্পোনেন্টগুলো আপডেট করার জন্য
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new Event('storage'));
    }
  }, [cartItems, loading]);

  // কোয়ান্টিটি ইনক্রিমেন্ট
  const incrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.quantity < (item.maxQuantity || 10)) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
    showMessage("Quantity updated", "success");
  };

  // কোয়ান্টিটি ডিক্রিমেন্ট
  const decrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
    showMessage("Quantity updated", "success");
  };

  // আইটেম রিমুভ
  const removeItem = (id) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    showMessage(`"${item?.name || 'Item'}" removed from cart`, "success");
  };

  // আইটেম উইশলিস্টে যোগ
  const moveToWishlist = (item) => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("shopickWishlist")) || [];
      const existingItem = wishlist.find(wishlistItem => wishlistItem.id === item.id);
      
      if (!existingItem) {
        const wishlistItem = {
          ...item,
          addedDate: new Date().toISOString().split('T')[0],
          inStock: true
        };
        // কোয়ান্টিটি ফিল্ড রিমুভ করুন
        delete wishlistItem.quantity;
        delete wishlistItem.maxQuantity;
        
        wishlist.push(wishlistItem);
        localStorage.setItem("shopickWishlist", JSON.stringify(wishlist));
        removeItem(item.id);
        showMessage(`"${item.name}" moved to wishlist!`, "success");
        
        // Wishlist আপডেট ইভেন্ট ট্রিগার
        window.dispatchEvent(new Event('wishlistUpdated'));
        window.dispatchEvent(new Event('storage'));
      } else {
        showMessage(`"${item.name}" is already in wishlist!`, "info");
      }
    } catch (error) {
      console.error("Error moving to wishlist:", error);
      showMessage("Failed to move item to wishlist", "error");
    }
  };

  // সিঙ্গেল আইটেম প্রাইস
  const getItemTotal = (item) => {
    return (item.price || 0) * (item.quantity || 1);
  };

  // সাবটোটাল
  const subtotal = cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);

  // টোটাল
  const total = subtotal + shippingCost - discount;

  // কুপন প্রয়োগ
  const applyCoupon = () => {
    if (!couponCode.trim()) {
      showMessage("Please enter a coupon code", "warning");
      return;
    }
    
    if (couponCode.toUpperCase() === "SHOPICK10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      showMessage(`Coupon applied! $${discountAmount.toFixed(2)} discount added.`, "success");
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      const discountAmount = subtotal * 0.2;
      setDiscount(discountAmount);
      showMessage(`Coupon applied! $${discountAmount.toFixed(2)} discount added.`, "success");
    } else {
      showMessage("Invalid coupon code! Try SHOPICK10 or WELCOME20", "error");
    }
  };

  // সবকিছু ডিলিট
  const clearCart = () => {
    if (cartItems.length === 0) {
      showMessage("Cart is already empty", "info");
      return;
    }
    
    setCartItems([]);
    localStorage.removeItem("shopickCart");
    setDiscount(0);
    setCouponCode("");
    showMessage("Cart cleared successfully", "success");
    
    // ইভেন্ট ডিসপ্যাচ
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('storage'));
  };

  // মেসেজ শো করার ফাংশন
  const showMessage = (messageText, type) => {
    setMessage(messageText);
    setTimeout(() => setMessage(""), 3000);
  };

  // রিফ্রেশ বাটন
  const refreshCart = () => {
    loadCartData();
    showMessage("Cart refreshed", "info");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingCart className="text-pink-600" size={28} />
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-2">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshCart}
                className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2"
                title="Refresh cart"
              >
                ↻ Refresh
              </button>
              <Link
                to="/"
                className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            message.includes("success") || message.includes("applied") 
              ? "bg-green-50 border border-green-200 text-green-700"
              : message.includes("error") || message.includes("Invalid")
              ? "bg-red-50 border border-red-200 text-red-700"
              : "bg-blue-50 border border-blue-200 text-blue-700"
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.includes("success") || message.includes("applied") 
                ? "bg-green-100"
                : message.includes("error") || message.includes("Invalid")
                ? "bg-red-100"
                : "bg-blue-100"
            }`}>
              {message.includes("success") || message.includes("applied") ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <span className="font-medium">{message}</span>
          </div>
        )}

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Start Shopping
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/wishlist"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
              >
                <Heart size={20} />
                View Wishlist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              {/* Actions Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-gray-700 font-medium">
                    Total: <span className="text-pink-600">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={refreshCart}
                      className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      ↻ Refresh Cart
                    </button>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div 
                          className="w-full md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 
                                className="font-bold text-gray-900 text-xl mb-1 hover:text-pink-600 cursor-pointer"
                                onClick={() => navigate(`/product/${item.id}`)}
                              >
                                {item.name}
                              </h3>
                              <p className="text-gray-500 mb-3">{item.category}</p>
                              
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => decrementQuantity(item.id)}
                                    disabled={item.quantity <= 1}
                                    className={`px-4 py-2 ${
                                      item.quantity <= 1
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    <Minus size={18} />
                                  </button>
                                  <span className="px-4 py-2 font-medium min-w-[40px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => incrementQuantity(item.id)}
                                    disabled={item.quantity >= (item.maxQuantity || 10)}
                                    className={`px-4 py-2 ${
                                      item.quantity >= (item.maxQuantity || 10)
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    <Plus size={18} />
                                  </button>
                                </div>

                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                  In Stock
                                </span>
                              </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex flex-col items-end gap-4">
                              <div className="text-right">
                                <div className="font-bold text-2xl text-gray-900">
                                  ${getItemTotal(item).toFixed(2)}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  ${(item.price || 0).toFixed(2)} × {item.quantity}
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => moveToWishlist(item)}
                                  className="text-gray-600 hover:text-pink-600 p-2 hover:bg-pink-50 rounded-lg transition-colors"
                                  title="Move to Wishlist"
                                >
                                  <Heart size={20} />
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-600 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Remove Item"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Secure Payment</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Free Shipping</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <RefreshCw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Easy Returns</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                  <Tag className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Best Price</div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
                    <h2 className="font-bold text-xl text-white flex items-center gap-3">
                      <ShoppingCart size={24} />
                      Order Summary
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">${shippingCost.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount</span>
                          <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Total</span>
                          <span className="font-bold text-2xl text-pink-600">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Coupon */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="text-gray-500" size={18} />
                        <span className="font-medium text-gray-700">Have a coupon?</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                          onClick={applyCoupon}
                          className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        Try: <span className="font-medium">SHOPICK10</span> (10% off) or <span className="font-medium">WELCOME20</span> (20% off)
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button 
                      onClick={() => {
                        showMessage("Proceeding to checkout...", "success");
                        // এখানে চেকআউট লজিক যোগ করুন
                      }}
                      className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
                    >
                      Proceed to Checkout
                    </button>

                    <Link
                      to="/wishlist"
                      className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart size={18} />
                      View Wishlist
                    </Link>

                    {/* Payment Methods */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-3">We Accept</h4>
                      <div className="flex gap-3">
                        <div className="w-12 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-800">VISA</span>
                        </div>
                        <div className="w-12 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">MC</span>
                        </div>
                        <div className="w-12 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-yellow-800">PP</span>
                        </div>
                        <div className="w-12 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-800">COD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2">Need more items?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Continue shopping to discover more amazing products.
                  </p>
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    Browse Products
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;